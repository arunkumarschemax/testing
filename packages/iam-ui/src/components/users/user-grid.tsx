import { EditOutlined } from '@ant-design/icons';
import { GetAllUsersDto, OrganizationReqDto, UsersCreateDto, UsersIdDto } from '@finestchoicex-iam/shared-models';
import { Button, Card, Input, Table } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import TableActions from '../../common/table-actions/table-actions';
import { useAuthState } from '../../common/auth-context';
import { UsersService } from '@finestchoicex-iam/shared-services';
import { AlertMessages } from '../../common/notifications';
import { useTranslation } from 'react-i18next';

interface IUserGridProps {
    userData: GetAllUsersDto[]
    createButtonHandler: () => void;
    setInitialValues: Dispatch<SetStateAction<GetAllUsersDto>>;
    selectedClients: number;
    getUsersByOrganizationId: (orgIdReq: OrganizationReqDto) => void
}

export const UserGrid = (props: IUserGridProps) => {
    const { userData, setInitialValues, createButtonHandler, selectedClients, getUsersByOrganizationId } = props;
    const { authContext } = useAuthState();
    const userservice = new UsersService;
    const { t } = useTranslation();
    const orgIdReq: OrganizationReqDto = new OrganizationReqDto(authContext.user.userName, authContext.user.id, selectedClients)
    const [searchedText, setSearchedText] = useState('');


    const updateStatus = (usersId: number) => {
        const req = new UsersIdDto(authContext.user.userName, authContext.user.userId, usersId)
        userservice.activateDeactivateUsers(req).then((res: any) => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage);
                getUsersByOrganizationId(orgIdReq)
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        }).catch(err => console.log(err.message));
    }
    const editOnClickHandler = (record: GetAllUsersDto) => {
        if (record.isActive) {
            setInitialValues(record);
            createButtonHandler();
        } else {
            AlertMessages.getErrorMessage('You Cannot Edit Deactivated Record');
        }
    }

    const column = [
        {
            title: t('user.grid.firstName', { defaultValue: 'Name' }),
            dataIndex: 'firstName',
            filteredValue: [String(searchedText).toLowerCase()],
            onFilter: (value: { toLocaleString: () => string; }, record: { [x: string]: any; }) => {
                const aaa = new Set(Object.keys(record).map((key) => {
                    return String(record[key]).toLowerCase().includes(value.toLocaleString());
                }));
                if (aaa.size && aaa.has(true))
                    return true;
                else
                    return false;
            },
        },
        {
            title: t('user.common.mobileNo', { defaultValue: 'Mobile Number' }),
            dataIndex: 'mobileNo',
        },
        {
            title: t('user.Common.gender', { defaultValue: 'Gender' }),
            dataIndex: 'gender',
        },
        {
            title: t('user.Common.externalRefNo', { defaultValue: 'External Ref No' }),
            dataIndex: 'externalRefNo',
        },
        {
            title: t('user.grid.actions', { defaultValue: 'Actions' }),
            key: 'actions',
            render: (value: any, record: GetAllUsersDto) => {
                return <>
                    <TableActions record={record} editOnClickHandler={editOnClickHandler} statusUpdate={updateStatus} recordId={record.userId} />
                </>
            }
        }
    ]
    return (
        <>
            <div style={{ float: 'right' }}>
                <Input.Search placeholder="Search here..." allowClear onChange={(e) => { setSearchedText(e.target.value) }} onSearch={(value) => { setSearchedText(value) }} style={{ width: 200, marginRight: '10px' }} />
            </div>
            <Table columns={column} dataSource={userData} scroll={{ y: 1000 }} pagination={false} />
        </>
    )
}

