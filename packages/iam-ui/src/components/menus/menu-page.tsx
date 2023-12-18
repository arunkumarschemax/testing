import { Card, Button, Drawer, Col, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { MenuForm } from './menu-form';
import { MenuGrid } from './menu-grid';
import { AppModuleIdReqDto, ApplicationIdReqDto, ApplicationsDropDownDto, IconType, MenuIdReqDto, MenusDto, ModulesDropDownDto } from '@finestchoicex-iam/shared-models';
import { useTranslation } from 'react-i18next';
import { useAuthState } from '../../common/auth-context';
import { ApplicationService, MenuService, ModuleService } from '@finestchoicex-iam/shared-services';

const { Option } = Select;
export const MenuPage = () => {
    const { t } = useTranslation();
    const { authContext } = useAuthState()
    const [showForm, setShowForm] = useState(false);
    const [menuData, setMenuData] = useState<MenusDto[]>([]);
    const [applications, setApplications] = useState<ApplicationsDropDownDto[]>([]);
    const [selectedApplication, setSelectedApplication] = useState<number>();
    const [selectedModule, setSelectedModule] = useState<number>();
    const [moduleData, setModuleData] = useState<ModulesDropDownDto[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<MenusDto>();


    const applicationService = new ApplicationService();
    const moduleService = new ModuleService();
    const menuService = new MenuService();

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

    const getAllMenusByModuleAndAppId = (req: AppModuleIdReqDto) => {
        menuService.getAllMenusByModuleAndAppId(req).then(res => {
            if (res.status) {
                setMenuData(res.data ? res.data : []);
            } else {
                setMenuData([]);
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const submitHandler = (req: MenusDto) => {
        menuService.create(req).then(res => {
            if (res.status) {
                const appModuleIdReq: AppModuleIdReqDto = new AppModuleIdReqDto(authContext.user.userName, authContext.user.id, selectedApplication ? selectedApplication : 0, selectedModule ? selectedModule : 0);
                getAllMenusByModuleAndAppId(appModuleIdReq);
                closeButtonHandler();
            }
        }).catch(err => {
            console.log(err);
        });


    }

    const createButtonHandler = () => {
        setSelectedRecord(new MenusDto(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true, 1, selectedModule, undefined, selectedApplication, undefined));
        setShowForm(true);
    }

    const closeButtonHandler = () => {
        setSelectedRecord(undefined);
        setShowForm(false);
    }

    const editHandler = (rec: MenusDto) => {
        setSelectedRecord(rec);
        setShowForm(true);
    }

    const activateOrDeactivate = (rec: MenusDto) => {
        const req = new MenuIdReqDto(authContext.user.userName, authContext.user.id, rec.menuId)
        menuService.activateOrDeactivateMenu(req).then(res => {
            if (res.status) {
                const appModuleIdReq: AppModuleIdReqDto = new AppModuleIdReqDto(authContext.user.userName, authContext.user.id, selectedApplication ? selectedApplication : 0, selectedModule ? selectedModule : 0);
                getAllMenusByModuleAndAppId(appModuleIdReq);
            }
        }).catch(err => {
            console.log(err);
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
        getAllMenusByModuleAndAppId(appModuleIdReq)
    }

    const getTitle = () => {
        return <>
            <Row>
                <Col><h3>Menus</h3></Col>
                <Col offset={1} span={3}>
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
            </Row>
        </>
    }
    return (
        <>
            <Card title={getTitle()} extra={selectedModule && <Button onClick={createButtonHandler}>Create</Button>}>
                {selectedModule && <>
                    <MenuGrid data={menuData} editHandler={editHandler} activateOrDeactivate={activateOrDeactivate} />
                    <Drawer
                        title={'Menu'}
                        open={showForm}
                        onClose={closeButtonHandler}
                        width='50%'
                        key={Date.now()}
                    >
                        <MenuForm submitHandler={submitHandler} initialValues={selectedRecord} />
                    </Drawer>
                </>}
            </Card>
        </>
    )
}

export default MenuPage