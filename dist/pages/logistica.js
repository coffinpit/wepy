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
      orderStatus: '',
      isNull: false
    }, _this2.$repeat = { "logistic": { "com": "orderList", "props": "" } }, _this2.$props = { "orderList": { "xmlns:v-bind": { "value": "", "for": "logistic", "item": "item", "index": "index", "key": "key" }, "v-bind:orderList.sync": { "value": "item.orderDetail", "for": "logistic", "item": "item", "index": "index", "key": "key" }, "v-bind:userLevel.sync": { "value": "userLevel", "for": "logistic", "item": "item", "index": "index", "key": "key" } }, "defect": { "xmlns:wx": "", "type": "9" } }, _this2.$events = {}, _this2.components = {
      orderList: _orderlist2.default,
      defect: _defect2.default
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
        if (res.data.error === 0) {
          var data = res.data.data;
          if (data.length === 0) {
            _this3.isNull = true;
          }
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
        _this.$parent.hideLoading();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2lzdGljYS5qcyJdLCJuYW1lcyI6WyJMb2dpc3RpY2EiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInBhY2thZ2UiLCJjdXJyZW50Iiwib3JkZXJJZCIsImxvZ2lzdGljIiwic3RhdHVzIiwiaXNMb2FkaW5nIiwib3JkZXJTdGF0dXMiLCJpc051bGwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJkZWZlY3QiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4Iiwic2hvd0xvYWRpbmciLCJ0b2tlbiIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldExvZ2lzdGljIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwib2JqIiwibG9naXN0aWNzQ29kZSIsIm5hbWUiLCJsb2dpc3RpY3MiLCJwaG9uZSIsIm9yZGVyRGV0YWlsIiwiaW5pdENoaWxkIiwiYnV5aW5nUmVjb3JkcyIsInB1c2giLCJnZXRTdGF0dXMiLCJpZCIsIm1pc3NUb2tlbiIsImluaXRMb2dpc3RpYyIsImhpZGVMb2FkaW5nIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwidGl0bGUiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNvdXJjZVR5cGUiLCJzYWxlc1VuaXRUeXBlIiwic291cmNlSWQiLCJzYWxlc1VuaXRJZCIsImRldGFpbCIsImJ1eWluZ0NvdW50IiwiY291bnQiLCJjaGVja2VkIiwidG90YWxDb3VudCIsImtlZXBDb3VudCIsImxvZ2lzdGljc0lkIiwiR2V0TG9naXN0aWNTdGF0dXMiLCJz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QUosdUJBQVcvQixJQUFYLENBQWdCUixHQUFoQjtBQUNELFdBTEQ7QUFNQVgsZ0JBQU1wQixNQUFOLENBQWF1QyxJQUFiLENBQWtCK0IsVUFBbEI7QUFDQTdDLGtCQUFRQyxHQUFSLENBQVlOLE1BQU1wQixNQUFsQjtBQUNEO0FBQ0RvQixjQUFNeUIsTUFBTjtBQUNELE9BaEJEO0FBaUJEOzs7MkJBQ09KLEUsRUFBSTtBQUNWLFdBQUszQyxPQUFMLEdBQWUyQyxHQUFHQSxFQUFsQjtBQUNBLFdBQUt2QyxXQUFMLEdBQW1CdUMsR0FBR3pDLE1BQXRCO0FBQ0F5QixjQUFRQyxHQUFSLENBQVksS0FBS3hCLFdBQWpCO0FBQ0EsV0FBSzJDLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0YsWUFBTDtBQUNEOzs7O0VBaElvQyxlQUFLZ0MsSTs7a0JBQXZCbkYsUyIsImZpbGUiOiJsb2dpc3RpY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE9yZGVyTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL29yZGVybGlzdCdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpc3RpY2EgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTnianmtYEnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBwYWNrYWdlOiBbXSxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICBvcmRlcklkOiAnJyxcbiAgICAgIGxvZ2lzdGljOiBbXSxcbiAgICAgIHN0YXR1czogW10sXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgb3JkZXJTdGF0dXM6ICcnLFxuICAgICAgaXNOdWxsOiBmYWxzZVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJsb2dpc3RpY1wiOntcImNvbVwiOlwib3JkZXJMaXN0XCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wib3JkZXJMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsb2dpc3RpY1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpvcmRlckxpc3Quc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLm9yZGVyRGV0YWlsXCIsXCJmb3JcIjpcImxvZ2lzdGljXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6e1widmFsdWVcIjpcInVzZXJMZXZlbFwiLFwiZm9yXCI6XCJsb2dpc3RpY1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJkZWZlY3RcIjp7XCJ4bWxuczp3eFwiOlwiXCIsXCJ0eXBlXCI6XCI5XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIG9yZGVyTGlzdDogT3JkZXJMaXN0LFxuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hlY2tQYWNrYWdlIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgfVxuICAgIH1cbiAgICBpbml0TG9naXN0aWMgKCkge1xuICAgICAgdGhpcy5sb2dpc3RpYyA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldExvZ2lzdGljKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubG9naXN0aWNzQ29kZSA9IGl0ZW0ubG9naXN0aWNzQ29kZVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLmxvZ2lzdGljcy5uYW1lXG4gICAgICAgICAgICBvYmoucGhvbmUgPSBpdGVtLmxvZ2lzdGljcy5waG9uZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLmxvZ2lzdGljLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuZ2V0U3RhdHVzKGl0ZW0ubG9naXN0aWNzLmlkLCBpdGVtLmxvZ2lzdGljc0NvZGUpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdExvZ2lzdGljKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGdldFN0YXR1cyAobG9naXN0aWNzSWQsIGxvZ2lzdGljc0NvZGUpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gW11cbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWQsXG4gICAgICAgIGxvZ2lzdGljc0lkOiBsb2dpc3RpY3NJZCxcbiAgICAgICAgbG9naXN0aWNzQ29kZTogbG9naXN0aWNzQ29kZVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldExvZ2lzdGljU3RhdHVzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICB2YXIgc3RhdHVzVGVtcCA9IFtdXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aW1lID0gaXRlbS50aW1lLnNwbGl0KCcgJylcbiAgICAgICAgICAgIG9iai50ZXh0ID0gaXRlbS5jb250ZXh0XG4gICAgICAgICAgICBzdGF0dXNUZW1wLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuc3RhdHVzLnB1c2goc3RhdHVzVGVtcClcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoaWQpIHtcbiAgICAgIHRoaXMub3JkZXJJZCA9IGlkLmlkXG4gICAgICB0aGlzLm9yZGVyU3RhdHVzID0gaWQuc3RhdHVzXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyU3RhdHVzKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0TG9naXN0aWMoKVxuICAgIH1cbiAgfVxuIl19