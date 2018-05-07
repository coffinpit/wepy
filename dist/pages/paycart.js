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
        if (item.buyCount <= item.keepCount) {
          obj.detail = item.viceTitle + '×' + item.buyCount;
          obj.count = item.buyCount;
          obj.initCount = item.buyCount;
        } else {
          obj.detail = item.viceTitle + '×' + item.keepCount;
          obj.count = item.keepCount;
          obj.initCount = item.keepCount;
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWNhcnQuanMiXSwibmFtZXMiOlsiUGF5Q2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNOdWxsIiwib3JkZXIiLCJsZW5ndGgiLCJkYXRhIiwib3JkZXJIYXNoIiwidG9rZW4iLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsImZpbmFscHJpY2UiLCJ0eHRMZW5ndGgiLCJtZW1vIiwibWV0aG9kcyIsImdvQWRkcmVzcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1BheSIsImFyZWFJZCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiaGFzaCIsImFkZHJlc3NfbWFpbiIsImlkIiwibWVtb19tYWluIiwiZGF0ZV9tYWluIiwiY29uc29sZSIsImxvZyIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlVXNlck9yZGVyIiwidGhlbiIsInJlcyIsImlucHV0VGFwIiwiZSIsImRldGFpbCIsInZhbHVlIiwiX3RoaXMiLCJBcHBseU9yZGVySHR0cCIsImVycm9yIiwiZmluYWxQcmljZSIsImNoaWxkT3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJjb2xkQ2hlY2tlZCIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiYnV5Q291bnQiLCJrZWVwQ291bnQiLCJ2aWNlVGl0bGUiLCJjb3VudCIsImluaXRDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50IiwicGFyYW0i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Q0FqQixZQUFJa0IsUUFBSixHQUFlbkIsS0FBS29CLFdBQXBCO0FBQ0EsWUFBSXBCLEtBQUtxQixRQUFMLElBQWlCckIsS0FBS3NCLFNBQTFCLEVBQXFDO0FBQ25DckIsY0FBSVQsTUFBSixHQUFhUSxLQUFLdUIsU0FBTCxHQUFpQixHQUFqQixHQUF1QnZCLEtBQUtxQixRQUF6QztBQUNBcEIsY0FBSXVCLEtBQUosR0FBWXhCLEtBQUtxQixRQUFqQjtBQUNBcEIsY0FBSXdCLFNBQUosR0FBZ0J6QixLQUFLcUIsUUFBckI7QUFDRCxTQUpELE1BSU87QUFDTHBCLGNBQUlULE1BQUosR0FBYVEsS0FBS3VCLFNBQUwsR0FBaUIsR0FBakIsR0FBdUJ2QixLQUFLc0IsU0FBekM7QUFDQXJCLGNBQUl1QixLQUFKLEdBQVl4QixLQUFLc0IsU0FBakI7QUFDQXJCLGNBQUl3QixTQUFKLEdBQWdCekIsS0FBS3NCLFNBQXJCO0FBQ0Q7QUFDRHJCLFlBQUl5QixPQUFKLEdBQWMsS0FBZDtBQUNBekIsWUFBSTBCLFVBQUosR0FBaUIzQixLQUFLc0IsU0FBdEI7QUFDQVosY0FBTUgsSUFBTixDQUFXTixHQUFYO0FBQ0QsT0FyQkQ7QUFzQkEsYUFBT1MsS0FBUDtBQUNEOzs7MkJBQ09rQixLLEVBQU87QUFDYixVQUFJQSxNQUFNckUsSUFBVixFQUFnQjtBQUNkLGFBQUtBLElBQUwsR0FBWXNFLEtBQUtDLEtBQUwsQ0FBV0YsTUFBTXJFLElBQWpCLENBQVo7QUFDRDtBQUNELFdBQUtELEtBQUwsR0FBYSxLQUFLUCxPQUFMLENBQWFnRixRQUFiLENBQXNCLFNBQXRCLENBQWI7QUFDQSxXQUFLdkIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLQSxNQUFMO0FBQ0EsV0FBS3dCLFVBQUw7QUFDRDs7OztFQXRJa0MsZUFBS0MsSTs7a0JBQXJCdkYsTyIsImZpbGUiOiJwYXljYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5Q2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIG9yZGVySGFzaDogJycsXG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGFkZDogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCdcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzTWFpbjogJycsXG4gICAgICBhcHBUeXBlOiAnd2ViJyxcbiAgICAgIG9yZGVyOiBbXSxcbiAgICAgIHJlZHVjdGlvbjogJycsXG4gICAgICBmcmVpZ2h0OiAnJyxcbiAgICAgIHBheTogJycsXG4gICAgICBmaW5hbHByaWNlOiAnJyxcbiAgICAgIHR4dExlbmd0aDogMCxcbiAgICAgIG1lbW86ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0FkZHJlc3MgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYWRkcmVzcz9wYWdlPXBheWNhcnQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29QYXkgKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlci5hcmVhSWQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ2lvcycsXG4gICAgICAgICAgICBoYXNoOiB0aGlzLm9yZGVySGFzaCxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgbWVtb19tYWluOiB0aGlzLm1lbW8sXG4gICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlVXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLnR4dExlbmd0aCA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aFxuICAgICAgICB0aGlzLm1lbW8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBseU9yZGVyICgpIHtcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQXBwbHlPcmRlckh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMub3JkZXJIYXNoID0gZGF0YS5oYXNoXG4gICAgICAgICAgX3RoaXMucmVkdWN0aW9uID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgX3RoaXMucGF5ID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLm9yZGVyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBpZiAoaXRlbS5idXlDb3VudCA8PSBpdGVtLmtlZXBDb3VudCkge1xuICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0ua2VlcENvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgfVxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS51c2VyKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UocGFyYW0udXNlcilcbiAgICAgIH1cbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ3BheWNhcnQnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICB9XG4gIH1cbiJdfQ==