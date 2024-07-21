import { PartialType } from '@nestjs/mapped-types';
import { CreateGarageDto } from './create-garage.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateGarageDto extends PartialType(CreateGarageDto) {

  @IsNumber()
  id: number;
  
  @IsOptional()
  @IsNumber()
  mispar_mosah?: number;

  @IsOptional()
  @IsString()
  shem_mosah?: string;

  @IsOptional()
  @IsNumber()
  cod_sug_mosah?: number;

  @IsOptional()
  @IsString()
  sug_mosah?: string;

  @IsOptional()
  @IsString()
  ktovet?: string;

  @IsOptional()
  @IsString()
  yishuv?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsNumber()
  mikud?: number;

  @IsOptional()
  @IsNumber()
  cod_miktzoa?: number;

  @IsOptional()
  @IsString()
  miktzoa?: string;

  @IsOptional()
  @IsString()
  menahel_miktzoa?: string;

  @IsOptional()
  @IsNumber()
  rasham_havarot?: number;

  @IsOptional()
  @IsString()
  TESTIME?: string;
    
}


