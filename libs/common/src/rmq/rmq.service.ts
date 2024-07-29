import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) {}

    getOptions(queue: string, noAck = true): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.getOrThrow<string>('RABBITMQ_URL')],
                queue,
                noAck,
                persistent: true,
                
            },  
            
        };
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
}
