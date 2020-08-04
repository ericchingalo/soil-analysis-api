import { Controller, Get, Param, UseGuards, Put, Body } from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { Device } from '../entities/device.entity';
import { BaseController } from 'src/shared/controllers/base.controller';
import { DeviceDTO } from '../dtos/device.dto';
import { AuthGuard } from 'src/modules/system/user/guards/auth.guard';
import { CustomValidationPipe } from 'src/shared/pipes/validation.pipe';

@Controller('devices')
export class DeviceController extends BaseController<
  Device,
  DeviceDTO,
  DeviceDTO
> {
  constructor(private deviceService: DeviceService) {
    super(deviceService);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  async put(
    @Param('id') id: string,
    @Body(new CustomValidationPipe()) data: DeviceDTO,
  ) {
    return await this.deviceService.updateUser(id, data);
  }

  @Get(':id/results')
  @UseGuards(new AuthGuard())
  async findDeviceResults(@Param('id') id: string) {
    return await this.deviceService.findDeviceResults(id);
  }
}
