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
      customer_info_str: ''
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
        var detailStr = '订单号:' + _this7.orderId;
        _this7.customer_info_str = _this7.$parent.getMessage('订单详情页', detailStr);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImluaXRUeHQiLCJpc1N0b3AiLCJ0aW1lSW50ZXJ2YWwiLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJjb21wdXRlZCIsImlzTnVsbCIsImxlbmd0aCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwibWV0aG9kcyIsImNhbmNlbCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2VsT3JkZXIiLCJjbGVhciIsImdvQWRkcmVzcyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJnb0xvZ2lzdGljIiwibmF2aWdhdGVUbyIsImdvUGF5IiwiYXBwVHlwZSIsIkh0dHBSZXF1ZXN0IiwiUGF5U2VydmljZSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImVyck1zZyIsInN3aXRjaFRhYiIsInBheUZhaWwiLCJjYXRjaCIsImNiIiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0T3JkZXJEZXRhaWwiLCJoaWRlTG9hZGluZyIsInNob3dJZCIsImRhdGVGb3JtYXQiLCJ2YWwiLCJwYXlSZW1haW5pbmdUaW1lIiwiaW50ZXJ2YWwiLCJuYW1lIiwicGhvbmUiLCJkZXRhaWwiLCJmdWxsQXJlYU5hbWUiLCJidXlpbmdSZWNvcmRzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJtaXNzVG9rZW4iLCJpbml0RGF0YSIsIk9iamVjdCIsImtleXMiLCIkYXBwbHkiLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJidXlpbmdDb3VudCIsImNvdW50IiwiY2hlY2tlZCIsInRvdGFsQ291bnQiLCJrZWVwQ291bnQiLCJDYW5jZWxPcmRlciIsImNvbSIsIm51bSIsIkdldExvZ2lzdGljYSIsInRpbWUiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJwYXJhbSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImRldGFpbFN0ciIsImdldE1lc3NhZ2UiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O21NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLG1CQUFhLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLE1BQTNDLENBSFI7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxjQUFRLEVBTEg7QUFNTEMsZUFBUyxFQU5KO0FBT0xDLGFBQU8sRUFQRjtBQVFMQyxlQUFTLEVBUko7QUFTTEMsa0JBQVksRUFUUDtBQVVMQyxZQUFNLEVBVkQ7QUFXTEMsV0FBSyxFQVhBO0FBWUxDLGtCQUFZLEVBWlA7QUFhTEMsZUFBUyxFQWJKO0FBY0xDLGtCQUFZLEVBZFA7QUFlTEMsZ0JBQVUsS0FmTDtBQWdCTEMsZUFBUyxLQWhCSjtBQWlCTEMsY0FBUSxLQWpCSDtBQWtCTEMsb0JBQWMsRUFsQlQ7QUFtQkxDLGVBQVMsSUFuQko7QUFvQkxDLGlCQUFXLEVBcEJOO0FBcUJMQyxjQUFRLEVBckJIO0FBc0JMQyx5QkFBbUI7QUF0QmQsSyxTQXdCUEMsUSxHQUFXO0FBQ1RDLFlBRFMsb0JBQ0M7QUFDUixZQUFJLEtBQUtqQixLQUFMLENBQVdrQixNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGlCQUFPLElBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRixPQVBRO0FBUVRDLGVBUlMsdUJBUUk7QUFDWCxZQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDM0MsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDbEQsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFkUSxLLFNBZ0JaRyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBVCxFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sT0FBbEIsRUFBMEIsUUFBTyxNQUFqQyxFQUF3QyxTQUFRLE9BQWhELEVBQXdELE9BQU0sS0FBOUQsRUFBaEIsRUFBcUYseUJBQXdCLEVBQUMsU0FBUSxrQkFBVCxFQUE0QixPQUFNLE9BQWxDLEVBQTBDLFFBQU8sTUFBakQsRUFBd0QsU0FBUSxPQUFoRSxFQUF3RSxPQUFNLEtBQTlFLEVBQTdHLEVBQWtNLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLE9BQTNCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQTFOLEVBQWIsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLE8sR0FBVTtBQUNSQyxZQURRLG9CQUNFO0FBQUE7O0FBQ1IsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBTyxJQURNO0FBRWJDLG1CQUFTLFFBRkk7QUFHYkMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLHFCQUFLQyxXQUFMLENBQWlCLFlBQU07QUFDckIsdUJBQUszQixRQUFMLEdBQWdCLElBQWhCO0FBQ0QsZUFGRDtBQUdBLHFCQUFLNEIsS0FBTDtBQUNEO0FBQ0Y7QUFWWSxTQUFmO0FBWUQsT0FkTztBQWVSQyxlQWZRLHVCQWVLO0FBQ1gsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxtQ0FBbUMsS0FBSzVDO0FBRC9CLFNBQWhCO0FBR0EsYUFBS3lDLEtBQUw7QUFDRCxPQXBCTztBQXFCUkksZ0JBckJRLHdCQXFCTTtBQUNaLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RGLGVBQUssb0JBQW9CLEtBQUs1QztBQURoQixTQUFoQjtBQUdELE9BekJPO0FBMEJSK0MsV0ExQlEsbUJBMEJDO0FBQUE7O0FBQ1AsWUFBSSxLQUFLOUIsT0FBVCxFQUFrQjtBQUNoQixjQUFJbkIsT0FBTztBQUNUQyxtQkFBTyxLQUFLQSxLQURIO0FBRVRPLHFCQUFTLEtBQUtOLEVBRkw7QUFHVGdELHFCQUFTO0FBSEEsV0FBWDtBQUtBLGVBQUt2QixPQUFMLENBQWF3QixXQUFiLENBQXlCQyxVQUF6QixDQUFvQ3BELElBQXBDLEVBQTBDcUQsSUFBMUMsQ0FBK0MsVUFBQ2IsR0FBRCxFQUFTO0FBQ3REYyxvQkFBUUMsR0FBUixDQUFZZixHQUFaO0FBQ0EsZ0JBQUlBLElBQUl4QyxJQUFKLENBQVN3RCxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGtCQUFJeEQsT0FBT3dDLElBQUl4QyxJQUFKLENBQVNBLElBQXBCO0FBQ0Esa0JBQUl5RCxZQUFZekQsS0FBSzBELFNBQUwsQ0FBZUMsUUFBZixFQUFoQjtBQUNBLGtCQUFJQyxXQUFXNUQsS0FBSzZELFFBQXBCO0FBQ0Esa0JBQUlDLFdBQVcsZUFBZTlELEtBQUs4RCxRQUFuQztBQUNBLGtCQUFJQyxXQUFXO0FBQ2IseUJBQVMsb0JBREk7QUFFYiw2QkFBYU4sU0FGQTtBQUdiLDRCQUFZRyxRQUhDO0FBSWIsMkJBQVdFLFFBSkU7QUFLYiw0QkFBWTtBQUxDLGVBQWY7QUFPQSxrQkFBSUUsT0FBTyxPQUFLckMsT0FBTCxDQUFhd0IsV0FBYixDQUF5QmMsVUFBekIsQ0FBb0NGLFFBQXBDLENBQVg7QUFDQSw2QkFBS0csY0FBTCxDQUFvQjtBQUNsQiw2QkFBYVQsU0FESztBQUVsQiw0QkFBWUcsUUFGTTtBQUdsQiwyQkFBV0UsUUFITztBQUlsQiw0QkFBWSxLQUpNO0FBS2xCLDJCQUFXRSxJQUxPO0FBTWxCLDJCQUFXLGlCQUFDeEIsR0FBRCxFQUFTO0FBQ2xCLHNCQUFJQSxJQUFJMkIsTUFBSixLQUFlLG1CQUFuQixFQUF3QztBQUN0QztBQUNBLDJCQUFLeEIsS0FBTDtBQUNBLG1DQUFLeUIsU0FBTCxDQUFlO0FBQ2J0QiwyQkFBSztBQURRLHFCQUFmO0FBR0QsbUJBTkQsTUFNTyxJQUFJTixJQUFJMkIsTUFBSixLQUFlLHVCQUFuQixFQUE0QztBQUNqRDtBQUNBLDJCQUFLeEMsT0FBTCxDQUFhMEMsT0FBYjtBQUNEO0FBQ0YsaUJBakJpQjtBQWtCbEIsd0JBQVEsY0FBQzdCLEdBQUQsRUFBUztBQUNmLHlCQUFLYixPQUFMLENBQWEwQyxPQUFiO0FBQ0QsaUJBcEJpQjtBQXFCbEIsNEJBQVksa0JBQUM3QixHQUFELEVBQVM7QUFDbkIseUJBQUtyQixPQUFMLEdBQWUsSUFBZjtBQUNEO0FBdkJpQixlQUFwQjtBQXlCRCxhQXRDRCxNQXNDTztBQUNMLHFCQUFLUSxPQUFMLENBQWEwQyxPQUFiO0FBQ0Q7QUFDRixXQTNDRCxFQTJDR0MsS0EzQ0gsQ0EyQ1MsWUFBTTtBQUNiLG1CQUFLM0MsT0FBTCxDQUFhMEMsT0FBYjtBQUNELFdBN0NEO0FBOENEO0FBQ0QsYUFBS2xELE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFqRk8sSzs7Ozs7NkJBbUZBb0QsRSxFQUFJO0FBQUE7O0FBQ1osV0FBS3RFLEtBQUwsR0FBYSxLQUFLMEIsT0FBTCxDQUFhNkMsUUFBYixFQUFiO0FBQ0EsV0FBSzFELFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLYSxPQUFMLENBQWE4QyxXQUFiO0FBQ0EsV0FBS2xFLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBSW1FLFFBQVEsSUFBWjtBQUNBLFVBQUkxRSxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUTyxpQkFBUyxLQUFLTjtBQUZMLE9BQVg7QUFJQSxXQUFLeUIsT0FBTCxDQUFhd0IsV0FBYixDQUF5QndCLGNBQXpCLENBQXdDM0UsSUFBeEMsRUFBOENxRCxJQUE5QyxDQUFtRCxVQUFDYixHQUFELEVBQVM7QUFDMURjLGdCQUFRQyxHQUFSLENBQVlmLEdBQVo7QUFDQWtDLGNBQU0vQyxPQUFOLENBQWNpRCxXQUFkO0FBQ0EsWUFBSXBDLElBQUl4QyxJQUFKLENBQVN3RCxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUl4RCxPQUFPd0MsSUFBSXhDLElBQUosQ0FBU0EsSUFBcEI7QUFDQTBFLGdCQUFNdEUsU0FBTixHQUFrQnNFLE1BQU12RSxXQUFOLENBQWtCSCxLQUFLSyxNQUF2QixDQUFsQjtBQUNBcUUsZ0JBQU1yRSxNQUFOLEdBQWVMLEtBQUtLLE1BQXBCO0FBQ0FxRSxnQkFBTWxFLE9BQU4sR0FBZ0JSLEtBQUs2RSxNQUFyQjtBQUNBSCxnQkFBTWpFLFVBQU4sR0FBbUJpRSxNQUFNL0MsT0FBTixDQUFjbUQsVUFBZCxDQUF5QjlFLEtBQUtTLFVBQUwsR0FBa0IsSUFBM0MsRUFBaUQsYUFBakQsQ0FBbkI7QUFDQWlFLGdCQUFNaEUsSUFBTixHQUFhVixLQUFLVSxJQUFMLEdBQVlWLEtBQUtVLElBQUwsQ0FBVSxDQUFWLEVBQWFxRSxHQUF6QixHQUErQixFQUE1QztBQUNBTCxnQkFBTS9ELEdBQU4sR0FBWVgsS0FBS1csR0FBakI7QUFDQStELGdCQUFNN0QsT0FBTixHQUFnQmIsS0FBS2EsT0FBckI7QUFDQTtBQUNBLGNBQUliLEtBQUtnRixnQkFBVCxFQUEyQjtBQUN6Qk4sa0JBQU1PLFFBQU4sQ0FBZWpGLEtBQUtnRixnQkFBcEI7QUFDRDtBQUNELGNBQUloRixLQUFLTSxPQUFULEVBQWtCO0FBQ2hCb0Usa0JBQU1wRSxPQUFOLENBQWM0RSxJQUFkLEdBQXFCbEYsS0FBS00sT0FBTCxDQUFhNEUsSUFBbEM7QUFDQVIsa0JBQU1wRSxPQUFOLENBQWM2RSxLQUFkLEdBQXNCbkYsS0FBS00sT0FBTCxDQUFhNkUsS0FBbkM7QUFDQVQsa0JBQU1wRSxPQUFOLENBQWM4RSxNQUFkLEdBQXVCcEYsS0FBS00sT0FBTCxDQUFhK0UsWUFBYixHQUE0QnJGLEtBQUtNLE9BQUwsQ0FBYUEsT0FBaEU7QUFDRCxXQUpELE1BSU87QUFDTG9FLGtCQUFNcEUsT0FBTixHQUFnQixFQUFoQjtBQUNEO0FBQ0RvRSxnQkFBTTlELFVBQU4sR0FBbUJaLEtBQUtZLFVBQXhCO0FBQ0FaLGVBQUtzRixhQUFMLENBQW1CQyxPQUFuQixDQUEyQixVQUFDQyxJQUFELEVBQVU7QUFDbkMsZ0JBQUlDLE1BQU0sRUFBVjtBQUNBQSxnQkFBSXBELEtBQUosR0FBWW1ELEtBQUtuRCxLQUFqQjtBQUNBb0QsZ0JBQUlDLFdBQUosR0FBa0JoQixNQUFNaUIsU0FBTixDQUFnQkgsS0FBS0YsYUFBckIsQ0FBbEI7QUFDQVosa0JBQU1uRSxLQUFOLENBQVlxRixJQUFaLENBQWlCSCxHQUFqQjtBQUNELFdBTEQ7QUFNQWxCLGdCQUFNQSxJQUFOO0FBQ0QsU0E1QkQsTUE0Qk87QUFDTCxjQUFJRyxNQUFNL0MsT0FBTixDQUFja0UsU0FBbEIsRUFBNkI7QUFDM0JuQixrQkFBTXpFLEtBQU4sR0FBYyxPQUFLMEIsT0FBTCxDQUFhNkMsUUFBYixDQUFzQmhDLElBQUl4QyxJQUFKLENBQVN3RCxLQUEvQixDQUFkO0FBQ0FrQixrQkFBTW9CLFFBQU47QUFDRDtBQUNGO0FBQ0R4QyxnQkFBUUMsR0FBUixDQUFZd0MsT0FBT0MsSUFBUCxDQUFZdEIsTUFBTXBFLE9BQWxCLEVBQTJCbUIsTUFBdkM7QUFDQWlELGNBQU11QixNQUFOO0FBQ0QsT0F2Q0QsRUF1Q0czQixLQXZDSCxDQXVDUyxZQUFNO0FBQ2JJLGNBQU0vQyxPQUFOLENBQWNpRCxXQUFkO0FBQ0FGLGNBQU0vQyxPQUFOLENBQWN1RSxRQUFkO0FBQ0QsT0ExQ0Q7QUEyQ0Q7Ozs4QkFDVUMsTSxFQUFRO0FBQ2pCLFVBQUlDLFFBQVEsRUFBWjtBQUNBRCxhQUFPWixPQUFQLENBQWUsVUFBQ0MsSUFBRCxFQUFVO0FBQ3ZCLFlBQUlDLE1BQU0sRUFBVjtBQUNBQSxZQUFJWSxJQUFKLEdBQVdiLEtBQUtjLEtBQWhCO0FBQ0FiLFlBQUlwRCxLQUFKLEdBQVltRCxLQUFLZSxXQUFqQjtBQUNBZCxZQUFJZSxLQUFKLEdBQVloQixLQUFLaUIsV0FBakI7QUFDQWhCLFlBQUlpQixRQUFKLEdBQWVsQixLQUFLZ0IsS0FBcEI7QUFDQWYsWUFBSXZGLEVBQUosR0FBU3NGLEtBQUttQixTQUFkO0FBQ0FsQixZQUFJbUIsVUFBSixHQUFpQnBCLEtBQUtxQixhQUF0QjtBQUNBcEIsWUFBSXFCLFFBQUosR0FBZXRCLEtBQUt1QixXQUFwQjtBQUNBdEIsWUFBSUwsTUFBSixHQUFhSSxLQUFLbkQsS0FBTCxHQUFhLEdBQWIsR0FBbUJtRCxLQUFLd0IsV0FBckM7QUFDQXZCLFlBQUl3QixLQUFKLEdBQVl6QixLQUFLd0IsV0FBakI7QUFDQXZCLFlBQUl5QixPQUFKLEdBQWMsS0FBZDtBQUNBekIsWUFBSTBCLFVBQUosR0FBaUIzQixLQUFLNEIsU0FBdEI7QUFDQWhCLGNBQU1SLElBQU4sQ0FBV0gsR0FBWDtBQUNELE9BZEQ7QUFlQSxhQUFPVyxLQUFQO0FBQ0Q7OztnQ0FDWTdCLEUsRUFBSTtBQUNmLFdBQUt0RSxLQUFMLEdBQWEsS0FBSzBCLE9BQUwsQ0FBYTZDLFFBQWIsRUFBYjtBQUNBLFVBQUlFLFFBQVEsSUFBWjtBQUNBLFVBQUkxRSxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUTyxpQkFBUyxLQUFLTjtBQUZMLE9BQVg7QUFJQW9ELGNBQVFDLEdBQVIsQ0FBWXZELElBQVo7QUFDQSxXQUFLMkIsT0FBTCxDQUFhd0IsV0FBYixDQUF5QmtFLFdBQXpCLENBQXFDckgsSUFBckMsRUFBMkNxRCxJQUEzQyxDQUFnRCxVQUFDYixHQUFELEVBQVM7QUFDdkRjLGdCQUFRQyxHQUFSLENBQVlmLEdBQVo7QUFDQSxZQUFJQSxJQUFJeEMsSUFBSixDQUFTd0QsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QmtCLGdCQUFNekQsTUFBTixHQUFlLElBQWY7QUFDQXNELGdCQUFNQSxJQUFOO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsY0FBSUcsTUFBTS9DLE9BQU4sQ0FBY2tFLFNBQWxCLEVBQTZCO0FBQzNCbkIsa0JBQU16RSxLQUFOLEdBQWN5RSxNQUFNL0MsT0FBTixDQUFjNkMsUUFBZCxDQUF1QmhDLElBQUl4QyxJQUFKLENBQVN3RCxLQUFoQyxDQUFkO0FBQ0Q7QUFDRjtBQUNEa0IsY0FBTXVCLE1BQU47QUFDRCxPQVhEO0FBWUQ7OztrQ0FDY3FCLEcsRUFBS0MsRyxFQUFLO0FBQUE7O0FBQ3ZCLFdBQUt0SCxLQUFMLEdBQWEsS0FBSzBCLE9BQUwsQ0FBYTZDLFFBQWIsRUFBYjtBQUNBLFVBQUlFLFFBQVEsSUFBWjtBQUNBLFVBQUkxRSxPQUFPO0FBQ1RzSCxhQUFLQSxHQURJO0FBRVRDLGFBQUtBO0FBRkksT0FBWDtBQUlBLFdBQUs1RixPQUFMLENBQWF3QixXQUFiLENBQXlCcUUsWUFBekIsQ0FBc0N4SCxJQUF0QyxFQUE0Q3FELElBQTVDLENBQWlELFVBQUNiLEdBQUQsRUFBUztBQUN4RGMsZ0JBQVFDLEdBQVIsQ0FBWWYsR0FBWjtBQUNBLFlBQUlBLElBQUl4QyxJQUFKLENBQVN3RCxLQUFULEtBQW1CLENBQXZCLEVBQTBCLENBQ3pCLENBREQsTUFDTztBQUNMLGNBQUlrQixNQUFNL0MsT0FBTixDQUFja0UsU0FBbEIsRUFBNkI7QUFDM0JuQixrQkFBTXpFLEtBQU4sR0FBYyxPQUFLMEIsT0FBTCxDQUFhNkMsUUFBYixDQUFzQmhDLElBQUl4QyxJQUFKLENBQVN3RCxLQUEvQixDQUFkO0FBQ0Q7QUFDRjtBQUNGLE9BUkQ7QUFTRDs7OzZCQUNTaUUsSSxFQUFNO0FBQ2QsVUFBSS9DLFFBQVEsSUFBWjtBQUNBLFdBQUt4RCxZQUFMLEdBQW9Cd0csWUFBWSxZQUFNO0FBQ3BDRDtBQUNBLFlBQUlBLE9BQU8sQ0FBWCxFQUFjO0FBQ1ovQyxnQkFBTTVELFVBQU4sR0FBbUIsQ0FBQzJHLE9BQU9BLE9BQU8sRUFBZixJQUFxQixFQUFyQixHQUEwQixHQUExQixHQUFnQ0EsT0FBTyxFQUF2QyxHQUE0QyxHQUEvRDtBQUNELFNBRkQsTUFFTztBQUNML0MsZ0JBQU01RCxVQUFOLEdBQW1CLENBQW5CO0FBQ0E0RCxnQkFBTTFELE9BQU4sR0FBZ0IsTUFBaEI7QUFDQTBELGdCQUFNL0IsS0FBTjtBQUNEO0FBQ0QrQixjQUFNdUIsTUFBTjtBQUNELE9BVm1CLEVBVWpCLElBVmlCLENBQXBCO0FBV0Q7Ozs0QkFDUTtBQUNQMEIsb0JBQWMsS0FBS3pHLFlBQW5CO0FBQ0Q7OzsyQkFDTzBHLEssRUFBTztBQUNiLFdBQUsxSCxFQUFMLEdBQVUwSCxNQUFNMUgsRUFBaEI7QUFDQSxXQUFLK0YsTUFBTDtBQUNEOzs7NkJBQ1M7QUFBQTs7QUFDUixXQUFLSCxRQUFMLENBQWMsWUFBTTtBQUNsQixlQUFLMUUsU0FBTCxHQUFpQixPQUFLTyxPQUFMLENBQWFrRyxXQUFiLEVBQWpCO0FBQ0EsZUFBS3hHLE1BQUwsR0FBYyxPQUFLTSxPQUFMLENBQWFtRyxhQUFiLEVBQWQ7QUFDQSxZQUFJQyxZQUFZLFNBQVMsT0FBS3ZILE9BQTlCO0FBQ0EsZUFBS2MsaUJBQUwsR0FBeUIsT0FBS0ssT0FBTCxDQUFhcUcsVUFBYixDQUF3QixPQUF4QixFQUFpQ0QsU0FBakMsQ0FBekI7QUFDRCxPQUxEO0FBTUQ7OzsrQkFDVztBQUNWLFdBQUtwRixLQUFMO0FBQ0Q7Ozs7RUFuUnNDLGVBQUtzRixJOztrQkFBekJwSSxXIiwiZmlsZSI6Im9yZGVyRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpZDogJycsXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICforqLljZXlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIHN0YXR1c1R4dDogJycsXG4gICAgICBzdGF0dXM6ICcnLFxuICAgICAgYWRkcmVzczoge30sXG4gICAgICBvcmRlcjogW10sXG4gICAgICBvcmRlcklkOiAnJyxcbiAgICAgIGNyZWF0ZVRpbWU6ICcnLFxuICAgICAgbWVtbzogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgZmluYWxQcmljZTogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHJlbWFpblRpbWU6ICcnLFxuICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgaW5pdFR4dDogJ+W+heaUr+S7mCcsXG4gICAgICBpc1N0b3A6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsOiAnJyxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJ1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOiuouWNlScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuY2VsT3JkZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNIaWRkZW4gPSB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyZGV0YWlsJmlkPScgKyB0aGlzLmlkXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgfSxcbiAgICAgIGdvTG9naXN0aWMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbG9naXN0aWNhP2lkPScgKyB0aGlzLmlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIG9yZGVySWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBhcHBUeXBlOiAnaW9zJ1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJEZXRhaWwoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2RhdGEuc3RhdHVzXVxuICAgICAgICAgIF90aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzXG4gICAgICAgICAgX3RoaXMub3JkZXJJZCA9IGRhdGEuc2hvd0lkXG4gICAgICAgICAgX3RoaXMuY3JlYXRlVGltZSA9IF90aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLmNyZWF0ZVRpbWUgKiAxMDAwLCAnWS1tLWQgSDppOnMnKVxuICAgICAgICAgIF90aGlzLm1lbW8gPSBkYXRhLm1lbW8gPyBkYXRhLm1lbW9bMF0udmFsIDogJydcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICAvLyBfdGhpcy5pbml0TG9naXN0aWNhKCdzaHVuZmVuZycsIGRhdGEuc2hvd0lkKVxuICAgICAgICAgIGlmIChkYXRhLnBheVJlbWFpbmluZ1RpbWUpIHtcbiAgICAgICAgICAgIF90aGlzLmludGVydmFsKGRhdGEucGF5UmVtYWluaW5nVGltZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcykge1xuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5uYW1lID0gZGF0YS5hZGRyZXNzLm5hbWVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MucGhvbmUgPSBkYXRhLmFkZHJlc3MucGhvbmVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MuZGV0YWlsID0gZGF0YS5hZGRyZXNzLmZ1bGxBcmVhTmFtZSArIGRhdGEuYWRkcmVzcy5hZGRyZXNzXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MgPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0RGF0YSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKF90aGlzLmFkZHJlc3MpLmxlbmd0aClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udGl0bGUgKyAnw5cnICsgaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgY2FuY2VsT3JkZXIgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5pZFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pc1N0b3AgPSB0cnVlXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSBfdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdExvZ2lzdGljYSAoY29tLCBudW0pIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGNvbTogY29tLFxuICAgICAgICBudW06IG51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldExvZ2lzdGljYShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW50ZXJ2YWwgKHRpbWUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMudGltZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB0aW1lLS1cbiAgICAgICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgICAgX3RoaXMucmVtYWluVGltZSA9ICh0aW1lIC0gdGltZSAlIDYwKSAvIDYwICsgJ+WIhicgKyB0aW1lICUgNjAgKyAn56eSJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLnJlbWFpblRpbWUgPSAwXG4gICAgICAgICAgX3RoaXMuaW5pdFR4dCA9ICfkuqTmmJPlhbPpl60nXG4gICAgICAgICAgX3RoaXMuY2xlYXIoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgICBjbGVhciAoKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZUludGVydmFsKVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICB0aGlzLmlkID0gcGFyYW0uaWRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB0aGlzLm5pY2tfbmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgICB2YXIgZGV0YWlsU3RyID0gJ+iuouWNleWPtzonICsgdGhpcy5vcmRlcklkXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgn6K6i5Y2V6K+m5oOF6aG1JywgZGV0YWlsU3RyKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25VbmxvYWQgKCkge1xuICAgICAgdGhpcy5jbGVhcigpXG4gICAgfVxuICB9XG4iXX0=