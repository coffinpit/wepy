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
      },
      hasMemo: function hasMemo() {
        if (this.memo === '') {
          return false;
        } else {
          return true;
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
      userLevel: 0,
      showTextarea: true,
      txtauto: false
    }, _this2.methods = {
      showTxt: function showTxt() {
        this.showTextarea = false;
        this.txtauto = true;
      },
      blurTap: function blurTap() {
        this.showTextarea = true;
        this.txtauto = false;
      },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiaGFzTWVtbyIsIm1lbW8iLCJkYXRhIiwib3JkZXJIYXNoIiwidG9rZW4iLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsInBheW1lbnQiLCJwYXJhbU1lbW8iLCJ1c2VyTGV2ZWwiLCJzaG93VGV4dGFyZWEiLCJ0eHRhdXRvIiwibWV0aG9kcyIsInNob3dUeHQiLCJibHVyVGFwIiwiZ29BZGRyZXNzIiwicmVkaXJlY3RUbyIsInVybCIsImdvQXBwbHlWaXAiLCJuYXZpZ2F0ZVRvIiwiZ29QYXkiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJhcmVhSWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImhhc2giLCJhZGRyZXNzX21haW4iLCJpZCIsIm1lbW9fbWFpbiIsImVuY29kZVVSSSIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlVXNlck9yZGVyIiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJpbnB1dFRhcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJBcHBseU9yZGVySHR0cCIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImZpbmFsUHJpY2UiLCJyZXNldFVzZXJMZXZlbCIsIm1lbWJlckhhc2giLCJnbG9iYWxEYXRhIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsImljb25DbGFzcyIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsImNvbmZpcm0iLCJzd2l0Y2hUYWIiLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzYWxlc1VuaXRUeXBlIiwic291cmNlSWQiLCJzYWxlc1VuaXRJZCIsInZpY2VUaXRsZSIsImJ1eUNvdW50IiwiY2hlY2tlZCIsInRvdGFsQ291bnQiLCJrZWVwQ291bnQiLCJwYXJhbSIsIkpTT04iLCJwYXJzZSIsImFwcGx5T3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzJMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFULEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxLQUE5RCxFQUFoQixFQUFxRix5QkFBd0IsRUFBQyxTQUFRLGVBQVQsRUFBeUIsT0FBTSxPQUEvQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUE3RyxFQUErTCx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FB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V0FBS25GLElBQUwsR0FBWSxLQUFLZSxTQUFqQjtBQUNBLFdBQUtGLFNBQUwsR0FBaUIsS0FBS0UsU0FBTCxDQUFlakIsTUFBaEM7QUFDRDs7OztFQS9Pa0MsZUFBS2lILEk7O2tCQUFyQjVILE8iLCJmaWxlIjoicGF5Y2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUNhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqTorqLljZUnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcIm9yZGVyXCI6e1wiY29tXCI6XCJvcmRlckxpc3RcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJvcmRlckxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY29sZGxpc3RcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjp7XCJ2YWx1ZVwiOlwidXNlckxldmVsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIC8vIHVzZXJMZXZlbCAoKSB7XG4gICAgICAvLyAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgIC8vICAgICByZXR1cm4gZmFsc2VcbiAgICAgIC8vICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIC8vICAgICByZXR1cm4gdHJ1ZVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc01lbW8gKCkge1xuICAgICAgICBpZiAodGhpcy5tZW1vID09PSAnJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIG9yZGVySGFzaDogJycsXG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGFkZDogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCdcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzTWFpbjogJycsXG4gICAgICBhcHBUeXBlOiAnd2ViJyxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIHJlZHVjdGlvbjogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBtZW1iZXJQcmljZTogJycsXG4gICAgICBmaW5hbHByaWNlOiAnJyxcbiAgICAgIHR4dExlbmd0aDogMCxcbiAgICAgIG1lbW86ICcnLFxuICAgICAgcGF5bWVudDogdHJ1ZSxcbiAgICAgIHBhcmFtTWVtbzogJycsXG4gICAgICB1c2VyTGV2ZWw6IDAsXG4gICAgICBzaG93VGV4dGFyZWE6IHRydWUsXG4gICAgICB0eHRhdXRvOiBmYWxzZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgc2hvd1R4dCAoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRhcmVhID0gZmFsc2VcbiAgICAgICAgdGhpcy50eHRhdXRvID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGJsdXJUYXAgKCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0YXJlYSA9IHRydWVcbiAgICAgICAgdGhpcy50eHRhdXRvID0gZmFsc2VcbiAgICAgIH0sXG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPXBheWNhcnQmbWVtbz0nICsgdGhpcy5tZW1vXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJyxcbiAgICAgICAgICAgICAgaGFzaDogdGhpcy5vcmRlckhhc2gsXG4gICAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgICBtZW1vX21haW46IGVuY29kZVVSSSh0aGlzLm1lbW8pLFxuICAgICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5wdXRUYXAgKGUpIHtcbiAgICAgICAgdGhpcy50eHRMZW5ndGggPSBlLmRldGFpbC52YWx1ZS5sZW5ndGhcbiAgICAgICAgdGhpcy5tZW1vID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgYXBwbHlPcmRlciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5vcmRlckhhc2ggPSBkYXRhLmhhc2hcbiAgICAgICAgICBfdGhpcy5yZWR1Y3Rpb24gPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBfdGhpcy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICAgICAgX3RoaXMudXNlckxldmVsID0gX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgICAgIH0pXG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChpdGVtLnRpdGxlID09PSAn5Ya36ZO+6YWN6YCBJykge1xuICAgICAgICAgICAgICBvYmouaWNvbkNsYXNzID0gJ2ljb24tbmV3X2xscHMnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udGl0bGUgPT09ICfluLjop4TphY3pgIEnKSB7XG4gICAgICAgICAgICAgIG9iai5pY29uQ2xhc3MgPSAnaWNvbi1uZXdfY2dwcydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gdGhpcy5pbml0Q2hpbGQoaXRlbS5zYWxlc1VuaXRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXIucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc29sZS5sb2coX3RoaXMub3JkZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfliJvlu7rorqLljZXlpLHotKUnLFxuICAgICAgICAgICAgY29udGVudDogJ+ivt+eCueWHu+ehruiupOi/lOWbnui0reeJqei9picsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgdXJsOiAnLi9jYXJ0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgaWYgKHBhcmFtLnVzZXIpIHtcbiAgICAgICAgdGhpcy51c2VyID0gSlNPTi5wYXJzZShwYXJhbS51c2VyKVxuICAgICAgICB0aGlzLnBhcmFtTWVtbyA9IHBhcmFtLm1lbW9cbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwbHlPcmRlcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblJlYWR5ICgpIHtcbiAgICAgIHRoaXMubWVtbyA9IHRoaXMucGFyYW1NZW1vXG4gICAgICB0aGlzLnR4dExlbmd0aCA9IHRoaXMucGFyYW1NZW1vLmxlbmd0aFxuICAgIH1cbiAgfVxuIl19