import { Card, Form, Row, Col, Input, Button } from 'antd'
export class UnitFormModel {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    mobileNumber: number;
    constructor(id: number, firstName: string, middleName: string, lastName: string, mobileNumber: number) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.mobileNumber = mobileNumber;
    }
}
interface IUnitFormProps {
    submitHandler?: (req: UnitFormModel) => void
}

export const UnitForm = (props: IUnitFormProps) => {
    const [form] = Form.useForm();
    const { submitHandler } = props;

    const onSubmit = () => {
        form.validateFields().then(values => {
            console.log(values, "fffff");
            const req = new UnitFormModel(values.id, values.firstName, values.middleName, values.lastName, values.mobileNumber);
            if (submitHandler)
                submitHandler(req);

        }).catch(err => {
            console.log(err.message, 'error msg')
        })
    }
    return (
        <div>

            <Form layout='vertical'
                form={form}>
                <Row>
                    <Col>
                        <Form.Item name='id' hidden={true}></Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
                        <Form.Item name='firstName' label='First Name'
                            rules={[{ required: true, message: 'Please give firstname' }, { pattern: new RegExp(/^[A-Za-z]+$/), message: 'Firstname contains only letters' }]}>
                            <Input placeholder='First Name' /></Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={7} xl={7} xxl={24}>
                        <Form.Item name='middleName' label='Middle Name'
                            rules={[{ required: true, message: 'Please give middlename' }, { pattern: new RegExp(/^[A-Za-z]+$/), message: 'Middle name should contain letters' }]}>
                            <Input placeholder='Middle name' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
                        <Form.Item name='lastName' label='Last Name'
                            rules={[{ required: true, message: 'Please give lastname' },
                            { pattern: new RegExp(/^[A-Za-z]+$/), message: 'Last name should contain letters' }]}>
                            <Input placeholder='Last Name' /></Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={7} xl={7} xxl={24}>
                        <Form.Item name='mobileNumber' label='Mobile No.'
                            rules={[{ required: true, message: 'Mobile number is required' }, { pattern: new RegExp(/^[0-9]*$/), min: 10, max: 10 }]}>
                            <Input placeholder='Mobile Number' /></Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} md={24} lg={7} xl={7} xxl={24}>
                        <Button onClick={onSubmit} type='primary'>Submit</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}