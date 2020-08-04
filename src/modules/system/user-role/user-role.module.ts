import { Module } from '@nestjs/common';
import { UserRoleService } from './services/user-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { UserPermissionModule } from '../user-permission/user-permission.module';
import { UserRoleController } from './controllers/user-role.contoller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), UserPermissionModule],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
