import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Data } from './sub-schema/data.schema';

export type LocationTimeDocument = LocationTime & Document;

@Schema()
export class LocationTime {
  @Prop()
  code: string;

  @Prop()
  time: number; // epoch

  @Prop()
  data: Data;
}

export const LocationTimeSchema = SchemaFactory.createForClass(LocationTime);
LocationTimeSchema.index({ code: 1, time: 1 }, { unique: true });
