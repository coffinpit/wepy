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

      this.token = this.$parent.getToken();
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
          _this3.validation = _this3.$parent.dateFormat(data.vipEnd * 1000, 'Y年m月d日');
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.initUserData();
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'initUserOrder',
    value: function initUserOrder() {
      var _this4 = this;

      this.token = this.$parent.getToken();
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
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initUserOrder();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this5 = this;

      var _this = this;
      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            _this.isLogin = false;
            // 已经授权，获取新的token
            _this.$parent.getUser(function () {
              _this.userInfo = _this5.$parent.globalData.userInfo;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsImRldGFpbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2xlYXIiLCJnZXRTdG9yYWdlSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJjdXJyZW50U2l6ZSIsImNvbmZpcm0iLCJjbGVhclN0b3JhZ2UiLCJnZXRUb2tlbiIsIl90aGlzIiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldFVzZXJJbmZvIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImxldmVsIiwiZGF0ZUZvcm1hdCIsInZpcEVuZCIsIm1pc3NUb2tlbiIsImluaXRVc2VyRGF0YSIsIiRhcHBseSIsIkdldFVzZXJPcmRlciIsInNob3dTdWNjZXNzIiwiaW5pdFVzZXJPcmRlciIsImNhdGNoIiwic2hvd0ZhaWwiLCJnZXRTZXR0aW5nIiwiYXV0aFNldHRpbmciLCJnZXRVc2VyIiwidXNlckxldmVsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FB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Q0FBYUMsVUFBYixDQUF3QmtDLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGFBQUsxRCxLQUFMLEdBQWEsS0FBYjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUt1QixPQUFMLENBQWFDLFVBQWIsQ0FBd0JrQyxTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUNsRCxhQUFLMUQsS0FBTCxHQUFhLElBQWI7QUFDRDtBQUNEeUMsY0FBUUMsR0FBUixDQUFZLEtBQUtuQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JrQyxTQUFwQztBQUNBLFdBQUtULE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0QsWUFBTDtBQUNBLFdBQUtJLGFBQUw7QUFDQSxXQUFLSCxNQUFMO0FBQ0Q7Ozs7RUFoTCtCLGVBQUtVLEk7O2tCQUFsQmpFLEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VySW5mbzogJycsXG4gICAgICBpc1ZpcDogZmFsc2UsXG4gICAgICB2YWxpZGF0aW9uOiAnJyxcbiAgICAgIHJlZnVuZGluZzogJycsXG4gICAgICB1bmRlbGl2ZXJlZDogJycsXG4gICAgICB1bnBhaWQ6ICcnLFxuICAgICAgdW5yZWNlaXB0ZWQ6ICcnLFxuICAgICAgaXNMb2dpbjogZmFsc2VcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvU2VydmljZSAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0NvbGxlY3QgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vY29sbGVjdCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb09yZGVyICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvU3lzdGVtICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3N5c3RlbSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VucGFpZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5wYWlkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5kZWxpdmVyZWQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVuZGVsaXZlcmVkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5yZWNlaXB0ZWQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVucmVjZWlwdGVkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUmVmdW5kaW5nICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT1yZWZ1bmRpbmcnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiaW5kR2V0VXNlckluZm8gKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xojrflj5bnlKjmiLfkv6Hmga8nXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsZWFyICgpIHtcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3nvJPlrZgnICsgcmVzLmN1cnJlbnRTaXplICsgJ2tiLOaYr+WQpua4heeQhue8k+WtmCcsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VXNlckRhdGEgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKGRhdGEubGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFVzZXJPcmRlciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMucmVmdW5kaW5nID0gZGF0YS5yZWZ1bmRpbmdcbiAgICAgICAgICBfdGhpcy51bmRlbGl2ZXJlZCA9IGRhdGEudW5kZWxpdmVyZWRcbiAgICAgICAgICBfdGhpcy51bnBhaWQgPSBkYXRhLnVucGFpZFxuICAgICAgICAgIF90aGlzLnVucmVjZWlwdGVkID0gZGF0YS51bnJlY2VpcHRlZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgIF90aGlzLmlzTG9naW4gPSBmYWxzZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIF90aGlzLiRwYXJlbnQuZ2V0VXNlcigoKSA9PiB7XG4gICAgICAgICAgICAgIF90aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTG9naW4gPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgIHRoaXMuaXNWaXAgPSBmYWxzZVxuICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdFVzZXJEYXRhKClcbiAgICAgIHRoaXMuaW5pdFVzZXJPcmRlcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=