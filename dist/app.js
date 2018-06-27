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
          } else if (p.data.error && p.data.error === -1 && p.data.msg === 'member locked') {
            this.hideLoading();
            _wepy2.default.clearStorage();
            _wepy2.default.showModal({
              title: '提示',
              content: '当前账号已被锁定',
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {
                  _wepy2.default.redirectTo({
                    url: './login'
                  });
                }
              }
            });
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
          _this.globalData.reduction = res.data.data.reduction;
          cb && cb();
        }
      });
    }
    // 判断当前user hash是否需要重置

  }, {
    key: 'resetUserLevel',
    value: function resetUserLevel(hash, token, cb) {
      if (hash !== this.globalData.userHash) {
        this.getUserLevel(token, cb);
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
    // 发送用户昵称

  }, {
    key: 'sendNickname',
    value: function sendNickname(token, name) {
      var data = {
        token: token,
        nickName: this.base64Encode(name)
      };
      console.log(data);
      this.HttpRequest.SetNickname(data).then(function (res) {
        console.log(res);
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
              url: './order?orderType=unpaid'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwicGFnZVJvb3QiLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsImRhdGEiLCJlcnJvciIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzaG93RmFpbCIsImhpZGVMb2FkaW5nIiwiY2xlYXJTdG9yYWdlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInJlcyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwidXJsIiwiZmFpbCIsImNvbXBsZXRlIiwibGVuZ3RoIiwicHVzaCIsInNoaWZ0IiwiY2IiLCJsb2dpbiIsInNob3dUb2FzdCIsImljb24iLCJpbWFnZSIsImUiLCJyZWZyZW5jZUNvZGUiLCJqc2NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJyZWZlcmVuY2VJZCIsIlNlbmRDb2RlIiwidGhlbiIsInBob25lTnVtYmVyIiwicGhvbmUiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwiVXNlckxvZ2luIiwidG9rZW4iLCJ0aW1lT3V0IiwiZ2V0VXNlckxldmVsIiwibm93VGltZSIsIk1hdGgiLCJmbG9vciIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZWZyZW5jZSIsIm5hdmlnYXRlVG8iLCJyZWZyZXNoVG9rZW4iLCJyZXF1ZXN0VG9rZW4iLCJfdGhpcyIsIkdldFVzZXJJbmZvIiwibGV2ZWwiLCJoYXNoIiwidmlwRW5kIiwicmVkdWN0aW9uIiwibWVtYmVySWQiLCJnZXRVc2VySW5mbyIsIm5hbWUiLCJiYXNlNjRFbmNvZGUiLCJTZXROaWNrbmFtZSIsInNob3dMb2FkaW5nIiwidGltZXN0YW1wIiwiZm9ybWF0cyIsInplcm8iLCJ2YWx1ZSIsIm15RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwicyIsInN0ciIsInJhbmdlcyIsIlJlZ0V4cCIsImpvaW4iLCJmaWx0ZXJlbW9qaSIsImF2YXRhclVybCIsInBhZ2VEZXRhaWwiLCJ0YWdzIiwibWVzc2FnZU9iaiIsImNlbGxwaG9uZXMiLCJKU09OIiwic3RyaW5naWZ5Iiwib3JkZXJJZCIsIm5vdGVPYmoiLCJjMSIsImMyIiwiYzMiLCJiYXNlNjRFbmNvZGVDaGFycyIsImxlbiIsInN0cmluIiwiY2hhckNvZGVBdCIsImNoYXJBdCIsImlucHV0Iiwib3V0cHV0IiwiY2hyMSIsImNocjIiLCJjaHIzIiwiZW5jMSIsImVuYzIiLCJlbmMzIiwiZW5jNCIsImluZGV4T2YiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1dGY4RGVjb2RlIiwidXRmdGV4dCIsInN0cmluZyIsImMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBS0E7Ozs7Ozs7Ozs7Ozs7O0FBSEE7QUFDQTs7QUFHQSxJQUFJQSxNQUFNQyxRQUFR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cm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG4vLyBpbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG4vLyBpbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdCdcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuLy8gY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG4vLyBzZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvc3lzdGVtJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9uZXdBZGQnLFxuICAgICAgJ3BhZ2VzL2VkaXRBZGQnLFxuICAgICAgJ3BhZ2VzL3BheWNhcnQnLFxuICAgICAgJ3BhZ2VzL3BheWJ1eScsXG4gICAgICAncGFnZXMvcnVsZXMnLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL2NvbGxlY3QnLFxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljYScsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL29yZGVyRGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbnZvaWNlJyxcbiAgICAgICdwYWdlcy9hcHBseVZpcCcsXG4gICAgICAncGFnZXMvc2VydmljZScsXG4gICAgICAncGFnZXMvbGluaydcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2VjM2QzYScsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgY29sb3I6ICcjMjgyNjI2JyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZWMzZDNhJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvaW5kZXgtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfpppbpobUnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5YiG57G7J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhcnQnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhcnQtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2FydC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9pidcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS91c2VyLWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL3VzZXItYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgdXNlckxldmVsOiBudWxsLFxuICAgIHVzZXJIYXNoOiBudWxsLFxuICAgIGNvZGU6IG51bGwsXG4gICAgbmlja05hbWU6IG51bGwsXG4gICAgdXNlckltYWdlOiBudWxsXG4gIH1cblxuICBtaXNzVG9rZW4gPSBmYWxzZVxuICBnZXRUb2tlblRpbWUgPSAwXG4gIGh0dHBJZCA9IFtdXG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG4gICAgICBjb25maWcgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAtMSAmJiBwLmRhdGEubXNnID09PSAnbWlzcyB0b2tlbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtaXNzIHRva2VuJylcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lKytcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFRva2VuVGltZSA8IDMpIHtcbiAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTEgJiYgcC5kYXRhLm1zZyA9PT0gJ21lbWJlciBsb2NrZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlKClcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN6LSm5Y+35bey6KKr6ZSB5a6aJyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy4vbG9naW4nXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IC0yKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsKHAuZGF0YS5tc2cpXG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgZmFpbCAocCkge1xuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlIChwKSB7XG4gICAgICAgIC8vIOiusOW9lXJlcXVlc3QgaW5mb1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmh0dHBJZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaHR0cElkLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnB1c2gocC5kYXRhLmh0dHBJZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnNoaWZ0KClcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQucHVzaChwLmRhdGEuaHR0cElkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyDliKTmlq10YWJiYXLlm57pgIDpobXpnaJcbiAgcGFnZVJvb3QgPSBmYWxzZVxuXG4gIG9uTGF1bmNoKCkge31cblxuICBnZXRMb2dpbiAoY2IpIHtcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYihyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBY29kZVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn572R57uc6L+e5o6l5aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRVc2VySW5mbyhlLCBjb2RlLCByZWZyZW5jZUNvZGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlLCBjb2RlLCByZWZyZW5jZUNvZGUpXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBqc2NvZGU6IGNvZGUsXG4gICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgaXY6IGUuZGV0YWlsLml2LFxuICAgICAgcmVmZXJlbmNlSWQ6IHJlZnJlbmNlQ29kZVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2VuZENvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gcmVzLmRhdGEuZGF0YS5waG9uZVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwaG9uZScsIHBob25lTnVtYmVyKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIC8vIHZhciBkYXRhID0ge1xuICAgICAgICAvLyAgIHBob25lOiBwaG9uZU51bWJlclxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHRoaXMucmVxdWVzdFRva2VuKGRhdGEsIGNiKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6lJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICAvLyDlt7LmnInmiYvmnLrlj7fojrflj5Z0b2tlblxuICBhc3luYyByZXF1ZXN0VG9rZW4gKGRhdGEsIGNiLCBmYWlsKSB7XG4gICAgYXdhaXQgdGhpcy5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICB2YXIgdGltZU91dCA9IHJlcy5kYXRhLmRhdGEudGltZU91dFxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JywgdGltZU91dClcbiAgICAgICAgLy8g6K6+572uZ2xvYmFs55qEdXNlciBsZXZlbCDlkowgaGFzaFxuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbiwgKCkgPT4ge1xuICAgICAgICAgIGNiICYmIGNiKHRva2VuKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBmYWlsICYmIGZhaWwoKVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ9cbiAgcmVmcmVzaFRva2VuICgpIHtcbiAgICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acnyDlpoLmnpzmsqHov4fmnJ/nm7TmjqXov5Tlm550b2tlbuWAvFxuICAgIHZhciBub3dUaW1lID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApXG4gICAgdmFyIHRpbWVPdXQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JylcbiAgICBpZiAobm93VGltZSA+IHRpbWVPdXQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8vIOi/lOWbnuW9k+WJjXRva2VuXG4gIGdldFRva2VuIChlcnJvciwgcmVmcmVuY2UpIHtcbiAgICB2YXIgcmVmcmVuY2VDb2RlID0gJydcbiAgICBpZiAocmVmcmVuY2UpIHtcbiAgICAgIHJlZnJlbmNlQ29kZSA9IHJlZnJlbmNlXG4gICAgfVxuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpID09PSAnJykge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi9sb2dpbj9yZWZyZW5jZUNvZGU9JyArIHJlZnJlbmNlQ29kZVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnJlZnJlc2hUb2tlbigpIHx8IGVycm9yID09PSAtMSkge1xuICAgICAgICAvLyB0b2tlbui/h+acnyDph43mlrDlj5HpgIHor7fmsYLojrflj5bmlrDnmoR0b2tlblxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdFRva2VuKGRhdGEpXG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOiOt+WPliB1c2VyIGxldmVsIOWSjCBoYXNoXG4gIGdldFVzZXJMZXZlbCAodG9rZW4sIGNiKSB7XG4gICAgdmFyIF90aGlzID0gdGhpc1xuICAgIHRoaXMuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oe3Rva2VuOiB0b2tlbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckxldmVsID0gcmVzLmRhdGEuZGF0YS5sZXZlbFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoID0gcmVzLmRhdGEuZGF0YS5oYXNoXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudmlwRW5kID0gcmVzLmRhdGEuZGF0YS52aXBFbmRcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5yZWR1Y3Rpb24gPSByZXMuZGF0YS5kYXRhLnJlZHVjdGlvblxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLm1lbWJlcklkID0gcmVzLmRhdGEuZGF0YS5tZW1iZXJJZFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnJlZHVjdGlvbiA9IHJlcy5kYXRhLmRhdGEucmVkdWN0aW9uXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWreW9k+WJjXVzZXIgaGFzaOaYr+WQpumcgOimgemHjee9rlxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4sIGNiKSB7XG4gICAgaWYgKGhhc2ggIT09IHRoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCkge1xuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4sIGNiKVxuICAgIH1cbiAgfVxuICAvLyDlrZjnlKjmiLdnbG9iYWzkv6Hmga9cbiAgZ2V0VXNlciAoY2IpIHtcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2xvYmFsRGF0YSlcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLy8g5Y+R6YCB55So5oi35pi156ewXG4gIHNlbmROaWNrbmFtZSAodG9rZW4sIG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIG5pY2tOYW1lOiB0aGlzLmJhc2U2NEVuY29kZShuYW1lKVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2V0Tmlja25hbWUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgfSlcbiAgfVxuICBzaG93TG9hZGluZyAoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICBpY29uOiAnbG9hZGluZydcbiAgICB9KVxuICB9XG4gIGhpZGVMb2FkaW5nICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgfVxuICBzaG93RmFpbCAoZXJyb3IpIHtcbiAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogZXJyb3IgfHwgJ+WKoOi9veWksei0pScsXG4gICAgICBpY29uOiAnbm9uZScsXG4gICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgfSlcbiAgfVxuICBwYXlGYWlsICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5pSv5LuY5aSx6LSlJyxcbiAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5wYWlkJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGRpc2FibGVBcGkgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjor6Xlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInXG4gICAgfSlcbiAgfVxuICAvLyDml7bpl7TmiLPmoLzlvI/ljJZcbiAgZGF0ZUZvcm1hdCAodGltZXN0YW1wLCBmb3JtYXRzKSB7XG4gICAgZm9ybWF0cyA9IGZvcm1hdHMgfHwgJ1ktbS1kJ1xuICAgIHZhciB6ZXJvID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICB2YXIgbXlEYXRlID0gdGltZXN0YW1wID8gbmV3IERhdGUodGltZXN0YW1wKSA6IG5ldyBEYXRlKClcbiAgICB2YXIgeWVhciA9IG15RGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgdmFyIG1vbnRoID0gemVybyhteURhdGUuZ2V0TW9udGgoKSArIDEpXG4gICAgdmFyIGRheSA9IHplcm8obXlEYXRlLmdldERhdGUoKSlcbiAgICB2YXIgaG91ciA9IHplcm8obXlEYXRlLmdldEhvdXJzKCkpXG4gICAgdmFyIG1pbml0ZSA9IHplcm8obXlEYXRlLmdldE1pbnV0ZXMoKSlcbiAgICB2YXIgc2Vjb25kID0gemVybyhteURhdGUuZ2V0U2Vjb25kcygpKVxuICAgIHJldHVybiBmb3JtYXRzLnJlcGxhY2UoL1l8bXxkfEh8aXxzL2lnLCBmdW5jdGlvbiAobWF0Y2hlcykge1xuICAgICAgcmV0dXJuICh7XG4gICAgICAgIFk6IHllYXIsXG4gICAgICAgIG06IG1vbnRoLFxuICAgICAgICBkOiBkYXksXG4gICAgICAgIEg6IGhvdXIsXG4gICAgICAgIGk6IG1pbml0ZSxcbiAgICAgICAgczogc2Vjb25kXG4gICAgICB9KVttYXRjaGVzXVxuICAgIH0pXG4gIH1cbiAgLy8g6L+H5rukZW1vamlcbiAgZmlsdGVyZW1vamkgKHN0cikge1xuICAgIHZhciByYW5nZXMgPSBbXG4gICAgICAnXFx1ZDgzY1tcXHVkZjAwLVxcdWRmZmZdJyxcbiAgICAgICdcXHVkODNkW1xcdWRjMDAtXFx1ZGU0Zl0nLFxuICAgICAgJ1xcdWQ4M2RbXFx1ZGU4MC1cXHVkZWZmXSdcbiAgICBdXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAocmFuZ2VzLmpvaW4oJ3wnKSwgJ2cnKSwgJycpXG4gIH1cbiAgLy8g5a6i5pyN5raI5oGvXG4gIGdldFVzZXJOYW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJlbW9qaSh0aGlzLmdsb2JhbERhdGEudXNlckluZm8ubmlja05hbWUpXG4gIH1cbiAgZ2V0VXNlckF2YXRhciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mby5hdmF0YXJVcmxcbiAgfVxuICBnZXRNZXNzYWdlIChwYWdlRGV0YWlsLCB0YWdzKSB7XG4gICAgdmFyIG1lc3NhZ2VPYmogPSB7XG4gICAgICAnbGV2ZWwnOiAnJyxcbiAgICAgICdjZWxscGhvbmVzJzogJydcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgIG1lc3NhZ2VPYmoubGV2ZWwgPSAnbm9ybWFsJ1xuICAgIH0gZWxzZSBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgbWVzc2FnZU9iai5sZXZlbCA9ICd2aXAnXG4gICAgfVxuICAgIG1lc3NhZ2VPYmouY2VsbHBob25lcyA9IFtbJycsIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJyldXVxuICAgIC8vIG1lc3NhZ2VPYmouZGVzY3JpcHRpb24gPSBwYWdlRGV0YWlsXG4gICAgLy8gbWVzc2FnZU9iai50YWdzID0gcGFnZURldGFpbCArICcsJyArIHRhZ3NcbiAgICAvLyBtZXNzYWdlT2JqLmN1c3RvbV9maWVsZHMgPSB7XG4gICAgLy8gICAnVGV4dEZpZWxkXzEzMDEwJzogJ3Rlc3QnXG4gICAgLy8gfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtZXNzYWdlT2JqKVxuICB9XG4gIGdldEJ1c2luZXNzICh0aXRsZSwgY29udGVudCwgb3JkZXJJZCkge1xuICAgIHZhciBub3RlT2JqID0ge1xuICAgICAgJ3RpdGxlJzogdGl0bGUsXG4gICAgICAnY3VzdG9tX2ZpZWxkcyc6IHtcbiAgICAgICAgJ1RleHRGaWVsZF8yODIyNyc6IGNvbnRlbnQsXG4gICAgICAgICdUZXh0RmllbGRfMjgyMzMnOiBvcmRlcklkXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShub3RlT2JqKVxuICB9XG5cbiAgLy8gYmFzZTY0IOe8lueggVxuICBiYXNlNjRFbmNvZGUgKHN0cikge1xuICAgIHZhciBjMSA9ICcnXG4gICAgdmFyIGMyID0gJydcbiAgICB2YXIgYzMgPSAnJ1xuICAgIHZhciBiYXNlNjRFbmNvZGVDaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSdcbiAgICB2YXIgaSA9IDBcbiAgICB2YXIgbGVuID0gc3RyLmxlbmd0aFxuICAgIHZhciBzdHJpbiA9ICcnXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGMxID0gc3RyLmNoYXJDb2RlQXQoaSsrKSAmIDB4ZmZcbiAgICAgIGlmIChpID09PSBsZW4pIHtcbiAgICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMxID4+IDIpXG4gICAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoYzEgJiAweDMpIDw8IDQpXG4gICAgICAgIHN0cmluICs9ICc9PSdcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGMyID0gc3RyLmNoYXJDb2RlQXQoaSsrKVxuICAgICAgaWYgKGkgPT09IGxlbikge1xuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzEgPj4gMilcbiAgICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KCgoYzEgJiAweDMpIDw8IDQpIHwgKChjMiAmIDB4RjApID4+IDQpKVxuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKGMyICYgMHhGKSA8PCAyKVxuICAgICAgICBzdHJpbiArPSAnPSdcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGMzID0gc3RyLmNoYXJDb2RlQXQoaSsrKVxuICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMxID4+IDIpXG4gICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKChjMSAmIDB4MykgPDwgNCkgfCAoKGMyICYgMHhGMCkgPj4gNCkpXG4gICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKChjMiAmIDB4RikgPDwgMikgfCAoKGMzICYgMHhDMCkgPj4gNikpXG4gICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzMgJiAweDNGKVxuICAgIH1cbiAgICByZXR1cm4gc3RyaW5cbiAgfVxuXG4gIC8vIGJhc2U2NCDop6PnoIFcbiAgYmFzZTY0RGVjb2RlIChpbnB1dCkge1xuICAgIHZhciBiYXNlNjRFbmNvZGVDaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSdcbiAgICB2YXIgb3V0cHV0ID0gJydcbiAgICB2YXIgY2hyMSA9ICcnXG4gICAgdmFyIGNocjIgPSAnJ1xuICAgIHZhciBjaHIzID0gJydcbiAgICB2YXIgZW5jMSA9ICcnXG4gICAgdmFyIGVuYzIgPSAnJ1xuICAgIHZhciBlbmMzID0gJydcbiAgICB2YXIgZW5jNCA9ICcnXG4gICAgdmFyIGkgPSAwXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOSsvPV0vZywgJycpXG4gICAgd2hpbGUgKGkgPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgIGVuYzEgPSBiYXNlNjRFbmNvZGVDaGFycy5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKVxuICAgICAgZW5jMiA9IGJhc2U2NEVuY29kZUNoYXJzLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpXG4gICAgICBlbmMzID0gYmFzZTY0RW5jb2RlQ2hhcnMuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgIGVuYzQgPSBiYXNlNjRFbmNvZGVDaGFycy5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKVxuICAgICAgY2hyMSA9IChlbmMxIDw8IDIpIHwgKGVuYzIgPj4gNClcbiAgICAgIGNocjIgPSAoKGVuYzIgJiAxNSkgPDwgNCkgfCAoZW5jMyA+PiAyKVxuICAgICAgY2hyMyA9ICgoZW5jMyAmIDMpIDw8IDYpIHwgZW5jNFxuICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIxKVxuICAgICAgaWYgKGVuYzMgIT09IDY0KSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMilcbiAgICAgIH1cbiAgICAgIGlmIChlbmM0ICE9PSA2NCkge1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjMpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnV0ZjhEZWNvZGUob3V0cHV0KVxuICB9XG5cbiAgLy8gdXRmOFxuICB1dGY4RGVjb2RlICh1dGZ0ZXh0KSB7XG4gICAgdmFyIHN0cmluZyA9ICcnXG4gICAgbGV0IGkgPSAwXG4gICAgbGV0IGMgPSAwXG4gICAgbGV0IGMxID0gMFxuICAgIGxldCBjMiA9IDBcbiAgICB3aGlsZSAoaSA8IHV0ZnRleHQubGVuZ3RoKSB7XG4gICAgICBjID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkpXG4gICAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKVxuICAgICAgICBpKytcbiAgICAgIH0gZWxzZSBpZiAoKGMgPiAxOTEpICYmIChjIDwgMjI0KSkge1xuICAgICAgICBjMSA9IHV0ZnRleHQuY2hhckNvZGVBdChpICsgMSlcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMzEpIDw8IDYpIHwgKGMxICYgNjMpKVxuICAgICAgICBpICs9IDJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGMxID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkgKyAxKVxuICAgICAgICBjMiA9IHV0ZnRleHQuY2hhckNvZGVBdChpICsgMilcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMTUpIDw8IDEyKSB8ICgoYzEgJiA2MykgPDwgNikgfCAoYzIgJiA2MykpXG4gICAgICAgIGkgKz0gM1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyaW5nXG4gIH1cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxuICBNZDUgPSBNZDUuaGV4TUQ1XG59XG4iXX0=