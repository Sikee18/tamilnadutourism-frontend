import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { DestinationsService } from './destinations.service.js';

@Controller('rerouting')
export class DestinationsController {
    constructor(private readonly destinationsService: DestinationsService) { }

    @Post()
    async reroute(@Body('place') place: string) {
        if (!place) throw new BadRequestException('Place is required');
        return this.destinationsService.findSimilarDestinations(place);
    }
}
