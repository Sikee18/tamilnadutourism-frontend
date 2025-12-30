import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class DestinationsService implements OnModuleInit {
    private readonly logger = new Logger(DestinationsService.name);
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(
        private readonly configService: ConfigService,
        private readonly supabaseService: SupabaseService,
    ) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
            this.logger.error('GEMINI_API_KEY is not defined in environment variables');
        } else {
            this.genAI = new GoogleGenerativeAI(apiKey);
            // Using text-embedding-004 as it is a performant and capable model for embeddings
            this.model = this.genAI.getGenerativeModel({ model: "text-embedding-004" });
        }
    }

    async onModuleInit() {
        if (this.genAI) {
            await this.initializeEmbeddings();
        }
    }

    async initializeEmbeddings() {
        const supabase = this.supabaseService.getClient();
        // Fetch destinations where embedding is null
        const { data, error } = await supabase
            .from('destinations')
            .select('id, description')
            .is('embedding', null);

        const destinations = data as any[];

        if (error) {
            this.logger.error('Error fetching destinations:', error);
            return;
        }

        if (!destinations || destinations.length === 0) {
            this.logger.log('No pending embeddings to generate.');
            return;
        }

        this.logger.log(`Found ${destinations.length} destinations without embeddings. Generating now...`);

        for (const dest of destinations) {
            if (!dest.description) {
                this.logger.warn(`Destination ${dest.id} has no description, skipping embedding generation.`);
                continue;
            }
            try {
                const embedding = await this.generateEmbedding(dest.description);
                const { error: updateError } = await (supabase
                    .from('destinations') as any)
                    .update({ embedding })
                    .eq('id', dest.id);

                if (updateError) {
                    this.logger.error(`Failed to update embedding for ${dest.id}:`, updateError);
                } else {
                    this.logger.log(`Generated and saved embedding for destination ${dest.id}`);
                }
                // Rate limiting safety measure (optional but good practice)
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (e) {
                this.logger.error(`Failed to generate embedding for ${dest.id}`, e);
            }
        }
    }

    async generateEmbedding(text: string): Promise<number[]> {
        if (!this.model) {
            throw new Error('Gemini model not initialized. Check API Key.');
        }
        const result = await this.model.embedContent(text);
        return result.embedding.values;
    }

    async findSimilarDestinations(query: string) {
        try {
            const embedding = await this.generateEmbedding(query);

            this.logger.log(`Generated embedding for query: "${query}"`);
            this.logger.log(`Embedding length: ${embedding.length}`);

            if (embedding.length !== 768) {
                this.logger.warn(`Warning: Embedding length is ${embedding.length}, expected 768. This might cause the RPC call to fail if the vector column is vector(768).`);
            }

            const rpcPayload = {
                payload: {
                    query_embedding: embedding,
                    match_threshold: 0.5,
                    match_count: 5
                }
            };

            this.logger.log('Calling RPC match_destinations with payload structure (data omitted for brevity)...');

            const supabase = this.supabaseService.getClient();

            // Call the RPC function 'match_destinations'
            // The object passed here is mapped to named arguments.
            // Function arg is 'payload', so we pass { payload: { ... } }
            const { data, error } = await supabase.rpc('match_destinations', rpcPayload as any);

            if (error) {
                this.logger.error('Error during vector search RPC:', JSON.stringify(error, null, 2));
                this.logger.error(`RPC Payload Keys: ${Object.keys(rpcPayload).join(', ')}`);
                throw new Error(`Vector search failed: ${error.message} - Hint: Ensure the function 'match_destinations' exists in Supabase, takes (vector, float, int), and Schema Cache is reloaded.`);
            }

            return data;
        } catch (e) {
            this.logger.error('Error in findSimilarDestinations', e);
            throw e;
        }
    }
}
