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

var _menu = require('./../components/menu.js');

var _menu2 = _interopRequireDefault(_menu);

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
      defect: _defect2.default,
      menuList: _menu2.default
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
      isLoading: true,
      payment: true,
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: '',
      orderId: ''
    }, _this2.methods = {
      checkPackage: function checkPackage(index, type) {
        this.current = index;
        this.orderType = type;
        this.initData();
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
                _this3.initData();
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
      goLogistic: function goLogistic(id, status) {
        _wepy2.default.navigateTo({
          url: './logistica?id=' + id + '&status=' + status
        });
      },
      getOrderId: function getOrderId(id) {
        console.log(id);
        this.orderId = id;
      },
      goPay: function goPay(id) {
        var _this4 = this;

        if (this.payment) {
          this.token = this.$parent.getToken();
          var data = {
            token: this.token,
            orderId: id,
            appType: 'miniApp'
          };
          this.$parent.HttpRequest.PayService(data).then(function (res) {
            console.log(res);
            if (res.data.error === 0) {
              var data = res.data.data;
              var timeStamp = data.timestamp.toString();
              var nonceStr = data.noncestr;
              var prepayid = 'prepay_id=' + data.prepayid;
              var signData = {
                'appId': 'wx4fadd384b39658cd',
                'timeStamp': timeStamp,
                'nonceStr': nonceStr,
                'package': prepayid,
                'signType': 'MD5'
              };
              var sign = _this4.$parent.HttpRequest.getPaySign(signData);
              _wepy2.default.requestPayment({
                'timeStamp': timeStamp,
                'nonceStr': nonceStr,
                'package': prepayid,
                'signType': 'MD5',
                'paySign': sign,
                'success': function success(res) {
                  if (res.errMsg === 'requestPayment:ok') {
                    // 用户支付成功跳转首页
                    // wepy.switchTab({
                    //   url: './index'
                    // })
                    _this4.current = 2;
                    _this4.orderType = 'undelivered';
                    _this4.initData();
                  } else if (res.errMsg === 'requestPayment:cancel') {
                    // 用户取消支付跳转订单列表
                    _this4.$parent.payFail();
                  }
                },
                'fail': function fail(res) {
                  _this4.$parent.payFail();
                },
                'complete': function complete(res) {
                  _this4.payment = true;
                }
              });
            } else {
              _this4.$parent.payFail();
            }
          }).catch(function () {
            _this4.$parent.payFail();
          });
        }
        this.payment = false;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Order, [{
    key: 'initData',
    value: function initData(cb) {
      this.pageNum = 1;
      this.orderList = [];
      this.initOrder(cb);
    }
  }, {
    key: 'initOrder',
    value: function initOrder(cb) {
      var _this5 = this;

      this.$parent.showLoading();
      this.token = this.$parent.getToken();
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
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          data.orders.forEach(function (item) {
            var obj = {};
            obj.id = item.id;
            obj.title = item.showId;
            obj.pay = item.pay;
            obj.freight = item.freight;
            obj.status = item.status;
            obj.deliverStatus = item.deliverStatus;
            obj.needAdd = item.isNeedAddress;
            obj.statusTxt = _this.orderStatus[item.status];
            obj.count = item.buyingRecords.length;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.orderList.push(obj);
          });
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
            _this.initOrder(cb);
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
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
      var _this6 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: id
      };
      this.$parent.HttpRequest.CancelOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this6.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.initOrder();
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      var _this7 = this;

      if (param.orderType) {
        this.orderType = param.orderType;
        this.package.forEach(function (item, index) {
          if (item.type === param.orderType) {
            _this7.current = index;
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
      var _this8 = this;

      this.initData(function () {
        _this8.nick_name = _this8.$parent.getUserName();
        _this8.avatar = _this8.$parent.getUserAvatar();
        _this8.customer_info_str = _this8.$parent.getMessage();
        _this8.note_info_str = _this8.$parent.getBusiness('订单列表页', null, _this8.orderId);
      });
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwib3JkZXJJZCIsIm1ldGhvZHMiLCJjaGVja1BhY2thZ2UiLCJpbmRleCIsImluaXREYXRhIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsImdvTG9naXN0aWMiLCJzdGF0dXMiLCJnZXRPcmRlcklkIiwiY29uc29sZSIsImxvZyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsImluaXRPcmRlciIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlclN0YXR1cyIsImhpZGVMb2FkaW5nIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0IiwiZGVsaXZlclN0YXR1cyIsIm5lZWRBZGQiLCJpc05lZWRBZGRyZXNzIiwic3RhdHVzVHh0IiwiY291bnQiLCJidXlpbmdSZWNvcmRzIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwibWlzc1Rva2VuIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiZGV0YWlsIiwiYnV5aW5nQ291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsIkNhbmNlbE9yZGVyIiwicGFyYW0iLCJnZXRVc2VyTmFtZSIsImdldFVzZXJBdmF0YXIiLCJnZXRNZXNzYWdlIiwiZ2V0QnVzaW5lc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt1TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBYixFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sS0FBbEUsRUFBaEIsRUFBeUYseUJBQXdCLEVBQUMsU0FBUSxrQkFBVCxFQUE0QixPQUFNLFdBQWxDLEVBQThDLFFBQU8sTUFBckQsRUFBNEQsU0FBUSxPQUFwRSxFQUE0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OzJCQUNPMkMsSyxFQUFPO0FBQUE7O0FBQ2IsVUFBSUEsTUFBTWhHLFNBQVYsRUFBcUI7QUFDbkIsYUFBS0EsU0FBTCxHQUFpQmdHLE1BQU1oRyxTQUF2QjtBQUNBLGFBQUtMLE9BQUwsQ0FBYWdFLE9BQWIsQ0FBcUIsVUFBQ0MsSUFBRCxFQUFPL0MsS0FBUCxFQUFpQjtBQUNwQyxjQUFJK0MsS0FBSy9ELElBQUwsS0FBY21HLE1BQU1oRyxTQUF4QixFQUFtQztBQUNqQyxtQkFBS0QsT0FBTCxHQUFlYyxLQUFmO0FBQ0Q7QUFDRixTQUpEO0FBS0QsT0FQRCxNQU9PO0FBQ0wsYUFBS2QsT0FBTCxHQUFlLENBQWY7QUFDRDtBQUNELFdBQUs0RSxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUFBOztBQUNSLFdBQUs3RCxRQUFMLENBQWMsWUFBTTtBQUNsQixlQUFLUixTQUFMLEdBQWlCLE9BQUtmLE9BQUwsQ0FBYTBHLFdBQWIsRUFBakI7QUFDQSxlQUFLMUYsTUFBTCxHQUFjLE9BQUtoQixPQUFMLENBQWEyRyxhQUFiLEVBQWQ7QUFDQSxlQUFLMUYsaUJBQUwsR0FBeUIsT0FBS2pCLE9BQUwsQ0FBYTRHLFVBQWIsRUFBekI7QUFDQSxlQUFLMUYsYUFBTCxHQUFxQixPQUFLbEIsT0FBTCxDQUFhNkcsV0FBYixDQUF5QixPQUF6QixFQUFrQyxJQUFsQyxFQUF3QyxPQUFLMUYsT0FBN0MsQ0FBckI7QUFDRCxPQUxEO0FBTUQ7Ozs7RUFuUmdDLGVBQUsyRixJOztrQkFBbkI1SCxLIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJMaXN0XCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3QsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIG1lbnVMaXN0OiBNZW51XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXJMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFja2FnZTogW3tcbiAgICAgICAgdGl0bGU6ICflhajpg6gnLFxuICAgICAgICB0eXBlOiAnYWxsJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heaUr+S7mCcsXG4gICAgICAgIHR5cGU6ICd1bnBhaWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5Y+R6LSnJyxcbiAgICAgICAgdHlwZTogJ3VuZGVsaXZlcmVkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heaUtui0pycsXG4gICAgICAgIHR5cGU6ICd1bnJlY2VpcHRlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllK7lkI4nLFxuICAgICAgICB0eXBlOiAncmVmdW5kaW5nJ1xuICAgICAgfV0sXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICflt7LlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIGN1cnJlbnQ6IG51bGwsXG4gICAgICBvcmRlclR5cGU6ICdhbGwnLFxuICAgICAgb3JkZXJMaXN0OiBbXSxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG5vdGVfaW5mb19zdHI6ICcnLFxuICAgICAgb3JkZXJJZDogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoZWNrUGFja2FnZSAoaW5kZXgsIHR5cGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSB0eXBlXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXJEZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2FuY2VsIChpZCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTlj5bmtojorqLljZUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLmNhbmNlbE9yZGVyKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1vcmRlciZpZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0xvZ2lzdGljIChpZCwgc3RhdHVzKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpc3RpY2E/aWQ9JyArIGlkICsgJyZzdGF0dXM9JyArIHN0YXR1c1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdldE9yZGVySWQgKGlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICB0aGlzLm9yZGVySWQgPSBpZFxuICAgICAgfSxcbiAgICAgIGdvUGF5IChpZCkge1xuICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIG9yZGVySWQ6IGlkLFxuICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAvLyAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IDJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlclR5cGUgPSAndW5kZWxpdmVyZWQnXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhIChjYikge1xuICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgdGhpcy5vcmRlckxpc3QgPSBbXVxuICAgICAgdGhpcy5pbml0T3JkZXIoY2IpXG4gICAgfVxuICAgIGluaXRPcmRlciAoY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzdGF0dXM6IHRoaXMub3JkZXJUeXBlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJTdGF0dXMoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnNob3dJZFxuICAgICAgICAgICAgb2JqLnBheSA9IGl0ZW0ucGF5XG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnN0YXR1cyA9IGl0ZW0uc3RhdHVzXG4gICAgICAgICAgICBvYmouZGVsaXZlclN0YXR1cyA9IGl0ZW0uZGVsaXZlclN0YXR1c1xuICAgICAgICAgICAgb2JqLm5lZWRBZGQgPSBpdGVtLmlzTmVlZEFkZHJlc3NcbiAgICAgICAgICAgIG9iai5zdGF0dXNUeHQgPSBfdGhpcy5vcmRlclN0YXR1c1tpdGVtLnN0YXR1c11cbiAgICAgICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nUmVjb3Jkcy5sZW5ndGhcbiAgICAgICAgICAgIG9iai5vcmRlckRldGFpbCA9IF90aGlzLmluaXRDaGlsZChpdGVtLmJ1eWluZ1JlY29yZHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlckxpc3QucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRPcmRlcihjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udGl0bGUgKyAnw5cnICsgaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgY2FuY2VsT3JkZXIgKGlkLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5pbml0T3JkZXIoKVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gcGFyYW0ub3JkZXJUeXBlXG4gICAgICAgIHRoaXMucGFja2FnZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IHBhcmFtLm9yZGVyVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCforqLljZXliJfooajpobUnLCBudWxsLCB0aGlzLm9yZGVySWQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19