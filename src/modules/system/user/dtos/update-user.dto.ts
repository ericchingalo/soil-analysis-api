import { IsString, IsEmail, IsArray } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  username?: string;

  @IsString()
  password?: string;

  @IsEmail()
  email?: string;

  @IsString()
  region?: string;
}
