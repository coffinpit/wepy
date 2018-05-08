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

      this.$parent.showLoading();
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
          _this.memberPrice = data.memberPrice;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWJ1eS5qcyJdLCJuYW1lcyI6WyJQYXlCdXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzTnVsbCIsIm9yZGVyIiwibGVuZ3RoIiwiZGF0YSIsInRva2VuIiwic291cmNlSWQiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJ1c2VyIiwiYWRkIiwiYWRkcmVzc01haW4iLCJhcHBUeXBlIiwicmVkdWN0aW9uIiwiZnJlaWdodCIsInBheSIsIm1lbWJlclByaWNlIiwiZmluYWxwcmljZSIsInR4dExlbmd0aCIsIm1lbW8iLCJtZXRob2RzIiwiZ29BZGRyZXNzIiwibmF2aWdhdGVUbyIsInVybCIsImdvUGF5IiwiYXJlYUlkIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiaW1hZ2UiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsImlkIiwibWVtb19tYWluIiwiZGF0ZV9tYWluIiwiY29uc29sZSIsImxvZyIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlT3JkZXJCdXkiLCJ0aGVuIiwicmVzIiwiaW5wdXRUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiQXBwbHlPcmRlckJ1eSIsImVycm9yIiwiZmluYWxQcmljZSIsImNoaWxkT3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJjb2xkQ2hlY2tlZCIsInRlbXBDb2xkIiwiY29sZGxpc3QiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicHVzaCIsIiRhcHBseSIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsInZpY2VUaXRsZSIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwicGFyYW0iLCJKU09OIiwicGFyc2UiLCJ0eXBl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QSxXQUFLbUIsVUFBTDtBQUNEOzs7O0VBNUlpQyxlQUFLQyxJOztrQkFBcEJ0RixNIiwiZmlsZSI6InBheWJ1eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheUJ1eSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlSdcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIHNvdXJjZVR5cGU6ICcnLFxuICAgICAgY291bnQ6ICcnLFxuICAgICAgdXNlcjoge1xuICAgICAgICBhZGQ6ICfor7fpgInmi6nmlLbotKflnLDlnYAnXG4gICAgICB9LFxuICAgICAgYWRkcmVzc01haW46ICcnLFxuICAgICAgYXBwVHlwZTogJ3dlYicsXG4gICAgICBvcmRlcjogW10sXG4gICAgICByZWR1Y3Rpb246ICcnLFxuICAgICAgZnJlaWdodDogJycsXG4gICAgICBwYXk6ICcnLFxuICAgICAgbWVtYmVyUHJpY2U6ICcnLFxuICAgICAgZmluYWxwcmljZTogJycsXG4gICAgICB0eHRMZW5ndGg6IDAsXG4gICAgICBtZW1vOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3M/cGFnZT1wYXlidXknICsgJyZzb3VyY2VUeXBlPScgKyB0aGlzLnNvdXJjZVR5cGUgKyAnJnNvdXJjZUlkPScgKyB0aGlzLnNvdXJjZUlkICsgJyZjb3VudD0nICsgdGhpcy5jb3VudFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvUGF5ICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXIuYXJlYUlkKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nmlLbotKflnLDlnYAnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIGFwcFR5cGU6ICdpb3MnLFxuICAgICAgICAgICAgc291cmNlVHlwZTogdGhpcy5zb3VyY2VUeXBlLFxuICAgICAgICAgICAgc291cmNlSWQ6IHRoaXMuc291cmNlSWQsXG4gICAgICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudCxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogdGhpcy51c2VyLmlkLFxuICAgICAgICAgICAgbWVtb19tYWluOiB0aGlzLm1lbW8sXG4gICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlT3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlucHV0VGFwIChlKSB7XG4gICAgICAgIHRoaXMudHh0TGVuZ3RoID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoXG4gICAgICAgIHRoaXMubWVtbyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGFwcGx5T3JkZXIgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMub3JkZXIgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLnNvdXJjZUlkLFxuICAgICAgICBidXlDb3VudDogdGhpcy5jb3VudFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BcHBseU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIF90aGlzLnBheSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5vcmRlci5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5vcmRlcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0udXNlcikge1xuICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKHBhcmFtLnVzZXIpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhwYXJhbSlcbiAgICAgIHRoaXMuc291cmNlSWQgPSBwYXJhbS5pZFxuICAgICAgdGhpcy5zb3VyY2VUeXBlID0gcGFyYW0udHlwZVxuICAgICAgdGhpcy5jb3VudCA9IHBhcmFtLmNvdW50XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdwYXlidXknKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5hcHBseU9yZGVyKClcbiAgICB9XG4gIH1cbiJdfQ==