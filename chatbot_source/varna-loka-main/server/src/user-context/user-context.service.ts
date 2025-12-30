import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface UserContext {
    userId: string;
    currentPath: string;
    lastActive: Date;
    profile?: any;
    // Add other relevant runtime data here
}

@Injectable()
export class UserContextService implements OnModuleInit {
    private readonly logger = new Logger(UserContextService.name);

    // In-memory stores
    private globalContext: any = {};
    private userContexts = new Map<string, UserContext>();

    constructor(private readonly supabaseService: SupabaseService) { }

    async onModuleInit() {
        await this.loadGlobalContext();
    }

    private async loadGlobalContext() {
        try {
            // Casting to any to bypass strict checks for new table
            const { data, error } = await (this.supabaseService.getClient()
                .from('system_contexts' as any)
                .select('data')
                .eq('key', 'app_knowledge_base')
                .single() as any);

            if (error) {
                this.logger.warn(`Failed to load global context: ${error.message}`);
                // Fallback or empty
                this.globalContext = { note: "Global context not loaded from DB" };
            } else if (data) {
                this.globalContext = data.data;
                this.logger.log('Global App Context loaded successfully');
            }
        } catch (err) {
            this.logger.error('Error loading global context', err);
        }
    }

    async initializeContext(userId: string) {
        if (this.userContexts.has(userId)) {
            return this.userContexts.get(userId);
        }

        // Fetch user details from Supabase
        const { data: profile, error } = await this.supabaseService.getClient()
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            this.logger.error(`Failed to fetch profile for ${userId}: ${error.message}`);
        }

        const initialContext: UserContext = {
            userId,
            currentPath: '/',
            lastActive: new Date(),
            profile: profile || null,
        };

        this.userContexts.set(userId, initialContext);
        this.logger.log(`Initialized context for user ${userId}`);
        return initialContext;
    }

    async updateContext(userId: string, update: Partial<UserContext>) {
        let context = this.userContexts.get(userId);
        if (!context) {
            context = await this.initializeContext(userId);
        }

        // Update in-memory
        if (context) {
            const updatedContext: UserContext = {
                ...context,
                ...update,
                userId, // explicit assignment to satisfy type
                lastActive: new Date()
            };
            this.userContexts.set(userId, updatedContext);
            return updatedContext;
        }
        return null;
    }

    getContext(userId: string) {
        return {
            global: this.globalContext,
            user: this.userContexts.get(userId) || null,
        };
    }

    async syncGlobalContext(newContextData: any) {
        // Update in-memory
        this.globalContext = { ...this.globalContext, ...newContextData };

        // Push to Supabase
        const { error } = await (this.supabaseService.getClient()
            .from('system_contexts' as any)
            .upsert({
                key: 'app_knowledge_base',
                data: this.globalContext,
                updated_at: new Date().toISOString()
            } as any) as any);

        if (error) {
            this.logger.error(`Failed to sync global context: ${error.message}`);
            throw error;
        }
        this.logger.log('Synced global context to Supabase');
    }
}
