import { AttributeIdReqDto, GetAllAttributeDto, GetAllAttributeDto as GetAllAttributesDto } from '@finestchoicex-iam/shared-models';

import { AttributeService } from '@finestchoicex-iam/shared-services';
import { Table } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useAuthState } from '../../common/auth-context';
import { AlertMessages } from '../../common/notifications';
import TableActions from '../../common/table-actions/table-actions';
import { useTranslation } from 'react-i18next';


interface IAttributeGridProps {
    attributeData: GetAllAttributesDto[];
    setInitialValues: Dispatch<SetStateAction<GetAllAttributeDto>>;
    createButtonHandler: () => void;
    getAllAttributes: () => void;
}

export const AttributeGrid = (props: IAttributeGridProps) => {
    const { attributeData, setInitialValues, createButtonHandler, getAllAttributes } = props;
    const attributeService = new AttributeService();
    const { authContext } = useAuthState();
    const { t } = useTranslation();
    


    const updateStatus = (id: number) => {
        const req = new AttributeIdReqDto(authContext.user.userName, authContext.user.userId, id)
        attributeService.activateAndDeactivatedAttributes(req).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage);
                getAllAttributes();
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        }).catch(err => console.log(err.message));
    }

    const editOnClickHandler = (record: GetAllAttributesDto) => {
            setInitialValues(record);
            createButtonHandler();
    }


    const attributeColumns = [
        {
            title: t("attribute.common.attributeName", {defaultValue: 'Attribute Name'}),
            dataIndex: 'attributeName',
        }, 
        {
            title: t("attribute.grid.actions", {defaultValue: 'Actions'}),
            render: (value: any, record: GetAllAttributesDto) => {
                return <>
                    <TableActions record={record} editOnClickHandler={editOnClickHandler} statusUpdate={updateStatus} recordId={record.attributeId} />
                </>
            }

            // 

        },
    ]

    return (
        <div>

            <Table columns={attributeColumns} dataSource={attributeData} />
            {/* <EditOutlined onClick={handleClick}/> */}

        </div>
    )
}
