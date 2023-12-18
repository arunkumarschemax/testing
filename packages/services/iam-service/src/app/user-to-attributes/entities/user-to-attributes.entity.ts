import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { UserEntity } from "../../users/entities/users.entity";


@Entity('user-to-attributes')
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


    @ManyToOne(() => UserEntity, (user: UserEntity) => user.userAttributes, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

}

