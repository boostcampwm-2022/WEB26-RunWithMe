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
    private queueService: ManagerService,
  ) {}

  @WebSocketServer() public server: Server;

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const { recruitId, userId } = data;
    console.log(recruitId, userId);
    await this.socketService.setCacheData(socket.id, data);
    const queue = this.queueService.getQueue(`${recruitId}:${userId}`);
    if (!queue) return;
    try {
      await queue.process((job, done) => {
        socket.emit('server_sent_unread', job.data);
        done();
      });
    } catch (err) {}
    await queue.resume();
    // + 이전 메시지를 리버스 인피니트 스크롤로 보내주기
  }

  @SubscribeMessage('client_sent')
  async handleEvent(
    @MessageBody() data: { content: string },
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    // 해당 모집에 있는 모든 사용자의 큐에 넣어주기
    const { content } = data;
    console.log('client_sent', data);
    const { userId, recruitId } = await this.socketService.getCacheData(
      socket.id,
    );
    const queueList = this.queueService.getQueueList(recruitId.toString());
    const chat = new Chat();
    chat.sender = userId;
    chat.recruitId = recruitId;
    chat.content = content;
    chat.createdAt = new Date();
    console.log('client_sent:queueList', queueList);
    const addWork = [];
    queueList.map((queue: Bull.Queue) => {
      addWork.push(queue.add(chat));
    });
    Promise.all(addWork);
    await this.socketService.saveRecentMessage(chat);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket): Promise<void> {
    console.log('끊김');
    const { recruitId, userId } = await this.socketService.getCacheData(
      socket.id,
    );
    const queue = this.queueService.getQueue(`${recruitId}:${userId}`);
    if (!queue) return;
    queue.pause();
    await this.socketService.delCacheData(socket.id);
  }
}
