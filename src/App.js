import React, { useState, useEffect } from 'react';
import { Menu, Input, Button, List } from 'antd';
import 'antd/dist/antd.css';
import './front/css/index.css'
import { newsfrontcolumsApi, newsfrontlistApi } from './api'

// const { SubMenu } = Menu;

const App = (props) => {
  // console.log(props);
  const { Search } = Input;
  // 导航数组
  const [list, setList] = useState([])
  // 列表数组
  const [listData, cde] = useState([]);

  // 获取导航栏数据
  useEffect(() => {
    newsfrontcolumsApi().then(res => {
      // console.log(res.data);
      setList(res.data)
      // console.log(list);
    })
  }, []);
  // 点击获取列表数据
  const navigation = (columnName) => {
    console.log(columnName);
    newsfrontlistApi({ columnName }).then(resd => {
      // console.log(1);
      cde(resd.data.list)
      console.log(resd.data.list);
      // console.log(listData);
      // listData: resd.data.list
      // console.log(listData);
    })
  }
  // 注册跳转
  const register = () =>{
    props.history.push('/register')
  }
  // 标题跳转详细页面
  const title = (newsId) =>{
    console.log(newsId);
    props.history.push('/details', { newsId:newsId })
  }
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
        <Menu className='me' mode="horizontal">
          {
            list.map(item => <Menu.Item key={item.columnId} onClick={() => navigation(item.columnName)}>{item.columnName}</Menu.Item>)
          }

          <Menu.Item key="app" onClick={register}>
            注册
          </Menu.Item>
        </Menu>
      </div>
      {/* 中间内容栏 */}
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  height={150}
                  alt="图片"
                  src={item.pic ? `http://192.168.0.254:8086/${item.pic}` : `https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png`}
                />
              }
            >
              <List.Item.Meta
                title={<a onClick={()=>title(item.newsId)}>{item.title}</a>}
                description={item.description}
              />
              <p>
                作者：{item.author}
              </p>
              <p>
                时间：{item.date}    
                <span className="remark">
                   {item.remark}
                </span>
              </p>
            </List.Item>
          )}
        />,
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

export default App