import { CacheModule, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './common/schemas/chat.schema';
import { BullModule } from '@nestjs/bull';
import { ManagerModule } from './queue-manager/manager.module';

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
    ManagerModule,
    BullModule.forRoot({
      redis: {
        host: 'redis-server',
        port: 6379,
      },
    }),
  ],
  controllers: [SocketController],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
