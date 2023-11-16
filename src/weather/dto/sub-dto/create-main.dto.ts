import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMainDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  temp: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  feelsLike: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tempMin: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tempMax: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pressure: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  seaLevel: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  grndLevel: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  humidity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tempKf: number;
}
