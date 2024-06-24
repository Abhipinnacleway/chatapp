import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('hello')
    return 'Hello World!';
  }
  getStated(name:string):string{
    console.log('hello start ')
    return JSON.stringify(`Hello ${name}`)
  }
  
}
