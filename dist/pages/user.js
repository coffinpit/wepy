'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_wepy$page) {
  _inherits(User, _wepy$page);

  function User() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '个人中心'
    }, _this2.data = {
      token: '',
      userInfo: '',
      isVip: false,
      validation: '',
      refunding: '',
      undelivered: '',
      unpaid: '',
      unreceipted: '',
      isLogin: false,
      jscode: '',
      userPhone: ''
    }, _this2.methods = {
      goService: function goService() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      },
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address'
        });
      },
      goCollect: function goCollect() {
        _wepy2.default.navigateTo({
          url: './collect'
        });
      },
      goOrder: function goOrder() {
        _wepy2.default.navigateTo({
          url: './order'
        });
      },
      goSystem: function goSystem() {
        _wepy2.default.navigateTo({
          url: './system'
        });
      },
      goUnpaid: function goUnpaid() {
        _wepy2.default.navigateTo({
          url: './order?orderType=unpaid'
        });
      },
      goUndelivered: function goUndelivered() {
        _wepy2.default.navigateTo({
          url: './order?orderType=undelivered'
        });
      },
      goUnreceipted: function goUnreceipted() {
        _wepy2.default.navigateTo({
          url: './order?orderType=unreceipted'
        });
      },
      goRefunding: function goRefunding() {
        _wepy2.default.navigateTo({
          url: './order?orderType=refunding'
        });
      },
      goApplyVip: function goApplyVip() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      },
      goCustom: function goCustom() {
        _wepy2.default.navigateTo({
          url: './custom'
        });
      },
      bindGetUserInfo: function bindGetUserInfo(e) {
        console.log(e.detail);
        if (e.detail.userInfo) {
          this.isLogin = false;
          this.$parent.globalData.userInfo = e.detail.userInfo;
          this.userInfo = e.detail.userInfo;
          var data = {
            jscode: this.jscode,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          };
          this.$parent.HttpRequest.SendUserInfo(data).then(function (res) {
            console.log(res);
          });
        } else {
          this.isLogin = true;
          _wepy2.default.showModal({
            title: '提示',
            content: '拒绝授权将无法获取用户信息'
          });
        }
      },
      clear: function clear() {
        _wepy2.default.getStorageInfo({
          success: function success(res) {
            _wepy2.default.showModal({
              title: '提示',
              content: '当前缓存' + res.currentSize + 'kb,是否清理缓存',
              success: function success(res) {
                if (res.confirm) {
                  _wepy2.default.clearStorage();
                }
              }
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(User, [{
    key: 'initUserData',
    value: function initUserData() {
      var _this3 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserInfo(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          if (data.level === 0) {
            _this.isVip = false;
          } else if (data.level === 1) {
            _this.isVip = true;
          }
          _this3.validation = _this3.$parent.dateFormat(data.vipEnd * 1000, 'Y年m月d日');
        } else {
          if (_this.$parent.missToken) {
            _this.initUserData();
          }
        }
        _this.$apply();
      }).catch(function () {
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'initUserOrder',
    value: function initUserOrder() {
      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserOrder(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.refunding = data.refunding;
          _this.undelivered = data.undelivered;
          _this.unpaid = data.unpaid;
          _this.unreceipted = data.unreceipted;
        } else {
          if (_this.$parent.missToken) {
            _this.initUserOrder();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this4 = this;

      this.$parent.getLogin(function (code) {
        _this4.jscode = code;
      });
      this.userPhone = _wepy2.default.getStorageSync('phone');
      var _this = this;
      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            _this.isLogin = false;
            // 已经授权，获取新的token
            _this.$parent.getUser(function () {
              _this.userInfo = _this4.$parent.globalData.userInfo;
            });
          } else {
            _this.isLogin = true;
          }
          _this.$apply();
        }
      });
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // if (this.$parent.globalData.userLevel === 0) {
      //   this.isVip = false
      // } else if (this.$parent.globalData.userLevel === 1) {
      //   this.isVip = true
      // }
      this.initUserData();
      this.initUserOrder();
      this.$apply();
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwianNjb2RlIiwidXNlclBob25lIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiZ29DdXN0b20iLCJiaW5kR2V0VXNlckluZm8iLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiSHR0cFJlcXVlc3QiLCJTZW5kVXNlckluZm8iLCJ0aGVuIiwicmVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2xlYXIiLCJnZXRTdG9yYWdlSW5mbyIsInN1Y2Nlc3MiLCJjdXJyZW50U2l6ZSIsImNvbmZpcm0iLCJjbGVhclN0b3JhZ2UiLCJnZXRUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJlcnJvciIsImxldmVsIiwiZGF0ZUZvcm1hdCIsInZpcEVuZCIsIm1pc3NUb2tlbiIsImluaXRVc2VyRGF0YSIsIiRhcHBseSIsImNhdGNoIiwic2hvd0xvYWRpbmciLCJHZXRVc2VyT3JkZXIiLCJoaWRlTG9hZGluZyIsImluaXRVc2VyT3JkZXIiLCJnZXRMb2dpbiIsImNvZGUiLCJnZXRTdG9yYWdlU3luYyIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImdldFVzZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7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QWNzRCxJQUFkO0FBQ0QsT0FGRDtBQUdBLFdBQUtyRCxTQUFMLEdBQWlCLGVBQUtzRCxjQUFMLENBQW9CLE9BQXBCLENBQWpCO0FBQ0EsVUFBSWhCLFFBQVEsSUFBWjtBQUNBLHFCQUFLaUIsVUFBTCxDQUFnQjtBQUNkdEIsaUJBQVMsaUJBQUNOLEdBQUQsRUFBUztBQUNoQixjQUFJQSxJQUFJNkIsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQ2xCLGtCQUFNeEMsT0FBTixHQUFnQixLQUFoQjtBQUNBO0FBQ0F3QyxrQkFBTWxCLE9BQU4sQ0FBY3FDLE9BQWQsQ0FBc0IsWUFBTTtBQUMxQm5CLG9CQUFNL0MsUUFBTixHQUFpQixPQUFLNkIsT0FBTCxDQUFhQyxVQUFiLENBQXdCOUIsUUFBekM7QUFDRCxhQUZEO0FBR0QsV0FORCxNQU1PO0FBQ0wrQyxrQkFBTXhDLE9BQU4sR0FBZ0IsSUFBaEI7QUFDRDtBQUNEd0MsZ0JBQU1RLE1BQU47QUFDRDtBQVphLE9BQWhCO0FBY0EsV0FBS0EsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBS0QsWUFBTDtBQUNBLFdBQUtNLGFBQUw7QUFDQSxXQUFLTCxNQUFMO0FBQ0Q7Ozs7RUFuTStCLGVBQUtZLEk7O2tCQUFsQnhFLEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VySW5mbzogJycsXG4gICAgICBpc1ZpcDogZmFsc2UsXG4gICAgICB2YWxpZGF0aW9uOiAnJyxcbiAgICAgIHJlZnVuZGluZzogJycsXG4gICAgICB1bmRlbGl2ZXJlZDogJycsXG4gICAgICB1bnBhaWQ6ICcnLFxuICAgICAgdW5yZWNlaXB0ZWQ6ICcnLFxuICAgICAgaXNMb2dpbjogZmFsc2UsXG4gICAgICBqc2NvZGU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29TZXJ2aWNlICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ29sbGVjdCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9jb2xsZWN0J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TeXN0ZW0gKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc3lzdGVtJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5wYWlkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnBhaWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbmRlbGl2ZXJlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5kZWxpdmVyZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnJlY2VpcHRlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5yZWNlaXB0ZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29SZWZ1bmRpbmcgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXJlZnVuZGluZydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ3VzdG9tICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2N1c3RvbSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiaW5kR2V0VXNlckluZm8gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwpXG4gICAgICAgIGlmIChlLmRldGFpbC51c2VySW5mbykge1xuICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICAgIHRoaXMudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAganNjb2RlOiB0aGlzLmpzY29kZSxcbiAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICBpdjogZS5kZXRhaWwuaXZcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNlbmRVc2VySW5mbyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IHRydWVcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV6I635Y+W55So5oi35L+h5oGvJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbGVhciAoKSB7XG4gICAgICAgIHdlcHkuZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN57yT5a2YJyArIHJlcy5jdXJyZW50U2l6ZSArICdrYizmmK/lkKbmuIXnkIbnvJPlrZgnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LmNsZWFyU3RvcmFnZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFVzZXJEYXRhICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKGRhdGEubGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuaW5pdFVzZXJEYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0VXNlck9yZGVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMucmVmdW5kaW5nID0gZGF0YS5yZWZ1bmRpbmdcbiAgICAgICAgICBfdGhpcy51bmRlbGl2ZXJlZCA9IGRhdGEudW5kZWxpdmVyZWRcbiAgICAgICAgICBfdGhpcy51bnBhaWQgPSBkYXRhLnVucGFpZFxuICAgICAgICAgIF90aGlzLnVucmVjZWlwdGVkID0gZGF0YS51bnJlY2VpcHRlZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuaW5pdFVzZXJPcmRlcigpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAvLyBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKGNvZGUpID0+IHtcbiAgICAgICAgdGhpcy5qc2NvZGUgPSBjb2RlXG4gICAgICB9KVxuICAgICAgdGhpcy51c2VyUGhvbmUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgX3RoaXMuaXNMb2dpbiA9IGZhbHNlXG4gICAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzojrflj5bmlrDnmoR0b2tlblxuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5nZXRVc2VyKCgpID0+IHtcbiAgICAgICAgICAgICAgX3RoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNMb2dpbiA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIC8vIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgIC8vICAgdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAvLyB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgLy8gICB0aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgLy8gfVxuICAgICAgdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==