import { Module } from '@nestjs/common';
import { ShopkeeperController, PromoController } from './shopkeeper.controller';
import { ShopkeeperService } from './shopkeeper.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
    imports: [SupabaseModule],
    controllers: [ShopkeeperController, PromoController],
    providers: [ShopkeeperService],
})
export class ShopkeeperModule { }
