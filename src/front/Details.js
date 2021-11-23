import React, { useEffect, useState, createElement } from 'react';
import { newsfrontdetailApi } from '../api'
import moment from 'moment';
import { Comment, Avatar, Form, Button, Input, Tooltip, List } from 'antd';
import './css/Details.css'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

// 变量名必须是大写开头才可以使用{useEffect}
const Details = (props) => {
  // console.log(props.location.state.newsId);
  // 创建显示数组
  const [date, dateList] = useState([])

  // 获取导航栏数据
  useEffect(() => {
    newsfrontdetailApi({ newsId: props.location.state.newsId }).then(res => {
      // console.log(res.data);
      if (res.code === 2) {
        dateList(res.data)
      }
    })
  }, []);
  const { TextArea } = Input;
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          发表评论
        </Button>
      </Form.Item>
    </>
  );

  // 评论
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];
  const front = () => {
    console.log(date.notes);
    // props.history.push('/app')
  }
  // 评论组件
  const ExampleComment = () => {
    // console.log(2);
    return (
      <List
        className="comment-list"
        // header={`${date.notes.length} replies`}
        itemLayout="horizontal"
        dataSource={date.notes}
        renderItem={item => (
          console.log(item),
          <li>
            <Comment
              actions={actions}
              author={<a>{item.id}</a>}
              avatar={<Avatar src={`http://192.168.0.254:8086/${item.avatar.portrait}`} alt="Han Solo" />}
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
            {/* 嵌套评论 */}

              {item.replys.length!==0?<Ons data={item.replys} />:null}
            
          </li>
        )}
      />
    )
  }

  const Ons = (props) => {
    console.log(props.data);
    return (
      // <div 
        <List
          className="commentlis"
          // header={`${date.notes.length} replies`}
          dataSource={props.data}
          renderItem={props => (
            <li>
              <Comment
                actions={actions}
                author={<a>{props.id}</a>}
                avatar={<Avatar src={`http://192.168.0.254:8086/${props.avatar.portrait}`} alt="Han Solo" />}
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
      // </div>

    )
  }
  return (
    <div>
      {/* 导航 */}
      <div className="navigation">
        <button onClick={front}>首页</button>
        <button>登录</button>
      </div>
      {/* 标题 */}
      <div className="title">
        <h1 className="titlecolor">{date.title}</h1>
        <div className="aut">
          <p className="author">{date.author}</p>
          <span>发布时间：{date.date}</span>
          <span>|</span>
          <span>{date.remark}</span>
        </div>
      </div>
      {/* 中间内容 */}
      <div className="content">
        {/* 内容 */}
        <div className="content-rem">
          <p>
            {date.content}
          </p>
          <img src={date.pic ? `http://192.168.0.254:8086/${date.pic}` : `https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png`} />

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
              content={
                <Editor
                // onChange={this.handleChange}
                // onSubmit={this.handleSubmit}
                // submitting={submitting}
                // value={value}
                />
              }
            />
          </div>
          {/* 回复评论查看评论 */}
          <div>
            <ExampleComment>
            </ExampleComment>
          </div>
        </div>
      </div>
      <div className="bottom">

      </div>
    </div>



  );
}

export default Details