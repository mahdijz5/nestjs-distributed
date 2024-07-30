import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERN, NotificationServiceController, NotificationServiceControllerMethods } from '@app/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController{
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(MESSAGE_PATTERN.NOTIFICATION.NOTIFY_EMAIL)
  async notifyEmail(data : NotifyEmailDto)  {
    return this.notificationService.notifyEmail({email :data.email,text :data.text});
  }
}
