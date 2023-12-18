
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { GetAllScopesDto } from 'packages/libs/shared-models/src/scopes/scope.dto';
import { ScopesCreateDto } from 'packages/libs/shared-models/src/scopes/scopes-create-dto';
import { useState } from 'react';
import { AlertMessages } from '../../common/notifications';
import { ScopesService } from '@finestchoicex-iam/shared-services';
import { ClassValidator } from '../../common/utils';
import { useTranslation } from 'react-i18next';

interface IScopeFormProps {
    initialValues: GetAllScopesDto | undefined;
    getAllScopes: () => void;
    closeButtonHandler: () => void;
}

export const ScopeForm = (props: IScopeFormProps) => {
    const [formRef] = Form.useForm();
    const classValidator = new ClassValidator();
    const { initialValues, getAllScopes, closeButtonHandler } = props;
    const scopesService = new ScopesService();
    const { t } = useTranslation();


    const onSubmit = () => {
        formRef.validateFields().then(values => {
            const req = new ScopesCreateDto(values.name, values.code, values.scopeId, values.versionFlag);
            scopesService.createScope(req).then(res => {
                if (res.status) {
                    AlertMessages.getSuccessMessage(res.internalMessage);
                    getAllScopes();
                    closeButtonHandler();
                    formRef.resetFields();
                } else {
                    AlertMessages.getErrorMessage(res.internalMessage);
                }
            });

        }).catch(err => { console.log(err.message) })
    };
    return (
        <div>

            <Form layout='vertical'
                form={formRef} initialValues={initialValues}>
                <Row justify={'space-around'}>
                    <Col>
                        <Form.Item name='scopeId' hidden>
                            <InputNumber placeholder="ScopeId" />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='versionFlag' hidden>
                            <InputNumber placeholder="versionFlag" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7} >
                        <Form.Item name='name' label={t("scope.common.name", { defaultValue: 'Name' })}
                            rules={[{ required: true, message: t("common.fillTheName", { defaultValue: 'Please give Name' }) }, { pattern: new RegExp(/^[A-Za-z]+$/), message: t("common.lettersOnly", { defaultValue: 'Name contains only letters' }) }]}>
                            <Input placeholder={t("scope.common.name", { defaultValue: 'Name' })} /></Form.Item>
                    </Col>

                    {/* xs={24} md={24} lg={7} xl={7} xxl={24} */}
                    <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
                        <Form.Item name='code' label={t("scope.common.code", { defaultValue: 'Code' })}
                            rules={[{ required: true, message:t("scope.form.scopeRequired", {defaultValue:'Scopes Code required'})  }, ...classValidator.onlyAlphabetsWithCapitalLetters()]}>
                            <Input placeholder={t("scope.common.code", { defaultValue: 'Code' })} /></Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={7} xl={7} xxl={24}>
                        <Button onClick={onSubmit} type='primary'>{t("common.submitButton", {defaultValue:'Submit'})}</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}