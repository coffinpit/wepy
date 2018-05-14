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
      isLogin: false
    }, _this2.methods = {
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
      bindGetUserInfo: function bindGetUserInfo(e) {
        if (e.detail.userInfo) {
          this.isLogin = false;
          this.$parent.globalData.userInfo = e.detail.userInfo;
          this.userInfo = e.detail.userInfo;
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

      var _this = this;
      this.$parent.showLoading();
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
          _this3.validation = _this3.$parent.dateFormat(res.data.vipEnd, 'Y年m月d日');
        }
        _this.$apply();
      });
    }
  }, {
    key: 'initUserOrder',
    value: function initUserOrder() {
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.refunding = data.refunding;
          _this.undelivered = data.undelivered;
          _this.unpaid = data.unpaid;
          _this.unreceipted = data.unreceipted;
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this4 = this;

      this.token = this.$parent.getToken('user');
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
      if (this.$parent.globalData.userLevel === 0) {
        this.isVip = false;
      } else if (this.$parent.globalData.userLevel === 1) {
        this.isVip = true;
      }
      console.log(this.$parent.globalData.userLevel);
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initUserData();
      this.initUserOrder();
      this.$apply();
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwibWV0aG9kcyIsImdvQWRkcmVzcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJiaW5kR2V0VXNlckluZm8iLCJlIiwiZGV0YWlsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjbGVhciIsImdldFN0b3JhZ2VJbmZvIiwic3VjY2VzcyIsInJlcyIsImN1cnJlbnRTaXplIiwiY29uZmlybSIsImNsZWFyU3RvcmFnZSIsIl90aGlzIiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldFVzZXJJbmZvIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImxldmVsIiwiZGF0ZUZvcm1hdCIsInZpcEVuZCIsIiRhcHBseSIsIkdldFVzZXJPcmRlciIsInNob3dTdWNjZXNzIiwic2hvd0ZhaWwiLCJjYXRjaCIsImdldFRva2VuIiwiZ2V0U2V0dGluZyIsImF1dGhTZXR0aW5nIiwiZ2V0VXNlciIsInVzZXJMZXZlbCIsImluaXRVc2VyRGF0YSIsImluaXRVc2VyT3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGdCQUFVLEVBRkw7QUFHTEMs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UUFBUSxJQUFaO0FBQ0EscUJBQUtpQixVQUFMLENBQWdCO0FBQ2R0QixpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGNBQUlBLElBQUlzQixXQUFKLENBQWdCLGdCQUFoQixDQUFKLEVBQXVDO0FBQ3JDbEIsa0JBQU0zQixPQUFOLEdBQWdCLEtBQWhCO0FBQ0E7QUFDQTJCLGtCQUFNWixPQUFOLENBQWMrQixPQUFkLENBQXNCLFlBQU07QUFDMUJuQixvQkFBTWxDLFFBQU4sR0FBaUIsT0FBS3NCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnZCLFFBQXpDO0FBQ0QsYUFGRDtBQUdELFdBTkQsTUFNTztBQUNMa0Msa0JBQU0zQixPQUFOLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRDJCLGdCQUFNVyxNQUFOO0FBQ0Q7QUFaYSxPQUFoQjtBQWNBLFVBQUksS0FBS3ZCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QitCLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGFBQUtyRCxLQUFMLEdBQWEsS0FBYjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUtxQixPQUFMLENBQWFDLFVBQWIsQ0FBd0IrQixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUNsRCxhQUFLckQsS0FBTCxHQUFhLElBQWI7QUFDRDtBQUNEc0MsY0FBUUMsR0FBUixDQUFZLEtBQUtsQixPQUFMLENBQWFDLFVBQWIsQ0FBd0IrQixTQUFwQztBQUNBLFdBQUtULE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS1UsWUFBTDtBQUNBLFdBQUtDLGFBQUw7QUFDQSxXQUFLWCxNQUFMO0FBQ0Q7Ozs7RUE3SitCLGVBQUtZLEk7O2tCQUFsQjlELEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VySW5mbzogJycsXG4gICAgICBpc1ZpcDogZmFsc2UsXG4gICAgICB2YWxpZGF0aW9uOiAnJyxcbiAgICAgIHJlZnVuZGluZzogJycsXG4gICAgICB1bmRlbGl2ZXJlZDogJycsXG4gICAgICB1bnBhaWQ6ICcnLFxuICAgICAgdW5yZWNlaXB0ZWQ6ICcnLFxuICAgICAgaXNMb2dpbjogZmFsc2VcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ29sbGVjdCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9jb2xsZWN0J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TeXN0ZW0gKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc3lzdGVtJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5wYWlkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnBhaWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbmRlbGl2ZXJlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5kZWxpdmVyZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnJlY2VpcHRlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5yZWNlaXB0ZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29SZWZ1bmRpbmcgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXJlZnVuZGluZydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiaW5kR2V0VXNlckluZm8gKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xojrflj5bnlKjmiLfkv6Hmga8nXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsZWFyICgpIHtcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3nvJPlrZgnICsgcmVzLmN1cnJlbnRTaXplICsgJ2tiLOaYr+WQpua4heeQhue8k+WtmCcsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VXNlckRhdGEgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxldmVsID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxldmVsID09PSAxKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQocmVzLmRhdGEudmlwRW5kLCAnWeW5tG3mnIhk5pelJylcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFVzZXJPcmRlciAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZnVuZGluZyA9IGRhdGEucmVmdW5kaW5nXG4gICAgICAgICAgX3RoaXMudW5kZWxpdmVyZWQgPSBkYXRhLnVuZGVsaXZlcmVkXG4gICAgICAgICAgX3RoaXMudW5wYWlkID0gZGF0YS51bnBhaWRcbiAgICAgICAgICBfdGhpcy51bnJlY2VpcHRlZCA9IGRhdGEudW5yZWNlaXB0ZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCd1c2VyJylcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOiOt+WPluaWsOeahHRva2VuXG4gICAgICAgICAgICBfdGhpcy4kcGFyZW50LmdldFVzZXIoKCkgPT4ge1xuICAgICAgICAgICAgICBfdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICB0aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgIHRoaXMuaXNWaXAgPSB0cnVlXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRVc2VyRGF0YSgpXG4gICAgICB0aGlzLmluaXRVc2VyT3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19