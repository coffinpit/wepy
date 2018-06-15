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
        _this8.customer_info_str = _this8.$parent.getMessage('订单列表页', '');
      });
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJvcmRlcklkIiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4IiwiaW5pdERhdGEiLCJnb0RldGFpbCIsImlkIiwibmF2aWdhdGVUbyIsInVybCIsImNhbmNlbCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbE9yZGVyIiwiZ29BZGRyZXNzIiwiZ29Mb2dpc3RpYyIsInN0YXR1cyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRpbWVTdGFtcCIsInRpbWVzdGFtcCIsInRvU3RyaW5nIiwibm9uY2VTdHIiLCJub25jZXN0ciIsInByZXBheWlkIiwic2lnbkRhdGEiLCJzaWduIiwiZ2V0UGF5U2lnbiIsInJlcXVlc3RQYXltZW50IiwiZXJyTXNnIiwic3dpdGNoVGFiIiwicGF5RmFpbCIsImNhdGNoIiwiY2IiLCJpbml0T3JkZXIiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0T3JkZXJTdGF0dXMiLCJoaWRlTG9hZGluZyIsIm9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwic2hvd0lkIiwicGF5IiwiZnJlaWdodCIsIm5lZWRBZGQiLCJpc05lZWRBZGRyZXNzIiwic3RhdHVzVHh0IiwiY291bnQiLCJidXlpbmdSZWNvcmRzIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwibWlzc1Rva2VuIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiZGV0YWlsIiwiYnV5aW5nQ291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsIkNhbmNlbE9yZGVyIiwicGFyYW0iLCJnZXRVc2VyTmFtZSIsImdldFVzZXJBdmF0YXIiLCJnZXRNZXNzYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7dUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQWIsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLEtBQWxFLEVBQWhCLEVBQXlGLHlCQUF3QixFQUFDLFNBQVEsa0JBQVQsRUFBNEIsT0FBTSxXQUFsQyxFQUE4QyxRQUFPLE1BQXJELEVBQTRELFNBQVEsT0FBcEUsRUFBNEUsT0FBTSxLQUFsRixFQUFqSCxFQUEwTSx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxXQUEzQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUFsTyxFQUFiLEVBQWtVLFVBQVMsRUFBQyxRQUFPLEdBQVIsRUFBM1UsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkMsb0NBRFE7QUFFUkMsOEJBRlE7QUFHUkM7QUFIUSxLLFNBS1ZDLFEsR0FBVztBQUNUQyxZQURTLG9CQUNDO0FBQ1IsWUFBSSxLQUFLSixTQUFMLENBQWVLLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUM7QUFDL0IsaUJBQU8sSUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVEMsZUFSUyx1QkFRSTtBQUNYLFlBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxpQkFBTyxLQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUNsRCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQWRRLEssU0FnQlhHLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsZUFBUyxDQUFDO0FBQ1JDLGVBQU8sSUFEQztBQUVSQyxjQUFNO0FBRkUsT0FBRCxFQUdOO0FBQ0RELGVBQU8sS0FETjtBQUVEQyxjQUFNO0FBRkwsT0FITSxFQU1OO0FBQ0RELGVBQU8sS0FETjtBQUVEQyxjQUFNO0FBRkwsT0FOTSxFQVNOO0FBQ0RELGVBQU8sS0FETjtBQUVEQyxjQUFNO0FBRkwsT0FUTSxFQVlOO0FBQ0RELGVBQU8sSUFETjtBQUVEQyxjQUFNO0FBRkwsT0FaTSxDQUZKO0FBa0JMQyxtQkFBYSxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixLQUFyQixFQUE0QixLQUE1QixFQUFtQyxLQUFuQyxFQUEwQyxNQUExQyxDQWxCUjtBQW1CTEMsZUFBUyxJQW5CSjtBQW9CTEMsaUJBQVcsS0FwQk47QUFxQkxoQixpQkFBVyxFQXJCTjtBQXNCTGlCLGdCQUFVLENBdEJMO0FBdUJMQyxlQUFTLENBdkJKO0FBd0JMQyxvQkFBYyxDQXhCVDtBQXlCTEMsaUJBQVcsSUF6Qk47QUEwQkxDLGVBQVMsSUExQko7QUEyQkxDLGlCQUFXLEVBM0JOO0FBNEJMQyxjQUFRLEVBNUJIO0FBNkJMQyx5QkFBbUIsRUE3QmQ7QUE4QkxDLGVBQVM7QUE5QkosSyxTQWdDUEMsTyxHQUFVO0FBQ1JDLGtCQURRLHdCQUNNQyxLQUROLEVBQ2FmLElBRGIsRUFDbUI7QUFDekIsYUFBS0UsT0FBTCxHQUFlYSxLQUFmO0FBQ0EsYUFBS1osU0FBTCxHQUFpQkgsSUFBakI7QUFDQSxhQUFLZ0IsUUFBTDtBQUNELE9BTE87QUFNUkMsY0FOUSxvQkFNRUMsRUFORixFQU1NO0FBQ1osdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxzQkFBc0JGO0FBRGIsU0FBaEI7QUFHRCxPQVZPO0FBV1JHLFlBWFEsa0JBV0FILEVBWEEsRUFXSTtBQUFBOztBQUNWLHVCQUFLSSxTQUFMLENBQWU7QUFDYnZCLGlCQUFPLElBRE07QUFFYndCLG1CQUFTLFFBRkk7QUFHYkMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLHFCQUFLQyxXQUFMLENBQWlCVCxFQUFqQixFQUFxQixZQUFNO0FBQ3pCLHVCQUFLRixRQUFMO0FBQ0QsZUFGRDtBQUdEO0FBQ0Y7QUFUWSxTQUFmO0FBV0QsT0F2Qk87QUF3QlJZLGVBeEJRLHFCQXdCR1YsRUF4QkgsRUF3Qk87QUFDYix1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLDZCQUE2QkY7QUFEcEIsU0FBaEI7QUFHRCxPQTVCTztBQTZCUlcsZ0JBN0JRLHNCQTZCSVgsRUE3QkosRUE2QlFZLE1BN0JSLEVBNkJnQjtBQUN0Qix1QkFBS1gsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLG9CQUFvQkYsRUFBcEIsR0FBeUIsVUFBekIsR0FBc0NZO0FBRDdCLFNBQWhCO0FBR0QsT0FqQ087QUFrQ1JDLFdBbENRLGlCQWtDRGIsRUFsQ0MsRUFrQ0c7QUFBQTs7QUFDVCxZQUFJLEtBQUtWLE9BQVQsRUFBa0I7QUFDaEIsZUFBS1gsS0FBTCxHQUFhLEtBQUtILE9BQUwsQ0FBYXNDLFFBQWIsRUFBYjtBQUNBLGNBQUlwQyxPQUFPO0FBQ1RDLG1CQUFPLEtBQUtBLEtBREg7QUFFVGUscUJBQVNNLEVBRkE7QUFHVGUscUJBQVM7QUFIQSxXQUFYO0FBS0EsZUFBS3ZDLE9BQUwsQ0FBYXdDLFdBQWIsQ0FBeUJDLFVBQXpCLENBQW9DdkMsSUFBcEMsRUFBMEN3QyxJQUExQyxDQUErQyxVQUFDWCxHQUFELEVBQVM7QUFDdERZLG9CQUFRQyxHQUFSLENBQVliLEdBQVo7QUFDQSxnQkFBSUEsSUFBSTdCLElBQUosQ0FBUzJDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsa0JBQUkzQyxPQUFPNkIsSUFBSTdCLElBQUosQ0FBU0EsSUFBcEI7QUFDQSxrQkFBSTRDLFlBQVk1QyxLQUFLNkMsU0FBTCxDQUFlQyxRQUFmLEVBQWhCO0FBQ0Esa0JBQUlDLFdBQVcvQyxLQUFLZ0QsUUFBcEI7QUFDQSxrQkFBSUMsV0FBVyxlQUFlakQsS0FBS2lELFFBQW5DO0FBQ0Esa0JBQUlDLFdBQVc7QUFDYix5QkFBUyxvQkFESTtBQUViLDZCQUFhTixTQUZBO0FBR2IsNEJBQVlHLFFBSEM7QUFJYiwyQkFBV0UsUUFKRTtBQUtiLDRCQUFZO0FBTEMsZUFBZjtBQU9BLGtCQUFJRSxPQUFPLE9BQUtyRCxPQUFMLENBQWF3QyxXQUFiLENBQXlCYyxVQUF6QixDQUFvQ0YsUUFBcEMsQ0FBWDtBQUNBLDZCQUFLRyxjQUFMLENBQW9CO0FBQ2xCLDZCQUFhVCxTQURLO0FBRWxCLDRCQUFZRyxRQUZNO0FBR2xCLDJCQUFXRSxRQUhPO0FBSWxCLDRCQUFZLEtBSk07QUFLbEIsMkJBQVdFLElBTE87QUFNbEIsMkJBQVcsaUJBQUN0QixHQUFELEVBQVM7QUFDbEIsc0JBQUlBLElBQUl5QixNQUFKLEtBQWUsbUJBQW5CLEVBQXdDO0FBQ3RDO0FBQ0EsbUNBQUtDLFNBQUwsQ0FBZTtBQUNiL0IsMkJBQUs7QUFEUSxxQkFBZjtBQUdELG1CQUxELE1BS08sSUFBSUssSUFBSXlCLE1BQUosS0FBZSx1QkFBbkIsRUFBNEM7QUFDakQ7QUFDQSwyQkFBS3hELE9BQUwsQ0FBYTBELE9BQWI7QUFDRDtBQUNGLGlCQWhCaUI7QUFpQmxCLHdCQUFRLGNBQUMzQixHQUFELEVBQVM7QUFDZix5QkFBSy9CLE9BQUwsQ0FBYTBELE9BQWI7QUFDRCxpQkFuQmlCO0FBb0JsQiw0QkFBWSxrQkFBQzNCLEdBQUQsRUFBUztBQUNuQix5QkFBS2pCLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUF0QmlCLGVBQXBCO0FBd0JELGFBckNELE1BcUNPO0FBQ0wscUJBQUtkLE9BQUwsQ0FBYTBELE9BQWI7QUFDRDtBQUNGLFdBMUNELEVBMENHQyxLQTFDSCxDQTBDUyxZQUFNO0FBQ2IsbUJBQUszRCxPQUFMLENBQWEwRCxPQUFiO0FBQ0QsV0E1Q0Q7QUE2Q0Q7QUFDRCxhQUFLNUMsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQXpGTyxLOzs7Ozs2QkEyRkE4QyxFLEVBQUk7QUFDWixXQUFLakQsT0FBTCxHQUFlLENBQWY7QUFDQSxXQUFLbEIsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFdBQUtvRSxTQUFMLENBQWVELEVBQWY7QUFDRDs7OzhCQUNVQSxFLEVBQUk7QUFBQTs7QUFDYixXQUFLNUQsT0FBTCxDQUFhOEQsV0FBYjtBQUNBLFdBQUszRCxLQUFMLEdBQWEsS0FBS0gsT0FBTCxDQUFhc0MsUUFBYixFQUFiO0FBQ0EsV0FBS3pCLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxVQUFJa0QsUUFBUSxJQUFaO0FBQ0EsVUFBSTdELE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVRPLGtCQUFVLEtBQUtBLFFBRk47QUFHVEMsaUJBQVMsS0FBS0EsT0FITDtBQUlUeUIsZ0JBQVEsS0FBSzNCO0FBSkosT0FBWDtBQU1BLFdBQUtULE9BQUwsQ0FBYXdDLFdBQWIsQ0FBeUJ3QixjQUF6QixDQUF3QzlELElBQXhDLEVBQThDd0MsSUFBOUMsQ0FBbUQsVUFBQ1gsR0FBRCxFQUFTO0FBQzFEWSxnQkFBUUMsR0FBUixDQUFZYixHQUFaO0FBQ0FnQyxjQUFNbEQsU0FBTixHQUFrQixLQUFsQjtBQUNBa0QsY0FBTS9ELE9BQU4sQ0FBY2lFLFdBQWQ7QUFDQSxZQUFJbEMsSUFBSTdCLElBQUosQ0FBUzJDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsY0FBSTNDLE9BQU82QixJQUFJN0IsSUFBSixDQUFTQSxJQUFwQjtBQUNBNkQsZ0JBQU1uRCxZQUFOLEdBQXFCVixLQUFLVSxZQUExQjtBQUNBVixlQUFLZ0UsTUFBTCxDQUFZQyxPQUFaLENBQW9CLFVBQUNDLElBQUQsRUFBVTtBQUM1QixnQkFBSUMsTUFBTSxFQUFWO0FBQ0FBLGdCQUFJN0MsRUFBSixHQUFTNEMsS0FBSzVDLEVBQWQ7QUFDQTZDLGdCQUFJaEUsS0FBSixHQUFZK0QsS0FBS0UsTUFBakI7QUFDQUQsZ0JBQUlFLEdBQUosR0FBVUgsS0FBS0csR0FBZjtBQUNBRixnQkFBSUcsT0FBSixHQUFjSixLQUFLSSxPQUFuQjtBQUNBSCxnQkFBSWpDLE1BQUosR0FBYWdDLEtBQUtoQyxNQUFsQjtBQUNBaUMsZ0JBQUlJLE9BQUosR0FBY0wsS0FBS00sYUFBbkI7QUFDQUwsZ0JBQUlNLFNBQUosR0FBZ0JaLE1BQU14RCxXQUFOLENBQWtCNkQsS0FBS2hDLE1BQXZCLENBQWhCO0FBQ0FpQyxnQkFBSU8sS0FBSixHQUFZUixLQUFLUyxhQUFMLENBQW1CL0UsTUFBL0I7QUFDQXVFLGdCQUFJUyxXQUFKLEdBQWtCZixNQUFNZ0IsU0FBTixDQUFnQlgsS0FBS1MsYUFBckIsQ0FBbEI7QUFDQWQsa0JBQU10RSxTQUFOLENBQWdCdUYsSUFBaEIsQ0FBcUJYLEdBQXJCO0FBQ0QsV0FaRDtBQWFBVCxnQkFBTUEsSUFBTjtBQUNELFNBakJELE1BaUJPO0FBQ0wsY0FBSUcsTUFBTS9ELE9BQU4sQ0FBY2lGLFNBQWxCLEVBQTZCO0FBQzNCbEIsa0JBQU01RCxLQUFOLEdBQWMsT0FBS0gsT0FBTCxDQUFhc0MsUUFBYixDQUFzQlAsSUFBSTdCLElBQUosQ0FBUzJDLEtBQS9CLENBQWQ7QUFDQWtCLGtCQUFNRixTQUFOLENBQWdCRCxFQUFoQjtBQUNEO0FBQ0Y7QUFDREcsY0FBTW1CLE1BQU47QUFDRCxPQTVCRCxFQTRCR3ZCLEtBNUJILENBNEJTLFlBQU07QUFDYkksY0FBTS9ELE9BQU4sQ0FBY2lFLFdBQWQ7QUFDQUYsY0FBTWxELFNBQU4sR0FBa0IsS0FBbEI7QUFDQWtELGNBQU0vRCxPQUFOLENBQWNtRixRQUFkO0FBQ0QsT0FoQ0Q7QUFpQ0Q7Ozs4QkFDVUMsTSxFQUFRO0FBQ2pCLFVBQUlDLFFBQVEsRUFBWjtBQUNBRCxhQUFPakIsT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN2QixZQUFJQyxNQUFNLEVBQVY7QUFDQUEsWUFBSWlCLElBQUosR0FBV2xCLEtBQUttQixLQUFoQjtBQUNBbEIsWUFBSWhFLEtBQUosR0FBWStELEtBQUtvQixXQUFqQjtBQUNBbkIsWUFBSW9CLEtBQUosR0FBWXJCLEtBQUtzQixXQUFqQjtBQUNBckIsWUFBSXNCLFFBQUosR0FBZXZCLEtBQUtxQixLQUFwQjtBQUNBcEIsWUFBSTdDLEVBQUosR0FBUzRDLEtBQUt3QixTQUFkO0FBQ0F2QixZQUFJd0IsVUFBSixHQUFpQnpCLEtBQUswQixhQUF0QjtBQUNBekIsWUFBSTBCLFFBQUosR0FBZTNCLEtBQUs0QixXQUFwQjtBQUNBM0IsWUFBSTRCLE1BQUosR0FBYTdCLEtBQUsvRCxLQUFMLEdBQWEsR0FBYixHQUFtQitELEtBQUs4QixXQUFyQztBQUNBN0IsWUFBSU8sS0FBSixHQUFZUixLQUFLOEIsV0FBakI7QUFDQTdCLFlBQUk4QixPQUFKLEdBQWMsS0FBZDtBQUNBOUIsWUFBSStCLFVBQUosR0FBaUJoQyxLQUFLaUMsU0FBdEI7QUFDQWhCLGNBQU1MLElBQU4sQ0FBV1gsR0FBWDtBQUNELE9BZEQ7QUFlQSxhQUFPZ0IsS0FBUDtBQUNEOzs7Z0NBQ1k3RCxFLEVBQUlvQyxFLEVBQUk7QUFBQTs7QUFDbkIsV0FBS3pELEtBQUwsR0FBYSxLQUFLSCxPQUFMLENBQWFzQyxRQUFiLEVBQWI7QUFDQSxVQUFJeUIsUUFBUSxJQUFaO0FBQ0EsVUFBSTdELE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVRlLGlCQUFTTTtBQUZBLE9BQVg7QUFJQSxXQUFLeEIsT0FBTCxDQUFhd0MsV0FBYixDQUF5QjhELFdBQXpCLENBQXFDcEcsSUFBckMsRUFBMkN3QyxJQUEzQyxDQUFnRCxVQUFDWCxHQUFELEVBQVM7QUFDdkRZLGdCQUFRQyxHQUFSLENBQVliLEdBQVo7QUFDQSxZQUFJQSxJQUFJN0IsSUFBSixDQUFTMkMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QmUsZ0JBQU1BLElBQU47QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJRyxNQUFNL0QsT0FBTixDQUFjaUYsU0FBbEIsRUFBNkI7QUFDM0JsQixrQkFBTTVELEtBQU4sR0FBYyxPQUFLSCxPQUFMLENBQWFzQyxRQUFiLENBQXNCUCxJQUFJN0IsSUFBSixDQUFTMkMsS0FBL0IsQ0FBZDtBQUNEO0FBQ0Y7QUFDRixPQVREO0FBVUQ7OztvQ0FDZ0I7QUFDZjtBQUNBLFVBQUksS0FBS2xDLE9BQUwsR0FBZSxLQUFLQyxZQUF4QixFQUFzQztBQUNwQztBQUNBLGFBQUtELE9BQUw7QUFDQSxhQUFLa0QsU0FBTDtBQUNEO0FBQ0Y7OzsyQkFDTzBDLEssRUFBTztBQUFBOztBQUNiLFVBQUlBLE1BQU05RixTQUFWLEVBQXFCO0FBQ25CLGFBQUtBLFNBQUwsR0FBaUI4RixNQUFNOUYsU0FBdkI7QUFDQSxhQUFLTCxPQUFMLENBQWErRCxPQUFiLENBQXFCLFVBQUNDLElBQUQsRUFBTy9DLEtBQVAsRUFBaUI7QUFDcEMsY0FBSStDLEtBQUs5RCxJQUFMLEtBQWNpRyxNQUFNOUYsU0FBeEIsRUFBbUM7QUFDakMsbUJBQUtELE9BQUwsR0FBZWEsS0FBZjtBQUNEO0FBQ0YsU0FKRDtBQUtELE9BUEQsTUFPTztBQUNMLGFBQUtiLE9BQUwsR0FBZSxDQUFmO0FBQ0Q7QUFDRCxXQUFLMEUsTUFBTDtBQUNEOzs7NkJBQ1M7QUFBQTs7QUFDUixXQUFLNUQsUUFBTCxDQUFjLFlBQU07QUFDbEIsZUFBS1AsU0FBTCxHQUFpQixPQUFLZixPQUFMLENBQWF3RyxXQUFiLEVBQWpCO0FBQ0EsZUFBS3hGLE1BQUwsR0FBYyxPQUFLaEIsT0FBTCxDQUFheUcsYUFBYixFQUFkO0FBQ0EsZUFBS3hGLGlCQUFMLEdBQXlCLE9BQUtqQixPQUFMLENBQWEwRyxVQUFiLENBQXdCLE9BQXhCLEVBQWlDLEVBQWpDLENBQXpCO0FBQ0QsT0FKRDtBQUtEOzs7O0VBelFnQyxlQUFLQyxJOztrQkFBbkJ6SCxLIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJMaXN0XCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3QsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIG1lbnVMaXN0OiBNZW51XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXJMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFja2FnZTogW3tcbiAgICAgICAgdGl0bGU6ICflhajpg6gnLFxuICAgICAgICB0eXBlOiAnYWxsJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heaUr+S7mCcsXG4gICAgICAgIHR5cGU6ICd1bnBhaWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5Y+R6LSnJyxcbiAgICAgICAgdHlwZTogJ3VuZGVsaXZlcmVkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heaUtui0pycsXG4gICAgICAgIHR5cGU6ICd1bnJlY2VpcHRlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllK7lkI4nLFxuICAgICAgICB0eXBlOiAncmVmdW5kaW5nJ1xuICAgICAgfV0sXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICflt7LlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIGN1cnJlbnQ6IG51bGwsXG4gICAgICBvcmRlclR5cGU6ICdhbGwnLFxuICAgICAgb3JkZXJMaXN0OiBbXSxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG9yZGVySWQ6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGVja1BhY2thZ2UgKGluZGV4LCB0eXBlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMub3JkZXJUeXBlID0gdHlwZVxuICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoaWQpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI6K6i5Y2VJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5jZWxPcmRlcihpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXImaWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Mb2dpc3RpYyAoaWQsIHN0YXR1cykge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbG9naXN0aWNhP2lkPScgKyBpZCArICcmc3RhdHVzPScgKyBzdGF0dXNcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBvcmRlcklkOiBpZCxcbiAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJ1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhIChjYikge1xuICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgdGhpcy5vcmRlckxpc3QgPSBbXVxuICAgICAgdGhpcy5pbml0T3JkZXIoY2IpXG4gICAgfVxuICAgIGluaXRPcmRlciAoY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzdGF0dXM6IHRoaXMub3JkZXJUeXBlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJTdGF0dXMoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5vcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnNob3dJZFxuICAgICAgICAgICAgb2JqLnBheSA9IGl0ZW0ucGF5XG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnN0YXR1cyA9IGl0ZW0uc3RhdHVzXG4gICAgICAgICAgICBvYmoubmVlZEFkZCA9IGl0ZW0uaXNOZWVkQWRkcmVzc1xuICAgICAgICAgICAgb2JqLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2l0ZW0uc3RhdHVzXVxuICAgICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdSZWNvcmRzLmxlbmd0aFxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdE9yZGVyKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoaWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS5vcmRlclR5cGUpIHtcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBwYXJhbS5vcmRlclR5cGVcbiAgICAgICAgdGhpcy5wYWNrYWdlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gcGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB0aGlzLm5pY2tfbmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgICB0aGlzLmN1c3RvbWVyX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoJ+iuouWNleWIl+ihqOmhtScsICcnKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==