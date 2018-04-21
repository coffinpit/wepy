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
      pages: ['pages/start', 'pages/login', 'pages/index', 'pages/detail', 'pages/cart', 'pages/user', 'pages/hot', 'pages/search'],
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
          pagePath: 'pages/cart',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwic2VsZWN0ZWRJY29uUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJIdHRwUmVxdWVzdCIsInVzZSIsImludGVyY2VwdCIsInAiLCJ0aW1lc3RhbXAiLCJEYXRlIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImljb24iLCJjb25zb2xlIiwibG9nIiwic3VjY2VzcyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsInNob3dUb2FzdCIsImltYWdlIiwiY29tcGxldGUiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY2IiLCJ0aGF0IiwiZ2V0VXNlckluZm8iLCJyZXMiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUFvREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWpEZkMsTUFpRGUsR0FqRE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsYUFISyxFQUlMLGNBSkssRUFLTCxZQUxLLEVBTUwsWUFOSyxFQU9MLFdBUEssRUFRTCxjQVJLLENBREE7QUFXUEMsY0FBUTtBQUNOQyw2QkFBcUIsTUFEZjtB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a0JBS1A7QUFDTix5QkFBS2dCLFNBQUwsQ0FBZTtBQUNidEIsbUJBQU8sSUFETTtBQUVidUIscUJBQVMsTUFGSTtBQUdibkIscUJBQVMsaUJBQUNpQixHQUFELEVBQVM7QUFDaEIsa0JBQUlBLElBQUlHLE9BQVIsRUFBaUI7QUFDZnRCLHdCQUFRQyxHQUFSLENBQVksT0FBWjtBQUNEO0FBQ0Y7QUFQWSxXQUFmO0FBU0Q7QUFmYyxPQUFqQjtBQWlCRDs7OztFQTNIMEIsZUFBS3NCLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdCdcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG5zZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3N0YXJ0JyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvdXNlcicsXG4gICAgICAncGFnZXMvaG90JyxcbiAgICAgICdwYWdlcy9zZWFyY2gnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmM1ZTQzJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmYzVlNDQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcbiAgICAgIGNvbmZpZyAocCkge1xuICAgICAgICBwLnRpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgICBpY29uOiAnbG9hZGluZydcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbmZpZyByZXF1ZXN0OiAnLCBwKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MgKHApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3Qgc3VjY2VzczogJywgcClcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgZmFpbCAocCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBmYWlsOiAnLCBwKVxuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlIChwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGNvbXBsZXRlOiAnLCBwKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cblxuICBnZXRVc2VySW5mbyhjYikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgIH1cbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxuICAgICAgfSxcbiAgICAgIGZhaWwgKCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICforablkYonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi35bey56Gu6K6kJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIEh0dHBSZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KClcbn1cbiJdfQ==