export class SubMenuData {
    subMenuId: string;
    subMenuName: string;
    subMenuIconType: string;
    subMenuIconName: string;
    path: string;
    component: string;
    scopes: string[];
    baseSubMenuId?: string;
    subMenuChildren?: SubMenuData[];

    constructor(subMenuId: string, subMenuName: string, subMenuIconType: string, subMenuIconName: string, path: string, component: string, scopes: string[], baseSubMenuId?: string, subMenuChildren?: SubMenuData[]) {
        this.subMenuId = subMenuId;
        this.subMenuName = subMenuName;
        this.subMenuIconType = subMenuIconType;
        this.subMenuIconName = subMenuIconName;
        this.path = path;
        this.component = component;
        this.scopes = scopes;
        this.baseSubMenuId = baseSubMenuId;
        this.subMenuChildren = subMenuChildren;
    }
}