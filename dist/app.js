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
    _this2.errorHttpId = '';
    _this2.pageRoot = false;
    _this2.HttpRequest = new _HttpRequest2.default();
    _this2.Md5 = Md5.hexMD5;

    _this2.use('requestfix');
    _this2.intercept('request', {
      config: function config(p) {
        return p;
      },
      success: function success(p) {
        var _this3 = this;

        if (p.statusCode === 200) {
          if (p.data.error === undefined || p.data.error !== 0) {
            this.errorHttpId = p.data.httpId;
          }
          if (p.data.error !== undefined && p.data.error === -1 && p.data.msg === 'miss token') {
            console.log('miss token');
            this.missToken = true;
            if (this.getTokenTime < 3) {
              this.getToken(p.data.error, function () {
                _this3.missToken = false;
                _this3.getTokenTime = 0;
              }, function () {
                _this3.missToken = true;
                _this3.getTokenTime++;
              });
            }
            // this.getTokenTime++
            // if (this.getTokenTime < 3) {
            //   this.missToken = true
            //   this.getToken(p.data.error)
            // } else {
            //   this.showFail()
            //   this.missToken = false
            // }
          } else if (p.data.error !== undefined && p.data.error === -1 && p.data.msg === 'member locked') {
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
          } else if (p.data.error !== undefined && p.data.error === -1) {
            this.showFail(null, p.data.httpId);
          } else if (p.data.error !== undefined && p.data.error === -2) {
            this.showFail(p.data.msg, p.data.httpId);
          } else if (p.data.error !== undefined && p.data.error === 0) {
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
    value: function getUserInfo(e, code, refrenceCode, cb, fail) {
      // this.globalData.userInfo = e.detail.userInfo
      console.log(e, code, refrenceCode);
      var data = {
        jscode: code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        referenceId: refrenceCode
      };
      this.HttpRequest.SendCode(data).then(function (res) {
        console.log(res);
        if (res.data.error !== undefined && res.data.error === 0) {
          var phoneNumber = res.data.data.phone;
          _wepy2.default.setStorageSync('phone', phoneNumber);
          cb && cb();
          // var data = {
          //   phone: phoneNumber
          // }
          // this.requestToken(data, cb)
        } else {
          fail && fail();
        }
      }).catch(function () {
        _wepy2.default.showModal({
          title: '登录失败',
          content: '请检查网络连接',
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              fail && fail();
            }
          }
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
                  if (res.data.error !== undefined && res.data.error === 0) {
                    var token = res.data.data.token;
                    var timeOut = res.data.data.timeOut;
                    _wepy2.default.setStorageSync('token', token);
                    _wepy2.default.setStorageSync('timeout', timeOut);
                    // 设置global的user level 和 hash
                    _this4.getUserLevel(token, function () {
                      cb && cb(token);
                    }, function () {
                      fail && fail();
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
    value: function getToken(error, refrence, cb, fail) {
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
          this.requestToken(data, cb, fail);
          return _wepy2.default.getStorageSync('token');
        } else {
          return _wepy2.default.getStorageSync('token');
        }
      }
    }

    // 获取 user level 和 hash

  }, {
    key: 'getUserLevel',
    value: function getUserLevel(token, cb, fail) {
      var _this = this;
      this.HttpRequest.GetUserInfo({ token: token }).then(function (res) {
        if (res.data.error !== undefined && res.data.error === 0) {
          _this.globalData.userLevel = res.data.data.level;
          _this.globalData.userHash = res.data.data.memberHash;
          _this.globalData.vipEnd = res.data.data.vipEnd;
          _this.globalData.reduction = res.data.data.reduction;
          _this.globalData.memberId = res.data.data.memberId;
          _this.globalData.expectedReduction = res.data.data.expectedReduction;
          cb && cb();
        } else {
          fail && fail();
        }
      }).catch(function () {
        fail && fail();
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
      var _this5 = this;

      _wepy2.default.getUserInfo({
        success: function success(res) {
          _this5.globalData.userInfo = res.userInfo;
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
    value: function showFail(error, content) {
      // wepy.showToast({
      //   title: error || '加载失败',
      //   icon: 'none',
      //   image: '../image/cancel.png'
      // })/
      var contentTxt = content || '5b4813d15ee41';
      _wepy2.default.showModal({
        title: error || '系统开小差了',
        content: '请截图联系客服 ' + contentTxt,
        showCancel: false
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
      var _this6 = this;

      console.log(this.globalData);
      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            if (!_this6.globalData.userInfo) {
              _this6.getUser();
            }
            return _this6.filteremoji(_this6.globalData.userInfo.nickName);
          } else {
            return '';
          }
        }
      });
    }
  }, {
    key: 'getUserAvatar',
    value: function getUserAvatar() {
      var _this7 = this;

      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            if (!_this7.globalData.userInfo) {
              _this7.getUser();
            }
            return _this7.globalData.userInfo.avatarUrl;
          } else {
            return '';
          }
        }
      });
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
      var phone = '';
      if (_wepy2.default.getStorageSync('phone') !== '') {
        phone = _wepy2.default.getStorageSync('phone');
      }
      var noteObj = {
        'title': title,
        'custom_fields': {
          'TextField_28227': content,
          'TextField_28233': orderId,
          'TextField_29513': phone
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwiZXJyb3JIdHRwSWQiLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInN1Y2Nlc3MiLCJzdGF0dXNDb2RlIiwiZGF0YSIsImVycm9yIiwidW5kZWZpbmVkIiwibXNnIiwiY29uc29sZSIsImxvZyIsImdldFRva2VuIiwiaGlkZUxvYWRpbmciLCJjbGVhclN0b3JhZ2UiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwicmVzIiwiY29uZmlybSIsInJlZGlyZWN0VG8iLCJ1cmwiLCJzaG93RmFpbCIsImZhaWwiLCJjb21wbGV0ZSIsImxlbmd0aCIsInB1c2giLCJzaGlmdCIsImNiIiwibG9naW4iLCJzaG93VG9hc3QiLCJpY29uIiwiaW1hZ2UiLCJlIiwicmVmcmVuY2VDb2RlIiwianNjb2RlIiwiZW5jcnlwdGVkRGF0YSIsImRldGFpbCIsIml2IiwicmVmZXJlbmNlSWQiLCJTZW5kQ29kZSIsInRoZW4iLCJwaG9uZU51bWJlciIsInBob25lIiwic2V0U3RvcmFnZVN5bmMiLCJjYXRjaCIsIlVzZXJMb2dpbiIsInRva2VuIiwidGltZU91dCIsImdldFVzZXJMZXZlbCIsIm5vd1RpbWUiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiZ2V0VGltZSIsImdldFN0b3JhZ2VTeW5jIiwicmVmcmVuY2UiLCJuYXZpZ2F0ZVRvIiwicmVmcmVzaFRva2VuIiwicmVxdWVzdFRva2VuIiwiX3RoaXMiLCJHZXRVc2VySW5mbyIsImxldmVsIiwibWVtYmVySGFzaCIsInZpcEVuZCIsInJlZHVjdGlvbiIsIm1lbWJlcklkIiwiZXhwZWN0ZWRSZWR1Y3Rpb24iLCJoYXNoIiwiZ2V0VXNlckluZm8iLCJuYW1lIiwiYmFzZTY0RW5jb2RlIiwiU2V0Tmlja25hbWUiLCJzaG93TG9hZGluZyIsImNvbnRlbnRUeHQiLCJ0aW1lc3RhbXAiLCJmb3JtYXRzIiwiemVybyIsInZhbHVlIiwibXlEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW5pdGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaGVzIiwiWSIsIm0iLCJkIiwiSCIsImkiLCJzIiwic3RyIiwicmFuZ2VzIiwiUmVnRXhwIiwiam9pbiIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImdldFVzZXIiLCJmaWx0ZXJlbW9qaSIsImF2YXRhclVybCIsInBhZ2VEZXRhaWwiLCJ0YWdzIiwibWVzc2FnZU9iaiIsImNlbGxwaG9uZXMiLCJKU09OIiwic3RyaW5naWZ5Iiwib3JkZXJJZCIsIm5vdGVPYmoiLCJjMSIsImMyIiwiYzMiLCJiYXNlNjRFbmNvZGVDaGFycyIsImxlbiIsInN0cmluIiwiY2hhckNvZGVBdCIsImNoYXJBdCIsImlucHV0Iiwib3V0cHV0IiwiY2hyMSIsImNocjIiLCJjaHIzIiwiZW5jMSIsImVuYzIiLCJlbmMzIiwiZW5jNCIsImluZGV4T2YiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1dGY4RGVj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QUFoQixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7K0JBQ1lZLE8sRUFBUztBQUNuQixVQUFJQyxTQUFTLEVBQWI7QUFDQSxVQUFJekMsSUFBSSxDQUFSO0FBQ0EsVUFBSTBDLElBQUksQ0FBUjtBQUNBLFVBQUl2QixLQUFLLENBQVQ7QUFDQSxVQUFJQyxLQUFLLENBQVQ7QUFDQSxhQUFPcEIsSUFBSXdDLFFBQVFqSCxNQUFuQixFQUEyQjtBQUN6Qm1ILFlBQUlGLFFBQVFmLFVBQVIsQ0FBbUJ6QixDQUFuQixDQUFKO0FBQ0EsWUFBSTBDLElBQUksR0FBUixFQUFhO0FBQ1hELG9CQUFVSixPQUFPQyxZQUFQLENBQW9CSSxDQUFwQixDQUFWO0FBQ0ExQztBQUNELFNBSEQsTUFHTyxJQUFLMEMsSUFBSSxHQUFMLElBQWNBLElBQUksR0FBdEIsRUFBNEI7QUFDakN2QixlQUFLcUIsUUFBUWYsVUFBUixDQUFtQnpCLElBQUksQ0FBdkIsQ0FBTDtBQUNBeUMsb0JBQVVKLE9BQU9DLFlBQVAsQ0FBcUIsQ0FBQ0ksSUFBSSxFQUFMLEtBQVksQ0FBYixHQUFtQnZCLEtBQUssRUFBNUMsQ0FBVjtBQUNBbkIsZUFBSyxDQUFMO0FBQ0QsU0FKTSxNQUlBO0FBQ0xtQixlQUFLcUIsUUFBUWYsVUFBUixDQUFtQnpCLElBQUksQ0FBdkIsQ0FBTDtBQUNBb0IsZUFBS29CLFFBQVFmLFVBQVIsQ0FBbUJ6QixJQUFJLENBQXZCLENBQUw7QUFDQXlDLG9CQUFVSixPQUFPQyxZQUFQLENBQXFCLENBQUNJLElBQUksRUFBTCxLQUFZLEVBQWIsR0FBb0IsQ0FBQ3ZCLEtBQUssRUFBTixLQUFhLENBQWpDLEdBQXVDQyxLQUFLLEVBQWhFLENBQVY7QUFDQXBCLGVBQUssQ0FBTDtBQUNEO0FBQ0Y7QUFDRCxhQUFPeUMsTUFBUDtBQUNEOzs7O0VBdGlCMEIsZUFBS0UsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbi8vIGltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbi8vIGltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuXG5pbXBvcnQgSHR0cFJlcXVlc3QgZnJvbSAnLi9zZXJ2aWNlL0h0dHBSZXF1ZXN0J1xudmFyIE1kNSA9IHJlcXVpcmUoJy4vc2VydmljZS9tZDUnKVxuXG4vLyBjb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcbi8vIHNldFN0b3JlKHN0b3JlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL3N0YXJ0JyxcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9jYXJ0JyxcbiAgICAgICdwYWdlcy9zeXN0ZW0nLFxuICAgICAgJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICdwYWdlcy9zZWFyY2gnLFxuICAgICAgJ3BhZ2VzL2FkZHJlc3MnLFxuICAgICAgJ3BhZ2VzL25ld0FkZCcsXG4gICAgICAncGFnZXMvZWRpdEFkZCcsXG4gICAgICAncGFnZXMvcGF5Y2FydCcsXG4gICAgICAncGFnZXMvcGF5YnV5JyxcbiAgICAgICdwYWdlcy9ydWxlcycsXG4gICAgICAncGFnZXMvdXNlcicsXG4gICAgICAncGFnZXMvY29sbGVjdCcsXG4gICAgICAncGFnZXMvbG9naXN0aWNhJyxcbiAgICAgICdwYWdlcy9vcmRlcicsXG4gICAgICAncGFnZXMvb3JkZXJEZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2ludm9pY2UnLFxuICAgICAgJ3BhZ2VzL2FwcGx5VmlwJyxcbiAgICAgICdwYWdlcy9zZXJ2aWNlJyxcbiAgICAgICdwYWdlcy9saW5rJyxcbiAgICAgICdwYWdlcy9jdXN0b20nXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNlYzNkM2EnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2NiMWQxYycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHVzZXJMZXZlbDogbnVsbCxcbiAgICB1c2VySGFzaDogbnVsbCxcbiAgICBjb2RlOiBudWxsLFxuICAgIG5pY2tOYW1lOiBudWxsLFxuICAgIHVzZXJJbWFnZTogbnVsbFxuICB9XG5cbiAgbWlzc1Rva2VuID0gZmFsc2VcbiAgZ2V0VG9rZW5UaW1lID0gMFxuICBodHRwSWQgPSBbXVxuICBlcnJvckh0dHBJZCA9ICcnXG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG4gICAgICBjb25maWcgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIGlmIChwLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIGlmIChwLmRhdGEuZXJyb3IgPT09IHVuZGVmaW5lZCB8fCBwLmRhdGEuZXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIdHRwSWQgPSBwLmRhdGEuaHR0cElkXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiBwLmRhdGEuZXJyb3IgPT09IC0xICYmIHAuZGF0YS5tc2cgPT09ICdtaXNzIHRva2VuJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21pc3MgdG9rZW4nKVxuICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSB0cnVlXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW4ocC5kYXRhLmVycm9yLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgKytcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0VG9rZW5UaW1lKytcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmdldFRva2VuVGltZSA8IDMpIHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5taXNzVG9rZW4gPSB0cnVlXG4gICAgICAgICAgICAvLyAgIHRoaXMuZ2V0VG9rZW4ocC5kYXRhLmVycm9yKVxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5zaG93RmFpbCgpXG4gICAgICAgICAgICAvLyAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHAuZGF0YS5lcnJvciA9PT0gLTEgJiYgcC5kYXRhLm1zZyA9PT0gJ21lbWJlciBsb2NrZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlKClcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN6LSm5Y+35bey6KKr6ZSB5a6aJyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy4vbG9naW4nXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHAuZGF0YS5lcnJvciA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwobnVsbCwgcC5kYXRhLmh0dHBJZClcbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHAuZGF0YS5lcnJvciA9PT0gLTIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWwocC5kYXRhLm1zZywgcC5kYXRhLmh0dHBJZClcbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHAuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB0aGlzLnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSAocCkge1xuICAgICAgICAvLyDorrDlvZVyZXF1ZXN0IGluZm9cbiAgICAgICAgaWYgKHAuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgaWYgKHAuZGF0YS5odHRwSWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmh0dHBJZC5sZW5ndGggPCAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5wdXNoKHAuZGF0YS5odHRwSWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmh0dHBJZC5zaGlmdCgpXG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnB1c2gocC5kYXRhLmh0dHBJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8g5Yik5patdGFiYmFy5Zue6YCA6aG16Z2iXG4gIHBhZ2VSb290ID0gZmFsc2VcblxuICBvbkxhdW5jaCgpIHt9XG5cbiAgZ2V0TG9naW4gKGNiKSB7XG4gICAgd2VweS5sb2dpbih7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IocmVzLmNvZGUpXG4gICAgICAgIC8vIOWPkemAgWNvZGVcbiAgICAgIH0sXG4gICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+e9kee7nOi/nuaOpeWksei0pScsXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZ2V0VXNlckluZm8oZSwgY29kZSwgcmVmcmVuY2VDb2RlLCBjYiwgZmFpbCkge1xuICAgIC8vIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgY29uc29sZS5sb2coZSwgY29kZSwgcmVmcmVuY2VDb2RlKVxuICAgIHZhciBkYXRhID0ge1xuICAgICAganNjb2RlOiBjb2RlLFxuICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgIGl2OiBlLmRldGFpbC5pdixcbiAgICAgIHJlZmVyZW5jZUlkOiByZWZyZW5jZUNvZGVcbiAgICB9XG4gICAgdGhpcy5IdHRwUmVxdWVzdC5TZW5kQ29kZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIGlmIChyZXMuZGF0YS5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIHZhciBwaG9uZU51bWJlciA9IHJlcy5kYXRhLmRhdGEucGhvbmVcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncGhvbmUnLCBwaG9uZU51bWJlcilcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAvLyB2YXIgZGF0YSA9IHtcbiAgICAgICAgLy8gICBwaG9uZTogcGhvbmVOdW1iZXJcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB0aGlzLnJlcXVlc3RUb2tlbihkYXRhLCBjYilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+eZu+W9leWksei0pScsXG4gICAgICAgIGNvbnRlbnQ6ICfor7fmo4Dmn6XnvZHnu5zov57mjqUnLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICAvLyDlt7LmnInmiYvmnLrlj7fojrflj5Z0b2tlblxuICBhc3luYyByZXF1ZXN0VG9rZW4gKGRhdGEsIGNiLCBmYWlsKSB7XG4gICAgYXdhaXQgdGhpcy5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiByZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICAgIHZhciB0aW1lT3V0ID0gcmVzLmRhdGEuZGF0YS50aW1lT3V0XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnLCB0aW1lT3V0KVxuICAgICAgICAvLyDorr7nva5nbG9iYWznmoR1c2VyIGxldmVsIOWSjCBoYXNoXG4gICAgICAgIHRoaXMuZ2V0VXNlckxldmVsKHRva2VuLCAoKSA9PiB7XG4gICAgICAgICAgY2IgJiYgY2IodG9rZW4pXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICBmYWlsICYmIGZhaWwoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBmYWlsICYmIGZhaWwoKVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ9cbiAgcmVmcmVzaFRva2VuICgpIHtcbiAgICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acnyDlpoLmnpzmsqHov4fmnJ/nm7TmjqXov5Tlm550b2tlbuWAvFxuICAgIHZhciBub3dUaW1lID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApXG4gICAgdmFyIHRpbWVPdXQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JylcbiAgICBpZiAobm93VGltZSA+IHRpbWVPdXQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8vIOi/lOWbnuW9k+WJjXRva2VuXG4gIGdldFRva2VuIChlcnJvciwgcmVmcmVuY2UsIGNiLCBmYWlsKSB7XG4gICAgdmFyIHJlZnJlbmNlQ29kZSA9ICcnXG4gICAgaWYgKHJlZnJlbmNlKSB7XG4gICAgICByZWZyZW5jZUNvZGUgPSByZWZyZW5jZVxuICAgIH1cbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSA9PT0gJycpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4vbG9naW4/cmVmcmVuY2VDb2RlPScgKyByZWZyZW5jZUNvZGVcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5yZWZyZXNoVG9rZW4oKSB8fCBlcnJvciA9PT0gLTEpIHtcbiAgICAgICAgLy8gdG9rZW7ov4fmnJ8g6YeN5paw5Y+R6YCB6K+35rGC6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgcGhvbmU6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbihkYXRhLCBjYiwgZmFpbClcbiAgICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g6I635Y+WIHVzZXIgbGV2ZWwg5ZKMIGhhc2hcbiAgZ2V0VXNlckxldmVsICh0b2tlbiwgY2IsIGZhaWwpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgdGhpcy5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyh7dG9rZW46IHRva2VufSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiByZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCA9IHJlcy5kYXRhLmRhdGEubWVtYmVySGFzaFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnZpcEVuZCA9IHJlcy5kYXRhLmRhdGEudmlwRW5kXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEucmVkdWN0aW9uID0gcmVzLmRhdGEuZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5tZW1iZXJJZCA9IHJlcy5kYXRhLmRhdGEubWVtYmVySWRcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5leHBlY3RlZFJlZHVjdGlvbiA9IHJlcy5kYXRhLmRhdGEuZXhwZWN0ZWRSZWR1Y3Rpb25cbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBmYWlsICYmIGZhaWwoKVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5pat5b2T5YmNdXNlciBoYXNo5piv5ZCm6ZyA6KaB6YeN572uXG4gIHJlc2V0VXNlckxldmVsIChoYXNoLCB0b2tlbiwgY2IpIHtcbiAgICBpZiAoaGFzaCAhPT0gdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKSB7XG4gICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbiwgY2IpXG4gICAgfVxuICB9XG4gIC8vIOWtmOeUqOaIt2dsb2JhbOS/oeaBr1xuICBnZXRVc2VyIChjYikge1xuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLy8g5Y+R6YCB55So5oi35pi156ewXG4gIHNlbmROaWNrbmFtZSAodG9rZW4sIG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIG5pY2tOYW1lOiB0aGlzLmJhc2U2NEVuY29kZShuYW1lKVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2V0Tmlja25hbWUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgfSlcbiAgfVxuICBzaG93TG9hZGluZyAoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICBpY29uOiAnbG9hZGluZydcbiAgICB9KVxuICB9XG4gIGhpZGVMb2FkaW5nICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgfVxuICBzaG93RmFpbCAoZXJyb3IsIGNvbnRlbnQpIHtcbiAgICAvLyB3ZXB5LnNob3dUb2FzdCh7XG4gICAgLy8gICB0aXRsZTogZXJyb3IgfHwgJ+WKoOi9veWksei0pScsXG4gICAgLy8gICBpY29uOiAnbm9uZScsXG4gICAgLy8gICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgLy8gfSkvXG4gICAgdmFyIGNvbnRlbnRUeHQgPSBjb250ZW50IHx8ICc1YjQ4MTNkMTVlZTQxJ1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiBlcnJvciB8fCAn57O757uf5byA5bCP5beu5LqGJyxcbiAgICAgIGNvbnRlbnQ6ICfor7fmiKrlm77ogZTns7vlrqLmnI0gJyArIGNvbnRlbnRUeHQsXG4gICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgIH0pXG4gIH1cbiAgcGF5RmFpbCAoKSB7XG4gICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgY29udGVudDogJ+aUr+S7mOWksei0pScsXG4gICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVucGFpZCdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBkaXNhYmxlQXBpICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So6K+l5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgIH0pXG4gIH1cbiAgLy8g5pe26Ze05oiz5qC85byP5YyWXG4gIGRhdGVGb3JtYXQgKHRpbWVzdGFtcCwgZm9ybWF0cykge1xuICAgIGZvcm1hdHMgPSBmb3JtYXRzIHx8ICdZLW0tZCdcbiAgICB2YXIgemVybyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlIDwgMTApIHtcbiAgICAgICAgcmV0dXJuICcwJyArIHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgdmFyIG15RGF0ZSA9IHRpbWVzdGFtcCA/IG5ldyBEYXRlKHRpbWVzdGFtcCkgOiBuZXcgRGF0ZSgpXG4gICAgdmFyIHllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHZhciBtb250aCA9IHplcm8obXlEYXRlLmdldE1vbnRoKCkgKyAxKVxuICAgIHZhciBkYXkgPSB6ZXJvKG15RGF0ZS5nZXREYXRlKCkpXG4gICAgdmFyIGhvdXIgPSB6ZXJvKG15RGF0ZS5nZXRIb3VycygpKVxuICAgIHZhciBtaW5pdGUgPSB6ZXJvKG15RGF0ZS5nZXRNaW51dGVzKCkpXG4gICAgdmFyIHNlY29uZCA9IHplcm8obXlEYXRlLmdldFNlY29uZHMoKSlcbiAgICByZXR1cm4gZm9ybWF0cy5yZXBsYWNlKC9ZfG18ZHxIfGl8cy9pZywgZnVuY3Rpb24gKG1hdGNoZXMpIHtcbiAgICAgIHJldHVybiAoe1xuICAgICAgICBZOiB5ZWFyLFxuICAgICAgICBtOiBtb250aCxcbiAgICAgICAgZDogZGF5LFxuICAgICAgICBIOiBob3VyLFxuICAgICAgICBpOiBtaW5pdGUsXG4gICAgICAgIHM6IHNlY29uZFxuICAgICAgfSlbbWF0Y2hlc11cbiAgICB9KVxuICB9XG4gIC8vIOi/h+a7pGVtb2ppXG4gIGZpbHRlcmVtb2ppIChzdHIpIHtcbiAgICB2YXIgcmFuZ2VzID0gW1xuICAgICAgJ1xcdWQ4M2NbXFx1ZGYwMC1cXHVkZmZmXScsXG4gICAgICAnXFx1ZDgzZFtcXHVkYzAwLVxcdWRlNGZdJyxcbiAgICAgICdcXHVkODNkW1xcdWRlODAtXFx1ZGVmZl0nXG4gICAgXVxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHJhbmdlcy5qb2luKCd8JyksICdnJyksICcnKVxuICB9XG4gIC8vIOWuouacjea2iOaBr1xuICBnZXRVc2VyTmFtZSAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5nbG9iYWxEYXRhKVxuICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICBpZiAoIXRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgICAgICAgdGhpcy5nZXRVc2VyKClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZW1vamkodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvLm5pY2tOYW1lKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnZXRVc2VyQXZhdGFyICgpIHtcbiAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0VXNlcigpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm8uYXZhdGFyVXJsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGdldE1lc3NhZ2UgKHBhZ2VEZXRhaWwsIHRhZ3MpIHtcbiAgICB2YXIgbWVzc2FnZU9iaiA9IHtcbiAgICAgICdsZXZlbCc6ICcnLFxuICAgICAgJ2NlbGxwaG9uZXMnOiAnJ1xuICAgIH1cbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgbWVzc2FnZU9iai5sZXZlbCA9ICdub3JtYWwnXG4gICAgfSBlbHNlIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICBtZXNzYWdlT2JqLmxldmVsID0gJ3ZpcCdcbiAgICB9XG4gICAgbWVzc2FnZU9iai5jZWxscGhvbmVzID0gW1snJywgd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKV1dXG4gICAgLy8gbWVzc2FnZU9iai5kZXNjcmlwdGlvbiA9IHBhZ2VEZXRhaWxcbiAgICAvLyBtZXNzYWdlT2JqLnRhZ3MgPSBwYWdlRGV0YWlsICsgJywnICsgdGFnc1xuICAgIC8vIG1lc3NhZ2VPYmouY3VzdG9tX2ZpZWxkcyA9IHtcbiAgICAvLyAgICdUZXh0RmllbGRfMTMwMTAnOiAndGVzdCdcbiAgICAvLyB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VPYmopXG4gIH1cbiAgZ2V0QnVzaW5lc3MgKHRpdGxlLCBjb250ZW50LCBvcmRlcklkKSB7XG4gICAgdmFyIHBob25lID0gJydcbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKSAhPT0gJycpIHtcbiAgICAgIHBob25lID0gd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgIH1cbiAgICB2YXIgbm90ZU9iaiA9IHtcbiAgICAgICd0aXRsZSc6IHRpdGxlLFxuICAgICAgJ2N1c3RvbV9maWVsZHMnOiB7XG4gICAgICAgICdUZXh0RmllbGRfMjgyMjcnOiBjb250ZW50LFxuICAgICAgICAnVGV4dEZpZWxkXzI4MjMzJzogb3JkZXJJZCxcbiAgICAgICAgJ1RleHRGaWVsZF8yOTUxMyc6IHBob25lXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShub3RlT2JqKVxuICB9XG5cbiAgLy8gYmFzZTY0IOe8lueggVxuICBiYXNlNjRFbmNvZGUgKHN0cikge1xuICAgIHZhciBjMSA9ICcnXG4gICAgdmFyIGMyID0gJydcbiAgICB2YXIgYzMgPSAnJ1xuICAgIHZhciBiYXNlNjRFbmNvZGVDaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSdcbiAgICB2YXIgaSA9IDBcbiAgICB2YXIgbGVuID0gc3RyLmxlbmd0aFxuICAgIHZhciBzdHJpbiA9ICcnXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGMxID0gc3RyLmNoYXJDb2RlQXQoaSsrKSAmIDB4ZmZcbiAgICAgIGlmIChpID09PSBsZW4pIHtcbiAgICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMxID4+IDIpXG4gICAgICAgIHN0cmluICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoYzEgJiAweDMpIDw8IDQpXG4gICAgICAgIHN0cmluICs9ICc9PSdcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGMyID0gc3RyLmNoYXJDb2RlQXQoaSsrKVxuICAgICAgaWYgKGkgPT09IGxlbikge1xuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzEgPj4gMilcbiAgICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KCgoYzEgJiAweDMpIDw8IDQpIHwgKChjMiAmIDB4RjApID4+IDQpKVxuICAgICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKGMyICYgMHhGKSA8PCAyKVxuICAgICAgICBzdHJpbiArPSAnPSdcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGMzID0gc3RyLmNoYXJDb2RlQXQoaSsrKVxuICAgICAgc3RyaW4gKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMxID4+IDIpXG4gICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKChjMSAmIDB4MykgPDwgNCkgfCAoKGMyICYgMHhGMCkgPj4gNCkpXG4gICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoKChjMiAmIDB4RikgPDwgMikgfCAoKGMzICYgMHhDMCkgPj4gNikpXG4gICAgICBzdHJpbiArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzMgJiAweDNGKVxuICAgIH1cbiAgICByZXR1cm4gc3RyaW5cbiAgfVxuXG4gIC8vIGJhc2U2NCDop6PnoIFcbiAgYmFzZTY0RGVjb2RlIChpbnB1dCkge1xuICAgIHZhciBiYXNlNjRFbmNvZGVDaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSdcbiAgICB2YXIgb3V0cHV0ID0gJydcbiAgICB2YXIgY2hyMSA9ICcnXG4gICAgdmFyIGNocjIgPSAnJ1xuICAgIHZhciBjaHIzID0gJydcbiAgICB2YXIgZW5jMSA9ICcnXG4gICAgdmFyIGVuYzIgPSAnJ1xuICAgIHZhciBlbmMzID0gJydcbiAgICB2YXIgZW5jNCA9ICcnXG4gICAgdmFyIGkgPSAwXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOSsvPV0vZywgJycpXG4gICAgd2hpbGUgKGkgPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgIGVuYzEgPSBiYXNlNjRFbmNvZGVDaGFycy5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKVxuICAgICAgZW5jMiA9IGJhc2U2NEVuY29kZUNoYXJzLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpXG4gICAgICBlbmMzID0gYmFzZTY0RW5jb2RlQ2hhcnMuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgIGVuYzQgPSBiYXNlNjRFbmNvZGVDaGFycy5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKVxuICAgICAgY2hyMSA9IChlbmMxIDw8IDIpIHwgKGVuYzIgPj4gNClcbiAgICAgIGNocjIgPSAoKGVuYzIgJiAxNSkgPDwgNCkgfCAoZW5jMyA+PiAyKVxuICAgICAgY2hyMyA9ICgoZW5jMyAmIDMpIDw8IDYpIHwgZW5jNFxuICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIxKVxuICAgICAgaWYgKGVuYzMgIT09IDY0KSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMilcbiAgICAgIH1cbiAgICAgIGlmIChlbmM0ICE9PSA2NCkge1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjMpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnV0ZjhEZWNvZGUob3V0cHV0KVxuICB9XG5cbiAgLy8gdXRmOFxuICB1dGY4RGVjb2RlICh1dGZ0ZXh0KSB7XG4gICAgdmFyIHN0cmluZyA9ICcnXG4gICAgbGV0IGkgPSAwXG4gICAgbGV0IGMgPSAwXG4gICAgbGV0IGMxID0gMFxuICAgIGxldCBjMiA9IDBcbiAgICB3aGlsZSAoaSA8IHV0ZnRleHQubGVuZ3RoKSB7XG4gICAgICBjID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkpXG4gICAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKVxuICAgICAgICBpKytcbiAgICAgIH0gZWxzZSBpZiAoKGMgPiAxOTEpICYmIChjIDwgMjI0KSkge1xuICAgICAgICBjMSA9IHV0ZnRleHQuY2hhckNvZGVBdChpICsgMSlcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMzEpIDw8IDYpIHwgKGMxICYgNjMpKVxuICAgICAgICBpICs9IDJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGMxID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkgKyAxKVxuICAgICAgICBjMiA9IHV0ZnRleHQuY2hhckNvZGVBdChpICsgMilcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMTUpIDw8IDEyKSB8ICgoYzEgJiA2MykgPDwgNikgfCAoYzIgJiA2MykpXG4gICAgICAgIGkgKz0gM1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyaW5nXG4gIH1cbiAgSHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoKVxuICBNZDUgPSBNZDUuaGV4TUQ1XG59XG4iXX0=