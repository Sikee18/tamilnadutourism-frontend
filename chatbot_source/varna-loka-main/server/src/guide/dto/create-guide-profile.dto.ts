import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateGuideProfileDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    place: string;

    @IsString()
    @IsNotEmpty()
    qualification: string;

    @IsString()
    @IsOptional()
    experience?: string;

    @IsString()
    @IsOptional()
    languagesKnown?: string;
}

export class UpdateGuideProfileDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    place?: string;

    @IsString()
    @IsOptional()
    qualification?: string;

    @IsString()
    @IsOptional()
    experience?: string;

    @IsString()
    @IsOptional()
    languagesKnown?: string;
}
