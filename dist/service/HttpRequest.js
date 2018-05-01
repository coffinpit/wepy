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
			childCategory: 'r=category/api-get-children'
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
			param.signature = _md2.default.hexMD5(sign);
			return param;
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
		key: 'SearchHttp',
		value: function SearchHttp(param) {
			var _this10 = this;

			var _this = this;
			return new Promise(function (resolve, reject) {
				_this.getTime().then(function (res) {
					var data = _this.getData(res, param);
					_wepy2.default.request({
						url: _this10.$$base + _this10.$$path.search,
						data: data,
						method: 'POST',
						header: { 'content-type': 'application/json' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRwYXRoIiwidGltZSIsInVzZXJsb2dpbiIsImluZGV4TGlzdCIsImRldGFpbCIsInNlYXJjaCIsImFkZGNhcnQiLCJ0b3BDYXRlZ29yeSIsImNoaWxkQ2F0ZWdvcnkiLCJyZXMiLCJwYXJhbSIsImRhdGEiLCJ0b1N0cmluZyIsInJlcXVlc3RUaW1lIiwia2V5IiwibmV3S2V5IiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJuZXdQYXJhbSIsImZvckVhY2giLCJpdGVtIiwic2lnbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJzaWduYXR1cmUiLCJoZXhNRDUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwiX3RoaXMiLCJnZXRUaW1lIiwidGhlbiIsImdldERhdGEiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFc7OztBQUNMLHdCQUFlO0FBQUE7O0FBQUE7O0FBRWQsU0FBS0MsTUFBTCxHQUFjLGtFQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjO0FBQ2JDLFNBQUssUUFEUTtBQUViQyxjQUFXLGlDQUZFO0FBR2JDLGNBQVcsMEJBSEU7QUFJYkMsV0FBUSw4QkFKSztBQUtiQyxXQUFRLDBCQUxLO0FBTWJDLFlBQVMsNEJBTkk7QUFPYkMsZ0JBQWEsbUNBUEE7QUFRYkMsa0JBQWU7QUFSRixHQUFkO0FBSGM7QUFhZDs7OzswQkFDUUMsRyxFQUFLQyxLLEVBQU87QUFDcEIsT0FBSVQsT0FBT1EsSUFBSUUsSUFBSixDQUFTQyxRQUFULEVBQVg7QUFDQUYsU0FBTUcsV0FBTixHQUFvQlosSUFBcEI7QUFDQSxRQUFLLElBQUlhLEdBQVQsSUFBZ0JKLEtBQWhCLEVBQXVCO0FBQ3RCQSxVQUFNSSxHQUFOLElBQWFKLE1BQU1JLEdBQU4sRUFB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QixjQUFRLE1BSEk7QUFJQUMsY0FBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFKUjtBQUtaQyxlQUFTLGlCQUFDdkIsSUFBRCxFQUFVO0FBQ2pCaUIsZUFBUWpCLElBQVI7QUFDRDtBQVBXLE1BQWI7QUFTQSxLQVhEO0FBWUEsSUFiTSxDQUFQO0FBY0E7Ozs7RUFoS3dCLGVBQUs0QixHO0FBa0svQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O2tCQUVlekMsVyIsImZpbGUiOiJIdHRwUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBNZDUgZnJvbSAnLi9tZDUuanMnXHJcblxyXG5jbGFzcyBIdHRwUmVxdWVzdCBleHRlbmRzIHdlcHkuYXBwe1xyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHN1cGVyKClcclxuXHRcdHRoaXMuJCRiYXNlID0gJ2h0dHBzOi8venN0ZXN0LnpzYnV0Y2hlci5jbi9zbWFydFNob3BwaW5nL2JhY2tlbmQvd2ViL2luZGV4LnBocD8nXHJcblx0XHR0aGlzLiQkcGF0aCA9IHtcclxuXHRcdFx0dGltZToncj10ZXN0JyxcclxuXHRcdFx0dXNlcmxvZ2luOiAncj1tZW1iZXIvYXBpLWdldC10b2tlbi1ieS1waG9uZScsXHJcblx0XHRcdGluZGV4TGlzdDogJ3I9cmVjb21tZW5kL2FwaS1nZXQtc3B1cycsXHJcblx0XHRcdGRldGFpbDogJ3I9cHJvZHVjdC9hcGktZ2V0LXNwdS1kZXRhaWwnLFxyXG5cdFx0XHRzZWFyY2g6ICdyPXByb2R1Y3QvYXBpLXNlYXJjaC1zcHUnLFxyXG5cdFx0XHRhZGRjYXJ0OiAncj1zaG9wcGluZy1jYXJ0L2FwaS11cGRhdGUnLFxyXG5cdFx0XHR0b3BDYXRlZ29yeTogJ3I9Y2F0ZWdvcnkvYXBpLWdldC10b3AtY2F0ZWdvcmllcycsXHJcblx0XHRcdGNoaWxkQ2F0ZWdvcnk6ICdyPWNhdGVnb3J5L2FwaS1nZXQtY2hpbGRyZW4nXHJcblx0XHR9XHJcblx0fVxyXG5cdGdldERhdGEgKHJlcywgcGFyYW0pIHtcclxuXHRcdHZhciB0aW1lID0gcmVzLmRhdGEudG9TdHJpbmcoKVxyXG5cdFx0cGFyYW0ucmVxdWVzdFRpbWUgPSB0aW1lXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gcGFyYW0pIHtcclxuXHRcdFx0cGFyYW1ba2V5XSA9IHBhcmFtW2tleV0udG9TdHJpbmcoKVxyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld0tleSA9IE9iamVjdC5rZXlzKHBhcmFtKS5zb3J0KClcclxuXHRcdHZhciBuZXdQYXJhbSA9IHt9XHJcblx0XHRuZXdLZXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRuZXdQYXJhbVtpdGVtXSA9IHBhcmFtW2l0ZW1dXHJcblx0XHR9KVxyXG5cdFx0dmFyIHNpZ24gPSBKU09OLnN0cmluZ2lmeShuZXdQYXJhbSkgKyAnXlpTMjAxOExDSidcclxuXHRcdHBhcmFtLnNpZ25hdHVyZSA9IE1kNS5oZXhNRDUoc2lnbilcclxuXHRcdHJldHVybiBwYXJhbVxyXG5cdH1cclxuXHRnZXRUaW1lICgpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnRpbWUsXHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0XHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFVzZXJMb2dpbiAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuICAgICAgICBcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHQgICAgICAgICAgICBcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC51c2VybG9naW4sXHJcblx0ICAgICAgICAgICAgXHRkYXRhOiBkYXRhLFxyXG5cdCAgICAgICAgICAgIFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICBcdGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fVxyXG5cdCAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHR9KVxyXG4gICAgICAgIH0pXHJcblx0fVxyXG5cdEluZGV4SHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmluZGV4TGlzdCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0RGV0YWlsSHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmRldGFpbCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0QWRkQ2FydEh0dHAgKHBhcmFtKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5nZXRUaW1lKCkudGhlbigocmVzKSA9PiB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5nZXREYXRhKHJlcywgcGFyYW0pXHJcblx0XHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC5hZGRjYXJ0LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRUb3BDYXRlZ29yeSAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnRvcENhdGVnb3J5LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRHZXRDaGlsZENhdGVnb3J5IChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguY2hpbGRDYXRlZ29yeSxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdCAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHQgIHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0U2VhcmNoSHR0cCAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdF90aGlzLmdldFRpbWUoKS50aGVuKChyZXMpID0+IHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuXHRcdFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnNlYXJjaCxcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGEsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHQgICAgICAgICAgICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0ICByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlcXVlc3RUZXN0IChwYXJhbXMxLCBwYXJhbXMyKSB7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gXHRcdHdlcHkucmVxdWVzdCh7XHJcbi8vIFx0XHQgIHVybDogJ2h0dHBzOi8vd3d3Lm1hZGNvZGVyLmNuL3Rlc3RzL3NsZWVwLnBocD90aW1lPTEmdD1jc3MmYz0nICsgcGFyYW1zMSArICcmaT0nICsgcGFyYW1zMixcclxuLy8gXHRcdCAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuLy8gXHRcdCAgXHRyZXNvbHZlKGRhdGEpXHJcbi8vIFx0XHQgIH1cclxuLy8gXHQgICAgfSlcclxuLy8gXHR9KVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVc2VyTG9naW4gKHBhcmFtKSB7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gXHRcdHdlcHkubG9naW4oe1xyXG4vLyBcdFx0ICBzdWNjZXNzOiAocmVzKSA9PntcclxuLy8gXHRcdCAgICByZXNvbHZlKHJlcylcclxuLy8gXHRcdCAgfVxyXG4vLyBcdFx0fSlcclxuLy8gXHR9KVxyXG4vLyB9IFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHR0cFJlcXVlc3QiXX0=