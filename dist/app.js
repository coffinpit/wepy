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
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      pages: ['pages/login', 'pages/start', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order', 'pages/orderDetail', 'pages/invoice', 'pages/applyVip'],
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
      code: null

      // 判断tabbar回退页面
    }, _this2.pageRoot = false, _this2.HttpRequest = new _HttpRequest2.default(), _this2.Md5 = Md5.hexMD5, _temp), _possibleConstructorReturn(_this2, _ret);
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
        return _ref2.apply(this, arguments);
      }

      return testAsync;
    }()
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
      console.log(data);
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
        _wepy2.default.setStorageSync('token', token);
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
      if (_wepy2.default.getStorageSync('token') === '') {
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
          phone: this.getStorageSync('phone')
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJjb2RlIiwicGFnZVJvb3QiLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInRlc3RBc3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2IiLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCJmYWlsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJlIiwianNDb2RlIiwiZW5jcnlwdGVkRGF0YSIsImRldGFpbCIsIml2IiwiU2VuZENvZGUiLCJ0aGVuIiwiZXJyb3IiLCJzZXRTdG9yYWdlU3luYyIsInB1cmVQaG9uZU51bWJlciIsInBob25lTnVtYmVyIiwicGhvbmUiLCJyZXF1ZXN0VG9rZW4iLCJVc2VyTG9naW4iLCJ0b2tlbiIsImdldFVzZXJMZXZlbCIsImdldFN0b3JhZ2VTeW5jIiwicmVmcmVzaFRva2VuIiwiX3RoaXMiLCJHZXRVc2VySW5mbyIsImxldmVsIiwiaGFzaCIsImdldFVzZXJJbmZvIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsTUFBTUMsUUFBUSxlQUFSLENBQVY7O0FBRUEsSUFBTUMsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7Ozs7Ozs7Ozs7Ozs7OzZMQUdFQyxNLEdBQVM7QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsY0FISyxFQUlMLGFBSkssRUFLTCxZQUxLLEVBTUwsY0FOSyxFQU9MLGdCQVBLLEVBUUwsY0FSSyxFQVNMLGVBVEssRUFVTCxjQVZLLEVBV0wsZUFYSyxFQVlMLGNBWkssRUFhTCxhQWJLLEVBY0wsWUFkSyxFQWVMLGVBZkssRUFnQkwsaUJBaEJLLEVBaUJMLGFBakJLLEVBa0JMLG1CQWxCSyxFQW1CTCxlQW5CSyxFQW9CTCxnQkFwQkssQ0FEQTtBQXVCUEMsY0FBUTtBQUNOQyw2QkFBcUIsTUFEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQXZCRDtBQTZCUEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOQyx5QkFBaUIsU0FIWDtBQUlOQyxjQUFNLENBQUM7QUFDTEMsb0JBQVUsYUFETDtBQUVMQyxvQkFBVSx5QkFGTDtBQUdMQyw0QkFBa0Isd0JBSGI7QUFJTEMsZ0JBQU07QUFKRCxTQUFELEVBS0g7QUFDREgsb0JBQVUsZ0JBRFQ7QUFFREMsb0JBQVUsNEJBRlQ7QUFHREMsNEJBQWtCLDJCQUhqQjtBQUlEQyxnQkFBTTtBQUpM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SyxRQUFQLEtBQW9CLENBQXpCLENBQVo7QUFDQSxVQUFJQyxNQUFNUixLQUFLRSxPQUFPTyxPQUFQLEVBQUwsQ0FBVjtBQUNBLFVBQUlDLE9BQU9WLEtBQUtFLE9BQU9TLFFBQVAsRUFBTCxDQUFYO0FBQ0EsVUFBSUMsU0FBU1osS0FBS0UsT0FBT1csVUFBUCxFQUFMLENBQWI7QUFDQSxVQUFJQyxTQUFTZCxLQUFLRSxPQUFPYSxVQUFQLEVBQUwsQ0FBYjtBQUNBLGFBQU9oQixRQUFRaUIsT0FBUixDQUFnQixlQUFoQixFQUFpQyxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pELGVBQVE7QUFDTkMsYUFBR2QsSUFERztBQUVOZSxhQUFHYixLQUZHO0FBR05jLGFBQUdaLEdBSEc7QUFJTmEsYUFBR1gsSUFKRztBQUtOWSxhQUFHVixNQUxHO0FBTU4zRCxhQUFHNkQ7QUFORyxTQUFELENBT0pHLE9BUEksQ0FBUDtBQVFELE9BVE0sQ0FBUDtBQVVEOzs7O0VBL1EwQixlQUFLTSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG52YXIgTWQ1ID0gcmVxdWlyZSgnLi9zZXJ2aWNlL21kNScpXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2NhcnQnLFxuICAgICAgJ3BhZ2VzL3N5c3RlbScsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvbmV3QWRkJyxcbiAgICAgICdwYWdlcy9wYXljYXJ0JyxcbiAgICAgICdwYWdlcy9wYXlidXknLFxuICAgICAgJ3BhZ2VzL3J1bGVzJyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jb2xsZWN0JyxcbiAgICAgICdwYWdlcy9sb2dpc3RpY2EnLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9vcmRlckRldGFpbCcsXG4gICAgICAncGFnZXMvaW52b2ljZScsXG4gICAgICAncGFnZXMvYXBwbHlWaXAnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmM1ZTQzJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmYzVlNDQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfliIbnsbsnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2FydCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2FydC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXJ0LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6LSt54mp6L2mJ1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXInLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL3VzZXItZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTGV2ZWw6IG51bGwsXG4gICAgdXNlckhhc2g6IG51bGwsXG4gICAgY29kZTogbnVsbFxuICB9XG5cbiAgLy8g5Yik5patdGFiYmFy5Zue6YCA6aG16Z2iXG4gIHBhZ2VSb290ID0gZmFsc2VcblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cblxuICBnZXRMb2dpbiAoY2IpIHtcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgIGNiICYmIGNiKHJlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIFjb2RlXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGUsIGNvZGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlLCBjb2RlKVxuICAgIHZhciBkYXRhID0ge1xuICAgICAganNDb2RlOiBjb2RlLFxuICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2VuZENvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncGhvbmUnLCByZXMuZGF0YS5kYXRhLnB1cmVQaG9uZU51bWJlcilcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gcmVzLmRhdGEuZGF0YS5wdXJlUGhvbmVOdW1iZXJcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgcGhvbmU6IHBob25lTnVtYmVyXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSwgY2IpXG4gICAgICB9XG4gICAgfSlcbiAgICAvLyDlj5HpgIHlkI7lj7DlkIzml7bojrflj5bmiYvmnLrlj7cvdG9rZW4v6L+H5pyf5pe26Ze0XG4gICAgLy8g5aaC5p6cdG9rZW7ov4fmnJ8g6YCa6L+H5omL5py65Y+3IOWPkemAgXJlcXVlc3RUb2tlbumHjee9rmdsb2JhbOaVsOaNriDmqKHmi5/mlbDmja57cGhvbmU6ICcxMzQwMjE1NTc1MSd9XG4gICAgLy8gdGhpcy5yZXF1ZXN0VG9rZW4oe3Bob25lOiAnMTM0MDIxNTU3NTEnfSwgY2IpXG4gICAgLy8gd2VweS5nZXRVc2VySW5mbyh7XG4gICAgLy8gICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgIC8vICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSBkYXRhLnVzZXJJbmZvXG4gICAgLy8gICAgIHRoYXQuSHR0cFJlcXVlc3QuVXNlckxvZ2luKHtwaG9uZTogJzEzNDAyMTU1NzUxJ30pLnRoZW4oKHJlcykgPT4ge1xuICAgIC8vICAgICAgIHZhciB0b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICAvLyAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgIC8vICAgICAgIHRoYXQuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oe3Rva2VuOiB0b2tlbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgLy8gICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgLy8gICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySGFzaCA9IHJlcy5kYXRhLmRhdGEuaGFzaFxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgIH0pXG4gICAgLy8gICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgfSxcbiAgICAvLyAgIGZhaWwgKHJlcykge1xuICAgIC8vICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgLy8gICAgICAgdGl0bGU6ICforablkYonLFxuICAgIC8vICAgICAgIGNvbnRlbnQ6ICfor7fmo4Dmn6XnvZHnu5zov57mjqXvvIzlubbph43mlrDlvIDlkK/mjojmnYMnLFxuICAgIC8vICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAvLyAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgIC8vICAgICAgICAgICB3ZXB5Lm9wZW5TZXR0aW5nKHtcbiAgICAvLyAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSlcbiAgICAvLyAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAn55m75b2V5aSx6LSlJ1xuICAgIC8vICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgIC8vICAgICAgICAgICAgICAgICAndGl0bGUnOiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5L2/55So5bCP56iL5bqP6YOo5YiG5Yqf6IO977yM6K+36YeN5paw5byA5ZCv5o6I5p2DJ1xuICAgIC8vICAgICAgICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIH1cbiAgLy8g5bey5pyJ5omL5py65Y+36I635Y+WdG9rZW5cbiAgcmVxdWVzdFRva2VuIChkYXRhLCBjYikge1xuICAgIHRoaXMuSHR0cFJlcXVlc3QuVXNlckxvZ2luKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCB0b2tlbilcbiAgICAgIC8vIOiuvue9rmdsb2JhbOeahHVzZXIgbGV2ZWwg5ZKMIGhhc2hcbiAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuKVxuICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ9cbiAgcmVmcmVzaFRva2VuICgpIHtcbiAgICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acnyDlpoLmnpzmsqHov4fmnJ/nm7TmjqXov5Tlm550b2tlbuWAvFxuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpID09PSAnJykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIC8vIOi/lOWbnuW9k+WJjXRva2VuXG4gIGdldFRva2VuICgpIHtcbiAgICBpZiAoIXRoaXMucmVmcmVzaFRva2VuKCkpIHtcbiAgICAgIC8vIOmHjeaWsOWPkemAgeivt+axguiOt+WPluaWsOeahHRva2VuIOaooeaLn+aVsOaNrntwaG9uZTogJzEzNDAyMTU1NzUxJ31cbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwaG9uZTogdGhpcy5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgfVxuICAgICAgdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSlcbiAgICB9XG4gICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgfVxuICAvLyDojrflj5YgdXNlciBsZXZlbCDlkowgaGFzaFxuICBnZXRVc2VyTGV2ZWwgKHRva2VuKSB7XG4gICAgdmFyIF90aGlzID0gdGhpc1xuICAgIHRoaXMuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oe3Rva2VuOiB0b2tlbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckxldmVsID0gcmVzLmRhdGEuZGF0YS5sZXZlbFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoID0gcmVzLmRhdGEuZGF0YS5oYXNoXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICAvLyDliKTmlq3lvZPliY11c2VyIGhhc2jmmK/lkKbpnIDopoHph43nva5cbiAgcmVzZXRVc2VyTGV2ZWwgKGhhc2gsIHRva2VuKSB7XG4gICAgaWYgKGhhc2ggIT09IHRoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCkge1xuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4pXG4gICAgfVxuICB9XG4gIC8vIOWtmOeUqOaIt2dsb2JhbOS/oeaBr1xuICBnZXRVc2VyIChjYikge1xuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgc2hvd0xvYWRpbmcgKCkge1xuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgfSlcbiAgfVxuICBzaG93U3VjY2VzcyAoKSB7XG4gICAgd2VweS5oaWRlTG9hZGluZygpXG4gIH1cbiAgc2hvd0ZhaWwgKCkge1xuICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295aSx6LSlJyxcbiAgICAgIGljb246ICdub25lJyxcbiAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICB9KVxuICB9XG4gIGRpc2FibGVBcGkgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjor6Xlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInXG4gICAgfSlcbiAgfVxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==