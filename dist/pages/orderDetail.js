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
      initTxt: '待支付'
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
            }
          }
        });
      },
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address?page=orderdetail&id=' + this.id
        });
      },
      goPay: function goPay() {
        var data = {
          token: this.token,
          orderId: this.id,
          appType: 'ios'
        };
        this.$parent.HttpRequest.PayService(data).then(function (res) {
          console.log(res);
          // 调微信支付弹窗
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(OrderDetail, [{
    key: 'initData',
    value: function initData() {
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      this.$parent.HttpRequest.GetOrderDetail(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.statusTxt = _this.orderStatus[data.status];
          _this.status = data.status;
          _this.orderId = data.showId;
          _this.createTime = _this.$parent.dateFormat(data.createTime * 1000, 'Y-m-d H:i:s');
          _this.memo = data.memo ? data.memo[0].val : '';
          _this.pay = data.pay;
          _this.freight = data.freight;
          // _this.initLogistica('shunfeng', data.showId)
          var time = setInterval(function () {
            data.payRemainingTime--;
            if (data.payRemainingTime > 0) {
              _this.remainTime = (data.payRemainingTime - data.payRemainingTime % 60) / 60 + '分' + data.payRemainingTime % 60 + '秒';
            } else {
              _this.remainTime = 0;
              _this.initTxt = '交易关闭';
              clearInterval(time);
            }
            _this.$apply();
          }, 1000);
          if (data.address) {
            _this.address.name = data.address.name;
            _this.address.phone = data.address.phone;
            _this.address.detail = data.address.fullAreaName + data.address.address;
          }
          _this.finalPrice = data.finalPrice;
          data.buyingRecords.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.order.push(obj);
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initData();
          }
        }
        _this.$apply();
      }).catch(function () {
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
      var _this5 = this;

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
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
          }
        }
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
    key: 'onLoad',
    value: function onLoad(param) {
      this.id = param.id;
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initData();
    }
  }]);

  return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/orderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImluaXRUeHQiLCJjb21wdXRlZCIsImlzTnVsbCIsImxlbmd0aCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwibWV0aG9kcyIsImNhbmNlbCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2VsT3JkZXIiLCJnb0FkZHJlc3MiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29QYXkiLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJHZXRPcmRlckRldGFpbCIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJzaG93SWQiLCJkYXRlRm9ybWF0IiwidmFsIiwidGltZSIsInNldEludGVydmFsIiwicGF5UmVtYWluaW5nVGltZSIsImNsZWFySW50ZXJ2YWwiLCIkYXBwbHkiLCJuYW1lIiwicGhvbmUiLCJkZXRhaWwiLCJmdWxsQXJlYU5hbWUiLCJidXlpbmdSZWNvcmRzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJtaXNzVG9rZW4iLCJpbml0RGF0YSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiY2IiLCJDYW5jZWxPcmRlciIsImNvbSIsIm51bSIsIkdldExvZ2lzdGljYSIsInBhcmFtIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OzttTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLFVBQUksRUFGQztBQUdMQyxtQkFBYSxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixNQUFyQixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxNQUEzQyxDQUhSO0FBSUxDLGlCQUFXLEVBSk47QUFLTEMsY0FBUSxFQUxIO0FBTUxDLGVBQVMsRUFOSjtBQU9MQyxhQUFPLEVBUEY7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGtCQUFZLEVBVFA7QUFVTEMsWUFBTSxFQVZEO0FBV0xDLFdBQUssRUFYQTtBQVlMQyxrQkFBWSxFQVpQO0FBYUxDLGVBQVMsRUFiSjtBQWNMQyxrQkFBWSxFQWRQO0FBZUxDLGdCQUFVLEtBZkw7QUFnQkxDLGVBQVM7QUFoQkosSyxTQWtCUEMsUSxHQUFXO0FBQ1RDLFlBRFMsb0JBQ0M7QUFDUixZQUFJLEtBQUtYLEtBQUwsQ0FBV1ksTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUMzQixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FQUTtBQVFUQyxlQVJTLHVCQVFJO0FBQ1gsWUFBSSxLQUFLQyxPQUFMLENBQWFD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VUFBSUUsUUFBUSxJQUFaO0FBQ0EsVUFBSWpELE9BQU87QUFDVGdHLGFBQUtBLEdBREk7QUFFVEMsYUFBS0E7QUFGSSxPQUFYO0FBSUEsV0FBSzVFLE9BQUwsQ0FBYXFCLFdBQWIsQ0FBeUJ3RCxZQUF6QixDQUFzQ2xHLElBQXRDLEVBQTRDNEMsSUFBNUMsQ0FBaUQsVUFBQ1YsR0FBRCxFQUFTO0FBQ3hEVyxnQkFBUUMsR0FBUixDQUFZWixHQUFaO0FBQ0EsWUFBSUEsSUFBSWxDLElBQUosQ0FBU21ELEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEIsQ0FDekIsQ0FERCxNQUNPO0FBQ0wsY0FBSUYsTUFBTTVCLE9BQU4sQ0FBY21ELFNBQWxCLEVBQTZCO0FBQzNCdkIsa0JBQU1oRCxLQUFOLEdBQWMsT0FBS29CLE9BQUwsQ0FBYTBCLFFBQWIsQ0FBc0JiLElBQUlsQyxJQUFKLENBQVNtRCxLQUEvQixDQUFkO0FBQ0Q7QUFDRjtBQUNGLE9BUkQ7QUFTRDs7OzJCQUNPZ0QsSyxFQUFPO0FBQ2IsV0FBS2pHLEVBQUwsR0FBVWlHLE1BQU1qRyxFQUFoQjtBQUNBLFdBQUswRCxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUthLFFBQUw7QUFDRDs7OztFQWhNc0MsZUFBSzJCLEk7O2tCQUF6QnZHLFciLCJmaWxlIjoib3JkZXJEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlkOiAnJyxcbiAgICAgIG9yZGVyU3RhdHVzOiBbJ+W8guW4uCcsICflvoXmlK/ku5gnLCAn5ZSu5ZCO5LitJywgJ+iuouWNleWFs+mXrScsICflvoXlj5HotKcnLCAn5b6F5pS26LSnJywgJ+S6pOaYk+WujOaIkCddLFxuICAgICAgc3RhdHVzVHh0OiAnJyxcbiAgICAgIHN0YXR1czogJycsXG4gICAgICBhZGRyZXNzOiB7fSxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgY3JlYXRlVGltZTogJycsXG4gICAgICBtZW1vOiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBmaW5hbFByaWNlOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcmVtYWluVGltZTogJycsXG4gICAgICBpc0hpZGRlbjogZmFsc2UsXG4gICAgICBpbml0VHh0OiAn5b6F5pSv5LuYJ1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOiuouWNlScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuY2VsT3JkZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNIaWRkZW4gPSB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXJkZXRhaWwmaWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgIG9yZGVySWQ6IHRoaXMuaWQsXG4gICAgICAgICAgYXBwVHlwZTogJ2lvcydcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgLy8g6LCD5b6u5L+h5pSv5LuY5by556qXXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJEZXRhaWwoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuc3RhdHVzVHh0ID0gX3RoaXMub3JkZXJTdGF0dXNbZGF0YS5zdGF0dXNdXG4gICAgICAgICAgX3RoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXNcbiAgICAgICAgICBfdGhpcy5vcmRlcklkID0gZGF0YS5zaG93SWRcbiAgICAgICAgICBfdGhpcy5jcmVhdGVUaW1lID0gX3RoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGRhdGEuY3JlYXRlVGltZSAqIDEwMDAsICdZLW0tZCBIOmk6cycpXG4gICAgICAgICAgX3RoaXMubWVtbyA9IGRhdGEubWVtbyA/IGRhdGEubWVtb1swXS52YWwgOiAnJ1xuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIC8vIF90aGlzLmluaXRMb2dpc3RpY2EoJ3NodW5mZW5nJywgZGF0YS5zaG93SWQpXG4gICAgICAgICAgdmFyIHRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBkYXRhLnBheVJlbWFpbmluZ1RpbWUgLS1cbiAgICAgICAgICAgIGlmIChkYXRhLnBheVJlbWFpbmluZ1RpbWUgPiAwKSB7XG4gICAgICAgICAgICAgIF90aGlzLnJlbWFpblRpbWUgPSAoZGF0YS5wYXlSZW1haW5pbmdUaW1lIC0gZGF0YS5wYXlSZW1haW5pbmdUaW1lICUgNjApIC8gNjAgKyAn5YiGJyArIGRhdGEucGF5UmVtYWluaW5nVGltZSAlIDYwICsgJ+enkidcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLnJlbWFpblRpbWUgPSAwXG4gICAgICAgICAgICAgIF90aGlzLmluaXRUeHQgPSAn5Lqk5piT5YWz6ZetJ1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgaWYgKGRhdGEuYWRkcmVzcykge1xuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5uYW1lID0gZGF0YS5hZGRyZXNzLm5hbWVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MucGhvbmUgPSBkYXRhLmFkZHJlc3MucGhvbmVcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MuZGV0YWlsID0gZGF0YS5hZGRyZXNzLmZ1bGxBcmVhTmFtZSArIGRhdGEuYWRkcmVzcy5hZGRyZXNzXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLmZpbmFsUHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICBkYXRhLmJ1eWluZ1JlY29yZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmoub3JkZXJEZXRhaWwgPSBfdGhpcy5pbml0Q2hpbGQoaXRlbS5idXlpbmdSZWNvcmRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXIucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdERhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMuaWRcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0TG9naXN0aWNhIChjb20sIG51bSkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgY29tOiBjb20sXG4gICAgICAgIG51bTogbnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TG9naXN0aWNhKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICB0aGlzLmlkID0gcGFyYW0uaWRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgIH1cbiAgfVxuIl19