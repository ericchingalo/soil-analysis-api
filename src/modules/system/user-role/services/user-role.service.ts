import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../../shared/services/base.service';
import { UserRole } from '../entities/user-role.entity';
import { UserRoleDTO } from '../dtos/user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPermissionService } from '../../user-permission/services/user-permission.service';
import { idMapper } from '../../../../shared/helpers/id-mapper.helper';

@Injectable()
export class UserRoleService extends BaseService<UserRole, UserRoleDTO> {
  public userRoleRepository: Repository<UserRole>;
  constructor(
    @InjectRepository(UserRole) repository: Repository<UserRole>,
    private readonly userPermissionService: UserPermissionService,
  ) {
    super(repository);
    this.userRoleRepository = repository;
  }

  async create(data: UserRoleDTO): Promise<any> {
    const permissions = await this.userPermissionService.userPermissionRepository.find(
      { where: idMapper(data.permissions) },
    );

    const role = this.userRoleRepository.create();
    role.name = data.name;
    role.permissions = permissions;

    return await this.userRoleRepository.save(role);
  }

  async findAll(): Promise<any> {
    return await this.userRoleRepository.find({
      relations: ['permissions'],
      select: ['id', 'name'],
    });
  }

  async findOneById(id: string): Promise<any> {
    return await this.userRoleRepository.findOne({
      where: { id },
      relations: ['permissions'],
      select: ['id', 'name'],
    });
  }
}
