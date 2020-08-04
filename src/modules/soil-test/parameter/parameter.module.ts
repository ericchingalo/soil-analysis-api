import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parameter } from './entites/parameter.entity';
import { ParameterController } from './controllers/parameters.controller';
import { ParameterService } from './services/parameter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter])],
  controllers: [ParameterController],
  providers: [ParameterService],
  exports: [ParameterService],
})
export class ParameterModule {}
