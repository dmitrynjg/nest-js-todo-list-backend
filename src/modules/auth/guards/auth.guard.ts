import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'user.auth.error.not_authorized',
          status: 401,
          error: 'Unauthorized',
        });
      }

      const user: any = this.jwtService.decode(token);
      const userId: string = user.id;
      const findUser = await this.userService.findById(userId);
      if (!findUser) {
        throw new UnauthorizedException({
          message: 'user.auth.error.not_authorized',
          status: 401,
          error: 'Unauthorized',
        });
      }

      req.user = user;

      return true;
    } catch {
      throw new UnauthorizedException({
        message: 'user.auth.error.not_authorized',
        status: 401,
        error: 'Unauthorized',
      });
    }
  }
}
