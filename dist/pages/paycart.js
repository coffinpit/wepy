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

var PayCart = function (_wepy$page) {
  _inherits(PayCart, _wepy$page);

  function PayCart() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, PayCart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = PayCart.__proto__ || Object.getPrototypeOf(PayCart)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '确认订单'
    }, _this2.$repeat = { "order": { "com": "orderList", "props": "" } }, _this2.$props = { "orderList": { "xmlns:v-bind": { "value": "", "for": "order", "item": "item", "index": "index", "key": "key" }, "v-bind:orderList.sync": { "value": "item.coldlist", "for": "order", "item": "item", "index": "index", "key": "key" }, "v-bind:userLevel.sync": { "value": "userLevel", "for": "order", "item": "item", "index": "index", "key": "key" } } }, _this2.$events = {}, _this2.components = {
      orderList: _orderlist2.default
    }, _this2.computed = {
      userLevel: function userLevel() {
        if (this.$parent.globalData.userLevel === 0) {
          return false;
        } else if (this.$parent.globalData.userLevel === 1) {
          return true;
        }
      },
      isNull: function isNull() {
        if (this.order.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }, _this2.data = {
      orderHash: '',
      token: '',
      user: {
        add: '请选择收货地址'
      },
      addressMain: '',
      appType: 'web',
      order: [],
      reduction: '',
      freight: '',
      pay: '',
      memberPrice: '',
      finalprice: '',
      txtLength: 0,
      memo: ''
    }, _this2.methods = {
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address?page=paycart'
        });
      },
      goPay: function goPay() {
        if (!this.user.areaId) {
          _wepy2.default.showToast({
            title: '请选择收货地址',
            icon: 'none',
            image: '../image/cancel.png'
          });
        } else {
          var data = {
            token: this.token,
            appType: 'ios',
            hash: this.orderHash,
            address_main: this.user.id,
            memo_main: this.memo,
            date_main: 4
          };
          console.log(data);
          this.$parent.HttpRequest.CreateUserOrder(data).then(function (res) {
            console.log(res);
          });
        }
      },
      inputTap: function inputTap(e) {
        this.txtLength = e.detail.value.length;
        this.memo = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(PayCart, [{
    key: 'applyOrder',
    value: function applyOrder() {
      var _this3 = this;

      this.$parent.showLoading();
      this.order = [];
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.ApplyOrderHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.orderHash = data.hash;
          _this.reduction = data.reduction;
          _this.freight = data.freight;
          _this.memberPrice = data.memberPrice;
          _this.pay = data.pay;
          _this.finalprice = data.finalPrice;
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.freight = item.freight;
            obj.tempCold = [];
            obj.coldlist = _this3.initChild(item.salesUnits);
            _this.order.push(obj);
            _this.$apply();
          });
          console.log(_this.order);
        } else {
          _this.$parent.showFail();
        }
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
        obj.title = item.title;
        obj.price = item.memberPrice;
        obj.oldprice = item.price;
        obj.id = item.productId;
        obj.sourceType = item.salesUnitType;
        obj.sourceId = item.salesUnitId;
        obj.detail = item.viceTitle + '×' + item.buyCount;
        obj.checked = false;
        obj.totalCount = item.keepCount;
        child.push(obj);
      });
      return child;
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      if (param.user) {
        this.user = JSON.parse(param.user);
      }
      this.token = this.$parent.getToken();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.$apply();
      this.applyOrder();
    }
  }]);

  return PayCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayCart , 'pages/paycart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNOdWxsIiwib3JkZXIiLCJsZW5ndGgiLCJkYXRhIiwib3JkZXJIYXNoIiwidG9rZW4iLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvUGF5IiwiYXJlYUlkIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJoYXNoIiwiYWRkcmVzc19tYWluIiwiaWQiLCJtZW1vX21haW4iLCJkYXRlX21haW4iLCJjb25zb2xlIiwibG9nIiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVVc2VyT3JkZXIiLCJ0aGVuIiwicmVzIiwiaW5wdXRUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiQXBwbHlPcmRlckh0dHAiLCJlcnJvciIsInNob3dTdWNjZXNzIiwiZmluYWxQcmljZSIsImNoaWxkT3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJ0ZW1wQ29sZCIsImNvbGRsaXN0IiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInB1c2giLCIkYXBwbHkiLCJzaG93RmFpbCIsImNhdGNoIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwidmljZVRpdGxlIiwiYnV5Q291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwiZ2V0VG9rZW4iLCJhcHBseU9yZGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBVCxFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sT0FBbEIsRUFBMEIsUUFBTyxNQUFqQyxFQUF3QyxTQUFRLE9BQWhELEVBQXdELE9BQU0sS0FBOUQsRUFBaEIsRUFBcUYseUJBQXdCLEVBQUMsU0FBUSxlQUFULEVBQXlCLE9BQU0sT0FBL0IsRUFBdUMsUUFBTyxNQUE5QyxFQUFxRCxTQUFRLE9BQTdELEVBQXFFLE9BQU0sS0FBM0UsRUFBN0csRUFBK0wseUJBQXdCLEVBQUMsU0FBUSxXQUFULEVBQXFCLE9BQU0sT0FBM0IsRUFBbUMsUUFBTyxNQUExQyxFQUFpRCxTQUFRLE9BQXpELEVBQWlFLE9BQU0sS0FBdkUsRUFBdk4sRUFBYixFLFNBQ1RDLE8sR0FBVSxFLFNBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssU0FHVkMsUSxHQUFXO0FBQ1RDLGVBRFMsdUJBQ0k7QUFDWCxZQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDM0MsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDbEQsaUJBQU8sSUFBUDtBQUNEO0FBQ0YsT0FQUTtBQVFURyxZQVJTLG9CQVFDO0FBQ1IsWUFBSSxLQUFL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TCxJQUFOLENBQVdMLEdBQVg7QUFDRCxPQWJEO0FBY0EsYUFBT1UsS0FBUDtBQUNEOzs7MkJBQ09lLEssRUFBTztBQUNiLFVBQUlBLE1BQU10RSxJQUFWLEVBQWdCO0FBQ2QsYUFBS0EsSUFBTCxHQUFZdUUsS0FBS0MsS0FBTCxDQUFXRixNQUFNdEUsSUFBakIsQ0FBWjtBQUNEO0FBQ0QsV0FBS0QsS0FBTCxHQUFhLEtBQUtQLE9BQUwsQ0FBYWlGLFFBQWIsRUFBYjtBQUNBLFdBQUt0QixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtBLE1BQUw7QUFDQSxXQUFLdUIsVUFBTDtBQUNEOzs7O0VBM0lrQyxlQUFLQyxJOztrQkFBckI3RixPIiwiZmlsZSI6InBheWNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXlDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIG9yZGVySGFzaDogJycsXG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGFkZDogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCdcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzTWFpbjogJycsXG4gICAgICBhcHBUeXBlOiAnd2ViJyxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIHJlZHVjdGlvbjogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBtZW1iZXJQcmljZTogJycsXG4gICAgICBmaW5hbHByaWNlOiAnJyxcbiAgICAgIHR4dExlbmd0aDogMCxcbiAgICAgIG1lbW86ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPXBheWNhcnQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ2lvcycsXG4gICAgICAgICAgICBoYXNoOiB0aGlzLm9yZGVySGFzaCxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgbWVtb19tYWluOiB0aGlzLm1lbW8sXG4gICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlVXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLnR4dExlbmd0aCA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aFxuICAgICAgICB0aGlzLm1lbW8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBseU9yZGVyICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLm9yZGVySGFzaCA9IGRhdGEuaGFzaFxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLm1lbWJlclByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICB9XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuYXBwbHlPcmRlcigpXG4gICAgfVxuICB9XG4iXX0=