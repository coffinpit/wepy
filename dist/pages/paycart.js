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
        _wepy2.default.redirectTo({
          url: './address?page=paycart'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNOdWxsIiwib3JkZXIiLCJsZW5ndGgiLCJkYXRhIiwib3JkZXJIYXNoIiwidG9rZW4iLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwicmVkaXJlY3RUbyIsInVybCIsImdvUGF5IiwiZ2V0VG9rZW4iLCJhcmVhSWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImhhc2giLCJhZGRyZXNzX21haW4iLCJpZCIsIm1lbW9fbWFpbiIsImVuY29kZVVSSSIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlVXNlck9yZGVyIiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJjb25zb2xlIiwibG9nIiwiZXJyTXNnIiwic3dpdGNoVGFiIiwicGF5RmFpbCIsImNhdGNoIiwiaW5wdXRUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiQXBwbHlPcmRlckh0dHAiLCJzaG93U3VjY2VzcyIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidGVtcENvbGQiLCJjb2xkbGlzdCIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJwdXNoIiwiJGFwcGx5IiwiaGlkZUxvYWRpbmciLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJjb25maXJtIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJ2aWNlVGl0bGUiLCJidXlDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJhcHBseU9yZGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsT0FBTSxXQUFQLEVBQW1CLFNBQVEsRUFBM0IsRUFBVCxFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sT0FBbEIsRUFBMEIsUUFBTyxNQUFqQyxFQUF3QyxTQUFRLE9BQWhELEVBQXdELE9BQU0sS0FBOUQsRUFBaEIsRUFBcUYseUJBQXdCLEVBQUMsU0FBUSxlQUFULEVBQXlCLE9BQU0sT0FBL0IsRUFBdUMsUUFBTyxNQUE5QyxFQUFxRCxTQUFRLE9BQTdELEVBQXFFLE9BQU0sS0FBM0UsRUFBN0csRUFBK0wseUJBQXdCLEVBQUMsU0FBUSxXQUFULEVBQXFCLE9BQU0sT0FBM0IsRUFBbUMsUUFBTyxNQUExQyxFQUFpRCxTQUFRLE9BQXpELEVBQWlFLE9BQU0sS0FBdkUsRUFBdk4sRUFBYixFLFNBQ1RDLE8sR0FBVSxFLFNBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssU0FHVkMsUSxHQUFXO0FBQ1RDLGVBRFMsdUJBQ0k7QUFDWCxZQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDM0MsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDbEQsaUJBQU8sSUFBUDtBQUNEO0FBQ0YsT0FQUTtBQVFURyxZQVJTLG9CQVFDO0FBQ1IsWUFBSSxLQUFLQyxLQUFMLENBQVdDLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsaUJBQU8sSUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGO0FBZFEsSyxTQWdCWEMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsYUFBTyxFQUZGO0FBR0xDLFlBQU07QUFDSkMsYUFBSztBQURELE9BSEQ7QUFNTEMsbUJBQWEsRUFOUjtBQU9MQyxlQUFTLEtBUEo7QUFRTFIsYUFBTyxFQVJGO0FBU0xTLGlCQUFXLEVBVE47QUFVTEMsZUFBUyxFQVZKO0FBV0xDLFdBQUssRUFYQTtBQVlMQyxtQkFBYSxFQVpSO0FBYUxDLGtCQUFZLEVBYlA7QUFjTEMsaUJBQVcsQ0FkTjtBQWVMQyxZQUFNO0FBZkQsSyxTQWlCUEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0s7QUFDWCx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQUxPO0FBTVJDLFdBTlEsbUJBTUM7QUFBQTs7QUFDUCxhQUFLaEIsS0FBTCxHQUFhLEtBQUtQLE9BQUwsQ0FBYXdCLFFBQWIsRUFBYjtBQUNBLFlBQUksQ0FBQyxLQUFLaEIsSUFBTCxDQUFVaUIsTUFBZixFQUF1QjtBQUNyQix5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLFNBRE07QUFFYkMsa0JBQU0sTUFGTztBQUdiQyxtQkFBTztBQUhNLFdBQWY7QUFLRCxTQU5ELE1BTU87QUFDTCxjQUFJeEIsT0FBTztBQUNURSxtQkFBTyxLQUFLQSxLQURIO0FBRVRJLHFCQUFTLFNBRkE7QUFHVG1CLGtCQUFNLEtBQUt4QixTQUhGO0FBSVR5QiwwQkFBYyxLQUFLdkIsSUFBTCxDQUFVd0IsRUFKZjtBQUtUQyx1QkFBV0MsVUFBVSxLQUFLaEIsSUFBZixDQUxGO0FBTVRpQix1QkFBVztBQU5GLFdBQVg7QUFRQSxlQUFLbkMsT0FBTCxDQUFhb0MsV0FBYixDQUF5QkMsZUFBekIsQ0FBeUNoQyxJQUF6QyxFQUErQ2lDLElBQS9DLENBQW9ELFVBQUNDLEdBQUQsRUFBUztBQUMzRCxnQkFBSUEsSUFBSWxDLElBQUosQ0FBU21DLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsa0JBQUluQyxPQUFPa0MsSUFBSWxDLElBQUosQ0FBU0EsSUFBcEI7QUFDQSxrQkFBSW9DLFlBQVlwQyxLQUFLcUMsU0FBTCxDQUFlQyxRQUFmLEVBQWhCO0FBQ0Esa0JBQUlDLFdBQVd2QyxLQUFLd0MsUUFBcEI7QUFDQSxrQkFBSUMsV0FBVyxlQUFlekMsS0FBS3lDLFFBQW5DO0FBQ0Esa0JBQUlDLFdBQVc7QUFDYix5QkFBUyxvQkFESTtBQUViLDZCQUFhTixTQUZBO0FBR2IsNEJBQVlHLFFBSEM7QUFJYiwyQkFBV0UsUUFKRTtBQUtiLDRCQUFZO0FBTEMsZUFBZjtBQU9BLGtCQUFJRSxPQUFPLE9BQUtoRCxPQUFMLENBQWFvQyxXQUFiLENBQXlCYSxVQUF6QixDQUFvQ0YsUUFBcEMsQ0FBWDtBQUNBLDZCQUFLRyxjQUFMLENBQW9CO0FBQ2xCLDZCQUFhVCxTQURLO0FBRWxCLDRCQUFZRyxRQUZNO0FBR2xCLDJCQUFXRSxRQUhPO0FBSWxCLDRCQUFZLEtBSk07QUFLbEIsMkJBQVdFLElBTE87QUFNbEIsMkJBQVcsaUJBQUNULEdBQUQsRUFBUztBQUNsQlksMEJBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0Esc0JBQUliLElBQUljLE1BQUosS0FBZSxtQkFBbkIsRUFBd0M7QUFDdEM7QUFDQSxtQ0FBS0MsU0FBTCxDQUFlO0FBQ2JoQywyQkFBSztBQURRLHFCQUFmO0FBR0QsbUJBTEQsTUFLTyxJQUFJaUIsSUFBSWMsTUFBSixLQUFlLHVCQUFuQixFQUE0QztBQUNqRDtBQUNBLDJCQUFLckQsT0FBTCxDQUFhdUQsT0FBYjtBQUNEO0FBQ0YsaUJBakJpQjtBQWtCbEIsd0JBQVEsY0FBQ2hCLEdBQUQsRUFBUztBQUNmLHlCQUFLdkMsT0FBTCxDQUFhdUQsT0FBYjtBQUNELGlCQXBCaUI7QUFxQmxCLDRCQUFZLGtCQUFDaEIsR0FBRCxFQUFTLENBQ3BCO0FBdEJpQixlQUFwQjtBQXdCRCxhQXJDRCxNQXFDTztBQUNMLHFCQUFLdkMsT0FBTCxDQUFhdUQsT0FBYjtBQUNEO0FBQ0YsV0F6Q0QsRUF5Q0dDLEtBekNILENBeUNTLFlBQU07QUFDYixtQkFBS3hELE9BQUwsQ0FBYXVELE9BQWI7QUFDRCxXQTNDRDtBQTRDRDtBQUNGLE9BcEVPO0FBcUVSRSxjQXJFUSxvQkFxRUVDLENBckVGLEVBcUVLO0FBQ1gsYUFBS3pDLFNBQUwsR0FBaUJ5QyxFQUFFQyxNQUFGLENBQVNDLEtBQVQsQ0FBZXhELE1BQWhDO0FBQ0EsYUFBS2MsSUFBTCxHQUFZd0MsRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNEO0FBeEVPLEs7Ozs7O2lDQTBFSTtBQUFBOztBQUNaLFdBQUtyRCxLQUFMLEdBQWEsS0FBS1AsT0FBTCxDQUFhd0IsUUFBYixFQUFiO0FBQ0EsV0FBS3hCLE9BQUwsQ0FBYTZELFdBQWI7QUFDQSxXQUFLMUQsS0FBTCxHQUFhLEVBQWI7QUFDQSxVQUFJMkQsUUFBUSxJQUFaO0FBQ0EsVUFBSXpELE9BQU87QUFDVEUsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLUCxPQUFMLENBQWFvQyxXQUFiLENBQXlCMkIsY0FBekIsQ0FBd0MxRCxJQUF4QyxFQUE4Q2lDLElBQTlDLENBQW1ELFVBQUNDLEdBQUQsRUFBUztBQUMxRFksZ0JBQVFDLEdBQVIsQ0FBWWIsR0FBWjtBQUNBLFlBQUlBLElBQUlsQyxJQUFKLENBQVNtQyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCc0IsZ0JBQU05RCxPQUFOLENBQWNnRSxXQUFkO0FBQ0EsY0FBSTNELE9BQU9rQyxJQUFJbEMsSUFBSixDQUFTQSxJQUFwQjtBQUNBeUQsZ0JBQU14RCxTQUFOLEdBQWtCRCxLQUFLeUIsSUFBdkI7QUFDQWdDLGdCQUFNbEQsU0FBTixHQUFrQlAsS0FBS08sU0FBdkI7QUFDQWtELGdCQUFNakQsT0FBTixHQUFnQlIsS0FBS1EsT0FBckI7QUFDQWlELGdCQUFNL0MsV0FBTixHQUFvQlYsS0FBS1UsV0FBekI7QUFDQStDLGdCQUFNaEQsR0FBTixHQUFZVCxLQUFLUyxHQUFqQjtBQUNBZ0QsZ0JBQU05QyxVQUFOLEdBQW1CWCxLQUFLNEQsVUFBeEI7QUFDQTVELGVBQUs2RCxXQUFMLENBQWlCQyxPQUFqQixDQUF5QixVQUFDQyxJQUFELEVBQVU7QUFDakMsZ0JBQUlDLE1BQU0sRUFBVjtBQUNBQSxnQkFBSTFDLEtBQUosR0FBWXlDLEtBQUt6QyxLQUFqQjtBQUNBMEMsZ0JBQUl4RCxPQUFKLEdBQWN1RCxLQUFLdkQsT0FBbkI7QUFDQXdELGdCQUFJQyxRQUFKLEdBQWUsRUFBZjtBQUNBRCxnQkFBSUUsUUFBSixHQUFlLE9BQUtDLFNBQUwsQ0FBZUosS0FBS0ssVUFBcEIsQ0FBZjtBQUNBWCxrQkFBTTNELEtBQU4sQ0FBWXVFLElBQVosQ0FBaUJMLEdBQWpCO0FBQ0FQLGtCQUFNYSxNQUFOO0FBQ0QsV0FSRDtBQVNBeEIsa0JBQVFDLEdBQVIsQ0FBWVUsTUFBTTNELEtBQWxCO0FBQ0QsU0FuQkQsTUFtQk87QUFDTCx5QkFBS3lFLFdBQUw7QUFDQSx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JsRCxtQkFBTyxRQURNO0FBRWJtRCxxQkFBUyxZQUZJO0FBR2JDLHdCQUFZLEtBSEM7QUFJYkMscUJBQVMsaUJBQUN6QyxHQUFELEVBQVM7QUFDaEIsa0JBQUlBLElBQUkwQyxPQUFSLEVBQWlCO0FBQ2YsK0JBQUszQixTQUFMLENBQWU7QUFDYmhDLHVCQUFLO0FBRFEsaUJBQWY7QUFHRDtBQUNGO0FBVlksV0FBZjtBQVlEO0FBQ0YsT0FwQ0QsRUFvQ0drQyxLQXBDSCxDQW9DUyxZQUFNO0FBQ2JNLGNBQU05RCxPQUFOLENBQWNrRixRQUFkO0FBQ0QsT0F0Q0Q7QUF1Q0Q7Ozs4QkFDVUMsTSxFQUFRO0FBQ2pCLFVBQUlDLFFBQVEsRUFBWjtBQUNBRCxhQUFPaEIsT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN2QixZQUFJQyxNQUFNLEVBQVY7QUFDQUEsWUFBSWdCLElBQUosR0FBV2pCLEtBQUtrQixLQUFoQjtBQUNBakIsWUFBSTFDLEtBQUosR0FBWXlDLEtBQUt6QyxLQUFqQjtBQUNBMEMsWUFBSWtCLEtBQUosR0FBWW5CLEtBQUtyRCxXQUFqQjtBQUNBc0QsWUFBSW1CLFFBQUosR0FBZXBCLEtBQUttQixLQUFwQjtBQUNBbEIsWUFBSXJDLEVBQUosR0FBU29DLEtBQUtxQixTQUFkO0FBQ0FwQixZQUFJcUIsVUFBSixHQUFpQnRCLEtBQUt1QixhQUF0QjtBQUNBdEIsWUFBSXVCLFFBQUosR0FBZXhCLEtBQUt5QixXQUFwQjtBQUNBeEIsWUFBSVYsTUFBSixHQUFhUyxLQUFLMEIsU0FBTCxHQUFpQixHQUFqQixHQUF1QjFCLEtBQUsyQixRQUF6QztBQUNBMUIsWUFBSTJCLE9BQUosR0FBYyxLQUFkO0FBQ0EzQixZQUFJNEIsVUFBSixHQUFpQjdCLEtBQUs4QixTQUF0QjtBQUNBZCxjQUFNVixJQUFOLENBQVdMLEdBQVg7QUFDRCxPQWJEO0FBY0EsYUFBT2UsS0FBUDtBQUNEOzs7MkJBQ09lLEssRUFBTztBQUNiLFVBQUlBLE1BQU0zRixJQUFWLEVBQWdCO0FBQ2QsYUFBS0EsSUFBTCxHQUFZNEYsS0FBS0MsS0FBTCxDQUFXRixNQUFNM0YsSUFBakIsQ0FBWjtBQUNEO0FBQ0QsV0FBS21FLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBSzJCLFVBQUw7QUFDQSxXQUFLM0IsTUFBTDtBQUNEOzs7O0VBaE1rQyxlQUFLNEIsSTs7a0JBQXJCakgsTyIsImZpbGUiOiJwYXljYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5Q2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBvcmRlckhhc2g6ICcnLFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlcjoge1xuICAgICAgICBhZGQ6ICfor7fpgInmi6nmlLbotKflnLDlnYAnXG4gICAgICB9LFxuICAgICAgYWRkcmVzc01haW46ICcnLFxuICAgICAgYXBwVHlwZTogJ3dlYicsXG4gICAgICBvcmRlcjogW10sXG4gICAgICByZWR1Y3Rpb246ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgbWVtYmVyUHJpY2U6ICcnLFxuICAgICAgZmluYWxwcmljZTogJycsXG4gICAgICB0eHRMZW5ndGg6IDAsXG4gICAgICBtZW1vOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1wYXljYXJ0J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIGlmICghdGhpcy51c2VyLmFyZWFJZCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCcsXG4gICAgICAgICAgICBoYXNoOiB0aGlzLm9yZGVySGFzaCxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgbWVtb19tYWluOiBlbmNvZGVVUkkodGhpcy5tZW1vKSxcbiAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlVXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZmFpbCc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb21wbGV0ZSc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLnR4dExlbmd0aCA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aFxuICAgICAgICB0aGlzLm1lbW8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBseU9yZGVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQXBwbHlPcmRlckh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMub3JkZXJIYXNoID0gZGF0YS5oYXNoXG4gICAgICAgICAgX3RoaXMucmVkdWN0aW9uID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgX3RoaXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gdGhpcy5pbml0Q2hpbGQoaXRlbS5zYWxlc1VuaXRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXIucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc29sZS5sb2coX3RoaXMub3JkZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfliJvlu7rorqLljZXlpLHotKUnLFxuICAgICAgICAgICAgY29udGVudDogJ+ivt+eCueWHu+ehruiupOi/lOWbnui0reeJqei9picsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgdXJsOiAnLi9jYXJ0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmFwcGx5T3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19