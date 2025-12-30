import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserContextService } from './user-context.service';

@Controller('user-context')
export class UserContextController {
    constructor(private readonly userContextService: UserContextService) { }

    @Post('init')
    async initContext(@Body('userId') userId: string) {
        return this.userContextService.initializeContext(userId);
    }

    @Post('update')
    async updateContext(@Body() body: { userId: string; path: string; data?: any }) {
        return this.userContextService.updateContext(body.userId, {
            currentPath: body.path,
            ...body.data
        });
    }

    @Get(':userId')
    async getContext(@Param('userId') userId: string) {
        return this.userContextService.getContext(userId);
    }
}
