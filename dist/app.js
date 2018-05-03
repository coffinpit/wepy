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
      pages: ['pages/start', 'pages/login', 'pages/index', 'pages/detail', 'pages/cart', 'pages/user', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJ0aW1lc3RhbXAiLCJEYXRlIiwic3VjY2VzcyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiY29tcGxldGUiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInBhZ2UiLCJjYiIsInRoYXQiLCJnZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInVybCIsImxvZ2luIiwicmVzIiwiY29kZSIsImdldFVzZXJJbmZvIiwiVXNlckxvZ2luIiwicGhvbmUiLCJ0aGVuIiwidG9rZW4iLCJzZXRTdG9yYWdlU3luYyIsIkdldFVzZXJJbmZvIiwiZXJyb3IiLCJsZXZlbCIsImhhc2giLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsIm9wZW5TZXR0aW5nIiwiYXV0aFNldHRpbmciLCJuYXZpZ2F0ZVRvIiwic2hvd0xvYWRpbmciLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxNQUFNQyxRQUFRLGVBQVIsQ0FBVjs7QUFFQSxJQUFNQyxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7Ozs7O0FBd0RFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFyRGZDLE1BcURlLEdBckROO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGFBSEssRUFJTCxjQUpLLEVBS0wsWUFMSyxFQU1MLFlBTkssRUFPTCxnQkFQSyxFQVFMLGNBUkssRUFTTCxlQVRLLEVBVUwsY0FWSyxDQURBO0FBYVBDLGNBQVE7QUFDTkMsNkJBQXFCLE1BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FiRDtBQW1CUEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOQyx5QkFBaUIsU0FIWDtBQUlOQyxjQUFNLENBQUM7QUFDTEMsb0JBQVUsYUFETDtBQUVMQyxvQkFBVSx5QkFGTDtBQUdMQyw0QkFBa0Isd0JBSGI7QUFJTEMsZ0JBQU07QUFKRCxTQUFELEVBS0g7QUFDREgsb0JBQVUsZ0JBRFQ7QUFFREMsb0JBQVUsNEJBRlQ7QUFHREMsNEJBQWtCLDJCQUhqQjtBQUlEQyxnQkFBTTtBQUpMLFNBTEcsRUFVSDtBQUNESCxvQkFBVSxZQURUO0FBRURDLG9CQUFVLHdCQUZUO0FBR0RDLDRCQUFrQix1QkFIakI7QUFJREMsZ0JBQU07QUFKTCxTQVZHLEVBZUg7QUFDREgsb0JBQVUsWUFEVDtBQUVEQyxvQkFBVSx3QkFG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bmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuXG5pbXBvcnQgSHR0cFJlcXVlc3QgZnJvbSAnLi9zZXJ2aWNlL0h0dHBSZXF1ZXN0J1xudmFyIE1kNSA9IHJlcXVpcmUoJy4vc2VydmljZS9tZDUnKVxuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcbnNldFN0b3JlKHN0b3JlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9jYXJ0JyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9uZXdBZGQnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmM1ZTQzJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmYzVlNDQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfliIbnsbsnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2FydCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2FydC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXJ0LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6LSt54mp6L2mJ1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXInLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL3VzZXItZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTGV2ZWw6IG51bGwsXG4gICAgdXNlckhhc2g6IG51bGxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHAudGltZXN0YW1wID0gK25ldyBEYXRlKClcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSAocCkge1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cbiAgZ2V0VXNlckluZm8ocGFnZSwgY2IpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSBkYXRhLnVzZXJJbmZvXG4gICAgICAgICAgICB0aGF0Lkh0dHBSZXF1ZXN0LlVzZXJMb2dpbih7cGhvbmU6ICcxMzQwMjE1NTc1MSd9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICB0aGF0Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuZ2xvYmFsRGF0YSlcbiAgICAgICAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwgKHJlcykge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fmo4Dmn6XnvZHnu5zov57mjqXvvIzlubbph43mlrDlvIDlkK/mjojmnYMnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSlcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAn55m75b2V5aSx6LSlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5L2/55So5bCP56iL5bqP6YOo5YiG5Yqf6IO977yM6K+36YeN5paw5byA5ZCv5o6I5p2DJ1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGdldFRva2VuIChwYWdlKSB7XG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykgIT09ICcnKSB7XG4gICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn6I635Y+W55m75b2V54q25oCB5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogJ+ivt+eCueWHu+ehruiupOmHjeaWsOeZu+W9lScsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vbG9naW4/cGFnZT0nICsgcGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgZGF0ZUZvcm1hdCAodGltZXN0YW1wLCBmb3JtYXRzKSB7XG4gICAgZm9ybWF0cyA9IGZvcm1hdHMgfHwgJ1ktbS1kJ1xuICAgIHZhciB6ZXJvID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICB2YXIgbXlEYXRlID0gdGltZXN0YW1wID8gbmV3IERhdGUodGltZXN0YW1wKSA6IG5ldyBEYXRlKClcbiAgICB2YXIgeWVhciA9IG15RGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgdmFyIG1vbnRoID0gemVybyhteURhdGUuZ2V0TW9udGgoKSArIDEpXG4gICAgdmFyIGRheSA9IHplcm8obXlEYXRlLmdldERhdGUoKSlcbiAgICB2YXIgaG91ciA9IHplcm8obXlEYXRlLmdldEhvdXJzKCkpXG4gICAgdmFyIG1pbml0ZSA9IHplcm8obXlEYXRlLmdldE1pbnV0ZXMoKSlcbiAgICB2YXIgc2Vjb25kID0gemVybyhteURhdGUuZ2V0U2Vjb25kcygpKVxuICAgIHJldHVybiBmb3JtYXRzLnJlcGxhY2UoL1l8bXxkfEh8aXxzL2lnLCBmdW5jdGlvbiAobWF0Y2hlcykge1xuICAgICAgcmV0dXJuICh7XG4gICAgICAgIFk6IHllYXIsXG4gICAgICAgIG06IG1vbnRoLFxuICAgICAgICBkOiBkYXksXG4gICAgICAgIEg6IGhvdXIsXG4gICAgICAgIGk6IG1pbml0ZSxcbiAgICAgICAgczogc2Vjb25kXG4gICAgICB9KVttYXRjaGVzXVxuICAgIH0pXG4gIH1cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxuICBNZDUgPSBNZDUuaGV4TUQ1XG59XG4iXX0=