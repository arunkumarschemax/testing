import { EditOutlined } from '@ant-design/icons'
import { Table } from 'antd';
import { ClientModel } from './organiation-form';
// import { ClientModel } from ;

interface IOrganizationGridProps {
    data: ClientModel[]
}

export const OrganizationGrid = (props: IOrganizationGridProps) => {
    const { data } = props;

    const organisationColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (value: any, record: any) => {
                return <>
                    <EditOutlined />
                </>
            }
        }

    ]
    return (
        <Table columns={organisationColumns} dataSource={data} />
    )
}
