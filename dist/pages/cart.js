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
    }, _this.$repeat = {}, _this.$props = { "orderItem": { "xmlns:v-bind": "", "v-bind:coldlist.sync": "coldList", "v-bind:normallist.sync": "normalList", "xmlns:v-on": "" } }, _this.$events = { "orderItem": { "v-on:checkTap": "check" } }, _this.components = {
      orderItem: _orderitem2.default
    }, _this.data = {
      delBtnWidth: 120,
      startX: 0,
      cartStatus: {
        totalprice: '300',
        discount: '110'
      },
      coldList: [{
        txtStyle: '',
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1231123',
        detail: '500g × 5',
        count: '10',
        checked: false
      }, {
        txtStyle: '',
        path: '../image/login-bg.jpg',
        title: '美国自然牛',
        price: '99.0',
        oldprice: '160.0',
        id: '1223123',
        detail: '500g × 5',
        count: '6',
        checked: false
      }],
      normalList: [{
        txtStyle: '',
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1261123',
        detail: '500g × 5',
        count: '10'
      }, {
        txtStyle: '',
        path: '../image/login-bg.jpg',
        title: '阿根廷红虾',
        price: '99.0',
        oldprice: '160.0',
        id: '1234443',
        detail: '500g × 5',
        count: '6'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckl0ZW0iLCJkYXRhIiwiZGVsQnRuV2lkdGgiLCJzdGFydFgiLCJjYXJ0U3RhdHVzIiwidG90YWxwcmljZSIsImRpc2NvdW50IiwiY29sZExpc3QiLCJ0eHRTdHlsZSIsInBhdGgiLCJ0aXRsZSIsInByaWNlIiwib2xkcHJpY2UiLCJpZCIsImRldGFpbCIsImNvdW50IiwiY2hlY2tlZCIsIm5vcm1hbExpc3QiLCJtZXRob2RzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXFELDBCQUF5QixZQUE5RSxFQUEyRixjQUFhLEVBQXhHLEVBQWIsRSxRQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsaUJBQWdCLE9BQWpCLEVBQWIsRSxRQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFFBR1ZDLEksR0FBTztBQUNMQyxtQkFBYSxHQURSO0FBRUxDLGNBQVEsQ0FGSDtBQUdMQyxrQkFBWTtBQUNWQyxvQkFBWSxLQURGO0FBRVZDLGtCQUFVO0FBRkEsT0FIUDtBQU9MQyxnQkFBVSxDQUNSO0FBQ0VDLGtCQUFVLEVBRFo7QUFFRUMsY0FBTSx1QkFGUjtBQUdFQyxlQUFPLGFBSFQ7QUFJRUMsZUFBTyxNQUpUO0FBS0VDLGtCQUFVLE9BTFo7QUFNRUMsWUFBSSxTQU5OO0FBT0VDLGdCQUFRLFVBUFY7QUFRRUMsZUFBTyxJQVJUO0FBU0VDLGlCQUFTO0FBVFgsT0FEUSxFQVlSO0FBQ0VSLGtCQUFVLEVBRFo7QUFFRUMsY0FBTSx1QkFGUjtBQUdFQyxlQUFPLE9BSFQ7QUFJRUMsZUFBTyxNQUpUO0FBS0VDLGtCQUFVLE9BTFo7QUFNRUMsWUFBSSxTQU5OO0FBT0VDLGdCQUFRLFVBUFY7QUFRRUMsZUFBTyxHQVJUO0FBU0VDLGlCQUFTO0FBVFgsT0FaUSxDQVBMO0FBK0JMQyxrQkFBWSxDQUNWO0FBQ0VULGtCQUFVLEVBRFo7QUFFRUMsY0FBTSx1QkFGUjtBQUdFQyxlQUFPLGFBSFQ7QUFJRUMsZUFBTyxNQUpUO0FBS0VDLGtCQUFVLE9BTFo7QUFNRUMsWUFBSSxTQU5OO0FBT0VDLGdCQUFRLFVBUFY7QUFRRUMsZUFBTztBQVJULE9BRFUsRUFXVjtBQUNFUCxrQkFBVSxFQURaO0FBRUVDLGNBQU0sdUJBRlI7QUFHRUMsZUFBTyxPQUhUO0FBSUVDLGVBQU8sTUFKVDtBQUtFQyxrQkFBVSxPQUxaO0FBTUVDLFlBQUksU0FOTjtBQU9FQyxnQkFBUSxVQVBWO0FBUUVDLGVBQU87QUFSVCxPQVhVO0FBL0JQLEssUUFzRFBHLE8sR0FBVSxFOzs7Ozs2QkFFQTtBQUNSLFdBQUtDLE1BQUw7QUFDRDs7OztFQXBFK0IsZUFBS0MsSTs7a0JBQWxCM0IsSSIsImZpbGUiOiJjYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBvcmRlciBmcm9tICcuLi9jb21wb25lbnRzL29yZGVyaXRlbSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wib3JkZXJJdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjb2xkbGlzdC5zeW5jXCI6XCJjb2xkTGlzdFwiLFwidi1iaW5kOm5vcm1hbGxpc3Quc3luY1wiOlwibm9ybWFsTGlzdFwiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcIm9yZGVySXRlbVwiOntcInYtb246Y2hlY2tUYXBcIjpcImNoZWNrXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckl0ZW06IG9yZGVyXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZWxCdG5XaWR0aDogMTIwLFxuICAgICAgc3RhcnRYOiAwLFxuICAgICAgY2FydFN0YXR1czoge1xuICAgICAgICB0b3RhbHByaWNlOiAnMzAwJyxcbiAgICAgICAgZGlzY291bnQ6ICcxMTAnXG4gICAgICB9LFxuICAgICAgY29sZExpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR4dFN0eWxlOiAnJyxcbiAgICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgICBpZDogJzEyMzExMjMnLFxuICAgICAgICAgIGRldGFpbDogJzUwMGcgw5cgNScsXG4gICAgICAgICAgY291bnQ6ICcxMCcsXG4gICAgICAgICAgY2hlY2tlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR4dFN0eWxlOiAnJyxcbiAgICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJmycsXG4gICAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgICBpZDogJzEyMjMxMjMnLFxuICAgICAgICAgIGRldGFpbDogJzUwMGcgw5cgNScsXG4gICAgICAgICAgY291bnQ6ICc2JyxcbiAgICAgICAgICBjaGVja2VkOiBmYWxzZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgbm9ybWFsTGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgdHh0U3R5bGU6ICcnLFxuICAgICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICAgIGlkOiAnMTI2MTEyMycsXG4gICAgICAgICAgZGV0YWlsOiAnNTAwZyDDlyA1JyxcbiAgICAgICAgICBjb3VudDogJzEwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHh0U3R5bGU6ICcnLFxuICAgICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICAgIHRpdGxlOiAn6Zi/5qC55bu357qi6Jm+JyxcbiAgICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICAgIGlkOiAnMTIzNDQ0MycsXG4gICAgICAgICAgZGV0YWlsOiAnNTAwZyDDlyA1JyxcbiAgICAgICAgICBjb3VudDogJzYnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==