import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ManagerService } from './queue-manager/manager.service';
import { SocketService } from './socket.service';

type BodyDto = {
  recruitId: number;
  userId: string;
};
@Controller()
export class SocketController {
  constructor(
    private managerService: ManagerService,
    private socketService: SocketService,
  ) {}

  @Get('test')
  async test() {
    await this.socketService.test();
  }
  // `1:June1010`
  // POST localhost:8080/queue {recruitId, userId}
  @Post('queue')
  async generateQueue(@Body() bodyDto: BodyDto) {
    console.log(bodyDto);
    const { recruitId, userId } = bodyDto;
    await this.managerService.generateQueue(`${recruitId}:${userId}`);
    return { statusCode: 201 };
  }

  // POST localhost:8080/queue/delete {recruitId, userId}
  @Post('queue/delete')
  async deleteQueue(@Body() bodyDto: BodyDto) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.deleteQueue(`${recruitId}:${userId}`);
    return { statusCode: 201 };
  }
}
