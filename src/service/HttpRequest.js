import wepy from 'wepy'
import Md5 from './md5.js'

class HttpRequest extends wepy.app{
	constructor () {
		super()
		this.$$base = 'https://zstest.zsbutcher.cn/smartShopping/backend/web/index.php?'
		this.$$baseHtml = 'https://zstest.zsbutcher.cn/smartShopping/h5/'
		this.$$path = {
			time:'r=test',
			//sendCode: 'https://zstest.zsbutcher.cn/smartWb/store/web/index.php?r=forlulu/encrypte-data',
			sendCode: 'r=wechat/api-auth',
			userlogin: 'r=member/api-get-token-by-phone',
			indexList: 'r=recommend/api-get-spus',
			getBanner: 'r=banner/api-get-banner',
			detail: 'r=product/api-get-spu-detail',
			search: 'r=product/api-search-spu',
			addcart: 'r=shopping-cart/api-update',
			topCategory: 'r=category/api-get-top-categories',
			childCategory: 'r=category/api-get-children',
			getSpu: 'r=category/api-get-spu',
			userInfo: 'r=member/api-get-info',
			orderStatus: 'r=order/api-get-order-statistics',
			getAddress: 'r=address/api-get-address-list',
			editAddress: 'r=address/api-update-address',
			deleteAddress: 'r=address/api-del-address',
			getCart: 'r=shopping-cart/api-get-shopping-cart',
			deleteCart: 'r=shopping-cart/api-del',
			topArea: 'r=area/api-get-top-areas',
			applyOrder: 'r=buying/api-apply-create-order-by-shopping-cart',
			createOrder: 'r=buying/api-create-order-by-shopping-cart',
			applyOrderBuy: 'r=buying/api-apply-create-order-by-fast-buying',
			createOrderBuy: 'r=buying/api-create-order-by-fast-buying',
			setMark: 'r=mark/api-mark',
			cancelMark: 'r=mark/api-cancel-mark',
			getMarkUser: 'r=mark/api-get-collectors',
			getOrder: 'r=order/api-get-detail',
			getMarkSpu: 'r=mark/api-get-mark-spu',
			getOrderStatus: 'r=order/api-get-orders',
			getOrderDetail: 'r=order/api-get-detail',
			cancelOrder: 'r=order/api-cancel',
			orderEditAdd: 'r=order/api-change-address',
			getNotice: 'r=notice/api-get-notice',
			getService: 'r=virtual-item/api-get-virtual-item',
			payService: 'r=buying/api-apply-pay',
			getSignCode: 'r=member/api-apply-sign-in-by-phone',
			loginByPhone: 'r=member/api-sign-up-or-sign-in'
		}
		this.$$pathHtml = {
			rules: 'distribution_rules.html',
			service: 'vip_service_agreement.html'
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
		newParam.signature = Md5.hexMD5(sign)
		return newParam
	}
	getTime () {
		return new Promise((resolve, reject) => {
			wepy.request({
				url: this.$$base + this.$$path.time,
				method: 'GET',
				header: {'content-type': 'application/json'},
				success: (data) => {
				  resolve(data)
				},
				fail: (error) => {
				  reject(error)
				}
			})
		})
	}
	SendCode (param, cb) {
		var _this = this
        return new Promise((resolve, reject) => {
        	_this.getTime().then((res) => {
        		var data = _this.getData(res, param)
        		wepy.request({
	            	url: this.$$base + this.$$path.sendCode,
	            	method: 'POST',
	            	header: {'content-type': 'application/x-www-form-urlencoded'},
	            	data: data,
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
	            })
        	}).catch(() => {
        		cb && cb()
        	})
        })
	}
	UserLogin (param, cb) {
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
					},
					fail: (error) => {
					  reject(error)
					}
	            })
        	}).catch(() => {
        		cb && cb()
        	})
        })
	}
	IndexHttp (param, cb) {
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
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetBanner (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getBanner,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	DetailHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.detail,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			})
			.catch(() => {
        		cb && cb()
        	})
		})
	}
	AddCartHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.addcart,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetTopCategory (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.topCategory,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetChildCategory (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.childCategory,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetSpuHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getSpu,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	SetMarkHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.setMark,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	CancelMarkHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.cancelMark,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetMarkUser (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getMarkUser,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetMarkSpu (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getMarkSpu,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetCartHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getCart,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	DeleteCartHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				console.log(data)
				wepy.request({
					url: this.$$base + this.$$path.deleteCart,
					method: 'POST',
	                header: {'content-type': 'application/x-www-form-urlencoded'},
	                data: data,
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetUserInfo (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.userInfo,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetUserOrder (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.orderStatus,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	CreateUserOrder (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.createOrder,
					method: 'POST',
	                header: {'content-type': 'application/x-www-form-urlencoded'},
	                data: data,
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	CreateOrderBuy (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.createOrderBuy,
					method: 'POST',
	                header: {'content-type': 'application/x-www-form-urlencoded'},
	                data: data,
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	CancelOrder (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.cancelOrder,
					method: 'GET',
	                header: {'content-type': 'application/json'},
	                data: data,
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	EditOrderAdd (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.orderEditAdd,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetAddress (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getAddress,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	EditAddress (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.editAddress,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	DeleteAddress (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.deleteAddress,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	ApplyOrderHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.applyOrder,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	ApplyOrderBuy (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.applyOrderBuy,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetOrderHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getOrder,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetOrderStatus (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getOrderStatus,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetOrderDetail (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getOrderDetail,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetTopArea () {
		return new Promise((resolve, reject) => {
			wepy.request({
				url: 'https://app1.zhengshan.store/smartArea/backend/web/index.php',
				method: 'GET',
                header: {'content-type': 'application/json'},
				success: (data) => {
				  resolve(data)
				},
				fail: (error) => {
				  reject(error)
				}
			})
		})
	}
	GetNotice (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getNotice,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetService (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getService,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	PayService (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.payService,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetLogistica (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: 'http://192.168.8.126/smartWb/store/web/index.php?r=zs-api/get-logistics-trace',
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	SearchHttp (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				console.log(data)
				wepy.request({
					url: this.$$base + this.$$path.search,
					method: 'POST',
	                header: {'content-type': 'application/x-www-form-urlencoded'},
	                data: data,
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	GetSignCode (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.getSignCode,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
        	})
		})
	}
	LoginByPhone (param, cb) {
		var _this = this
		return new Promise((resolve, reject) => {
			_this.getTime().then((res) => {
				var data = _this.getData(res, param)
				wepy.request({
					url: this.$$base + this.$$path.loginByPhone,
					data: data,
					method: 'GET',
	                header: {'content-type': 'application/json'},
					success: (data) => {
					  resolve(data)
					},
					fail: (error) => {
					  reject(error)
					}
				})
			}).catch(() => {
        		cb && cb()
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