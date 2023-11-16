import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema({ _id: false })
export class Weather {
  @Prop()
  id: number;

  @Prop()
  main: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
