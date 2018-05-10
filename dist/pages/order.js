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

var Order = function (_wepy$page) {
  _inherits(Order, _wepy$page);

  function Order() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '我的订单'
    }, _this2.data = {
      token: '',
      package: [{
        title: '全部',
        type: 'all'
      }, {
        title: '待支付',
        type: 'unpaid'
      }, {
        title: '待发货',
        type: 'undelivered'
      }, {
        title: '待收货',
        type: 'unreceipted'
      }, {
        title: '售后',
        type: 'refunding'
      }],
      orderStatus: ['异常', '待支付', '售后中', '已关闭', '待发货', '待收货', '交易完成'],
      current: 0,
      orderType: 'all',
      orderList: [],
      pageSize: 5,
      pageNum: 1,
      totalPageNum: 0,
      isMore: false
    }, _this2.methods = {
      checkPackage: function checkPackage(index, type) {
        this.current = index;
        this.orderType = type;
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './orderDetail?id=' + id
        });
      },
      showMore: function showMore() {
        this.isMore = !this.isMore;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Order, [{
    key: 'initOrder',
    value: function initOrder() {
      this.$parent.showLoading();
      this.orderList = [];
      this.pageNum = 1;
      var _this = this;
      var data = {
        token: this.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        status: this.orderType
      };
      this.$parent.HttpRequest.GetOrderStatus(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          data.orders.forEach(function (item) {
            var obj = {};
            obj.id = item.id;
            obj.title = item.showId;
            obj.pay = item.pay;
            obj.freight = item.freight;
            obj.status = item.status;
            obj.statusTxt = _this.orderStatus[item.status];
            obj.count = item.buyingRecords.length;
            obj.orderDetail = _this.initChild(item.buyingRecords);
            _this.orderList.push(obj);
          });
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
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
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('order');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initOrder();
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsInBhY2thZ2UiLCJ0aXRsZSIsInR5cGUiLCJvcmRlclN0YXR1cyIsImN1cnJlbnQiLCJvcmRlclR5cGUiLCJvcmRlckxpc3QiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc01vcmUiLCJtZXRob2RzIiwiY2hlY2tQYWNrYWdlIiwiaW5kZXgiLCJnb0RldGFpbCIsImlkIiwibmF2aWdhdGVUbyIsInVybCIsInNob3dNb3JlIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzdGF0dXMiLCJIdHRwUmVxdWVzdCIsIkdldE9yZGVyU3RhdHVzIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInNob3dTdWNjZXNzIiwib3JkZXJzIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJzaG93SWQiLCJwYXkiLCJmcmVpZ2h0Iiwic3RhdHVzVHh0IiwiY291bnQiLCJidXlpbmdSZWNvcmRzIiwibGVuZ3RoIiwib3JkZXJEZXRhaWwiLCJpbml0Q2hpbGQiLCJwdXNoIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNvdXJjZUlkIiwic2FsZXNVbml0SWQiLCJkZXRhaWwiLCJidXlpbmdDb3VudCIsImNoZWNrZWQiLCJ0b3RhbENvdW50Iiwia2VlcENvdW50IiwiZ2V0VG9rZW4iLCJpbml0T3JkZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt1TEFDbkJDLE0sR0FBUztBQUNQQyw4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ZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTorqLljZUnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWNrYWdlOiBbe1xuICAgICAgICB0aXRsZTogJ+WFqOmDqCcsXG4gICAgICAgIHR5cGU6ICdhbGwnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5pSv5LuYJyxcbiAgICAgICAgdHlwZTogJ3VucGFpZCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICflvoXlj5HotKcnLFxuICAgICAgICB0eXBlOiAndW5kZWxpdmVyZWQnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5b6F5pS26LSnJyxcbiAgICAgICAgdHlwZTogJ3VucmVjZWlwdGVkJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WUruWQjicsXG4gICAgICAgIHR5cGU6ICdyZWZ1bmRpbmcnXG4gICAgICB9XSxcbiAgICAgIG9yZGVyU3RhdHVzOiBbJ+W8guW4uCcsICflvoXmlK/ku5gnLCAn5ZSu5ZCO5LitJywgJ+W3suWFs+mXrScsICflvoXlj5HotKcnLCAn5b6F5pS26LSnJywgJ+S6pOaYk+WujOaIkCddLFxuICAgICAgY3VycmVudDogMCxcbiAgICAgIG9yZGVyVHlwZTogJ2FsbCcsXG4gICAgICBvcmRlckxpc3Q6IFtdLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAwLFxuICAgICAgaXNNb3JlOiBmYWxzZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hlY2tQYWNrYWdlIChpbmRleCwgdHlwZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICB0aGlzLm9yZGVyVHlwZSA9IHR5cGVcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHNob3dNb3JlICgpIHtcbiAgICAgICAgdGhpcy5pc01vcmUgPSAhdGhpcy5pc01vcmVcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdE9yZGVyICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IFtdXG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHN0YXR1czogdGhpcy5vcmRlclR5cGVcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRPcmRlclN0YXR1cyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSBkYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIGRhdGEub3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5zaG93SWRcbiAgICAgICAgICAgIG9iai5wYXkgPSBpdGVtLnBheVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5zdGF0dXMgPSBpdGVtLnN0YXR1c1xuICAgICAgICAgICAgb2JqLnN0YXR1c1R4dCA9IF90aGlzLm9yZGVyU3RhdHVzW2l0ZW0uc3RhdHVzXVxuICAgICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlpbmdSZWNvcmRzLmxlbmd0aFxuICAgICAgICAgICAgb2JqLm9yZGVyRGV0YWlsID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uYnV5aW5nUmVjb3JkcylcbiAgICAgICAgICAgIF90aGlzLm9yZGVyTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udGl0bGUgKyAnw5cnICsgaXRlbS5idXlpbmdDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eWluZ0NvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ29yZGVyJylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdE9yZGVyKClcbiAgICB9XG4gIH1cbiJdfQ==