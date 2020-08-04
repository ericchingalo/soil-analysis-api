import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parameter } from '../entites/parameter.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../shared/services/base.service';
import { ParameterDTO } from '../dtos/parameter.dto';

@Injectable()
export class ParameterService extends BaseService<Parameter, ParameterDTO> {
  parameterRepository: Repository<Parameter>;
  constructor(@InjectRepository(Parameter) repository: Repository<Parameter>) {
    super(repository);
    this.parameterRepository = repository;
  }

  async findOneByName(name: string): Promise<any> {
    return await this.parameterRepository.findOne({ where: { name } });
  }
}
