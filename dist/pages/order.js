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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwib3JkZXJJZCIsIm1ldGhvZHMiLCJjaGVja1BhY2thZ2UiLCJpbmRleCIsImluaXREYXRhIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsImdvTG9naXN0aWMiLCJzdGF0dXMiLCJnZXRPcmRlcklkIiwiY29uc29sZSIsImxvZyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsImluaXRPcmRlciIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlclN0YXR1cyIsImhpZGVMb2FkaW5nIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0IiwibmVlZEFkZCIsImlzTmVlZEFkZHJlc3MiLCJzdGF0dXNUeHQiLCJjb3VudCIsImJ1eWluZ1JlY29yZHMiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJtaXNzVG9rZW4iLCIkYXBwbHkiLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJwYXJhbSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFiLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxLQUFsRSxFQUFoQixFQUF5Rix5QkFBd0IsRUFBQyxTQUFRLGtCQUFULEVBQTRCLE9BQU0sV0FBbEMsRUFBOEMsUUFBTyxNQUFyRCxFQUE0RCxTQUFRLE9BQXBFLEVBQTRFLE9BQU0sS0FBbEYsRUFBakgsRUFBME0seUJBQXdCLEVBQUMsU0FBUSxXQUFULEVBQXFCLE9BQU0sV0FBM0IsRUFBdUMsUUFBTyxNQUE5QyxFQUFxRCxTQUFRLE9BQTdELEVBQXFFLE9BQU0sS0FBM0UsRUFBbE8sRUFBYixFQUFrVSxVQUFTLEVBQUMsUUFBTyxHQUFSLEVBQTNVLEUsU0FDVEMsTyxHQUFVLEUsU0FDVEMsVSxHQUFhO0FBQ1JDLG9DQURRO0FBRVJDLDhCQUZRO0FBR1JDO0FBSFEsSyxTQUtWQyxRLEdBQVc7QUFDVEMsWUFEUyxvQkFDQztBQUNSLFlBQUksS0FBS0osU0FBTCxDQUFlSyxNQUFmLEtBQTBCLENBQTlCLEVBQWlDO0FBQy9CLGlCQUFPLElBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRixPQVBRO0FBUVRDLGVBUlMsdUJBUUk7QUFDWCxZQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDM0MsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDbEQsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFkUSxLLFNBZ0JYRyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGVBQVMsQ0FBQztBQUNSQyxlQUFPLElBREM7QUFFUkMsY0FBTTtBQUZFLE9BQUQsRUFHTjtBQUNERCxlQUFPLEtBRE47QUFFREMsY0FBTTtBQUZMLE9BSE0sRUFNTjtBQUNERCxlQUFPLEtBRE47QUFFREMsY0FBTTtBQUZMLE9BTk0sRUFTTjtBQUNERCxlQUFPLEtBRE47QUFFREMsY0FBTTtBQUZMLE9BVE0sRUFZTjtBQUNERCxlQUFPLElBRE47QUFFREMsY0FBTTtBQUZMLE9BWk0sQ0FGSjtBQWtCTEMsbUJBQWEsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLEtBQWQsRUFBcUIsS0FBckIsRUFBNEIsS0FBNUIsRUFBbUMsS0FBbkMsRUFBMEMsTUFBMUMsQ0FsQlI7QUFtQkxDLGVBQVMsSUFuQko7QUFvQkxDLGlCQUFXLEtBcEJOO0FBcUJMaEIsaUJBQVcsRUFyQk47QUFzQkxpQixnQkFBVSxDQXRCTDtBQXVCTEMsZUFBUyxDQXZCSjtBQXdCTEMsb0JBQWMsQ0F4QlQ7QUF5QkxDLGlCQUFXLElBekJOO0FBMEJMQyxlQUFTLElBMUJKO0FBMkJMQyxpQkFBVyxFQTNCTjtBQTRCTEMsY0FBUSxFQTVCSDtBQTZCTEMseUJBQW1CLEVBN0JkO0FBOEJMQyxxQkFBZSxFQTlCVjtBQStCTEMsZUFBUztBQS9CSixLLFNBaUNQQyxPLEdBQVU7QUFDUkMsa0JBRFEsd0JBQ01DLEtBRE4sRUFDYWhCLElBRGIsRUFDbUI7QUFDekIsYUFBS0UsT0FBTCxHQUFlYyxLQUFmO0FBQ0EsYUFBS2IsU0FBTCxHQUFpQkgsSUFBakI7QUFDQSxhQUFLaUIsUUFBTDtBQUNELE9BTE87QUFNUkMsY0FOUSxvQkFNRUMsRUFORixFQU1NO0FBQ1osdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxzQkFBc0JGO0FBRGIsU0FBaEI7QUFHRCxPQVZPO0FBV1JHLFlBWFEsa0JBV0FILEVBWEEsRUFXSTtBQUFBOztBQUNWLHVCQUFLSSxTQUFMLENBQWU7QUFDYnhCLGlCQUFPLElBRE07QUFFYnlCLG1CQUFTLFFBRkk7QUFHYkMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLHFCQUFLQyxXQUFMLENBQWlCVCxFQUFqQixFQUFxQixZQUFNO0FBQ3pCLHVCQUFLRixRQUFMO0FBQ0QsZUFGRDtBQUdEO0FBQ0Y7QUFUWSxTQUFmO0FBV0QsT0F2Qk87QUF3QlJZLGVBeEJRLHFCQXdCR1YsRUF4QkgsRUF3Qk87QUFDYix1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLDZCQUE2QkY7QUFEcEIsU0FBaEI7QUFHRCxPQTVCTztBQTZCUlcsZ0JBN0JRLHNCQTZCSVgsRUE3QkosRUE2QlFZLE1BN0JSLEVBNkJnQjtBQUN0Qix1QkFBS1gsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLG9CQUFvQkYsRUFBcEIsR0FBeUIsVUFBekIsR0FBc0NZO0FBRDdCLFNBQWhCO0FBR0QsT0FqQ087QUFrQ1JDLGdCQWxDUSxzQkFrQ0liLEVBbENKLEVBa0NRO0FBQ2RjLGdCQUFRQyxHQUFSLENBQVlmLEVBQVo7QUFDQSxhQUFLTixPQUFMLEdBQWVNLEVBQWY7QUFDRCxPQXJDTztBQXNDUmdCLFdBdENRLGlCQXNDRGhCLEVBdENDLEVBc0NHO0FBQUE7O0FBQ1QsWUFBSSxLQUFLWCxPQUFULEVBQWtCO0FBQ2hCLGVBQUtYLEtBQUwsR0FBYSxLQUFLSCxPQUFMLENBQWEwQyxRQUFiLEVBQWI7QUFDQSxjQUFJeEMsT0FBTztBQUNUQyxtQkFBTyxLQUFLQSxLQURIO0FBRVRnQixxQkFBU00sRUFGQTtBQUdUa0IscUJBQVM7QUFIQSxXQUFYO0FBS0EsZUFBSzNDLE9BQUwsQ0FBYTRDLFdBQWIsQ0FBeUJDLFVBQXpCLENBQW9DM0MsSUFBcEMsRUFBMEM0QyxJQUExQyxDQUErQyxVQUFDZCxHQUFELEVBQVM7QUFDdERPLG9CQUFRQyxHQUFSLENBQVlSLEdBQVo7QUFDQSxnQkFBSUEsSUFBSTlCLElBQUosQ0FBUzZDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsa0JBQUk3QyxPQUFPOEIsSUFBSTlCLElBQUosQ0FBU0EsSUFBcEI7QUFDQSxrQkFBSThDLFlBQVk5QyxLQUFLK0MsU0FBTCxDQUFlQyxRQUFmLEVBQWhCO0FBQ0Esa0JBQUlDLFdBQVdqRCxLQUFLa0QsUUFBcEI7QUFDQSxrQkFBSUMsV0FBVyxlQUFlbkQsS0FBS21ELFFBQW5DO0FBQ0Esa0JBQUlDLFdBQVc7QUFDYix5QkFBUyxvQkFESTtBQUViLDZCQUFhTixTQUZBO0FBR2IsNEJBQVlHLFFBSEM7QUFJYiwyQkFBV0UsUUFKRTtBQUtiLDRCQUFZO0FBTEMsZUFBZjtBQU9BLGtCQUFJRSxPQUFPLE9BQUt2RCxPQUFMLENBQWE0QyxXQUFiLENBQXlCWSxVQUF6QixDQUFvQ0YsUUFBcEMsQ0FBWDtBQUNBLDZCQUFLRyxjQUFMLENBQW9CO0FBQ2xCLDZCQUFhVCxTQURLO0FBRWxCLDRCQUFZRyxRQUZNO0FBR2xCLDJCQUFXRSxRQUhPO0FBSWxCLDRCQUFZLEtBSk07QUFLbEIsMkJBQVdFLElBTE87QUFNbEIsMkJBQVcsaUJBQUN2QixHQUFELEVBQVM7QUFDbEIsc0JBQUlBLElBQUkwQixNQUFKLEtBQWUsbUJBQW5CLEVBQXdDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQUtsRCxPQUFMLEdBQWUsQ0FBZjtBQUNBLDJCQUFLQyxTQUFMLEdBQWlCLGFBQWpCO0FBQ0EsMkJBQUtjLFFBQUw7QUFDRCxtQkFSRCxNQVFPLElBQUlTLElBQUkwQixNQUFKLEtBQWUsdUJBQW5CLEVBQTRDO0FBQ2pEO0FBQ0EsMkJBQUsxRCxPQUFMLENBQWEyRCxPQUFiO0FBQ0Q7QUFDRixpQkFuQmlCO0FBb0JsQix3QkFBUSxjQUFDM0IsR0FBRCxFQUFTO0FBQ2YseUJBQUtoQyxPQUFMLENBQWEyRCxPQUFiO0FBQ0QsaUJBdEJpQjtBQXVCbEIsNEJBQVksa0JBQUMzQixHQUFELEVBQVM7QUFDbkIseUJBQUtsQixPQUFMLEdBQWUsSUFBZjtBQUNEO0FBekJpQixlQUFwQjtBQTJCRCxhQXhDRCxNQXdDTztBQUNMLHFCQUFLZCxPQUFMLENBQWEyRCxPQUFiO0FBQ0Q7QUFDRixXQTdDRCxFQTZDR0MsS0E3Q0gsQ0E2Q1MsWUFBTTtBQUNiLG1CQUFLNUQsT0FBTCxDQUFhMkQsT0FBYjtBQUNELFdBL0NEO0FBZ0REO0FBQ0QsYUFBSzdDLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFoR08sSzs7Ozs7NkJBa0dBK0MsRSxFQUFJO0FBQ1osV0FBS2xELE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS2xCLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxXQUFLcUUsU0FBTCxDQUFlRCxFQUFmO0FBQ0Q7Ozs4QkFDVUEsRSxFQUFJO0FBQUE7O0FBQ2IsV0FBSzdELE9BQUwsQ0FBYStELFdBQWI7QUFDQSxXQUFLNUQsS0FBTCxHQUFhLEtBQUtILE9BQUwsQ0FBYTBDLFFBQWIsRUFBYjtBQUNBLFdBQUs3QixTQUFMLEdBQWlCLElBQWpCO0FBQ0EsVUFBSW1ELFFBQVEsSUFBWjtBQUNBLFVBQUk5RCxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUTyxrQkFBVSxLQUFLQSxRQUZOO0FBR1RDLGlCQUFTLEtBQUtBLE9BSEw7QUFJVDBCLGdCQUFRLEtBQUs1QjtBQUpKLE9BQVg7QUFNQSxXQUFLVCxPQUFMLENBQWE0QyxXQUFiLENBQXlCcUIsY0FBekIsQ0FBd0MvRCxJQUF4QyxFQUE4QzRDLElBQTlDLENBQW1ELFVBQUNkLEdBQUQsRUFBUztBQUMxRE8sZ0JBQVFDLEdBQVIsQ0FBWVIsR0FBWjtBQUNBZ0MsY0FBTW5ELFNBQU4sR0FBa0IsS0FBbEI7QUFDQW1ELGNBQU1oRSxPQUFOLENBQWNrRSxXQUFkO0FBQ0EsWUFBSWxDLElBQUk5QixJQUFKLENBQVM2QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUk3QyxPQUFPOEIsSUFBSTlCLElBQUosQ0FBU0EsSUFBcEI7QUFDQThELGdCQUFNcEQsWUFBTixHQUFxQlYsS0FBS1UsWUFBMUI7QUFDQVYsZUFBS2lFLE1BQUwsQ0FBWUMsT0FBWixDQUFvQixVQUFDQyxJQUFELEVBQVU7QUFDNUIsZ0JBQUlDLE1BQU0sRUFBVjtBQUNBQSxnQkFBSTdDLEVBQUosR0FBUzRDLEtBQUs1QyxFQUFkO0FBQ0E2QyxnQkFBSWpFLEtBQUosR0FBWWdFLEtBQUtFLE1BQWpCO0FBQ0FELGdCQUFJRSxHQUFKLEdBQVVILEtBQUtHLEdBQWY7QUFDQUYsZ0JBQUlHLE9BQUosR0FBY0osS0FBS0ksT0FBbkI7QUFDQUgsZ0JBQUlqQyxNQUFKLEdBQWFnQyxLQUFLaEMsTUFBbEI7QUFDQWlDLGdCQUFJSSxPQUFKLEdBQWNMLEtBQUtNLGFBQW5CO0FBQ0FMLGdCQUFJTSxTQUFKLEdBQWdCWixNQUFNekQsV0FBTixDQUFrQjhELEtBQUtoQyxNQUF2QixDQUFoQjtBQUNBaUMsZ0JBQUlPLEtBQUosR0FBWVIsS0FBS1MsYUFBTCxDQUFtQmhGLE1BQS9CO0FBQ0F3RSxnQkFBSVMsV0FBSixHQUFrQmYsTUFBTWdCLFNBQU4sQ0FBZ0JYLEtBQUtTLGFBQXJCLENBQWxCO0FBQ0FkLGtCQUFNdkUsU0FBTixDQUFnQndGLElBQWhCLENBQXFCWCxHQUFyQjtBQUNELFdBWkQ7QUFhQVQsZ0JBQU1BLElBQU47QUFDRCxTQWpCRCxNQWlCTztBQUNMLGNBQUlHLE1BQU1oRSxPQUFOLENBQWNrRixTQUFsQixFQUE2QjtBQUMzQmxCLGtCQUFNN0QsS0FBTixHQUFjLE9BQUtILE9BQUwsQ0FBYTBDLFFBQWIsQ0FBc0JWLElBQUk5QixJQUFKLENBQVM2QyxLQUEvQixDQUFkO0FBQ0FpQixrQkFBTUYsU0FBTixDQUFnQkQsRUFBaEI7QUFDRDtBQUNGO0FBQ0RHLGNBQU1tQixNQUFOO0FBQ0QsT0E1QkQsRUE0Qkd2QixLQTVCSCxDQTRCUyxZQUFNO0FBQ2JJLGNBQU1oRSxPQUFOLENBQWNrRSxXQUFkO0FBQ0FGLGNBQU1uRCxTQUFOLEdBQWtCLEtBQWxCO0FBQ0FtRCxjQUFNaEUsT0FBTixDQUFjb0YsUUFBZDtBQUNELE9BaENEO0FBaUNEOzs7OEJBQ1VDLE0sRUFBUTtBQUNqQixVQUFJQyxRQUFRLEVBQVo7QUFDQUQsYUFBT2pCLE9BQVAsQ0FBZSxVQUFDQyxJQUFELEVBQVU7QUFDdkIsWUFBSUMsTUFBTSxFQUFWO0FBQ0FBLFlBQUlpQixJQUFKLEdBQVdsQixLQUFLbUIsS0FBaEI7QUFDQWxCLFlBQUlqRSxLQUFKLEdBQVlnRSxLQUFLb0IsV0FBakI7QUFDQW5CLFlBQUlvQixLQUFKLEdBQVlyQixLQUFLc0IsV0FBakI7QUFDQXJCLFlBQUlzQixRQUFKLEdBQWV2QixLQUFLcUIsS0FBcEI7QUFDQXBCLFlBQUk3QyxFQUFKLEdBQVM0QyxLQUFLd0IsU0FBZDtBQUNBdkIsWUFBSXdCLFVBQUosR0FBaUJ6QixLQUFLMEIsYUFBdEI7QUFDQXpCLFlBQUkwQixRQUFKLEdBQWUzQixLQUFLNEIsV0FBcEI7QUFDQTNCLFlBQUk0QixNQUFKLEdBQWE3QixLQUFLaEUsS0FBTCxHQUFhLEdBQWIsR0FBbUJnRSxLQUFLOEIsV0FBckM7QUFDQTdCLFlBQUlPLEtBQUosR0FBWVIsS0FBSzhCLFdBQWpCO0FBQ0E3QixZQUFJOEIsT0FBSixHQUFjLEtBQWQ7QUFDQTlCLFlBQUkrQixVQUFKLEdBQWlCaEMsS0FBS2lDLFNBQXRCO0FBQ0FoQixjQUFNTCxJQUFOLENBQVdYLEdBQVg7QUFDRCxPQWREO0FBZUEsYUFBT2dCLEtBQVA7QUFDRDs7O2dDQUNZN0QsRSxFQUFJb0MsRSxFQUFJO0FBQUE7O0FBQ25CLFdBQUsxRCxLQUFMLEdBQWEsS0FBS0gsT0FBTCxDQUFhMEMsUUFBYixFQUFiO0FBQ0EsVUFBSXNCLFFBQVEsSUFBWjtBQUNBLFVBQUk5RCxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUZ0IsaUJBQVNNO0FBRkEsT0FBWDtBQUlBLFdBQUt6QixPQUFMLENBQWE0QyxXQUFiLENBQXlCMkQsV0FBekIsQ0FBcUNyRyxJQUFyQyxFQUEyQzRDLElBQTNDLENBQWdELFVBQUNkLEdBQUQsRUFBUztBQUN2RE8sZ0JBQVFDLEdBQVIsQ0FBWVIsR0FBWjtBQUNBLFlBQUlBLElBQUk5QixJQUFKLENBQVM2QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCYyxnQkFBTUEsSUFBTjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUlHLE1BQU1oRSxPQUFOLENBQWNrRixTQUFsQixFQUE2QjtBQUMzQmxCLGtCQUFNN0QsS0FBTixHQUFjLE9BQUtILE9BQUwsQ0FBYTBDLFFBQWIsQ0FBc0JWLElBQUk5QixJQUFKLENBQVM2QyxLQUEvQixDQUFkO0FBQ0Q7QUFDRjtBQUNGLE9BVEQ7QUFVRDs7O29DQUNnQjtBQUNmO0FBQ0EsVUFBSSxLQUFLcEMsT0FBTCxHQUFlLEtBQUtDLFlBQXhCLEVBQXNDO0FBQ3BDO0FBQ0EsYUFBS0QsT0FBTDtBQUNBLGFBQUttRCxTQUFMO0FBQ0Q7QUFDRjs7OzJCQUNPMEMsSyxFQUFPO0FBQUE7O0FBQ2IsVUFBSUEsTUFBTS9GLFNBQVYsRUFBcUI7QUFDbkIsYUFBS0EsU0FBTCxHQUFpQitGLE1BQU0vRixTQUF2QjtBQUNBLGFBQUtMLE9BQUwsQ0FBYWdFLE9BQWIsQ0FBcUIsVUFBQ0MsSUFBRCxFQUFPL0MsS0FBUCxFQUFpQjtBQUNwQyxjQUFJK0MsS0FBSy9ELElBQUwsS0FBY2tHLE1BQU0vRixTQUF4QixFQUFtQztBQUNqQyxtQkFBS0QsT0FBTCxHQUFlYyxLQUFmO0FBQ0Q7QUFDRixTQUpEO0FBS0QsT0FQRCxNQU9PO0FBQ0wsYUFBS2QsT0FBTCxHQUFlLENBQWY7QUFDRDtBQUNELFdBQUsyRSxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUFBOztBQUNSLFdBQUs1RCxRQUFMLENBQWMsWUFBTTtBQUNsQixlQUFLUixTQUFMLEdBQWlCLE9BQUtmLE9BQUwsQ0FBYXlHLFdBQWIsRUFBakI7QUFDQSxlQUFLekYsTUFBTCxHQUFjLE9BQUtoQixPQUFMLENBQWEwRyxhQUFiLEVBQWQ7QUFDQSxlQUFLekYsaUJBQUwsR0FBeUIsT0FBS2pCLE9BQUwsQ0FBYTJHLFVBQWIsRUFBekI7QUFDQSxlQUFLekYsYUFBTCxHQUFxQixPQUFLbEIsT0FBTCxDQUFhNEcsV0FBYixDQUF5QixPQUF6QixFQUFrQyxJQUFsQyxFQUF3QyxPQUFLekYsT0FBN0MsQ0FBckI7QUFDRCxPQUxEO0FBTUQ7Ozs7RUFsUmdDLGVBQUswRixJOztrQkFBbkIzSCxLIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJMaXN0XCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3QsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIG1lbnVMaXN0OiBNZW51XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXJMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFja2FnZTogW3tcbiAgICAgICAgdGl0bGU6ICflhajpg6gnLFxuICAgICAgICB0eXBlOiAnYWxsJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heaUr+S7mCcsXG4gICAgICAgIHR5cGU6ICd1bnBhaWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5Y+R6LSnJyxcbiAgICAgICAgdHlwZTogJ3VuZGVsaXZlcmVkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heaUtui0pycsXG4gICAgICAgIHR5cGU6ICd1bnJlY2VpcHRlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllK7lkI4nLFxuICAgICAgICB0eXBlOiAncmVmdW5kaW5nJ1xuICAgICAgfV0sXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICflt7LlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIGN1cnJlbnQ6IG51bGwsXG4gICAgICBvcmRlclR5cGU6ICdhbGwnLFxuICAgICAgb3JkZXJMaXN0OiBbXSxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG5vdGVfaW5mb19zdHI6ICcnLFxuICAgICAgb3JkZXJJZDogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoZWNrUGFja2FnZSAoaW5kZXgsIHR5cGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSB0eXBlXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXJEZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2FuY2VsIChpZCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTlj5bmtojorqLljZUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLmNhbmNlbE9yZGVyKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1vcmRlciZpZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0xvZ2lzdGljIChpZCwgc3RhdHVzKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpc3RpY2E/aWQ9JyArIGlkICsgJyZzdGF0dXM9JyArIHN0YXR1c1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdldE9yZGVySWQgKGlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICB0aGlzLm9yZGVySWQgPSBpZFxuICAgICAgfSxcbiAgICAgIGdvUGF5IChpZCkge1xuICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIG9yZGVySWQ6IGlkLFxuICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5QYXlTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAvLyAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IDJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlclR5cGUgPSAndW5kZWxpdmVyZWQnXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhIChjYikge1xuICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgdGhpcy5vcmRlckxpc3QgPSBbXVxuICAgICAgdGhpcy5pbml0T3JkZXIoY2IpXG4gICAgfVxuICAgIGluaXRPcmRlciAoY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzdGF0dXM6IHRoaXMub3JkZXJUeXBlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJTdGF0dXMoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnNob3dJZFxuICAgICAgICAgICAgb2JqLnBheSA9IGl0ZW0ucGF5XG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnN0YXR1cyA9IGl0ZW0uc3RhdHVzXG4gICAgICAgICAgICBvYmoubmVlZEFkZCA9IGl0ZW0uaXNOZWVkQWRkcmVzc1xuICAgICAgICAgICAgb2JqLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2l0ZW0uc3RhdHVzXVxuICAgICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdSZWNvcmRzLmxlbmd0aFxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdE9yZGVyKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoaWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS5vcmRlclR5cGUpIHtcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBwYXJhbS5vcmRlclR5cGVcbiAgICAgICAgdGhpcy5wYWNrYWdlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gcGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB0aGlzLm5pY2tfbmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgICB0aGlzLmN1c3RvbWVyX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoKVxuICAgICAgICB0aGlzLm5vdGVfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+iuouWNleWIl+ihqOmhtScsIG51bGwsIHRoaXMub3JkZXJJZClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=