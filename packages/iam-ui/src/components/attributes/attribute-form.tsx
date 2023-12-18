import { Button, Col, Form, Input,  Row } from 'antd';



export class Attributes {
    id: number;
    attributeName: string;
    constructor(id: number, attributeName: string) {
        this.id = id;
        this.attributeName = attributeName;
    }
}

interface IAttributeFormProps {
    handleSubmit:(req: Attributes) => void
}




const AttributeForm = (props:IAttributeFormProps) => {
    const [form] = Form.useForm()
    const { handleSubmit } = props;
    const submitHandler=()=>{
        form.validateFields().then(values=>{
            const req= new Attributes(values.id,values.attributeName);
            handleSubmit(req);
        }
            ).catch(err=>{
                console.log(err.message,'err message')
            })
    }

    return (
        <div style={{ textAlign: 'center' }}>

            <Form layout="vertical"

                form={form}
            >


                <Form.Item name='id' hidden={true}>
                    <Input />
                </Form.Item>
                <Row>
                    <Col xs={24} md={24} lg={7} xl={7} xxl={24}>
                        <Form.Item name='attributeName' label='Attribute Name' rules={[{ required: true, message: 'Please fill the AttributeName' }, {
                            pattern: new RegExp(/^[a-zA-Z]+$/), message: 'AttributeName only in letters'
                        }]}>
                            <Input placeholder='AttributeName' />
                        </Form.Item>
                    </Col>
                </Row>
                <Button type='primary' htmlType='submit' onClick={submitHandler}>Submit</Button>
            </Form>


        </div >
    )
}

export default AttributeForm;