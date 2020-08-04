import { Controller } from '@nestjs/common';
import { UserPermissionService } from '../services/user-permission.service';
import { BaseController } from '../../../../shared/controllers/base.controller';
import { UserPermission } from '../entities/user-persmission.entity';
import { UserPermissionDTO } from '../dtos/user-permission.dto';

@Controller('permissions')
export class UserPermissionController extends BaseController<
  UserPermission,
  UserPermissionDTO,
  UserPermissionDTO
> {
  constructor(private userPermissionService: UserPermissionService) {
    super(userPermissionService);
  }
}
