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
      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      this.$parent.HttpRequest.GetOrderDetail(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
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
        }
        _this.$apply();
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
      var data = {
        token: this.token,
        orderId: this.id
      };
      console.log(data);
      this.$parent.HttpRequest.CancelOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
        }
      });
    }
  }, {
    key: 'initLogistica',
    value: function initLogistica(com, num) {
      var data = {
        com: com,
        num: num
      };
      this.$parent.HttpRequest.GetLogistica(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      this.id = param.id;
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImluaXRUeHQiLCJjb21wdXRlZCIsImlzTnVsbCIsImxlbmd0aCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwibWV0aG9kcyIsImNhbmNlbCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2VsT3JkZXIiLCJnb0FkZHJlc3MiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29QYXkiLCJhcHBUeXBlIiwiSHR0cFJlcXVlc3QiLCJQYXlTZXJ2aWNlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJfdGhpcyIsIkdldE9yZGVyRGV0YWlsIiwiZXJyb3IiLCJzaG93SWQiLCJkYXRlRm9ybWF0IiwidmFsIiwidGltZSIsInNldEludGVydmFsIiwicGF5UmVtYWluaW5nVGltZSIsImNsZWFySW50ZXJ2YWwiLCIkYXBwbHkiLCJuYW1lIiwicGhvbmUiLCJkZXRhaWwiLCJmdWxsQXJlYU5hbWUiLCJidXlpbmdSZWNvcmRzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiY2IiLCJDYW5jZWxPcmRlciIsImNvbSIsIm51bSIsIkdldExvZ2lzdGljYSIsInBhcmFtIiwiZ2V0VG9rZW4iLCJpbml0RGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7bU1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxVQUFJLEVBRkM7QUFHTEMsbUJBQWEsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLEtBQWQsRUFBcUIsTUFBckIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsTUFBM0MsQ0FIUjtBQUlMQyxpQkFBVyxFQUpOO0FBS0xDLGNBQVEsRUFMSDtBQU1MQyxlQUFTLEVBTko7QUFPTEMsYUFBTyxFQVBGO0FBUUxDLGVBQVMsRUFSSjtBQVNMQyxrQkFBWSxFQVRQO0FBVUxDLFlBQU0sRUFWRDtBQVdMQyxXQUFLLEVBWEE7QUFZTEMsa0JBQVksRUFaUDtBQWFMQyxlQUFTLEVBYko7QUFjTEMsa0JBQVksRUFkUDtBQWVMQyxnQkFBVSxLQWZMO0FBZ0JMQyxlQUFTO0FBaEJKLEssU0FrQlBDLFEsR0FBVztBQUNUQyxZQURTLG9CQUNDO0FBQ1IsWUFBSSxLQUFLWCxLQUFMLENBQVdZLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsaUJBQU8sSUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVEMsZUFSUyx1QkFRSTtBQUNYLFlBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxpQkFBTyxLQUFQO0FBQ0Qs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ckMsRUFBMkM0QyxJQUEzQyxDQUFnRCxVQUFDVixHQUFELEVBQVM7QUFDdkRXLGdCQUFRQyxHQUFSLENBQVlaLEdBQVo7QUFDQSxZQUFJQSxJQUFJbEMsSUFBSixDQUFTaUQsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QnNDLGdCQUFNQSxJQUFOO0FBQ0Q7QUFDRixPQUxEO0FBTUQ7OztrQ0FDY0UsRyxFQUFLQyxHLEVBQUs7QUFDdkIsVUFBSTFGLE9BQU87QUFDVHlGLGFBQUtBLEdBREk7QUFFVEMsYUFBS0E7QUFGSSxPQUFYO0FBSUEsV0FBS3JFLE9BQUwsQ0FBYXFCLFdBQWIsQ0FBeUJpRCxZQUF6QixDQUFzQzNGLElBQXRDLEVBQTRDNEMsSUFBNUMsQ0FBaUQsVUFBQ1YsR0FBRCxFQUFTO0FBQ3hEVyxnQkFBUUMsR0FBUixDQUFZWixHQUFaO0FBQ0QsT0FGRDtBQUdEOzs7MkJBQ08wRCxLLEVBQU87QUFDYixXQUFLMUYsRUFBTCxHQUFVMEYsTUFBTTFGLEVBQWhCO0FBQ0EsV0FBS0QsS0FBTCxHQUFhLEtBQUtvQixPQUFMLENBQWF3RSxRQUFiLEVBQWI7QUFDQSxXQUFLcEMsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLcUMsUUFBTDtBQUNEOzs7O0VBektzQyxlQUFLQyxJOztrQkFBekJsRyxXIiwiZmlsZSI6Im9yZGVyRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpZDogJycsXG4gICAgICBvcmRlclN0YXR1czogWyflvILluLgnLCAn5b6F5pSv5LuYJywgJ+WUruWQjuS4rScsICforqLljZXlhbPpl60nLCAn5b6F5Y+R6LSnJywgJ+W+heaUtui0pycsICfkuqTmmJPlrozmiJAnXSxcbiAgICAgIHN0YXR1c1R4dDogJycsXG4gICAgICBzdGF0dXM6ICcnLFxuICAgICAgYWRkcmVzczoge30sXG4gICAgICBvcmRlcjogW10sXG4gICAgICBvcmRlcklkOiAnJyxcbiAgICAgIGNyZWF0ZVRpbWU6ICcnLFxuICAgICAgbWVtbzogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgZmluYWxQcmljZTogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHJlbWFpblRpbWU6ICcnLFxuICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgaW5pdFR4dDogJ+W+heaUr+S7mCdcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTlj5bmtojorqLljZUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLmNhbmNlbE9yZGVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSGlkZGVuID0gdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyZGV0YWlsJmlkPScgKyB0aGlzLmlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICBvcmRlcklkOiB0aGlzLmlkLFxuICAgICAgICAgIGFwcFR5cGU6ICdpb3MnXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlBheVNlcnZpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIC8vIOiwg+W+ruS/oeaUr+S7mOW8ueeql1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5pZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyRGV0YWlsKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2RhdGEuc3RhdHVzXVxuICAgICAgICAgIF90aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzXG4gICAgICAgICAgX3RoaXMub3JkZXJJZCA9IGRhdGEuc2hvd0lkXG4gICAgICAgICAgX3RoaXMuY3JlYXRlVGltZSA9IF90aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChkYXRhLmNyZWF0ZVRpbWUgKiAxMDAwLCAnWS1tLWQgSDppOnMnKVxuICAgICAgICAgIF90aGlzLm1lbW8gPSBkYXRhLm1lbW8gPyBkYXRhLm1lbW9bMF0udmFsIDogJydcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICAvLyBfdGhpcy5pbml0TG9naXN0aWNhKCdzaHVuZmVuZycsIGRhdGEuc2hvd0lkKVxuICAgICAgICAgIHZhciB0aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZGF0YS5wYXlSZW1haW5pbmdUaW1lIC0tXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lID4gMCkge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gKGRhdGEucGF5UmVtYWluaW5nVGltZSAtIGRhdGEucGF5UmVtYWluaW5nVGltZSAlIDYwKSAvIDYwICsgJ+WIhicgKyBkYXRhLnBheVJlbWFpbmluZ1RpbWUgJSA2MCArICfnp5InXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgICAgICBfdGhpcy5pbml0VHh0ID0gJ+S6pOaYk+WFs+mXrSdcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdExvZ2lzdGljYSAoY29tLCBudW0pIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjb206IGNvbSxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY2EoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIHRoaXMuaWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICB9XG4gIH1cbiJdfQ==