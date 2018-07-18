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
        title: '待付款',
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
      orderStatus: ['异常', '待付款', '售后中', '已关闭', '待发货', '待收货', '交易完成'],
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
        this.orderId = id;
      },
      goReceive: function goReceive(id, index) {
        var _this4 = this;

        this.token = this.$parent.getToken();
        var data = {
          token: this.token,
          orderId: id
        };
        _wepy2.default.showModal({
          title: '提示',
          content: '是否确认收货',
          success: function success(res) {
            if (res.confirm) {
              _this4.$parent.HttpRequest.ReceiveOrder(data).then(function (res) {
                if (res.data.error === 0) {
                  _this4.orderList[index].isReceive = true;
                }
                _this4.$apply();
              });
            }
          }
        });
      },
      goPay: function goPay(id) {
        var _this5 = this;

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
              var sign = _this5.$parent.HttpRequest.getPaySign(signData);
              _wepy2.default.requestPayment({
                'timeStamp': timeStamp,
                'nonceStr': nonceStr,
                'package': prepayid,
                'signType': 'MD5',
                'paySign': sign,
                'success': function success(res) {
                  if (res.errMsg === 'requestPayment:ok') {
                    _wepy2.default.redirectTo({
                      url: './order?orderType=undelivered'
                    });
                    // this.current = 2
                    // this.orderType = 'undelivered'
                    // this.initData()
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
      var _this6 = this;

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
        if (_this6.pageNum === 1) {
          _this6.orderList = [];
        }
        console.log(res);
        _this.isLoading = false;
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          data.orders.forEach(function (item) {
            var obj = {};
            obj.id = item.id;
            obj.isReceive = false;
            obj.title = item.showId;
            obj.pay = item.pay;
            obj.freight = item.freight;
            obj.status = item.status;
            obj.deliverStatus = item.deliverStatus;
            obj.needAdd = item.isNeedAddress;
            obj.statusTxt = _this.orderStatus[item.status];
            obj.count = item.buyingRecords.length;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            if (_this.orderList.length === 0) {
              _this.orderList.push(obj);
            } else {
              var hasTwo = false;
              for (var i = 0; i < _this.orderList.length; i++) {
                if (_this.orderList[i].id === item.id) {
                  hasTwo = true;
                }
              }
              if (!hasTwo) {
                _this.orderList.push(obj);
              }
            }
            // _this.orderList.push(obj)
          });
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.initData(cb);
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isLoading = false;
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
    value: function cancelOrder(id, cb) {
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
            // _this.token = this.$parent.getToken(res.data.error)
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
    key: 'onReady',
    value: function onReady() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwib3JkZXJJZCIsIm1ldGhvZHMiLCJjaGVja1BhY2thZ2UiLCJpbmRleCIsImluaXREYXRhIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsImdvTG9naXN0aWMiLCJzdGF0dXMiLCJnZXRPcmRlcklkIiwiZ29SZWNlaXZlIiwiZ2V0VG9rZW4iLCJIdHRwUmVxdWVzdCIsIlJlY2VpdmVPcmRlciIsInRoZW4iLCJlcnJvciIsImlzUmVjZWl2ZSIsIiRhcHBseSIsImdvUGF5IiwiYXBwVHlwZSIsIlBheVNlcnZpY2UiLCJjb25zb2xlIiwibG9nIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJyZWRpcmVjdFRvIiwicGF5RmFpbCIsImNhdGNoIiwiY2IiLCJpbml0T3JkZXIiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0T3JkZXJTdGF0dXMiLCJoaWRlTG9hZGluZyIsIm9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwic2hvd0lkIiwicGF5IiwiZnJlaWdodCIsImRlbGl2ZXJTdGF0dXMiLCJuZWVkQWRkIiwiaXNOZWVkQWRkcmVzcyIsInN0YXR1c1R4dCIsImNvdW50IiwiYnV5aW5nUmVjb3JkcyIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwicHVzaCIsImhhc1R3byIsImkiLCJtaXNzVG9rZW4iLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJwYXJhbSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFiLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxLQUFsRSxFQUFoQixFQUF5Rix5QkFBd0IsRUFBQyxTQUFRLGtCQUFULEVBQTRCLE9BQU0sV0FBbEMs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aUJvRyxNQUFNcEcsU0FBdkI7QUFDQSxhQUFLTCxPQUFMLENBQWFxRSxPQUFiLENBQXFCLFVBQUNDLElBQUQsRUFBT3BELEtBQVAsRUFBaUI7QUFDcEMsY0FBSW9ELEtBQUtwRSxJQUFMLEtBQWN1RyxNQUFNcEcsU0FBeEIsRUFBbUM7QUFDakMsbUJBQUtELE9BQUwsR0FBZWMsS0FBZjtBQUNEO0FBQ0YsU0FKRDtBQUtELE9BUEQsTUFPTztBQUNMLGFBQUtkLE9BQUwsR0FBZSxDQUFmO0FBQ0Q7QUFDRCxXQUFLc0MsTUFBTDtBQUNEOzs7OEJBQ1U7QUFBQTs7QUFDVCxXQUFLdkIsUUFBTCxDQUFjLFlBQU07QUFDbEIsZUFBS1IsU0FBTCxHQUFpQixPQUFLZixPQUFMLENBQWE4RyxXQUFiLEVBQWpCO0FBQ0EsZUFBSzlGLE1BQUwsR0FBYyxPQUFLaEIsT0FBTCxDQUFhK0csYUFBYixFQUFkO0FBQ0EsZUFBSzlGLGlCQUFMLEdBQXlCLE9BQUtqQixPQUFMLENBQWFnSCxVQUFiLEVBQXpCO0FBQ0EsZUFBSzlGLGFBQUwsR0FBcUIsT0FBS2xCLE9BQUwsQ0FBYWlILFdBQWIsQ0FBeUIsT0FBekIsRUFBa0MsSUFBbEMsRUFBd0MsT0FBSzlGLE9BQTdDLENBQXJCO0FBQ0QsT0FMRDtBQU1EOzs7O0VBdFRnQyxlQUFLK0YsSTs7a0JBQW5CaEksSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTorqLljZUnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyTGlzdFwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIzXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0LFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhY2thZ2U6IFt7XG4gICAgICAgIHRpdGxlOiAn5YWo6YOoJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXku5jmrL4nLFxuICAgICAgICB0eXBlOiAndW5wYWlkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heWPkei0pycsXG4gICAgICAgIHR5cGU6ICd1bmRlbGl2ZXJlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXmlLbotKcnLFxuICAgICAgICB0eXBlOiAndW5yZWNlaXB0ZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZSu5ZCOJyxcbiAgICAgICAgdHlwZTogJ3JlZnVuZGluZydcbiAgICAgIH1dLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heS7mOasvicsICfllK7lkI7kuK0nLCAn5bey5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBjdXJyZW50OiBudWxsLFxuICAgICAgb3JkZXJUeXBlOiAnYWxsJyxcbiAgICAgIG9yZGVyTGlzdDogW10sXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICBwYXltZW50OiB0cnVlLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJyxcbiAgICAgIG9yZGVySWQ6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGVja1BhY2thZ2UgKGluZGV4LCB0eXBlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gdHlwZVxuICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoaWQpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcihpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXImaWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoaWQsIHN0YXR1cykge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbG9naXN0aWNhP2lkPScgKyBpZCArICcmc3RhdHVzPScgKyBzdGF0dXNcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnZXRPcmRlcklkIChpZCkge1xuICAgICAgICB0aGlzLm9yZGVySWQgPSBpZFxuICAgICAgfSxcbiAgICAgIGdvUmVjZWl2ZSAoaWQsIGluZGV4KSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICBvcmRlcklkOiBpZFxuICAgICAgICB9XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuehruiupOaUtui0pycsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5SZWNlaXZlT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyTGlzdFtpbmRleF0uaXNSZWNlaXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5IChpZCkge1xuICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIG9yZGVySWQ6IGlkLFxuICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVuZGVsaXZlcmVkJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnQgPSAyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMub3JkZXJUeXBlID0gJ3VuZGVsaXZlcmVkJ1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmluaXREYXRhKClcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgIHRoaXMuaW5pdE9yZGVyKGNiKVxuICAgIH1cbiAgICBpbml0T3JkZXIgKGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgc3RhdHVzOiB0aGlzLm9yZGVyVHlwZVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyU3RhdHVzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAodGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5vcmRlckxpc3QgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouaXNSZWNlaXZlID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0uc2hvd0lkXG4gICAgICAgICAgICBvYmoucGF5ID0gaXRlbS5wYXlcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouc3RhdHVzID0gaXRlbS5zdGF0dXNcbiAgICAgICAgICAgIG9iai5kZWxpdmVyU3RhdHVzID0gaXRlbS5kZWxpdmVyU3RhdHVzXG4gICAgICAgICAgICBvYmoubmVlZEFkZCA9IGl0ZW0uaXNOZWVkQWRkcmVzc1xuICAgICAgICAgICAgb2JqLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2l0ZW0uc3RhdHVzXVxuICAgICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdSZWNvcmRzLmxlbmd0aFxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcmRlckxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIF90aGlzLm9yZGVyTGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBoYXNUd28gPSBmYWxzZVxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF90aGlzLm9yZGVyTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vcmRlckxpc3RbaV0uaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICAgIGhhc1R3byA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFoYXNUd28pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcmRlckxpc3QucHVzaChvYmopXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIF90aGlzLm9yZGVyTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoaWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAvLyBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS5vcmRlclR5cGUpIHtcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBwYXJhbS5vcmRlclR5cGVcbiAgICAgICAgdGhpcy5wYWNrYWdlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gcGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCforqLljZXliJfooajpobUnLCBudWxsLCB0aGlzLm9yZGVySWQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19