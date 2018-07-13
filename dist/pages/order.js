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
        title: '待付款',
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
      orderStatus: ['异常', '待付款', '售后中', '已关闭', '待发货', '待收货', '交易完成'],
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
        this.orderId = id;
      },
      goReceive: function goReceive(id, index) {
        var _this4 = this;

        this.token = this.$parent.getToken();
        var data = {
          token: this.token,
          orderId: id
        };
        _wepy2.default.showModal({
          title: '提示',
          content: '是否确认收货',
          success: function success(res) {
            if (res.confirm) {
              _this4.$parent.HttpRequest.ReceiveOrder(data).then(function (res) {
                if (res.data.error === 0) {
                  _this4.orderList[index].isReceive = true;
                }
                _this4.$apply();
              });
            }
          }
        });
      },
      goPay: function goPay(id) {
        var _this5 = this;

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
              var sign = _this5.$parent.HttpRequest.getPaySign(signData);
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
                    _this5.current = 2;
                    _this5.orderType = 'undelivered';
                    _this5.initData();
                  } else if (res.errMsg === 'requestPayment:cancel') {
                    // 用户取消支付跳转订单列表
                    _this5.$parent.payFail();
                  }
                },
                'fail': function fail(res) {
                  _this5.$parent.payFail();
                },
                'complete': function complete(res) {
                  _this5.payment = true;
                }
              });
            } else {
              _this5.$parent.payFail();
            }
          }).catch(function () {
            _this5.$parent.payFail();
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
            obj.isReceive = false;
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
            _this.initOrder(cb);
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isLoading = false;
        // _this.$parent.showFail()
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
        obj.sourceType = item.sourceType;
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
            // _this.token = this.$parent.getToken(res.data.error)
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
      var _this6 = this;

      if (param.orderType) {
        this.orderType = param.orderType;
        this.package.forEach(function (item, index) {
          if (item.type === param.orderType) {
            _this6.current = index;
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
      var _this7 = this;

      this.initData(function () {
        _this7.nick_name = _this7.$parent.getUserName();
        _this7.avatar = _this7.$parent.getUserAvatar();
        _this7.customer_info_str = _this7.$parent.getMessage();
        _this7.note_info_str = _this7.$parent.getBusiness('订单列表页', null, _this7.orderId);
      });
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwib3JkZXJJZCIsIm1ldGhvZHMiLCJjaGVja1BhY2thZ2UiLCJpbmRleCIsImluaXREYXRhIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsImdvTG9naXN0aWMiLCJzdGF0dXMiLCJnZXRPcmRlcklkIiwiZ29SZWNlaXZlIiwiZ2V0VG9rZW4iLCJIdHRwUmVxdWVzdCIsIlJlY2VpdmVPcmRlciIsInRoZW4iLCJlcnJvciIsImlzUmVjZWl2ZSIsIiRhcHBseSIsImdvUGF5IiwiYXBwVHlwZSIsIlBheVNlcnZpY2UiLCJjb25zb2xlIiwibG9nIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsImluaXRPcmRlciIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlclN0YXR1cyIsImhpZGVMb2FkaW5nIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0IiwiZGVsaXZlclN0YXR1cyIsIm5lZWRBZGQiLCJpc05lZWRBZGRyZXNzIiwic3RhdHVzVHh0IiwiY291bnQiLCJidXlpbmdSZWNvcmRzIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwibWlzc1Rva2VuIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiZGV0YWlsIiwiYnV5aW5nQ291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsIkNhbmNlbE9yZGVyIiwicGFyYW0iLCJnZXRVc2VyTmFtZSIsImdldFVzZXJBdmF0YXIiLCJnZXRNZXNzYWdlIiwiZ2V0QnVzaW5lc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt1TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBYixFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sV0FBbEIsRUFBOEIsUUFBTyxNQUFyQyxFQUE0QyxTQUFRLE9BQXBELEVBQTRELE9BQU0sS0FBbEUsRUFBaEIsRUFBeUYseUJBQXdCLEVBQUMsU0FBUSxrQkFBVCxFQUE0QixPQUFNLFdBQWxDLEVBQThDLFFBQU8sTUFBckQsRUFBNEQsU0FB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R0FBcUIsT0FBS2xCLE9BQUwsQ0FBYThHLFdBQWIsQ0FBeUIsT0FBekIsRUFBa0MsSUFBbEMsRUFBd0MsT0FBSzNGLE9BQTdDLENBQXJCO0FBQ0QsT0FMRDtBQU1EOzs7O0VBdlNnQyxlQUFLNEYsSTs7a0JBQW5CN0gsSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTorqLljZUnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyTGlzdFwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIzXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0LFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhY2thZ2U6IFt7XG4gICAgICAgIHRpdGxlOiAn5YWo6YOoJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXku5jmrL4nLFxuICAgICAgICB0eXBlOiAndW5wYWlkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heWPkei0pycsXG4gICAgICAgIHR5cGU6ICd1bmRlbGl2ZXJlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlLbotKcnLFxuICAgICAgICB0eXBlOiAndW5yZWNlaXB0ZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZSu5ZCOJyxcbiAgICAgICAgdHlwZTogJ3JlZnVuZGluZydcbiAgICAgIH1dLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heS7mOasvicsICfllK7lkI7kuK0nLCAn5bey5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBjdXJyZW50OiBudWxsLFxuICAgICAgb3JkZXJUeXBlOiAnYWxsJyxcbiAgICAgIG9yZGVyTGlzdDogW10sXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICBwYXltZW50OiB0cnVlLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJyxcbiAgICAgIG9yZGVySWQ6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGVja1BhY2thZ2UgKGluZGV4LCB0eXBlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gdHlwZVxuICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoaWQpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcihpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXImaWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoaWQsIHN0YXR1cykge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbG9naXN0aWNhP2lkPScgKyBpZCArICcmc3RhdHVzPScgKyBzdGF0dXNcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnZXRPcmRlcklkIChpZCkge1xuICAgICAgICB0aGlzLm9yZGVySWQgPSBpZFxuICAgICAgfSxcbiAgICAgIGdvUmVjZWl2ZSAoaWQsIGluZGV4KSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICBvcmRlcklkOiBpZFxuICAgICAgICB9XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuehruiupOaUtui0pycsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5SZWNlaXZlT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyTGlzdFtpbmRleF0uaXNSZWNlaXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5IChpZCkge1xuICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIG9yZGVySWQ6IGlkLFxuICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAvLyAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IDJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlclR5cGUgPSAndW5kZWxpdmVyZWQnXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhIChjYikge1xuICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgdGhpcy5vcmRlckxpc3QgPSBbXVxuICAgICAgdGhpcy5pbml0T3JkZXIoY2IpXG4gICAgfVxuICAgIGluaXRPcmRlciAoY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzdGF0dXM6IHRoaXMub3JkZXJUeXBlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJTdGF0dXMoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouaXNSZWNlaXZlID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0uc2hvd0lkXG4gICAgICAgICAgICBvYmoucGF5ID0gaXRlbS5wYXlcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouc3RhdHVzID0gaXRlbS5zdGF0dXNcbiAgICAgICAgICAgIG9iai5kZWxpdmVyU3RhdHVzID0gaXRlbS5kZWxpdmVyU3RhdHVzXG4gICAgICAgICAgICBvYmoubmVlZEFkZCA9IGl0ZW0uaXNOZWVkQWRkcmVzc1xuICAgICAgICAgICAgb2JqLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2l0ZW0uc3RhdHVzXVxuICAgICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdSZWNvcmRzLmxlbmd0aFxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmluaXRPcmRlcihjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udGl0bGUgKyAnw5cnICsgaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgY2FuY2VsT3JkZXIgKGlkLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgLy8gX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5pbml0T3JkZXIoKVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gcGFyYW0ub3JkZXJUeXBlXG4gICAgICAgIHRoaXMucGFja2FnZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IHBhcmFtLm9yZGVyVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCforqLljZXliJfooajpobUnLCBudWxsLCB0aGlzLm9yZGVySWQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19