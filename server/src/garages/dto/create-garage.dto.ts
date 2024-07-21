import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGarageDto {

  @IsNumber()
  id: number;

  @IsNumber()
  mispar_mosah: number;

  @IsString()
  shem_mosah: string;

  @IsNumber()
  cod_sug_mosah: number;

  @IsString()
  sug_mosah: string;

  @IsString()
  ktovet: string;

  @IsString()
  yishuv: string;

  @IsString()
  telephone: string;

  @IsNumber()
  mikud: number;

  @IsNumber()
  cod_miktzoa: number;

  @IsString()
  miktzoa: string;

  @IsString()
  menahel_miktzoa: string;

  @IsNumber()
  rasham_havarot: number;

  @IsString()
  @IsOptional()
  TESTIME: string;
}
