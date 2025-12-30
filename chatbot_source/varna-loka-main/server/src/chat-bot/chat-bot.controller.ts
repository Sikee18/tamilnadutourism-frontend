import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { ChatBotDto } from './dto/chat-bot.dto';

@Controller('chat-bot')
export class ChatBotController {
    constructor(private readonly chatBotService: ChatBotService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async chat(@Body() body: ChatBotDto & { userId?: string }) {
        // The requirement is input body { "prompt": "perform a search" }
        // We extend it to optionally accept userId for context
        return this.chatBotService.chat(body.prompt, body.userId);
    }
}
