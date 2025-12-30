import { IsString, IsNotEmpty } from 'class-validator';

export class ChatBotDto {
    @IsString()
    @IsNotEmpty()
    prompt: string;
}
