import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('k')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('getDatalop')
  k(@Body() req: any) {
    console.log(req,"controller")
    return this.appService.getData();
  }
}
