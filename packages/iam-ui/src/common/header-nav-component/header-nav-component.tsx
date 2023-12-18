import React from 'react'
import { Layout, Row, Col, Menu, Dropdown, Button, Avatar } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './header-nav-component.css';
import { useAuthState, logout } from '../auth-context';
import { UsersService } from "@finestchoicex-iam/shared-services";
import { AlertMessages } from '../notifications';
import { BaseCol } from '../component-lib/BaseCol/BaseCol';
import { BaseRow } from '../component-lib/BaseRow/BaseRow';
import { HeaderFullscreen } from '../component-lib/header/components/HeaderFullscreen/HeaderFullscreen';
import { NotificationsDropdown } from '../component-lib/header/components/notificationsDropdown/NotificationsDropdown';
import { SettingsDropdown } from '../component-lib/header/components/settingsDropdown/SettingsDropdown';
const { Header } = Layout;
interface IProps {
  collapsed: boolean;
  toggle: () => void;
}
export const CommonHeader = (props: IProps) => {
  const { authContext, dispatch } = useAuthState();
  const service = new UsersService();
  let profilePicPath = authContext.user.profilePicPath ? authContext.user.profilePicPath : ``
  const logoutHandler = async () => {
    try {
      const saltRes = await service.logOut({ username: authContext.user.username, password: `SaiResources${Math.random()}` })
      if (saltRes.status) {
        logout(dispatch);
      } else {
        throw Error(saltRes.internalMessage);
      }
    } catch (error: any) {
      AlertMessages.getErrorMessage(error.message);
    }
  }
  const menu = (
    <Menu >
      <Menu.Item>
        UserName: {authContext.user.userName}
      </Menu.Item>
      <Menu.Item>
        Roles: {authContext.user.roles}
      </Menu.Item>
      <Menu.Item>
        Plant: {authContext.defaultPlant}
      </Menu.Item>
      <Menu.Item key='logout'>
        <Button
          onClick={() => logoutHandler()}
        >
          logout
        </Button>
      </Menu.Item>
    </Menu>
  );


  return (
    <Header className='header-row' style={{ background: '#fff', padding: 0 }}>
      <Row justify='space-between' align='middle'>
        <Col span={4}>
          <div className="logo" >
            <h1>{authContext.defaultPlantName}</h1>
          </div>
        </Col>
        <Col span={1} >
          <span className='ant-pro-global-header-trigger'>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: props.toggle,
            })}
          </span>
        </Col>
        <Col span={10}>
        </Col>
        <Col offset={5} span={3}>
          <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
            <BaseCol>
              <HeaderFullscreen />
            </BaseCol>

            <BaseCol>
              <NotificationsDropdown />
            </BaseCol>

            <BaseCol>
              <SettingsDropdown />
            </BaseCol>
            <BaseCol>
              <Dropdown overlay={menu}>
                <span className='ant-dropdown-link'>
                  <Avatar src={profilePicPath} size={'default'} shape="circle">{authContext.user.userName}</Avatar>
                </span>
              </Dropdown>
            </BaseCol>
          </BaseRow>
        </Col>
      </Row>
    </Header>
  )
}
