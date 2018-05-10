'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _orderlist = require('./../components/orderlist.js');

var _orderlist2 = _interopRequireDefault(_orderlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderDetail = function (_wepy$page) {
  _inherits(OrderDetail, _wepy$page);

  function OrderDetail() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, OrderDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = OrderDetail.__proto__ || Object.getPrototypeOf(OrderDetail)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '订单详情'
    }, _this2.data = {
      token: '',
      id: '',
      orderStatus: ['异常', '待支付', '售后中', '订单关闭', '待发货', '待收货', '交易完成'],
      statusTxt: '',
      status: '',
      address: {},
      order: [],
      orderId: '',
      createTime: '',
      memo: '',
      pay: '',
      finalPrice: '',
      freight: '',
      remainTime: ''
    }, _this2.computed = {
      isNull: function isNull() {
        if (this.order.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }, _this2.$repeat = { "order": { "com": "orderList", "props": "" } }, _this2.$props = { "orderList": { "xmlns:v-bind": { "value": "", "for": "order", "item": "item", "index": "index", "key": "key" }, "v-bind:orderList.sync": { "value": "item.orderDetail", "for": "order", "item": "item", "index": "index", "key": "key" } } }, _this2.$events = {}, _this2.components = {
      orderList: _orderlist2.default
    }, _this2.methods = {}, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(OrderDetail, [{
    key: 'initData',
    value: function initData() {
      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      this.$parent.HttpRequest.GetOrderDetail(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.statusTxt = _this.orderStatus[data.status];
          _this.status = data.status;
          _this.orderId = data.showId;
          _this.createTime = _this.$parent.dateFormat(data.createTime * 1000, 'Y-m-d H:i:s');
          _this.memo = data.memo || '';
          _this.pay = data.pay;
          _this.freight = data.freight;
          setInterval(function () {
            data.payRemainingTime--;
            if (data.payRemainingTime > 0) {
              _this.remainTime = (data.payRemainingTime - data.payRemainingTime % 60) / 60 + '分' + data.payRemainingTime % 60 + '秒';
            } else {
              _this.remainTime = null;
            }
            _this.$apply();
          }, 1000);
          if (data.address) {
            _this.address.name = data.address.name;
            _this.address.phone = data.address.phone;
            _this.address.detail = data.address.fullAreaName + data.address.address;
          }
          _this.finalPrice = data.finalPrice;
          data.buyingRecords.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.order.push(obj);
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
    value: function onLoad(param) {
      this.id = param.id;
      this.token = this.$parent.getToken('orderDetail');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initData();
    }
  }]);

  return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/orderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJjb21wdXRlZCIsImlzTnVsbCIsImxlbmd0aCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsIm1ldGhvZHMiLCJfdGhpcyIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIkdldE9yZGVyRGV0YWlsIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInNob3dJZCIsImRhdGVGb3JtYXQiLCJzZXRJbnRlcnZhbCIsInBheVJlbWFpbmluZ1RpbWUiLCIkYXBwbHkiLCJuYW1lIiwicGhvbmUiLCJkZXRhaWwiLCJmdWxsQXJlYU5hbWUiLCJidXlpbmdSZWNvcmRzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJ0aXRsZSIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJidXlpbmdDb3VudCIsImNvdW50IiwiY2hlY2tlZCIsInRvdGFsQ291bnQiLCJrZWVwQ291bnQiLCJwYXJhbSIsImdldFRva2VuIiwiaW5pdERhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7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LEVBQUosR0FBUzBDLEtBQUtjLFNBQWQ7QUFDQWIsWUFBSWMsVUFBSixHQUFpQmYsS0FBS2dCLGFBQXRCO0FBQ0FmLFlBQUlnQixRQUFKLEdBQWVqQixLQUFLa0IsV0FBcEI7QUFDQWpCLFlBQUlMLE1BQUosR0FBYUksS0FBS0UsS0FBTCxHQUFhLEdBQWIsR0FBbUJGLEtBQUttQixXQUFyQztBQUNBbEIsWUFBSW1CLEtBQUosR0FBWXBCLEtBQUttQixXQUFqQjtBQUNBbEIsWUFBSW9CLE9BQUosR0FBYyxLQUFkO0FBQ0FwQixZQUFJcUIsVUFBSixHQUFpQnRCLEtBQUt1QixTQUF0QjtBQUNBaEIsY0FBTUYsSUFBTixDQUFXSixHQUFYO0FBQ0QsT0FkRDtBQWVBLGFBQU9NLEtBQVA7QUFDRDs7OzJCQUNPaUIsSyxFQUFPO0FBQ2IsV0FBS2xFLEVBQUwsR0FBVWtFLE1BQU1sRSxFQUFoQjtBQUNBLFdBQUtELEtBQUwsR0FBYSxLQUFLd0IsT0FBTCxDQUFhNEMsUUFBYixDQUFzQixhQUF0QixDQUFiO0FBQ0EsV0FBS2hDLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS2lDLFFBQUw7QUFDRDs7OztFQTFHc0MsZUFBS0MsSTs7a0JBQXpCMUUsVyIsImZpbGUiOiJvcmRlckRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V6K+m5oOFJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaWQ6ICcnLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn6K6i5Y2V5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBzdGF0dXNUeHQ6ICcnLFxuICAgICAgc3RhdHVzOiAnJyxcbiAgICAgIGFkZHJlc3M6IHt9LFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBjcmVhdGVUaW1lOiAnJyxcbiAgICAgIG1lbW86ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIGZpbmFsUHJpY2U6ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICByZW1haW5UaW1lOiAnJ1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMuaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRPcmRlckRldGFpbChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5zdGF0dXNUeHQgPSBfdGhpcy5vcmRlclN0YXR1c1tkYXRhLnN0YXR1c11cbiAgICAgICAgICBfdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1c1xuICAgICAgICAgIF90aGlzLm9yZGVySWQgPSBkYXRhLnNob3dJZFxuICAgICAgICAgIF90aGlzLmNyZWF0ZVRpbWUgPSBfdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQoZGF0YS5jcmVhdGVUaW1lICogMTAwMCwgJ1ktbS1kIEg6aTpzJylcbiAgICAgICAgICBfdGhpcy5tZW1vID0gZGF0YS5tZW1vIHx8ICcnXG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZGF0YS5wYXlSZW1haW5pbmdUaW1lIC0tXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lID4gMCkge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gKGRhdGEucGF5UmVtYWluaW5nVGltZSAtIGRhdGEucGF5UmVtYWluaW5nVGltZSAlIDYwKSAvIDYwICsgJ+WIhicgKyBkYXRhLnBheVJlbWFpbmluZ1RpbWUgJSA2MCArICfnp5InXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIHRoaXMuaWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignb3JkZXJEZXRhaWwnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgfVxuICB9XG4iXX0=