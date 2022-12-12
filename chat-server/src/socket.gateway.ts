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
import Bull, { Job } from 'bull';
import { queue } from 'rxjs';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: ['http://localhost:3000'],
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
    socket.join(recruitId); // room에 입장
    await this.socketService.setCacheData(socket.id, data);
    const queue = await this.queueService.getQueue(`${recruitId}:${userId}`);
    console.log(queue);

    // 안읽은 메시지들 전송
    queue.process((message: any) => {
      socket.emit('server_sent_unread', message);
    });

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
    const queueList = await this.queueService.getQueueList(
      recruitId.toString(),
    );
    const chat = new Chat();
    chat.sender = userId;
    chat.recruitId = recruitId;
    chat.content = content;
    const addWork = [];
    queueList.map((queue: Bull.Queue) => {
      addWork.push(queue.add(chat));
    });
    Promise.all(addWork);
    await this.socketService.saveRecentMessage(chat);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket): Promise<void> {
    // 클라이언트 측에서 아래 두 정보를 보내주어야 함.
    const { recruitId, userId } = await this.socketService.getCacheData(
      socket.id,
    );
    const queue = await this.queueService.getQueue(`${recruitId}:${userId}`);
    queue.pause();
    await this.socketService.delCacheData(socket.id);
  }
}
