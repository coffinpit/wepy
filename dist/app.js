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
        'cellphones': '',
        'tags': '',
        'custom_fields': {
          'TextField_13010': 'test'
        }
      };
      if (this.globalData.userLevel === 0) {
        messageObj.level = 'normal';
      } else if (this.globalData.userLevel === 1) {
        messageObj.level = 'vip';
      }
      messageObj.cellphones = [['', _wepy2.default.getStorageSync('phone')]];
      // messageObj.description = pageDetail
      messageObj.tags = pageDetail + ',' + tags;
      // messageObj.custom_fields = {
      //   'TextField_13010': 'test'
      // }
      console.log(JSON.stringify(messageObj));
      return JSON.stringify(messageObj);
    }
  }, {
    key: 'getBusiness',
    value: function getBusiness(title) {
      var noteObj = {
        'title': title
      };
      console.log(JSON.stringify(noteObj));
      return JSON.stringify(noteObj);
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJMZXZlbCIsInVzZXJIYXNoIiwiY29kZSIsIm5pY2tOYW1lIiwidXNlckltYWdlIiwibWlzc1Rva2VuIiwiZ2V0VG9rZW5UaW1lIiwiaHR0cElkIiwicGFnZVJvb3QiLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsImRhdGEiLCJlcnJvciIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzaG93RmFpbCIsImZhaWwiLCJjb21wbGV0ZSIsImxlbmd0aCIsInB1c2giLCJzaGlmdCIsImNiIiwibG9naW4iLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImUiLCJyZWZyZW5jZUNvZGUiLCJqc2NvZGUiLCJlbmNyeXB0ZWREYXRhIiwiZGV0YWlsIiwiaXYiLCJyZWZlcmVuY2VJZCIsIlNlbmRDb2RlIiwidGhlbiIsInBob25lTnVtYmVyIiwicGhvbmUiLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJVc2VyTG9naW4iLCJ0b2tlbiIsInRpbWVPdXQiLCJnZXRVc2VyTGV2ZWwiLCJub3dUaW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRTdG9yYWdlU3luYyIsInJlZnJlbmNlIiwibmF2aWdhdGVUbyIsInVybCIsInJlZnJlc2hUb2tlbiIsInJlcXVlc3RUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJsZXZlbCIsImhhc2giLCJ2aXBFbmQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJJZCIsImdldFVzZXJJbmZvIiwic2hvd0xvYWRpbmciLCJoaWRlTG9hZGluZyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwidGltZXN0YW1wIiwiZm9ybWF0cyIsInplcm8iLCJ2YWx1ZSIsIm15RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwicyIsInN0ciIsInJhbmdlcyIsIlJlZ0V4cCIsImpvaW4iLCJmaWx0ZXJlbW9qaSIsImF2YXRhclVybCIsInBhZ2VEZXRhaWwiLCJ0YWdzIiwibWVzc2FnZU9iaiIsImNlbGxwaG9uZXMiLCJKU09OIiwic3RyaW5naWZ5Iiwibm90ZU9iaiIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7QUFIQTtBQUNBOztBQUdBLElBQUlBLE1BQU1DLFFBQVEsZUFBUixDQUFWOztBQUVBO0FBQ0E7Ozs7O0FBNEVFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsV0F6RWZDLE1BeUVlLEdBekVOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGNBSEssRUFJTCxhQUpLLEVBS0wsWUFMSyxFQU1MLGNBTkssRUFPTCxnQkFQSyxFQVFMLGNBUkssRUFTTCxlQVRLLEVBVUwsY0FWSyxFQVdMLGVBWEssRUFZTCxlQVpLLEVBYUwsY0FiSyxFQWNMLGFBZEssRUFlTCxZQWZLLEVBZ0JMLGVBaEJLLEVBaUJMLGlCQWpCSyxFQWtCTCxh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QztBQUdmLGdCQUFRLEVBSE87QUFJZix5QkFBaUI7QUFDZiw2QkFBbUI7QUFESjtBQUpGLE9BQWpCO0FBUUEsVUFBSSxLQUFLaEgsVUFBTCxDQUFnQkUsU0FBaEIsS0FBOEIsQ0FBbEMsRUFBcUM7QUFDbkM4RyxtQkFBVzNDLEtBQVgsR0FBbUIsUUFBbkI7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLckUsVUFBTCxDQUFnQkUsU0FBaEIsS0FBOEIsQ0FBbEMsRUFBcUM7QUFDMUM4RyxtQkFBVzNDLEtBQVgsR0FBbUIsS0FBbkI7QUFDRDtBQUNEMkMsaUJBQVdDLFVBQVgsR0FBd0IsQ0FBQyxDQUFDLEVBQUQsRUFBSyxlQUFLcEQsY0FBTCxDQUFvQixPQUFwQixDQUFMLENBQUQsQ0FBeEI7QUFDQTtBQUNBbUQsaUJBQVdELElBQVgsR0FBa0JELGFBQWEsR0FBYixHQUFtQkMsSUFBckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTFGLGNBQVFDLEdBQVIsQ0FBWTRGLEtBQUtDLFNBQUwsQ0FBZUgsVUFBZixDQUFaO0FBQ0EsYUFBT0UsS0FBS0MsU0FBTCxDQUFlSCxVQUFmLENBQVA7QUFDRDs7O2dDQUNZL0UsSyxFQUFPO0FBQ2xCLFVBQUltRixVQUFVO0FBQ1osaUJBQVNuRjtBQURHLE9BQWQ7QUFHQVosY0FBUUMsR0FBUixDQUFZNEYsS0FBS0MsU0FBTCxDQUFlQyxPQUFmLENBQVo7QUFDQSxhQUFPRixLQUFLQyxTQUFMLENBQWVDLE9BQWYsQ0FBUDtBQUNEOzs7O0VBblgwQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuLy8gaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuLy8gaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG52YXIgTWQ1ID0gcmVxdWlyZSgnLi9zZXJ2aWNlL21kNScpXG5cbi8vIGNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuLy8gc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2NhcnQnLFxuICAgICAgJ3BhZ2VzL3N5c3RlbScsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvbmV3QWRkJyxcbiAgICAgICdwYWdlcy9lZGl0QWRkJyxcbiAgICAgICdwYWdlcy9wYXljYXJ0JyxcbiAgICAgICdwYWdlcy9wYXlidXknLFxuICAgICAgJ3BhZ2VzL3J1bGVzJyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jb2xsZWN0JyxcbiAgICAgICdwYWdlcy9sb2dpc3RpY2EnLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9vcmRlckRldGFpbCcsXG4gICAgICAncGFnZXMvaW52b2ljZScsXG4gICAgICAncGFnZXMvYXBwbHlWaXAnLFxuICAgICAgJ3BhZ2VzL3NlcnZpY2UnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNlYzNkM2EnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGNvbG9yOiAnIzI4MjYyNicsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2VjM2QzYScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmOGY4JyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2luZGV4LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2luZGV4LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6aaW6aG1J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXRlZ29yeS1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+WIhuexuydcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXJ0JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9jYXJ0LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhcnQtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfotK3nianovaYnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdXNlcicsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvdXNlci1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS91c2VyLWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHVzZXJMZXZlbDogbnVsbCxcbiAgICB1c2VySGFzaDogbnVsbCxcbiAgICBjb2RlOiBudWxsLFxuICAgIG5pY2tOYW1lOiBudWxsLFxuICAgIHVzZXJJbWFnZTogbnVsbFxuICB9XG5cbiAgbWlzc1Rva2VuID0gZmFsc2VcbiAgZ2V0VG9rZW5UaW1lID0gMFxuICBodHRwSWQgPSBbXVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyAocCkge1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmVycm9yICYmIHAuZGF0YS5lcnJvciA9PT0gLTEgJiYgcC5kYXRhLm1zZyA9PT0gJ21pc3MgdG9rZW4nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWlzcyB0b2tlbicpXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSsrXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIHRoaXMubWlzc1Rva2VuID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHAuZGF0YS5lcnJvciAmJiBwLmRhdGEuZXJyb3IgPT09IC0yKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsKHAuZGF0YS5tc2cpXG4gICAgICAgICAgfSBlbHNlIGlmIChwLmRhdGEuZXJyb3IgJiYgcC5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1pc3NUb2tlbiA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5taXNzVG9rZW4gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgICAgIHRoaXMuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwXG4gICAgICB9LFxuICAgICAgZmFpbCAocCkge1xuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlIChwKSB7XG4gICAgICAgIC8vIOiusOW9lXJlcXVlc3QgaW5mb1xuICAgICAgICBpZiAocC5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAocC5kYXRhLmh0dHBJZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaHR0cElkLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnB1c2gocC5kYXRhLmh0dHBJZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaHR0cElkLnNoaWZ0KClcbiAgICAgICAgICAgICAgdGhpcy5odHRwSWQucHVzaChwLmRhdGEuaHR0cElkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyDliKTmlq10YWJiYXLlm57pgIDpobXpnaJcbiAgcGFnZVJvb3QgPSBmYWxzZVxuXG4gIG9uTGF1bmNoKCkge31cblxuICBnZXRMb2dpbiAoY2IpIHtcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYihyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBY29kZVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn572R57uc6L+e5o6l5aSx6LSlJyxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRVc2VySW5mbyhlLCBjb2RlLCByZWZyZW5jZUNvZGUsIGNiKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICBjb25zb2xlLmxvZyhlLCBjb2RlLCByZWZyZW5jZUNvZGUpXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBqc2NvZGU6IGNvZGUsXG4gICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgaXY6IGUuZGV0YWlsLml2LFxuICAgICAgcmVmZXJlbmNlSWQ6IHJlZnJlbmNlQ29kZVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMuSHR0cFJlcXVlc3QuU2VuZENvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHBob25lTnVtYmVyID0gcmVzLmRhdGEuZGF0YS5waG9uZVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwaG9uZScsIHBob25lTnVtYmVyKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIC8vIHZhciBkYXRhID0ge1xuICAgICAgICAvLyAgIHBob25lOiBwaG9uZU51bWJlclxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHRoaXMucmVxdWVzdFRva2VuKGRhdGEsIGNiKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6lJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICAvLyDlt7LmnInmiYvmnLrlj7fojrflj5Z0b2tlblxuICBhc3luYyByZXF1ZXN0VG9rZW4gKGRhdGEsIGNiLCBmYWlsKSB7XG4gICAgYXdhaXQgdGhpcy5IdHRwUmVxdWVzdC5Vc2VyTG9naW4oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICB2YXIgdGltZU91dCA9IHJlcy5kYXRhLmRhdGEudGltZU91dFxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JywgdGltZU91dClcbiAgICAgICAgLy8g6K6+572uZ2xvYmFs55qEdXNlciBsZXZlbCDlkowgaGFzaFxuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCh0b2tlbiwgKCkgPT4ge1xuICAgICAgICAgIGNiICYmIGNiKHRva2VuKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBmYWlsICYmIGZhaWwoKVxuICAgIH0pXG4gIH1cbiAgLy8g5Yik5patdG9rZW7mmK/lkKbov4fmnJ9cbiAgcmVmcmVzaFRva2VuICgpIHtcbiAgICAvLyDliKTmlq10b2tlbuaYr+WQpui/h+acnyDlpoLmnpzmsqHov4fmnJ/nm7TmjqXov5Tlm550b2tlbuWAvFxuICAgIHZhciBub3dUaW1lID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApXG4gICAgdmFyIHRpbWVPdXQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JylcbiAgICBpZiAobm93VGltZSA+IHRpbWVPdXQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8vIOi/lOWbnuW9k+WJjXRva2VuXG4gIGdldFRva2VuIChlcnJvciwgcmVmcmVuY2UpIHtcbiAgICB2YXIgcmVmcmVuY2VDb2RlID0gJydcbiAgICBpZiAocmVmcmVuY2UpIHtcbiAgICAgIHJlZnJlbmNlQ29kZSA9IHJlZnJlbmNlXG4gICAgfVxuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpID09PSAnJykge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi9sb2dpbj9yZWZyZW5jZUNvZGU9JyArIHJlZnJlbmNlQ29kZVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnJlZnJlc2hUb2tlbigpIHx8IGVycm9yID09PSAtMSkge1xuICAgICAgICAvLyB0b2tlbui/h+acnyDph43mlrDlj5HpgIHor7fmsYLojrflj5bmlrDnmoR0b2tlblxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdFRva2VuKGRhdGEpXG4gICAgICAgIHJldHVybiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOiOt+WPliB1c2VyIGxldmVsIOWSjCBoYXNoXG4gIGdldFVzZXJMZXZlbCAodG9rZW4sIGNiKSB7XG4gICAgdmFyIF90aGlzID0gdGhpc1xuICAgIHRoaXMuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oe3Rva2VuOiB0b2tlbn0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudXNlckxldmVsID0gcmVzLmRhdGEuZGF0YS5sZXZlbFxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoID0gcmVzLmRhdGEuZGF0YS5oYXNoXG4gICAgICAgIF90aGlzLmdsb2JhbERhdGEudmlwRW5kID0gcmVzLmRhdGEuZGF0YS52aXBFbmRcbiAgICAgICAgX3RoaXMuZ2xvYmFsRGF0YS5yZWR1Y3Rpb24gPSByZXMuZGF0YS5kYXRhLnJlZHVjdGlvblxuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLm1lbWJlcklkID0gcmVzLmRhdGEuZGF0YS5tZW1iZXJJZFxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICAvLyDliKTmlq3lvZPliY11c2VyIGhhc2jmmK/lkKbpnIDopoHph43nva5cbiAgcmVzZXRVc2VyTGV2ZWwgKGhhc2gsIHRva2VuKSB7XG4gICAgaWYgKGhhc2ggIT09IHRoaXMuZ2xvYmFsRGF0YS51c2VySGFzaCkge1xuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwodG9rZW4pXG4gICAgfVxuICB9XG4gIC8vIOWtmOeUqOaIt2dsb2JhbOS/oeaBr1xuICBnZXRVc2VyIChjYikge1xuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5nbG9iYWxEYXRhKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBzaG93TG9hZGluZyAoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICBpY29uOiAnbG9hZGluZydcbiAgICB9KVxuICB9XG4gIGhpZGVMb2FkaW5nICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgfVxuICBzaG93RmFpbCAoZXJyb3IpIHtcbiAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogZXJyb3IgfHwgJ+WKoOi9veWksei0pScsXG4gICAgICBpY29uOiAnbm9uZScsXG4gICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgfSlcbiAgfVxuICBwYXlGYWlsICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5pSv5LuY5aSx6LSlJyxcbiAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBkaXNhYmxlQXBpICgpIHtcbiAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So6K+l5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgIH0pXG4gIH1cbiAgLy8g5pe26Ze05oiz5qC85byP5YyWXG4gIGRhdGVGb3JtYXQgKHRpbWVzdGFtcCwgZm9ybWF0cykge1xuICAgIGZvcm1hdHMgPSBmb3JtYXRzIHx8ICdZLW0tZCdcbiAgICB2YXIgemVybyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlIDwgMTApIHtcbiAgICAgICAgcmV0dXJuICcwJyArIHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgdmFyIG15RGF0ZSA9IHRpbWVzdGFtcCA/IG5ldyBEYXRlKHRpbWVzdGFtcCkgOiBuZXcgRGF0ZSgpXG4gICAgdmFyIHllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHZhciBtb250aCA9IHplcm8obXlEYXRlLmdldE1vbnRoKCkgKyAxKVxuICAgIHZhciBkYXkgPSB6ZXJvKG15RGF0ZS5nZXREYXRlKCkpXG4gICAgdmFyIGhvdXIgPSB6ZXJvKG15RGF0ZS5nZXRIb3VycygpKVxuICAgIHZhciBtaW5pdGUgPSB6ZXJvKG15RGF0ZS5nZXRNaW51dGVzKCkpXG4gICAgdmFyIHNlY29uZCA9IHplcm8obXlEYXRlLmdldFNlY29uZHMoKSlcbiAgICByZXR1cm4gZm9ybWF0cy5yZXBsYWNlKC9ZfG18ZHxIfGl8cy9pZywgZnVuY3Rpb24gKG1hdGNoZXMpIHtcbiAgICAgIHJldHVybiAoe1xuICAgICAgICBZOiB5ZWFyLFxuICAgICAgICBtOiBtb250aCxcbiAgICAgICAgZDogZGF5LFxuICAgICAgICBIOiBob3VyLFxuICAgICAgICBpOiBtaW5pdGUsXG4gICAgICAgIHM6IHNlY29uZFxuICAgICAgfSlbbWF0Y2hlc11cbiAgICB9KVxuICB9XG4gIC8vIOi/h+a7pGVtb2ppXG4gIGZpbHRlcmVtb2ppIChzdHIpIHtcbiAgICB2YXIgcmFuZ2VzID0gW1xuICAgICAgJ1xcdWQ4M2NbXFx1ZGYwMC1cXHVkZmZmXScsXG4gICAgICAnXFx1ZDgzZFtcXHVkYzAwLVxcdWRlNGZdJyxcbiAgICAgICdcXHVkODNkW1xcdWRlODAtXFx1ZGVmZl0nXG4gICAgXVxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHJhbmdlcy5qb2luKCd8JyksICdnJyksICcnKVxuICB9XG4gIC8vIOWuouacjea2iOaBr1xuICBnZXRVc2VyTmFtZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyZW1vamkodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvLm5pY2tOYW1lKVxuICB9XG4gIGdldFVzZXJBdmF0YXIgKCkge1xuICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm8uYXZhdGFyVXJsXG4gIH1cbiAgZ2V0TWVzc2FnZSAocGFnZURldGFpbCwgdGFncykge1xuICAgIHZhciBtZXNzYWdlT2JqID0ge1xuICAgICAgJ2xldmVsJzogJycsXG4gICAgICAnY2VsbHBob25lcyc6ICcnLFxuICAgICAgJ3RhZ3MnOiAnJyxcbiAgICAgICdjdXN0b21fZmllbGRzJzoge1xuICAgICAgICAnVGV4dEZpZWxkXzEzMDEwJzogJ3Rlc3QnXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICBtZXNzYWdlT2JqLmxldmVsID0gJ25vcm1hbCdcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIG1lc3NhZ2VPYmoubGV2ZWwgPSAndmlwJ1xuICAgIH1cbiAgICBtZXNzYWdlT2JqLmNlbGxwaG9uZXMgPSBbWycnLCB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXV1cbiAgICAvLyBtZXNzYWdlT2JqLmRlc2NyaXB0aW9uID0gcGFnZURldGFpbFxuICAgIG1lc3NhZ2VPYmoudGFncyA9IHBhZ2VEZXRhaWwgKyAnLCcgKyB0YWdzXG4gICAgLy8gbWVzc2FnZU9iai5jdXN0b21fZmllbGRzID0ge1xuICAgIC8vICAgJ1RleHRGaWVsZF8xMzAxMCc6ICd0ZXN0J1xuICAgIC8vIH1cbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtZXNzYWdlT2JqKSlcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWVzc2FnZU9iailcbiAgfVxuICBnZXRCdXNpbmVzcyAodGl0bGUpIHtcbiAgICB2YXIgbm90ZU9iaiA9IHtcbiAgICAgICd0aXRsZSc6IHRpdGxlXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5vdGVPYmopKVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShub3RlT2JqKVxuICB9XG4gIEh0dHBSZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KClcbiAgTWQ1ID0gTWQ1LmhleE1ENVxufVxuIl19