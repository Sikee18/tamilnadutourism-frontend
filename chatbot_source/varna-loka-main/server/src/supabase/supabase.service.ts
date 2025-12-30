import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { Database } from './database.types';

@Injectable()
export class SupabaseService implements OnModuleInit {
    private supabase: SupabaseClient<Database>;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        this.supabase = createClient<Database>(
            this.configService.get<string>('SUPABASE_URL')!,
            this.configService.get<string>('SUPABASE_KEY')!,
            {
                auth: {
                    persistSession: false,
                    detectSessionInUrl: false,
                },
            },
        );
    }

    getClient(): SupabaseClient<Database> {
        return this.supabase;
    }
}
