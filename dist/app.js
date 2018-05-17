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
      pages: ['pages/login', 'pages/start', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order', 'pages/orderDetail', 'pages/invoice', 'pages/applyVip', 'pages/service'],
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
        if (res.data.error === 0) {
          _this.globalData.userLevel = res.data.data.level;
          _this.globalData.userHash = res.data.data.hash;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJjb2RlIiwibmlja05hbWUiLCJ1c2VySW1hZ2UiLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwiY2IiLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZSIsImRhdGEiLCJqc0NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJTZW5kQ29kZSIsInRoZW4iLCJlcnJvciIsInNldFN0b3JhZ2VTeW5jIiwicHVyZVBob25lTnVtYmVyIiwicGhvbmVOdW1iZXIiLCJwaG9uZSIsInJlcXVlc3RUb2tlbiIsIlVzZXJMb2dpbiIsInRva2VuIiwidGltZU91dCIsImdldFVzZXJMZXZlbCIsIm5vd1RpbWUiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiZ2V0VGltZSIsImdldFN0b3JhZ2VTeW5jIiwicmVmcmVzaFRva2VuIiwiX3RoaXMiLCJHZXRVc2VySW5mbyIsImxldmVsIiwiaGFzaCIsImdldFVzZXJJbmZvIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLE1BQU1DLFFBQVEsZUFBUixDQUFWOztBQUVBLElBQU1DLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7Ozs7Ozs7Ozs7Ozs2TEFHRUMsTSxHQUFTO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGNBSEssRUFJTCxhQUpLLEVBS0wsWUFMSyxFQU1MLGNBTkssRUFPTCxnQkFQSyxFQVFMLGNBUkssRUFTTCxlQVRLLEVBVUwsY0FWSyxFQVdMLGVBWEssRUFZTCxjQVpLLEVBYUwsYUFiSyxFQWNMLFlBZEssRUFlTCxlQWZLLEVBZ0JMLGlCQWhCSyxFQWlCTCxhQWpCSyxFQWtCTCxtQkFsQkssRUFtQkwsZUFuQkssRUFvQkwsZ0JBcEJLLEVBcUJMLGVBckJLLENBREE7QUF3QlBDLGNBQVE7QUFDTkMsNkJBQXFCLE1BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0F4QkQ7QUE4QlBDLGNBQVE7QUFDTkMsZUFBTyxTQUREO0FBRU5DLHVCQUFlLFNBRlQ7QUFHTkMseUJBQWlCLFNBSFg7QUFJTkMsY0FBTSxDQUFDO0FBQ0xDLG9CQUFVLGFBREw7QUFFTEMsb0JBQVUseUJBRkw7QUFHTEMsNEJBQWtCLHdCQUhiO0FBSUxDLGdCQUFNO0FBSkQsU0FBRCxFQUtIO0FBQ0RILG9CQUFVLGdCQURUO0FBRURDLG9CQUFVLDRCQUZUO0FBR0RDLDRCQUFrQiwyQkFIakI7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SUMsTUFBTVAsS0FBS0UsT0FBT00sT0FBUCxFQUFMLENBQVY7QUFDQSxVQUFJQyxPQUFPVCxLQUFLRSxPQUFPUSxRQUFQLEVBQUwsQ0FBWDtBQUNBLFVBQUlDLFNBQVNYLEtBQUtFLE9BQU9VLFVBQVAsRUFBTCxDQUFiO0FBQ0EsVUFBSUMsU0FBU2IsS0FBS0UsT0FBT1ksVUFBUCxFQUFMLENBQWI7QUFDQSxhQUFPZixRQUFRZ0IsT0FBUixDQUFnQixlQUFoQixFQUFpQyxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pELGVBQVE7QUFDTkMsYUFBR2QsSUFERztBQUVOZSxhQUFHYixLQUZHO0FBR05jLGFBQUdaLEdBSEc7QUFJTmEsYUFBR1gsSUFKRztBQUtOWSxhQUFHVixNQUxHO0FBTU5XLGFBQUdUO0FBTkcsU0FBRCxDQU9KRyxPQVBJLENBQVA7QUFRRCxPQVRNLENBQVA7QUFVRDs7OztFQXRRMEIsZUFBS08sRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuXG5pbXBvcnQgSHR0cFJlcXVlc3QgZnJvbSAnLi9zZXJ2aWNlL0h0dHBSZXF1ZXN0J1xudmFyIE1kNSA9IHJlcXVpcmUoJy4vc2VydmljZS9tZDUnKVxuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcbnNldFN0b3JlKHN0b3JlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL3N0YXJ0JyxcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9jYXJ0JyxcbiAgICAgICdwYWdlcy9zeXN0ZW0nLFxuICAgICAgJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICdwYWdlcy9zZWFyY2gnLFxuICAgICAgJ3BhZ2VzL2FkZHJlc3MnLFxuICAgICAgJ3BhZ2VzL25ld0FkZCcsXG4gICAgICAncGFnZXMvcGF5Y2FydCcsXG4gICAgICAncGFnZXMvcGF5YnV5JyxcbiAgICAgICdwYWdlcy9ydWxlcycsXG4gICAgICAncGFnZXMvdXNlcicsXG4gICAgICAncGFnZXMvY29sbGVjdCcsXG4gICAgICAncGFnZXMvbG9naXN0aWNhJyxcbiAgICAgICdwYWdlcy9vcmRlcicsXG4gICAgICAncGFnZXMvb3JkZXJEZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2ludm9pY2UnLFxuICAgICAgJ3BhZ2VzL2FwcGx5VmlwJyxcbiAgICAgICdwYWdlcy9zZXJ2aWNlJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZjNWU0MycsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgY29sb3I6ICcjMjgyNjI2JyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmM1ZTQ0JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvaW5kZXgtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfpppbpobUnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5YiG57G7J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhcnQnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhcnQtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2FydC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9pidcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS91c2VyLWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL3VzZXItYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgdXNlckxldmVsOiBudWxsLFxuICAgIHVzZXJIYXNoOiBudWxsLFxuICAgIGNvZGU6IG51bGwsXG4gICAgbmlja05hbWU6IG51bGwsXG4gICAgdXNlckltYWdlOiBudWxsXG4gIH1cblxuICAvLyDliKTmlq10YWJiYXLlm57pgIDpobXpnaJcbiAgcGFnZVJvb3QgPSBmYWxzZVxuXG4gIG9uTGF1bmNoKCkge31cblxuICBnZXRMb2dpbiAoY2IpIHtcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgIGNiICYmIGNiKHJlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIFjb2RlXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGUsIGNvZGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlLCBjb2RlKVxuICAgIHZhciBkYXRhID0ge1xuICAgICAganNDb2RlOiBjb2RlLFxuICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgIH1cbiAgICB0aGlzLkh0dHBSZXF1ZXN0LlNlbmRDb2RlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Bob25lJywgcmVzLmRhdGEuZGF0YS5wdXJlUGhvbmVOdW1iZXIpXG4gICAgICAgIHZhciBwaG9uZU51bWJlciA9IHJlcy5kYXRhLmRhdGEucHVyZVBob25lTnVtYmVyXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHBob25lOiBwaG9uZU51bWJlclxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdFRva2VuKGRhdGEsIGNiKVxuICAgICAgfVxuICAgIH0pXG4gICAgLy8g5Y+R6YCB5ZCO5Y+w5ZCM5pe26I635Y+W5omL5py65Y+3L3Rva2VuL+i/h+acn+aXtumXtFxuICAgIC8vIOWmguaenHRva2Vu6L+H5pyfIOmAmui/h+aJi+acuuWPtyDlj5HpgIFyZXF1ZXN0VG9rZW7ph43nva5nbG9iYWzmlbDmja4g5qih5ouf5pWw5o2ue3Bob25lOiAnMTM0MDIxNTU3NTEnfVxuICAgIC8vIHRoaXMucmVxdWVzdFRva2VuKHtwaG9uZTogJzEzNDAyMTU1NzUxJ30sIGNiKVxuICAgIC8vIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgIC8vICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAvLyAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZGF0YS51c2VySW5mb1xuICAgIC8vICAgICB0aGF0Lkh0dHBSZXF1ZXN0LlVzZXJMb2dpbih7cGhvbmU6ICcxMzQwMjE1NTc1MSd9KS50aGVuKChyZXMpID0+IHtcbiAgICAvLyAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgLy8gICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCB0b2tlbilcbiAgICAvLyAgICAgICB0aGF0Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAvLyAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgIC8vICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckxldmVsID0gcmVzLmRhdGEuZGF0YS5sZXZlbFxuICAgIC8vICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICB9KVxuICAgIC8vICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgIH0sXG4gICAgLy8gICBmYWlsIChyZXMpIHtcbiAgICAvLyAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgIC8vICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcbiAgICAvLyAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6l77yM5bm26YeN5paw5byA5ZCv5o6I5p2DJyxcbiAgICAvLyAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgLy8gICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAvLyAgICAgICAgICAgd2VweS5vcGVuU2V0dGluZyh7XG4gICAgLy8gICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pXG4gICAgLy8gICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ+eZu+W9leWksei0pSdcbiAgICAvLyAgICAgICAgICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAvLyAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ+aLkue7neaOiOadg+WwhuaXoOazleS9v+eUqOWwj+eoi+W6j+mDqOWIhuWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAvLyAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfSlcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICB9XG4gIC8vIOW3suacieaJi+acuuWPt+iOt+WPlnRva2VuXG4gIHJlcXVlc3RUb2tlbiAoZGF0YSwgY2IpIHtcbiAgICB0aGlzLkh0dHBSZXF1ZXN0LlVzZXJMb2dpbihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIHZhciB0b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICAgIHZhciB0aW1lT3V0ID0gcmVzLmRhdGEuZGF0YS50aW1lT3V0XG4gICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndGltZW91dCcsIHRpbWVPdXQpXG4gICAgICAvLyDorr7nva5nbG9iYWznmoR1c2VyIGxldmVsIOWSjCBoYXNoXG4gICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbilcbiAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfXG4gIHJlZnJlc2hUb2tlbiAoKSB7XG4gICAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ8g5aaC5p6c5rKh6L+H5pyf55u05o6l6L+U5ZuedG9rZW7lgLxcbiAgICB2YXIgbm93VGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKVxuICAgIHZhciB0aW1lT3V0ID0gd2VweS5nZXRTdG9yYWdlU3luYygndGltZW91dCcpXG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykgPT09ICcnIHx8IG5vd1RpbWUgPiB0aW1lT3V0KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgLy8g6L+U5Zue5b2T5YmNdG9rZW5cbiAgZ2V0VG9rZW4gKCkge1xuICAgIGlmICghdGhpcy5yZWZyZXNoVG9rZW4oKSkge1xuICAgICAgLy8g6YeN5paw5Y+R6YCB6K+35rGC6I635Y+W5paw55qEdG9rZW4g5qih5ouf5pWw5o2ue3Bob25lOiAnMTM0MDIxNTU3NTEnfVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICB9XG4gICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhKVxuICAgIH1cbiAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICB9XG4gIC8vIOiOt+WPliB1c2VyIGxldmVsIOWSjCBoYXNoXG4gIGdldFVzZXJMZXZlbCAodG9rZW4pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyh7dG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWreW9k+WJjXVzZXIgaGFzaOaYr+WQpumcgOimgemHjee9rlxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4pIHtcbiAgICBpZiAoaGFzaCAhPT0gdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKSB7XG4gICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbilcbiAgICB9XG4gIH1cbiAgLy8g5a2Y55So5oi3Z2xvYmFs5L+h5oGvXG4gIGdldFVzZXIgKGNiKSB7XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBzaG93TG9hZGluZyAoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICBpY29uOiAnbG9hZGluZydcbiAgICB9KVxuICB9XG4gIHNob3dTdWNjZXNzICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgfVxuICBzaG93RmFpbCAoKSB7XG4gICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgdGl0bGU6ICfliqDovb3lpLHotKUnLFxuICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgIH0pXG4gIH1cbiAgZGlzYWJsZUFwaSAoKSB7XG4gICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgY29udGVudDogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleS9v+eUqOivpeWKn+iDve+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcbiAgICB9KVxuICB9XG4gIGRhdGVGb3JtYXQgKHRpbWVzdGFtcCwgZm9ybWF0cykge1xuICAgIGZvcm1hdHMgPSBmb3JtYXRzIHx8ICdZLW0tZCdcbiAgICB2YXIgemVybyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlIDwgMTApIHtcbiAgICAgICAgcmV0dXJuICcwJyArIHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgdmFyIG15RGF0ZSA9IHRpbWVzdGFtcCA/IG5ldyBEYXRlKHRpbWVzdGFtcCkgOiBuZXcgRGF0ZSgpXG4gICAgdmFyIHllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHZhciBtb250aCA9IHplcm8obXlEYXRlLmdldE1vbnRoKCkgKyAxKVxuICAgIHZhciBkYXkgPSB6ZXJvKG15RGF0ZS5nZXREYXRlKCkpXG4gICAgdmFyIGhvdXIgPSB6ZXJvKG15RGF0ZS5nZXRIb3VycygpKVxuICAgIHZhciBtaW5pdGUgPSB6ZXJvKG15RGF0ZS5nZXRNaW51dGVzKCkpXG4gICAgdmFyIHNlY29uZCA9IHplcm8obXlEYXRlLmdldFNlY29uZHMoKSlcbiAgICByZXR1cm4gZm9ybWF0cy5yZXBsYWNlKC9ZfG18ZHxIfGl8cy9pZywgZnVuY3Rpb24gKG1hdGNoZXMpIHtcbiAgICAgIHJldHVybiAoe1xuICAgICAgICBZOiB5ZWFyLFxuICAgICAgICBtOiBtb250aCxcbiAgICAgICAgZDogZGF5LFxuICAgICAgICBIOiBob3VyLFxuICAgICAgICBpOiBtaW5pdGUsXG4gICAgICAgIHM6IHNlY29uZFxuICAgICAgfSlbbWF0Y2hlc11cbiAgICB9KVxuICB9XG4gIEh0dHBSZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KClcbiAgTWQ1ID0gTWQ1LmhleE1ENVxufVxuIl19