import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { BaseService } from '../../../../shared/services/base.service';
import { User } from '../entities/user.entity';
import { UserDTO } from '../dtos/user.dto';
import { UserRoleService } from '../../user-role/services/user-role.service';
import { nameMapper } from '../../../../shared/helpers/id-mapper.helper';
import { generateBasicAuthanticationString } from '../helpers/basic-auth-token.helper';

@Injectable()
export class UserService extends BaseService<User, UserDTO> {
  public userRepository: Repository<User>;
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    private readonly userRoleService: UserRoleService,
  ) {
    super(repository);
    this.userRepository = repository;
  }

  async create(data: UserDTO) {
    if (
      await this.userRepository.findOne({ where: { username: data.username } })
    ) {
      throw new HttpException(
        'Username Already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.create({
      password: data.password,
      username: data.username,
      region: data.region,
      email: data.email,
      token: generateBasicAuthanticationString(data.username, data.password),
      roles: await this.userRoleService.userRoleRepository.find({
        where: nameMapper(data.roles),
      }),
    });

    user.save();
    return _.omit(user, 'password');
  }

  async findOneById(id: string): Promise<any> {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  async findAll(): Promise<any> {
    return this.userRepository.find({ relations: ['roles'] });
  }
}
