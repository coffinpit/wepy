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
      pages: ['pages/start', 'pages/login', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/paycart', 'pages/paybuy', 'pages/rules', 'pages/user', 'pages/collect', 'pages/logistica', 'pages/order'],
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
    };
    _this2.globalData = {
      userInfo: null,
      userLevel: null,
      userHash: null

      // 判断tabbar回退页面
    };
    _this2.pageRoot = false;
    _this2.HttpRequest = new _HttpRequest2.default();
    _this2.Md5 = Md5.hexMD5;

    _this2.use('requestfix');
    _this2.intercept('request', {
      config: function config(p) {
        p.timestamp = +new Date();
        return p;
      },
      success: function success(p) {
        _wepy2.default.hideLoading();
        return p;
      },
      fail: function fail(p) {
        _wepy2.default.hideLoading();
        _wepy2.default.showToast({
          title: '加载失败',
          icon: 'none',
          image: '../image/cancel.png'
        });
        return p;
      },
      complete: function complete(p) {}
    });
    return _this2;
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(page, cb) {
      var that = this;
      if (_wepy2.default.getStorageSync('token')) {
        _wepy2.default.switchTab({
          url: './index'
        });
      }
      _wepy2.default.login({
        success: function success(res) {
          console.log(res.code);
          _wepy2.default.getUserInfo({
            success: function success(data) {
              that.globalData.userInfo = data.userInfo;
              that.HttpRequest.UserLogin({ phone: '13402155751' }).then(function (res) {
                var token = res.data.data.token;
                _wepy2.default.setStorageSync('token', token);
                that.HttpRequest.GetUserInfo({ token: token }).then(function (res) {
                  if (res.data.error === 0) {
                    that.globalData.userLevel = res.data.data.level;
                    that.globalData.userHash = res.data.data.hash;
                  }
                });
                cb && cb(res.userInfo);
              });
            },
            fail: function fail(res) {
              _wepy2.default.showModal({
                title: '警告',
                content: '请检查网络连接，并重新开启授权',
                success: function success(res) {
                  if (res.confirm) {
                    _wepy2.default.openSetting({
                      success: function success(res) {
                        if (res.authSetting['scope.userInfo']) {
                          console.log(res.authSetting['scope.userInfo']);
                        } else {
                          _wepy2.default.showModal({
                            'title': '登录失败'
                          });
                        }
                      },
                      fail: function fail() {
                        _wepy2.default.showModal({
                          'title': '拒绝授权将无法使用小程序部分功能，请重新开启授权'
                        });
                      }
                    });
                  }
                }
              });
            }
          });
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
    key: 'getToken',
    value: function getToken(page) {
      if (_wepy2.default.getStorageSync('token') !== '') {
        return _wepy2.default.getStorageSync('token');
      } else {
        _wepy2.default.showModal({
          title: '获取登录状态失败',
          content: '请点击确认重新登录',
          success: function success(res) {
            if (res.confirm) {
              _wepy2.default.navigateTo({
                url: './login?page=' + page
              });
            }
          }
        });
      }
    }
  }, {
    key: 'resetUserLevel',
    value: function resetUserLevel(hash, token) {
      if (hash !== this.globalData.userHash) {
        var _this = this;
        var data = {
          token: token
        };
        this.HttpRequest.GetUserInfo(data).then(function (res) {
          _this.globalData.userLevel = res.data.data.level;
          _this.$apply();
        });
      }
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
    key: 'showFail',
    value: function showFail() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJwYWdlUm9vdCIsIkh0dHBSZXF1ZXN0IiwiaGV4TUQ1IiwidXNlIiwiaW50ZXJjZXB0IiwicCIsInRpbWVzdGFtcCIsIkRhdGUiLCJzdWNjZXNzIiwiaGlkZUxvYWRpbmciLCJmYWlsIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJjb21wbGV0ZSIsInRlc3RBc3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwicGFnZSIsImNiIiwidGhhdCIsImdldFN0b3JhZ2VTeW5jIiwic3dpdGNoVGFiIiwidXJsIiwibG9naW4iLCJyZXMiLCJjb2RlIiwiZ2V0VXNlckluZm8iLCJVc2VyTG9naW4iLCJwaG9uZSIsInRoZW4iLCJ0b2tlbiIsInNldFN0b3JhZ2VTeW5jIiwiR2V0VXNlckluZm8iLCJlcnJvciIsImxldmVsIiwiaGFzaCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwib3BlblNldHRpbmciLCJhdXRoU2V0dGluZyIsIm5hdmlnYXRlVG8iLCJfdGhpcyIsIiRhcHBseSIsInNob3dMb2FkaW5nIiwiZm9ybWF0cyIsInplcm8iLCJ2YWx1ZSIsIm15RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluaXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2hlcyIsIlkiLCJtIiwiZCIsIkgiLCJpIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsTUFBTUMsUUFBUSxlQUFSLENBQVY7O0FBRUEsSUFBTUMsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7OztBQWtFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFdBL0RmQyxNQStEZSxHQS9ETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxjQUhLLEVBSUwsYUFKSyxFQUtMLFlBTEssRUFNTCxjQU5LLEVBT0wsZ0JBUEssRUFRTCxjQVJLLEVBU0wsZUFUSyxFQVVMLGNBVkssRUFXTCxlQVhLLEVBWUwsY0FaSyxFQWFMLGFBYkssRUFjTCxZQWRLLEVBZUwsZUFmSyxFQWdCTCxpQkFoQkssRUFpQkwsYUFqQkssQ0FEQTtBQW9CUEMsY0FBUTtBQUNOQyw2QkFBcUIsTUFEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQXBCRDtBQTBCUEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOQyx5QkFBaUIsU0FIWDtBQUlOQyxjQUFNLENBQUM7QUFDTEMsb0JBQVUsYUFETDtBQUVMQyxvQkFBVSx5QkFGTDtBQUdMQyw0QkFBa0Isd0JBSGI7QUFJTEMsZ0JBQU07QUFKRCxTQUFELEVBS0g7QUFDREgsb0JBQVUsZ0JBRFQ7QUFFREMsb0JBQVUsNEJBRlQ7QUFHREMsNEJBQWtCLDJCQUhqQjtBQUlEQyxnQkFBTTtBQUpMLFNBTEcsRUFVSDtBQUNESCxvQkFB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QSxLQUFQO0FBQ0QsT0FMRDtBQU1BLFVBQUlDLFNBQVNuRCxZQUFZLElBQUlDLElBQUosQ0FBU0QsU0FBVCxDQUFaLEdBQWtDLElBQUlDLElBQUosRUFBL0M7QUFDQSxVQUFJbUQsT0FBT0QsT0FBT0UsV0FBUCxFQUFYO0FBQ0EsVUFBSUMsUUFBUUwsS0FBS0UsT0FBT0ksUUFBUCxLQUFvQixDQUF6QixDQUFaO0FBQ0EsVUFBSUMsTUFBTVAsS0FBS0UsT0FBT00sT0FBUCxFQUFMLENBQVY7QUFDQSxVQUFJQyxPQUFPVCxLQUFLRSxPQUFPUSxRQUFQLEVBQUwsQ0FBWDtBQUNBLFVBQUlDLFNBQVNYLEtBQUtFLE9BQU9VLFVBQVAsRUFBTCxDQUFiO0FBQ0EsVUFBSUMsU0FBU2IsS0FBS0UsT0FBT1ksVUFBUCxFQUFMLENBQWI7QUFDQSxhQUFPZixRQUFRZ0IsT0FBUixDQUFnQixlQUFoQixFQUFpQyxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pELGVBQVE7QUFDTkMsYUFBR2QsSUFERztBQUVOZSxhQUFHYixLQUZHO0FBR05jLGFBQUdaLEdBSEc7QUFJTmEsYUFBR1gsSUFKRztBQUtOWSxhQUFHVixNQUxHO0FBTU5qRCxhQUFHbUQ7QUFORyxTQUFELENBT0pHLE9BUEksQ0FBUDtBQVFELE9BVE0sQ0FBUDtBQVVEOzs7O0VBM08wQixlQUFLTSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIdHRwUmVxdWVzdCBmcm9tICcuL3NlcnZpY2UvSHR0cFJlcXVlc3QnXG52YXIgTWQ1ID0gcmVxdWlyZSgnLi9zZXJ2aWNlL21kNScpXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9zdGFydCcsXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2NhcnQnLFxuICAgICAgJ3BhZ2VzL3N5c3RlbScsXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL3NlYXJjaCcsXG4gICAgICAncGFnZXMvYWRkcmVzcycsXG4gICAgICAncGFnZXMvbmV3QWRkJyxcbiAgICAgICdwYWdlcy9wYXljYXJ0JyxcbiAgICAgICdwYWdlcy9wYXlidXknLFxuICAgICAgJ3BhZ2VzL3J1bGVzJyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9jb2xsZWN0JyxcbiAgICAgICdwYWdlcy9sb2dpc3RpY2EnLFxuICAgICAgJ3BhZ2VzL29yZGVyJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZjNWU0MycsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgY29sb3I6ICcjMjgyNjI2JyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmM1ZTQ0JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY4ZjgnLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvaW5kZXgtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfpppbpobUnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2F0ZWdvcnknLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL2NhdGVnb3J5LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn5YiG57G7J1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NhcnQnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL2NhcnQtZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2FydC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9pidcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS91c2VyLWRlZmF1bHQucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlL3VzZXItYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgICB9XVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgdXNlckxldmVsOiBudWxsLFxuICAgIHVzZXJIYXNoOiBudWxsXG4gIH1cblxuICAvLyDliKTmlq10YWJiYXLlm57pgIDpobXpnaJcbiAgcGFnZVJvb3QgPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHAudGltZXN0YW1wID0gK25ldyBEYXRlKClcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSAocCkge1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cbiAgZ2V0VXNlckluZm8ocGFnZSwgY2IpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSBkYXRhLnVzZXJJbmZvXG4gICAgICAgICAgICB0aGF0Lkh0dHBSZXF1ZXN0LlVzZXJMb2dpbih7cGhvbmU6ICcxMzQwMjE1NTc1MSd9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICB0aGF0Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsIChyZXMpIHtcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICforablkYonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6l77yM5bm26YeN5paw5byA5ZCv5o6I5p2DJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgd2VweS5vcGVuU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ+eZu+W9leWksei0pSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ+aLkue7neaOiOadg+WwhuaXoOazleS9v+eUqOWwj+eoi+W6j+mDqOWIhuWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnZXRUb2tlbiAocGFnZSkge1xuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpICE9PSAnJykge1xuICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICB9IGVsc2Uge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+iOt+WPlueZu+W9leeKtuaAgeWksei0pScsXG4gICAgICAgIGNvbnRlbnQ6ICfor7fngrnlh7vnoa7orqTph43mlrDnmbvlvZUnLFxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL2xvZ2luP3BhZ2U9JyArIHBhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4pIHtcbiAgICBpZiAoaGFzaCAhPT0gdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgc2hvd0ZhaWwgKCkge1xuICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295aSx6LSlJyxcbiAgICAgIGljb246ICdub25lJyxcbiAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICB9KVxuICB9XG4gIGRhdGVGb3JtYXQgKHRpbWVzdGFtcCwgZm9ybWF0cykge1xuICAgIGZvcm1hdHMgPSBmb3JtYXRzIHx8ICdZLW0tZCdcbiAgICB2YXIgemVybyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlIDwgMTApIHtcbiAgICAgICAgcmV0dXJuICcwJyArIHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgdmFyIG15RGF0ZSA9IHRpbWVzdGFtcCA/IG5ldyBEYXRlKHRpbWVzdGFtcCkgOiBuZXcgRGF0ZSgpXG4gICAgdmFyIHllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHZhciBtb250aCA9IHplcm8obXlEYXRlLmdldE1vbnRoKCkgKyAxKVxuICAgIHZhciBkYXkgPSB6ZXJvKG15RGF0ZS5nZXREYXRlKCkpXG4gICAgdmFyIGhvdXIgPSB6ZXJvKG15RGF0ZS5nZXRIb3VycygpKVxuICAgIHZhciBtaW5pdGUgPSB6ZXJvKG15RGF0ZS5nZXRNaW51dGVzKCkpXG4gICAgdmFyIHNlY29uZCA9IHplcm8obXlEYXRlLmdldFNlY29uZHMoKSlcbiAgICByZXR1cm4gZm9ybWF0cy5yZXBsYWNlKC9ZfG18ZHxIfGl8cy9pZywgZnVuY3Rpb24gKG1hdGNoZXMpIHtcbiAgICAgIHJldHVybiAoe1xuICAgICAgICBZOiB5ZWFyLFxuICAgICAgICBtOiBtb250aCxcbiAgICAgICAgZDogZGF5LFxuICAgICAgICBIOiBob3VyLFxuICAgICAgICBpOiBtaW5pdGUsXG4gICAgICAgIHM6IHNlY29uZFxuICAgICAgfSlbbWF0Y2hlc11cbiAgICB9KVxuICB9XG4gIEh0dHBSZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KClcbiAgTWQ1ID0gTWQ1LmhleE1ENVxufVxuIl19