import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from "nodemailer"
import { ConfigService } from '@nestjs/config';


@Injectable()
export class NotificationService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.configService.getOrThrow('EMAIL_USERNAME'),
      pass: this.configService.getOrThrow('EMAIL_PASSWORD'),
    },
    ignoreTLS: false,
  });

  constructor(private readonly configService: ConfigService) { }

  async notifyEmail({ email }: NotifyEmailDto) {
    try {
      console.log(email)
      await this.transporter.sendMail({
        from : this.configService.getOrThrow('EMAIL_USERNAME'),
        to :"mahdi.jz.v@gmail.com",
        subject : "Notification",
        text : "Some text" 

      })
    } catch (error) {
      throw error
    }
  }
}
