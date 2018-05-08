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
      navigationBarTitleText: '我的订单'
    }, _this2.data = {
      token: '',
      package: [{
        title: '全部',
        type: 'all'
      }, {
        title: '待支付',
        type: 'unpaid'
      }, {
        title: '待发货',
        type: 'undelivered'
      }, {
        title: '待收货',
        type: 'unreceipted'
      }, {
        title: '售后',
        type: 'refunding'
      }],
      orderStatus: ['待支付', '待发货', '待收货', '售后'],
      current: 0,
      orderType: 'all',
      orderList: [],
      pageSize: 5,
      pageNum: 1,
      totalPageNum: 0
    }, _this2.methods = {
      checkPackage: function checkPackage(index, type) {
        this.current = index;
        this.orderType = type;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Order, [{
    key: 'initOrder',
    value: function initOrder() {
      var _this3 = this;

      this.orderList = [];
      this.pageNum = 1;
      var _this = this;
      var data = {
        token: this.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        status: this.orderType
      };
      console.log(data);
      this.$parent.HttpRequest.GetOrderStatus(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          data.orders.forEach(function (item) {
            var obj = {};
            obj.title = item.showId;
            obj.pay = item.pay;
            obj.freight = item.freight;
            obj.status = _this.orderStatus[item.status - 1];
            obj.orderDetail = _this3.initChild(item.buyingRecords);
            _this.orderList.push(obj);
          });
        }
        _this.$apply();
      });
    }
  }, {
    key: 'initChild',
    value: function initChild(parent) {
      var child = [];
      parent.forEach(function (item) {
        var obj = {};
        obj.path = item.cover;
        obj.title = item.productName;
        obj.price = item.memberPrice;
        obj.oldprice = item.price;
        obj.id = item.productId;
        obj.sourceType = item.salesUnitType;
        obj.sourceId = item.salesUnitId;
        obj.detail = item.title + '×' + item.buyingCount;
        obj.count = item.buyingCount;
        obj.checked = false;
        obj.totalCount = item.keepCount;
        child.push(obj);
      });
      return child;
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('order');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initOrder();
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJvcmRlckxpc3QiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJtZXRob2RzIiwiY2hlY2tQYWNrYWdlIiwiaW5kZXgiLCJfdGhpcyIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJHZXRPcmRlclN0YXR1cyIsInRoZW4iLCJyZXMiLCJlcnJvciIsIm9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwic2hvd0lkIiwicGF5IiwiZnJlaWdodCIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwiYnV5aW5nUmVjb3JkcyIsInB1c2giLCIkYXBwbHkiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwiaWQiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNvdW50IiwiY2hlY2tlZCIsInRvdGFsQ291bnQiLCJrZWVwQ291bnQiLCJnZXRUb2tlbiIsImluaXRPcmRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsZUFBUyxDQUFDO0FBQ1JDLGVBQU8sSUFEQztBQUVSQyxjQUFNO0FBRkUsT0FBRCxFQUdOO0FBQ0RELGVBQU8sS0FETjtB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QUFLeUIsV0FBakI7QUFDQXhCLFlBQUkwQixPQUFKLEdBQWMsS0FBZDtBQUNBMUIsWUFBSTJCLFVBQUosR0FBaUI1QixLQUFLNkIsU0FBdEI7QUFDQWxCLGNBQU1ILElBQU4sQ0FBV1AsR0FBWDtBQUNELE9BZEQ7QUFlQSxhQUFPVSxLQUFQO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtyQyxLQUFMLEdBQWEsS0FBS2tCLE9BQUwsQ0FBYXNDLFFBQWIsQ0FBc0IsT0FBdEIsQ0FBYjtBQUNBLFdBQUtyQixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtzQixTQUFMO0FBQ0Q7Ozs7RUExRmdDLGVBQUtDLEk7O2tCQUFuQjlELEsiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhY2thZ2U6IFt7XG4gICAgICAgIHRpdGxlOiAn5YWo6YOoJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlK/ku5gnLFxuICAgICAgICB0eXBlOiAndW5wYWlkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heWPkei0pycsXG4gICAgICAgIHR5cGU6ICd1bmRlbGl2ZXJlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlLbotKcnLFxuICAgICAgICB0eXBlOiAndW5yZWNlaXB0ZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZSu5ZCOJyxcbiAgICAgICAgdHlwZTogJ3JlZnVuZGluZydcbiAgICAgIH1dLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5b6F5pSv5LuYJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5ZSu5ZCOJ10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgb3JkZXJUeXBlOiAnYWxsJyxcbiAgICAgIG9yZGVyTGlzdDogW10sXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06IDBcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoZWNrUGFja2FnZSAoaW5kZXgsIHR5cGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSB0eXBlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRPcmRlciAoKSB7XG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IFtdXG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHN0YXR1czogdGhpcy5vcmRlclR5cGVcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJTdGF0dXMoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBkYXRhLm9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0uc2hvd0lkXG4gICAgICAgICAgICBvYmoucGF5ID0gaXRlbS5wYXlcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouc3RhdHVzID0gX3RoaXMub3JkZXJTdGF0dXNbaXRlbS5zdGF0dXMgLSAxXVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gdGhpcy5pbml0Q2hpbGQoaXRlbS5idXlpbmdSZWNvcmRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXJMaXN0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdvcmRlcicpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgfVxuICB9XG4iXX0=