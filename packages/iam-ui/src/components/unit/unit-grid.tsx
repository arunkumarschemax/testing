import { GetAllUnitDto, OrganizationReqDto, UnitIdDto } from '@finestchoicex-iam/shared-models';
import { UnitsService } from '@finestchoicex-iam/shared-services';
import { Table } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useAuthState } from '../../common/auth-context';
import { AlertMessages } from '../../common/notifications';
import TableActions from '../../common/table-actions/table-actions';
import { useTranslation } from 'react-i18next';


interface IUnitFormProps {
    unitData: GetAllUnitDto[];
    setInitialValues: Dispatch<SetStateAction<GetAllUnitDto | undefined>>;
    createButtonHandler: () => void;
    selectedUnits: number
    getUnitsByClientId: (orgIdReq: OrganizationReqDto) => void
}

export const UnitGrid = (props: IUnitFormProps) => {
    const { unitData, setInitialValues, createButtonHandler, getUnitsByClientId, selectedUnits } = props;
    const unitsService = new UnitsService();
    const { authContext } = useAuthState();
    const { t } = useTranslation();
    const orgIdReq: OrganizationReqDto = new OrganizationReqDto(authContext.user.userName, authContext.user.id, selectedUnits)


    const statusUpdate = (id: number) => {
        const req = new UnitIdDto(authContext.user.userName, authContext.user.id, id);
        unitsService.activateAndDeactivatedUnit(req).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage);
                getUnitsByClientId(orgIdReq)
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            };
        }).catch(err => console.log(err.message, 'err message'))
    };

    const editOnClickHandler = (record: GetAllUnitDto) => {
        if (record.isActive) {
            setInitialValues(record);
            createButtonHandler();
        } else {
            AlertMessages.getErrorMessage('You Cannot Edit Deactivated Record');
        }

    }

    const unitColumn = [
        {
            title: t("unit.common.name", { defaultValue: 'Name' }),
            dataIndex: 'name',
        },
        {
            title: t("unit.common.description", { defaultValue: 'Description' }),
            dataIndex: 'description',
        },
        {
            title: t("unit.common.organizationId", { defaultValue: 'OrganizationID' }),
            dataIndex: 'organization',
        },
        // {
        //     title: t("unit.grid.status", {defaultValue:'Status'}),
        //     dataIndex: 'status',
        // },
        {
            title: t("unit.grid.actions", { defaultValue: 'Actions' }),
            key: 'actions',
            render: (value: any, record: GetAllUnitDto) => {
                return <>
                    <TableActions statusUpdate={statusUpdate} record={record} editOnClickHandler={editOnClickHandler} recordId={record.unitId} />
                </>
            }
        }
    ]
    return (
        <div>

            <Table columns={unitColumn} dataSource={unitData} pagination={false} />

        </div>
    )
}

