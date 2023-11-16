import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { LocationTime, LocationTimeSchema } from './schema/location.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: LocationTime.name,
        useFactory: () => {
          const schema = LocationTimeSchema;
          return schema;
        },
      },
    ]),
  ],
  exports: [WeatherService],
})
export class WeatherModule {}
