import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from '../entities/device.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../shared/services/base.service';
import { DeviceDTO } from '../dtos/device.dto';
import { UserService } from '../../../system/user/services/user.service';
import { AuthService } from '../../../system/user/services/auth.service';

@Injectable()
export class DeviceService extends BaseService<Device, DeviceDTO> {
  public deviceRepository: Repository<Device>;
  constructor(
    @InjectRepository(Device) repository: Repository<Device>,
    private userService: UserService,
    private authService: AuthService,
  ) {
    super(repository);
    this.deviceRepository = repository;
  }

  async create(data: DeviceDTO): Promise<any> {
    return this.deviceRepository.save({
      user: await this.userService.userRepository.findOne({
        where: { id: data.user },
      }),
    });
  }

  async findOneById(id: string): Promise<any> {
    return await this.deviceRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findAll(): Promise<any> {
    return await this.deviceRepository.find({ relations: ['user'] });
  }

  async findDeviceResults(id: string): Promise<any> {
    return await this.deviceRepository.findOne({
      where: { id },
      relations: [
        'results',
        'results.parameter',
        'results.parameter.parameter',
      ],
    });
  }

  async updateUser(id: string, data: DeviceDTO): Promise<any> {
    const user = await this.userService.findOneById(data.user);
    await this.deviceRepository.update(id, { user });

    return this.deviceRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async login(username: string, password: string) {
    const user = await this.authService.login(username, password);
    const device = await this.deviceRepository.findOne({
      where: { user: user.id },
    });

    if (!device) {
      throw new HttpException(
        'User not assigned a device',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { ...user, device: device.id };
  }
}
