import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ManagerService } from './queue-manager/manager.service';
import { SocketService } from './socket.service';

type BodyDto = {
  recruitId: string;
  userId?: string;
};
@Controller()
export class SocketController {
  constructor(
    private managerService: ManagerService,
    private socketService: SocketService,
  ) {}

  @Get('chat')
  async getRecentMessage(@Query() bodyDto: any) {
    const { userId, recruitId, page } = bodyDto;
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

  @Get('unread')
  async getUnreadMessage(@Query() bodyDto: BodyDto) {
    const { recruitId, userId } = bodyDto;
    const queue = this.managerService.getQueue(`${recruitId}:${userId}`);
    const { waiting } = await queue.getJobCounts();
    return { statusCode: 201, data: { waiting } };
  }

  // POST localhost:8080/queue {recruitId, userId}
  @Post('queue')
  async generate(@Body() bodyDto: BodyDto) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.generateQueue(`${recruitId}:${userId}`);
    return { statusCode: 201 };
  }

  // POST localhost:8080/queue/delete/one {recruitId, userId}
  @Post('queue/delete/one')
  async deleteOne(@Body() bodyDto: BodyDto) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.deleteOneQueue(`${recruitId}:${userId}`);
    return { statusCode: 201 };
  }

  // POST localhost:8080/queue/delete/many {recruitId}
  @Post('queue/delete/many')
  async deleteMany(@Body() bodyDto: BodyDto) {
    const { recruitId } = bodyDto;
    await this.managerService.deleteManyQueue(recruitId);
    return { statusCode: 201 };
  }
}
