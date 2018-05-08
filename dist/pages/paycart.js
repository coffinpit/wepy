'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
            memo_main: this.memo,
            date_main: 4
          };
          console.log(data);
          this.$parent.HttpRequest.CreateUserOrder(data).then(function (res) {
            console.log(res);
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
            obj.coldChecked = false;
            obj.tempCold = [];
            obj.coldlist = _this3.initChild(item.salesUnits);
            _this.order.push(obj);
            _this.$apply();
          });
          console.log(_this.order);
        }
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
      this.token = this.$parent.getToken('paycart');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.$apply();
      this.applyOrder();
    }
  }]);

  return PayCart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayCart , 'pages/paycart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNOdWxsIiwib3JkZXIiLCJsZW5ndGgiLCJkYXRhIiwib3JkZXJIYXNoIiwidG9rZW4iLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvUGF5IiwiYXJlYUlkIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJoYXNoIiwiYWRkcmVzc19tYWluIiwiaWQiLCJtZW1vX21haW4iLCJkYXRlX21haW4iLCJjb25zb2xlIiwibG9nIiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVVc2VyT3JkZXIiLCJ0aGVuIiwicmVzIiwiaW5wdXRUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiQXBwbHlPcmRlckh0dHAiLCJlcnJvciIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImZvckVhY2giLCJpdGVtIiwib2JqIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImNvbGRsaXN0IiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInB1c2giLCIkYXBwbHkiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJ2aWNlVGl0bGUiLCJidXlDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwicGFyYW0iLCJKU09O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QUFwQjtBQUNBWixZQUFJckIsRUFBSixHQUFTb0IsS0FBS2UsU0FBZDtBQUNBZCxZQUFJZSxVQUFKLEdBQWlCaEIsS0FBS2lCLGFBQXRCO0FBQ0FoQixZQUFJaUIsUUFBSixHQUFlbEIsS0FBS21CLFdBQXBCO0FBQ0FsQixZQUFJVixNQUFKLEdBQWFTLEtBQUtvQixTQUFMLEdBQWlCLEdBQWpCLEdBQXVCcEIsS0FBS3FCLFFBQXpDO0FBQ0FwQixZQUFJcUIsT0FBSixHQUFjLEtBQWQ7QUFDQXJCLFlBQUlzQixVQUFKLEdBQWlCdkIsS0FBS3dCLFNBQXRCO0FBQ0FkLGNBQU1ILElBQU4sQ0FBV04sR0FBWDtBQUNELE9BYkQ7QUFjQSxhQUFPUyxLQUFQO0FBQ0Q7OzsyQkFDT2UsSyxFQUFPO0FBQ2IsVUFBSUEsTUFBTXBFLElBQVYsRUFBZ0I7QUFDZCxhQUFLQSxJQUFMLEdBQVlxRSxLQUFLQyxLQUFMLENBQVdGLE1BQU1wRSxJQUFqQixDQUFaO0FBQ0Q7QUFDRCxXQUFLRCxLQUFMLEdBQWEsS0FBS1AsT0FBTCxDQUFhK0UsUUFBYixDQUFzQixTQUF0QixDQUFiO0FBQ0EsV0FBS3BCLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0EsTUFBTDtBQUNBLFdBQUtxQixVQUFMO0FBQ0Q7Ozs7RUFqSWtDLGVBQUtDLEk7O2tCQUFyQnRGLE8iLCJmaWxlIjoicGF5Y2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUNhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqTorqLljZUnXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBvcmRlckhhc2g6ICcnLFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlcjoge1xuICAgICAgICBhZGQ6ICfor7fpgInmi6nmlLbotKflnLDlnYAnXG4gICAgICB9LFxuICAgICAgYWRkcmVzc01haW46ICcnLFxuICAgICAgYXBwVHlwZTogJ3dlYicsXG4gICAgICBvcmRlcjogW10sXG4gICAgICByZWR1Y3Rpb246ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgbWVtYmVyUHJpY2U6ICcnLFxuICAgICAgZmluYWxwcmljZTogJycsXG4gICAgICB0eHRMZW5ndGg6IDAsXG4gICAgICBtZW1vOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1wYXljYXJ0J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXIuYXJlYUlkKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nmlLbotKflnLDlnYAnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIGFwcFR5cGU6ICdpb3MnLFxuICAgICAgICAgICAgaGFzaDogdGhpcy5vcmRlckhhc2gsXG4gICAgICAgICAgICBhZGRyZXNzX21haW46IHRoaXMudXNlci5pZCxcbiAgICAgICAgICAgIG1lbW9fbWFpbjogdGhpcy5tZW1vLFxuICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNyZWF0ZVVzZXJPcmRlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5wdXRUYXAgKGUpIHtcbiAgICAgICAgdGhpcy50eHRMZW5ndGggPSBlLmRldGFpbC52YWx1ZS5sZW5ndGhcbiAgICAgICAgdGhpcy5tZW1vID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgYXBwbHlPcmRlciAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5vcmRlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BcHBseU9yZGVySHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5vcmRlckhhc2ggPSBkYXRhLmhhc2hcbiAgICAgICAgICBfdGhpcy5yZWR1Y3Rpb24gPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBfdGhpcy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5wYXkgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gdGhpcy5pbml0Q2hpbGQoaXRlbS5zYWxlc1VuaXRzKVxuICAgICAgICAgICAgX3RoaXMub3JkZXIucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc29sZS5sb2coX3RoaXMub3JkZXIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgaWYgKHBhcmFtLnVzZXIpIHtcbiAgICAgICAgdGhpcy51c2VyID0gSlNPTi5wYXJzZShwYXJhbS51c2VyKVxuICAgICAgfVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigncGF5Y2FydCcpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmFwcGx5T3JkZXIoKVxuICAgIH1cbiAgfVxuIl19