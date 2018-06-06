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
      memo: '',
      payment: true
    }, _this2.methods = {
      goAddress: function goAddress() {
        _wepy2.default.redirectTo({
          url: './address?page=paycart'
        });
      },
      goApplyVip: function goApplyVip() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      },
      goPay: function goPay() {
        var _this3 = this;

        this.token = this.$parent.getToken();
        if (!this.user.areaId) {
          _wepy2.default.showToast({
            title: '请选择收货地址',
            icon: 'none',
            image: '../image/cancel.png'
          });
        } else {
          if (this.payment) {
            var data = {
              token: this.token,
              appType: 'miniApp',
              hash: this.orderHash,
              address_main: this.user.id,
              memo_main: encodeURI(this.memo),
              date_main: 4
            };
            this.$parent.HttpRequest.CreateUserOrder(data).then(function (res) {
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
                var sign = _this3.$parent.HttpRequest.getPaySign(signData);
                _wepy2.default.requestPayment({
                  'timeStamp': timeStamp,
                  'nonceStr': nonceStr,
                  'package': prepayid,
                  'signType': 'MD5',
                  'paySign': sign,
                  'success': function success(res) {
                    console.log('success');
                    if (res.errMsg === 'requestPayment:ok') {
                      // 用户支付成功跳转首页
                      _wepy2.default.switchTab({
                        url: './index'
                      });
                    } else if (res.errMsg === 'requestPayment:cancel') {
                      // 用户取消支付跳转订单列表
                      _this3.$parent.payFail();
                    }
                  },
                  'fail': function fail(res) {
                    _this3.$parent.payFail();
                  },
                  'complete': function complete(res) {
                    _this3.payment = true;
                  }
                });
              } else {
                _this3.$parent.payFail();
              }
            }).catch(function () {
              _this3.$parent.payFail();
            });
          }
          this.payment = false;
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
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      this.order = [];
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.ApplyOrderHttp(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
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
            obj.coldlist = _this4.initChild(item.salesUnits);
            _this.order.push(obj);
            _this.$apply();
          });
          console.log(_this.order);
        } else {
          _wepy2.default.hideLoading();
          _wepy2.default.showModal({
            title: '创建订单失败',
            content: '请点击确认返回购物车',
            showCancel: false,
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
        _this.$parent.hideLoading();
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
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.applyOrder();
      this.$apply();
    }
  }]);

  return PayCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayCart , 'pages/paycart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNOdWxsIiwib3JkZXIiLCJsZW5ndGgiLCJkYXRhIiwib3JkZXJIYXNoIiwidG9rZW4iLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJwYXltZW50IiwibWV0aG9kcyIsImdvQWRkcmVzcyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwibmF2aWdhdGVUbyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcmVhSWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImhhc2giLCJhZGRyZXNzX21haW4iLCJpZCIsIm1lbW9fbWFpbiIsImVuY29kZVVSSSIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlVXNlck9yZGVyIiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJjb25zb2xlIiwibG9nIiwiZXJyTXNnIiwic3dpdGNoVGFiIiwicGF5RmFpbCIsImNhdGNoIiwiaW5wdXRUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiQXBwbHlPcmRlckh0dHAiLCJoaWRlTG9hZGluZyIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidGVtcENvbGQiLCJjb2xkbGlzdCIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJwdXNoIiwiJGFwcGx5Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwiY29uZmlybSIsInNob3dGYWlsIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwidmljZVRpdGxlIiwiYnV5Q291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwiYXBwbHlPcmRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsU0FBUSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQVQsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE9BQWxCLEVBQTBCLFFBQU8sTUFBakMsRUFBd0MsU0FBUSxPQUFoRCxFQUF3RCxPQUFNLEtBQTlELEVBQWhCLEVBQXFGLHlCQUF3QixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLE9BQS9CLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQTdHLEVBQStMLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLE9BQTNCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQXZOLEVBQWIsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFE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Q2IsVUFBSUEsTUFBTTdGLElBQVYsRUFBZ0I7QUFDZCxhQUFLQSxJQUFMLEdBQVk4RixLQUFLQyxLQUFMLENBQVdGLE1BQU03RixJQUFqQixDQUFaO0FBQ0Q7QUFDRCxXQUFLc0UsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLMEIsVUFBTDtBQUNBLFdBQUsxQixNQUFMO0FBQ0Q7Ozs7RUEzTWtDLGVBQUsyQixJOztrQkFBckJuSCxPIiwiZmlsZSI6InBheWNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXlDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIG9yZGVySGFzaDogJycsXG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGFkZDogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCdcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzTWFpbjogJycsXG4gICAgICBhcHBUeXBlOiAnd2ViJyxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIHJlZHVjdGlvbjogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBtZW1iZXJQcmljZTogJycsXG4gICAgICBmaW5hbHByaWNlOiAnJyxcbiAgICAgIHR4dExlbmd0aDogMCxcbiAgICAgIG1lbW86ICcnLFxuICAgICAgcGF5bWVudDogdHJ1ZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1wYXljYXJ0J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgaWYgKCF0aGlzLnVzZXIuYXJlYUlkKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nmlLbotKflnLDlnYAnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCcsXG4gICAgICAgICAgICAgIGhhc2g6IHRoaXMub3JkZXJIYXNoLFxuICAgICAgICAgICAgICBhZGRyZXNzX21haW46IHRoaXMudXNlci5pZCxcbiAgICAgICAgICAgICAgbWVtb19tYWluOiBlbmNvZGVVUkkodGhpcy5tZW1vKSxcbiAgICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlVXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5wdXRUYXAgKGUpIHtcbiAgICAgICAgdGhpcy50eHRMZW5ndGggPSBlLmRldGFpbC52YWx1ZS5sZW5ndGhcbiAgICAgICAgdGhpcy5tZW1vID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgYXBwbHlPcmRlciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5vcmRlckhhc2ggPSBkYXRhLmhhc2hcbiAgICAgICAgICBfdGhpcy5yZWR1Y3Rpb24gPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBfdGhpcy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5vcmRlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+WIm+W7uuiuouWNleWksei0pScsXG4gICAgICAgICAgICBjb250ZW50OiAn6K+354K55Ye756Gu6K6k6L+U5Zue6LSt54mp6L2mJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcuL2NhcnQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmFwcGx5T3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19