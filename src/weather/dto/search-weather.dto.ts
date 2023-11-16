import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SearchWeatherDto {
  @ApiProperty()
  @IsOptional()
  code: string;

  @ApiProperty()
  @IsOptional()
  time: number;
}
