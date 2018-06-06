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
      isLoading: false,
      orderStatus: ''
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
        _this.$parent.hideLoading();
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
      this.orderStatus = id.status;
      console.log(this.orderStatus);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2lzdGljYS5qcyJdLCJuYW1lcyI6WyJMb2dpc3RpY2EiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInBhY2thZ2UiLCJjdXJyZW50Iiwib3JkZXJJZCIsImxvZ2lzdGljIiwic3RhdHVzIiwiaXNMb2FkaW5nIiwib3JkZXJTdGF0dXMiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4Iiwic2hvd0xvYWRpbmciLCJ0b2tlbiIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldExvZ2lzdGljIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImVycm9yIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJsb2dpc3RpY3NDb2RlIiwibmFtZSIsImxvZ2lzdGljcyIsInBob25lIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJidXlpbmdSZWNvcmRzIiwicHVzaCIsImdldFN0YXR1cyIsImlkIiwibWlzc1Rva2VuIiwiaW5pdExvZ2lzdGljIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwidGl0bGUiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzYWxlc1VuaXRUeXBlIiwic291cmNlSWQiLCJzYWxlc1VuaXRJZCIsImRldGFpbCIsImJ1eWluZ0NvdW50IiwiY291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsImxvZ2lzdGljc0lkIiwiR2V0TG9naXN0aWNTdGF0dXMiLCJzdGF0dXNUZW1wIiwidGltZSIsInNwbGl0Iiwi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T0FBTCxHQUFleUMsR0FBR0EsRUFBbEI7QUFDQSxXQUFLckMsV0FBTCxHQUFtQnFDLEdBQUd2QyxNQUF0QjtBQUNBdUIsY0FBUUMsR0FBUixDQUFZLEtBQUt0QixXQUFqQjtBQUNBLFdBQUt3QyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtELFlBQUw7QUFDRDs7OztFQTNIb0MsZUFBSytCLEk7O2tCQUF2QmhGLFMiLCJmaWxlIjoibG9naXN0aWNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naXN0aWNhIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE54mp5rWBJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgcGFja2FnZTogW10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBsb2dpc3RpYzogW10sXG4gICAgICBzdGF0dXM6IFtdLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIG9yZGVyU3RhdHVzOiAnJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJsb2dpc3RpY1wiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsb2dpc3RpY1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcImxvZ2lzdGljXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJsb2dpc3RpY1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgb3JkZXJMaXN0OiBPcmRlckxpc3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hlY2tQYWNrYWdlIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgfVxuICAgIH1cbiAgICBpbml0TG9naXN0aWMgKCkge1xuICAgICAgdGhpcy5sb2dpc3RpYyA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldExvZ2lzdGljKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLmxvZ2lzdGljc0NvZGUgPSBpdGVtLmxvZ2lzdGljc0NvZGVcbiAgICAgICAgICAgIG9iai5uYW1lID0gaXRlbS5sb2dpc3RpY3MubmFtZVxuICAgICAgICAgICAgb2JqLnBob25lID0gaXRlbS5sb2dpc3RpY3MucGhvbmVcbiAgICAgICAgICAgIG9iai5vcmRlckRldGFpbCA9IF90aGlzLmluaXRDaGlsZChpdGVtLmJ1eWluZ1JlY29yZHMpXG4gICAgICAgICAgICBfdGhpcy5sb2dpc3RpYy5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLmdldFN0YXR1cyhpdGVtLmxvZ2lzdGljcy5pZCwgaXRlbS5sb2dpc3RpY3NDb2RlKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRMb2dpc3RpYygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGdldFN0YXR1cyAobG9naXN0aWNzSWQsIGxvZ2lzdGljc0NvZGUpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gW11cbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWQsXG4gICAgICAgIGxvZ2lzdGljc0lkOiBsb2dpc3RpY3NJZCxcbiAgICAgICAgbG9naXN0aWNzQ29kZTogbG9naXN0aWNzQ29kZVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldExvZ2lzdGljU3RhdHVzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICB2YXIgc3RhdHVzVGVtcCA9IFtdXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aW1lID0gaXRlbS50aW1lLnNwbGl0KCcgJylcbiAgICAgICAgICAgIG9iai50ZXh0ID0gaXRlbS5jb250ZXh0XG4gICAgICAgICAgICBzdGF0dXNUZW1wLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuc3RhdHVzLnB1c2goc3RhdHVzVGVtcClcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoaWQpIHtcbiAgICAgIHRoaXMub3JkZXJJZCA9IGlkLmlkXG4gICAgICB0aGlzLm9yZGVyU3RhdHVzID0gaWQuc3RhdHVzXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyU3RhdHVzKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0TG9naXN0aWMoKVxuICAgIH1cbiAgfVxuIl19