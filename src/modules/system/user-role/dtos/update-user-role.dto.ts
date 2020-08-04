import { IsString } from 'class-validator';

export class UpdateUserRoleDTO {
  @IsString()
  name: string;
}
