import React, { useEffect, useState, createElement, useRef } from 'react';
import { newsfrontdetailApi, commentaddApi, commentreplyApi, commentfavorApi } from '../api'
import moment from 'moment';
import { Comment, Avatar, Form, Button, Input, Tooltip, List } from 'antd';
import './css/Details.css'
import { LikeOutlined, LikeFilled } from '@ant-design/icons';

// 变量名必须是大写开头才可以使用{useEffect}
const Details = (props) => {
  // console.log(props.location.state.newsId);
  // 创建显示数组
  const [datel, dateList] = useState([])
  const [hasReply, setHasReply] = useState(false)
  const [currId, setCurrId] = useState('')
  // const ref = useRef(null);
  const { newsId } = props.location.state
  // 获取导航栏数据
  useEffect(() => {
    newsfrontdetailApi({ newsId }).then(res => {
      // console.log(res.data);

      if (res.code === 2) {
        dateList(res.data)
        // console.log(date.content);
        // ref.current.innerHTML = datel.content
        // console.log(datel);
      }
    })
  }, []);
  // const { TextArea } = Input;
  const T1 = (props) => {
    let item = props.data
    // 评论
    const [action, setAction] = useState(null);

    const like = (id) => {
      setAction('liked');
      commentfavorApi({ id: id.id, type: 1 }).then(resdf => {
        if (resdf.code === 2) {
          newsfrontdetailApi({ newsId }).then(res => {
            if (res.code === 2) {
              dateList(res.data)
            }
          })
        }

      })
    };

    // 回复按钮事件
    const huif = (id) => {
      console.log(id);
      setHasReply(!hasReply)
      setCurrId(id)
    }
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={() => like(props.data)}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{props.data.favor}</span>
        </span>
      </Tooltip>,
      <span key="comment-basic-reply-to" onClick={() => huif(props.data.id)} >{(hasReply && currId == props.data.id) ? '收起' : '回复'}</span>,
    ];

    return (
      <Comment
        actions={actions}
        author={<a>{item.id}</a>}
        avatar={<Avatar src={`http://192.168.0.254:8088/${item.avatar.portrait}`} alt="Han Solo" />}
        content={
          <p>
            {item.text}
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    )
  }
  // 评论组件
  const ExampleComment = () => {
    return (
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={datel.notes}
        renderItem={item => (
          <li>
            <T1 data={item} />
            {/* 嵌套评论 */}
            {(hasReply && item.id == currId) && <Pinl data={item.id} />}
            {item.replys.length !== 0 ? <Ons data={item.replys} /> : null}
          </li>
        )}
      />
    )
  }
  // 嵌套评论
  const Ons = (props) => {
    const [action, setAction] = useState(null);

    const likec = (id) => {
      setAction('liked');
      commentfavorApi({ id: id.id, type: 2 }).then(resdf => {
        if (resdf.code === 2) {
          newsfrontdetailApi({ newsId }).then(res => {
            if (res.code === 2) {
              dateList(res.data)
            }
          })
        }

      })
    };
    return (
      <List
        className="commentlis"
        dataSource={props.data}
        renderItem={props => (
          <li>
            <Comment
              actions={[<Tooltip key="comment-basic-like" title="Like">
                <span onClick={() => likec(props)}>
                  {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}

                  <span className="comment-action">{props.favor}</span>
                </span>
              </Tooltip>,]}
              author={<a>{props.id}</a>}
              avatar={<Avatar src={`http://192.168.0.254:8088/${props.avatar.portrait}`} alt="Han Solo" />}
              content={
                <p>
                  {props.text}
                </p>
              }
              datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
            />
          </li>
        )}
      />
    )
  }


  // 回复评论
  const Pinl = (props) => {
    const onFinsh2 = (values) => {
      // console.log(values.Comment);
      // console.log(props.data);
      commentreplyApi({ noteId: props.data, text: values.Comment }).then(resf => {
        console.log(resf);
      })
    }
    return (
      <div>
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        />
        <Form onFinish={onFinsh2} >
          <Form.Item name="Comment">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              回复评论
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  // 获取发表评论输入框
  const onFinish = (values) => {
    commentaddApi({ newsId: datel.newsId, text: values.Comment }).then(resd => {
      console.log(resd);
    })
  };

  // 登录页面跳转
  const login = () => {
    props.history.push('/')
  }
  // 首页跳转
  const front = () => {
    props.history.push('/app')
  }
  // 注册跳转
  const register = () => {
    props.history.push('/register')
  }
  return (
    <div>
      {/* 导航 */}
      <div className="navigation">
        <button onClick={front}>首页</button>
        <button onClick={login}>登录</button>
        <button onClick={register}>注册</button>
      </div>
      {/* 标题 */}
      <div className="title">
        <h1 className="titlecolor">{datel.title}</h1>
        <div className="aut">
          <p className="author">{datel.author}</p>
          <span>发布时间：{datel.date}</span>
          <span>|</span>
          <span>{datel.remark}</span>
        </div>
      </div>
      {/* 中间内容 */}
      <div className="content">
        {/* 内容 */}
        <div className="content-rem">
          <div dangerouslySetInnerHTML={{__html: datel.content}}>
          </div>
          {/* <div ref={ref}></div> */}

          <img src={datel.pic ? `http://192.168.0.254:8088/${datel.pic}` : `https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png`} />

        </div>
      </div>
      <div>
        {/* 评论 */}
        <div className="pu">
          {/* 发表评论 */}
          <div className="PublishComment">
            <p>发表评论</p>
            <Comment
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            />
            <Form onFinish={onFinish}>
              <Form.Item name="Comment">
                <Input.TextArea />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  发表评论
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/* 回复评论查看评论 */}
          <div>
            <ExampleComment />
          </div>
        </div>
      </div>
      <div className="bottom">

      </div>
    </div>



  );
}

export default Details