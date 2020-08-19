import { IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  password: string;
}
