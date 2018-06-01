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

var Logistica = function (_wepy$page) {
  _inherits(Logistica, _wepy$page);

  function Logistica() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Logistica);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Logistica.__proto__ || Object.getPrototypeOf(Logistica)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '我的物流'
    }, _this2.data = {
      package: [],
      current: 0,
      orderId: '',
      logistic: [],
      status: [],
      isLoading: false
    }, _this2.$repeat = { "logistic": { "com": "orderList", "props": "" } }, _this2.$props = { "orderList": { "xmlns:v-bind": { "value": "", "for": "logistic", "item": "item", "index": "index", "key": "key" }, "v-bind:orderList.sync": { "value": "item.orderDetail", "for": "logistic", "item": "item", "index": "index", "key": "key" }, "v-bind:userLevel.sync": { "value": "userLevel", "for": "logistic", "item": "item", "index": "index", "key": "key" } } }, _this2.$events = {}, _this2.components = {
      orderList: _orderlist2.default
    }, _this2.computed = {
      userLevel: function userLevel() {
        if (this.$parent.globalData.userLevel === 0) {
          return false;
        } else if (this.$parent.globalData.userLevel === 1) {
          return true;
        }
      }
    }, _this2.methods = {
      checkPackage: function checkPackage(index) {
        this.current = index;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Logistica, [{
    key: 'initLogistic',
    value: function initLogistic() {
      var _this3 = this;

      this.logistic = [];
      this.$parent.showLoading();
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.orderId
      };
      this.$parent.HttpRequest.GetLogistic(data).then(function (res) {
        console.log(res);
        _this.$parent.showSuccess();
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.logisticsCode = item.logisticsCode;
            obj.name = item.logistics.name;
            obj.phone = item.logistics.phone;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.logistic.push(obj);
            _this.getStatus(item.logistics.id, item.logisticsCode);
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.initLogistic();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showSuccess();
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
    key: 'getStatus',
    value: function getStatus(logisticsId, logisticsCode) {
      this.status = [];
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.orderId,
        logisticsId: logisticsId,
        logisticsCode: logisticsCode
      };
      this.$parent.HttpRequest.GetLogisticStatus(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.isLoading = true;
          var data = res.data.data;
          var statusTemp = [];
          data.forEach(function (item) {
            var obj = {};
            obj.time = item.time.split(' ');
            obj.text = item.context;
            statusTemp.push(obj);
          });
          _this.status.push(statusTemp);
          console.log(_this.status);
        }
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(id) {
      this.orderId = id.id;
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initLogistic();
    }
  }]);

  return Logistica;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Logistica , 'pages/logistica'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2lzdGljYS5qcyJdLCJuYW1lcyI6WyJMb2dpc3RpY2EiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInBhY2thZ2UiLCJjdXJyZW50Iiwib3JkZXJJZCIsImxvZ2lzdGljIiwic3RhdHVzIiwiaXNMb2FkaW5nIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwib3JkZXJMaXN0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIm1ldGhvZHMiLCJjaGVja1BhY2thZ2UiLCJpbmRleCIsInNob3dMb2FkaW5nIiwidG9rZW4iLCJnZXRUb2tlbiIsIl90aGlzIiwiSHR0cFJlcXVlc3QiLCJHZXRMb2dpc3RpYyIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic2hvd1N1Y2Nlc3MiLCJlcnJvciIsImZvckVhY2giLCJpdGVtIiwib2JqIiwibG9naXN0aWNzQ29kZSIsIm5hbWUiLCJsb2dpc3RpY3MiLCJwaG9uZSIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwiYnV5aW5nUmVjb3JkcyIsInB1c2giLCJnZXRTdGF0dXMiLCJpZCIsIm1pc3NUb2tlbiIsImluaXRMb2dpc3RpYyIsIiRhcHBseSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsInRpdGxlIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNvdW50IiwiY2hlY2tlZCIsInRvdGFsQ291bnQiLCJrZWVwQ291bnQiLCJsb2dpc3RpY3NJZCIsIkdldExvZ2lzdGljU3RhdHVzIiwic3RhdHVzVGVtcCIsInRpbWUiLCJzcGxpdCIsInRleHQiLCJjb250ZXh0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S0csTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRCxZQUFMO0FBQ0Q7Ozs7RUF4SG9DLGVBQUsrQixJOztrQkFBdkIvRSxTIiwiZmlsZSI6ImxvZ2lzdGljYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgT3JkZXJMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvb3JkZXJsaXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2lzdGljYSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOeJqea1gSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHBhY2thZ2U6IFtdLFxuICAgICAgY3VycmVudDogMCxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgbG9naXN0aWM6IFtdLFxuICAgICAgc3RhdHVzOiBbXSxcbiAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wibG9naXN0aWNcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibG9naXN0aWNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJsb2dpc3RpY1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwibG9naXN0aWNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoZWNrUGFja2FnZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdExvZ2lzdGljICgpIHtcbiAgICAgIHRoaXMubG9naXN0aWMgPSBbXVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpYyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5sb2dpc3RpY3NDb2RlID0gaXRlbS5sb2dpc3RpY3NDb2RlXG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubG9naXN0aWNzLm5hbWVcbiAgICAgICAgICAgIG9iai5waG9uZSA9IGl0ZW0ubG9naXN0aWNzLnBob25lXG4gICAgICAgICAgICBvYmoub3JkZXJEZXRhaWwgPSBfdGhpcy5pbml0Q2hpbGQoaXRlbS5idXlpbmdSZWNvcmRzKVxuICAgICAgICAgICAgX3RoaXMubG9naXN0aWMucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5nZXRTdGF0dXMoaXRlbS5sb2dpc3RpY3MuaWQsIGl0ZW0ubG9naXN0aWNzQ29kZSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0TG9naXN0aWMoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS50aXRsZSArICfDlycgKyBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBnZXRTdGF0dXMgKGxvZ2lzdGljc0lkLCBsb2dpc3RpY3NDb2RlKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9IFtdXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxuICAgICAgICBsb2dpc3RpY3NJZDogbG9naXN0aWNzSWQsXG4gICAgICAgIGxvZ2lzdGljc0NvZGU6IGxvZ2lzdGljc0NvZGVcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY1N0YXR1cyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgdmFyIHN0YXR1c1RlbXAgPSBbXVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGltZSA9IGl0ZW0udGltZS5zcGxpdCgnICcpXG4gICAgICAgICAgICBvYmoudGV4dCA9IGl0ZW0uY29udGV4dFxuICAgICAgICAgICAgc3RhdHVzVGVtcC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLnN0YXR1cy5wdXNoKHN0YXR1c1RlbXApXG4gICAgICAgICAgY29uc29sZS5sb2coX3RoaXMuc3RhdHVzKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLm9yZGVySWQgPSBpZC5pZFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0TG9naXN0aWMoKVxuICAgIH1cbiAgfVxuIl19