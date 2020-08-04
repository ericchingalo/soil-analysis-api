import {
  Controller,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseController } from 'src/shared/controllers/base.controller';
import { UserDTO } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserLoginDTO } from '../dtos/user-login.dto';
import { AuthService } from '../services/auth.service';
import { UpdateUserDTO } from '../dtos/update-user.dto';

@Controller('users')
export class UserController extends BaseController<
  User,
  UserDTO,
  UpdateUserDTO
> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    super(userService);
  }

  @Post('login')
  async login(@Body() user: UserLoginDTO, @Req() request): Promise<any> {
    const userObject = await this.authService.login(
      user.username,
      user.password,
    );
    if (userObject) {
      request.session.user = userObject;
      return userObject;
    } else {
      throw new HttpException(
        'Password or Username is incorrect.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
