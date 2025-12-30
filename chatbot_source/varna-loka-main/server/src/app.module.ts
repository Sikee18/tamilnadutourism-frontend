import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { DestinationsModule } from './destinations/destinations.module';
import { GuideModule } from './guide/guide.module';
import { ShopkeeperModule } from './shopkeeper/shopkeeper.module';
import { UserContextModule } from './user-context/user-context.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    AuthModule,
    DestinationsModule,
    ShopkeeperModule,
    GuideModule,
    ChatBotModule,
    UserContextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
