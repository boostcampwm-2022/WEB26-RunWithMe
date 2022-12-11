import { CacheModule, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './common/schemas/chat.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    CacheModule.register({
      ttl: 0,
    }),
  ],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
