import { Card, Button, Drawer, Row, Col, Select } from 'antd';
import { useEffect, useState } from 'react';
import { UserForm } from './user-form';
import { UserGrid } from './user-grid';
import { OrganizationService, UnitsService, UsersService } from '@finestchoicex-iam/shared-services';
import { AlertMessages } from '../../common/notifications';
import { GetAllUsersDto, OrganizationReqDto, UsersCreateDto } from '@finestchoicex-iam/shared-models';
import { useAuthState } from '../../common/auth-context';


export const UserPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [userData, setUserData] = useState<any[]>([]);
    const [dummyRefresh, setDummyRefresh] = useState<number>(0)
    const [initialValues, setInitialValues] = useState<GetAllUsersDto>();
    const [clients, setClients] = useState<any[]>([]);
    const [selectedClients, setSelectedClients] = useState<number>();
    const [unitsData, setUnitsData] = useState<any[]>([]);
    const { authContext } = useAuthState();
    const { Option } = Select;
    const service = new UsersService();
    const orgService = new OrganizationService();
    const unitService = new UnitsService();

    useEffect(() => {
        getAllClients();
    }, []);

    const getUnitsByClientId = (orgIdReq: OrganizationReqDto) => {
        unitService.getUnitsByOrgId(orgIdReq).then((res) => {
            if (res.status) {
                setUnitsData(res.data);
            } else {
                setUnitsData([]);
            }
        }).catch(err => {
            console.log(err.message, 'error message')
        })
    }

    const getUsersByOrganizationId = (orgIdReq: OrganizationReqDto) => {
        service.getUsersByOrgId(orgIdReq).then((res) => {
            if (res.status) {
                setUserData(res.data);
            } else {
                setUserData([])
            }
        }).catch(err => {
            console.log(err.message, 'error msg')
        })
    }

    const submitHandler = (req: UsersCreateDto) => {
        service.createUser(req).then((res: any) => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage);
                closeButtonHandler();
            } else {
                AlertMessages.getErrorMessage(res.message);
            };
        }).catch(err => {
            console.log(err.message, 'error msg')
        })
    }

    const createButtonHandler = () => {
        setShowForm(true);
        setDummyRefresh(prev => prev + 1);
    }

    const closeButtonHandler = () => {
        setInitialValues(undefined);
        setShowForm(false);
        setDummyRefresh(prev => prev + 1);
        onClientsChange(selectedClients);
    }
    const getAllClients = () => {
        orgService.getAllOrganizationsDropdown().then((res) => {
            if (res.status) {
                setClients(res.data)
            } else {
                setClients([])
            }
        }).catch(err => {
            console.log(err.message, 'error message')
        })
    }

    const onClientsChange = (orgId: number) => {
        setSelectedClients(orgId)
        const orgIdReq: OrganizationReqDto = new OrganizationReqDto(authContext.user.userName, authContext.user.id, orgId)
        getUsersByOrganizationId(orgIdReq)
        getUnitsByClientId(orgIdReq)
    }

    const getTitle = () => {
        return <>
            <Row>
                <Col><h3>Users</h3></Col>
                <Col offset={2} span={5}>
                    <label>Clients:&nbsp;</label>
                    <Select onChange={onClientsChange} style={{ width: '100%' }} placeholder='Please Select Client'>
                        {clients.map(rec => {
                            return <Option value={rec.organizationId}>{rec.name}</Option>
                        })}
                    </Select>
                </Col>
            </Row>
        </>
    }
    return (
        <>
            <Card title={getTitle()} extra={selectedClients && <Button onClick={createButtonHandler}>Create</Button>}>
                {selectedClients && <>
                    <UserGrid getUsersByOrganizationId={getUsersByOrganizationId} selectedClients={selectedClients} userData={userData} setInitialValues={setInitialValues} createButtonHandler={createButtonHandler} />
                    <Drawer
                        open={showForm}
                        onClose={closeButtonHandler}
                        width='60%'
                        key={dummyRefresh}
                    >
                        <UserForm key={dummyRefresh} submitHandler={submitHandler} initialValues={initialValues} unitsData={unitsData} selectedClients={selectedClients}/>
                    </Drawer>
                </>}
            </Card>
        </>
    )
}

export default UserPage
