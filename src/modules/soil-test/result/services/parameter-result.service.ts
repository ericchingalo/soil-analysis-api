import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParameterResult } from '../entities/parameter-result.entity';
import { Repository } from 'typeorm';
import { ParameterResultDTO } from '../dtos/parameter-result.dto';
import { ParameterService } from '../../parameter/services/parameter.service';

@Injectable()
export class ParameterResultService {
  public parameterResultRepository: Repository<ParameterResult>;
  constructor(
    @InjectRepository(ParameterResult) repository: Repository<ParameterResult>,
    private readonly parameterService: ParameterService,
  ) {
    this.parameterResultRepository = repository;
  }

  async save(result: ParameterResultDTO, resultObject: any): Promise<any> {
    const parameterResult = await this.parameterResultRepository.save({
      value: result.value,
      parameter: await this.parameterService.findOneByName(result.parameter),
      result: resultObject,
    });
    return parameterResult;
  }
}
