import { DropdownUsersDto, GetAllUsersDto } from "@finestchoicex-iam/shared-models";
import { Injectable } from "@nestjs/common";
import { UnitEntity } from "../../units/entities/units.entity";
import { UsersDto } from "../dtos/user.dto";
import { UserEntity } from "../entities/users.entity";
import { Client } from "../../organization/entities/organization.entity";



@Injectable()
export class UsersAdapter {
    convertDtoToEntity(userDto: UsersDto): UserEntity {
        const entity = new UserEntity();
        entity.firstName = userDto.firstName;
        entity.middleName = userDto.middleName;
        entity.lastName = userDto.lastName;
        entity.gender = userDto.gender;
        entity.mobileNo = userDto.mobileNo;
        entity.createdUser = userDto.createdUser;
        entity.identityNo = userDto.identityNo;
        entity.identityType = userDto.identityType;
        entity.externalRefNo = userDto.externalRefNo;
        const unit = new UnitEntity();
        unit.id = userDto.unitId;
        entity.unit = unit;
        const client = new Client();
        client.id = userDto.unitId;
        entity.client = client;
        if (userDto.userId) {
            entity.id = userDto.userId;
            entity.createdUser = userDto.createdUser;
        }
        return entity;
    }
    convertEntityToDto(req: UserEntity): GetAllUsersDto {
        const dto = new GetAllUsersDto(req.firstName, req.middleName, req.lastName, req.gender, req.mobileNo, req.versionFlag, req.isActive, req.id, req.externalRefNo,req.identityNo,req.identityType);
        return dto;
    }
    convertDropdownEntityToDto(req: UserEntity): DropdownUsersDto {
        const dto = new DropdownUsersDto(req.firstName, req.middleName, req.lastName, req.id)
        return dto;
    }
}