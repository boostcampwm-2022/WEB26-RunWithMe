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
    );

    await this.socketService.setCacheData(socket.id, data);

    this.managerService.setSocket(userId, socket); // 소켓 인스턴스 저장
    this.managerService.setUnReadCount(`${recruitId}:${userId}`, unReadCount);

    const queue = this.managerService.getQueue(`${recruitId}:${userId}`);
    if (queue) {
      try {
        queue.process((job, done) => {
          const socketInstance = this.managerService.getSocket(userId);
          socketInstance.emit('server_sent_unread', job.data);
          done();
        });
      } catch (err) {}
      console.log(queue);
      await queue.resume();
    }
    // + 이전 메시지를 리버스 인피니트 스크롤로 보내주기
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
    console.log('queueList: ', queueList);
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

  @SubscribeMessage('client_sent_history')
  async handleHistory(
    @MessageBody() body: { userId: string; page: number; recruitId: number },
  ) {
    const { recruitId, userId, page } = body;
    const unReadCount = this.managerService.getUnReadCount(
      `${recruitId}:${userId}`,
    );
    const data = await this.socketService.getRecentMessage(
      recruitId,
      page,
      unReadCount,
    );
    // 스크롤 와중에 나말고 다른 사람이 채팅을 했을 경우 채팅한 개수만큼 offset필요 -> hashMap unReadCount++
    return {
      statusCode: 200,
      data,
    };
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
