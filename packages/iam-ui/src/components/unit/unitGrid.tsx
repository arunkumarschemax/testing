/* eslint-disable react-hooks/rules-of-hooks */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Table, Input, Form, Popconfirm, Card, Switch, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UnitGrid = () => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState<any>(false);
    const [editingData, setEditingData] = useState<any>();


    // useEffect(() => {
    //     axios.get("http://localhost:5000/studentdata/getdata")
    //         .then((res) => {
    //             if (res) {
    //                 console.log(res, "###");
    //                 setData(res.data);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error.response);
    //             alert(error.response);
    //         })

    // }, []
    // )
    // console.log(data, "####")



    const columns = [
        { title: ' ID', dataIndex: 'id', key: '1' },
        {
            key: "2",
            title: "Name",
            dataIndex: "name",
           
        },
        { title: 'Description', dataIndex: 'description', key: '3' },
        { title: 'Organisation Id', dataIndex: 'organisation_id', key: '3' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: { status: string; }) => (
                <>
                    <EditOutlined className="edit-icon" onClick={() => handleEdit(record)} />
                    <Popconfirm
                        okText={'ok'}
                        cancelText={'cancel'}
                        onConfirm={e => {
                            onDelete(record);
                        }}
                        title={'are u want to delete'}>
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>
                </>

            ),
        },
    ];


 
    const handleEdit = (record: any) => {
        setIsEditing(true)
        setEditingData({ ...record })
    }

    const resetEditing = () => {
        setIsEditing(false)
        setEditingData(null)
    }

    const onDelete = (record: any) => {
        axios.delete(`http://localhost:5000/studentdata/deletedata/${record.id}`)
            .then((res) => {
                if (res) {
                    setData((res: any) => {
                        return res.filter((e: any) => e.id !== record.id)
                    })
                }
            })
            .catch((error) => {
                console.log(error.response);
                alert(error.response.data.message);
            })
    }
    console.log(data, "last");

   



    return (
        <div>
            <br></br>
            <Card

                title={<span style={{ color: "white" }}>Unit Data</span>}
                extra={
                    (
                        <Link to="/navpage/form">
                            <span style={{ color: "white" }}>
                                <Button>Create </Button>{" "}
                            </span>
                        </Link>
                    )
                }



                headStyle={{ backgroundColor: "rgb(41, 57, 125)", border: 0 }}>
                
                <Table columns={columns} dataSource={data} scroll={{ x: 1600, y: 2200 }}></Table>
            </Card>
            <Modal style={{ backgroundColor: 'lightyellow' }}
                title="EditData"
                visible={isEditing} 
                okText="save"
                onCancel={() => {
                    resetEditing();
                }}
                onOk={() => {
                    console.log(data, "####");
                    axios.patch(`http://localhost:5000/studentdata/editdata/${editingData.id}`, editingData)
                        .then((res) => {
                            if (res) {
                                setData((pre: any) => {
                                    return pre.map((e: any) => {
                                        console.log(e, "ee")
                                        if (e.id === editingData.id) {
                                            console.log(e.id, "eee")
                                            console.log(editingData.id, "eee")
                                            console.log(editingData, "editingData")
                                            return editingData
                                        }
                                        else {
                                            console.log(e, "eee")
                                            return e
                                        }
                                    })
                                })
                            }
                        })
                        .catch((error) => {
                            console.log(error.response)
                            alert(error.response.data.message)
                        })
                    console.log(data, "eee")
                    resetEditing()
                }}>
                <Form>
                    Name
                    <Input value={editingData?.name} style={{ backgroundColor: 'lightblue' }} onChange={(e) => {
                        setEditingData((pre: any) => {
                            return { ...pre, name: e.target.value }
                        })
                    }} />

                   Description

                    <Input value={editingData?.description} style={{ backgroundColor: 'lightblue' }} onChange={(e) => {
                        setEditingData((pre: any) => {
                            return { ...pre, description: e.target.value }
                        })
                    }} />
                   
                </Form>
            </Modal>

        </div>
    )
}

export default UnitGrid;