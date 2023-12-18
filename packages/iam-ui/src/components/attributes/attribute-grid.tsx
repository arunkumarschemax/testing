import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons'
import { Attributes } from './attribute-form';
import { Table } from 'antd';


interface IAttributeGridProps{
    attributeData:Attributes[]
}

export const AttributeGrid = (props:IAttributeGridProps)=>{
    const { attributeData } = props;

    
    const attributeColumns = [
        {
            title: 'S.no',
            key: 's.no',
        },
        {
            title: 'Attribute Name',
            dataIndex: 'attributeName',
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
        },
        {
            title: 'Actions',
            key: 'acions',
            render: (value: any, record: any) => {
                return <>
                    <EditOutlined />
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
