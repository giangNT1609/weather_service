import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMainDto } from './create-main.dto';
import { CreateWeatherDto } from './create-weather.dto';
import { CreateWindDto } from './create-wind.dto';

export class CreatSysDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pod: string;
}

export class CreateCloudsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  all: number;
}

export class CreateDataDto {
  @ApiProperty()
  @IsNotEmpty()
  main: CreateMainDto;

  @ApiProperty()
  @IsNotEmpty()
  weather: CreateWeatherDto;

  @ApiProperty()
  @IsNotEmpty()
  clouds: CreateCloudsDto;

  @ApiProperty()
  @IsNotEmpty()
  wind: CreateWindDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  visibility: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsNumber()
  pop: number;

  @ApiProperty()
  @IsOptional()
  sys: CreatSysDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dtTxt: string;
}
