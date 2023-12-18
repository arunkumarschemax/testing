import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { Units } from "../../units/enties/units.entity";

@Entity('organization')
export class Organization extends AbstractEntity {

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('varchar', { name: 'description', length: 255 })
    description: string;

    @OneToMany(() => Units, (units: Units) => units.organization)
    public units: Units[];
}