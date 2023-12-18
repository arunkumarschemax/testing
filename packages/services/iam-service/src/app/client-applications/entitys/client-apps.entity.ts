import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { RolesEntity } from "../../roles/entities/roles.entity";
import { UserEntity } from "../../users/entities/users.entity";
import { ApplicationEntity } from "../../applications/entities/application.entity";
import { Client } from "../../organization/entities/organization.entity";
import { UnitEntity } from "../../units/entities/units.entity";

@Entity('client_applications')
export class ClientAppsEntity extends AbstractEntity {

    @ManyToOne(type => ApplicationEntity, app => app.clientApps, { nullable: false })
    @JoinColumn({ name: 'application_id' })
    application: ApplicationEntity;

    @ManyToOne(() => Client, (org: Client) => org.clientApps, { nullable: false })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToOne(() => UnitEntity, (unit: UnitEntity) => unit.clientApps, { nullable: false })
    @JoinColumn({ name: 'unit_id' })
    unit:UnitEntity;
}

