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
      payment: true,
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: ''
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
                    _this4.clear();
                    // wepy.switchTab({
                    //   url: './index'
                    // })
                    _wepy2.default.redirectTo({
                      url: './order?orderType=undelivered'
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
    value: function initData(cb) {
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
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.statusTxt = _this.orderStatus[data.status];
          _this.status = data.status;
          _this.orderId = data.showId;
          _this.createTime = _this.$parent.dateFormat(data.createTime * 1000, 'Y-m-d H:i:s');
          _this.memo = data.memo ? decodeURI(data.memo[0].val) : '';
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
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
            _this.initData();
          }
        }
        console.log(Object.keys(_this.address).length);
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
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
      var _this7 = this;

      this.clear();
      this.initData(function () {
        _this7.nick_name = _this7.$parent.getUserName();
        _this7.avatar = _this7.$parent.getUserAvatar();
        _this7.customer_info_str = _this7.$parent.getMessage();
        _this7.note_info_str = _this7.$parent.getBusiness('订单详情页', null, _this7.orderId);
      });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImluaXRUeHQiLCJpc1N0b3AiLCJ0aW1lSW50ZXJ2YWwiLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsIm1ldGhvZHMiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbE9yZGVyIiwiY2xlYXIiLCJnb0FkZHJlc3MiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29Mb2dpc3RpYyIsIm5hdmlnYXRlVG8iLCJnb1BheSIsImFwcFR5cGUiLCJIdHRwUmVxdWVzdCIsIlBheVNlcnZpY2UiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkdldE9yZGVyRGV0YWlsIiwiaGlkZUxvYWRpbmciLCJzaG93SWQiLCJkYXRlRm9ybWF0IiwiZGVjb2RlVVJJIiwidmFsIiwicGF5UmVtYWluaW5nVGltZSIsImludGVydmFsIiwibmFtZSIsInBob25lIiwiZGV0YWlsIiwiZnVsbEFyZWFOYW1lIiwiYnV5aW5nUmVjb3JkcyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwibWlzc1Rva2VuIiwiaW5pdERhdGEiLCJPYmplY3QiLCJrZXlzIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJjb20iLCJudW0iLCJHZXRMb2dpc3RpY2EiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwicGFyYW0iLCJnZXRVc2VyTmFtZSIsImdldFVzZXJBdmF0YXIiLCJnZXRNZXNzYWdlIiwiZ2V0QnVzaW5lc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O21NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLG1CQUFhLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLE1BQTNDLENBSFI7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxjQUFRLEVBTEg7QUFNTEMsZUFBUyxFQU5K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ekcsTUFBTCxHQUFjLE9BQUtPLE9BQUwsQ0FBYW1HLGFBQWIsRUFBZDtBQUNBLGVBQUt6RyxpQkFBTCxHQUF5QixPQUFLTSxPQUFMLENBQWFvRyxVQUFiLEVBQXpCO0FBQ0EsZUFBS3pHLGFBQUwsR0FBcUIsT0FBS0ssT0FBTCxDQUFhcUcsV0FBYixDQUF5QixPQUF6QixFQUFrQyxJQUFsQyxFQUF3QyxPQUFLekgsT0FBN0MsQ0FBckI7QUFDRCxPQUxEO0FBTUQ7OzsrQkFDVztBQUNWLFdBQUtvQyxLQUFMO0FBQ0Q7Ozs7RUF4UnNDLGVBQUtzRixJOztrQkFBekJySSxXIiwiZmlsZSI6Im9yZGVyRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpZDogJycsXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICforqLljZXlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIHN0YXR1c1R4dDogJycsXG4gICAgICBzdGF0dXM6ICcnLFxuICAgICAgYWRkcmVzczoge30sXG4gICAgICBvcmRlcjogW10sXG4gICAgICBvcmRlcklkOiAnJyxcbiAgICAgIGNyZWF0ZVRpbWU6ICcnLFxuICAgICAgbWVtbzogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgZmluYWxQcmljZTogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHJlbWFpblRpbWU6ICcnLFxuICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgaW5pdFR4dDogJ+W+heaUr+S7mCcsXG4gICAgICBpc1N0b3A6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsOiAnJyxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG5vdGVfaW5mb19zdHI6ICcnXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0ub3JkZXJEZXRhaWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2FuY2VsICgpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0hpZGRlbiA9IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXJkZXRhaWwmaWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpc3RpY2E/aWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgb3JkZXJJZDogdGhpcy5pZCxcbiAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJ1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJEZXRhaWwoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2RhdGEuc3RhdHVzXVxuICAgICAgICAgIF90aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzXG4gICAgICAgICAgX3RoaXMub3JkZXJJZCA9IGRhdGEuc2hvd0lkXG4gICAgICAgICAgX3RoaXMuY3JlYXRlVGltZSA9IF90aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLmNyZWF0ZVRpbWUgKiAxMDAwLCAnWS1tLWQgSDppOnMnKVxuICAgICAgICAgIF90aGlzLm1lbW8gPSBkYXRhLm1lbW8gPyBkZWNvZGVVUkkoZGF0YS5tZW1vWzBdLnZhbCkgOiAnJ1xuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIC8vIF90aGlzLmluaXRMb2dpc3RpY2EoJ3NodW5mZW5nJywgZGF0YS5zaG93SWQpXG4gICAgICAgICAgaWYgKGRhdGEucGF5UmVtYWluaW5nVGltZSkge1xuICAgICAgICAgICAgX3RoaXMuaW50ZXJ2YWwoZGF0YS5wYXlSZW1haW5pbmdUaW1lKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGF0YS5hZGRyZXNzKSB7XG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLm5hbWUgPSBkYXRhLmFkZHJlc3MubmFtZVxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5waG9uZSA9IGRhdGEuYWRkcmVzcy5waG9uZVxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5kZXRhaWwgPSBkYXRhLmFkZHJlc3MuZnVsbEFyZWFOYW1lICsgZGF0YS5hZGRyZXNzLmFkZHJlc3NcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcyA9ICcnXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLmZpbmFsUHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICBkYXRhLmJ1eWluZ1JlY29yZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmoub3JkZXJEZXRhaWwgPSBfdGhpcy5pbml0Q2hpbGQoaXRlbS5idXlpbmdSZWNvcmRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXIucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coT2JqZWN0LmtleXMoX3RoaXMuYWRkcmVzcykubGVuZ3RoKVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzU3RvcCA9IHRydWVcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IF90aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0TG9naXN0aWNhIChjb20sIG51bSkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgY29tOiBjb20sXG4gICAgICAgIG51bTogbnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TG9naXN0aWNhKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbnRlcnZhbCAodGltZSkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy50aW1lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRpbWUtLVxuICAgICAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gKHRpbWUgLSB0aW1lICUgNjApIC8gNjAgKyAn5YiGJyArIHRpbWUgJSA2MCArICfnp5InXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMucmVtYWluVGltZSA9IDBcbiAgICAgICAgICBfdGhpcy5pbml0VHh0ID0gJ+S6pOaYk+WFs+mXrSdcbiAgICAgICAgICBfdGhpcy5jbGVhcigpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICAgIGNsZWFyICgpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lSW50ZXJ2YWwpXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIHRoaXMuaWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5jbGVhcigpXG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCforqLljZXor6bmg4XpobUnLCBudWxsLCB0aGlzLm9yZGVySWQpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblVubG9hZCAoKSB7XG4gICAgICB0aGlzLmNsZWFyKClcbiAgICB9XG4gIH1cbiJdfQ==