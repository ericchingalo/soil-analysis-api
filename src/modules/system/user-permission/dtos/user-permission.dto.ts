import { IsString, IsNotEmpty } from 'class-validator';

export class UserPermissionDTO {
  @IsString()
  @IsNotEmpty()
  permission: string;
}
