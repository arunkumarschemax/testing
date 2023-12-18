import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/users.entity";
import { AllUsersResponseDto } from "@finestchoicex-iam/shared-models";

@Injectable()
export class UserRepo extends Repository<UserEntity>{
    constructor(private dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async getUsersByOrgId(organizationId:number){
        const queryData = await this.createQueryBuilder("u") // Use "u" alias for userEntity
        .select(`u.id as usersId,u.first_name as firstName,u.mobile_no as mobileNo,u.gender,c.id as clientId, c.name as clientName`)
        .leftJoin("u.client", "c")
        .where(`u.client_id = '${organizationId}'`)
        .getRawMany();
        const data = queryData.map((rec) => {
            return new  AllUsersResponseDto (
                rec.usersId,
                rec.firstName,
                rec.mobileNo,
                rec.gender,
                rec.application_id,
                rec.clientId,
                rec.clientName
            );
        });
    
        return data;
    }
}