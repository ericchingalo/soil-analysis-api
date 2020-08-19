import { IsString, IsArray, IsDate } from 'class-validator';
import { ParameterResultDTO } from './parameter-result.dto';

export class ResultDTO {
  @IsString()
  device: string;

  @IsArray()
  results: ParameterResultDTO[];

  created?: Date;
}
