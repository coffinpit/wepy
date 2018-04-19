'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _wepyRedux = require('./npm/wepy-redux/lib/index.js');

var _store = require('./store/index.js');

var _store2 = _interopRequireDefault(_store);

var _HttpRequest = require('./service/HttpRequest.js');

var _HttpRequest2 = _interopRequireDefault(_HttpRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _store2.default)();
(0, _wepyRedux.setStore)(store);

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/start', 'pages/login', 'pages/index', 'pages/cart', 'pages/user', 'pages/hot', 'pages/search'],
      window: {
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        color: '#282626',
        selectedColor: '#fc5e44',
        backgroundColor: '#fff',
        list: [{
          pagePath: 'pages/index',
          iconPath: 'image/index-default.png',
          selectedIconPath: 'image/index-active.png',
          text: '首页'
        }, {
          pagePath: 'pages/cart',
          iconPath: 'image/cart-default.png',
          selectedIconPath: 'image/cart-active.png',
          text: '购物车'
        }, {
          pagePath: 'pages/user',
          iconPath: 'image/user-default.png',
          selectedIconPath: 'image/user-active.png',
          text: '个人中心'
        }]
      }
    };
    _this.globalData = {
      userInfo: null
    };
    _this.HttpRequest = new _HttpRequest2.default();

    _this.use('requestfix');
    _this.intercept('request', {
      config: function config(p) {
        p.timestamp = +new Date();
        _wepy2.default.showLoading({
          title: '加载中',
          icon: 'loading'
        });
        console.log('config request: ', p);
        return p;
      },
      success: function success(p) {
        console.log('request success: ', p);
        _wepy2.default.hideLoading();
        return p;
      },
      fail: function fail(p) {
        console.log('request fail: ', p);
        _wepy2.default.hideLoading();
        _wepy2.default.showToast({
          title: '加载失败',
          icon: 'none',
          image: '../image/cancel.png'
        });
        return p;
      },
      complete: function complete(p) {
        console.log('request complete: ', p);
      }
    });
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      this.testAsync();
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }
  }, {
    key: 'testAsync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleep(3);

              case 2:
                data = _context.sent;

                console.log(data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        },
        fail: function fail() {
          _wepy2.default.showModal({
            title: '警告',
            content: '登录失败',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户已确认');
              }
            }
          });
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwic2VsZWN0ZWRJY29uUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJIdHRwUmVxdWVzdCIsInVzZSIsImludGVyY2VwdCIsInAiLCJ0aW1lc3RhbXAiLCJEYXRlIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImljb24iLCJjb25zb2xlIiwibG9nIiwic3VjY2VzcyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsInNob3dUb2FzdCIsImltYWdlIiwiY29tcGxldGUiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY2IiLCJ0aGF0IiwiZ2V0VXNlckluZm8iLCJyZXMiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUE4Q0Usc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQTNDZkMsTUEyQ2UsR0EzQ047QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsYUFISyxFQUlMLFlBSkssRUFLTCxZQUxLLEVBTUwsV0FOSyxFQU9MLGNBUEssQ0FEQTtBQVVQQyxjQUFRO0FBQ05DLDZCQUFxQixNQURmO0FBRU5DLHNDQUE4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QUFTO0FBQ2hCLGtCQUFJQSxJQUFJRyxPQUFSLEVBQWlCO0FBQ2Z0Qix3QkFBUUMsR0FBUixDQUFZLE9BQVo7QUFDRDtBQUNGO0FBUFksV0FBZjtBQVNEO0FBZmMsT0FBakI7QUFpQkQ7Ozs7RUFySDBCLGVBQUtzQixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9jYXJ0JyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9ob3QnLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2ZjNWU0NCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhcnQnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhcnQtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2FydC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9pidcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS91c2VyLWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL3VzZXItYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHAudGltZXN0YW1wID0gK25ldyBEYXRlKClcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZygnY29uZmlnIHJlcXVlc3Q6ICcsIHApXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBzdWNjZXNzOiAnLCBwKVxuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBmYWlsIChwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGZhaWw6ICcsIHApXG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3lpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgY29tcGxldGU6ICcsIHApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIHRoaXMudGVzdEFzeW5jKClcbiAgfVxuXG4gIHNsZWVwIChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcbiAgICAgIH0sIHMgKiAxMDAwKVxuICAgIH0pXG4gIH1cblxuICBhc3luYyB0ZXN0QXN5bmMgKCkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgfVxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgICB9LFxuICAgICAgZmFpbCAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgICAgICAgY29udGVudDogJ+eZu+W9leWksei0pScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLflt7Lnoa7orqQnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxufVxuIl19