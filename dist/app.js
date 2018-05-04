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
      pages: ['pages/start', 'pages/login', 'pages/index', 'pages/detail', 'pages/cart', 'pages/user', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/order'],
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
      userInfo: null,
      userLevel: null,
      userHash: null
    };
    _this.HttpRequest = new _HttpRequest2.default();
    _this.Md5 = Md5.hexMD5;

    _this.use('requestfix');
    _this.intercept('request', {
      config: function config(p) {
        p.timestamp = +new Date();
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
    key: 'getUserInfo',
    value: function getUserInfo(page, cb) {
      var that = this;
      if (_wepy2.default.getStorageSync('token')) {
        _wepy2.default.switchTab({
          url: './index'
        });
      }
      _wepy2.default.login({
        success: function success(res) {
          console.log(res.code);
          _wepy2.default.getUserInfo({
            success: function success(data) {
              that.globalData.userInfo = data.userInfo;
              that.HttpRequest.UserLogin({ phone: '13402155751' }).then(function (res) {
                var token = res.data.data.token;
                _wepy2.default.setStorageSync('token', token);
                that.HttpRequest.GetUserInfo({ token: token }).then(function (res) {
                  if (res.data.error === 0) {
                    that.globalData.userLevel = res.data.data.level;
                    that.globalData.userHash = res.data.data.hash;
                  }
                });
                console.log(that.globalData);
                cb && cb(res.userInfo);
              });
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
  }, {
    key: 'showLoading',
    value: function showLoading() {
      _wepy2.default.showLoading({
        title: '加载中',
        icon: 'loading'
      });
    }
  }, {
    key: 'dateFormat',
    value: function dateFormat(timestamp, formats) {
      formats = formats || 'Y-m-d';
      var zero = function zero(value) {
        if (value < 10) {
          return '0' + value;
        }
        return value;
      };
      var myDate = timestamp ? new Date(timestamp) : new Date();
      var year = myDate.getFullYear();
      var month = zero(myDate.getMonth() + 1);
      var day = zero(myDate.getDate());
      var hour = zero(myDate.getHours());
      var minite = zero(myDate.getMinutes());
      var second = zero(myDate.getSeconds());
      return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return {
          Y: year,
          m: month,
          d: day,
          H: hour,
          i: minite,
          s: second
        }[matches];
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJ0aW1lc3RhbXAiLCJEYXRlIiwic3VjY2VzcyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiY29tcGxldGUiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInBhZ2UiLCJjYiIsInRoYXQiLCJnZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInVybCIsImxvZ2luIiwicmVzIiwiY29kZSIsImdldFVzZXJJbmZvIiwiVXNlckxvZ2luIiwicGhvbmUiLCJ0aGVuIiwidG9rZW4iLCJzZXRTdG9yYWdlU3luYyIsIkdldFVzZXJJbmZvIiwiZXJyb3IiLCJsZXZlbCIsImhhc2giLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsIm9wZW5TZXR0aW5nIiwiYXV0aFNldHRpbmciLCJuYXZpZ2F0ZVRvIiwic2hvd0xvYWRpbmciLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxNQUFNQyxRQUFRLGVBQVIsQ0FBVjs7QUFFQSxJQUFNQyxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7Ozs7O0FBeURFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUF0RGZDLE1Bc0RlLEdBdEROO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGFBSEssRUFJTCxjQUpLLEVBS0wsWUFMSyxFQU1MLFlBTkssRUFPTCxnQkFQSyxFQVFMLGNBUkssRUFTTCxlQVRLLEVBVUwsY0FWSyxFQVdMLGFBWEssQ0FEQTtBQWNQQyxjQUFRO0FBQ05DLDZCQUFxQixNQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BZEQ7QUFvQlBDLGNBQVE7QUFDTkMsZUFBTyxTQUREO0FBRU5DLHVCQUFlLFNBRlQ7QUFHTkMseUJBQWlCLFNBSFg7QUFJTkMsY0FBTSxDQUFDO0FBQ0xDLG9CQUFVLGFBREw7QUFFTEMsb0JBQVUseUJBRkw7QUFHTEMsNEJBQWtCLHdCQUhiO0FBSUxDLGdCQUFNO0FBSkQsU0FBRCxFQUtIO0FBQ0RILG9CQUFVLGdCQURUO0FBRURDLG9CQUFVLDRCQUZUO0FBR0RDLDRCQUFrQiwyQkFIakI7QUFJREMsZ0JBQU07QUFKTCxTQUxHLEVBVUg7QUFDREgsb0JBQVUsWUFEVDtBQUVEQyxvQkFBVSx3QkFGVDtBQUdEQyw0QkFBa0IsdUJBSGpCO0FBSURDLGdCQUFNO0FBSkwsU0FWRyxFQWVIO0FBQ0RILG9CQUFVLFlBRFQ7QUFFREMs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bnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdCdcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG5zZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3N0YXJ0JyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvdXNlcicsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvbmV3QWRkJyxcbiAgICAgICdwYWdlcy9vcmRlcidcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmYzVlNDMnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2ZjNWU0NCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHVzZXJMZXZlbDogbnVsbCxcbiAgICB1c2VySGFzaDogbnVsbFxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG4gICAgICBjb25maWcgKHApIHtcbiAgICAgICAgcC50aW1lc3RhbXAgPSArbmV3IERhdGUoKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MgKHApIHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgZmFpbCAocCkge1xuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlIChwKSB7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIHRoaXMudGVzdEFzeW5jKClcbiAgfVxuXG4gIHNsZWVwIChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcbiAgICAgIH0sIHMgKiAxMDAwKVxuICAgIH0pXG4gIH1cblxuICBhc3luYyB0ZXN0QXN5bmMgKCkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxuICBnZXRVc2VySW5mbyhwYWdlLCBjYikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcbiAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgIH0pXG4gICAgfVxuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSlcbiAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGRhdGEudXNlckluZm9cbiAgICAgICAgICAgIHRoYXQuSHR0cFJlcXVlc3QuVXNlckxvZ2luKHtwaG9uZTogJzEzNDAyMTU1NzUxJ30pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgIHRoYXQuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oe3Rva2VuOiB0b2tlbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySGFzaCA9IHJlcy5kYXRhLmRhdGEuaGFzaFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhhdC5nbG9iYWxEYXRhKVxuICAgICAgICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbCAocmVzKSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+ivt+ajgOafpee9kee7nOi/nuaOpe+8jOW5tumHjeaWsOW8gOWQr+aOiOadgycsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkub3BlblNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICfnmbvlvZXlpLHotKUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xkvb/nlKjlsI/nqIvluo/pg6jliIblip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZ2V0VG9rZW4gKHBhZ2UpIHtcbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSAhPT0gJycpIHtcbiAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfojrflj5bnmbvlvZXnirbmgIHlpLHotKUnLFxuICAgICAgICBjb250ZW50OiAn6K+354K55Ye756Gu6K6k6YeN5paw55m75b2VJyxcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9sb2dpbj9wYWdlPScgKyBwYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgc2hvd0xvYWRpbmcgKCkge1xuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgfSlcbiAgfVxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==