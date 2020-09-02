import {
  Controller,
  Get,
  Param,
  UseGuards,
  Put,
  Body,
  Post,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { Device } from '../entities/device.entity';
import { BaseController } from 'src/shared/controllers/base.controller';
import { DeviceDTO } from '../dtos/device.dto';
import { AuthGuard } from 'src/modules/system/user/guards/auth.guard';
import { CustomValidationPipe } from 'src/shared/pipes/validation.pipe';
import { UserLoginDTO } from '../../../system/user/dtos/user-login.dto';

@Controller('devices')
export class DeviceController extends BaseController<
  Device,
  DeviceDTO,
  DeviceDTO
> {
  constructor(private deviceService: DeviceService) {
    super(deviceService);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.deviceService.findOneById(id);
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

  @Post('login')
  async login(@Body() user: UserLoginDTO, @Req() request): Promise<any> {
    const userObject = await this.deviceService.login(
      user.username,
      user.password,
    );
    if (userObject) {
      request.session.user = userObject;
      return userObject;
    } else {
      throw new HttpException(
        'Password or Username is incorrect.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
