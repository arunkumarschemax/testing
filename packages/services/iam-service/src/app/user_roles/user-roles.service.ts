import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoles } from './entitys/user-roles.entity';

@Injectable()
export class UserRolesService {
    constructor(
        @InjectRepository(UserRoles)
        private userRolesdataRepo: Repository<UserRoles>
    ) {

    }
    async create(createDto: any): Promise<any> {
        // const conversion=this. userRolesAdapter.convertDtoToEntity(createDto);
        // console.log(createDto,"?????????????")
        // const saving = await this.userRolesdataRepo.save(conversion)
        // return saving

    }

    async getAllUserRoles(): Promise<any> {
        const getalldata = await this.userRolesdataRepo.find();
        console.log(getalldata)
        return getalldata;
    }


    async getUserRolesById(id): Promise<any> {
        const getall = await this.userRolesdataRepo.find();
        console.log(getall)
        return getall;
    }
}
