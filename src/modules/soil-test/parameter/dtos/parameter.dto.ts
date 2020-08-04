import { IsString } from 'class-validator';

export class ParameterDTO {
  @IsString()
  name: string;
}
