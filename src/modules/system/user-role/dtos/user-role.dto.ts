import { IsString, IsArray } from 'class-validator';

export class UserRoleDTO {
  @IsString()
  name: string;

  @IsArray()
  permissions: string[];
}
