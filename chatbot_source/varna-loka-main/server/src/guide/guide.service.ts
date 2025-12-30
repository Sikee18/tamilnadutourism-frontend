import { Injectable, NotFoundException, ForbiddenException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { CreateGuideProfileDto, UpdateGuideProfileDto } from './dto/create-guide-profile.dto';
import { CreateInterestDto } from './dto/create-interest.dto';

@Injectable()
export class GuideService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async getProfile(userId: string) {
        const client = this.supabaseService.getClient();

        const { data: guide, error } = await client
            .from('guides' as any)
            .select('*')
            .eq('user_id', userId)
            .maybeSingle(); // Changed to maybeSingle to handle null gracefully

        if (error) {
            throw new InternalServerErrorException('Error fetching guide profile');
        }

        return guide;
    }

    async createProfile(userId: string, createGuideProfileDto: CreateGuideProfileDto) {
        const client = this.supabaseService.getClient();

        // Check if profile exists
        const existingProfile = await this.getProfile(userId);
        if (existingProfile) {
            throw new BadRequestException('Guide profile already exists');
        }

        const { data: guide, error } = await (client
            .from('guides' as any) as any)
            .insert({
                user_id: userId,
                name: createGuideProfileDto.name,
                place: createGuideProfileDto.place,
                qualification: createGuideProfileDto.qualification,
                experience: createGuideProfileDto.experience,
                languages_known: createGuideProfileDto.languagesKnown,
                verified: false, // Default to unverified
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating guide profile:', error);
            throw new InternalServerErrorException('Failed to create guide profile');
        }

        return guide;
    }

    async updateProfile(userId: string, updateGuideProfileDto: UpdateGuideProfileDto) {
        const client = this.supabaseService.getClient();

        // Check if profile exists
        const existingProfile = await this.getProfile(userId);
        if (!existingProfile) {
            throw new NotFoundException('Guide profile not found');
        }

        const { data: guide, error } = await (client
            .from('guides' as any) as any)
            .update({
                name: updateGuideProfileDto.name,
                place: updateGuideProfileDto.place,
                qualification: updateGuideProfileDto.qualification,
                experience: updateGuideProfileDto.experience,
                languages_known: updateGuideProfileDto.languagesKnown,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException('Failed to update guide profile');
        }

        return guide;
    }

    async createTour(userId: string, createTourDto: CreateTourDto) {
        const client = this.supabaseService.getClient();

        // 1. Get Guide ID
        const guide = await this.getProfile(userId); // Reuses check

        // 2. Create Tour
        const { data: tour, error } = await (client
            .from('tours' as any) as any)
            .insert({
                guide_id: (guide as any).id,
                tour_name: createTourDto.tourName,
                location: createTourDto.location,
                description: createTourDto.description,
                duration: createTourDto.duration,
                max_participants: createTourDto.maxParticipants || 20,
                start_date: createTourDto.startDate,
                end_date: createTourDto.endDate,
                places_covered: createTourDto.placesCovered || [],
                status: 'OPEN',
            })
            .select()
            .single();

        if (error) {
            console.log('Error creating tour:', error);
            throw new InternalServerErrorException('Failed to create tour');
        }

        return tour;
    }

    async getMyTours(userId: string) {
        const client = this.supabaseService.getClient();

        // 1. Get Guide ID
        const guide = await this.getProfile(userId);

        // 2. Fetch Tours
        const { data: tours, error } = await client
            .from('tours' as any)
            .select('*')
            .eq('guide_id', (guide as any).id);

        if (error) {
            throw new InternalServerErrorException('Failed to fetch tours');
        }

        return tours;
    }

    async getTourEnrollments(userId: string, tourId: string) {
        const client = this.supabaseService.getClient();

        // 1. Get Guide ID
        const guide = await this.getProfile(userId);

        // 2. Verify Tour Ownership
        const { data: tour, error: tourError } = await client
            .from('tours' as any)
            .select('id, guide_id')
            .eq('id', tourId)
            .single();

        if (tourError || !tour) {
            throw new NotFoundException('Tour not found');
        }

        if ((tour as any).guide_id !== (guide as any).id) {
            throw new ForbiddenException('You do not have permission to view enrollments for this tour');
        }

        // 3. Fetch Enrollments
        const { data: enrollments, error: enrollError } = await client
            .from('tour_enrollments' as any)
            .select('*')
            .eq('tour_id', tourId);

        if (enrollError) {
            throw new InternalServerErrorException('Failed to fetch enrollments');
        }

        return enrollments;
    }

    async searchUsers(query: string) {
        const client = this.supabaseService.getClient();

        // Search in profiles table for users with role 'USER'
        // Matches username or full_name
        const { data: users, error } = await client
            .from('profiles' as any)
            .select('id, full_name, role')
            .eq('role', 'USER')
            .ilike('full_name', `%${query}%`);

        if (error) {
            console.error('Error searching users:', error);
            throw new InternalServerErrorException('Failed to search users');
        }

        return users;
    }

    async getAvailableTours(userId: string) {
        const client = this.supabaseService.getClient();

        // 1. Get IDs of tours user is already enrolled in
        const { data: myEnrollments } = await client
            .from('tour_enrollments' as any)
            .select('tour_id')
            .eq('user_id', userId);

        const enrolledTourIds = myEnrollments?.map((e: any) => e.tour_id) || [];

        // 2. Fetch OPEN tours excluding those IDs
        let query = client
            .from('tours' as any)
            .select('*')
            .eq('status', 'OPEN');

        if (enrolledTourIds.length > 0) {
            // Using .not('id', 'in', ...) requires a formatted string for the list in some versions,
            // but the safer way in supabase-js is simply mapping.
            // However, Supabase-js filter `in` expects Array, `not` expects operator string and value.
            // Syntax: .not('id', 'in', `(${enrolledTourIds.join(',')})`)
            query = query.not('id', 'in', `(${enrolledTourIds.join(',')})`);
        }

        const { data: tours, error } = await query;

        if (error) {
            console.error('Error fetching available tours:', error);
            throw new InternalServerErrorException('Failed to fetch available tours');
        }

        return tours;
    }

    async createUserInterest(userId: string, createInterestDto: CreateInterestDto) {
        const client = this.supabaseService.getClient();

        const { data, error } = await (client
            .from('user_interests' as any) as any)
            .insert({
                user_id: userId,
                interest: createInterestDto.interest,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating user interest:', error);
            throw new InternalServerErrorException('Failed to create user interest');
        }

        return data;
    }

    async getUserInterests() {
        const client = this.supabaseService.getClient();

        // Fetch interests with basic user info (optional, or just interest text)
        // Per requirement: "view the interest which is posted by user not user details"
        // So we will just fetch the interest text and maybe created_at.
        // If we want to show it's from distinct users without PII, we might just return the list.

        const { data, error } = await client
            .from('user_interests' as any)
            .select('id, interest, created_at')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching user interests:', error);
            throw new InternalServerErrorException('Failed to fetch user interests');
        }

        return data;
    }
}
