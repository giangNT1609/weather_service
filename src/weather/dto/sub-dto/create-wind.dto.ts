import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWindDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  speed: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  deg: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  gust: number;
}
