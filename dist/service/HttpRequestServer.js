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

		_this2.$$base = 'https://server1.zsbutcher.cn/smartShopping/backend/web/index.php?';
		_this2.$$baseHtml = 'https://server1.zsbutcher.cn/smartShopping/h5/';
		_this2.$$path = {
			time: 'r=test',
			sendUserInfo: 'r=wechat/api-get-unionid',
			// sendUserInfo: 'https://zstest.zsbutcher.cn/smartWb/store/web/index.php?r=forlulu/encrypte-data',
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
			topArea: 'r=area/api-get-child-areas',
			detailArea: 'r=area/api-get-area&areaId',
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
			receiveOrder: 'r=order/api-receipted',
			cancelOrder: 'r=order/api-cancel',
			orderEditAdd: 'r=order/api-change-address',
			getNotice: 'r=notice/api-get-notice',
			getService: 'r=virtual-item/api-get-virtual-item',
			payService: 'r=buying/api-apply-pay',
			getSignCode: 'r=member/api-apply-sign-in-by-phone',
			loginByPhone: 'r=member/api-sign-up-or-sign-in',
			addAddress: 'r=address/api-add-address',
			getLogistic: 'r=order/api-get-logistics-list',
			getLogisticStatus: 'r=order/api-get-logistics-detail',
			setNickname: 'r=member/api-upload-nickname',
			getRecommend: 'r=product/api-get-recommend-spus'
		};
		_this2.$$pathHtml = {
			rules: 'distribution_rules.html',
			service: 'vip_service_agreement.html'
		};
		return _this2;
	}

	_createClass(HttpRequest, [{
		key: 'getPaySign',
		value: function getPaySign(param) {
			console.log(param);
			for (var key in param) {
				param[key] = param[key].toString();
			}
			var newKey = Object.keys(param).sort();
			var newParam = {};
			newKey.forEach(function (item) {
				newParam[item] = param[item];
			});
			var str = '';
			for (var key in newParam) {
				str += key + '=' + newParam[key] + '&';
			}
			str += 'key=dzpkU5ItaFi4I5Goraehd8amhs5pZh1w';
			var sign = _md2.default.md5(str).toUpperCase();
			return sign;
		}
	}, {
		key: 'formatData',
		value: function formatData(res, param) {
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
			return newParam;
		}
	}, {
		key: 'getData',
		value: function getData(res, param) {
			var newParam = this.formatData(res, param);
			var sign = JSON.stringify(newParam) + '^ZS2018LCJ';
			newParam.signature = _md2.default.md5(sign).toLowerCase();
			return newParam;
		}
	}, {
		key: 'getJsonData',
		value: function getJsonData(res, param) {
			var newParam = this.formatData(res, param);
			var sign = JSON.stringify(newParam).replace(/\\/g, '') + '^ZS2018LCJ';
			console.log(sign);
			newParam.signature = _md2.default.md5(sign).toLowerCase();
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
		key: 'SendCode',
		value: function SendCode(param, cb) {
			var _this4 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this4.$$base + _this4.$$path.sendCode,
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
		key: 'SendUserInfo',
		value: function SendUserInfo(param, cb) {
			var _this5 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this5.$$base + _this5.$$path.sendUserInfo,
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
		key: 'UserLogin',
		value: function UserLogin(param, cb) {
			var _this6 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this6.$$base + _this6.$$path.userlogin,
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
		key: 'SetNickname',
		value: function SetNickname(param, cb) {
			var _this7 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this7.$$base + _this7.$$path.setNickname,
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
			var _this8 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this8.$$base + _this8.$$path.indexList,
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
		key: 'GetBanner',
		value: function GetBanner(param, cb) {
			var _this9 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this9.$$base + _this9.$$path.getBanner,
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
			var _this10 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this10.$$base + _this10.$$path.detail,
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
			var _this11 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this11.$$base + _this11.$$path.addcart,
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
			var _this12 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this12.$$base + _this12.$$path.topCategory,
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
			var _this13 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this13.$$base + _this13.$$path.childCategory,
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
			var _this14 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this14.$$base + _this14.$$path.getSpu,
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
		key: 'GetRecommend',
		value: function GetRecommend(param, cb) {
			var _this15 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this15.$$base + _this15.$$path.getRecommend,
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
			var _this16 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this16.$$base + _this16.$$path.setMark,
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
			var _this17 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this17.$$base + _this17.$$path.cancelMark,
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
			var _this18 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this18.$$base + _this18.$$path.getMarkUser,
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
			var _this19 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this19.$$base + _this19.$$path.getMarkSpu,
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
			var _this20 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this20.$$base + _this20.$$path.getCart,
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
			var _this21 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getJsonData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this21.$$base + _this21.$$path.deleteCart,
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
			var _this22 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this22.$$base + _this22.$$path.userInfo,
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
			var _this23 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this23.$$base + _this23.$$path.orderStatus,
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
			var _this24 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this24.$$base + _this24.$$path.createOrder,
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
			var _this25 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this25.$$base + _this25.$$path.createOrderBuy,
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
			var _this26 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this26.$$base + _this26.$$path.cancelOrder,
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
		key: 'ReceiveOrder',
		value: function ReceiveOrder(param, cb) {
			var _this27 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this27.$$base + _this27.$$path.receiveOrder,
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
			var _this28 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this28.$$base + _this28.$$path.orderEditAdd,
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
			var _this29 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this29.$$base + _this29.$$path.getAddress,
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
		key: 'AddAddress',
		value: function AddAddress(param, cb) {
			var _this30 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this30.$$base + _this30.$$path.addAddress,
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
		key: 'EditAddress',
		value: function EditAddress(param, cb) {
			var _this31 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this31.$$base + _this31.$$path.editAddress,
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
		key: 'DeleteAddress',
		value: function DeleteAddress(param, cb) {
			var _this32 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this32.$$base + _this32.$$path.deleteAddress,
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
			var _this33 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this33.$$base + _this33.$$path.applyOrder,
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
			var _this34 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this34.$$base + _this34.$$path.applyOrderBuy,
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
			var _this35 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this35.$$base + _this35.$$path.getOrder,
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
			var _this36 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this36.$$base + _this36.$$path.getOrderStatus,
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
			var _this37 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this37.$$base + _this37.$$path.getOrderDetail,
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
		value: function GetTopArea(param, cb) {
			var _this38 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this38.$$base + _this38.$$path.topArea,
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
		key: 'GetDetailArea',
		value: function GetDetailArea(param, cb) {
			var _this39 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this39.$$base + _this39.$$path.detailArea,
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
		key: 'GetNotice',
		value: function GetNotice(param, cb) {
			var _this40 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this40.$$base + _this40.$$path.getNotice,
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
		key: 'GetService',
		value: function GetService(param, cb) {
			var _this41 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this41.$$base + _this41.$$path.getService,
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
		key: 'PayService',
		value: function PayService(param, cb) {
			var _this42 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this42.$$base + _this42.$$path.payService,
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
		key: 'GetLogistic',
		value: function GetLogistic(param, cb) {
			var _this43 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this43.$$base + _this43.$$path.getLogistic,
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
		key: 'GetLogisticStatus',
		value: function GetLogisticStatus(param, cb) {
			var _this44 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this44.$$base + _this44.$$path.getLogisticStatus,
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
			var _this45 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this45.$$base + _this45.$$path.search,
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
		key: 'GetSignCode',
		value: function GetSignCode(param, cb) {
			var _this46 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this46.$$base + _this46.$$path.getSignCode,
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
		key: 'LoginByPhone',
		value: function LoginByPhone(param, cb) {
			var _this47 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this47.$$base + _this47.$$path.loginByPhone,
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
	}]);

	return HttpRequest;
}(_wepy2.default.app);

exports.default = HttpRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0U2VydmVyLmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRiYXNlSHRtbCIsIiQkcGF0aCIsInRpbWUiLCJzZW5kVXNlckluZm8iLCJzZW5kQ29kZSIsInVzZXJsb2dpbiIsImluZGV4TGlzdCIsImdldEJhbm5lciIsImRldGFpbCIsInNlYXJjaCIsImFkZGNhcnQiLCJ0b3BDYXRlZ29yeSIsImNoaWxkQ2F0ZWdvcnkiLCJnZXRTcHUiLCJ1c2VySW5mbyIsIm9yZGVyU3RhdHVzIiwiZ2V0QWRkcmVzcyIsImVkaXRBZGRyZXNzIiwiZGVsZXRlQWRkcmVzcyIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwidG9wQXJlYSIsImRldGFpbEFyZWEiLCJhcHBseU9yZGVyIiwiY3JlYXRlT3JkZXIiLCJhcHBseU9yZGVyQnV5IiwiY3JlYXRlT3JkZXJCdXkiLCJzZXRNYXJrIiwiY2FuY2VsTWFyayIsImdldE1hcmtVc2VyIiwiZ2V0T3JkZXIiLCJnZXRNYXJrU3B1IiwiZ2V0T3JkZXJTdGF0dXMiLCJnZXRPcmRlckRldGFpbCIsInJlY2VpdmVPcmRlciIsImNhbmNlbE9yZGVyIiwib3JkZXJFZGl0QWRkIiwiZ2V0Tm90aWNlIiwiZ2V0U2VydmljZSIsInBheVNlcnZpY2UiLCJnZXRTaWduQ29kZSIsImxvZ2luQnlQaG9uZSIsImFkZEFkZHJlc3MiLCJnZXRMb2dpc3RpYyIsImdldExvZ2lzdGljU3RhdHVzIiwic2V0Tmlja25hbWUiLCJnZXRSZWNvbW1lbmQiLCIkJHBhdGhIdG1sIiwicnVsZXMiLCJzZXJ2aWNlIiwicGFyYW0iLCJjb25zb2xlIiwibG9nIiwia2V5IiwidG9TdHJpbmciLCJuZXdLZXkiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsIm5ld1BhcmFtIiwiZm9yRWFjaCIsIml0ZW0iLCJzdHIiLCJzaWduIiwibWQ1IiwidG9VcHBlckNhc2UiLCJyZXMiLCJkYXRhIiwicmVxdWVzdFRpbWUiLCJmb3JtYXREYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInNpZ25hdHVyZSIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJmYWlsIiwiZXJyb3IiLCJjYiIsIl90aGlzIiwiZ2V0VGltZSIsInRoZW4iLCJnZXREYXRhIiwiY2F0Y2giLCJnZXRKc29uRGF0YSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsVzs7O0FBQ0wsd0JBQWU7QUFBQTs7QUFBQTs7QUFFZCxTQUFLQyxNQUFMLEdBQWMsbUVBQWQ7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLGdEQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBYztBQUNiQyxTQUFLLFFBRFE7QUFFYkMsaUJBQWMsMEJBRkQ7QUFHYjtBQUNBQyxhQUFVLG1CQUpHO0FBS2JDLGNBQVcsaUNBTEU7QUFNYkMsY0FBVywwQkFORTtBQU9iQyxjQUFXLHlCQVBFO0FBUWJDLFdBQVEsOEJBUks7QUFTYkMsV0FBUSwwQkFUSztBQVViQyxZQUFTLDRCQVZJO0FBV2JDLGdCQUFhLG1DQVhBO0FBWWJDLGtCQUFlLDZCQVpGO0FBYWJDLFdBQVEsd0JBYks7QUFjYkMsYUFBVSx1QkFkRztBQWViQyxnQkFBYSxrQ0FmQTtBQWdCYkMsZUFBWSxnQ0FoQkM7QUFpQmJDLGdCQUFhLDhCQWpCQTtBQWtCYkMsa0JBQWUsMkJBbEJGO0FBbUJiQyxZQUFTLHVDQW5CSTtBQW9CYkMsZUFBWSx5QkFwQkM7QUFxQmJDLFlBQVMsNEJBckJJO0FBc0JiQyxlQUFZLDRCQXRCQztBQXVCYkMsZUFBWSxrREF2QkM7QUF3QmJDLGdCQUFhLDRDQXhCQTtBQXlCYkMsa0JBQWUsZ0RBekJGO0FBMEJiQyxtQkFBZ0IsMENBMUJIO0FBMkJiQyxZQUFTLGlCQTNCSTtBQTRCYkMsZUFBWSx3QkE1QkM7QUE2QmJDLGdCQUFhLDJCQTdCQTtBQThCYkMsYUFBVSx3QkE5Qkc7QUErQmJDLGVBQVkseUJBL0JDO0FBZ0NiQyxtQkFBZ0Isd0JBaENIO0FBaUNiQyxtQkFBZ0Isd0JBakNIO0FBa0NiQyxpQkFBYyx1QkFsQ0Q7QUFtQ2JDLGdCQUFhLG9CQW5DQTtBQW9DYkMsaUJBQWMsNEJBcENEO0FBcUNiQyxjQUFXLHlCQXJDRTtBQXNDYkMsZUFBWSxxQ0F0Q0M7QUF1Q2JDLGVBQVksd0JBdkNDO0FBd0NiQyxnQkFBYSxxQ0F4Q0E7QUF5Q2JDLGlCQUFjLGlDQXpDRDtBQTBDYkMsZUFBWSwyQkExQ0M7QUEyQ2JDLGdCQUFhLGdDQTNDQTtBQTRDYkMsc0JBQW1CLGtDQTVDTjtBQTZDYkMsZ0JBQWEsOEJBN0NBO0FBOENiQyxpQkFBYztBQTlDRCxHQUFkO0FBZ0RBLFNBQUtDLFVBQUwsR0FBa0I7QUFDakJDLFVBQU8seUJBRFU7QUFFakJDLFlBQVM7QUFGUSxHQUFsQjtBQXBEYztBQXdEZDs7Ozs2QkFDV0MsSyxFQUFPO0FBQ2xCQyxXQUFRQyxHQUFSLENBQVlGLEtBQVo7QUFDQSxRQUFLLElBQUlHLEdBQVQsSUFBZ0JILEtBQWhCLEVBQXVCO0FBQ3RCQSxVQUFNRyxHQUFOLElBQWFILE1BQU1HLEdBQU4sRUFBV0MsUUFBWCxFQUFiO0FBQ0E7QUFDRCxPQUFJQyxTQUFTQyxPQUFPQyxJQUFQLENBQVlQLEtBQVosRUFBbUJRLElBQW5CLEVBQWI7QUFDQSxPQUFJQyxXQUFXLEVBQWY7QUFDQUosVUFBT0ssT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN4QkYsYUFBU0UsSUFBVCxJQUFpQlgsTUFBTVcsSUFBTixDQUFqQjtBQUNBLElBRkQ7QUFHQSxPQUFJQyxNQUFNLEVBQVY7QUFDQSxRQUFLLElBQUlULEdBQVQsSUFBZ0JNLFFBQWhCLEVBQTBCO0FBQ3pCRyxXQUFRVCxNQUFNLEdBQU4sR0FBWU0sU0FBU04sR0FBVCxDQUFaLEdBQTRCLEdBQXBDO0FBQ0E7QUFDRFMsVUFBTyxzQ0FBUDtBQUNBLE9BQUlDLE9BQU8sYUFBSUMsR0FBSixDQUFRRixHQUFSLEVBQWFHLFdBQWIsRUFBWDtBQUNBLFVBQU9GLElBQVA7QUFDQTs7OzZCQUNXRyxHLEVBQUtoQixLLEVBQU87QUFDdkIsT0FBSWhELE9BQU9nRSxJQUFJQyxJQUFKLENBQVNiLFFBQVQsRUFBWDtBQUNBSixTQUFNa0IsV0FBTixHQUFvQmxFLElBQXBCO0FBQ0EsUUFBSyxJQUFJbUQsR0FBVCxJQUFnQkgsS0FBaEIsRUFBdUI7QUFDdEJBLFVBQU1HLEdBQU4sSUFBYUgsTUFBTUcsR0FBTixFQUFXQyxRQUFYLEVBQWI7QUFDQTtBQUNELE9BQUlDLFNBQVNDLE9BQU9DLElBQVAsQ0FBWVAsS0FBWixFQUFtQlEsSUFBbkIsRUFBYjtBQUNBLE9BQUlDLFdBQVcsRUFBZjtBQUNBSixVQUFPSyxPQUFQLENBQWUsVUFBQ0MsSUFBRCxFQUFVO0FBQ3hCRixhQUFTRSxJQUFULElBQWlCWCxNQUFNVyxJQUFOLENBQWpCO0FBQ0EsSUFGRDtBQUdBLFVBQU9GLFFBQVA7QUFDQTs7OzBCQUNRTyxHLEVBQUtoQixLLEVBQU87QUFDcEIsT0FBSVMsV0FBVyxLQUFLVSxVQUFMLENBQWdCSCxHQUFoQixFQUFxQmhCLEtBQXJCLENBQWY7QUFDQSxPQUFJYSxPQUFPTyxLQUFLQyxTQUFMLENBQWVaLFFBQWYsSUFBMkIsWUFBdEM7QUFDQUEsWUFBU2EsU0FBVCxHQUFxQixhQUFJUixHQUFKLENBQVFELElBQVIsRUFBY1UsV0FBZCxFQUFyQjtBQUNBLFVBQU9kLFFBQVA7QUFDQTs7OzhCQUNZTyxHLEVBQUtoQixLLEVBQU87QUFDeEIsT0FBSVMsV0FBVyxLQUFLVSxVQUFMLENBQWdCSCxHQUFoQixFQUFxQmhCLEtBQXJCLENBQWY7QUFDQSxPQUFJYSxPQUFPTyxLQUFLQyxTQUFMLENBQWVaLFFBQWYsRUFBeUJlLE9BQXpCLENBQWlDLEtBQWpDLEVBQXdDLEVBQXhDLElBQThDLFlBQXpEO0FBQ0F2QixXQUFRQyxHQUFSLENBQVlXLElBQVo7QUFDQUosWUFBU2EsU0FBVCxHQUFxQixhQUFJUixHQUFKLENBQVFELElBQVIsRUFBY1UsV0FBZCxFQUFyQjtBQUNBLFVBQU9kLFFBQVA7QUFDQTs7OzRCQUNVO0FBQUE7O0FBQ1YsVUFBTyxJQUFJZ0IsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2QyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1pDLFVBQUssT0FBS2hGLE1BQUwsR0FBYyxPQUFLRSxNQUFMLENBQVlDLElBRG5CO0FBRVo4RSxhQUFRLEtBRkk7QUFHWkMsYUFBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFISTtBQUlaQyxjQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGNBQVFULElBQVI7QUFDRCxNQU5XO0FBT1pnQixXQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxhQUFPTyxLQUFQO0FBQ0Q7QUFUVyxLQUFiO0FBV0EsSUFaTSxDQUFQO0FBYUE7OzsyQkFDU2xDLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUNwQixPQUFJQyxRQUFRLElBQVo7QUFDTSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDVEMsV0FBSyxPQUFLaEYsTUFBTCxHQUFjLE9BQUtFLE1BQUwsQ0FBWUcsUUFEdEI7QUFFVDRFLGNBQVEsTUFGQztBQUdUQyxjQUFRLEVBQUMsZ0JBQWdCLG1DQUFqQixFQUhDO0FBSVRkLFlBQU1BLElBSkc7QUFLbEJlLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUGlCO0FBUWxCZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVmlCLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ2RMLFdBQU1BLElBQU47QUFDQSxLQWhCRDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJOOzs7K0JBQ2FuQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDeEIsT0FBSUMsUUFBUSxJQUFaO0FBQ00sVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1RDLFdBQUssT0FBS2hGLE1BQUwsR0FBYyxPQUFLRSxNQUFMLENBQVlFLFlBRHRCO0FBRVQ2RSxjQUFRLE1BRkM7QUFHVEMsY0FBUSxFQUFDLGdCQUFnQixtQ0FBakIsRUFIQztBQUlUZCxZQUFNQSxJQUpHO0FBS2xCZSxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBpQjtBQVFsQmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZpQixNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNkTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQkQ7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CTjs7OzRCQUNVbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3JCLE9BQUlDLFFBQVEsSUFBWjtBQUNNLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNUQyxXQUFLLE9BQUtoRixNQUFMLEdBQWMsT0FBS0UsTUFBTCxDQUFZSSxTQUR0QjtBQUVUOEQsWUFBTUEsSUFGRztBQUdUYSxjQUFRLEtBSEM7QUFJVEMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKQztBQUtsQkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQaUI7QUFRbEJnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWaUIsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDZEwsV0FBTUEsSUFBTjtBQUNBLEtBaEJEO0FBaUJBLElBbEJNLENBQVA7QUFtQk47Ozs4QkFDWW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN2QixPQUFJQyxRQUFRLElBQVo7QUFDTSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDVEMsV0FBSyxPQUFLaEYsTUFBTCxHQUFjLE9BQUtFLE1BQUwsQ0FBWTRDLFdBRHRCO0FBRVRzQixZQUFNQSxJQUZHO0FBR1RhLGNBQVEsS0FIQztBQUlUQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpDO0FBS2xCQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBpQjtBQVFsQmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZpQixNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNkTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQkQ7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CTjs7OzRCQUNVbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3JCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLE9BQUtoRixNQUFMLEdBQWMsT0FBS0UsTUFBTCxDQUFZSyxTQURuQjtBQUVaNkQsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7OzRCQUNVbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3JCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLE9BQUtoRixNQUFMLEdBQWMsT0FBS0UsTUFBTCxDQUFZTSxTQURuQjtBQUVaNEQsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7OzZCQUNXbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3RCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZTyxNQURuQjtBQUVaMkQsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWVDTSxLQWZELENBZU8sWUFBTTtBQUNOTCxXQUFNQSxJQUFOO0FBQ0EsS0FqQlA7QUFrQkEsSUFuQk0sQ0FBUDtBQW9CQTs7OzhCQUNZbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3ZCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZUyxPQURuQjtBQUVaeUQsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7O2lDQUNlbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQzFCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZVSxXQURuQjtBQUVad0QsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7O21DQUNpQm5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUM1QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWVcsYUFEbkI7QUFFWnVELFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7Ozs2QkFDV25DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN0QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWVksTUFEbkI7QUFFWnNELFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7OzsrQkFDYW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN4QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWTZDLFlBRG5CO0FBRVpxQixZQUFNQSxJQUZNO0FBR1phLGNBQVEsS0FISTtBQUlBQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpSO0FBS1pDLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7OEJBQ1luQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDdkIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVkwQixPQURuQjtBQUVad0MsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7O2lDQUNlbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQzFCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZMkIsVUFEbkI7QUFFWnVDLFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7Ozs4QkFDWW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN2QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWTRCLFdBRG5CO0FBRVpzQyxZQUFNQSxJQUZNO0FBR1phLGNBQVEsS0FISTtBQUlBQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpSO0FBS1pDLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7NkJBQ1duQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDdEIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVk4QixVQURuQjtBQUVab0MsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7OzhCQUNZbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3ZCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZa0IsT0FEbkI7QUFFWmdELFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7OztpQ0FDZW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUMxQixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1LLFdBQU4sQ0FBa0J6QixHQUFsQixFQUF1QmhCLEtBQXZCLENBQVg7QUFDQUMsYUFBUUMsR0FBUixDQUFZZSxJQUFaO0FBQ0Esb0JBQUtXLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZbUIsVUFEbkI7QUFFWjRELGNBQVEsTUFGSTtBQUdBQyxjQUFRLEVBQUMsZ0JBQWdCLG1DQUFqQixFQUhSO0FBSUFkLFlBQU1BLElBSk47QUFLWmUsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZkQsRUFlR00sS0FmSCxDQWVTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBakJQO0FBa0JBLElBbkJNLENBQVA7QUFvQkE7Ozs4QkFDWW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN2QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWWEsUUFEbkI7QUFFWnFELFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7OzsrQkFDYW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN4QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWWMsV0FEbkI7QUFFWm9ELFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7OztrQ0FDZ0JuQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDM0IsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVl1QixXQURuQjtBQUVad0QsY0FBUSxNQUZJO0FBR0FDLGNBQVEsRUFBQyxnQkFBZ0IsbUNBQWpCLEVBSFI7QUFJQWQsWUFBTUEsSUFKTjtBQUtaZSxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7O2lDQUNlbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQzFCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZeUIsY0FEbkI7QUFFWnNELGNBQVEsTUFGSTtBQUdBQyxjQUFRLEVBQUMsZ0JBQWdCLG1DQUFqQixFQUhSO0FBSUFkLFlBQU1BLElBSk47QUFLWmUsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7Ozs4QkFDWW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN2QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWWtDLFdBRG5CO0FBRVo2QyxjQUFRLEtBRkk7QUFHQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFIUjtBQUlBZCxZQUFNQSxJQUpOO0FBS1plLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7K0JBQ2FuQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDeEIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVlpQyxZQURuQjtBQUVaOEMsY0FBUSxLQUZJO0FBR0FDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSFI7QUFJQWQsWUFBTUEsSUFKTjtBQUtaZSxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7OytCQUNhbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3hCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZbUMsWUFEbkI7QUFFWitCLFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7Ozs2QkFDV25DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN0QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWWUsVUFEbkI7QUFFWm1ELFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7Ozs2QkFDV25DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN0QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWXlDLFVBRG5CO0FBRVpzQyxjQUFRLE1BRkk7QUFHQUMsY0FBUSxFQUFDLGdCQUFnQixtQ0FBakIsRUFIUjtBQUlBZCxZQUFNQSxJQUpOO0FBS1plLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7OEJBQ1luQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDdkIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVlnQixXQURuQjtBQUVaK0QsY0FBUSxNQUZJO0FBR0FDLGNBQVEsRUFBQyxnQkFBZ0IsbUNBQWpCLEVBSFI7QUFJQWQsWUFBTUEsSUFKTjtBQUtaZSxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7O2dDQUNjbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3pCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZaUIsYUFEbkI7QUFFWmlELFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7OztpQ0FDZW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUMxQixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWXNCLFVBRG5CO0FBRVo0QyxZQUFNQSxJQUZNO0FBR1phLGNBQVEsS0FISTtBQUlBQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpSO0FBS1pDLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7Z0NBQ2NuQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDekIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVl3QixhQURuQjtBQUVaMEMsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7OytCQUNhbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3hCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZNkIsUUFEbkI7QUFFWnFDLFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7OztpQ0FDZW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUMxQixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWStCLGNBRG5CO0FBRVptQyxZQUFNQSxJQUZNO0FBR1phLGNBQVEsS0FISTtBQUlBQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpSO0FBS1pDLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7aUNBQ2VuQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDMUIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVlnQyxjQURuQjtBQUVaa0MsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7OzZCQUNXbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3RCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZb0IsT0FEbkI7QUFFWjhDLFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7OztnQ0FDY25DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN6QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWXFCLFVBRG5CO0FBRVo2QyxZQUFNQSxJQUZNO0FBR1phLGNBQVEsS0FISTtBQUlBQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpSO0FBS1pDLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7NEJBQ1VuQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDckIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVlvQyxTQURuQjtBQUVaOEIsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7OzZCQUNXbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3RCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZcUMsVUFEbkI7QUFFWjZCLFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7Ozs2QkFDV25DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN0QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWXNDLFVBRG5CO0FBRVo0QixZQUFNQSxJQUZNO0FBR1phLGNBQVEsS0FISTtBQUlBQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpSO0FBS1pDLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7OEJBQ1luQyxLLEVBQU9tQyxFLEVBQUk7QUFBQTs7QUFDdkIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJWCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDUyxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDdEIsR0FBRCxFQUFTO0FBQzdCLFNBQUlDLE9BQU9tQixNQUFNRyxPQUFOLENBQWN2QixHQUFkLEVBQW1CaEIsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLNEIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS2hGLE1BQUwsR0FBYyxRQUFLRSxNQUFMLENBQVkwQyxXQURuQjtBQUVad0IsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7O29DQUNrQm5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUM3QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWTJDLGlCQURuQjtBQUVadUIsWUFBTUEsSUFGTTtBQUdaYSxjQUFRLEtBSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FkRCxFQWNHTSxLQWRILENBY1MsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FoQlA7QUFpQkEsSUFsQk0sQ0FBUDtBQW1CQTs7OzZCQUNXbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3RCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQUMsYUFBUUMsR0FBUixDQUFZZSxJQUFaO0FBQ0Esb0JBQUtXLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZUSxNQURuQjtBQUVadUUsY0FBUSxNQUZJO0FBR0FDLGNBQVEsRUFBQyxnQkFBZ0IsbUNBQWpCLEVBSFI7QUFJQWQsWUFBTUEsSUFKTjtBQUtaZSxlQUFTLGlCQUFDZixJQUFELEVBQVU7QUFDakJTLGVBQVFULElBQVI7QUFDRCxPQVBXO0FBUVpnQixZQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FmRCxFQWVHTSxLQWZILENBZVMsWUFBTTtBQUNSTCxXQUFNQSxJQUFOO0FBQ0EsS0FqQlA7QUFrQkEsSUFuQk0sQ0FBUDtBQW9CQTs7OzhCQUNZbkMsSyxFQUFPbUMsRSxFQUFJO0FBQUE7O0FBQ3ZCLE9BQUlDLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVgsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q1MsVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQ3RCLEdBQUQsRUFBUztBQUM3QixTQUFJQyxPQUFPbUIsTUFBTUcsT0FBTixDQUFjdkIsR0FBZCxFQUFtQmhCLEtBQW5CLENBQVg7QUFDQSxvQkFBSzRCLE9BQUwsQ0FBYTtBQUNaQyxXQUFLLFFBQUtoRixNQUFMLEdBQWMsUUFBS0UsTUFBTCxDQUFZdUMsV0FEbkI7QUFFWjJCLFlBQU1BLElBRk07QUFHWmEsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ2YsSUFBRCxFQUFVO0FBQ2pCUyxlQUFRVCxJQUFSO0FBQ0QsT0FQVztBQVFaZ0IsWUFBTSxjQUFDQyxLQUFELEVBQVc7QUFDZlAsY0FBT08sS0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZEQsRUFjR00sS0FkSCxDQWNTLFlBQU07QUFDUkwsV0FBTUEsSUFBTjtBQUNBLEtBaEJQO0FBaUJBLElBbEJNLENBQVA7QUFtQkE7OzsrQkFDYW5DLEssRUFBT21DLEUsRUFBSTtBQUFBOztBQUN4QixPQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFPLElBQUlYLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkNTLFVBQU1DLE9BQU4sR0FBZ0JDLElBQWhCLENBQXFCLFVBQUN0QixHQUFELEVBQVM7QUFDN0IsU0FBSUMsT0FBT21CLE1BQU1HLE9BQU4sQ0FBY3ZCLEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLaEYsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWXdDLFlBRG5CO0FBRVowQixZQUFNQSxJQUZNO0FBR1phLGNBQVEsS0FISTtBQUlBQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpSO0FBS1pDLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7O0VBL2pDd0IsZUFBS08sRzs7a0JBa2tDaEI5RixXIiwiZmlsZSI6Ikh0dHBSZXF1ZXN0U2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IE1kNSBmcm9tICcuL21kNS5qcydcclxuXHJcbmNsYXNzIEh0dHBSZXF1ZXN0IGV4dGVuZHMgd2VweS5hcHB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy4kJGJhc2UgPSAnaHR0cHM6Ly9zZXJ2ZXIxLnpzYnV0Y2hlci5jbi9zbWFydFNob3BwaW5nL2JhY2tlbmQvd2ViL2luZGV4LnBocD8nXHJcblx0XHR0aGlzLiQkYmFzZUh0bWwgPSAnaHR0cHM6Ly9zZXJ2ZXIxLnpzYnV0Y2hlci5jbi9zbWFydFNob3BwaW5nL2g1LydcclxuXHRcdHRoaXMuJCRwYXRoID0ge1xyXG5cdFx0XHR0aW1lOidyPXRlc3QnLFxyXG5cdFx0XHRzZW5kVXNlckluZm86ICdyPXdlY2hhdC9hcGktZ2V0LXVuaW9uaWQnLFxyXG5cdFx0XHQvLyBzZW5kVXNlckluZm86ICdodHRwczovL3pzdGVzdC56c2J1dGNoZXIuY24vc21hcnRXYi9zdG9yZS93ZWIvaW5kZXgucGhwP3I9Zm9ybHVsdS9lbmNyeXB0ZS1kYXRhJyxcclxuXHRcdFx0c2VuZENvZGU6ICdyPXdlY2hhdC9hcGktYXV0aCcsXHJcblx0XHRcdHVzZXJsb2dpbjogJ3I9bWVtYmVyL2FwaS1nZXQtdG9rZW4tYnktcGhvbmUnLFxyXG5cdFx0XHRpbmRleExpc3Q6ICdyPXJlY29tbWVuZC9hcGktZ2V0LXNwdXMnLFxyXG5cdFx0XHRnZXRCYW5uZXI6ICdyPWJhbm5lci9hcGktZ2V0LWJhbm5lcicsXHJcblx0XHRcdGRldGFpbDogJ3I9cHJvZHVjdC9hcGktZ2V0LXNwdS1kZXRhaWwnLFxyXG5cdFx0XHRzZWFyY2g6ICdyPXByb2R1Y3QvYXBpLXNlYXJjaC1zcHUnLFxyXG5cdFx0XHRhZGRjYXJ0OiAncj1zaG9wcGluZy1jYXJ0L2FwaS11cGRhdGUnLFxyXG5cdFx0XHR0b3BDYXRlZ29yeTogJ3I9Y2F0ZWdvcnkvYXBpLWdldC10b3AtY2F0ZWdvcmllcycsXHJcblx0XHRcdGNoaWxkQ2F0ZWdvcnk6ICdyPWNhdGVnb3J5L2FwaS1nZXQtY2hpbGRyZW4nLFxyXG5cdFx0XHRnZXRTcHU6ICdyPWNhdGVnb3J5L2FwaS1nZXQtc3B1JyxcclxuXHRcdFx0dXNlckluZm86ICdyPW1lbWJlci9hcGktZ2V0LWluZm8nLFxyXG5cdFx0XHRvcmRlclN0YXR1czogJ3I9b3JkZXIvYXBpLWdldC1vcmRlci1zdGF0aXN0aWNzJyxcclxuXHRcdFx0Z2V0QWRkcmVzczogJ3I9YWRkcmVzcy9hcGktZ2V0LWFkZHJlc3MtbGlzdCcsXHJcblx0XHRcdGVkaXRBZGRyZXNzOiAncj1hZGRyZXNzL2FwaS11cGRhdGUtYWRkcmVzcycsXHJcblx0XHRcdGRlbGV0ZUFkZHJlc3M6ICdyPWFkZHJlc3MvYXBpLWRlbC1hZGRyZXNzJyxcclxuXHRcdFx0Z2V0Q2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktZ2V0LXNob3BwaW5nLWNhcnQnLFxyXG5cdFx0XHRkZWxldGVDYXJ0OiAncj1zaG9wcGluZy1jYXJ0L2FwaS1kZWwnLFxyXG5cdFx0XHR0b3BBcmVhOiAncj1hcmVhL2FwaS1nZXQtY2hpbGQtYXJlYXMnLFxyXG5cdFx0XHRkZXRhaWxBcmVhOiAncj1hcmVhL2FwaS1nZXQtYXJlYSZhcmVhSWQnLFxyXG5cdFx0XHRhcHBseU9yZGVyOiAncj1idXlpbmcvYXBpLWFwcGx5LWNyZWF0ZS1vcmRlci1ieS1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0Y3JlYXRlT3JkZXI6ICdyPWJ1eWluZy9hcGktY3JlYXRlLW9yZGVyLWJ5LXNob3BwaW5nLWNhcnQnLFxyXG5cdFx0XHRhcHBseU9yZGVyQnV5OiAncj1idXlpbmcvYXBpLWFwcGx5LWNyZWF0ZS1vcmRlci1ieS1mYXN0LWJ1eWluZycsXHJcblx0XHRcdGNyZWF0ZU9yZGVyQnV5OiAncj1idXlpbmcvYXBpLWNyZWF0ZS1vcmRlci1ieS1mYXN0LWJ1eWluZycsXHJcblx0XHRcdHNldE1hcms6ICdyPW1hcmsvYXBpLW1hcmsnLFxyXG5cdFx0XHRjYW5jZWxNYXJrOiAncj1tYXJrL2FwaS1jYW5jZWwtbWFyaycsXHJcblx0XHRcdGdldE1hcmtVc2VyOiAncj1tYXJrL2FwaS1nZXQtY29sbGVjdG9ycycsXHJcblx0XHRcdGdldE9yZGVyOiAncj1vcmRlci9hcGktZ2V0LWRldGFpbCcsXHJcblx0XHRcdGdldE1hcmtTcHU6ICdyPW1hcmsvYXBpLWdldC1tYXJrLXNwdScsXHJcblx0XHRcdGdldE9yZGVyU3RhdHVzOiAncj1vcmRlci9hcGktZ2V0LW9yZGVycycsXHJcblx0XHRcdGdldE9yZGVyRGV0YWlsOiAncj1vcmRlci9hcGktZ2V0LWRldGFpbCcsXHJcblx0XHRcdHJlY2VpdmVPcmRlcjogJ3I9b3JkZXIvYXBpLXJlY2VpcHRlZCcsXHJcblx0XHRcdGNhbmNlbE9yZGVyOiAncj1vcmRlci9hcGktY2FuY2VsJyxcclxuXHRcdFx0b3JkZXJFZGl0QWRkOiAncj1vcmRlci9hcGktY2hhbmdlLWFkZHJlc3MnLFxyXG5cdFx0XHRnZXROb3RpY2U6ICdyPW5vdGljZS9hcGktZ2V0LW5vdGljZScsXHJcblx0XHRcdGdldFNlcnZpY2U6ICdyPXZpcnR1YWwtaXRlbS9hcGktZ2V0LXZpcnR1YWwtaXRlbScsXHJcblx0XHRcdHBheVNlcnZpY2U6ICdyPWJ1eWluZy9hcGktYXBwbHktcGF5JyxcclxuXHRcdFx0Z2V0U2lnbkNvZGU6ICdyPW1lbWJlci9hcGktYXBwbHktc2lnbi1pbi1ieS1waG9uZScsXHJcblx0XHRcdGxvZ2luQnlQaG9uZTogJ3I9bWVtYmVyL2FwaS1zaWduLXVwLW9yLXNpZ24taW4nLFxyXG5cdFx0XHRhZGRBZGRyZXNzOiAncj1hZGRyZXNzL2FwaS1hZGQtYWRkcmVzcycsXHJcblx0XHRcdGdldExvZ2lzdGljOiAncj1vcmRlci9hcGktZ2V0LWxvZ2lzdGljcy1saXN0JyxcclxuXHRcdFx0Z2V0TG9naXN0aWNTdGF0dXM6ICdyPW9yZGVyL2FwaS1nZXQtbG9naXN0aWNzLWRldGFpbCcsXHJcblx0XHRcdHNldE5pY2tuYW1lOiAncj1tZW1iZXIvYXBpLXVwbG9hZC1uaWNrbmFtZScsXHJcblx0XHRcdGdldFJlY29tbWVuZDogJ3I9cHJvZHVjdC9hcGktZ2V0LXJlY29tbWVuZC1zcHVzJ1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kJHBhdGhIdG1sID0ge1xyXG5cdFx0XHRydWxlczogJ2Rpc3RyaWJ1dGlvbl9ydWxlcy5odG1sJyxcclxuXHRcdFx0c2VydmljZTogJ3ZpcF9zZXJ2aWNlX2FncmVlbWVudC5odG1sJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRQYXlTaWduIChwYXJhbSkge1xyXG5cdFx0Y29uc29sZS5sb2cocGFyYW0pXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gcGFyYW0pIHtcclxuXHRcdFx0cGFyYW1ba2V5XSA9IHBhcmFtW2tleV0udG9TdHJpbmcoKVxyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld0tleSA9IE9iamVjdC5rZXlzKHBhcmFtKS5zb3J0KClcclxuXHRcdHZhciBuZXdQYXJhbSA9IHt9XHJcblx0XHRuZXdLZXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRuZXdQYXJhbVtpdGVtXSA9IHBhcmFtW2l0ZW1dXHJcblx0XHR9KVxyXG5cdFx0dmFyIHN0ciA9ICcnXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gbmV3UGFyYW0pIHtcclxuXHRcdFx0c3RyICs9ICBrZXkgKyAnPScgKyBuZXdQYXJhbVtrZXldICsgJyYnXHJcblx0XHR9XHJcblx0XHRzdHIgKz0gJ2tleT1kenBrVTVJdGFGaTRJNUdvcmFlaGQ4YW1oczVwWmgxdydcclxuXHRcdHZhciBzaWduID0gTWQ1Lm1kNShzdHIpLnRvVXBwZXJDYXNlKClcclxuXHRcdHJldHVybiBzaWduXHJcblx0fVxyXG5cdGZvcm1hdERhdGEgKHJlcywgcGFyYW0pIHtcclxuXHRcdHZhciB0aW1lID0gcmVzLmRhdGEudG9TdHJpbmcoKVxyXG5cdFx0cGFyYW0ucmVxdWVzdFRpbWUgPSB0aW1lXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gcGFyYW0pIHtcclxuXHRcdFx0cGFyYW1ba2V5XSA9IHBhcmFtW2tleV0udG9TdHJpbmcoKVxyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld0tleSA9IE9iamVjdC5rZXlzKHBhcmFtKS5zb3J0KClcclxuXHRcdHZhciBuZXdQYXJhbSA9IHt9XHJcblx0XHRuZXdLZXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRuZXdQYXJhbVtpdGVtXSA9IHBhcmFtW2l0ZW1dXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIG5ld1BhcmFtXHJcblx0fVxyXG5cdGdldERhdGEgKHJlcywgcGFyYW0pIHtcclxuXHRcdHZhciBuZXdQYXJhbSA9IHRoaXMuZm9ybWF0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0dmFyIHNpZ24gPSBKU09OLnN0cmluZ2lmeShuZXdQYXJhbSkgKyAnXlpTMjAxOExDSidcclxuXHRcdG5ld1BhcmFtLnNpZ25hdHVyZSA9IE1kNS5tZDUoc2lnbikudG9Mb3dlckNhc2UoKVxyXG5cdFx0cmV0dXJuIG5ld1BhcmFtXHJcblx0fVxyXG5cdGdldEpzb25EYXRhIChyZXMsIHBhcmFtKSB7XHJcblx0XHR2YXIgbmV3UGFyYW0gPSB0aGlzLmZvcm1hdERhdGEocmVzLCBwYXJhbSlcclxuXHRcdHZhciBzaWduID0gSlNPTi5zdHJpbmdpZnkobmV3UGFyYW0pLnJlcGxhY2UoL1xcXFwvZywgJycpICsgJ15aUzIwMThMQ0onXHJcblx0XHRjb25zb2xlLmxvZyhzaWduKVxyXG5cdFx0bmV3UGFyYW0uc2lnbmF0dXJlID0gTWQ1Lm1kNShzaWduKS50b0xvd2VyQ2FzZSgpXHJcblx0XHRyZXR1cm4gbmV3UGFyYW1cclxuXHR9XHJcblx0Z2V0VGltZSAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50aW1lLFxyXG5cdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdFx0aGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFNlbmRDb2RlIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuICAgICAgICBcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHQgICAgICAgICAgICBcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5zZW5kQ29kZSxcclxuXHQgICAgICAgICAgICBcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgIFx0aGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICBcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHQgICAgICAgICAgICB9KVxyXG4gICAgICAgIFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG4gICAgICAgIH0pXHJcblx0fVxyXG5cdFNlbmRVc2VySW5mbyAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcbiAgICAgICAgXHRcdHdlcHkucmVxdWVzdCh7XHJcblx0ICAgICAgICAgICAgXHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguc2VuZFVzZXJJbmZvLFxyXG5cdCAgICAgICAgICAgIFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgXHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgIFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdCAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcbiAgICAgICAgfSlcclxuXHR9XHJcblx0VXNlckxvZ2luIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuICAgICAgICBcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHQgICAgICAgICAgICBcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC51c2VybG9naW4sXHJcblx0ICAgICAgICAgICAgXHRkYXRhOiBkYXRhLFxyXG5cdCAgICAgICAgICAgIFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICBcdGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0ICAgICAgICAgICAgfSlcclxuICAgICAgICBcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuICAgICAgICB9KVxyXG5cdH1cclxuXHRTZXROaWNrbmFtZSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcbiAgICAgICAgXHRcdHdlcHkucmVxdWVzdCh7XHJcblx0ICAgICAgICAgICAgXHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguc2V0Tmlja25hbWUsXHJcblx0ICAgICAgICAgICAgXHRkYXRhOiBkYXRhLFxyXG5cdCAgICAgICAgICAgIFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICBcdGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0ICAgICAgICAgICAgfSlcclxuICAgICAgICBcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuICAgICAgICB9KVxyXG5cdH1cclxuXHRJbmRleEh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguaW5kZXhMaXN0LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0QmFubmVyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldEJhbm5lcixcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERldGFpbEh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZGV0YWlsLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEFkZENhcnRIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFkZGNhcnQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRUb3BDYXRlZ29yeSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50b3BDYXRlZ29yeSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldENoaWxkQ2F0ZWdvcnkgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2hpbGRDYXRlZ29yeSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFNwdUh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0U3B1LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0UmVjb21tZW5kIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldFJlY29tbWVuZCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFNldE1hcmtIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNldE1hcmssXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRDYW5jZWxNYXJrSHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5jYW5jZWxNYXJrLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0TWFya1VzZXIgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0TWFya1VzZXIsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRNYXJrU3B1IChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE1hcmtTcHUsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRDYXJ0SHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRDYXJ0LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RGVsZXRlQ2FydEh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0SnNvbkRhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZGVsZXRlQ2FydCxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VXNlckluZm8gKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudXNlckluZm8sXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRVc2VyT3JkZXIgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgub3JkZXJTdGF0dXMsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRDcmVhdGVVc2VyT3JkZXIgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY3JlYXRlT3JkZXIsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdENyZWF0ZU9yZGVyQnV5IChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNyZWF0ZU9yZGVyQnV5LFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRDYW5jZWxPcmRlciAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5jYW5jZWxPcmRlcixcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0UmVjZWl2ZU9yZGVyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnJlY2VpdmVPcmRlcixcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RWRpdE9yZGVyQWRkIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLm9yZGVyRWRpdEFkZCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldEFkZHJlc3MgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0QWRkcmVzcyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEFkZEFkZHJlc3MgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguYWRkQWRkcmVzcyxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RWRpdEFkZHJlc3MgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZWRpdEFkZHJlc3MsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERlbGV0ZUFkZHJlc3MgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZGVsZXRlQWRkcmVzcyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEFwcGx5T3JkZXJIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFwcGx5T3JkZXIsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRBcHBseU9yZGVyQnV5IChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFwcGx5T3JkZXJCdXksXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRPcmRlckh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0T3JkZXIsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRPcmRlclN0YXR1cyAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRPcmRlclN0YXR1cyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE9yZGVyRGV0YWlsIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE9yZGVyRGV0YWlsLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VG9wQXJlYSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50b3BBcmVhLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0RGV0YWlsQXJlYSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5kZXRhaWxBcmVhLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0Tm90aWNlIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE5vdGljZSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFNlcnZpY2UgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0U2VydmljZSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFBheVNlcnZpY2UgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgucGF5U2VydmljZSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldExvZ2lzdGljIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldExvZ2lzdGljLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0TG9naXN0aWNTdGF0dXMgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0TG9naXN0aWNTdGF0dXMsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRTZWFyY2hIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguc2VhcmNoLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRTaWduQ29kZSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRTaWduQ29kZSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdExvZ2luQnlQaG9uZSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5sb2dpbkJ5UGhvbmUsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHR0cFJlcXVlc3QiXX0=