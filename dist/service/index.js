'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpRequest = function () {
	function HttpRequest() {
		_classCallCheck(this, HttpRequest);

		this.$$path = {
			wechatLogin: ''
		};
	}

	_createClass(HttpRequest, [{
		key: 'UserLogin',
		value: function UserLogin(param) {
			return new Promise(function (resolve, reject) {
				_wepy2.default.login({
					success: function success(res) {
						resolve(res);
					}
				});
			});
		}
	}, {
		key: 'UserHttp',
		value: function UserHttp(param) {
			return new Promise(function (resolve, reject) {
				_wepy2.default.request({
					url: '',
					data: {
						code: param
					},
					method: 'POST',
					header: { 'content-type': 'application/json' },
					success: function success(data) {
						resolv(data);
					}
				});
			});
		}
	}]);

	return HttpRequest;
}();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkh0dHBSZXF1ZXN0IiwiJCRwYXRoIiwid2VjaGF0TG9naW4iLCJwYXJhbSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibG9naW4iLCJzdWNjZXNzIiwicmVzIiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJjb2RlIiwibWV0aG9kIiwiaGVhZGVyIiwicmVzb2x2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUVNQSxXO0FBQ0wsd0JBQWU7QUFBQTs7QUFDZCxPQUFLQyxNQUFMLEdBQWM7QUFDYkMsZ0JBQWE7QUFEQSxHQUFkO0FBR0E7Ozs7NEJBQ1VDLEssRUFBTztBQUNqQixVQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkMsbUJBQUtDLEtBQUwsQ0FBVztBQUNUQyxjQUFTLGlCQUFDQyxHQUFELEVBQVE7QUFDZkosY0FBUUksR0FBUjtBQUNEO0FBSFEsS0FBWDtBQUtBLElBTk0sQ0FBUDtBQU9BOzs7MkJBQ1NOLEssRUFBTztBQUNoQixVQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkMsbUJBQUtJLE9BQUwsQ0FBYTtBQUNaQyxVQUFLLEVBRE87QUFFWkMsV0FBTTtBQUNMQyxZQUFNVjtBQURELE1BRk07QUFLWlcsYUFBUSxNQUxJO0FBTUFDLGFBQVEsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBTlI7QUFPWlAsY0FBUyxpQkFBQ0ksSUFBRCxFQUFVO0FBQ2pCSSxhQUFPSixJQUFQO0FBQ0Q7QUFUVyxLQUFiO0FBV0EsSUFaTSxDQUFQO0FBYUE7Ozs7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkFFZVosVyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5jbGFzcyBIdHRwUmVxdWVzdCB7XHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0dGhpcy4kJHBhdGggPSB7XHJcblx0XHRcdHdlY2hhdExvZ2luOiAnJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRVc2VyTG9naW4gKHBhcmFtKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR3ZXB5LmxvZ2luKHtcclxuXHRcdFx0ICBzdWNjZXNzOiAocmVzKSA9PntcclxuXHRcdFx0ICAgIHJlc29sdmUocmVzKVxyXG5cdFx0XHQgIH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFVzZXJIdHRwIChwYXJhbSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0d2VweS5yZXF1ZXN0KHtcclxuXHRcdFx0XHR1cmw6ICcnLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdGNvZGU6IHBhcmFtXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0ICByZXNvbHYoZGF0YSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXF1ZXN0VGVzdCAocGFyYW1zMSwgcGFyYW1zMikge1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vIFx0XHR3ZXB5LnJlcXVlc3Qoe1xyXG4vLyBcdFx0ICB1cmw6ICdodHRwczovL3d3dy5tYWRjb2Rlci5jbi90ZXN0cy9zbGVlcC5waHA/dGltZT0xJnQ9Y3NzJmM9JyArIHBhcmFtczEgKyAnJmk9JyArIHBhcmFtczIsXHJcbi8vIFx0XHQgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbi8vIFx0XHQgIFx0cmVzb2x2ZShkYXRhKVxyXG4vLyBcdFx0ICB9XHJcbi8vIFx0ICAgIH0pXHJcbi8vIFx0fSlcclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVXNlckxvZ2luIChwYXJhbSkge1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbi8vIFx0XHR3ZXB5LmxvZ2luKHtcclxuLy8gXHRcdCAgc3VjY2VzczogKHJlcykgPT57XHJcbi8vIFx0XHQgICAgcmVzb2x2ZShyZXMpXHJcbi8vIFx0XHQgIH1cclxuLy8gXHRcdH0pXHJcbi8vIFx0fSlcclxuLy8gfSBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0dHBSZXF1ZXN0Il19