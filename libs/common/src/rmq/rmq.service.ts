import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) {}

    getOptions(queue: string, noAck = true): any     {
        return {
            transport: Transport.GRPC,
             options :{
                
             }
            
        };
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
}
