import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login-component.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIAMClientState } from '../iam-client';
import { loginUser } from '../actions';
import { LoginUserDto } from '../user-models';



export const LoginComponent = () => {
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (values: any) => {
        try {
            const req = new LoginUserDto(values.username, values.password, IAMClientAuthContext.authServerUrl)
            let response = await loginUser(dispatch, req);
            if (!response.user) return false;
            const from = location.state?.from;
            if (from) {
                navigate(from, { replace: true });
            } else {
                navigate("/", { replace: true });
            }
            return true;
        } catch (error: any) {
            notification.config({ maxCount: 3, duration: 3, placement: 'top' });
            notification.destroy();
            notification.error(
                {
                    message: 'Login Failed',
                    description: error.message,
                }
            );
            return false;
        }
    };

    return (
        <div>
            <div className="bg-img">
                <div className="login">
                    <div className="imgcontainer">
                        <img src={''} alt='Schemax' /> <h2>Schemax</h2>
                    </div>
                    <Form
                        className="container"
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoComplete="off" />
                        </Form.Item>


                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="Password"
                                placeholder="Password"
                                autoComplete="off"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button ">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div></div>
    )
}

export default LoginComponent;