import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthenticationEntity } from "../entities";

@Injectable()
export class AuthenticationRepository extends Repository<AuthenticationEntity>{
    constructor(private dataSource: DataSource) {
        super(AuthenticationEntity, dataSource.createEntityManager());
      }
}