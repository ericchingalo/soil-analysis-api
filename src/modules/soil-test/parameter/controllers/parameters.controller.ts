import { Controller } from '@nestjs/common';
import { ParameterService } from '../services/parameter.service';
import { Parameter } from '../entites/parameter.entity';
import { ParameterDTO } from '../dtos/parameter.dto';
import { BaseController } from '../../../../shared/controllers/base.controller';

@Controller('parameters')
export class ParameterController extends BaseController<
  Parameter,
  ParameterDTO,
  ParameterDTO
> {
  constructor(private parameterService: ParameterService) {
    super(parameterService);
  }
}
