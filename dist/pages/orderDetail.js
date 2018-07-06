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
            if (item.title === '冷链配送') {
              obj.iconClass = 'icon-new_llps';
            } else if (item.title === '常规配送') {
              obj.iconClass = 'icon-new_cgps';
            }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJkZWxpdmVyU3RhdHVzIiwiZmluYWxQcmljZSIsImZyZWlnaHQiLCJyZW1haW5UaW1lIiwiaXNIaWRkZW4iLCJpbml0VHh0IiwiaXNTdG9wIiwidGltZUludGVydmFsIiwicGF5bWVudCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsImNvbXB1dGVkIiwiaXNOdWxsIiwibGVuZ3RoIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJtZXRob2RzIiwiY2FuY2VsIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImNsZWFyIiwiZ29BZGRyZXNzIiwicmVkaXJlY3RUbyIsInVybCIsImdvTG9naXN0aWMiLCJuYXZpZ2F0ZVRvIiwiZ29QYXkiLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRpbWVTdGFtcCIsInRpbWVzdGFtcCIsInRvU3RyaW5nIiwibm9uY2VTdHIiLCJub25jZXN0ciIsInByZXBheWlkIiwic2lnbkRhdGEiLCJzaWduIiwiZ2V0UGF5U2lnbiIsInJlcXVlc3RQYXltZW50IiwiZXJyTXNnIiwicGF5RmFpbCIsImNhdGNoIiwiY2IiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlckRldGFpbCIsImhpZGVMb2FkaW5nIiwic2hvd0lkIiwiZGF0ZUZvcm1hdCIsImRlY29kZVVSSSIsInZhbCIsInBheVJlbWFpbmluZ1RpbWUiLCJpbnRlcnZhbCIsIm5hbWUiLCJwaG9uZSIsImRldGFpbCIsImZ1bGxBcmVhTmFtZSIsImJ1eWluZ1JlY29yZHMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsImljb25DbGFzcyIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsIm1pc3NUb2tlbiIsImluaXREYXRhIiwiT2JqZWN0Iiwia2V5cyIsIiRhcHBseSIsInNob3dGYWlsIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJjb20iLCJudW0iLCJHZXRMb2dpc3RpY2EiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwicGFyYW0iLCJnZXRVc2VyTmFtZSIsImdldFVzZXJBdmF0YXIiLCJnZXRNZXNzYWdlIiwiZ2V0QnVzaW5lc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O21NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLG1CQUFhLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLE1BQTNDLENBSFI7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxjQUFRLEVBTEg7QUFNTEMsZUFBUyxFQU5KO0FBT0xDLGFBQU8sRUFQRjtBQVFMQyxlQUFTLEVBUko7QUFTTEMsa0JBQVksRUFUUDtBQVVMQyxZQUFNLEVBVkQ7QUFXTEMsV0FBSyxFQVhBO0FBWUxDLHFCQUFlLEVBWlY7QUFhTEMsa0JBQVksRUFiUDtBQWNMQyxlQUFTLEVBZEo7QUFlTEMsa0JBQVksRUFmUDtBQWdCTEMsZ0JBQVUsS0FoQkw7QUFpQkxDLGVBQVMsS0FqQko7QUFrQkxDLGNBQVEsS0FsQkg7QUFtQkxDLG9CQUFjLEVBbkJUO0FBb0JMQyxlQUFTLElBcEJKO0FBcUJMQyxpQkFBVyxFQXJCTjtBQXNCTEMsY0FBUSxFQXRCSDtBQXVCTEMseUJBQW1CLEVBdkJkO0FBd0JMQyxxQkFBZTtBQXhCVixLLFNBMEJQQyxRLEdBQVc7QUFDVEMsWUFEUyxvQkFDQztBQUNSLFlBQUksS0FBS25CLEtBQUwsQ0FBV29CLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsaUJBQU8sSUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVEMsZUFSUyx1QkFRSTtBQUNYLFlBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxpQkFBTyxLQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUNsRCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQWRRLEssU0FnQlpHLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFULEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxLQUE5RCxFQUFoQixFQUFxRix5QkFBd0IsRUFBQyxTQUFRLGtCQUFULEVBQTRCLE9BQU0sT0FBbEMsRUFBMEMsUUFBTyxNQUFqRCxFQUF3RCxTQUFRLE9BQWhFLEVBQXdFLE9BQU0sS0FBOUUsRUFBN0csRUFBa00seUJBQXdCLEVBQUMsU0FBUSxXQUFULEVBQXFCLE9BQU0sT0FBM0IsRUFBbUMsUUFBTyxNQUExQyxFQUFpRCxTQUFRLE9BQXpELEVBQWlFLE9BQU0sS0FBdkUsRUFBMU4sRUFBYixFLFNBQ1RDLE8sR0FBVSxFLFNBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssU0FHVkMsTyxHQUFVO0FBQ1JDLFlBRFEsb0JBQ0U7QUFBQTs7QUFDUix1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGlCQUFPLElBRE07QUFFYkMsbUJBQVMsUUFGSTtBQUdiQyxtQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGdCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2YscUJBQUtDLFdBQUwsQ0FBaUIsWUFBTTtBQUNyQix1QkFBSzVCLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRCxlQUZEO0FBR0EscUJBQUs2QixLQUFMO0FBQ0Q7QUFDRjtBQVZZLFNBQWY7QUFZRCxPQWRPO0FBZVJDLGVBZlEsdUJBZUs7QUFDWCx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLG1DQUFtQyxLQUFLOUM7QUFEL0IsU0FBaEI7QUFHQSxhQUFLMkMsS0FBTDtBQUNELE9BcEJPO0FBcUJSSSxnQkFyQlEsd0JBcUJNO0FBQ1osdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEYsZUFBSyxvQkFBb0IsS0FBSzlDO0FBRGhCLFNBQWhCO0FBR0QsT0F6Qk87QUEwQlJpRCxXQTFCUSxtQkEwQkM7QUFBQTs7QUFDUCxZQUFJLEtBQUsvQixPQUFULEVBQWtCO0FBQ2hCLGNBQUlwQixPQUFPO0FBQ1RDLG1CQUFPLEtBQUtBLEtBREg7QUFFVE8scUJBQVMsS0FBS04sRUFGTDtBQUdUa0QscUJBQVM7QUFIQSxXQUFYO0FBS0EsZUFBS3ZCLE9BQUwsQ0FBYXdCLFdBQWIsQ0FBeUJDLFVBQXpCLENBQW9DdEQsSUFBcEMsRUFBMEN1RCxJQUExQyxDQUErQyxVQUFDYixHQUFELEVBQVM7QUFDdERjLG9CQUFRQyxHQUFSLENBQVlmLEdBQVo7QUFDQSxnQkFBSUEsSUFBSTFDLElBQUosQ0FBUzBELEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsa0JBQUkxRCxPQUFPMEMsSUFBSTFDLElBQUosQ0FBU0EsSUFBcEI7QUFDQSxrQkFBSTJELFlBQVkzRCxLQUFLNEQsU0FBTCxDQUFlQyxRQUFmLEVBQWhCO0FBQ0Esa0JBQUlDLFdBQVc5RCxLQUFLK0QsUUFBcEI7QUFDQSxrQkFBSUMsV0FBVyxlQUFlaEUsS0FBS2dFLFFBQW5DO0FBQ0Esa0JBQUlDLFdBQVc7QUFDYix5QkFBUyxvQkFESTtBQUViLDZCQUFhTixTQUZBO0FBR2IsNEJBQVlHLFFBSEM7QUFJYiwyQkFBV0UsUUFKRTtBQUtiLDRCQUFZO0FBTEMsZUFBZjtBQU9BLGtCQUFJRSxPQUFPLE9BQUtyQyxPQUFMLENBQWF3QixXQUFiLENBQXlCYyxVQUF6QixDQUFvQ0YsUUFBcEMsQ0FBWDtBQUNBLDZCQUFLRyxjQUFMLENBQW9CO0FBQ2xCLDZCQUFhVCxTQURLO0FBRWxCLDRCQUFZRyxRQUZNO0FBR2xCLDJCQUFXRSxRQUhPO0FBSWxCLDRCQUFZLEtBSk07QUFLbEIsMkJBQVdFLElBTE87QUFNbEIsMkJBQVcsaUJBQUN4QixHQUFELEVBQVM7QUFDbEIsc0JBQUlBLElBQUkyQixNQUFKLEtBQWUsbUJBQW5CLEVBQXdDO0FBQ3RDO0FBQ0EsMkJBQUt4QixLQUFMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQUtFLFVBQUwsQ0FBZ0I7QUFDZEMsMkJBQUs7QUFEUyxxQkFBaEI7QUFHRCxtQkFURCxNQVNPLElBQUlOLElBQUkyQixNQUFKLEtBQWUsdUJBQW5CLEVBQTRDO0FBQ2pEO0FBQ0EsMkJBQUt4QyxPQUFMLENBQWF5QyxPQUFiO0FBQ0Q7QUFDRixpQkFwQmlCO0FBcUJsQix3QkFBUSxjQUFDNUIsR0FBRCxFQUFTO0FBQ2YseUJBQUtiLE9BQUwsQ0FBYXlDLE9BQWI7QUFDRCxpQkF2QmlCO0FBd0JsQiw0QkFBWSxrQkFBQzVCLEdBQUQsRUFBUztBQUNuQix5QkFBS3RCLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUExQmlCLGVBQXBCO0FBNEJELGFBekNELE1BeUNPO0FBQ0wscUJBQUtTLE9BQUwsQ0FBYXlDLE9BQWI7QUFDRDtBQUNGLFdBOUNELEVBOENHQyxLQTlDSCxDQThDUyxZQUFNO0FBQ2IsbUJBQUsxQyxPQUFMLENBQWF5QyxPQUFiO0FBQ0QsV0FoREQ7QUFpREQ7QUFDRCxhQUFLbEQsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQXBGTyxLOzs7Ozs2QkFzRkFvRCxFLEVBQUk7QUFBQTs7QUFDWixXQUFLdkUsS0FBTCxHQUFhLEtBQUs0QixPQUFMLENBQWE0QyxRQUFiLEVBQWI7QUFDQSxXQUFLMUQsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtjLE9BQUwsQ0FBYTZDLFdBQWI7QUFDQSxXQUFLbkUsS0FBTCxHQUFhLEVBQWI7QUFDQSxVQUFJb0UsUUFBUSxJQUFaO0FBQ0EsVUFBSTNFLE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVRPLGlCQUFTLEtBQUtOO0FBRkwsT0FBWDtBQUlBLFdBQUsyQixPQUFMLENBQWF3QixXQUFiLENBQXlCdUIsY0FBekIsQ0FBd0M1RSxJQUF4QyxFQUE4Q3VELElBQTlDLENBQW1ELFVBQUNiLEdBQUQsRUFBUztBQUMxRGMsZ0JBQVFDLEdBQVIsQ0FBWWYsR0FBWjtBQUNBaUMsY0FBTTlDLE9BQU4sQ0FBY2dELFdBQWQ7QUFDQSxZQUFJbkMsSUFBSTFDLElBQUosQ0FBUzBELEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsY0FBSTFELE9BQU8wQyxJQUFJMUMsSUFBSixDQUFTQSxJQUFwQjtBQUNBMkUsZ0JBQU12RSxTQUFOLEdBQWtCdUUsTUFBTXhFLFdBQU4sQ0FBa0JILEtBQUtLLE1BQXZCLENBQWxCO0FBQ0FzRSxnQkFBTXRFLE1BQU4sR0FBZUwsS0FBS0ssTUFBcEI7QUFDQXNFLGdCQUFNL0QsYUFBTixHQUFzQlosS0FBS1ksYUFBM0I7QUFDQStELGdCQUFNbkUsT0FBTixHQUFnQlIsS0FBSzhFLE1BQXJCO0FBQ0FILGdCQUFNbEUsVUFBTixHQUFtQmtFLE1BQU05QyxPQUFOLENBQWNrRCxVQUFkLENBQXlCL0UsS0FBS1MsVUFBTCxHQUFrQixJQUEzQyxFQUFpRCxhQUFqRCxDQUFuQjtBQUNBa0UsZ0JBQU1qRSxJQUFOLEdBQWFWLEtBQUtVLElBQUwsR0FBWXNFLFVBQVVoRixLQUFLVSxJQUFMLENBQVUsQ0FBVixFQUFhdUUsR0FBdkIsQ0FBWixHQUEwQyxFQUF2RDtBQUNBTixnQkFBTWhFLEdBQU4sR0FBWVgsS0FBS1csR0FBakI7QUFDQWdFLGdCQUFNN0QsT0FBTixHQUFnQmQsS0FBS2MsT0FBckI7QUFDQTtBQUNBLGNBQUlkLEtBQUtrRixnQkFBVCxFQUEyQjtBQUN6QlAsa0JBQU1RLFFBQU4sQ0FBZW5GLEtBQUtrRixnQkFBcEI7QUFDRDtBQUNELGNBQUlsRixLQUFLTSxPQUFULEVBQWtCO0FBQ2hCcUUsa0JBQU1yRSxPQUFOLENBQWM4RSxJQUFkLEdBQXFCcEYsS0FBS00sT0FBTCxDQUFhOEUsSUFBbEM7QUFDQVQsa0JBQU1yRSxPQUFOLENBQWMrRSxLQUFkLEdBQXNCckYsS0FBS00sT0FBTCxDQUFhK0UsS0FBbkM7QUFDQVYsa0JBQU1yRSxPQUFOLENBQWNnRixNQUFkLEdBQXVCdEYsS0FBS00sT0FBTCxDQUFhaUYsWUFBYixHQUE0QnZGLEtBQUtNLE9BQUwsQ0FBYUEsT0FBaEU7QUFDRCxXQUpELE1BSU87QUFDTHFFLGtCQUFNckUsT0FBTixHQUFnQixFQUFoQjtBQUNEO0FBQ0RxRSxnQkFBTTlELFVBQU4sR0FBbUJiLEtBQUthLFVBQXhCO0FBQ0FiLGVBQUt3RixhQUFMLENBQW1CQyxPQUFuQixDQUEyQixVQUFDQyxJQUFELEVBQVU7QUFDbkMsZ0JBQUlDLE1BQU0sRUFBVjtBQUNBQSxnQkFBSXBELEtBQUosR0FBWW1ELEtBQUtuRCxLQUFqQjtBQUNBLGdCQUFJbUQsS0FBS25ELEtBQUwsS0FBZSxNQUFuQixFQUEyQjtBQUN6Qm9ELGtCQUFJQyxTQUFKLEdBQWdCLGVBQWhCO0FBQ0QsYUFGRCxNQUVPLElBQUlGLEtBQUtuRCxLQUFMLEtBQWUsTUFBbkIsRUFBMkI7QUFDaENvRCxrQkFBSUMsU0FBSixHQUFnQixlQUFoQjtBQUNEO0FBQ0RELGdCQUFJRSxXQUFKLEdBQWtCbEIsTUFBTW1CLFNBQU4sQ0FBZ0JKLEtBQUtGLGFBQXJCLENBQWxCO0FBQ0FiLGtCQUFNcEUsS0FBTixDQUFZd0YsSUFBWixDQUFpQkosR0FBakI7QUFDRCxXQVZEO0FBV0FuQixnQkFBTUEsSUFBTjtBQUNELFNBbENELE1Ba0NPO0FBQ0wsY0FBSUcsTUFBTTlDLE9BQU4sQ0FBY21FLFNBQWxCLEVBQTZCO0FBQzNCckIsa0JBQU0xRSxLQUFOLEdBQWMsT0FBSzRCLE9BQUwsQ0FBYTRDLFFBQWIsQ0FBc0IvQixJQUFJMUMsSUFBSixDQUFTMEQsS0FBL0IsQ0FBZDtBQUNBaUIsa0JBQU1zQixRQUFOO0FBQ0Q7QUFDRjtBQUNEekMsZ0JBQVFDLEdBQVIsQ0FBWXlDLE9BQU9DLElBQVAsQ0FBWXhCLE1BQU1yRSxPQUFsQixFQUEyQnFCLE1BQXZDO0FBQ0FnRCxjQUFNeUIsTUFBTjtBQUNELE9BN0NELEVBNkNHN0IsS0E3Q0gsQ0E2Q1MsWUFBTTtBQUNiSSxjQUFNOUMsT0FBTixDQUFjZ0QsV0FBZDtBQUNBRixjQUFNOUMsT0FBTixDQUFjd0UsUUFBZDtBQUNELE9BaEREO0FBaUREOzs7OEJBQ1VDLE0sRUFBUTtBQUNqQixVQUFJQyxRQUFRLEVBQVo7QUFDQUQsYUFBT2IsT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN2QixZQUFJQyxNQUFNLEVBQVY7QUFDQUEsWUFBSWEsSUFBSixHQUFXZCxLQUFLZSxLQUFoQjtBQUNBZCxZQUFJcEQsS0FBSixHQUFZbUQsS0FBS2dCLFdBQWpCO0FBQ0FmLFlBQUlnQixLQUFKLEdBQVlqQixLQUFLa0IsV0FBakI7QUFDQWpCLFlBQUlrQixRQUFKLEdBQWVuQixLQUFLaUIsS0FBcEI7QUFDQWhCLFlBQUl6RixFQUFKLEdBQVN3RixLQUFLb0IsU0FBZDtBQUNBbkIsWUFBSW9CLFVBQUosR0FBaUJyQixLQUFLcUIsVUFBdEI7QUFDQXBCLFlBQUlxQixRQUFKLEdBQWV0QixLQUFLdUIsV0FBcEI7QUFDQXRCLFlBQUlMLE1BQUosR0FBYUksS0FBS25ELEtBQUwsR0FBYSxHQUFiLEdBQW1CbUQsS0FBS3dCLFdBQXJDO0FBQ0F2QixZQUFJd0IsS0FBSixHQUFZekIsS0FBS3dCLFdBQWpCO0FBQ0F2QixZQUFJeUIsT0FBSixHQUFjLEtBQWQ7QUFDQXpCLFlBQUkwQixVQUFKLEdBQWlCM0IsS0FBSzRCLFNBQXRCO0FBQ0FmLGNBQU1SLElBQU4sQ0FBV0osR0FBWDtBQUNELE9BZEQ7QUFlQSxhQUFPWSxLQUFQO0FBQ0Q7OztnQ0FDWS9CLEUsRUFBSTtBQUNmLFdBQUt2RSxLQUFMLEdBQWEsS0FBSzRCLE9BQUwsQ0FBYTRDLFFBQWIsRUFBYjtBQUNBLFVBQUlFLFFBQVEsSUFBWjtBQUNBLFVBQUkzRSxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUTyxpQkFBUyxLQUFLTjtBQUZMLE9BQVg7QUFJQXNELGNBQVFDLEdBQVIsQ0FBWXpELElBQVo7QUFDQSxXQUFLNkIsT0FBTCxDQUFhd0IsV0FBYixDQUF5QmtFLFdBQXpCLENBQXFDdkgsSUFBckMsRUFBMkN1RCxJQUEzQyxDQUFnRCxVQUFDYixHQUFELEVBQVM7QUFDdkRjLGdCQUFRQyxHQUFSLENBQVlmLEdBQVo7QUFDQSxZQUFJQSxJQUFJMUMsSUFBSixDQUFTMEQsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QmlCLGdCQUFNekQsTUFBTixHQUFlLElBQWY7QUFDQXNELGdCQUFNQSxJQUFOO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsY0FBSUcsTUFBTTlDLE9BQU4sQ0FBY21FLFNBQWxCLEVBQTZCO0FBQzNCckIsa0JBQU0xRSxLQUFOLEdBQWMwRSxNQUFNOUMsT0FBTixDQUFjNEMsUUFBZCxDQUF1Qi9CLElBQUkxQyxJQUFKLENBQVMwRCxLQUFoQyxDQUFkO0FBQ0Q7QUFDRjtBQUNEaUIsY0FBTXlCLE1BQU47QUFDRCxPQVhEO0FBWUQ7OztrQ0FDY29CLEcsRUFBS0MsRyxFQUFLO0FBQUE7O0FBQ3ZCLFdBQUt4SCxLQUFMLEdBQWEsS0FBSzRCLE9BQUwsQ0FBYTRDLFFBQWIsRUFBYjtBQUNBLFVBQUlFLFFBQVEsSUFBWjtBQUNBLFVBQUkzRSxPQUFPO0FBQ1R3SCxhQUFLQSxHQURJO0FBRVRDLGFBQUtBO0FBRkksT0FBWDtBQUlBLFdBQUs1RixPQUFMLENBQWF3QixXQUFiLENBQXlCcUUsWUFBekIsQ0FBc0MxSCxJQUF0QyxFQUE0Q3VELElBQTVDLENBQWlELFVBQUNiLEdBQUQsRUFBUztBQUN4RGMsZ0JBQVFDLEdBQVIsQ0FBWWYsR0FBWjtBQUNBLFlBQUlBLElBQUkxQyxJQUFKLENBQVMwRCxLQUFULEtBQW1CLENBQXZCLEVBQTBCLENBQ3pCLENBREQsTUFDTztBQUNMLGNBQUlpQixNQUFNOUMsT0FBTixDQUFjbUUsU0FBbEIsRUFBNkI7QUFDM0JyQixrQkFBTTFFLEtBQU4sR0FBYyxPQUFLNEIsT0FBTCxDQUFhNEMsUUFBYixDQUFzQi9CLElBQUkxQyxJQUFKLENBQVMwRCxLQUEvQixDQUFkO0FBQ0Q7QUFDRjtBQUNGLE9BUkQ7QUFTRDs7OzZCQUNTaUUsSSxFQUFNO0FBQ2QsVUFBSWhELFFBQVEsSUFBWjtBQUNBLFdBQUt4RCxZQUFMLEdBQW9CeUcsWUFBWSxZQUFNO0FBQ3BDRDtBQUNBLFlBQUlBLE9BQU8sQ0FBWCxFQUFjO0FBQ1poRCxnQkFBTTVELFVBQU4sR0FBbUIsQ0FBQzRHLE9BQU9BLE9BQU8sRUFBZixJQUFxQixFQUFyQixHQUEwQixHQUExQixHQUFnQ0EsT0FBTyxFQUF2QyxHQUE0QyxHQUEvRDtBQUNELFNBRkQsTUFFTztBQUNMaEQsZ0JBQU01RCxVQUFOLEdBQW1CLENBQW5CO0FBQ0E0RCxnQkFBTTFELE9BQU4sR0FBZ0IsTUFBaEI7QUFDQTBELGdCQUFNOUIsS0FBTjtBQUNEO0FBQ0Q4QixjQUFNeUIsTUFBTjtBQUNELE9BVm1CLEVBVWpCLElBVmlCLENBQXBCO0FBV0Q7Ozs0QkFDUTtBQUNQeUIsb0JBQWMsS0FBSzFHLFlBQW5CO0FBQ0Q7OzsyQkFDTzJHLEssRUFBTztBQUNiLFdBQUs1SCxFQUFMLEdBQVU0SCxNQUFNNUgsRUFBaEI7QUFDQSxXQUFLa0csTUFBTDtBQUNEOzs7NkJBQ1M7QUFBQTs7QUFDUixXQUFLdkQsS0FBTDtBQUNBLFdBQUtvRCxRQUFMLENBQWMsWUFBTTtBQUNsQixlQUFLNUUsU0FBTCxHQUFpQixPQUFLUSxPQUFMLENBQWFrRyxXQUFiLEVBQWpCO0FBQ0EsZUFBS3pHLE1BQUwsR0FBYyxPQUFLTyxPQUFMLENBQWFtRyxhQUFiLEVBQWQ7QUFDQSxlQUFLekcsaUJBQUwsR0FBeUIsT0FBS00sT0FBTCxDQUFhb0csVUFBYixFQUF6QjtBQUNBLGVBQUt6RyxhQUFMLEdBQXFCLE9BQUtLLE9BQUwsQ0FBYXFHLFdBQWIsQ0FBeUIsT0FBekIsRUFBa0MsSUFBbEMsRUFBd0MsT0FBSzFILE9BQTdDLENBQXJCO0FBQ0QsT0FMRDtBQU1EOzs7K0JBQ1c7QUFDVixXQUFLcUMsS0FBTDtBQUNEOzs7O0VBL1JzQyxlQUFLc0YsSTs7a0JBQXpCdEksVyIsImZpbGUiOiJvcmRlckRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V6K+m5oOFJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaWQ6ICcnLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn6K6i5Y2V5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBzdGF0dXNUeHQ6ICcnLFxuICAgICAgc3RhdHVzOiAnJyxcbiAgICAgIGFkZHJlc3M6IHt9LFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBjcmVhdGVUaW1lOiAnJyxcbiAgICAgIG1lbW86ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIGRlbGl2ZXJTdGF0dXM6ICcnLFxuICAgICAgZmluYWxQcmljZTogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHJlbWFpblRpbWU6ICcnLFxuICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgaW5pdFR4dDogJ+W+heaUr+S7mCcsXG4gICAgICBpc1N0b3A6IGZhbHNlLFxuICAgICAgdGltZUludGVydmFsOiAnJyxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG5vdGVfaW5mb19zdHI6ICcnXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0ub3JkZXJEZXRhaWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2FuY2VsICgpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0hpZGRlbiA9IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXJkZXRhaWwmaWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpc3RpY2E/aWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgb3JkZXJJZDogdGhpcy5pZCxcbiAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJ1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJEZXRhaWwoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2RhdGEuc3RhdHVzXVxuICAgICAgICAgIF90aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzXG4gICAgICAgICAgX3RoaXMuZGVsaXZlclN0YXR1cyA9IGRhdGEuZGVsaXZlclN0YXR1c1xuICAgICAgICAgIF90aGlzLm9yZGVySWQgPSBkYXRhLnNob3dJZFxuICAgICAgICAgIF90aGlzLmNyZWF0ZVRpbWUgPSBfdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQoZGF0YS5jcmVhdGVUaW1lICogMTAwMCwgJ1ktbS1kIEg6aTpzJylcbiAgICAgICAgICBfdGhpcy5tZW1vID0gZGF0YS5tZW1vID8gZGVjb2RlVVJJKGRhdGEubWVtb1swXS52YWwpIDogJydcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICAvLyBfdGhpcy5pbml0TG9naXN0aWNhKCdzaHVuZmVuZycsIGRhdGEuc2hvd0lkKVxuICAgICAgICAgIGlmIChkYXRhLnBheVJlbWFpbmluZ1RpbWUpIHtcbiAgICAgICAgICAgIF90aGlzLmludGVydmFsKGRhdGEucGF5UmVtYWluaW5nVGltZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcykge1xuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5uYW1lID0gZGF0YS5hZGRyZXNzLm5hbWVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MucGhvbmUgPSBkYXRhLmFkZHJlc3MucGhvbmVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MuZGV0YWlsID0gZGF0YS5hZGRyZXNzLmZ1bGxBcmVhTmFtZSArIGRhdGEuYWRkcmVzcy5hZGRyZXNzXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MgPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgaWYgKGl0ZW0udGl0bGUgPT09ICflhrfpk77phY3pgIEnKSB7XG4gICAgICAgICAgICAgIG9iai5pY29uQ2xhc3MgPSAnaWNvbi1uZXdfbGxwcydcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50aXRsZSA9PT0gJ+W4uOinhOmFjemAgScpIHtcbiAgICAgICAgICAgICAgb2JqLmljb25DbGFzcyA9ICdpY29uLW5ld19jZ3BzJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0RGF0YSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKF90aGlzLmFkZHJlc3MpLmxlbmd0aClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udGl0bGUgKyAnw5cnICsgaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgY2FuY2VsT3JkZXIgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5pZFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pc1N0b3AgPSB0cnVlXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSBfdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdExvZ2lzdGljYSAoY29tLCBudW0pIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGNvbTogY29tLFxuICAgICAgICBudW06IG51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldExvZ2lzdGljYShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW50ZXJ2YWwgKHRpbWUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMudGltZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB0aW1lLS1cbiAgICAgICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgICAgX3RoaXMucmVtYWluVGltZSA9ICh0aW1lIC0gdGltZSAlIDYwKSAvIDYwICsgJ+WIhicgKyB0aW1lICUgNjAgKyAn56eSJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLnJlbWFpblRpbWUgPSAwXG4gICAgICAgICAgX3RoaXMuaW5pdFR4dCA9ICfkuqTmmJPlhbPpl60nXG4gICAgICAgICAgX3RoaXMuY2xlYXIoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgICBjbGVhciAoKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZUludGVydmFsKVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICB0aGlzLmlkID0gcGFyYW0uaWRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgdGhpcy5pbml0RGF0YSgoKSA9PiB7XG4gICAgICAgIHRoaXMubmlja19uYW1lID0gdGhpcy4kcGFyZW50LmdldFVzZXJOYW1lKClcbiAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgpXG4gICAgICAgIHRoaXMubm90ZV9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRCdXNpbmVzcygn6K6i5Y2V6K+m5oOF6aG1JywgbnVsbCwgdGhpcy5vcmRlcklkKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25VbmxvYWQgKCkge1xuICAgICAgdGhpcy5jbGVhcigpXG4gICAgfVxuICB9XG4iXX0=