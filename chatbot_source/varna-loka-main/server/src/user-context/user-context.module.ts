import { Module } from '@nestjs/common';
import { UserContextController } from './user-context.controller';
import { UserContextService } from './user-context.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
    imports: [SupabaseModule],
    controllers: [UserContextController],
    providers: [UserContextService],
    exports: [UserContextService],
})
export class UserContextModule { }
