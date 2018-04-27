import wepy from 'wepy'

class HttpRequest extends wepy.app{
	constructor () {
		super()
		this.$$base = 'http://zstest.zsbutcher.cn'
		this.$$path = {
			indexList: '?r=recommend/api-get-spus'
		}
	}
	UserHttp (param) {
		console.log(this.$$base + this.$$path.indexList)
		return new Promise((resolve, reject) => {
			wepy.request({
				url: this.$$base + this.$$path.indexList,
				data: {
					code: param
				},
				method: 'POST',
                header: {'content-type': 'application/json'},
				success: (data) => {
				  resolve(data)
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