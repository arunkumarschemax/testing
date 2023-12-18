import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { Organization } from "../../organization/entities/organization.entity";

@Entity('units')
export class Units extends AbstractEntity {
    @Column("varchar", {
        name: 'name',
        length: 225
    })
    name: string;

    @Column('varchar', {
        name: 'description',
        length: 225
    })
    description: string;

    @ManyToOne(() => Organization, (org: Organization) => org.units, { nullable: false })
    @JoinColumn({ name: 'organization_id' })
    organization: Organization;
}

