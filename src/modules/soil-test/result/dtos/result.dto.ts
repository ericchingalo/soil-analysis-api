import { IsString, IsArray } from 'class-validator';
import { ParameterResultDTO } from './parameter-result.dto';

export class ResultDTO {
  @IsString()
  device: string;

  @IsArray()
  results: ParameterResultDTO[];
}
