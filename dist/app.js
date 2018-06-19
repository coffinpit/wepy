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
    // 时间戳格式化

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
    // 过滤emoji

  }, {
    key: 'filteremoji',
    value: function filteremoji(str) {
      var ranges = ['\uD83C[\uDF00-\uDFFF]', '\uD83D[\uDC00-\uDE4F]', '\uD83D[\uDE80-\uDEFF]'];
      return str.replace(new RegExp(ranges.join('|'), 'g'), '');
    }
    // 客服消息

  }, {
    key: 'getUserName',
    value: function getUserName() {
      return this.filteremoji(this.globalData.userInfo.nickName);
    }
  }, {
    key: 'getUserAvatar',
    value: function getUserAvatar() {
      return this.globalData.userInfo.avatarUrl;
    }
  }, {
    key: 'getMessage',
    value: function getMessage(pageDetail, tags) {
      var messageObj = {
        'level': '',
        'cellphones': ''
      };
      if (this.globalData.userLevel === 0) {
        messageObj.level = 'normal';
      } else if (this.globalData.userLevel === 1) {
        messageObj.level = 'vip';
      }
      messageObj.cellphones = [['', _wepy2.default.getStorageSync('phone')]];
      // messageObj.description = pageDetail
      // messageObj.tags = pageDetail + ',' + tags
      // messageObj.custom_fields = {
      //   'TextField_13010': 'test'
      // }
      console.log(JSON.stringify(messageObj));
      return JSON.stringify(messageObj);
    }
  }, {
    key: 'getBusiness',
    value: function getBusiness(title, content, orderId) {
      var noteObj = {
        'title': title,
        'custom_fields': {
          'TextField_28227': content,
          'TextField_28233': orderId
        }
      };
      console.log(JSON.stringify(noteObj));
      return JSON.stringify(noteObj);
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwicGFnZVJvb3QiLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsImRhdGEiLCJlcnJvciIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzaG93RmFpbCIsImZhaWwiLCJjb21wbGV0ZSIsImxlbmd0aCIsInB1c2giLCJzaGlmdCIsImNiIiwibG9naW4iLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImUiLCJyZWZyZW5jZUNvZGUiLCJqc2NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJyZWZlcmVuY2VJZCIsIlNlbmRDb2RlIiwidGhlbiIsInBob25lTnVtYmVyIiwicGhvbmUiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJVc2VyTG9naW4iLCJ0b2tlbiIsInRpbWVPdXQiLCJnZXRVc2VyTGV2ZWwiLCJub3dUaW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRTdG9yYWdlU3luYyIsInJlZnJlbmNlIiwibmF2aWdhdGVUbyIsInVybCIsInJlZnJlc2hUb2tlbiIsInJlcXVlc3RUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJsZXZlbCIsImhhc2giLCJ2aXBFbmQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJJZCIsImdldFVzZXJJbmZvIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwidGltZXN0YW1wIiwiZm9ybWF0cyIsInplcm8iLCJ2YWx1ZSIsIm15RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwicyIsInN0ciIsInJhbmdlcyIsIlJlZ0V4cCIsImpvaW4iLCJmaWx0ZXJlbW9qaSIsImF2YXRhclVybCIsInBhZ2VEZXRhaWwiLCJ0YWdzIiwibWVzc2FnZU9iaiIsImNlbGxwaG9uZXMiLCJKU09OIiwic3RyaW5naWZ5Iiwib3JkZXJJZCIsIm5vdGVPYmoiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBS0E7Ozs7Ozs7Ozs7Ozs7O0FBSEE7QUFDQTs7QUFHQSxJQUFJQSxNQUFNQyxRQUFRLGVBQVIsQ0FBVjs7QUFFQTtBQUNBOzs7OztBQTRFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFdBekVmQyxNQXlFZSxHQXpFTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxjQUhLLEVBSUwsYUFKSyxFQUtMLFlBTEssRUFNTCxjQU5LLEVBT0wsZ0JBUEssRUFRTCxjQVJLLEVBU0wsZUFUSyxFQVVMLGNBVkssRUFXTCxlQVhLLEVBWUwsZUFaSyxFQWFMLGNBYkssRUFjTCxhQWRLLEVBZUwsWUFmSyxFQWdCTCxlQWhCSyxFQWlCTCxpQkFq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LHNCQUFjO0FBRkMsT0FBakI7QUFJQSxVQUFJLEtBQUtoSCxVQUFMLENBQWdCRSxTQUFoQixLQUE4QixDQUFsQyxFQUFxQztBQUNuQzhHLG1CQUFXM0MsS0FBWCxHQUFtQixRQUFuQjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUtyRSxVQUFMLENBQWdCRSxTQUFoQixLQUE4QixDQUFsQyxFQUFxQztBQUMxQzhHLG1CQUFXM0MsS0FBWCxHQUFtQixLQUFuQjtBQUNEO0FBQ0QyQyxpQkFBV0MsVUFBWCxHQUF3QixDQUFDLENBQUMsRUFBRCxFQUFLLGVBQUtwRCxjQUFMLENBQW9CLE9BQXBCLENBQUwsQ0FBRCxDQUF4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQXhDLGNBQVFDLEdBQVIsQ0FBWTRGLEtBQUtDLFNBQUwsQ0FBZUgsVUFBZixDQUFaO0FBQ0EsYUFBT0UsS0FBS0MsU0FBTCxDQUFlSCxVQUFmLENBQVA7QUFDRDs7O2dDQUNZL0UsSyxFQUFPaUIsTyxFQUFTa0UsTyxFQUFTO0FBQ3BDLFVBQUlDLFVBQVU7QUFDWixpQkFBU3BGLEtBREc7QUFFWix5QkFBaUI7QUFDZiw2QkFBbUJpQixPQURKO0FBRWYsNkJBQW1Ca0U7QUFGSjtBQUZMLE9BQWQ7QUFPQS9GLGNBQVFDLEdBQVIsQ0FBWTRGLEtBQUtDLFNBQUwsQ0FBZUUsT0FBZixDQUFaO0FBQ0EsYUFBT0gsS0FBS0MsU0FBTCxDQUFlRSxPQUFmLENBQVA7QUFDRDs7OztFQW5YMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbi8vIGltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbi8vIGltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuXG5pbXBvcnQgSHR0cFJlcXVlc3QgZnJvbSAnLi9zZXJ2aWNlL0h0dHBSZXF1ZXN0J1xudmFyIE1kNSA9IHJlcXVpcmUoJy4vc2VydmljZS9tZDUnKVxuXG4vLyBjb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcbi8vIHNldFN0b3JlKHN0b3JlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL3N0YXJ0JyxcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9jYXJ0JyxcbiAgICAgICdwYWdlcy9zeXN0ZW0nLFxuICAgICAgJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICdwYWdlcy9zZWFyY2gnLFxuICAgICAgJ3BhZ2VzL2FkZHJlc3MnLFxuICAgICAgJ3BhZ2VzL25ld0FkZCcsXG4gICAgICAncGFnZXMvZWRpdEFkZCcsXG4gICAgICAncGFnZXMvcGF5Y2FydCcsXG4gICAgICAncGFnZXMvcGF5YnV5JyxcbiAgICAgICdwYWdlcy9ydWxlcycsXG4gICAgICAncGFnZXMvdXNlcicsXG4gICAgICAncGFnZXMvY29sbGVjdCcsXG4gICAgICAncGFnZXMvbG9naXN0aWNhJyxcbiAgICAgICdwYWdlcy9vcmRlcicsXG4gICAgICAncGFnZXMvb3JkZXJEZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2ludm9pY2UnLFxuICAgICAgJ3BhZ2VzL2FwcGx5VmlwJyxcbiAgICAgICdwYWdlcy9zZXJ2aWNlJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZWMzZDNhJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNlYzNkM2EnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfliIbnsbsnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2FydCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2FydC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXJ0LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6LSt54mp6L2mJ1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXInLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL3VzZXItZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTGV2ZWw6IG51bGwsXG4gICAgdXNlckhhc2g6IG51bGwsXG4gICAgY29kZTogbnVsbCxcbiAgICBuaWNrTmFtZTogbnVsbCxcbiAgICB1c2VySW1hZ2U6IG51bGxcbiAgfVxuXG4gIG1pc3NUb2tlbiA9IGZhbHNlXG4gIGdldFRva2VuVGltZSA9IDBcbiAgaHR0cElkID0gW11cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcbiAgICAgIGNvbmZpZyAocCkge1xuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MgKHApIHtcbiAgICAgICAgaWYgKHAuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IC0xICYmIHAuZGF0YS5tc2cgPT09ICdtaXNzIHRva2VuJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21pc3MgdG9rZW4nKVxuICAgICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUrK1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW5UaW1lIDwgMykge1xuICAgICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAtMikge1xuICAgICAgICAgICAgdGhpcy5zaG93RmFpbChwLmRhdGEubXNnKVxuICAgICAgICAgIH0gZWxzZSBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB0aGlzLnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSAocCkge1xuICAgICAgICAvLyDorrDlvZVyZXF1ZXN0IGluZm9cbiAgICAgICAgaWYgKHAuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgaWYgKHAuZGF0YS5odHRwSWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmh0dHBJZC5sZW5ndGggPCAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5wdXNoKHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5zaGlmdCgpXG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnB1c2gocC5kYXRhLmh0dHBJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8g5Yik5patdGFiYmFy5Zue6YCA6aG16Z2iXG4gIHBhZ2VSb290ID0gZmFsc2VcblxuICBvbkxhdW5jaCgpIHt9XG5cbiAgZ2V0TG9naW4gKGNiKSB7XG4gICAgd2VweS5sb2dpbih7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IocmVzLmNvZGUpXG4gICAgICAgIC8vIOWPkemAgWNvZGVcbiAgICAgIH0sXG4gICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+e9kee7nOi/nuaOpeWksei0pScsXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZ2V0VXNlckluZm8oZSwgY29kZSwgcmVmcmVuY2VDb2RlLCBjYikge1xuICAgIC8vIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgY29uc29sZS5sb2coZSwgY29kZSwgcmVmcmVuY2VDb2RlKVxuICAgIHZhciBkYXRhID0ge1xuICAgICAganNjb2RlOiBjb2RlLFxuICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgIGl2OiBlLmRldGFpbC5pdixcbiAgICAgIHJlZmVyZW5jZUlkOiByZWZyZW5jZUNvZGVcbiAgICB9XG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgICB0aGlzLkh0dHBSZXF1ZXN0LlNlbmRDb2RlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIHZhciBwaG9uZU51bWJlciA9IHJlcy5kYXRhLmRhdGEucGhvbmVcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncGhvbmUnLCBwaG9uZU51bWJlcilcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAvLyB2YXIgZGF0YSA9IHtcbiAgICAgICAgLy8gICBwaG9uZTogcGhvbmVOdW1iZXJcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB0aGlzLnJlcXVlc3RUb2tlbihkYXRhLCBjYilcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogJ+ivt+ajgOafpee9kee7nOi/nuaOpScsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgLy8g5bey5pyJ5omL5py65Y+36I635Y+WdG9rZW5cbiAgYXN5bmMgcmVxdWVzdFRva2VuIChkYXRhLCBjYiwgZmFpbCkge1xuICAgIGF3YWl0IHRoaXMuSHR0cFJlcXVlc3QuVXNlckxvZ2luKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICAgICAgdmFyIHRpbWVPdXQgPSByZXMuZGF0YS5kYXRhLnRpbWVPdXRcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCB0b2tlbilcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndGltZW91dCcsIHRpbWVPdXQpXG4gICAgICAgIC8vIOiuvue9rmdsb2JhbOeahHVzZXIgbGV2ZWwg5ZKMIGhhc2hcbiAgICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4sICgpID0+IHtcbiAgICAgICAgICBjYiAmJiBjYih0b2tlbilcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfXG4gIHJlZnJlc2hUb2tlbiAoKSB7XG4gICAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ8g5aaC5p6c5rKh6L+H5pyf55u05o6l6L+U5ZuedG9rZW7lgLxcbiAgICB2YXIgbm93VGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKVxuICAgIHZhciB0aW1lT3V0ID0gd2VweS5nZXRTdG9yYWdlU3luYygndGltZW91dCcpXG4gICAgaWYgKG5vd1RpbWUgPiB0aW1lT3V0KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICAvLyDov5Tlm57lvZPliY10b2tlblxuICBnZXRUb2tlbiAoZXJyb3IsIHJlZnJlbmNlKSB7XG4gICAgdmFyIHJlZnJlbmNlQ29kZSA9ICcnXG4gICAgaWYgKHJlZnJlbmNlKSB7XG4gICAgICByZWZyZW5jZUNvZGUgPSByZWZyZW5jZVxuICAgIH1cbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSA9PT0gJycpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4vbG9naW4/cmVmcmVuY2VDb2RlPScgKyByZWZyZW5jZUNvZGVcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5yZWZyZXNoVG9rZW4oKSB8fCBlcnJvciA9PT0gLTEpIHtcbiAgICAgICAgLy8gdG9rZW7ov4fmnJ8g6YeN5paw5Y+R6YCB6K+35rGC6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgcGhvbmU6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhKVxuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDojrflj5YgdXNlciBsZXZlbCDlkowgaGFzaFxuICBnZXRVc2VyTGV2ZWwgKHRva2VuLCBjYikge1xuICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICB0aGlzLkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCA9IHJlcy5kYXRhLmRhdGEuaGFzaFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnZpcEVuZCA9IHJlcy5kYXRhLmRhdGEudmlwRW5kXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEucmVkdWN0aW9uID0gcmVzLmRhdGEuZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5tZW1iZXJJZCA9IHJlcy5kYXRhLmRhdGEubWVtYmVySWRcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5pat5b2T5YmNdXNlciBoYXNo5piv5ZCm6ZyA6KaB6YeN572uXG4gIHJlc2V0VXNlckxldmVsIChoYXNoLCB0b2tlbikge1xuICAgIGlmIChoYXNoICE9PSB0aGlzLmdsb2JhbERhdGEudXNlckhhc2gpIHtcbiAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuKVxuICAgIH1cbiAgfVxuICAvLyDlrZjnlKjmiLdnbG9iYWzkv6Hmga9cbiAgZ2V0VXNlciAoY2IpIHtcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2xvYmFsRGF0YSlcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgc2hvd0xvYWRpbmcgKCkge1xuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgfSlcbiAgfVxuICBoaWRlTG9hZGluZyAoKSB7XG4gICAgd2VweS5oaWRlTG9hZGluZygpXG4gIH1cbiAgc2hvd0ZhaWwgKGVycm9yKSB7XG4gICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgdGl0bGU6IGVycm9yIHx8ICfliqDovb3lpLHotKUnLFxuICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgIH0pXG4gIH1cbiAgcGF5RmFpbCAoKSB7XG4gICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgY29udGVudDogJ+aUr+S7mOWksei0pScsXG4gICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZGlzYWJsZUFwaSAoKSB7XG4gICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgY29udGVudDogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleS9v+eUqOivpeWKn+iDve+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcbiAgICB9KVxuICB9XG4gIC8vIOaXtumXtOaIs+agvOW8j+WMllxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICAvLyDov4fmu6RlbW9qaVxuICBmaWx0ZXJlbW9qaSAoc3RyKSB7XG4gICAgdmFyIHJhbmdlcyA9IFtcbiAgICAgICdcXHVkODNjW1xcdWRmMDAtXFx1ZGZmZl0nLFxuICAgICAgJ1xcdWQ4M2RbXFx1ZGMwMC1cXHVkZTRmXScsXG4gICAgICAnXFx1ZDgzZFtcXHVkZTgwLVxcdWRlZmZdJ1xuICAgIF1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChyYW5nZXMuam9pbignfCcpLCAnZycpLCAnJylcbiAgfVxuICAvLyDlrqLmnI3mtojmga9cbiAgZ2V0VXNlck5hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlcmVtb2ppKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mby5uaWNrTmFtZSlcbiAgfVxuICBnZXRVc2VyQXZhdGFyICgpIHtcbiAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvLmF2YXRhclVybFxuICB9XG4gIGdldE1lc3NhZ2UgKHBhZ2VEZXRhaWwsIHRhZ3MpIHtcbiAgICB2YXIgbWVzc2FnZU9iaiA9IHtcbiAgICAgICdsZXZlbCc6ICcnLFxuICAgICAgJ2NlbGxwaG9uZXMnOiAnJ1xuICAgIH1cbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgbWVzc2FnZU9iai5sZXZlbCA9ICdub3JtYWwnXG4gICAgfSBlbHNlIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICBtZXNzYWdlT2JqLmxldmVsID0gJ3ZpcCdcbiAgICB9XG4gICAgbWVzc2FnZU9iai5jZWxscGhvbmVzID0gW1snJywgd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKV1dXG4gICAgLy8gbWVzc2FnZU9iai5kZXNjcmlwdGlvbiA9IHBhZ2VEZXRhaWxcbiAgICAvLyBtZXNzYWdlT2JqLnRhZ3MgPSBwYWdlRGV0YWlsICsgJywnICsgdGFnc1xuICAgIC8vIG1lc3NhZ2VPYmouY3VzdG9tX2ZpZWxkcyA9IHtcbiAgICAvLyAgICdUZXh0RmllbGRfMTMwMTAnOiAndGVzdCdcbiAgICAvLyB9XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobWVzc2FnZU9iaikpXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VPYmopXG4gIH1cbiAgZ2V0QnVzaW5lc3MgKHRpdGxlLCBjb250ZW50LCBvcmRlcklkKSB7XG4gICAgdmFyIG5vdGVPYmogPSB7XG4gICAgICAndGl0bGUnOiB0aXRsZSxcbiAgICAgICdjdXN0b21fZmllbGRzJzoge1xuICAgICAgICAnVGV4dEZpZWxkXzI4MjI3JzogY29udGVudCxcbiAgICAgICAgJ1RleHRGaWVsZF8yODIzMyc6IG9yZGVySWRcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobm90ZU9iaikpXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5vdGVPYmopXG4gIH1cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxuICBNZDUgPSBNZDUuaGV4TUQ1XG59XG4iXX0=