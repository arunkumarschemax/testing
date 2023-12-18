import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { CONFIGURABLE_MODULE_ID } from "@nestjs/common/module-utils/constants";
import { Module } from "@nestjs/common";

export enum IConTypeEnum {
    SYS_LIB = 'sysLib',
    SVG = 'svg'
}
@Entity('menus')
export class Menus extends AbstractEntity {
    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('varchar', { name: 'order', length: 11 })
    order: number;

    @Column('enum', { name: 'icon_type', enum: IConTypeEnum })
    icon_type: IConTypeEnum;

    @Column('varchar', { name: 'icon_name', length: 50 })
    icon_name: string;

}
// @ManyToOne(() => Module, module => module.menus)
// module: Module;
// @CONFIGURABLE_MODULE_ID xxxxxxxx