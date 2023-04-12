import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ManagerService } from './queue-manager/manager.service';
import { SocketService } from './socket.service';
import { GetChatDto, GetChatsDto, ChatHistoryDto } from './common/types';

@Controller()
export class SocketController {
  constructor(
    private managerService: ManagerService,
    private socketService: SocketService,
  ) {}

  // @Get('chat')
  // async getRecentMessage(@Query() bodyDto: ChatHistoryDto) {
  //   const { userId, recruitId, page, paused } = bodyDto;
  //   const unReadCount =
  //     this.managerService.getUnReadCount(`${recruitId}:${userId}`) ||
  //     Number(paused);

  //   const data = await this.socketService.getRecentMessage(
  //     parseInt(recruitId),
  //     page,
  //     unReadCount,
  //   );
  //   return {
  //     statusCode: 200,
  //     data,
  //   };
  // }

  @Get('unread')
  async getUnreadMessage(@Query() bodyDto: GetChatDto) {
    const { recruitId, userId } = bodyDto;
    const queue = this.managerService.getQueue(`${recruitId}:${userId}`);

    if (queue === undefined) {
      console.log(`GET unread/ ${recruitId}:${userId}: Queue is not defined!`);
      return { statusCode: 201, data: { paused: 0 } };
    }

    const response = (await queue.getJobCounts()) as any;
    console.log(`GET unread/ ${recruitId}:${userId}: ${response.paused}`);
    return { statusCode: 201, data: { paused: response.paused } };
  }

  // POST localhost:8080/queue {recruitId, userId}
  @Post('queue')
  async generate(@Body() bodyDto: GetChatDto) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.generateQueue(`${recruitId}:${userId}`);
    return { statusCode: 201 };
  }

  // POST localhost:8080/queue/delete/one {recruitId, userId}
  @Post('queue/delete/one')
  async deleteOne(@Body() bodyDto: GetChatDto) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.deleteOneQueue(`${recruitId}:${userId}`);
    return { statusCode: 201 };
  }

  // POST localhost:8080/queue/delete/many {recruitId}
  @Post('queue/delete/many')
  async deleteMany(@Body() bodyDto: GetChatsDto) {
    const { recruitId } = bodyDto;
    await this.managerService.deleteManyQueue(recruitId);
    return { statusCode: 201 };
  }
}
