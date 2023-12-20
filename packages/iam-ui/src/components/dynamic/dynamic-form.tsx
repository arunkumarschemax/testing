import { Col, Form, Input, Row, Select } from 'antd'
const { Option } = Select;

export const DynamicForm = () => {
    return (
        <div>
            <Form layout='vertical' autoComplete='off'>
                <Row justify="space-around">
                   

                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10, offset: 0 }} lg={{ span: 10, offset: 0 }} xl={{ span: 10, offset: 0 }} xxl={{ span: 10, offset: 0 }}>
                        <Form.Item name="inputType" label="Select Input Field"
                            rules={[
                                { required: true },
                            ]}>
                            <Select>
                                <Option>mohan</Option>
                            </Select>
                        </Form.Item>
                    </Col>


                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10, offset: 0 }} lg={{ span: 10, offset: 0 }} xl={{ span: 10, offset: 0 }} xxl={{ span: 10, offset: 0 }}>
                        <Form.Item name="lableName" label="Lable Name"
                            rules={[
                                { required: true },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
