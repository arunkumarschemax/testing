import { Button, Card, Col, Drawer, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { RolesForm } from './roles-form';
import { RolesGrid } from './roles-grid';
import { OrganizationService, RolesService, UnitsService } from '@finestchoicex-iam/shared-services';
import { GetAllRolesDto, OrganizationReqDto, UnitIdDto } from '@finestchoicex-iam/shared-models';
import { useAuthState } from '../../common/auth-context';


const { Option } = Select;

export const RolesPage = () => {
    const { authContext } = useAuthState();
    const [showForm, setShowForm] = useState(false);
    const [rolesData, setRolesData] = useState<any>();
    const rolesService = new RolesService();
    const [initialValues, setInitialValues] = useState<GetAllRolesDto>();
    const [dummyRefresh, setDummyRefresh] = useState<number>();
    const [clients, setClients] = useState<any[]>([]);
    const [selectedClients, setSelectedClients] = useState<number>();
    const [unitsData, setUnitsData] = useState<any[]>([]);
    const [selectedUnits, setSelectedUnits] = useState<number>();
    const unitsServices = new UnitsService();
    const organizationService = new OrganizationService();
    const [hiddenCreate, setHiddenCreate] = useState<boolean>(true)


    useEffect(() => {
        getAllOrganizations();
    }, []);

    const getAllRolesByUnitId = (unitsRqId: UnitIdDto) => {
        rolesService.getAllRolesByUnitId(unitsRqId).then(res => {
            if (res.status) {
                setRolesData(res.data);
            } else {
                setRolesData([])
            }
        }).catch(err => console.log(err.message, 'err message'))
    }
    const getAllOrganizations = () => {
        organizationService
            .getAllOrganizationsDropdown()
            .then((res) => {
                if (res.status) {
                    setClients(res.data ? res.data : []);
                } else {
                    setClients([]);
                }
                setSelectedClients(undefined);
                setSelectedUnits(undefined);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const getUnitsByOrgId = (orgRqId: OrganizationReqDto) => {
        unitsServices
            .getUnitsByOrgId(orgRqId)
            .then((res) => {
                if (res.status) {
                    setUnitsData(res.data ? res.data : []);
                } else {
                    setUnitsData([]);
                }
                setSelectedUnits(undefined);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const createButtonHandler = () => {
        setShowForm(true);
        setDummyRefresh(prev => prev + 1);

    }

    const closeButtonHandler = () => {
        setShowForm(false);
        setDummyRefresh(prev => prev + 1);
    }

    const onClientChange = (orgId: number) => {
        setSelectedClients(orgId);
        const orgRqId: OrganizationReqDto = new OrganizationReqDto(
            authContext.user.userName,
            authContext.user.id,
            orgId
        );
        getUnitsByOrgId(orgRqId);
    };

    const onUnitsChange = (unitId: number) => {
        setSelectedUnits(unitId);
        const unitsRqId: UnitIdDto = new UnitIdDto(
            authContext.user.userName,
            authContext.user.id,
            unitId
        );
        getAllRolesByUnitId(unitsRqId)
        if (unitId) {
            setHiddenCreate(false)
        }
    };

    const getTitle = () => {
        return <>
            <Row>
                <Col><h3>Roles</h3></Col>
                <Col offset={5} span={3}>
                    <label>Clients: </label>
                    <Select
                        onChange={onClientChange}
                        style={{ width: "100%" }}
                        placeholder="Please Select Client"
                    >
                        {clients.map((rec) => (
                            <Option value={rec.organizationId} key={rec.organizationId + "client"}>
                                {rec.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
                {selectedClients && (
                    <Col offset={2} span={3}>
                        <label>Units: </label>
                        <Select
                            onChange={onUnitsChange}
                            style={{ width: "100%" }}
                            placeholder="Please Select Unit"
                            value={selectedUnits}
                        >
                            {unitsData.map((rec) => (
                                <Option value={rec.unitId} key={rec.unitId + "unit"}>
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
            <Card title={getTitle()} extra={<Button hidden={hiddenCreate} onClick={createButtonHandler}>Create</Button>}>
                {!hiddenCreate &&
                    <RolesGrid rolesData={rolesData} setInitialValues={setInitialValues} createButtonHandler={createButtonHandler}  />
                }     </Card>
            <Drawer
                title={'Roles'}
                open={showForm}
                onClose={closeButtonHandler}
                width='50%'
                key={Date.now()}
            >
                <RolesForm SelectedUnitsData={unitsData} key={dummyRefresh} initialValues={initialValues}  closeButtonHandler={closeButtonHandler} />
            </Drawer>
        </>
    )
}

export default RolesPage