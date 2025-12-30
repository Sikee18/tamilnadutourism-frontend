import { Controller, Post, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ShopkeeperService } from './shopkeeper.service';
import { ApplyPromoDto, MarkPaidDto, CreateShopkeeperProfileDto } from './dto/shopkeeper.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { User } from '../auth/user.decorator';

@Controller('promo')
export class PromoController {
    constructor(private readonly shopkeeperService: ShopkeeperService) { }

    @Post('apply')
    @Roles('USER', 'SHOPKEEPER', 'GUIDE', 'ADMIN') // Assuming all authenticated users can apply? Or just USER? Prompt says "USER".
    @UseGuards(RolesGuard)
    async applyPromo(@User() user: any, @Body() applyPromoDto: ApplyPromoDto) {
        return this.shopkeeperService.applyPromo(user, applyPromoDto);
    }
}

@Controller('shopkeeper')
@UseGuards(RolesGuard)
export class ShopkeeperController {
    constructor(private readonly shopkeeperService: ShopkeeperService) { }

    @Post('profile')
    @Roles('SHOPKEEPER')
    async createProfile(@User() user: any, @Body() dto: CreateShopkeeperProfileDto) {
        return this.shopkeeperService.createProfile(user, dto);
    }

    @Get('profile')
    @Roles('SHOPKEEPER')
    async getProfile(@User() user: any) {
        return this.shopkeeperService.getProfile(user.id);
    }


    @Get('promo/users')
    @Roles('SHOPKEEPER') // Specifically for Shopkeeper subtype, verified in service or guard?
    // Guard checks 'SHOPKEEPER', but service checks DB for 'shopkeeper' entry.
    async getPromoUsers(@User() user: any) {
        return this.shopkeeperService.getPromoUsers(user);
    }

    @Patch('promo/mark-paid')
    @Roles('SHOPKEEPER')
    async markPaid(@User() user: any, @Body() markPaidDto: MarkPaidDto) {
        return this.shopkeeperService.markUserPaid(user, markPaidDto.userId);
    }
}
