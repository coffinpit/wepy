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

var OrderDetail = function (_wepy$page) {
  _inherits(OrderDetail, _wepy$page);

  function OrderDetail() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, OrderDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = OrderDetail.__proto__ || Object.getPrototypeOf(OrderDetail)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '订单详情'
    }, _this2.data = {
      token: '',
      id: '',
      orderStatus: ['异常', '待支付', '售后中', '订单关闭', '待发货', '待收货', '交易完成'],
      statusTxt: '',
      status: '',
      address: {},
      order: [],
      orderId: '',
      createTime: '',
      memo: '',
      pay: '',
      finalPrice: '',
      freight: '',
      remainTime: '',
      isHidden: false,
      initTxt: '待支付',
      isStop: false,
      timeInterval: '',
      payment: true,
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: ''
    }, _this2.computed = {
      isNull: function isNull() {
        if (this.order.length === 0) {
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
    }, _this2.$repeat = { "order": { "com": "orderList", "props": "" } }, _this2.$props = { "orderList": { "xmlns:v-bind": { "value": "", "for": "order", "item": "item", "index": "index", "key": "key" }, "v-bind:orderList.sync": { "value": "item.orderDetail", "for": "order", "item": "item", "index": "index", "key": "key" }, "v-bind:userLevel.sync": { "value": "userLevel", "for": "order", "item": "item", "index": "index", "key": "key" } } }, _this2.$events = {}, _this2.components = {
      orderList: _orderlist2.default
    }, _this2.methods = {
      cancel: function cancel() {
        var _this3 = this;

        _wepy2.default.showModal({
          title: '提示',
          content: '确认取消订单',
          success: function success(res) {
            if (res.confirm) {
              _this3.cancelOrder(function () {
                _this3.isHidden = true;
              });
              _this3.clear();
            }
          }
        });
      },
      goAddress: function goAddress() {
        _wepy2.default.redirectTo({
          url: './address?page=orderdetail&id=' + this.id
        });
        this.clear();
      },
      goLogistic: function goLogistic() {
        _wepy2.default.navigateTo({
          url: './logistica?id=' + this.id
        });
      },
      goPay: function goPay() {
        var _this4 = this;

        if (this.payment) {
          var data = {
            token: this.token,
            orderId: this.id,
            appType: 'ios'
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
                    _this4.clear();
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

  _createClass(OrderDetail, [{
    key: 'initData',
    value: function initData(cb) {
      var _this5 = this;

      this.token = this.$parent.getToken();
      this.remainTime = 0;
      this.$parent.showLoading();
      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      this.$parent.HttpRequest.GetOrderDetail(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.statusTxt = _this.orderStatus[data.status];
          _this.status = data.status;
          _this.orderId = data.showId;
          _this.createTime = _this.$parent.dateFormat(data.createTime * 1000, 'Y-m-d H:i:s');
          _this.memo = data.memo ? data.memo[0].val : '';
          _this.pay = data.pay;
          _this.freight = data.freight;
          // _this.initLogistica('shunfeng', data.showId)
          if (data.payRemainingTime) {
            _this.interval(data.payRemainingTime);
          }
          if (data.address) {
            _this.address.name = data.address.name;
            _this.address.phone = data.address.phone;
            _this.address.detail = data.address.fullAreaName + data.address.address;
          } else {
            _this.address = '';
          }
          _this.finalPrice = data.finalPrice;
          data.buyingRecords.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.order.push(obj);
          });
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
            _this.initData();
          }
        }
        console.log(Object.keys(_this.address).length);
        _this.$apply();
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
    value: function cancelOrder(cb) {
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      console.log(data);
      this.$parent.HttpRequest.CancelOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.isStop = true;
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'initLogistica',
    value: function initLogistica(com, num) {
      var _this6 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        com: com,
        num: num
      };
      this.$parent.HttpRequest.GetLogistica(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {} else {
          if (_this.$parent.missToken) {
            _this.token = _this6.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'interval',
    value: function interval(time) {
      var _this = this;
      this.timeInterval = setInterval(function () {
        time--;
        if (time > 0) {
          _this.remainTime = (time - time % 60) / 60 + '分' + time % 60 + '秒';
        } else {
          _this.remainTime = 0;
          _this.initTxt = '交易关闭';
          _this.clear();
        }
        _this.$apply();
      }, 1000);
    }
  }, {
    key: 'clear',
    value: function clear() {
      clearInterval(this.timeInterval);
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      this.id = param.id;
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this7 = this;

      this.initData(function () {
        _this7.nick_name = _this7.$parent.getUserName();
        _this7.avatar = _this7.$parent.getUserAvatar();
        _this7.customer_info_str = _this7.$parent.getMessage();
        _this7.note_info_str = _this7.$parent.getBusiness('订单详情页', null, _this7.orderId);
      });
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      this.clear();
    }
  }]);

  return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/orderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImluaXRUeHQiLCJpc1N0b3AiLCJ0aW1lSW50ZXJ2YWwiLCJwYXltZW50Iiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyTGlzdCIsIm1ldGhvZHMiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbE9yZGVyIiwiY2xlYXIiLCJnb0FkZHJlc3MiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29Mb2dpc3RpYyIsIm5hdmlnYXRlVG8iLCJnb1BheSIsImFwcFR5cGUiLCJIdHRwUmVxdWVzdCIsIlBheVNlcnZpY2UiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJzd2l0Y2hUYWIiLCJwYXlGYWlsIiwiY2F0Y2giLCJjYiIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkdldE9yZGVyRGV0YWlsIiwiaGlkZUxvYWRpbmciLCJzaG93SWQiLCJkYXRlRm9ybWF0IiwidmFsIiwicGF5UmVtYWluaW5nVGltZSIsImludGVydmFsIiwibmFtZSIsInBob25lIiwiZGV0YWlsIiwiZnVsbEFyZWFOYW1lIiwiYnV5aW5nUmVjb3JkcyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwibWlzc1Rva2VuIiwiaW5pdERhdGEiLCJPYmplY3QiLCJrZXlzIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiQ2FuY2VsT3JkZXIiLCJjb20iLCJudW0iLCJHZXRMb2dpc3RpY2EiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwicGFyYW0iLCJnZXRVc2VyTmFtZSIsImdldFVzZXJBdmF0YXIiLCJnZXRNZXNzYWdlIiwiZ2V0QnVzaW5lc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O21NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsVUFBSSxFQUZDO0FBR0xDLG1CQUFhLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxLQUFkLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLE1BQTNDLENBSFI7QUFJTEMsaUJBQVcsRUFKTjtBQUtMQyxjQUFRLEVBTEg7QUFNTEMsZUFBUyxFQU5K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ZUFBS3pHLGlCQUFMLEdBQXlCLE9BQUtNLE9BQUwsQ0FBYW9HLFVBQWIsRUFBekI7QUFDQSxlQUFLekcsYUFBTCxHQUFxQixPQUFLSyxPQUFMLENBQWFxRyxXQUFiLENBQXlCLE9BQXpCLEVBQWtDLElBQWxDLEVBQXdDLE9BQUt6SCxPQUE3QyxDQUFyQjtBQUNELE9BTEQ7QUFNRDs7OytCQUNXO0FBQ1YsV0FBS29DLEtBQUw7QUFDRDs7OztFQXBSc0MsZUFBS3NGLEk7O2tCQUF6QnJJLFciLCJmaWxlIjoib3JkZXJEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlkOiAnJyxcbiAgICAgIG9yZGVyU3RhdHVzOiBbJ+W8guW4uCcsICflvoXmlK/ku5gnLCAn5ZSu5ZCO5LitJywgJ+iuouWNleWFs+mXrScsICflvoXlj5HotKcnLCAn5b6F5pS26LSnJywgJ+S6pOaYk+WujOaIkCddLFxuICAgICAgc3RhdHVzVHh0OiAnJyxcbiAgICAgIHN0YXR1czogJycsXG4gICAgICBhZGRyZXNzOiB7fSxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgY3JlYXRlVGltZTogJycsXG4gICAgICBtZW1vOiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBmaW5hbFByaWNlOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcmVtYWluVGltZTogJycsXG4gICAgICBpc0hpZGRlbjogZmFsc2UsXG4gICAgICBpbml0VHh0OiAn5b6F5pSv5LuYJyxcbiAgICAgIGlzU3RvcDogZmFsc2UsXG4gICAgICB0aW1lSW50ZXJ2YWw6ICcnLFxuICAgICAgcGF5bWVudDogdHJ1ZSxcbiAgICAgIG5pY2tfbmFtZTogJycsXG4gICAgICBhdmF0YXI6ICcnLFxuICAgICAgY3VzdG9tZXJfaW5mb19zdHI6ICcnLFxuICAgICAgbm90ZV9pbmZvX3N0cjogJydcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge1wib3JkZXJcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwib3JkZXJcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTlj5bmtojorqLljZUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLmNhbmNlbE9yZGVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSGlkZGVuID0gdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB0aGlzLmNsZWFyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1vcmRlcmRldGFpbCZpZD0nICsgdGhpcy5pZFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmNsZWFyKClcbiAgICAgIH0sXG4gICAgICBnb0xvZ2lzdGljICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2xvZ2lzdGljYT9pZD0nICsgdGhpcy5pZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBvcmRlcklkOiB0aGlzLmlkLFxuICAgICAgICAgICAgYXBwVHlwZTogJ2lvcydcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlBheVNlcnZpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKClcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZmFpbCc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb21wbGV0ZSc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXltZW50ID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMucmVtYWluVGltZSA9IDBcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5pZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE9yZGVyRGV0YWlsKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5zdGF0dXNUeHQgPSBfdGhpcy5vcmRlclN0YXR1c1tkYXRhLnN0YXR1c11cbiAgICAgICAgICBfdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1c1xuICAgICAgICAgIF90aGlzLm9yZGVySWQgPSBkYXRhLnNob3dJZFxuICAgICAgICAgIF90aGlzLmNyZWF0ZVRpbWUgPSBfdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQoZGF0YS5jcmVhdGVUaW1lICogMTAwMCwgJ1ktbS1kIEg6aTpzJylcbiAgICAgICAgICBfdGhpcy5tZW1vID0gZGF0YS5tZW1vID8gZGF0YS5tZW1vWzBdLnZhbCA6ICcnXG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgLy8gX3RoaXMuaW5pdExvZ2lzdGljYSgnc2h1bmZlbmcnLCBkYXRhLnNob3dJZClcbiAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lKSB7XG4gICAgICAgICAgICBfdGhpcy5pbnRlcnZhbChkYXRhLnBheVJlbWFpbmluZ1RpbWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzID0gJydcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuZmluYWxQcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuYnV5aW5nUmVjb3Jkcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5vcmRlckRldGFpbCA9IF90aGlzLmluaXRDaGlsZChpdGVtLmJ1eWluZ1JlY29yZHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdERhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhfdGhpcy5hZGRyZXNzKS5sZW5ndGgpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMuaWRcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNTdG9wID0gdHJ1ZVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gX3RoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRMb2dpc3RpY2EgKGNvbSwgbnVtKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjb206IGNvbSxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY2EoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGludGVydmFsICh0aW1lKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLnRpbWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGltZS0tXG4gICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgIF90aGlzLnJlbWFpblRpbWUgPSAodGltZSAtIHRpbWUgJSA2MCkgLyA2MCArICfliIYnICsgdGltZSAlIDYwICsgJ+enkidcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgIF90aGlzLmluaXRUeHQgPSAn5Lqk5piT5YWz6ZetJ1xuICAgICAgICAgIF90aGlzLmNsZWFyKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gICAgY2xlYXIgKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVJbnRlcnZhbClcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgdGhpcy5pZCA9IHBhcmFtLmlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCforqLljZXor6bmg4XpobUnLCBudWxsLCB0aGlzLm9yZGVySWQpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblVubG9hZCAoKSB7XG4gICAgICB0aGlzLmNsZWFyKClcbiAgICB9XG4gIH1cbiJdfQ==