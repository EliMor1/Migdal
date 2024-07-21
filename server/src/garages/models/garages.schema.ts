// src/garage/schemas/garage.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type GarageDocument = Garage & Document;

@Schema({ versionKey: false, collection: 'garages' })
export class Garage {

  @Prop({ type: Number, required: true, unique:true })
  id: number;

  @Prop({ type: Number, required: true })
  mispar_mosah: number;

  @Prop({ type: String, required: true })
  shem_mosah: string;

  @Prop({ type: Number, required: true })
  cod_sug_mosah: number;

  @Prop({ type: String, required: true })
  sug_mosah: string;

  @Prop({ type: String, required: true })
  ktovet: string;

  @Prop({ type: String, required: true })
  yishuv: string;

  @Prop({ type: String, required: true })
  telephone: string;

  @Prop({ type: Number, required: true })
  mikud: number;

  @Prop({ type: Number, required: true })
  cod_miktzoa: number;

  @Prop({ type: String, required: true })
  miktzoa: string;

  @Prop({ type: String, required: true })
  menahel_miktzoa: string;

  @Prop({ type: Number, required: true })
  rasham_havarot: number;

  @Prop({ type: String })
  TESTIME: string;
}

export const GarageSchema = SchemaFactory.createForClass(Garage);
