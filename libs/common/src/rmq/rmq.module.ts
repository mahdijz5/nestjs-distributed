import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RmqService } from './rmq.service';

@Module({
    providers: [RmqService],
    exports: [RmqService],
})
export class RmqModule {
    static register(name: string[], url?: string): DynamicModule {
        let list = []
        
        for(let item of name) {
            list.push(
                ClientsModule.registerAsync([
                    {
                        name : item,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [url ? configService.getOrThrow<string>(url) : configService.getOrThrow<string>('RABBITMQ_URL')],
                                queue: item,
                            },
                        }),
                        inject: [ConfigService],
                    },
                ]),    
            )
        }
        return {
            module: RmqModule,
            imports: [
               ...list
            ],
            exports: [ClientsModule],
        };
    }
}
