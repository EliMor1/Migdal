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

  async createMany(garagesData: CreateGarageDto[]): Promise<Garage[]> {
    try {
      const createdGarages = await this.garagesModel.insertMany(garagesData);
      return createdGarages;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findAll(): Promise<Garage[]> {
    try{
      const garagesData = await this.garagesModel.find().exec();
      if(garagesData){
        const cleanedData = garagesData.map(garage => {
          const garageObject = garage.toObject();
          delete garageObject._id;
          return garageObject;
        });
        return cleanedData
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
      const garageObject = garagesData.toObject();
      delete garageObject._id;
      return garageObject
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

