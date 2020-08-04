import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    try {
      if (request.session.user) {
        request.session.previousPath = request.path;
        return true;
      }

      if (request.headers['authorization']) {
        const user = await User.authenticateUserByToken(
          request.headers['authorization'].replace('Basic ', ''),
        );

        if (user) {
          request.session.user = user;
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
