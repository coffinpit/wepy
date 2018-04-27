'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpRequest = function (_wepy$app) {
	_inherits(HttpRequest, _wepy$app);

	function HttpRequest() {
		_classCallCheck(this, HttpRequest);

		var _this = _possibleConstructorReturn(this, (HttpRequest.__proto__ || Object.getPrototypeOf(HttpRequest)).call(this));

		_this.$$base = 'http://zstest.zsbutcher.cn';
		_this.$$path = {
			indexList: '?r=recommend/api-get-spus'
		};
		return _this;
	}

	_createClass(HttpRequest, [{
		key: 'UserHttp',
		value: function UserHttp(param) {
			var _this2 = this;

			console.log(this.$$base + this.$$path.indexList);
			return new Promise(function (resolve, reject) {
				_wepy2.default.request({
					url: _this2.$$base + _this2.$$path.indexList,
					data: {
						code: param
					},
					method: 'POST',
					header: { 'content-type': 'application/json' },
					success: function success(data) {
						resolve(data);
					}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRiYXNlIiwiJCRwYXRoIiwiaW5kZXhMaXN0IiwicGFyYW0iLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsImNvZGUiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFTUEsVzs7O0FBQ0wsd0JBQWU7QUFBQTs7QUFBQTs7QUFFZCxRQUFLQyxNQUFMLEdBQWMsNEJBQWQ7QUFDQSxRQUFLQyxNQUFMLEdBQWM7QUFDYkMsY0FBVztBQURFLEdBQWQ7QUFIYztBQU1kOzs7OzJCQUNTQyxLLEVBQU87QUFBQTs7QUFDaEJDLFdBQVFDLEdBQVIsQ0FBWSxLQUFLTCxNQUFMLEdBQWMsS0FBS0MsTUFBTCxDQUFZQyxTQUF0QztBQUNBLFVBQU8sSUFBSUksT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN2QyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1pDLFVBQUssT0FBS1YsTUFBTCxHQUFjLE9BQUtDLE1BQUwsQ0FBWUMsU0FEbkI7QUFFWlMsV0FBTTtBQUNMQyxZQUFNVDtBQURELE1BRk07QUFLWlUsYUFBUSxNQUxJO0FBTUFDLGFBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBTlI7QUFPWkMsY0FBUyxpQkFBQ0osSUFBRCxFQUFVO0FBQ2pCSixjQUFRSSxJQUFSO0FBQ0Q7QUFUVyxLQUFiO0FBV0EsSUFaTSxDQUFQO0FBYUE7Ozs7RUF2QndCLGVBQUtLLEc7QUF5Qi9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7a0JBRWVqQixXIiwiZmlsZSI6Ikh0dHBSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmNsYXNzIEh0dHBSZXF1ZXN0IGV4dGVuZHMgd2VweS5hcHB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy4kJGJhc2UgPSAnaHR0cDovL3pzdGVzdC56c2J1dGNoZXIuY24nXHJcblx0XHR0aGlzLiQkcGF0aCA9IHtcclxuXHRcdFx0aW5kZXhMaXN0OiAnP3I9cmVjb21tZW5kL2FwaS1nZXQtc3B1cydcclxuXHRcdH1cclxuXHR9XHJcblx0VXNlckh0dHAgKHBhcmFtKSB7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmluZGV4TGlzdClcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHdlcHkucmVxdWVzdCh7XHJcblx0XHRcdFx0dXJsOiB0aGlzLiQkYmFzZSArIHRoaXMuJCRwYXRoLmluZGV4TGlzdCxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRjb2RlOiBwYXJhbVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdCAgcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlcXVlc3RUZXN0IChwYXJhbXMxLCBwYXJhbXMyKSB7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gXHRcdHdlcHkucmVxdWVzdCh7XHJcbi8vIFx0XHQgIHVybDogJ2h0dHBzOi8vd3d3Lm1hZGNvZGVyLmNuL3Rlc3RzL3NsZWVwLnBocD90aW1lPTEmdD1jc3MmYz0nICsgcGFyYW1zMSArICcmaT0nICsgcGFyYW1zMixcclxuLy8gXHRcdCAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuLy8gXHRcdCAgXHRyZXNvbHZlKGRhdGEpXHJcbi8vIFx0XHQgIH1cclxuLy8gXHQgICAgfSlcclxuLy8gXHR9KVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVc2VyTG9naW4gKHBhcmFtKSB7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuLy8gXHRcdHdlcHkubG9naW4oe1xyXG4vLyBcdFx0ICBzdWNjZXNzOiAocmVzKSA9PntcclxuLy8gXHRcdCAgICByZXNvbHZlKHJlcylcclxuLy8gXHRcdCAgfVxyXG4vLyBcdFx0fSlcclxuLy8gXHR9KVxyXG4vLyB9IFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHR0cFJlcXVlc3QiXX0=