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
          } else {
            this.showSuccess();
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
    value: function getUserLevel(token, cb) {
      var _this = this;
      this.HttpRequest.GetUserInfo({ token: token }).then(function (res) {
        if (res.data.error === 0) {
          _this.globalData.userLevel = res.data.data.level;
          _this.globalData.userHash = res.data.data.hash;
          _this.globalData.vipEnd = res.data.data.vipEnd;
          _this.globalData.reduction = res.data.data.reduction;
          console.log(_this.globalData.userLevel);
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
    key: 'showSuccess',
    value: function showSuccess() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJjb2RlIiwibmlja05hbWUiLCJ1c2VySW1hZ2UiLCJtaXNzVG9rZW4iLCJnZXRUb2tlblRpbWUiLCJodHRwSWQiLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwiZGF0YSIsImVycm9yIiwibXNnIiwiY29uc29sZSIsImxvZyIsInNob3dGYWlsIiwic2hvd1N1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJsZW5ndGgiLCJwdXNoIiwic2hpZnQiLCJjYiIsImxvZ2luIiwicmVzIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJlIiwianNjb2RlIiwiZW5jcnlwdGVkRGF0YSIsImRldGFpbCIsIml2IiwiU2VuZENvZGUiLCJ0aGVuIiwicGhvbmVOdW1iZXIiLCJwaG9uZSIsInNldFN0b3JhZ2VTeW5jIiwicmVxdWVzdFRva2VuIiwiY2F0Y2giLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIlVzZXJMb2dpbiIsInRva2VuIiwidGltZU91dCIsImdldFVzZXJMZXZlbCIsIm5vd1RpbWUiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiZ2V0VGltZSIsImdldFN0b3JhZ2VTeW5jIiwibmF2aWdhdGVUbyIsInVybCIsInJlZnJlc2hUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJsZXZlbCIsImhhc2giLCJ2aXBFbmQiLCJyZWR1Y3Rpb24iLCJnZXRVc2VySW5mbyIsInNob3dMb2FkaW5nIiwiaGlkZUxvYWRpbmciLCJjb25maXJtIiwicmVkaXJlY3RUbyIsInRpbWVzdGFtcCIsImZvcm1hdHMiLCJ6ZXJvIiwidmFsdWUiLCJteURhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbml0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIiwicmVwbGFjZSIsIm1hdGNoZXMiLCJZIiwibSIsImQiLCJIIiwiaSIsInMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxNQUFNQyxRQUFRLGVBQVIsQ0FBVjs7QUFFQSxJQUFNQyxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7Ozs7O0FBNEVFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsV0F6RWZDLE1BeUVlLEdBekVOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGNBSEssRUFJTCxhQUpLLEVBS0wsWUFMSyxFQU1MLGNBTkssRUFPTCxnQkFQSyxFQVFMLGNBUkssRUFTTCxlQVRLLEVBVUwsY0FWSyxFQVdMLGVBWEssRUFZTCxlQVpLLEVBYUwsY0FiSyxFQWNMLGFBZEssRUFlTCxZQWZLLEVBZ0JMLGVBaEJLLEVBaUJMLGlCQWpCSyxFQWtCTCxhQWxCSyxFQW1CTCxtQkFuQkssRUFvQkwsZUFwQkssRUFxQkwsZ0JBckJLLEVBc0JMLGVBdEJLLENBREE7QUF5QlBDLGNBQVE7QUFDTkMsNkJBQXFCLE1BRGY7QUFFTkMseUJBQWlCLFNBRlg7QUFHTkMsc0NBQThCLFNBSHhCO0FB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LFFBQVFnQixPQUFSLENBQWdCLGVBQWhCLEVBQWlDLFVBQVVDLE9BQVYsRUFBbUI7QUFDekQsZUFBUTtBQUNOQyxhQUFHZCxJQURHO0FBRU5lLGFBQUdiLEtBRkc7QUFHTmMsYUFBR1osR0FIRztBQUlOYSxhQUFHWCxJQUpHO0FBS05ZLGFBQUdWLE1BTEc7QUFNTlcsYUFBR1Q7QUFORyxTQUFELENBT0pHLE9BUEksQ0FBUDtBQVFELE9BVE0sQ0FBUDtBQVVEOzs7O0VBN1QwQixlQUFLTyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG52YXIgTWQ1ID0gcmVxdWlyZSgnLi9zZXJ2aWNlL21kNScpXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2NhcnQnLFxuICAgICAgJ3BhZ2VzL3N5c3RlbScsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvbmV3QWRkJyxcbiAgICAgICdwYWdlcy9lZGl0QWRkJyxcbiAgICAgICdwYWdlcy9wYXljYXJ0JyxcbiAgICAgICdwYWdlcy9wYXlidXknLFxuICAgICAgJ3BhZ2VzL3J1bGVzJyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jb2xsZWN0JyxcbiAgICAgICdwYWdlcy9sb2dpc3RpY2EnLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9vcmRlckRldGFpbCcsXG4gICAgICAncGFnZXMvaW52b2ljZScsXG4gICAgICAncGFnZXMvYXBwbHlWaXAnLFxuICAgICAgJ3BhZ2VzL3NlcnZpY2UnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmYzVlNDMnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2ZjNWU0NCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHVzZXJMZXZlbDogbnVsbCxcbiAgICB1c2VySGFzaDogbnVsbCxcbiAgICBjb2RlOiBudWxsLFxuICAgIG5pY2tOYW1lOiBudWxsLFxuICAgIHVzZXJJbWFnZTogbnVsbFxuICB9XG5cbiAgbWlzc1Rva2VuID0gZmFsc2VcbiAgZ2V0VG9rZW5UaW1lID0gMFxuICBodHRwSWQgPSBbXVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTEgJiYgcC5kYXRhLm1zZyA9PT0gJ21pc3MgdG9rZW4nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWlzcyB0b2tlbicpXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSsrXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IC0yKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsKHAuZGF0YS5tc2cpXG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93U3VjY2VzcygpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB0aGlzLnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSAocCkge1xuICAgICAgICAvLyDorrDlvZVyZXF1ZXN0IGluZm9cbiAgICAgICAgaWYgKHAuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgaWYgKHAuZGF0YS5odHRwSWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmh0dHBJZC5sZW5ndGggPCAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5wdXNoKHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5zaGlmdCgpXG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnB1c2gocC5kYXRhLmh0dHBJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8g5Yik5patdGFiYmFy5Zue6YCA6aG16Z2iXG4gIHBhZ2VSb290ID0gZmFsc2VcblxuICBvbkxhdW5jaCgpIHt9XG5cbiAgZ2V0TG9naW4gKGNiKSB7XG4gICAgd2VweS5sb2dpbih7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxuICAgICAgICBjYiAmJiBjYihyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBY29kZVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn572R57uc6L+e5o6l5aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRVc2VySW5mbyhlLCBjb2RlLCBjYikge1xuICAgIC8vIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgY29uc29sZS5sb2coZSwgY29kZSlcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGpzY29kZTogY29kZSxcbiAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogZS5kZXRhaWwuaXZcbiAgICB9XG4gICAgdGhpcy5IdHRwUmVxdWVzdC5TZW5kQ29kZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgcGhvbmVOdW1iZXIgPSByZXMuZGF0YS5kYXRhLnBob25lXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Bob25lJywgcGhvbmVOdW1iZXIpXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHBob25lOiBwaG9uZU51bWJlclxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdFRva2VuKGRhdGEsIGNiKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6lJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICAvLyDlt7LmnInmiYvmnLrlj7fojrflj5Z0b2tlblxuICBhc3luYyByZXF1ZXN0VG9rZW4gKGRhdGEsIGNiLCBmYWlsKSB7XG4gICAgYXdhaXQgdGhpcy5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICB2YXIgdGltZU91dCA9IHJlcy5kYXRhLmRhdGEudGltZU91dFxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JywgdGltZU91dClcbiAgICAgICAgLy8g6K6+572uZ2xvYmFs55qEdXNlciBsZXZlbCDlkowgaGFzaFxuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbiwgKCkgPT4ge1xuICAgICAgICAgIGNiICYmIGNiKHRva2VuKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBmYWlsICYmIGZhaWwoKVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ9cbiAgcmVmcmVzaFRva2VuICgpIHtcbiAgICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acnyDlpoLmnpzmsqHov4fmnJ/nm7TmjqXov5Tlm550b2tlbuWAvFxuICAgIHZhciBub3dUaW1lID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApXG4gICAgdmFyIHRpbWVPdXQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JylcbiAgICBpZiAobm93VGltZSA+IHRpbWVPdXQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8vIOi/lOWbnuW9k+WJjXRva2VuXG4gIGdldFRva2VuIChlcnJvcikge1xuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpID09PSAnJykge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi9sb2dpbidcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5yZWZyZXNoVG9rZW4oKSB8fCBlcnJvciA9PT0gLTEpIHtcbiAgICAgICAgLy8gdG9rZW7ov4fmnJ8g6YeN5paw5Y+R6YCB6K+35rGC6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgcGhvbmU6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhKVxuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDojrflj5YgdXNlciBsZXZlbCDlkowgaGFzaFxuICBnZXRVc2VyTGV2ZWwgKHRva2VuLCBjYikge1xuICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICB0aGlzLkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCA9IHJlcy5kYXRhLmRhdGEuaGFzaFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnZpcEVuZCA9IHJlcy5kYXRhLmRhdGEudmlwRW5kXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEucmVkdWN0aW9uID0gcmVzLmRhdGEuZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgY29uc29sZS5sb2coX3RoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWreW9k+WJjXVzZXIgaGFzaOaYr+WQpumcgOimgemHjee9rlxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4pIHtcbiAgICBpZiAoaGFzaCAhPT0gdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKSB7XG4gICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbilcbiAgICB9XG4gIH1cbiAgLy8g5a2Y55So5oi3Z2xvYmFs5L+h5oGvXG4gIGdldFVzZXIgKGNiKSB7XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBzaG93TG9hZGluZyAoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICBpY29uOiAnbG9hZGluZydcbiAgICB9KVxuICB9XG4gIHNob3dTdWNjZXNzICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgfVxuICBzaG93RmFpbCAoZXJyb3IpIHtcbiAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogZXJyb3IgfHwgJ+WKoOi9veWksei0pScsXG4gICAgICBpY29uOiAnbm9uZScsXG4gICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgfSlcbiAgfVxuICBwYXlGYWlsICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5pSv5LuY5aSx6LSlJyxcbiAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBkaXNhYmxlQXBpICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So6K+l5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgIH0pXG4gIH1cbiAgZGF0ZUZvcm1hdCAodGltZXN0YW1wLCBmb3JtYXRzKSB7XG4gICAgZm9ybWF0cyA9IGZvcm1hdHMgfHwgJ1ktbS1kJ1xuICAgIHZhciB6ZXJvID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICB2YXIgbXlEYXRlID0gdGltZXN0YW1wID8gbmV3IERhdGUodGltZXN0YW1wKSA6IG5ldyBEYXRlKClcbiAgICB2YXIgeWVhciA9IG15RGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgdmFyIG1vbnRoID0gemVybyhteURhdGUuZ2V0TW9udGgoKSArIDEpXG4gICAgdmFyIGRheSA9IHplcm8obXlEYXRlLmdldERhdGUoKSlcbiAgICB2YXIgaG91ciA9IHplcm8obXlEYXRlLmdldEhvdXJzKCkpXG4gICAgdmFyIG1pbml0ZSA9IHplcm8obXlEYXRlLmdldE1pbnV0ZXMoKSlcbiAgICB2YXIgc2Vjb25kID0gemVybyhteURhdGUuZ2V0U2Vjb25kcygpKVxuICAgIHJldHVybiBmb3JtYXRzLnJlcGxhY2UoL1l8bXxkfEh8aXxzL2lnLCBmdW5jdGlvbiAobWF0Y2hlcykge1xuICAgICAgcmV0dXJuICh7XG4gICAgICAgIFk6IHllYXIsXG4gICAgICAgIG06IG1vbnRoLFxuICAgICAgICBkOiBkYXksXG4gICAgICAgIEg6IGhvdXIsXG4gICAgICAgIGk6IG1pbml0ZSxcbiAgICAgICAgczogc2Vjb25kXG4gICAgICB9KVttYXRjaGVzXVxuICAgIH0pXG4gIH1cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxuICBNZDUgPSBNZDUuaGV4TUQ1XG59XG4iXX0=