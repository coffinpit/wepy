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
      payment: true
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

  _createClass(Order, [{
    key: 'initData',
    value: function initData() {
      this.pageNum = 1;
      this.orderList = [];
      this.initOrder();
    }
  }, {
    key: 'initOrder',
    value: function initOrder() {
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
            obj.needAdd = item.isNeedAddress;
            obj.statusTxt = _this.orderStatus[item.status];
            obj.count = item.buyingRecords.length;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.orderList.push(obj);
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
            _this.initOrder();
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
      this.initData();
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50IiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4IiwiaW5pdERhdGEiLCJnb0RldGFpbCIsImlkIiwibmF2aWdhdGVUbyIsInVybCIsImNhbmNlbCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbE9yZGVyIiwiZ29BZGRyZXNzIiwiZ29Mb2dpc3RpYyIsInN0YXR1cyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJvcmRlcklkIiwiYXBwVHlwZSIsIkh0dHBSZXF1ZXN0IiwiUGF5U2VydmljZSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImVyck1zZyIsInN3aXRjaFRhYiIsInBheUZhaWwiLCJjYXRjaCIsImluaXRPcmRlciIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlclN0YXR1cyIsImhpZGVMb2FkaW5nIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0IiwibmVlZEFkZCIsImlzTmVlZEFkZHJlc3MiLCJzdGF0dXNUeHQiLCJjb3VudCIsImJ1eWluZ1JlY29yZHMiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJtaXNzVG9rZW4iLCIkYXBwbHkiLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiY2IiLCJDYW5jZWxPcmRlciIsInBhcmFtIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7dUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQWIsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLEtBQWxFLEVBQWhCLEVBQXlGLHlCQUF3QixFQUFDLFNBQVEsa0JBQVQsRUFBNEIsT0FBTSxXQUFsQyxFQUE4QyxRQUFPLE1BQXJELEVBQTRELFNBQVEsT0FBcEUsRUFBNEUsT0FBTSxLQUFsRixFQUFqSCxFQUEwTSx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxXQUEzQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUFsTyxFQUFiLEVBQWtV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QUFxQ2pHLElBQXJDLEVBQTJDcUMsSUFBM0MsQ0FBZ0QsVUFBQ1osR0FBRCxFQUFTO0FBQ3ZEYSxnQkFBUUMsR0FBUixDQUFZZCxHQUFaO0FBQ0EsWUFBSUEsSUFBSXpCLElBQUosQ0FBU3dDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJ3RCxnQkFBTUEsSUFBTjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUl2QyxNQUFNM0QsT0FBTixDQUFjNkUsU0FBbEIsRUFBNkI7QUFDM0JsQixrQkFBTXhELEtBQU4sR0FBYyxPQUFLSCxPQUFMLENBQWFrQyxRQUFiLENBQXNCUCxJQUFJekIsSUFBSixDQUFTd0MsS0FBL0IsQ0FBZDtBQUNEO0FBQ0Y7QUFDRixPQVREO0FBVUQ7OztvQ0FDZ0I7QUFDZjtBQUNBLFVBQUksS0FBSy9CLE9BQUwsR0FBZSxLQUFLQyxZQUF4QixFQUFzQztBQUNwQztBQUNBLGFBQUtELE9BQUw7QUFDQSxhQUFLOEMsU0FBTDtBQUNEO0FBQ0Y7OzsyQkFDTzJDLEssRUFBTztBQUFBOztBQUNiLFVBQUlBLE1BQU0zRixTQUFWLEVBQXFCO0FBQ25CLGFBQUtBLFNBQUwsR0FBaUIyRixNQUFNM0YsU0FBdkI7QUFDQSxhQUFLTCxPQUFMLENBQWEyRCxPQUFiLENBQXFCLFVBQUNDLElBQUQsRUFBTy9DLEtBQVAsRUFBaUI7QUFDcEMsY0FBSStDLEtBQUsxRCxJQUFMLEtBQWM4RixNQUFNM0YsU0FBeEIsRUFBbUM7QUFDakMsbUJBQUtELE9BQUwsR0FBZVMsS0FBZjtBQUNEO0FBQ0YsU0FKRDtBQUtELE9BUEQsTUFPTztBQUNMLGFBQUtULE9BQUwsR0FBZSxDQUFmO0FBQ0Q7QUFDRCxXQUFLc0UsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLNUQsUUFBTDtBQUNEOzs7O0VBaFFnQyxlQUFLbUYsSTs7a0JBQW5CbkgsSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTorqLljZUnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyTGlzdFwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIzXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0LFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhY2thZ2U6IFt7XG4gICAgICAgIHRpdGxlOiAn5YWo6YOoJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlK/ku5gnLFxuICAgICAgICB0eXBlOiAndW5wYWlkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heWPkei0pycsXG4gICAgICAgIHR5cGU6ICd1bmRlbGl2ZXJlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlLbotKcnLFxuICAgICAgICB0eXBlOiAndW5yZWNlaXB0ZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZSu5ZCOJyxcbiAgICAgICAgdHlwZTogJ3JlZnVuZGluZydcbiAgICAgIH1dLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn5bey5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBjdXJyZW50OiBudWxsLFxuICAgICAgb3JkZXJUeXBlOiAnYWxsJyxcbiAgICAgIG9yZGVyTGlzdDogW10sXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICBwYXltZW50OiB0cnVlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGVja1BhY2thZ2UgKGluZGV4LCB0eXBlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gdHlwZVxuICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoaWQpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcihpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXImaWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoaWQsIHN0YXR1cykge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbG9naXN0aWNhP2lkPScgKyBpZCArICcmc3RhdHVzPScgKyBzdGF0dXNcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBvcmRlcklkOiBpZCxcbiAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJ1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhICgpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgIHRoaXMuaW5pdE9yZGVyKClcbiAgICB9XG4gICAgaW5pdE9yZGVyICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzdGF0dXM6IHRoaXMub3JkZXJUeXBlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJTdGF0dXMoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnNob3dJZFxuICAgICAgICAgICAgb2JqLnBheSA9IGl0ZW0ucGF5XG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnN0YXR1cyA9IGl0ZW0uc3RhdHVzXG4gICAgICAgICAgICBvYmoubmVlZEFkZCA9IGl0ZW0uaXNOZWVkQWRkcmVzc1xuICAgICAgICAgICAgb2JqLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2l0ZW0uc3RhdHVzXVxuICAgICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdSZWNvcmRzLmxlbmd0aFxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0T3JkZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoaWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS5vcmRlclR5cGUpIHtcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBwYXJhbS5vcmRlclR5cGVcbiAgICAgICAgdGhpcy5wYWNrYWdlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gcGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgIH1cbiAgfVxuIl19