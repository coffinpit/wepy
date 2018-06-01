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
      isHidden: false,
      initTxt: '待支付',
      isStop: false,
      timeInterval: '',
      payment: true
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
              _this3.clear();
            }
          }
        });
      },
      goAddress: function goAddress() {
        _wepy2.default.redirectTo({
          url: './address?page=orderdetail&id=' + this.id
        });
        this.clear();
      },
      goLogistic: function goLogistic() {
        _wepy2.default.navigateTo({
          url: './logistica?id=' + this.id
        });
      },
      goPay: function goPay() {
        var _this4 = this;

        if (this.payment) {
          var data = {
            token: this.token,
            orderId: this.id,
            appType: 'ios'
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
                    _this4.clear();
                    _wepy2.default.switchTab({
                      url: './index'
                    });
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

  _createClass(OrderDetail, [{
    key: 'initData',
    value: function initData() {
      var _this5 = this;

      this.token = this.$parent.getToken();
      this.remainTime = 0;
      this.$parent.showLoading();
      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      this.$parent.HttpRequest.GetOrderDetail(data).then(function (res) {
        console.log(res);
        _this.$parent.showSuccess();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.statusTxt = _this.orderStatus[data.status];
          _this.status = data.status;
          _this.orderId = data.showId;
          _this.createTime = _this.$parent.dateFormat(data.createTime * 1000, 'Y-m-d H:i:s');
          _this.memo = data.memo ? data.memo[0].val : '';
          _this.pay = data.pay;
          _this.freight = data.freight;
          // _this.initLogistica('shunfeng', data.showId)
          if (data.payRemainingTime) {
            _this.interval(data.payRemainingTime);
          }
          if (data.address) {
            _this.address.name = data.address.name;
            _this.address.phone = data.address.phone;
            _this.address.detail = data.address.fullAreaName + data.address.address;
          } else {
            _this.address = '';
          }
          _this.finalPrice = data.finalPrice;
          data.buyingRecords.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.order.push(obj);
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
            _this.initData();
          }
        }
        console.log(Object.keys(_this.address).length);
        _this.$apply();
      }).catch(function () {
        _this.$parent.showSuccess();
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
    value: function cancelOrder(cb) {
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      console.log(data);
      this.$parent.HttpRequest.CancelOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.isStop = true;
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'initLogistica',
    value: function initLogistica(com, num) {
      var _this6 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        com: com,
        num: num
      };
      this.$parent.HttpRequest.GetLogistica(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {} else {
          if (_this.$parent.missToken) {
            _this.token = _this6.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'interval',
    value: function interval(time) {
      var _this = this;
      this.timeInterval = setInterval(function () {
        time--;
        if (time > 0) {
          _this.remainTime = (time - time % 60) / 60 + '分' + time % 60 + '秒';
        } else {
          _this.remainTime = 0;
          _this.initTxt = '交易关闭';
          _this.clear();
        }
        _this.$apply();
      }, 1000);
    }
  }, {
    key: 'clear',
    value: function clear() {
      clearInterval(this.timeInterval);
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      this.id = param.id;
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initData();
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      this.clear();
    }
  }]);

  return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/orderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImluaXRUeHQiLCJpc1N0b3AiLCJ0aW1lSW50ZXJ2YWwiLCJwYXltZW50IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsIm1ldGhvZHMiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbE9yZGVyIiwiY2xlYXIiLCJnb0FkZHJlc3MiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29Mb2dpc3RpYyIsIm5hdmlnYXRlVG8iLCJnb1BheSIsImFwcFR5cGUiLCJIdHRwUmVxdWVzdCIsIlBheVNlcnZpY2UiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJzd2l0Y2hUYWIiLCJwYXlGYWlsIiwiY2F0Y2giLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlckRldGFpbCIsInNob3dTdWNjZXNzIiwic2hvd0lkIiwiZGF0ZUZvcm1hdCIsInZhbCIsInBheVJlbWFpbmluZ1RpbWUiLCJpbnRlcnZhbCIsIm5hbWUiLCJwaG9uZSIsImRldGFpbCIsImZ1bGxBcmVhTmFtZSIsImJ1eWluZ1JlY29yZHMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsIm1pc3NUb2tlbiIsImluaXREYXRhIiwiT2JqZWN0Iiwia2V5cyIsIiRhcHBseSIsInNob3dGYWlsIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzYWxlc1VuaXRUeXBlIiwic291cmNlSWQiLCJzYWxlc1VuaXRJZCIsImJ1eWluZ0NvdW50IiwiY291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsImNiIiwiQ2FuY2VsT3JkZXIiLCJjb20iLCJudW0iLCJHZXRMb2dpc3RpY2EiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwicGFyYW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O21NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLG1CQUFhLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLE1BQTNDLENBSFI7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxjQUFRLEVBTEg7QUFNTEMsZUFBUyxFQU5KO0FBT0xDLGFBQU8sRUFQRjtBQVFMQyxlQUFTLEVBUko7QUFTTEMsa0JBQVksRUFUUDtBQVVMQyxZQUFNLEVBVkQ7QUFXTEMsV0FBSyxFQVhBO0FBWUxDLGtCQUFZLEVBWlA7QUFhTEMsZUFBUyxFQWJK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ckMsSUFBSixDQUFTcUQsS0FBL0IsQ0FBZDtBQUNEO0FBQ0Y7QUFDRixPQVJEO0FBU0Q7Ozs2QkFDU2lFLEksRUFBTTtBQUNkLFVBQUloRCxRQUFRLElBQVo7QUFDQSxXQUFLcEQsWUFBTCxHQUFvQnFHLFlBQVksWUFBTTtBQUNwQ0Q7QUFDQSxZQUFJQSxPQUFPLENBQVgsRUFBYztBQUNaaEQsZ0JBQU14RCxVQUFOLEdBQW1CLENBQUN3RyxPQUFPQSxPQUFPLEVBQWYsSUFBcUIsRUFBckIsR0FBMEIsR0FBMUIsR0FBZ0NBLE9BQU8sRUFBdkMsR0FBNEMsR0FBL0Q7QUFDRCxTQUZELE1BRU87QUFDTGhELGdCQUFNeEQsVUFBTixHQUFtQixDQUFuQjtBQUNBd0QsZ0JBQU10RCxPQUFOLEdBQWdCLE1BQWhCO0FBQ0FzRCxnQkFBTTlCLEtBQU47QUFDRDtBQUNEOEIsY0FBTXVCLE1BQU47QUFDRCxPQVZtQixFQVVqQixJQVZpQixDQUFwQjtBQVdEOzs7NEJBQ1E7QUFDUDJCLG9CQUFjLEtBQUt0RyxZQUFuQjtBQUNEOzs7MkJBQ091RyxLLEVBQU87QUFDYixXQUFLdkgsRUFBTCxHQUFVdUgsTUFBTXZILEVBQWhCO0FBQ0EsV0FBSzJGLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0gsUUFBTDtBQUNEOzs7K0JBQ1c7QUFDVixXQUFLbEQsS0FBTDtBQUNEOzs7O0VBMVFzQyxlQUFLa0YsSTs7a0JBQXpCN0gsVyIsImZpbGUiOiJvcmRlckRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V6K+m5oOFJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaWQ6ICcnLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn6K6i5Y2V5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBzdGF0dXNUeHQ6ICcnLFxuICAgICAgc3RhdHVzOiAnJyxcbiAgICAgIGFkZHJlc3M6IHt9LFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBjcmVhdGVUaW1lOiAnJyxcbiAgICAgIG1lbW86ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIGZpbmFsUHJpY2U6ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICByZW1haW5UaW1lOiAnJyxcbiAgICAgIGlzSGlkZGVuOiBmYWxzZSxcbiAgICAgIGluaXRUeHQ6ICflvoXmlK/ku5gnLFxuICAgICAgaXNTdG9wOiBmYWxzZSxcbiAgICAgIHRpbWVJbnRlcnZhbDogJycsXG4gICAgICBwYXltZW50OiB0cnVlXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0ub3JkZXJEZXRhaWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2FuY2VsICgpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0hpZGRlbiA9IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXJkZXRhaWwmaWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpc3RpY2E/aWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgb3JkZXJJZDogdGhpcy5pZCxcbiAgICAgICAgICAgIGFwcFR5cGU6ICdpb3MnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJEZXRhaWwoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2RhdGEuc3RhdHVzXVxuICAgICAgICAgIF90aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzXG4gICAgICAgICAgX3RoaXMub3JkZXJJZCA9IGRhdGEuc2hvd0lkXG4gICAgICAgICAgX3RoaXMuY3JlYXRlVGltZSA9IF90aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLmNyZWF0ZVRpbWUgKiAxMDAwLCAnWS1tLWQgSDppOnMnKVxuICAgICAgICAgIF90aGlzLm1lbW8gPSBkYXRhLm1lbW8gPyBkYXRhLm1lbW9bMF0udmFsIDogJydcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICAvLyBfdGhpcy5pbml0TG9naXN0aWNhKCdzaHVuZmVuZycsIGRhdGEuc2hvd0lkKVxuICAgICAgICAgIGlmIChkYXRhLnBheVJlbWFpbmluZ1RpbWUpIHtcbiAgICAgICAgICAgIF90aGlzLmludGVydmFsKGRhdGEucGF5UmVtYWluaW5nVGltZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcykge1xuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5uYW1lID0gZGF0YS5hZGRyZXNzLm5hbWVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MucGhvbmUgPSBkYXRhLmFkZHJlc3MucGhvbmVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MuZGV0YWlsID0gZGF0YS5hZGRyZXNzLmZ1bGxBcmVhTmFtZSArIGRhdGEuYWRkcmVzcy5hZGRyZXNzXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MgPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coT2JqZWN0LmtleXMoX3RoaXMuYWRkcmVzcykubGVuZ3RoKVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzU3RvcCA9IHRydWVcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IF90aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0TG9naXN0aWNhIChjb20sIG51bSkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgY29tOiBjb20sXG4gICAgICAgIG51bTogbnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TG9naXN0aWNhKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbnRlcnZhbCAodGltZSkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy50aW1lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRpbWUtLVxuICAgICAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gKHRpbWUgLSB0aW1lICUgNjApIC8gNjAgKyAn5YiGJyArIHRpbWUgJSA2MCArICfnp5InXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMucmVtYWluVGltZSA9IDBcbiAgICAgICAgICBfdGhpcy5pbml0VHh0ID0gJ+S6pOaYk+WFs+mXrSdcbiAgICAgICAgICBfdGhpcy5jbGVhcigpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICAgIGNsZWFyICgpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lSW50ZXJ2YWwpXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIHRoaXMuaWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgfVxuICAgIG9uVW5sb2FkICgpIHtcbiAgICAgIHRoaXMuY2xlYXIoKVxuICAgIH1cbiAgfVxuIl19