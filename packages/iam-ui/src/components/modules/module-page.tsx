import { Card, Button, Drawer, Select, Col, Row, Form } from 'antd';
import { useEffect, useState } from 'react';
import { ModuleForm } from './module-form';
import { ModuleGrid } from './module-grid';
import { ApplicationIdReqDto, ApplicationsDropDownDto, ModuleDto, ModulesIdReqDto } from '@finestchoicex-iam/shared-models';
import { ApplicationService, ModuleService } from '@finestchoicex-iam/shared-services';
import { useTranslation } from 'react-i18next';
import { useAuthState } from '../../common/auth-context';

const { Option } = Select;
export const ModulePage = () => {
    const { t } = useTranslation();
    const { authContext } = useAuthState()
    const [showForm, setShowForm] = useState(false);
    const [moduleData, setModuleData] = useState<ModuleDto[]>([]);
    const [applications, setApplications] = useState<ApplicationsDropDownDto[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<ModuleDto>();
    const [selectedApplication, setSelectedApplication] = useState<number>();


    const applicationService = new ApplicationService();
    const moduleService = new ModuleService();

    useEffect(() => {
        getAllApplicationsDropDown();
    }, []);


    const getAllApplicationsDropDown = () => {
        applicationService.getAllApplicationsDropDown().then(res => {
            if (res.status) {
                setApplications(res.data ? res.data : []);
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const getAllModulesByAppId = (appIdReq: ApplicationIdReqDto) => {
        moduleService.getAllModulesByAppId(appIdReq).then(res => {
            if (res.status) {
                setModuleData(res.data ? res.data : []);
            } else {
                setModuleData([]);
            }
        }).catch(err => {
            console.log(err)
        })
    }



    const submitHandler = (req: ModuleDto) => {
        moduleService.create(req).then(res => {
            if (res.status) {
                const appIdReq: ApplicationIdReqDto = new ApplicationIdReqDto(authContext.user.userName, authContext.user.id, selectedApplication ? selectedApplication : 0);
                getAllModulesByAppId(appIdReq);
                closeButtonHandler();
            }
        }).catch(err => {

        });


    }

    const createButtonHandler = () => {
        setSelectedRecord(new ModuleDto(undefined, undefined, undefined, undefined, undefined, selectedApplication, undefined, true, 1))
        setShowForm(true);
    }

    const closeButtonHandler = () => {
        setSelectedRecord(undefined);
        setShowForm(false);
    }

    const editHandler = (rec: ModuleDto) => {
        setSelectedRecord(rec);
        setShowForm(true);
    }

    const activateOrDeactivate = (rec: ModuleDto) => {
        const req = new ModulesIdReqDto(authContext.user.userName, authContext.user.id, rec.moduleId)
        moduleService.activateOrDeactivate(req).then(res => {
            if (res.status) {
                const appIdReq: ApplicationIdReqDto = new ApplicationIdReqDto(authContext.user.userName, authContext.user.id, selectedApplication ? selectedApplication : 0);
                getAllModulesByAppId(appIdReq);
            }
        }).catch(err => {
            console.log(err)
        })

    }

    const onApplicationChange = (appId: number) => {
        setSelectedApplication(appId);
        const appIdReq: ApplicationIdReqDto = new ApplicationIdReqDto(authContext.user.userName, authContext.user.id, appId);
        getAllModulesByAppId(appIdReq);
    }

    const getTitle = () => {
        return <>
            <Row>
                <Col><h3>Module</h3></Col>
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
            </Row>
        </>
    }
    return (
        <>
            <Card title={getTitle()} extra={selectedApplication && <Button onClick={createButtonHandler}>Create</Button>}>
                {selectedApplication && <>
                    <ModuleGrid data={moduleData} editHandler={editHandler} activateOrDeactivate={activateOrDeactivate} />
                    <Drawer
                        title={'Module'}
                        open={showForm}
                        onClose={closeButtonHandler}
                        width='50%'
                        key={Date.now()}
                    >
                        <ModuleForm submitHandler={submitHandler} initialValues={selectedRecord} />
                    </Drawer>
                </>}
            </Card>
        </>
    )
}

export default ModulePage


