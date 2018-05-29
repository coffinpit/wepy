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
      isStop: false
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
      },
      goPay: function goPay() {
        var _this4 = this;

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
              'complete': function complete(res) {}
            });
          } else {
            _this4.$parent.payFail();
          }
        }).catch(function () {
          _this4.$parent.payFail();
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(OrderDetail, [{
    key: 'initData',
    value: function initData() {
      var _this5 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      this.$parent.HttpRequest.GetOrderDetail(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.statusTxt = _this.orderStatus[data.status];
          _this.status = data.status;
          _this.orderId = data.showId;
          _this.createTime = _this.$parent.dateFormat(data.createTime * 1000, 'Y-m-d H:i:s');
          _this.memo = data.memo ? data.memo[0].val : '';
          _this.pay = data.pay;
          _this.freight = data.freight;
          // _this.initLogistica('shunfeng', data.showId)
          var time = setInterval(function () {
            data.payRemainingTime--;
            if (data.payRemainingTime > 0) {
              _this.remainTime = (data.payRemainingTime - data.payRemainingTime % 60) / 60 + '分' + data.payRemainingTime % 60 + '秒';
            } else {
              _this.remainTime = 0;
              _this.initTxt = '交易关闭';
              clearInterval(time);
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
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
            _this.initData();
          }
        }
        _this.$apply();
      }).catch(function () {
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
  }]);

  return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/orderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImluaXRUeHQiLCJpc1N0b3AiLCJjb21wdXRlZCIsImlzTnVsbCIsImxlbmd0aCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwibWV0aG9kcyIsImNhbmNlbCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2VsT3JkZXIiLCJnb0FkZHJlc3MiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29QYXkiLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRpbWVTdGFtcCIsInRpbWVzdGFtcCIsInRvU3RyaW5nIiwibm9uY2VTdHIiLCJub25jZXN0ciIsInByZXBheWlkIiwic2lnbkRhdGEiLCJzaWduIiwiZ2V0UGF5U2lnbiIsInJlcXVlc3RQYXltZW50IiwiZXJyTXNnIiwic3dpdGNoVGFiIiwicGF5RmFpbCIsImNhdGNoIiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0T3JkZXJEZXRhaWwiLCJzaG93U3VjY2VzcyIsInNob3dJZCIsImRhdGVGb3JtYXQiLCJ2YWwiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJwYXlSZW1haW5pbmdUaW1lIiwiY2xlYXJJbnRlcnZhbCIsIiRhcHBseSIsIm5hbWUiLCJwaG9uZSIsImRldGFpbCIsImZ1bGxBcmVhTmFtZSIsImJ1eWluZ1JlY29yZHMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsIm1pc3NUb2tlbiIsImluaXREYXRhIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiY2IiLCJDYW5jZWxPcmRlciIsImNvbSIsIm51bSIsIkdldExvZ2lzdGljYSIsInBhcmFtIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OzttTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLFVBQUksRUFGQztBQUdMQyxtQkFBYSxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixNQUFyQixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxNQUEzQyxDQUhSO0FBSUxDLGlCQUFXLEVBSk47QUFLTEMsY0FBUSxFQUxIO0FBTUxDLGVBQVMsRUFOSjtBQU9MQyxhQUFPLEVBUEY7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGtCQUFZLEVBVFA7QUFVTEMsWUFBTSxFQVZEO0FBV0xDLFdBQUssRUFYQTtBQVlMQyxrQkFBWSxFQVpQO0FBYUxDLGVBQVMsRUFiSjtBQWNMQyxrQkFBWSxFQWRQO0FBZUxDLGdCQUFVLEtBZkw7QUFnQkxDLGVBQVMsS0FoQko7QUFpQkxDLGNBQVE7QUFqQkgsSyxTQW1CUEMsUSxHQUFX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IGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpZDogJycsXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICforqLljZXlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIHN0YXR1c1R4dDogJycsXG4gICAgICBzdGF0dXM6ICcnLFxuICAgICAgYWRkcmVzczoge30sXG4gICAgICBvcmRlcjogW10sXG4gICAgICBvcmRlcklkOiAnJyxcbiAgICAgIGNyZWF0ZVRpbWU6ICcnLFxuICAgICAgbWVtbzogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgZmluYWxQcmljZTogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHJlbWFpblRpbWU6ICcnLFxuICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgaW5pdFR4dDogJ+W+heaUr+S7mCcsXG4gICAgICBpc1N0b3A6IGZhbHNlXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0ub3JkZXJEZXRhaWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2FuY2VsICgpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0hpZGRlbiA9IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1vcmRlcmRldGFpbCZpZD0nICsgdGhpcy5pZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgb3JkZXJJZDogdGhpcy5pZCxcbiAgICAgICAgICBhcHBUeXBlOiAnaW9zJ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5pZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyRGV0YWlsKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2RhdGEuc3RhdHVzXVxuICAgICAgICAgIF90aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzXG4gICAgICAgICAgX3RoaXMub3JkZXJJZCA9IGRhdGEuc2hvd0lkXG4gICAgICAgICAgX3RoaXMuY3JlYXRlVGltZSA9IF90aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLmNyZWF0ZVRpbWUgKiAxMDAwLCAnWS1tLWQgSDppOnMnKVxuICAgICAgICAgIF90aGlzLm1lbW8gPSBkYXRhLm1lbW8gPyBkYXRhLm1lbW9bMF0udmFsIDogJydcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICAvLyBfdGhpcy5pbml0TG9naXN0aWNhKCdzaHVuZmVuZycsIGRhdGEuc2hvd0lkKVxuICAgICAgICAgIHZhciB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZGF0YS5wYXlSZW1haW5pbmdUaW1lIC0tXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lID4gMCkge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gKGRhdGEucGF5UmVtYWluaW5nVGltZSAtIGRhdGEucGF5UmVtYWluaW5nVGltZSAlIDYwKSAvIDYwICsgJ+WIhicgKyBkYXRhLnBheVJlbWFpbmluZ1RpbWUgJSA2MCArICfnp5InXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgICAgICBfdGhpcy5pbml0VHh0ID0gJ+S6pOaYk+WFs+mXrSdcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzU3RvcCA9IHRydWVcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IF90aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0TG9naXN0aWNhIChjb20sIG51bSkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgY29tOiBjb20sXG4gICAgICAgIG51bTogbnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TG9naXN0aWNhKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICB0aGlzLmlkID0gcGFyYW0uaWRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgIH1cbiAgfVxuIl19