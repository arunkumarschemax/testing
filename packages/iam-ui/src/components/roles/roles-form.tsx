
import { Button, Card, Col, Form, Input, Row } from 'antd'

export class RolesModel {
    id: number;
    name: string;
    description: string;
    unitId:number;
    constructor(id: number, name: string, description: string,unitId:number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.unitId=unitId;
    }
}


interface IRolesFormProps {
    submitHandler: (req: RolesModel) => void
}

export const RolesForm = (props: IRolesFormProps) => {
    const [formRef] = Form.useForm();
    const { submitHandler } = props;


    const onSubmit = () => {
        formRef.validateFields().then(values => {
            const req = new RolesModel(values.id, values.name, values.description,values.unitId);
            submitHandler(req);
        }).catch(err => {
            console.log(err.message,'error msg')
        })

    }


    return (
        <div>
            <Form layout='vertical' form={formRef}>
                <Row>
                    <Form.Item style={{ display: 'none' }} name='id'>
                        <Input placeholder="id" type='hidden' />
                    </Form.Item>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10, offset: 0 }} lg={{ span: 10, offset: 0 }} xl={{ span: 10, offset: 0 }} xxl={{ span: 10, offset: 0 }}>
                        <Form.Item name='name' label='Name'
                            rules={[
                                { required: true, message: 'Please fill the name' },
                                { pattern: new RegExp(/^[A-Za-z]*$/), message: 'Name contain letters only' }
                            ]}>
                            <Input placeholder="name" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }} xxl={{ span: 10, offset: 1 }}>
                        <Form.Item name='description' label='Description'
                            rules={[
                                { required: true, message: 'description is required' }
                            ]}>
                            <Input placeholder='Description' />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }} xxl={{ span: 10, offset: 1 }}>
                        <Form.Item name='unitId' label='Unit Id'
                            rules={[
                                { required: true, message: 'unitid is required' }
                            ]}>
                            <Input placeholder='UnitId' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='end'>
                    <Col>
                        <Button type='primary' onClick={onSubmit}>Submit</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}