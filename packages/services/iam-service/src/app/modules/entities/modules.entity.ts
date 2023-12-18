import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";

@Entity('module')
export class ModulesEntity extends AbstractEntity {

    @Column('varchar', {
        name: 'name',
        length: 255
    })
    name: string;

    @Column('varchar', {
        name: 'description',
        length: 225
    })
    Description: string;

    // @ManyToOne(() => Application, (aps) => aps.applicationId)
    // @JoinColumn({ name:"application_id" })
    // module: Application;
}