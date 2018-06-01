'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _orderlist = require('./../components/orderlist.js');

var _orderlist2 = _interopRequireDefault(_orderlist);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

var _menu = require('./../components/menu.js');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = function (_wepy$page) {
  _inherits(Order, _wepy$page);

  function Order() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '我的订单'
    }, _this2.$repeat = { "orderList": { "com": "orderList", "props": "" } }, _this2.$props = { "orderList": { "xmlns:v-bind": { "value": "", "for": "orderList", "item": "item", "index": "index", "key": "key" }, "v-bind:orderList.sync": { "value": "item.orderDetail", "for": "orderList", "item": "item", "index": "index", "key": "key" }, "v-bind:userLevel.sync": { "value": "userLevel", "for": "orderList", "item": "item", "index": "index", "key": "key" } }, "defect": { "type": "3" } }, _this2.$events = {}, _this2.components = {
      orderList: _orderlist2.default,
      defect: _defect2.default,
      menuList: _menu2.default
    }, _this2.computed = {
      isNull: function isNull() {
        if (this.orderList.length === 0) {
          return true;
        } else {
          return false;
        }
      },
      userLevel: function userLevel() {
        if (this.$parent.globalData.userLevel === 0) {
          return false;
        } else if (this.$parent.globalData.userLevel === 1) {
          return true;
        }
      }
    }, _this2.data = {
      token: '',
      package: [{
        title: '全部',
        type: 'all'
      }, {
        title: '待支付',
        type: 'unpaid'
      }, {
        title: '待发货',
        type: 'undelivered'
      }, {
        title: '待收货',
        type: 'unreceipted'
      }, {
        title: '售后',
        type: 'refunding'
      }],
      orderStatus: ['异常', '待支付', '售后中', '已关闭', '待发货', '待收货', '交易完成'],
      current: null,
      orderType: 'all',
      orderList: [],
      pageSize: 5,
      pageNum: 1,
      totalPageNum: 0,
      isLoading: true,
      payment: true
    }, _this2.methods = {
      checkPackage: function checkPackage(index, type) {
        this.current = index;
        this.orderType = type;
        this.initData();
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './orderDetail?id=' + id
        });
      },
      cancel: function cancel(id) {
        var _this3 = this;

        _wepy2.default.showModal({
          title: '提示',
          content: '确认取消订单',
          success: function success(res) {
            if (res.confirm) {
              _this3.cancelOrder(id, function () {
                _this3.initData();
              });
            }
          }
        });
      },
      goAddress: function goAddress(id) {
        _wepy2.default.navigateTo({
          url: './address?page=order&id=' + id
        });
      },
      goLogistic: function goLogistic(id) {
        _wepy2.default.navigateTo({
          url: './logistica?id=' + id
        });
      },
      goPay: function goPay(id) {
        var _this4 = this;

        if (this.payment) {
          this.token = this.$parent.getToken();
          var data = {
            token: this.token,
            orderId: id,
            appType: 'miniApp'
          };
          this.$parent.HttpRequest.PayService(data).then(function (res) {
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
              var sign = _this4.$parent.HttpRequest.getPaySign(signData);
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
                    _this4.$parent.payFail();
                  }
                },
                'fail': function fail(res) {
                  _this4.$parent.payFail();
                },
                'complete': function complete(res) {
                  _this4.payment = true;
                }
              });
            } else {
              _this4.$parent.payFail();
            }
          }).catch(function () {
            _this4.$parent.payFail();
          });
        }
        this.payment = false;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Order, [{
    key: 'initData',
    value: function initData() {
      this.pageNum = 1;
      this.orderList = [];
      this.initOrder();
    }
  }, {
    key: 'initOrder',
    value: function initOrder() {
      var _this5 = this;

      this.$parent.showLoading();
      this.token = this.$parent.getToken();
      this.isLoading = true;
      var _this = this;
      var data = {
        token: this.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        status: this.orderType
      };
      this.$parent.HttpRequest.GetOrderStatus(data).then(function (res) {
        console.log(res);
        _this.isLoading = false;
        _this.$parent.showSuccess();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          data.orders.forEach(function (item) {
            var obj = {};
            obj.id = item.id;
            obj.title = item.showId;
            obj.pay = item.pay;
            obj.freight = item.freight;
            obj.status = item.status;
            obj.statusTxt = _this.orderStatus[item.status];
            obj.count = item.buyingRecords.length;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.orderList.push(obj);
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
            _this.initOrder();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showSuccess();
        _this.isLoading = false;
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
        obj.title = item.productName;
        obj.price = item.memberPrice;
        obj.oldprice = item.price;
        obj.id = item.productId;
        obj.sourceType = item.salesUnitType;
        obj.sourceId = item.salesUnitId;
        obj.detail = item.title + '×' + item.buyingCount;
        obj.count = item.buyingCount;
        obj.checked = false;
        obj.totalCount = item.keepCount;
        child.push(obj);
      });
      return child;
    }
  }, {
    key: 'cancelOrder',
    value: function cancelOrder(id, cb) {
      var _this6 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: id
      };
      this.$parent.HttpRequest.CancelOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this6.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.initOrder();
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      var _this7 = this;

      if (param.orderType) {
        this.orderType = param.orderType;
        this.package.forEach(function (item, index) {
          if (item.type === param.orderType) {
            _this7.current = index;
          }
        });
      } else {
        this.current = 0;
      }
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initData();
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsImRlZmVjdCIsIm1lbnVMaXN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0xvYWRpbmciLCJwYXltZW50IiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4IiwiaW5pdERhdGEiLCJnb0RldGFpbCIsImlkIiwibmF2aWdhdGVUbyIsInVybCIsImNhbmNlbCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbE9yZGVyIiwiZ29BZGRyZXNzIiwiZ29Mb2dpc3RpYyIsImdvUGF5IiwiZ2V0VG9rZW4iLCJvcmRlcklkIiwiYXBwVHlwZSIsIkh0dHBSZXF1ZXN0IiwiUGF5U2VydmljZSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImVyck1zZyIsInN3aXRjaFRhYiIsInBheUZhaWwiLCJjYXRjaCIsImluaXRPcmRlciIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzdGF0dXMiLCJHZXRPcmRlclN0YXR1cyIsInNob3dTdWNjZXNzIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0Iiwic3RhdHVzVHh0IiwiY291bnQiLCJidXlpbmdSZWNvcmRzIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwibWlzc1Rva2VuIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiZGV0YWlsIiwiYnV5aW5nQ291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsImNiIiwiQ2FuY2VsT3JkZXIiLCJwYXJhbSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFiLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxXQUFsQixFQUE4QixRQUFPLE1BQXJDLEVBQTRDLFNBQVEsT0FBcEQsRUFBNEQsT0FBTSxLQUFsRSxFQUFoQixFQUF5Rix5QkFBd0IsRUFBQyxTQUFRLGtCQUFULEVBQTRCLE9BQU0sV0FBbEMsRUFBOEMsUUFBTyxNQUFyRCxFQUE0RCxTQUFRLE9BQXBFLEVBQTRFLE9BQU0sS0FBbEYsRUFBakgsRUFBME0seUJBQXdCLEVBQUMsU0FBUSxXQUFULEVBQXFCLE9BQU0sV0FBM0IsRUFBdUMsUUFBTyxNQUE5QyxFQUFxRCxTQUFRLE9BQTdELEVBQXFFLE9BQU0sS0FBM0UsRUFBbE8sRUFBYixFQUFrVSxVQUFTLEVBQUMsUUFBTyxHQUFSLEVBQTNV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QW1CLENBQXZCLEVBQTBCO0FBQ3hCdUQsZ0JBQU1BLElBQU47QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJdEMsTUFBTTFELE9BQU4sQ0FBYzJFLFNBQWxCLEVBQTZCO0FBQzNCakIsa0JBQU12RCxLQUFOLEdBQWMsT0FBS0gsT0FBTCxDQUFhaUMsUUFBYixDQUFzQk4sSUFBSXpCLElBQUosQ0FBU3VDLEtBQS9CLENBQWQ7QUFDRDtBQUNGO0FBQ0YsT0FURDtBQVVEOzs7b0NBQ2dCO0FBQ2Y7QUFDQSxVQUFJLEtBQUs5QixPQUFMLEdBQWUsS0FBS0MsWUFBeEIsRUFBc0M7QUFDcEM7QUFDQSxhQUFLRCxPQUFMO0FBQ0EsYUFBSzZDLFNBQUw7QUFDRDtBQUNGOzs7MkJBQ08wQyxLLEVBQU87QUFBQTs7QUFDYixVQUFJQSxNQUFNekYsU0FBVixFQUFxQjtBQUNuQixhQUFLQSxTQUFMLEdBQWlCeUYsTUFBTXpGLFNBQXZCO0FBQ0EsYUFBS0wsT0FBTCxDQUFhMkQsT0FBYixDQUFxQixVQUFDQyxJQUFELEVBQU8vQyxLQUFQLEVBQWlCO0FBQ3BDLGNBQUkrQyxLQUFLMUQsSUFBTCxLQUFjNEYsTUFBTXpGLFNBQXhCLEVBQW1DO0FBQ2pDLG1CQUFLRCxPQUFMLEdBQWVTLEtBQWY7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQVBELE1BT087QUFDTCxhQUFLVCxPQUFMLEdBQWUsQ0FBZjtBQUNEO0FBQ0QsV0FBS29FLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBSzFELFFBQUw7QUFDRDs7OztFQS9QZ0MsZUFBS2lGLEk7O2tCQUFuQmpILEsiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IE1lbnUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6K6i5Y2VJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlckxpc3RcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0ub3JkZXJEZXRhaWxcIixcImZvclwiOlwib3JkZXJMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlckxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiM1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdCxcbiAgICAgIGRlZmVjdDogRGVmZWN0LFxuICAgICAgbWVudUxpc3Q6IE1lbnVcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlckxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWNrYWdlOiBbe1xuICAgICAgICB0aXRsZTogJ+WFqOmDqCcsXG4gICAgICAgIHR5cGU6ICdhbGwnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5pSv5LuYJyxcbiAgICAgICAgdHlwZTogJ3VucGFpZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXlj5HotKcnLFxuICAgICAgICB0eXBlOiAndW5kZWxpdmVyZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5pS26LSnJyxcbiAgICAgICAgdHlwZTogJ3VucmVjZWlwdGVkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WUruWQjicsXG4gICAgICAgIHR5cGU6ICdyZWZ1bmRpbmcnXG4gICAgICB9XSxcbiAgICAgIG9yZGVyU3RhdHVzOiBbJ+W8guW4uCcsICflvoXmlK/ku5gnLCAn5ZSu5ZCO5LitJywgJ+W3suWFs+mXrScsICflvoXlj5HotKcnLCAn5b6F5pS26LSnJywgJ+S6pOaYk+WujOaIkCddLFxuICAgICAgY3VycmVudDogbnVsbCxcbiAgICAgIG9yZGVyVHlwZTogJ2FsbCcsXG4gICAgICBvcmRlckxpc3Q6IFtdLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAwLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgcGF5bWVudDogdHJ1ZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hlY2tQYWNrYWdlIChpbmRleCwgdHlwZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICB0aGlzLm9yZGVyVHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlckRldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjYW5jZWwgKGlkKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOiuouWNlScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuY2VsT3JkZXIoaWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPW9yZGVyJmlkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvTG9naXN0aWMgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpc3RpY2E/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgb3JkZXJJZDogaWQsXG4gICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlBheVNlcnZpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IFtdXG4gICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgfVxuICAgIGluaXRPcmRlciAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgc3RhdHVzOiB0aGlzLm9yZGVyVHlwZVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyU3RhdHVzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSBkYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIGRhdGEub3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5zaG93SWRcbiAgICAgICAgICAgIG9iai5wYXkgPSBpdGVtLnBheVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5zdGF0dXMgPSBpdGVtLnN0YXR1c1xuICAgICAgICAgICAgb2JqLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2l0ZW0uc3RhdHVzXVxuICAgICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdSZWNvcmRzLmxlbmd0aFxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0T3JkZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBjYW5jZWxPcmRlciAoaWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXRPcmRlcigpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS5vcmRlclR5cGUpIHtcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBwYXJhbS5vcmRlclR5cGVcbiAgICAgICAgdGhpcy5wYWNrYWdlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gcGFyYW0ub3JkZXJUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgIH1cbiAgfVxuIl19