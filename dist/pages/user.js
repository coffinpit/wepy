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
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.refunding = data.refunding;
          _this.undelivered = data.undelivered;
          _this.unpaid = data.unpaid;
          _this.unreceipted = data.unreceipted;
        }
        _this.$apply();
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
      this.initUserData();
      this.initUserOrder();
      this.$apply();
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImNsZWFyIiwiZ2V0U3RvcmFnZUluZm8iLCJzdWNjZXNzIiwicmVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY3VycmVudFNpemUiLCJjb25maXJtIiwiY2xlYXJTdG9yYWdlIiwiX3RoaXMiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldFVzZXJJbmZvIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImxldmVsIiwiZGF0ZUZvcm1hdCIsInZpcEVuZCIsIiRhcHBseSIsIkdldFVzZXJPcmRlciIsImdldFRva2VuIiwiZ2xvYmFsRGF0YSIsInVzZXJMZXZlbCIsImluaXRVc2VyRGF0YSIsImluaXRVc2VyT3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGdCQUFVLEVBRkw7QUFHTEMsYUFBTyxLQUhGO0FBSUxDLGtCQUFZLEVBSlA7QUFLTEMsaUJBQVcsRUFMTjtBQU1MQyxtQkFBYSxFQU5SO0FBT0xDLGNBQVEsRUFQSDtBQVFMQyxtQkFBYTtBQVJSLEssU0FVUEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0s7QUFDWCx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQUxPO0FBTVJDLFdBTlEsbUJBTUM7QUFD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bnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uuS4reW/gydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHVzZXJJbmZvOiAnJyxcbiAgICAgIGlzVmlwOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRpb246ICcnLFxuICAgICAgcmVmdW5kaW5nOiAnJyxcbiAgICAgIHVuZGVsaXZlcmVkOiAnJyxcbiAgICAgIHVucGFpZDogJycsXG4gICAgICB1bnJlY2VpcHRlZDogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsZWFyICgpIHtcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3nvJPlrZgnICsgcmVzLmN1cnJlbnRTaXplICsgJ2tiLOaYr+WQpua4heeQhue8k+WtmCcsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VXNlckRhdGEgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxldmVsID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxldmVsID09PSAxKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQocmVzLmRhdGEudmlwRW5kLCAnWeW5tG3mnIhk5pelJylcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFVzZXJPcmRlciAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMucmVmdW5kaW5nID0gZGF0YS5yZWZ1bmRpbmdcbiAgICAgICAgICBfdGhpcy51bmRlbGl2ZXJlZCA9IGRhdGEudW5kZWxpdmVyZWRcbiAgICAgICAgICBfdGhpcy51bnBhaWQgPSBkYXRhLnVucGFpZFxuICAgICAgICAgIF90aGlzLnVucmVjZWlwdGVkID0gZGF0YS51bnJlY2VpcHRlZFxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigndXNlcicpXG4gICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICB0aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5pbml0VXNlckRhdGEoKVxuICAgICAgdGhpcy5pbml0VXNlck9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==