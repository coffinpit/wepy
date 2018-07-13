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
      // console.log(this.$parent.globalData.userLevel)
      this.initUserData();
      this.initUserOrder();
      this.$apply();
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwianNjb2RlIiwidXNlclBob25lIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiZ29DdXN0b20iLCJiaW5kR2V0VXNlckluZm8iLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiSHR0cFJlcXVlc3QiLCJTZW5kVXNlckluZm8iLCJ0aGVuIiwicmVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2xlYXIiLCJnZXRTdG9yYWdlSW5mbyIsInN1Y2Nlc3MiLCJjdXJyZW50U2l6ZSIsImNvbmZpcm0iLCJjbGVhclN0b3JhZ2UiLCJnZXRUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJlcnJvciIsImxldmVsIiwiZGF0ZUZvcm1hdCIsInZpcEVuZCIsIm1pc3NUb2tlbiIsImluaXRVc2VyRGF0YSIsIiRhcHBseSIsImNhdGNoIiwic2hvd0xvYWRpbmciLCJHZXRVc2VyT3JkZXIiLCJoaWRlTG9hZGluZyIsImluaXRVc2VyT3JkZXIiLCJnZXRMb2dpbiIsImNvZGUiLCJnZXRTdG9yYWdlU3luYyIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImdldFVzZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7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QWNzRCxJQUFkO0FBQ0QsT0FGRDtBQUdBLFdBQUtyRCxTQUFMLEdBQWlCLGVBQUtzRCxjQUFMLENBQW9CLE9BQXBCLENBQWpCO0FBQ0EsVUFBSWhCLFFBQVEsSUFBWjtBQUNBLHFCQUFLaUIsVUFBTCxDQUFnQjtBQUNkdEIsaUJBQVMsaUJBQUNOLEdBQUQsRUFBUztBQUNoQixjQUFJQSxJQUFJNkIsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQ2xCLGtCQUFNeEMsT0FBTixHQUFnQixLQUFoQjtBQUNBO0FBQ0F3QyxrQkFBTWxCLE9BQU4sQ0FBY3FDLE9BQWQsQ0FBc0IsWUFBTTtBQUMxQm5CLG9CQUFNL0MsUUFBTixHQUFpQixPQUFLNkIsT0FBTCxDQUFhQyxVQUFiLENBQXdCOUIsUUFBekM7QUFDRCxhQUZEO0FBR0QsV0FORCxNQU1PO0FBQ0wrQyxrQkFBTXhDLE9BQU4sR0FBZ0IsSUFBaEI7QUFDRDtBQUNEd0MsZ0JBQU1RLE1BQU47QUFDRDtBQVphLE9BQWhCO0FBY0EsV0FBS0EsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFLRCxZQUFMO0FBQ0EsV0FBS00sYUFBTDtBQUNBLFdBQUtMLE1BQUw7QUFDRDs7OztFQXBNK0IsZUFBS1ksSTs7a0JBQWxCeEUsSSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uuS4reW/gydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHVzZXJJbmZvOiAnJyxcbiAgICAgIGlzVmlwOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRpb246ICcnLFxuICAgICAgcmVmdW5kaW5nOiAnJyxcbiAgICAgIHVuZGVsaXZlcmVkOiAnJyxcbiAgICAgIHVucGFpZDogJycsXG4gICAgICB1bnJlY2VpcHRlZDogJycsXG4gICAgICBpc0xvZ2luOiBmYWxzZSxcbiAgICAgIGpzY29kZTogJycsXG4gICAgICB1c2VyUGhvbmU6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb1NlcnZpY2UgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3MnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Db2xsZWN0ICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2NvbGxlY3QnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1N5c3RlbSAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zeXN0ZW0nXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnBhaWQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVucGFpZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VuZGVsaXZlcmVkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VucmVjZWlwdGVkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnJlY2VpcHRlZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1JlZnVuZGluZyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9cmVmdW5kaW5nJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DdXN0b20gKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vY3VzdG9tJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJpbmRHZXRVc2VySW5mbyAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbClcbiAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBqc2NvZGU6IHRoaXMuanNjb2RlLFxuICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VuZFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xojrflj5bnlKjmiLfkv6Hmga8nXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsZWFyICgpIHtcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3nvJPlrZgnICsgcmVzLmN1cnJlbnRTaXplICsgJ2tiLOaYr+WQpua4heeQhue8k+WtmCcsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VXNlckRhdGEgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNWaXAgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgX3RoaXMuaXNWaXAgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGRhdGEudmlwRW5kICogMTAwMCwgJ1nlubRt5pyIZOaXpScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAvLyBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRVc2VyT3JkZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5yZWZ1bmRpbmcgPSBkYXRhLnJlZnVuZGluZ1xuICAgICAgICAgIF90aGlzLnVuZGVsaXZlcmVkID0gZGF0YS51bmRlbGl2ZXJlZFxuICAgICAgICAgIF90aGlzLnVucGFpZCA9IGRhdGEudW5wYWlkXG4gICAgICAgICAgX3RoaXMudW5yZWNlaXB0ZWQgPSBkYXRhLnVucmVjZWlwdGVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgIH0pXG4gICAgICB0aGlzLnVzZXJQaG9uZSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOiOt+WPluaWsOeahHRva2VuXG4gICAgICAgICAgICBfdGhpcy4kcGFyZW50LmdldFVzZXIoKCkgPT4ge1xuICAgICAgICAgICAgICBfdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgLy8gaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgLy8gICB0aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgIC8vIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAvLyAgIHRoaXMuaXNWaXAgPSB0cnVlXG4gICAgICAvLyB9XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwpXG4gICAgICB0aGlzLmluaXRVc2VyRGF0YSgpXG4gICAgICB0aGlzLmluaXRVc2VyT3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19