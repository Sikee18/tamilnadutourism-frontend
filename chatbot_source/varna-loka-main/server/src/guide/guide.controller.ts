import { Controller, Get, Post, Body, Param, UseGuards, Patch, Query, BadRequestException } from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { CreateGuideProfileDto, UpdateGuideProfileDto } from './dto/create-guide-profile.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { User } from '../auth/user.decorator';

@Controller('guide')
@UseGuards(RolesGuard)
export class GuideController {
    constructor(private readonly guideService: GuideService) { }

    @Get('profile')
    @Roles('GUIDE')
    async getProfile(@User() user: any) {
        return this.guideService.getProfile(user.id);
    }

    @Post('profile')
    @Roles('GUIDE')
    async createProfile(@User() user: any, @Body() createGuideProfileDto: CreateGuideProfileDto) {
        return this.guideService.createProfile(user.id, createGuideProfileDto);
    }

    @Patch('profile')
    @Roles('GUIDE')
    async updateProfile(@User() user: any, @Body() updateGuideProfileDto: UpdateGuideProfileDto) {
        return this.guideService.updateProfile(user.id, updateGuideProfileDto);
    }

    @Post('tours')
    @Roles('GUIDE')
    async createTour(@User() user: any, @Body() createTourDto: CreateTourDto) {
        return this.guideService.createTour(user.id, createTourDto);
    }

    @Get('users')
    @Roles('GUIDE')
    async searchUsers(@Query('q') query: string) {
        if (!query) {
            throw new BadRequestException('Search query is required');
        }
        return this.guideService.searchUsers(query);
    }

    @Get('available-tours')
    @Roles('USER')
    async getAvailableTours(@User() user: any) {
        return this.guideService.getAvailableTours(user.id);
    }

    @Get('tours')
    @Roles('GUIDE')
    async getMyTours(@User() user: any) {
        return this.guideService.getMyTours(user.id);
    }

    @Get('tours/:tourId/users')
    @Roles('GUIDE')
    async getTourEnrollments(@User() user: any, @Param('tourId') tourId: string) {
        return this.guideService.getTourEnrollments(user.id, tourId);
    }
}
