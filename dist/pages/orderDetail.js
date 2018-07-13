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
      orderStatus: ['异常', '待付款', '售后中', '订单关闭', '待发货', '待收货', '交易完成'],
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
      initTxt: '待付款',
      isStop: false,
      timeInterval: '',
      payment: true,
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: '',
      isReceive: false
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
      goReceive: function goReceive() {
        var _this4 = this;

        this.token = this.$parent.getToken();
        var data = {
          token: this.token,
          orderId: this.id
        };
        _wepy2.default.showModal({
          title: '提示',
          content: '是否确认收货',
          success: function success(res) {
            if (res.confirm) {
              _this4.$parent.HttpRequest.ReceiveOrder(data).then(function (res) {
                if (res.data.error === 0) {
                  _this4.isReceive = true;
                }
                _this4.$apply();
              });
            }
          }
        });
      },
      goPay: function goPay() {
        var _this5 = this;

        if (this.payment) {
          this.token = this.$parent.getToken();
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
                    _this5.clear();
                    // wepy.switchTab({
                    //   url: './index'
                    // })
                    _wepy2.default.redirectTo({
                      url: './order?orderType=undelivered'
                    });
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

  _createClass(OrderDetail, [{
    key: 'initData',
    value: function initData(cb) {
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
            _this.initData();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
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
    value: function cancelOrder(cb) {
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
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
            // _this.token = this.$parent.getToken(res.data.error)
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
      var _this6 = this;

      this.clear();
      this.initData(function () {
        _this6.nick_name = _this6.$parent.getUserName();
        _this6.avatar = _this6.$parent.getUserAvatar();
        _this6.customer_info_str = _this6.$parent.getMessage();
        _this6.note_info_str = _this6.$parent.getBusiness('订单详情页', null, _this6.orderId);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJkZWxpdmVyU3RhdHVzIiwiZmluYWxQcmljZSIsImZyZWlnaHQiLCJyZW1haW5UaW1lIiwiaXNIaWRkZW4iLCJpbml0VHh0IiwiaXNTdG9wIiwidGltZUludGVydmFsIiwicGF5bWVudCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsImlzUmVjZWl2ZSIsImNvbXB1dGVkIiwiaXNOdWxsIiwibGVuZ3RoIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJtZXRob2RzIiwiY2FuY2VsIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImNsZWFyIiwiZ29BZGRyZXNzIiwicmVkaXJlY3RUbyIsInVybCIsImdvTG9naXN0aWMiLCJuYXZpZ2F0ZVRvIiwiZ29SZWNlaXZlIiwiZ2V0VG9rZW4iLCJIdHRwUmVxdWVzdCIsIlJlY2VpdmVPcmRlciIsInRoZW4iLCJlcnJvciIsIiRhcHBseSIsImdvUGF5IiwiYXBwVHlwZSIsIlBheVNlcnZpY2UiLCJjb25zb2xlIiwibG9nIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlckRldGFpbCIsImhpZGVMb2FkaW5nIiwic2hvd0lkIiwiZGF0ZUZvcm1hdCIsInZhbCIsInBheVJlbWFpbmluZ1RpbWUiLCJpbnRlcnZhbCIsIm5hbWUiLCJwaG9uZSIsImRldGFpbCIsImZ1bGxBcmVhTmFtZSIsImJ1eWluZ1JlY29yZHMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsImljb25DbGFzcyIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsIm1pc3NUb2tlbiIsImluaXREYXRhIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJjb20iLCJudW0iLCJHZXRMb2dpc3RpY2EiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwicGFyYW0iLCJnZXRVc2VyTmFtZSIsImdldFVzZXJBdmF0YXIiLCJnZXRNZXNzYWdlIiwiZ2V0QnVzaW5lc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O21NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLG1CQUFhLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLE1BQTNDLENBSFI7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxjQUFRLEVBTEg7QUFN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QUFNaEUsVUFBTixHQUFtQixDQUFDMkcsT0FBT0EsT0FBTyxFQUFmLElBQXFCLEVBQXJCLEdBQTBCLEdBQTFCLEdBQWdDQSxPQUFPLEVBQXZDLEdBQTRDLEdBQS9EO0FBQ0QsU0FGRCxNQUVPO0FBQ0wzQyxnQkFBTWhFLFVBQU4sR0FBbUIsQ0FBbkI7QUFDQWdFLGdCQUFNOUQsT0FBTixHQUFnQixNQUFoQjtBQUNBOEQsZ0JBQU1qQyxLQUFOO0FBQ0Q7QUFDRGlDLGNBQU1yQixNQUFOO0FBQ0QsT0FWbUIsRUFVakIsSUFWaUIsQ0FBcEI7QUFXRDs7OzRCQUNRO0FBQ1BrRSxvQkFBYyxLQUFLekcsWUFBbkI7QUFDRDs7OzJCQUNPMEcsSyxFQUFPO0FBQ2IsV0FBSzNILEVBQUwsR0FBVTJILE1BQU0zSCxFQUFoQjtBQUNBLFdBQUt3RCxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUFBOztBQUNSLFdBQUtaLEtBQUw7QUFDQSxXQUFLc0QsUUFBTCxDQUFjLFlBQU07QUFDbEIsZUFBSy9FLFNBQUwsR0FBaUIsT0FBS1MsT0FBTCxDQUFhZ0csV0FBYixFQUFqQjtBQUNBLGVBQUt4RyxNQUFMLEdBQWMsT0FBS1EsT0FBTCxDQUFhaUcsYUFBYixFQUFkO0FBQ0EsZUFBS3hHLGlCQUFMLEdBQXlCLE9BQUtPLE9BQUwsQ0FBYWtHLFVBQWIsRUFBekI7QUFDQSxlQUFLeEcsYUFBTCxHQUFxQixPQUFLTSxPQUFMLENBQWFtRyxXQUFiLENBQXlCLE9BQXpCLEVBQWtDLElBQWxDLEVBQXdDLE9BQUt6SCxPQUE3QyxDQUFyQjtBQUNELE9BTEQ7QUFNRDs7OytCQUNXO0FBQ1YsV0FBS3NDLEtBQUw7QUFDRDs7OztFQW5Uc0MsZUFBS29GLEk7O2tCQUF6QnJJLFciLCJmaWxlIjoib3JkZXJEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlkOiAnJyxcbiAgICAgIG9yZGVyU3RhdHVzOiBbJ+W8guW4uCcsICflvoXku5jmrL4nLCAn5ZSu5ZCO5LitJywgJ+iuouWNleWFs+mXrScsICflvoXlj5HotKcnLCAn5b6F5pS26LSnJywgJ+S6pOaYk+WujOaIkCddLFxuICAgICAgc3RhdHVzVHh0OiAnJyxcbiAgICAgIHN0YXR1czogJycsXG4gICAgICBhZGRyZXNzOiB7fSxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgY3JlYXRlVGltZTogJycsXG4gICAgICBtZW1vOiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBkZWxpdmVyU3RhdHVzOiAnJyxcbiAgICAgIGZpbmFsUHJpY2U6ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICByZW1haW5UaW1lOiAnJyxcbiAgICAgIGlzSGlkZGVuOiBmYWxzZSxcbiAgICAgIGluaXRUeHQ6ICflvoXku5jmrL4nLFxuICAgICAgaXNTdG9wOiBmYWxzZSxcbiAgICAgIHRpbWVJbnRlcnZhbDogJycsXG4gICAgICBwYXltZW50OiB0cnVlLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJyxcbiAgICAgIGlzUmVjZWl2ZTogZmFsc2VcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTlj5bmtojorqLljZUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLmNhbmNlbE9yZGVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSGlkZGVuID0gdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB0aGlzLmNsZWFyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1vcmRlcmRldGFpbCZpZD0nICsgdGhpcy5pZFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmNsZWFyKClcbiAgICAgIH0sXG4gICAgICBnb0xvZ2lzdGljICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2xvZ2lzdGljYT9pZD0nICsgdGhpcy5pZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUmVjZWl2ZSAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICAgIH1cbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm56Gu6K6k5pS26LSnJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlJlY2VpdmVPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWNlaXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBvcmRlcklkOiB0aGlzLmlkLFxuICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVuZGVsaXZlcmVkJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLnJlbWFpblRpbWUgPSAwXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMuaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRPcmRlckRldGFpbChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuc3RhdHVzVHh0ID0gX3RoaXMub3JkZXJTdGF0dXNbZGF0YS5zdGF0dXNdXG4gICAgICAgICAgX3RoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXNcbiAgICAgICAgICBfdGhpcy5kZWxpdmVyU3RhdHVzID0gZGF0YS5kZWxpdmVyU3RhdHVzXG4gICAgICAgICAgX3RoaXMub3JkZXJJZCA9IGRhdGEuc2hvd0lkXG4gICAgICAgICAgX3RoaXMuY3JlYXRlVGltZSA9IF90aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLmNyZWF0ZVRpbWUgKiAxMDAwLCAnWS1tLWQgSDppOnMnKVxuICAgICAgICAgIF90aGlzLm1lbW8gPSBkYXRhLm1lbW8gPyBkYXRhLm1lbW9bMF0udmFsIDogJydcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICAvLyBfdGhpcy5pbml0TG9naXN0aWNhKCdzaHVuZmVuZycsIGRhdGEuc2hvd0lkKVxuICAgICAgICAgIGlmIChkYXRhLnBheVJlbWFpbmluZ1RpbWUpIHtcbiAgICAgICAgICAgIF90aGlzLmludGVydmFsKGRhdGEucGF5UmVtYWluaW5nVGltZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcykge1xuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5uYW1lID0gZGF0YS5hZGRyZXNzLm5hbWVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MucGhvbmUgPSBkYXRhLmFkZHJlc3MucGhvbmVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MuZGV0YWlsID0gZGF0YS5hZGRyZXNzLmZ1bGxBcmVhTmFtZSArIGRhdGEuYWRkcmVzcy5hZGRyZXNzXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MgPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgaWYgKGl0ZW0udGl0bGUgPT09ICflhrfpk77phY3pgIEnKSB7XG4gICAgICAgICAgICAgIG9iai5pY29uQ2xhc3MgPSAnaWNvbi1uZXdfbGxwcydcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50aXRsZSA9PT0gJ+W4uOinhOmFjemAgScpIHtcbiAgICAgICAgICAgICAgb2JqLmljb25DbGFzcyA9ICdpY29uLW5ld19jZ3BzJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuaW5pdERhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNTdG9wID0gdHJ1ZVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gX3RoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRMb2dpc3RpY2EgKGNvbSwgbnVtKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjb206IGNvbSxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY2EoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAvLyBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGludGVydmFsICh0aW1lKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLnRpbWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGltZS0tXG4gICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgIF90aGlzLnJlbWFpblRpbWUgPSAodGltZSAtIHRpbWUgJSA2MCkgLyA2MCArICfliIYnICsgdGltZSAlIDYwICsgJ+enkidcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgIF90aGlzLmluaXRUeHQgPSAn5Lqk5piT5YWz6ZetJ1xuICAgICAgICAgIF90aGlzLmNsZWFyKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gICAgY2xlYXIgKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVJbnRlcnZhbClcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgdGhpcy5pZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmNsZWFyKClcbiAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB0aGlzLm5pY2tfbmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgICB0aGlzLmN1c3RvbWVyX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoKVxuICAgICAgICB0aGlzLm5vdGVfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+iuouWNleivpuaDhemhtScsIG51bGwsIHRoaXMub3JkZXJJZClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uVW5sb2FkICgpIHtcbiAgICAgIHRoaXMuY2xlYXIoKVxuICAgIH1cbiAgfVxuIl19