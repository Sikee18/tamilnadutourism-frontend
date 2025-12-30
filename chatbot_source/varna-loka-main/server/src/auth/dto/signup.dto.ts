import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional } from 'class-validator';

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsOptional()
    role?: 'ADMIN' | 'SHOPKEEPER' | 'GUIDE' | 'USER';
}
