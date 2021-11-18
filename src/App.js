import { Menu, Input, Button } from 'antd';
import React from 'react'
import 'antd/dist/antd.css';
import './front/css/index.css'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { BankOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Search } = Input;

class index extends React.Component {
  state = {
    sc: [],
    Router: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    // 登录成功后读取输入信息
    this.setState({ Router: e.key });

  };

  // componentDidMount(){
  //     axios.get('http://192.168.0.254:8088/newsfront/list').then(re =>{
  //         console.log(re);

  //     })
  // }

  render() {
    const { Router } = this.state;// 导航栏函数 
    const onSearch = value => console.log(value);// 搜索框函数 
    return (
      <div className='boy'>
        {/* 搜索框 */}
        <div className='search'>
          <Search
            placeholder="请输入搜索内容"
            allowClear
            enterButton="搜索一下"
            size="large"
            onSearch={onSearch}
          />
        </div>
        {/* 导航栏 */}
        <div className='navigation'>
          <Menu className='me' onClick={this.handleClick} selectedKeys={[Router]} mode="horizontal">
            <Menu.Item key="1" icon={<BankOutlined />}>
              首页
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
              国内
            </Menu.Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="app" icon={<AppstoreOutlined />}>
              登录
            </Menu.Item>
          </Menu>
        </div>
        {/* 中间内容栏 */}
        <div>

        </div>
        {/* 底部版权栏 */}
        <div className='introduce'>
          <div className='butx'>
            <div className='butx-left'>
              <Button type="primary" shape="round">
                Download
              </Button>
            </div>
            <div className='but-right'></div>
          </div>
          <div className='butt'></div>
        </div>
      </div>

    );
  }
}

export default index