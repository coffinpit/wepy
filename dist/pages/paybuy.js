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
      // userLevel () {
      //   if (this.$parent.globalData.userLevel === 0) {
      //     return false
      //   } else if (this.$parent.globalData.userLevel === 1) {
      //     return true
      //   }
      // },
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
      memo: '',
      payment: true,
      paramMemo: '',
      userLevel: 0
    }, _this2.methods = {
      goAddress: function goAddress() {
        _wepy2.default.redirectTo({
          url: './address?page=paybuy' + '&sourceType=' + this.sourceType + '&sourceId=' + this.sourceId + '&count=' + this.count + '&memo=' + this.memo
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
              sourceType: this.sourceType,
              sourceId: this.sourceId,
              buyCount: this.count,
              address_main: this.user.id,
              memo_main: encodeURI(this.memo),
              date_main: 4
            };
            this.$parent.HttpRequest.CreateOrderBuy(data).then(function (res) {
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
                    if (res.errMsg === 'requestPayment:ok') {
                      // 用户支付成功跳转首页
                      // wepy.switchTab({
                      //   url: './index'
                      // })
                      _wepy2.default.redirectTo({
                        url: './order?orderType=undelivered'
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

  _createClass(PayBuy, [{
    key: 'applyOrder',
    value: function applyOrder() {
      var _this4 = this;

      this.token = this.$parent.getToken();
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
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.reduction = data.reduction;
          _this.freight = data.freight;
          _this.pay = data.pay;
          _this.memberPrice = data.memberPrice;
          _this.finalprice = data.finalPrice;
          // 测试用户身份变化
          _this.$parent.resetUserLevel(data.memberHash, _this4.token, function () {
            _this.userLevel = _this.$parent.globalData.userLevel;
          });
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            if (item.title === '冷链配送') {
              obj.iconClass = 'icon-new_llps';
            } else if (item.title === '常规配送') {
              obj.iconClass = 'icon-new_cgps';
            }
            obj.freight = item.freight;
            obj.tempCold = [];
            obj.coldlist = _this4.initChild(item.salesUnits);
            _this.order.push(obj);
            _this.$apply();
          });
        } else {
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
        this.paramMemo = param.memo;
      }
      this.sourceId = param.id;
      this.sourceType = param.type;
      this.count = param.count;
      this.applyOrder();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.userLevel = this.$parent.globalData.userLevel;
      console.log(this.userLevel);
      this.$apply();
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.memo = this.paramMemo;
      this.txtLength = this.paramMemo.length;
    }
  }]);

  return PayBuy;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayBuy , 'pages/paybuy'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJvcmRlciIsImxlbmd0aCIsImRhdGEiLCJ0b2tlbiIsInNvdXJjZUlkIiwic291cmNlVHlwZSIsImNvdW50IiwidXNlciIsImFkZCIsImFkZHJlc3NNYWluIiwiYXBwVHlwZSIsInJlZHVjdGlvbiIsImZyZWlnaHQiLCJwYXkiLCJtZW1iZXJQcmljZSIsImZpbmFscHJpY2UiLCJ0eHRMZW5ndGgiLCJtZW1vIiwicGF5bWVudCIsInBhcmFtTWVtbyIsInVzZXJMZXZlbCIsIm1ldGhvZHMiLCJnb0FkZHJlc3MiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29BcHBseVZpcCIsIm5hdmlnYXRlVG8iLCJnb1BheSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsImFyZWFJZCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJpZCIsIm1lbW9fbWFpbiIsImVuY29kZVVSSSIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlT3JkZXJCdXkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImVyck1zZyIsInBheUZhaWwiLCJjYXRjaCIsImlucHV0VGFwIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkFwcGx5T3JkZXJCdXkiLCJoaWRlTG9hZGluZyIsImZpbmFsUHJpY2UiLCJyZXNldFVzZXJMZXZlbCIsIm1lbWJlckhhc2giLCJnbG9iYWxEYXRhIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsImljb25DbGFzcyIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsImNvbmZpcm0iLCJzd2l0Y2hUYWIiLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsInZpY2VUaXRsZSIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJ0eXBlIiwiYXBwbHlPcmRlciIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFULEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxLQUE5RCxFQUFoQixFQUFxRix5QkFBd0IsRUFBQyxTQUFRLGVBQVQsRUFBeUIsT0FBTSxPQUEvQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUE3RyxFQUErTCx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxPQUEzQixFQUFtQyxRQUFPLE1BQTFDLEVBQWlELFNBQVEsT0FBekQsRUFBaUUsT0FBTSxLQUF2RSxFQUF2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TSIsImZpbGUiOiJwYXlidXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXlCdXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqTorqLljZUnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY29sZGxpc3RcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIC8vIHVzZXJMZXZlbCAoKSB7XG4gICAgICAvLyAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgIC8vICAgICByZXR1cm4gZmFsc2VcbiAgICAgIC8vICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIC8vICAgICByZXR1cm4gdHJ1ZVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgc291cmNlVHlwZTogJycsXG4gICAgICBjb3VudDogJycsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGFkZDogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCdcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzTWFpbjogJycsXG4gICAgICBhcHBUeXBlOiAnd2ViJyxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIHJlZHVjdGlvbjogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBtZW1iZXJQcmljZTogJycsXG4gICAgICBmaW5hbHByaWNlOiAnJyxcbiAgICAgIHR4dExlbmd0aDogMCxcbiAgICAgIG1lbW86ICcnLFxuICAgICAgcGF5bWVudDogdHJ1ZSxcbiAgICAgIHBhcmFtTWVtbzogJycsXG4gICAgICB1c2VyTGV2ZWw6IDBcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9cGF5YnV5JyArICcmc291cmNlVHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZzb3VyY2VJZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnQgKyAnJm1lbW89JyArIHRoaXMubWVtb1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgaWYgKCF0aGlzLnVzZXIuYXJlYUlkKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nmlLbotKflnLDlnYAnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCcsXG4gICAgICAgICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuc291cmNlVHlwZSxcbiAgICAgICAgICAgICAgc291cmNlSWQ6IHRoaXMuc291cmNlSWQsXG4gICAgICAgICAgICAgIGJ1eUNvdW50OiB0aGlzLmNvdW50LFxuICAgICAgICAgICAgICBhZGRyZXNzX21haW46IHRoaXMudXNlci5pZCxcbiAgICAgICAgICAgICAgbWVtb19tYWluOiBlbmNvZGVVUkkodGhpcy5tZW1vKSxcbiAgICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlT3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5wdXRUYXAgKGUpIHtcbiAgICAgICAgdGhpcy50eHRMZW5ndGggPSBlLmRldGFpbC52YWx1ZS5sZW5ndGhcbiAgICAgICAgdGhpcy5tZW1vID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgYXBwbHlPcmRlciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5zb3VyY2VUeXBlLFxuICAgICAgICBzb3VyY2VJZDogdGhpcy5zb3VyY2VJZCxcbiAgICAgICAgYnV5Q291bnQ6IHRoaXMuY291bnRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BcHBseU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMucmVkdWN0aW9uID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgLy8g5rWL6K+V55So5oi36Lqr5Lu95Y+Y5YyWXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5yZXNldFVzZXJMZXZlbChkYXRhLm1lbWJlckhhc2gsIHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgICAgIF90aGlzLnVzZXJMZXZlbCA9IF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgICAgICB9KVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoaXRlbS50aXRsZSA9PT0gJ+WGt+mTvumFjemAgScpIHtcbiAgICAgICAgICAgICAgb2JqLmljb25DbGFzcyA9ICdpY29uLW5ld19sbHBzJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnRpdGxlID09PSAn5bi46KeE6YWN6YCBJykge1xuICAgICAgICAgICAgICBvYmouaWNvbkNsYXNzID0gJ2ljb24tbmV3X2NncHMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5Yib5bu66K6i5Y2V5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fngrnlh7vnoa7orqTov5Tlm57otK3nianovaYnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS51c2VyKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UocGFyYW0udXNlcilcbiAgICAgICAgdGhpcy5wYXJhbU1lbW8gPSBwYXJhbS5tZW1vXG4gICAgICB9XG4gICAgICB0aGlzLnNvdXJjZUlkID0gcGFyYW0uaWRcbiAgICAgIHRoaXMuc291cmNlVHlwZSA9IHBhcmFtLnR5cGVcbiAgICAgIHRoaXMuY291bnQgPSBwYXJhbS5jb3VudFxuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJMZXZlbClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLm1lbW8gPSB0aGlzLnBhcmFtTWVtb1xuICAgICAgdGhpcy50eHRMZW5ndGggPSB0aGlzLnBhcmFtTWVtby5sZW5ndGhcbiAgICB9XG4gIH1cbiJdfQ==