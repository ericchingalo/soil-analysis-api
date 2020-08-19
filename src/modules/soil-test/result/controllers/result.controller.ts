import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { BaseController } from '../../../../shared/controllers/base.controller';
import { Result } from '../entities/result.entity';
import { ResultDTO } from '../dtos/result.dto';
import { CustomValidationPipe } from 'src/shared/pipes/validation.pipe';
import { AuthGuard } from 'src/modules/system/user/guards/auth.guard';

@Controller('results')
export class ResultController extends BaseController<
  Result,
  ResultDTO,
  ResultDTO
> {
  constructor(private resultService: ResultService) {
    super(resultService);
  }

  @Post()
  // @UsePipes(new CustomValidationPipe())
  async post(@Body(new CustomValidationPipe()) data: ResultDTO) {
    return await this.resultService.create(data);
  }

  @Get('aggregated')
  @UseGuards(new AuthGuard())
  async findAllAggregated() {
    return await this.resultService.findAggregated();
  }
}
