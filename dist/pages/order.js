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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwib3JkZXJJZCIsIm1ldGhvZHMiLCJjaGVja1BhY2thZ2UiLCJpbmRleCIsImluaXREYXRhIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsImdvTG9naXN0aWMiLCJzdGF0dXMiLCJnZXRPcmRlcklkIiwiY29uc29sZSIsImxvZyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsImluaXRPcmRlciIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlclN0YXR1cyIsImhpZGVMb2FkaW5nIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0IiwiZGVsaXZlclN0YXR1cyIsIm5lZWRBZGQiLCJpc05lZWRBZGRyZXNzIiwic3RhdHVzVHh0IiwiY291bnQiLCJidXlpbmdSZWNvcmRzIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwibWlzc1Rva2VuIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJwYXJhbSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFiLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxLQUFsRSxFQUFoQixFQUF5Rix5QkFBd0IsRUFBQyxTQUFRLGtCQUFULEVBQTRCLE9BQU0sV0FBbEMsRUFBOEMsUUFBTyxNQUFyRCxFQUE0RCxTQUFRLE9BQXBFLEVBQTRFLE9BQU0sS0FBbEYsRUFB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QUFBOztBQUNiLFVBQUlBLE1BQU0vRixTQUFWLEVBQXFCO0FBQ25CLGFBQUtBLFNBQUwsR0FBaUIrRixNQUFNL0YsU0FBdkI7QUFDQSxhQUFLTCxPQUFMLENBQWFnRSxPQUFiLENBQXFCLFVBQUNDLElBQUQsRUFBTy9DLEtBQVAsRUFBaUI7QUFDcEMsY0FBSStDLEtBQUsvRCxJQUFMLEtBQWNrRyxNQUFNL0YsU0FBeEIsRUFBbUM7QUFDakMsbUJBQUtELE9BQUwsR0FBZWMsS0FBZjtBQUNEO0FBQ0YsU0FKRDtBQUtELE9BUEQsTUFPTztBQUNMLGFBQUtkLE9BQUwsR0FBZSxDQUFmO0FBQ0Q7QUFDRCxXQUFLNEUsTUFBTDtBQUNEOzs7NkJBQ1M7QUFBQTs7QUFDUixXQUFLN0QsUUFBTCxDQUFjLFlBQU07QUFDbEIsZUFBS1IsU0FBTCxHQUFpQixPQUFLZixPQUFMLENBQWF5RyxXQUFiLEVBQWpCO0FBQ0EsZUFBS3pGLE1BQUwsR0FBYyxPQUFLaEIsT0FBTCxDQUFhMEcsYUFBYixFQUFkO0FBQ0EsZUFBS3pGLGlCQUFMLEdBQXlCLE9BQUtqQixPQUFMLENBQWEyRyxVQUFiLEVBQXpCO0FBQ0EsZUFBS3pGLGFBQUwsR0FBcUIsT0FBS2xCLE9BQUwsQ0FBYTRHLFdBQWIsQ0FBeUIsT0FBekIsRUFBa0MsSUFBbEMsRUFBd0MsT0FBS3pGLE9BQTdDLENBQXJCO0FBQ0QsT0FMRDtBQU1EOzs7O0VBblJnQyxlQUFLMEYsSTs7a0JBQW5CM0gsSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTorqLljZUnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyTGlzdFwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIzXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0LFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhY2thZ2U6IFt7XG4gICAgICAgIHRpdGxlOiAn5YWo6YOoJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlK/ku5gnLFxuICAgICAgICB0eXBlOiAndW5wYWlkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heWPkei0pycsXG4gICAgICAgIHR5cGU6ICd1bmRlbGl2ZXJlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlLbotKcnLFxuICAgICAgICB0eXBlOiAndW5yZWNlaXB0ZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZSu5ZCOJyxcbiAgICAgICAgdHlwZTogJ3JlZnVuZGluZydcbiAgICAgIH1dLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn5bey5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBjdXJyZW50OiBudWxsLFxuICAgICAgb3JkZXJUeXBlOiAnYWxsJyxcbiAgICAgIG9yZGVyTGlzdDogW10sXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICBwYXltZW50OiB0cnVlLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJyxcbiAgICAgIG9yZGVySWQ6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGVja1BhY2thZ2UgKGluZGV4LCB0eXBlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gdHlwZVxuICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoaWQpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcihpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXImaWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoaWQsIHN0YXR1cykge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbG9naXN0aWNhP2lkPScgKyBpZCArICcmc3RhdHVzPScgKyBzdGF0dXNcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnZXRPcmRlcklkIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgICAgdGhpcy5vcmRlcklkID0gaWRcbiAgICAgIH0sXG4gICAgICBnb1BheSAoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBvcmRlcklkOiBpZCxcbiAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJ1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSAyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJUeXBlID0gJ3VuZGVsaXZlcmVkJ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgIHRoaXMuaW5pdE9yZGVyKGNiKVxuICAgIH1cbiAgICBpbml0T3JkZXIgKGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgc3RhdHVzOiB0aGlzLm9yZGVyVHlwZVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyU3RhdHVzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSBkYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIGRhdGEub3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5zaG93SWRcbiAgICAgICAgICAgIG9iai5wYXkgPSBpdGVtLnBheVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5zdGF0dXMgPSBpdGVtLnN0YXR1c1xuICAgICAgICAgICAgb2JqLmRlbGl2ZXJTdGF0dXMgPSBpdGVtLmRlbGl2ZXJTdGF0dXNcbiAgICAgICAgICAgIG9iai5uZWVkQWRkID0gaXRlbS5pc05lZWRBZGRyZXNzXG4gICAgICAgICAgICBvYmouc3RhdHVzVHh0ID0gX3RoaXMub3JkZXJTdGF0dXNbaXRlbS5zdGF0dXNdXG4gICAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eWluZ1JlY29yZHMubGVuZ3RoXG4gICAgICAgICAgICBvYmoub3JkZXJEZXRhaWwgPSBfdGhpcy5pbml0Q2hpbGQoaXRlbS5idXlpbmdSZWNvcmRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXJMaXN0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0T3JkZXIoY2IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc291cmNlVHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChpZCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuaW5pdE9yZGVyKClcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgaWYgKHBhcmFtLm9yZGVyVHlwZSkge1xuICAgICAgICB0aGlzLm9yZGVyVHlwZSA9IHBhcmFtLm9yZGVyVHlwZVxuICAgICAgICB0aGlzLnBhY2thZ2UuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSBwYXJhbS5vcmRlclR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gMFxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0RGF0YSgoKSA9PiB7XG4gICAgICAgIHRoaXMubmlja19uYW1lID0gdGhpcy4kcGFyZW50LmdldFVzZXJOYW1lKClcbiAgICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgpXG4gICAgICAgIHRoaXMubm90ZV9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRCdXNpbmVzcygn6K6i5Y2V5YiX6KGo6aG1JywgbnVsbCwgdGhpcy5vcmRlcklkKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==