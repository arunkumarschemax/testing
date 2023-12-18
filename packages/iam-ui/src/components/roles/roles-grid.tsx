
import { EditOutlined } from '@ant-design/icons'
import { GetAllRolesDto, RolesIdReqDto } from '@finestchoicex-iam/shared-models';
import { Table } from 'antd';
import TableActions from '../../common/table-actions/table-actions';
import { Dispatch, SetStateAction, useState } from 'react';
import { RolesService } from '@finestchoicex-iam/shared-services';
import { useAuthState } from '../../common/auth-context';
import { AlertMessages } from '../../common/notifications';
import { useTranslation } from 'react-i18next';


interface IRolesGridProps {
    rolesData: GetAllRolesDto[];
    setInitialValues: Dispatch<SetStateAction<GetAllRolesDto>>;
    createButtonHandler: () => void;
    // getAllRoles: () => void

}




export const RolesGrid = (props: IRolesGridProps) => {
    const { rolesData, setInitialValues, createButtonHandler } = props;
    const rolesService = new RolesService();
    const { authContext } = useAuthState();
    const { t } = useTranslation();



    const editOnClickHandler = (record: GetAllRolesDto) => {
        setInitialValues(record);
        createButtonHandler();
    };

    const statusUpdate = (id: number) => {
        const req = new RolesIdReqDto(authContext.user.userName, authContext.user.userId, id)
        rolesService.activateOrDeactivate(req).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage);
                // getAllRoles();
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        }).catch(err => console.log(err.message, "err message"))
    }


    const RolesColumns = [
        {
            title: t("roles.common.name", {defaultValue:'Name'}),
            dataIndex: 'roleName',
        },
        {
            title: t("roles.common.description", {defaultValue:'Description'}),
            dataIndex: 'description'
        },
        {
            title: t("roles.common.unit", {defaultValue:'unit'}),
            dataIndex: 'unit',
        },
        {
            title: t("roles.grid.actions", {defaultValue:'Actions'}),
            key: 'actions',
            render: (value: any, record: GetAllRolesDto) => {
                return <>
                    <TableActions record={record} editOnClickHandler={editOnClickHandler} statusUpdate={statusUpdate} recordId={record.rolesId}></TableActions>
                </>
            }
        }

    ]
    return (
        <Table columns={RolesColumns} dataSource={rolesData} pagination={false} />
    )
}