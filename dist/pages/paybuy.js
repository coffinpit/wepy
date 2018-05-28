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
        var _this3 = this;

        this.token = this.$parent.getToken();
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
              var signData = {
                'appId': 'wx4fadd384b39658cd',
                'timeStamp': timeStamp,
                'nonceStr': nonceStr,
                'package': prepayid,
                'signType': 'MD5'
              };
              var sign = _this3.$parent.HttpRequest.getPaySign(signData);
              console.log(sign);
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
                  console.log('fail');
                },
                'complete': function complete(res) {
                  console.log('complete');
                }
              });
            } else {
              _this3.$parent.payFail();
            }
          }).catch(function () {
            _this3.$parent.payFail();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsInRva2VuIiwic291cmNlSWQiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcmVhSWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImJ1eUNvdW50IiwiYWRkcmVzc19tYWluIiwiaWQiLCJtZW1vX21haW4iLCJlbmNvZGVVUkkiLCJkYXRlX21haW4iLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRpbWVTdGFtcCIsInRpbWVzdGFtcCIsInRvU3RyaW5nIiwibm9uY2VTdHIiLCJub25jZXN0ciIsInByZXBheWlkIiwic2lnbkRhdGEiLCJzaWduIiwiZ2V0UGF5U2lnbiIsInJlcXVlc3RQYXltZW50IiwiZXJyTXNnIiwic3dpdGNoVGFiIiwicGF5RmFpbCIsImNhdGNoIiwiaW5wdXRUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiQXBwbHlPcmRlckJ1eSIsInNob3dTdWNjZXNzIiwiZmluYWxQcmljZSIsImNoaWxkT3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJ0ZW1wQ29sZCIsImNvbGRsaXN0IiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInB1c2giLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsImNvbmZpcm0iLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsInZpY2VUaXRsZSIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJ0eXBlIiwiYXBwbHlPcmRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7eUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsU0FBUSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQVQsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE9BQWxCLEVBQTBCLFFBQU8sTUFBakMsRUFBd0MsU0FBUSxPQUFoRCxFQUF3RCxPQUFNLEtBQTlELEVBQWhCLEVBQXFGLHlCQUF3QixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLE9BQS9CLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQTdHLEVBQStMLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLE9BQTNCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQXZOLEVBQWIsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLFEsR0FBVztBQUNUQyxlQURTLHVC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OzJCQUNPWSxLLEVBQU87QUFDYixVQUFJQSxNQUFNeEYsSUFBVixFQUFnQjtBQUNkLGFBQUtBLElBQUwsR0FBWXlGLEtBQUtDLEtBQUwsQ0FBV0YsTUFBTXhGLElBQWpCLENBQVo7QUFDRDtBQUNEZ0MsY0FBUUMsR0FBUixDQUFZdUQsS0FBWjtBQUNBLFdBQUszRixRQUFMLEdBQWdCMkYsTUFBTWhFLEVBQXRCO0FBQ0EsV0FBSzFCLFVBQUwsR0FBa0IwRixNQUFNRyxJQUF4QjtBQUNBLFdBQUs1RixLQUFMLEdBQWF5RixNQUFNekYsS0FBbkI7QUFDQSxXQUFLb0UsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLeUIsVUFBTDtBQUNBLFdBQUt6QixNQUFMO0FBQ0Q7Ozs7RUE1TWlDLGVBQUswQixJOztrQkFBcEJqSCxNIiwiZmlsZSI6InBheWJ1eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUJ1eSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYWRkOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJ1xuICAgICAgfSxcbiAgICAgIGFkZHJlc3NNYWluOiAnJyxcbiAgICAgIGFwcFR5cGU6ICd3ZWInLFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgcmVkdWN0aW9uOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIG1lbWJlclByaWNlOiAnJyxcbiAgICAgIGZpbmFscHJpY2U6ICcnLFxuICAgICAgdHh0TGVuZ3RoOiAwLFxuICAgICAgbWVtbzogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9cGF5YnV5JyArICcmc291cmNlVHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZzb3VyY2VJZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnLFxuICAgICAgICAgICAgc291cmNlVHlwZTogdGhpcy5zb3VyY2VUeXBlLFxuICAgICAgICAgICAgc291cmNlSWQ6IHRoaXMuc291cmNlSWQsXG4gICAgICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudCxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgbWVtb19tYWluOiBlbmNvZGVVUkkodGhpcy5tZW1vKSxcbiAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlT3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coc2lnbilcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBsZXRlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLnR4dExlbmd0aCA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aFxuICAgICAgICB0aGlzLm1lbW8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBseU9yZGVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5Yib5bu66K6i5Y2V5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fngrnlh7vnoa7orqTov5Tlm57otK3nianovaYnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgaWYgKHBhcmFtLnVzZXIpIHtcbiAgICAgICAgdGhpcy51c2VyID0gSlNPTi5wYXJzZShwYXJhbS51c2VyKVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2cocGFyYW0pXG4gICAgICB0aGlzLnNvdXJjZUlkID0gcGFyYW0uaWRcbiAgICAgIHRoaXMuc291cmNlVHlwZSA9IHBhcmFtLnR5cGVcbiAgICAgIHRoaXMuY291bnQgPSBwYXJhbS5jb3VudFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==