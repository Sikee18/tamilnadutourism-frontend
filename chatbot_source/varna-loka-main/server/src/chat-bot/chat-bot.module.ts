import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatBotController } from './chat-bot.controller';
import { ChatBotService } from './chat-bot.service';

import { UserContextModule } from '../user-context/user-context.module';

@Module({
    imports: [ConfigModule, UserContextModule],
    controllers: [ChatBotController],
    providers: [ChatBotService],
})
export class ChatBotModule { }
