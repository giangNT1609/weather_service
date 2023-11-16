import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDataDto } from './sub-dto/create-data.dto';

export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @ApiProperty()
  @IsNotEmpty()
  data: CreateDataDto;
}
