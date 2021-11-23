// Hello.js
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'
import './css/Universal.css'
import { cusloginApi } from '../api'
// import axios from 'axios';

// 函数组件
const login = (props) => {
    // 登录获取数据并发送数据
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(values.password);
        cusloginApi({account:values.account,password:values.password}).then(ret => {
            console.log(ret);
            if (ret.code === 2) {
                // console.log(1);
                // 保存token数据到本地储存
                window.localStorage.setItem('token', ret.data.token)
                // 保存user用户名数据
                window.localStorage.setItem('user', ret.data.user.account)
                props.history.push('/app')
            }
        })
    };
    // render() {
    return (
        <div className='body'>
            <div className='Rame'>
                <h2>用户登录</h2>
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
    // }
}

export default login