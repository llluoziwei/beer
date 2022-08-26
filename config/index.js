import {Http} from '../utils/request.js'

export const user = (data) => {
	return Http({
		url: '/user/info',
		method: 'POST',
		data: data || {},
		loadText: '正在请求中...'
	})
}