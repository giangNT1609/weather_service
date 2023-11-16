import { Prop, Schema } from '@nestjs/mongoose';
import { Main } from './main.schema';
import { Weather } from './weather.schema';
import { Wind } from './wind.schema';
import { Document } from 'mongoose';

export type DataDocument = Data & Document;

@Schema({ _id: false })
export class Clouds {
  all: number;
}

@Schema({ _id: false })
export class Sys {
  pod: string;
}

@Schema({ _id: false })
export class Rain {
  oneHour: number;
}

@Schema({ _id: false })
export class Data {
  @Prop()
  main: Main;

  @Prop()
  weather: Weather;

  @Prop()
  clouds: Clouds;

  @Prop()
  wind: Wind;

  @Prop()
  visibility: number;

  @Prop()
  pop: number;

  @Prop()
  rain: Rain;

  @Prop()
  sys: Sys;

  @Prop()
  dtTxt: string;
}
