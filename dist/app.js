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

    var _this2 = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this2.config = {
      pages: ['pages/login', 'pages/start', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/editAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order', 'pages/orderDetail', 'pages/invoice', 'pages/applyVip', 'pages/service'],
      window: {
        backgroundTextStyle: 'dark',
        backgroundColor: '#f8f8f8',
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
    _this2.globalData = {
      userInfo: null,
      userLevel: null,
      userHash: null,
      code: null,
      nickName: null,
      userImage: null
    };
    _this2.missToken = false;
    _this2.getTokenTime = 0;
    _this2.pageRoot = false;
    _this2.HttpRequest = new _HttpRequest2.default();
    _this2.Md5 = Md5.hexMD5;

    _this2.use('requestfix');
    _this2.intercept('request', {
      config: function config(p) {
        return p;
      },
      success: function success(p) {
        if (p.statusCode === 200) {
          if (p.data.error && p.data.error === -1 && p.data.msg === 'miss token') {
            console.log('miss token');
            this.getTokenTime++;
            if (this.getTokenTime < 3) {
              this.missToken = true;
            } else {
              this.missToken = false;
              this.showFail();
            }
          } else if (p.data.error && p.data.error === -2) {
            this.showFail(p.data.msg);
          } else if (p.data.error && p.data.error === 0) {
            this.missToken = false;
            this.getTokenTime = 0;
          }
        } else {
          this.missToken = false;
          this.getTokenTime = 0;
          this.showFail();
        }
        return p;
      },
      fail: function fail(p) {
        return p;
      },
      complete: function complete(p) {
        return p;
      }
    });
    return _this2;
  }

  // 判断tabbar回退页面


  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {}
  }, {
    key: 'getLogin',
    value: function getLogin(cb) {
      _wepy2.default.login({
        success: function success(res) {
          console.log(res.code);
          cb && cb(res.code);
          // 发送code
        },
        fail: function fail() {
          _wepy2.default.showToast({
            title: '网络连接失败',
            icon: 'none',
            image: '../image/cancel.png'
          });
        }
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(e, code, cb) {
      var _this3 = this;

      // this.globalData.userInfo = e.detail.userInfo
      console.log(e, code);
      var data = {
        jscode: code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      };
      this.HttpRequest.SendCode(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _wepy2.default.setStorageSync('phone', res.data.data.phone);
          var phoneNumber = res.data.data.phone;
          var data = {
            phone: phoneNumber
          };
          _this3.requestToken(data, cb);
        }
      }).catch(function () {
        _wepy2.default.showModal({
          title: '登录失败',
          content: '请检查网络连接',
          showCancel: false
        });
      });
      // 发送后台同时获取手机号/token/过期时间
      // 如果token过期 通过手机号 发送requestToken重置global数据 模拟数据{phone: '13402155751'}
      // this.requestToken({phone: '13402155751'}, cb)
      // wepy.getUserInfo({
      //   success: (data) => {
      //     that.globalData.userInfo = data.userInfo
      //     that.HttpRequest.UserLogin({phone: '13402155751'}).then((res) => {
      //       var token = res.data.data.token
      //       wepy.setStorageSync('token', token)
      //       that.HttpRequest.GetUserInfo({token: token}).then((res) => {
      //         if (res.data.error === 0) {
      //           that.globalData.userLevel = res.data.data.level
      //           that.globalData.userHash = res.data.data.hash
      //         }
      //       })
      //       cb && cb(res.userInfo)
      //     })
      //   },
      //   fail (res) {
      //     wepy.showModal({
      //       title: '警告',
      //       content: '请检查网络连接，并重新开启授权',
      //       success: (res) => {
      //         if (res.confirm) {
      //           wepy.openSetting({
      //             success: (res) => {
      //               if (res.authSetting['scope.userInfo']) {
      //                 console.log(res.authSetting['scope.userInfo'])
      //               } else {
      //                 wepy.showModal({
      //                   'title': '登录失败'
      //                 })
      //               }
      //             },
      //             fail: function () {
      //               wepy.showModal({
      //                 'title': '拒绝授权将无法使用小程序部分功能，请重新开启授权'
      //               })
      //             }
      //           })
      //         }
      //       }
      //     })
      //   }
      // })
    }
    // 已有手机号获取token

  }, {
    key: 'requestToken',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, cb, fail) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.HttpRequest.UserLogin(data).then(function (res) {
                  console.log(res);
                  if (res.data.error === 0) {
                    var token = res.data.data.token;
                    var timeOut = res.data.data.timeOut;
                    _wepy2.default.setStorageSync('token', token);
                    _wepy2.default.setStorageSync('timeout', timeOut);
                    // 设置global的user level 和 hash
                    _this4.getUserLevel(token);
                    cb && cb(token);
                  } else {
                    fail && fail();
                  }
                }).catch(function () {
                  fail && fail();
                });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function requestToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return requestToken;
    }()
    // 判断token是否过期

  }, {
    key: 'refreshToken',
    value: function refreshToken() {
      // 判断token是否过期 如果没过期直接返回token值
      var nowTime = Math.floor(new Date().getTime() / 1000);
      var timeOut = _wepy2.default.getStorageSync('timeout');
      if (nowTime > timeOut) {
        return false;
      } else {
        return true;
      }
    }

    // 返回当前token

  }, {
    key: 'getToken',
    value: function getToken(error) {
      if (_wepy2.default.getStorageSync('token') === '') {
        _wepy2.default.navigateTo({
          url: './login'
        });
      } else {
        if (!this.refreshToken() || error === -1) {
          // token过期 重新发送请求获取新的token
          var data = {
            phone: _wepy2.default.getStorageSync('phone')
          };
          this.requestToken(data);
          return _wepy2.default.getStorageSync('token');
        } else {
          return _wepy2.default.getStorageSync('token');
        }
      }
    }

    // 获取 user level 和 hash

  }, {
    key: 'getUserLevel',
    value: function getUserLevel(token) {
      var _this = this;
      this.HttpRequest.GetUserInfo({ token: token }).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.globalData.userLevel = res.data.data.level;
          _this.globalData.userHash = res.data.data.hash;
          _this.globalData.vipEnd = res.data.data.vipEnd;
          _this.globalData.reduction = res.data.data.reduction;
        }
      });
    }
    // 判断当前user hash是否需要重置

  }, {
    key: 'resetUserLevel',
    value: function resetUserLevel(hash, token) {
      if (hash !== this.globalData.userHash) {
        this.getUserLevel(token);
      }
    }
    // 存用户global信息

  }, {
    key: 'getUser',
    value: function getUser(cb) {
      var _this5 = this;

      _wepy2.default.getUserInfo({
        success: function success(res) {
          _this5.globalData.userInfo = res.userInfo;
          cb && cb();
        }
      });
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
    key: 'showSuccess',
    value: function showSuccess() {
      _wepy2.default.hideLoading();
    }
  }, {
    key: 'showFail',
    value: function showFail(error) {
      _wepy2.default.hideLoading();
      _wepy2.default.showToast({
        title: error || '加载失败',
        icon: 'none',
        image: '../image/cancel.png'
      });
    }
  }, {
    key: 'payFail',
    value: function payFail() {
      _wepy2.default.showModal({
        title: '提示',
        content: '支付失败',
        showCancel: false,
        success: function success(res) {
          if (res.confirm) {
            _wepy2.default.redirectTo({
              url: './order'
            });
          }
        }
      });
    }
  }, {
    key: 'disableApi',
    value: function disableApi() {
      _wepy2.default.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJjb2RlIiwibmlja05hbWUiLCJ1c2VySW1hZ2UiLCJtaXNzVG9rZW4iLCJnZXRUb2tlblRpbWUiLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwiZGF0YSIsImVycm9yIiwibXNnIiwiY29uc29sZSIsImxvZyIsInNob3dGYWlsIiwiZmFpbCIsImNvbXBsZXRlIiwiY2IiLCJsb2dpbiIsInJlcyIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZSIsImpzY29kZSIsImVuY3J5cHRlZERhdGEiLCJkZXRhaWwiLCJpdiIsIlNlbmRDb2RlIiwidGhlbiIsInNldFN0b3JhZ2VTeW5jIiwicGhvbmUiLCJwaG9uZU51bWJlciIsInJlcXVlc3RUb2tlbiIsImNhdGNoIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJVc2VyTG9naW4iLCJ0b2tlbiIsInRpbWVPdXQiLCJnZXRVc2VyTGV2ZWwiLCJub3dUaW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJyZWZyZXNoVG9rZW4iLCJfdGhpcyIsIkdldFVzZXJJbmZvIiwibGV2ZWwiLCJoYXNoIiwidmlwRW5kIiwicmVkdWN0aW9uIiwiZ2V0VXNlckluZm8iLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwiY29uZmlybSIsInJlZGlyZWN0VG8iLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsTUFBTUMsUUFBUSxlQUFSLENBQVY7O0FBRUEsSUFBTUMsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7OztBQTJFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFdBeEVmQyxNQXdFZSxHQXhFTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxjQUhLLEVBSUwsYUFKSyxFQUtMLFlBTEssRUFNTCxjQU5LLEVBT0wsZ0JBUEssRUFRTCxjQVJLLEVBU0wsZUFUSyxFQVVMLGNBVkssRUFXTCxlQVhLLEVBWUwsZUFaSyxFQWFMLGNBYkssRUFjTCxhQWRLLEVBZUwsWUFmSyxFQWdCTCxlQWhCSyxFQWlCTCxpQkFqQkssRUFrQkwsYUFsQkssRUFtQkwsbUJBbkJLLEVBb0JMLGVBcEJLLEVBcUJMLGdCQXJCSyxFQXNCTCxlQXRCSyxDQURBO0FBeUJQQyxjQUFRO0FBQ05DLDZCQUFxQixNQURmO0FBRU5DLHlCQUFpQixTQUZYO0FBR05DLHNDQUE4QixTQUh4QjtBQUlOQyxnQ0FBd0IsUUFKbEI7QUFLTkMsZ0NBQXdCO0FBTGxCLE9BekJEO0FBZ0NQ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anMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuXG5pbXBvcnQgSHR0cFJlcXVlc3QgZnJvbSAnLi9zZXJ2aWNlL0h0dHBSZXF1ZXN0J1xudmFyIE1kNSA9IHJlcXVpcmUoJy4vc2VydmljZS9tZDUnKVxuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcbnNldFN0b3JlKHN0b3JlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL3N0YXJ0JyxcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9jYXJ0JyxcbiAgICAgICdwYWdlcy9zeXN0ZW0nLFxuICAgICAgJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICdwYWdlcy9zZWFyY2gnLFxuICAgICAgJ3BhZ2VzL2FkZHJlc3MnLFxuICAgICAgJ3BhZ2VzL25ld0FkZCcsXG4gICAgICAncGFnZXMvZWRpdEFkZCcsXG4gICAgICAncGFnZXMvcGF5Y2FydCcsXG4gICAgICAncGFnZXMvcGF5YnV5JyxcbiAgICAgICdwYWdlcy9ydWxlcycsXG4gICAgICAncGFnZXMvdXNlcicsXG4gICAgICAncGFnZXMvY29sbGVjdCcsXG4gICAgICAncGFnZXMvbG9naXN0aWNhJyxcbiAgICAgICdwYWdlcy9vcmRlcicsXG4gICAgICAncGFnZXMvb3JkZXJEZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2ludm9pY2UnLFxuICAgICAgJ3BhZ2VzL2FwcGx5VmlwJyxcbiAgICAgICdwYWdlcy9zZXJ2aWNlJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmM1ZTQzJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmYzVlNDQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfliIbnsbsnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2FydCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2FydC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXJ0LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6LSt54mp6L2mJ1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXInLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL3VzZXItZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTGV2ZWw6IG51bGwsXG4gICAgdXNlckhhc2g6IG51bGwsXG4gICAgY29kZTogbnVsbCxcbiAgICBuaWNrTmFtZTogbnVsbCxcbiAgICB1c2VySW1hZ2U6IG51bGxcbiAgfVxuXG4gIG1pc3NUb2tlbiA9IGZhbHNlXG4gIGdldFRva2VuVGltZSA9IDBcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcbiAgICAgIGNvbmZpZyAocCkge1xuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MgKHApIHtcbiAgICAgICAgaWYgKHAuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IC0xICYmIHAuZGF0YS5tc2cgPT09ICdtaXNzIHRva2VuJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21pc3MgdG9rZW4nKVxuICAgICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUrK1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW5UaW1lIDwgMykge1xuICAgICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAtMikge1xuICAgICAgICAgICAgdGhpcy5zaG93RmFpbChwLmRhdGEubXNnKVxuICAgICAgICAgIH0gZWxzZSBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB0aGlzLnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSAocCkge1xuICAgICAgICByZXR1cm4gcFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyDliKTmlq10YWJiYXLlm57pgIDpobXpnaJcbiAgcGFnZVJvb3QgPSBmYWxzZVxuXG4gIG9uTGF1bmNoKCkge31cblxuICBnZXRMb2dpbiAoY2IpIHtcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgIGNiICYmIGNiKHJlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIFjb2RlXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGUsIGNvZGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlLCBjb2RlKVxuICAgIHZhciBkYXRhID0ge1xuICAgICAganNjb2RlOiBjb2RlLFxuICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgIH1cbiAgICB0aGlzLkh0dHBSZXF1ZXN0LlNlbmRDb2RlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Bob25lJywgcmVzLmRhdGEuZGF0YS5waG9uZSlcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gcmVzLmRhdGEuZGF0YS5waG9uZVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogcGhvbmVOdW1iZXJcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhLCBjYilcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogJ+ivt+ajgOafpee9kee7nOi/nuaOpScsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gICAgLy8g5Y+R6YCB5ZCO5Y+w5ZCM5pe26I635Y+W5omL5py65Y+3L3Rva2VuL+i/h+acn+aXtumXtFxuICAgIC8vIOWmguaenHRva2Vu6L+H5pyfIOmAmui/h+aJi+acuuWPtyDlj5HpgIFyZXF1ZXN0VG9rZW7ph43nva5nbG9iYWzmlbDmja4g5qih5ouf5pWw5o2ue3Bob25lOiAnMTM0MDIxNTU3NTEnfVxuICAgIC8vIHRoaXMucmVxdWVzdFRva2VuKHtwaG9uZTogJzEzNDAyMTU1NzUxJ30sIGNiKVxuICAgIC8vIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgIC8vICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAvLyAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZGF0YS51c2VySW5mb1xuICAgIC8vICAgICB0aGF0Lkh0dHBSZXF1ZXN0LlVzZXJMb2dpbih7cGhvbmU6ICcxMzQwMjE1NTc1MSd9KS50aGVuKChyZXMpID0+IHtcbiAgICAvLyAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgLy8gICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCB0b2tlbilcbiAgICAvLyAgICAgICB0aGF0Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAvLyAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgIC8vICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckxldmVsID0gcmVzLmRhdGEuZGF0YS5sZXZlbFxuICAgIC8vICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICB9KVxuICAgIC8vICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgIH0sXG4gICAgLy8gICBmYWlsIChyZXMpIHtcbiAgICAvLyAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgIC8vICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcbiAgICAvLyAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6l77yM5bm26YeN5paw5byA5ZCv5o6I5p2DJyxcbiAgICAvLyAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgLy8gICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAvLyAgICAgICAgICAgd2VweS5vcGVuU2V0dGluZyh7XG4gICAgLy8gICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pXG4gICAgLy8gICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ+eZu+W9leWksei0pSdcbiAgICAvLyAgICAgICAgICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAvLyAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ+aLkue7neaOiOadg+WwhuaXoOazleS9v+eUqOWwj+eoi+W6j+mDqOWIhuWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAvLyAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICB9XG4gIC8vIOW3suacieaJi+acuuWPt+iOt+WPlnRva2VuXG4gIGFzeW5jIHJlcXVlc3RUb2tlbiAoZGF0YSwgY2IsIGZhaWwpIHtcbiAgICBhd2FpdCB0aGlzLkh0dHBSZXF1ZXN0LlVzZXJMb2dpbihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICAgIHZhciB0aW1lT3V0ID0gcmVzLmRhdGEuZGF0YS50aW1lT3V0XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnLCB0aW1lT3V0KVxuICAgICAgICAvLyDorr7nva5nbG9iYWznmoR1c2VyIGxldmVsIOWSjCBoYXNoXG4gICAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuKVxuICAgICAgICBjYiAmJiBjYih0b2tlbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfXG4gIHJlZnJlc2hUb2tlbiAoKSB7XG4gICAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ8g5aaC5p6c5rKh6L+H5pyf55u05o6l6L+U5ZuedG9rZW7lgLxcbiAgICB2YXIgbm93VGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKVxuICAgIHZhciB0aW1lT3V0ID0gd2VweS5nZXRTdG9yYWdlU3luYygndGltZW91dCcpXG4gICAgaWYgKG5vd1RpbWUgPiB0aW1lT3V0KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICAvLyDov5Tlm57lvZPliY10b2tlblxuICBnZXRUb2tlbiAoZXJyb3IpIHtcbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSA9PT0gJycpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4vbG9naW4nXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMucmVmcmVzaFRva2VuKCkgfHwgZXJyb3IgPT09IC0xKSB7XG4gICAgICAgIC8vIHRva2Vu6L+H5pyfIOmHjeaWsOWPkemAgeivt+axguiOt+WPluaWsOeahHRva2VuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSlcbiAgICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g6I635Y+WIHVzZXIgbGV2ZWwg5ZKMIGhhc2hcbiAgZ2V0VXNlckxldmVsICh0b2tlbikge1xuICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICB0aGlzLkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCA9IHJlcy5kYXRhLmRhdGEuaGFzaFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnZpcEVuZCA9IHJlcy5kYXRhLmRhdGEudmlwRW5kXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEucmVkdWN0aW9uID0gcmVzLmRhdGEuZGF0YS5yZWR1Y3Rpb25cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWreW9k+WJjXVzZXIgaGFzaOaYr+WQpumcgOimgemHjee9rlxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4pIHtcbiAgICBpZiAoaGFzaCAhPT0gdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKSB7XG4gICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbilcbiAgICB9XG4gIH1cbiAgLy8g5a2Y55So5oi3Z2xvYmFs5L+h5oGvXG4gIGdldFVzZXIgKGNiKSB7XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBzaG93TG9hZGluZyAoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICBpY29uOiAnbG9hZGluZydcbiAgICB9KVxuICB9XG4gIHNob3dTdWNjZXNzICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgfVxuICBzaG93RmFpbCAoZXJyb3IpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogZXJyb3IgfHwgJ+WKoOi9veWksei0pScsXG4gICAgICBpY29uOiAnbm9uZScsXG4gICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgfSlcbiAgfVxuICBwYXlGYWlsICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5pSv5LuY5aSx6LSlJyxcbiAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBkaXNhYmxlQXBpICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So6K+l5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgIH0pXG4gIH1cbiAgZGF0ZUZvcm1hdCAodGltZXN0YW1wLCBmb3JtYXRzKSB7XG4gICAgZm9ybWF0cyA9IGZvcm1hdHMgfHwgJ1ktbS1kJ1xuICAgIHZhciB6ZXJvID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICB2YXIgbXlEYXRlID0gdGltZXN0YW1wID8gbmV3IERhdGUodGltZXN0YW1wKSA6IG5ldyBEYXRlKClcbiAgICB2YXIgeWVhciA9IG15RGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgdmFyIG1vbnRoID0gemVybyhteURhdGUuZ2V0TW9udGgoKSArIDEpXG4gICAgdmFyIGRheSA9IHplcm8obXlEYXRlLmdldERhdGUoKSlcbiAgICB2YXIgaG91ciA9IHplcm8obXlEYXRlLmdldEhvdXJzKCkpXG4gICAgdmFyIG1pbml0ZSA9IHplcm8obXlEYXRlLmdldE1pbnV0ZXMoKSlcbiAgICB2YXIgc2Vjb25kID0gemVybyhteURhdGUuZ2V0U2Vjb25kcygpKVxuICAgIHJldHVybiBmb3JtYXRzLnJlcGxhY2UoL1l8bXxkfEh8aXxzL2lnLCBmdW5jdGlvbiAobWF0Y2hlcykge1xuICAgICAgcmV0dXJuICh7XG4gICAgICAgIFk6IHllYXIsXG4gICAgICAgIG06IG1vbnRoLFxuICAgICAgICBkOiBkYXksXG4gICAgICAgIEg6IGhvdXIsXG4gICAgICAgIGk6IG1pbml0ZSxcbiAgICAgICAgczogc2Vjb25kXG4gICAgICB9KVttYXRjaGVzXVxuICAgIH0pXG4gIH1cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxuICBNZDUgPSBNZDUuaGV4TUQ1XG59XG4iXX0=