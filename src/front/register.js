// Hello.js
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'
import './css/Universal.css'
import { cusregisteApi } from '../api'


const register = (props) => {
    // 获取表单数据发送并登录
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        cusregisteApi({ account: values.account, password: values.password, tel: values.tel }).then(res => {
            console.log(res);
        })
    };

    const front = ()=>{
        props.history.push('/app')
    }

    return (
        <div className='body'>
            <div className="fronst">
                <a onClick={front}>
                    首页
                </a>
            </div>
            <div className='Rame'>
                <h2>欢迎注册</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="account"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
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
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>

                    <Form.Item
                        name="tel"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input placeholder="手机号"
                        />
                    </Form.Item>

                    {/* <Form.Item
                            name="tel"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input placeholder="手机号"
                            />
                        </Form.Item> */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );

}

export default register