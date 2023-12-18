import { CreateAttributeDto, GetAllAttributeDto } from '@finestchoicex-iam/shared-models';
import { AttributeService } from '@finestchoicex-iam/shared-services';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { AlertMessages } from '../../common/notifications';
import { useTranslation } from 'react-i18next';



interface IAttributeFormProps {
    initialValues: GetAllAttributeDto;
    getAllAttributes: () => void;
    closeButtonHandler: () => void;
}

const AttributeForm = (props: IAttributeFormProps) => {
    const [formRef] = Form.useForm();
    const attributeService = new AttributeService();
    const { initialValues, getAllAttributes, closeButtonHandler } = props;
    const { t } = useTranslation();


    const submitHandler = () => {
        formRef.validateFields().then(values => {
            const req = new CreateAttributeDto(values.attributeName, values.attributeId, values.versionFlag);
            attributeService.createAttribute(req).then(res => {
                if (res.status) {
                    AlertMessages.getSuccessMessage(res.internalMessage);
                    getAllAttributes();
                    formRef.resetFields();
                    closeButtonHandler();
                } else {
                    AlertMessages.getErrorMessage(res.internalMessage);
                }
            });
        }
        ).catch(err => {
            console.log(err.message, 'err message')
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Form
                layout="vertical"
                form={formRef}
                initialValues={initialValues}
            >
                <Form.Item name='attributeId' hidden>
                    <InputNumber />
                </Form.Item>
                <Form.Item name='versionFlag' hidden>
                    <InputNumber />
                </Form.Item>
                <Row>
                    <Col xs={24} md={24} lg={7} xl={7} xxl={24}>
                        <Form.Item name='attributeName' label={t("attribute.common.attributeName", { defaultValue: 'Attribute Name' })}
                            rules={[{ required: true, message: t("attribute.form.fillAttributeName", { defaultValue: 'Please fill the AttributeName' }) }, {
                                pattern: new RegExp(/^[a-zA-Z]+$/), message: t("attribute.form.attributeNameInLetters", { defaultValue: 'AttributeName only in letters' })
                            }]}>
                            <Input placeholder={t("attribute.common.attributeName", { defaultValue: 'Attribute Name' })} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button type='primary' onClick={submitHandler}>{t("common.submitButton", {defaultValue:'Submit'})}</Button>
            </Form>


        </div >
    )
}

export default AttributeForm;