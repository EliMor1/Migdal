import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import { GaragesDAL } from './DAL/garages.dal';
import { Garage } from './models/garages.schema';
import axios from 'axios';
import { IGarage } from 'src/common/interfaces/Garage.interface';

@Injectable()
export class GaragesService {
  constructor(private readonly garagesDAL: GaragesDAL) {}

  async create(createGarageDto: CreateGarageDto): Promise<Garage> {
    const newGarage = await this.garagesDAL.create(createGarageDto);
    if (!newGarage) {
      throw new InternalServerErrorException("Couldn't create the garage.");
    }
    return newGarage;
  }

  async createMany(): Promise<string> {
    try {

      //remove to env file (url and resource id and limit).
      const response = await axios.get('https://data.gov.il/api/3/action/datastore_search', {
        params: {
          resource_id: 'bb68386a-a331-4bbc-b668-bba2766d517d',
          limit: 50,
        },
      });

      const garages = response.data.result.records.map((record: IGarage) => {
        const { _id, ...garageData } = record;
        return { ...garageData, id: _id };
      });
      const createdGarages = await this.garagesDAL.createMany(garages);

      if (!createdGarages) {
        throw new InternalServerErrorException("Couldn't create the garages.");
      }

      return 'Garages created successfully.';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Garage[] | IGarage> {
    const garagesData = await this.garagesDAL.findAll();
      if(!garagesData){
        throw new NotFoundException("Coudn't get the garages list.");
      }
      //need to remove _id field.
      return garagesData;
  }

  async findOne(id: number): Promise<Garage> {
    //need to remove _id field.
    const garagesData = await this.garagesDAL.findOne(id);
      if(!garagesData){
        throw new NotFoundException("Coudn't get the specified garage.");
      }
      delete garagesData["_id"];
      return garagesData;
  }

  async update(id: number, updateGarageDto: UpdateGarageDto): Promise<void> { 
    const updatedGarage = await this.garagesDAL.update(id, updateGarageDto);
    if(!updatedGarage){
      throw new InternalServerErrorException("Coudn't update the specified garage.");
    }
  }

}
