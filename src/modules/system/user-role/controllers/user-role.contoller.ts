import { Controller } from '@nestjs/common';
import { UserRoleService } from '../services/user-role.service';
import { BaseController } from '../../../../shared/controllers/base.controller';
import { UserRole } from '../entities/user-role.entity';
import { UserRoleDTO } from '../dtos/user-role.dto';
import { UpdateUserRoleDTO } from '../dtos/update-user-role.dto';

@Controller('roles')
export class UserRoleController extends BaseController<
  UserRole,
  UserRoleDTO,
  UpdateUserRoleDTO
> {
  constructor(private readonly userRoleService: UserRoleService) {
    super(userRoleService);
  }
}
