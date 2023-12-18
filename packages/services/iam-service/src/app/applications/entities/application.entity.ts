import { AbstractCursor, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";

@Entity('application')
export class Application extends AbstractEntity {
    @Column('varchar', {
        name: 'name',
        length: 255
    })
    name: string;

    @Column('varchar', {
        name: 'description',
        length: 225
    })
    description: string;
}

