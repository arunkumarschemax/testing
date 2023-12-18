import { EditOutlined } from '@ant-design/icons';
import { GetAllScopesDto, ScopesIdDto } from '@finestchoicex-iam/shared-models';
import { ScopesService } from '@finestchoicex-iam/shared-services';
import { Button, Card, Switch, Table } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useAuthState } from '../../common/auth-context';
import { AlertMessages } from '../../common/notifications';
import TableActions from '../../common/table-actions/table-actions';
import { useTranslation } from 'react-i18next';


interface IScopeFormProps {
    scopeData: GetAllScopesDto[];
    setInitialValues: Dispatch<SetStateAction<GetAllScopesDto | undefined>>;
    createButtonHandler: () => void;
    getAllScopes: () => void;
}

export const ScopeGrid = (props: IScopeFormProps) => {
    const { scopeData, setInitialValues, createButtonHandler, getAllScopes } = props;
    const scopesService = new ScopesService();
    const { authContext } = useAuthState();
    const { t } = useTranslation();


    const statusUpdate = (id: number) => {
        const req = new ScopesIdDto(authContext.user.userName, authContext.user.id, id);
        scopesService.activateAndDeactivatedScope(req).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage);
                getAllScopes();
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            };
        }).catch(err => console.log(err.message, 'err message'))
    };

    const editOnClickHandler = (record: GetAllScopesDto) => {
        setInitialValues(record);
        createButtonHandler();
    }

    const scopeColumn = [
        {
            title: t("scope.common.name", {defaultValue:'Name'}),
            dataIndex: 'name',
        },
        {
            title: t("scope.common.code", {defaultValue:'Code'}),
            dataIndex: 'code',
        },
        {
            title: t("scope.grid.actions", {defaultValue:'Actions'}),
            key: 'actions',
            render: (value: any, record: GetAllScopesDto) => {
                return <>
                    <TableActions statusUpdate={statusUpdate} record={record} editOnClickHandler={editOnClickHandler} recordId={record.scopeId} />
                </>
            }
        }
    ]
    return (
        <div>

            <Table columns={scopeColumn} dataSource={scopeData} pagination={false} />

        </div>
    )
}

