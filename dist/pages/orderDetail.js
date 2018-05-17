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
      isHidden: false
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
            }
          }
        });
      },
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address?page=orderdetail&id=' + this.id
        });
      },
      goPay: function goPay() {
        var data = {
          token: this.token,
          orderId: this.id,
          appType: 'ios'
        };
        this.$parent.HttpRequest.PayService(data).then(function (res) {
          console.log(res);
          // 调微信支付弹窗
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(OrderDetail, [{
    key: 'initData',
    value: function initData() {
      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.id
      };
      this.$parent.HttpRequest.GetOrderDetail(data).then(function (res) {
        console.log(res);
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
          setInterval(function () {
            data.payRemainingTime--;
            if (data.payRemainingTime > 0) {
              _this.remainTime = (data.payRemainingTime - data.payRemainingTime % 60) / 60 + '分' + data.payRemainingTime % 60 + '秒';
            } else {
              _this.remainTime = 0;
            }
            _this.$apply();
          }, 1000);
          if (data.address) {
            _this.address.name = data.address.name;
            _this.address.phone = data.address.phone;
            _this.address.detail = data.address.fullAreaName + data.address.address;
          }
          _this.finalPrice = data.finalPrice;
          data.buyingRecords.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.order.push(obj);
          });
        }
        _this.$apply();
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
      var data = {
        token: this.token,
        orderId: this.id
      };
      console.log(data);
      this.$parent.HttpRequest.CancelOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
        }
      });
    }
  }, {
    key: 'initLogistica',
    value: function initLogistica(com, num) {
      var data = {
        com: com,
        num: num
      };
      this.$parent.HttpRequest.GetLogistica(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      this.id = param.id;
      this.token = this.$parent.getToken();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initData();
    }
  }]);

  return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/orderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlkIiwib3JkZXJTdGF0dXMiLCJzdGF0dXNUeHQiLCJzdGF0dXMiLCJhZGRyZXNzIiwib3JkZXIiLCJvcmRlcklkIiwiY3JlYXRlVGltZSIsIm1lbW8iLCJwYXkiLCJmaW5hbFByaWNlIiwiZnJlaWdodCIsInJlbWFpblRpbWUiLCJpc0hpZGRlbiIsImNvbXB1dGVkIiwiaXNOdWxsIiwibGVuZ3RoIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJtZXRob2RzIiwiY2FuY2VsIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWxPcmRlciIsImdvQWRkcmVzcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1BheSIsImFwcFR5cGUiLCJIdHRwUmVxdWVzdCIsIlBheVNlcnZpY2UiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsIl90aGlzIiwiR2V0T3JkZXJEZXRhaWwiLCJlcnJvciIsInNob3dJZCIsImRhdGVGb3JtYXQiLCJ2YWwiLCJzZXRJbnRlcnZhbCIsInBheVJlbWFpbmluZ1RpbWUiLCIkYXBwbHkiLCJuYW1lIiwicGhvbmUiLCJkZXRhaWwiLCJmdWxsQXJlYU5hbWUiLCJidXlpbmdSZWNvcmRzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsInB1c2giLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiY2IiLCJDYW5jZWxPcmRlciIsImNvbSIsIm51bSIsIkdldExvZ2lzdGljYSIsInBhcmFtIiwiZ2V0VG9rZW4iLCJpbml0RGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7bU1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxVQUFJLEVBRkM7QUFHTEMsbUJBQWEsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLEtBQWQsRUFBcUIsTUFBckIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsTUFBM0MsQ0FIUjtBQUlMQyxpQkFBVyxFQUpOO0FBS0xDLGNBQVEsRUFMSDtBQU1MQyxlQUFTLEVBTko7QUFPTEMsYUFBTyxFQVBGO0FBUUxDLGVBQVMsRUFSSjtBQVNMQyxrQkFBWSxFQVRQO0FBVUxDLFlBQU0sRUFWRDtBQVdMQyxXQUFLLEVBWEE7QUFZTEMsa0JBQVksRUFaUDtBQWFMQyxlQUFTLEVBYko7QUFjTEMsa0JBQVksRUFkUDtBQWVMQyxnQkFBVTtBQWZMLEssU0FpQlBDLFEsR0FBVztBQUNUQyxZQURTLG9CQUNDO0FBQ1IsWUFBSSxLQUFLVixLQUFMLENBQVdXLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsaUJBQU8sSUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVEMsZUFSUyx1QkFRSTtBQUNYLFlBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxpQkFBTyxLQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUNsRCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQWRRLEssU0FnQlpHLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxPQUFNLFdBQVAsRUFBbUIsU0FBUSxFQUEzQixFQUFULEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxPQUFsQixFQUEwQixRQUFPLE1BQWpDLEVBQXdDLFNBQVEsT0FBaEQsRUFBd0QsT0FBTSxLQUE5RCxFQUFoQixFQUFxRix5QkFBd0IsRUFBQyxTQUFRLGtCQUFULEVBQTRCLE9BQU0sT0FBbEMsRUFBMEMsUUFBTyxNQUFqRCxFQUF3RCxTQUFRLE9BQWhFLEVBQXdFLE9BQU0sS0FBOUUsRUFBN0csRUFBa00seUJBQXdCLEVBQUMsU0FBUSxXQUFULEVBQXFCLE9BQU0sT0FBM0IsRUFBbUMsUUFBTyxNQUExQyxFQUFpRCxTQUFRLE9BQXpELEVBQWlFLE9BQU0sS0FBdkUsRUFBMU4sRUFBYixFLFNBQ1RDLE8sR0FBVSxFLFNBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssU0FHVkMsTyxHQUFVO0FBQ1JDLFlBRFEsb0JBQ0U7QUFBQTs7QUFDUix1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGlCQUFPLElBRE07QUFFYkMsbUJBQVMsUUFGSTtBQUdiQyxtQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGdCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2YscUJBQUtDLFdBQUwsQ0FBaUIsWUFBTTtBQUNyQix1QkFBS3BCLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRCxlQUZEO0FBR0Q7QUFDRjtBQVRZLFNBQWY7QUFXRCxPQWJPO0FBY1JxQixlQWRRLHVCQWNLO0FBQ1gsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxtQ0FBbUMsS0FBS3BDO0FBRC9CLFNBQWhCO0FBR0QsT0FsQk87QUFtQlJxQyxXQW5CUSxtQkFtQkM7QUFDUCxZQUFJdkMsT0FBTztBQUNUQyxpQkFBTyxLQUFLQSxLQURIO0FBRVRPLG1CQUFTLEtBQUtOLEVBRkw7QUFHVHNDLG1CQUFTO0FBSEEsU0FBWDtBQUtBLGFBQUtwQixPQUFMLENBQWFxQixXQUFiLENBQXlCQyxVQUF6QixDQUFvQzFDLElBQXBDLEVBQTBDMkMsSUFBMUMsQ0FBK0MsVUFBQ1YsR0FBRCxFQUFTO0FBQ3REVyxrQkFBUUMsR0FBUixDQUFZWixHQUFaO0FBQ0E7QUFDRCxTQUhEO0FBSUQ7QUE3Qk8sSzs7Ozs7K0JBK0JFO0FBQ1YsV0FBSzFCLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBSXVDLFFBQVEsSUFBWjtBQUNBLFVBQUk5QyxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUTyxpQkFBUyxLQUFLTjtBQUZMLE9BQVg7QUFJQSxXQUFLa0IsT0FBTCxDQUFhcUIsV0FBYixDQUF5Qk0sY0FBekIsQ0FBd0MvQyxJQUF4QyxFQUE4QzJDLElBQTlDLENBQW1ELFVBQUNWLEdBQUQsRUFBUztBQUMxRFcsZ0JBQVFDLEdBQVIsQ0FBWVosR0FBWjtBQUNBLFlBQUlBLElBQUlqQyxJQUFKLENBQVNnRCxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUloRCxPQUFPaUMsSUFBSWpDLElBQUosQ0FBU0EsSUFBcEI7QUFDQThDLGdCQUFNMUMsU0FBTixHQUFrQjBDLE1BQU0zQyxXQUFOLENBQWtCSCxLQUFLSyxNQUF2QixDQUFsQjtBQUNBeUMsZ0JBQU16QyxNQUFOLEdBQWVMLEtBQUtLLE1BQXBCO0FBQ0F5QyxnQkFBTXRDLE9BQU4sR0FBZ0JSLEtBQUtpRCxNQUFyQjtBQUNBSCxnQkFBTXJDLFVBQU4sR0FBbUJxQyxNQUFNMUIsT0FBTixDQUFjOEIsVUFBZCxDQUF5QmxELEtBQUtTLFVBQUwsR0FBa0IsSUFBM0MsRUFBaUQsYUFBakQsQ0FBbkI7QUFDQXFDLGdCQUFNcEMsSUFBTixHQUFhVixLQUFLVSxJQUFMLEdBQVlWLEtBQUtVLElBQUwsQ0FBVSxDQUFWLEVBQWF5QyxHQUF6QixHQUErQixFQUE1QztBQUNBTCxnQkFBTW5DLEdBQU4sR0FBWVgsS0FBS1csR0FBakI7QUFDQW1DLGdCQUFNakMsT0FBTixHQUFnQmIsS0FBS2EsT0FBckI7QUFDQTtBQUNBdUMsc0JBQVksWUFBTTtBQUNoQnBELGlCQUFLcUQsZ0JBQUw7QUFDQSxnQkFBSXJELEtBQUtxRCxnQkFBTCxHQUF3QixDQUE1QixFQUErQjtBQUM3QlAsb0JBQU1oQyxVQUFOLEdBQW1CLENBQUNkLEtBQUtxRCxnQkFBTCxHQUF3QnJELEtBQUtxRCxnQkFBTCxHQUF3QixFQUFqRCxJQUF1RCxFQUF2RCxHQUE0RCxHQUE1RCxHQUFrRXJELEtBQUtxRCxnQkFBTCxHQUF3QixFQUExRixHQUErRixHQUFsSDtBQUNELGFBRkQsTUFFTztBQUNMUCxvQkFBTWhDLFVBQU4sR0FBbUIsQ0FBbkI7QUFDRDtBQUNEZ0Msa0JBQU1RLE1BQU47QUFDRCxXQVJELEVBUUcsSUFSSDtBQVNBLGNBQUl0RCxLQUFLTSxPQUFULEVBQWtCO0FBQ2hCd0Msa0JBQU14QyxPQUFOLENBQWNpRCxJQUFkLEdBQXFCdkQsS0FBS00sT0FBTCxDQUFhaUQsSUFBbEM7QUFDQVQsa0JBQU14QyxPQUFOLENBQWNrRCxLQUFkLEdBQXNCeEQsS0FBS00sT0FBTCxDQUFha0QsS0FBbkM7QUFDQVYsa0JBQU14QyxPQUFOLENBQWNtRCxNQUFkLEdBQXVCekQsS0FBS00sT0FBTCxDQUFhb0QsWUFBYixHQUE0QjFELEtBQUtNLE9BQUwsQ0FBYUEsT0FBaEU7QUFDRDtBQUNEd0MsZ0JBQU1sQyxVQUFOLEdBQW1CWixLQUFLWSxVQUF4QjtBQUNBWixlQUFLMkQsYUFBTCxDQUFtQkMsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ25DLGdCQUFJQyxNQUFNLEVBQVY7QUFDQUEsZ0JBQUloQyxLQUFKLEdBQVkrQixLQUFLL0IsS0FBakI7QUFDQWdDLGdCQUFJQyxXQUFKLEdBQWtCakIsTUFBTWtCLFNBQU4sQ0FBZ0JILEtBQUtGLGFBQXJCLENBQWxCO0FBQ0FiLGtCQUFNdkMsS0FBTixDQUFZMEQsSUFBWixDQUFpQkgsR0FBakI7QUFDRCxXQUxEO0FBTUQ7QUFDRGhCLGNBQU1RLE1BQU47QUFDRCxPQW5DRDtBQW9DRDs7OzhCQUNVWSxNLEVBQVE7QUFDakIsVUFBSUMsUUFBUSxFQUFaO0FBQ0FELGFBQU9OLE9BQVAsQ0FBZSxVQUFDQyxJQUFELEVBQVU7QUFDdkIsWUFBSUMsTUFBTSxFQUFWO0FBQ0FBLFlBQUlNLElBQUosR0FBV1AsS0FBS1EsS0FBaEI7QUFDQVAsWUFBSWhDLEtBQUosR0FBWStCLEtBQUtTLFdBQWpCO0FBQ0FSLFlBQUlTLEtBQUosR0FBWVYsS0FBS1csV0FBakI7QUFDQVYsWUFBSVcsUUFBSixHQUFlWixLQUFLVSxLQUFwQjtBQUNBVCxZQUFJNUQsRUFBSixHQUFTMkQsS0FBS2EsU0FBZDtBQUNBWixZQUFJYSxVQUFKLEdBQWlCZCxLQUFLZSxhQUF0QjtBQUNBZCxZQUFJZSxRQUFKLEdBQWVoQixLQUFLaUIsV0FBcEI7QUFDQWhCLFlBQUlMLE1BQUosR0FBYUksS0FBSy9CLEtBQUwsR0FBYSxHQUFiLEdBQW1CK0IsS0FBS2tCLFdBQXJDO0FBQ0FqQixZQUFJa0IsS0FBSixHQUFZbkIsS0FBS2tCLFdBQWpCO0FBQ0FqQixZQUFJbUIsT0FBSixHQUFjLEtBQWQ7QUFDQW5CLFlBQUlvQixVQUFKLEdBQWlCckIsS0FBS3NCLFNBQXRCO0FBQ0FoQixjQUFNRixJQUFOLENBQVdILEdBQVg7QUFDRCxPQWREO0FBZUEsYUFBT0ssS0FBUDtBQUNEOzs7Z0NBQ1lpQixFLEVBQUk7QUFDZixVQUFJcEYsT0FBTztBQUNUQyxlQUFPLEtBQUtBLEtBREg7QUFFVE8saUJBQVMsS0FBS047QUFGTCxPQUFYO0FBSUEwQyxjQUFRQyxHQUFSLENBQVk3QyxJQUFaO0FBQ0EsV0FBS29CLE9BQUwsQ0FBYXFCLFdBQWIsQ0FBeUI0QyxXQUF6QixDQUFxQ3JGLElBQXJDLEVBQTJDMkMsSUFBM0MsQ0FBZ0QsVUFBQ1YsR0FBRCxFQUFTO0FBQ3ZEVyxnQkFBUUMsR0FBUixDQUFZWixHQUFaO0FBQ0EsWUFBSUEsSUFBSWpDLElBQUosQ0FBU2dELEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJvQyxnQkFBTUEsSUFBTjtBQUNEO0FBQ0YsT0FMRDtBQU1EOzs7a0NBQ2NFLEcsRUFBS0MsRyxFQUFLO0FBQ3ZCLFVBQUl2RixPQUFPO0FBQ1RzRixhQUFLQSxHQURJO0FBRVRDLGFBQUtBO0FBRkksT0FBWDtBQUlBLFdBQUtuRSxPQUFMLENBQWFxQixXQUFiLENBQXlCK0MsWUFBekIsQ0FBc0N4RixJQUF0QyxFQUE0QzJDLElBQTVDLENBQWlELFVBQUNWLEdBQUQsRUFBUztBQUN4RFcsZ0JBQVFDLEdBQVIsQ0FBWVosR0FBWjtBQUNELE9BRkQ7QUFHRDs7OzJCQUNPd0QsSyxFQUFPO0FBQ2IsV0FBS3ZGLEVBQUwsR0FBVXVGLE1BQU12RixFQUFoQjtBQUNBLFdBQUtELEtBQUwsR0FBYSxLQUFLbUIsT0FBTCxDQUFhc0UsUUFBYixFQUFiO0FBQ0EsV0FBS3BDLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS3FDLFFBQUw7QUFDRDs7OztFQXRLc0MsZUFBS0MsSTs7a0JBQXpCL0YsVyIsImZpbGUiOiJvcmRlckRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V6K+m5oOFJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaWQ6ICcnLFxuICAgICAgb3JkZXJTdGF0dXM6IFsn5byC5bi4JywgJ+W+heaUr+S7mCcsICfllK7lkI7kuK0nLCAn6K6i5Y2V5YWz6ZetJywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5Lqk5piT5a6M5oiQJ10sXG4gICAgICBzdGF0dXNUeHQ6ICcnLFxuICAgICAgc3RhdHVzOiAnJyxcbiAgICAgIGFkZHJlc3M6IHt9LFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBjcmVhdGVUaW1lOiAnJyxcbiAgICAgIG1lbW86ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIGZpbmFsUHJpY2U6ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICByZW1haW5UaW1lOiAnJyxcbiAgICAgIGlzSGlkZGVuOiBmYWxzZVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJvcmRlclwiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcIm9yZGVyXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJvcmRlclwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOiuouWNlScsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuY2VsT3JkZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNIaWRkZW4gPSB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9b3JkZXJkZXRhaWwmaWQ9JyArIHRoaXMuaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgIG9yZGVySWQ6IHRoaXMuaWQsXG4gICAgICAgICAgYXBwVHlwZTogJ2lvcydcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuUGF5U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgLy8g6LCD5b6u5L+h5pSv5LuY5by556qXXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhICgpIHtcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0T3JkZXJEZXRhaWwoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuc3RhdHVzVHh0ID0gX3RoaXMub3JkZXJTdGF0dXNbZGF0YS5zdGF0dXNdXG4gICAgICAgICAgX3RoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXNcbiAgICAgICAgICBfdGhpcy5vcmRlcklkID0gZGF0YS5zaG93SWRcbiAgICAgICAgICBfdGhpcy5jcmVhdGVUaW1lID0gX3RoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGRhdGEuY3JlYXRlVGltZSAqIDEwMDAsICdZLW0tZCBIOmk6cycpXG4gICAgICAgICAgX3RoaXMubWVtbyA9IGRhdGEubWVtbyA/IGRhdGEubWVtb1swXS52YWwgOiAnJ1xuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIC8vIF90aGlzLmluaXRMb2dpc3RpY2EoJ3NodW5mZW5nJywgZGF0YS5zaG93SWQpXG4gICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZGF0YS5wYXlSZW1haW5pbmdUaW1lIC0tXG4gICAgICAgICAgICBpZiAoZGF0YS5wYXlSZW1haW5pbmdUaW1lID4gMCkge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gKGRhdGEucGF5UmVtYWluaW5nVGltZSAtIGRhdGEucGF5UmVtYWluaW5nVGltZSAlIDYwKSAvIDYwICsgJ+WIhicgKyBkYXRhLnBheVJlbWFpbmluZ1RpbWUgJSA2MCArICfnp5InXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5yZW1haW5UaW1lID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIGlmIChkYXRhLmFkZHJlc3MpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MubmFtZSA9IGRhdGEuYWRkcmVzcy5uYW1lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnBob25lID0gZGF0YS5hZGRyZXNzLnBob25lXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLmRldGFpbCA9IGRhdGEuYWRkcmVzcy5mdWxsQXJlYU5hbWUgKyBkYXRhLmFkZHJlc3MuYWRkcmVzc1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5maW5hbFByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5idXlpbmdSZWNvcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGNhbmNlbE9yZGVyIChjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdExvZ2lzdGljYSAoY29tLCBudW0pIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjb206IGNvbSxcbiAgICAgICAgbnVtOiBudW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY2EoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIHRoaXMuaWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICB9XG4gIH1cbiJdfQ==