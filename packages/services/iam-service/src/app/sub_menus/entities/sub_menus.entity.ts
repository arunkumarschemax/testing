import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";

@Entity('sub_menus')
export class SubMenu extends AbstractEntity{
    @Column('varchar',{name:'name',length:255})
    name: string;

    @Column('varchar',{name:'order',length:11})
    order: number;

    @Column('enum',{ name:' icon_type',enum: ['sysLib', 'svg'] })
    icon_type: 'sysLib' | 'svg';

    @Column('varchar',{name:'icon_name',length:40})
    icon_name: string;

    @Column('varchar',{name:'path',length:255})
    path: string;

    @Column('varchar',{name:'component',length:255})
    component: string;

    // @ManyToOne(() => sub_menus, sub_menu => sub_menu.sub_menus)
    // @JoinColumn({ name: 'parent_id' })
    // parent: sub_menu;
  
    // @ManyToOne(() => Menu, menu => menu.sub_menus)
    // @JoinColumn({ name: 'menu_id' })
    // menu: Menu;
}