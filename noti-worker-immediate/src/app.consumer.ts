import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail/mail.service';

@Processor('immediate')
export class ImmediateConsumer {
  constructor(private mailService: MailService) {}
  private readonly logger = new Logger(ImmediateConsumer.name);

  @Process()
  getMessageQueue(job: Job) {
    const { type, email, data } = job.data;
    this.mailService.sendEmail(type, email, data);
    return;
  }
}
