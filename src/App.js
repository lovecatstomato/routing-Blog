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
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // 获取导航栏数据
  useEffect(() => {
    newsfrontcolumsApi().then(res => {
      // console.log(res.data);
      setList(res.data)
      // console.log(list);
    })
    navigation()
  }, []);
  // 点击获取列表数据
  const navigation = (columnName,page=1) => {
    console.log(columnName);
    newsfrontlistApi({ columnName,page }).then(resd => {
      // console.log(1);
      cde(resd.data.list)
      console.log(resd.data);
      setTotal(resd.data.total)
      // console.log(listData);
      // listData: resd.data.list
      // console.log(listData);
    })
  }
  const newsfrontList = (page = 1) => {
    newsfrontlistApi({ page }).then(resx => {
      console.log(resx.data.list);
      cde(resx.data.list)
    })
  }
  // 注册跳转
  const register = () => {
    props.history.push('/register')
  }
  // 标题跳转详细页面
  const title = (newsId) => {
    console.log(newsId);
    props.history.push('/details', { newsId: newsId })
  }
  const onSearch = value => console.log(value);// 搜索框函数 

  // 首页
  const shouw = () => {
    newsfrontList()
  }
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
          <Menu.Item onClick={shouw}>
            首页
          </Menu.Item>
          {
            list.map(item => <Menu.Item key={item.columnId} onClick={() => navigation(item.columnName)}>{item.columnName}</Menu.Item>)
          }
          <Menu.Item key="app" onClick={register}>
            注册
          </Menu.Item>
          <Menu.Item onClick={register}>
            欢迎你{localStorage.getItem("user")}
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
              setPage(page)
              newsfrontList(page)
            },
            pageSize: 10,
            total
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
                  src={item.pic ? `http://192.168.0.254:8088/${item.pic}` : `https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png`}
                />
              }
            >
              <List.Item.Meta
                title={<a onClick={() => title(item.newsId)}>{item.title}</a>}
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