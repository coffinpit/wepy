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
      pages: ['pages/start', 'pages/login', 'pages/index', 'pages/detail', 'pages/cart', 'pages/user', 'pages/category', 'pages/search'],
      window: {
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#fc5e43',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#282626',
        selectedColor: '#fc5e44',
        backgroundColor: '#f8f8f8',
        list: [{
          pagePath: 'pages/index',
          iconPath: 'image/index-default.png',
          selectedIconPath: 'image/index-active.png',
          text: '首页'
        }, {
          pagePath: 'pages/category',
          iconPath: 'image/category-default.png',
          selectedIconPath: 'image/category-active.png',
          text: '分类'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwic2VsZWN0ZWRJY29uUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJIdHRwUmVxdWVzdCIsInVzZSIsImludGVyY2VwdCIsInAiLCJ0aW1lc3RhbXAiLCJEYXRlIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImljb24iLCJjb25zb2xlIiwibG9nIiwic3VjY2VzcyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsInNob3dUb2FzdCIsImltYWdlIiwiY29tcGxldGUiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY2IiLCJ0aGF0IiwiZ2V0VXNlckluZm8iLCJyZXMiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUFvREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWpEZkMsTUFpRGUsR0FqRE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsYUFISyxFQUlMLGNBSkssRUFLTCxZQUxLLEVBTUwsWUFOSyxFQU9MLGdCQVBLLEVBUUwsY0FSSyxDQURBO0FBV1BDLGNBQVE7QUFDTkMsNkJBQXFCLE1BRGY7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ZSxrQkFLUDtBQUNOLHlCQUFLZ0IsU0FBTCxDQUFlO0FBQ2J0QixtQkFBTyxJQURNO0FBRWJ1QixxQkFBUyxNQUZJO0FBR2JuQixxQkFBUyxpQkFBQ2lCLEdBQUQsRUFBUztBQUNoQixrQkFBSUEsSUFBSUcsT0FBUixFQUFpQjtBQUNmdEIsd0JBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0Q7QUFDRjtBQVBZLFdBQWY7QUFTRDtBQWZjLE9BQWpCO0FBaUJEOzs7O0VBM0gwQixlQUFLc0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuXG5pbXBvcnQgSHR0cFJlcXVlc3QgZnJvbSAnLi9zZXJ2aWNlL0h0dHBSZXF1ZXN0J1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcbnNldFN0b3JlKHN0b3JlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9jYXJ0JyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZjNWU0MycsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgY29sb3I6ICcjMjgyNjI2JyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmM1ZTQ0JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvaW5kZXgtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfpppbpobUnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5YiG57G7J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhcnQnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhcnQtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2FydC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9pidcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS91c2VyLWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL3VzZXItYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHAudGltZXN0YW1wID0gK25ldyBEYXRlKClcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZygnY29uZmlnIHJlcXVlc3Q6ICcsIHApXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBzdWNjZXNzOiAnLCBwKVxuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBmYWlsIChwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGZhaWw6ICcsIHApXG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3lpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgY29tcGxldGU6ICcsIHApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIHRoaXMudGVzdEFzeW5jKClcbiAgfVxuXG4gIHNsZWVwIChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcbiAgICAgIH0sIHMgKiAxMDAwKVxuICAgIH0pXG4gIH1cblxuICBhc3luYyB0ZXN0QXN5bmMgKCkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgfVxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgICB9LFxuICAgICAgZmFpbCAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgICAgICAgY29udGVudDogJ+eZu+W9leWksei0pScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLflt7Lnoa7orqQnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxufVxuIl19