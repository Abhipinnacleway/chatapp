import { Body, Controller, Get , Post, Req  } from '@nestjs/common';
import { AppService } from './app.service';


interface BodyDto{
  name:string  
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
}
