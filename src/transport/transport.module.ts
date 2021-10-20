import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transport, TransportSchema } from './schemas/transport.schema';
import { Coordinate, coordinateSchema } from './schemas/coordinate.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Transport.name, schema: TransportSchema }]),
  MongooseModule.forFeature([{ name: Coordinate.name, schema: coordinateSchema }]),
],
  controllers: [TransportController],
  providers: [TransportService],
  exports: [TransportService]
})
export class TransportModule {}
