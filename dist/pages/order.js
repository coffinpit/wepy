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
      isLoading: true
    }, _this2.methods = {
      checkPackage: function checkPackage(index, type) {
        this.current = index;
        this.orderType = type;
        this.initOrder();
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
                _this3.initOrder();
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
      goPay: function goPay(id) {
        var _this4 = this;

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
              'complete': function complete(res) {}
            });
          } else {
            _this4.$parent.payFail();
          }
        }).catch(function () {
          _this4.$parent.payFail();
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Order, [{
    key: 'initOrder',
    value: function initOrder() {
      var _this5 = this;

      this.$parent.showLoading();
      this.token = this.$parent.getToken();
      this.orderList = [];
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
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          data.orders.forEach(function (item) {
            var obj = {};
            obj.id = item.id;
            obj.title = item.showId;
            obj.pay = item.pay;
            obj.freight = item.freight;
            obj.status = item.status;
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
      this.initOrder();
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJtZXRob2RzIiwiY2hlY2tQYWNrYWdlIiwiaW5kZXgiLCJpbml0T3JkZXIiLCJnb0RldGFpbCIsImlkIiwibmF2aWdhdGVUbyIsInVybCIsImNhbmNlbCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbE9yZGVyIiwiZ29BZGRyZXNzIiwiZ29QYXkiLCJnZXRUb2tlbiIsIm9yZGVySWQiLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRpbWVTdGFtcCIsInRpbWVzdGFtcCIsInRvU3RyaW5nIiwibm9uY2VTdHIiLCJub25jZXN0ciIsInByZXBheWlkIiwic2lnbkRhdGEiLCJzaWduIiwiZ2V0UGF5U2lnbiIsInJlcXVlc3RQYXltZW50IiwiZXJyTXNnIiwic3dpdGNoVGFiIiwicGF5RmFpbCIsImNhdGNoIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsInN0YXR1cyIsIkdldE9yZGVyU3RhdHVzIiwic2hvd1N1Y2Nlc3MiLCJvcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInNob3dJZCIsInBheSIsImZyZWlnaHQiLCJzdGF0dXNUeHQiLCJjb3VudCIsImJ1eWluZ1JlY29yZHMiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJtaXNzVG9rZW4iLCIkYXBwbHkiLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiY2IiLCJDYW5jZWxPcmRlciIsInBhcmFtIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7dUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQWIsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLFdBQWxCLEVBQThCLFFBQU8sTUFBckMsRUFBNEMsU0FBUSxPQUFwRCxFQUE0RCxPQUFNLEtBQWxFLEVBQWhCLEVBQXlGLHlCQUF3QixFQUFDLFNBQVEsa0JBQVQsRUFBNEIsT0FBTSxXQUFsQyxFQUE4QyxRQUFPLE1BQXJELEVBQTRELFNBQVEsT0FBcEUsRUFBNEUsT0FBTSxLQUFsRixFQUFqSCxFQUEwTSx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxXQUEzQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUFsTyxFQUFiLEVBQWtVLFVBQVMsRUFBQyxRQUFPLEdBQVIsRUFBM1UsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFD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QWIsQ0FBcUIsVUFBQ0MsSUFBRCxFQUFPN0MsS0FBUCxFQUFpQjtBQUNwQyxjQUFJNkMsS0FBS3ZELElBQUwsS0FBY3lGLE1BQU10RixTQUF4QixFQUFtQztBQUNqQyxtQkFBS0QsT0FBTCxHQUFlUSxLQUFmO0FBQ0Q7QUFDRixTQUpEO0FBS0QsT0FQRCxNQU9PO0FBQ0wsYUFBS1IsT0FBTCxHQUFlLENBQWY7QUFDRDtBQUNELFdBQUtpRSxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUt4RCxTQUFMO0FBQ0Q7Ozs7RUF4T2dDLGVBQUsrRSxJOztrQkFBbkI5RyxLIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJMaXN0XCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3QsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIG1lbnVMaXN0OiBNZW51XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXJMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFja2FnZTogW3tcbiAgICAgICAgdGl0bGU6ICflhajpg6gnLFxuICAgICAgICB0eXBlOiAnYWxsJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heaUr+S7mCcsXG4gICAgICAgIHR5cGU6ICd1bnBhaWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5Y+R6LSnJyxcbiAgICAgICAgdHlwZTogJ3VuZGVsaXZlcmVkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+W+heaUtui0pycsXG4gICAgICAgIHR5cGU6ICd1bnJlY2VpcHRlZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllK7lkI4nLFxuICAgICAgICB0eXBlOiAncmVmdW5kaW5nJ1xuICAgICAgfV0sXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICflt7LlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIGN1cnJlbnQ6IG51bGwsXG4gICAgICBvcmRlclR5cGU6ICdhbGwnLFxuICAgICAgb3JkZXJMaXN0OiBbXSxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hlY2tQYWNrYWdlIChpbmRleCwgdHlwZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICB0aGlzLm9yZGVyVHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy5pbml0T3JkZXIoKVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXJEZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2FuY2VsIChpZCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTlj5bmtojorqLljZUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLmNhbmNlbE9yZGVyKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0T3JkZXIoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXImaWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKGlkKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICBvcmRlcklkOiBpZCxcbiAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCdcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnZmFpbCc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdjb21wbGV0ZSc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdE9yZGVyICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzdGF0dXM6IHRoaXMub3JkZXJUeXBlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJTdGF0dXMoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBkYXRhLm9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0uc2hvd0lkXG4gICAgICAgICAgICBvYmoucGF5ID0gaXRlbS5wYXlcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouc3RhdHVzID0gaXRlbS5zdGF0dXNcbiAgICAgICAgICAgIG9iai5zdGF0dXNUeHQgPSBfdGhpcy5vcmRlclN0YXR1c1tpdGVtLnN0YXR1c11cbiAgICAgICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nUmVjb3Jkcy5sZW5ndGhcbiAgICAgICAgICAgIG9iai5vcmRlckRldGFpbCA9IF90aGlzLmluaXRDaGlsZChpdGVtLmJ1eWluZ1JlY29yZHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlckxpc3QucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdE9yZGVyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoaWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS5vcmRlclR5cGUpIHtcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBwYXJhbS5vcmRlclR5cGVcbiAgICAgICAgdGhpcy5wYWNrYWdlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gcGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdE9yZGVyKClcbiAgICB9XG4gIH1cbiJdfQ==