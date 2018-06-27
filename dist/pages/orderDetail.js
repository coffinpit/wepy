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
      deliverStatus: '',
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
          _this.deliverStatus = data.deliverStatus;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJkZWxpdmVyU3RhdHVzIiwiZmluYWxQcmljZSIsImZyZWlnaHQiLCJyZW1haW5UaW1lIiwiaXNIaWRkZW4iLCJpbml0VHh0IiwiaXNTdG9wIiwidGltZUludGVydmFsIiwicGF5bWVudCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsImNvbXB1dGVkIiwiaXNOdWxsIiwibGVuZ3RoIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJtZXRob2RzIiwiY2FuY2VsIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImNsZWFyIiwiZ29BZGRyZXNzIiwicmVkaXJlY3RUbyIsInVybCIsImdvTG9naXN0aWMiLCJuYXZpZ2F0ZVRvIiwiZ29QYXkiLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRpbWVTdGFtcCIsInRpbWVzdGFtcCIsInRvU3RyaW5nIiwibm9uY2VTdHIiLCJub25jZXN0ciIsInByZXBheWlkIiwic2lnbkRhdGEiLCJzaWduIiwiZ2V0UGF5U2lnbiIsInJlcXVlc3RQYXltZW50IiwiZXJyTXNnIiwicGF5RmFpbCIsImNhdGNoIiwiY2IiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlckRldGFpbCIsImhpZGVMb2FkaW5nIiwic2hvd0lkIiwiZGF0ZUZvcm1hdCIsImRlY29kZVVSSSIsInZhbCIsInBheVJlbWFpbmluZ1RpbWUiLCJpbnRlcnZhbCIsIm5hbWUiLCJwaG9uZSIsImRldGFpbCIsImZ1bGxBcmVhTmFtZSIsImJ1eWluZ1JlY29yZHMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsIm1pc3NUb2tlbiIsImluaXREYXRhIiwiT2JqZWN0Iiwia2V5cyIsIiRhcHBseSIsInNob3dGYWlsIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzYWxlc1VuaXRUeXBlIiwic291cmNlSWQiLCJzYWxlc1VuaXRJZCIsImJ1eWluZ0NvdW50IiwiY291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsIkNhbmNlbE9yZGVyIiwiY29tIiwibnVtIiwiR2V0TG9naXN0aWNhIiwidGltZSIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInBhcmFtIiwiZ2V0VXNlck5hbWUiLCJnZXRVc2VyQXZhdGFyIiwiZ2V0TWVzc2FnZSIsImdldEJ1c2luZXNzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OzttTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLFVBQUksRUFGQztBQUdMQyxtQkFBYSxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixNQUFyQixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxNQUEzQyxDQUhSO0FBSUxDLGlCQUFXLEVBSk47QUFLTEMsY0FBUSxFQUxIO0FBTUxDLGVBQVMsRUFOSjtBQU9MQyxhQUFPLEVBUEY7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGtCQUFZLEVBVFA7QUFVTEMsWUFBTSxFQVZEO0FBV0xDLFdBQUssRUFYQTtBQVlMQyxxQkFBZSxFQVpWO0FBYUxDLGtCQUFZLEVBYlA7QUFjTEMsZUFBUyxFQWRKO0FBZUxDLGtCQUFZLEVBZlA7QUFnQkxDLGdCQUFVLEtBaEJMO0FBaUJMQyxlQUFTLEtBakJKO0FBa0JMQyxjQUFRLEtBbEJIO0FBbUJMQyxvQkFBYyxFQW5CVDtBQW9CTEMsZUFBUyxJQXBCSjtBQXFCTEMsaUJBQVcsRUFyQk47QUFzQkxDLGNBQVEsRUF0Qkg7QUF1QkxDLHlCQUFtQixFQXZCZDtBQXdCTEMscUJBQWU7QUF4QlYsSyxTQTBCUEMsUSxHQUFXO0FBQ1RDLFlBRFMsb0JBQ0M7QUFDUixZQUFJLEtBQUtuQixLQUFMLENBQVdvQixNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGlCQUFPLElBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRixPQVBRO0FBUVRDLGVBUlMsdUJBUUk7QUFDWCxZQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDM0MsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDbEQsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFkUSxLLFNBZ0JaRyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBVCxFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sT0FBbEIsRUFBMEIsUUFBTyxNQUFqQyxFQUF3QyxTQUFRLE9BQWhELEVBQXdELE9BQU0sS0FBOUQsRUFBaEIsRUFBcUYseUJBQXdCLEVBQUMsU0FBUSxrQkFBVCxFQUE0QixPQUFNLE9BQWxDLEVBQTBDLFFBQU8sTUFBakQsRUFBd0QsU0FBUSxPQUFoRSxFQUF3RSxPQUFNLEtBQTlFLEVBQTdHLEVBQWtNLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLE9BQTNCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQTFOLEVBQWIsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLE8sR0FBVTtBQUNSQyxZQURRLG9CQUNFO0FBQUE7O0FBQ1IsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBTyxJQURNO0FBRWJDLG1CQUFTLFFBRkk7QUFHYkMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLHFCQUFLQyxXQUFMLENBQWlCLFlBQU07QUFDckIsdUJBQUs1QixRQUFMLEdBQWdCLElBQWhCO0FBQ0QsZUFGRDtBQUdBLHFCQUFLNkIsS0FBTDtBQUNEO0FBQ0Y7QUFWWSxTQUFmO0FBWUQsT0FkTztBQWVSQyxlQWZRLHVCQWVLO0FBQ1gsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxtQ0FBbUMsS0FBSzlDO0FBRC9CLFNBQWhCO0FBR0EsYUFBSzJDLEtBQUw7QUFDRCxPQXBCTztBQXFCUkksZ0JBckJRLHdCQXFCTTtBQUNaLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RGLGVBQUssb0JBQW9CLEtBQUs5QztBQURoQixTQUFoQjtBQUdELE9BekJPO0FBMEJSaUQsV0ExQlEsbUJBMEJDO0FBQUE7O0FBQ1AsWUFBSSxLQUFLL0IsT0FBVCxFQUFrQjtBQUNoQixjQUFJcEIsT0FBTztBQUNUQyxtQkFBTyxLQUFLQSxLQURIO0FBRVRPLHFCQUFTLEtBQUtOLEVBRkw7QUFHVGtELHFCQUFTO0FBSEEsV0FBWDtBQUtBLGVBQUt2QixPQUFMLENBQWF3QixXQUFiLENBQXlCQyxVQUF6QixDQUFvQ3RELElBQXBDLEVBQTBDdUQsSUFBMUMsQ0FBK0MsVUFBQ2IsR0FBRCxFQUFTO0FBQ3REYyxvQkFBUUMsR0FBUixDQUFZZixHQUFaO0FBQ0EsZ0JBQUlBLElBQUkxQyxJQUFKLENBQVMwRCxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGtCQUFJMUQsT0FBTzBDLElBQUkxQyxJQUFKLENBQVNBLElBQXBCO0FBQ0Esa0JBQUkyRCxZQUFZM0QsS0FBSzRELFNBQUwsQ0FBZUMsUUFBZixFQUFoQjtBQUNBLGtCQUFJQyxXQUFXOUQsS0FBSytELFFBQXBCO0FBQ0Esa0JBQUlDLFdBQVcsZUFBZWhFLEtBQUtnRSxRQUFuQztBQUNBLGtCQUFJQyxXQUFXO0FBQ2IseUJBQVMsb0JBREk7QUFFYiw2QkFBYU4sU0FGQTtBQUdiLDRCQUFZRyxRQUhDO0FBSWIsMkJBQVdFLFFBSkU7QUFLYiw0QkFBWTtBQUxDLGVBQWY7QUFPQSxrQkFBSUUsT0FBTyxPQUFLckMsT0FBTCxDQUFhd0IsV0FBYixDQUF5QmMsVUFBekIsQ0FBb0NGLFFBQXBDLENBQVg7QUFDQSw2QkFBS0csY0FBTCxDQUFvQjtBQUNsQiw2QkFBYVQsU0FESztBQUVsQiw0QkFBWUcsUUFGTTtBQUdsQiwyQkFBV0UsUUFITztBQUlsQiw0QkFBWSxLQUpNO0FBS2xCLDJCQUFXRSxJQUxPO0FBTWxCLDJCQUFXLGlCQUFDeEIsR0FBRCxFQUFTO0FBQ2xCLHNCQUFJQSxJQUFJMkIsTUFBSixLQUFlLG1CQUFuQixFQUF3QztBQUN0QztBQUNBLDJCQUFLeEIsS0FBTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFLRSxVQUFMLENBQWdCO0FBQ2RDLDJCQUFLO0FBRFMscUJBQWhCO0FBR0QsbUJBVEQsTUFTTyxJQUFJTixJQUFJMkIsTUFBSixLQUFlLHVCQUFuQixFQUE0QztBQUNqRDtBQUNBLDJCQUFLeEMsT0FBTCxDQUFheUMsT0FBYjtBQUNEO0FBQ0YsaUJBcEJpQjtBQXFCbEIsd0JBQVEsY0FBQzVCLEdBQUQsRUFBUztBQUNmLHlCQUFLYixPQUFMLENBQWF5QyxPQUFiO0FBQ0QsaUJBdkJpQjtBQXdCbEIsNEJBQVksa0JBQUM1QixHQUFELEVBQVM7QUFDbkIseUJBQUt0QixPQUFMLEdBQWUsSUFBZjtBQUNEO0FBMUJpQixlQUFwQjtBQTRCRCxhQXpDRCxNQXlDTztBQUNMLHFCQUFLUyxPQUFMLENBQWF5QyxPQUFiO0FBQ0Q7QUFDRixXQTlDRCxFQThDR0MsS0E5Q0gsQ0E4Q1MsWUFBTTtBQUNiLG1CQUFLMUMsT0FBTCxDQUFheUMsT0FBYjtBQUNELFdBaEREO0FBaUREO0FBQ0QsYUFBS2xELE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFwRk8sSzs7Ozs7NkJBc0ZBb0QsRSxFQUFJO0FBQUE7O0FBQ1osV0FBS3ZFLEtBQUwsR0FBYSxLQUFLNEIsT0FBTCxDQUFhNEMsUUFBYixFQUFiO0FBQ0EsV0FBSzFELFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLYyxPQUFMLENBQWE2QyxXQUFiO0FBQ0EsV0FBS25FLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBSW9FLFFBQVEsSUFBWjtBQUNBLFVBQUkzRSxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUTyxpQkFBUyxLQUFLTjtBQUZMLE9BQVg7QUFJQSxXQUFLMkIsT0FBTCxDQUFhd0IsV0FBYixDQUF5QnVCLGNBQXpCLENBQXdDNUUsSUFBeEMsRUFBOEN1RCxJQUE5QyxDQUFtRCxVQUFDYixHQUFELEVBQVM7QUFDMURjLGdCQUFRQyxHQUFSLENBQVlmLEdBQVo7QUFDQWlDLGNBQU05QyxPQUFOLENBQWNnRCxXQUFkO0FBQ0EsWUFBSW5DLElBQUkxQyxJQUFKLENBQVMwRCxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUkxRCxPQUFPMEMsSUFBSTFDLElBQUosQ0FBU0EsSUFBcEI7QUFDQTJFLGdCQUFNdkUsU0FBTixHQUFrQnVFLE1BQU14RSxXQUFOLENBQWtCSCxLQUFLSyxNQUF2QixDQUFsQjtBQUNBc0UsZ0JBQU10RSxNQUFOLEdBQWVMLEtBQUtLLE1BQXBCO0FBQ0FzRSxnQkFBTS9ELGFBQU4sR0FBc0JaLEtBQUtZLGFBQTNCO0FBQ0ErRCxnQkFBTW5FLE9BQU4sR0FBZ0JSLEtBQUs4RSxNQUFyQjtBQUNBSCxnQkFBTWxFLFVBQU4sR0FBbUJrRSxNQUFNOUMsT0FBTixDQUFja0QsVUFBZCxDQUF5Qi9FLEtBQUtTLFVBQUwsR0FBa0IsSUFBM0MsRUFBaUQsYUFBakQsQ0FBbkI7QUFDQWtFLGdCQUFNakUsSUFBTixHQUFhVixLQUFLVSxJQUFMLEdBQVlzRSxVQUFVaEYsS0FBS1UsSUFBTCxDQUFVLENBQVYsRUFBYXVFLEdBQXZCLENBQVosR0FBMEMsRUFBdkQ7QUFDQU4sZ0JBQU1oRSxHQUFOLEdBQVlYLEtBQUtXLEdBQWpCO0FBQ0FnRSxnQkFBTTdELE9BQU4sR0FBZ0JkLEtBQUtjLE9BQXJCO0FBQ0E7QUFDQSxjQUFJZCxLQUFLa0YsZ0JBQVQsRUFBMkI7QUFDekJQLGtCQUFNUSxRQUFOLENBQWVuRixLQUFLa0YsZ0JBQXBCO0FBQ0Q7QUFDRCxjQUFJbEYsS0FBS00sT0FBVCxFQUFrQjtBQUNoQnFFLGtCQUFNckUsT0FBTixDQUFjOEUsSUFBZCxHQUFxQnBGLEtBQUtNLE9BQUwsQ0FBYThFLElBQWxDO0FBQ0FULGtCQUFNckUsT0FBTixDQUFjK0UsS0FBZCxHQUFzQnJGLEtBQUtNLE9BQUwsQ0FBYStFLEtBQW5DO0FBQ0FWLGtCQUFNckUsT0FBTixDQUFjZ0YsTUFBZCxHQUF1QnRGLEtBQUtNLE9BQUwsQ0FBYWlGLFlBQWIsR0FBNEJ2RixLQUFLTSxPQUFMLENBQWFBLE9BQWhFO0FBQ0QsV0FKRCxNQUlPO0FBQ0xxRSxrQkFBTXJFLE9BQU4sR0FBZ0IsRUFBaEI7QUFDRDtBQUNEcUUsZ0JBQU05RCxVQUFOLEdBQW1CYixLQUFLYSxVQUF4QjtBQUNBYixlQUFLd0YsYUFBTCxDQUFtQkMsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ25DLGdCQUFJQyxNQUFNLEVBQVY7QUFDQUEsZ0JBQUlwRCxLQUFKLEdBQVltRCxLQUFLbkQsS0FBakI7QUFDQW9ELGdCQUFJQyxXQUFKLEdBQWtCakIsTUFBTWtCLFNBQU4sQ0FBZ0JILEtBQUtGLGFBQXJCLENBQWxCO0FBQ0FiLGtCQUFNcEUsS0FBTixDQUFZdUYsSUFBWixDQUFpQkgsR0FBakI7QUFDRCxXQUxEO0FBTUFuQixnQkFBTUEsSUFBTjtBQUNELFNBN0JELE1BNkJPO0FBQ0wsY0FBSUcsTUFBTTlDLE9BQU4sQ0FBY2tFLFNBQWxCLEVBQTZCO0FBQzNCcEIsa0JBQU0xRSxLQUFOLEdBQWMsT0FBSzRCLE9BQUwsQ0FBYTRDLFFBQWIsQ0FBc0IvQixJQUFJMUMsSUFBSixDQUFTMEQsS0FBL0IsQ0FBZDtBQUNBaUIsa0JBQU1xQixRQUFOO0FBQ0Q7QUFDRjtBQUNEeEMsZ0JBQVFDLEdBQVIsQ0FBWXdDLE9BQU9DLElBQVAsQ0FBWXZCLE1BQU1yRSxPQUFsQixFQUEyQnFCLE1BQXZDO0FBQ0FnRCxjQUFNd0IsTUFBTjtBQUNELE9BeENELEVBd0NHNUIsS0F4Q0gsQ0F3Q1MsWUFBTTtBQUNiSSxjQUFNOUMsT0FBTixDQUFjZ0QsV0FBZDtBQUNBRixjQUFNOUMsT0FBTixDQUFjdUUsUUFBZDtBQUNELE9BM0NEO0FBNENEOzs7OEJBQ1VDLE0sRUFBUTtBQUNqQixVQUFJQyxRQUFRLEVBQVo7QUFDQUQsYUFBT1osT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN2QixZQUFJQyxNQUFNLEVBQVY7QUFDQUEsWUFBSVksSUFBSixHQUFXYixLQUFLYyxLQUFoQjtBQUNBYixZQUFJcEQsS0FBSixHQUFZbUQsS0FBS2UsV0FBakI7QUFDQWQsWUFBSWUsS0FBSixHQUFZaEIsS0FBS2lCLFdBQWpCO0FBQ0FoQixZQUFJaUIsUUFBSixHQUFlbEIsS0FBS2dCLEtBQXBCO0FBQ0FmLFlBQUl6RixFQUFKLEdBQVN3RixLQUFLbUIsU0FBZDtBQUNBbEIsWUFBSW1CLFVBQUosR0FBaUJwQixLQUFLcUIsYUFBdEI7QUFDQXBCLFlBQUlxQixRQUFKLEdBQWV0QixLQUFLdUIsV0FBcEI7QUFDQXRCLFlBQUlMLE1BQUosR0FBYUksS0FBS25ELEtBQUwsR0FBYSxHQUFiLEdBQW1CbUQsS0FBS3dCLFdBQXJDO0FBQ0F2QixZQUFJd0IsS0FBSixHQUFZekIsS0FBS3dCLFdBQWpCO0FBQ0F2QixZQUFJeUIsT0FBSixHQUFjLEtBQWQ7QUFDQXpCLFlBQUkwQixVQUFKLEdBQWlCM0IsS0FBSzRCLFNBQXRCO0FBQ0FoQixjQUFNUixJQUFOLENBQVdILEdBQVg7QUFDRCxPQWREO0FBZUEsYUFBT1csS0FBUDtBQUNEOzs7Z0NBQ1k5QixFLEVBQUk7QUFDZixXQUFLdkUsS0FBTCxHQUFhLEtBQUs0QixPQUFMLENBQWE0QyxRQUFiLEVBQWI7QUFDQSxVQUFJRSxRQUFRLElBQVo7QUFDQSxVQUFJM0UsT0FBTztBQUNUQyxlQUFPLEtBQUtBLEtBREg7QUFFVE8saUJBQVMsS0FBS047QUFGTCxPQUFYO0FBSUFzRCxjQUFRQyxHQUFSLENBQVl6RCxJQUFaO0FBQ0EsV0FBSzZCLE9BQUwsQ0FBYXdCLFdBQWIsQ0FBeUJrRSxXQUF6QixDQUFxQ3ZILElBQXJDLEVBQTJDdUQsSUFBM0MsQ0FBZ0QsVUFBQ2IsR0FBRCxFQUFTO0FBQ3ZEYyxnQkFBUUMsR0FBUixDQUFZZixHQUFaO0FBQ0EsWUFBSUEsSUFBSTFDLElBQUosQ0FBUzBELEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJpQixnQkFBTXpELE1BQU4sR0FBZSxJQUFmO0FBQ0FzRCxnQkFBTUEsSUFBTjtBQUNELFNBSEQsTUFHTztBQUNMLGNBQUlHLE1BQU05QyxPQUFOLENBQWNrRSxTQUFsQixFQUE2QjtBQUMzQnBCLGtCQUFNMUUsS0FBTixHQUFjMEUsTUFBTTlDLE9BQU4sQ0FBYzRDLFFBQWQsQ0FBdUIvQixJQUFJMUMsSUFBSixDQUFTMEQsS0FBaEMsQ0FBZDtBQUNEO0FBQ0Y7QUFDRGlCLGNBQU13QixNQUFOO0FBQ0QsT0FYRDtBQVlEOzs7a0NBQ2NxQixHLEVBQUtDLEcsRUFBSztBQUFBOztBQUN2QixXQUFLeEgsS0FBTCxHQUFhLEtBQUs0QixPQUFMLENBQWE0QyxRQUFiLEVBQWI7QUFDQSxVQUFJRSxRQUFRLElBQVo7QUFDQSxVQUFJM0UsT0FBTztBQUNUd0gsYUFBS0EsR0FESTtBQUVUQyxhQUFLQTtBQUZJLE9BQVg7QUFJQSxXQUFLNUYsT0FBTCxDQUFhd0IsV0FBYixDQUF5QnFFLFlBQXpCLENBQXNDMUgsSUFBdEMsRUFBNEN1RCxJQUE1QyxDQUFpRCxVQUFDYixHQUFELEVBQVM7QUFDeERjLGdCQUFRQyxHQUFSLENBQVlmLEdBQVo7QUFDQSxZQUFJQSxJQUFJMUMsSUFBSixDQUFTMEQsS0FBVCxLQUFtQixDQUF2QixFQUEwQixDQUN6QixDQURELE1BQ087QUFDTCxjQUFJaUIsTUFBTTlDLE9BQU4sQ0FBY2tFLFNBQWxCLEVBQTZCO0FBQzNCcEIsa0JBQU0xRSxLQUFOLEdBQWMsT0FBSzRCLE9BQUwsQ0FBYTRDLFFBQWIsQ0FBc0IvQixJQUFJMUMsSUFBSixDQUFTMEQsS0FBL0IsQ0FBZDtBQUNEO0FBQ0Y7QUFDRixPQVJEO0FBU0Q7Ozs2QkFDU2lFLEksRUFBTTtBQUNkLFVBQUloRCxRQUFRLElBQVo7QUFDQSxXQUFLeEQsWUFBTCxHQUFvQnlHLFlBQVksWUFBTTtBQUNwQ0Q7QUFDQSxZQUFJQSxPQUFPLENBQVgsRUFBYztBQUNaaEQsZ0JBQU01RCxVQUFOLEdBQW1CLENBQUM0RyxPQUFPQSxPQUFPLEVBQWYsSUFBcUIsRUFBckIsR0FBMEIsR0FBMUIsR0FBZ0NBLE9BQU8sRUFBdkMsR0FBNEMsR0FBL0Q7QUFDRCxTQUZELE1BRU87QUFDTGhELGdCQUFNNUQsVUFBTixHQUFtQixDQUFuQjtBQUNBNEQsZ0JBQU0xRCxPQUFOLEdBQWdCLE1BQWhCO0FBQ0EwRCxnQkFBTTlCLEtBQU47QUFDRDtBQUNEOEIsY0FBTXdCLE1BQU47QUFDRCxPQVZtQixFQVVqQixJQVZpQixDQUFwQjtBQVdEOzs7NEJBQ1E7QUFDUDBCLG9CQUFjLEtBQUsxRyxZQUFuQjtBQUNEOzs7MkJBQ08yRyxLLEVBQU87QUFDYixXQUFLNUgsRUFBTCxHQUFVNEgsTUFBTTVILEVBQWhCO0FBQ0EsV0FBS2lHLE1BQUw7QUFDRDs7OzZCQUNTO0FBQUE7O0FBQ1IsV0FBS3RELEtBQUw7QUFDQSxXQUFLbUQsUUFBTCxDQUFjLFlBQU07QUFDbEIsZUFBSzNFLFNBQUwsR0FBaUIsT0FBS1EsT0FBTCxDQUFha0csV0FBYixFQUFqQjtBQUNBLGVBQUt6RyxNQUFMLEdBQWMsT0FBS08sT0FBTCxDQUFhbUcsYUFBYixFQUFkO0FBQ0EsZUFBS3pHLGlCQUFMLEdBQXlCLE9BQUtNLE9BQUwsQ0FBYW9HLFVBQWIsRUFBekI7QUFDQSxlQUFLekcsYUFBTCxHQUFxQixPQUFLSyxPQUFMLENBQWFxRyxXQUFiLENBQXlCLE9BQXpCLEVBQWtDLElBQWxDLEVBQXdDLE9BQUsxSCxPQUE3QyxDQUFyQjtBQUNELE9BTEQ7QUFNRDs7OytCQUNXO0FBQ1YsV0FBS3FDLEtBQUw7QUFDRDs7OztFQTFSc0MsZUFBS3NGLEk7O2tCQUF6QnRJLFciLCJmaWxlIjoib3JkZXJEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlkOiAnJyxcbiAgICAgIG9yZGVyU3RhdHVzOiBbJ+W8guW4uCcsICflvoXmlK/ku5gnLCAn5ZSu5ZCO5LitJywgJ+iuouWNleWFs+mXrScsICflvoXlj5HotKcnLCAn5b6F5pS26LSnJywgJ+S6pOaYk+WujOaIkCddLFxuICAgICAgc3RhdHVzVHh0OiAnJyxcbiAgICAgIHN0YXR1czogJycsXG4gICAgICBhZGRyZXNzOiB7fSxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgY3JlYXRlVGltZTogJycsXG4gICAgICBtZW1vOiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBkZWxpdmVyU3RhdHVzOiAnJyxcbiAgICAgIGZpbmFsUHJpY2U6ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICByZW1haW5UaW1lOiAnJyxcbiAgICAgIGlzSGlkZGVuOiBmYWxzZSxcbiAgICAgIGluaXRUeHQ6ICflvoXmlK/ku5gnLFxuICAgICAgaXNTdG9wOiBmYWxzZSxcbiAgICAgIHRpbWVJbnRlcnZhbDogJycsXG4gICAgICBwYXltZW50OiB0cnVlLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJ1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOiuouWNlScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuY2VsT3JkZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNIaWRkZW4gPSB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyZGV0YWlsJmlkPScgKyB0aGlzLmlkXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgfSxcbiAgICAgIGdvTG9naXN0aWMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbG9naXN0aWNhP2lkPScgKyB0aGlzLmlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIG9yZGVySWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlBheVNlcnZpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKClcbiAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAvLyAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5kZWxpdmVyZWQnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZmFpbCc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb21wbGV0ZSc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXltZW50ID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMucmVtYWluVGltZSA9IDBcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5pZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyRGV0YWlsKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5zdGF0dXNUeHQgPSBfdGhpcy5vcmRlclN0YXR1c1tkYXRhLnN0YXR1c11cbiAgICAgICAgICBfdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1c1xuICAgICAgICAgIF90aGlzLmRlbGl2ZXJTdGF0dXMgPSBkYXRhLmRlbGl2ZXJTdGF0dXNcbiAgICAgICAgICBfdGhpcy5vcmRlcklkID0gZGF0YS5zaG93SWRcbiAgICAgICAgICBfdGhpcy5jcmVhdGVUaW1lID0gX3RoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGRhdGEuY3JlYXRlVGltZSAqIDEwMDAsICdZLW0tZCBIOmk6cycpXG4gICAgICAgICAgX3RoaXMubWVtbyA9IGRhdGEubWVtbyA/IGRlY29kZVVSSShkYXRhLm1lbW9bMF0udmFsKSA6ICcnXG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgLy8gX3RoaXMuaW5pdExvZ2lzdGljYSgnc2h1bmZlbmcnLCBkYXRhLnNob3dJZClcbiAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lKSB7XG4gICAgICAgICAgICBfdGhpcy5pbnRlcnZhbChkYXRhLnBheVJlbWFpbmluZ1RpbWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzID0gJydcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuZmluYWxQcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuYnV5aW5nUmVjb3Jkcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5vcmRlckRldGFpbCA9IF90aGlzLmluaXRDaGlsZChpdGVtLmJ1eWluZ1JlY29yZHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdERhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhfdGhpcy5hZGRyZXNzKS5sZW5ndGgpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMuaWRcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNTdG9wID0gdHJ1ZVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gX3RoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRMb2dpc3RpY2EgKGNvbSwgbnVtKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjb206IGNvbSxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY2EoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGludGVydmFsICh0aW1lKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLnRpbWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGltZS0tXG4gICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgIF90aGlzLnJlbWFpblRpbWUgPSAodGltZSAtIHRpbWUgJSA2MCkgLyA2MCArICfliIYnICsgdGltZSAlIDYwICsgJ+enkidcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgIF90aGlzLmluaXRUeHQgPSAn5Lqk5piT5YWz6ZetJ1xuICAgICAgICAgIF90aGlzLmNsZWFyKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gICAgY2xlYXIgKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVJbnRlcnZhbClcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgdGhpcy5pZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmNsZWFyKClcbiAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB0aGlzLm5pY2tfbmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgICB0aGlzLmN1c3RvbWVyX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoKVxuICAgICAgICB0aGlzLm5vdGVfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+iuouWNleivpuaDhemhtScsIG51bGwsIHRoaXMub3JkZXJJZClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uVW5sb2FkICgpIHtcbiAgICAgIHRoaXMuY2xlYXIoKVxuICAgIH1cbiAgfVxuIl19