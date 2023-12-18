import { ModuleDto } from '@finestchoicex-iam/shared-models';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useAuthState } from '../../common/auth-context';
import { useTranslation } from 'react-i18next';



interface IModuleFormProps {
    submitHandler: (req: ModuleDto) => void;
    initialValues?: ModuleDto
}

export const ModuleForm = (props: IModuleFormProps) => {
    const { authContext } = useAuthState()
    const [formRef] = Form.useForm();
    const { submitHandler, initialValues } = props;
    const { t } = useTranslation();



    const onSubmit = () => {
        formRef.validateFields().then(values => {
            const req = new ModuleDto(authContext.user.userName, authContext.user.id, values.moduleId, values.moduleName, values.moduleDescription, values.applicationId, values.applicationId, true, values.versionFlag);
            submitHandler(req);
        }).catch(err => {
            console.log(err.message, 'error msg');
        });
    }


    return (
        <div>
            <Form layout='vertical' form={formRef} initialValues={initialValues}>
                <Row>
                    <Form.Item style={{ display: 'none' }} name='moduleId'>
                        <Input type='hidden' />
                    </Form.Item>
                    <Form.Item style={{ display: 'none' }} name='versionFlag'>
                        <Input type='hidden' />
                    </Form.Item>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10, offset: 0 }} lg={{ span: 10, offset: 0 }} xl={{ span: 10, offset: 0 }} xxl={{ span: 10, offset: 0 }}>
                        <Form.Item name='moduleName' label={t("module.common.moduleName", { defaultValue: 'Module Name' })}
                            rules={[
                                { required: true, message: t('module.form.rules.moduleNameRequired', { defaultValue: 'Please fill the name' }) },
                                { pattern: new RegExp(/^[A-Za-z]*$/), message: t('module.form.rules.moduleNamePattern', { defaultValue: 'Name should contain letters only' }) },
                            ]}>
                            <Input placeholder={t("module.common.moduleName", { defaultValue: 'Module Name' })} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }} xxl={{ span: 10, offset: 1 }}>
                        <Form.Item name='moduleDescription' label={t("module.common.description", { defaultValue: 'Description' })}
                            rules={[
                                { required: true, message: t('module.form.rules.descriptionRequired', { defaultValue: 'Description is required' }) },
                            ]}>
                            <Input placeholder={t("module.common.description", { defaultValue: 'Description' })} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }} xxl={{ span: 10, offset: 1 }}>
                        <Form.Item name='applicationId' label={t("module.common.applicationId", { defaultValue: 'Application ID' })}
                            rules={[
                                { required: true, message: t('module.form.rules.applicationIdRequired', { defaultValue: 'Application ID is required' }) },
                            ]} style={{ display: 'none' }} >
                            <Input placeholder='Application Id' type='hidden' />
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