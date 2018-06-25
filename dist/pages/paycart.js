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
      payment: true,
      paramMemo: ''
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNOdWxsIiwib3JkZXIiLCJsZW5ndGgiLCJkYXRhIiwib3JkZXJIYXNoIiwidG9rZW4iLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJwYXltZW50IiwicGFyYW1NZW1vIiwibWV0aG9kcyIsImdvQWRkcmVzcyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwibmF2aWdhdGVUbyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcmVhSWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImhhc2giLCJhZGRyZXNzX21haW4iLCJpZCIsIm1lbW9fbWFpbiIsImVuY29kZVVSSSIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlVXNlck9yZGVyIiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJwYXlGYWlsIiwiY2F0Y2giLCJpbnB1dFRhcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJBcHBseU9yZGVySHR0cCIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidGVtcENvbGQiLCJjb2xkbGlzdCIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJwdXNoIiwiJGFwcGx5Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwiY29uZmlybSIsInN3aXRjaFRhYiIsInNob3dGYWlsIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwidmljZVRpdGxlIiwiYnV5Q291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwiYXBwbHlPcmRlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsU0FBUSxFQUFDLE9BQU0sV0FBUCxFQUFtQixTQUFRLEVBQTNCLEVBQVQsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE9BQWxCLEVBQTBCLFFBQU8sTUFBakMsRUFBd0MsU0FBUSxPQUFoRCxFQUF3RCxPQUFNLEtBQTlELEVBQWhCLEVBQXFGLHlCQUF3QixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLE9BQS9CLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLEtBQTNFLEVBQTdHLEVBQStMLHlCQUF3QixFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLE9BQTNCLEVBQW1DLFFBQU8sTUFBMUMsRUFBaUQsU0FBUSxPQUF6RCxFQUFpRSxPQUFNLEtBQXZFLEVBQXZOLEVBQWIsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLFEsR0FBVztBQUNUQyxlQURTLHVCQUNJO0FBQ1gsWUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU8sSUFBSSxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQ2xELGlCQUFPLElBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVEcsWUFSUyxvQkFRQztBQUNSLFlBQUksS0FBS0MsS0FBTCxDQUFXQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGlCQUFPLElBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRjtBQWRRLEssU0FnQlhDLEksR0FBTztBQUNMQyxpQkFBVyxFQUROO0FBRUxDLGFBQU8sRUFGRjtBQUdMQyxZQUFNO0FBQ0pDLGFBQUs7QUFERCxPQUhEO0FBTUxDLG1CQUFhLEVBTlI7QUFPTEMsZUFBUyxLQVBKO0FBUUxSLGFBQU8sRUFSRjtBQVNMUyxpQkFBVyxFQVROO0FBVUxDLGVBQVMsRUFWSjtBQVdMQyxXQUFLLEVBWEE7QUFZTEMsbUJBQWEsRUFaUjtBQWFMQyxrQkFBWSxFQWJQO0FBY0xDLGlCQUFXLENBZE47QUFlTEMsWUFBTSxFQWZEO0FBZ0JMQyxlQUFTLElBaEJKO0FBaUJMQyxpQkFBVztBQWpCTixLLFNBbUJQQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUNYLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUssaUNBQWlDLEtBQUtOO0FBRDdCLFNBQWhCO0FBR0QsT0FMTztBQU1STyxnQkFOUSx3QkFNTTtBQUNaLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RGLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BVk87QUFXUkcsV0FYUSxtQkFXQztBQUFBOztBQUNQLGFBQUtwQixLQUFMLEdBQWEsS0FBS1AsT0FBTCxDQUFhNEIsUUFBYixFQUFiO0FBQ0EsWUFBSSxDQUFDLEtBQUtwQixJQUFMLENBQVVxQixNQUFmLEVBQXVCO0FBQ3JCLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sU0FETTtBQUViQyxrQkFBTSxNQUZPO0FBR2JDLG1CQUFPO0FBSE0sV0FBZjtBQUtELFNBTkQsTUFNTztBQUNMLGNBQUksS0FBS2QsT0FBVCxFQUFrQjtBQUNoQixnQkFBSWQsT0FBTztBQUNURSxxQkFBTyxLQUFLQSxLQURIO0FBRVRJLHVCQUFTLFNBRkE7QUFHVHVCLG9CQUFNLEtBQUs1QixTQUhGO0FBSVQ2Qiw0QkFBYyxLQUFLM0IsSUFBTCxDQUFVNEIsRUFKZjtBQUtUQyx5QkFBV0MsVUFBVSxLQUFLcEIsSUFBZixDQUxGO0FBTVRxQix5QkFBVztBQU5GLGFBQVg7QUFRQSxpQkFBS3ZDLE9BQUwsQ0FBYXdDLFdBQWIsQ0FBeUJDLGVBQXpCLENBQXlDcEMsSUFBekMsRUFBK0NxQyxJQUEvQyxDQUFvRCxVQUFDQyxHQUFELEVBQVM7QUFDM0Qsa0JBQUlBLElBQUl0QyxJQUFKLENBQVN1QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLG9CQUFJdkMsT0FBT3NDLElBQUl0QyxJQUFKLENBQVNBLElBQXBCO0FBQ0Esb0JBQUl3QyxZQUFZeEMsS0FBS3lDLFNBQUwsQ0FBZUMsUUFBZixFQUFoQjtBQUNBLG9CQUFJQyxXQUFXM0MsS0FBSzRDLFFBQXBCO0FBQ0Esb0JBQUlDLFdBQVcsZUFBZTdDLEtBQUs2QyxRQUFuQztBQUNBLG9CQUFJQyxXQUFXO0FBQ2IsMkJBQVMsb0JBREk7QUFFYiwrQkFBYU4sU0FGQTtBQUdiLDhCQUFZRyxRQUhDO0FBSWIsNkJBQVdFLFFBSkU7QUFLYiw4QkFBWTtBQUxDLGlCQUFmO0FBT0Esb0JBQUlFLE9BQU8sT0FBS3BELE9BQUwsQ0FBYXdDLFdBQWIsQ0FBeUJhLFVBQXpCLENBQW9DRixRQUFwQyxDQUFYO0FBQ0EsK0JBQUtHLGNBQUwsQ0FBb0I7QUFDbEIsK0JBQWFULFNBREs7QUFFbEIsOEJBQVlHLFFBRk07QUFHbEIsNkJBQVdFLFFBSE87QUFJbEIsOEJBQVksS0FKTTtBQUtsQiw2QkFBV0UsSUFMTztBQU1sQiw2QkFBVyxpQkFBQ1QsR0FBRCxFQUFTO0FBQ2xCLHdCQUFJQSxJQUFJWSxNQUFKLEtBQWUsbUJBQW5CLEVBQXdDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQUtoQyxVQUFMLENBQWdCO0FBQ2RDLDZCQUFLO0FBRFMsdUJBQWhCO0FBR0QscUJBUkQsTUFRTyxJQUFJbUIsSUFBSVksTUFBSixLQUFlLHVCQUFuQixFQUE0QztBQUNqRDtBQUNBLDZCQUFLdkQsT0FBTCxDQUFhd0QsT0FBYjtBQUNEO0FBQ0YsbUJBbkJpQjtBQW9CbEIsMEJBQVEsY0FBQ2IsR0FBRCxFQUFTO0FBQ2YsMkJBQUszQyxPQUFMLENBQWF3RCxPQUFiO0FBQ0QsbUJBdEJpQjtBQXVCbEIsOEJBQVksa0JBQUNiLEdBQUQsRUFBUztBQUNuQiwyQkFBS3hCLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUF6QmlCLGlCQUFwQjtBQTJCRCxlQXhDRCxNQXdDTztBQUNMLHVCQUFLbkIsT0FBTCxDQUFhd0QsT0FBYjtBQUNEO0FBQ0YsYUE1Q0QsRUE0Q0dDLEtBNUNILENBNENTLFlBQU07QUFDYixxQkFBS3pELE9BQUwsQ0FBYXdELE9BQWI7QUFDRCxhQTlDRDtBQStDRDtBQUNELGVBQUtyQyxPQUFMLEdBQWUsS0FBZjtBQUNEO0FBQ0YsT0EvRU87QUFnRlJ1QyxjQWhGUSxvQkFnRkVDLENBaEZGLEVBZ0ZLO0FBQ1gsYUFBSzFDLFNBQUwsR0FBaUIwQyxFQUFFQyxNQUFGLENBQVNDLEtBQVQsQ0FBZXpELE1BQWhDO0FBQ0EsYUFBS2MsSUFBTCxHQUFZeUMsRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNEO0FBbkZPLEs7Ozs7O2lDQXFGSTtBQUFBOztBQUNaLFdBQUt0RCxLQUFMLEdBQWEsS0FBS1AsT0FBTCxDQUFhNEIsUUFBYixFQUFiO0FBQ0EsV0FBSzVCLE9BQUwsQ0FBYThELFdBQWI7QUFDQSxXQUFLM0QsS0FBTCxHQUFhLEVBQWI7QUFDQSxVQUFJNEQsUUFBUSxJQUFaO0FBQ0EsVUFBSTFELE9BQU87QUFDVEUsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLUCxPQUFMLENBQWF3QyxXQUFiLENBQXlCd0IsY0FBekIsQ0FBd0MzRCxJQUF4QyxFQUE4Q3FDLElBQTlDLENBQW1ELFVBQUNDLEdBQUQsRUFBUztBQUMxRHNCLGdCQUFRQyxHQUFSLENBQVl2QixHQUFaO0FBQ0FvQixjQUFNL0QsT0FBTixDQUFjbUUsV0FBZDtBQUNBLFlBQUl4QixJQUFJdEMsSUFBSixDQUFTdUMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixjQUFJdkMsT0FBT3NDLElBQUl0QyxJQUFKLENBQVNBLElBQXBCO0FBQ0EwRCxnQkFBTXpELFNBQU4sR0FBa0JELEtBQUs2QixJQUF2QjtBQUNBNkIsZ0JBQU1uRCxTQUFOLEdBQWtCUCxLQUFLTyxTQUF2QjtBQUNBbUQsZ0JBQU1sRCxPQUFOLEdBQWdCUixLQUFLUSxPQUFyQjtBQUNBa0QsZ0JBQU1oRCxXQUFOLEdBQW9CVixLQUFLVSxXQUF6QjtBQUNBZ0QsZ0JBQU1qRCxHQUFOLEdBQVlULEtBQUtTLEdBQWpCO0FBQ0FpRCxnQkFBTS9DLFVBQU4sR0FBbUJYLEtBQUsrRCxVQUF4QjtBQUNBL0QsZUFBS2dFLFdBQUwsQ0FBaUJDLE9BQWpCLENBQXlCLFVBQUNDLElBQUQsRUFBVTtBQUNqQyxnQkFBSUMsTUFBTSxFQUFWO0FBQ0FBLGdCQUFJekMsS0FBSixHQUFZd0MsS0FBS3hDLEtBQWpCO0FBQ0F5QyxnQkFBSTNELE9BQUosR0FBYzBELEtBQUsxRCxPQUFuQjtBQUNBMkQsZ0JBQUlDLFFBQUosR0FBZSxFQUFmO0FBQ0FELGdCQUFJRSxRQUFKLEdBQWUsT0FBS0MsU0FBTCxDQUFlSixLQUFLSyxVQUFwQixDQUFmO0FBQ0FiLGtCQUFNNUQsS0FBTixDQUFZMEUsSUFBWixDQUFpQkwsR0FBakI7QUFDQVQsa0JBQU1lLE1BQU47QUFDRCxXQVJEO0FBU0FiLGtCQUFRQyxHQUFSLENBQVlILE1BQU01RCxLQUFsQjtBQUNELFNBbEJELE1Ba0JPO0FBQ0wseUJBQUtnRSxXQUFMO0FBQ0EseUJBQUtZLFNBQUwsQ0FBZTtBQUNiaEQsbUJBQU8sUUFETTtBQUViaUQscUJBQVMsWUFGSTtBQUdiQyx3QkFBWSxLQUhDO0FBSWJDLHFCQUFTLGlCQUFDdkMsR0FBRCxFQUFTO0FBQ2hCLGtCQUFJQSxJQUFJd0MsT0FBUixFQUFpQjtBQUNmLCtCQUFLQyxTQUFMLENBQWU7QUFDYjVELHVCQUFLO0FBRFEsaUJBQWY7QUFHRDtBQUNGO0FBVlksV0FBZjtBQVlEO0FBQ0YsT0FwQ0QsRUFvQ0dpQyxLQXBDSCxDQW9DUyxZQUFNO0FBQ2JNLGNBQU0vRCxPQUFOLENBQWNtRSxXQUFkO0FBQ0FKLGNBQU0vRCxPQUFOLENBQWNxRixRQUFkO0FBQ0QsT0F2Q0Q7QUF3Q0Q7Ozs4QkFDVUMsTSxFQUFRO0FBQ2pCLFVBQUlDLFFBQVEsRUFBWjtBQUNBRCxhQUFPaEIsT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN2QixZQUFJQyxNQUFNLEVBQVY7QUFDQUEsWUFBSWdCLElBQUosR0FBV2pCLEtBQUtrQixLQUFoQjtBQUNBakIsWUFBSXpDLEtBQUosR0FBWXdDLEtBQUt4QyxLQUFqQjtBQUNBeUMsWUFBSWtCLEtBQUosR0FBWW5CLEtBQUt4RCxXQUFqQjtBQUNBeUQsWUFBSW1CLFFBQUosR0FBZXBCLEtBQUttQixLQUFwQjtBQUNBbEIsWUFBSXBDLEVBQUosR0FBU21DLEtBQUtxQixTQUFkO0FBQ0FwQixZQUFJcUIsVUFBSixHQUFpQnRCLEtBQUt1QixhQUF0QjtBQUNBdEIsWUFBSXVCLFFBQUosR0FBZXhCLEtBQUt5QixXQUFwQjtBQUNBeEIsWUFBSVosTUFBSixHQUFhVyxLQUFLMEIsU0FBTCxHQUFpQixHQUFqQixHQUF1QjFCLEtBQUsyQixRQUF6QztBQUNBMUIsWUFBSTJCLE9BQUosR0FBYyxLQUFkO0FBQ0EzQixZQUFJNEIsVUFBSixHQUFpQjdCLEtBQUs4QixTQUF0QjtBQUNBZCxjQUFNVixJQUFOLENBQVdMLEdBQVg7QUFDRCxPQWJEO0FBY0EsYUFBT2UsS0FBUDtBQUNEOzs7MkJBQ09lLEssRUFBTztBQUNiLFVBQUlBLE1BQU05RixJQUFWLEVBQWdCO0FBQ2QsYUFBS0EsSUFBTCxHQUFZK0YsS0FBS0MsS0FBTCxDQUFXRixNQUFNOUYsSUFBakIsQ0FBWjtBQUNBLGFBQUtZLFNBQUwsR0FBaUJrRixNQUFNcEYsSUFBdkI7QUFDRDtBQUNELFdBQUt1RixVQUFMO0FBQ0EsV0FBSzNCLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0EsTUFBTDtBQUNEOzs7OEJBQ1U7QUFDVCxXQUFLNUQsSUFBTCxHQUFZLEtBQUtFLFNBQWpCO0FBQ0EsV0FBS0gsU0FBTCxHQUFpQixLQUFLRyxTQUFMLENBQWVoQixNQUFoQztBQUNEOzs7O0VBbk5rQyxlQUFLc0csSTs7a0JBQXJCcEgsTyIsImZpbGUiOiJwYXljYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5Q2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBvcmRlckhhc2g6ICcnLFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlcjoge1xuICAgICAgICBhZGQ6ICfor7fpgInmi6nmlLbotKflnLDlnYAnXG4gICAgICB9LFxuICAgICAgYWRkcmVzc01haW46ICcnLFxuICAgICAgYXBwVHlwZTogJ3dlYicsXG4gICAgICBvcmRlcjogW10sXG4gICAgICByZWR1Y3Rpb246ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgbWVtYmVyUHJpY2U6ICcnLFxuICAgICAgZmluYWxwcmljZTogJycsXG4gICAgICB0eHRMZW5ndGg6IDAsXG4gICAgICBtZW1vOiAnJyxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBwYXJhbU1lbW86ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPXBheWNhcnQmbWVtbz0nICsgdGhpcy5tZW1vXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJyxcbiAgICAgICAgICAgICAgaGFzaDogdGhpcy5vcmRlckhhc2gsXG4gICAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgICBtZW1vX21haW46IGVuY29kZVVSSSh0aGlzLm1lbW8pLFxuICAgICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5wdXRUYXAgKGUpIHtcbiAgICAgICAgdGhpcy50eHRMZW5ndGggPSBlLmRldGFpbC52YWx1ZS5sZW5ndGhcbiAgICAgICAgdGhpcy5tZW1vID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgYXBwbHlPcmRlciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFwcGx5T3JkZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5vcmRlckhhc2ggPSBkYXRhLmhhc2hcbiAgICAgICAgICBfdGhpcy5yZWR1Y3Rpb24gPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBfdGhpcy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5vcmRlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+WIm+W7uuiuouWNleWksei0pScsXG4gICAgICAgICAgICBjb250ZW50OiAn6K+354K55Ye756Gu6K6k6L+U5Zue6LSt54mp6L2mJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcuL2NhcnQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICAgIHRoaXMucGFyYW1NZW1vID0gcGFyYW0ubWVtb1xuICAgICAgfVxuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLm1lbW8gPSB0aGlzLnBhcmFtTWVtb1xuICAgICAgdGhpcy50eHRMZW5ndGggPSB0aGlzLnBhcmFtTWVtby5sZW5ndGhcbiAgICB9XG4gIH1cbiJdfQ==