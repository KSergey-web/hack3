import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;


  @Prop({ select: false })
  __v: Number;

}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     const hashed = await bcrypt.hash(this['password'], 10);
//     this['password'] = hashed;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });
