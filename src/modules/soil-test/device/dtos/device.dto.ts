import { IsString } from 'class-validator';

export class DeviceDTO {
  @IsString()
  user: string;
}
