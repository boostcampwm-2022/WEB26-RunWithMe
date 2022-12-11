import { Delete, Get, Inject, Injectable, Post } from '@nestjs/common';
import { ManagerService } from './queue-manager/manager.service';

@Injectable()
export class SocketController {
  constructor(@Inject() private managerService: ManagerService) {}

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

  // @Post('chat')
  // async addChat() {}

  // @Get('chat')
  // async getChat() {}
}
