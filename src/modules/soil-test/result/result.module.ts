import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ResultController } from './controllers/result.controller';
import { ResultService } from './services/result.service';
import { ParameterResult } from './entities/parameter-result.entity';
import { ParameterResultService } from './services/parameter-result.service';
import { DeviceModule } from '../device/device.module';
import { ParameterModule } from '../parameter/parameter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, ParameterResult]),
    DeviceModule,
    ParameterModule,
  ],
  controllers: [ResultController],
  providers: [ResultService, ParameterResultService],
  exports: [ResultService, ParameterResultService],
})
export class ResultModule {}
