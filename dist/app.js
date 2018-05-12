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
      pages: ['pages/login', 'pages/start', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order', 'pages/orderDetail'],
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
      userHash: null

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
    value: function getLogin() {
      _wepy2.default.login({
        success: function success(res) {
          console.log(res.code);
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
    value: function getUserInfo(e, cb) {
      // this.globalData.userInfo = e.detail.userInfo
      console.log(e);
      // 发送后台同时获取手机号/token/过期时间
      // 如果token过期 通过手机号 发送requestToken重置global数据 模拟数据{phone: '13402155751'}
      this.requestToken({ phone: '13402155751' }, cb);
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
      var _this3 = this;

      this.HttpRequest.UserLogin(data).then(function (res) {
        var token = res.data.data.token;
        _wepy2.default.setStorageSync('token', token);
        // 设置global的user level 和 hash
        _this3.storageUser(token);
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
        this.requestToken({ phone: '13402155751' });
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
    key: 'storageUser',
    value: function storageUser(token) {
      var _this4 = this;

      _wepy2.default.getUserInfo({
        success: function success(res) {
          _this4.globalData.userInfo = res.userInfo;
        }
      });
      this.getUserLevel(token);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwidGVzdEFzeW5jIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiZmFpbCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZSIsImNiIiwicmVxdWVzdFRva2VuIiwicGhvbmUiLCJVc2VyTG9naW4iLCJ0aGVuIiwidG9rZW4iLCJzZXRTdG9yYWdlU3luYyIsInN0b3JhZ2VVc2VyIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZWZyZXNoVG9rZW4iLCJfdGhpcyIsIkdldFVzZXJJbmZvIiwiZXJyb3IiLCJsZXZlbCIsImhhc2giLCJnZXRVc2VyTGV2ZWwiLCJnZXRVc2VySW5mbyIsInNob3dMb2FkaW5nIiwiaGlkZUxvYWRpbmciLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsTUFBTUMsUUFBUSxlQUFSLENBQVY7O0FBRUEsSUFBTUMsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7Ozs7Ozs7Ozs7Ozs7OzZMQUdFQyxNLEdBQVM7QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsY0FISyxFQUlMLGFBSkssRUFLTCxZQUxLLEVBTUwsY0FOSyxFQU9MLGdCQVBLLEVBUUwsY0FSSyxFQVNMLGVBVEssRUFVTCxjQVZLLEVBV0wsZUFYSyxFQVlMLGNBWkssRUFhTCxhQWJLLEVBY0wsWUFkSyxFQWVMLGVBZkssRUFnQkwsaUJBaEJLLEVBaUJMLGFBakJLLEVBa0JMLG1CQWxCSyxDQURBO0FBcUJQQyxjQUFRO0FBQ05DLDZCQUFxQixNQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BckJEO0FBMkJQQyxjQUFRO0FBQ05DLGVBQU8sU0FERDtBQUVOQyx1QkFBZSxTQUZUO0FBR05DLHlCQUFpQixTQUhYO0FBSU5DLGNBQU0sQ0FBQztBQUNMQyxvQkFBVSxhQURMO0FBRUxDLG9CQUFVLHlCQUZMO0FBR0xDLDRCQUFrQix3QkFIYjtBQUlMQyxnQkFBTTtBQUpELFNBQUQsRUFLSDtBQUNESCxvQkFBVSxnQkFEVDtBQUVEQyxvQkFBVSw0QkFGVDtBQUdEQyw0QkFBa0IsMkJBSGpCO0FBSURDLGdCQUFNO0FBSkwsU0FMRyxFQVVIO0FBQ0RILG9CQUFVLFlBRFQ7QUFFREMsb0JBQVUsd0JBRlQ7QUFHREMsNEJBQWtCLHVCQUhqQjtBQUlEQyxnQkFBTTtBQUpMLFNBVkcsRUFlSDtBQUNESCxvQkFBVSxZQURUO0FBRURDLG9CQUFVLHdCQUZUO0FBR0RDLDRCQUFrQix1QkFIakI7QUFJREMsZ0JBQU07QUFKTCxTQWZHO0FBSkE7QUEzQkQsSyxTQXVEVEMsVSxHQUFhO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsaUJBQVcsSUFGQTtBQUdYQyxnQkFBVTs7QUFHWjtBQU5hLEssU0FPYkMsUSxHQUFXLEssU0FtTFhDLFcsR0FBYywyQixTQUNkeEIsRyxHQUFNQSxJQUFJeUIsTTs7Ozs7K0JBbExDO0FBQ1QsV0FBS0MsU0FBTDtBQUNEOzs7MEJBRU1DLEMsRUFBRztBQUNSLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQVcsWUFBTTtBQUNmRixrQkFBUSxrQkFBUjtBQUNELFNBRkQsRUFFR0YsSUFBSSxJQUZQO0FBR0QsT0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7Ozs7O3VCQUdvQixLQUFLSyxLQUFMLENBQVcsQ0FBWCxDOzs7QUFBYkMsb0I7O0FBQ05DLHdCQUFRQyxHQUFSLENBQVlGLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFHVTtBQUNWLHFCQUFLRyxLQUFMLENBQVc7QUFDVEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQkosa0JBQVFDLEdBQVIsQ0FBWUcsSUFBSUMsSUFBaEI7QUFDQTtBQUNELFNBSlE7QUFLVEMsY0FBTSxnQkFBTTtBQUNWLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sUUFETTtBQUViQyxrQkFBTSxNQUZPO0FBR2JDLG1CQUFPO0FBSE0sV0FBZjtBQUtEO0FBWFEsT0FBWDtBQWFEOzs7Z0NBRVdDLEMsRUFBR0MsRSxFQUFJO0FBQ2pCO0FBQ0FaLGNBQVFDLEdBQVIsQ0FBWVUsQ0FBWjtBQUNBO0FBQ0E7QUFDQSxXQUFLRSxZQUFMLENBQWtCLEVBQUNDLE9BQU8sYUFBUixFQUFsQixFQUEwQ0YsRUFBMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQUNEOzs7O2lDQUNjYixJLEVBQU1hLEUsRUFBSTtBQUFBOztBQUN0QixXQUFLdEIsV0FBTCxDQUFpQnlCLFNBQWpCLENBQTJCaEIsSUFBM0IsRUFBaUNpQixJQUFqQyxDQUFzQyxVQUFDWixHQUFELEVBQVM7QUFDN0MsWUFBSWEsUUFBUWIsSUFBSUwsSUFBSixDQUFTQSxJQUFULENBQWNrQixLQUExQjtBQUNBLHVCQUFLQyxjQUFMLENBQW9CLE9BQXBCLEVBQTZCRCxLQUE3QjtBQUNBO0FBQ0EsZUFBS0UsV0FBTCxDQUFpQkYsS0FBakI7QUFDQUwsY0FBTUEsR0FBR1IsSUFBSWxCLFFBQVAsQ0FBTjtBQUNELE9BTkQ7QUFPRDtBQUNEOzs7O21DQUNnQjtBQUNkO0FBQ0EsVUFBSSxlQUFLa0MsY0FBTCxDQUFvQixPQUFwQixNQUFpQyxFQUFyQyxFQUF5QztBQUN2QyxlQUFPLEtBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0Q7Ozs7K0JBQ1k7QUFDVixVQUFJLENBQUMsS0FBS0MsWUFBTCxFQUFMLEVBQTBCO0FBQ3hCO0FBQ0EsYUFBS1IsWUFBTCxDQUFrQixFQUFDQyxPQUFPLGFBQVIsRUFBbEI7QUFDRDtBQUNELGFBQU8sZUFBS00sY0FBTCxDQUFvQixPQUFwQixDQUFQO0FBQ0Q7QUFDRDs7OztpQ0FDY0gsSyxFQUFPO0FBQ25CLFVBQUlLLFFBQVEsSUFBWjtBQUNBLFdBQUtoQyxXQUFMLENBQWlCaUMsV0FBakIsQ0FBNkIsRUFBQ04sT0FBT0EsS0FBUixFQUE3QixFQUE2Q0QsSUFBN0MsQ0FBa0QsVUFBQ1osR0FBRCxFQUFTO0FBQ3pELFlBQUlBLElBQUlMLElBQUosQ0FBU3lCLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJGLGdCQUFNckMsVUFBTixDQUFpQkUsU0FBakIsR0FBNkJpQixJQUFJTCxJQUFKLENBQVNBLElBQVQsQ0FBYzBCLEtBQTNDO0FBQ0FILGdCQUFNckMsVUFBTixDQUFpQkcsUUFBakIsR0FBNEJnQixJQUFJTCxJQUFKLENBQVNBLElBQVQsQ0FBYzJCLElBQTFDO0FBQ0Q7QUFDRixPQUxEO0FBTUQ7QUFDRDs7OzttQ0FDZ0JBLEksRUFBTVQsSyxFQUFPO0FBQzNCLFVBQUlTLFNBQVMsS0FBS3pDLFVBQUwsQ0FBZ0JHLFFBQTdCLEVBQXVDO0FBQ3JDLGFBQUt1QyxZQUFMLENBQWtCVixLQUFsQjtBQUNEO0FBQ0Y7QUFDRDs7OztnQ0FDYUEsSyxFQUFPO0FBQUE7O0FBQ2xCLHFCQUFLVyxXQUFMLENBQWlCO0FBQ2Z6QixpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGlCQUFLbkIsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJrQixJQUFJbEIsUUFBL0I7QUFDRDtBQUhjLE9BQWpCO0FBS0EsV0FBS3lDLFlBQUwsQ0FBa0JWLEtBQWxCO0FBQ0Q7OztrQ0FDYztBQUNiLHFCQUFLWSxXQUFMLENBQWlCO0FBQ2ZyQixlQUFPLEtBRFE7QUFFZkMsY0FBTTtBQUZTLE9BQWpCO0FBSUQ7OztrQ0FDYztBQUNiLHFCQUFLcUIsV0FBTDtBQUNEOzs7K0JBQ1c7QUFDVixxQkFBS0EsV0FBTDtBQUNBLHFCQUFLdkIsU0FBTCxDQUFlO0FBQ2JDLGVBQU8sTUFETTtBQUViQyxjQUFNLE1BRk87QUFHYkMsZUFBTztBQUhNLE9BQWY7QUFLRDs7OytCQUNXcUIsUyxFQUFXQyxPLEVBQVM7QUFDOUJBLGdCQUFVQSxXQUFXLE9BQXJCO0FBQ0EsVUFBSUMsT0FBTyxTQUFQQSxJQUFPLENBQVVDLEtBQVYsRUFBaUI7QUFDMUIsWUFBSUEsUUFBUSxFQUFaLEVBQWdCO0FBQ2QsaUJBQU8sTUFBTUEsS0FBYjtBQUNEO0FBQ0QsZUFBT0EsS0FBUDtBQUNELE9BTEQ7QUFNQSxVQUFJQyxTQUFTSixZQUFZLElBQUlLLElBQUosQ0FBU0wsU0FBVCxDQUFaLEdBQWtDLElBQUlLLElBQUosRUFBL0M7QUFDQSxVQUFJQyxPQUFPRixPQUFPRyxXQUFQLEVBQVg7QUFDQSxVQUFJQyxRQUFRTixLQUFLRSxPQUFPSyxRQUFQLEtBQW9CLENBQXpCLENBQVo7QUFDQSxVQUFJQyxNQUFNUixLQUFLRSxPQUFPTyxPQUFQLEVBQUwsQ0FBVjtBQUNBLFVBQUlDLE9BQU9WLEtBQUtFLE9BQU9TLFFBQVAsRUFBTCxDQUFYO0FBQ0EsVUFBSUMsU0FBU1osS0FBS0UsT0FBT1csVUFBUCxFQUFMLENBQWI7QUFDQSxVQUFJQyxTQUFTZCxLQUFLRSxPQUFPYSxVQUFQLEVBQUwsQ0FBYjtBQUNBLGFBQU9oQixRQUFRaUIsT0FBUixDQUFnQixlQUFoQixFQUFpQyxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pELGVBQVE7QUFDTkMsYUFBR2QsSUFERztBQUVOZSxhQUFHYixLQUZHO0FBR05jLGFBQUdaLEdBSEc7QUFJTmEsYUFBR1gsSUFKRztBQUtOWSxhQUFHVixNQUxHO0FBTU5wRCxhQUFHc0Q7QUFORyxTQUFELENBT0pHLE9BUEksQ0FBUDtBQVFELE9BVE0sQ0FBUDtBQVVEOzs7O0VBalAwQixlQUFLTSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG52YXIgTWQ1ID0gcmVxdWlyZSgnLi9zZXJ2aWNlL21kNScpXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2NhcnQnLFxuICAgICAgJ3BhZ2VzL3N5c3RlbScsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvbmV3QWRkJyxcbiAgICAgICdwYWdlcy9wYXljYXJ0JyxcbiAgICAgICdwYWdlcy9wYXlidXknLFxuICAgICAgJ3BhZ2VzL3J1bGVzJyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jb2xsZWN0JyxcbiAgICAgICdwYWdlcy9sb2dpc3RpY2EnLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9vcmRlckRldGFpbCdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmYzVlNDMnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2ZjNWU0NCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHVzZXJMZXZlbDogbnVsbCxcbiAgICB1c2VySGFzaDogbnVsbFxuICB9XG5cbiAgLy8g5Yik5patdGFiYmFy5Zue6YCA6aG16Z2iXG4gIHBhZ2VSb290ID0gZmFsc2VcblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cblxuICBnZXRMb2dpbiAoKSB7XG4gICAgd2VweS5sb2dpbih7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIFjb2RlXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIC8vIOWPkemAgeWQjuWPsOWQjOaXtuiOt+WPluaJi+acuuWPty90b2tlbi/ov4fmnJ/ml7bpl7RcbiAgICAvLyDlpoLmnpx0b2tlbui/h+acnyDpgJrov4fmiYvmnLrlj7cg5Y+R6YCBcmVxdWVzdFRva2Vu6YeN572uZ2xvYmFs5pWw5o2uIOaooeaLn+aVsOaNrntwaG9uZTogJzEzNDAyMTU1NzUxJ31cbiAgICB0aGlzLnJlcXVlc3RUb2tlbih7cGhvbmU6ICcxMzQwMjE1NTc1MSd9LCBjYilcbiAgICAvLyB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAvLyAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgLy8gICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGRhdGEudXNlckluZm9cbiAgICAvLyAgICAgdGhhdC5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oe3Bob25lOiAnMTM0MDIxNTU3NTEnfSkudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgIC8vICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgLy8gICAgICAgdGhhdC5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyh7dG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAvLyAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAvLyAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJIYXNoID0gcmVzLmRhdGEuZGF0YS5oYXNoXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgfSlcbiAgICAvLyAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICB9LFxuICAgIC8vICAgZmFpbCAocmVzKSB7XG4gICAgLy8gICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAvLyAgICAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgLy8gICAgICAgY29udGVudDogJ+ivt+ajgOafpee9kee7nOi/nuaOpe+8jOW5tumHjeaWsOW8gOWQr+aOiOadgycsXG4gICAgLy8gICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgLy8gICAgICAgICAgIHdlcHkub3BlblNldHRpbmcoe1xuICAgIC8vICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKVxuICAgIC8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgIC8vICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICfnmbvlvZXlpLHotKUnXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgLy8gICAgICAgICAgICAgICAgICd0aXRsZSc6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xkvb/nlKjlsI/nqIvluo/pg6jliIblip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgLy8gICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH0pXG4gICAgLy8gICB9XG4gICAgLy8gfSlcbiAgfVxuICAvLyDlt7LmnInmiYvmnLrlj7fojrflj5Z0b2tlblxuICByZXF1ZXN0VG9rZW4gKGRhdGEsIGNiKSB7XG4gICAgdGhpcy5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgLy8g6K6+572uZ2xvYmFs55qEdXNlciBsZXZlbCDlkowgaGFzaFxuICAgICAgdGhpcy5zdG9yYWdlVXNlcih0b2tlbilcbiAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfXG4gIHJlZnJlc2hUb2tlbiAoKSB7XG4gICAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ8g5aaC5p6c5rKh6L+H5pyf55u05o6l6L+U5ZuedG9rZW7lgLxcbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSA9PT0gJycpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICAvLyDov5Tlm57lvZPliY10b2tlblxuICBnZXRUb2tlbiAoKSB7XG4gICAgaWYgKCF0aGlzLnJlZnJlc2hUb2tlbigpKSB7XG4gICAgICAvLyDph43mlrDlj5HpgIHor7fmsYLojrflj5bmlrDnmoR0b2tlbiDmqKHmi5/mlbDmja57cGhvbmU6ICcxMzQwMjE1NTc1MSd9XG4gICAgICB0aGlzLnJlcXVlc3RUb2tlbih7cGhvbmU6ICcxMzQwMjE1NTc1MSd9KVxuICAgIH1cbiAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICB9XG4gIC8vIOiOt+WPliB1c2VyIGxldmVsIOWSjCBoYXNoXG4gIGdldFVzZXJMZXZlbCAodG9rZW4pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyh7dG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWreW9k+WJjXVzZXIgaGFzaOaYr+WQpumcgOimgemHjee9rlxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4pIHtcbiAgICBpZiAoaGFzaCAhPT0gdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKSB7XG4gICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbilcbiAgICB9XG4gIH1cbiAgLy8g5a2Y55So5oi3Z2xvYmFs5L+h5oGvXG4gIHN0b3JhZ2VVc2VyICh0b2tlbikge1xuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuKVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgc2hvd1N1Y2Nlc3MgKCkge1xuICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICB9XG4gIHNob3dGYWlsICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICBpY29uOiAnbm9uZScsXG4gICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgfSlcbiAgfVxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==