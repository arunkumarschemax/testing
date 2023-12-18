import { PermissionsDto, ScopesDropDownDto } from '@finestchoicex-iam/shared-models';
import { Card, Form, Row, Col, Input, Button, Select } from 'antd'
import { useState } from 'react';
import { ClassValidator } from '../../common/utils';
import { useAuthState } from '../../common/auth-context';
import { useTranslation } from 'react-i18next';

interface IPermFormProps {
    submitHandler: (req: PermissionsDto) => void;
    initialValues: any;
    scopes: ScopesDropDownDto[]
}

const { Option } = Select;
export const PermForm = (props: IPermFormProps) => {
    const { t } = useTranslation();
    const classValidator = new ClassValidator();
    const { authContext } = useAuthState()
    const [formRef] = Form.useForm();
    const { submitHandler, initialValues, scopes } = props;



    const onSubmit = () => {
        formRef.validateFields().then(values => {
            const req = new PermissionsDto(authContext.user.userName, authContext.user.id, values.permissionId, values.name, values.subMenuId, undefined, values.scopeId, undefined, values.versionFlag, true, values.moduleId, undefined, values.applicationId, undefined);
            submitHandler(req);
        }).catch(err => {
            console.log(err.message, 'error msg')
        })
    };

    return (
        <div>

            <Form layout='vertical' form={formRef} initialValues={initialValues}>
                <Form.Item hidden name='moduleId'>
                    <Input />
                </Form.Item>
                <Form.Item hidden name='menuId'>
                    <Input />
                </Form.Item>
                <Form.Item hidden name='applicationId'>
                    <Input />
                </Form.Item>
                <Form.Item hidden name='subMenuId'>
                    <Input />
                </Form.Item>
                <Form.Item hidden name='permissionId'>
                    <Input />
                </Form.Item>
                <Form.Item hidden name='versionFlag'>
                    <Input />
                </Form.Item>
                <Row>
                    <Col xs={24} md={24} lg={7} xl={7} xxl={24}>
                        <Form.Item name='name' label={t("permissions.form.name", { defaultValue: 'Name' })}
                            rules={[{ required: true, message: t('permissions.form.rules.moduleNameRequired', { defaultValue: 'Please fill the name' }) },
                            { pattern: new RegExp(/^[A-Za-z]*$/), message: t('permissions.form.rules.moduleNamePattern', { defaultValue: 'Name should contain letters only' }) },
                            ]}>
                            <Input placeholder={t("permissions.form.name", { defaultValue: 'Name' })} /></Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
                        <Form.Item name='scopeId' label={t("permissions.form.scopeID", { defaultValue: 'ScopeID' })}
                            rules={[{ required: true, message: t('permissions.form.rules.giveScopeId', { defaultValue: 'Please give Scope Id' }) }]}>
                            <Select>
                                {scopes.map(rec => {
                                    return <Option value={rec.id} key={rec.id + 'subMenu'}>{rec.name}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} md={24} lg={7} xl={7} xxl={24}>
                        <Button onClick={onSubmit} type='primary'>{t("common.submitButton", { defaultValue: 'Submit' })}</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}