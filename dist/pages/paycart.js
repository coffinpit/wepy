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
            memo_main: encodeURI(this.memo),
            date_main: 4
          };
          console.log(data);
          this.$parent.HttpRequest.CreateUserOrder(data).then(function (res) {
            if (res.data.error !== 0) {
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

  return PayCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayCart , 'pages/paycart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNOdWxsIiwib3JkZXIiLCJsZW5ndGgiLCJkYXRhIiwib3JkZXJIYXNoIiwidG9rZW4iLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvUGF5IiwiYXJlYUlkIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJoYXNoIiwiYWRkcmVzc19tYWluIiwiaWQiLCJtZW1vX21haW4iLCJlbmNvZGVVUkkiLCJkYXRlX21haW4iLCJjb25zb2xlIiwibG9nIiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVVc2VyT3JkZXIiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJoaWRlTG9hZGluZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwiY29uZmlybSIsInN3aXRjaFRhYiIsImlucHV0VGFwIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkFwcGx5T3JkZXJIdHRwIiwic2hvd1N1Y2Nlc3MiLCJmaW5hbFByaWNlIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJ2aWNlVGl0bGUiLCJidXlDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJnZXRUb2tlbiIsImFwcGx5T3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzJMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFULEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxLQUE5RCxFQUFoQixFQUFxRix5QkFBd0IsRUFBQyxTQUFRLGVBQVQsRUFBeUIsT0FBTSxPQUEvQixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUE3RyxFQUErTCx5QkFBd0IsRUFBQyxTQUFRLFdBQVQsRUFBcUIsT0FBTSxPQUEzQixFQUFtQyxRQUFPLE1BQTFDLEVBQWlELFNBQVEsT0FBekQsRUFBaUUsT0FBTSxLQUF2RSxFQUF2TixFQUFiLEUsU0FDVEMsTyxHQUFVLEUsU0FDVEMsVSxHQUFhO0FBQ1JDO0FBRFEsSyxTQUdWQyxRLEdBQVc7QUFDVEMsZUFEUyx1QkFDSTtBQUNYLFlBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxpQkFBTyxLQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixL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RUFBUTtBQUNqQixVQUFJQyxRQUFRLEVBQVo7QUFDQUQsYUFBT1gsT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN2QixZQUFJQyxNQUFNLEVBQVY7QUFDQUEsWUFBSVcsSUFBSixHQUFXWixLQUFLYSxLQUFoQjtBQUNBWixZQUFJbEMsS0FBSixHQUFZaUMsS0FBS2pDLEtBQWpCO0FBQ0FrQyxZQUFJYSxLQUFKLEdBQVlkLEtBQUs1QyxXQUFqQjtBQUNBNkMsWUFBSWMsUUFBSixHQUFlZixLQUFLYyxLQUFwQjtBQUNBYixZQUFJN0IsRUFBSixHQUFTNEIsS0FBS2dCLFNBQWQ7QUFDQWYsWUFBSWdCLFVBQUosR0FBaUJqQixLQUFLa0IsYUFBdEI7QUFDQWpCLFlBQUlrQixRQUFKLEdBQWVuQixLQUFLb0IsV0FBcEI7QUFDQW5CLFlBQUlWLE1BQUosR0FBYVMsS0FBS3FCLFNBQUwsR0FBaUIsR0FBakIsR0FBdUJyQixLQUFLc0IsUUFBekM7QUFDQXJCLFlBQUlzQixPQUFKLEdBQWMsS0FBZDtBQUNBdEIsWUFBSXVCLFVBQUosR0FBaUJ4QixLQUFLeUIsU0FBdEI7QUFDQWQsY0FBTUwsSUFBTixDQUFXTCxHQUFYO0FBQ0QsT0FiRDtBQWNBLGFBQU9VLEtBQVA7QUFDRDs7OzJCQUNPZSxLLEVBQU87QUFDYixVQUFJQSxNQUFNN0UsSUFBVixFQUFnQjtBQUNkLGFBQUtBLElBQUwsR0FBWThFLEtBQUtDLEtBQUwsQ0FBV0YsTUFBTTdFLElBQWpCLENBQVo7QUFDRDtBQUNELFdBQUtELEtBQUwsR0FBYSxLQUFLUCxPQUFMLENBQWF3RixRQUFiLEVBQWI7QUFDQSxXQUFLdEIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLdUIsVUFBTDtBQUNBLFdBQUt2QixNQUFMO0FBQ0Q7Ozs7RUFuS2tDLGVBQUt3QixJOztrQkFBckJwRyxPIiwiZmlsZSI6InBheWNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXlDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIG9yZGVySGFzaDogJycsXG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGFkZDogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCdcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzTWFpbjogJycsXG4gICAgICBhcHBUeXBlOiAnd2ViJyxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIHJlZHVjdGlvbjogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBtZW1iZXJQcmljZTogJycsXG4gICAgICBmaW5hbHByaWNlOiAnJyxcbiAgICAgIHR4dExlbmd0aDogMCxcbiAgICAgIG1lbW86ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPXBheWNhcnQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ2lvcycsXG4gICAgICAgICAgICBoYXNoOiB0aGlzLm9yZGVySGFzaCxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgbWVtb19tYWluOiBlbmNvZGVVUkkodGhpcy5tZW1vKSxcbiAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOiuouWNleWksei0pScsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ivt+eCueWHu+ehruiupOi/lOWbnui0reeJqei9picsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2NhcnQnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLnR4dExlbmd0aCA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aFxuICAgICAgICB0aGlzLm1lbW8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBseU9yZGVyICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLm9yZGVySGFzaCA9IGRhdGEuaGFzaFxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLm1lbWJlclByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5Yib5bu66K6i5Y2V5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fngrnlh7vnoa7orqTov5Tlm57otK3nianovaYnLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcuL2NhcnQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS51c2VyKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UocGFyYW0udXNlcilcbiAgICAgIH1cbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==