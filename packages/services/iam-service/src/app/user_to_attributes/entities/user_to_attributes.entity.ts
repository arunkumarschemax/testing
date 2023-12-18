import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";


@Entity('user_to_attributes')
export class UserToAttributes extends AbstractEntity{

    @Column('varchar', {
        name: 'attribute',
        length: 40
    })
    attribute: string;

    @Column('varchar', {
        name: 'value',
        length: 225
    })
    value: string;


    // @ManyToOne(() => Users, (u) => u.userId)
    // @JoinColumn({ name:"user_id" })
    // user:Users;


}

