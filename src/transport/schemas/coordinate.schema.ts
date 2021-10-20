import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Company } from 'src/company/schemas/company.schema';
import { Transport } from './transport.schema';

export type CoordinateDocument = Coordinate & Document;

@Schema()
export class Coordinate {
  
  _id?: string;

  @Prop({ required: true })
  latitude: string;

  @Prop({required: true})
  longitude: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport',
    required: true,
  })
  transport: Transport;
}

export const coordinateSchema = SchemaFactory.createForClass(Coordinate);
