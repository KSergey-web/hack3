import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Transport } from 'src/transport/schemas/transport.schema';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  _id?: string;
 
  @Prop({ required: true })
  name: string;

  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transport' }],
  //   default: [],
  // })
  // transports: Transport[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
