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

var Md5 = require('./service/md5.js');

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
    _this.Md5 = Md5.hexMD5;

    _this.use('requestfix');
    _this.intercept('request', {
      config: function config(p) {
        p.timestamp = +new Date();
        _wepy2.default.showLoading({
          title: '加载中',
          icon: 'loading'
        });
        return p;
      },
      success: function success(p) {
        _wepy2.default.hideLoading();
        return p;
      },
      fail: function fail(p) {
        _wepy2.default.hideLoading();
        _wepy2.default.showToast({
          title: '加载失败',
          icon: 'none',
          image: '../image/cancel.png'
        });
        return p;
      },
      complete: function complete(p) {}
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
    key: 'goIndex',
    value: function goIndex(page) {
      if (page) {
        if (page === 'index' || page === 'category' || page === 'cart' || page === 'user') {
          _wepy2.default.switchTab({
            url: './' + page
          });
        } else {
          _wepy2.default.navigateTo({
            url: './' + page
          });
        }
      } else {
        _wepy2.default.switchTab({
          url: './index'
        });
      }
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(page, cb) {
      var _this2 = this;

      var that = this;
      if (_wepy2.default.getStorageSync('token')) {
        this.goIndex();
      }
      _wepy2.default.login({
        success: function success(res) {
          console.log(res.code);
          _wepy2.default.getUserInfo({
            success: function success(data) {
              console.log(data);
              that.globalData = res.userInfo;
              that.HttpRequest.UserLogin({ phone: '13402155751' }).then(function (res) {
                var token = res.data.data.token;
                _wepy2.default.setStorageSync('token', token);
                _this2.goIndex(page);
              });
              cb && cb(res.userInfo);
            },
            fail: function fail(res) {
              _wepy2.default.showModal({
                title: '警告',
                content: '请检查网络连接，并重新开启授权',
                success: function success(res) {
                  if (res.confirm) {
                    _wepy2.default.openSetting({
                      success: function success(res) {
                        if (res.authSetting['scope.userInfo']) {
                          console.log(res.authSetting['scope.userInfo']);
                        } else {
                          _wepy2.default.showModal({
                            'title': '登录失败'
                          });
                        }
                      },
                      fail: function fail() {
                        _wepy2.default.showModal({
                          'title': '拒绝授权将无法使用小程序部分功能，请重新开启授权'
                        });
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    }
  }, {
    key: 'getToken',
    value: function getToken(page) {
      if (_wepy2.default.getStorageSync('token') !== '') {
        return _wepy2.default.getStorageSync('token');
      } else {
        _wepy2.default.showModal({
          title: '获取登录状态失败',
          content: '请点击确认重新登录',
          success: function success(res) {
            if (res.confirm) {
              _wepy2.default.navigateTo({
                url: './login?page=' + page
              });
            }
          }
        });
      }
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiSHR0cFJlcXVlc3QiLCJoZXhNRDUiLCJ1c2UiLCJpbnRlcmNlcHQiLCJwIiwidGltZXN0YW1wIiwiRGF0ZSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJpY29uIiwic3VjY2VzcyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsInNob3dUb2FzdCIsImltYWdlIiwiY29tcGxldGUiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInBhZ2UiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJuYXZpZ2F0ZVRvIiwiY2IiLCJ0aGF0IiwiZ2V0U3RvcmFnZVN5bmMiLCJnb0luZGV4IiwibG9naW4iLCJyZXMiLCJjb2RlIiwiZ2V0VXNlckluZm8iLCJVc2VyTG9naW4iLCJwaG9uZSIsInRoZW4iLCJ0b2tlbiIsInNldFN0b3JhZ2VTeW5jIiwic2hvd01vZGFsIiwiY29udGVudCIsImNvbmZpcm0iLCJvcGVuU2V0dGluZyIsImF1dGhTZXR0aW5nIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsTUFBTUMsUUFBUSxlQUFSLENBQVY7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QUNmcEMsK0JBQVMsaUJBQUN5QixHQUFELEVBQVM7QUFDaEIsNEJBQUlBLElBQUlZLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckN2QixrQ0FBUUMsR0FBUixDQUFZVSxJQUFJWSxXQUFKLENBQWdCLGdCQUFoQixDQUFaO0FBQ0QseUJBRkQsTUFFTztBQUNMLHlDQUFLSixTQUFMLENBQWU7QUFDYixxQ0FBUztBQURJLDJCQUFmO0FBR0Q7QUFDRix1QkFUYztBQVVmL0IsNEJBQU0sZ0JBQVk7QUFDaEIsdUNBQUsrQixTQUFMLENBQWU7QUFDYixtQ0FBUztBQURJLHlCQUFmO0FBR0Q7QUFkYyxxQkFBakI7QUFnQkQ7QUFDRjtBQXRCWSxlQUFmO0FBd0JEO0FBcENjLFdBQWpCO0FBc0NEO0FBekNRLE9BQVg7QUEyQ0Q7Ozs2QkFDU2pCLEksRUFBTTtBQUNkLFVBQUksZUFBS00sY0FBTCxDQUFvQixPQUFwQixNQUFpQyxFQUFyQyxFQUF5QztBQUN2QyxlQUFPLGVBQUtBLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLHVCQUFLVyxTQUFMLENBQWU7QUFDYm5DLGlCQUFPLFVBRE07QUFFYm9DLG1CQUFTLFdBRkk7QUFHYmxDLG1CQUFTLGlCQUFDeUIsR0FBRCxFQUFTO0FBQ2hCLGdCQUFJQSxJQUFJVSxPQUFSLEVBQWlCO0FBQ2YsNkJBQUtoQixVQUFMLENBQWdCO0FBQ2RELHFCQUFLLGtCQUFrQkY7QUFEVCxlQUFoQjtBQUdEO0FBQ0Y7QUFUWSxTQUFmO0FBV0Q7QUFDRjs7OztFQWxMMEIsZUFBS3NCLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdCdcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG5zZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3N0YXJ0JyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvdXNlcicsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmYzVlNDMnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2ZjNWU0NCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcbiAgICAgIGNvbmZpZyAocCkge1xuICAgICAgICBwLnRpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgICBpY29uOiAnbG9hZGluZydcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSAocCkge1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cbiAgZ29JbmRleCAocGFnZSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICBpZiAocGFnZSA9PT0gJ2luZGV4JyB8fCBwYWdlID09PSAnY2F0ZWdvcnknIHx8IHBhZ2UgPT09ICdjYXJ0JyB8fCBwYWdlID09PSAndXNlcicpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vJyArIHBhZ2VcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi8nICsgcGFnZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBnZXRVc2VySW5mbyhwYWdlLCBjYikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcbiAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgfVxuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSlcbiAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEgPSByZXMudXNlckluZm9cbiAgICAgICAgICAgIHRoYXQuSHR0cFJlcXVlc3QuVXNlckxvZ2luKHtwaG9uZTogJzEzNDAyMTU1NzUxJ30pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgIHRoaXMuZ29JbmRleChwYWdlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwgKHJlcykge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fmo4Dmn6XnvZHnu5zov57mjqXvvIzlubbph43mlrDlvIDlkK/mjojmnYMnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSlcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAn55m75b2V5aSx6LSlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5L2/55So5bCP56iL5bqP6YOo5YiG5Yqf6IO977yM6K+36YeN5paw5byA5ZCv5o6I5p2DJ1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGdldFRva2VuIChwYWdlKSB7XG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykgIT09ICcnKSB7XG4gICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn6I635Y+W55m75b2V54q25oCB5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogJ+ivt+eCueWHu+ehruiupOmHjeaWsOeZu+W9lScsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vbG9naW4/cGFnZT0nICsgcGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIEh0dHBSZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KClcbiAgTWQ1ID0gTWQ1LmhleE1ENVxufVxuIl19