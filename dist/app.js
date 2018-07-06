'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _HttpRequestServer = require('./service/HttpRequestServer.js');

var _HttpRequestServer2 = _interopRequireDefault(_HttpRequestServer);

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
      pages: ['pages/login', 'pages/start', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/editAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order', 'pages/orderDetail', 'pages/invoice', 'pages/applyVip', 'pages/service', 'pages/link', 'pages/custom'],
      window: {
        backgroundTextStyle: 'dark',
        backgroundColor: '#f8f8f8',
        navigationBarBackgroundColor: '#ec3d3a',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#282626',
        selectedColor: '#cb1d1c',
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
    _this2.HttpRequest = new _HttpRequestServer2.default();
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
        if (res.data.error === 0) {
          _this.globalData.userLevel = res.data.data.level;
          _this.globalData.userHash = res.data.data.memberHash;
          _this.globalData.vipEnd = res.data.data.vipEnd;
          _this.globalData.reduction = res.data.data.reduction;
          _this.globalData.memberId = res.data.data.memberId;
          _this.globalData.expectedReduction = res.data.data.expectedReduction;
          cb && cb();
        }
      });
    }
    // 判断当前user hash是否需要重置

  }, {
    key: 'resetUserLevel',
    value: function resetUserLevel(hash, token, cb) {
      console.log(hash, this.globalData.userHash);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwicGFnZVJvb3QiLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsImRhdGEiLCJlcnJvciIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzaG93RmFpbCIsImhpZGVMb2FkaW5nIiwiY2xlYXJTdG9yYWdlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInJlcyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwidXJsIiwiZmFpbCIsImNvbXBsZXRlIiwibGVuZ3RoIiwicHVzaCIsInNoaWZ0IiwiY2IiLCJsb2dpbiIsInNob3dUb2FzdCIsImljb24iLCJpbWFnZSIsImUiLCJyZWZyZW5jZUNvZGUiLCJqc2NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJyZWZlcmVuY2VJZCIsIlNlbmRDb2RlIiwidGhlbiIsInBob25lTnVtYmVyIiwicGhvbmUiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwiVXNlckxvZ2luIiwidG9rZW4iLCJ0aW1lT3V0IiwiZ2V0VXNlckxldmVsIiwibm93VGltZSIsIk1hdGgiLCJmbG9vciIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZWZyZW5jZSIsIm5hdmlnYXRlVG8iLCJyZWZyZXNoVG9rZW4iLCJyZXF1ZXN0VG9rZW4iLCJfdGhpcyIsIkdldFVzZXJJbmZvIiwibGV2ZWwiLCJtZW1iZXJIYXNoIiwidmlwRW5kIiwicmVkdWN0aW9uIiwibWVtYmVySWQiLCJleHBlY3RlZFJlZHVjdGlvbiIsImhhc2giLCJnZXRVc2VySW5mbyIsIm5hbWUiLCJiYXNlNjRFbmNvZGUiLCJTZXROaWNrbmFtZSIsInNob3dMb2FkaW5nIiwidGltZXN0YW1wIiwiZm9ybWF0cyIsInplcm8iLCJ2YWx1ZSIsIm15RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwicyIsInN0ciIsInJhbmdlcyIsIlJlZ0V4cCIsImpvaW4iLCJmaWx0ZXJlbW9qaSIsImF2YXRhclVybCIsInBhZ2VEZXRhaWwiLCJ0YWdzIiwibWVzc2FnZU9iaiIsImNlbGxwaG9uZXMiLCJKU09OIiwic3RyaW5naWZ5Iiwib3JkZXJJZCIsIm5vdGVPYmoiLCJjMSIsImMyIiwiYzMiLCJiYXNlNjRFbmNvZGVDaGFycyIsImxlbiIsInN0cmluIiwiY2hhckNvZGVBdCIsImNoYXJBdCIsImlucHV0Iiwib3V0cHV0IiwiY2hyMSIsImNocjIiLCJjaHIzIiwiZW5jMSIsImVuYzIiLCJlbmMzIiwiZW5jNCIsImluZGV4T2YiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1dGY4RGVjb2RlIiwidXRmdGV4dCIsInN0cmluZyIsImMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBS0E7Ozs7Ozs7Ozs7Ozs7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YXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG4vLyBpbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG4vLyBpbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gJy4vc2VydmljZS9IdHRwUmVxdWVzdFNlcnZlcidcbnZhciBNZDUgPSByZXF1aXJlKCcuL3NlcnZpY2UvbWQ1JylcblxuLy8gY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG4vLyBzZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvc3lzdGVtJyxcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9uZXdBZGQnLFxuICAgICAgJ3BhZ2VzL2VkaXRBZGQnLFxuICAgICAgJ3BhZ2VzL3BheWNhcnQnLFxuICAgICAgJ3BhZ2VzL3BheWJ1eScsXG4gICAgICAncGFnZXMvcnVsZXMnLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL2NvbGxlY3QnLFxuICAgICAgJ3BhZ2VzL2xvZ2lzdGljYScsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL29yZGVyRGV0YWlsJyxcbiAgICAgICdwYWdlcy9pbnZvaWNlJyxcbiAgICAgICdwYWdlcy9hcHBseVZpcCcsXG4gICAgICAncGFnZXMvc2VydmljZScsXG4gICAgICAncGFnZXMvbGluaycsXG4gICAgICAncGFnZXMvY3VzdG9tJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZWMzZDNhJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNjYjFkMWMnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfliIbnsbsnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2FydCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2FydC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXJ0LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6LSt54mp6L2mJ1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXInLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL3VzZXItZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTGV2ZWw6IG51bGwsXG4gICAgdXNlckhhc2g6IG51bGwsXG4gICAgY29kZTogbnVsbCxcbiAgICBuaWNrTmFtZTogbnVsbCxcbiAgICB1c2VySW1hZ2U6IG51bGxcbiAgfVxuXG4gIG1pc3NUb2tlbiA9IGZhbHNlXG4gIGdldFRva2VuVGltZSA9IDBcbiAgaHR0cElkID0gW11cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcbiAgICAgIGNvbmZpZyAocCkge1xuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MgKHApIHtcbiAgICAgICAgaWYgKHAuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IC0xICYmIHAuZGF0YS5tc2cgPT09ICdtaXNzIHRva2VuJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21pc3MgdG9rZW4nKVxuICAgICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUrK1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW5UaW1lIDwgMykge1xuICAgICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAtMSAmJiBwLmRhdGEubXNnID09PSAnbWVtYmVyIGxvY2tlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgd2VweS5jbGVhclN0b3JhZ2UoKVxuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3otKblj7flt7LooqvplIHlrponLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9sb2dpbidcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwocC5kYXRhLm1zZylcbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICAgICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBmYWlsIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgY29tcGxldGUgKHApIHtcbiAgICAgICAgLy8g6K6w5b2VcmVxdWVzdCBpbmZvXG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuaHR0cElkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5odHRwSWQubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQucHVzaChwLmRhdGEuaHR0cElkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQuc2hpZnQoKVxuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5wdXNoKHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIOWIpOaWrXRhYmJhcuWbnumAgOmhtemdolxuICBwYWdlUm9vdCA9IGZhbHNlXG5cbiAgb25MYXVuY2goKSB7fVxuXG4gIGdldExvZ2luIChjYikge1xuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKHJlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIFjb2RlXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGUsIGNvZGUsIHJlZnJlbmNlQ29kZSwgY2IpIHtcbiAgICAvLyB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIGNvbnNvbGUubG9nKGUsIGNvZGUsIHJlZnJlbmNlQ29kZSlcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGpzY29kZTogY29kZSxcbiAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogZS5kZXRhaWwuaXYsXG4gICAgICByZWZlcmVuY2VJZDogcmVmcmVuY2VDb2RlXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5TZW5kQ29kZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgcGhvbmVOdW1iZXIgPSByZXMuZGF0YS5kYXRhLnBob25lXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Bob25lJywgcGhvbmVOdW1iZXIpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgLy8gdmFyIGRhdGEgPSB7XG4gICAgICAgIC8vICAgcGhvbmU6IHBob25lTnVtYmVyXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSwgY2IpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+eZu+W9leWksei0pScsXG4gICAgICAgIGNvbnRlbnQ6ICfor7fmo4Dmn6XnvZHnu5zov57mjqUnLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIC8vIOW3suacieaJi+acuuWPt+iOt+WPlnRva2VuXG4gIGFzeW5jIHJlcXVlc3RUb2tlbiAoZGF0YSwgY2IsIGZhaWwpIHtcbiAgICBhd2FpdCB0aGlzLkh0dHBSZXF1ZXN0LlVzZXJMb2dpbihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICAgIHZhciB0aW1lT3V0ID0gcmVzLmRhdGEuZGF0YS50aW1lT3V0XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnLCB0aW1lT3V0KVxuICAgICAgICAvLyDorr7nva5nbG9iYWznmoR1c2VyIGxldmVsIOWSjCBoYXNoXG4gICAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuLCAoKSA9PiB7XG4gICAgICAgICAgY2IgJiYgY2IodG9rZW4pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsICYmIGZhaWwoKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgfSlcbiAgfVxuICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acn1xuICByZWZyZXNoVG9rZW4gKCkge1xuICAgIC8vIOWIpOaWrXRva2Vu5piv5ZCm6L+H5pyfIOWmguaenOayoei/h+acn+ebtOaOpei/lOWbnnRva2Vu5YC8XG4gICAgdmFyIG5vd1RpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMClcbiAgICB2YXIgdGltZU91dCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnKVxuICAgIGlmIChub3dUaW1lID4gdGltZU91dCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgLy8g6L+U5Zue5b2T5YmNdG9rZW5cbiAgZ2V0VG9rZW4gKGVycm9yLCByZWZyZW5jZSkge1xuICAgIHZhciByZWZyZW5jZUNvZGUgPSAnJ1xuICAgIGlmIChyZWZyZW5jZSkge1xuICAgICAgcmVmcmVuY2VDb2RlID0gcmVmcmVuY2VcbiAgICB9XG4gICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykgPT09ICcnKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuL2xvZ2luP3JlZnJlbmNlQ29kZT0nICsgcmVmcmVuY2VDb2RlXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMucmVmcmVzaFRva2VuKCkgfHwgZXJyb3IgPT09IC0xKSB7XG4gICAgICAgIC8vIHRva2Vu6L+H5pyfIOmHjeaWsOWPkemAgeivt+axguiOt+WPluaWsOeahHRva2VuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0VG9rZW4oZGF0YSlcbiAgICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g6I635Y+WIHVzZXIgbGV2ZWwg5ZKMIGhhc2hcbiAgZ2V0VXNlckxldmVsICh0b2tlbiwgY2IpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyh7dG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLm1lbWJlckhhc2hcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS52aXBFbmQgPSByZXMuZGF0YS5kYXRhLnZpcEVuZFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnJlZHVjdGlvbiA9IHJlcy5kYXRhLmRhdGEucmVkdWN0aW9uXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEubWVtYmVySWQgPSByZXMuZGF0YS5kYXRhLm1lbWJlcklkXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEuZXhwZWN0ZWRSZWR1Y3Rpb24gPSByZXMuZGF0YS5kYXRhLmV4cGVjdGVkUmVkdWN0aW9uXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIC8vIOWIpOaWreW9k+WJjXVzZXIgaGFzaOaYr+WQpumcgOimgemHjee9rlxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4sIGNiKSB7XG4gICAgY29uc29sZS5sb2coaGFzaCwgdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKVxuICAgIGlmIChoYXNoICE9PSB0aGlzLmdsb2JhbERhdGEudXNlckhhc2gpIHtcbiAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuLCBjYilcbiAgICB9XG4gIH1cbiAgLy8g5a2Y55So5oi3Z2xvYmFs5L+h5oGvXG4gIGdldFVzZXIgKGNiKSB7XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICAvLyDlj5HpgIHnlKjmiLfmmLXnp7BcbiAgc2VuZE5pY2tuYW1lICh0b2tlbiwgbmFtZSkge1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgbmlja05hbWU6IHRoaXMuYmFzZTY0RW5jb2RlKG5hbWUpXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5TZXROaWNrbmFtZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICB9KVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgaGlkZUxvYWRpbmcgKCkge1xuICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICB9XG4gIHNob3dGYWlsIChlcnJvcikge1xuICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiBlcnJvciB8fCAn5Yqg6L295aSx6LSlJyxcbiAgICAgIGljb246ICdub25lJyxcbiAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICB9KVxuICB9XG4gIHBheUZhaWwgKCkge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICfmlK/ku5jlpLHotKUnLFxuICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnBhaWQnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZGlzYWJsZUFwaSAoKSB7XG4gICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgY29udGVudDogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleS9v+eUqOivpeWKn+iDve+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcbiAgICB9KVxuICB9XG4gIC8vIOaXtumXtOaIs+agvOW8j+WMllxuICBkYXRlRm9ybWF0ICh0aW1lc3RhbXAsIGZvcm1hdHMpIHtcbiAgICBmb3JtYXRzID0gZm9ybWF0cyB8fCAnWS1tLWQnXG4gICAgdmFyIHplcm8gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHZhciBteURhdGUgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApIDogbmV3IERhdGUoKVxuICAgIHZhciB5ZWFyID0gbXlEYXRlLmdldEZ1bGxZZWFyKClcbiAgICB2YXIgbW9udGggPSB6ZXJvKG15RGF0ZS5nZXRNb250aCgpICsgMSlcbiAgICB2YXIgZGF5ID0gemVybyhteURhdGUuZ2V0RGF0ZSgpKVxuICAgIHZhciBob3VyID0gemVybyhteURhdGUuZ2V0SG91cnMoKSlcbiAgICB2YXIgbWluaXRlID0gemVybyhteURhdGUuZ2V0TWludXRlcygpKVxuICAgIHZhciBzZWNvbmQgPSB6ZXJvKG15RGF0ZS5nZXRTZWNvbmRzKCkpXG4gICAgcmV0dXJuIGZvcm1hdHMucmVwbGFjZSgvWXxtfGR8SHxpfHMvaWcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgWTogeWVhcixcbiAgICAgICAgbTogbW9udGgsXG4gICAgICAgIGQ6IGRheSxcbiAgICAgICAgSDogaG91cixcbiAgICAgICAgaTogbWluaXRlLFxuICAgICAgICBzOiBzZWNvbmRcbiAgICAgIH0pW21hdGNoZXNdXG4gICAgfSlcbiAgfVxuICAvLyDov4fmu6RlbW9qaVxuICBmaWx0ZXJlbW9qaSAoc3RyKSB7XG4gICAgdmFyIHJhbmdlcyA9IFtcbiAgICAgICdcXHVkODNjW1xcdWRmMDAtXFx1ZGZmZl0nLFxuICAgICAgJ1xcdWQ4M2RbXFx1ZGMwMC1cXHVkZTRmXScsXG4gICAgICAnXFx1ZDgzZFtcXHVkZTgwLVxcdWRlZmZdJ1xuICAgIF1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChyYW5nZXMuam9pbignfCcpLCAnZycpLCAnJylcbiAgfVxuICAvLyDlrqLmnI3mtojmga9cbiAgZ2V0VXNlck5hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlcmVtb2ppKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mby5uaWNrTmFtZSlcbiAgfVxuICBnZXRVc2VyQXZhdGFyICgpIHtcbiAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvLmF2YXRhclVybFxuICB9XG4gIGdldE1lc3NhZ2UgKHBhZ2VEZXRhaWwsIHRhZ3MpIHtcbiAgICB2YXIgbWVzc2FnZU9iaiA9IHtcbiAgICAgICdsZXZlbCc6ICcnLFxuICAgICAgJ2NlbGxwaG9uZXMnOiAnJ1xuICAgIH1cbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgbWVzc2FnZU9iai5sZXZlbCA9ICdub3JtYWwnXG4gICAgfSBlbHNlIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICBtZXNzYWdlT2JqLmxldmVsID0gJ3ZpcCdcbiAgICB9XG4gICAgbWVzc2FnZU9iai5jZWxscGhvbmVzID0gW1snJywgd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKV1dXG4gICAgLy8gbWVzc2FnZU9iai5kZXNjcmlwdGlvbiA9IHBhZ2VEZXRhaWxcbiAgICAvLyBtZXNzYWdlT2JqLnRhZ3MgPSBwYWdlRGV0YWlsICsgJywnICsgdGFnc1xuICAgIC8vIG1lc3NhZ2VPYmouY3VzdG9tX2ZpZWxkcyA9IHtcbiAgICAvLyAgICdUZXh0RmllbGRfMTMwMTAnOiAndGVzdCdcbiAgICAvLyB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VPYmopXG4gIH1cbiAgZ2V0QnVzaW5lc3MgKHRpdGxlLCBjb250ZW50LCBvcmRlcklkKSB7XG4gICAgdmFyIG5vdGVPYmogPSB7XG4gICAgICAndGl0bGUnOiB0aXRsZSxcbiAgICAgICdjdXN0b21fZmllbGRzJzoge1xuICAgICAgICAnVGV4dEZpZWxkXzI4MjI3JzogY29udGVudCxcbiAgICAgICAgJ1RleHRGaWVsZF8yODIzMyc6IG9yZGVySWRcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5vdGVPYmopXG4gIH1cblxuICAvLyBiYXNlNjQg57yW56CBXG4gIGJhc2U2NEVuY29kZSAoc3RyKSB7XG4gICAgdmFyIGMxID0gJydcbiAgICB2YXIgYzIgPSAnJ1xuICAgIHZhciBjMyA9ICcnXG4gICAgdmFyIGJhc2U2NEVuY29kZUNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89J1xuICAgIHZhciBpID0gMFxuICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoXG4gICAgdmFyIHN0cmluID0gJydcbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgYzEgPSBzdHIuY2hhckNvZGVBdChpKyspICYgMHhmZlxuICAgICAgaWYgKGkgPT09IGxlbikge1xuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzEgPj4gMilcbiAgICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KChjMSAmIDB4MykgPDwgNClcbiAgICAgICAgc3RyaW4gKz0gJz09J1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgYzIgPSBzdHIuY2hhckNvZGVBdChpKyspXG4gICAgICBpZiAoaSA9PT0gbGVuKSB7XG4gICAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMSA+PiAyKVxuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKChjMSAmIDB4MykgPDwgNCkgfCAoKGMyICYgMHhGMCkgPj4gNCkpXG4gICAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoYzIgJiAweEYpIDw8IDIpXG4gICAgICAgIHN0cmluICs9ICc9J1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgYzMgPSBzdHIuY2hhckNvZGVBdChpKyspXG4gICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzEgPj4gMilcbiAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoKGMxICYgMHgzKSA8PCA0KSB8ICgoYzIgJiAweEYwKSA+PiA0KSlcbiAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoKGMyICYgMHhGKSA8PCAyKSB8ICgoYzMgJiAweEMwKSA+PiA2KSlcbiAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMyAmIDB4M0YpXG4gICAgfVxuICAgIHJldHVybiBzdHJpblxuICB9XG5cbiAgLy8gYmFzZTY0IOino+eggVxuICBiYXNlNjREZWNvZGUgKGlucHV0KSB7XG4gICAgdmFyIGJhc2U2NEVuY29kZUNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89J1xuICAgIHZhciBvdXRwdXQgPSAnJ1xuICAgIHZhciBjaHIxID0gJydcbiAgICB2YXIgY2hyMiA9ICcnXG4gICAgdmFyIGNocjMgPSAnJ1xuICAgIHZhciBlbmMxID0gJydcbiAgICB2YXIgZW5jMiA9ICcnXG4gICAgdmFyIGVuYzMgPSAnJ1xuICAgIHZhciBlbmM0ID0gJydcbiAgICB2YXIgaSA9IDBcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05Ky89XS9nLCAnJylcbiAgICB3aGlsZSAoaSA8IGlucHV0Lmxlbmd0aCkge1xuICAgICAgZW5jMSA9IGJhc2U2NEVuY29kZUNoYXJzLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpXG4gICAgICBlbmMyID0gYmFzZTY0RW5jb2RlQ2hhcnMuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgIGVuYzMgPSBiYXNlNjRFbmNvZGVDaGFycy5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKVxuICAgICAgZW5jNCA9IGJhc2U2NEVuY29kZUNoYXJzLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpXG4gICAgICBjaHIxID0gKGVuYzEgPDwgMikgfCAoZW5jMiA+PiA0KVxuICAgICAgY2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpXG4gICAgICBjaHIzID0gKChlbmMzICYgMykgPDwgNikgfCBlbmM0XG4gICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjEpXG4gICAgICBpZiAoZW5jMyAhPT0gNjQpIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIyKVxuICAgICAgfVxuICAgICAgaWYgKGVuYzQgIT09IDY0KSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudXRmOERlY29kZShvdXRwdXQpXG4gIH1cblxuICAvLyB1dGY4XG4gIHV0ZjhEZWNvZGUgKHV0ZnRleHQpIHtcbiAgICB2YXIgc3RyaW5nID0gJydcbiAgICBsZXQgaSA9IDBcbiAgICBsZXQgYyA9IDBcbiAgICBsZXQgYzEgPSAwXG4gICAgbGV0IGMyID0gMFxuICAgIHdoaWxlIChpIDwgdXRmdGV4dC5sZW5ndGgpIHtcbiAgICAgIGMgPSB1dGZ0ZXh0LmNoYXJDb2RlQXQoaSlcbiAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpXG4gICAgICAgIGkrK1xuICAgICAgfSBlbHNlIGlmICgoYyA+IDE5MSkgJiYgKGMgPCAyMjQpKSB7XG4gICAgICAgIGMxID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkgKyAxKVxuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAzMSkgPDwgNikgfCAoYzEgJiA2MykpXG4gICAgICAgIGkgKz0gMlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYzEgPSB1dGZ0ZXh0LmNoYXJDb2RlQXQoaSArIDEpXG4gICAgICAgIGMyID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkgKyAyKVxuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAxNSkgPDwgMTIpIHwgKChjMSAmIDYzKSA8PCA2KSB8IChjMiAmIDYzKSlcbiAgICAgICAgaSArPSAzXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmdcbiAgfVxuICBIdHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCgpXG4gIE1kNSA9IE1kNS5oZXhNRDVcbn1cbiJdfQ==