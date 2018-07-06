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
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.initUserData();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
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
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
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
        _this.$parent.hideLoading();
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this5 = this;

      this.$parent.getLogin(function (code) {
        _this5.jscode = code;
      });
      this.userPhone = _wepy2.default.getStorageSync('phone');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwianNjb2RlIiwidXNlclBob25lIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiZ29DdXN0b20iLCJiaW5kR2V0VXNlckluZm8iLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiSHR0cFJlcXVlc3QiLCJTZW5kVXNlckluZm8iLCJ0aGVuIiwicmVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2xlYXIiLCJnZXRTdG9yYWdlSW5mbyIsInN1Y2Nlc3MiLCJjdXJyZW50U2l6ZSIsImNvbmZpcm0iLCJjbGVhclN0b3JhZ2UiLCJnZXRUb2tlbiIsIl90aGlzIiwiR2V0VXNlckluZm8iLCJlcnJvciIsImxldmVsIiwiZGF0ZUZvcm1hdCIsInZpcEVuZCIsIm1pc3NUb2tlbiIsImluaXRVc2VyRGF0YSIsIiRhcHBseSIsImNhdGNoIiwic2hvd0ZhaWwiLCJzaG93TG9hZGluZyIsIkdldFVzZXJPcmRlciIsImhpZGVMb2FkaW5nIiwiaW5pdFVzZXJPcmRlciIsImdldExvZ2luIiwiY29kZSIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0U2V0dGluZyIsImF1dGhTZXR0aW5nIiwiZ2V0VXNlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7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QUNBRixrQkFBTWMsYUFBTjtBQUNEO0FBQ0Y7QUFDRGQsY0FBTVEsTUFBTjtBQUNELE9BaEJELEVBZ0JHQyxLQWhCSCxDQWdCUyxZQUFNO0FBQ2JULGNBQU1sQixPQUFOLENBQWMrQixXQUFkO0FBQ0FiLGNBQU1sQixPQUFOLENBQWM0QixRQUFkO0FBQ0QsT0FuQkQ7QUFvQkQ7Ozs2QkFDUztBQUFBOztBQUNSLFdBQUs1QixPQUFMLENBQWFpQyxRQUFiLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QixlQUFLdkQsTUFBTCxHQUFjdUQsSUFBZDtBQUNELE9BRkQ7QUFHQSxXQUFLdEQsU0FBTCxHQUFpQixlQUFLdUQsY0FBTCxDQUFvQixPQUFwQixDQUFqQjtBQUNBLFVBQUlqQixRQUFRLElBQVo7QUFDQSxxQkFBS2tCLFVBQUwsQ0FBZ0I7QUFDZHZCLGlCQUFTLGlCQUFDTixHQUFELEVBQVM7QUFDaEIsY0FBSUEsSUFBSThCLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckNuQixrQkFBTXhDLE9BQU4sR0FBZ0IsS0FBaEI7QUFDQTtBQUNBd0Msa0JBQU1sQixPQUFOLENBQWNzQyxPQUFkLENBQXNCLFlBQU07QUFDMUJwQixvQkFBTS9DLFFBQU4sR0FBaUIsT0FBSzZCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QjlCLFFBQXpDO0FBQ0QsYUFGRDtBQUdELFdBTkQsTUFNTztBQUNMK0Msa0JBQU14QyxPQUFOLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRHdDLGdCQUFNUSxNQUFOO0FBQ0Q7QUFaYSxPQUFoQjtBQWNBLFdBQUtBLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBS0QsWUFBTDtBQUNBLFdBQUtPLGFBQUw7QUFDQSxXQUFLTixNQUFMO0FBQ0Q7Ozs7RUF0TStCLGVBQUthLEk7O2tCQUFsQnpFLEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VySW5mbzogJycsXG4gICAgICBpc1ZpcDogZmFsc2UsXG4gICAgICB2YWxpZGF0aW9uOiAnJyxcbiAgICAgIHJlZnVuZGluZzogJycsXG4gICAgICB1bmRlbGl2ZXJlZDogJycsXG4gICAgICB1bnBhaWQ6ICcnLFxuICAgICAgdW5yZWNlaXB0ZWQ6ICcnLFxuICAgICAgaXNMb2dpbjogZmFsc2UsXG4gICAgICBqc2NvZGU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29TZXJ2aWNlICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ29sbGVjdCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9jb2xsZWN0J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TeXN0ZW0gKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc3lzdGVtJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5wYWlkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnBhaWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbmRlbGl2ZXJlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5kZWxpdmVyZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnJlY2VpcHRlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5yZWNlaXB0ZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29SZWZ1bmRpbmcgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXJlZnVuZGluZydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ3VzdG9tICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2N1c3RvbSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiaW5kR2V0VXNlckluZm8gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwpXG4gICAgICAgIGlmIChlLmRldGFpbC51c2VySW5mbykge1xuICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICAgIHRoaXMudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAganNjb2RlOiB0aGlzLmpzY29kZSxcbiAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICBpdjogZS5kZXRhaWwuaXZcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNlbmRVc2VySW5mbyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IHRydWVcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV6I635Y+W55So5oi35L+h5oGvJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbGVhciAoKSB7XG4gICAgICAgIHdlcHkuZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN57yT5a2YJyArIHJlcy5jdXJyZW50U2l6ZSArICdrYizmmK/lkKbmuIXnkIbnvJPlrZgnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LmNsZWFyU3RvcmFnZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFVzZXJEYXRhICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKGRhdGEubGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRVc2VyT3JkZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5yZWZ1bmRpbmcgPSBkYXRhLnJlZnVuZGluZ1xuICAgICAgICAgIF90aGlzLnVuZGVsaXZlcmVkID0gZGF0YS51bmRlbGl2ZXJlZFxuICAgICAgICAgIF90aGlzLnVucGFpZCA9IGRhdGEudW5wYWlkXG4gICAgICAgICAgX3RoaXMudW5yZWNlaXB0ZWQgPSBkYXRhLnVucmVjZWlwdGVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRVc2VyT3JkZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LmdldExvZ2luKChjb2RlKSA9PiB7XG4gICAgICAgIHRoaXMuanNjb2RlID0gY29kZVxuICAgICAgfSlcbiAgICAgIHRoaXMudXNlclBob25lID0gd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgIF90aGlzLmlzTG9naW4gPSBmYWxzZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIF90aGlzLiRwYXJlbnQuZ2V0VXNlcigoKSA9PiB7XG4gICAgICAgICAgICAgIF90aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTG9naW4gPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICAvLyBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAvLyAgIHRoaXMuaXNWaXAgPSBmYWxzZVxuICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIC8vICAgdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgIC8vIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbClcbiAgICAgIHRoaXMuaW5pdFVzZXJEYXRhKClcbiAgICAgIHRoaXMuaW5pdFVzZXJPcmRlcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=