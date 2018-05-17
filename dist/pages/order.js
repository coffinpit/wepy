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
      current: null,
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
      },
      goPay: function goPay(id) {
        var data = {
          token: this.token,
          orderId: id,
          appType: 'ios'
        };
        this.$parent.HttpRequest.PayService(data).then(function (res) {
          console.log(res);
          // 调微信支付弹窗
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
    value: function onLoad(param) {
      var _this4 = this;

      this.token = this.$parent.getToken();
      if (param.orderType) {
        this.orderType = param.orderType;
        this.package.forEach(function (item, index) {
          if (item.type === param.orderType) {
            _this4.current = index;
          }
        });
      } else {
        this.current = 0;
      }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwibGVuZ3RoIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJkYXRhIiwidG9rZW4iLCJwYWNrYWdlIiwidGl0bGUiLCJ0eXBlIiwib3JkZXJTdGF0dXMiLCJjdXJyZW50Iiwib3JkZXJUeXBlIiwicGFnZVNpemUiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNMb2FkaW5nIiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4IiwiaW5pdE9yZGVyIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsImdvUGF5Iiwib3JkZXJJZCIsImFwcFR5cGUiLCJIdHRwUmVxdWVzdCIsIlBheVNlcnZpY2UiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzdGF0dXMiLCJHZXRPcmRlclN0YXR1cyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJvcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInNob3dJZCIsInBheSIsImZyZWlnaHQiLCJzdGF0dXNUeHQiLCJjb3VudCIsImJ1eWluZ1JlY29yZHMiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJzaG93RmFpbCIsIiRhcHBseSIsImNhdGNoIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzYWxlc1VuaXRUeXBlIiwic291cmNlSWQiLCJzYWxlc1VuaXRJZCIsImRldGFpbCIsImJ1eWluZ0NvdW50IiwiY2hlY2tlZCIsInRvdGFsQ291bnQiLCJrZWVwQ291bnQiLCJjYiIsIkNhbmNlbE9yZGVyIiwicGFyYW0iLCJnZXRUb2tlbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt1TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBYixFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sS0FBbEUsRUFBaEIsRUFBeUYseUJBQXdCLEVBQUMsU0FBUSxrQkFBVCxFQUE0QixPQUFNLFdBQWxDLEVBQThDLFFBQU8sTUFBckQsRUFBNEQsU0FBUSxPQUFwRSxFQUE0RSxPQUFNLEtBQWxGLEVBQWpILEVBQTBNLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLFdBQTNCLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQWxPLEVBQWIsRUFBa1UsVUFBUyxFQUFDLFFBQU8sR0FBUixFQUEzVSxFLFNBQ1RDLE8sR0FBVSxFLFNBQ1RDLFUsR0FBYTtBQUNSQyxvQ0FEUTtBQUVSQztBQUZRLEssU0FJVkMsUSxHQUFXO0FBQ1RDLFlBRFMsb0JBQ0M7QUFDUixZQUFJLEtBQUtILFNBQUwsQ0FBZUksTUFBZixLQUEwQixDQUE5QixFQUFpQztBQUMvQixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FQUTtBQVFUQyxlQVJTLHVC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QUFJQSxJQUFJeEIsSUFBSixDQUFTd0MsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4Qm9DLGdCQUFNQSxJQUFOO0FBQ0Q7QUFDRixPQUxEO0FBTUQ7OzsyQkFDT0UsSyxFQUFPO0FBQUE7O0FBQ2IsV0FBSzdFLEtBQUwsR0FBYSxLQUFLSCxPQUFMLENBQWFpRixRQUFiLEVBQWI7QUFDQSxVQUFJRCxNQUFNdkUsU0FBVixFQUFxQjtBQUNuQixhQUFLQSxTQUFMLEdBQWlCdUUsTUFBTXZFLFNBQXZCO0FBQ0EsYUFBS0wsT0FBTCxDQUFheUMsT0FBYixDQUFxQixVQUFDQyxJQUFELEVBQU85QixLQUFQLEVBQWlCO0FBQ3BDLGNBQUk4QixLQUFLeEMsSUFBTCxLQUFjMEUsTUFBTXZFLFNBQXhCLEVBQW1DO0FBQ2pDLG1CQUFLRCxPQUFMLEdBQWVRLEtBQWY7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQVBELE1BT087QUFDTCxhQUFLUixPQUFMLEdBQWUsQ0FBZjtBQUNEO0FBQ0QsV0FBS2tELE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS3pDLFNBQUw7QUFDRDs7OztFQXRMZ0MsZUFBS2lFLEk7O2tCQUFuQi9GLEsiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJMaXN0XCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3QsXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhY2thZ2U6IFt7XG4gICAgICAgIHRpdGxlOiAn5YWo6YOoJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlK/ku5gnLFxuICAgICAgICB0eXBlOiAndW5wYWlkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heWPkei0pycsXG4gICAgICAgIHR5cGU6ICd1bmRlbGl2ZXJlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlLbotKcnLFxuICAgICAgICB0eXBlOiAndW5yZWNlaXB0ZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZSu5ZCOJyxcbiAgICAgICAgdHlwZTogJ3JlZnVuZGluZydcbiAgICAgIH1dLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn5bey5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBjdXJyZW50OiBudWxsLFxuICAgICAgb3JkZXJUeXBlOiAnYWxsJyxcbiAgICAgIG9yZGVyTGlzdDogW10sXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoZWNrUGFja2FnZSAoaW5kZXgsIHR5cGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSB0eXBlXG4gICAgICAgIHRoaXMuaW5pdE9yZGVyKClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoaWQpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcihpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdE9yZGVyKClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyJmlkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5IChpZCkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICBvcmRlcklkOiBpZCxcbiAgICAgICAgICBhcHBUeXBlOiAnaW9zJ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAvLyDosIPlvq7kv6HmlK/ku5jlvLnnqpdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdE9yZGVyICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IFtdXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgc3RhdHVzOiB0aGlzLm9yZGVyVHlwZVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyU3RhdHVzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnNob3dJZFxuICAgICAgICAgICAgb2JqLnBheSA9IGl0ZW0ucGF5XG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnN0YXR1cyA9IGl0ZW0uc3RhdHVzXG4gICAgICAgICAgICBvYmouc3RhdHVzVHh0ID0gX3RoaXMub3JkZXJTdGF0dXNbaXRlbS5zdGF0dXNdXG4gICAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eWluZ1JlY29yZHMubGVuZ3RoXG4gICAgICAgICAgICBvYmoub3JkZXJEZXRhaWwgPSBfdGhpcy5pbml0Q2hpbGQoaXRlbS5idXlpbmdSZWNvcmRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXJMaXN0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoaWQsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IGlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICBpZiAocGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gcGFyYW0ub3JkZXJUeXBlXG4gICAgICAgIHRoaXMucGFja2FnZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IHBhcmFtLm9yZGVyVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgfVxuICB9XG4iXX0=