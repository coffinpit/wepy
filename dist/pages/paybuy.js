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
            memo_main: encodeURI(this.memo),
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
            } else {
              _wepy2.default.hideLoading();
              _wepy2.default.showModal({
                title: '支付订单失败',
                content: '请点击确认返回购物车',
                success: function success(res) {
                  if (res.confirm) {
                    _wepy2.default.switchTab({
                      url: './cart'
                    });
                  }
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
          _wepy2.default.hideLoading();
          _wepy2.default.showModal({
            title: '创建订单失败',
            content: '请点击确认返回购物车',
            success: function success(res) {
              if (res.confirm) {
                _wepy2.default.switchTab({
                  url: './cart'
                });
              }
            }
          });
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
      this.applyOrder();
      this.$apply();
    }
  }]);

  return PayBuy;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayBuy , 'pages/paybuy'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsInRva2VuIiwic291cmNlSWQiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvUGF5IiwiYXJlYUlkIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsImlkIiwibWVtb19tYWluIiwiZW5jb2RlVVJJIiwiZGF0ZV9tYWluIiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVPcmRlckJ1eSIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInBheVNpZ24iLCJzaWduIiwicmVxdWVzdFBheW1lbnQiLCJoaWRlTG9hZGluZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwiY29uZmlybSIsInN3aXRjaFRhYiIsImlucHV0VGFwIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkFwcGx5T3JkZXJCdXkiLCJzaG93U3VjY2VzcyIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidGVtcENvbGQiLCJjb2xkbGlzdCIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJwdXNoIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsInZpY2VUaXRsZSIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJ0eXBlIiwiZ2V0VG9rZW4iLCJhcHBseU9yZGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBVCxFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sT0FBbEIsRUFBMEIsUUFBTyxNQUFqQyxFQUF3QyxTQUFRLE9BQWhELEVBQXdELE9BQU0sS0FBOUQsRUFBaEIsRUFBcUYseUJBQXdCLEVBQUMsU0FBUSxlQUFULEVBQXlCLE9BQU0sT0FBL0IsRUFBdUMsUUFBTyxNQUE5QyxFQUFxRCxTQUFRLE9BQTdELEVBQXFFLE9BQU0sS0FBM0UsRUFBN0csRUFBK0wseUJBQXdCLEVBQUMsU0FBUSxXQUFULEVBQXFCLE9BQU0sT0FBM0IsRUFBbUMsUUFBTyxNQUExQyxFQUFpRCxTQUFRLE9BQXpELEVBQWlFLE9BQU0sS0FBdkUsRUFBdk4sRUFBYixFLFNBQ1RDLE8sR0FBVSxFLFNBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssU0FHVkMsUSxHQUFXO0FBQ1RDLGVBRFMsdUJBQ0k7QUFDWCxZQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FB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anMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXlCdXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqTorqLljZUnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY29sZGxpc3RcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgc291cmNlVHlwZTogJycsXG4gICAgICBjb3VudDogJycsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGFkZDogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCdcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzTWFpbjogJycsXG4gICAgICBhcHBUeXBlOiAnd2ViJyxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIHJlZHVjdGlvbjogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBtZW1iZXJQcmljZTogJycsXG4gICAgICBmaW5hbHByaWNlOiAnJyxcbiAgICAgIHR4dExlbmd0aDogMCxcbiAgICAgIG1lbW86ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPXBheWJ1eScgKyAnJnNvdXJjZVR5cGU9JyArIHRoaXMuc291cmNlVHlwZSArICcmc291cmNlSWQ9JyArIHRoaXMuc291cmNlSWQgKyAnJmNvdW50PScgKyB0aGlzLmNvdW50XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnLFxuICAgICAgICAgICAgc291cmNlVHlwZTogdGhpcy5zb3VyY2VUeXBlLFxuICAgICAgICAgICAgc291cmNlSWQ6IHRoaXMuc291cmNlSWQsXG4gICAgICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudCxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgbWVtb19tYWluOiBlbmNvZGVVUkkodGhpcy5tZW1vKSxcbiAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlT3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICB2YXIgcGF5U2lnbiA9IGRhdGEuc2lnblxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVwYXlpZClcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogcGF5U2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBsZXRlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY6K6i5Y2V5aSx6LSlJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn6K+354K55Ye756Gu6K6k6L+U5Zue6LSt54mp6L2mJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlucHV0VGFwIChlKSB7XG4gICAgICAgIHRoaXMudHh0TGVuZ3RoID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoXG4gICAgICAgIHRoaXMubWVtbyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGFwcGx5T3JkZXIgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5Yib5bu66K6i5Y2V5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fngrnlh7vnoa7orqTov5Tlm57otK3nianovaYnLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcuL2NhcnQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS51c2VyKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UocGFyYW0udXNlcilcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHBhcmFtKVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLnNvdXJjZVR5cGUgPSBwYXJhbS50eXBlXG4gICAgICB0aGlzLmNvdW50ID0gcGFyYW0uY291bnRcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==