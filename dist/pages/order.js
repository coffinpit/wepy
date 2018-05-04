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
    key: 'initOrder',
    value: function initOrder() {
      var data = {
        token: this.token,
        orderId: this.orderId
      };
      this.$parent.HttpRequest.GetOrderHttp(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(data) {
      this.orderHash = data.hash;
      this.order = JSON.parse(data.order);
      this.token = this.$parent.getToken('order');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJvcmRlckhhc2giLCJ0b2tlbiIsInVzZXIiLCJhZGQiLCJhZGRyZXNzTWFpbiIsImFwcFR5cGUiLCJvcmRlciIsIm1ldGhvZHMiLCJnb0FkZHJlc3MiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib3JkZXJJZCIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIkdldE9yZGVySHR0cCIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiaGFzaCIsIkpTT04iLCJwYXJzZSIsImdldFRva2VuIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsYUFBTyxFQUZGO0FBR0xDLFlBQU07QUFDSkMsYUFBSztBQURELE9BSEQ7QUFNTEMsbUJBQWEsRUFOUjtBQU9MQyxlQUFTLEtBUEo7QUFRTEMsYUFBTztBQVJGLEssUUFVUEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0s7QUFDWCx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRDtBQUxPLEs7Ozs7O2dDQU9HO0FBQ1gsVUFBSVgsT0FBTztBQUNURSxlQUFPLEtBQUtBLEtBREg7QUFFVFUsaUJBQVMsS0FBS0E7QUFGTCxPQUFYO0FBSUEsV0FBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCQyxZQUF6QixDQUFzQ2YsSUFBdEMsRUFBNENnQixJQUE1QyxDQUFpRCxVQUFDQyxHQUFELEVBQVM7QUFDeERDLGdCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDRCxPQUZEO0FBR0Q7OzsyQkFDT2pCLEksRUFBTTtBQUNaLFdBQUtDLFNBQUwsR0FBaUJELEtBQUtvQixJQUF0QjtBQUNBLFdBQUtiLEtBQUwsR0FBYWMsS0FBS0MsS0FBTCxDQUFXdEIsS0FBS08sS0FBaEIsQ0FBYjtBQUNBLFdBQUtMLEtBQUwsR0FBYSxLQUFLVyxPQUFMLENBQWFVLFFBQWIsQ0FBc0IsT0FBdEIsQ0FBYjtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7OzZCQUNTLENBQ1Q7Ozs7RUFyQ2dDLGVBQUtDLEk7O2tCQUFuQjVCLEsiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIG9yZGVySGFzaDogJycsXG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGFkZDogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCdcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzTWFpbjogJycsXG4gICAgICBhcHBUeXBlOiAnd2ViJyxcbiAgICAgIG9yZGVyOiBbXVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1vcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdE9yZGVyICgpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGRhdGEpIHtcbiAgICAgIHRoaXMub3JkZXJIYXNoID0gZGF0YS5oYXNoXG4gICAgICB0aGlzLm9yZGVyID0gSlNPTi5wYXJzZShkYXRhLm9yZGVyKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignb3JkZXInKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgIH1cbiAgfVxuIl19