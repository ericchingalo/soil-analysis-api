import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { BaseService } from '../../../../shared/services/base.service';
import { Result } from '../entities/result.entity';
import { ResultDTO } from '../dtos/result.dto';
import { ParameterResultService } from './parameter-result.service';
import { DeviceService } from '../../device/services/device.service';
import { ParameterResultDTO } from '../dtos/parameter-result.dto';

@Injectable()
export class ResultService extends BaseService<Result, ResultDTO> {
  resultRepository: Repository<Result>;
  constructor(
    @InjectRepository(Result) repository: Repository<Result>,
    private readonly parameterResultService: ParameterResultService,
    private readonly deviceService: DeviceService,
  ) {
    super(repository);
    this.resultRepository = repository;
  }

  async create(data: ResultDTO): Promise<any> {
    const resultObject = await this.resultRepository.save({
      device: await this.deviceService.deviceRepository.findOne({
        id: data.device,
      }),
    });

    await Promise.all(
      _.forEach(
        data.results,
        async (result: ParameterResultDTO) =>
          await this.parameterResultService.save(result, resultObject),
      ),
    );

    return resultObject;
  }

  async findAll(): Promise<any> {
    return await this.resultRepository.find({
      relations: ['device', 'device.user', 'parameter', 'parameter.parameter'],
    });
  }

  async findOneById(id: string): Promise<any> {
    return await this.resultRepository.find({
      where: { id },
      relations: ['device', 'device.user', 'parameter', 'parameter.parameter'],
    });
  }
}
