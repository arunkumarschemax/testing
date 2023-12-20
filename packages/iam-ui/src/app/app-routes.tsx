import { Route, Routes } from 'react-router-dom';
import { BasicLayout, availableRoutes } from '../layouts';
import { ChildProtectionWrapper } from '../common/protected-children-wrapper/protected-children-wrapper';
import { AttributePage, MenuPage, ModulePage, OrganizationPage, PermissionsPage, RolePermissionsMapping, RolesPage, ScopePage, SubMenuPage, UnitPage, UserForm, UserPage } from '../components';
import ApplicationPage from '../components/applications/application-page';
import ProfileLayout from '../common/component-lib/layouts/profile/ProfileLayout';
import { PersonalInfo } from '../common/component-lib/layouts/profile/profileCard/profileFormNav/nav/PersonalInfo/PersonalInfo';
import { SecuritySettings } from '../common/component-lib/layouts/profile/profileCard/profileFormNav/nav/SecuritySettings/SecuritySettings';
import { Notifications } from '../common/component-lib/layouts/profile/profileCard/profileFormNav/nav/notifications/Notifications/Notifications';
import { UserRoleMappings } from '../components/user-role-mapping';
import ClientToApplicationsMapping from '../components/client-applications-mapping/client-to-applications-mapping';
import { DynamicForm } from '../components/dynamic/dynamic-form';


export const AppRoutes = () => {
    const getRoute = (route: any) => {
        if (route && route.children && route.children.length) {
            return route.children.map((item: any) => getRoute(item))
        } else {
            return <Route key={`${route.key}`} path={`/${route.path}`} element={route.component} />
        }
    }
    const getAllRoutes = () => {
        const subMenus: any[] = [];
        availableRoutes.forEach(eachRoutes => {
            const abc = getRoute(eachRoutes);
            subMenus.push(abc);
        });
        return subMenus;
    }  
    return (
        <Routes>
            <Route path='/' element={
                <ChildProtectionWrapper>
                    <BasicLayout />
                </ChildProtectionWrapper>}>

                {/* <Route path='/attribute' element={<AttributePage />} />
                <Route path='/applications' element={<ApplicationPage />} />
                <Route path='/modules' element={<ModulePage />} />
                <Route path='/scopes' element={<ScopePage />} />
                <Route path='/menu' element={<MenuPage />} />
                <Route path='/sub-menu' element={<SubMenuPage />} />
                <Route path='/permissions' element={<PermissionsPage />} />
                <Route path='/clientToApplicationMapping' element={<ClientToApplicationsMapping/>} />
                <Route path="profile" element={<ProfileLayout />}>
                    <Route path="personal-info" element={<PersonalInfo />} />
                    <Route path="security-settings" element={<SecuritySettings />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>



                <Route path='/client' element={<OrganizationPage />} />
                <Route path='/units' element={<UnitPage />} />
                <Route path='/roles' element={<RolesPage />} />
                <Route path='/user-creation' element={<UserPage />} />
                <Route path='/user-role-mappings' element={<UserRoleMappings />} />
                <Route path='/role-permissions-mapping' element={<RolePermissionsMapping />} /> */}
                {/* {getAllRoutes().map(rec => rec)} */}
                <Route path='app' element={<ApplicationPage />}></Route>
                <Route path='dynamic' element={<DynamicForm />}></Route>
            </Route>
            <Route path="/login" element={<></>} />
        </Routes>
    )
}

export default AppRoutes