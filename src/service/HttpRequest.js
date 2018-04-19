import wepy from 'wepy'

class HttpRequest extends wepy.app{
	constructor () {
		super()
		this.$$path = {
			wechatLogin: ''
		}
	}
	UserLogin (param) {
		return new Promise((resolve, reject) => {
			wepy.login({
			  success: (res) =>{
			    resolve(res)
			  }
			})
		})
	}
	UserHttp (param) {
		return new Promise((resolve, reject) => {
			wepy.request({
				url: '',
				data: {
					code: param
				},
				method: 'POST',
                header: {'content-type': 'application/json'},
				success: (data) => {
				  resolv(data)
				}
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