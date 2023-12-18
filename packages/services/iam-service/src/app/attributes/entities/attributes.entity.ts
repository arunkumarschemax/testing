import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";

@Entity('attributes')
export class AttributesEntity extends AbstractEntity {
    @Column('varchar', {
        name: 'attribute_name',
        length: 40,
        nullable: true
    })
    attributeName: string;
}