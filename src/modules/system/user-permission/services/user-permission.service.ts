import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../../shared/services/base.service';
import { UserPermission } from '../entities/user-persmission.entity';
import { UserPermissionDTO } from '../dtos/user-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserPermissionService extends BaseService<
  UserPermission,
  UserPermissionDTO
> {
  public userPermissionRepository: Repository<UserPermission>;
  constructor(
    @InjectRepository(UserPermission) repository: Repository<UserPermission>,
  ) {
    super(repository);
    this.userPermissionRepository = repository;
  }
}
