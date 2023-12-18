import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm"; 
import { Organization } from "../entities/organization.entity";

@Injectable()
export class OrganizationRepo extends Repository<Organization>{
    constructor(private dataSource: DataSource) {
        super(Organization, dataSource.createEntityManager());
    }

}