import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entities/user-persmission.entity';
import { UserPermissionService } from './services/user-permission.service';
import { UserPermissionController } from './controllers/user-permission.controller';

@Module({
  controllers: [UserPermissionController],
  imports: [TypeOrmModule.forFeature([UserPermission])],
  providers: [UserPermissionService],
  exports: [UserPermissionService],
})
export class UserPermissionModule {}
