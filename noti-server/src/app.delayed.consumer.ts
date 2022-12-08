import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail/mail.service';

@Processor('delayed')
export class DelayedConsumer {
  constructor(private mailService: MailService) {}
  private readonly logger = new Logger(DelayedConsumer.name);

  @Process()
  getMessageQueue(job: Job) {
    const { type, email, data } = job.data;
    this.mailService.sendEmail(type, email, data);
    return;
  }
}
