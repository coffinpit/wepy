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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Md5 = require('./service/md5.js');

var store = (0, _store2.default)();
(0, _wepyRedux.setStore)(store);

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      pages: ['pages/login', 'pages/start', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/editAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order', 'pages/orderDetail', 'pages/invoice', 'pages/applyVip', 'pages/service'],
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
    }, _this2.globalData = {
      userInfo: null,
      userLevel: null,
      userHash: null,
      code: null,
      nickName: null,
      userImage: null

      // 判断tabbar回退页面
    }, _this2.pageRoot = false, _this2.HttpRequest = new _HttpRequest2.default(), _this2.Md5 = Md5.hexMD5, _temp), _possibleConstructorReturn(_this2, _ret);
  }

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
        jsCode: code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      };
      this.HttpRequest.SendCode(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _wepy2.default.setStorageSync('phone', res.data.data.purePhoneNumber);
          var phoneNumber = res.data.data.purePhoneNumber;
          var data = {
            phone: phoneNumber
          };
          _this3.requestToken(data, cb);
        }
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
    value: function requestToken(data, cb) {
      var _this4 = this;

      this.HttpRequest.UserLogin(data).then(function (res) {
        var token = res.data.data.token;
        var timeOut = res.data.data.timeOut;
        _wepy2.default.setStorageSync('token', token);
        _wepy2.default.setStorageSync('timeout', timeOut);
        // 设置global的user level 和 hash
        _this4.getUserLevel(token);
        cb && cb(res.userInfo);
      });
    }
    // 判断token是否过期

  }, {
    key: 'refreshToken',
    value: function refreshToken() {
      // 判断token是否过期 如果没过期直接返回token值
      var nowTime = Math.floor(new Date().getTime() / 1000);
      var timeOut = _wepy2.default.getStorageSync('timeout');
      if (_wepy2.default.getStorageSync('token') === '' || nowTime > timeOut) {
        return false;
      } else {
        return true;
      }
    }
    // 返回当前token

  }, {
    key: 'getToken',
    value: function getToken() {
      if (!this.refreshToken()) {
        // 重新发送请求获取新的token 模拟数据{phone: '13402155751'}
        var data = {
          phone: _wepy2.default.getStorageSync('phone')
        };
        this.requestToken(data);
      }
      return _wepy2.default.getStorageSync('token');
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
    value: function showFail() {
      _wepy2.default.hideLoading();
      _wepy2.default.showToast({
        title: '加载失败',
        icon: 'none',
        image: '../image/cancel.png'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJjb2RlIiwibmlja05hbWUiLCJ1c2VySW1hZ2UiLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwiY2IiLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZSIsImRhdGEiLCJqc0NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJTZW5kQ29kZSIsInRoZW4iLCJlcnJvciIsInNldFN0b3JhZ2VTeW5jIiwicHVyZVBob25lTnVtYmVyIiwicGhvbmVOdW1iZXIiLCJwaG9uZSIsInJlcXVlc3RUb2tlbiIsIlVzZXJMb2dpbiIsInRva2VuIiwidGltZU91dCIsImdldFVzZXJMZXZlbCIsIm5vd1RpbWUiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiZ2V0VGltZSIsImdldFN0b3JhZ2VTeW5jIiwicmVmcmVzaFRva2VuIiwiX3RoaXMiLCJHZXRVc2VySW5mbyIsImxldmVsIiwiaGFzaCIsInZpcEVuZCIsInJlZHVjdGlvbiIsImdldFVzZXJJbmZvIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLE1BQU1DLFFBQVEsZUFBUixDQUFWOztBQUVBLElBQU1DLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7Ozs7Ozs7Ozs7Ozs2TEFHRUMsTSxHQUFTO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGNBSEssRUFJTCxhQUpLLEVBS0wsWUFMSyxFQU1MLGNBTkssRUFPTCxnQkFQSyxFQVFMLGNBUkssRUFTTCxlQVRLLEVBVUwsY0FWSyxFQVdMLGVBWEssRUFZTCxlQVpLLEVBYUwsY0FiSyxFQWNMLGFBZEssRUFlTCxZQWZLLEVBZ0JMLGVBaEJLLEVBaUJMLGlCQWpCSyxFQWtCTCxhQWxCSyxFQW1CTCxtQkFuQkssRUFvQkwsZUFwQkssRUFxQkwsZ0JBckJLLEVBc0JMLGVBdEJLLENBREE7QUF5QlBDLGNBQVE7QUFDTkMsNkJBQXFCLE1BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0F6QkQ7QUErQlBDLGNBQVE7QUFDTkMsZUFBTyxTQUREO0FBRU5DLHVCQUFlLFNBRlQ7QUFHTkMseUJBQWlCLFNBSFg7QUFJTkMsY0FBTSxDQUFDO0FBQ0xDLG9CQUFVLGFBREw7QUFFTEMsb0JBQVUseUJBRkw7QUFHTEMsNEJBQWtCLHdCQUhiO0FBSUxDLGdCQUFNO0FBSkQsU0FBRCxFQUtIO0FBQ0RILG9CQUFVLGdCQURUO0FBRURD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LGlCQUFPLE1BQU1BLEtBQWI7QUFDRDtBQUNELGVBQU9BLEtBQVA7QUFDRCxPQUxEO0FBTUEsVUFBSUMsU0FBU0osWUFBWSxJQUFJZixJQUFKLENBQVNlLFNBQVQsQ0FBWixHQUFrQyxJQUFJZixJQUFKLEVBQS9DO0FBQ0EsVUFBSW9CLE9BQU9ELE9BQU9FLFdBQVAsRUFBWDtBQUNBLFVBQUlDLFFBQVFMLEtBQUtFLE9BQU9JLFFBQVAsS0FBb0IsQ0FBekIsQ0FBWjtBQUNBLFVBQUlDLE1BQU1QLEtBQUtFLE9BQU9NLE9BQVAsRUFBTCxDQUFWO0FBQ0EsVUFBSUMsT0FBT1QsS0FBS0UsT0FBT1EsUUFBUCxFQUFMLENBQVg7QUFDQSxVQUFJQyxTQUFTWCxLQUFLRSxPQUFPVSxVQUFQLEVBQUwsQ0FBYjtBQUNBLFVBQUlDLFNBQVNiLEtBQUtFLE9BQU9ZLFVBQVAsRUFBTCxDQUFiO0FBQ0EsYUFBT2YsUUFBUWdCLE9BQVIsQ0FBZ0IsZUFBaEIsRUFBaUMsVUFBVUMsT0FBVixFQUFtQjtBQUN6RCxlQUFRO0FBQ05DLGFBQUdkLElBREc7QUFFTmUsYUFBR2IsS0FGRztBQUdOYyxhQUFHWixHQUhHO0FBSU5hLGFBQUdYLElBSkc7QUFLTlksYUFBR1YsTUFMRztBQU1OVyxhQUFHVDtBQU5HLFNBQUQsQ0FPSkcsT0FQSSxDQUFQO0FBUUQsT0FUTSxDQUFQO0FBVUQ7Ozs7RUExUTBCLGVBQUtPLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdCdcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG5zZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvc3lzdGVtJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9uZXdBZGQnLFxuICAgICAgJ3BhZ2VzL2VkaXRBZGQnLFxuICAgICAgJ3BhZ2VzL3BheWNhcnQnLFxuICAgICAgJ3BhZ2VzL3BheWJ1eScsXG4gICAgICAncGFnZXMvcnVsZXMnLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL2NvbGxlY3QnLFxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljYScsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL29yZGVyRGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbnZvaWNlJyxcbiAgICAgICdwYWdlcy9hcHBseVZpcCcsXG4gICAgICAncGFnZXMvc2VydmljZSdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmYzVlNDMnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2ZjNWU0NCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHVzZXJMZXZlbDogbnVsbCxcbiAgICB1c2VySGFzaDogbnVsbCxcbiAgICBjb2RlOiBudWxsLFxuICAgIG5pY2tOYW1lOiBudWxsLFxuICAgIHVzZXJJbWFnZTogbnVsbFxuICB9XG5cbiAgLy8g5Yik5patdGFiYmFy5Zue6YCA6aG16Z2iXG4gIHBhZ2VSb290ID0gZmFsc2VcblxuICBvbkxhdW5jaCgpIHt9XG5cbiAgZ2V0TG9naW4gKGNiKSB7XG4gICAgd2VweS5sb2dpbih7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxuICAgICAgICBjYiAmJiBjYihyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBY29kZVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn572R57uc6L+e5o6l5aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRVc2VySW5mbyhlLCBjb2RlLCBjYikge1xuICAgIC8vIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgY29uc29sZS5sb2coZSwgY29kZSlcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGpzQ29kZTogY29kZSxcbiAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogZS5kZXRhaWwuaXZcbiAgICB9XG4gICAgdGhpcy5IdHRwUmVxdWVzdC5TZW5kQ29kZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwaG9uZScsIHJlcy5kYXRhLmRhdGEucHVyZVBob25lTnVtYmVyKVxuICAgICAgICB2YXIgcGhvbmVOdW1iZXIgPSByZXMuZGF0YS5kYXRhLnB1cmVQaG9uZU51bWJlclxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogcGhvbmVOdW1iZXJcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhLCBjYilcbiAgICAgIH1cbiAgICB9KVxuICAgIC8vIOWPkemAgeWQjuWPsOWQjOaXtuiOt+WPluaJi+acuuWPty90b2tlbi/ov4fmnJ/ml7bpl7RcbiAgICAvLyDlpoLmnpx0b2tlbui/h+acnyDpgJrov4fmiYvmnLrlj7cg5Y+R6YCBcmVxdWVzdFRva2Vu6YeN572uZ2xvYmFs5pWw5o2uIOaooeaLn+aVsOaNrntwaG9uZTogJzEzNDAyMTU1NzUxJ31cbiAgICAvLyB0aGlzLnJlcXVlc3RUb2tlbih7cGhvbmU6ICcxMzQwMjE1NTc1MSd9LCBjYilcbiAgICAvLyB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAvLyAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgLy8gICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGRhdGEudXNlckluZm9cbiAgICAvLyAgICAgdGhhdC5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oe3Bob25lOiAnMTM0MDIxNTU3NTEnfSkudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgIC8vICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgLy8gICAgICAgdGhhdC5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyh7dG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAvLyAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAvLyAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJIYXNoID0gcmVzLmRhdGEuZGF0YS5oYXNoXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgfSlcbiAgICAvLyAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICB9LFxuICAgIC8vICAgZmFpbCAocmVzKSB7XG4gICAgLy8gICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAvLyAgICAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgLy8gICAgICAgY29udGVudDogJ+ivt+ajgOafpee9kee7nOi/nuaOpe+8jOW5tumHjeaWsOW8gOWQr+aOiOadgycsXG4gICAgLy8gICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgLy8gICAgICAgICAgIHdlcHkub3BlblNldHRpbmcoe1xuICAgIC8vICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKVxuICAgIC8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgIC8vICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICfnmbvlvZXlpLHotKUnXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgLy8gICAgICAgICAgICAgICAgICd0aXRsZSc6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xkvb/nlKjlsI/nqIvluo/pg6jliIblip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgLy8gICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gICB9XG4gICAgLy8gfSlcbiAgfVxuICAvLyDlt7LmnInmiYvmnLrlj7fojrflj5Z0b2tlblxuICByZXF1ZXN0VG9rZW4gKGRhdGEsIGNiKSB7XG4gICAgdGhpcy5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICB2YXIgdGltZU91dCA9IHJlcy5kYXRhLmRhdGEudGltZU91dFxuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCB0b2tlbilcbiAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnLCB0aW1lT3V0KVxuICAgICAgLy8g6K6+572uZ2xvYmFs55qEdXNlciBsZXZlbCDlkowgaGFzaFxuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4pXG4gICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgfSlcbiAgfVxuICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acn1xuICByZWZyZXNoVG9rZW4gKCkge1xuICAgIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfIOWmguaenOayoei/h+acn+ebtOaOpei/lOWbnnRva2Vu5YC8XG4gICAgdmFyIG5vd1RpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMClcbiAgICB2YXIgdGltZU91dCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnKVxuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpID09PSAnJyB8fCBub3dUaW1lID4gdGltZU91dCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIC8vIOi/lOWbnuW9k+WJjXRva2VuXG4gIGdldFRva2VuICgpIHtcbiAgICBpZiAoIXRoaXMucmVmcmVzaFRva2VuKCkpIHtcbiAgICAgIC8vIOmHjeaWsOWPkemAgeivt+axguiOt+WPluaWsOeahHRva2VuIOaooeaLn+aVsOaNrntwaG9uZTogJzEzNDAyMTU1NzUxJ31cbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgfVxuICAgICAgdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSlcbiAgICB9XG4gICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgfVxuICAvLyDojrflj5YgdXNlciBsZXZlbCDlkowgaGFzaFxuICBnZXRVc2VyTGV2ZWwgKHRva2VuKSB7XG4gICAgdmFyIF90aGlzID0gdGhpc1xuICAgIHRoaXMuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oe3Rva2VuOiB0b2tlbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckxldmVsID0gcmVzLmRhdGEuZGF0YS5sZXZlbFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoID0gcmVzLmRhdGEuZGF0YS5oYXNoXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudmlwRW5kID0gcmVzLmRhdGEuZGF0YS52aXBFbmRcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5yZWR1Y3Rpb24gPSByZXMuZGF0YS5kYXRhLnJlZHVjdGlvblxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5pat5b2T5YmNdXNlciBoYXNo5piv5ZCm6ZyA6KaB6YeN572uXG4gIHJlc2V0VXNlckxldmVsIChoYXNoLCB0b2tlbikge1xuICAgIGlmIChoYXNoICE9PSB0aGlzLmdsb2JhbERhdGEudXNlckhhc2gpIHtcbiAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuKVxuICAgIH1cbiAgfVxuICAvLyDlrZjnlKjmiLdnbG9iYWzkv6Hmga9cbiAgZ2V0VXNlciAoY2IpIHtcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgc2hvd1N1Y2Nlc3MgKCkge1xuICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICB9XG4gIHNob3dGYWlsICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICBpY29uOiAnbm9uZScsXG4gICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgfSlcbiAgfVxuICBkaXNhYmxlQXBpICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So6K+l5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgIH0pXG4gIH1cbiAgZGF0ZUZvcm1hdCAodGltZXN0YW1wLCBmb3JtYXRzKSB7XG4gICAgZm9ybWF0cyA9IGZvcm1hdHMgfHwgJ1ktbS1kJ1xuICAgIHZhciB6ZXJvID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICB2YXIgbXlEYXRlID0gdGltZXN0YW1wID8gbmV3IERhdGUodGltZXN0YW1wKSA6IG5ldyBEYXRlKClcbiAgICB2YXIgeWVhciA9IG15RGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgdmFyIG1vbnRoID0gemVybyhteURhdGUuZ2V0TW9udGgoKSArIDEpXG4gICAgdmFyIGRheSA9IHplcm8obXlEYXRlLmdldERhdGUoKSlcbiAgICB2YXIgaG91ciA9IHplcm8obXlEYXRlLmdldEhvdXJzKCkpXG4gICAgdmFyIG1pbml0ZSA9IHplcm8obXlEYXRlLmdldE1pbnV0ZXMoKSlcbiAgICB2YXIgc2Vjb25kID0gemVybyhteURhdGUuZ2V0U2Vjb25kcygpKVxuICAgIHJldHVybiBmb3JtYXRzLnJlcGxhY2UoL1l8bXxkfEh8aXxzL2lnLCBmdW5jdGlvbiAobWF0Y2hlcykge1xuICAgICAgcmV0dXJuICh7XG4gICAgICAgIFk6IHllYXIsXG4gICAgICAgIG06IG1vbnRoLFxuICAgICAgICBkOiBkYXksXG4gICAgICAgIEg6IGhvdXIsXG4gICAgICAgIGk6IG1pbml0ZSxcbiAgICAgICAgczogc2Vjb25kXG4gICAgICB9KVttYXRjaGVzXVxuICAgIH0pXG4gIH1cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxuICBNZDUgPSBNZDUuaGV4TUQ1XG59XG4iXX0=