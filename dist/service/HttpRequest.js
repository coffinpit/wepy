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
			deleteCart: 'r=shopping-cart/api-del'
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
						}
					});
				});
			});
		}
	}, {
		key: 'GetCartHttp',
		value: function GetCartHttp(param) {
			var _this11 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this11.$$base + _this11.$$path.getCart,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						}
					});
				});
			});
		}
	}, {
		key: 'DeleteCartHttp',
		value: function DeleteCartHttp(param) {
			var _this12 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this12.$$base + _this12.$$path.deleteCart,
						method: 'POST',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: data,
						success: function success(data) {
							resolve(data);
						}
					});
				});
			});
		}
	}, {
		key: 'GetUserInfo',
		value: function GetUserInfo(param) {
			var _this13 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this13.$$base + _this13.$$path.userInfo,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						}
					});
				});
			});
		}
	}, {
		key: 'GetUserOrder',
		value: function GetUserOrder(param) {
			var _this14 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this14.$$base + _this14.$$path.orderStatus,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						}
					});
				});
			});
		}
	}, {
		key: 'GetAddress',
		value: function GetAddress(param) {
			var _this15 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this15.$$base + _this15.$$path.getAddress,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						}
					});
				});
			});
		}
	}, {
		key: 'EditAddress',
		value: function EditAddress(param) {
			var _this16 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this16.$$base + _this16.$$path.editAddress,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						}
					});
				});
			});
		}
	}, {
		key: 'DeleteAddress',
		value: function DeleteAddress(param) {
			var _this17 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this17.$$base + _this17.$$path.deleteAddress,
						data: data,
						method: 'GET',
						header: { 'content-type': 'application/json' },
						success: function success(data) {
							resolve(data);
						}
					});
				});
			});
		}
	}, {
		key: 'SearchHttp',
		value: function SearchHttp(param) {
			var _this18 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					console.log(data);
					_wepy2.default.request({
						url: _this18.$$base + _this18.$$path.search,
						method: 'POST',
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: data,
						success: function success(data) {
							resolve(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRwYXRoIiwidGltZSIsInVzZXJsb2dpbiIsImluZGV4TGlzdCIsImRldGFpbCIsInNlYXJjaCIsImFkZGNhcnQiLCJ0b3BDYXRlZ29yeSIsImNoaWxkQ2F0ZWdvcnkiLCJnZXRTcHUiLCJ1c2VySW5mbyIsIm9yZGVyU3RhdHVzIiwiZ2V0QWRkcmVzcyIsImVkaXRBZGRyZXNzIiwiZGVsZXRlQWRkcmVzcyIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwicmVzIiwicGFyYW0iLCJkYXRhIiwidG9TdHJpbmciLCJyZXF1ZXN0VGltZSIsImtleSIsIm5ld0tleSIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwibmV3UGFyYW0iLCJmb3JFYWNoIiwiaXRlbSIsInNpZ24iLCJKU09OIiwic3RyaW5naWZ5Iiwic2lnbmF0dXJlIiwiaGV4TUQ1IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsIl90aGlzIiwiZ2V0VGltZSIsInRoZW4iLCJnZXREYXRhIiwiY29uc29sZSIsImxvZyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsVzs7O0FBQ0wsd0JBQWU7QUFBQTs7QUFBQTs7QUFFZCxTQUFLQyxNQUFMLEdBQWMsa0VBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWM7QUFDYkMsU0FBSyxRQURRO0FBRWJDLGNBQVcsaUNBRkU7QUFHYkMsY0FBVywwQkFIRTtBQUliQyxXQUFRLDhCQUpLO0FBS2JDLFdBQVEsMEJBTEs7QUFNYkMsWUFBUyw0QkFOSTtBQU9iQyxnQkFBYSxtQ0FQQTtBQVFiQyxrQkFBZSw2QkFSRjtBQVNiQyxXQUFRLHdCQVRLO0FBVWJDLGFBQVUsdUJBVkc7QUFXYkMsZ0JBQWEsa0NBWEE7QUFZYkMsZUFBWSxnQ0FaQztBQWFiQyxn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QU87QUFBQTs7QUFDbEIsT0FBSXlCLFFBQVEsSUFBWjtBQUNBLFVBQU8sSUFBSVIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q00sVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQzVCLEdBQUQsRUFBUztBQUM3QixTQUFJRSxPQUFPd0IsTUFBTUcsT0FBTixDQUFjN0IsR0FBZCxFQUFtQkMsS0FBbkIsQ0FBWDtBQUNBNkIsYUFBUUMsR0FBUixDQUFZN0IsSUFBWjtBQUNBLG9CQUFLbUIsT0FBTCxDQUFhO0FBQ1pDLFdBQUssUUFBS3hDLE1BQUwsR0FBYyxRQUFLQyxNQUFMLENBQVlLLE1BRG5CO0FBRVptQyxjQUFRLE1BRkk7QUFHQUMsY0FBUSxFQUFDLGdCQUFnQixtQ0FBakIsRUFIUjtBQUlBdEIsWUFBTUEsSUFKTjtBQUtadUIsZUFBUyxpQkFBQ3ZCLElBQUQsRUFBVTtBQUNqQmlCLGVBQVFqQixJQUFSO0FBQ0Q7QUFQVyxNQUFiO0FBU0EsS0FaRDtBQWFBLElBZE0sQ0FBUDtBQWVBOzs7O0VBbFR3QixlQUFLOEIsRztBQW9UL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkFFZW5ELFciLCJmaWxlIjoiSHR0cFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTWQ1IGZyb20gJy4vbWQ1LmpzJ1xyXG5cclxuY2xhc3MgSHR0cFJlcXVlc3QgZXh0ZW5kcyB3ZXB5LmFwcHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLiQkYmFzZSA9ICdodHRwczovL3pzdGVzdC56c2J1dGNoZXIuY24vc21hcnRTaG9wcGluZy9iYWNrZW5kL3dlYi9pbmRleC5waHA/J1xyXG5cdFx0dGhpcy4kJHBhdGggPSB7XHJcblx0XHRcdHRpbWU6J3I9dGVzdCcsXHJcblx0XHRcdHVzZXJsb2dpbjogJ3I9bWVtYmVyL2FwaS1nZXQtdG9rZW4tYnktcGhvbmUnLFxyXG5cdFx0XHRpbmRleExpc3Q6ICdyPXJlY29tbWVuZC9hcGktZ2V0LXNwdXMnLFxyXG5cdFx0XHRkZXRhaWw6ICdyPXByb2R1Y3QvYXBpLWdldC1zcHUtZGV0YWlsJyxcclxuXHRcdFx0c2VhcmNoOiAncj1wcm9kdWN0L2FwaS1zZWFyY2gtc3B1JyxcclxuXHRcdFx0YWRkY2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktdXBkYXRlJyxcclxuXHRcdFx0dG9wQ2F0ZWdvcnk6ICdyPWNhdGVnb3J5L2FwaS1nZXQtdG9wLWNhdGVnb3JpZXMnLFxyXG5cdFx0XHRjaGlsZENhdGVnb3J5OiAncj1jYXRlZ29yeS9hcGktZ2V0LWNoaWxkcmVuJyxcclxuXHRcdFx0Z2V0U3B1OiAncj1jYXRlZ29yeS9hcGktZ2V0LXNwdScsXHJcblx0XHRcdHVzZXJJbmZvOiAncj1tZW1iZXIvYXBpLWdldC1pbmZvJyxcclxuXHRcdFx0b3JkZXJTdGF0dXM6ICdyPW9yZGVyL2FwaS1nZXQtb3JkZXItc3RhdGlzdGljcycsXHJcblx0XHRcdGdldEFkZHJlc3M6ICdyPWFkZHJlc3MvYXBpLWdldC1hZGRyZXNzLWxpc3QnLFxyXG5cdFx0XHRlZGl0QWRkcmVzczogJ3I9YWRkcmVzcy9hcGktdXBkYXRlLWFkZHJlc3MnLFxyXG5cdFx0XHRkZWxldGVBZGRyZXNzOiAncj1hZGRyZXNzL2FwaS1kZWwtYWRkcmVzcycsXHJcblx0XHRcdGdldENhcnQ6ICdyPXNob3BwaW5nLWNhcnQvYXBpLWdldC1zaG9wcGluZy1jYXJ0JyxcclxuXHRcdFx0ZGVsZXRlQ2FydDogJ3I9c2hvcHBpbmctY2FydC9hcGktZGVsJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXREYXRhIChyZXMsIHBhcmFtKSB7XHJcblx0XHR2YXIgdGltZSA9IHJlcy5kYXRhLnRvU3RyaW5nKClcclxuXHRcdHBhcmFtLnJlcXVlc3RUaW1lID0gdGltZVxyXG5cdFx0Zm9yICh2YXIga2V5IGluIHBhcmFtKSB7XHJcblx0XHRcdHBhcmFtW2tleV0gPSBwYXJhbVtrZXldLnRvU3RyaW5nKClcclxuXHRcdH1cclxuXHRcdHZhciBuZXdLZXkgPSBPYmplY3Qua2V5cyhwYXJhbSkuc29ydCgpXHJcblx0XHR2YXIgbmV3UGFyYW0gPSB7fVxyXG5cdFx0bmV3S2V5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0bmV3UGFyYW1baXRlbV0gPSBwYXJhbVtpdGVtXVxyXG5cdFx0fSlcclxuXHRcdHZhciBzaWduID0gSlNPTi5zdHJpbmdpZnkobmV3UGFyYW0pICsgJ15aUzIwMThMQ0onXHJcblx0XHRuZXdQYXJhbS5zaWduYXR1cmUgPSBNZDUuaGV4TUQ1KHNpZ24pXHJcblx0XHRyZXR1cm4gbmV3UGFyYW1cclxuXHR9XHJcblx0Z2V0VGltZSAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50aW1lLFxyXG5cdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdFx0aGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRVc2VyTG9naW4gKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcbiAgICAgICAgXHRcdHdlcHkucmVxdWVzdCh7XHJcblx0ICAgICAgICAgICAgXHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgudXNlcmxvZ2luLFxyXG5cdCAgICAgICAgICAgIFx0ZGF0YTogZGF0YSxcclxuXHQgICAgICAgICAgICBcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgXHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHQgICAgICAgICAgICB9KVxyXG4gICAgICAgIFx0fSlcclxuICAgICAgICB9KVxyXG5cdH1cclxuXHRJbmRleEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5pbmRleExpc3QsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdERldGFpbEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5kZXRhaWwsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEFkZENhcnRIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguYWRkY2FydCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VG9wQ2F0ZWdvcnkgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC50b3BDYXRlZ29yeSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0Q2hpbGRDYXRlZ29yeSAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmNoaWxkQ2F0ZWdvcnksXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldFNwdUh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRTcHUsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldENhcnRIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZ2V0Q2FydCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RGVsZXRlQ2FydEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRlbGV0ZUNhcnQsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuXHQgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VXNlckluZm8gKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC51c2VySW5mbyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0R2V0VXNlck9yZGVyIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGgub3JkZXJTdGF0dXMsXHJcblx0XHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdEdldEFkZHJlc3MgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5nZXRBZGRyZXNzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRFZGl0QWRkcmVzcyAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmVkaXRBZGRyZXNzLFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHREZWxldGVBZGRyZXNzIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguZGVsZXRlQWRkcmVzcyxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0U2VhcmNoSHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguc2VhcmNoLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcblx0ICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlcXVlc3RUZXN0IChwYXJhbXMxLCBwYXJhbXMyKSB7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gXHRcdHdlcHkucmVxdWVzdCh7XHJcbi8vIFx0XHQgIHVybDogJ2h0dHBzOi8vd3d3Lm1hZGNvZGVyLmNuL3Rlc3RzL3NsZWVwLnBocD90aW1lPTEmdD1jc3MmYz0nICsgcGFyYW1zMSArICcmaT0nICsgcGFyYW1zMixcclxuLy8gXHRcdCAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuLy8gXHRcdCAgXHRyZXNvbHZlKGRhdGEpXHJcbi8vIFx0XHQgIH1cclxuLy8gXHQgICAgfSlcclxuLy8gXHR9KVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVc2VyTG9naW4gKHBhcmFtKSB7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gXHRcdHdlcHkubG9naW4oe1xyXG4vLyBcdFx0ICBzdWNjZXNzOiAocmVzKSA9PntcclxuLy8gXHRcdCAgICByZXNvbHZlKHJlcylcclxuLy8gXHRcdCAgfVxyXG4vLyBcdFx0fSlcclxuLy8gXHR9KVxyXG4vLyB9IFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHR0cFJlcXVlc3QiXX0=