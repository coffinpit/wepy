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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwibWV0aG9kcyIsImdvQWRkcmVzcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsImRldGFpbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2xlYXIiLCJnZXRTdG9yYWdlSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJjdXJyZW50U2l6ZSIsImNvbmZpcm0iLCJjbGVhclN0b3JhZ2UiLCJfdGhpcyIsInNob3dMb2FkaW5nIiwiSHR0cFJlcXVlc3QiLCJHZXRVc2VySW5mbyIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJsZXZlbCIsImRhdGVGb3JtYXQiLCJ2aXBFbmQiLCIkYXBwbHkiLCJHZXRVc2VyT3JkZXIiLCJzaG93U3VjY2VzcyIsInNob3dGYWlsIiwiY2F0Y2giLCJnZXRUb2tlbiIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImdldFVzZXIiLCJ1c2VyTGV2ZWwiLCJpbml0VXNlckRhdGEiLCJpbml0VXNlck9yZGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxnQkFB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RDs7OzZCQUNTO0FBQUE7O0FBQ1IsV0FBS2xELEtBQUwsR0FBYSxLQUFLd0IsT0FBTCxDQUFhNEIsUUFBYixDQUFzQixNQUF0QixDQUFiO0FBQ0EsVUFBSWhCLFFBQVEsSUFBWjtBQUNBLHFCQUFLaUIsVUFBTCxDQUFnQjtBQUNkdEIsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJQSxJQUFJc0IsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQ2xCLGtCQUFNNUIsT0FBTixHQUFnQixLQUFoQjtBQUNBO0FBQ0E0QixrQkFBTVosT0FBTixDQUFjK0IsT0FBZCxDQUFzQixZQUFNO0FBQzFCbkIsb0JBQU1uQyxRQUFOLEdBQWlCLE9BQUt1QixPQUFMLENBQWFDLFVBQWIsQ0FBd0J4QixRQUF6QztBQUNELGFBRkQ7QUFHRCxXQU5ELE1BTU87QUFDTG1DLGtCQUFNNUIsT0FBTixHQUFnQixJQUFoQjtBQUNEO0FBQ0Q0QixnQkFBTVcsTUFBTjtBQUNEO0FBWmEsT0FBaEI7QUFjQSxVQUFJLEtBQUt2QixPQUFMLENBQWFDLFVBQWIsQ0FBd0IrQixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxhQUFLdEQsS0FBTCxHQUFhLEtBQWI7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLc0IsT0FBTCxDQUFhQyxVQUFiLENBQXdCK0IsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDbEQsYUFBS3RELEtBQUwsR0FBYSxJQUFiO0FBQ0Q7QUFDRHVDLGNBQVFDLEdBQVIsQ0FBWSxLQUFLbEIsT0FBTCxDQUFhQyxVQUFiLENBQXdCK0IsU0FBcEM7QUFDQSxXQUFLVCxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtVLFlBQUw7QUFDQSxXQUFLQyxhQUFMO0FBQ0EsV0FBS1gsTUFBTDtBQUNEOzs7O0VBbEsrQixlQUFLWSxJOztrQkFBbEIvRCxJIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlckluZm86ICcnLFxuICAgICAgaXNWaXA6IGZhbHNlLFxuICAgICAgdmFsaWRhdGlvbjogJycsXG4gICAgICByZWZ1bmRpbmc6ICcnLFxuICAgICAgdW5kZWxpdmVyZWQ6ICcnLFxuICAgICAgdW5wYWlkOiAnJyxcbiAgICAgIHVucmVjZWlwdGVkOiAnJyxcbiAgICAgIGlzTG9naW46IGZhbHNlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0NvbGxlY3QgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vY29sbGVjdCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb09yZGVyICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvU3lzdGVtICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3N5c3RlbSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VucGFpZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5wYWlkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5kZWxpdmVyZWQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVuZGVsaXZlcmVkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5yZWNlaXB0ZWQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVucmVjZWlwdGVkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUmVmdW5kaW5nICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT1yZWZ1bmRpbmcnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiaW5kR2V0VXNlckluZm8gKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xojrflj5bnlKjmiLfkv6Hmga8nXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsZWFyICgpIHtcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3nvJPlrZgnICsgcmVzLmN1cnJlbnRTaXplICsgJ2tiLOaYr+WQpua4heeQhue8k+WtmCcsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VXNlckRhdGEgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxldmVsID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxldmVsID09PSAxKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQocmVzLmRhdGEudmlwRW5kLCAnWeW5tG3mnIhk5pelJylcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFVzZXJPcmRlciAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZnVuZGluZyA9IGRhdGEucmVmdW5kaW5nXG4gICAgICAgICAgX3RoaXMudW5kZWxpdmVyZWQgPSBkYXRhLnVuZGVsaXZlcmVkXG4gICAgICAgICAgX3RoaXMudW5wYWlkID0gZGF0YS51bnBhaWRcbiAgICAgICAgICBfdGhpcy51bnJlY2VpcHRlZCA9IGRhdGEudW5yZWNlaXB0ZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCd1c2VyJylcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOiOt+WPluaWsOeahHRva2VuXG4gICAgICAgICAgICBfdGhpcy4kcGFyZW50LmdldFVzZXIoKCkgPT4ge1xuICAgICAgICAgICAgICBfdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICB0aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgIHRoaXMuaXNWaXAgPSB0cnVlXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRVc2VyRGF0YSgpXG4gICAgICB0aGlzLmluaXRVc2VyT3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19