import { RolesService, UnitsService, UserRoleMappingService, UsersService } from '@finestchoicex-iam/shared-services';
import { Card, Col, Form, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAuthState } from '../../common/auth-context';
import { ActionsEnum, GetAllRolesDto, UnitIdDto, UserRoleDto, UsersIdDto } from '@finestchoicex-iam/shared-models';
import { useForm } from 'antd/es/form/Form';
import { AlertMessages } from '../../common/notifications';

const { Option } = Select;
export const UserRoleMappings = () => {
    const [formRef] = useForm();
    const { authContext } = useAuthState();
    const [unitsData, setUnitsData] = useState<any[]>([]);
    const [rolesData, setRolesData] = useState<GetAllRolesDto[]>([]);
    const [filteredRolesData, setFilteredRolesData] = useState<GetAllRolesDto[]>([]);
    const [assignedRoles, setAssignedRoles] = useState<UserRoleDto[]>([]);
    const [userData, setUserData] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<number>();

    const unitService = new UnitsService();
    const roleService = new RolesService();
    const userService = new UsersService();
    const userRoleMapService = new UserRoleMappingService();

    useEffect(() => {
        getAllUnits()
    }, []);

    const getAllUnits = () => {
        unitService.getAllUnits().then((res) => {
            if (res.status) {
                setUnitsData(res.data)
            } else {
                setUnitsData([]);
            }
        }).catch(err => console.log(err.message, 'err message'))
    }

    const getAllRollsByUnitIdForUnits = (unitIdReq: UnitIdDto) => {
        roleService.getAllRolesByUnitId(unitIdReq).then((res) => {
            if (res.status) {
                setRolesData(res.data)
                setFilteredRolesData(res.data)
            } else {
                setRolesData([]);
            }
        }).catch(err => console.log(err.message, 'err message'))
    }

    const getUsersByUnitAgainstUnits = (unitIdReq: UnitIdDto) => {
        userService.getUsersByUnitId(unitIdReq).then((res) => {
            if (res.status) {
                setUserData(res.data);
            } else {
                setUserData([])
            }
        }).catch(err => console.log(err.message, 'error message'))
    }

    const getAllRolesByUserId = (userId: number) => {
        const req: UsersIdDto = new UsersIdDto(authContext.user.userName, authContext.user.id, userId)
        userRoleMapService.getAllRolesByUserId(req).then((res) => {
            if (res.status) {
                setAssignedRoles(res.data);
                getAllFilteredRolls(res.data, rolesData);
            } else {
                setAssignedRoles([])
            }
        }).catch(err => console.log(err.message, 'error message'))
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const getAllFilteredRolls = (assignedRoles: UserRoleDto[], allRoles: GetAllRolesDto[]) => {
        const rolesIds = assignedRoles.map(rec => rec.rolesId)
        setFilteredRolesData(allRoles.filter(rec => !rolesIds.includes(rec.rolesId)))
    }

    const onUnitsOnChange = (unitId: number) => {
        const unitIdReq: UnitIdDto = new UnitIdDto(authContext.user.name, authContext.user.id, unitId)
        getAllRollsByUnitIdForUnits(unitIdReq);
        getUsersByUnitAgainstUnits(unitIdReq);
    }


    const onUsersChange = (userId: number) => {
        setSelectedUser(userId);
        getAllRolesByUserId(userId);
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, role: GetAllRolesDto) => {
        event.dataTransfer.setData('role', JSON.stringify(role));
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const role: GetAllRolesDto = JSON.parse(event.dataTransfer.getData('role'));
        mapOrUnMapRolesToUser(selectedUser, role.rolesId, undefined, ActionsEnum.CREATE);
    };

    const mapOrUnMapRolesToUser = (userId: number, roleId: number, userRoleId: number, actionType: ActionsEnum) => {
        const req: UserRoleDto = new UserRoleDto(authContext.user.userName, authContext.user.id, userRoleId, userId, roleId, undefined, true, 1, actionType)
        userRoleMapService.mapOrUnMapRolesToUser(req).then((res) => {
            if (res.status) {
                getAllRolesByUserId(userId);
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        }).catch(err => console.log(err.message, 'error message'))
    }

    const handleAvailableDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const role: UserRoleDto = JSON.parse(event.dataTransfer.getData('role'));
        mapOrUnMapRolesToUser(selectedUser, role.rolesId, role.userRoleId, ActionsEnum.DELETE);
    };

    const handleAssignedDragStart = (event: React.DragEvent<HTMLDivElement>, role: UserRoleDto) => {
        event.dataTransfer.setData('role', JSON.stringify(role));
    };

    return (
        <div>
            <Card title={'User Role Mapping'}>
                <Form form={formRef}>
                    <Row>
                        <Col offset={3} span={6}>
                            <Form.Item label='Units' name={'unit'}>
                                <Select onChange={onUnitsOnChange} style={{ width: '100%' }} placeholder='Please Select Units'>
                                    {unitsData.map(rec => {
                                        return <Option value={rec.unitId}>{rec.name}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col offset={6} span={6}>
                            <Form.Item label='Users' name='user'>
                                <Select onChange={onUsersChange} style={{ width: '100%' }} placeholder='Please Select Users'>
                                    {userData.map(rec => {
                                        return <Option value={rec.userId}>{rec.firstName}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                        </Col>
                    </Row>
                </Form>
                <br />
                <div style={{ height: '90vh' }}>
                    <Row>
                        <Col offset={3} span={6}>
                            <Card title='Available Roles' style={{ height: '90vh', width: 300, marginRight: 20 }}
                                onDragOver={handleDragOver}
                                onDrop={handleAvailableDrop}>
                                {filteredRolesData?.map((comment, index) => (
                                    <Card
                                        key={comment.rolesId}
                                        style={{ background: '#f7c78d', marginBottom: '10px' }}
                                        draggable
                                        onDragStart={(event) => handleDragStart(event, comment)}
                                    >
                                        <span style={{ wordWrap: 'break-word' }}>
                                            <li style={{ color: 'black' }}>{comment.roleName}</li>
                                        </span>
                                    </Card>
                                ))}
                            </Card>
                        </Col>
                        <Col offset={6} span={6}>
                            {selectedUser && <Card title='Assigned Roles' style={{ height: '90vh', width: 300 }}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}>
                                {assignedRoles.map((comment, index) => (
                                    <Card
                                        key={comment.userRoleId}
                                        style={{ background: '#f7c78d', marginBottom: '10px' }}
                                        draggable
                                        onDragStart={(event) => handleAssignedDragStart(event, comment)}
                                    >
                                        <span style={{ wordWrap: 'break-word' }}>
                                            <li style={{ color: 'black' }}>{comment.roleName}</li>
                                        </span>
                                    </Card>
                                ))}
                            </Card>}
                        </Col>
                    </Row>
                </div>
            </Card>
      </div>
)
}