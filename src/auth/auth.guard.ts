import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split('Bearer ')[1];
    //console.log(token);
    if (!token) throw new UnauthorizedException('Missing token');

    req.user = await this.authService.verifyIdToken(token);
    return true;
  }
}