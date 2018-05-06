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

var Order = function (_wepy$page) {
  _inherits(Order, _wepy$page);

  function Order() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '确认订单'
    }, _this.data = {
      orderHash: '',
      token: '',
      user: {
        add: '请选择收货地址'
      },
      addressMain: '',
      appType: 'web',
      order: []
    }, _this.methods = {
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address?page=order'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Order, [{
    key: 'createOrder',
    value: function createOrder() {
      var data = {
        token: this.token,
        orderId: this.orderId
      };
      this.$parent.HttpRequest.GetOrderHttp(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'applyOrder',
    value: function applyOrder(cb) {
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.ApplyOrderHttp(data).then(function (res) {
        console.log(res);
        cb && cb();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.applyOrder();
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJvcmRlckhhc2giLCJ0b2tlbiIsInVzZXIiLCJhZGQiLCJhZGRyZXNzTWFpbiIsImFwcFR5cGUiLCJvcmRlciIsIm1ldGhvZHMiLCJnb0FkZHJlc3MiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib3JkZXJJZCIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIkdldE9yZGVySHR0cCIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiY2IiLCJBcHBseU9yZGVySHR0cCIsIiRhcHBseSIsImFwcGx5T3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxhQUFPLEVBRkY7QUFHTEMsWUFBTTtBQUNKQyxhQUFLO0FBREQsT0FIRDtBQU1MQyxtQkFBYSxFQU5SO0FBT0xDLGVBQVMsS0FQSjtBQVFMQyxhQUFPO0FBUkYsSyxRQVVQQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUNYLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdEO0FBTE8sSzs7Ozs7a0NBT0s7QUFDYixVQUFJWCxPQUFPO0FBQ1RFLGVBQU8sS0FBS0EsS0FESDtBQUVUVSxpQkFBUyxLQUFLQTtBQUZMLE9BQVg7QUFJQSxXQUFLQyxPQUFMLENBQWFDLFdBQWIsQ0FBeUJDLFlBQXpCLENBQXNDZixJQUF0QyxFQUE0Q2dCLElBQTVDLENBQWlELFVBQUNDLEdBQUQsRUFBUztBQUN4REMsZ0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNELE9BRkQ7QUFHRDs7OytCQUNXRyxFLEVBQUk7QUFDZCxVQUFJcEIsT0FBTztBQUNURSxlQUFPLEtBQUtBO0FBREgsT0FBWDtBQUdBLFdBQUtXLE9BQUwsQ0FBYUMsV0FBYixDQUF5Qk8sY0FBekIsQ0FBd0NyQixJQUF4QyxFQUE4Q2dCLElBQTlDLENBQW1ELFVBQUNDLEdBQUQsRUFBUztBQUMxREMsZ0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBRyxjQUFNQSxJQUFOO0FBQ0QsT0FIRDtBQUlEOzs7NkJBQ1M7QUFDUixXQUFLRSxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtDLFVBQUw7QUFDRDs7OztFQTVDZ0MsZUFBS0MsSTs7a0JBQW5CM0IsSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgb3JkZXJIYXNoOiAnJyxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYWRkOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJ1xuICAgICAgfSxcbiAgICAgIGFkZHJlc3NNYWluOiAnJyxcbiAgICAgIGFwcFR5cGU6ICd3ZWInLFxuICAgICAgb3JkZXI6IFtdXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVPcmRlciAoKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVySHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSlcbiAgICB9XG4gICAgYXBwbHlPcmRlciAoY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmFwcGx5T3JkZXIoKVxuICAgIH1cbiAgfVxuIl19