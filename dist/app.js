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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwicGFnZVJvb3QiLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsImRhdGEiLCJlcnJvciIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzaG93RmFpbCIsImZhaWwiLCJjb21wbGV0ZSIsImxlbmd0aCIsInB1c2giLCJzaGlmdCIsImNiIiwibG9naW4iLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImUiLCJyZWZyZW5jZUNvZGUiLCJqc2NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJyZWZlcmVuY2VJZCIsIlNlbmRDb2RlIiwidGhlbiIsInBob25lTnVtYmVyIiwicGhvbmUiLCJzZXRTdG9yYWdlU3luYyIsInJlcXVlc3RUb2tlbiIsImNhdGNoIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJVc2VyTG9naW4iLCJ0b2tlbiIsInRpbWVPdXQiLCJnZXRVc2VyTGV2ZWwiLCJub3dUaW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRTdG9yYWdlU3luYyIsInJlZnJlbmNlIiwibmF2aWdhdGVUbyIsInVybCIsInJlZnJlc2hUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJsZXZlbCIsImhhc2giLCJ2aXBFbmQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJJZCIsImdldFVzZXJJbmZvIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwidGltZXN0YW1wIiwiZm9ybWF0cyIsInplcm8iLCJ2YWx1ZSIsIm15RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwicyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7QUFIQTtBQUNBOztBQUdBLElBQUlBLE1BQU1DLFFBQVEsZUFBUixDQUFWOztBQUVBO0FBQ0E7Ozs7O0FBNEVFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsV0F6RWZDLE1BeUVlLEdBekVOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGNBSEssRUFJTCxhQUpLLEVBS0wsWUFMSyxFQU1MLGNBTkssRUFPTCxnQkFQSyxFQVFMLGNBUkssRUFTTCxlQVRLLEVBVUwsY0FWSyxFQVdMLGVBWEssRUFZTCxlQVpLLEVBYUwsY0FiSyxFQWNMLGFBZEssRUFlTCxZQWZLLEVBZ0JMLGVBaEJLLEVBaUJMLGlCQWpCSyxFQWtCTCxhQWxCSyxFQW1CTCxtQkFuQkssRUFvQkwsZUFwQkssRUFxQkwsZ0JBckJLLEVBc0JMLGVBdEJLLENBREE7QUF5QlBDLGNBQVE7QUFDTkMsNkJBQXFCLE1BRGY7QUFFTkMseUJBQWlCLFNBRlg7QUFHTkMsc0NBQThCLFNBSHhCO0FBSU5D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QUFLRSxPQUFPTSxPQUFQLEVBQUwsQ0FBVjtBQUNBLFVBQUlDLE9BQU9ULEtBQUtFLE9BQU9RLFFBQVAsRUFBTCxDQUFYO0FBQ0EsVUFBSUMsU0FBU1gsS0FBS0UsT0FBT1UsVUFBUCxFQUFMLENBQWI7QUFDQSxVQUFJQyxTQUFTYixLQUFLRSxPQUFPWSxVQUFQLEVBQUwsQ0FBYjtBQUNBLGFBQU9mLFFBQVFnQixPQUFSLENBQWdCLGVBQWhCLEVBQWlDLFVBQVVDLE9BQVYsRUFBbUI7QUFDekQsZUFBUTtBQUNOQyxhQUFHZCxJQURHO0FBRU5lLGFBQUdiLEtBRkc7QUFHTmMsYUFBR1osR0FIRztBQUlOYSxhQUFHWCxJQUpHO0FBS05ZLGFBQUdWLE1BTEc7QUFNTlcsYUFBR1Q7QUFORyxTQUFELENBT0pHLE9BUEksQ0FBUDtBQVFELE9BVE0sQ0FBUDtBQVVEOzs7O0VBbFUwQixlQUFLTyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuLy8gaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuLy8gaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG52YXIgTWQ1ID0gcmVxdWlyZSgnLi9zZXJ2aWNlL21kNScpXG5cbi8vIGNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuLy8gc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2NhcnQnLFxuICAgICAgJ3BhZ2VzL3N5c3RlbScsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvbmV3QWRkJyxcbiAgICAgICdwYWdlcy9lZGl0QWRkJyxcbiAgICAgICdwYWdlcy9wYXljYXJ0JyxcbiAgICAgICdwYWdlcy9wYXlidXknLFxuICAgICAgJ3BhZ2VzL3J1bGVzJyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jb2xsZWN0JyxcbiAgICAgICdwYWdlcy9sb2dpc3RpY2EnLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9vcmRlckRldGFpbCcsXG4gICAgICAncGFnZXMvaW52b2ljZScsXG4gICAgICAncGFnZXMvYXBwbHlWaXAnLFxuICAgICAgJ3BhZ2VzL3NlcnZpY2UnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNlYzNkM2EnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2VjM2QzYScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHVzZXJMZXZlbDogbnVsbCxcbiAgICB1c2VySGFzaDogbnVsbCxcbiAgICBjb2RlOiBudWxsLFxuICAgIG5pY2tOYW1lOiBudWxsLFxuICAgIHVzZXJJbWFnZTogbnVsbFxuICB9XG5cbiAgbWlzc1Rva2VuID0gZmFsc2VcbiAgZ2V0VG9rZW5UaW1lID0gMFxuICBodHRwSWQgPSBbXVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTEgJiYgcC5kYXRhLm1zZyA9PT0gJ21pc3MgdG9rZW4nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWlzcyB0b2tlbicpXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSsrXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IC0yKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsKHAuZGF0YS5tc2cpXG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgZmFpbCAocCkge1xuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlIChwKSB7XG4gICAgICAgIC8vIOiusOW9lXJlcXVlc3QgaW5mb1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmh0dHBJZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaHR0cElkLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnB1c2gocC5kYXRhLmh0dHBJZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnNoaWZ0KClcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQucHVzaChwLmRhdGEuaHR0cElkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyDliKTmlq10YWJiYXLlm57pgIDpobXpnaJcbiAgcGFnZVJvb3QgPSBmYWxzZVxuXG4gIG9uTGF1bmNoKCkge31cblxuICBnZXRMb2dpbiAoY2IpIHtcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYihyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBY29kZVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn572R57uc6L+e5o6l5aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRVc2VySW5mbyhlLCBjb2RlLCByZWZyZW5jZUNvZGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlLCBjb2RlLCByZWZyZW5jZUNvZGUpXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBqc2NvZGU6IGNvZGUsXG4gICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgaXY6IGUuZGV0YWlsLml2LFxuICAgICAgcmVmZXJlbmNlSWQ6IHJlZnJlbmNlQ29kZVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2VuZENvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gcmVzLmRhdGEuZGF0YS5waG9uZVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwaG9uZScsIHBob25lTnVtYmVyKVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogcGhvbmVOdW1iZXJcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhLCBjYilcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogJ+ivt+ajgOafpee9kee7nOi/nuaOpScsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgLy8g5bey5pyJ5omL5py65Y+36I635Y+WdG9rZW5cbiAgYXN5bmMgcmVxdWVzdFRva2VuIChkYXRhLCBjYiwgZmFpbCkge1xuICAgIGF3YWl0IHRoaXMuSHR0cFJlcXVlc3QuVXNlckxvZ2luKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICAgICAgdmFyIHRpbWVPdXQgPSByZXMuZGF0YS5kYXRhLnRpbWVPdXRcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCB0b2tlbilcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndGltZW91dCcsIHRpbWVPdXQpXG4gICAgICAgIC8vIOiuvue9rmdsb2JhbOeahHVzZXIgbGV2ZWwg5ZKMIGhhc2hcbiAgICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4sICgpID0+IHtcbiAgICAgICAgICBjYiAmJiBjYih0b2tlbilcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfXG4gIHJlZnJlc2hUb2tlbiAoKSB7XG4gICAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ8g5aaC5p6c5rKh6L+H5pyf55u05o6l6L+U5ZuedG9rZW7lgLxcbiAgICB2YXIgbm93VGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKVxuICAgIHZhciB0aW1lT3V0ID0gd2VweS5nZXRTdG9yYWdlU3luYygndGltZW91dCcpXG4gICAgaWYgKG5vd1RpbWUgPiB0aW1lT3V0KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICAvLyDov5Tlm57lvZPliY10b2tlblxuICBnZXRUb2tlbiAoZXJyb3IsIHJlZnJlbmNlKSB7XG4gICAgdmFyIHJlZnJlbmNlQ29kZSA9ICcnXG4gICAgaWYgKHJlZnJlbmNlKSB7XG4gICAgICByZWZyZW5jZUNvZGUgPSByZWZyZW5jZVxuICAgIH1cbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSA9PT0gJycpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4vbG9naW4/cmVmcmVuY2VDb2RlPScgKyByZWZyZW5jZUNvZGVcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5yZWZyZXNoVG9rZW4oKSB8fCBlcnJvciA9PT0gLTEpIHtcbiAgICAgICAgLy8gdG9rZW7ov4fmnJ8g6YeN5paw5Y+R6YCB6K+35rGC6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgcGhvbmU6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhKVxuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDojrflj5YgdXNlciBsZXZlbCDlkowgaGFzaFxuICBnZXRVc2VyTGV2ZWwgKHRva2VuLCBjYikge1xuICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICB0aGlzLkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCA9IHJlcy5kYXRhLmRhdGEuaGFzaFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnZpcEVuZCA9IHJlcy5kYXRhLmRhdGEudmlwRW5kXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEucmVkdWN0aW9uID0gcmVzLmRhdGEuZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5tZW1iZXJJZCA9IHJlcy5kYXRhLmRhdGEubWVtYmVySWRcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5pat5b2T5YmNdXNlciBoYXNo5piv5ZCm6ZyA6KaB6YeN572uXG4gIHJlc2V0VXNlckxldmVsIChoYXNoLCB0b2tlbikge1xuICAgIGlmIChoYXNoICE9PSB0aGlzLmdsb2JhbERhdGEudXNlckhhc2gpIHtcbiAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuKVxuICAgIH1cbiAgfVxuICAvLyDlrZjnlKjmiLdnbG9iYWzkv6Hmga9cbiAgZ2V0VXNlciAoY2IpIHtcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgaGlkZUxvYWRpbmcgKCkge1xuICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICB9XG4gIHNob3dGYWlsIChlcnJvcikge1xuICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiBlcnJvciB8fCAn5Yqg6L295aSx6LSlJyxcbiAgICAgIGljb246ICdub25lJyxcbiAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICB9KVxuICB9XG4gIHBheUZhaWwgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICfmlK/ku5jlpLHotKUnLFxuICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGRpc2FibGVBcGkgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjor6Xlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInXG4gICAgfSlcbiAgfVxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==