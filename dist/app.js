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
      pages: ['pages/start', 'pages/login', 'pages/detail', 'pages/index', 'pages/cart', 'pages/system', 'pages/category', 'pages/search', 'pages/address', 'pages/newAdd', 'pages/order', 'pages/rules', 'pages/user', 'pages/logistica'],
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
    };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJNZDUiLCJyZXF1aXJlIiwic3RvcmUiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJ0ZXh0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckxldmVsIiwidXNlckhhc2giLCJIdHRwUmVxdWVzdCIsImhleE1ENSIsInVzZSIsImludGVyY2VwdCIsInAiLCJ0aW1lc3RhbXAiLCJEYXRlIiwic3VjY2VzcyIsImhpZGVMb2FkaW5nIiwiZmFpbCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiY29tcGxldGUiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInBhZ2UiLCJjYiIsInRoYXQiLCJnZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInVybCIsImxvZ2luIiwicmVzIiwiY29kZSIsImdldFVzZXJJbmZvIiwiVXNlckxvZ2luIiwicGhvbmUiLCJ0aGVuIiwidG9rZW4iLCJzZXRTdG9yYWdlU3luYyIsIkdldFVzZXJJbmZvIiwiZXJyb3IiLCJsZXZlbCIsImhhc2giLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsIm9wZW5TZXR0aW5nIiwiYXV0aFNldHRpbmciLCJuYXZpZ2F0ZVRvIiwiX3RoaXMiLCIkYXBwbHkiLCJzaG93TG9hZGluZyIsImZvcm1hdHMiLCJ6ZXJvIiwidmFsdWUiLCJteURhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbml0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIiwicmVwbGFjZSIsIm1hdGNoZXMiLCJZIiwibSIsImQiLCJIIiwiaSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLE1BQU1DLFFBQVEsZUFBUixDQUFWOztBQUVBLElBQU1DLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUE0REUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxXQXpEZkMsTUF5RGUsR0F6RE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsY0FISyxFQUlMLGFBSkssRUFLTCxZQUxLLEVBTUwsY0FOSyxFQU9MLGdCQVBLLEVBUUwsY0FSSyxFQVNMLGVBVEssRUFVTCxjQVZLLEVBV0wsYUFYSyxFQVlMLGFBWkssRUFhTCxZQWJLLEVBY0wsaUJBZEssQ0FEQTtBQWlCUEMsY0FBUTtBQUNOQyw2QkFBcUIsTUFEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQWpCRDtBQXVCUEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOQyx5QkFBaUIsU0FIWDtBQUlOQyxjQUFNLENBQUM7QUFDTEMsb0JBQVUsYUFETDtBQUVMQyxvQkFBVSx5QkFGTDtBQUdMQyw0QkFBa0Isd0JBSGI7QUFJTEMsZ0JBQU07QUFKRCxTQUFELEVBS0g7QUFDREgsb0JBQVUsZ0JBRFQ7QUFFREMsb0JBQVUsNEJBRlQ7QUFHREMsNEJBQWtCLDJCQUhqQjtBQUlEQyxnQkFBTTtBQUpMLFNBTEcsRUFVSDtBQUNESCxvQkFBVSxZQURUO0FBRURDLG9CQUFVLHdCQUZUO0FBR0RDLDRCQUFrQix1QkFIakI7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QyxJQUFKLEVBQS9DO0FBQ0EsVUFBSW1ELE9BQU9ELE9BQU9FLFdBQVAsRUFBWDtBQUNBLFVBQUlDLFFBQVFMLEtBQUtFLE9BQU9JLFFBQVAsS0FBb0IsQ0FBekIsQ0FBWjtBQUNBLFVBQUlDLE1BQU1QLEtBQUtFLE9BQU9NLE9BQVAsRUFBTCxDQUFWO0FBQ0EsVUFBSUMsT0FBT1QsS0FBS0UsT0FBT1EsUUFBUCxFQUFMLENBQVg7QUFDQSxVQUFJQyxTQUFTWCxLQUFLRSxPQUFPVSxVQUFQLEVBQUwsQ0FBYjtBQUNBLFVBQUlDLFNBQVNiLEtBQUtFLE9BQU9ZLFVBQVAsRUFBTCxDQUFiO0FBQ0EsYUFBT2YsUUFBUWdCLE9BQVIsQ0FBZ0IsZUFBaEIsRUFBaUMsVUFBVUMsT0FBVixFQUFtQjtBQUN6RCxlQUFRO0FBQ05DLGFBQUdkLElBREc7QUFFTmUsYUFBR2IsS0FGRztBQUdOYyxhQUFHWixHQUhHO0FBSU5hLGFBQUdYLElBSkc7QUFLTlksYUFBR1YsTUFMRztBQU1OakQsYUFBR21EO0FBTkcsU0FBRCxDQU9KRyxPQVBJLENBQVA7QUFRRCxPQVRNLENBQVA7QUFVRDs7OztFQXJPMEIsZUFBS00sRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJ1xuXG5pbXBvcnQgSHR0cFJlcXVlc3QgZnJvbSAnLi9zZXJ2aWNlL0h0dHBSZXF1ZXN0J1xudmFyIE1kNSA9IHJlcXVpcmUoJy4vc2VydmljZS9tZDUnKVxuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcbnNldFN0b3JlKHN0b3JlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvc3RhcnQnLFxuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9jYXJ0JyxcbiAgICAgICdwYWdlcy9zeXN0ZW0nLFxuICAgICAgJ3BhZ2VzL2NhdGVnb3J5JyxcbiAgICAgICdwYWdlcy9zZWFyY2gnLFxuICAgICAgJ3BhZ2VzL2FkZHJlc3MnLFxuICAgICAgJ3BhZ2VzL25ld0FkZCcsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL3J1bGVzJyxcbiAgICAgICdwYWdlcy91c2VyJyxcbiAgICAgICdwYWdlcy9sb2dpc3RpY2EnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmM1ZTQzJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyMyODI2MjYnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmYzVlNDQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjhmOCcsXG4gICAgICBsaXN0OiBbe1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZS9pbmRleC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9pbmRleC1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+mmlumhtSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jYXRlZ29yeScsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvY2F0ZWdvcnktYWN0aXZlLnBuZycsXG4gICAgICAgIHRleHQ6ICfliIbnsbsnXG4gICAgICB9LCB7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2FydCcsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2UvY2FydC1kZWZhdWx0LnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZS9jYXJ0LWFjdGl2ZS5wbmcnLFxuICAgICAgICB0ZXh0OiAn6LSt54mp6L2mJ1xuICAgICAgfSwge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXInLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlL3VzZXItZGVmYXVsdC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2UvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICB1c2VyTGV2ZWw6IG51bGwsXG4gICAgdXNlckhhc2g6IG51bGxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnIChwKSB7XG4gICAgICAgIHAudGltZXN0YW1wID0gK25ldyBEYXRlKClcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIChwKSB7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICByZXR1cm4gcFxuICAgICAgfSxcbiAgICAgIGZhaWwgKHApIHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSAocCkge1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cbiAgZ2V0VXNlckluZm8ocGFnZSwgY2IpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSBkYXRhLnVzZXJJbmZvXG4gICAgICAgICAgICB0aGF0Lkh0dHBSZXF1ZXN0LlVzZXJMb2dpbih7cGhvbmU6ICcxMzQwMjE1NTc1MSd9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICB0aGF0Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKHt0b2tlbjogdG9rZW59KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckhhc2ggPSByZXMuZGF0YS5kYXRhLmhhc2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsIChyZXMpIHtcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICforablkYonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn6K+35qOA5p+l572R57uc6L+e5o6l77yM5bm26YeN5paw5byA5ZCv5o6I5p2DJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgd2VweS5vcGVuU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ+eZu+W9leWksei0pSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ+aLkue7neaOiOadg+WwhuaXoOazleS9v+eUqOWwj+eoi+W6j+mDqOWIhuWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zov57mjqXlpLHotKUnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnZXRUb2tlbiAocGFnZSkge1xuICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpICE9PSAnJykge1xuICAgICAgcmV0dXJuIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICB9IGVsc2Uge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+iOt+WPlueZu+W9leeKtuaAgeWksei0pScsXG4gICAgICAgIGNvbnRlbnQ6ICfor7fngrnlh7vnoa7orqTph43mlrDnmbvlvZUnLFxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL2xvZ2luP3BhZ2U9JyArIHBhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICByZXNldFVzZXJMZXZlbCAoaGFzaCwgdG9rZW4pIHtcbiAgICBpZiAoaGFzaCAhPT0gdGhpcy5nbG9iYWxEYXRhLnVzZXJIYXNoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9IHJlcy5kYXRhLmRhdGEubGV2ZWxcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHNob3dMb2FkaW5nICgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgIH0pXG4gIH1cbiAgc2hvd0ZhaWwgKCkge1xuICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295aSx6LSlJyxcbiAgICAgIGljb246ICdub25lJyxcbiAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICB9KVxuICB9XG4gIGRhdGVGb3JtYXQgKHRpbWVzdGFtcCwgZm9ybWF0cykge1xuICAgIGZvcm1hdHMgPSBmb3JtYXRzIHx8ICdZLW0tZCdcbiAgICB2YXIgemVybyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlIDwgMTApIHtcbiAgICAgICAgcmV0dXJuICcwJyArIHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgdmFyIG15RGF0ZSA9IHRpbWVzdGFtcCA/IG5ldyBEYXRlKHRpbWVzdGFtcCkgOiBuZXcgRGF0ZSgpXG4gICAgdmFyIHllYXIgPSBteURhdGUuZ2V0RnVsbFllYXIoKVxuICAgIHZhciBtb250aCA9IHplcm8obXlEYXRlLmdldE1vbnRoKCkgKyAxKVxuICAgIHZhciBkYXkgPSB6ZXJvKG15RGF0ZS5nZXREYXRlKCkpXG4gICAgdmFyIGhvdXIgPSB6ZXJvKG15RGF0ZS5nZXRIb3VycygpKVxuICAgIHZhciBtaW5pdGUgPSB6ZXJvKG15RGF0ZS5nZXRNaW51dGVzKCkpXG4gICAgdmFyIHNlY29uZCA9IHplcm8obXlEYXRlLmdldFNlY29uZHMoKSlcbiAgICByZXR1cm4gZm9ybWF0cy5yZXBsYWNlKC9ZfG18ZHxIfGl8cy9pZywgZnVuY3Rpb24gKG1hdGNoZXMpIHtcbiAgICAgIHJldHVybiAoe1xuICAgICAgICBZOiB5ZWFyLFxuICAgICAgICBtOiBtb250aCxcbiAgICAgICAgZDogZGF5LFxuICAgICAgICBIOiBob3VyLFxuICAgICAgICBpOiBtaW5pdGUsXG4gICAgICAgIHM6IHNlY29uZFxuICAgICAgfSlbbWF0Y2hlc11cbiAgICB9KVxuICB9XG4gIEh0dHBSZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KClcbiAgTWQ1ID0gTWQ1LmhleE1ENVxufVxuIl19