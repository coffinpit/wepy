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
			getOrderStatus: 'r=order/api-get-orders'
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
		value: function UserLogin(param) {
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
				});
			});
		}
	}, {
		key: 'IndexHttp',
		value: function IndexHttp(param) {
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
				});
			});
		}
	}, {
		key: 'DetailHttp',
		value: function DetailHttp(param) {
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
				});
			});
		}
	}, {
		key: 'AddCartHttp',
		value: function AddCartHttp(param) {
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
				});
			});
		}
	}, {
		key: 'GetTopCategory',
		value: function GetTopCategory(param) {
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
				});
			});
		}
	}, {
		key: 'GetChildCategory',
		value: function GetChildCategory(param) {
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
				});
			});
		}
	}, {
		key: 'GetSpuHttp',
		value: function GetSpuHttp(param) {
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
				});
			});
		}
	}, {
		key: 'SetMarkHttp',
		value: function SetMarkHttp(param) {
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
				});
			});
		}
	}, {
		key: 'CancelMarkHttp',
		value: function CancelMarkHttp(param) {
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
				});
			});
		}
	}, {
		key: 'GetMarkUser',
		value: function GetMarkUser(param) {
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
				});
			});
		}
	}, {
		key: 'GetMarkSpu',
		value: function GetMarkSpu(param) {
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
				});
			});
		}
	}, {
		key: 'GetCartHttp',
		value: function GetCartHttp(param) {
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
				});
			});
		}
	}, {
		key: 'DeleteCartHttp',
		value: function DeleteCartHttp(param) {
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
				});
			});
		}
	}, {
		key: 'GetUserInfo',
		value: function GetUserInfo(param) {
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
				});
			});
		}
	}, {
		key: 'GetUserOrder',
		value: function GetUserOrder(param) {
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
				});
			});
		}
	}, {
		key: 'CreateUserOrder',
		value: function CreateUserOrder(param) {
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
				});
			});
		}
	}, {
		key: 'CreateOrderBuy',
		value: function CreateOrderBuy(param) {
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
				});
			});
		}
	}, {
		key: 'GetAddress',
		value: function GetAddress(param) {
			var _this21 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this21.$$base + _this21.$$path.getAddress,
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
				});
			});
		}
	}, {
		key: 'EditAddress',
		value: function EditAddress(param) {
			var _this22 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this22.$$base + _this22.$$path.editAddress,
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
				});
			});
		}
	}, {
		key: 'DeleteAddress',
		value: function DeleteAddress(param) {
			var _this23 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this23.$$base + _this23.$$path.deleteAddress,
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
				});
			});
		}
	}, {
		key: 'ApplyOrderHttp',
		value: function ApplyOrderHttp(param) {
			var _this24 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this24.$$base + _this24.$$path.applyOrder,
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
				});
			});
		}
	}, {
		key: 'ApplyOrderBuy',
		value: function ApplyOrderBuy(param) {
			var _this25 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this25.$$base + _this25.$$path.applyOrderBuy,
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
				});
			});
		}
	}, {
		key: 'GetOrderHttp',
		value: function GetOrderHttp(param) {
			var _this26 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this26.$$base + _this26.$$path.getOrder,
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
				});
			});
		}
	}, {
		key: 'GetOrderStatus',
		value: function GetOrderStatus(param) {
			var _this27 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this27.$$base + _this27.$$path.getOrderStatus,
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
		key: 'SearchHttp',
		value: function SearchHttp(param) {
			var _this28 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this28.$$base + _this28.$$path.search,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRiYXNlSHRtbCIsIiQkcGF0aCIsInRpbWUiLCJ1c2VybG9naW4iLCJpbmRleExpc3QiLCJkZXRhaWwiLCJzZWFyY2giLCJhZGRjYXJ0IiwidG9wQ2F0ZWdvcnkiLCJjaGlsZENhdGVnb3J5IiwiZ2V0U3B1IiwidXNlckluZm8iLCJvcmRlclN0YXR1cyIsImdldEFkZHJlc3MiLCJlZGl0QWRkcmVzcyIsImRlbGV0ZUFkZHJlc3MiLCJnZXRDYXJ0IiwiZGVsZXRlQ2FydCIsInRvcEFyZWEiLCJhcHBseU9yZGVyIiwiY3JlYXRlT3JkZXIiLCJhcHBseU9yZGVyQnV5IiwiY3JlYXRlT3JkZXJCdXkiLCJzZXRNYXJrIiwiY2FuY2VsTWFyayIsImdldE1hcmtVc2VyIiwiZ2V0T3JkZXIiLCJnZXRNYXJrU3B1IiwiZ2V0T3JkZXJTdGF0dXMiLCIkJHBhdGhIdG1sIiwicnVsZXMiLCJyZXMiLCJwYXJhbSIsImRhdGEiLCJ0b1N0cmluZyIsInJlcXVlc3RUaW1lIiwia2V5IiwibmV3S2V5IiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJuZXdQYXJhbSIsImZvckVhY2giLCJpdGVtIiwic2lnbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJzaWduYXR1cmUiLCJoZXhNRDUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwiZmFpbCIsImVycm9yIiwiX3RoaXMiLCJnZXRUaW1lIiwidGhlbiIsImdldERhdGEiLCJjb25zb2xlIiwibG9nIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxXOzs7QUFDTCx3QkFBZTtBQUFBOztBQUFBOztBQUVkLFNBQUtDLE1BQUwsR0FBYyxrRUFBZDtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsK0NBQWxCO0FBQ0EsU0FB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QUFNLGNBQUNDLEtBQUQsRUFBVztBQUNmUCxjQUFPTyxLQUFQO0FBQ0Q7QUFWVyxNQUFiO0FBWUEsS0FmRDtBQWdCQSxJQWpCTSxDQUFQO0FBa0JBOzs7O0VBeGtCd0IsZUFBS08sRztBQTBrQi9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7a0JBRWVuRSxXIiwiZmlsZSI6Ikh0dHBSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IE1kNSBmcm9tICcuL21kNS5qcydcclxuXHJcbmNsYXNzIEh0dHBSZXF1ZXN0IGV4dGVuZHMgd2VweS5hcHB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy4kJGJhc2UgPSAnaHR0cHM6Ly96c3Rlc3QuenNidXRjaGVyLmNuL3NtYXJ0U2hvcHBpbmcvYmFja2VuZC93ZWIvaW5kZXgucGhwPydcclxuXHRcdHRoaXMuJCRiYXNlSHRtbCA9ICdodHRwczovL3pzdGVzdC56c2J1dGNoZXIuY24vc21hcnRTaG9wcGluZy9oNS8nXHJcblx0XHR0aGlzLiQkcGF0aCA9IHtcclxuXHRcdFx0dGltZToncj10ZXN0JyxcclxuXHRcdFx0dXNlcmxvZ2luOiAncj1tZW1iZXIvYXBpLWdldC10b2tlbi1ieS1waG9uZScsXHJcblx0XHRcdGluZGV4TGlzdDogJ3I9cmVjb21tZW5kL2FwaS1nZXQtc3B1cycsXHJcblx0XHRcdGRldGFpbDogJ3I9cHJvZHVjdC9hcGktZ2V0LXNwdS1kZXRhaWwnLFxyXG5cdFx0XHRzZWFyY2g6ICdyPXByb2R1Y3QvYXBpLXNlYXJjaC1zcHUnLFxyXG5cdFx0XHRhZGRjYXJ0OiAncj1zaG9wcGluZy1jYXJ0L2FwaS11cGRhdGUnLFxyXG5cdFx0XHR0b3BDYXRlZ29yeTogJ3I9Y2F0ZWdvcnkvYXBpLWdldC10b3AtY2F0ZWdvcmllcycsXHJcblx0XHRcdGNoaWxkQ2F0ZWdvcnk6ICdyPWNhdGVnb3J5L2FwaS1nZXQtY2hpbGRyZW4nLFxyXG5cdFx0XHRnZXRTcHU6ICdyPWNhdGVnb3J5L2FwaS1nZXQtc3B1JyxcclxuXHRcdFx0dXNlckluZm86ICdyPW1lbWJlci9hcGktZ2V0LWluZm8nLFxyXG5cdFx0XHRvcmRlclN0YXR1czogJ3I9b3JkZXIvYXBpLWdldC1vcmRlci1zdGF0aXN0aWNzJyxcclxuXHRcdFx0Z2V0QWRkcmVzczogJ3I9YWRkcmVzcy9hcGktZ2V0LWFkZHJlc3MtbGlzdCcsXHJcblx0XHRcdGVkaXRBZGRyZXNzOiAncj1hZGRyZXNzL2FwaS11cGRhdGUtYWRkcmVzcycsXHJcblx0XHRcdGRlbGV0ZUFkZHJlc3M6ICdyPWFkZHJlc3MvYXBpLWRlbC1hZGRyZXNzJyxcclxuXHRcdFx0Z2V0Q2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktZ2V0LXNob3BwaW5nLWNhcnQnLFxyXG5cdFx0XHRkZWxldGVDYXJ0OiAncj1zaG9wcGluZy1jYXJ0L2FwaS1kZWwnLFxyXG5cdFx0XHR0b3BBcmVhOiAncj1hcmVhL2FwaS1nZXQtdG9wLWFyZWFzJyxcclxuXHRcdFx0YXBwbHlPcmRlcjogJ3I9YnV5aW5nL2FwaS1hcHBseS1jcmVhdGUtb3JkZXItYnktc2hvcHBpbmctY2FydCcsXHJcblx0XHRcdGNyZWF0ZU9yZGVyOiAncj1idXlpbmcvYXBpLWNyZWF0ZS1vcmRlci1ieS1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0YXBwbHlPcmRlckJ1eTogJ3I9YnV5aW5nL2FwaS1hcHBseS1jcmVhdGUtb3JkZXItYnktZmFzdC1idXlpbmcnLFxyXG5cdFx0XHRjcmVhdGVPcmRlckJ1eTogJ3I9YnV5aW5nL2FwaS1jcmVhdGUtb3JkZXItYnktZmFzdC1idXlpbmcnLFxyXG5cdFx0XHRzZXRNYXJrOiAncj1tYXJrL2FwaS1tYXJrJyxcclxuXHRcdFx0Y2FuY2VsTWFyazogJ3I9bWFyay9hcGktY2FuY2VsLW1hcmsnLFxyXG5cdFx0XHRnZXRNYXJrVXNlcjogJ3I9bWFyay9hcGktZ2V0LWNvbGxlY3RvcnMnLFxyXG5cdFx0XHRnZXRPcmRlcjogJ3I9b3JkZXIvYXBpLWdldC1kZXRhaWwnLFxyXG5cdFx0XHRnZXRNYXJrU3B1OiAncj1tYXJrL2FwaS1nZXQtbWFyay1zcHUnLFxyXG5cdFx0XHRnZXRPcmRlclN0YXR1czogJ3I9b3JkZXIvYXBpLWdldC1vcmRlcnMnXHJcblx0XHR9XHJcblx0XHR0aGlzLiQkcGF0aEh0bWwgPSB7XHJcblx0XHRcdHJ1bGVzOiAnZGlzdHJpYnV0aW9uX3J1bGVzLmh0bWwnXHJcblx0XHR9XHJcblx0fVxyXG5cdGdldERhdGEgKHJlcywgcGFyYW0pIHtcclxuXHRcdHZhciB0aW1lID0gcmVzLmRhdGEudG9TdHJpbmcoKVxyXG5cdFx0cGFyYW0ucmVxdWVzdFRpbWUgPSB0aW1lXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gcGFyYW0pIHtcclxuXHRcdFx0cGFyYW1ba2V5XSA9IHBhcmFtW2tleV0udG9TdHJpbmcoKVxyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld0tleSA9IE9iamVjdC5rZXlzKHBhcmFtKS5zb3J0KClcclxuXHRcdHZhciBuZXdQYXJhbSA9IHt9XHJcblx0XHRuZXdLZXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRuZXdQYXJhbVtpdGVtXSA9IHBhcmFtW2l0ZW1dXHJcblx0XHR9KVxyXG5cdFx0dmFyIHNpZ24gPSBKU09OLnN0cmluZ2lmeShuZXdQYXJhbSkgKyAnXlpTMjAxOExDSidcclxuXHRcdG5ld1BhcmFtLnNpZ25hdHVyZSA9IE1kNS5oZXhNRDUoc2lnbilcclxuXHRcdHJldHVybiBuZXdQYXJhbVxyXG5cdH1cclxuXHRnZXRUaW1lICgpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnRpbWUsXHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0XHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0VXNlckxvZ2luIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgXHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgXHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG4gICAgICAgIFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdCAgICAgICAgICAgIFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnVzZXJsb2dpbixcclxuXHQgICAgICAgICAgICBcdGRhdGE6IGRhdGEsXHJcblx0ICAgICAgICAgICAgXHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgIFx0aGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHQgICAgICAgICAgICB9KVxyXG4gICAgICAgIFx0fSlcclxuICAgICAgICB9KVxyXG5cdH1cclxuXHRJbmRleEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5pbmRleExpc3QsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RGV0YWlsSHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRldGFpbCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRBZGRDYXJ0SHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmFkZGNhcnQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VG9wQ2F0ZWdvcnkgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50b3BDYXRlZ29yeSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRDaGlsZENhdGVnb3J5IChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2hpbGRDYXRlZ29yeSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRTcHVIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0U3B1LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFNldE1hcmtIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguc2V0TWFyayxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRDYW5jZWxNYXJrSHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNhbmNlbE1hcmssXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0TWFya1VzZXIgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRNYXJrVXNlcixcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRNYXJrU3B1IChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0TWFya1NwdSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRDYXJ0SHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldENhcnQsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RGVsZXRlQ2FydEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRlbGV0ZUNhcnQsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRVc2VySW5mbyAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnVzZXJJbmZvLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFVzZXJPcmRlciAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLm9yZGVyU3RhdHVzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdENyZWF0ZVVzZXJPcmRlciAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNyZWF0ZU9yZGVyLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q3JlYXRlT3JkZXJCdXkgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5jcmVhdGVPcmRlckJ1eSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldEFkZHJlc3MgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRBZGRyZXNzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEVkaXRBZGRyZXNzIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZWRpdEFkZHJlc3MsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RGVsZXRlQWRkcmVzcyAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRlbGV0ZUFkZHJlc3MsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0QXBwbHlPcmRlckh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hcHBseU9yZGVyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEFwcGx5T3JkZXJCdXkgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hcHBseU9yZGVyQnV5LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE9yZGVySHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldE9yZGVyLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE9yZGVyU3RhdHVzIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0T3JkZXJTdGF0dXMsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VG9wQXJlYSAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdHVybDogJ2h0dHBzOi8vYXBwMS56aGVuZ3NoYW4uc3RvcmUvc21hcnRBcmVhL2JhY2tlbmQvd2ViL2luZGV4LnBocCcsXHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRTZWFyY2hIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5zZWFyY2gsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXF1ZXN0VGVzdCAocGFyYW1zMSwgcGFyYW1zMikge1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vIFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG4vLyBcdFx0ICB1cmw6ICdodHRwczovL3d3dy5tYWRjb2Rlci5jbi90ZXN0cy9zbGVlcC5waHA/dGltZT0xJnQ9Y3NzJmM9JyArIHBhcmFtczEgKyAnJmk9JyArIHBhcmFtczIsXHJcbi8vIFx0XHQgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbi8vIFx0XHQgIFx0cmVzb2x2ZShkYXRhKVxyXG4vLyBcdFx0ICB9XHJcbi8vIFx0ICAgIH0pXHJcbi8vIFx0fSlcclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVXNlckxvZ2luIChwYXJhbSkge1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vIFx0XHR3ZXB5LmxvZ2luKHtcclxuLy8gXHRcdCAgc3VjY2VzczogKHJlcykgPT57XHJcbi8vIFx0XHQgICAgcmVzb2x2ZShyZXMpXHJcbi8vIFx0XHQgIH1cclxuLy8gXHRcdH0pXHJcbi8vIFx0fSlcclxuLy8gfSBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0dHBSZXF1ZXN0Il19