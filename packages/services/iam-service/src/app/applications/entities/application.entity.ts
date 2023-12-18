import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../database/common-entities";
import { ModulesEntity } from "../../modules/entities/modules.entity";
import { MenusEntity } from "../../menus/entities/menus.entity";
import { PermissionsEntity } from "../../permissions/entities/permissions.entity";
import { SubMenuEntity } from "../../sub-menus/entities/sub-menus.entity";
import { ClientAppsEntity } from "../../client-applications/entitys/client-apps.entity";

@Entity('application')
export class ApplicationEntity extends AbstractEntity {
    @Column('varchar', {
        name: 'name',
        length: 255
    })
    applicationName: string;

    @Column('varchar', {
        name: 'description',
        length: 225
    })
    description: string;

    @OneToMany(() => ModulesEntity, (module) => module.application)
    modules: ModulesEntity[];

    @OneToMany(() => MenusEntity, (menu) => menu.application)
    menus: MenusEntity[];

    @OneToMany(() => SubMenuEntity, (subMenu) => subMenu.application)
    subMenus: SubMenuEntity[];

    @OneToMany(() => PermissionsEntity, (subMenu) => subMenu.application)
    permissions: PermissionsEntity[];

    @OneToMany(() => ClientAppsEntity, (clientApps) => clientApps.application)
    clientApps: ClientAppsEntity[];

}

