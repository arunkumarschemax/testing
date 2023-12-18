import Icon, * as antdIcons from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import {
    Link,
    Outlet,
} from "react-router-dom";
import { JSX } from 'react/jsx-runtime';
import { useAuthState } from '../common/auth-context';
import { CommonHeader } from '../common/header-nav-component/header-nav-component';
import { ApplicationPage, AttributePage, ClientToApplicationsMapping, MenuPage, ModulePage, OrganizationPage, PermissionsPage, RolePermissionsMapping, RolesPage, ScopePage, SubMenuPage, UnitPage, UserPage, UserRoleMappings } from '../components';
import './BasicLayout.css';



const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export const availableRoutes: any[] = [
    {
        path: '/attribute',
        key: '/attribute',
        title: 'Attributes',
        icon: <antdIcons.HomeOutlined />,
        component: <AttributePage />,
    },
    {
        path: '/applications',
        key: '/applications',
        title: 'Applications',
        icon: <antdIcons.HomeOutlined />,
        component: <ApplicationPage />,
    },
    {
        path: '/modules',
        key: '/modules',
        title: 'Modules',
        icon: <antdIcons.HomeOutlined />,
        component: <ModulePage />,
    },
    {
        path: '/menu',
        key: '/menu',
        title: 'Menu',
        icon: <antdIcons.HomeOutlined />,
        component: <MenuPage />,
    },
    {
        path: '/sub-menu',
        key: '/sub-menu',
        title: 'Sub-Menu',
        icon: <antdIcons.HomeOutlined />,
        component: <SubMenuPage />,
    },
    {
        path: '/scopes',
        key: '/scopes',
        title: 'Scopes',
        icon: <antdIcons.HomeOutlined />,
        component: <ScopePage />,
    },
    {
        path: '/permissions',
        key: '/permissions',
        title: 'Permissions',
        icon: <antdIcons.HomeOutlined />,
        component: <PermissionsPage />,
    },
    // {
    //     path: '/profile',
    //     title: 'Profile',
    //     icon: <antdIcons.HomeOutlined />,
    //     component: <PermissionsPage />,
    // },
    {
        path: '/client',
        key: '/client',
        title: 'Client',
        icon: <antdIcons.HomeOutlined />,
        component: <OrganizationPage />,
    },
    {
        path: '/clientToApplicationMapping',
        key: '/clientToApplicationMapping',
        title: 'Client-Application',
        icon: <antdIcons.HomeOutlined />,
        component: <ClientToApplicationsMapping />,
    },
    {
        path: '/client-menu',
        key: '/client-menu',
        title: 'Client Menu',
        icon: <antdIcons.HomeOutlined />,
        component: <> </>,
        children: [
            {
                path: '/units',
                key: '/units',
                title: 'Units',
                icon: <antdIcons.HomeOutlined />,
                component: <UnitPage />,
            },
            {
                path: '/roles',
                key: '/roles',
                title: 'Roles',
                icon: <antdIcons.HomeOutlined />,
                component: <RolesPage />,
            },
            {
                path: '/user-creation',
                key: '/user-creation',
                title: 'User',
                icon: <antdIcons.HomeOutlined />,
                component: <UserPage />,
            },
            {
                path: '/user-role-mappings',
                key: '/user-role-mappings',
                title: 'User Role Mapping',
                icon: <antdIcons.HomeOutlined />,
                component: <UserRoleMappings />,
            },
            {
                path: '/role-permissions-mapping',
                key: '/role-permissions-mapping',
                title: 'Role Permissions Mapping',
                icon: <antdIcons.HomeOutlined />,
                component: <RolePermissionsMapping />,
            },
        ]
    }
];


const icons: any = {
    TDSIcon: '',
    ApprovalIcon: ''
}

export const BasicLayout = React.memo(() => {
    const { authContext } = useAuthState()
    const { menuAccessObject } = authContext
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(prevCollapsed => !prevCollapsed);
    };

    function renderIcon(iconType: string, iconName: string) {
        const typeConvertedAntdIcons: any = antdIcons;
        if (iconType === "antd") { const SpecificIcon = typeConvertedAntdIcons[iconName]; return <SpecificIcon /> }
        else {
            const SpecificIcon = icons[iconName];
            return <Icon component={SpecificIcon} style={{ fontSize: '20px' }} />
        }
    }

    const getSubMenu = (route: { path: any; title: any; icon: any; component?: null; children: any; }) => {
        if (route && route.children && route.children.length) {
            return (
                <SubMenu key={route.title} title={<span> {route.icon} <span>{route.title}</span> </span>}  >
                    {route.children.map((item: any) => getSubMenu(item))}
                </SubMenu>
            )
        } else {
            return <Menu.Item key={route.title} ><Link to={route.path}><span><span> {route.icon} <span>{route.title}</span> </span></span></Link> </Menu.Item>
        }
    }
    const getAllSubMenus = () => {
        const subMenus: JSX.Element[] = [];
        availableRoutes.forEach(eachRoutes => {
            subMenus.push(getSubMenu(eachRoutes));
        });
        return subMenus;
    }

    // const getSubMenu = (route) => {
    //     if (route && route.subMenuData && route.subMenuData.length) {
    //         return (
    //             <SubMenu key={route.menuId} title={<span> {renderIcon(route.iconType, route.iconName)} <span>{route.menuName}</span> </span>}  >
    //                 {route.subMenuData.map(item => getSubMenu(item))}
    //             </SubMenu>
    //         )
    //     } else {
    //         return <Menu.Item key={route.subMenuId} ><Link to={route.path}><span><span> {route.icon} <span>{route.subMenuName}</span> </span></span></Link> </Menu.Item>
    //     }
    // }
    // const getAllSubMenus = () => {
    //     const subMenus = [];
    //     menuAccessObject.forEach(eachRoutes => {
    //         subMenus.push(getSubMenu(eachRoutes));
    //     });
    //     return subMenus;
    // }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                className='layout'
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint='lg'
                collapsedWidth='80'
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    background: '#fff',
                    marginTop: '60px'
                }}
            >

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ marginTop: '20px' }}
                >
                    {getAllSubMenus()}
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 230 }}>
                <CommonHeader key={Date.now()} toggle={toggle} collapsed={collapsed} />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '78px 16px',
                        background: '#f0f2f5',
                        height: '100vh'
                    }}
                >
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>©2023 Design and Developed by SchemaX</Footer>

            </Layout>
        </Layout>
    );
})

export default BasicLayout;