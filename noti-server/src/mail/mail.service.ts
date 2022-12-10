import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendEmail(
    type: string,
    email: string | Array<string>,
    data: any,
  ): Promise<void> {
    console.log(type, email, data);
    try {
      const { subject, template } = this.getTemplate(type);

      await this.mailService.sendMail({
        from: 'admin@runwithme.co.kr',
        to: email,
        subject,
        template,
        context: data,
      });
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  getTemplate(type: string) {
    if (type === 'signup') {
      return {
        subject: 'RunWithMe: 회원가입을 환영합니다.',
        template: 'signup',
      };
    }

    if (type === 'recruit') {
      return {
        subject: 'RunWithMe: 회원님이 참여중인 러닝 모임이 곧 시작됩니다!',
        template: 'recruit',
      };
    }

    if (type === 'cancel') {
      return {
        subject: 'RunWithMe: 회원님이 참여중인 모집이 취소되었어요...',
        template: 'cancel',
      };
    }
  }
}
