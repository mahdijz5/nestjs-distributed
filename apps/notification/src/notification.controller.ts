import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERN } from '@app/common';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(MESSAGE_PATTERN.NOTIFICATION.NOTIFY_EMAIL)
  async notifyEmail(@Payload("email") email : string)  {
    return this.notificationService.notifyEmail({email});
  }
}
