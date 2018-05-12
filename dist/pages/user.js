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
      unreceipted: ''
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
      this.token = this.$parent.getToken('user');
      this.userInfo = this.$parent.globalData.userInfo;
      console.log(this.$parent.globalData.userInfo);
      if (this.$parent.globalData.userLevel === 0) {
        this.isVip = false;
      } else if (this.$parent.globalData.userLevel === 1) {
        this.isVip = true;
      }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvQ29sbGVjdCIsImdvT3JkZXIiLCJnb1N5c3RlbSIsImNsZWFyIiwiZ2V0U3RvcmFnZUluZm8iLCJzdWNjZXNzIiwicmVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY3VycmVudFNpemUiLCJjb25maXJtIiwiY2xlYXJTdG9yYWdlIiwiX3RoaXMiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldFVzZXJJbmZvIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImxldmVsIiwiZGF0ZUZvcm1hdCIsInZpcEVuZCIsIiRhcHBseSIsIkdldFVzZXJPcmRlciIsInNob3dTdWNjZXNzIiwic2hvd0ZhaWwiLCJjYXRjaCIsImdldFRva2VuIiwiZ2xvYmFsRGF0YSIsInVzZXJMZXZlbCIsImluaXRVc2VyRGF0YSIsImluaXRVc2VyT3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGdCQUFVLEVBRkw7QUFHTEMsYUFBTyxLQUhGO0FBSUxDLGtCQUFZLEVBSlA7QUFLTEMsaUJBQVcsRUFMTjtBQU1MQyxtQkFBYSxFQU5SO0FBT0xDLGNBQVEsRUFQSDtBQVFMQyxtQkFBYTtBQVJSLEssU0FVUEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0s7QUFDWCx1QkFB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RDtBQWdCRDs7OzZCQUNTO0FBQ1IsV0FBS3hDLEtBQUwsR0FBYSxLQUFLMEIsT0FBTCxDQUFhZ0IsUUFBYixDQUFzQixNQUF0QixDQUFiO0FBQ0EsV0FBS3pDLFFBQUwsR0FBZ0IsS0FBS3lCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0IxQyxRQUF4QztBQUNBOEIsY0FBUUMsR0FBUixDQUFZLEtBQUtOLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0IxQyxRQUFwQztBQUNBLFVBQUksS0FBS3lCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0JDLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGFBQUsxQyxLQUFMLEdBQWEsS0FBYjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUt3QixPQUFMLENBQWFpQixVQUFiLENBQXdCQyxTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUNsRCxhQUFLMUMsS0FBTCxHQUFhLElBQWI7QUFDRDtBQUNELFdBQUttQyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtRLFlBQUw7QUFDQSxXQUFLQyxhQUFMO0FBQ0EsV0FBS1QsTUFBTDtBQUNEOzs7O0VBN0crQixlQUFLVSxJOztrQkFBbEJuRCxJIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlckluZm86ICcnLFxuICAgICAgaXNWaXA6IGZhbHNlLFxuICAgICAgdmFsaWRhdGlvbjogJycsXG4gICAgICByZWZ1bmRpbmc6ICcnLFxuICAgICAgdW5kZWxpdmVyZWQ6ICcnLFxuICAgICAgdW5wYWlkOiAnJyxcbiAgICAgIHVucmVjZWlwdGVkOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3MnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Db2xsZWN0ICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2NvbGxlY3QnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1N5c3RlbSAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zeXN0ZW0nXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xlYXIgKCkge1xuICAgICAgICB3ZXB5LmdldFN0b3JhZ2VJbmZvKHtcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+W9k+WJjee8k+WtmCcgKyByZXMuY3VycmVudFNpemUgKyAna2Is5piv5ZCm5riF55CG57yT5a2YJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgd2VweS5jbGVhclN0b3JhZ2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRVc2VyRGF0YSAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKGRhdGEubGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChyZXMuZGF0YS52aXBFbmQsICdZ5bm0beaciGTml6UnKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0VXNlck9yZGVyICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMucmVmdW5kaW5nID0gZGF0YS5yZWZ1bmRpbmdcbiAgICAgICAgICBfdGhpcy51bmRlbGl2ZXJlZCA9IGRhdGEudW5kZWxpdmVyZWRcbiAgICAgICAgICBfdGhpcy51bnBhaWQgPSBkYXRhLnVucGFpZFxuICAgICAgICAgIF90aGlzLnVucmVjZWlwdGVkID0gZGF0YS51bnJlY2VpcHRlZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ3VzZXInKVxuICAgICAgdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbylcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICB0aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==