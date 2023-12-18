
import { EditOutlined } from '@ant-design/icons'
import { Table } from 'antd';
import { RolesModel } from './roles-form';


interface IRolesGridProps {
    data: RolesModel[]
}

export const RolesGrid = (props: IRolesGridProps) => {
    const { data } = props;

    const RolesColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Unit Id',
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
        <Table columns={RolesColumns} dataSource={data} />
    )
}