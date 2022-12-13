import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from './common/entities/chat.entity';
import { SocketService } from './socket.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
    credential: true,
  },
})
export class SocketGateway implements OnGatewayDisconnect {
  constructor(private socketService: SocketService) {}

  @WebSocketServer() public server: Server;

  @SubscribeMessage('join')
  async handleLogin(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const { recruitId } = data;
    socket.join(recruitId.toString()); // room에 입장
    await this.socketService.setCacheData(socket.id, data);
    const recentMsg = await this.socketService.getRecentMessage(recruitId);
    socket.emit('server_sent_recent', recentMsg);
  }

  @SubscribeMessage('client_sent')
  async handleEvent(
    @MessageBody() data: { content: string },
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const { content } = data;
    const { userId, recruitId } = await this.socketService.getCacheData(
      socket.id,
    );
    const chat = new Chat();
    chat.sender = userId;
    chat.recruitId = recruitId;
    chat.content = content;
    chat.createdAt = new Date();
    this.server
      .in(recruitId.toString())
      .emit('server_sent', await this.socketService.saveRecentMessage(chat));
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket): Promise<void> {
    await this.socketService.delCacheData(socket.id);
  }
  async handleConnection(@ConnectedSocket() socket: Socket): Promise<void> {
    await this.socketService.delCacheData(socket.id);
  }
}
