import { Injectable, BadRequestException, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ApplyPromoDto, CreateShopkeeperProfileDto } from './dto/shopkeeper.dto';

@Injectable()
export class ShopkeeperService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async createProfile(user: any, dto: CreateShopkeeperProfileDto) {
        const client = this.supabaseService.getClient();

        // Check if profile exists
        const { data: existing } = await client
            .from('shopkeepers')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();

        if (existing) {
            throw new ConflictException('Shopkeeper profile already exists');
        }

        const { data, error } = await (client
            .from('shopkeepers') as any)
            .insert({
                user_id: user.id,
                shop_name: dto.shopName,
                promo_code: dto.promoCode,
                location: dto.location
            })
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return data;
    }

    async getProfile(userId: string) {
        const { data, error } = await this.supabaseService.getClient()
            .from('shopkeepers')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error || !data) {
            throw new NotFoundException('Shopkeeper profile not found');
        }

        return data;
    }

    async applyPromo(user: any, applyPromoDto: ApplyPromoDto) {
        const { promoCode } = applyPromoDto;
        const client = this.supabaseService.getClient();

        // 1. Validate Promo Code & Get Shopkeeper
        const { data: shopkeeper, error: shopError } = await client
            .from('shopkeepers')
            .select('id, shop_name')
            .eq('promo_code', promoCode)
            .single();

        if (shopError || !shopkeeper) {
            throw new BadRequestException('Invalid promo code');
        }

        // 2. Check if already applied
        const { data: existingUsage } = await client
            .from('promo_usages')
            .select('id')
            .eq('user_id', user.id)
            .eq('promo_code', promoCode)
            .maybeSingle();

        if (existingUsage) {
            throw new ConflictException('Promo code already applied');
        }

        // 3. Apply Promo
        const { error: insertError } = await (client
            .from('promo_usages') as any)
            .insert({
                promo_code: promoCode,
                shopkeeper_id: (shopkeeper as any).id,
                user_id: user.id,
                username: user.email, // Using email as username/identifier
            });

        if (insertError) {
            // Handle potential race condition or other DB errors
            throw new InternalServerErrorException('Failed to apply promo code');
        }

        return { message: `${(shopkeeper as any).shop_name}_promo_applied` };
    }

    async getPromoUsers(shopkeeperUser: any) {
        const client = this.supabaseService.getClient();

        // 1. Get Shopkeeper ID for the logged-in SHOPKEEPER
        const { data: shopkeeper, error: shopError } = await client
            .from('shopkeepers')
            .select('id')
            .eq('user_id', shopkeeperUser.id)
            .single();

        if (shopError || !shopkeeper) {
            throw new NotFoundException('Shopkeeper profile not found for this user');
        }

        // 2. Fetch Users
        const { data: users, error: usersError } = await client
            .from('promo_usages')
            .select('*')
            .eq('shopkeeper_id', (shopkeeper as any).id);

        if (usersError) {
            throw new InternalServerErrorException('Failed to fetch promo users');
        }

        return users;
    }

    async markUserPaid(shopkeeperUser: any, targetUserId: string) {
        const client = this.supabaseService.getClient();

        // 1. Get Shopkeeper ID
        const { data: shopkeeper, error: shopError } = await client
            .from('shopkeepers')
            .select('id')
            .eq('user_id', shopkeeperUser.id)
            .single();

        if (shopError || !shopkeeper) {
            throw new NotFoundException('Shopkeeper profile not found for this user');
        }

        // 2. Check if usage exists
        const { data: usage, error: usageError } = await client
            .from('promo_usages')
            .select('*')
            .eq('shopkeeper_id', (shopkeeper as any).id)
            .eq('user_id', targetUserId)
            .single();

        if (usageError || !usage) {
            throw new NotFoundException('Promo usage not found for this user');
        }

        if ((usage as any).is_paid) {
            throw new ConflictException('User is already marked as paid');
        }

        // 3. Mark as Paid
        const { error: updateError } = await (client
            .from('promo_usages') as any)
            .update({
                is_paid: true,
                paid_at: new Date().toISOString()
            })
            .eq('id', (usage as any).id);

        if (updateError) {
            throw new InternalServerErrorException('Failed to mark user as paid');
        }

        return { message: 'User marked as paid successfully' };
    }
}
