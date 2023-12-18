import { EditOutlined } from '@ant-design/icons'
import { Table } from 'antd';
import { ApplicationModel } from './application-form';


interface IApplicationGridProps {
    data: ApplicationModel[]
}

export const ApplicationGrid = (props: IApplicationGridProps) => {
    const { data } = props;

    const applicationColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        // },
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
        <Table columns={applicationColumns} dataSource={data} />
    )
}