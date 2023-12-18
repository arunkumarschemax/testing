
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { MenusEntity } from "../../menus/entities/menus.entity";
import { IconType } from "@finestchoicex-iam/shared-models";
import { PermissionsEntity } from "../../permissions/entities/permissions.entity";
import { ApplicationEntity } from "../../applications/entities/application.entity";
import { ModulesEntity } from "../../modules/entities/modules.entity";

@Entity('sub_menus')
export class SubMenuEntity extends AbstractEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'order' })
  order: number;

  @Column('enum', { name: 'icon_type', enum: IconType })
  iconType: IconType;

  @Column('varchar', { name: 'icon_name', length: 40 })
  iconName: string;

  @Column('varchar', { name: 'path', length: 255 })
  path: string;

  @Column('varchar', { name: 'component', length: 255 })
  component: string;

  @Column('boolean', { name: 'is_only_routing' })
  isOnlyRouting: boolean;


  @ManyToOne(type => MenusEntity, menu => menu.subMenus, { nullable: false })
  @JoinColumn({ name: "menu_id" })
  menu: MenusEntity;

  @ManyToOne(type => ApplicationEntity, app => app.subMenus, { nullable: false })
  @JoinColumn({ name: 'application_id' })
  application: ApplicationEntity;

  @ManyToOne(type => SubMenuEntity, subMenu => subMenu.children)
  @JoinColumn({ name: 'parent_id' })
  parent: SubMenuEntity;

  @ManyToOne(type => ModulesEntity, module => module.subMenus, { nullable: false })
  @JoinColumn({ name: 'module_id' })
  module: ModulesEntity;

  @OneToMany(() => SubMenuEntity, (subMenu) => subMenu.parent)
  children: SubMenuEntity[];

  @OneToMany(() => PermissionsEntity, (subMenu) => subMenu.subMenu)
  permissions: PermissionsEntity[];

}