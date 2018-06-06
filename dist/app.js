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
        navigationBarBackgroundColor: '#ec3d3a',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#282626',
        selectedColor: '#ec3d3a',
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
    _this2.httpId = [];
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
        // 记录request info
        if (p.statusCode === 200) {
          if (p.data.httpId) {
            if (this.httpId.length < 10) {
              this.httpId.push(p.data.httpId);
            } else {
              this.httpId.shift();
              this.httpId.push(p.data.httpId);
            }
          }
        }
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
    value: function getUserInfo(e, code, refrenceCode, cb) {
      var _this3 = this;

      // this.globalData.userInfo = e.detail.userInfo
      console.log(e, code, refrenceCode);
      var data = {
        jscode: code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        referenceId: refrenceCode
      };
      console.log(data);
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
                    _this4.getUserLevel(token, function () {
                      cb && cb(token);
                    });
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
    value: function getToken(error, refrence) {
      var refrenceCode = '';
      if (refrence) {
        refrenceCode = refrence;
      }
      if (_wepy2.default.getStorageSync('token') === '') {
        _wepy2.default.navigateTo({
          url: './login?refrenceCode=' + refrenceCode
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
    value: function getUserLevel(token, cb) {
      var _this = this;
      this.HttpRequest.GetUserInfo({ token: token }).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.globalData.userLevel = res.data.data.level;
          _this.globalData.userHash = res.data.data.hash;
          _this.globalData.vipEnd = res.data.data.vipEnd;
          _this.globalData.reduction = res.data.data.reduction;
          _this.globalData.memberId = res.data.data.memberId;
          cb && cb();
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
    key: 'hideLoading',
    value: function hideLoading() {
      _wepy2.default.hideLoading();
    }
  }, {
    key: 'showFail',
    value: function showFail(error) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJjb2RlIiwibmlja05hbWUiLCJ1c2VySW1hZ2UiLCJtaXNzVG9rZW4iLCJnZXRUb2tlblRpbWUiLCJodHRwSWQiLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwiZGF0YSIsImVycm9yIiwibXNnIiwiY29uc29sZSIsImxvZyIsInNob3dGYWlsIiwiZmFpbCIsImNvbXBsZXRlIiwibGVuZ3RoIiwicHVzaCIsInNoaWZ0IiwiY2IiLCJsb2dpbiIsInJlcyIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZSIsInJlZnJlbmNlQ29kZSIsImpzY29kZSIsImVuY3J5cHRlZERhdGEiLCJkZXRhaWwiLCJpdiIsInJlZmVyZW5jZUlkIiwiU2VuZENvZGUiLCJ0aGVuIiwicGhvbmVOdW1iZXIiLCJwaG9uZSIsInNldFN0b3JhZ2VTeW5jIiwicmVxdWVzdFRva2VuIiwiY2F0Y2giLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIlVzZXJMb2dpbiIsInRva2VuIiwidGltZU91dCIsImdldFVzZXJMZXZlbCIsIm5vd1RpbWUiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiZ2V0VGltZSIsImdldFN0b3JhZ2VTeW5jIiwicmVmcmVuY2UiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVmcmVzaFRva2VuIiwiX3RoaXMiLCJHZXRVc2VySW5mbyIsImxldmVsIiwiaGFzaCIsInZpcEVuZCIsInJlZHVjdGlvbiIsIm1lbWJlcklkIiwiZ2V0VXNlckluZm8iLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwiY29uZmlybSIsInJlZGlyZWN0VG8iLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsTUFBTUMsUUFBUSxlQUFSLENBQVY7O0FBRUEsSUFBTUMsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7OztBQTRFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFdBekVmQyxNQXlFZSxHQXpFTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxjQUhLLEVBSUwsYUFKSyxFQUtMLFlBTEssRUFNTCxjQU5LLEVBT0wsZ0JBUEssRUFRTCxjQVJLLEVBU0wsZUFUSyxFQVVMLGNBVkssRUFXTCxlQVhLLEVBWUwsZUFaSyxFQWFMLGNBYkssRUFjTCxhQWRLLEVBZUwsWUFmSyxFQWdCTCxlQWhCSyxFQWlCTCxpQkFqQkssRUFrQkwsYUFsQkssRUFtQkwsbUJBbkJLLEVBb0JMLGVBcEJLLEVBcUJMLGdCQXJCSyxFQXNCTCxlQXRCSyxDQURBO0FBeUJQQyxjQUFRO0FBQ05DLDZCQUFxQixNQURmO0FB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QUlDLE1BQU1QLEtBQUtFLE9BQU9NLE9BQVAsRUFBTCxDQUFWO0FBQ0EsVUFBSUMsT0FBT1QsS0FBS0UsT0FBT1EsUUFBUCxFQUFMLENBQVg7QUFDQSxVQUFJQyxTQUFTWCxLQUFLRSxPQUFPVSxVQUFQLEVBQUwsQ0FBYjtBQUNBLFVBQUlDLFNBQVNiLEtBQUtFLE9BQU9ZLFVBQVAsRUFBTCxDQUFiO0FBQ0EsYUFBT2YsUUFBUWdCLE9BQVIsQ0FBZ0IsZUFBaEIsRUFBaUMsVUFBVUMsT0FBVixFQUFtQjtBQUN6RCxlQUFRO0FBQ05DLGFBQUdkLElBREc7QUFFTmUsYUFBR2IsS0FGRztBQUdOYyxhQUFHWixHQUhHO0FBSU5hLGFBQUdYLElBSkc7QUFLTlksYUFBR1YsTUFMRztBQU1OVyxhQUFHVDtBQU5HLFNBQUQsQ0FPSkcsT0FQSSxDQUFQO0FBUUQsT0FUTSxDQUFQO0FBVUQ7Ozs7RUFqVTBCLGVBQUtPLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdCdcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG5zZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvc3lzdGVtJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9uZXdBZGQnLFxuICAgICAgJ3BhZ2VzL2VkaXRBZGQnLFxuICAgICAgJ3BhZ2VzL3BheWNhcnQnLFxuICAgICAgJ3BhZ2VzL3BheWJ1eScsXG4gICAgICAncGFnZXMvcnVsZXMnLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL2NvbGxlY3QnLFxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljYScsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL29yZGVyRGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbnZvaWNlJyxcbiAgICAgICdwYWdlcy9hcHBseVZpcCcsXG4gICAgICAncGFnZXMvc2VydmljZSdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2VjM2QzYScsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgY29sb3I6ICcjMjgyNjI2JyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZWMzZDNhJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvaW5kZXgtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfpppbpobUnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5YiG57G7J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhcnQnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhcnQtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2FydC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9pidcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS91c2VyLWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL3VzZXItYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgdXNlckxldmVsOiBudWxsLFxuICAgIHVzZXJIYXNoOiBudWxsLFxuICAgIGNvZGU6IG51bGwsXG4gICAgbmlja05hbWU6IG51bGwsXG4gICAgdXNlckltYWdlOiBudWxsXG4gIH1cblxuICBtaXNzVG9rZW4gPSBmYWxzZVxuICBnZXRUb2tlblRpbWUgPSAwXG4gIGh0dHBJZCA9IFtdXG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG4gICAgICBjb25maWcgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAtMSAmJiBwLmRhdGEubXNnID09PSAnbWlzcyB0b2tlbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtaXNzIHRva2VuJylcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lKytcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFRva2VuVGltZSA8IDMpIHtcbiAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwocC5kYXRhLm1zZylcbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICAgICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBmYWlsIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgICAgLy8g6K6w5b2VcmVxdWVzdCBpbmZvXG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuaHR0cElkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5odHRwSWQubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQucHVzaChwLmRhdGEuaHR0cElkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQuc2hpZnQoKVxuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5wdXNoKHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIOWIpOaWrXRhYmJhcuWbnumAgOmhtemdolxuICBwYWdlUm9vdCA9IGZhbHNlXG5cbiAgb25MYXVuY2goKSB7fVxuXG4gIGdldExvZ2luIChjYikge1xuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjYiAmJiBjYihyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBY29kZVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn572R57uc6L+e5o6l5aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRVc2VySW5mbyhlLCBjb2RlLCByZWZyZW5jZUNvZGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlLCBjb2RlLCByZWZyZW5jZUNvZGUpXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBqc2NvZGU6IGNvZGUsXG4gICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgaXY6IGUuZGV0YWlsLml2LFxuICAgICAgcmVmZXJlbmNlSWQ6IHJlZnJlbmNlQ29kZVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2VuZENvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gcmVzLmRhdGEuZGF0YS5waG9uZVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwaG9uZScsIHBob25lTnVtYmVyKVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogcGhvbmVOdW1iZXJcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhLCBjYilcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogJ+ivt+ajgOafpee9kee7nOi/nuaOpScsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgLy8g5bey5pyJ5omL5py65Y+36I635Y+WdG9rZW5cbiAgYXN5bmMgcmVxdWVzdFRva2VuIChkYXRhLCBjYiwgZmFpbCkge1xuICAgIGF3YWl0IHRoaXMuSHR0cFJlcXVlc3QuVXNlckxvZ2luKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICAgICAgdmFyIHRpbWVPdXQgPSByZXMuZGF0YS5kYXRhLnRpbWVPdXRcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCB0b2tlbilcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndGltZW91dCcsIHRpbWVPdXQpXG4gICAgICAgIC8vIOiuvue9rmdsb2JhbOeahHVzZXIgbGV2ZWwg5ZKMIGhhc2hcbiAgICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4sICgpID0+IHtcbiAgICAgICAgICBjYiAmJiBjYih0b2tlbilcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfXG4gIHJlZnJlc2hUb2tlbiAoKSB7XG4gICAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ8g5aaC5p6c5rKh6L+H5pyf55u05o6l6L+U5ZuedG9rZW7lgLxcbiAgICB2YXIgbm93VGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKVxuICAgIHZhciB0aW1lT3V0ID0gd2VweS5nZXRTdG9yYWdlU3luYygndGltZW91dCcpXG4gICAgaWYgKG5vd1RpbWUgPiB0aW1lT3V0KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICAvLyDov5Tlm57lvZPliY10b2tlblxuICBnZXRUb2tlbiAoZXJyb3IsIHJlZnJlbmNlKSB7XG4gICAgdmFyIHJlZnJlbmNlQ29kZSA9ICcnXG4gICAgaWYgKHJlZnJlbmNlKSB7XG4gICAgICByZWZyZW5jZUNvZGUgPSByZWZyZW5jZVxuICAgIH1cbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSA9PT0gJycpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4vbG9naW4/cmVmcmVuY2VDb2RlPScgKyByZWZyZW5jZUNvZGVcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5yZWZyZXNoVG9rZW4oKSB8fCBlcnJvciA9PT0gLTEpIHtcbiAgICAgICAgLy8gdG9rZW7ov4fmnJ8g6YeN5paw5Y+R6YCB6K+35rGC6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgcGhvbmU6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhKVxuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDojrflj5YgdXNlciBsZXZlbCDlkowgaGFzaFxuICBnZXRVc2VyTGV2ZWwgKHRva2VuLCBjYikge1xuICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICB0aGlzLkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCA9IHJlcy5kYXRhLmRhdGEuaGFzaFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnZpcEVuZCA9IHJlcy5kYXRhLmRhdGEudmlwRW5kXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEucmVkdWN0aW9uID0gcmVzLmRhdGEuZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5tZW1iZXJJZCA9IHJlcy5kYXRhLmRhdGEubWVtYmVySWRcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5pat5b2T5YmNdXNlciBoYXNo5piv5ZCm6ZyA6KaB6YeN572uXG4gIHJlc2V0VXNlckxldmVsIChoYXNoLCB0b2tlbikge1xuICAgIGlmIChoYXNoICE9PSB0aGlzLmdsb2JhbERhdGEudXNlckhhc2gpIHtcbiAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuKVxuICAgIH1cbiAgfVxuICAvLyDlrZjnlKjmiLdnbG9iYWzkv6Hmga9cbiAgZ2V0VXNlciAoY2IpIHtcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgaGlkZUxvYWRpbmcgKCkge1xuICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICB9XG4gIHNob3dGYWlsIChlcnJvcikge1xuICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiBlcnJvciB8fCAn5Yqg6L295aSx6LSlJyxcbiAgICAgIGljb246ICdub25lJyxcbiAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICB9KVxuICB9XG4gIHBheUZhaWwgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICfmlK/ku5jlpLHotKUnLFxuICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGRpc2FibGVBcGkgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjor6Xlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInXG4gICAgfSlcbiAgfVxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==