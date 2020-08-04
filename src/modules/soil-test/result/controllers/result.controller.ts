import { Controller } from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { BaseController } from '../../../../shared/controllers/base.controller';
import { Result } from '../entities/result.entity';
import { ResultDTO } from '../dtos/result.dto';

@Controller('results')
export class ResultController extends BaseController<
  Result,
  ResultDTO,
  ResultDTO
> {
  constructor(private resultService: ResultService) {
    super(resultService);
  }
}
