export const isPermissionExist = (menu: string, subMenu: string, scope: string) => {
    let logInUserData = JSON.parse(localStorage.getItem('currentUser'));
    const accessFlag = logInUserData.menuAccessObject.find((item: any) => item.menuName == menu).subMenuData.find((submenuItem: any) => submenuItem.subMenuName == subMenu).scopes;
    const scopeCheck = accessFlag.includes(scope);
    return scopeCheck
}

export const isPermissionExistThirdLayer = (menu: string, subParentMenu: string, subMenu: string, scope: string) => {
    let logInUserData = JSON.parse(localStorage.getItem('currentUser'));
    const accessFlag = logInUserData.menuAccessObject.find((item: any) => item.menuName == menu).subMenuData.find((submenuItem: any) => submenuItem.subMenuName == subMenu).scopes;
    const scopeCheck = accessFlag.includes(scope);
    return scopeCheck
}

export const isRoleExist = (role: string) => {

}
