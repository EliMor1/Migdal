// src/garage/garage.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GaragesService } from './garages.service';
import { GaragesController } from './garages.controller';
import { GarageSchema, Garage } from './models/garages.schema';
import { GaragesDAL } from './DAL/garages.dal';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Garage.name, schema: GarageSchema }]),
  ],
  providers: [GaragesService, GaragesDAL],
  controllers: [GaragesController],
})
export class GaragesModule {}
