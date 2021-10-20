import { Body, Controller, Get, Header, Param, ParseIntPipe, Post } from '@nestjs/common';
import { IsNumber } from 'class-validator';
import { AppService } from './app.service';
import { getXML } from './shared/getxml';
import { TestDTO } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('call-axious')
  async getAxios() {
    let data;
    data = await this.appService.getHello();
    console.log(data);
    return data;
  }

  @Get('')
  getHello() {
    return this.appService.getHello();
  }

  @Get('xml')
  getXML() {
    return getXML('');
  }

  @Get('env')
  getEnvBd() {
    return {env: process.env.BD, hh:'hh'};
  }

  @Post('upload')
  async setData(@Body() test: TestDTO) {
    return test;
  }
}
