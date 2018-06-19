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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwib3JkZXJJZCIsIm1ldGhvZHMiLCJjaGVja1BhY2thZ2UiLCJpbmRleCIsImluaXREYXRhIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsImdvTG9naXN0aWMiLCJzdGF0dXMiLCJnZXRPcmRlcklkIiwiY29uc29sZSIsImxvZyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJzd2l0Y2hUYWIiLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsImluaXRPcmRlciIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlclN0YXR1cyIsImhpZGVMb2FkaW5nIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0IiwibmVlZEFkZCIsImlzTmVlZEFkZHJlc3MiLCJzdGF0dXNUeHQiLCJjb3VudCIsImJ1eWluZ1JlY29yZHMiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJtaXNzVG9rZW4iLCIkYXBwbHkiLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJwYXJhbSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFiLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxLQUFsRSxFQUFoQixFQUF5Rix5QkFBd0IsRUFBQyxTQUFRLGtCQUFULEVBQTRCLE9BQU0sV0FBbEMsRUFBOEMsUUFBTyxNQUFyRCxFQUE0RCxTQUFRLE9BQXBFLEVBQTRFLE9B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QXZCO0FBQ0EsYUFBS0wsT0FBTCxDQUFhaUUsT0FBYixDQUFxQixVQUFDQyxJQUFELEVBQU9oRCxLQUFQLEVBQWlCO0FBQ3BDLGNBQUlnRCxLQUFLaEUsSUFBTCxLQUFjbUcsTUFBTWhHLFNBQXhCLEVBQW1DO0FBQ2pDLG1CQUFLRCxPQUFMLEdBQWVjLEtBQWY7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQVBELE1BT087QUFDTCxhQUFLZCxPQUFMLEdBQWUsQ0FBZjtBQUNEO0FBQ0QsV0FBSzRFLE1BQUw7QUFDRDs7OzZCQUNTO0FBQUE7O0FBQ1IsV0FBSzdELFFBQUwsQ0FBYyxZQUFNO0FBQ2xCLGVBQUtSLFNBQUwsR0FBaUIsT0FBS2YsT0FBTCxDQUFhMEcsV0FBYixFQUFqQjtBQUNBLGVBQUsxRixNQUFMLEdBQWMsT0FBS2hCLE9BQUwsQ0FBYTJHLGFBQWIsRUFBZDtBQUNBLGVBQUsxRixpQkFBTCxHQUF5QixPQUFLakIsT0FBTCxDQUFhNEcsVUFBYixFQUF6QjtBQUNBLGVBQUsxRixhQUFMLEdBQXFCLE9BQUtsQixPQUFMLENBQWE2RyxXQUFiLENBQXlCLE9BQXpCLEVBQWtDLElBQWxDLEVBQXdDLE9BQUsxRixPQUE3QyxDQUFyQjtBQUNELE9BTEQ7QUFNRDs7OztFQS9RZ0MsZUFBSzJGLEk7O2tCQUFuQjVILEsiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IE1lbnUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6K6i5Y2VJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlckxpc3RcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0ub3JkZXJEZXRhaWxcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiM1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdCxcbiAgICAgIGRlZmVjdDogRGVmZWN0LFxuICAgICAgbWVudUxpc3Q6IE1lbnVcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlckxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWNrYWdlOiBbe1xuICAgICAgICB0aXRsZTogJ+WFqOmDqCcsXG4gICAgICAgIHR5cGU6ICdhbGwnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5pSv5LuYJyxcbiAgICAgICAgdHlwZTogJ3VucGFpZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXlj5HotKcnLFxuICAgICAgICB0eXBlOiAndW5kZWxpdmVyZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5pS26LSnJyxcbiAgICAgICAgdHlwZTogJ3VucmVjZWlwdGVkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WUruWQjicsXG4gICAgICAgIHR5cGU6ICdyZWZ1bmRpbmcnXG4gICAgICB9XSxcbiAgICAgIG9yZGVyU3RhdHVzOiBbJ+W8guW4uCcsICflvoXmlK/ku5gnLCAn5ZSu5ZCO5LitJywgJ+W3suWFs+mXrScsICflvoXlj5HotKcnLCAn5b6F5pS26LSnJywgJ+S6pOaYk+WujOaIkCddLFxuICAgICAgY3VycmVudDogbnVsbCxcbiAgICAgIG9yZGVyVHlwZTogJ2FsbCcsXG4gICAgICBvcmRlckxpc3Q6IFtdLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAwLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgcGF5bWVudDogdHJ1ZSxcbiAgICAgIG5pY2tfbmFtZTogJycsXG4gICAgICBhdmF0YXI6ICcnLFxuICAgICAgY3VzdG9tZXJfaW5mb19zdHI6ICcnLFxuICAgICAgbm90ZV9pbmZvX3N0cjogJycsXG4gICAgICBvcmRlcklkOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hlY2tQYWNrYWdlIChpbmRleCwgdHlwZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICB0aGlzLm9yZGVyVHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlckRldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjYW5jZWwgKGlkKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOiuouWNlScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuY2VsT3JkZXIoaWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyJmlkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvTG9naXN0aWMgKGlkLCBzdGF0dXMpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2xvZ2lzdGljYT9pZD0nICsgaWQgKyAnJnN0YXR1cz0nICsgc3RhdHVzXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ2V0T3JkZXJJZCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHRoaXMub3JkZXJJZCA9IGlkXG4gICAgICB9LFxuICAgICAgZ29QYXkgKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgb3JkZXJJZDogaWQsXG4gICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlBheVNlcnZpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgIHRoaXMuaW5pdE9yZGVyKGNiKVxuICAgIH1cbiAgICBpbml0T3JkZXIgKGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgc3RhdHVzOiB0aGlzLm9yZGVyVHlwZVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyU3RhdHVzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSBkYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIGRhdGEub3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5zaG93SWRcbiAgICAgICAgICAgIG9iai5wYXkgPSBpdGVtLnBheVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5zdGF0dXMgPSBpdGVtLnN0YXR1c1xuICAgICAgICAgICAgb2JqLm5lZWRBZGQgPSBpdGVtLmlzTmVlZEFkZHJlc3NcbiAgICAgICAgICAgIG9iai5zdGF0dXNUeHQgPSBfdGhpcy5vcmRlclN0YXR1c1tpdGVtLnN0YXR1c11cbiAgICAgICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nUmVjb3Jkcy5sZW5ndGhcbiAgICAgICAgICAgIG9iai5vcmRlckRldGFpbCA9IF90aGlzLmluaXRDaGlsZChpdGVtLmJ1eWluZ1JlY29yZHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlckxpc3QucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRPcmRlcihjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udGl0bGUgKyAnw5cnICsgaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgY2FuY2VsT3JkZXIgKGlkLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5pbml0T3JkZXIoKVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gcGFyYW0ub3JkZXJUeXBlXG4gICAgICAgIHRoaXMucGFja2FnZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IHBhcmFtLm9yZGVyVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCforqLljZXliJfooajpobUnLCBudWxsLCB0aGlzLm9yZGVySWQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19