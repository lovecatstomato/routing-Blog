import {get,post} from './untile/request'

// 新闻首页（分页）
export const newsfrontlistApi = params => get('/newsfront/list')(params)

// 新闻详细
export const newsfrontdetailApi = params => get('/newsfront/detail')(params)

// 所有新闻栏目
export const newsfrontcolumsApi = params => get('/newsfront/columns')(params)

// 发表评论
export const commentaddApi = data => post('/comment/add')(data)

// 回复评论
export const commentreplyApi = data => post('/comment/reply')(data)

// 点赞
export const commentfavorApi = params => get('/comment/favor')(params)

// 注册
export const cusregisteApi = data => post('/cus/registe')(data)

// 登录
export const cusloginApi = data => post('/cus/login')(data)

// 退出
export const cuslogoutApi = params => get('/cus/logout')(params)