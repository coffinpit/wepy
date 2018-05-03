'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cart = function (_wepy$page) {
  _inherits(Cart, _wepy$page);

  function Cart() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '购物车'
    }, _this2.$repeat = { "cartList": { "com": "counteCold", "props": "" }, "item": { "com": "counteCold", "props": "" } }, _this2.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:sourceId.sync": { "value": "item.sourceId", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "class": { "value": "{{ hiddenColdTemp === index ? '' : 'hidden-temp'}}", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" } } }, _this2.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold", "v-on:blurEdit": "blurCold" } }, _this2.components = {
      counteCold: _counter2.default,
      counteNormal: _counter2.default
    }, _this2.computed = {
      totalprice: function totalprice() {
        var result = 0;
        this.coldlist.forEach(function (item) {
          result += parseInt(item.price * item.count);
        });
        return result;
      },
      freight: function freight() {
        var result = 0;
        this.coldlist.forEach(function (item) {
          result += parseInt(item.freightPrice);
        });
        return result;
      }
    }, _this2.data = {
      token: '',
      cartcount: [],
      checkedList: [],
      tempColdList: [],
      tempNormalList: [],
      cartStatus: {
        totalprice: '',
        discount: ''
      },
      cartList: [],
      coldlist: [],
      coldTitle: '',
      coldChecked: false,
      tempCold: [],
      checkedArr: [],
      hiddenColdTemp: 0,
      hiddenNormalTemp: 0,
      isNull: true
    }, _this2.methods = {
      plusCold: function plusCold(e) {
        var sourceId = e.currentTarget.dataset.id;
        this.cartList.forEach(function (item) {
          item.coldlist.forEach(function (val) {
            if (val.sourceId === sourceId) {
              val.count++;
            }
          });
        });
        this.$apply();
        // 发送购物车修改数据
      },
      minCold: function minCold(e) {
        var index = e.source.$index;
        this.coldlist[index].count--;
        if (this.coldlist[index].count <= 0) {
          this.coldlist[index].count = 1;
        }
        this.$apply();
        // 发送购物车修改数据
      },
      keyCold: function keyCold(val, e) {
        var index = e.source.$index;
        this.hiddenColdTemp = e.source.$index;
        if (val === '0') {
          this.coldlist[index].count = 1;
        } else {
          this.coldlist[index].count = val;
        }
        if (this.coldlist[index].count > this.coldlist[index].totalCount) {
          this.coldlist[index].count = this.coldlist[index].totalCount;
          console.log(this.coldlist[index].count, this.coldlist[index].totalCount);
          this.maxModal();
        }
        return this.coldlist[index].count;
      },
      blurCold: function blurCold(val, e) {
        var index = e.source.$index;
        if (val === '') {
          this.coldlist[index].count = 1;
        }
      },
      goDetail: function goDetail(id) {
        console.log(id);
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      },
      coldCheck: function coldCheck(e) {
        var value = e.currentTarget.dataset.value;
        this.cartList.forEach(function (item) {
          item.coldlist.forEach(function (val) {
            if (val.sourceId === value) {
              val.checked = !val.checked;
            }
          });
          item.tempCold = item.coldlist.filter(function (item) {
            return item.checked;
          });
          if (item.tempCold.length === item.coldlist.length) {
            item.coldChecked = true;
          } else {
            item.coldChecked = false;
          }
        });
      },
      coldAll: function coldAll(index) {
        if (this.cartList[index].tempCold.length === this.cartList[index].coldlist.length) {
          this.cartList[index].coldlist.forEach(function (item) {
            item.checked = false;
          });
          this.cartList[index].coldChecked = false;
          this.cartList[index].tempCold = [];
        } else {
          this.cartList[index].coldlist.forEach(function (item) {
            item.checked = true;
          });
          this.cartList[index].coldChecked = true;
          this.cartList[index].tempCold = this.cartList[index].coldlist;
        }
      },
      checkAll: function checkAll() {
        var total = 0;
        var check = 0;
        this.cartList.forEach(function (item, index) {
          total += item.coldlist.length;
          check += item.tempCold.length;
        });
        console.log(total, check);
        this.cartList.forEach(function (item, index) {
          if (total === check) {
            item.coldlist.forEach(function (i) {
              i.checked = false;
            });
            item.coldChecked = false;
            item.tempCold = [];
          } else {
            item.coldlist.forEach(function (i) {
              i.checked = true;
            });
            item.coldChecked = true;
            item.tempCold = item.coldlist;
          }
        });
      },
      deleteTap: function deleteTap() {
        var that = this;
        var result = [];
        this.cartList.forEach(function (item) {
          item.tempCold.forEach(function (source) {
            var obj = {};
            obj.sourceType = source.sourceType;
            obj.sourceId = source.sourceId;
            result.push(obj);
          });
        });
        if (result.length === 0) {
          _wepy2.default.showToast({
            title: '请选择商品',
            duration: 1000,
            image: '../image/cancel.png'
          });
        } else {
          _wepy2.default.showModal({
            title: '提示',
            content: '是否删除？',
            success: function success(res) {
              if (res.confirm) {
                that.deleteData(result, function () {
                  that.initPageData();
                  that.$apply();
                });
              }
              if (res.cancel) {}
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Cart, [{
    key: 'getChecked',
    value: function getChecked(arr, val) {
      if (arr.indexOf(val) === -1) {
        arr.push(val);
      } else {
        arr.splice(arr.indexOf(val), 1);
      }
    }
  }, {
    key: 'maxModal',
    value: function maxModal() {
      _wepy2.default.showToast({
        title: '数量已达上限',
        duration: 1000,
        image: '../image/cancel.png'
      });
    }
  }, {
    key: 'deleteData',
    value: function deleteData(json, cb) {
      var data = {
        token: this.token,
        sourceList: JSON.stringify(json)
      };
      this.$parent.HttpRequest.DeleteCartHttp(data).then(function (res) {
        console.log(res);
        cb && cb();
      });
    }
  }, {
    key: 'initPageData',
    value: function initPageData() {
      var _this3 = this;

      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.cartList = [];
      this.$parent.HttpRequest.GetCartHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          _this3.cartStatus.totalprice = data.price;
          _this3.cartStatus.discount = data.reduction;
          if (data.childOrders.length === 0) {
            _this3.isNull = true;
          } else {
            _this3.isNull = false;
          }
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.freight = item.freight;
            obj.coldChecked = false;
            obj.tempCold = [];
            obj.coldlist = _this3.initChild(item.salesUnits);
            _this.cartList.push(obj);
            _this.$apply();
          });
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
        } else {
          obj.detail = item.viceTitle + '×' + item.keepCount;
          obj.count = item.keepCount;
        }
        obj.checked = false;
        obj.totalCount = item.keepCount;
        child.push(obj);
      });
      return child;
    }
  }, {
    key: 'addCartData',
    value: function addCartData(good) {
      var data = {
        token: this.token,
        sourceType: good.sourceType,
        sourceId: good.sourceId,
        count: good.cartNum
      };
      console.log(data);
      this.$parent.HttpRequest.AddCartHttp(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('cart');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initPageData();
      this.$apply();
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiY29tcHV0ZWQiLCJ0b3RhbHByaWNlIiwicmVzdWx0IiwiY29sZGxpc3QiLCJmb3JFYWNoIiwiaXRlbSIsInBhcnNlSW50IiwicHJpY2UiLCJjb3VudCIsImZyZWlnaHQiLCJmcmVpZ2h0UHJpY2UiLCJkYXRhIiwidG9rZW4iLCJjYXJ0Y291bnQiLCJjaGVja2VkTGlzdCIsInRlbXBDb2xkTGlzdCIsInRlbXBOb3JtYWxMaXN0IiwiY2FydFN0YXR1cyIsImRpc2NvdW50IiwiY2FydExpc3QiLCJjb2xkVGl0bGUiLCJjb2xkQ2hlY2tlZCIsInRlbXBDb2xkIiwiY2hlY2tlZEFyciIsImhpZGRlbkNvbGRUZW1wIiwiaGlkZGVuTm9ybWFsVGVtcCIsImlzTnVsbCIsIm1ldGhvZHMiLCJwbHVzQ29sZCIsImUiLCJzb3VyY2VJZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ2YWwiLCIkYXBwbHkiLCJtaW5Db2xkIiwiaW5kZXgiLCJzb3VyY2UiLCIkaW5kZXgiLCJrZXlDb2xkIiwidG90YWxDb3VudCIsImNvbnNvbGUiLCJsb2ciLCJtYXhNb2RhbCIsImJsdXJDb2xkIiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY29sZENoZWNrIiwidmFsdWUiLCJjaGVja2VkIiwiZmlsdGVyIiwibGVuZ3RoIiwiY29sZEFsbCIsImNoZWNrQWxsIiwidG90YWwiLCJjaGVjayIsImkiLCJkZWxldGVUYXAiLCJ0aGF0Iiwib2JqIiwic291cmNlVHlwZSIsInB1c2giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJkZWxldGVEYXRhIiwiaW5pdFBhZ2VEYXRhIiwiY2FuY2VsIiwiYXJyIiwiaW5kZXhPZiIsInNwbGljZSIsImpzb24iLCJjYiIsInNvdXJjZUxpc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiRGVsZXRlQ2FydEh0dHAiLCJ0aGVuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkdldENhcnRIdHRwIiwiZXJyb3IiLCJyZWR1Y3Rpb24iLCJjaGlsZE9yZGVycyIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJidXlDb3VudCIsImtlZXBDb3VudCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJjYXJ0TnVtIiwiQWRkQ2FydEh0dHAiLCJnZXRUb2tlbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLE9BQU0sWUFBUCxFQUFvQixTQUFRLEVBQTVCLEVBQVosRUFBNEMsUUFBTyxFQUFDLE9BQU0sWUFBUCxFQUFvQixTQUFRLEVBQTVCLEVBQW5ELEUsU0FDYkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxlQUFsQixFQUFrQyxRQUFPLE1BQXpDLEVBQWdELFNBQVEsT0FBeEQsRUFBZ0UsT0FBTSxPQUF0RSxFQUFoQixFQUErRixtQkFBa0IsRUFBQyxTQUFRLFlBQVQsRUFBc0IsT0FBTSxlQUE1QixFQUE0QyxRQUFPLE1BQW5ELEVBQTBELFNBQVEsT0FBbEUsRUFBMEUsT0FBTSxPQUFoRixFQUFqSCxFQUEwTSxjQUFhLEVBQUMsU0FB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QyxZQUFMO0FBQ0EsV0FBS3ZDLE1BQUw7QUFDRDs7OztFQTlSK0IsZUFBSzhFLEk7O2tCQUFsQjFILEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ291bnRlIGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJjYXJ0TGlzdFwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcIml0ZW1cIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJjb3VudGVDb2xkXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb3VudFwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c291cmNlSWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLnNvdXJjZUlkXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcImNsYXNzXCI6e1widmFsdWVcIjpcInt7IGhpZGRlbkNvbGRUZW1wID09PSBpbmRleCA/ICcnIDogJ2hpZGRlbi10ZW1wJ319XCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge1wiY291bnRlQ29sZFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDb2xkXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluQ29sZFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDb2xkXCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ29sZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY291bnRlQ29sZDogQ291bnRlLFxuICAgICAgY291bnRlTm9ybWFsOiBDb3VudGVcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB0b3RhbHByaWNlICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDBcbiAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmVzdWx0ICs9IHBhcnNlSW50KGl0ZW0ucHJpY2UgKiBpdGVtLmNvdW50KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9LFxuICAgICAgZnJlaWdodCAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAwXG4gICAgICAgIHRoaXMuY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJlc3VsdCArPSBwYXJzZUludChpdGVtLmZyZWlnaHRQcmljZSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2FydGNvdW50OiBbXSxcbiAgICAgIGNoZWNrZWRMaXN0OiBbXSxcbiAgICAgIHRlbXBDb2xkTGlzdDogW10sXG4gICAgICB0ZW1wTm9ybWFsTGlzdDogW10sXG4gICAgICBjYXJ0U3RhdHVzOiB7XG4gICAgICAgIHRvdGFscHJpY2U6ICcnLFxuICAgICAgICBkaXNjb3VudDogJydcbiAgICAgIH0sXG4gICAgICBjYXJ0TGlzdDogW10sXG4gICAgICBjb2xkbGlzdDogW10sXG4gICAgICBjb2xkVGl0bGU6ICcnLFxuICAgICAgY29sZENoZWNrZWQ6IGZhbHNlLFxuICAgICAgdGVtcENvbGQ6IFtdLFxuICAgICAgY2hlY2tlZEFycjogW10sXG4gICAgICBoaWRkZW5Db2xkVGVtcDogMCxcbiAgICAgIGhpZGRlbk5vcm1hbFRlbXA6IDAsXG4gICAgICBpc051bGw6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHBsdXNDb2xkIChlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICB2YWwuY291bnQgKytcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgfSxcbiAgICAgIG1pbkNvbGQgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50IC0tXG4gICAgICAgIGlmICh0aGlzLmNvbGRsaXN0W2luZGV4XS5jb3VudCA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQgPSAxXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgIH0sXG4gICAgICBrZXlDb2xkICh2YWwsIGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuaGlkZGVuQ29sZFRlbXAgPSBlLnNvdXJjZS4kaW5kZXhcbiAgICAgICAgaWYgKHZhbCA9PT0gJzAnKSB7XG4gICAgICAgICAgdGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQgPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQgPSB2YWxcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQgPiB0aGlzLmNvbGRsaXN0W2luZGV4XS50b3RhbENvdW50KSB7XG4gICAgICAgICAgdGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQgPSB0aGlzLmNvbGRsaXN0W2luZGV4XS50b3RhbENvdW50XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQsIHRoaXMuY29sZGxpc3RbaW5kZXhdLnRvdGFsQ291bnQpXG4gICAgICAgICAgdGhpcy5tYXhNb2RhbCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50XG4gICAgICB9LFxuICAgICAgYmx1ckNvbGQgKHZhbCwgZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBlLnNvdXJjZS4kaW5kZXhcbiAgICAgICAgaWYgKHZhbCA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLmNvbGRsaXN0W2luZGV4XS5jb3VudCA9IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQ2hlY2sgKGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWVcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gIXZhbC5jaGVja2VkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChpdGVtLnRlbXBDb2xkLmxlbmd0aCA9PT0gaXRlbS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQWxsIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja0FsbCAoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDBcbiAgICAgICAgdmFyIGNoZWNrID0gMFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdG90YWwgKz0gaXRlbS5jb2xkbGlzdC5sZW5ndGhcbiAgICAgICAgICBjaGVjayArPSBpdGVtLnRlbXBDb2xkLmxlbmd0aFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbCwgY2hlY2spXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAodG90YWwgPT09IGNoZWNrKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVUYXAgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0udGVtcENvbGQuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5zb3VyY2VUeXBlID0gc291cmNlLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIG9iai5zb3VyY2VJZCA9IHNvdXJjZS5zb3VyY2VJZFxuICAgICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nllYblk4EnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWxldGVEYXRhKHJlc3VsdCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhhdC5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2hlY2tlZCAoYXJyLCB2YWwpIHtcbiAgICAgIGlmIChhcnIuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICBhcnIucHVzaCh2YWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIuc3BsaWNlKGFyci5pbmRleE9mKHZhbCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIG1heE1vZGFsICgpIHtcbiAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfmlbDph4/lt7Lovr7kuIrpmZAnLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlRGF0YSAoanNvbiwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlTGlzdDogSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZURhdGEgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5jYXJ0TGlzdCA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgdGhpcy5jYXJ0U3RhdHVzLnRvdGFscHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgdGhpcy5jYXJ0U3RhdHVzLmRpc2NvdW50ID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBpZiAoZGF0YS5jaGlsZE9yZGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5jYXJ0TGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICBwYXJlbnQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgaWYgKGl0ZW0uYnV5Q291bnQgPD0gaXRlbS5rZWVwQ291bnQpIHtcbiAgICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICB9XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGdvb2QpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogZ29vZC5zb3VyY2VUeXBlLFxuICAgICAgICBzb3VyY2VJZDogZ29vZC5zb3VyY2VJZCxcbiAgICAgICAgY291bnQ6IGdvb2QuY2FydE51bVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2NhcnQnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19