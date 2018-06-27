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
      paramMemo: ''
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
            obj.freight = item.freight;
            obj.tempCold = [];
            obj.coldlist = _this4.initChild(item.salesUnits);
            _this.order.push(obj);
            _this.$apply();
          });
          console.log(_this.order);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJvcmRlciIsImxlbmd0aCIsImRhdGEiLCJ0b2tlbiIsInNvdXJjZUlkIiwic291cmNlVHlwZSIsImNvdW50IiwidXNlciIsImFkZCIsImFkZHJlc3NNYWluIiwiYXBwVHlwZSIsInJlZHVjdGlvbiIsImZyZWlnaHQiLCJwYXkiLCJtZW1iZXJQcmljZSIsImZpbmFscHJpY2UiLCJ0eHRMZW5ndGgiLCJtZW1vIiwicGF5bWVudCIsInBhcmFtTWVtbyIsIm1ldGhvZHMiLCJnb0FkZHJlc3MiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29BcHBseVZpcCIsIm5hdmlnYXRlVG8iLCJnb1BheSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsImFyZWFJZCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJpZCIsIm1lbW9fbWFpbiIsImVuY29kZVVSSSIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlT3JkZXJCdXkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImVyck1zZyIsInBheUZhaWwiLCJjYXRjaCIsImlucHV0VGFwIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkFwcGx5T3JkZXJCdXkiLCJoaWRlTG9hZGluZyIsImZpbmFsUHJpY2UiLCJyZXNldFVzZXJMZXZlbCIsIm1lbWJlckhhc2giLCJ1c2VyTGV2ZWwiLCJnbG9iYWxEYXRhIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJjb25maXJtIiwic3dpdGNoVGFiIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJ2aWNlVGl0bGUiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwidHlwZSIsImFwcGx5T3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFULEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxLQUE5RCxFQUFoQixFQUFxRix5QkFBd0IsRUFBQyxTQUFRLGVBQVQsRUFBeUIsT0FBTSxPQUEvQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUE3RyxFQUErTCx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxPQUEzQixFQUFtQyxRQUFPLE1BQTFDLEVBQWlELFNBQVEsT0FBekQsRUFBaUUsT0FBTSxLQUF2RSxFQUF2TixFQUFiLEUsU0FD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cEI7QUFDQXhCLFlBQUlkLE1BQUosR0FBYWEsS0FBSzBCLFNBQUwsR0FBaUIsR0FBakIsR0FBdUIxQixLQUFLdkMsUUFBekM7QUFDQXdDLFlBQUkwQixPQUFKLEdBQWMsS0FBZDtBQUNBMUIsWUFBSTJCLFVBQUosR0FBaUI1QixLQUFLNkIsU0FBdEI7QUFDQVgsY0FBTVosSUFBTixDQUFXTCxHQUFYO0FBQ0QsT0FiRDtBQWNBLGFBQU9pQixLQUFQO0FBQ0Q7OzsyQkFDT1ksSyxFQUFPO0FBQ2IsVUFBSUEsTUFBTWhHLElBQVYsRUFBZ0I7QUFDZCxhQUFLQSxJQUFMLEdBQVlpRyxLQUFLQyxLQUFMLENBQVdGLE1BQU1oRyxJQUFqQixDQUFaO0FBQ0EsYUFBS1ksU0FBTCxHQUFpQm9GLE1BQU10RixJQUF2QjtBQUNEO0FBQ0QsV0FBS2IsUUFBTCxHQUFnQm1HLE1BQU1uRSxFQUF0QjtBQUNBLFdBQUsvQixVQUFMLEdBQWtCa0csTUFBTUcsSUFBeEI7QUFDQSxXQUFLcEcsS0FBTCxHQUFhaUcsTUFBTWpHLEtBQW5CO0FBQ0EsV0FBS3FHLFVBQUw7QUFDQSxXQUFLM0IsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLWCxTQUFMLEdBQWlCLEtBQUsxQyxPQUFMLENBQWEyQyxVQUFiLENBQXdCRCxTQUF6QztBQUNBLFdBQUtXLE1BQUw7QUFDRDs7OzhCQUNVO0FBQ1QsV0FBSy9ELElBQUwsR0FBWSxLQUFLRSxTQUFqQjtBQUNBLFdBQUtILFNBQUwsR0FBaUIsS0FBS0csU0FBTCxDQUFlbEIsTUFBaEM7QUFDRDs7OztFQS9OaUMsZUFBSzJHLEk7O2tCQUFwQnRILE0iLCJmaWxlIjoicGF5YnV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5QnV5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAvLyB1c2VyTGV2ZWwgKCkge1xuICAgICAgLy8gICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAvLyAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIHRydWVcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIHNvdXJjZVR5cGU6ICcnLFxuICAgICAgY291bnQ6ICcnLFxuICAgICAgdXNlcjoge1xuICAgICAgICBhZGQ6ICfor7fpgInmi6nmlLbotKflnLDlnYAnXG4gICAgICB9LFxuICAgICAgYWRkcmVzc01haW46ICcnLFxuICAgICAgYXBwVHlwZTogJ3dlYicsXG4gICAgICBvcmRlcjogW10sXG4gICAgICByZWR1Y3Rpb246ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgbWVtYmVyUHJpY2U6ICcnLFxuICAgICAgZmluYWxwcmljZTogJycsXG4gICAgICB0eHRMZW5ndGg6IDAsXG4gICAgICBtZW1vOiAnJyxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBwYXJhbU1lbW86ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPXBheWJ1eScgKyAnJnNvdXJjZVR5cGU9JyArIHRoaXMuc291cmNlVHlwZSArICcmc291cmNlSWQ9JyArIHRoaXMuc291cmNlSWQgKyAnJmNvdW50PScgKyB0aGlzLmNvdW50ICsgJyZtZW1vPScgKyB0aGlzLm1lbW9cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIGlmICghdGhpcy51c2VyLmFyZWFJZCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnLFxuICAgICAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudCxcbiAgICAgICAgICAgICAgYWRkcmVzc19tYWluOiB0aGlzLnVzZXIuaWQsXG4gICAgICAgICAgICAgIG1lbW9fbWFpbjogZW5jb2RlVVJJKHRoaXMubWVtbyksXG4gICAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNyZWF0ZU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICAgIC8vIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5kZWxpdmVyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wYXltZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlucHV0VGFwIChlKSB7XG4gICAgICAgIHRoaXMudHh0TGVuZ3RoID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoXG4gICAgICAgIHRoaXMubWVtbyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGFwcGx5T3JkZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuc291cmNlSWQsXG4gICAgICAgIGJ1eUNvdW50OiB0aGlzLmNvdW50XG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQXBwbHlPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIC8vIOa1i+ivleeUqOaIt+i6q+S7veWPmOWMllxuICAgICAgICAgIF90aGlzLiRwYXJlbnQucmVzZXRVc2VyTGV2ZWwoZGF0YS5tZW1iZXJIYXNoLCB0aGlzLnRva2VuLCAoKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy51c2VyTGV2ZWwgPSBfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICAgICAgfSlcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5vcmRlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+WIm+W7uuiuouWNleWksei0pScsXG4gICAgICAgICAgICBjb250ZW50OiAn6K+354K55Ye756Gu6K6k6L+U5Zue6LSt54mp6L2mJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcuL2NhcnQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICAgIHRoaXMucGFyYW1NZW1vID0gcGFyYW0ubWVtb1xuICAgICAgfVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLnNvdXJjZVR5cGUgPSBwYXJhbS50eXBlXG4gICAgICB0aGlzLmNvdW50ID0gcGFyYW0uY291bnRcbiAgICAgIHRoaXMuYXBwbHlPcmRlcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblJlYWR5ICgpIHtcbiAgICAgIHRoaXMubWVtbyA9IHRoaXMucGFyYW1NZW1vXG4gICAgICB0aGlzLnR4dExlbmd0aCA9IHRoaXMucGFyYW1NZW1vLmxlbmd0aFxuICAgIH1cbiAgfVxuIl19