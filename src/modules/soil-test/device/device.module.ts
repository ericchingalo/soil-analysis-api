import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { DeviceController } from './controllers/device.controller';
import { DeviceService } from './services/device.service';
import { UserModule } from '../../system/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), UserModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
