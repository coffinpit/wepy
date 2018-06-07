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
      jscode: ''
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwianNjb2RlIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInJlcyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNsZWFyIiwiZ2V0U3RvcmFnZUluZm8iLCJzdWNjZXNzIiwiY3VycmVudFNpemUiLCJjb25maXJtIiwiY2xlYXJTdG9yYWdlIiwiZ2V0VG9rZW4iLCJfdGhpcyIsIkdldFVzZXJJbmZvIiwiZXJyb3IiLCJsZXZlbCIsImRhdGVGb3JtYXQiLCJ2aXBFbmQiLCJtaXNzVG9rZW4iLCJpbml0VXNlckRhdGEiLCIkYXBwbHkiLCJjYXRjaCIsInNob3dGYWlsIiwic2hvd0xvYWRpbmciLCJHZXRVc2VyT3JkZXIiLCJoaWRlTG9hZGluZyIsImluaXRVc2VyT3JkZXIiLCJnZXRMb2dpbiIsImNvZGUiLCJnZXRTZXR0aW5nIiwiYXV0aFNldHRpbmciLCJnZXRVc2VyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7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LFFBQWQ7QUFDRCxPQW5CRDtBQW9CRDs7OzZCQUNTO0FBQUE7O0FBQ1IsV0FBSzVCLE9BQUwsQ0FBYWlDLFFBQWIsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzlCLGVBQUtyRCxNQUFMLEdBQWNxRCxJQUFkO0FBQ0QsT0FGRDtBQUdBLFVBQUloQixRQUFRLElBQVo7QUFDQSxxQkFBS2lCLFVBQUwsQ0FBZ0I7QUFDZHRCLGlCQUFTLGlCQUFDTixHQUFELEVBQVM7QUFDaEIsY0FBSUEsSUFBSTZCLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckNsQixrQkFBTXRDLE9BQU4sR0FBZ0IsS0FBaEI7QUFDQTtBQUNBc0Msa0JBQU1sQixPQUFOLENBQWNxQyxPQUFkLENBQXNCLFlBQU07QUFDMUJuQixvQkFBTTdDLFFBQU4sR0FBaUIsT0FBSzJCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QjVCLFFBQXpDO0FBQ0QsYUFGRDtBQUdELFdBTkQsTUFNTztBQUNMNkMsa0JBQU10QyxPQUFOLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRHNDLGdCQUFNUSxNQUFOO0FBQ0Q7QUFaYSxPQUFoQjtBQWNBLFdBQUtBLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBS0QsWUFBTDtBQUNBLFdBQUtPLGFBQUw7QUFDQSxXQUFLTixNQUFMO0FBQ0Q7Ozs7RUEvTCtCLGVBQUtZLEk7O2tCQUFsQnRFLEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VySW5mbzogJycsXG4gICAgICBpc1ZpcDogZmFsc2UsXG4gICAgICB2YWxpZGF0aW9uOiAnJyxcbiAgICAgIHJlZnVuZGluZzogJycsXG4gICAgICB1bmRlbGl2ZXJlZDogJycsXG4gICAgICB1bnBhaWQ6ICcnLFxuICAgICAgdW5yZWNlaXB0ZWQ6ICcnLFxuICAgICAgaXNMb2dpbjogZmFsc2UsXG4gICAgICBqc2NvZGU6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb1NlcnZpY2UgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3MnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Db2xsZWN0ICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2NvbGxlY3QnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1N5c3RlbSAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zeXN0ZW0nXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnBhaWQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVucGFpZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VuZGVsaXZlcmVkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VucmVjZWlwdGVkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnJlY2VpcHRlZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1JlZnVuZGluZyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9cmVmdW5kaW5nJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYmluZEdldFVzZXJJbmZvIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsKVxuICAgICAgICBpZiAoZS5kZXRhaWwudXNlckluZm8pIHtcbiAgICAgICAgICB0aGlzLmlzTG9naW4gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgICB0aGlzLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGpzY29kZTogdGhpcy5qc2NvZGUsXG4gICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgaXY6IGUuZGV0YWlsLml2XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZW5kVXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzTG9naW4gPSB0cnVlXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aLkue7neaOiOadg+WwhuaXoOazleiOt+WPlueUqOaIt+S/oeaBrydcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xlYXIgKCkge1xuICAgICAgICB3ZXB5LmdldFN0b3JhZ2VJbmZvKHtcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+W9k+WJjee8k+WtmCcgKyByZXMuY3VycmVudFNpemUgKyAna2Is5piv5ZCm5riF55CG57yT5a2YJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgd2VweS5jbGVhclN0b3JhZ2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRVc2VyRGF0YSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxldmVsID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxldmVsID09PSAxKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQoZGF0YS52aXBFbmQgKiAxMDAwLCAnWeW5tG3mnIhk5pelJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFVzZXJEYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0VXNlck9yZGVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMucmVmdW5kaW5nID0gZGF0YS5yZWZ1bmRpbmdcbiAgICAgICAgICBfdGhpcy51bmRlbGl2ZXJlZCA9IGRhdGEudW5kZWxpdmVyZWRcbiAgICAgICAgICBfdGhpcy51bnBhaWQgPSBkYXRhLnVucGFpZFxuICAgICAgICAgIF90aGlzLnVucmVjZWlwdGVkID0gZGF0YS51bnJlY2VpcHRlZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgIH0pXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgX3RoaXMuaXNMb2dpbiA9IGZhbHNlXG4gICAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzojrflj5bmlrDnmoR0b2tlblxuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5nZXRVc2VyKCgpID0+IHtcbiAgICAgICAgICAgICAgX3RoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNMb2dpbiA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIC8vIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgIC8vICAgdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAvLyB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgLy8gICB0aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgLy8gfVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsKVxuICAgICAgdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==