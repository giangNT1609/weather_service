import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationTime, LocationTimeDocument } from './schema/location.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(LocationTime.name)
    private readonly model: Model<LocationTimeDocument>,
  ) {}
  async findAll(): Promise<LocationTime[]> {
    return await this.model.find().exec();
  }
  async find(input_code: string, input_epoch: number): Promise<LocationTime> {
    //console.log(typeof input_code, typeof input_epoch);
    const a = await this.model
      .findOne({ code: input_code, time: input_epoch })
      .exec();
    return a;
  }
  async findTime(
    input_code: string,
    input_epoch: number,
  ): Promise<LocationTime> {
    const edit_time = input_epoch - (input_epoch % 3600);
    let ans = await this.model
      .findOne({ code: input_code, time: edit_time })
      .exec();
    while (ans == null) {
      const previousTime = edit_time - 3600;
      ans = await this.model.findOne({ code: input_code, time: previousTime });
    }
    return ans;
  }
  async create(createLocation: CreateLocationDto) {
    return await new this.model({
      ...createLocation,
    }).save();
  }
  async update(
    input_code: string,
    input_epoch: number,
    createLocation: CreateLocationDto,
  ) {
    return await this.model
      .findOneAndUpdate({ code: input_code, time: input_epoch }, createLocation)
      .exec();
  }
  async delete(id: string): Promise<LocationTime> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
