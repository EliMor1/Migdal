import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import { GaragesDAL } from './DAL/garages.dal';
import { Garage } from './models/garages.schema';
import axios from 'axios';
import { IGarage } from 'src/common/interfaces/Garage.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GaragesService {
  
  private readonly ApiUrl;
  private readonly limit;
  private readonly resourceID;
  constructor(private readonly garagesDAL: GaragesDAL, private configService: ConfigService) {

    this.ApiUrl = this.configService.get<string>('API_URL');
    this.resourceID = this.configService.get<string>('RESOURCE_ID');
    this.limit = this.configService.get<string>('LIMIT');
  }

  async create(createGarageDto: CreateGarageDto): Promise<Garage> {
    const newGarage = await this.garagesDAL.create(createGarageDto);
    if (!newGarage) {
      throw new InternalServerErrorException("Couldn't create the garage.");
    }
    return newGarage;
  }

  async createMany(createGarageDtos: CreateGarageDto[]): Promise<Garage[]> {
    try {

      const createdGarages = await this.garagesDAL.createMany(createGarageDtos);
      if (!createdGarages) {
        throw new InternalServerErrorException("Couldn't create the garages.");
      }
      return createdGarages;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchFromApi(): Promise<IGarage[]> {
    try {
      const response = await axios.get(this.ApiUrl, {
        params: {
          resource_id: this.resourceID,
          limit: this.limit,
        },
      });

      const garages = response.data.result.records;

      return garages;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Garage[] | IGarage> {
    const garagesData = await this.garagesDAL.findAll();
      if(!garagesData){
        throw new NotFoundException("Coudn't get the garages list.");
      }
      return garagesData;
  }

  async findOne(id: number): Promise<Garage> {
    const garagesData = await this.garagesDAL.findOne(id);
      if(!garagesData){
        throw new NotFoundException("Coudn't get the specified garage.");
      }
      return garagesData;
  }

  async update(id: number, updateGarageDto: UpdateGarageDto): Promise<void> { 
    const updatedGarage = await this.garagesDAL.update(id, updateGarageDto);
    if(!updatedGarage){
      throw new InternalServerErrorException("Coudn't update the specified garage.");
    }
  }

}
