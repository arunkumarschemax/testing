import { Card, Button, Drawer, Col, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { SubMenuForm } from './sub-menu-form';
import { SubMenuGrid } from './sub-menu-grid';
import { MenusDto, ApplicationsDropDownDto, ModulesDropDownDto, ApplicationIdReqDto, MenuIdReqDto, SubMenuDto, AppModuleMenuIdReqDto, AppModuleIdReqDto, MenusDropdownDto, SubMenuIdReqDto } from '@finestchoicex-iam/shared-models';
import { ApplicationService, ModuleService, MenuService, SubMenuService } from '@finestchoicex-iam/shared-services';
import { useTranslation } from 'react-i18next';
import { useAuthState } from '../../common/auth-context';

const { Option } = Select;
export const SubMenuPage = () => {
    const { t } = useTranslation();
    const { authContext } = useAuthState()
    const [showForm, setShowForm] = useState(false);
    const [subMenuData, setSubMenuData] = useState<SubMenuDto[]>([]);
    const [applications, setApplications] = useState<ApplicationsDropDownDto[]>([]);
    const [selectedApplication, setSelectedApplication] = useState<number>();
    const [selectedModule, setSelectedModule] = useState<number>();
    const [selectedMenu, setSelectedMenu] = useState<number>();
    const [moduleData, setModuleData] = useState<ModulesDropDownDto[]>([]);
    const [menusData, setMenusData] = useState<MenusDropdownDto[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<SubMenuDto>();


    const applicationService = new ApplicationService();
    const moduleService = new ModuleService();
    const menuService = new MenuService();
    const subMenuService = new SubMenuService();

    useEffect(() => {
        getAllApplicationsDropDown();
    }, []);


    const getAllApplicationsDropDown = () => {
        applicationService.getAllApplicationsDropDown().then(res => {
            if (res.status) {
                setApplications(res.data ? res.data : []);
            } else {
                setApplications([]);
            }
            setSelectedApplication(undefined);
            setSelectedModule(undefined);
        }).catch(err => {
            console.log(err)
        })
    }


    const getAllModulesDropDownByAppId = (appIdReq: ApplicationIdReqDto) => {
        moduleService.getAllModulesDropDownByAppId(appIdReq).then(res => {
            if (res.status) {
                setModuleData(res.data ? res.data : []);
            } else {
                setModuleData([]);
            }
            setSelectedModule(undefined);
        }).catch(err => {
            console.log(err)
        })
    }

    const getAllMenusDropDownByModuleAndAppId = (appIdReq: AppModuleIdReqDto) => {
        menuService.getAllMenusDropDownByModuleAndAppId(appIdReq).then(res => {
            if (res.status) {
                setMenusData(res.data ? res.data : []);
            } else {
                setMenusData([]);
            }
            setSelectedMenu(undefined);
        }).catch(err => {
            console.log(err)
        })
    }

    const getAllSubMenusByMenuModuleAndAppId = (req: AppModuleMenuIdReqDto) => {
        subMenuService.getAllSubMenusByMenuModuleAndAppId(req).then(res => {
            if (res.status) {
                setSubMenuData(res.data ? res.data : []);
            } else {
                setSubMenuData([]);
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const submitHandler = (req: SubMenuDto) => {
        subMenuService.create(req).then(res => {
            if (res.status) {
                const appModuleIdReq: AppModuleMenuIdReqDto = new AppModuleMenuIdReqDto(authContext.user.userName, authContext.user.id, selectedApplication ? selectedApplication : 0, selectedModule ? selectedModule : 0, selectedMenu ? selectedMenu : 0);
                getAllSubMenusByMenuModuleAndAppId(appModuleIdReq);
                closeButtonHandler();
            }
        }).catch(err => {

        });


    }

    const createButtonHandler = () => {
        setSelectedRecord(new SubMenuDto(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, selectedMenu, undefined, selectedModule, undefined, selectedApplication, undefined, true, 1))
        setShowForm(true);
    }

    const closeButtonHandler = () => {
        setSelectedRecord(undefined);
        setShowForm(false);
    }

    const editHandler = (rec: SubMenuDto) => {
        setSelectedRecord(rec);
        setShowForm(true);
    }

    const activateOrDeactivate = (rec: SubMenuDto) => {
        const req = new SubMenuIdReqDto(authContext.user.userName, authContext.user.id, rec.subMenuId)
        subMenuService.activateOrDeactivateSubMenu(req).then(res => {
            if (res.status) {
                const appModuleIdReq: AppModuleMenuIdReqDto = new AppModuleMenuIdReqDto(authContext.user.userName, authContext.user.id, selectedApplication ? selectedApplication : 0, selectedModule ? selectedModule : 0, selectedMenu ? selectedMenu : 0);
                getAllSubMenusByMenuModuleAndAppId(appModuleIdReq);
            }
        }).catch(err => {
            console.log(err)
        })

    }

    const onApplicationChange = (appId: number) => {
        setSelectedApplication(appId);
        const appIdReq: ApplicationIdReqDto = new ApplicationIdReqDto(authContext.user.userName, authContext.user.id, appId);
        getAllModulesDropDownByAppId(appIdReq);
    }

    const onModuleChange = (moduleId: number) => {
        setSelectedModule(moduleId);
        const appModuleIdReq: AppModuleIdReqDto = new AppModuleIdReqDto(authContext.user.userName, authContext.user.id, selectedApplication, moduleId);
        getAllMenusDropDownByModuleAndAppId(appModuleIdReq)
    }

    const onMenuChange = (menuId: number) => {
        setSelectedMenu(menuId);
        const appModuleIdReq: AppModuleMenuIdReqDto = new AppModuleMenuIdReqDto(authContext.user.userName, authContext.user.id, selectedApplication, selectedModule, menuId);
        getAllSubMenusByMenuModuleAndAppId(appModuleIdReq)
    }

    const getTitle = () => {
        return <>
            <Row>
                <Col><h3>SubMenus</h3></Col>
                <Col offset={2} span={5}>
                    <label>Applications:&nbsp;</label>
                    <Select
                        showSearch
                        allowClear
                        onChange={onApplicationChange}
                        style={{ width: '100%' }}
                        placeholder='Please Select Application'
                        filterOption={(input, option) =>
                            (option?.['props'].label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {applications.map(rec => (
                            <Option value={rec.id} key={rec.id + 'app'} label={rec.applicationName}>
                                {rec.applicationName}
                            </Option>
                        ))}
                    </Select>
                </Col>
                {selectedApplication && (
                    <Col offset={2} span={3}>
                        <label>Modules:&nbsp;</label>
                        <Select
                            showSearch
                            allowClear
                            onChange={onModuleChange}
                            style={{ width: '100%' }}
                            placeholder='Please Select Module'
                            filterOption={(input, option) =>
                                (option?.['props'].label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={selectedModule}
                        >
                            {moduleData.map(rec => (
                                <Option value={rec.id} key={rec.id + 'mod'} label={rec.moduleName}>
                                    {rec.moduleName}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                )}
                {selectedModule && (
                    <Col offset={2} span={3}>
                        <label>Menus:&nbsp;</label>
                        <Select
                            showSearch
                            allowClear
                            onChange={onMenuChange}
                            style={{ width: '100%' }}
                            placeholder='Please Select Module'
                            filterOption={(input, option) =>
                                (option?.['props'].label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={selectedMenu}
                        >
                            {menusData.map(rec => (
                                <Option value={rec.menuId} key={rec.menuId + 'menu'} label={rec.name}>
                                    {rec.name}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                )}
            </Row>
        </>
    }
    return (
        <>
            <Card title={getTitle()} extra={selectedMenu && <Button onClick={createButtonHandler}>Create</Button>}>
                {selectedMenu && <>
                    <SubMenuGrid subMenuData={subMenuData} editHandler={editHandler} activateOrDeactivate={activateOrDeactivate} />
                    <Drawer
                        title={'Sub Menu'}
                        open={showForm}
                        onClose={closeButtonHandler}
                        width='50%'
                        key={Date.now()}
                    >
                        <SubMenuForm submitHandler={submitHandler} initialValues={selectedRecord} subMenuData={subMenuData} />
                    </Drawer>
                </>}
            </Card>
        </>
    )
}

export default SubMenuPage