import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationdataRepo: Repository<Application>,
  ) {

  }


  async create(createDto: any): Promise<any> {
    console.log(createDto)
    // const conversion = this.applicationAdapter.convertDtoToEntity(createDto);
    // console.log(createDto, "?????????????")
    // const saving = await this.applicationdataRepo.save(conversion)
    // return saving
  }
  async getAllApplications(): Promise<any> {
    const getall = await this.applicationdataRepo.find();
    console.log(getall)
    return getall;
  }
  async getApplicationsById(id): Promise<any> {
    const getall = await this.applicationdataRepo.findOne({ where: { id: id } });
    console.log(getall)
    return getall;
  }
  async activateOrDeactivate(createDto: any): Promise<any> {
    const findRecord = await this.applicationdataRepo.findOne({ where: { id: createDto.id } }); //true or  //false
    if (!findRecord) {
      throw new Error("Data Not Found")
    } else {
      await this.applicationdataRepo.update({ id: createDto.id }, { isActive: !findRecord.isActive }); //false or //true
    }


  }
  async getApplicationsAllDropDown(): Promise<any> {
    const getData = await this.applicationdataRepo.find({ select: ['name', 'id'] });
    console.log(getData);
    return getData

  }



}
