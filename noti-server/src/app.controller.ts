import {
  Body,
  ConsoleLogger,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('job')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 모집글을 게시자가 취소
  @Post('recruit/delete')
  async deleteRecruit(@Body() body: any) {
    const { recruitId } = body;
    const jobDto = this.appService.createCancelMessage(body) as any;

    await this.appService.deleteDelayedJob(recruitId, jobDto.email);
    await this.appService.addJobToImmediateQ(jobDto);
    return { statusCode: 201 };
  }

  @Post('join/delete')
  async deleteJoin(@Body() body: any) {
    const { recruitId, user } = body;
    body.users = [user];
    const jobDto = this.appService.createCancelMessage(body);
    await this.appService.deleteDelayedJob(recruitId, user.email);
    await this.appService.addJobToImmediateQ(jobDto);
    return { statusCode: 201 };
  }

  // 모집글에 참여자가 참여
  @Post('join')
  async addJobJoin(@Body() body: any) {
    const { recruitId, user } = body;
    const jobDto = this.appService.createRecruitMessage(body);
    const delay = this.appService.getDelayTime(body.startTime);
    if (delay === 0) {
      await this.appService.addJobToImmediateQ(jobDto);
      return { statusCode: 201 };
    }

    const { id } = await this.appService.addJobToDelayedQ(jobDto, delay);
    const key = this.appService.objToStr({ recruitId, email: user.email });
    this.appService.setCacheData(key, id);
    return { statusCode: 201 };
  }

  // 회원가입
  @Post('signup')
  async addJobSignUp(@Body() body: any) {
    const jobDto = this.appService.createSignUpMessage(body);
    await this.appService.addJobToImmediateQ(jobDto);
    return { statusCode: 201 };
  }

  // 모집글을 게시자가 등록
  @Post('recruit')
  async addJobRecruit(@Body() body: any) {
    const { recruitId, author } = body;
    const jobDto = this.appService.createRecruitMessage(body);
    const delay = this.appService.getDelayTime(body.startTime);

    if (delay === 0) {
      await this.appService.addJobToImmediateQ(jobDto);
      return { statusCode: 201 };
    }

    const { id } = await this.appService.addJobToDelayedQ(jobDto, delay);
    const key = this.appService.objToStr({ recruitId, email: author.email });
    this.appService.setCacheData(key, id);
    return { statusCode: 201 };
  }
}
