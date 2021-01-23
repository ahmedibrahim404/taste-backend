import { Get, Injectable } from '@nestjs/common';
import { get } from 'http';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
