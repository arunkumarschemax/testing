import { PermissionsDto } from '@finestchoicex-iam/shared-models';
import { useTranslation } from 'react-i18next';
import { PermissionService } from '@finestchoicex-iam/shared-services';
import { Table } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useAuthState } from '../../common/auth-context';
import TableActions from '../../common/table-actions/table-actions';

interface IPermFormProps {
    permData: PermissionsDto[];
    editHandler: (rec: PermissionsDto) => void
    activateOrDeactivate: (rec: any) => void;
    createButtonHandler: () => void;
}
export const PermGrid = (props: IPermFormProps) => {
    const { t } = useTranslation();
    const { permData, activateOrDeactivate, editHandler, createButtonHandler } = props;
    const { authContext } = useAuthState();
    const permissionService = new PermissionService();





    const editOnClickHandler = (record: PermissionsDto) => {
        editHandler(record);
    };

    const column = [
        {
            title:t("permissons.grid.permission", { defaultValue: 'Permission' }),
            dataIndex:'name'
        },
        {
            title: t("permissions.grid.scope", { defaultValue: 'Scope' }),
            dataIndex: 'scope',
        },
        {
            title: t("permissions.grid.subMenu", { defaultValue: 'Sub Menu' }),
            dataIndex: 'subMenu',
        },
        {
            title: t("permissions.grid.actions", { defaultValue: 'Actions' }),
            key: 'actions',
            render: (value: any, record: PermissionsDto) => {
                return <>
                    <TableActions statusUpdate={activateOrDeactivate} record={record} editOnClickHandler={editOnClickHandler} recordId={record.permissionId} />
                </>
            }
        }
    ]
    return (
        <div>

            <Table columns={column} dataSource={permData} />

        </div>
    )
}

