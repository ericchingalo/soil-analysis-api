import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: 'Welcome to soil analysis api' };
  }
}
