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
          // _this.initLogistica('shunfeng', data.showId)
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
    key: 'initLogistica',
    value: function initLogistica(com, num) {
      var data = {
        com: com,
        num: num
      };
      this.$parent.HttpRequest.GetLogistica(data).then(function (res) {
        console.log(res);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImNvbXB1dGVkIiwiaXNOdWxsIiwibGVuZ3RoIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJtZXRob2RzIiwiY2FuY2VsIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJfdGhpcyIsIkh0dHBSZXF1ZXN0IiwiR2V0T3JkZXJEZXRhaWwiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd0lkIiwiZGF0ZUZvcm1hdCIsInNldEludGVydmFsIiwicGF5UmVtYWluaW5nVGltZSIsIiRhcHBseSIsIm5hbWUiLCJwaG9uZSIsImRldGFpbCIsImZ1bGxBcmVhTmFtZSIsImJ1eWluZ1JlY29yZHMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJidXlpbmdDb3VudCIsImNvdW50IiwiY2hlY2tlZCIsInRvdGFsQ291bnQiLCJrZWVwQ291bnQiLCJjYiIsIkNhbmNlbE9yZGVyIiwiY29tIiwibnVtIiwiR2V0TG9naXN0aWNhIiwicGFyYW0iLCJnZXRUb2tlbiIsImluaXREYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OzttTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLFVBQUksRUFGQztBQUdMQyxtQkFBYSxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixNQUFyQixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxNQUEzQyxDQUhSO0FBSUxDLGlCQUFXLEVBSk47QUFLTEMsY0FBUSxFQUxIO0FBTUxDLGVBQVMsRUFOSjtBQU9MQyxhQUFPLEVBUEY7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGtCQUFZLEVBVFA7QUFVTEMsWUFBTSxFQVZEO0FBV0xDLFdBQUssRUFYQTtBQVlMQyxrQkFBWSxFQVpQO0FBYUxDLGVBQVMsRUFiSjtBQWNMQyxrQkFBWSxFQWRQO0FBZUxDLGdCQUFVO0FBZkwsSyxTQWlCUEMsUSxHQUFXO0FBQ1RDLFlBRFMsb0JBQ0M7QUFDUixZQUFJLEtBQUtWLEtBQUwsQ0FBV1csTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUMzQixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FQUTtBQVFUQyxlQVJTLHVCQVFJO0FBQ1gsWUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU8sSUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQ2xELGlCQUFPLElBQVA7QUFD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QUFMLEdBQWEsS0FBS21CLE9BQUwsQ0FBYWtFLFFBQWIsRUFBYjtBQUNBLFdBQUtwQyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtxQyxRQUFMO0FBQ0Q7Ozs7RUEzSnNDLGVBQUtDLEk7O2tCQUF6QjNGLFciLCJmaWxlIjoib3JkZXJEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlkOiAnJyxcbiAgICAgIG9yZGVyU3RhdHVzOiBbJ+W8guW4uCcsICflvoXmlK/ku5gnLCAn5ZSu5ZCO5LitJywgJ+iuouWNleWFs+mXrScsICflvoXlj5HotKcnLCAn5b6F5pS26LSnJywgJ+S6pOaYk+WujOaIkCddLFxuICAgICAgc3RhdHVzVHh0OiAnJyxcbiAgICAgIHN0YXR1czogJycsXG4gICAgICBhZGRyZXNzOiB7fSxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgY3JlYXRlVGltZTogJycsXG4gICAgICBtZW1vOiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBmaW5hbFByaWNlOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcmVtYWluVGltZTogJycsXG4gICAgICBpc0hpZGRlbjogZmFsc2VcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTlj5bmtojorqLljZUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLmNhbmNlbE9yZGVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSGlkZGVuID0gdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyZGV0YWlsJmlkPScgKyB0aGlzLmlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhICgpIHtcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJEZXRhaWwoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuc3RhdHVzVHh0ID0gX3RoaXMub3JkZXJTdGF0dXNbZGF0YS5zdGF0dXNdXG4gICAgICAgICAgX3RoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXNcbiAgICAgICAgICBfdGhpcy5vcmRlcklkID0gZGF0YS5zaG93SWRcbiAgICAgICAgICBfdGhpcy5jcmVhdGVUaW1lID0gX3RoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGRhdGEuY3JlYXRlVGltZSAqIDEwMDAsICdZLW0tZCBIOmk6cycpXG4gICAgICAgICAgX3RoaXMubWVtbyA9IGRhdGEubWVtbyB8fCAnJ1xuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIC8vIF90aGlzLmluaXRMb2dpc3RpY2EoJ3NodW5mZW5nJywgZGF0YS5zaG93SWQpXG4gICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZGF0YS5wYXlSZW1haW5pbmdUaW1lIC0tXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lID4gMCkge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gKGRhdGEucGF5UmVtYWluaW5nVGltZSAtIGRhdGEucGF5UmVtYWluaW5nVGltZSAlIDYwKSAvIDYwICsgJ+WIhicgKyBkYXRhLnBheVJlbWFpbmluZ1RpbWUgJSA2MCArICfnp5InXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdExvZ2lzdGljYSAoY29tLCBudW0pIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjb206IGNvbSxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY2EoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIHRoaXMuaWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICB9XG4gIH1cbiJdfQ==