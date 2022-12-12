import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ManagerService } from './queue-manager/manager.service';
import { SocketService } from './socket.service';

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
  @Post('queue')
  async generateQueue(bodyDto: any) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.generateQueue(`${recruitId}:${userId}`);
  }

  @Delete('queue')
  async deleteQueue(bodyDto: any) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.deleteQueue(`${recruitId}:${userId}`);
  }
}
