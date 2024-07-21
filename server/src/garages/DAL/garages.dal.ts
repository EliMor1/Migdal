/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Garage, GarageDocument } from '../models/garages.schema';
import { UpdateGarageDto } from '../dto/update-garage.dto'
import { CreateGarageDto } from '../dto/create-garage.dto';

@Injectable()
export class GaragesDAL {
  constructor(@InjectModel(Garage.name) private garagesModel: Model<GarageDocument>) {}


  async create(createGarageDto: CreateGarageDto): Promise<Garage> {
    try {
      const newGarage = new this.garagesModel(createGarageDto);
      return newGarage.save();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createMany(garagesData: CreateGarageDto[]): Promise<boolean> {
    try {
      await this.garagesModel.insertMany(garagesData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async findAll(): Promise<Garage[]> {
    try{
      const garagesData = await this.garagesModel.find().exec();
      if(garagesData){
        return garagesData;
      }
      return null;
    }
    catch(error){
      console.error(error);
      return null;
    }
  }

  async findOne(id: number): Promise<Garage> {
    try{
      const garagesData = await this.garagesModel.findOne({ 'id': id }).exec();
      if(!garagesData) return null;
      return garagesData
    }
    catch(error){
      console.error(error);
      return null;
    }
  }


  async update(id: number, updateGarageDto: UpdateGarageDto): Promise<Garage> {
    try {
      const garageData = await this.garagesModel
        .findOneAndUpdate(
          { id: id },
          { $set: updateGarageDto },
          { new: true }
        )
        .exec();
      return garageData || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

