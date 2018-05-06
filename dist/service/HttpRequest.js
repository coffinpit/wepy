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
			getOrder: 'r=order/api-get-detail',
			setMark: 'r=mark/api-mark',
			cancelMark: 'r=mark/api-cancel-mark',
			getMarkUser: 'r=mark/api-get-collectors'
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
		key: 'GetCartHttp',
		value: function GetCartHttp(param) {
			var _this14 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this14.$$base + _this14.$$path.getCart,
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
			var _this15 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this15.$$base + _this15.$$path.deleteCart,
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
			var _this16 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this16.$$base + _this16.$$path.userInfo,
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
			var _this17 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this17.$$base + _this17.$$path.orderStatus,
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
		key: 'GetAddress',
		value: function GetAddress(param) {
			var _this18 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this18.$$base + _this18.$$path.getAddress,
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
			var _this19 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this19.$$base + _this19.$$path.editAddress,
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
			var _this20 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this20.$$base + _this20.$$path.deleteAddress,
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
			var _this21 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this21.$$base + _this21.$$path.applyOrder,
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
			var _this22 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this22.$$base + _this22.$$path.getOrder,
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
			var _this23 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this23.$$base + _this23.$$path.search,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRiYXNlSHRtbCIsIiQkcGF0aCIsInRpbWUiLCJ1c2VybG9naW4iLCJpbmRleExpc3QiLCJkZXRhaWwiLCJzZWFyY2giLCJhZGRjYXJ0IiwidG9wQ2F0ZWdvcnkiLCJjaGlsZENhdGVnb3J5IiwiZ2V0U3B1IiwidXNlckluZm8iLCJvcmRlclN0YXR1cyIsImdldEFkZHJlc3MiLCJlZGl0QWRkcmVzcyIsImRlbGV0ZUFkZHJlc3MiLCJnZXRDYXJ0IiwiZGVsZXRlQ2FydCIsInRvcEFyZWEiLCJhcHBseU9yZGVyIiwiZ2V0T3JkZXIiLCJzZXRNYXJrIiwiY2FuY2VsTWFyayIsImdldE1hcmtVc2VyIiwiJCRwYXRoSHRtbCIsInJ1bGVzIiwicmVzIiwicGFyYW0iLCJkYXRhIiwidG9TdHJpbmciLCJyZXF1ZXN0VGltZSIsImtleSIsIm5ld0tleSIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwibmV3UGFyYW0iLCJmb3JFYWNoIiwiaXRlbSIsInNpZ24iLCJKU09OIiwic3RyaW5naWZ5Iiwic2lnbmF0dXJlIiwiaGV4TUQ1IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsImZhaWwiLCJlcnJvciIsIl90aGlzIiwiZ2V0VGltZSIsInRoZW4iLCJnZXREYXRhIiwiY29uc29sZSIsImxvZyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsVzs7O0FBQ0wsd0JBQWU7QUFBQTs7QUFBQTs7QUFFZCxTQUFLQyxNQUFMLEdBQWMsa0VBQWQ7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLCtDQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBYztBQUNiQyxTQUFLLFFBRFE7QUFFYkMsY0FBVyxpQ0FGRTtBQUdiQyxjQUFXLDBCQUhFO0FBSWJDLFdBQVEsOEJB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S0FBUDtBQUNEO0FBVlcsTUFBYjtBQVlBLEtBZkQ7QUFnQkEsSUFqQk0sQ0FBUDtBQWtCQTs7OztFQS9kd0IsZUFBS08sRztBQWllL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkFFZTlELFciLCJmaWxlIjoiSHR0cFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTWQ1IGZyb20gJy4vbWQ1LmpzJ1xyXG5cclxuY2xhc3MgSHR0cFJlcXVlc3QgZXh0ZW5kcyB3ZXB5LmFwcHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLiQkYmFzZSA9ICdodHRwczovL3pzdGVzdC56c2J1dGNoZXIuY24vc21hcnRTaG9wcGluZy9iYWNrZW5kL3dlYi9pbmRleC5waHA/J1xyXG5cdFx0dGhpcy4kJGJhc2VIdG1sID0gJ2h0dHBzOi8venN0ZXN0LnpzYnV0Y2hlci5jbi9zbWFydFNob3BwaW5nL2g1LydcclxuXHRcdHRoaXMuJCRwYXRoID0ge1xyXG5cdFx0XHR0aW1lOidyPXRlc3QnLFxyXG5cdFx0XHR1c2VybG9naW46ICdyPW1lbWJlci9hcGktZ2V0LXRva2VuLWJ5LXBob25lJyxcclxuXHRcdFx0aW5kZXhMaXN0OiAncj1yZWNvbW1lbmQvYXBpLWdldC1zcHVzJyxcclxuXHRcdFx0ZGV0YWlsOiAncj1wcm9kdWN0L2FwaS1nZXQtc3B1LWRldGFpbCcsXHJcblx0XHRcdHNlYXJjaDogJ3I9cHJvZHVjdC9hcGktc2VhcmNoLXNwdScsXHJcblx0XHRcdGFkZGNhcnQ6ICdyPXNob3BwaW5nLWNhcnQvYXBpLXVwZGF0ZScsXHJcblx0XHRcdHRvcENhdGVnb3J5OiAncj1jYXRlZ29yeS9hcGktZ2V0LXRvcC1jYXRlZ29yaWVzJyxcclxuXHRcdFx0Y2hpbGRDYXRlZ29yeTogJ3I9Y2F0ZWdvcnkvYXBpLWdldC1jaGlsZHJlbicsXHJcblx0XHRcdGdldFNwdTogJ3I9Y2F0ZWdvcnkvYXBpLWdldC1zcHUnLFxyXG5cdFx0XHR1c2VySW5mbzogJ3I9bWVtYmVyL2FwaS1nZXQtaW5mbycsXHJcblx0XHRcdG9yZGVyU3RhdHVzOiAncj1vcmRlci9hcGktZ2V0LW9yZGVyLXN0YXRpc3RpY3MnLFxyXG5cdFx0XHRnZXRBZGRyZXNzOiAncj1hZGRyZXNzL2FwaS1nZXQtYWRkcmVzcy1saXN0JyxcclxuXHRcdFx0ZWRpdEFkZHJlc3M6ICdyPWFkZHJlc3MvYXBpLXVwZGF0ZS1hZGRyZXNzJyxcclxuXHRcdFx0ZGVsZXRlQWRkcmVzczogJ3I9YWRkcmVzcy9hcGktZGVsLWFkZHJlc3MnLFxyXG5cdFx0XHRnZXRDYXJ0OiAncj1zaG9wcGluZy1jYXJ0L2FwaS1nZXQtc2hvcHBpbmctY2FydCcsXHJcblx0XHRcdGRlbGV0ZUNhcnQ6ICdyPXNob3BwaW5nLWNhcnQvYXBpLWRlbCcsXHJcblx0XHRcdHRvcEFyZWE6ICdyPWFyZWEvYXBpLWdldC10b3AtYXJlYXMnLFxyXG5cdFx0XHRhcHBseU9yZGVyOiAncj1idXlpbmcvYXBpLWFwcGx5LWNyZWF0ZS1vcmRlci1ieS1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0Z2V0T3JkZXI6ICdyPW9yZGVyL2FwaS1nZXQtZGV0YWlsJyxcclxuXHRcdFx0c2V0TWFyazogJ3I9bWFyay9hcGktbWFyaycsXHJcblx0XHRcdGNhbmNlbE1hcms6ICdyPW1hcmsvYXBpLWNhbmNlbC1tYXJrJyxcclxuXHRcdFx0Z2V0TWFya1VzZXI6ICdyPW1hcmsvYXBpLWdldC1jb2xsZWN0b3JzJ1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kJHBhdGhIdG1sID0ge1xyXG5cdFx0XHRydWxlczogJ2Rpc3RyaWJ1dGlvbl9ydWxlcy5odG1sJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXREYXRhIChyZXMsIHBhcmFtKSB7XHJcblx0XHR2YXIgdGltZSA9IHJlcy5kYXRhLnRvU3RyaW5nKClcclxuXHRcdHBhcmFtLnJlcXVlc3RUaW1lID0gdGltZVxyXG5cdFx0Zm9yICh2YXIga2V5IGluIHBhcmFtKSB7XHJcblx0XHRcdHBhcmFtW2tleV0gPSBwYXJhbVtrZXldLnRvU3RyaW5nKClcclxuXHRcdH1cclxuXHRcdHZhciBuZXdLZXkgPSBPYmplY3Qua2V5cyhwYXJhbSkuc29ydCgpXHJcblx0XHR2YXIgbmV3UGFyYW0gPSB7fVxyXG5cdFx0bmV3S2V5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0bmV3UGFyYW1baXRlbV0gPSBwYXJhbVtpdGVtXVxyXG5cdFx0fSlcclxuXHRcdHZhciBzaWduID0gSlNPTi5zdHJpbmdpZnkobmV3UGFyYW0pICsgJ15aUzIwMThMQ0onXHJcblx0XHRuZXdQYXJhbS5zaWduYXR1cmUgPSBNZDUuaGV4TUQ1KHNpZ24pXHJcblx0XHRyZXR1cm4gbmV3UGFyYW1cclxuXHR9XHJcblx0Z2V0VGltZSAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50aW1lLFxyXG5cdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdFx0aGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFVzZXJMb2dpbiAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuICAgICAgICBcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHQgICAgICAgICAgICBcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC51c2VybG9naW4sXHJcblx0ICAgICAgICAgICAgXHRkYXRhOiBkYXRhLFxyXG5cdCAgICAgICAgICAgIFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICBcdGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0ICAgICAgICAgICAgfSlcclxuICAgICAgICBcdH0pXHJcbiAgICAgICAgfSlcclxuXHR9XHJcblx0SW5kZXhIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguaW5kZXhMaXN0LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERldGFpbEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5kZXRhaWwsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0QWRkQ2FydEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hZGRjYXJ0LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFRvcENhdGVnb3J5IChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudG9wQ2F0ZWdvcnksXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0Q2hpbGRDYXRlZ29yeSAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNoaWxkQ2F0ZWdvcnksXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0U3B1SHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmdldFNwdSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRTZXRNYXJrSHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNldE1hcmssXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Q2FuY2VsTWFya0h0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5jYW5jZWxNYXJrLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldE1hcmtVc2VyIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0TWFya1VzZXIsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0Q2FydEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRDYXJ0LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERlbGV0ZUNhcnRIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5kZWxldGVDYXJ0LFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmFpbDogKGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VXNlckluZm8gKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC51c2VySW5mbyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRVc2VyT3JkZXIgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5vcmRlclN0YXR1cyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRBZGRyZXNzIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0QWRkcmVzcyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRFZGl0QWRkcmVzcyAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmVkaXRBZGRyZXNzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERlbGV0ZUFkZHJlc3MgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5kZWxldGVBZGRyZXNzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEFwcGx5T3JkZXJIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguYXBwbHlPcmRlcixcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRPcmRlckh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRPcmRlcixcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRmYWlsOiAoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRUb3BBcmVhICgpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0dXJsOiAnaHR0cHM6Ly9hcHAxLnpoZW5nc2hhbi5zdG9yZS9zbWFydEFyZWEvYmFja2VuZC93ZWIvaW5kZXgucGhwJyxcclxuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdCAgcmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFNlYXJjaEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNlYXJjaCxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG5cdCAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWw6IChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0ICByZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlcXVlc3RUZXN0IChwYXJhbXMxLCBwYXJhbXMyKSB7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gXHRcdHdlcHkucmVxdWVzdCh7XHJcbi8vIFx0XHQgIHVybDogJ2h0dHBzOi8vd3d3Lm1hZGNvZGVyLmNuL3Rlc3RzL3NsZWVwLnBocD90aW1lPTEmdD1jc3MmYz0nICsgcGFyYW1zMSArICcmaT0nICsgcGFyYW1zMixcclxuLy8gXHRcdCAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuLy8gXHRcdCAgXHRyZXNvbHZlKGRhdGEpXHJcbi8vIFx0XHQgIH1cclxuLy8gXHQgICAgfSlcclxuLy8gXHR9KVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVc2VyTG9naW4gKHBhcmFtKSB7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gXHRcdHdlcHkubG9naW4oe1xyXG4vLyBcdFx0ICBzdWNjZXNzOiAocmVzKSA9PntcclxuLy8gXHRcdCAgICByZXNvbHZlKHJlcylcclxuLy8gXHRcdCAgfVxyXG4vLyBcdFx0fSlcclxuLy8gXHR9KVxyXG4vLyB9IFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHR0cFJlcXVlc3QiXX0=