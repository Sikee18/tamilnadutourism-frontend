import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsEnum, Min } from 'class-validator';

export class CreateTourDto {
    @IsString()
    @IsNotEmpty()
    tourName: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    duration: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
    maxParticipants?: number;

    @IsDateString()
    @IsNotEmpty()
    startDate: string;

    @IsDateString()
    @IsNotEmpty()
    endDate: string;

    @IsOptional()
    @IsString({ each: true })
    placesCovered?: string[];
}
