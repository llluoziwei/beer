import {Http} from '../utils/request.js'

/*--------------------判定是否服务器连通接口-----------------------*/
export const connectTest = (data) => {
	return Http({
		url: '/app/user/connectTest',
		method: 'POST',
		data: data || {},
		loadText: '正在请求中...'
	})
}
/*--------------------判定是否服务器连通接口-----------------------*/
export const login = (data) => {
	return Http({
		url: '/oauth/login',
		method: 'POST',
		data: data || {},
		serve:false,
		loadText: '正在请求中...'
	})
}