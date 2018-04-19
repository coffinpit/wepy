'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Intercept = function (_wepy$app) {
    _inherits(Intercept, _wepy$app);

    function Intercept() {
        _classCallCheck(this, Intercept);

        // 拦截request请求
        var _this = _possibleConstructorReturn(this, (Intercept.__proto__ || Object.getPrototypeOf(Intercept)).call(this));
        // this is not allowed before super()


        _this.intercept('request', {
            // 发出请求时的回调函数
            config: function config(p) {
                // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
                p.timestamp = +new Date();
                console.log('config request: ', p);
                // 必须返回OBJECT参数对象，否则无法发送请求到服务端
                return p;
            },


            // 请求成功后的回调函数
            success: function success(p) {
                // 可以在这里对收到的响应数据对象进行加工处理
                console.log('request success: ', p);
                // 必须返回响应数据对象，否则后续无法对响应数据进行处理
                return p;
            },


            //请求失败后的回调函数
            fail: function fail(p) {
                console.log('request fail: ', p);
                // 必须返回响应数据对象，否则后续无法对响应数据进行处理
                return p;
            },


            // 请求完成时的回调函数(请求成功或失败都会被执行)
            complete: function complete(p) {
                console.log('request complete: ', p);
            }
        });
        return _this;
    }

    return Intercept;
}(_wepy2.default.app);

exports.default = Intercept;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludGVyY2VwdC5qcyJdLCJuYW1lcyI6WyJJbnRlcmNlcHQiLCJpbnRlcmNlcHQiLCJjb25maWciLCJwIiwidGltZXN0YW1wIiwiRGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJzdWNjZXNzIiwiZmFpbCIsImNvbXBsZXRlIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7O0FBQ2pCLHlCQUFlO0FBQUE7O0FBR1g7QUFIVztBQUNYOzs7QUFHQSxjQUFLQyxTQUFMLENBQWUsU0FBZixFQUEwQjtBQUN0QjtBQUNBQyxrQkFGc0Isa0JBRWRDLENBRmMsRUFFWDtBQUNQO0FBQ0FBLGtCQUFFQyxTQUFGLEdBQWMsQ0FBQyxJQUFJQyxJQUFKLEVBQWY7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ0osQ0FBaEM7QUFDQTtBQUNBLHVCQUFPQSxDQUFQO0FBQ0gsYUFScUI7OztBQVV0QjtBQUNBSyxtQkFYc0IsbUJBV2JMLENBWGEsRUFXVjtBQUNSO0FBQ0FHLHdCQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUNKLENBQWpDO0FBQ0E7QUFDQSx1QkFBT0EsQ0FBUDtBQUNILGFBaEJxQjs7O0FBa0J0QjtBQUNBTSxnQkFuQnNCLGdCQW1CaEJOLENBbkJnQixFQW1CYjtBQUNMRyx3QkFBUUMsR0FBUixDQUFZLGdCQUFaLEVBQThCSixDQUE5QjtBQUNBO0FBQ0EsdUJBQU9BLENBQVA7QUFDSCxhQXZCcUI7OztBQXlCdEI7QUFDQU8sb0JBMUJzQixvQkEwQlpQLENBMUJZLEVBMEJUO0FBQ1RHLHdCQUFRQyxHQUFSLENBQVksb0JBQVosRUFBa0NKLENBQWxDO0FBQ0g7QUE1QnFCLFNBQTFCO0FBSlc7QUFrQ2Q7OztFQW5Da0MsZUFBS1EsRzs7a0JBQXZCWCxTIiwiZmlsZSI6IkludGVyY2VwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmNlcHQgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgLy8gdGhpcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgc3VwZXIoKVxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8g5oum5oiqcmVxdWVzdOivt+axglxyXG4gICAgICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xyXG4gICAgICAgICAgICAvLyDlj5Hlh7ror7fmsYLml7bnmoTlm57osIPlh73mlbBcclxuICAgICAgICAgICAgY29uZmlnIChwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlr7nmiYDmnIlyZXF1ZXN06K+35rGC5Lit55qET0JKRUNU5Y+C5pWw5a+56LGh57uf5LiA6ZmE5Yqg5pe26Ze05oiz5bGe5oCnXHJcbiAgICAgICAgICAgICAgICBwLnRpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbmZpZyByZXF1ZXN0OiAnLCBwKTtcclxuICAgICAgICAgICAgICAgIC8vIOW/hemhu+i/lOWbnk9CSkVDVOWPguaVsOWvueixoe+8jOWQpuWImeaXoOazleWPkemAgeivt+axguWIsOacjeWKoeerr1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyDor7fmsYLmiJDlip/lkI7nmoTlm57osIPlh73mlbBcclxuICAgICAgICAgICAgc3VjY2VzcyAocCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+v5Lul5Zyo6L+Z6YeM5a+55pS25Yiw55qE5ZON5bqU5pWw5o2u5a+56LGh6L+b6KGM5Yqg5bel5aSE55CGXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBzdWNjZXNzOiAnLCBwKTtcclxuICAgICAgICAgICAgICAgIC8vIOW/hemhu+i/lOWbnuWTjeW6lOaVsOaNruWvueixoe+8jOWQpuWImeWQjue7reaXoOazleWvueWTjeW6lOaVsOaNrui/m+ihjOWkhOeQhlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvL+ivt+axguWksei0peWQjueahOWbnuiwg+WHveaVsFxyXG4gICAgICAgICAgICBmYWlsIChwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBmYWlsOiAnLCBwKTtcclxuICAgICAgICAgICAgICAgIC8vIOW/hemhu+i/lOWbnuWTjeW6lOaVsOaNruWvueixoe+8jOWQpuWImeWQjue7reaXoOazleWvueWTjeW6lOaVsOaNrui/m+ihjOWkhOeQhlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyDor7fmsYLlrozmiJDml7bnmoTlm57osIPlh73mlbAo6K+35rGC5oiQ5Yqf5oiW5aSx6LSl6YO95Lya6KKr5omn6KGMKVxyXG4gICAgICAgICAgICBjb21wbGV0ZSAocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgY29tcGxldGU6ICcsIHApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=