import { IsString, IsNumber } from 'class-validator';

export class ParameterResultDTO {
  @IsNumber()
  value: number;

  @IsString()
  parameter: string;
}
