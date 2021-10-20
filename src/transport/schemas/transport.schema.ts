import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Company } from 'src/company/schemas/company.schema';

export type TransportDocument = Transport & Document;

@Schema()
export class Transport {
  
  _id?: string;
 
  @Prop({ required: true })
  name: string;

  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  company: Company;

  @Prop({required: true})
  variety: string;

  // @Prop({required: true})
  // maxWeight: string;

  // @Prop({required: true})
  // currentWeight: string;

  // @Prop({required: true, default: 100})
  // energy: number;

  // @Prop({required: true})
  // fromPoint: Coordinate | null;

  // @Prop({required: true})
  // toPoint: Coordinate | null;
}

export const TransportSchema = SchemaFactory.createForClass(Transport);
