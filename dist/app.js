'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _HttpRequest = require('./service/HttpRequest.js');

var _HttpRequest2 = _interopRequireDefault(_HttpRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { setStore } from 'wepy-redux'
// import configStore from './store'

var Md5 = require('./service/md5.js');

// const store = configStore()
// setStore(store)

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
          console.log(res);
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
          cb && cb();
          // var data = {
          //   phone: phoneNumber
          // }
          // this.requestToken(data, cb)
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
        var _this3 = this;

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
                    _this3.getUserLevel(token, function () {
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
      var _this4 = this;

      _wepy2.default.getUserInfo({
        success: function success(res) {
          _this4.globalData.userInfo = res.userInfo;
          console.log(_this4.globalData);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwicGFnZVJvb3QiLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsImRhdGEiLCJlcnJvciIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzaG93RmFpbCIsImZhaWwiLCJjb21wbGV0ZSIsImxlbmd0aCIsInB1c2giLCJzaGlmdCIsImNiIiwibG9naW4iLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImUiLCJyZWZyZW5jZUNvZGUiLCJqc2NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJyZWZlcmVuY2VJZCIsIlNlbmRDb2RlIiwidGhlbiIsInBob25lTnVtYmVyIiwicGhvbmUiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJVc2VyTG9naW4iLCJ0b2tlbiIsInRpbWVPdXQiLCJnZXRVc2VyTGV2ZWwiLCJub3dUaW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRTdG9yYWdlU3luYyIsInJlZnJlbmNlIiwibmF2aWdhdGVUbyIsInVybCIsInJlZnJlc2hUb2tlbiIsInJlcXVlc3RUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJsZXZlbCIsImhhc2giLCJ2aXBFbmQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJJZCIsImdldFVzZXJJbmZvIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwidGltZXN0YW1wIiwiZm9ybWF0cyIsInplcm8iLCJ2YWx1ZSIsIm15RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwicyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7QUFIQTtBQUNBOztBQUdBLElBQUlBLE1BQU1DLFFBQVEsZUFBUixDQUFWOztBQUVBO0FBQ0E7Ozs7O0FBNEVFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsV0F6RWZDLE1BeUVlLEdBekVOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGNBSEssRUFJTCxhQUpLLEVBS0wsWUFMSyxFQU1MLGNBTkssRUFPTCxnQkFQSyxFQVFMLGNBUkssRUFTTCxlQVRLLEVBVUwsY0FWSyxFQVdMLGVBWEssRUFZTCxlQVpLLEVBYUwsY0FiSyxFQWNMLGFBZEssRUFlTCxZQWZLLEVBZ0JMLGVBaEJLLEVBaUJMLGlCQWpCSyxFQWtCTCxhQWxCSyxFQW1CTCxtQkFuQkssRUFvQkwsZUFwQkssRUFxQkwsZ0JBckJLLEVBc0JMLGVBdEJLLENBREE7QUF5QlBDLGNBQVE7QUFDTkMsNkJBQXFCLE1BRGY7QUFFTkMseUJBQWlCLFNBRlg7QUFHTkMsc0NBQThCLFNBSHhCO0FBSU5D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RUFBTCxDQUFWO0FBQ0EsVUFBSUMsT0FBT1QsS0FBS0UsT0FBT1EsUUFBUCxFQUFMLENBQVg7QUFDQSxVQUFJQyxTQUFTWCxLQUFLRSxPQUFPVSxVQUFQLEVBQUwsQ0FBYjtBQUNBLFVBQUlDLFNBQVNiLEtBQUtFLE9BQU9ZLFVBQVAsRUFBTCxDQUFiO0FBQ0EsYUFBT2YsUUFBUWdCLE9BQVIsQ0FBZ0IsZUFBaEIsRUFBaUMsVUFBVUMsT0FBVixFQUFtQjtBQUN6RCxlQUFRO0FBQ05DLGFBQUdkLElBREc7QUFFTmUsYUFBR2IsS0FGRztBQUdOYyxhQUFHWixHQUhHO0FBSU5hLGFBQUdYLElBSkc7QUFLTlksYUFBR1YsTUFMRztBQU1OVyxhQUFHVDtBQU5HLFNBQUQsQ0FPSkcsT0FQSSxDQUFQO0FBUUQsT0FUTSxDQUFQO0FBVUQ7Ozs7RUFwVTBCLGVBQUtPLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG4vLyBpbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG4vLyBpbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdCdcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuLy8gY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG4vLyBzZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvc3lzdGVtJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9uZXdBZGQnLFxuICAgICAgJ3BhZ2VzL2VkaXRBZGQnLFxuICAgICAgJ3BhZ2VzL3BheWNhcnQnLFxuICAgICAgJ3BhZ2VzL3BheWJ1eScsXG4gICAgICAncGFnZXMvcnVsZXMnLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL2NvbGxlY3QnLFxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljYScsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL29yZGVyRGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbnZvaWNlJyxcbiAgICAgICdwYWdlcy9hcHBseVZpcCcsXG4gICAgICAncGFnZXMvc2VydmljZSdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2VjM2QzYScsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgY29sb3I6ICcjMjgyNjI2JyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZWMzZDNhJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvaW5kZXgtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfpppbpobUnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5YiG57G7J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhcnQnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhcnQtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2FydC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9pidcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS91c2VyLWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL3VzZXItYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgdXNlckxldmVsOiBudWxsLFxuICAgIHVzZXJIYXNoOiBudWxsLFxuICAgIGNvZGU6IG51bGwsXG4gICAgbmlja05hbWU6IG51bGwsXG4gICAgdXNlckltYWdlOiBudWxsXG4gIH1cblxuICBtaXNzVG9rZW4gPSBmYWxzZVxuICBnZXRUb2tlblRpbWUgPSAwXG4gIGh0dHBJZCA9IFtdXG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG4gICAgICBjb25maWcgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAtMSAmJiBwLmRhdGEubXNnID09PSAnbWlzcyB0b2tlbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtaXNzIHRva2VuJylcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lKytcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFRva2VuVGltZSA8IDMpIHtcbiAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwocC5kYXRhLm1zZylcbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICAgICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBmYWlsIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgICAgLy8g6K6w5b2VcmVxdWVzdCBpbmZvXG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuaHR0cElkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5odHRwSWQubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQucHVzaChwLmRhdGEuaHR0cElkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQuc2hpZnQoKVxuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5wdXNoKHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIOWIpOaWrXRhYmJhcuWbnumAgOmhtemdolxuICBwYWdlUm9vdCA9IGZhbHNlXG5cbiAgb25MYXVuY2goKSB7fVxuXG4gIGdldExvZ2luIChjYikge1xuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKHJlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIFjb2RlXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGUsIGNvZGUsIHJlZnJlbmNlQ29kZSwgY2IpIHtcbiAgICAvLyB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIGNvbnNvbGUubG9nKGUsIGNvZGUsIHJlZnJlbmNlQ29kZSlcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGpzY29kZTogY29kZSxcbiAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogZS5kZXRhaWwuaXYsXG4gICAgICByZWZlcmVuY2VJZDogcmVmcmVuY2VDb2RlXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5TZW5kQ29kZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgcGhvbmVOdW1iZXIgPSByZXMuZGF0YS5kYXRhLnBob25lXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Bob25lJywgcGhvbmVOdW1iZXIpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgLy8gdmFyIGRhdGEgPSB7XG4gICAgICAgIC8vICAgcGhvbmU6IHBob25lTnVtYmVyXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSwgY2IpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+eZu+W9leWksei0pScsXG4gICAgICAgIGNvbnRlbnQ6ICfor7fmo4Dmn6XnvZHnu5zov57mjqUnLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIC8vIOW3suacieaJi+acuuWPt+iOt+WPlnRva2VuXG4gIGFzeW5jIHJlcXVlc3RUb2tlbiAoZGF0YSwgY2IsIGZhaWwpIHtcbiAgICBhd2FpdCB0aGlzLkh0dHBSZXF1ZXN0LlVzZXJMb2dpbihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICAgIHZhciB0aW1lT3V0ID0gcmVzLmRhdGEuZGF0YS50aW1lT3V0XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnLCB0aW1lT3V0KVxuICAgICAgICAvLyDorr7nva5nbG9iYWznmoR1c2VyIGxldmVsIOWSjCBoYXNoXG4gICAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuLCAoKSA9PiB7XG4gICAgICAgICAgY2IgJiYgY2IodG9rZW4pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsICYmIGZhaWwoKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgfSlcbiAgfVxuICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acn1xuICByZWZyZXNoVG9rZW4gKCkge1xuICAgIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfIOWmguaenOayoei/h+acn+ebtOaOpei/lOWbnnRva2Vu5YC8XG4gICAgdmFyIG5vd1RpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMClcbiAgICB2YXIgdGltZU91dCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnKVxuICAgIGlmIChub3dUaW1lID4gdGltZU91dCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgLy8g6L+U5Zue5b2T5YmNdG9rZW5cbiAgZ2V0VG9rZW4gKGVycm9yLCByZWZyZW5jZSkge1xuICAgIHZhciByZWZyZW5jZUNvZGUgPSAnJ1xuICAgIGlmIChyZWZyZW5jZSkge1xuICAgICAgcmVmcmVuY2VDb2RlID0gcmVmcmVuY2VcbiAgICB9XG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykgPT09ICcnKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuL2xvZ2luP3JlZnJlbmNlQ29kZT0nICsgcmVmcmVuY2VDb2RlXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMucmVmcmVzaFRva2VuKCkgfHwgZXJyb3IgPT09IC0xKSB7XG4gICAgICAgIC8vIHRva2Vu6L+H5pyfIOmHjeaWsOWPkemAgeivt+axguiOt+WPluaWsOeahHRva2VuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSlcbiAgICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g6I635Y+WIHVzZXIgbGV2ZWwg5ZKMIGhhc2hcbiAgZ2V0VXNlckxldmVsICh0b2tlbiwgY2IpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyh7dG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS52aXBFbmQgPSByZXMuZGF0YS5kYXRhLnZpcEVuZFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnJlZHVjdGlvbiA9IHJlcy5kYXRhLmRhdGEucmVkdWN0aW9uXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEubWVtYmVySWQgPSByZXMuZGF0YS5kYXRhLm1lbWJlcklkXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWreW9k+WJjXVzZXIgaGFzaOaYr+WQpumcgOimgemHjee9rlxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4pIHtcbiAgICBpZiAoaGFzaCAhPT0gdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKSB7XG4gICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbilcbiAgICB9XG4gIH1cbiAgLy8g5a2Y55So5oi3Z2xvYmFs5L+h5oGvXG4gIGdldFVzZXIgKGNiKSB7XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdsb2JhbERhdGEpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgaGlkZUxvYWRpbmcgKCkge1xuICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICB9XG4gIHNob3dGYWlsIChlcnJvcikge1xuICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiBlcnJvciB8fCAn5Yqg6L295aSx6LSlJyxcbiAgICAgIGljb246ICdub25lJyxcbiAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICB9KVxuICB9XG4gIHBheUZhaWwgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICfmlK/ku5jlpLHotKUnLFxuICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGRpc2FibGVBcGkgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjor6Xlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInXG4gICAgfSlcbiAgfVxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==