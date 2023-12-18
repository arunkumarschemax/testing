import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/users.entity";

@Injectable()
export class UserRepo extends Repository<UserEntity>{
    constructor(private dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

}