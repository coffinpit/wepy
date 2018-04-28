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
			indexList: 'r=recommend/api-get-spus'
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
		key: 'UserHttp',
		value: function UserHttp(param) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRwYXRoIiwidGltZSIsInVzZXJsb2dpbiIsImluZGV4TGlzdCIsInJlcyIsInBhcmFtIiwiZGF0YSIsInRvU3RyaW5nIiwicmVxdWVzdFRpbWUiLCJrZXkiLCJuZXdLZXkiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsIm5ld1BhcmFtIiwiZm9yRWFjaCIsIml0ZW0iLCJzaWduIiwiSlNPTiIsInN0cmluZ2lmeSIsInNpZ25hdHVyZSIsImhleE1ENSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJfdGhpcyIsImdldFRpbWUiLCJ0aGVuIiwiZ2V0RGF0YSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsVzs7O0FBQ0wsd0JBQWU7QUFBQTs7QUFBQTs7QUFFZCxTQUFLQyxNQUFMLEdBQWMsa0VBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWM7QUFDYkMsU0FBSyxRQURRO0FBRWJDLGNBQVcsaUNBRkU7QUFHYkMsY0FBVztBQUhFLEdBQWQ7QUFIYztBQVFkOzs7OzBCQUNRQyxHLEVBQUtDLEssRUFBTztBQUNwQixPQUFJSixPQUFPRyxJQUFJRSxJQUFKLENBQVNDLFFBQVQsRUFBWDtBQUNBRixTQUFNRyxXQUFOLEdBQW9CUCxJQUFwQjtBQUNBLFFBQUssSUFBSVEsR0FBVCxJQUFnQkosS0FBaEIsRUFBdUI7QUFDdEJBLFVBQU1JLEdBQU4sSUFBYUosTUFBTUksR0FBTixFQUFXRixRQUFYLEVBQWI7QUFDQTtBQUNELE9BQUlHLFNBQVNDLE9BQU9DLElBQVAsQ0FBWVAsS0FBWixFQUFtQlEsSUFBbkIsRUFBYjtBQUNBLE9BQUlDLFdBQVcsRUFBZjtBQUNBSixVQUFPSyxPQUFQLENBQWUsVUFBQ0MsSUFBRCxFQUFVO0FBQ3hCRixhQUFTRSxJQUFULElBQWlCWCxNQUFNVyxJQUFOLENBQWpCO0FBQ0EsSUFGRDtBQUdBLE9BQUlDLE9BQU9DLEtBQUtDLFNBQUwsQ0FBZUwsUUFBZixJQUEyQixZQUF0QztBQUNBVCxTQUFNZSxTQUFOLEdBQWtCLGFBQUlDLE1BQUosQ0FBV0osSUFBWCxDQUFsQjtBQUNBLFVBQU9aLEtBQVA7QUFDQTs7OzRCQUNVO0FBQUE7O0FBQ1YsVUFBTyxJQUFJaUIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2QyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1pDLFVBQUssT0FBSzNCLE1BQUwsR0FBYyxPQUFLQyxNQUFMLENBQVlDLElBRG5CO0FBRVowQixhQUFRLEtBRkk7QUFHWkMsYUFBUSxFQUFDLGdCQUFnQixrQkFBakIsRUFISTtBQUlaQyxjQUFTLGlCQUFDdkIsSUFBRCxFQUFVO0FBQ2pCaUIsY0FBUWpCLElBQVI7QUFDRDtBQU5XLEtBQWI7QUFRQSxJQVRNLENBQVA7QUFVQTs7OzRCQUNVRCxLLEVBQU87QUFBQTs7QUFDakIsT0FBSXlCLFFBQVEsSUFBWjtBQUNNLFVBQU8sSUFBSVIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2Q00sVUFBTUMsT0FBTixHQUFnQkMsSUFBaEIsQ0FBcUIsVUFBQzVCLEdBQUQsRUFBUztBQUM3QixTQUFJRSxPQUFPd0IsTUFBTUcsT0FBTixDQUFjN0IsR0FBZCxFQUFtQkMsS0FBbkIsQ0FBWDtBQUNBLG9CQUFLb0IsT0FBTCxDQUFhO0FBQ1RDLFdBQUssT0FBSzNCLE1BQUwsR0FBYyxPQUFLQyxNQUFMLENBQVlFLFNBRHRCO0FBRVRJLFlBQU1BLElBRkc7QUFHVHFCLGNBQVEsS0FIQztBQUlUQyxjQUFRLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpDO0FBS2xCQyxlQUFTLGlCQUFDdkIsSUFBRCxFQUFVO0FBQ2pCaUIsZUFBUWpCLElBQVI7QUFDRDtBQVBpQixNQUFiO0FBU0EsS0FYRDtBQVlBLElBYk0sQ0FBUDtBQWNOOzs7MkJBQ1NELEssRUFBTztBQUFBOztBQUNoQixPQUFJeUIsUUFBUSxJQUFaO0FBQ0EsVUFBTyxJQUFJUixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDTSxVQUFNQyxPQUFOLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDNUIsR0FBRCxFQUFTO0FBQzdCLFNBQUlFLE9BQU93QixNQUFNRyxPQUFOLENBQWM3QixHQUFkLEVBQW1CQyxLQUFuQixDQUFYO0FBQ0Esb0JBQUtvQixPQUFMLENBQWE7QUFDWkMsV0FBSyxPQUFLM0IsTUFBTCxHQUFjLE9BQUtDLE1BQUwsQ0FBWUcsU0FEbkI7QUFFWkcsWUFBTUEsSUFGTTtBQUdacUIsY0FBUSxLQUhJO0FBSUFDLGNBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSlI7QUFLWkMsZUFBUyxpQkFBQ3ZCLElBQUQsRUFBVTtBQUNqQmlCLGVBQVFqQixJQUFSO0FBQ0Q7QUFQVyxNQUFiO0FBU0EsS0FYRDtBQVlBLElBYk0sQ0FBUDtBQWNBOzs7O0VBdEV3QixlQUFLNEIsRztBQXdFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkFFZXBDLFciLCJmaWxlIjoiSHR0cFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTWQ1IGZyb20gJy4vbWQ1LmpzJ1xyXG5cclxuY2xhc3MgSHR0cFJlcXVlc3QgZXh0ZW5kcyB3ZXB5LmFwcHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLiQkYmFzZSA9ICdodHRwczovL3pzdGVzdC56c2J1dGNoZXIuY24vc21hcnRTaG9wcGluZy9iYWNrZW5kL3dlYi9pbmRleC5waHA/J1xyXG5cdFx0dGhpcy4kJHBhdGggPSB7XHJcblx0XHRcdHRpbWU6J3I9dGVzdCcsXHJcblx0XHRcdHVzZXJsb2dpbjogJ3I9bWVtYmVyL2FwaS1nZXQtdG9rZW4tYnktcGhvbmUnLFxyXG5cdFx0XHRpbmRleExpc3Q6ICdyPXJlY29tbWVuZC9hcGktZ2V0LXNwdXMnXHJcblx0XHR9XHJcblx0fVxyXG5cdGdldERhdGEgKHJlcywgcGFyYW0pIHtcclxuXHRcdHZhciB0aW1lID0gcmVzLmRhdGEudG9TdHJpbmcoKVxyXG5cdFx0cGFyYW0ucmVxdWVzdFRpbWUgPSB0aW1lXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gcGFyYW0pIHtcclxuXHRcdFx0cGFyYW1ba2V5XSA9IHBhcmFtW2tleV0udG9TdHJpbmcoKVxyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld0tleSA9IE9iamVjdC5rZXlzKHBhcmFtKS5zb3J0KClcclxuXHRcdHZhciBuZXdQYXJhbSA9IHt9XHJcblx0XHRuZXdLZXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRuZXdQYXJhbVtpdGVtXSA9IHBhcmFtW2l0ZW1dXHJcblx0XHR9KVxyXG5cdFx0dmFyIHNpZ24gPSBKU09OLnN0cmluZ2lmeShuZXdQYXJhbSkgKyAnXlpTMjAxOExDSidcclxuXHRcdHBhcmFtLnNpZ25hdHVyZSA9IE1kNS5oZXhNRDUoc2lnbilcclxuXHRcdHJldHVybiBwYXJhbVxyXG5cdH1cclxuXHRnZXRUaW1lICgpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLnRpbWUsXHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0XHRoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFVzZXJMb2dpbiAocGFyYW0pIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIFx0XHR2YXIgZGF0YSA9IF90aGlzLmdldERhdGEocmVzLCBwYXJhbSlcclxuICAgICAgICBcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHQgICAgICAgICAgICBcdHVybDogdGhpcy4kJGJhc2UgKyB0aGlzLiQkcGF0aC51c2VybG9naW4sXHJcblx0ICAgICAgICAgICAgXHRkYXRhOiBkYXRhLFxyXG5cdCAgICAgICAgICAgIFx0bWV0aG9kOiAnR0VUJyxcclxuXHQgICAgICAgICAgICBcdGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fVxyXG5cdCAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHR9KVxyXG4gICAgICAgIH0pXHJcblx0fVxyXG5cdFVzZXJIdHRwIChwYXJhbSkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X3RoaXMuZ2V0VGltZSgpLnRoZW4oKHJlcykgPT4ge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gX3RoaXMuZ2V0RGF0YShyZXMsIHBhcmFtKVxyXG5cdFx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuJCRiYXNlICsgdGhpcy4kJHBhdGguaW5kZXhMaXN0LFxyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0ICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXF1ZXN0VGVzdCAocGFyYW1zMSwgcGFyYW1zMikge1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vIFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG4vLyBcdFx0ICB1cmw6ICdodHRwczovL3d3dy5tYWRjb2Rlci5jbi90ZXN0cy9zbGVlcC5waHA/dGltZT0xJnQ9Y3NzJmM9JyArIHBhcmFtczEgKyAnJmk9JyArIHBhcmFtczIsXHJcbi8vIFx0XHQgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbi8vIFx0XHQgIFx0cmVzb2x2ZShkYXRhKVxyXG4vLyBcdFx0ICB9XHJcbi8vIFx0ICAgIH0pXHJcbi8vIFx0fSlcclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVXNlckxvZ2luIChwYXJhbSkge1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vIFx0XHR3ZXB5LmxvZ2luKHtcclxuLy8gXHRcdCAgc3VjY2VzczogKHJlcykgPT57XHJcbi8vIFx0XHQgICAgcmVzb2x2ZShyZXMpXHJcbi8vIFx0XHQgIH1cclxuLy8gXHRcdH0pXHJcbi8vIFx0fSlcclxuLy8gfSBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0dHBSZXF1ZXN0Il19