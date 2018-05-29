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
        _wepy2.default.redirectTo({
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
                'complete': function complete(res) {}
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsInRva2VuIiwic291cmNlSWQiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwicmVkaXJlY3RUbyIsInVybCIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcmVhSWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImJ1eUNvdW50IiwiYWRkcmVzc19tYWluIiwiaWQiLCJtZW1vX21haW4iLCJlbmNvZGVVUkkiLCJkYXRlX21haW4iLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJzd2l0Y2hUYWIiLCJwYXlGYWlsIiwiY2F0Y2giLCJpbnB1dFRhcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJBcHBseU9yZGVyQnV5Iiwic2hvd1N1Y2Nlc3MiLCJmaW5hbFByaWNlIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsImNvbmZpcm0iLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsInZpY2VUaXRsZSIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJ0eXBlIiwiYXBwbHlPcmRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7eUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsU0FBUSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQVQsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE9BQWxCLEVBQTBCLFFBQU8sTUFBakMsRUFBd0MsU0FBUSxPQUFoRCxFQUF3RCxPQUFNLEtBQTlELEVBQWhCLEVBQXFGLHlCQUF3QixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLE9BQS9CLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQTdHLEVBQStMLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLE9BQTNCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQXZOLEVBQWIsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLFEsR0FBVztBQUNUQyxlQURTLHVCQUNJO0FBQ1gsWUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU8sSUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQ2xELGlCQUFPLElBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVEcsWUFSUyxvQkFRQztBQUNSLFlBQUksS0FBS0MsS0FBTCxDQUFXQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGlCQUFPLElBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRjtBQWRRLEssU0FnQlhDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsZ0JBQVUsRUFGTDtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLGFBQU8sRUFKRjtBQUtMQyxZQUFNO0FBQ0pDLGFBQUs7QUFERCxPQUxEO0FBUUxDLG1CQUFhLEVBUlI7QUFTTEMsZUFBUyxLQVRKO0FBVUxWLGFBQU8sRUFWRjtBQVdMVyxpQkFBVyxFQVhOO0FBWUxDLGVBQVMsRUFaSjtBQWFMQyxXQUFLLEVBYkE7QUFjTEMsbUJBQWEsRUFkUjtBQWVMQyxrQkFBWSxFQWZQO0FBZ0JMQyxpQkFBVyxDQWhCTjtBQWlCTEMsWUFBTTtBQWpCRCxLLFNBbUJQQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUNYLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUssMEJBQTBCLGNBQTFCLEdBQTJDLEtBQUtoQixVQUFoRCxHQUE2RCxZQUE3RCxHQUE0RSxLQUFLRCxRQUFqRixHQUE0RixTQUE1RixHQUF3RyxLQUFLRTtBQURwRyxTQUFoQjtBQUdELE9BTE87QUFNUmdCLFdBTlEsbUJBTUM7QUFBQTs7QUFDUCxhQUFLbkIsS0FBTCxHQUFhLEtBQUtOLE9BQUwsQ0FBYTBCLFFBQWIsRUFBYjtBQUNBLFlBQUksQ0FBQyxLQUFLaEIsSUFBTCxDQUFVaUIsTUFBZixFQUF1QjtBQUNyQix5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLFNBRE07QUFFYkMsa0JBQU0sTUFGTztBQUdiQyxtQkFBTztBQUhNLFdBQWY7QUFLRCxTQU5ELE1BTU87QUFDTCxjQUFJMUIsT0FBTztBQUNUQyxtQkFBTyxLQUFLQSxLQURIO0FBRVRPLHFCQUFTLFNBRkE7QUFHVEwsd0JBQVksS0FBS0EsVUFIUjtBQUlURCxzQkFBVSxLQUFLQSxRQUpOO0FBS1R5QixzQkFBVSxLQUFLdkIsS0FMTjtBQU1Ud0IsMEJBQWMsS0FBS3ZCLElBQUwsQ0FBVXdCLEVBTmY7QUFPVEMsdUJBQVdDLFVBQVUsS0FBS2hCLElBQWYsQ0FQRjtBQVFUaUIsdUJBQVc7QUFSRixXQUFYO0FBVUEsZUFBS3JDLE9BQUwsQ0FBYXNDLFdBQWIsQ0FBeUJDLGNBQXpCLENBQXdDbEMsSUFBeEMsRUFBOENtQyxJQUE5QyxDQUFtRCxVQUFDQyxHQUFELEVBQVM7QUFDMUQsZ0JBQUlBLElBQUlwQyxJQUFKLENBQVNxQyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGtCQUFJckMsT0FBT29DLElBQUlwQyxJQUFKLENBQVNBLElBQXBCO0FBQ0Esa0JBQUlzQyxZQUFZdEMsS0FBS3VDLFNBQUwsQ0FBZUMsUUFBZixFQUFoQjtBQUNBLGtCQUFJQyxXQUFXekMsS0FBSzBDLFFBQXBCO0FBQ0Esa0JBQUlDLFdBQVcsZUFBZTNDLEtBQUsyQyxRQUFuQztBQUNBLGtCQUFJQyxXQUFXO0FBQ2IseUJBQVMsb0JBREk7QUFFYiw2QkFBYU4sU0FGQTtBQUdiLDRCQUFZRyxRQUhDO0FBSWIsMkJBQVdFLFFBSkU7QUFLYiw0QkFBWTtBQUxDLGVBQWY7QUFPQSxrQkFBSUUsT0FBTyxPQUFLbEQsT0FBTCxDQUFhc0MsV0FBYixDQUF5QmEsVUFBekIsQ0FBb0NGLFFBQXBDLENBQVg7QUFDQSw2QkFBS0csY0FBTCxDQUFvQjtBQUNsQiw2QkFBYVQsU0FESztBQUVsQiw0QkFBWUcsUUFGTTtBQUdsQiwyQkFBV0UsUUFITztBQUlsQiw0QkFBWSxLQUpNO0FBS2xCLDJCQUFXRSxJQUxPO0FBTWxCLDJCQUFXLGlCQUFDVCxHQUFELEVBQVM7QUFDbEIsc0JBQUlBLElBQUlZLE1BQUosS0FBZSxtQkFBbkIsRUFBd0M7QUFDdEM7QUFDQSxtQ0FBS0MsU0FBTCxDQUFlO0FBQ2I5QiwyQkFBSztBQURRLHFCQUFmO0FBR0QsbUJBTEQsTUFLTyxJQUFJaUIsSUFBSVksTUFBSixLQUFlLHVCQUFuQixFQUE0QztBQUNqRDtBQUNBLDJCQUFLckQsT0FBTCxDQUFhdUQsT0FBYjtBQUNEO0FBQ0YsaUJBaEJpQjtBQWlCbEIsd0JBQVEsY0FBQ2QsR0FBRCxFQUFTO0FBQ2YseUJBQUt6QyxPQUFMLENBQWF1RCxPQUFiO0FBQ0QsaUJBbkJpQjtBQW9CbEIsNEJBQVksa0JBQUNkLEdBQUQsRUFBUyxDQUNwQjtBQXJCaUIsZUFBcEI7QUF1QkQsYUFwQ0QsTUFvQ087QUFDTCxxQkFBS3pDLE9BQUwsQ0FBYXVELE9BQWI7QUFDRDtBQUNGLFdBeENELEVBd0NHQyxLQXhDSCxDQXdDUyxZQUFNO0FBQ2IsbUJBQUt4RCxPQUFMLENBQWF1RCxPQUFiO0FBQ0QsV0ExQ0Q7QUEyQ0Q7QUFDRixPQXJFTztBQXNFUkUsY0F0RVEsb0JBc0VFQyxDQXRFRixFQXNFSztBQUNYLGFBQUt2QyxTQUFMLEdBQWlCdUMsRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWV4RCxNQUFoQztBQUNBLGFBQUtnQixJQUFMLEdBQVlzQyxFQUFFQyxNQUFGLENBQVNDLEtBQXJCO0FBQ0Q7QUF6RU8sSzs7Ozs7aUNBMkVJO0FBQUE7O0FBQ1osV0FBS3RELEtBQUwsR0FBYSxLQUFLTixPQUFMLENBQWEwQixRQUFiLEVBQWI7QUFDQSxXQUFLMUIsT0FBTCxDQUFhNkQsV0FBYjtBQUNBLFdBQUsxRCxLQUFMLEdBQWEsRUFBYjtBQUNBLFVBQUkyRCxRQUFRLElBQVo7QUFDQSxVQUFJekQsT0FBTztBQUNUQyxlQUFPLEtBQUtBLEtBREg7QUFFVEUsb0JBQVksS0FBS0EsVUFGUjtBQUdURCxrQkFBVSxLQUFLQSxRQUhOO0FBSVR5QixrQkFBVSxLQUFLdkI7QUFKTixPQUFYO0FBTUEsV0FBS1QsT0FBTCxDQUFhc0MsV0FBYixDQUF5QnlCLGFBQXpCLENBQXVDMUQsSUFBdkMsRUFBNkNtQyxJQUE3QyxDQUFrRCxVQUFDQyxHQUFELEVBQVM7QUFDekQsWUFBSUEsSUFBSXBDLElBQUosQ0FBU3FDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJvQixnQkFBTTlELE9BQU4sQ0FBY2dFLFdBQWQ7QUFDQSxjQUFJM0QsT0FBT29DLElBQUlwQyxJQUFKLENBQVNBLElBQXBCO0FBQ0F5RCxnQkFBTWhELFNBQU4sR0FBa0JULEtBQUtTLFNBQXZCO0FBQ0FnRCxnQkFBTS9DLE9BQU4sR0FBZ0JWLEtBQUtVLE9BQXJCO0FBQ0ErQyxnQkFBTTlDLEdBQU4sR0FBWVgsS0FBS1csR0FBakI7QUFDQThDLGdCQUFNN0MsV0FBTixHQUFvQlosS0FBS1ksV0FBekI7QUFDQTZDLGdCQUFNNUMsVUFBTixHQUFtQmIsS0FBSzRELFVBQXhCO0FBQ0E1RCxlQUFLNkQsV0FBTCxDQUFpQkMsT0FBakIsQ0FBeUIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDLGdCQUFJQyxNQUFNLEVBQVY7QUFDQUEsZ0JBQUl4QyxLQUFKLEdBQVl1QyxLQUFLdkMsS0FBakI7QUFDQXdDLGdCQUFJdEQsT0FBSixHQUFjcUQsS0FBS3JELE9BQW5CO0FBQ0FzRCxnQkFBSUMsUUFBSixHQUFlLEVBQWY7QUFDQUQsZ0JBQUlFLFFBQUosR0FBZSxPQUFLQyxTQUFMLENBQWVKLEtBQUtLLFVBQXBCLENBQWY7QUFDQVgsa0JBQU0zRCxLQUFOLENBQVl1RSxJQUFaLENBQWlCTCxHQUFqQjtBQUNBUCxrQkFBTWEsTUFBTjtBQUNELFdBUkQ7QUFTQUMsa0JBQVFDLEdBQVIsQ0FBWWYsTUFBTTNELEtBQWxCO0FBQ0QsU0FsQkQsTUFrQk87QUFDTCx5QkFBSzJFLFdBQUw7QUFDQSx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JsRCxtQkFBTyxRQURNO0FBRWJtRCxxQkFBUyxZQUZJO0FBR2JDLHdCQUFZLEtBSEM7QUFJYkMscUJBQVMsaUJBQUN6QyxHQUFELEVBQVM7QUFDaEIsa0JBQUlBLElBQUkwQyxPQUFSLEVBQWlCO0FBQ2YsK0JBQUs3QixTQUFMLENBQWU7QUFDYjlCLHVCQUFLO0FBRFEsaUJBQWY7QUFHRDtBQUNGO0FBVlksV0FBZjtBQVlEO0FBQ0YsT0FsQ0QsRUFrQ0dnQyxLQWxDSCxDQWtDUyxZQUFNO0FBQ2JNLGNBQU05RCxPQUFOLENBQWNvRixRQUFkO0FBQ0QsT0FwQ0Q7QUFxQ0Q7Ozs4QkFDVUMsTSxFQUFRO0FBQ2pCLFVBQUlDLFFBQVEsRUFBWjtBQUNBRCxhQUFPbEIsT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN2QixZQUFJQyxNQUFNLEVBQVY7QUFDQUEsWUFBSWtCLElBQUosR0FBV25CLEtBQUtvQixLQUFoQjtBQUNBbkIsWUFBSXhDLEtBQUosR0FBWXVDLEtBQUt2QyxLQUFqQjtBQUNBd0MsWUFBSW9CLEtBQUosR0FBWXJCLEtBQUtuRCxXQUFqQjtBQUNBb0QsWUFBSXFCLFFBQUosR0FBZXRCLEtBQUtxQixLQUFwQjtBQUNBcEIsWUFBSW5DLEVBQUosR0FBU2tDLEtBQUt1QixTQUFkO0FBQ0F0QixZQUFJN0QsVUFBSixHQUFpQjRELEtBQUt3QixhQUF0QjtBQUNBdkIsWUFBSTlELFFBQUosR0FBZTZELEtBQUt5QixXQUFwQjtBQUNBeEIsWUFBSVYsTUFBSixHQUFhUyxLQUFLMEIsU0FBTCxHQUFpQixHQUFqQixHQUF1QjFCLEtBQUtwQyxRQUF6QztBQUNBcUMsWUFBSTBCLE9BQUosR0FBYyxLQUFkO0FBQ0ExQixZQUFJMkIsVUFBSixHQUFpQjVCLEtBQUs2QixTQUF0QjtBQUNBWCxjQUFNWixJQUFOLENBQVdMLEdBQVg7QUFDRCxPQWJEO0FBY0EsYUFBT2lCLEtBQVA7QUFDRDs7OzJCQUNPWSxLLEVBQU87QUFDYixVQUFJQSxNQUFNeEYsSUFBVixFQUFnQjtBQUNkLGFBQUtBLElBQUwsR0FBWXlGLEtBQUtDLEtBQUwsQ0FBV0YsTUFBTXhGLElBQWpCLENBQVo7QUFDRDtBQUNEa0UsY0FBUUMsR0FBUixDQUFZcUIsS0FBWjtBQUNBLFdBQUszRixRQUFMLEdBQWdCMkYsTUFBTWhFLEVBQXRCO0FBQ0EsV0FBSzFCLFVBQUwsR0FBa0IwRixNQUFNRyxJQUF4QjtBQUNBLFdBQUs1RixLQUFMLEdBQWF5RixNQUFNekYsS0FBbkI7QUFDQSxXQUFLa0UsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLMkIsVUFBTDtBQUNBLFdBQUszQixNQUFMO0FBQ0Q7Ozs7RUF4TWlDLGVBQUs0QixJOztrQkFBcEJqSCxNIiwiZmlsZSI6InBheWJ1eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUJ1eSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYWRkOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJ1xuICAgICAgfSxcbiAgICAgIGFkZHJlc3NNYWluOiAnJyxcbiAgICAgIGFwcFR5cGU6ICd3ZWInLFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgcmVkdWN0aW9uOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIG1lbWJlclByaWNlOiAnJyxcbiAgICAgIGZpbmFscHJpY2U6ICcnLFxuICAgICAgdHh0TGVuZ3RoOiAwLFxuICAgICAgbWVtbzogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9cGF5YnV5JyArICcmc291cmNlVHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZzb3VyY2VJZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnLFxuICAgICAgICAgICAgc291cmNlVHlwZTogdGhpcy5zb3VyY2VUeXBlLFxuICAgICAgICAgICAgc291cmNlSWQ6IHRoaXMuc291cmNlSWQsXG4gICAgICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudCxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgbWVtb19tYWluOiBlbmNvZGVVUkkodGhpcy5tZW1vKSxcbiAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlT3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlucHV0VGFwIChlKSB7XG4gICAgICAgIHRoaXMudHh0TGVuZ3RoID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoXG4gICAgICAgIHRoaXMubWVtbyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGFwcGx5T3JkZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuc291cmNlSWQsXG4gICAgICAgIGJ1eUNvdW50OiB0aGlzLmNvdW50XG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQXBwbHlPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMucmVkdWN0aW9uID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gdGhpcy5pbml0Q2hpbGQoaXRlbS5zYWxlc1VuaXRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXIucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc29sZS5sb2coX3RoaXMub3JkZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfliJvlu7rorqLljZXlpLHotKUnLFxuICAgICAgICAgICAgY29udGVudDogJ+ivt+eCueWHu+ehruiupOi/lOWbnui0reeJqei9picsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgdXJsOiAnLi9jYXJ0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhwYXJhbSlcbiAgICAgIHRoaXMuc291cmNlSWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy5zb3VyY2VUeXBlID0gcGFyYW0udHlwZVxuICAgICAgdGhpcy5jb3VudCA9IHBhcmFtLmNvdW50XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmFwcGx5T3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19