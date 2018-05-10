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
    }, _this2.$repeat = { "cartList": { "com": "counteCold", "props": "" }, "item": { "com": "counteCold", "props": "" } }, _this2.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:sourceId.sync": { "value": "item.sourceId", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" } } }, _this2.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold", "v-on:blurEdit": "blurCold" } }, _this2.components = {
      counteCold: _counter2.default,
      counteNormal: _counter2.default
    }, _this2.data = {
      token: '',
      cartcount: [],
      checkedList: [],
      tempColdList: [],
      tempNormalList: [],
      cartStatus: {},
      cartList: [],
      coldlist: [],
      coldTitle: '',
      coldChecked: false,
      tempCold: [],
      isEdit: false,
      isNull: false,
      finalprice: 0,
      freight: 0
    }, _this2.computed = {
      userLevel: function userLevel() {
        if (this.$parent.globalData.userLevel === 0) {
          return false;
        } else if (this.$parent.globalData.userLevel === 1) {
          return true;
        }
      },
      isNull: function isNull() {
        if (this.cartList.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }, _this2.methods = {
      editTap: function editTap() {
        this.isEdit = !this.isEdit;
      },
      plusCold: function plusCold(e) {
        var _this3 = this;

        var sourceId = e.currentTarget.dataset.id;
        this.cartList.forEach(function (item) {
          item.coldlist.forEach(function (val) {
            if (val.sourceId === sourceId) {
              val.count++;
              if (val.count > val.totalCount) {
                val.count = val.totalCount;
                _this3.maxModal('数量已达上限');
              } else {
                // 发送购物车修改数据
                _this3.addCartData(val, 1, function () {
                  _this3.initPageData();
                });
              }
            }
          });
        });
        this.$apply();
      },
      minCold: function minCold(e) {
        var _this4 = this;

        var sourceId = e.currentTarget.dataset.id;
        this.cartList.forEach(function (item) {
          item.coldlist.forEach(function (val) {
            if (val.sourceId === sourceId) {
              val.count--;
              if (val.count < 1) {
                val.count = 1;
                _this4.maxModal('不能再少啦');
              } else {
                // 发送购物车修改数据
                _this4.addCartData(val, -1, function () {
                  _this4.initPageData();
                });
              }
            }
          });
        });
        this.$apply();
      },
      keyCold: function keyCold(keyVal, e) {},
      blurCold: function blurCold(keyVal, e) {
        var _this5 = this;

        var sourceId = e.currentTarget.dataset.id;
        this.cartList.forEach(function (item) {
          item.coldlist.forEach(function (val) {
            if (val.sourceId === sourceId) {
              if (keyVal <= 0) {
                val.count = 1;
              } else if (keyVal > val.totalCount) {
                val.count = val.totalCount;
                _this5.maxModal('数量已达上限');
              } else {
                val.count = keyVal;
              }
            }
            console.log(val.initCount);
            _this5.addCartData(val, val.count - val.initCount, function () {
              _this5.initPageData();
            });
            return val.count;
          });
        });
      },
      goDetail: function goDetail(id) {
        console.log(id);
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      },
      goCategory: function goCategory() {
        _wepy2.default.switchTab({
          url: './category'
        });
      },
      goOrder: function goOrder() {
        if (!this.isEdit) {
          _wepy2.default.navigateTo({
            url: './paycart'
          });
        }
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
    value: function maxModal(content) {
      _wepy2.default.showToast({
        title: content,
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
      var _this6 = this;

      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.cartList = [];
      this.finalprice = 0;
      this.freight = 0;
      this.cartStatus = {};
      this.$parent.HttpRequest.GetCartHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this6.cartStatus.totalprice = data.price;
          _this6.cartStatus.discount = data.reduction;
          _this6.cartStatus.memberPrice = data.memberPrice;
          _this6.finalprice = data.finalPrice;
          _this6.freight = data.freight;
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.freight = item.freight;
            obj.coldChecked = false;
            obj.tempCold = [];
            obj.coldlist = _this6.initChild(item.salesUnits);
            _this.cartList.push(obj);
            _this.$apply();
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
    key: 'addCartData',
    value: function addCartData(good, val, cb) {
      var data = {
        token: this.token,
        sourceType: good.sourceType,
        sourceId: good.sourceId,
        count: val
      };
      console.log(data);
      this.$parent.HttpRequest.AddCartHttp(data).then(function (res) {
        console.log(res);
        cb && cb();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('cart');
      console.log(this.$parent.globalData.userLevel);
      // 判断用户memberHash
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImxlbmd0aCIsIm1ldGhvZHMiLCJlZGl0VGFwIiwicGx1c0NvbGQiLCJlIiwic291cmNlSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZm9yRWFjaCIsIml0ZW0iLCJ2YWwiLCJjb3VudCIsInRvdGFsQ291bnQiLCJtYXhNb2RhbCIsImFkZENhcnREYXRhIiwiaW5pdFBhZ2VEYXRhIiwiJGFwcGx5IiwibWluQ29sZCIsImtleUNvbGQiLCJrZXlWYWwiLCJibHVyQ29sZCIsImNvbnNvbGUiLCJsb2ciLCJpbml0Q291bnQiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsImNvbGRDaGVjayIsInZhbHVlIiwiY2hlY2tlZCIsImZpbHRlciIsImNvbGRBbGwiLCJpbmRleCIsImNoZWNrQWxsIiwidG90YWwiLCJjaGVjayIsImkiLCJkZWxldGVUYXAiLCJ0aGF0IiwicmVzdWx0Iiwic291cmNlIiwib2JqIiwic291cmNlVHlwZSIsInB1c2giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJkZWxldGVEYXRhIiwiY2FuY2VsIiwiYXJyIiwiaW5kZXhPZiIsInNwbGljZSIsImpzb24iLCJjYiIsInNvdXJjZUxpc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiSHR0cFJlcXVlc3QiLCJEZWxldGVDYXJ0SHR0cCIsInRoZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0Q2FydEh0dHAiLCJlcnJvciIsInNob3dTdWNjZXNzIiwidG90YWxwcmljZSIsInByaWNlIiwiZGlzY291bnQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJQcmljZSIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJzaG93RmFpbCIsImNhdGNoIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsImJ1eUNvdW50Iiwia2VlcENvdW50IiwiZGV0YWlsIiwidmljZVRpdGxlIiwiZ29vZCIsIkFkZENhcnRIdHRwIiwiZ2V0VG9rZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxFQUE1QixFQUFaLEVBQTRDLFFBQU8sRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxFQUE1QixFQUFuRCxFLFNBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sZUFBbEIsRUFBa0MsUUFBTyxNQUF6QyxFQUFnRCxTQUFRLE9BQXhELEVBQWdFLE9BQU0sT0FBdEUsRUFBaEIsRUFBK0YsbUJBQWtCLEVBQUMsU0FBUSxZQUFULEVBQXNCLE9BQU0sZUFB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S3pCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBcEM7QUFDQTtBQUNBLFdBQUtvQixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtELFlBQUw7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUE1VStCLGVBQUtvRixJOztrQkFBbEJsSSxJIiwiZmlsZSI6ImNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvdW50ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9pidcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wiY2FydExpc3RcIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJpdGVtXCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiY291bnRlQ29sZFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY291bnRcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnNvdXJjZUlkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zb3VyY2VJZFwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ29sZFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbkNvbGRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q29sZFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNvbGRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGNvdW50ZUNvbGQ6IENvdW50ZSxcbiAgICAgIGNvdW50ZU5vcm1hbDogQ291bnRlXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdLFxuICAgICAgY2hlY2tlZExpc3Q6IFtdLFxuICAgICAgdGVtcENvbGRMaXN0OiBbXSxcbiAgICAgIHRlbXBOb3JtYWxMaXN0OiBbXSxcbiAgICAgIGNhcnRTdGF0dXM6IHt9LFxuICAgICAgY2FydExpc3Q6IFtdLFxuICAgICAgY29sZGxpc3Q6IFtdLFxuICAgICAgY29sZFRpdGxlOiAnJyxcbiAgICAgIGNvbGRDaGVja2VkOiBmYWxzZSxcbiAgICAgIHRlbXBDb2xkOiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgZmluYWxwcmljZTogMCxcbiAgICAgIGZyZWlnaHQ6IDBcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRUYXAgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgfSxcbiAgICAgIHBsdXNDb2xkIChlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICB2YWwuY291bnQgKytcbiAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBtaW5Db2xkIChlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICB2YWwuY291bnQgLS1cbiAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA8IDEpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5LiN6IO95YaN5bCR5ZWmJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgLTEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGtleUNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgfSxcbiAgICAgIGJsdXJDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgIGlmIChrZXlWYWwgPD0gMCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlWYWwgPiB2YWwudG90YWxDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSBrZXlWYWxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2codmFsLmluaXRDb3VudClcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCB2YWwuY291bnQgLSB2YWwuaW5pdENvdW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gdmFsLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydCdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29sZENoZWNrIChlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9ICF2YWwuY2hlY2tlZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IGl0ZW0uY29sZGxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoaXRlbS50ZW1wQ29sZC5sZW5ndGggPT09IGl0ZW0uY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sZEFsbCAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkLmxlbmd0aCA9PT0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IFtdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hlY2tBbGwgKCkge1xuICAgICAgICB2YXIgdG90YWwgPSAwXG4gICAgICAgIHZhciBjaGVjayA9IDBcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHRvdGFsICs9IGl0ZW0uY29sZGxpc3QubGVuZ3RoXG4gICAgICAgICAgY2hlY2sgKz0gaXRlbS50ZW1wQ29sZC5sZW5ndGhcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2codG90YWwsIGNoZWNrKVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHRvdGFsID09PSBjaGVjaykge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgIGkuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gW11cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgIGkuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IGl0ZW0uY29sZGxpc3RcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZGVsZXRlVGFwICgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouc291cmNlVHlwZSA9IHNvdXJjZS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBvYmouc291cmNlSWQgPSBzb3VyY2Uuc291cmNlSWRcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5ZWG5ZOBJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpO+8nycsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHRoYXQuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldENoZWNrZWQgKGFyciwgdmFsKSB7XG4gICAgICBpZiAoYXJyLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgYXJyLnB1c2godmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZih2YWwpLCAxKVxuICAgICAgfVxuICAgIH1cbiAgICBtYXhNb2RhbCAoY29udGVudCkge1xuICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogY29udGVudCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgIH0pXG4gICAgfVxuICAgIGRlbGV0ZURhdGEgKGpzb24sIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZUxpc3Q6IEpTT04uc3RyaW5naWZ5KGpzb24pXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGVsZXRlQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2VEYXRhICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2FydExpc3QgPSBbXVxuICAgICAgdGhpcy5maW5hbHByaWNlID0gMFxuICAgICAgdGhpcy5mcmVpZ2h0ID0gMFxuICAgICAgdGhpcy5jYXJ0U3RhdHVzID0ge31cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICB0aGlzLmNhcnRTdGF0dXMudG90YWxwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICB0aGlzLmNhcnRTdGF0dXMuZGlzY291bnQgPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIHRoaXMuY2FydFN0YXR1cy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICB0aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICB0aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gdGhpcy5pbml0Q2hpbGQoaXRlbS5zYWxlc1VuaXRzKVxuICAgICAgICAgICAgX3RoaXMuY2FydExpc3QucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBpZiAoaXRlbS5idXlDb3VudCA8PSBpdGVtLmtlZXBDb3VudCkge1xuICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0ua2VlcENvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgfVxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGFkZENhcnREYXRhIChnb29kLCB2YWwsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IGdvb2Quc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGdvb2Quc291cmNlSWQsXG4gICAgICAgIGNvdW50OiB2YWxcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2NhcnQnKVxuICAgICAgY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsKVxuICAgICAgLy8g5Yik5pat55So5oi3bWVtYmVySGFzaFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19