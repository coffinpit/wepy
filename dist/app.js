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
      pages: ['pages/login', 'pages/start', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/editAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order', 'pages/orderDetail', 'pages/invoice', 'pages/applyVip', 'pages/service', 'pages/link'],
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
      return JSON.stringify(noteObj);
    }

    // base64 编码

  }, {
    key: 'base64Encode',
    value: function base64Encode(str) {
      var c1 = '';
      var c2 = '';
      var c3 = '';
      var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var i = 0;
      var len = str.length;
      var strin = '';
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
          strin += base64EncodeChars.charAt(c1 >> 2);
          strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
          strin += '==';
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i === len) {
          strin += base64EncodeChars.charAt(c1 >> 2);
          strin += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
          strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
          strin += '=';
          break;
        }
        c3 = str.charCodeAt(i++);
        strin += base64EncodeChars.charAt(c1 >> 2);
        strin += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
        strin += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
        strin += base64EncodeChars.charAt(c3 & 0x3F);
      }
      return strin;
    }

    // base64 解码

  }, {
    key: 'base64Decode',
    value: function base64Decode(input) {
      var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = '';
      var chr1 = '';
      var chr2 = '';
      var chr3 = '';
      var enc1 = '';
      var enc2 = '';
      var enc3 = '';
      var enc4 = '';
      var i = 0;
      input = input.replace(/[^A-Za-z0-9+/=]/g, '');
      while (i < input.length) {
        enc1 = base64EncodeChars.indexOf(input.charAt(i++));
        enc2 = base64EncodeChars.indexOf(input.charAt(i++));
        enc3 = base64EncodeChars.indexOf(input.charAt(i++));
        enc4 = base64EncodeChars.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      return this.utf8Decode(output);
    }

    // utf8

  }, {
    key: 'utf8Decode',
    value: function utf8Decode(utftext) {
      var string = '';
      var i = 0;
      var c = 0;
      var c1 = 0;
      var c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          c1 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode((c & 31) << 6 | c1 & 63);
          i += 2;
        } else {
          c1 = utftext.charCodeAt(i + 1);
          c2 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode((c & 15) << 12 | (c1 & 63) << 6 | c2 & 63);
          i += 3;
        }
      }
      return string;
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwicGFnZVJvb3QiLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsImRhdGEiLCJlcnJvciIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzaG93RmFpbCIsImZhaWwiLCJjb21wbGV0ZSIsImxlbmd0aCIsInB1c2giLCJzaGlmdCIsImNiIiwibG9naW4iLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImUiLCJyZWZyZW5jZUNvZGUiLCJqc2NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJyZWZlcmVuY2VJZCIsIlNlbmRDb2RlIiwidGhlbiIsInBob25lTnVtYmVyIiwicGhvbmUiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJVc2VyTG9naW4iLCJ0b2tlbiIsInRpbWVPdXQiLCJnZXRVc2VyTGV2ZWwiLCJub3dUaW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRTdG9yYWdlU3luYyIsInJlZnJlbmNlIiwibmF2aWdhdGVUbyIsInVybCIsInJlZnJlc2hUb2tlbiIsInJlcXVlc3RUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJsZXZlbCIsImhhc2giLCJ2aXBFbmQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJJZCIsImdldFVzZXJJbmZvIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwidGltZXN0YW1wIiwiZm9ybWF0cyIsInplcm8iLCJ2YWx1ZSIsIm15RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwicyIsInN0ciIsInJhbmdlcyIsIlJlZ0V4cCIsImpvaW4iLCJmaWx0ZXJlbW9qaSIsImF2YXRhclVybCIsInBhZ2VEZXRhaWwiLCJ0YWdzIiwibWVzc2FnZU9iaiIsImNlbGxwaG9uZXMiLCJKU09OIiwic3RyaW5naWZ5Iiwib3JkZXJJZCIsIm5vdGVPYmoiLCJjMSIsImMyIiwiYzMiLCJiYXNlNjRFbmNvZGVDaGFycyIsImxlbiIsInN0cmluIiwiY2hhckNvZGVBdCIsImNoYXJBdCIsImlucHV0Iiwib3V0cHV0IiwiY2hyMSIsImNocjIiLCJjaHIzIiwiZW5jMSIsImVuYzIiLCJlbmMzIiwiZW5jNCIsImluZGV4T2YiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1dGY4RGVjb2RlIiwidXRmdGV4dCIsInN0cmluZyIsImMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBS0E7Ozs7Ozs7Ozs7Ozs7O0FBSEE7QUFDQTs7QUFHQSxJQUFJQSxNQUFNQyxRQUFRLGVBQVIsQ0FBVjs7QUFFQTtBQUNBOzs7OztBQTZFRSxzQkFBZTtBQUFBOztBQUFBOztB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TDtBQUNEO0FBQ0Y7QUFDRCxhQUFPc0MsTUFBUDtBQUNEOzs7O0VBOWMwQixlQUFLRSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuLy8gaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuLy8gaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG52YXIgTWQ1ID0gcmVxdWlyZSgnLi9zZXJ2aWNlL21kNScpXG5cbi8vIGNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuLy8gc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2NhcnQnLFxuICAgICAgJ3BhZ2VzL3N5c3RlbScsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvbmV3QWRkJyxcbiAgICAgICdwYWdlcy9lZGl0QWRkJyxcbiAgICAgICdwYWdlcy9wYXljYXJ0JyxcbiAgICAgICdwYWdlcy9wYXlidXknLFxuICAgICAgJ3BhZ2VzL3J1bGVzJyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jb2xsZWN0JyxcbiAgICAgICdwYWdlcy9sb2dpc3RpY2EnLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9vcmRlckRldGFpbCcsXG4gICAgICAncGFnZXMvaW52b2ljZScsXG4gICAgICAncGFnZXMvYXBwbHlWaXAnLFxuICAgICAgJ3BhZ2VzL3NlcnZpY2UnLFxuICAgICAgJ3BhZ2VzL2xpbmsnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNlYzNkM2EnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2VjM2QzYScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHVzZXJMZXZlbDogbnVsbCxcbiAgICB1c2VySGFzaDogbnVsbCxcbiAgICBjb2RlOiBudWxsLFxuICAgIG5pY2tOYW1lOiBudWxsLFxuICAgIHVzZXJJbWFnZTogbnVsbFxuICB9XG5cbiAgbWlzc1Rva2VuID0gZmFsc2VcbiAgZ2V0VG9rZW5UaW1lID0gMFxuICBodHRwSWQgPSBbXVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTEgJiYgcC5kYXRhLm1zZyA9PT0gJ21pc3MgdG9rZW4nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWlzcyB0b2tlbicpXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSsrXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IC0yKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsKHAuZGF0YS5tc2cpXG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgZmFpbCAocCkge1xuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlIChwKSB7XG4gICAgICAgIC8vIOiusOW9lXJlcXVlc3QgaW5mb1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmh0dHBJZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaHR0cElkLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnB1c2gocC5kYXRhLmh0dHBJZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnNoaWZ0KClcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQucHVzaChwLmRhdGEuaHR0cElkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyDliKTmlq10YWJiYXLlm57pgIDpobXpnaJcbiAgcGFnZVJvb3QgPSBmYWxzZVxuXG4gIG9uTGF1bmNoKCkge31cblxuICBnZXRMb2dpbiAoY2IpIHtcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYihyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBY29kZVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn572R57uc6L+e5o6l5aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRVc2VySW5mbyhlLCBjb2RlLCByZWZyZW5jZUNvZGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlLCBjb2RlLCByZWZyZW5jZUNvZGUpXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBqc2NvZGU6IGNvZGUsXG4gICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgaXY6IGUuZGV0YWlsLml2LFxuICAgICAgcmVmZXJlbmNlSWQ6IHJlZnJlbmNlQ29kZVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2VuZENvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gcmVzLmRhdGEuZGF0YS5waG9uZVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwaG9uZScsIHBob25lTnVtYmVyKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIC8vIHZhciBkYXRhID0ge1xuICAgICAgICAvLyAgIHBob25lOiBwaG9uZU51bWJlclxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHRoaXMucmVxdWVzdFRva2VuKGRhdGEsIGNiKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6lJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICAvLyDlt7LmnInmiYvmnLrlj7fojrflj5Z0b2tlblxuICBhc3luYyByZXF1ZXN0VG9rZW4gKGRhdGEsIGNiLCBmYWlsKSB7XG4gICAgYXdhaXQgdGhpcy5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICB2YXIgdGltZU91dCA9IHJlcy5kYXRhLmRhdGEudGltZU91dFxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JywgdGltZU91dClcbiAgICAgICAgLy8g6K6+572uZ2xvYmFs55qEdXNlciBsZXZlbCDlkowgaGFzaFxuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbiwgKCkgPT4ge1xuICAgICAgICAgIGNiICYmIGNiKHRva2VuKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBmYWlsICYmIGZhaWwoKVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ9cbiAgcmVmcmVzaFRva2VuICgpIHtcbiAgICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acnyDlpoLmnpzmsqHov4fmnJ/nm7TmjqXov5Tlm550b2tlbuWAvFxuICAgIHZhciBub3dUaW1lID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApXG4gICAgdmFyIHRpbWVPdXQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JylcbiAgICBpZiAobm93VGltZSA+IHRpbWVPdXQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8vIOi/lOWbnuW9k+WJjXRva2VuXG4gIGdldFRva2VuIChlcnJvciwgcmVmcmVuY2UpIHtcbiAgICB2YXIgcmVmcmVuY2VDb2RlID0gJydcbiAgICBpZiAocmVmcmVuY2UpIHtcbiAgICAgIHJlZnJlbmNlQ29kZSA9IHJlZnJlbmNlXG4gICAgfVxuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpID09PSAnJykge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi9sb2dpbj9yZWZyZW5jZUNvZGU9JyArIHJlZnJlbmNlQ29kZVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnJlZnJlc2hUb2tlbigpIHx8IGVycm9yID09PSAtMSkge1xuICAgICAgICAvLyB0b2tlbui/h+acnyDph43mlrDlj5HpgIHor7fmsYLojrflj5bmlrDnmoR0b2tlblxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdFRva2VuKGRhdGEpXG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOiOt+WPliB1c2VyIGxldmVsIOWSjCBoYXNoXG4gIGdldFVzZXJMZXZlbCAodG9rZW4sIGNiKSB7XG4gICAgdmFyIF90aGlzID0gdGhpc1xuICAgIHRoaXMuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oe3Rva2VuOiB0b2tlbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckxldmVsID0gcmVzLmRhdGEuZGF0YS5sZXZlbFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoID0gcmVzLmRhdGEuZGF0YS5oYXNoXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudmlwRW5kID0gcmVzLmRhdGEuZGF0YS52aXBFbmRcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5yZWR1Y3Rpb24gPSByZXMuZGF0YS5kYXRhLnJlZHVjdGlvblxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLm1lbWJlcklkID0gcmVzLmRhdGEuZGF0YS5tZW1iZXJJZFxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICAvLyDliKTmlq3lvZPliY11c2VyIGhhc2jmmK/lkKbpnIDopoHph43nva5cbiAgcmVzZXRVc2VyTGV2ZWwgKGhhc2gsIHRva2VuKSB7XG4gICAgaWYgKGhhc2ggIT09IHRoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCkge1xuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4pXG4gICAgfVxuICB9XG4gIC8vIOWtmOeUqOaIt2dsb2JhbOS/oeaBr1xuICBnZXRVc2VyIChjYikge1xuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5nbG9iYWxEYXRhKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBzaG93TG9hZGluZyAoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICBpY29uOiAnbG9hZGluZydcbiAgICB9KVxuICB9XG4gIGhpZGVMb2FkaW5nICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgfVxuICBzaG93RmFpbCAoZXJyb3IpIHtcbiAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogZXJyb3IgfHwgJ+WKoOi9veWksei0pScsXG4gICAgICBpY29uOiAnbm9uZScsXG4gICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgfSlcbiAgfVxuICBwYXlGYWlsICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5pSv5LuY5aSx6LSlJyxcbiAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBkaXNhYmxlQXBpICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So6K+l5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgIH0pXG4gIH1cbiAgLy8g5pe26Ze05oiz5qC85byP5YyWXG4gIGRhdGVGb3JtYXQgKHRpbWVzdGFtcCwgZm9ybWF0cykge1xuICAgIGZvcm1hdHMgPSBmb3JtYXRzIHx8ICdZLW0tZCdcbiAgICB2YXIgemVybyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlIDwgMTApIHtcbiAgICAgICAgcmV0dXJuICcwJyArIHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgdmFyIG15RGF0ZSA9IHRpbWVzdGFtcCA/IG5ldyBEYXRlKHRpbWVzdGFtcCkgOiBuZXcgRGF0ZSgpXG4gICAgdmFyIHllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHZhciBtb250aCA9IHplcm8obXlEYXRlLmdldE1vbnRoKCkgKyAxKVxuICAgIHZhciBkYXkgPSB6ZXJvKG15RGF0ZS5nZXREYXRlKCkpXG4gICAgdmFyIGhvdXIgPSB6ZXJvKG15RGF0ZS5nZXRIb3VycygpKVxuICAgIHZhciBtaW5pdGUgPSB6ZXJvKG15RGF0ZS5nZXRNaW51dGVzKCkpXG4gICAgdmFyIHNlY29uZCA9IHplcm8obXlEYXRlLmdldFNlY29uZHMoKSlcbiAgICByZXR1cm4gZm9ybWF0cy5yZXBsYWNlKC9ZfG18ZHxIfGl8cy9pZywgZnVuY3Rpb24gKG1hdGNoZXMpIHtcbiAgICAgIHJldHVybiAoe1xuICAgICAgICBZOiB5ZWFyLFxuICAgICAgICBtOiBtb250aCxcbiAgICAgICAgZDogZGF5LFxuICAgICAgICBIOiBob3VyLFxuICAgICAgICBpOiBtaW5pdGUsXG4gICAgICAgIHM6IHNlY29uZFxuICAgICAgfSlbbWF0Y2hlc11cbiAgICB9KVxuICB9XG4gIC8vIOi/h+a7pGVtb2ppXG4gIGZpbHRlcmVtb2ppIChzdHIpIHtcbiAgICB2YXIgcmFuZ2VzID0gW1xuICAgICAgJ1xcdWQ4M2NbXFx1ZGYwMC1cXHVkZmZmXScsXG4gICAgICAnXFx1ZDgzZFtcXHVkYzAwLVxcdWRlNGZdJyxcbiAgICAgICdcXHVkODNkW1xcdWRlODAtXFx1ZGVmZl0nXG4gICAgXVxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHJhbmdlcy5qb2luKCd8JyksICdnJyksICcnKVxuICB9XG4gIC8vIOWuouacjea2iOaBr1xuICBnZXRVc2VyTmFtZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyZW1vamkodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvLm5pY2tOYW1lKVxuICB9XG4gIGdldFVzZXJBdmF0YXIgKCkge1xuICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm8uYXZhdGFyVXJsXG4gIH1cbiAgZ2V0TWVzc2FnZSAocGFnZURldGFpbCwgdGFncykge1xuICAgIHZhciBtZXNzYWdlT2JqID0ge1xuICAgICAgJ2xldmVsJzogJycsXG4gICAgICAnY2VsbHBob25lcyc6ICcnXG4gICAgfVxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICBtZXNzYWdlT2JqLmxldmVsID0gJ25vcm1hbCdcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIG1lc3NhZ2VPYmoubGV2ZWwgPSAndmlwJ1xuICAgIH1cbiAgICBtZXNzYWdlT2JqLmNlbGxwaG9uZXMgPSBbWycnLCB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXV1cbiAgICAvLyBtZXNzYWdlT2JqLmRlc2NyaXB0aW9uID0gcGFnZURldGFpbFxuICAgIC8vIG1lc3NhZ2VPYmoudGFncyA9IHBhZ2VEZXRhaWwgKyAnLCcgKyB0YWdzXG4gICAgLy8gbWVzc2FnZU9iai5jdXN0b21fZmllbGRzID0ge1xuICAgIC8vICAgJ1RleHRGaWVsZF8xMzAxMCc6ICd0ZXN0J1xuICAgIC8vIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWVzc2FnZU9iailcbiAgfVxuICBnZXRCdXNpbmVzcyAodGl0bGUsIGNvbnRlbnQsIG9yZGVySWQpIHtcbiAgICB2YXIgbm90ZU9iaiA9IHtcbiAgICAgICd0aXRsZSc6IHRpdGxlLFxuICAgICAgJ2N1c3RvbV9maWVsZHMnOiB7XG4gICAgICAgICdUZXh0RmllbGRfMjgyMjcnOiBjb250ZW50LFxuICAgICAgICAnVGV4dEZpZWxkXzI4MjMzJzogb3JkZXJJZFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobm90ZU9iailcbiAgfVxuXG4gIC8vIGJhc2U2NCDnvJbnoIFcbiAgYmFzZTY0RW5jb2RlIChzdHIpIHtcbiAgICB2YXIgYzEgPSAnJ1xuICAgIHZhciBjMiA9ICcnXG4gICAgdmFyIGMzID0gJydcbiAgICB2YXIgYmFzZTY0RW5jb2RlQ2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXG4gICAgdmFyIGkgPSAwXG4gICAgdmFyIGxlbiA9IHN0ci5sZW5ndGhcbiAgICB2YXIgc3RyaW4gPSAnJ1xuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjMSA9IHN0ci5jaGFyQ29kZUF0KGkrKykgJiAweGZmXG4gICAgICBpZiAoaSA9PT0gbGVuKSB7XG4gICAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMSA+PiAyKVxuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKGMxICYgMHgzKSA8PCA0KVxuICAgICAgICBzdHJpbiArPSAnPT0nXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjMiA9IHN0ci5jaGFyQ29kZUF0KGkrKylcbiAgICAgIGlmIChpID09PSBsZW4pIHtcbiAgICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMxID4+IDIpXG4gICAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoKGMxICYgMHgzKSA8PCA0KSB8ICgoYzIgJiAweEYwKSA+PiA0KSlcbiAgICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KChjMiAmIDB4RikgPDwgMilcbiAgICAgICAgc3RyaW4gKz0gJz0nXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjMyA9IHN0ci5jaGFyQ29kZUF0KGkrKylcbiAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMSA+PiAyKVxuICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KCgoYzEgJiAweDMpIDw8IDQpIHwgKChjMiAmIDB4RjApID4+IDQpKVxuICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KCgoYzIgJiAweEYpIDw8IDIpIHwgKChjMyAmIDB4QzApID4+IDYpKVxuICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMzICYgMHgzRilcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluXG4gIH1cblxuICAvLyBiYXNlNjQg6Kej56CBXG4gIGJhc2U2NERlY29kZSAoaW5wdXQpIHtcbiAgICB2YXIgYmFzZTY0RW5jb2RlQ2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXG4gICAgdmFyIG91dHB1dCA9ICcnXG4gICAgdmFyIGNocjEgPSAnJ1xuICAgIHZhciBjaHIyID0gJydcbiAgICB2YXIgY2hyMyA9ICcnXG4gICAgdmFyIGVuYzEgPSAnJ1xuICAgIHZhciBlbmMyID0gJydcbiAgICB2YXIgZW5jMyA9ICcnXG4gICAgdmFyIGVuYzQgPSAnJ1xuICAgIHZhciBpID0gMFxuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTkrLz1dL2csICcnKVxuICAgIHdoaWxlIChpIDwgaW5wdXQubGVuZ3RoKSB7XG4gICAgICBlbmMxID0gYmFzZTY0RW5jb2RlQ2hhcnMuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgIGVuYzIgPSBiYXNlNjRFbmNvZGVDaGFycy5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKVxuICAgICAgZW5jMyA9IGJhc2U2NEVuY29kZUNoYXJzLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpXG4gICAgICBlbmM0ID0gYmFzZTY0RW5jb2RlQ2hhcnMuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgIGNocjEgPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpXG4gICAgICBjaHIyID0gKChlbmMyICYgMTUpIDw8IDQpIHwgKGVuYzMgPj4gMilcbiAgICAgIGNocjMgPSAoKGVuYzMgJiAzKSA8PCA2KSB8IGVuYzRcbiAgICAgIG91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMSlcbiAgICAgIGlmIChlbmMzICE9PSA2NCkge1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjIpXG4gICAgICB9XG4gICAgICBpZiAoZW5jNCAhPT0gNjQpIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIzKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy51dGY4RGVjb2RlKG91dHB1dClcbiAgfVxuXG4gIC8vIHV0ZjhcbiAgdXRmOERlY29kZSAodXRmdGV4dCkge1xuICAgIHZhciBzdHJpbmcgPSAnJ1xuICAgIGxldCBpID0gMFxuICAgIGxldCBjID0gMFxuICAgIGxldCBjMSA9IDBcbiAgICBsZXQgYzIgPSAwXG4gICAgd2hpbGUgKGkgPCB1dGZ0ZXh0Lmxlbmd0aCkge1xuICAgICAgYyA9IHV0ZnRleHQuY2hhckNvZGVBdChpKVxuICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYylcbiAgICAgICAgaSsrXG4gICAgICB9IGVsc2UgaWYgKChjID4gMTkxKSAmJiAoYyA8IDIyNCkpIHtcbiAgICAgICAgYzEgPSB1dGZ0ZXh0LmNoYXJDb2RlQXQoaSArIDEpXG4gICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDMxKSA8PCA2KSB8IChjMSAmIDYzKSlcbiAgICAgICAgaSArPSAyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjMSA9IHV0ZnRleHQuY2hhckNvZGVBdChpICsgMSlcbiAgICAgICAgYzIgPSB1dGZ0ZXh0LmNoYXJDb2RlQXQoaSArIDIpXG4gICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDE1KSA8PCAxMikgfCAoKGMxICYgNjMpIDw8IDYpIHwgKGMyICYgNjMpKVxuICAgICAgICBpICs9IDNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZ1xuICB9XG4gIEh0dHBSZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KClcbiAgTWQ1ID0gTWQ1LmhleE1ENVxufVxuIl19