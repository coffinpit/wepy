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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvQ29sbGVjdCIsImdvT3JkZXIiLCJjbGVhciIsImdldFN0b3JhZ2VJbmZvIiwic3VjY2VzcyIsInJlcyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImN1cnJlbnRTaXplIiwiY29uZmlybSIsImNsZWFyU3RvcmFnZSIsIl90aGlzIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiSHR0cFJlcXVlc3QiLCJHZXRVc2VySW5mbyIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJsZXZlbCIsImRhdGVGb3JtYXQiLCJ2aXBFbmQiLCIkYXBwbHkiLCJHZXRVc2VyT3JkZXIiLCJzaG93U3VjY2VzcyIsInNob3dGYWlsIiwiY2F0Y2giLCJnZXRUb2tlbiIsImdsb2JhbERhdGEiLCJ1c2VyTGV2ZWwiLCJpbml0VXNlckRhdGEiLCJpbml0VXNlck9yZGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxnQkFBVSxFQUZMO0FBR0xDLGFBQU8sS0FIRjtBQUlMQyxrQkFBWSxFQUpQO0FBS0xDLGlCQUFXLEVBTE47QUFNTEMsbUJBQWEsRUFOUjtBQU9MQyxjQUFRLEVBUEg7QUFRTEMsbUJBQWE7QUFSUixLLFNBVVBDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNLO0FBQ1gsdUJBQUtDLFVBQUwsQ0FB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S3hDLFFBQUwsR0FBZ0IsS0FBS3dCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0J6QyxRQUF4QztBQUNBLFVBQUksS0FBS3dCLE9BQUwsQ0FBYWlCLFVBQWIsQ0FBd0JDLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGFBQUt6QyxLQUFMLEdBQWEsS0FBYjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUt1QixPQUFMLENBQWFpQixVQUFiLENBQXdCQyxTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUNsRCxhQUFLekMsS0FBTCxHQUFhLElBQWI7QUFDRDtBQUNELFdBQUtrQyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtRLFlBQUw7QUFDQSxXQUFLQyxhQUFMO0FBQ0EsV0FBS1QsTUFBTDtBQUNEOzs7O0VBdkcrQixlQUFLVSxJOztrQkFBbEJsRCxJIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlckluZm86ICcnLFxuICAgICAgaXNWaXA6IGZhbHNlLFxuICAgICAgdmFsaWRhdGlvbjogJycsXG4gICAgICByZWZ1bmRpbmc6ICcnLFxuICAgICAgdW5kZWxpdmVyZWQ6ICcnLFxuICAgICAgdW5wYWlkOiAnJyxcbiAgICAgIHVucmVjZWlwdGVkOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3MnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Db2xsZWN0ICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2NvbGxlY3QnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjbGVhciAoKSB7XG4gICAgICAgIHdlcHkuZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN57yT5a2YJyArIHJlcy5jdXJyZW50U2l6ZSArICdrYizmmK/lkKbmuIXnkIbnvJPlrZgnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LmNsZWFyU3RvcmFnZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFVzZXJEYXRhICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNWaXAgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgX3RoaXMuaXNWaXAgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHJlcy5kYXRhLnZpcEVuZCwgJ1nlubRt5pyIZOaXpScpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRVc2VyT3JkZXIgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5yZWZ1bmRpbmcgPSBkYXRhLnJlZnVuZGluZ1xuICAgICAgICAgIF90aGlzLnVuZGVsaXZlcmVkID0gZGF0YS51bmRlbGl2ZXJlZFxuICAgICAgICAgIF90aGlzLnVucGFpZCA9IGRhdGEudW5wYWlkXG4gICAgICAgICAgX3RoaXMudW5yZWNlaXB0ZWQgPSBkYXRhLnVucmVjZWlwdGVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigndXNlcicpXG4gICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICB0aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==