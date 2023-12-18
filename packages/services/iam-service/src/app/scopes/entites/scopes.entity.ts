import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { PermissionsEntity } from "../../permissions/entities/permissions.entity";

@Entity('scopes')
export class ScopesEntity extends AbstractEntity {
    @Column('varchar', {
        name: 'name',
        length: 60
    })
    name: string;

    @Column('varchar', {
        name: 'code',
        length: 60,
    })
    code: string;

    @OneToMany(() => PermissionsEntity, (permission) => permission.scope)
    permissions: PermissionsEntity[];
}
