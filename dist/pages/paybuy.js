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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsInRva2VuIiwic291cmNlSWQiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJwYXltZW50IiwicGFyYW1NZW1vIiwibWV0aG9kcyIsImdvQWRkcmVzcyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwibmF2aWdhdGVUbyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcmVhSWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImJ1eUNvdW50IiwiYWRkcmVzc19tYWluIiwiaWQiLCJtZW1vX21haW4iLCJlbmNvZGVVUkkiLCJkYXRlX21haW4iLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJpbnB1dFRhcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJBcHBseU9yZGVyQnV5IiwiaGlkZUxvYWRpbmciLCJmaW5hbFByaWNlIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJjb25maXJtIiwic3dpdGNoVGFiIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJ2aWNlVGl0bGUiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwidHlwZSIsImFwcGx5T3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFULEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxLQUE5RCxFQUFoQixFQUFxRix5QkFBd0IsRUFBQyxTQUFRLGVBQVQsRUFBeUIsT0FBTSxPQUEvQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUE3RyxFQUErTCx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxPQUEzQixFQUFtQyxRQUFPLE1BQTFDLEVBQWlELFNBQVEsT0FBekQsRUFBaUUsT0FBTSxLQUF2RSxFQUF2TixFQUFiLEUsU0FDVEMsTyxHQUFVLEUsU0FDVEMsVSxHQUFhO0FBQ1JDO0FBRFEsSyxTQUdWQyxRLEdBQVc7QUFDVEMsZUFEUyx1QkFDSTtBQUNYLFlBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxpQkFBTyxLQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUNsRCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQVBRO0FBUVRHLFlBUlMsb0JBUUM7QUFDUixZQUFJLEtBQUtDLEtBQUwsQ0FBV0MsTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUMzQixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFkUSxLLFNBZ0JYQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGdCQUFVLEVBRkw7QUFHTEMsa0JBQVksRUFIUDtBQUlMQyxhQUFPLEVBSkY7QUFLTEMsWUFBTTtBQUNKQyxhQUFLO0FBREQsT0FMRDtBQVFMQyxtQkFBYSxFQVJSO0FBU0xDLGVBQVMsS0FUSjtBQVVMVixhQUFPLEVBVkY7QUFXTFcsaUJBQVcsRUFYTjtBQVlMQyxlQUFTLEVBWko7QUFhTEMsV0FBSyxFQWJBO0FBY0xDLG1CQUFhLEVBZFI7QUFlTEMsa0JBQVksRUFmUDtBQWdCTEMsaUJBQVcsQ0FoQk47QUFpQkxDLFlBQU0sRUFqQkQ7QUFrQkxDLGVBQVMsSUFsQko7QUFtQkxDLGlCQUFXO0FBbkJOLEssU0FxQlBDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNLO0FBQ1gsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSywwQkFBMEIsY0FBMUIsR0FBMkMsS0FBS2xCLFVBQWhELEdBQTZELFlBQTdELEdBQTRFLEtBQUtELFFBQWpGLEdBQTRGLFNBQTVGLEdBQXdHLEtBQUtFLEtBQTdHLEdBQXFILFFBQXJILEdBQWdJLEtBQUtXO0FBRDVILFNBQWhCO0FBR0QsT0FMTztBQU1STyxnQkFOUSx3QkFNTTtBQUNaLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RGLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BVk87QUFXUkcsV0FYUSxtQkFXQztBQUFBOztBQUNQLGFBQUt2QixLQUFMLEdBQWEsS0FBS04sT0FBTCxDQUFhOEIsUUFBYixFQUFiO0FBQ0EsWUFBSSxDQUFDLEtBQUtwQixJQUFMLENBQVVxQixNQUFmLEVBQXVCO0FBQ3JCLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sU0FETTtBQUViQyxrQkFBTSxNQUZPO0FBR2JDLG1CQUFPO0FBSE0sV0FBZjtBQUtELFNBTkQsTUFNTztBQUNMLGNBQUksS0FBS2QsT0FBVCxFQUFrQjtBQUNoQixnQkFBSWhCLE9BQU87QUFDVEMscUJBQU8sS0FBS0EsS0FESDtBQUVUTyx1QkFBUyxTQUZBO0FBR1RMLDBCQUFZLEtBQUtBLFVBSFI7QUFJVEQsd0JBQVUsS0FBS0EsUUFKTjtBQUtUNkIsd0JBQVUsS0FBSzNCLEtBTE47QUFNVDRCLDRCQUFjLEtBQUszQixJQUFMLENBQVU0QixFQU5mO0FBT1RDLHlCQUFXQyxVQUFVLEtBQUtwQixJQUFmLENBUEY7QUFRVHFCLHlCQUFXO0FBUkYsYUFBWDtBQVVBLGlCQUFLekMsT0FBTCxDQUFhMEMsV0FBYixDQUF5QkMsY0FBekIsQ0FBd0N0QyxJQUF4QyxFQUE4Q3VDLElBQTlDLENBQW1ELFVBQUNDLEdBQUQsRUFBUztBQUMxRCxrQkFBSUEsSUFBSXhDLElBQUosQ0FBU3lDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsb0JBQUl6QyxPQUFPd0MsSUFBSXhDLElBQUosQ0FBU0EsSUFBcEI7QUFDQSxvQkFBSTBDLFlBQVkxQyxLQUFLMkMsU0FBTCxDQUFlQyxRQUFmLEVBQWhCO0FBQ0Esb0JBQUlDLFdBQVc3QyxLQUFLOEMsUUFBcEI7QUFDQSxvQkFBSUMsV0FBVyxlQUFlL0MsS0FBSytDLFFBQW5DO0FBQ0Esb0JBQUlDLFdBQVc7QUFDYiwyQkFBUyxvQkFESTtBQUViLCtCQUFhTixTQUZBO0FBR2IsOEJBQVlHLFFBSEM7QUFJYiw2QkFBV0UsUUFKRTtBQUtiLDhCQUFZO0FBTEMsaUJBQWY7QUFPQSxvQkFBSUUsT0FBTyxPQUFLdEQsT0FBTCxDQUFhMEMsV0FBYixDQUF5QmEsVUFBekIsQ0FBb0NGLFFBQXBDLENBQVg7QUFDQSwrQkFBS0csY0FBTCxDQUFvQjtBQUNsQiwrQkFBYVQsU0FESztBQUVsQiw4QkFBWUcsUUFGTTtBQUdsQiw2QkFBV0UsUUFITztBQUlsQiw4QkFBWSxLQUpNO0FBS2xCLDZCQUFXRSxJQUxPO0FBTWxCLDZCQUFXLGlCQUFDVCxHQUFELEVBQVM7QUFDbEIsd0JBQUlBLElBQUlZLE1BQUosS0FBZSxtQkFBbkIsRUFBd0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBS2hDLFVBQUwsQ0FBZ0I7QUFDZEMsNkJBQUs7QUFEUyx1QkFBaEI7QUFHRCxxQkFSRCxNQVFPLElBQUltQixJQUFJWSxNQUFKLEtBQWUsdUJBQW5CLEVBQTRDO0FBQ2pEO0FBQ0EsNkJBQUt6RCxPQUFMLENBQWEwRCxPQUFiO0FBQ0Q7QUFDRixtQkFuQmlCO0FBb0JsQiwwQkFBUSxjQUFDYixHQUFELEVBQVM7QUFDZiwyQkFBSzdDLE9BQUwsQ0FBYTBELE9BQWI7QUFDRCxtQkF0QmlCO0FBdUJsQiw4QkFBWSxrQkFBQ2IsR0FBRCxFQUFTO0FBQ25CLDJCQUFLeEIsT0FBTCxHQUFlLElBQWY7QUFDRDtBQXpCaUIsaUJBQXBCO0FBMkJELGVBeENELE1Bd0NPO0FBQ0wsdUJBQUtyQixPQUFMLENBQWEwRCxPQUFiO0FBQ0Q7QUFDRixhQTVDRCxFQTRDR0MsS0E1Q0gsQ0E0Q1MsWUFBTTtBQUNiLHFCQUFLM0QsT0FBTCxDQUFhMEQsT0FBYjtBQUNELGFBOUNEO0FBK0NEO0FBQ0QsZUFBS3JDLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFDRixPQWpGTztBQWtGUnVDLGNBbEZRLG9CQWtGRUMsQ0FsRkYsRUFrRks7QUFDWCxhQUFLMUMsU0FBTCxHQUFpQjBDLEVBQUVDLE1BQUYsQ0FBU0MsS0FBVCxDQUFlM0QsTUFBaEM7QUFDQSxhQUFLZ0IsSUFBTCxHQUFZeUMsRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNEO0FBckZPLEs7Ozs7O2lDQXVGSTtBQUFBOztBQUNaLFdBQUt6RCxLQUFMLEdBQWEsS0FBS04sT0FBTCxDQUFhOEIsUUFBYixFQUFiO0FBQ0EsV0FBSzlCLE9BQUwsQ0FBYWdFLFdBQWI7QUFDQSxXQUFLN0QsS0FBTCxHQUFhLEVBQWI7QUFDQSxVQUFJOEQsUUFBUSxJQUFaO0FBQ0EsVUFBSTVELE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVRFLG9CQUFZLEtBQUtBLFVBRlI7QUFHVEQsa0JBQVUsS0FBS0EsUUFITjtBQUlUNkIsa0JBQVUsS0FBSzNCO0FBSk4sT0FBWDtBQU1BLFdBQUtULE9BQUwsQ0FBYTBDLFdBQWIsQ0FBeUJ3QixhQUF6QixDQUF1QzdELElBQXZDLEVBQTZDdUMsSUFBN0MsQ0FBa0QsVUFBQ0MsR0FBRCxFQUFTO0FBQ3pEb0IsY0FBTWpFLE9BQU4sQ0FBY21FLFdBQWQ7QUFDQSxZQUFJdEIsSUFBSXhDLElBQUosQ0FBU3lDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsY0FBSXpDLE9BQU93QyxJQUFJeEMsSUFBSixDQUFTQSxJQUFwQjtBQUNBNEQsZ0JBQU1uRCxTQUFOLEdBQWtCVCxLQUFLUyxTQUF2QjtBQUNBbUQsZ0JBQU1sRCxPQUFOLEdBQWdCVixLQUFLVSxPQUFyQjtBQUNBa0QsZ0JBQU1qRCxHQUFOLEdBQVlYLEtBQUtXLEdBQWpCO0FBQ0FpRCxnQkFBTWhELFdBQU4sR0FBb0JaLEtBQUtZLFdBQXpCO0FBQ0FnRCxnQkFBTS9DLFVBQU4sR0FBbUJiLEtBQUsrRCxVQUF4QjtBQUNBL0QsZUFBS2dFLFdBQUwsQ0FBaUJDLE9BQWpCLENBQXlCLFVBQUNDLElBQUQsRUFBVTtBQUNqQyxnQkFBSUMsTUFBTSxFQUFWO0FBQ0FBLGdCQUFJdkMsS0FBSixHQUFZc0MsS0FBS3RDLEtBQWpCO0FBQ0F1QyxnQkFBSXpELE9BQUosR0FBY3dELEtBQUt4RCxPQUFuQjtBQUNBeUQsZ0JBQUlDLFFBQUosR0FBZSxFQUFmO0FBQ0FELGdCQUFJRSxRQUFKLEdBQWUsT0FBS0MsU0FBTCxDQUFlSixLQUFLSyxVQUFwQixDQUFmO0FBQ0FYLGtCQUFNOUQsS0FBTixDQUFZMEUsSUFBWixDQUFpQkwsR0FBakI7QUFDQVAsa0JBQU1hLE1BQU47QUFDRCxXQVJEO0FBU0FDLGtCQUFRQyxHQUFSLENBQVlmLE1BQU05RCxLQUFsQjtBQUNELFNBakJELE1BaUJPO0FBQ0wseUJBQUs4RSxTQUFMLENBQWU7QUFDYmhELG1CQUFPLFFBRE07QUFFYmlELHFCQUFTLFlBRkk7QUFHYkMsd0JBQVksS0FIQztBQUliQyxxQkFBUyxpQkFBQ3ZDLEdBQUQsRUFBUztBQUNoQixrQkFBSUEsSUFBSXdDLE9BQVIsRUFBaUI7QUFDZiwrQkFBS0MsU0FBTCxDQUFlO0FBQ2I1RCx1QkFBSztBQURRLGlCQUFmO0FBR0Q7QUFDRjtBQVZZLFdBQWY7QUFZRDtBQUNGLE9BakNELEVBaUNHaUMsS0FqQ0gsQ0FpQ1MsWUFBTTtBQUNiTSxjQUFNakUsT0FBTixDQUFjbUUsV0FBZDtBQUNBRixjQUFNakUsT0FBTixDQUFjdUYsUUFBZDtBQUNELE9BcENEO0FBcUNEOzs7OEJBQ1VDLE0sRUFBUTtBQUNqQixVQUFJQyxRQUFRLEVBQVo7QUFDQUQsYUFBT2xCLE9BQVAsQ0FBZSxVQUFDQyxJQUFELEVBQVU7QUFDdkIsWUFBSUMsTUFBTSxFQUFWO0FBQ0FBLFlBQUlrQixJQUFKLEdBQVduQixLQUFLb0IsS0FBaEI7QUFDQW5CLFlBQUl2QyxLQUFKLEdBQVlzQyxLQUFLdEMsS0FBakI7QUFDQXVDLFlBQUlvQixLQUFKLEdBQVlyQixLQUFLdEQsV0FBakI7QUFDQXVELFlBQUlxQixRQUFKLEdBQWV0QixLQUFLcUIsS0FBcEI7QUFDQXBCLFlBQUlsQyxFQUFKLEdBQVNpQyxLQUFLdUIsU0FBZDtBQUNBdEIsWUFBSWhFLFVBQUosR0FBaUIrRCxLQUFLd0IsYUFBdEI7QUFDQXZCLFlBQUlqRSxRQUFKLEdBQWVnRSxLQUFLeUIsV0FBcEI7QUFDQXhCLFlBQUlWLE1BQUosR0FBYVMsS0FBSzBCLFNBQUwsR0FBaUIsR0FBakIsR0FBdUIxQixLQUFLbkMsUUFBekM7QUFDQW9DLFlBQUkwQixPQUFKLEdBQWMsS0FBZDtBQUNBMUIsWUFBSTJCLFVBQUosR0FBaUI1QixLQUFLNkIsU0FBdEI7QUFDQVgsY0FBTVosSUFBTixDQUFXTCxHQUFYO0FBQ0QsT0FiRDtBQWNBLGFBQU9pQixLQUFQO0FBQ0Q7OzsyQkFDT1ksSyxFQUFPO0FBQ2IsVUFBSUEsTUFBTTNGLElBQVYsRUFBZ0I7QUFDZCxhQUFLQSxJQUFMLEdBQVk0RixLQUFLQyxLQUFMLENBQVdGLE1BQU0zRixJQUFqQixDQUFaO0FBQ0EsYUFBS1ksU0FBTCxHQUFpQitFLE1BQU1qRixJQUF2QjtBQUNEO0FBQ0QsV0FBS2IsUUFBTCxHQUFnQjhGLE1BQU0vRCxFQUF0QjtBQUNBLFdBQUs5QixVQUFMLEdBQWtCNkYsTUFBTUcsSUFBeEI7QUFDQSxXQUFLL0YsS0FBTCxHQUFhNEYsTUFBTTVGLEtBQW5CO0FBQ0EsV0FBS2dHLFVBQUw7QUFDQSxXQUFLM0IsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLQSxNQUFMO0FBQ0Q7Ozs4QkFDVTtBQUNULFdBQUsxRCxJQUFMLEdBQVksS0FBS0UsU0FBakI7QUFDQSxXQUFLSCxTQUFMLEdBQWlCLEtBQUtHLFNBQUwsQ0FBZWxCLE1BQWhDO0FBQ0Q7Ozs7RUExTmlDLGVBQUtzRyxJOztrQkFBcEJwSCxNIiwiZmlsZSI6InBheWJ1eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUJ1eSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYWRkOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJ1xuICAgICAgfSxcbiAgICAgIGFkZHJlc3NNYWluOiAnJyxcbiAgICAgIGFwcFR5cGU6ICd3ZWInLFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgcmVkdWN0aW9uOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIG1lbWJlclByaWNlOiAnJyxcbiAgICAgIGZpbmFscHJpY2U6ICcnLFxuICAgICAgdHh0TGVuZ3RoOiAwLFxuICAgICAgbWVtbzogJycsXG4gICAgICBwYXltZW50OiB0cnVlLFxuICAgICAgcGFyYW1NZW1vOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1wYXlidXknICsgJyZzb3VyY2VUeXBlPScgKyB0aGlzLnNvdXJjZVR5cGUgKyAnJnNvdXJjZUlkPScgKyB0aGlzLnNvdXJjZUlkICsgJyZjb3VudD0nICsgdGhpcy5jb3VudCArICcmbWVtbz0nICsgdGhpcy5tZW1vXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJyxcbiAgICAgICAgICAgICAgc291cmNlVHlwZTogdGhpcy5zb3VyY2VUeXBlLFxuICAgICAgICAgICAgICBzb3VyY2VJZDogdGhpcy5zb3VyY2VJZCxcbiAgICAgICAgICAgICAgYnV5Q291bnQ6IHRoaXMuY291bnQsXG4gICAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgICBtZW1vX21haW46IGVuY29kZVVSSSh0aGlzLm1lbW8pLFxuICAgICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgICAvLyB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVuZGVsaXZlcmVkJ1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnZmFpbCc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdjb21wbGV0ZSc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLnR4dExlbmd0aCA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aFxuICAgICAgICB0aGlzLm1lbW8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBseU9yZGVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5yZWR1Y3Rpb24gPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLm1lbWJlclByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5vcmRlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+WIm+W7uuiuouWNleWksei0pScsXG4gICAgICAgICAgICBjb250ZW50OiAn6K+354K55Ye756Gu6K6k6L+U5Zue6LSt54mp6L2mJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcuL2NhcnQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICAgIHRoaXMucGFyYW1NZW1vID0gcGFyYW0ubWVtb1xuICAgICAgfVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLnNvdXJjZVR5cGUgPSBwYXJhbS50eXBlXG4gICAgICB0aGlzLmNvdW50ID0gcGFyYW0uY291bnRcbiAgICAgIHRoaXMuYXBwbHlPcmRlcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uUmVhZHkgKCkge1xuICAgICAgdGhpcy5tZW1vID0gdGhpcy5wYXJhbU1lbW9cbiAgICAgIHRoaXMudHh0TGVuZ3RoID0gdGhpcy5wYXJhbU1lbW8ubGVuZ3RoXG4gICAgfVxuICB9XG4iXX0=