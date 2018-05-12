'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _md = require('./md5.js');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpRequest = function (_wepy$app) {
	_inherits(HttpRequest, _wepy$app);

	function HttpRequest() {
		_classCallCheck(this, HttpRequest);

		var _this2 = _possibleConstructorReturn(this, (HttpRequest.__proto__ || Object.getPrototypeOf(HttpRequest)).call(this));

		_this2.$$base = 'https://zstest.zsbutcher.cn/smartShopping/backend/web/index.php?';
		_this2.$$baseHtml = 'https://zstest.zsbutcher.cn/smartShopping/h5/';
		_this2.$$path = {
			time: 'r=test',
			userlogin: 'r=member/api-get-token-by-phone',
			indexList: 'r=recommend/api-get-spus',
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
			getNotice: 'r=notice/api-get-notice'
		};
		_this2.$$pathHtml = {
			rules: 'distribution_rules.html'
		};
		return _this2;
	}

	_createClass(HttpRequest, [{
		key: 'getData',
		value: function getData(res, param) {
			var time = res.data.toString();
			param.requestTime = time;
			for (var key in param) {
				param[key] = param[key].toString();
			}
			var newKey = Object.keys(param).sort();
			var newParam = {};
			newKey.forEach(function (item) {
				newParam[item] = param[item];
			});
			var sign = JSON.stringify(newParam) + '^ZS2018LCJ';
			newParam.signature = _md2.default.hexMD5(sign);
			return newParam;
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				_wepy2.default.request({
					url: _this3.$$base + _this3.$$path.time,
					method: 'GET',
					header: { 'content-type': 'application/json' },
					success: function success(data) {
						resolve(data);
					},
					fail: function fail(error) {
						reject(error);
					}
				});
			});
		}
	}, {
		key: 'UserLogin',
		value: function UserLogin(param, cb) {
			var _this4 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this4.$$base + _this4.$$path.userlogin,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'IndexHttp',
		value: function IndexHttp(param, cb) {
			var _this5 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this5.$$base + _this5.$$path.indexList,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'DetailHttp',
		value: function DetailHttp(param, cb) {
			var _this6 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this6.$$base + _this6.$$path.detail,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'AddCartHttp',
		value: function AddCartHttp(param, cb) {
			var _this7 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this7.$$base + _this7.$$path.addcart,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetTopCategory',
		value: function GetTopCategory(param, cb) {
			var _this8 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this8.$$base + _this8.$$path.topCategory,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetChildCategory',
		value: function GetChildCategory(param, cb) {
			var _this9 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this9.$$base + _this9.$$path.childCategory,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetSpuHttp',
		value: function GetSpuHttp(param, cb) {
			var _this10 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this10.$$base + _this10.$$path.getSpu,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'SetMarkHttp',
		value: function SetMarkHttp(param, cb) {
			var _this11 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this11.$$base + _this11.$$path.setMark,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'CancelMarkHttp',
		value: function CancelMarkHttp(param, cb) {
			var _this12 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this12.$$base + _this12.$$path.cancelMark,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetMarkUser',
		value: function GetMarkUser(param, cb) {
			var _this13 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this13.$$base + _this13.$$path.getMarkUser,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetMarkSpu',
		value: function GetMarkSpu(param, cb) {
			var _this14 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this14.$$base + _this14.$$path.getMarkSpu,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetCartHttp',
		value: function GetCartHttp(param, cb) {
			var _this15 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this15.$$base + _this15.$$path.getCart,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'DeleteCartHttp',
		value: function DeleteCartHttp(param, cb) {
			var _this16 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this16.$$base + _this16.$$path.deleteCart,
						method: 'POST',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: data,
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetUserInfo',
		value: function GetUserInfo(param, cb) {
			var _this17 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this17.$$base + _this17.$$path.userInfo,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetUserOrder',
		value: function GetUserOrder(param, cb) {
			var _this18 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this18.$$base + _this18.$$path.orderStatus,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'CreateUserOrder',
		value: function CreateUserOrder(param, cb) {
			var _this19 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this19.$$base + _this19.$$path.createOrder,
						method: 'POST',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: data,
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'CreateOrderBuy',
		value: function CreateOrderBuy(param, cb) {
			var _this20 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this20.$$base + _this20.$$path.createOrderBuy,
						method: 'POST',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: data,
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'CancelOrder',
		value: function CancelOrder(param, cb) {
			var _this21 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this21.$$base + _this21.$$path.cancelOrder,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						data: data,
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'EditOrderAdd',
		value: function EditOrderAdd(param, cb) {
			var _this22 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this22.$$base + _this22.$$path.orderEditAdd,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetAddress',
		value: function GetAddress(param, cb) {
			var _this23 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this23.$$base + _this23.$$path.getAddress,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'EditAddress',
		value: function EditAddress(param, cb) {
			var _this24 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this24.$$base + _this24.$$path.editAddress,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'DeleteAddress',
		value: function DeleteAddress(param, cb) {
			var _this25 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this25.$$base + _this25.$$path.deleteAddress,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'ApplyOrderHttp',
		value: function ApplyOrderHttp(param, cb) {
			var _this26 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this26.$$base + _this26.$$path.applyOrder,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'ApplyOrderBuy',
		value: function ApplyOrderBuy(param, cb) {
			var _this27 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this27.$$base + _this27.$$path.applyOrderBuy,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetOrderHttp',
		value: function GetOrderHttp(param, cb) {
			var _this28 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this28.$$base + _this28.$$path.getOrder,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetOrderStatus',
		value: function GetOrderStatus(param, cb) {
			var _this29 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this29.$$base + _this29.$$path.getOrderStatus,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetOrderDetail',
		value: function GetOrderDetail(param, cb) {
			var _this30 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this30.$$base + _this30.$$path.getOrderDetail,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'GetTopArea',
		value: function GetTopArea() {
			return new Promise(function (resolve, reject) {
				_wepy2.default.request({
					url: 'https://app1.zhengshan.store/smartArea/backend/web/index.php',
					method: 'GET',
					header: { 'content-type': 'application/json' },
					success: function success(data) {
						resolve(data);
					},
					fail: function fail(error) {
						reject(error);
					}
				});
			});
		}
	}, {
		key: 'GetNotice',
		value: function GetNotice(param, cb) {
			var _this31 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this31.$$base + _this31.$$path.getNotice,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}, {
		key: 'SearchHttp',
		value: function SearchHttp(param, cb) {
			var _this32 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this32.$$base + _this32.$$path.search,
						method: 'POST',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: data,
						success: function success(data) {
							resolve(data);
						},
						fail: function fail(error) {
							reject(error);
						}
					});
				}).catch(function () {
					cb && cb();
				});
			});
		}
	}]);

	return HttpRequest;
}(_wepy2.default.app);
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

exports.default = HttpRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRiYXNlSHRtbCIsIiQkcGF0aCIsInRpbWUiLCJ1c2VybG9naW4iLCJpbmRleExpc3QiLCJkZXRhaWwiLCJzZWFyY2giLCJhZGRjYXJ0IiwidG9wQ2F0ZWdvcnkiLCJjaGlsZENhdGVnb3J5IiwiZ2V0U3B1IiwidXNlckluZm8iLCJvcmRlclN0YXR1cyIsImdldEFkZHJlc3MiLCJlZGl0QWRkcmVzcyIsImRlbGV0ZUFkZHJlc3MiLCJnZXRDYXJ0IiwiZGVsZXRlQ2FydCIsInRvcEFyZWEiLCJhcHBseU9yZGVyIiwiY3JlYXRlT3JkZXIiLCJhcHBseU9yZGVyQnV5IiwiY3JlYXRlT3JkZXJCdXkiLCJzZXRNYXJrIiwiY2FuY2VsTWFyayIsImdldE1hcmtVc2VyIiwiZ2V0T3JkZXIiLCJnZXRNYXJrU3B1IiwiZ2V0T3JkZXJTdGF0dXMiLCJnZXRPcmRlckRldGFpbCIsImNhbmNlbE9yZGVyIiwib3JkZXJFZGl0QWRkIiwiZ2V0Tm90aWNlIiwiJCRwYXRoSHRtbCIsInJ1bGVzIiwicmVzIiwicGFyYW0iLCJkYXRhIiwidG9TdHJpbmciLCJyZXF1ZXN0VGltZSIsImtleSIsIm5ld0tleSIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwibmV3UGFyYW0iLCJmb3JFYWNoIiwiaXRlbSIsInNpZ24iLCJKU09OIiwic3RyaW5naWZ5Iiwic2lnbmF0dXJlIiwiaGV4TUQ1IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsImZhaWwiLCJlcnJvciIsImNiIiwiX3RoaXMiLCJnZXRUaW1lIiwidGhlbiIsImdldERhdGEiLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFc7OztBQUNMLHdCQUFlO0FBQUE7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QVlqQyxJQUFaO0FBQ0Esb0JBQUttQixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLMUQsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWUssTUFEbkI7QUFFWm9ELGNBQVEsTUFGSTtBQUdBQyxjQUFRLEVBQUMsZ0JBQWdCLG1DQUFqQixFQUhSO0FBSUF0QixZQUFNQSxJQUpOO0FBS1p1QixlQUFTLGlCQUFDdkIsSUFBRCxFQUFVO0FBQ2pCaUIsZUFBUWpCLElBQVI7QUFDRCxPQVBXO0FBUVp3QixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FmRCxFQWVHTSxLQWZILENBZVMsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FqQlA7QUFrQkEsSUFuQk0sQ0FBUDtBQW9CQTs7OztFQXZ0QndCLGVBQUtRLEc7QUF5dEIvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O2tCQUVlekUsVyIsImZpbGUiOiJIdHRwUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBNZDUgZnJvbSAnLi9tZDUuanMnXHJcblxyXG5jbGFzcyBIdHRwUmVxdWVzdCBleHRlbmRzIHdlcHkuYXBwe1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKClcclxuXHRcdHRoaXMuJCRiYXNlID0gJ2h0dHBzOi8venN0ZXN0LnpzYnV0Y2hlci5jbi9zbWFydFNob3BwaW5nL2JhY2tlbmQvd2ViL2luZGV4LnBocD8nXHJcblx0XHR0aGlzLiQkYmFzZUh0bWwgPSAnaHR0cHM6Ly96c3Rlc3QuenNidXRjaGVyLmNuL3NtYXJ0U2hvcHBpbmcvaDUvJ1xyXG5cdFx0dGhpcy4kJHBhdGggPSB7XHJcblx0XHRcdHRpbWU6J3I9dGVzdCcsXHJcblx0XHRcdHVzZXJsb2dpbjogJ3I9bWVtYmVyL2FwaS1nZXQtdG9rZW4tYnktcGhvbmUnLFxyXG5cdFx0XHRpbmRleExpc3Q6ICdyPXJlY29tbWVuZC9hcGktZ2V0LXNwdXMnLFxyXG5cdFx0XHRkZXRhaWw6ICdyPXByb2R1Y3QvYXBpLWdldC1zcHUtZGV0YWlsJyxcclxuXHRcdFx0c2VhcmNoOiAncj1wcm9kdWN0L2FwaS1zZWFyY2gtc3B1JyxcclxuXHRcdFx0YWRkY2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktdXBkYXRlJyxcclxuXHRcdFx0dG9wQ2F0ZWdvcnk6ICdyPWNhdGVnb3J5L2FwaS1nZXQtdG9wLWNhdGVnb3JpZXMnLFxyXG5cdFx0XHRjaGlsZENhdGVnb3J5OiAncj1jYXRlZ29yeS9hcGktZ2V0LWNoaWxkcmVuJyxcclxuXHRcdFx0Z2V0U3B1OiAncj1jYXRlZ29yeS9hcGktZ2V0LXNwdScsXHJcblx0XHRcdHVzZXJJbmZvOiAncj1tZW1iZXIvYXBpLWdldC1pbmZvJyxcclxuXHRcdFx0b3JkZXJTdGF0dXM6ICdyPW9yZGVyL2FwaS1nZXQtb3JkZXItc3RhdGlzdGljcycsXHJcblx0XHRcdGdldEFkZHJlc3M6ICdyPWFkZHJlc3MvYXBpLWdldC1hZGRyZXNzLWxpc3QnLFxyXG5cdFx0XHRlZGl0QWRkcmVzczogJ3I9YWRkcmVzcy9hcGktdXBkYXRlLWFkZHJlc3MnLFxyXG5cdFx0XHRkZWxldGVBZGRyZXNzOiAncj1hZGRyZXNzL2FwaS1kZWwtYWRkcmVzcycsXHJcblx0XHRcdGdldENhcnQ6ICdyPXNob3BwaW5nLWNhcnQvYXBpLWdldC1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0ZGVsZXRlQ2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktZGVsJyxcclxuXHRcdFx0dG9wQXJlYTogJ3I9YXJlYS9hcGktZ2V0LXRvcC1hcmVhcycsXHJcblx0XHRcdGFwcGx5T3JkZXI6ICdyPWJ1eWluZy9hcGktYXBwbHktY3JlYXRlLW9yZGVyLWJ5LXNob3BwaW5nLWNhcnQnLFxyXG5cdFx0XHRjcmVhdGVPcmRlcjogJ3I9YnV5aW5nL2FwaS1jcmVhdGUtb3JkZXItYnktc2hvcHBpbmctY2FydCcsXHJcblx0XHRcdGFwcGx5T3JkZXJCdXk6ICdyPWJ1eWluZy9hcGktYXBwbHktY3JlYXRlLW9yZGVyLWJ5LWZhc3QtYnV5aW5nJyxcclxuXHRcdFx0Y3JlYXRlT3JkZXJCdXk6ICdyPWJ1eWluZy9hcGktY3JlYXRlLW9yZGVyLWJ5LWZhc3QtYnV5aW5nJyxcclxuXHRcdFx0c2V0TWFyazogJ3I9bWFyay9hcGktbWFyaycsXHJcblx0XHRcdGNhbmNlbE1hcms6ICdyPW1hcmsvYXBpLWNhbmNlbC1tYXJrJyxcclxuXHRcdFx0Z2V0TWFya1VzZXI6ICdyPW1hcmsvYXBpLWdldC1jb2xsZWN0b3JzJyxcclxuXHRcdFx0Z2V0T3JkZXI6ICdyPW9yZGVyL2FwaS1nZXQtZGV0YWlsJyxcclxuXHRcdFx0Z2V0TWFya1NwdTogJ3I9bWFyay9hcGktZ2V0LW1hcmstc3B1JyxcclxuXHRcdFx0Z2V0T3JkZXJTdGF0dXM6ICdyPW9yZGVyL2FwaS1nZXQtb3JkZXJzJyxcclxuXHRcdFx0Z2V0T3JkZXJEZXRhaWw6ICdyPW9yZGVyL2FwaS1nZXQtZGV0YWlsJyxcclxuXHRcdFx0Y2FuY2VsT3JkZXI6ICdyPW9yZGVyL2FwaS1jYW5jZWwnLFxyXG5cdFx0XHRvcmRlckVkaXRBZGQ6ICdyPW9yZGVyL2FwaS1jaGFuZ2UtYWRkcmVzcycsXHJcblx0XHRcdGdldE5vdGljZTogJ3I9bm90aWNlL2FwaS1nZXQtbm90aWNlJ1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kJHBhdGhIdG1sID0ge1xyXG5cdFx0XHRydWxlczogJ2Rpc3RyaWJ1dGlvbl9ydWxlcy5odG1sJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXREYXRhIChyZXMsIHBhcmFtKSB7XHJcblx0XHR2YXIgdGltZSA9IHJlcy5kYXRhLnRvU3RyaW5nKClcclxuXHRcdHBhcmFtLnJlcXVlc3RUaW1lID0gdGltZVxyXG5cdFx0Zm9yICh2YXIga2V5IGluIHBhcmFtKSB7XHJcblx0XHRcdHBhcmFtW2tleV0gPSBwYXJhbVtrZXldLnRvU3RyaW5nKClcclxuXHRcdH1cclxuXHRcdHZhciBuZXdLZXkgPSBPYmplY3Qua2V5cyhwYXJhbSkuc29ydCgpXHJcblx0XHR2YXIgbmV3UGFyYW0gPSB7fVxyXG5cdFx0bmV3S2V5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0bmV3UGFyYW1baXRlbV0gPSBwYXJhbVtpdGVtXVxyXG5cdFx0fSlcclxuXHRcdHZhciBzaWduID0gSlNPTi5zdHJpbmdpZnkobmV3UGFyYW0pICsgJ15aUzIwMThMQ0onXHJcblx0XHRuZXdQYXJhbS5zaWduYXR1cmUgPSBNZDUuaGV4TUQ1KHNpZ24pXHJcblx0XHRyZXR1cm4gbmV3UGFyYW1cclxuXHR9XHJcblx0Z2V0VGltZSAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50aW1lLFxyXG5cdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdFx0aGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFVzZXJMb2dpbiAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcbiAgICAgICAgXHRcdHdlcHkucmVxdWVzdCh7XHJcblx0ICAgICAgICAgICAgXHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudXNlcmxvZ2luLFxyXG5cdCAgICAgICAgICAgIFx0ZGF0YTogZGF0YSxcclxuXHQgICAgICAgICAgICBcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgXHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdCAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcbiAgICAgICAgfSlcclxuXHR9XHJcblx0SW5kZXhIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmluZGV4TGlzdCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERldGFpbEh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZGV0YWlsLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEFkZENhcnRIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFkZGNhcnQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRUb3BDYXRlZ29yeSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50b3BDYXRlZ29yeSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldENoaWxkQ2F0ZWdvcnkgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2hpbGRDYXRlZ29yeSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFNwdUh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0U3B1LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0U2V0TWFya0h0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguc2V0TWFyayxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdENhbmNlbE1hcmtIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNhbmNlbE1hcmssXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRNYXJrVXNlciAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRNYXJrVXNlcixcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE1hcmtTcHUgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0TWFya1NwdSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldENhcnRIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldENhcnQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHREZWxldGVDYXJ0SHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRlbGV0ZUNhcnQsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFVzZXJJbmZvIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnVzZXJJbmZvLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VXNlck9yZGVyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLm9yZGVyU3RhdHVzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q3JlYXRlVXNlck9yZGVyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNyZWF0ZU9yZGVyLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRDcmVhdGVPcmRlckJ1eSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5jcmVhdGVPcmRlckJ1eSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q2FuY2VsT3JkZXIgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2FuY2VsT3JkZXIsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEVkaXRPcmRlckFkZCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5vcmRlckVkaXRBZGQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldEFkZHJlc3MsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRFZGl0QWRkcmVzcyAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5lZGl0QWRkcmVzcyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERlbGV0ZUFkZHJlc3MgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZGVsZXRlQWRkcmVzcyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEFwcGx5T3JkZXJIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFwcGx5T3JkZXIsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRBcHBseU9yZGVyQnV5IChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFwcGx5T3JkZXJCdXksXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRPcmRlckh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0T3JkZXIsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRPcmRlclN0YXR1cyAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRPcmRlclN0YXR1cyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE9yZGVyRGV0YWlsIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE9yZGVyRGV0YWlsLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VG9wQXJlYSAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdHVybDogJ2h0dHBzOi8vYXBwMS56aGVuZ3NoYW4uc3RvcmUvc21hcnRBcmVhL2JhY2tlbmQvd2ViL2luZGV4LnBocCcsXHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXROb3RpY2UgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0Tm90aWNlLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0U2VhcmNoSHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNlYXJjaCxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVxdWVzdFRlc3QgKHBhcmFtczEsIHBhcmFtczIpIHtcclxuLy8gXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyBcdFx0d2VweS5yZXF1ZXN0KHtcclxuLy8gXHRcdCAgdXJsOiAnaHR0cHM6Ly93d3cubWFkY29kZXIuY24vdGVzdHMvc2xlZXAucGhwP3RpbWU9MSZ0PWNzcyZjPScgKyBwYXJhbXMxICsgJyZpPScgKyBwYXJhbXMyLFxyXG4vLyBcdFx0ICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4vLyBcdFx0ICBcdHJlc29sdmUoZGF0YSlcclxuLy8gXHRcdCAgfVxyXG4vLyBcdCAgICB9KVxyXG4vLyBcdH0pXHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVzZXJMb2dpbiAocGFyYW0pIHtcclxuLy8gXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyBcdFx0d2VweS5sb2dpbih7XHJcbi8vIFx0XHQgIHN1Y2Nlc3M6IChyZXMpID0+e1xyXG4vLyBcdFx0ICAgIHJlc29sdmUocmVzKVxyXG4vLyBcdFx0ICB9XHJcbi8vIFx0XHR9KVxyXG4vLyBcdH0pXHJcbi8vIH0gXHJcblxyXG5leHBvcnQgZGVmYXVsdCBIdHRwUmVxdWVzdCJdfQ==