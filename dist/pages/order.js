'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _orderlist = require('./../components/orderlist.js');

var _orderlist2 = _interopRequireDefault(_orderlist);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

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
    }, _this2.$repeat = { "orderList": { "com": "orderList", "props": "" } }, _this2.$props = { "orderList": { "xmlns:v-bind": { "value": "", "for": "orderList", "item": "item", "index": "index", "key": "key" }, "v-bind:orderList.sync": { "value": "item.orderDetail", "for": "orderList", "item": "item", "index": "index", "key": "key" }, "v-bind:userLevel.sync": { "value": "userLevel", "for": "orderList", "item": "item", "index": "index", "key": "key" } }, "defect": { "type": "3" } }, _this2.$events = {}, _this2.components = {
      orderList: _orderlist2.default,
      defect: _defect2.default
    }, _this2.computed = {
      isNull: function isNull() {
        if (this.orderList.length === 0) {
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
      orderStatus: ['异常', '待支付', '售后中', '已关闭', '待发货', '待收货', '交易完成'],
      current: 0,
      orderType: 'all',
      orderList: [],
      pageSize: 5,
      pageNum: 1,
      totalPageNum: 0,
      isLoading: true
    }, _this2.methods = {
      checkPackage: function checkPackage(index, type) {
        this.current = index;
        this.orderType = type;
        this.initOrder();
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './orderDetail?id=' + id
        });
      },
      cancel: function cancel(id) {
        var _this3 = this;

        _wepy2.default.showModal({
          title: '提示',
          content: '确认取消订单',
          success: function success(res) {
            if (res.confirm) {
              _this3.cancelOrder(id, function () {
                _this3.initOrder();
              });
            }
          }
        });
      },
      goAddress: function goAddress(id) {
        _wepy2.default.navigateTo({
          url: './address?page=order&id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Order, [{
    key: 'initOrder',
    value: function initOrder() {
      this.$parent.showLoading();
      this.orderList = [];
      this.isLoading = true;
      var _this = this;
      var data = {
        token: this.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        status: this.orderType
      };
      this.$parent.HttpRequest.GetOrderStatus(data).then(function (res) {
        console.log(res);
        _this.isLoading = false;
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          data.orders.forEach(function (item) {
            var obj = {};
            obj.id = item.id;
            obj.title = item.showId;
            obj.pay = item.pay;
            obj.freight = item.freight;
            obj.status = item.status;
            obj.statusTxt = _this.orderStatus[item.status];
            obj.count = item.buyingRecords.length;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.orderList.push(obj);
          });
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.isLoading = false;
        _this.$parent.showFail();
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
    value: function cancelOrder(id, cb) {
      var data = {
        token: this.token,
        orderId: id
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
    value: function onLoad() {
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwibGVuZ3RoIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJkYXRhIiwidG9rZW4iLCJwYWNrYWdlIiwidGl0bGUiLCJ0eXBlIiwib3JkZXJTdGF0dXMiLCJjdXJyZW50Iiwib3JkZXJUeXBlIiwicGFnZVNpemUiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNMb2FkaW5nIiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4IiwiaW5pdE9yZGVyIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzdGF0dXMiLCJIdHRwUmVxdWVzdCIsIkdldE9yZGVyU3RhdHVzIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInNob3dTdWNjZXNzIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0Iiwic3RhdHVzVHh0IiwiY291bnQiLCJidXlpbmdSZWNvcmRzIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiY2IiLCJvcmRlcklkIiwiQ2FuY2VsT3JkZXIiLCJnZXRUb2tlbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt1TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBYixFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sS0FBbEUsRUFBaEIsRUFBeUYseUJBQXdCLEVBQUMsU0FBUSxrQkFBVCxFQUE0QixPQUFNLFdBQWxDLEVBQThDLFFBQU8sTUFBckQsRUFBNEQsU0FBUSxPQUFwRSxFQUE0RSxPQUFNLEtBQWxGLEVBQWpILEVBQTBNLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLFdBQTNCLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQWxPLEVBQWIsRUFBa1UsVUFBUyxFQUFDLFFBQU8sR0FBUixFQUEzVSxFLFNBQ1RDLE8sR0FBVSxFLFNBQ1RDLFUsR0FBYTtBQUNSQyxvQ0FEUTtBQUVSQztBQUZRLEssU0FJVkMsUSxHQUFXO0FBQ1RDLFlBRFMsb0JBQ0M7QUFDUixZQUFJLEtBQUtILFNBQUwsQ0FBZUksTUFBZixLQUEwQixDQUE5QixFQUFpQztBQUMvQixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FQUTtBQVFUQyxlQVJTLHVCQVFJO0FBQ1gsWUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FB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aW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJMaXN0XCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3QsXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhY2thZ2U6IFt7XG4gICAgICAgIHRpdGxlOiAn5YWo6YOoJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlK/ku5gnLFxuICAgICAgICB0eXBlOiAndW5wYWlkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heWPkei0pycsXG4gICAgICAgIHR5cGU6ICd1bmRlbGl2ZXJlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlLbotKcnLFxuICAgICAgICB0eXBlOiAndW5yZWNlaXB0ZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZSu5ZCOJyxcbiAgICAgICAgdHlwZTogJ3JlZnVuZGluZydcbiAgICAgIH1dLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn5bey5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgb3JkZXJUeXBlOiAnYWxsJyxcbiAgICAgIG9yZGVyTGlzdDogW10sXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoZWNrUGFja2FnZSAoaW5kZXgsIHR5cGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSB0eXBlXG4gICAgICAgIHRoaXMuaW5pdE9yZGVyKClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoaWQpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcihpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdE9yZGVyKClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyJmlkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0T3JkZXIgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzdGF0dXM6IHRoaXMub3JkZXJUeXBlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJTdGF0dXMoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBkYXRhLm9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0uc2hvd0lkXG4gICAgICAgICAgICBvYmoucGF5ID0gaXRlbS5wYXlcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouc3RhdHVzID0gaXRlbS5zdGF0dXNcbiAgICAgICAgICAgIG9iai5zdGF0dXNUeHQgPSBfdGhpcy5vcmRlclN0YXR1c1tpdGVtLnN0YXR1c11cbiAgICAgICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nUmVjb3Jkcy5sZW5ndGhcbiAgICAgICAgICAgIG9iai5vcmRlckRldGFpbCA9IF90aGlzLmluaXRDaGlsZChpdGVtLmJ1eWluZ1JlY29yZHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlckxpc3QucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChpZCwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogaWRcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgfVxuICB9XG4iXX0=