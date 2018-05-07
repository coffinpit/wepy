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
            sourceType: this.sourceType,
            sourceId: this.sourceId,
            buyCount: this.count,
            address_main: this.user.id,
            memo_main: this.memo,
            date_main: 4
          };
          console.log(data);
          this.$parent.HttpRequest.CreateOrderBuy(data).then(function (res) {
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

  _createClass(PayBuy, [{
    key: 'applyOrder',
    value: function applyOrder() {
      var _this3 = this;

      this.order = [];
      var _this = this;
      var data = {
        token: this.token,
        sourceType: this.sourceType,
        sourceId: this.sourceId,
        buyCount: this.count
      };
      console.log(data);
      this.$parent.HttpRequest.ApplyOrderBuy(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
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
      console.log(param);
      this.sourceId = param.id;
      this.sourceType = param.type;
      this.count = param.count;
      this.token = this.$parent.getToken('paybuy');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.$apply();
      this.applyOrder();
    }
  }]);

  return PayBuy;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayBuy , 'pages/paybuy'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsInRva2VuIiwic291cmNlSWQiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsImZpbmFscHJpY2UiLCJ0eHRMZW5ndGgiLCJtZW1vIiwibWV0aG9kcyIsImdvQWRkcmVzcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1BheSIsImFyZWFJZCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJpZCIsIm1lbW9fbWFpbiIsImRhdGVfbWFpbiIsImNvbnNvbGUiLCJsb2ciLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsImlucHV0VGFwIiwiZSIsImRldGFpbCIsInZhbHVlIiwiX3RoaXMiLCJBcHBseU9yZGVyQnV5IiwiZXJyb3IiLCJmaW5hbFByaWNlIiwiY2hpbGRPcmRlcnMiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsImNvbGRDaGVja2VkIiwidGVtcENvbGQiLCJjb2xkbGlzdCIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJwdXNoIiwiJGFwcGx5IiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJrZWVwQ291bnQiLCJ2aWNlVGl0bGUiLCJpbml0Q291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsInBhcmFtIiwiSlNPTiIsInBhcnNlIiwidHlwZSIs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QUwsR0FBZ0JvRSxNQUFNM0MsRUFBdEI7QUFDQSxXQUFLeEIsVUFBTCxHQUFrQm1FLE1BQU1HLElBQXhCO0FBQ0EsV0FBS3JFLEtBQUwsR0FBYWtFLE1BQU1sRSxLQUFuQjtBQUNBLFdBQUtILEtBQUwsR0FBYSxLQUFLTixPQUFMLENBQWErRSxRQUFiLENBQXNCLFFBQXRCLENBQWI7QUFDQSxXQUFLcEIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLQSxNQUFMO0FBQ0EsV0FBS3FCLFVBQUw7QUFDRDs7OztFQWpKaUMsZUFBS0MsSTs7a0JBQXBCdEYsTSIsImZpbGUiOiJwYXlidXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXlCdXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqTorqLljZUnXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYWRkOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJ1xuICAgICAgfSxcbiAgICAgIGFkZHJlc3NNYWluOiAnJyxcbiAgICAgIGFwcFR5cGU6ICd3ZWInLFxuICAgICAgb3JkZXI6IFtdLFxuICAgICAgcmVkdWN0aW9uOiAnJyxcbiAgICAgIGZyZWlnaHQ6ICcnLFxuICAgICAgcGF5OiAnJyxcbiAgICAgIGZpbmFscHJpY2U6ICcnLFxuICAgICAgdHh0TGVuZ3RoOiAwLFxuICAgICAgbWVtbzogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzP3BhZ2U9cGF5YnV5JyArICcmc291cmNlVHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZzb3VyY2VJZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1BheSAoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyLmFyZWFJZCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5pS26LSn5Zyw5Z2AJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBhcHBUeXBlOiAnaW9zJyxcbiAgICAgICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuc291cmNlVHlwZSxcbiAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICAgICAgYnV5Q291bnQ6IHRoaXMuY291bnQsXG4gICAgICAgICAgICBhZGRyZXNzX21haW46IHRoaXMudXNlci5pZCxcbiAgICAgICAgICAgIG1lbW9fbWFpbjogdGhpcy5tZW1vLFxuICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNyZWF0ZU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLnR4dExlbmd0aCA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aFxuICAgICAgICB0aGlzLm1lbW8gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBseU9yZGVyICgpIHtcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BcHBseU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5vcmRlcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgaWYgKGl0ZW0uYnV5Q291bnQgPD0gaXRlbS5rZWVwQ291bnQpIHtcbiAgICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmtlZXBDb3VudFxuICAgICAgICAgIG9iai5jb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgICAgb2JqLmluaXRDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIH1cbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhwYXJhbSlcbiAgICAgIHRoaXMuc291cmNlSWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy5zb3VyY2VUeXBlID0gcGFyYW0udHlwZVxuICAgICAgdGhpcy5jb3VudCA9IHBhcmFtLmNvdW50XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdwYXlidXknKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICB9XG4gIH1cbiJdfQ==