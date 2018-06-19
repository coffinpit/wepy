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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwianNjb2RlIiwidXNlclBob25lIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNsZWFyIiwiZ2V0U3RvcmFnZUluZm8iLCJzdWNjZXNzIiwiY3VycmVudFNpemUiLCJjb25maXJtIiwiY2xlYXJTdG9yYWdlIiwiZ2V0VG9rZW4iLCJfdGhpcyIsIkdldFVzZXJJbmZvIiwiZXJyb3IiLCJsZXZlbCIsImRhdGVGb3JtYXQiLCJ2aXBFbmQiLCJtaXNzVG9rZW4iLCJpbml0VXNlckRhdGEiLCIkYXBwbHkiLCJjYXRjaCIsInNob3dGYWlsIiwic2hvd0xvYWRpbmciLCJHZXRVc2VyT3JkZXIiLCJoaWRlTG9hZGluZyIsImluaXRVc2VyT3JkZXIiLCJnZXRMb2dpbiIsImNvZGUiLCJnZXRTdG9yYWdlU3luYyIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImdldFVzZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7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QU1sQixPQUFOLENBQWMrQixXQUFkO0FBQ0FiLGNBQU1sQixPQUFOLENBQWM0QixRQUFkO0FBQ0QsT0FuQkQ7QUFvQkQ7Ozs2QkFDUztBQUFBOztBQUNSLFdBQUs1QixPQUFMLENBQWFpQyxRQUFiLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QixlQUFLdEQsTUFBTCxHQUFjc0QsSUFBZDtBQUNELE9BRkQ7QUFHQSxXQUFLckQsU0FBTCxHQUFpQixlQUFLc0QsY0FBTCxDQUFvQixPQUFwQixDQUFqQjtBQUNBLFVBQUlqQixRQUFRLElBQVo7QUFDQSxxQkFBS2tCLFVBQUwsQ0FBZ0I7QUFDZHZCLGlCQUFTLGlCQUFDTixHQUFELEVBQVM7QUFDaEIsY0FBSUEsSUFBSThCLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckNuQixrQkFBTXZDLE9BQU4sR0FBZ0IsS0FBaEI7QUFDQTtBQUNBdUMsa0JBQU1sQixPQUFOLENBQWNzQyxPQUFkLENBQXNCLFlBQU07QUFDMUJwQixvQkFBTTlDLFFBQU4sR0FBaUIsT0FBSzRCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QjdCLFFBQXpDO0FBQ0QsYUFGRDtBQUdELFdBTkQsTUFNTztBQUNMOEMsa0JBQU12QyxPQUFOLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRHVDLGdCQUFNUSxNQUFOO0FBQ0Q7QUFaYSxPQUFoQjtBQWNBLFdBQUtBLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBS0QsWUFBTDtBQUNBLFdBQUtPLGFBQUw7QUFDQSxXQUFLTixNQUFMO0FBQ0Q7Ozs7RUFqTStCLGVBQUthLEk7O2tCQUFsQnhFLEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VySW5mbzogJycsXG4gICAgICBpc1ZpcDogZmFsc2UsXG4gICAgICB2YWxpZGF0aW9uOiAnJyxcbiAgICAgIHJlZnVuZGluZzogJycsXG4gICAgICB1bmRlbGl2ZXJlZDogJycsXG4gICAgICB1bnBhaWQ6ICcnLFxuICAgICAgdW5yZWNlaXB0ZWQ6ICcnLFxuICAgICAgaXNMb2dpbjogZmFsc2UsXG4gICAgICBqc2NvZGU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29TZXJ2aWNlICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ29sbGVjdCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9jb2xsZWN0J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TeXN0ZW0gKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc3lzdGVtJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5wYWlkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnBhaWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbmRlbGl2ZXJlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5kZWxpdmVyZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnJlY2VpcHRlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5yZWNlaXB0ZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29SZWZ1bmRpbmcgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXJlZnVuZGluZydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJpbmRHZXRVc2VySW5mbyAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbClcbiAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBqc2NvZGU6IHRoaXMuanNjb2RlLFxuICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VuZFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5Xojrflj5bnlKjmiLfkv6Hmga8nXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsZWFyICgpIHtcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3nvJPlrZgnICsgcmVzLmN1cnJlbnRTaXplICsgJ2tiLOaYr+WQpua4heeQhue8k+WtmCcsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VXNlckRhdGEgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNWaXAgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgX3RoaXMuaXNWaXAgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGRhdGEudmlwRW5kICogMTAwMCwgJ1nlubRt5pyIZOaXpScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRVc2VyRGF0YSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFVzZXJPcmRlciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZnVuZGluZyA9IGRhdGEucmVmdW5kaW5nXG4gICAgICAgICAgX3RoaXMudW5kZWxpdmVyZWQgPSBkYXRhLnVuZGVsaXZlcmVkXG4gICAgICAgICAgX3RoaXMudW5wYWlkID0gZGF0YS51bnBhaWRcbiAgICAgICAgICBfdGhpcy51bnJlY2VpcHRlZCA9IGRhdGEudW5yZWNlaXB0ZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFVzZXJPcmRlcigpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKGNvZGUpID0+IHtcbiAgICAgICAgdGhpcy5qc2NvZGUgPSBjb2RlXG4gICAgICB9KVxuICAgICAgdGhpcy51c2VyUGhvbmUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgX3RoaXMuaXNMb2dpbiA9IGZhbHNlXG4gICAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzojrflj5bmlrDnmoR0b2tlblxuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5nZXRVc2VyKCgpID0+IHtcbiAgICAgICAgICAgICAgX3RoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNMb2dpbiA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIC8vIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgIC8vICAgdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAvLyB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgLy8gICB0aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgLy8gfVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsKVxuICAgICAgdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==