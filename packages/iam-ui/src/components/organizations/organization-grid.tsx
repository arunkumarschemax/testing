import { GetAllOrganizations, OrganizationReqDto } from '@finestchoicex-iam/shared-models';
import { OrganizationService } from '@finestchoicex-iam/shared-services';
import { Table } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useAuthState } from '../../common/auth-context';
import { AlertMessages } from '../../common/notifications';
import TableActions from '../../common/table-actions/table-actions';
import { useTranslation } from 'react-i18next';

// import { ClientModel } from ;

interface IOrganizationGridProps {
    tableData: GetAllOrganizations[];
    setInitialValues: Dispatch<SetStateAction<GetAllOrganizations | undefined>>;
    createButtonHandler: () => void;
    getAllOrganizations: () => void;
}

export const OrganizationGrid = (props: IOrganizationGridProps) => {
    const { tableData, setInitialValues, createButtonHandler, getAllOrganizations } = props;
    const orgService = new OrganizationService();
    const { authContext } = useAuthState();
    const { t } = useTranslation();




    const statusUpdate = (id: number) => {
        const req = new OrganizationReqDto(authContext.user.userName, authContext.user.id, id);
        orgService.activateOrDeactivateOrganization(req).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage);
                getAllOrganizations();
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            };
        }).catch(err => console.log(err.message, 'err message'))
    };


    const editOnClickHandler = (record: GetAllOrganizations) => {
            setInitialValues(record);
            createButtonHandler();
    };

    const organizationColumns = [
        {
            title: t("organization.common.name", {defaultValue:'Name'}),
            dataIndex: 'name',
        },
        {
            title: t("organization.common.description", {defaultValue:'Description'}),
            dataIndex: 'description'
        },
        {
            title: t("organization.grid.actions", {defaultValue:'Actions'}),
            key: 'actions',
            render: (value: any, record: GetAllOrganizations) => {
                return <>
                    <TableActions statusUpdate={statusUpdate} record={record} editOnClickHandler={editOnClickHandler} recordId={record.organizationId}/>
                </>
            }
        }

    ]
    return (
        <Table columns={organizationColumns} pagination={false} dataSource={tableData} />
    )
}
