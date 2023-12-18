import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd'
import React, { useState } from 'react'
import { UnitFormModel } from './user-form';





interface IUnitGridProps {
    unitData: UnitFormModel[]
}
export const UnitGrid = (props: IUnitGridProps) => {
    const { unitData } = props;
    const column = [
        {
            title: 'S.No',
            dataindex: 'sno',
        },
        {
            title: 'First Name',
            dataindex: 'firstName',
        }, {
            title: 'Middle Name',
            dataindex: 'middleName',
        }, {
            title: 'Last Name',
            dataindex: 'lastName',
        }, {
            title: 'Mobile Number',
            dataindex: 'mobileNumber',
        },
        {
            title: 'Status',
            key: 'status',
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
        <div>

            <Table columns={column} dataSource={unitData} />

        </div>
    )
}

