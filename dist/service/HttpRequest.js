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
			cancelOrder: 'r=order/api-cancel',
			orderEditAdd: 'r=order/api-change-address',
			getNotice: 'r=notice/api-get-notice',
			getService: 'r=virtual-item/api-get-virtual-item',
			payService: 'r=buying/api-apply-pay',
			getSignCode: 'r=member/api-apply-sign-in-by-phone',
			loginByPhone: 'r=member/api-sign-up-or-sign-in',
			addAddress: 'r=address/api-add-address',
			getLogistic: 'r=order/api-get-logistics-list',
			getLogisticStatus: 'r=order/api-get-logistics-detail'
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
		key: 'IndexHttp',
		value: function IndexHttp(param, cb) {
			var _this7 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this7.$$base + _this7.$$path.indexList,
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
			var _this8 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this8.$$base + _this8.$$path.getBanner,
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
			var _this9 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this9.$$base + _this9.$$path.detail,
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
			var _this10 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this10.$$base + _this10.$$path.addcart,
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
			var _this11 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this11.$$base + _this11.$$path.topCategory,
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
			var _this12 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this12.$$base + _this12.$$path.childCategory,
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
			var _this13 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this13.$$base + _this13.$$path.getSpu,
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
			var _this14 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this14.$$base + _this14.$$path.setMark,
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
			var _this15 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this15.$$base + _this15.$$path.cancelMark,
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
			var _this16 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this16.$$base + _this16.$$path.getMarkUser,
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
			var _this17 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this17.$$base + _this17.$$path.getMarkSpu,
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
			var _this18 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this18.$$base + _this18.$$path.getCart,
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
			var _this19 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getJsonData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this19.$$base + _this19.$$path.deleteCart,
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
			var _this20 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this20.$$base + _this20.$$path.userInfo,
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
			var _this21 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this21.$$base + _this21.$$path.orderStatus,
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
			var _this22 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this22.$$base + _this22.$$path.createOrder,
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
			var _this23 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this23.$$base + _this23.$$path.createOrderBuy,
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
			var _this24 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this24.$$base + _this24.$$path.cancelOrder,
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
			var _this25 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this25.$$base + _this25.$$path.orderEditAdd,
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
			var _this26 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this26.$$base + _this26.$$path.getAddress,
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
			var _this27 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this27.$$base + _this27.$$path.addAddress,
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
			var _this28 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this28.$$base + _this28.$$path.editAddress,
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
			var _this29 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this29.$$base + _this29.$$path.deleteAddress,
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
			var _this30 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this30.$$base + _this30.$$path.applyOrder,
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
			var _this31 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this31.$$base + _this31.$$path.applyOrderBuy,
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
			var _this32 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this32.$$base + _this32.$$path.getOrder,
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
			var _this33 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this33.$$base + _this33.$$path.getOrderStatus,
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
			var _this34 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this34.$$base + _this34.$$path.getOrderDetail,
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
			var _this35 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this35.$$base + _this35.$$path.topArea,
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
			var _this36 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this36.$$base + _this36.$$path.detailArea,
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
			var _this37 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this37.$$base + _this37.$$path.getNotice,
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
			var _this38 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this38.$$base + _this38.$$path.getService,
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
			var _this39 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this39.$$base + _this39.$$path.payService,
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
			var _this40 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this40.$$base + _this40.$$path.getLogistic,
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
			var _this41 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this41.$$base + _this41.$$path.getLogisticStatus,
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
			var _this42 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this42.$$base + _this42.$$path.search,
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
			var _this43 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this43.$$base + _this43.$$path.getSignCode,
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
			var _this44 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this44.$$base + _this44.$$path.loginByPhone,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRiYXNlSHRtbCIsIiQkcGF0aCIsInRpbWUiLCJzZW5kVXNlckluZm8iLCJzZW5kQ29kZSIsInVzZXJsb2dpbiIsImluZGV4TGlzdCIsImdldEJhbm5lciIsImRldGFpbCIsInNlYXJjaCIsImFkZGNhcnQiLCJ0b3BDYXRlZ29yeSIsImNoaWxkQ2F0ZWdvcnkiLCJnZXRTcHUiLCJ1c2VySW5mbyIsIm9yZGVyU3RhdHVzIiwiZ2V0QWRkcmVzcyIsImVkaXRBZGRyZXNzIiwiZGVsZXRlQWRkcmVzcyIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwidG9wQXJlYSIsImRldGFpbEFyZWEiLCJhcHBseU9yZGVyIiwiY3JlYXRlT3JkZXIiLCJhcHBseU9yZGVyQnV5IiwiY3JlYXRlT3JkZXJCdXkiLCJzZXRNYXJrIiwiY2FuY2VsTWFyayIsImdldE1hcmtVc2VyIiwiZ2V0T3JkZXIiLCJnZXRNYXJrU3B1IiwiZ2V0T3JkZXJTdGF0dXMiLCJnZXRPcmRlckRldGFpbCIsImNhbmNlbE9yZGVyIiwib3JkZXJFZGl0QWRkIiwiZ2V0Tm90aWNlIiwiZ2V0U2VydmljZSIsInBheVNlcnZpY2UiLCJnZXRTaWduQ29kZSIsImxvZ2luQnlQaG9uZSIsImFkZEFkZHJlc3MiLCJnZXRMb2dpc3RpYyIsImdldExvZ2lzdGljU3RhdHVzIiwiJCRwYXRoSHRtbCIsInJ1bGVzIiwic2VydmljZSIsInBhcmFtIiwiY29uc29sZSIsImxvZyIsImtleSIsInRvU3RyaW5nIiwibmV3S2V5IiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJuZXdQYXJhbSIsImZvckVhY2giLCJpdGVtIiwic3RyIiwic2lnbiIsIm1kNSIsInRvVXBwZXJDYXNlIiwicmVzIiwiZGF0YSIsInJlcXVlc3RUaW1lIiwiZm9ybWF0RGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzaWduYXR1cmUiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwiZmFpbCIsImVycm9yIiwiY2IiLCJfdGhpcyIsImdldFRpbWUiLCJ0aGVuIiwiZ2V0RGF0YSIsImNhdGNoIiwiZ2V0SnNvbkRhdGEiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFc7OztBQUNMLHdCQUFlO0FBQUE7O0FBQUE7O0FBRWQsU0FBS0MsTUFBTCxHQUFjLGtFQUFkO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQiwrQ0FBbEI7QUFDQSxTQUFLQyxNQUFMLEdBQWM7QUFDYkMsU0FBSyxRQURRO0FBRWJDLGlCQUFjLDBCQUZEO0FBR2I7QUFDQUMsYUFBVSxtQkFKRztBQUtiQyxjQUFXLGlDQUxFO0FBTWJDLGNBQVcsMEJBTkU7QUFPYkMsY0FBVyx5QkFQRTtBQVFiQyxXQUFRLDhCQVJLO0FBU2JDLFdBQVEsMEJBVEs7QUFVYkMsWUFBUyw0QkFWSTtBQVdiQyxnQkFBYSxtQ0FYQTtBQVliQyxrQkFBZSw2QkFaRjtBQWFiQyxXQUFRLHdCQWJLO0FBY2JDLGFBQVUsdUJBZEc7QUFlYkMsZ0JBQWEsa0NBZkE7QUFnQmJDLGVBQVksZ0NBaEJDO0FBaUJiQyxnQkFBYSw4QkFqQkE7QUFrQmJDLGtCQUFlLDJCQWxCRjtBQW1CYkMsWUFBUyx1Q0FuQkk7QUFvQmJDLGVBQVkseUJBcEJDO0FBcUJiQyxZQUFTLDRCQXJCSTtBQXNCYkMsZUFBWSw0QkF0QkM7QUF1QmJDLGVBQVksa0RBdkJDO0FBd0JiQyxnQkFBYSw0Q0F4QkE7QUF5QmJDLGtCQUFlLGdEQXpCRjtBQTBCYkMsbUJBQWdCLDBDQTFCSDtBQTJCYkMsWUFBUyxpQkEzQkk7QUE0QmJDLGVBQVksd0JBNUJDO0FBNkJiQyxnQkFBYSwyQkE3QkE7QUE4QmJDLGFBQVUsd0JBOUJHO0FBK0JiQyxlQUFZLHlCQS9CQztBQWdDYkMsbUJBQWdCLHdCQWhDSDtBQWlDYkMs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ZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7O0VBMS9Cd0IsZUFBS08sRzs7a0JBNi9CaEIzRixXIiwiZmlsZSI6Ikh0dHBSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IE1kNSBmcm9tICcuL21kNS5qcydcclxuXHJcbmNsYXNzIEh0dHBSZXF1ZXN0IGV4dGVuZHMgd2VweS5hcHB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy4kJGJhc2UgPSAnaHR0cHM6Ly96c3Rlc3QuenNidXRjaGVyLmNuL3NtYXJ0U2hvcHBpbmcvYmFja2VuZC93ZWIvaW5kZXgucGhwPydcclxuXHRcdHRoaXMuJCRiYXNlSHRtbCA9ICdodHRwczovL3pzdGVzdC56c2J1dGNoZXIuY24vc21hcnRTaG9wcGluZy9oNS8nXHJcblx0XHR0aGlzLiQkcGF0aCA9IHtcclxuXHRcdFx0dGltZToncj10ZXN0JyxcclxuXHRcdFx0c2VuZFVzZXJJbmZvOiAncj13ZWNoYXQvYXBpLWdldC11bmlvbmlkJyxcclxuXHRcdFx0Ly8gc2VuZFVzZXJJbmZvOiAnaHR0cHM6Ly96c3Rlc3QuenNidXRjaGVyLmNuL3NtYXJ0V2Ivc3RvcmUvd2ViL2luZGV4LnBocD9yPWZvcmx1bHUvZW5jcnlwdGUtZGF0YScsXHJcblx0XHRcdHNlbmRDb2RlOiAncj13ZWNoYXQvYXBpLWF1dGgnLFxyXG5cdFx0XHR1c2VybG9naW46ICdyPW1lbWJlci9hcGktZ2V0LXRva2VuLWJ5LXBob25lJyxcclxuXHRcdFx0aW5kZXhMaXN0OiAncj1yZWNvbW1lbmQvYXBpLWdldC1zcHVzJyxcclxuXHRcdFx0Z2V0QmFubmVyOiAncj1iYW5uZXIvYXBpLWdldC1iYW5uZXInLFxyXG5cdFx0XHRkZXRhaWw6ICdyPXByb2R1Y3QvYXBpLWdldC1zcHUtZGV0YWlsJyxcclxuXHRcdFx0c2VhcmNoOiAncj1wcm9kdWN0L2FwaS1zZWFyY2gtc3B1JyxcclxuXHRcdFx0YWRkY2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktdXBkYXRlJyxcclxuXHRcdFx0dG9wQ2F0ZWdvcnk6ICdyPWNhdGVnb3J5L2FwaS1nZXQtdG9wLWNhdGVnb3JpZXMnLFxyXG5cdFx0XHRjaGlsZENhdGVnb3J5OiAncj1jYXRlZ29yeS9hcGktZ2V0LWNoaWxkcmVuJyxcclxuXHRcdFx0Z2V0U3B1OiAncj1jYXRlZ29yeS9hcGktZ2V0LXNwdScsXHJcblx0XHRcdHVzZXJJbmZvOiAncj1tZW1iZXIvYXBpLWdldC1pbmZvJyxcclxuXHRcdFx0b3JkZXJTdGF0dXM6ICdyPW9yZGVyL2FwaS1nZXQtb3JkZXItc3RhdGlzdGljcycsXHJcblx0XHRcdGdldEFkZHJlc3M6ICdyPWFkZHJlc3MvYXBpLWdldC1hZGRyZXNzLWxpc3QnLFxyXG5cdFx0XHRlZGl0QWRkcmVzczogJ3I9YWRkcmVzcy9hcGktdXBkYXRlLWFkZHJlc3MnLFxyXG5cdFx0XHRkZWxldGVBZGRyZXNzOiAncj1hZGRyZXNzL2FwaS1kZWwtYWRkcmVzcycsXHJcblx0XHRcdGdldENhcnQ6ICdyPXNob3BwaW5nLWNhcnQvYXBpLWdldC1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0ZGVsZXRlQ2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktZGVsJyxcclxuXHRcdFx0dG9wQXJlYTogJ3I9YXJlYS9hcGktZ2V0LWNoaWxkLWFyZWFzJyxcclxuXHRcdFx0ZGV0YWlsQXJlYTogJ3I9YXJlYS9hcGktZ2V0LWFyZWEmYXJlYUlkJyxcclxuXHRcdFx0YXBwbHlPcmRlcjogJ3I9YnV5aW5nL2FwaS1hcHBseS1jcmVhdGUtb3JkZXItYnktc2hvcHBpbmctY2FydCcsXHJcblx0XHRcdGNyZWF0ZU9yZGVyOiAncj1idXlpbmcvYXBpLWNyZWF0ZS1vcmRlci1ieS1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0YXBwbHlPcmRlckJ1eTogJ3I9YnV5aW5nL2FwaS1hcHBseS1jcmVhdGUtb3JkZXItYnktZmFzdC1idXlpbmcnLFxyXG5cdFx0XHRjcmVhdGVPcmRlckJ1eTogJ3I9YnV5aW5nL2FwaS1jcmVhdGUtb3JkZXItYnktZmFzdC1idXlpbmcnLFxyXG5cdFx0XHRzZXRNYXJrOiAncj1tYXJrL2FwaS1tYXJrJyxcclxuXHRcdFx0Y2FuY2VsTWFyazogJ3I9bWFyay9hcGktY2FuY2VsLW1hcmsnLFxyXG5cdFx0XHRnZXRNYXJrVXNlcjogJ3I9bWFyay9hcGktZ2V0LWNvbGxlY3RvcnMnLFxyXG5cdFx0XHRnZXRPcmRlcjogJ3I9b3JkZXIvYXBpLWdldC1kZXRhaWwnLFxyXG5cdFx0XHRnZXRNYXJrU3B1OiAncj1tYXJrL2FwaS1nZXQtbWFyay1zcHUnLFxyXG5cdFx0XHRnZXRPcmRlclN0YXR1czogJ3I9b3JkZXIvYXBpLWdldC1vcmRlcnMnLFxyXG5cdFx0XHRnZXRPcmRlckRldGFpbDogJ3I9b3JkZXIvYXBpLWdldC1kZXRhaWwnLFxyXG5cdFx0XHRjYW5jZWxPcmRlcjogJ3I9b3JkZXIvYXBpLWNhbmNlbCcsXHJcblx0XHRcdG9yZGVyRWRpdEFkZDogJ3I9b3JkZXIvYXBpLWNoYW5nZS1hZGRyZXNzJyxcclxuXHRcdFx0Z2V0Tm90aWNlOiAncj1ub3RpY2UvYXBpLWdldC1ub3RpY2UnLFxyXG5cdFx0XHRnZXRTZXJ2aWNlOiAncj12aXJ0dWFsLWl0ZW0vYXBpLWdldC12aXJ0dWFsLWl0ZW0nLFxyXG5cdFx0XHRwYXlTZXJ2aWNlOiAncj1idXlpbmcvYXBpLWFwcGx5LXBheScsXHJcblx0XHRcdGdldFNpZ25Db2RlOiAncj1tZW1iZXIvYXBpLWFwcGx5LXNpZ24taW4tYnktcGhvbmUnLFxyXG5cdFx0XHRsb2dpbkJ5UGhvbmU6ICdyPW1lbWJlci9hcGktc2lnbi11cC1vci1zaWduLWluJyxcclxuXHRcdFx0YWRkQWRkcmVzczogJ3I9YWRkcmVzcy9hcGktYWRkLWFkZHJlc3MnLFxyXG5cdFx0XHRnZXRMb2dpc3RpYzogJ3I9b3JkZXIvYXBpLWdldC1sb2dpc3RpY3MtbGlzdCcsXHJcblx0XHRcdGdldExvZ2lzdGljU3RhdHVzOiAncj1vcmRlci9hcGktZ2V0LWxvZ2lzdGljcy1kZXRhaWwnXHJcblx0XHR9XHJcblx0XHR0aGlzLiQkcGF0aEh0bWwgPSB7XHJcblx0XHRcdHJ1bGVzOiAnZGlzdHJpYnV0aW9uX3J1bGVzLmh0bWwnLFxyXG5cdFx0XHRzZXJ2aWNlOiAndmlwX3NlcnZpY2VfYWdyZWVtZW50Lmh0bWwnXHJcblx0XHR9XHJcblx0fVxyXG5cdGdldFBheVNpZ24gKHBhcmFtKSB7XHJcblx0XHRjb25zb2xlLmxvZyhwYXJhbSlcclxuXHRcdGZvciAodmFyIGtleSBpbiBwYXJhbSkge1xyXG5cdFx0XHRwYXJhbVtrZXldID0gcGFyYW1ba2V5XS50b1N0cmluZygpXHJcblx0XHR9XHJcblx0XHR2YXIgbmV3S2V5ID0gT2JqZWN0LmtleXMocGFyYW0pLnNvcnQoKVxyXG5cdFx0dmFyIG5ld1BhcmFtID0ge31cclxuXHRcdG5ld0tleS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRcdG5ld1BhcmFtW2l0ZW1dID0gcGFyYW1baXRlbV1cclxuXHRcdH0pXHJcblx0XHR2YXIgc3RyID0gJydcclxuXHRcdGZvciAodmFyIGtleSBpbiBuZXdQYXJhbSkge1xyXG5cdFx0XHRzdHIgKz0gIGtleSArICc9JyArIG5ld1BhcmFtW2tleV0gKyAnJidcclxuXHRcdH1cclxuXHRcdHN0ciArPSAna2V5PWR6cGtVNUl0YUZpNEk1R29yYWVoZDhhbWhzNXBaaDF3J1xyXG5cdFx0dmFyIHNpZ24gPSBNZDUubWQ1KHN0cikudG9VcHBlckNhc2UoKVxyXG5cdFx0cmV0dXJuIHNpZ25cclxuXHR9XHJcblx0Zm9ybWF0RGF0YSAocmVzLCBwYXJhbSkge1xyXG5cdFx0dmFyIHRpbWUgPSByZXMuZGF0YS50b1N0cmluZygpXHJcblx0XHRwYXJhbS5yZXF1ZXN0VGltZSA9IHRpbWVcclxuXHRcdGZvciAodmFyIGtleSBpbiBwYXJhbSkge1xyXG5cdFx0XHRwYXJhbVtrZXldID0gcGFyYW1ba2V5XS50b1N0cmluZygpXHJcblx0XHR9XHJcblx0XHR2YXIgbmV3S2V5ID0gT2JqZWN0LmtleXMocGFyYW0pLnNvcnQoKVxyXG5cdFx0dmFyIG5ld1BhcmFtID0ge31cclxuXHRcdG5ld0tleS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRcdG5ld1BhcmFtW2l0ZW1dID0gcGFyYW1baXRlbV1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gbmV3UGFyYW1cclxuXHR9XHJcblx0Z2V0RGF0YSAocmVzLCBwYXJhbSkge1xyXG5cdFx0dmFyIG5ld1BhcmFtID0gdGhpcy5mb3JtYXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHR2YXIgc2lnbiA9IEpTT04uc3RyaW5naWZ5KG5ld1BhcmFtKSArICdeWlMyMDE4TENKJ1xyXG5cdFx0bmV3UGFyYW0uc2lnbmF0dXJlID0gTWQ1Lm1kNShzaWduKS50b0xvd2VyQ2FzZSgpXHJcblx0XHRyZXR1cm4gbmV3UGFyYW1cclxuXHR9XHJcblx0Z2V0SnNvbkRhdGEgKHJlcywgcGFyYW0pIHtcclxuXHRcdHZhciBuZXdQYXJhbSA9IHRoaXMuZm9ybWF0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0dmFyIHNpZ24gPSBKU09OLnN0cmluZ2lmeShuZXdQYXJhbSkucmVwbGFjZSgvXFxcXC9nLCAnJykgKyAnXlpTMjAxOExDSidcclxuXHRcdGNvbnNvbGUubG9nKHNpZ24pXHJcblx0XHRuZXdQYXJhbS5zaWduYXR1cmUgPSBNZDUubWQ1KHNpZ24pLnRvTG93ZXJDYXNlKClcclxuXHRcdHJldHVybiBuZXdQYXJhbVxyXG5cdH1cclxuXHRnZXRUaW1lICgpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnRpbWUsXHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0XHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0U2VuZENvZGUgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgXHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgXHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG4gICAgICAgIFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdCAgICAgICAgICAgIFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNlbmRDb2RlLFxyXG5cdCAgICAgICAgICAgIFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgXHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgIFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdCAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcbiAgICAgICAgfSlcclxuXHR9XHJcblx0U2VuZFVzZXJJbmZvIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuICAgICAgICBcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHQgICAgICAgICAgICBcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5zZW5kVXNlckluZm8sXHJcblx0ICAgICAgICAgICAgXHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICBcdGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgXHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0ICAgICAgICAgICAgfSlcclxuICAgICAgICBcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuICAgICAgICB9KVxyXG5cdH1cclxuXHRVc2VyTG9naW4gKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgXHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgXHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG4gICAgICAgIFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdCAgICAgICAgICAgIFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnVzZXJsb2dpbixcclxuXHQgICAgICAgICAgICBcdGRhdGE6IGRhdGEsXHJcblx0ICAgICAgICAgICAgXHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgIFx0aGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHQgICAgICAgICAgICB9KVxyXG4gICAgICAgIFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG4gICAgICAgIH0pXHJcblx0fVxyXG5cdEluZGV4SHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5pbmRleExpc3QsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRCYW5uZXIgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0QmFubmVyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RGV0YWlsSHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5kZXRhaWwsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0QWRkQ2FydEh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguYWRkY2FydCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFRvcENhdGVnb3J5IChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnRvcENhdGVnb3J5LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0Q2hpbGRDYXRlZ29yeSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5jaGlsZENhdGVnb3J5LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0U3B1SHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRTcHUsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRTZXRNYXJrSHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5zZXRNYXJrLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q2FuY2VsTWFya0h0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2FuY2VsTWFyayxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE1hcmtVc2VyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE1hcmtVc2VyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0TWFya1NwdSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRNYXJrU3B1LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0Q2FydEh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0Q2FydCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERlbGV0ZUNhcnRIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldEpzb25EYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRlbGV0ZUNhcnQsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFVzZXJJbmZvIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnVzZXJJbmZvLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VXNlck9yZGVyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLm9yZGVyU3RhdHVzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q3JlYXRlVXNlck9yZGVyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNyZWF0ZU9yZGVyLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRDcmVhdGVPcmRlckJ1eSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5jcmVhdGVPcmRlckJ1eSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q2FuY2VsT3JkZXIgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2FuY2VsT3JkZXIsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEVkaXRPcmRlckFkZCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5vcmRlckVkaXRBZGQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldEFkZHJlc3MsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRBZGRBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFkZEFkZHJlc3MsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEVkaXRBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmVkaXRBZGRyZXNzLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHREZWxldGVBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRlbGV0ZUFkZHJlc3MsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRBcHBseU9yZGVySHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hcHBseU9yZGVyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0QXBwbHlPcmRlckJ1eSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hcHBseU9yZGVyQnV5LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0T3JkZXJIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE9yZGVyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0T3JkZXJTdGF0dXMgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0T3JkZXJTdGF0dXMsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRPcmRlckRldGFpbCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRPcmRlckRldGFpbCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFRvcEFyZWEgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudG9wQXJlYSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldERldGFpbEFyZWEgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZGV0YWlsQXJlYSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE5vdGljZSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXROb3RpY2UsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRTZXJ2aWNlIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldFNlcnZpY2UsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRQYXlTZXJ2aWNlIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnBheVNlcnZpY2UsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRMb2dpc3RpYyAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRMb2dpc3RpYyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldExvZ2lzdGljU3RhdHVzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldExvZ2lzdGljU3RhdHVzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0U2VhcmNoSHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNlYXJjaCxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0U2lnbkNvZGUgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0U2lnbkNvZGUsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRMb2dpbkJ5UGhvbmUgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgubG9naW5CeVBob25lLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0dHBSZXF1ZXN0Il19