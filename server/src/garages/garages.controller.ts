import { 
  Controller,
  Get,
  Param,
  Body,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe, 
  Post} from '@nestjs/common';
import { GaragesService } from './garages.service';
import { UpdateGarageDto } from './dto/update-garage.dto'
import { CreateGarageDto } from './dto/create-garage.dto';

@Controller('garages')
@UsePipes(new ValidationPipe({ transform: true }))
export class GaragesController {
  constructor(private readonly garagesService: GaragesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try{
      return this.garagesService.findAll();
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    try{
      return this.garagesService.findOne(id);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() updateGarageDto: UpdateGarageDto) {
    try{
      return this.garagesService.update(id, updateGarageDto);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGarageDto: CreateGarageDto) {
    try {
      return this.garagesService.create(createGarageDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('createMany')
  @HttpCode(HttpStatus.CREATED)
  async createMany() {
    try {
      return this.garagesService.createMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
