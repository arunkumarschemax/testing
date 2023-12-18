
import { UploadOutlined } from '@ant-design/icons';
import { GetAllUsersDto } from '@finestchoicex-iam/shared-models';
import { Button, Card, Col, Form, Input, Row, Select, Upload } from 'antd';
import { GenderEnum, IdentityTypeEnum, UsersCreateDto } from 'packages/libs/shared-models/src/common';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from '../../common/auth-context';
const { Option } = Select;


interface IUserFormProps {
    submitHandler?: (req: UsersCreateDto) => void;
    initialValues?: GetAllUsersDto;
    unitsData: any;
    selectedClients: number;
}

export const UserForm = (props: IUserFormProps) => {
    const [formRef] = Form.useForm();
    const { submitHandler, selectedClients, initialValues, unitsData } = props;
    const [fileList, setFileList] = useState<any>()
    const { authContext } = useAuthState();
    const { t } = useTranslation();


    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const onSubmit = async () => {
        formRef.validateFields().then(async (values: UsersCreateDto) => {
            const f = formRef.getFieldValue('filesData');
            let filesData: any = [];
            if (f) {
                const base = await getBase64(f.file.originFileObj);
                filesData = [{
                    ...f.file,
                    base64Url: base,
                    fileDescription: 'User Profile'
                }];
            }
            const req = new UsersCreateDto(values.firstName, values.middleName, values.lastName, values.mobileNo, values.unitId, selectedClients, values.gender, values.identityType, values.identityNo, values.externalRefNo, values.userName, values.email, values.password, values.salt, authContext.user.userName, filesData?.length ? filesData : [], values.userId, values.authenticationId, values.versionFlag);
            submitHandler(req);
        }).catch(err => {
            console.log(err.message, 'error msg')
        })
    };

    const allowClear = () => {
        formRef.resetFields();
    };


    return (
        <div>

            <Form layout='vertical'
                form={formRef} initialValues={initialValues} autoComplete='off'>
                <Card title='Personal Details' >
                    <Row>
                        <Form.Item name='userId' hidden={true}></Form.Item>
                        <Form.Item name='authenticationId' hidden={true}></Form.Item>
                        <Form.Item name='versionFlag' hidden={true}></Form.Item>
                        <Form.Item name='clientId' hidden={true}></Form.Item>

                        <Col xs={24} sm={24} md={5} lg={7} xl={5} xxl={7}>
                            <Form.Item
                                name='firstName'
                                label={t('user.form.firstName', { defaultValue: 'First Name' })}
                                rules={[{ required: true, message: t('user.form.firstNameRequired', { defaultValue: 'First name is required' }) },
                                { pattern: new RegExp(/^[A-Za-z]+$/), message: t('user.form.firstNameLettersOnly', { defaultValue: 'Fisrt name contains letters only' }) },]}>
                                <Input placeholder={t('user.form.firstName', { defaultValue: 'First Name' })} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7} offset={1}>
                            <Form.Item
                                name='middleName'
                                label={t('user.form.middleName', { defaultValue: 'Middle Name' })}
                                rules={[{ required: false, message: t('user.form.middleNameRequired', { defaultValue: 'Middle name is required' }) },
                                { pattern: new RegExp(/^[A-Za-z]+$/), message: t('user.form.middleNameLettersOnly', { defaultValue: 'Middle name contains letters only' }) },]}>
                                <Input placeholder={t('user.form.middleName', { defaultValue: 'Middle Name' })} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7} offset={1}>
                            <Form.Item
                                name='lastName'
                                label={t('user.form.lastName', { defaultValue: 'Last Name' })}
                                rules={[{ required: true, message: t('user.form.lastNameRequired', { defaultValue: 'Laast name is required' }) },
                                { pattern: new RegExp(/^[A-Za-z]+$/), message: t('user.form.lastNameLettersOnly', { defaultValue: 'last name contains letters only' }) },]}>
                                <Input placeholder={t('user.form.lastName', { defaultValue: 'Last Name' })} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7} offset={1}>
                            <Form.Item
                                name='mobileNo'
                                label={t('user.common.mobileNo', { defaultValue: 'Mobile Number' })}
                                rules={[{ required: true, message: t('user.form.mobileNoRequired', { defaultValue: 'Mobile number is required' }) },]}>
                                <Input placeholder={t('user.common.mobileNo', { defaultValue: 'Mobile Number' })} />
                            </Form.Item>
                        </Col>

                    </Row>
                    <br />

                    <Row>
                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7}  >
                            <Form.Item
                                name='unitId'
                                label={t('user.form.unitId', { defaultValue: 'Unit' })}
                                rules={[{ required: true, message: t('user.form.unitIdRequired', { defaultValue: 'Unit id is required' }) },
                                ]}>
                                <Select style={{ width: '100%' }} placeholder=' Select Unit'>
                                    {unitsData.map((rec: any) => {
                                        return <Option value={rec.unitId}>{rec.name}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7} offset={1}>
                            <Form.Item
                                name='gender'
                                label={t('user.common.gender', { defaultValue: 'Gender' })}
                                rules={[{ required: true, message: t('user.form.genderRequired', { defaultValue: 'Gender is required' }) },
                                ]}>
                                <Select placeholder='Gender' allowClear showSearch>
                                    {Object.keys(GenderEnum).map((rec) => {
                                        return <Option value={GenderEnum[rec]}  >{GenderEnum[rec]}</Option>
                                    })}     </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={7} xl={5} xxl={24} offset={1}>
                            <Form.Item
                                name='identityType'
                                label={t('user.form.identityType', { defaultValue: 'Identity Type' })}
                                rules={[{ required: true, message: t('user.form.identityTypeRequired', { defaultValue: 'Identity type is required' }) },
                                ]}>
                                <Select placeholder='Select Identity Type' allowClear showSearch>
                                    {Object.keys(IdentityTypeEnum).map((rec) => {
                                        return <Option value={IdentityTypeEnum[rec]}  >{IdentityTypeEnum[rec]}</Option>
                                    })}     </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7} offset={1}>
                            <Form.Item
                                name='identityNo'
                                label={t('user.form.identityNo', { defaultValue: 'Identity Number' })}
                                rules={[{ required: true, message: t('user.form.identityNoRequired', { defaultValue: 'Identity Number is required' }) },]}>
                                <Input placeholder={t('user.form.identityNo', { defaultValue: 'Identity Number' })} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7}  >
                            <Form.Item
                                name='externalRefNo'
                                label={t('user.form.externalRefNo', { defaultValue: 'External Ref No' })}
                                rules={[{ required: true, message: t('user.form.unitIdRequired', { defaultValue: 'External Ref No is required' }) },
                                ]}>
                                <Input placeholder={t('user.common.externalRefNo', { defaultValue: 'External Ref No' })} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7} offset={1}>

                        </Col>

                        <Col xs={24} md={24} lg={7} xl={5} xxl={24} offset={1}>

                        </Col>

                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7} offset={1}>

                        </Col>
                    </Row>
                </Card>

                <br />
                <Card title='Authentication'>

                    <Row>
                        <Col xs={24} sm={24} md={5} lg={7} xl={5} xxl={7} >
                            <Form.Item
                                name='userName'
                                label={t('user.form.userName', { defaultValue: 'User Name' })}
                                rules={[{ required: true, message: t('user.form.userNameRequired', { defaultValue: 'User Name id required' }) },]}>
                                <Input placeholder={t('user.form.userName', { defaultValue: 'User Name' })} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={5} lg={7} xl={5} xxl={7} offset={1}>
                            <Form.Item
                                name="email"
                                label={t('user.form.email', { defaultValue: 'Email' })}
                                rules={[{ type: 'email', message: t('user.form.emailInvalid', { defaultValue: 'Email is invalid' }) },
                                { required: true, message: t('user.form.emailRequired', { defaultValue: 'Email is required' }) },]}
                            >
                                <Input placeholder={t('user.form.email', { defaultValue: 'Email' })} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={5} lg={7} xl={5} xxl={7} offset={1}>
                            <Form.Item
                                name="password"
                                label={t('user.form.password', { defaultValue: 'Password' })}
                                hasFeedback
                                rules={[
                                    { required: true, message: t('user.form.passwordRequired', { defaultValue: 'Password is required' }) },
                                ]}

                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={5} lg={7} xl={5} xxl={7} offset={1}>
                            <Form.Item
                                name="confirmPassword"
                                label={t('user.form.confirmPassword', { defaultValue: 'Confirm Password' })}
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: t('user.form.confirmPasswordRequired', { defaultValue: 'confirm password is required' }) },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(t('user.form.passwordNotMatch', { defaultValue: 'Entered password doesnot match' })));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col xs={24} sm={24} md={7} lg={7} xl={5} xxl={7} >
                            <Form.Item name={'filesData'}>
                                <Upload

                                    multiple={false}
                                    maxCount={1}
                                    showUploadList={true}
                                    customRequest={(data) => setFileList([data.file])}
                                    onRemove={() => setFileList([])}
                                    fileList={fileList}
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>

                            </Form.Item>

                        </Col>
                    </Row>
                </Card>


                <Row  >
                    <Col xs={24} sm={24} md={7} lg={7} xl={2} xxl={7} offset={18}>
                        <Button onClick={allowClear} type='primary' danger>{t('user.form.clear', { defaultValue: 'Clear' })}</Button>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={3} xxl={7} >
                        <Button onClick={onSubmit} type='primary'>{t("common.submitButton", { defaultValue: 'Submit' })}</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}