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
      payment: true,
      paramMemo: '',
      userLevel: 0
    }, _this2.methods = {
      goAddress: function goAddress() {
        _wepy2.default.redirectTo({
          url: './address?page=paycart&memo=' + this.memo
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
        this.paramMemo = param.memo;
      }
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

  return PayCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayCart , 'pages/paycart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsIm9yZGVySGFzaCIsInRva2VuIiwidXNlciIsImFkZCIsImFkZHJlc3NNYWluIiwiYXBwVHlwZSIsInJlZHVjdGlvbiIsImZyZWlnaHQiLCJwYXkiLCJtZW1iZXJQcmljZSIsImZpbmFscHJpY2UiLCJ0eHRMZW5ndGgiLCJtZW1vIiwicGF5bWVudCIsInBhcmFtTWVtbyIsInVzZXJMZXZlbCIsIm1ldGhvZHMiLCJnb0FkZHJlc3MiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29BcHBseVZpcCIsIm5hdmlnYXRlVG8iLCJnb1BheSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsImFyZWFJZCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiaGFzaCIsImFkZHJlc3NfbWFpbiIsImlkIiwibWVtb19tYWluIiwiZW5jb2RlVVJJIiwiZGF0ZV9tYWluIiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVVc2VyT3JkZXIiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImVyck1zZyIsInBheUZhaWwiLCJjYXRjaCIsImlucHV0VGFwIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkFwcGx5T3JkZXJIdHRwIiwiY29uc29sZSIsImxvZyIsImhpZGVMb2FkaW5nIiwiZmluYWxQcmljZSIsInJlc2V0VXNlckxldmVsIiwibWVtYmVySGFzaCIsImdsb2JhbERhdGEiLCJjaGlsZE9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidGVtcENvbGQiLCJjb2xkbGlzdCIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJwdXNoIiwiJGFwcGx5Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwiY29uZmlybSIsInN3aXRjaFRhYiIsInNob3dGYWlsIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwidmljZVRpdGxlIiwiYnV5Q291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwiYXBwbHlPcmRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsU0FBUSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQVQsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE9BQWxCLEVBQTBCLFFBQU8sTUFBakMsRUFBd0MsU0FBUSxPQUFoRCxFQUF3RCxPQUFNLEtBQTlELEVBQWhCLEVBQXFGLHlCQUF3QixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLE9BQS9CLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQTdHLEVBQStMLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLE9BQTNCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQXZOLEVB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QjtBQUNBZCxjQUFNVixJQUFOLENBQVdMLEdBQVg7QUFDRCxPQWJEO0FBY0EsYUFBT2UsS0FBUDtBQUNEOzs7MkJBQ09lLEssRUFBTztBQUNiLFVBQUlBLE1BQU1uRyxJQUFWLEVBQWdCO0FBQ2QsYUFBS0EsSUFBTCxHQUFZb0csS0FBS0MsS0FBTCxDQUFXRixNQUFNbkcsSUFBakIsQ0FBWjtBQUNBLGFBQUtZLFNBQUwsR0FBaUJ1RixNQUFNekYsSUFBdkI7QUFDRDtBQUNELFdBQUs0RixVQUFMO0FBQ0EsV0FBSzNCLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBSzlELFNBQUwsR0FBaUIsS0FBS1EsT0FBTCxDQUFhNEMsVUFBYixDQUF3QnBELFNBQXpDO0FBQ0EsV0FBSzhELE1BQUw7QUFDRDs7OzhCQUNVO0FBQ1QsV0FBS2pFLElBQUwsR0FBWSxLQUFLRSxTQUFqQjtBQUNBLFdBQUtILFNBQUwsR0FBaUIsS0FBS0csU0FBTCxDQUFlaEIsTUFBaEM7QUFDRDs7OztFQXpOa0MsZUFBSzJHLEk7O2tCQUFyQnRILE8iLCJmaWxlIjoicGF5Y2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUNhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqTorqLljZUnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY29sZGxpc3RcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIC8vIHVzZXJMZXZlbCAoKSB7XG4gICAgICAvLyAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgIC8vICAgICByZXR1cm4gZmFsc2VcbiAgICAgIC8vICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIC8vICAgICByZXR1cm4gdHJ1ZVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgb3JkZXJIYXNoOiAnJyxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYWRkOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJ1xuICAgICAgfSxcbiAgICAgIGFkZHJlc3NNYWluOiAnJyxcbiAgICAgIGFwcFR5cGU6ICd3ZWInLFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgcmVkdWN0aW9uOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIG1lbWJlclByaWNlOiAnJyxcbiAgICAgIGZpbmFscHJpY2U6ICcnLFxuICAgICAgdHh0TGVuZ3RoOiAwLFxuICAgICAgbWVtbzogJycsXG4gICAgICBwYXltZW50OiB0cnVlLFxuICAgICAgcGFyYW1NZW1vOiAnJyxcbiAgICAgIHVzZXJMZXZlbDogMFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1wYXljYXJ0Jm1lbW89JyArIHRoaXMubWVtb1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgaWYgKCF0aGlzLnVzZXIuYXJlYUlkKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nmlLbotKflnLDlnYAnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCcsXG4gICAgICAgICAgICAgIGhhc2g6IHRoaXMub3JkZXJIYXNoLFxuICAgICAgICAgICAgICBhZGRyZXNzX21haW46IHRoaXMudXNlci5pZCxcbiAgICAgICAgICAgICAgbWVtb19tYWluOiBlbmNvZGVVUkkodGhpcy5tZW1vKSxcbiAgICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlVXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICAgIC8vIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5kZWxpdmVyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wYXltZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlucHV0VGFwIChlKSB7XG4gICAgICAgIHRoaXMudHh0TGVuZ3RoID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoXG4gICAgICAgIHRoaXMubWVtbyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGFwcGx5T3JkZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BcHBseU9yZGVySHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMub3JkZXJIYXNoID0gZGF0YS5oYXNoXG4gICAgICAgICAgX3RoaXMucmVkdWN0aW9uID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgX3RoaXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgLy8g5rWL6K+V55So5oi36Lqr5Lu95Y+Y5YyWXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5yZXNldFVzZXJMZXZlbChkYXRhLm1lbWJlckhhc2gsIHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgICAgIF90aGlzLnVzZXJMZXZlbCA9IF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgICAgICB9KVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5Yib5bu66K6i5Y2V5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fngrnlh7vnoa7orqTov5Tlm57otK3nianovaYnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS51c2VyKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UocGFyYW0udXNlcilcbiAgICAgICAgdGhpcy5wYXJhbU1lbW8gPSBwYXJhbS5tZW1vXG4gICAgICB9XG4gICAgICB0aGlzLmFwcGx5T3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy51c2VyTGV2ZWwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLm1lbW8gPSB0aGlzLnBhcmFtTWVtb1xuICAgICAgdGhpcy50eHRMZW5ndGggPSB0aGlzLnBhcmFtTWVtby5sZW5ndGhcbiAgICB9XG4gIH1cbiJdfQ==