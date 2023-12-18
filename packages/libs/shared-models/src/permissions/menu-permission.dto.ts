import { PermissionsDto } from "./permissions.dto";

export class SubMenuPermissionDto {
    menuId: number;
    menuName: string;
    permissions: PermissionsDto[];
    constructor(menuId: number, menuName: string, permissions: PermissionsDto[]) {
        this.menuId = menuId;
        this.menuName = menuName;
        this.permissions = permissions;
    }
}