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
		key: 'EditOrderAdd',
		value: function EditOrderAdd(param, cb) {
			var _this27 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this27.$$base + _this27.$$path.orderEditAdd,
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
			var _this28 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this28.$$base + _this28.$$path.getAddress,
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
			var _this29 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this29.$$base + _this29.$$path.addAddress,
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
			var _this30 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this30.$$base + _this30.$$path.editAddress,
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
			var _this31 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this31.$$base + _this31.$$path.deleteAddress,
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
			var _this32 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this32.$$base + _this32.$$path.applyOrder,
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
			var _this33 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this33.$$base + _this33.$$path.applyOrderBuy,
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
			var _this34 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this34.$$base + _this34.$$path.getOrder,
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
			var _this35 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this35.$$base + _this35.$$path.getOrderStatus,
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
			var _this36 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this36.$$base + _this36.$$path.getOrderDetail,
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
			var _this37 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this37.$$base + _this37.$$path.topArea,
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
			var _this38 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this38.$$base + _this38.$$path.detailArea,
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
			var _this39 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this39.$$base + _this39.$$path.getNotice,
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
			var _this40 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this40.$$base + _this40.$$path.getService,
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
			var _this41 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this41.$$base + _this41.$$path.payService,
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
			var _this42 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this42.$$base + _this42.$$path.getLogistic,
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
			var _this43 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this43.$$base + _this43.$$path.getLogisticStatus,
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
			var _this44 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this44.$$base + _this44.$$path.search,
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
			var _this45 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this45.$$base + _this45.$$path.getSignCode,
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
			var _this46 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this46.$$base + _this46.$$path.loginByPhone,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRiYXNlSHRtbCIsIiQkcGF0aCIsInRpbWUiLCJzZW5kVXNlckluZm8iLCJzZW5kQ29kZSIsInVzZXJsb2dpbiIsImluZGV4TGlzdCIsImdldEJhbm5lciIsImRldGFpbCIsInNlYXJjaCIsImFkZGNhcnQiLCJ0b3BDYXRlZ29yeSIsImNoaWxkQ2F0ZWdvcnkiLCJnZXRTcHUiLCJ1c2VySW5mbyIsIm9yZGVyU3RhdHVzIiwiZ2V0QWRkcmVzcyIsImVkaXRBZGRyZXNzIiwiZGVsZXRlQWRkcmVzcyIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwidG9wQXJlYSIsImRldGFpbEFyZWEiLCJhcHBseU9yZGVyIiwiY3JlYXRlT3JkZXIiLCJhcHBseU9yZGVyQnV5IiwiY3JlYXRlT3JkZXJCdXkiLCJzZXRNYXJrIiwiY2FuY2VsTWFyayIsImdldE1hcmtVc2VyIiwiZ2V0T3JkZXIiLCJnZXRNYXJrU3B1IiwiZ2V0T3JkZXJTdGF0dXMiLCJnZXRPcmRlckRldGFpbCIsImNhbmNlbE9yZGVyIiwib3JkZXJFZGl0QWRkIiwiZ2V0Tm90aWNlIiwiZ2V0U2VydmljZSIsInBheVNlcnZpY2UiLCJnZXRTaWduQ29kZSIsImxvZ2luQnlQaG9uZSIsImFkZEFkZHJlc3MiLCJnZXRMb2dpc3RpYyIsImdldExvZ2lzdGljU3RhdHVzIiwic2V0Tmlja25hbWUiLCJnZXRSZWNvbW1lbmQiLCIkJHBhdGhIdG1sIiwicnVsZXMiLCJzZXJ2aWNlIiwicGFyYW0iLCJjb25zb2xlIiwibG9nIiwia2V5IiwidG9TdHJpbmciLCJuZXdLZXkiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsIm5ld1BhcmFtIiwiZm9yRWFjaCIsIml0ZW0iLCJzdHIiLCJzaWduIiwibWQ1IiwidG9VcHBlckNhc2UiLCJyZXMiLCJkYXRhIiwicmVxdWVzdFRpbWUiLCJmb3JtYXREYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInNpZ25hdHVyZSIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJmYWlsIiwiZXJyb3IiLCJjYiIsIl90aGlzIiwiZ2V0VGltZSIsInRoZW4iLCJnZXREYXRhIiwiY2F0Y2giLCJnZXRKc29uRGF0YSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsVzs7O0FBQ0wsd0JBQWU7QUFBQTs7QUFBQTs7QUFFZCxTQUFLQyxNQUFMLEdBQWMsa0VBQWQ7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLCtDQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBYztBQUNiQyxTQUFLLFFBRFE7QUFFYkMsaUJBQWMsMEJBRkQ7QUFHYjtBQUNBQyxhQUFVLG1CQUpHO0FBS2JDLGNBQVcsaUNBTEU7QUFNYkMsY0FBVywwQkFORTtBQU9iQyxjQUFXLHlCQVBFO0FBUWJDLFdBQVEsOEJBUks7QUFTYkMsV0FBUSwwQkFUSztBQVViQyxZQUFTLDRCQVZJO0FBV2JDLGdCQUFhLG1DQVhBO0FBWWJDLGtCQUFlLDZCQVpGO0FBYWJDLFdBQVEsd0JBYks7QUFjYkMsYUFBVSx1QkFkRztBQWViQyxnQkFBYSxrQ0FmQTtBQWdCYkMsZUFBWSxnQ0FoQkM7QUFpQmJDLGdCQUFhLDhCQWpCQTtBQWtCYkMsa0JBQWUsMkJBbEJGO0FBbUJiQyxZQUFTLHVDQW5CSTtBQW9CYkMsZUFBWSx5QkFwQkM7QUFxQmJDLFlBQVMsNEJBckJJO0FBc0JiQyxlQUFZLDRCQXRCQztBQXVCYkMsZUFBWSxrREF2QkM7QUF3QmJDLGdCQUFhLDRDQXhCQTtBQXlCYkMsa0JBQWUsZ0RBekJGO0FBMEJiQyxtQkFBZ0IsMENBMUJIO0FBMkJiQyxZQUFTLGlCQTNCSTtBQTRCYkMsZUFBWSx3QkE1QkM7QUE2QmJDLGdCQUFhLDJCQTdCQTtBQThCYkMsYUFBVSx3QkE5Qkc7QUErQmJDLGVBQVkseUJBL0JD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LEdBQWQsRUFBbUJoQixLQUFuQixDQUFYO0FBQ0Esb0JBQUs0QixPQUFMLENBQWE7QUFDWkMsV0FBSyxRQUFLL0UsTUFBTCxHQUFjLFFBQUtFLE1BQUwsQ0FBWXVDLFlBRG5CO0FBRVowQixZQUFNQSxJQUZNO0FBR1phLGNBQVEsS0FISTtBQUlBQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpSO0FBS1pDLGVBQVMsaUJBQUNmLElBQUQsRUFBVTtBQUNqQlMsZUFBUVQsSUFBUjtBQUNELE9BUFc7QUFRWmdCLFlBQU0sY0FBQ0MsS0FBRCxFQUFXO0FBQ2ZQLGNBQU9PLEtBQVA7QUFDRDtBQVZXLE1BQWI7QUFZQSxLQWRELEVBY0dNLEtBZEgsQ0FjUyxZQUFNO0FBQ1JMLFdBQU1BLElBQU47QUFDQSxLQWhCUDtBQWlCQSxJQWxCTSxDQUFQO0FBbUJBOzs7O0VBeGlDd0IsZUFBS08sRzs7a0JBMmlDaEI3RixXIiwiZmlsZSI6Ikh0dHBSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IE1kNSBmcm9tICcuL21kNS5qcydcclxuXHJcbmNsYXNzIEh0dHBSZXF1ZXN0IGV4dGVuZHMgd2VweS5hcHB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy4kJGJhc2UgPSAnaHR0cHM6Ly96c3Rlc3QuenNidXRjaGVyLmNuL3NtYXJ0U2hvcHBpbmcvYmFja2VuZC93ZWIvaW5kZXgucGhwPydcclxuXHRcdHRoaXMuJCRiYXNlSHRtbCA9ICdodHRwczovL3pzdGVzdC56c2J1dGNoZXIuY24vc21hcnRTaG9wcGluZy9oNS8nXHJcblx0XHR0aGlzLiQkcGF0aCA9IHtcclxuXHRcdFx0dGltZToncj10ZXN0JyxcclxuXHRcdFx0c2VuZFVzZXJJbmZvOiAncj13ZWNoYXQvYXBpLWdldC11bmlvbmlkJyxcclxuXHRcdFx0Ly8gc2VuZFVzZXJJbmZvOiAnaHR0cHM6Ly96c3Rlc3QuenNidXRjaGVyLmNuL3NtYXJ0V2Ivc3RvcmUvd2ViL2luZGV4LnBocD9yPWZvcmx1bHUvZW5jcnlwdGUtZGF0YScsXHJcblx0XHRcdHNlbmRDb2RlOiAncj13ZWNoYXQvYXBpLWF1dGgnLFxyXG5cdFx0XHR1c2VybG9naW46ICdyPW1lbWJlci9hcGktZ2V0LXRva2VuLWJ5LXBob25lJyxcclxuXHRcdFx0aW5kZXhMaXN0OiAncj1yZWNvbW1lbmQvYXBpLWdldC1zcHVzJyxcclxuXHRcdFx0Z2V0QmFubmVyOiAncj1iYW5uZXIvYXBpLWdldC1iYW5uZXInLFxyXG5cdFx0XHRkZXRhaWw6ICdyPXByb2R1Y3QvYXBpLWdldC1zcHUtZGV0YWlsJyxcclxuXHRcdFx0c2VhcmNoOiAncj1wcm9kdWN0L2FwaS1zZWFyY2gtc3B1JyxcclxuXHRcdFx0YWRkY2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktdXBkYXRlJyxcclxuXHRcdFx0dG9wQ2F0ZWdvcnk6ICdyPWNhdGVnb3J5L2FwaS1nZXQtdG9wLWNhdGVnb3JpZXMnLFxyXG5cdFx0XHRjaGlsZENhdGVnb3J5OiAncj1jYXRlZ29yeS9hcGktZ2V0LWNoaWxkcmVuJyxcclxuXHRcdFx0Z2V0U3B1OiAncj1jYXRlZ29yeS9hcGktZ2V0LXNwdScsXHJcblx0XHRcdHVzZXJJbmZvOiAncj1tZW1iZXIvYXBpLWdldC1pbmZvJyxcclxuXHRcdFx0b3JkZXJTdGF0dXM6ICdyPW9yZGVyL2FwaS1nZXQtb3JkZXItc3RhdGlzdGljcycsXHJcblx0XHRcdGdldEFkZHJlc3M6ICdyPWFkZHJlc3MvYXBpLWdldC1hZGRyZXNzLWxpc3QnLFxyXG5cdFx0XHRlZGl0QWRkcmVzczogJ3I9YWRkcmVzcy9hcGktdXBkYXRlLWFkZHJlc3MnLFxyXG5cdFx0XHRkZWxldGVBZGRyZXNzOiAncj1hZGRyZXNzL2FwaS1kZWwtYWRkcmVzcycsXHJcblx0XHRcdGdldENhcnQ6ICdyPXNob3BwaW5nLWNhcnQvYXBpLWdldC1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0ZGVsZXRlQ2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktZGVsJyxcclxuXHRcdFx0dG9wQXJlYTogJ3I9YXJlYS9hcGktZ2V0LWNoaWxkLWFyZWFzJyxcclxuXHRcdFx0ZGV0YWlsQXJlYTogJ3I9YXJlYS9hcGktZ2V0LWFyZWEmYXJlYUlkJyxcclxuXHRcdFx0YXBwbHlPcmRlcjogJ3I9YnV5aW5nL2FwaS1hcHBseS1jcmVhdGUtb3JkZXItYnktc2hvcHBpbmctY2FydCcsXHJcblx0XHRcdGNyZWF0ZU9yZGVyOiAncj1idXlpbmcvYXBpLWNyZWF0ZS1vcmRlci1ieS1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0YXBwbHlPcmRlckJ1eTogJ3I9YnV5aW5nL2FwaS1hcHBseS1jcmVhdGUtb3JkZXItYnktZmFzdC1idXlpbmcnLFxyXG5cdFx0XHRjcmVhdGVPcmRlckJ1eTogJ3I9YnV5aW5nL2FwaS1jcmVhdGUtb3JkZXItYnktZmFzdC1idXlpbmcnLFxyXG5cdFx0XHRzZXRNYXJrOiAncj1tYXJrL2FwaS1tYXJrJyxcclxuXHRcdFx0Y2FuY2VsTWFyazogJ3I9bWFyay9hcGktY2FuY2VsLW1hcmsnLFxyXG5cdFx0XHRnZXRNYXJrVXNlcjogJ3I9bWFyay9hcGktZ2V0LWNvbGxlY3RvcnMnLFxyXG5cdFx0XHRnZXRPcmRlcjogJ3I9b3JkZXIvYXBpLWdldC1kZXRhaWwnLFxyXG5cdFx0XHRnZXRNYXJrU3B1OiAncj1tYXJrL2FwaS1nZXQtbWFyay1zcHUnLFxyXG5cdFx0XHRnZXRPcmRlclN0YXR1czogJ3I9b3JkZXIvYXBpLWdldC1vcmRlcnMnLFxyXG5cdFx0XHRnZXRPcmRlckRldGFpbDogJ3I9b3JkZXIvYXBpLWdldC1kZXRhaWwnLFxyXG5cdFx0XHRjYW5jZWxPcmRlcjogJ3I9b3JkZXIvYXBpLWNhbmNlbCcsXHJcblx0XHRcdG9yZGVyRWRpdEFkZDogJ3I9b3JkZXIvYXBpLWNoYW5nZS1hZGRyZXNzJyxcclxuXHRcdFx0Z2V0Tm90aWNlOiAncj1ub3RpY2UvYXBpLWdldC1ub3RpY2UnLFxyXG5cdFx0XHRnZXRTZXJ2aWNlOiAncj12aXJ0dWFsLWl0ZW0vYXBpLWdldC12aXJ0dWFsLWl0ZW0nLFxyXG5cdFx0XHRwYXlTZXJ2aWNlOiAncj1idXlpbmcvYXBpLWFwcGx5LXBheScsXHJcblx0XHRcdGdldFNpZ25Db2RlOiAncj1tZW1iZXIvYXBpLWFwcGx5LXNpZ24taW4tYnktcGhvbmUnLFxyXG5cdFx0XHRsb2dpbkJ5UGhvbmU6ICdyPW1lbWJlci9hcGktc2lnbi11cC1vci1zaWduLWluJyxcclxuXHRcdFx0YWRkQWRkcmVzczogJ3I9YWRkcmVzcy9hcGktYWRkLWFkZHJlc3MnLFxyXG5cdFx0XHRnZXRMb2dpc3RpYzogJ3I9b3JkZXIvYXBpLWdldC1sb2dpc3RpY3MtbGlzdCcsXHJcblx0XHRcdGdldExvZ2lzdGljU3RhdHVzOiAncj1vcmRlci9hcGktZ2V0LWxvZ2lzdGljcy1kZXRhaWwnLFxyXG5cdFx0XHRzZXROaWNrbmFtZTogJ3I9bWVtYmVyL2FwaS11cGxvYWQtbmlja25hbWUnLFxyXG5cdFx0XHRnZXRSZWNvbW1lbmQ6ICdyPXByb2R1Y3QvYXBpLWdldC1yZWNvbW1lbmQtc3B1cydcclxuXHRcdH1cclxuXHRcdHRoaXMuJCRwYXRoSHRtbCA9IHtcclxuXHRcdFx0cnVsZXM6ICdkaXN0cmlidXRpb25fcnVsZXMuaHRtbCcsXHJcblx0XHRcdHNlcnZpY2U6ICd2aXBfc2VydmljZV9hZ3JlZW1lbnQuaHRtbCdcclxuXHRcdH1cclxuXHR9XHJcblx0Z2V0UGF5U2lnbiAocGFyYW0pIHtcclxuXHRcdGNvbnNvbGUubG9nKHBhcmFtKVxyXG5cdFx0Zm9yICh2YXIga2V5IGluIHBhcmFtKSB7XHJcblx0XHRcdHBhcmFtW2tleV0gPSBwYXJhbVtrZXldLnRvU3RyaW5nKClcclxuXHRcdH1cclxuXHRcdHZhciBuZXdLZXkgPSBPYmplY3Qua2V5cyhwYXJhbSkuc29ydCgpXHJcblx0XHR2YXIgbmV3UGFyYW0gPSB7fVxyXG5cdFx0bmV3S2V5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0bmV3UGFyYW1baXRlbV0gPSBwYXJhbVtpdGVtXVxyXG5cdFx0fSlcclxuXHRcdHZhciBzdHIgPSAnJ1xyXG5cdFx0Zm9yICh2YXIga2V5IGluIG5ld1BhcmFtKSB7XHJcblx0XHRcdHN0ciArPSAga2V5ICsgJz0nICsgbmV3UGFyYW1ba2V5XSArICcmJ1xyXG5cdFx0fVxyXG5cdFx0c3RyICs9ICdrZXk9ZHpwa1U1SXRhRmk0STVHb3JhZWhkOGFtaHM1cFpoMXcnXHJcblx0XHR2YXIgc2lnbiA9IE1kNS5tZDUoc3RyKS50b1VwcGVyQ2FzZSgpXHJcblx0XHRyZXR1cm4gc2lnblxyXG5cdH1cclxuXHRmb3JtYXREYXRhIChyZXMsIHBhcmFtKSB7XHJcblx0XHR2YXIgdGltZSA9IHJlcy5kYXRhLnRvU3RyaW5nKClcclxuXHRcdHBhcmFtLnJlcXVlc3RUaW1lID0gdGltZVxyXG5cdFx0Zm9yICh2YXIga2V5IGluIHBhcmFtKSB7XHJcblx0XHRcdHBhcmFtW2tleV0gPSBwYXJhbVtrZXldLnRvU3RyaW5nKClcclxuXHRcdH1cclxuXHRcdHZhciBuZXdLZXkgPSBPYmplY3Qua2V5cyhwYXJhbSkuc29ydCgpXHJcblx0XHR2YXIgbmV3UGFyYW0gPSB7fVxyXG5cdFx0bmV3S2V5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0bmV3UGFyYW1baXRlbV0gPSBwYXJhbVtpdGVtXVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiBuZXdQYXJhbVxyXG5cdH1cclxuXHRnZXREYXRhIChyZXMsIHBhcmFtKSB7XHJcblx0XHR2YXIgbmV3UGFyYW0gPSB0aGlzLmZvcm1hdERhdGEocmVzLCBwYXJhbSlcclxuXHRcdHZhciBzaWduID0gSlNPTi5zdHJpbmdpZnkobmV3UGFyYW0pICsgJ15aUzIwMThMQ0onXHJcblx0XHRuZXdQYXJhbS5zaWduYXR1cmUgPSBNZDUubWQ1KHNpZ24pLnRvTG93ZXJDYXNlKClcclxuXHRcdHJldHVybiBuZXdQYXJhbVxyXG5cdH1cclxuXHRnZXRKc29uRGF0YSAocmVzLCBwYXJhbSkge1xyXG5cdFx0dmFyIG5ld1BhcmFtID0gdGhpcy5mb3JtYXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHR2YXIgc2lnbiA9IEpTT04uc3RyaW5naWZ5KG5ld1BhcmFtKS5yZXBsYWNlKC9cXFxcL2csICcnKSArICdeWlMyMDE4TENKJ1xyXG5cdFx0Y29uc29sZS5sb2coc2lnbilcclxuXHRcdG5ld1BhcmFtLnNpZ25hdHVyZSA9IE1kNS5tZDUoc2lnbikudG9Mb3dlckNhc2UoKVxyXG5cdFx0cmV0dXJuIG5ld1BhcmFtXHJcblx0fVxyXG5cdGdldFRpbWUgKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudGltZSxcclxuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0XHRcdGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRTZW5kQ29kZSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcbiAgICAgICAgXHRcdHdlcHkucmVxdWVzdCh7XHJcblx0ICAgICAgICAgICAgXHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguc2VuZENvZGUsXHJcblx0ICAgICAgICAgICAgXHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICBcdGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgXHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0ICAgICAgICAgICAgfSlcclxuICAgICAgICBcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuICAgICAgICB9KVxyXG5cdH1cclxuXHRTZW5kVXNlckluZm8gKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgXHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgXHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG4gICAgICAgIFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdCAgICAgICAgICAgIFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNlbmRVc2VySW5mbyxcclxuXHQgICAgICAgICAgICBcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgIFx0aGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICBcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHQgICAgICAgICAgICB9KVxyXG4gICAgICAgIFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG4gICAgICAgIH0pXHJcblx0fVxyXG5cdFVzZXJMb2dpbiAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcbiAgICAgICAgXHRcdHdlcHkucmVxdWVzdCh7XHJcblx0ICAgICAgICAgICAgXHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudXNlcmxvZ2luLFxyXG5cdCAgICAgICAgICAgIFx0ZGF0YTogZGF0YSxcclxuXHQgICAgICAgICAgICBcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgXHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdCAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcbiAgICAgICAgfSlcclxuXHR9XHJcblx0U2V0Tmlja25hbWUgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgXHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgXHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG4gICAgICAgIFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdCAgICAgICAgICAgIFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNldE5pY2tuYW1lLFxyXG5cdCAgICAgICAgICAgIFx0ZGF0YTogZGF0YSxcclxuXHQgICAgICAgICAgICBcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgXHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdCAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcbiAgICAgICAgfSlcclxuXHR9XHJcblx0SW5kZXhIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmluZGV4TGlzdCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldEJhbm5lciAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRCYW5uZXIsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHREZXRhaWxIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRldGFpbCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHRcdC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRBZGRDYXJ0SHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hZGRjYXJ0LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VG9wQ2F0ZWdvcnkgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudG9wQ2F0ZWdvcnksXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRDaGlsZENhdGVnb3J5IChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNoaWxkQ2F0ZWdvcnksXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRTcHVIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldFNwdSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFJlY29tbWVuZCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRSZWNvbW1lbmQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRTZXRNYXJrSHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5zZXRNYXJrLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q2FuY2VsTWFya0h0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2FuY2VsTWFyayxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE1hcmtVc2VyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE1hcmtVc2VyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0TWFya1NwdSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRNYXJrU3B1LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0Q2FydEh0dHAgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0Q2FydCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERlbGV0ZUNhcnRIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldEpzb25EYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRlbGV0ZUNhcnQsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFVzZXJJbmZvIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnVzZXJJbmZvLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VXNlck9yZGVyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLm9yZGVyU3RhdHVzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q3JlYXRlVXNlck9yZGVyIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNyZWF0ZU9yZGVyLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRDcmVhdGVPcmRlckJ1eSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5jcmVhdGVPcmRlckJ1eSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q2FuY2VsT3JkZXIgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2FuY2VsT3JkZXIsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEVkaXRPcmRlckFkZCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5vcmRlckVkaXRBZGQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldEFkZHJlc3MsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRBZGRBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFkZEFkZHJlc3MsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEVkaXRBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmVkaXRBZGRyZXNzLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHREZWxldGVBZGRyZXNzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRlbGV0ZUFkZHJlc3MsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRBcHBseU9yZGVySHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hcHBseU9yZGVyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0QXBwbHlPcmRlckJ1eSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hcHBseU9yZGVyQnV5LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0T3JkZXJIdHRwIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE9yZGVyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0T3JkZXJTdGF0dXMgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0T3JkZXJTdGF0dXMsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRPcmRlckRldGFpbCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRPcmRlckRldGFpbCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFRvcEFyZWEgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudG9wQXJlYSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldERldGFpbEFyZWEgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZGV0YWlsQXJlYSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE5vdGljZSAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXROb3RpY2UsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRTZXJ2aWNlIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldFNlcnZpY2UsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRQYXlTZXJ2aWNlIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnBheVNlcnZpY2UsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRMb2dpc3RpYyAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRMb2dpc3RpYyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBcdFx0Y2IgJiYgY2IoKVxyXG4gICAgICAgIFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldExvZ2lzdGljU3RhdHVzIChwYXJhbSwgY2IpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldExvZ2lzdGljU3RhdHVzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0U2VhcmNoSHR0cCAocGFyYW0sIGNiKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNlYXJjaCxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0U2lnbkNvZGUgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0U2lnbkNvZGUsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgXHRcdGNiICYmIGNiKClcclxuICAgICAgICBcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRMb2dpbkJ5UGhvbmUgKHBhcmFtLCBjYikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgubG9naW5CeVBob25lLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFx0XHRjYiAmJiBjYigpXHJcbiAgICAgICAgXHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0dHBSZXF1ZXN0Il19