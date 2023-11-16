import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, AdminJwtAuthGuard } from '../auth/guards/index';
import { CreateLocationDto } from './dto/create-location.dto';
import { SearchWeatherDto } from './dto/search-weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  @Post()
  async create(@Body() createLocation: CreateLocationDto) {
    return await this.weatherService.create(createLocation);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  async findAll() {
    return await this.weatherService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('findOne')
  async findOne(@Query() search: SearchWeatherDto) {
    const ans = await this.weatherService.find(search.code, search.time);
    return ans;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findTime(@Query() search: SearchWeatherDto) {
    const ans = await this.weatherService.findTime(search.code, search.time);
    return ans;
  }

  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  @Patch()
  async update(
    @Param() search: SearchWeatherDto,
    @Body() create: CreateLocationDto,
  ) {
    return await this.weatherService.update(search.code, search.time, create);
  }

  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.weatherService.delete(id);
  }
}
