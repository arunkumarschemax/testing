import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ModulesEntity } from './entities/modules.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModulesEntity)
    private modulesdataRepo: Repository<ModulesEntity>
  ) {

  }
  async create(createDto: any): Promise<any> {
    // const conversion=this. modulesAdapter.convertDtoToEntity(createDto);
    // console.log(createDto,"?????????????")
    // const saving = await this.modulesdataRepo.save(conversion)
    // return saving

  }

  async getAllModules(): Promise<any> {
    const getalldata = await this.modulesdataRepo.find();
    console.log(getalldata)
    return getalldata;
  }


  async getModulesById(id): Promise<any> {
    const getall = await this.modulesdataRepo.findOne({ where: { id: id } });
    console.log(getall)
    return getall;
  }
  async activateOrDeactivate(createDto: any): Promise<any> {
    const findRecord = await this.modulesdataRepo.findOne({ where: { id: createDto.id } }); //true or  //false
    if (!findRecord) {
      throw new Error("Data Not Found")
    } else {
      await this.modulesdataRepo.update({ id: createDto.id }, { isActive: !findRecord.isActive }); //false or //true
    }


  }
  async getModulesAllDropDown(): Promise<any> {
    const getData = await this.modulesdataRepo.find({ select: ['name', 'id'] });
    console.log(getData);
    return getData

  }

}