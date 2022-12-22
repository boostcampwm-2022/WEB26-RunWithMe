import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from './common/schemas/chat.schema';
import { ManagerService } from './queue-manager/manager.service';
import { SocketService } from './socket.service';
import * as Bull from 'bull';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
    credential: true,
  },
})
export class SocketGateway implements OnGatewayDisconnect {
  constructor(
    private socketService: SocketService,
    private managerService: ManagerService,
  ) {}

  @WebSocketServer() public server: Server;

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const { recruitId, userId } = data;
    const unReadCount = await this.managerService.getQueueSize(
      `${recruitId}:${userId}`,
    ); // 안읽은 메시지 수

    await this.socketService.setCacheData(socket.id, data); // 해당 소켓아이디가 누구껀지
    this.managerService.setSocket(userId, socket); // 소켓 인스턴스 저장
    this.managerService.setUnReadCount(`${recruitId}:${userId}`, unReadCount); // 읽지 않은 메시지 수 기억해

    const queue = this.managerService.getQueue(`${recruitId}:${userId}`);
    if (queue) {
      try {
        queue.process((job, done) => {
          const socketInstance = this.managerService.getSocket(userId);
          socketInstance.emit('server_sent_unread', job.data);
          done();
        });
      } catch (err) {}
      await queue.resume();
    }
    // + 이전 메시지를 리버스 인피니트 스크롤로 보내주기
  }

  @SubscribeMessage('history')
  async handleHistory(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const { userId, recruitId, page } = data;
    const unReadCount = this.managerService.getUnReadCount(
      `${recruitId}:${userId}`,
    );

    const messages = await this.socketService.getRecentMessage(
      parseInt(recruitId),
      page,
      unReadCount,
    );

    socket.emit('server_sent_history', messages);
  }

  @SubscribeMessage('client_sent')
  async handleEvent(
    @MessageBody() data: { content: string },
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    // 해당 모집에 있는 모든 사용자의 큐에 넣어주기
    const { content } = data;
    const { userId, recruitId } = await this.socketService.getCacheData(
      socket.id,
    );
    const queueList = this.managerService.getQueueList(recruitId.toString());
    const chat = new Chat();
    chat.sender = userId;
    chat.recruitId = recruitId;
    chat.content = content;
    chat.createdAt = new Date();
    const addWork = [];
    queueList.map((queue: Bull.Queue) => {
      addWork.push(queue.add(chat));
    });
    this.managerService.addUnReadCount(recruitId.toString());
    Promise.all(addWork);
    await this.socketService.saveRecentMessage(chat);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket): Promise<void> {
    const { recruitId, userId } = await this.socketService.getCacheData(
      socket.id,
    );
    const queue = this.managerService.getQueue(`${recruitId}:${userId}`);
    this.managerService.deleteSocket(userId);
    this.managerService.deleteUnReadCount(`${recruitId}:${userId}`);
    await this.socketService.delCacheData(socket.id);
    if (!queue) return;
    queue.pause();
  }
}
