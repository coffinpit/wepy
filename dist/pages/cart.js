'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _orderitem = require('./../components/orderitem.js');

var _orderitem2 = _interopRequireDefault(_orderitem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cart = function (_wepy$page) {
  _inherits(Cart, _wepy$page);

  function Cart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '购物车'
    }, _this.$repeat = {}, _this.$props = { "orderItem": { "xmlns:v-bind": "", "v-bind:list.once": "list" } }, _this.$events = {}, _this.components = {
      orderItem: _orderitem2.default
    }, _this.data = {
      delBtnWidth: 120,
      startX: 0,
      cartStatus: {
        totalprice: '300',
        discount: '110'
      },
      list: [{
        txtStyle: '',
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1231123',
        detail: '500g × 5',
        count: '5'
      }, {
        txtStyle: '',
        path: '../image/login-bg.jpg',
        title: '美国自然牛精',
        price: '99.0',
        oldprice: '160.0',
        id: '1231123',
        detail: '500g × 5',
        count: '2'
      }]
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cart, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckl0ZW0iLCJkYXRhIiwiZGVsQnRuV2lkdGgiLCJzdGFydFgiLCJjYXJ0U3RhdHVzIiwidG90YWxwcmljZSIsImRpc2NvdW50IiwibGlzdCIsInR4dFN0eWxlIiwicGF0aCIsInRpdGxlIiwicHJpY2UiLCJvbGRwcmljZSIsImlkIiwiZGV0YWlsIiwiY291bnQiLCJtZXRob2RzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLE1BQXRDLEVBQWIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFFBR1ZDLEksR0FBTztBQUNMQyxtQkFBYSxHQURSO0FBRUxDLGNBQVEsQ0FGSDtBQUdMQyxrQkFBWTtBQUNWQyxvQkFBWSxLQURGO0FBRVZDLGtCQUFVO0FBRkEsT0FIUDtBQU9MQyxZQUFNLENBQ0o7QUFDRUMsa0JBQVUsRUFEWjtBQUVFQyxjQUFNLHVCQUZSO0FBR0VDLGVBQU8sYUFIVDtBQUlFQyxlQUFPLE1BSlQ7QUFLRUMsa0JBQVUsT0FMWjtBQU1FQyxZQUFJLFNBTk47QUFPRUMsZ0JBQVEsVUFQVjtBQVFFQyxlQUFPO0FBUlQsT0FESSxFQVdKO0FBQ0VQLGtCQUFVLEVBRFo7QUFFRUMsY0FBTSx1QkFGUjtBQUdFQyxlQUFPLFFBSFQ7QUFJRUMsZUFBTyxNQUpUO0FBS0VDLGtCQUFVLE9BTFo7QUFNRUMsWUFBSSxTQU5OO0FBT0VDLGdCQUFRLFVBUFY7QUFRRUMsZUFBTztBQVJULE9BWEk7QUFQRCxLLFFBOEJQQyxPLEdBQVUsRTs7Ozs7NkJBRUE7QUFDUixXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUE1QytCLGVBQUtDLEk7O2tCQUFsQnpCLEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgb3JkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcml0ZW0nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9pidcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm9yZGVySXRlbVwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bGlzdC5vbmNlXCI6XCJsaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVySXRlbTogb3JkZXJcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRlbEJ0bldpZHRoOiAxMjAsXG4gICAgICBzdGFydFg6IDAsXG4gICAgICBjYXJ0U3RhdHVzOiB7XG4gICAgICAgIHRvdGFscHJpY2U6ICczMDAnLFxuICAgICAgICBkaXNjb3VudDogJzExMCdcbiAgICAgIH0sXG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eHRTdHlsZTogJycsXG4gICAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgICAgaWQ6ICcxMjMxMTIzJyxcbiAgICAgICAgICBkZXRhaWw6ICc1MDBnIMOXIDUnLFxuICAgICAgICAgIGNvdW50OiAnNSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR4dFN0eWxlOiAnJyxcbiAgICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvicsXG4gICAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgICBpZDogJzEyMzExMjMnLFxuICAgICAgICAgIGRldGFpbDogJzUwMGcgw5cgNScsXG4gICAgICAgICAgY291bnQ6ICcyJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=