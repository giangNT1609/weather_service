import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MainDocument = Document & Main;

@Schema({ _id: false })
export class Main {
  @Prop()
  temp: number;

  @Prop()
  feelsLike: number;

  @Prop()
  tempMin: number;

  @Prop()
  tempMax: number;

  @Prop()
  pressure: number;

  @Prop()
  seaLevel: number;

  @Prop()
  grndLevel: number;

  @Prop()
  humidity: number;

  @Prop()
  tempKf: number;
}

export const MainSchema = SchemaFactory.createForClass(Main);
