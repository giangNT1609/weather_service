import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WindDocument = Wind & Document;

@Schema({ _id: false })
export class Wind {
  @Prop()
  speed: number;

  @Prop()
  deg: number;

  @Prop()
  gust: number;
}
export const WindSchema = SchemaFactory.createForClass(Wind);
