import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";

@Entity('scopes')
export class Scopes extends AbstractEntity {


    @Column('varchar', {
        name: 'name',
        length: 60
    })
    name: string;

    @Column('varchar', {
        name: 'code',
        length: 60,
    })
    code: string

}