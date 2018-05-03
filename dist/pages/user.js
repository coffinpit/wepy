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
      this.initUserData();
      this.initUserOrder();
      this.$apply();
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsIl90aGlzIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiSHR0cFJlcXVlc3QiLCJHZXRVc2VySW5mbyIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJsZXZlbCIsImRhdGVGb3JtYXQiLCJ2aXBFbmQiLCIkYXBwbHkiLCJHZXRVc2VyT3JkZXIiLCJnZXRUb2tlbiIsImdsb2JhbERhdGEiLCJpbml0VXNlckRhdGEiLCJpbml0VXNlck9yZGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxnQkFBVSxFQUZMO0FBR0xDLGFBQU8sS0FIRjtBQUlMQyxrQkFBWSxFQUpQO0FBS0xDLGlCQUFXLEVBTE47QUFNTEMsbUJBQWEsRUFOUjtBQU9MQyxjQUFRLEVBUEg7QUFRTEMsbUJBQWE7QUFSUixLLFNBVVBDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNLO0FBQ1gsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0Q7QUFMTyxLOzs7OzttQ0FPTTtBQUFBOztBQUNkLFVBQUlDLFFBQVEsSUFBWjtBQUNBLFdBQUtDLE9BQUwsQ0FBYUMsV0FBYjtBQUNBLFVBQUlmLE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLYSxPQUFMLENBQWFFLFdBQWIsQ0FBeUJDLFdBQXpCLENBQXFDakIsSUFBckMsRUFBMkNrQixJQUEzQyxDQUFnRCxVQUFDQyxHQUFELEVBQVM7QUFDdkRDLGdCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQSxZQUFJQSxJQUFJbkIsSUFBSixDQUFTc0IsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixjQUFJdEIsT0FBT21CLElBQUluQixJQUFKLENBQVNBLElBQXBCO0FBQ0EsY0FBSUEsS0FBS3VCLEtBQUwsS0FBZSxDQUFuQixFQUFzQjtBQUNwQlYsa0JBQU1WLEtBQU4sR0FBYyxLQUFkO0FBQ0QsV0FGRCxNQUVPLElBQUlILEtBQUt1QixLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDM0JWLGtCQUFNVixLQUFOLEdBQWMsSUFBZDtBQUNEO0FBQ0QsaUJBQUtDLFVBQUwsR0FBa0IsT0FBS1UsT0FBTCxDQUFhVSxVQUFiLENBQXdCTCxJQUFJbkIsSUFBSixDQUFTeUIsTUFBakMsRUFBeUMsUUFBekMsQ0FBbEI7QUFDRDtBQUNEWixjQUFNYSxNQUFOO0FBQ0QsT0FaRDtBQWFEOzs7b0NBQ2dCO0FBQ2YsVUFBSWIsUUFBUSxJQUFaO0FBQ0EsVUFBSWIsT0FBTztBQUNUQyxlQUFPLEtBQUtBO0FBREgsT0FBWDtBQUdBLFdBQUthLE9BQUwsQ0FBYUUsV0FBYixDQUF5QlcsWUFBekIsQ0FBc0MzQixJQUF0QyxFQUE0Q2tCLElBQTVDLENBQWlELFVBQUNDLEdBQUQsRUFBUztBQUN4REMsZ0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLFlBQUlBLElBQUluQixJQUFKLENBQVNzQixLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUl0QixPQUFPbUIsSUFBSW5CLElBQUosQ0FBU0EsSUFBcEI7QUFDQWEsZ0JBQU1SLFNBQU4sR0FBa0JMLEtBQUtLLFNBQXZCO0FBQ0FRLGdCQUFNUCxXQUFOLEdBQW9CTixLQUFLTSxXQUF6QjtBQUNBTyxnQkFBTU4sTUFBTixHQUFlUCxLQUFLTyxNQUFwQjtBQUNBTSxnQkFBTUwsV0FBTixHQUFvQlIsS0FBS1EsV0FBekI7QUFDRDtBQUNESyxjQUFNYSxNQUFOO0FBQ0QsT0FWRDtBQVdEOzs7NkJBQ1M7QUFDUixXQUFLekIsS0FBTCxHQUFhLEtBQUthLE9BQUwsQ0FBYWMsUUFBYixDQUFzQixNQUF0QixDQUFiO0FBQ0EsV0FBSzFCLFFBQUwsR0FBZ0IsS0FBS1ksT0FBTCxDQUFhZSxVQUFiLENBQXdCM0IsUUFBeEM7QUFDQSxXQUFLNEIsWUFBTDtBQUNBLFdBQUtDLGFBQUw7QUFDQSxXQUFLTCxNQUFMO0FBQ0Q7Ozs7RUFoRStCLGVBQUtNLEk7O2tCQUFsQm5DLEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VySW5mbzogJycsXG4gICAgICBpc1ZpcDogZmFsc2UsXG4gICAgICB2YWxpZGF0aW9uOiAnJyxcbiAgICAgIHJlZnVuZGluZzogJycsXG4gICAgICB1bmRlbGl2ZXJlZDogJycsXG4gICAgICB1bnBhaWQ6ICcnLFxuICAgICAgdW5yZWNlaXB0ZWQ6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcydcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFVzZXJEYXRhICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VySW5mbyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNWaXAgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgX3RoaXMuaXNWaXAgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHJlcy5kYXRhLnZpcEVuZCwgJ1nlubRt5pyIZOaXpScpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRVc2VyT3JkZXIgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZnVuZGluZyA9IGRhdGEucmVmdW5kaW5nXG4gICAgICAgICAgX3RoaXMudW5kZWxpdmVyZWQgPSBkYXRhLnVuZGVsaXZlcmVkXG4gICAgICAgICAgX3RoaXMudW5wYWlkID0gZGF0YS51bnBhaWRcbiAgICAgICAgICBfdGhpcy51bnJlY2VpcHRlZCA9IGRhdGEudW5yZWNlaXB0ZWRcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ3VzZXInKVxuICAgICAgdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICB0aGlzLmluaXRVc2VyRGF0YSgpXG4gICAgICB0aGlzLmluaXRVc2VyT3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19