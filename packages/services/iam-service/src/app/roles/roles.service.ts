import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesdataRepo: Repository<Roles>
  ) {

  }
  async create(createDto: any): Promise<any> {
    // const conversion = this.rolesAdapter.convertDtoToEntity(createDto);
    // console.log(createDto, "?????????????")
    // const saving = await this.rolesdataRepo.save(conversion)
    // return saving

  }

  async getAllRoles(): Promise<any> {
    const getalldata = await this.rolesdataRepo.find();
    console.log(getalldata)
    return getalldata;

  }


  async getRolesById(id): Promise<any> {
    const getall = await this.rolesdataRepo.findOne({ where: { id: id } });
    console.log(getall)
    return getall;
  }
  async activateOrDeactivate(createDto: any): Promise<any> {
    const findRecord = await this.rolesdataRepo.findOne({ where: { id: createDto.id } }); //true or  //false
    if (!findRecord) {
      throw new Error("Data Not Found")
    } else {
      await this.rolesdataRepo.update({ id: createDto.id }, { isActive: !findRecord.isActive }); //false or //true
    }


  }
  async getRolesAllDropDown(): Promise<any> {
    const getData = await this.rolesdataRepo.find({ select: ['name', 'id'] });
    console.log(getData);
    return getData
  }



}
