import { CommonResponse, DropdownUsersDto, GetAllUserResponse, GetAllUsersDropDown, GetAllUsersDto, GlobalResponseObject, OrganizationReqDto, UnitIdDto, UsersIdDto } from '@finestchoicex-iam/shared-models';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GenericTransactionManager } from '../../database/typeorm-transactions';
import { AuthenticationsService } from '../authentications/authentications.service';
import { AuthenticationsDto } from '../authentications/dtos/authentications.dto';
import { AuthenticationEntity } from '../authentications/entities';
import { UnitEntity } from '../units/entities/units.entity';
import { UsersDto } from './dtos/user.dto';
import { UserEntity } from './entities/users.entity';
import { UsersAdapter } from './user-repo/adapter';
import { UserRepo } from './user-repo/user-repo';
import { OrganizationIdReqDto } from '../organization/dtos/activate.dto';
import { Client } from '../organization/entities/organization.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly repo: UserRepo,
        private readonly adapter: UsersAdapter,
        private readonly dataSource: DataSource,
        private readonly authService: AuthenticationsService
    ) { }

    async userCreation(req: UsersDto): Promise<CommonResponse> {
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try {
            const authDto = new AuthenticationsDto();
            authDto.email = req.email;
            authDto.password = req.password;
            authDto.username = req.userName;
            authDto.createdUser = req.createdUser;
            await transactionalEntityManager.startTransaction();
            const authSave: AuthenticationEntity = await this.authService.createAuthentication(authDto, transactionalEntityManager);
            const conversion = this.adapter.convertDtoToEntity(req);
            conversion.authentication = authSave;
            await transactionalEntityManager.getRepository(UserEntity).save(conversion);
            await transactionalEntityManager.completeTransaction();
            return new CommonResponse(true, 2345, 'Created Successfully');
        } catch (error) {
            await transactionalEntityManager.releaseTransaction();
            return error;
        }

    }
    async getAllUsers(): Promise<GetAllUserResponse> {
        const getAll = await this.repo.find();
        const get: GetAllUsersDto[] = [];
        for (const data of getAll) {
            const submit = this.adapter.convertEntityToDto(data);
            get.push(submit);
        }
        return new GetAllUserResponse(true, 1234, 'Data retrieved succeessfully', get)
    }

    async getAllUsersDropdown(): Promise<GetAllUsersDropDown> {
        const dropdown = await this.repo.find({ select: ['firstName', 'middleName', 'lastName', 'id'] });
        const data: DropdownUsersDto[] = [];
        for (const getDropdown of dropdown) {
            const get = this.adapter.convertDropdownEntityToDto(getDropdown)
            data.push(get);
        }
        return new GetAllUsersDropDown(true, 2334, 'Data retrieved succeesfully', data)
    }

    async activateDeactivateUsers(userDto: UsersIdDto): Promise<CommonResponse> {
        const deactivate = await this.repo.findOne({ where: { id: userDto.usersId } })
        const activate = await this.repo.update({ id: userDto.usersId }, { isActive: !deactivate.isActive })
        return new CommonResponse(true, 1233, `Status ${!deactivate.isActive ? 'Activated' : 'Deactivated'} successfully`)
    }

    async getUsersByUnitId(req: UnitIdDto): Promise<GetAllUserResponse> {
        const app = new UnitEntity();
        app.id = req.unitId;
        const getAll = await this.repo.find({ where: { unit: app }, relations: ['unit'] });
        const getData: GetAllUsersDto[] = [];
        for (const app of getAll) {
            const data = this.adapter.convertEntityToDto(app);
            getData.push(data);
        }
        if (getData.length === 0) {
            return new GlobalResponseObject(false, 45, 'No Data Found');
        }
        return new GetAllUserResponse(true, 456, "Data Retrieved Successfully", getData)
    }

    async getUsersByOrgId(req: OrganizationReqDto): Promise<GetAllUserResponse> {
        const apps = new Client();
        apps.id = req.organizationId;
        const getAll = await this.repo.find({ where: { client: apps }, relations: ['client'] });
        const getData: GetAllUsersDto[] = [];
        for (const apps of getAll) {
            const data = this.adapter.convertEntityToDto(apps);
            getData.push(data);
        }
        if (getData.length === 0) {
            return new GlobalResponseObject(false, 4, 'No Data Found');
        }
        getData.reverse();
        return new GetAllUserResponse(true, 5, "Data Retrieved Successfully", getData)
    }
}

