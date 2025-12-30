import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { TAMIL_NADU_KNOWLEDGE } from './data/tamil-nadu-knowledge';
import { UserContextService } from '../user-context/user-context.service';

@Injectable()
export class ChatBotService {
    private groq: Groq;
    private readonly logger = new Logger(ChatBotService.name);


    constructor(
        private configService: ConfigService,
        private userContextService: UserContextService
    ) {
        this.groq = new Groq({
            apiKey: this.configService.get<string>('GROQ_API_KEY'),
        });
    }


    async chat(prompt: string, userId?: string): Promise<{ message: string }> {
        try {
            if (!prompt) {
                throw new Error('Prompt is required');
            }


            // Retrieve Context
            let systemContext = TAMIL_NADU_KNOWLEDGE;
            if (userId) {
                const context = this.userContextService.getContext(userId);

                const globalInfo = JSON.stringify(context.global || {});
                const userInfo = context.user ?
                    `User Profile: ${JSON.stringify(context.user.profile)}. Current Location: ${context.user.currentPath}` :
                    "User context not found.";

                systemContext += `\n\n[REAL-TIME APP CONTEXT]\nGlobal Data: ${globalInfo}\nUser Status: ${userInfo}\nIf the user is lost or asks about the current page, use the 'Current Location' to guide them.`;
            }

            const messages: any[] = [
                {
                    role: 'system',
                    content: systemContext + "\n\nIMPORTANT: You are 'Dhisai', the official AI guide for Tamil Nadu Tourism. Speak in clear, standard English suitable for international tourists. Do NOT use Tamil slang or Tanglish. Ensure your language is universally understood, polite, and formal.",
                },
                {
                    role: 'user',
                    content: prompt
                }
            ];

            const chatCompletion = await this.groq.chat.completions.create({
                messages: messages,
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 1024,
            });

            const assistantMessage =
                chatCompletion.choices[0]?.message?.content ||
                'Sorry, I could not generate a response.';

            return { message: assistantMessage };
        } catch (error) {
            this.logger.error('Chat API Error:', error);
            throw error;
        }
    }
}
