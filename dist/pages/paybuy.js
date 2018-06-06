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
      memo: '',
      payment: true
    }, _this2.methods = {
      goAddress: function goAddress() {
        _wepy2.default.redirectTo({
          url: './address?page=paybuy' + '&sourceType=' + this.sourceType + '&sourceId=' + this.sourceId + '&count=' + this.count
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
      console.log(param);
      this.sourceId = param.id;
      this.sourceType = param.type;
      this.count = param.count;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsInRva2VuIiwic291cmNlSWQiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJwYXltZW50IiwibWV0aG9kcyIsImdvQWRkcmVzcyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwibmF2aWdhdGVUbyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcmVhSWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImJ1eUNvdW50IiwiYWRkcmVzc19tYWluIiwiaWQiLCJtZW1vX21haW4iLCJlbmNvZGVVUkkiLCJkYXRlX21haW4iLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJzd2l0Y2hUYWIiLCJwYXlGYWlsIiwiY2F0Y2giLCJpbnB1dFRhcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJBcHBseU9yZGVyQnV5IiwiaGlkZUxvYWRpbmciLCJmaW5hbFByaWNlIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJjb25maXJtIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJ2aWNlVGl0bGUiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwidHlwZSIsImFwcGx5T3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFULEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxLQUE5RCxFQUFoQixFQUFxRix5QkFBd0IsRUFBQyxTQUFRLGVBQVQsRUFBeUIsT0FBTSxPQUEvQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUE3RyxFQUErTCx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxPQUEzQixFQUFtQyxRQUFPLE1BQTFDLEVBQWlELFNBQVEsT0FBekQsRUFBaUUsT0FBTSxLQUF2RSxFQUF2TixFQUFiLEUsU0FDVEMsTyxHQUFVLEUsU0FDVEMsVSxHQUFhO0FBQ1JDO0FBRFEsSyxTQUdW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QUFJeUIsT0FBSixHQUFjLEtBQWQ7QUFDQXpCLFlBQUkwQixVQUFKLEdBQWlCM0IsS0FBSzRCLFNBQXRCO0FBQ0FYLGNBQU1YLElBQU4sQ0FBV0wsR0FBWDtBQUNELE9BYkQ7QUFjQSxhQUFPZ0IsS0FBUDtBQUNEOzs7MkJBQ09ZLEssRUFBTztBQUNiLFVBQUlBLE1BQU0xRixJQUFWLEVBQWdCO0FBQ2QsYUFBS0EsSUFBTCxHQUFZMkYsS0FBS0MsS0FBTCxDQUFXRixNQUFNMUYsSUFBakIsQ0FBWjtBQUNEO0FBQ0RxRSxjQUFRQyxHQUFSLENBQVlvQixLQUFaO0FBQ0EsV0FBSzdGLFFBQUwsR0FBZ0I2RixNQUFNL0QsRUFBdEI7QUFDQSxXQUFLN0IsVUFBTCxHQUFrQjRGLE1BQU1HLElBQXhCO0FBQ0EsV0FBSzlGLEtBQUwsR0FBYTJGLE1BQU0zRixLQUFuQjtBQUNBLFdBQUtxRSxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUswQixVQUFMO0FBQ0EsV0FBSzFCLE1BQUw7QUFDRDs7OztFQW5OaUMsZUFBSzJCLEk7O2tCQUFwQm5ILE0iLCJmaWxlIjoicGF5YnV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5QnV5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIHNvdXJjZVR5cGU6ICcnLFxuICAgICAgY291bnQ6ICcnLFxuICAgICAgdXNlcjoge1xuICAgICAgICBhZGQ6ICfor7fpgInmi6nmlLbotKflnLDlnYAnXG4gICAgICB9LFxuICAgICAgYWRkcmVzc01haW46ICcnLFxuICAgICAgYXBwVHlwZTogJ3dlYicsXG4gICAgICBvcmRlcjogW10sXG4gICAgICByZWR1Y3Rpb246ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgbWVtYmVyUHJpY2U6ICcnLFxuICAgICAgZmluYWxwcmljZTogJycsXG4gICAgICB0eHRMZW5ndGg6IDAsXG4gICAgICBtZW1vOiAnJyxcbiAgICAgIHBheW1lbnQ6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9cGF5YnV5JyArICcmc291cmNlVHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZzb3VyY2VJZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIGlmICghdGhpcy51c2VyLmFyZWFJZCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnLFxuICAgICAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudCxcbiAgICAgICAgICAgICAgYWRkcmVzc19tYWluOiB0aGlzLnVzZXIuaWQsXG4gICAgICAgICAgICAgIG1lbW9fbWFpbjogZW5jb2RlVVJJKHRoaXMubWVtbyksXG4gICAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNyZWF0ZU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wYXltZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlucHV0VGFwIChlKSB7XG4gICAgICAgIHRoaXMudHh0TGVuZ3RoID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoXG4gICAgICAgIHRoaXMubWVtbyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGFwcGx5T3JkZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuc291cmNlSWQsXG4gICAgICAgIGJ1eUNvdW50OiB0aGlzLmNvdW50XG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQXBwbHlPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5Yib5bu66K6i5Y2V5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fngrnlh7vnoa7orqTov5Tlm57otK3nianovaYnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS51c2VyKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UocGFyYW0udXNlcilcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHBhcmFtKVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLnNvdXJjZVR5cGUgPSBwYXJhbS50eXBlXG4gICAgICB0aGlzLmNvdW50ID0gcGFyYW0uY291bnRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuYXBwbHlPcmRlcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=