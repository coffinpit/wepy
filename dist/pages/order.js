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

    var _temp, _this2, _ret;

    _classCallCheck(this, Order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '确认订单'
    }, _this2.computed = {
      userLevel: function userLevel() {
        if (this.$parent.globalData.userLevel === 0) {
          return false;
        } else if (this.$parent.globalData.userLevel === 1) {
          return true;
        }
      },
      isNull: function isNull() {
        if (this.order.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }, _this2.data = {
      orderHash: '',
      token: '',
      user: {
        add: '请选择收货地址'
      },
      addressMain: '',
      appType: 'web',
      order: [],
      reduction: '',
      freight: '',
      pay: '',
      finalprice: ''
    }, _this2.methods = {
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address?page=order'
        });
      },
      goPay: function goPay() {
        if (this.user === '') {
          _wepy2.default.showToast({
            title: '请选择收货地址',
            icon: 'none',
            image: '../image/cancel.png'
          });
        } else {
          console.log(this.user.areaId);
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
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
    value: function applyOrder() {
      var _this3 = this;

      this.order = [];
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.ApplyOrderHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.orderHash = data.hash;
          _this.reduction = data.reduction;
          _this.freight = data.freight;
          _this.pay = data.pay;
          _this.finalprice = data.finalPrice;
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.freight = item.freight;
            obj.coldChecked = false;
            obj.tempCold = [];
            obj.coldlist = _this3.initChild(item.salesUnits);
            _this.order.push(obj);
            _this.$apply();
          });
          console.log(_this.order);
        }
      });
    }
  }, {
    key: 'initChild',
    value: function initChild(parent) {
      var child = [];
      parent.forEach(function (item) {
        var obj = {};
        obj.path = item.cover;
        obj.title = item.title;
        obj.price = item.memberPrice;
        obj.oldprice = item.price;
        obj.id = item.productId;
        obj.sourceType = item.salesUnitType;
        obj.sourceId = item.salesUnitId;
        if (item.buyCount <= item.keepCount) {
          obj.detail = item.viceTitle + '×' + item.buyCount;
          obj.count = item.buyCount;
          obj.initCount = item.buyCount;
        } else {
          obj.detail = item.viceTitle + '×' + item.keepCount;
          obj.count = item.keepCount;
          obj.initCount = item.keepCount;
        }
        obj.checked = false;
        obj.totalCount = item.keepCount;
        child.push(obj);
      });
      return child;
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      if (param.user) {
        this.user = JSON.parse(param.user);
      }
      this.token = this.$parent.getToken('paycart');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.$apply();
      this.applyOrder();
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXB1dGVkIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJpc051bGwiLCJvcmRlciIsImxlbmd0aCIsImRhdGEiLCJvcmRlckhhc2giLCJ0b2tlbiIsInVzZXIiLCJhZGQiLCJhZGRyZXNzTWFpbiIsImFwcFR5cGUiLCJyZWR1Y3Rpb24iLCJmcmVpZ2h0IiwicGF5IiwiZmluYWxwcmljZSIsIm1ldGhvZHMiLCJnb0FkZHJlc3MiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29QYXkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImNvbnNvbGUiLCJsb2ciLCJhcmVhSWQiLCJvcmRlcklkIiwiSHR0cFJlcXVlc3QiLCJHZXRPcmRlckh0dHAiLCJ0aGVuIiwicmVzIiwiX3RoaXMiLCJBcHBseU9yZGVySHR0cCIsImVycm9yIiwiaGFzaCIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImNvbGRsaXN0IiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInB1c2giLCIkYXBwbHkiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsImlkIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5Q291bnQiLCJrZWVwQ291bnQiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJjb3VudCIsImluaXRDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJnZXRUb2tlbiIsImFwcGx5T3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7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LGNBQUl5QixLQUFKLEdBQVkxQixLQUFLdUIsU0FBakI7QUFDQXRCLGNBQUkwQixTQUFKLEdBQWdCM0IsS0FBS3VCLFNBQXJCO0FBQ0Q7QUFDRHRCLFlBQUkyQixPQUFKLEdBQWMsS0FBZDtBQUNBM0IsWUFBSTRCLFVBQUosR0FBaUI3QixLQUFLdUIsU0FBdEI7QUFDQWIsY0FBTUgsSUFBTixDQUFXTixHQUFYO0FBQ0QsT0FyQkQ7QUFzQkEsYUFBT1MsS0FBUDtBQUNEOzs7MkJBQ09vQixLLEVBQU87QUFDYixVQUFJQSxNQUFNOUQsSUFBVixFQUFnQjtBQUNkLGFBQUtBLElBQUwsR0FBWStELEtBQUtDLEtBQUwsQ0FBV0YsTUFBTTlELElBQWpCLENBQVo7QUFDRDtBQUNELFdBQUtELEtBQUwsR0FBYSxLQUFLUCxPQUFMLENBQWF5RSxRQUFiLENBQXNCLFNBQXRCLENBQWI7QUFDQSxXQUFLekIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLQSxNQUFMO0FBQ0EsV0FBSzBCLFVBQUw7QUFDRDs7OztFQTlIZ0MsZUFBS0MsSTs7a0JBQW5CaEYsSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJ1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgb3JkZXJIYXNoOiAnJyxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYWRkOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJ1xuICAgICAgfSxcbiAgICAgIGFkZHJlc3NNYWluOiAnJyxcbiAgICAgIGFwcFR5cGU6ICd3ZWInLFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgcmVkdWN0aW9uOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIGZpbmFscHJpY2U6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlciA9PT0gJycpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXIuYXJlYUlkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZU9yZGVyICgpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB9KVxuICAgIH1cbiAgICBhcHBseU9yZGVyICgpIHtcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQXBwbHlPcmRlckh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMub3JkZXJIYXNoID0gZGF0YS5oYXNoXG4gICAgICAgICAgX3RoaXMucmVkdWN0aW9uID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBpZiAoaXRlbS5idXlDb3VudCA8PSBpdGVtLmtlZXBDb3VudCkge1xuICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0ua2VlcENvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgfVxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS51c2VyKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UocGFyYW0udXNlcilcbiAgICAgIH1cbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ3BheWNhcnQnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICB9XG4gIH1cbiJdfQ==