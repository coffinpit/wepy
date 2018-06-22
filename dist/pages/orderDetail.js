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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImluaXRUeHQiLCJpc1N0b3AiLCJ0aW1lSW50ZXJ2YWwiLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsIm1ldGhvZHMiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbE9yZGVyIiwiY2xlYXIiLCJnb0FkZHJlc3MiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29Mb2dpc3RpYyIsIm5hdmlnYXRlVG8iLCJnb1BheSIsImFwcFR5cGUiLCJIdHRwUmVxdWVzdCIsIlBheVNlcnZpY2UiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJzd2l0Y2hUYWIiLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkdldE9yZGVyRGV0YWlsIiwiaGlkZUxvYWRpbmciLCJzaG93SWQiLCJkYXRlRm9ybWF0IiwiZGVjb2RlVVJJIiwidmFsIiwicGF5UmVtYWluaW5nVGltZSIsImludGVydmFsIiwibmFtZSIsInBob25lIiwiZGV0YWlsIiwiZnVsbEFyZWFOYW1lIiwiYnV5aW5nUmVjb3JkcyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwibWlzc1Rva2VuIiwiaW5pdERhdGEiLCJPYmplY3QiLCJrZXlzIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJjb20iLCJudW0iLCJHZXRMb2dpc3RpY2EiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwicGFyYW0iLCJnZXRVc2VyTmFtZSIsImdldFVzZXJBdmF0YXIiLCJnZXRNZXNzYWdlIiwiZ2V0QnVzaW5lc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O21NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLG1CQUFhLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLE1BQTNDLENBSFI7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxjQUFRLEVBTEg7QUFN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QUwsQ0FBYW9HLGFBQWIsRUFBZDtBQUNBLGVBQUsxRyxpQkFBTCxHQUF5QixPQUFLTSxPQUFMLENBQWFxRyxVQUFiLEVBQXpCO0FBQ0EsZUFBSzFHLGFBQUwsR0FBcUIsT0FBS0ssT0FBTCxDQUFhc0csV0FBYixDQUF5QixPQUF6QixFQUFrQyxJQUFsQyxFQUF3QyxPQUFLMUgsT0FBN0MsQ0FBckI7QUFDRCxPQUxEO0FBTUQ7OzsrQkFDVztBQUNWLFdBQUtvQyxLQUFMO0FBQ0Q7Ozs7RUFwUnNDLGVBQUt1RixJOztrQkFBekJ0SSxXIiwiZmlsZSI6Im9yZGVyRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpZDogJycsXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICforqLljZXlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIHN0YXR1c1R4dDogJycsXG4gICAgICBzdGF0dXM6ICcnLFxuICAgICAgYWRkcmVzczoge30sXG4gICAgICBvcmRlcjogW10sXG4gICAgICBvcmRlcklkOiAnJyxcbiAgICAgIGNyZWF0ZVRpbWU6ICcnLFxuICAgICAgbWVtbzogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgZmluYWxQcmljZTogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHJlbWFpblRpbWU6ICcnLFxuICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgaW5pdFR4dDogJ+W+heaUr+S7mCcsXG4gICAgICBpc1N0b3A6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsOiAnJyxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG5vdGVfaW5mb19zdHI6ICcnXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0ub3JkZXJEZXRhaWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2FuY2VsICgpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0hpZGRlbiA9IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXJkZXRhaWwmaWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpc3RpY2E/aWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgb3JkZXJJZDogdGhpcy5pZCxcbiAgICAgICAgICAgIGFwcFR5cGU6ICdpb3MnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLnJlbWFpblRpbWUgPSAwXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMuaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRPcmRlckRldGFpbChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuc3RhdHVzVHh0ID0gX3RoaXMub3JkZXJTdGF0dXNbZGF0YS5zdGF0dXNdXG4gICAgICAgICAgX3RoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXNcbiAgICAgICAgICBfdGhpcy5vcmRlcklkID0gZGF0YS5zaG93SWRcbiAgICAgICAgICBfdGhpcy5jcmVhdGVUaW1lID0gX3RoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGRhdGEuY3JlYXRlVGltZSAqIDEwMDAsICdZLW0tZCBIOmk6cycpXG4gICAgICAgICAgX3RoaXMubWVtbyA9IGRhdGEubWVtbyA/IGRlY29kZVVSSShkYXRhLm1lbW9bMF0udmFsKSA6ICcnXG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgLy8gX3RoaXMuaW5pdExvZ2lzdGljYSgnc2h1bmZlbmcnLCBkYXRhLnNob3dJZClcbiAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lKSB7XG4gICAgICAgICAgICBfdGhpcy5pbnRlcnZhbChkYXRhLnBheVJlbWFpbmluZ1RpbWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzID0gJydcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuZmluYWxQcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuYnV5aW5nUmVjb3Jkcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5vcmRlckRldGFpbCA9IF90aGlzLmluaXRDaGlsZChpdGVtLmJ1eWluZ1JlY29yZHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdERhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhfdGhpcy5hZGRyZXNzKS5sZW5ndGgpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMuaWRcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNTdG9wID0gdHJ1ZVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gX3RoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRMb2dpc3RpY2EgKGNvbSwgbnVtKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjb206IGNvbSxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY2EoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGludGVydmFsICh0aW1lKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLnRpbWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGltZS0tXG4gICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgIF90aGlzLnJlbWFpblRpbWUgPSAodGltZSAtIHRpbWUgJSA2MCkgLyA2MCArICfliIYnICsgdGltZSAlIDYwICsgJ+enkidcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgIF90aGlzLmluaXRUeHQgPSAn5Lqk5piT5YWz6ZetJ1xuICAgICAgICAgIF90aGlzLmNsZWFyKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gICAgY2xlYXIgKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVJbnRlcnZhbClcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgdGhpcy5pZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCforqLljZXor6bmg4XpobUnLCBudWxsLCB0aGlzLm9yZGVySWQpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblVubG9hZCAoKSB7XG4gICAgICB0aGlzLmNsZWFyKClcbiAgICB9XG4gIH1cbiJdfQ==