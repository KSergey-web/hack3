import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportService } from './transport.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { FindAllTransportByCompanyDto } from './dto/find-all-transports-by-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { Socket, Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

@ApiTags('transport')
@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @WebSocketServer() server: Server;

  @Post()
  create(@Body() createTransportDto: CreateTransportDto) {
    return this.transportService.create(createTransportDto);
  }

  @Get("all-by-company/:company_id/:variety")
  getAllTransportsByCompany(@Param() dto: FindAllTransportByCompanyDto) {
    return this.transportService.getAllTransportsByCompany(dto);
  }


}
