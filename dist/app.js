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
    value: function goIndex() {
      _wepy2.default.switchTab({
        url: './index'
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
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
                _this2.goIndex();
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
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiSHR0cFJlcXVlc3QiLCJoZXhNRDUiLCJ1c2UiLCJpbnRlcmNlcHQiLCJwIiwidGltZXN0YW1wIiwiRGF0ZSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJpY29uIiwic3VjY2VzcyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsInNob3dUb2FzdCIsImltYWdlIiwiY29tcGxldGUiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInN3aXRjaFRhYiIsInVybCIsImNiIiwidGhhdCIsImdldFN0b3JhZ2VTeW5jIiwiZ29JbmRleCIsImxvZ2luIiwicmVzIiwiY29kZSIsImdldFVzZXJJbmZvIiwiVXNlckxvZ2luIiwicGhvbmUiLCJ0aGVuIiwidG9rZW4iLCJzZXRTdG9yYWdlU3luYyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwib3BlblNldHRpbmciLCJhdXRoU2V0dGluZyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLE1BQU1DLFFBQVEsZUFBUixDQUFWOztBQUVBLElBQU1DLFFBQVEsc0JB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Z0JEO0FBQ0Y7QUF0QlksZUFBZjtBQXdCRDtBQXBDYyxXQUFqQjtBQXNDRDtBQXpDUSxPQUFYO0FBMkNEOzs7O0VBckowQixlQUFLSyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG52YXIgTWQ1ID0gcmVxdWlyZSgnLi9zZXJ2aWNlL21kNScpXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2NhcnQnLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICdwYWdlcy9zZWFyY2gnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmM1ZTQzJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmYzVlNDQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfliIbnsbsnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2FydCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2FydC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXJ0LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6LSt54mp6L2mJ1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXInLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL3VzZXItZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbFxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG4gICAgICBjb25maWcgKHApIHtcbiAgICAgICAgcC50aW1lc3RhbXAgPSArbmV3IERhdGUoKVxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBmYWlsIChwKSB7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3lpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgdGhpcy50ZXN0QXN5bmMoKVxuICB9XG5cbiAgc2xlZXAgKHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoJ3Byb21pc2UgcmVzb2x2ZWQnKVxuICAgICAgfSwgcyAqIDEwMDApXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIHRlc3RBc3luYyAoKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMylcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICB9XG4gIGdvSW5kZXggKCkge1xuICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgfSlcbiAgfVxuICBnZXRVc2VySW5mbyhjYikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcbiAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgfVxuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSlcbiAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEgPSByZXMudXNlckluZm9cbiAgICAgICAgICAgIHRoYXQuSHR0cFJlcXVlc3QuVXNlckxvZ2luKHtwaG9uZTogJzEzNDAyMTU1NzUxJ30pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbCAocmVzKSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+ivt+ajgOafpee9kee7nOi/nuaOpe+8jOW5tumHjeaWsOW8gOWQr+aOiOadgycsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkub3BlblNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICfnmbvlvZXlpLHotKUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xkvb/nlKjlsI/nqIvluo/pg6jliIblip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==