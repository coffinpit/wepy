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

var PayBuy = function (_wepy$page) {
  _inherits(PayBuy, _wepy$page);

  function PayBuy() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, PayBuy);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = PayBuy.__proto__ || Object.getPrototypeOf(PayBuy)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
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
      token: '',
      sourceId: '',
      sourceType: '',
      count: '',
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
          url: './address?page=paybuy' + '&sourceType=' + this.sourceType + '&sourceId=' + this.sourceId + '&count=' + this.count
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
            appType: 'miniApp',
            sourceType: this.sourceType,
            sourceId: this.sourceId,
            buyCount: this.count,
            address_main: this.user.id,
            memo_main: this.memo,
            date_main: 4
          };
          this.$parent.HttpRequest.CreateOrderBuy(data).then(function (res) {
            console.log(res);
            if (res.data.error === 0) {
              var data = res.data.data;
              var timeStamp = data.timestamp.toString();
              var nonceStr = data.noncestr;
              var prepayid = 'prepay_id=' + data.prepayid;
              var paySign = data.sign;
              console.log(prepayid);
              _wepy2.default.requestPayment({
                'timeStamp': timeStamp,
                'nonceStr': nonceStr,
                'package': prepayid,
                'signType': 'MD5',
                'paySign': paySign,
                'success': function success(res) {
                  console.log('success');
                },
                'fail': function fail(res) {
                  console.log('fail');
                },
                'complete': function complete(res) {
                  console.log('complete');
                }
              });
            }
          });
        }
      },
      inputTap: function inputTap(e) {
        this.txtLength = e.detail.value.length;
        this.memo = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(PayBuy, [{
    key: 'applyOrder',
    value: function applyOrder() {
      var _this3 = this;

      this.$parent.showLoading();
      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        sourceType: this.sourceType,
        sourceId: this.sourceId,
        buyCount: this.count
      };
      this.$parent.HttpRequest.ApplyOrderBuy(data).then(function (res) {
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.reduction = data.reduction;
          _this.freight = data.freight;
          _this.pay = data.pay;
          _this.memberPrice = data.memberPrice;
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
      console.log(param);
      this.sourceId = param.id;
      this.sourceType = param.type;
      this.count = param.count;
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

  return PayBuy;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayBuy , 'pages/paybuy'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsInRva2VuIiwic291cmNlSWQiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvUGF5IiwiYXJlYUlkIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsImlkIiwibWVtb19tYWluIiwiZGF0ZV9tYWluIiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVPcmRlckJ1eSIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInBheVNpZ24iLCJzaWduIiwicmVxdWVzdFBheW1lbnQiLCJpbnB1dFRhcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJBcHBseU9yZGVyQnV5Iiwic2hvd1N1Y2Nlc3MiLCJmaW5hbFByaWNlIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsInNob3dGYWlsIiwiY2F0Y2giLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJ2aWNlVGl0bGUiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwidHlwZSIsImdldFRva2VuIiwiYXBwbHlPcmRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7eUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsU0FBUSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQVQsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE9BQWxCLEVBQTBCLFFBQU8sTUFBakMsRUFBd0MsU0FBUSxPQUFoRCxFQUF3RCxPQUFNLEtBQTlELEVBQWhCLEVBQXFGLHlCQUF3QixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLE9BQS9CLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQTdHLEVBQStMLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLE9BQTNCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQXZOLEVBQWIsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLFEsR0FBVztBQUNUQyxlQURTLHVCQUNJO0FBQ1gsWUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU8sSUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIs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OzsyQkFDT1ksSyxFQUFPO0FBQ2IsVUFBSUEsTUFBTTVFLElBQVYsRUFBZ0I7QUFDZCxhQUFLQSxJQUFMLEdBQVk2RSxLQUFLQyxLQUFMLENBQVdGLE1BQU01RSxJQUFqQixDQUFaO0FBQ0Q7QUFDRDhCLGNBQVFDLEdBQVIsQ0FBWTZDLEtBQVo7QUFDQSxXQUFLL0UsUUFBTCxHQUFnQitFLE1BQU1yRCxFQUF0QjtBQUNBLFdBQUt6QixVQUFMLEdBQWtCOEUsTUFBTUcsSUFBeEI7QUFDQSxXQUFLaEYsS0FBTCxHQUFhNkUsTUFBTTdFLEtBQW5CO0FBQ0EsV0FBS0gsS0FBTCxHQUFhLEtBQUtOLE9BQUwsQ0FBYTBGLFFBQWIsRUFBYjtBQUNBLFdBQUtwQixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtBLE1BQUw7QUFDQSxXQUFLcUIsVUFBTDtBQUNEOzs7O0VBM0tpQyxlQUFLQyxJOztrQkFBcEJ0RyxNIiwiZmlsZSI6InBheWJ1eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUJ1eSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYWRkOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJ1xuICAgICAgfSxcbiAgICAgIGFkZHJlc3NNYWluOiAnJyxcbiAgICAgIGFwcFR5cGU6ICd3ZWInLFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgcmVkdWN0aW9uOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIG1lbWJlclByaWNlOiAnJyxcbiAgICAgIGZpbmFscHJpY2U6ICcnLFxuICAgICAgdHh0TGVuZ3RoOiAwLFxuICAgICAgbWVtbzogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9cGF5YnV5JyArICcmc291cmNlVHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZzb3VyY2VJZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyLmFyZWFJZCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCcsXG4gICAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgICAgICBzb3VyY2VJZDogdGhpcy5zb3VyY2VJZCxcbiAgICAgICAgICAgIGJ1eUNvdW50OiB0aGlzLmNvdW50LFxuICAgICAgICAgICAgYWRkcmVzc19tYWluOiB0aGlzLnVzZXIuaWQsXG4gICAgICAgICAgICBtZW1vX21haW46IHRoaXMubWVtbyxcbiAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlT3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICB2YXIgcGF5U2lnbiA9IGRhdGEuc2lnblxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVwYXlpZClcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogcGF5U2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBsZXRlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlucHV0VGFwIChlKSB7XG4gICAgICAgIHRoaXMudHh0TGVuZ3RoID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoXG4gICAgICAgIHRoaXMubWVtbyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGFwcGx5T3JkZXIgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhwYXJhbSlcbiAgICAgIHRoaXMuc291cmNlSWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy5zb3VyY2VUeXBlID0gcGFyYW0udHlwZVxuICAgICAgdGhpcy5jb3VudCA9IHBhcmFtLmNvdW50XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuYXBwbHlPcmRlcigpXG4gICAgfVxuICB9XG4iXX0=