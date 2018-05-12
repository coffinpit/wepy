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
      remainTime: '',
      isHidden: false
    }, _this2.computed = {
      isNull: function isNull() {
        if (this.order.length === 0) {
          return true;
        } else {
          return false;
        }
      },
      userLevel: function userLevel() {
        if (this.$parent.globalData.userLevel === 0) {
          return false;
        } else if (this.$parent.globalData.userLevel === 1) {
          return true;
        }
      }
    }, _this2.$repeat = { "order": { "com": "orderList", "props": "" } }, _this2.$props = { "orderList": { "xmlns:v-bind": { "value": "", "for": "order", "item": "item", "index": "index", "key": "key" }, "v-bind:orderList.sync": { "value": "item.orderDetail", "for": "order", "item": "item", "index": "index", "key": "key" }, "v-bind:userLevel.sync": { "value": "userLevel", "for": "order", "item": "item", "index": "index", "key": "key" } } }, _this2.$events = {}, _this2.components = {
      orderList: _orderlist2.default
    }, _this2.methods = {
      cancel: function cancel() {
        var _this3 = this;

        _wepy2.default.showModal({
          title: '提示',
          content: '确认取消订单',
          success: function success(res) {
            if (res.confirm) {
              _this3.cancelOrder(function () {
                _this3.isHidden = true;
              });
            }
          }
        });
      },
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address?page=orderdetail&id=' + this.id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
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
              _this.remainTime = 0;
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
    key: 'cancelOrder',
    value: function cancelOrder(cb) {
      var data = {
        token: this.token,
        orderId: this.id
      };
      console.log(data);
      this.$parent.HttpRequest.CancelOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      this.id = param.id;
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImNvbXB1dGVkIiwiaXNOdWxsIiwibGVuZ3RoIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJtZXRob2RzIiwiY2FuY2VsIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJfdGhpcyIsIkh0dHBSZXF1ZXN0IiwiR2V0T3JkZXJEZXRhaWwiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd0lkIiwiZGF0ZUZvcm1hdCIsInNldEludGVydmFsIiwicGF5UmVtYWluaW5nVGltZSIsIiRhcHBseSIsIm5hbWUiLCJwaG9uZSIsImRldGFpbCIsImZ1bGxBcmVhTmFtZSIsImJ1eWluZ1JlY29yZHMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJidXlpbmdDb3VudCIsImNvdW50IiwiY2hlY2tlZCIsInRvdGFsQ291bnQiLCJrZWVwQ291bnQiLCJjYiIsIkNhbmNlbE9yZGVyIiwicGFyYW0iLCJnZXRUb2tlbiIsImluaXREYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OzttTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLFVBQUksRUFGQztBQUdMQyxtQkFBYSxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixNQUFyQixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxNQUEzQyxDQUhSO0FBSUxDLGlCQUFXLEVBSk47QUFLTEMsY0FBUSxFQUxIO0FBTUxDLGVBQVMsRUFOSjtBQU9MQyxhQUFPLEVBUEY7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGtCQUFZLEVBVFA7QUFVTEMsWUFBTSxFQVZEO0FBV0xDLFdBQUssRUFYQTtBQVlMQyxrQkFBWSxFQVpQO0FBYUxDLGVBQVMsRUFiSjtBQWNMQyxrQkFBWSxFQWRQO0FBZUxDLGdCQUFVO0FBZkwsSyxTQWlCUEMsUSxHQUFXO0FBQ1RDLFlBRFMsb0JBQ0M7QUFDUixZQUFJLEtBQUtWLEtBQUwsQ0FBV1csTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUMzQixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FQUTtBQVFUQyxlQVJTLHVCQVFJO0FBQ1gsWUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU8sSUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQ2xELGlCQUFPLElBQVA7QUFDRDtBQUNGO0FBZFEsSyxTQWdCWkcsTyxHQUFV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ZWhCLEtBQUtpQixXQUFwQjtBQUNBaEIsWUFBSUwsTUFBSixHQUFhSSxLQUFLM0IsS0FBTCxHQUFhLEdBQWIsR0FBbUIyQixLQUFLa0IsV0FBckM7QUFDQWpCLFlBQUlrQixLQUFKLEdBQVluQixLQUFLa0IsV0FBakI7QUFDQWpCLFlBQUltQixPQUFKLEdBQWMsS0FBZDtBQUNBbkIsWUFBSW9CLFVBQUosR0FBaUJyQixLQUFLc0IsU0FBdEI7QUFDQWhCLGNBQU1GLElBQU4sQ0FBV0gsR0FBWDtBQUNELE9BZEQ7QUFlQSxhQUFPSyxLQUFQO0FBQ0Q7OztnQ0FDWWlCLEUsRUFBSTtBQUNmLFVBQUloRixPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUTyxpQkFBUyxLQUFLTjtBQUZMLE9BQVg7QUFJQXlDLGNBQVFDLEdBQVIsQ0FBWTVDLElBQVo7QUFDQSxXQUFLb0IsT0FBTCxDQUFhb0IsV0FBYixDQUF5QnlDLFdBQXpCLENBQXFDakYsSUFBckMsRUFBMkMwQyxJQUEzQyxDQUFnRCxVQUFDVCxHQUFELEVBQVM7QUFDdkRVLGdCQUFRQyxHQUFSLENBQVlYLEdBQVo7QUFDQSxZQUFJQSxJQUFJakMsSUFBSixDQUFTNkMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4Qm1DLGdCQUFNQSxJQUFOO0FBQ0Q7QUFDRixPQUxEO0FBTUQ7OzsyQkFDT0UsSyxFQUFPO0FBQ2IsV0FBS2hGLEVBQUwsR0FBVWdGLE1BQU1oRixFQUFoQjtBQUNBLFdBQUtELEtBQUwsR0FBYSxLQUFLbUIsT0FBTCxDQUFhK0QsUUFBYixFQUFiO0FBQ0EsV0FBS2pDLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS2tDLFFBQUw7QUFDRDs7OztFQWpKc0MsZUFBS0MsSTs7a0JBQXpCeEYsVyIsImZpbGUiOiJvcmRlckRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V6K+m5oOFJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaWQ6ICcnLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn6K6i5Y2V5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBzdGF0dXNUeHQ6ICcnLFxuICAgICAgc3RhdHVzOiAnJyxcbiAgICAgIGFkZHJlc3M6IHt9LFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBjcmVhdGVUaW1lOiAnJyxcbiAgICAgIG1lbW86ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIGZpbmFsUHJpY2U6ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICByZW1haW5UaW1lOiAnJyxcbiAgICAgIGlzSGlkZGVuOiBmYWxzZVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOiuouWNlScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuY2VsT3JkZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNIaWRkZW4gPSB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXJkZXRhaWwmaWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMuaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRPcmRlckRldGFpbChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5zdGF0dXNUeHQgPSBfdGhpcy5vcmRlclN0YXR1c1tkYXRhLnN0YXR1c11cbiAgICAgICAgICBfdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1c1xuICAgICAgICAgIF90aGlzLm9yZGVySWQgPSBkYXRhLnNob3dJZFxuICAgICAgICAgIF90aGlzLmNyZWF0ZVRpbWUgPSBfdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQoZGF0YS5jcmVhdGVUaW1lICogMTAwMCwgJ1ktbS1kIEg6aTpzJylcbiAgICAgICAgICBfdGhpcy5tZW1vID0gZGF0YS5tZW1vIHx8ICcnXG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZGF0YS5wYXlSZW1haW5pbmdUaW1lIC0tXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lID4gMCkge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gKGRhdGEucGF5UmVtYWluaW5nVGltZSAtIGRhdGEucGF5UmVtYWluaW5nVGltZSAlIDYwKSAvIDYwICsgJ+WIhicgKyBkYXRhLnBheVJlbWFpbmluZ1RpbWUgJSA2MCArICfnp5InXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgdGhpcy5pZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgIH1cbiAgfVxuIl19