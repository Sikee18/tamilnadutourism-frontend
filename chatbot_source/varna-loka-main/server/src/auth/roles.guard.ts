import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SupabaseService } from '../supabase/supabase.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly supabaseService: SupabaseService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        // Assuming auth header is present and valid, usually handled by an AuthGuard before this.
        // For now, we'll verify the token again or get the user from the request if already attached.

        let user = request.user;

        if (!user) {
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException('No token provided');
            }

            const token = authHeader.split(' ')[1];
            const { data: { user: supabaseUser }, error } = await this.supabaseService.getClient().auth.getUser(token);

            if (error || !supabaseUser) {
                throw new UnauthorizedException('Invalid token');
            }
            user = supabaseUser;
            request.user = user; // Attach for later
        }

        // Check role in user_metadata
        const userRole = user.user_metadata?.role;

        if (!requiredRoles.includes(userRole)) {
            throw new ForbiddenException(`User role '${userRole}' does not have sufficient permissions`);
        }

        return true;
    }
}
