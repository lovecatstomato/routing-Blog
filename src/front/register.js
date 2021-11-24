// Hello.js
import { Form, Input, Button, Upload } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import React from 'react'
import './css/Universal.css'
import axios from 'axios';


const register = (props) => {
    // 获取表单数据发送并登录
    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        const fd = new FormData();
        fd.append('account',values.account)
        fd.append('password',values.password)
        fd.append('tel',values.tel)
        fd.append('remark',values.remark)
        fd.append('file',values.upload.file)
        axios.post("http://127.0.0.1:8088/cus/registe",fd,{
            'X-Token':localStorage.getItem('token')
        }).then(resp =>{
            if (resp.data.code === 2) {
                alert("注册成功")
                props.history.push("/")
            }
        })
    };
    const onBeforeUpload = (file) => {
        return false;
    };
    const front = () => {
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

                    <Form.Item
                        name="upload"
                    >
                        <Upload name="logo" listType="picture"
                            maxCount={1}
                            beforeUpload={onBeforeUpload} >
                            <Button icon={<UploadOutlined />}>上传头像</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="描述" name="remark">
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );

}

export default register