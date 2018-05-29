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
          var phoneNumber = res.data.data.phone;
          _wepy2.default.setStorageSync('phone', phoneNumber);
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
              url: './order?orderType=unpaid'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJjb2RlIiwibmlja05hbWUiLCJ1c2VySW1hZ2UiLCJtaXNzVG9rZW4iLCJnZXRUb2tlblRpbWUiLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwiZGF0YSIsImVycm9yIiwibXNnIiwiY29uc29sZSIsImxvZyIsInNob3dGYWlsIiwiZmFpbCIsImNvbXBsZXRlIiwiY2IiLCJsb2dpbiIsInJlcyIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZSIsImpzY29kZSIsImVuY3J5cHRlZERhdGEiLCJkZXRhaWwiLCJpdiIsIlNlbmRDb2RlIiwidGhlbiIsInBob25lTnVtYmVyIiwicGhvbmUiLCJzZXRTdG9yYWdlU3luYyIsInJlcXVlc3RUb2tlbiIsImNhdGNoIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJVc2VyTG9naW4iLCJ0b2tlbiIsInRpbWVPdXQiLCJnZXRVc2VyTGV2ZWwiLCJub3dUaW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJyZWZyZXNoVG9rZW4iLCJfdGhpcyIsIkdldFVzZXJJbmZvIiwibGV2ZWwiLCJoYXNoIiwidmlwRW5kIiwicmVkdWN0aW9uIiwiZ2V0VXNlckluZm8iLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwiY29uZmlybSIsInJlZGlyZWN0VG8iLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsTUFBTUMsUUFBUSxlQUFSLENBQVY7O0FBRUEsSUFBTUMsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7OztBQTJFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFdBeEVmQyxNQXdFZSxHQXhFTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxjQUhLLEVBSUwsYUFKSyxFQUtMLFlBTEssRUFNTCxjQU5LLEVBT0wsZ0JBUEssRUFRTCxjQVJLLEVBU0wsZUFUSyxFQVVMLGNBVkssRUFXTCxlQVhLLEVBWUwsZUFaSyxFQWFMLGNBYkssRUFjTCxhQWRLLEVBZUwsWUFmSyxFQWdCTCxlQWhCSyxFQWlCTCxpQkFqQkssRUFrQkwsYUFsQkssRUFtQkwsbUJBbkJLLEVBb0JMLGVBcEJLLEVBcUJMLGdCQXJCSyxFQXNCTCxlQXRCSyxDQURBO0FBeUJQQyxjQUFRO0FBQ05DLDZCQUFxQixNQURmO0FBRU5DLHlCQUFpQixTQUZYO0FBR05DLHNDQUE4QixTQUh4QjtBQUlOQyxnQ0FBd0IsUUFKbEI7QUFLTkMsZ0NBQXdCO0FBTGxCLE9BekJEO0FBZ0NQ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QVEsRUFBWixFQUFnQjtBQUNkLGlCQUFPLE1BQU1BLEtBQWI7QUFDRDtBQUNELGVBQU9BLEtBQVA7QUFDRCxPQUxEO0FBTUEsVUFBSUMsU0FBU0osWUFBWSxJQUFJakIsSUFBSixDQUFTaUIsU0FBVCxDQUFaLEdBQWtDLElBQUlqQixJQUFKLEVBQS9DO0FBQ0EsVUFBSXNCLE9BQU9ELE9BQU9FLFdBQVAsRUFBWDtBQUNBLFVBQUlDLFFBQVFMLEtBQUtFLE9BQU9JLFFBQVAsS0FBb0IsQ0FBekIsQ0FBWjtBQUNBLFVBQUlDLE1BQU1QLEtBQUtFLE9BQU9NLE9BQVAsRUFBTCxDQUFWO0FBQ0EsVUFBSUMsT0FBT1QsS0FBS0UsT0FBT1EsUUFBUCxFQUFMLENBQVg7QUFDQSxVQUFJQyxTQUFTWCxLQUFLRSxPQUFPVSxVQUFQLEVBQUwsQ0FBYjtBQUNBLFVBQUlDLFNBQVNiLEtBQUtFLE9BQU9ZLFVBQVAsRUFBTCxDQUFiO0FBQ0EsYUFBT2YsUUFBUWdCLE9BQVIsQ0FBZ0IsZUFBaEIsRUFBaUMsVUFBVUMsT0FBVixFQUFtQjtBQUN6RCxlQUFRO0FBQ05DLGFBQUdkLElBREc7QUFFTmUsYUFBR2IsS0FGRztBQUdOYyxhQUFHWixHQUhHO0FBSU5hLGFBQUdYLElBSkc7QUFLTlksYUFBR1YsTUFMRztBQU1OVyxhQUFHVDtBQU5HLFNBQUQsQ0FPSkcsT0FQSSxDQUFQO0FBUUQsT0FUTSxDQUFQO0FBVUQ7Ozs7RUE5UzBCLGVBQUtPLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdCdcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG5zZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvc3lzdGVtJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9uZXdBZGQnLFxuICAgICAgJ3BhZ2VzL2VkaXRBZGQnLFxuICAgICAgJ3BhZ2VzL3BheWNhcnQnLFxuICAgICAgJ3BhZ2VzL3BheWJ1eScsXG4gICAgICAncGFnZXMvcnVsZXMnLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL2NvbGxlY3QnLFxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljYScsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL29yZGVyRGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbnZvaWNlJyxcbiAgICAgICdwYWdlcy9hcHBseVZpcCcsXG4gICAgICAncGFnZXMvc2VydmljZSdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZjNWU0MycsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgY29sb3I6ICcjMjgyNjI2JyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmM1ZTQ0JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvaW5kZXgtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfpppbpobUnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5YiG57G7J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhcnQnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhcnQtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2FydC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9pidcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS91c2VyLWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL3VzZXItYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgdXNlckxldmVsOiBudWxsLFxuICAgIHVzZXJIYXNoOiBudWxsLFxuICAgIGNvZGU6IG51bGwsXG4gICAgbmlja05hbWU6IG51bGwsXG4gICAgdXNlckltYWdlOiBudWxsXG4gIH1cblxuICBtaXNzVG9rZW4gPSBmYWxzZVxuICBnZXRUb2tlblRpbWUgPSAwXG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG4gICAgICBjb25maWcgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAtMSAmJiBwLmRhdGEubXNnID09PSAnbWlzcyB0b2tlbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtaXNzIHRva2VuJylcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lKytcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFRva2VuVGltZSA8IDMpIHtcbiAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwocC5kYXRhLm1zZylcbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICAgICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBmYWlsIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8g5Yik5patdGFiYmFy5Zue6YCA6aG16Z2iXG4gIHBhZ2VSb290ID0gZmFsc2VcblxuICBvbkxhdW5jaCgpIHt9XG5cbiAgZ2V0TG9naW4gKGNiKSB7XG4gICAgd2VweS5sb2dpbih7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxuICAgICAgICBjYiAmJiBjYihyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBY29kZVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn572R57uc6L+e5o6l5aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRVc2VySW5mbyhlLCBjb2RlLCBjYikge1xuICAgIC8vIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgY29uc29sZS5sb2coZSwgY29kZSlcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGpzY29kZTogY29kZSxcbiAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogZS5kZXRhaWwuaXZcbiAgICB9XG4gICAgdGhpcy5IdHRwUmVxdWVzdC5TZW5kQ29kZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgcGhvbmVOdW1iZXIgPSByZXMuZGF0YS5kYXRhLnBob25lXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Bob25lJywgcGhvbmVOdW1iZXIpXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHBob25lOiBwaG9uZU51bWJlclxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdFRva2VuKGRhdGEsIGNiKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6lJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICAvLyDlt7LmnInmiYvmnLrlj7fojrflj5Z0b2tlblxuICBhc3luYyByZXF1ZXN0VG9rZW4gKGRhdGEsIGNiLCBmYWlsKSB7XG4gICAgYXdhaXQgdGhpcy5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICB2YXIgdGltZU91dCA9IHJlcy5kYXRhLmRhdGEudGltZU91dFxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JywgdGltZU91dClcbiAgICAgICAgLy8g6K6+572uZ2xvYmFs55qEdXNlciBsZXZlbCDlkowgaGFzaFxuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbilcbiAgICAgICAgY2IgJiYgY2IodG9rZW4pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsICYmIGZhaWwoKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgfSlcbiAgfVxuICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acn1xuICByZWZyZXNoVG9rZW4gKCkge1xuICAgIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfIOWmguaenOayoei/h+acn+ebtOaOpei/lOWbnnRva2Vu5YC8XG4gICAgdmFyIG5vd1RpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMClcbiAgICB2YXIgdGltZU91dCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnKVxuICAgIGlmIChub3dUaW1lID4gdGltZU91dCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgLy8g6L+U5Zue5b2T5YmNdG9rZW5cbiAgZ2V0VG9rZW4gKGVycm9yKSB7XG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykgPT09ICcnKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuL2xvZ2luJ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnJlZnJlc2hUb2tlbigpIHx8IGVycm9yID09PSAtMSkge1xuICAgICAgICAvLyB0b2tlbui/h+acnyDph43mlrDlj5HpgIHor7fmsYLojrflj5bmlrDnmoR0b2tlblxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdFRva2VuKGRhdGEpXG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOiOt+WPliB1c2VyIGxldmVsIOWSjCBoYXNoXG4gIGdldFVzZXJMZXZlbCAodG9rZW4pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyh7dG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS52aXBFbmQgPSByZXMuZGF0YS5kYXRhLnZpcEVuZFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnJlZHVjdGlvbiA9IHJlcy5kYXRhLmRhdGEucmVkdWN0aW9uXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICAvLyDliKTmlq3lvZPliY11c2VyIGhhc2jmmK/lkKbpnIDopoHph43nva5cbiAgcmVzZXRVc2VyTGV2ZWwgKGhhc2gsIHRva2VuKSB7XG4gICAgaWYgKGhhc2ggIT09IHRoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCkge1xuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4pXG4gICAgfVxuICB9XG4gIC8vIOWtmOeUqOaIt2dsb2JhbOS/oeaBr1xuICBnZXRVc2VyIChjYikge1xuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgc2hvd0xvYWRpbmcgKCkge1xuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgfSlcbiAgfVxuICBzaG93U3VjY2VzcyAoKSB7XG4gICAgd2VweS5oaWRlTG9hZGluZygpXG4gIH1cbiAgc2hvd0ZhaWwgKGVycm9yKSB7XG4gICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgdGl0bGU6IGVycm9yIHx8ICfliqDovb3lpLHotKUnLFxuICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgIH0pXG4gIH1cbiAgcGF5RmFpbCAoKSB7XG4gICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgY29udGVudDogJ+aUr+S7mOWksei0pScsXG4gICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVucGFpZCdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBkaXNhYmxlQXBpICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So6K+l5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgIH0pXG4gIH1cbiAgZGF0ZUZvcm1hdCAodGltZXN0YW1wLCBmb3JtYXRzKSB7XG4gICAgZm9ybWF0cyA9IGZvcm1hdHMgfHwgJ1ktbS1kJ1xuICAgIHZhciB6ZXJvID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICB2YXIgbXlEYXRlID0gdGltZXN0YW1wID8gbmV3IERhdGUodGltZXN0YW1wKSA6IG5ldyBEYXRlKClcbiAgICB2YXIgeWVhciA9IG15RGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgdmFyIG1vbnRoID0gemVybyhteURhdGUuZ2V0TW9udGgoKSArIDEpXG4gICAgdmFyIGRheSA9IHplcm8obXlEYXRlLmdldERhdGUoKSlcbiAgICB2YXIgaG91ciA9IHplcm8obXlEYXRlLmdldEhvdXJzKCkpXG4gICAgdmFyIG1pbml0ZSA9IHplcm8obXlEYXRlLmdldE1pbnV0ZXMoKSlcbiAgICB2YXIgc2Vjb25kID0gemVybyhteURhdGUuZ2V0U2Vjb25kcygpKVxuICAgIHJldHVybiBmb3JtYXRzLnJlcGxhY2UoL1l8bXxkfEh8aXxzL2lnLCBmdW5jdGlvbiAobWF0Y2hlcykge1xuICAgICAgcmV0dXJuICh7XG4gICAgICAgIFk6IHllYXIsXG4gICAgICAgIG06IG1vbnRoLFxuICAgICAgICBkOiBkYXksXG4gICAgICAgIEg6IGhvdXIsXG4gICAgICAgIGk6IG1pbml0ZSxcbiAgICAgICAgczogc2Vjb25kXG4gICAgICB9KVttYXRjaGVzXVxuICAgIH0pXG4gIH1cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxuICBNZDUgPSBNZDUuaGV4TUQ1XG59XG4iXX0=