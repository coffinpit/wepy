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
            obj.logisticsCode = item.logisticsCode.replace(/(^\s+)|(\s+$)/g, '');
            console.log(item.logisticsCode);
            obj.name = item.logistics.name;
            obj.phone = item.logistics.phone;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.logistic.push(obj);
            _this.getStatus(item.logistics.id, obj.logisticsCode);
          });
        } else {
          if (_this.$parent.missToken) {
            _this.initLogistic();
          }
        }
        _this.$parent.hideLoading();
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        // _this.$parent.showFail()
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
      console.log(data);
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
        } else {
          _this.isNull = true;
        }
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(id) {
      this.orderId = id.id;
      this.orderStatus = id.status;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2lzdGljYS5qcyJdLCJuYW1lcyI6WyJMb2dpc3RpY2EiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInBhY2thZ2UiLCJjdXJyZW50Iiwib3JkZXJJZCIsImxvZ2lzdGljIiwic3RhdHVzIiwiaXNMb2FkaW5nIiwib3JkZXJTdGF0dXMiLCJpc051bGwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJvcmRlckxpc3QiLCJkZWZlY3QiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4Iiwic2hvd0xvYWRpbmciLCJ0b2tlbiIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldExvZ2lzdGljIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwib2JqIiwibG9naXN0aWNzQ29kZSIsInJlcGxhY2UiLCJuYW1lIiwibG9naXN0aWNzIiwicGhvbmUiLCJvcmRlckRldGFpbCIsImluaXRDaGlsZCIsImJ1eWluZ1JlY29yZHMiLCJwdXNoIiwiZ2V0U3RhdHVzIiwiaWQiLCJtaXNzVG9rZW4iLCJpbml0TG9naXN0aWMiLCJoaWRlTG9hZGluZyIsIiRhcHBseSIsImNhdGNoIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJ0aXRsZSIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzb3VyY2VJZCIsInNhbGVzVW5pdElkIiwiZGV0YWlsIiwiYnV5aW5nQ291bnQiLCJjb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwibG9naXN0aWNzSWQiLCJHZXRMb2dpc3RpY1N0YXR1cyIsInN0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QUosdUJBQVc5QixJQUFYLENBQWdCVCxHQUFoQjtBQUNELFdBTEQ7QUFNQVgsZ0JBQU1wQixNQUFOLENBQWF3QyxJQUFiLENBQWtCOEIsVUFBbEI7QUFDRCxTQVhELE1BV087QUFDTGxELGdCQUFNakIsTUFBTixHQUFlLElBQWY7QUFDRDtBQUNEaUIsY0FBTTBCLE1BQU47QUFDRCxPQWpCRDtBQWtCRDs7OzJCQUNPSixFLEVBQUk7QUFDVixXQUFLNUMsT0FBTCxHQUFlNEMsR0FBR0EsRUFBbEI7QUFDQSxXQUFLeEMsV0FBTCxHQUFtQndDLEdBQUcxQyxNQUF0QjtBQUNBLFdBQUs4QyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtGLFlBQUw7QUFDRDs7OztFQWpJb0MsZUFBSytCLEk7O2tCQUF2Qm5GLFMiLCJmaWxlIjoibG9naXN0aWNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlcmxpc3QnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naXN0aWNhIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE54mp5rWBJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgcGFja2FnZTogW10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBsb2dpc3RpYzogW10sXG4gICAgICBzdGF0dXM6IFtdLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIG9yZGVyU3RhdHVzOiAnJyxcbiAgICAgIGlzTnVsbDogZmFsc2VcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wibG9naXN0aWNcIjp7XCJjb21cIjpcIm9yZGVyTGlzdFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcIm9yZGVyTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwibG9naXN0aWNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6b3JkZXJMaXN0LnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5vcmRlckRldGFpbFwiLFwiZm9yXCI6XCJsb2dpc3RpY1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp1c2VyTGV2ZWwuc3luY1wiOntcInZhbHVlXCI6XCJ1c2VyTGV2ZWxcIixcImZvclwiOlwibG9naXN0aWNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwiZGVmZWN0XCI6e1wieG1sbnM6d3hcIjpcIlwiLFwidHlwZVwiOlwiOVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IE9yZGVyTGlzdCxcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoZWNrUGFja2FnZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdExvZ2lzdGljICgpIHtcbiAgICAgIHRoaXMubG9naXN0aWMgPSBbXVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpYyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLmxvZ2lzdGljc0NvZGUgPSBpdGVtLmxvZ2lzdGljc0NvZGUucmVwbGFjZSgvKF5cXHMrKXwoXFxzKyQpL2csICcnKVxuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbS5sb2dpc3RpY3NDb2RlKVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLmxvZ2lzdGljcy5uYW1lXG4gICAgICAgICAgICBvYmoucGhvbmUgPSBpdGVtLmxvZ2lzdGljcy5waG9uZVxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLmxvZ2lzdGljLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuZ2V0U3RhdHVzKGl0ZW0ubG9naXN0aWNzLmlkLCBvYmoubG9naXN0aWNzQ29kZSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuaW5pdExvZ2lzdGljKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAvLyBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5aW5nQ291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGdldFN0YXR1cyAobG9naXN0aWNzSWQsIGxvZ2lzdGljc0NvZGUpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gW11cbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWQsXG4gICAgICAgIGxvZ2lzdGljc0lkOiBsb2dpc3RpY3NJZCxcbiAgICAgICAgbG9naXN0aWNzQ29kZTogbG9naXN0aWNzQ29kZVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRMb2dpc3RpY1N0YXR1cyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgdmFyIHN0YXR1c1RlbXAgPSBbXVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGltZSA9IGl0ZW0udGltZS5zcGxpdCgnICcpXG4gICAgICAgICAgICBvYmoudGV4dCA9IGl0ZW0uY29udGV4dFxuICAgICAgICAgICAgc3RhdHVzVGVtcC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLnN0YXR1cy5wdXNoKHN0YXR1c1RlbXApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLm9yZGVySWQgPSBpZC5pZFxuICAgICAgdGhpcy5vcmRlclN0YXR1cyA9IGlkLnN0YXR1c1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0TG9naXN0aWMoKVxuICAgIH1cbiAgfVxuIl19