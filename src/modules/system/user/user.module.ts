import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { UserRoleModule } from '../user-role/user-role.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserRoleModule],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}
