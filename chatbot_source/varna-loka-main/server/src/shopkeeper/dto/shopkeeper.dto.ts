import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class ApplyPromoDto {
    @IsString()
    @IsNotEmpty()
    promoCode: string;
}

export class MarkPaidDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}

export class CreateShopkeeperProfileDto {
    @IsString()
    @IsNotEmpty()
    shopName: string;

    @IsString()
    @IsNotEmpty()
    promoCode: string;

    @IsString()
    @IsNotEmpty()
    location: string;
}
