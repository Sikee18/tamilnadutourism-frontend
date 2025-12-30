import { Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async signup(signupDto: SignupDto) {
        const { email, password, fullName } = signupDto;

        const { data, error } = await this.supabaseService.getClient().auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: signupDto.role,
                },
            },
        });

        if (error) {
            console.error('Signup Error:', error);
            throw new BadRequestException(error.message);
        }

        return {
            message: 'User registered successfully',
            user: data.user,
        };
    }


    private readonly logger = new Logger(AuthService.name);

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const { data, error } = await this.supabaseService.getClient().auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            this.logger.warn(`Login failed for email: ${email}. Error: ${error.message}`);
            throw new BadRequestException(error.message);
        }

        return {
            message: 'Login successful',
            access_token: data.session?.access_token,
            user: data.user,
        };
    }
}
