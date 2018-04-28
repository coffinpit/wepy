import wepy from 'wepy'
import Md5 from './md5.js'

class HttpRequest extends wepy.app{
	constructor () {
		super()
		this.$$base = 'https://zstest.zsbutcher.cn/smartShopping/backend/web/index.php?'
		this.$$path = {
			time:'r=test',
			userlogin: 'r=member/api-get-token-by-phone',
			indexList: 'r=recommend/api-get-spus'
		}
	}
	getData (res, param) {
		var time = res.data.toString()
		param.requestTime = time
		for (var key in param) {
			param[key] = param[key].toString()
		}
		var newKey = Object.keys(param).sort()
		var newParam = {}
		newKey.forEach((item) => {
			newParam[item] = param[item]
		})
		var sign = JSON.stringify(newParam) + '^ZS2018LCJ'
		param.signature = Md5.hexMD5(sign)
		return param
	}
	getTime () {
		return new Promise((resolve, reject) => {
			wepy.request({
				url: this.$$base + this.$$path.time,
				method: 'GET',
				header: {'content-type': 'application/json'},
				success: (data) => {
				  resolve(data)
				}
			})
		})
	}
	UserLogin (param) {
		var _this = this
        return new Promise((resolve, reject) => {
        	_this.getTime().then((res) => {
        		var data = _this.getData(res, param)
        		wepy.request({
	            	url: this.$$base + this.$$path.userlogin,
	            	data: data,
	            	method: 'GET',
	            	header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					}
	            })
        	})
        })
	}
	UserHttp (param) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.indexList,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					}
				})
			})
		})
	}
}
// export default function RequestTest (params1, params2) {
// 	return new Promise((resolve, reject) => {
// 		wepy.request({
// 		  url: 'https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + params1 + '&i=' + params2,
// 		  success: (data) => {
// 		  	resolve(data)
// 		  }
// 	    })
// 	})
// }

// export default function UserLogin (param) {
// 	return new Promise((resolve, reject) => {
// 		wepy.login({
// 		  success: (res) =>{
// 		    resolve(res)
// 		  }
// 		})
// 	})
// } 

export default HttpRequest