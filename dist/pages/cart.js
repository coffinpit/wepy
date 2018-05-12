'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

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
    }, _this2.$repeat = { "cartList": { "com": "counteCold", "props": "" }, "item": { "com": "counteCold", "props": "" } }, _this2.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:sourceId.sync": { "value": "item.sourceId", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" } }, "defect": { "type": "2" } }, _this2.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold", "v-on:blurEdit": "blurCold" } }, _this2.components = {
      counteCold: _counter2.default,
      counteNormal: _counter2.default,
      defect: _defect2.default
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
      freight: 0,
      isLoading: true
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
      _this.isLoading = true;
      this.finalprice = 0;
      this.freight = 0;
      this.cartStatus = {};
      this.$parent.HttpRequest.GetCartHttp(data).then(function (res) {
        console.log(res);
        _this.isLoading = false;
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
        _this.isLoading = false;
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
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImxlbmd0aCIsIm1ldGhvZHMiLCJlZGl0VGFwIiwicGx1c0NvbGQiLCJlIiwic291cmNlSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZm9yRWFjaCIsIml0ZW0iLCJ2YWwiLCJjb3VudCIsInRvdGFsQ291bnQiLCJtYXhNb2RhbCIsImFkZENhcnREYXRhIiwiaW5pdFBhZ2VEYXRhIiwiJGFwcGx5IiwibWluQ29sZCIsImtleUNvbGQiLCJrZXlWYWwiLCJibHVyQ29sZCIsImNvbnNvbGUiLCJsb2ciLCJpbml0Q291bnQiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsImNvbGRDaGVjayIsInZhbHVlIiwiY2hlY2tlZCIsImZpbHRlciIsImNvbGRBbGwiLCJpbmRleCIsImNoZWNrQWxsIiwidG90YWwiLCJjaGVjayIsImkiLCJkZWxldGVUYXAiLCJ0aGF0IiwicmVzdWx0Iiwic291cmNlIiwib2JqIiwic291cmNlVHlwZSIsInB1c2giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJkZWxldGVEYXRhIiwiY2FuY2VsIiwiYXJyIiwiaW5kZXhPZiIsInNwbGljZSIsImpzb24iLCJjYiIsInNvdXJjZUxpc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiSHR0cFJlcXVlc3QiLCJEZWxldGVDYXJ0SHR0cCIsInRoZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0Q2FydEh0dHAiLCJlcnJvciIsInNob3dTdWNjZXNzIiwidG90YWxwcmljZSIsInByaWNlIiwiZGlzY291bnQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJQcmljZSIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJzaG93RmFpbCIsImNhdGNoIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsImJ1eUNvdW50Iiwia2VlcENvdW50IiwiZGV0YWlsIiwidmljZVRpdGxlIiwiZ29vZCIsIkFkZENhcnRIdHRwIiwiZ2V0VG9rZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLE9BQU0sWUFBUCxFQUFvQixTQUFRLEVBQTVCLEVBQVosRUFBNEMsUUFBTyxFQUFDLE9BQU0sWUFBUCxFQUFvQixTQUFRLEVBQTVCLEVBQW5ELEUsU0FDYkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxlQUFsQixFQUFrQyxRQUFPLE1BQXpDLEVBQWdELFNBQVEsT0FBeEQsRUFBZ0UsT0FBTSxPQUF0RSxFQUFoQixFQUErRixtQkFBa0Is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QUEzQyxDQUFnRCxVQUFDZCxHQUFELEVBQVM7QUFDdkRqQyxnQkFBUUMsR0FBUixDQUFZZ0MsR0FBWjtBQUNBUSxjQUFNQSxJQUFOO0FBQ0QsT0FIRDtBQUlEOzs7NkJBQ1M7QUFDUixXQUFLbkYsS0FBTCxHQUFhLEtBQUtrQixPQUFMLENBQWFzRyxRQUFiLEVBQWI7QUFDQTlFLGNBQVFDLEdBQVIsQ0FBWSxLQUFLekIsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUFwQztBQUNBO0FBQ0EsV0FBS29CLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0QsWUFBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7OztFQWpWK0IsZUFBS29GLEk7O2tCQUFsQnBJLEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ291bnRlIGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJjYXJ0TGlzdFwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcIml0ZW1cIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJjb3VudGVDb2xkXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb3VudFwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c291cmNlSWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLnNvdXJjZUlkXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIyXCJ9fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ29sZFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbkNvbGRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q29sZFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNvbGRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGNvdW50ZUNvbGQ6IENvdW50ZSxcbiAgICAgIGNvdW50ZU5vcm1hbDogQ291bnRlLFxuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGNhcnRjb3VudDogW10sXG4gICAgICBjaGVja2VkTGlzdDogW10sXG4gICAgICB0ZW1wQ29sZExpc3Q6IFtdLFxuICAgICAgdGVtcE5vcm1hbExpc3Q6IFtdLFxuICAgICAgY2FydFN0YXR1czoge30sXG4gICAgICBjYXJ0TGlzdDogW10sXG4gICAgICBjb2xkbGlzdDogW10sXG4gICAgICBjb2xkVGl0bGU6ICcnLFxuICAgICAgY29sZENoZWNrZWQ6IGZhbHNlLFxuICAgICAgdGVtcENvbGQ6IFtdLFxuICAgICAgaXNFZGl0OiBmYWxzZSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBmaW5hbHByaWNlOiAwLFxuICAgICAgZnJlaWdodDogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdFRhcCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICB9LFxuICAgICAgcGx1c0NvbGQgKGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgIHZhbC5jb3VudCArK1xuICAgICAgICAgICAgICBpZiAodmFsLmNvdW50ID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIG1pbkNvbGQgKGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgIHZhbC5jb3VudCAtLVxuICAgICAgICAgICAgICBpZiAodmFsLmNvdW50IDwgMSkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfkuI3og73lho3lsJHllaYnKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAtMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAga2V5Q29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICB9LFxuICAgICAgYmx1ckNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQpIHtcbiAgICAgICAgICAgICAgaWYgKGtleVZhbCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtleVZhbCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IGtleVZhbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2YWwuaW5pdENvdW50KVxuICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIHZhbC5jb3VudCAtIHZhbC5pbml0Q291bnQsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB2YWwuY291bnRcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0NhdGVnb3J5ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2F0ZWdvcnknXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VkaXQpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXljYXJ0J1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb2xkQ2hlY2sgKGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWVcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gIXZhbC5jaGVja2VkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChpdGVtLnRlbXBDb2xkLmxlbmd0aCA9PT0gaXRlbS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQWxsIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja0FsbCAoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDBcbiAgICAgICAgdmFyIGNoZWNrID0gMFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdG90YWwgKz0gaXRlbS5jb2xkbGlzdC5sZW5ndGhcbiAgICAgICAgICBjaGVjayArPSBpdGVtLnRlbXBDb2xkLmxlbmd0aFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbCwgY2hlY2spXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAodG90YWwgPT09IGNoZWNrKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVUYXAgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0udGVtcENvbGQuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5zb3VyY2VUeXBlID0gc291cmNlLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIG9iai5zb3VyY2VJZCA9IHNvdXJjZS5zb3VyY2VJZFxuICAgICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nllYblk4EnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWxldGVEYXRhKHJlc3VsdCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhhdC5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2hlY2tlZCAoYXJyLCB2YWwpIHtcbiAgICAgIGlmIChhcnIuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICBhcnIucHVzaCh2YWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIuc3BsaWNlKGFyci5pbmRleE9mKHZhbCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIG1heE1vZGFsIChjb250ZW50KSB7XG4gICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiBjb250ZW50LFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlRGF0YSAoanNvbiwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlTGlzdDogSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZURhdGEgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5jYXJ0TGlzdCA9IFtdXG4gICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZpbmFscHJpY2UgPSAwXG4gICAgICB0aGlzLmZyZWlnaHQgPSAwXG4gICAgICB0aGlzLmNhcnRTdGF0dXMgPSB7fVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIHRoaXMuY2FydFN0YXR1cy50b3RhbHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIHRoaXMuY2FydFN0YXR1cy5kaXNjb3VudCA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgdGhpcy5jYXJ0U3RhdHVzLm1lbWJlclByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIHRoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIHRoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5jYXJ0TGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIGlmIChpdGVtLmJ1eUNvdW50IDw9IGl0ZW0ua2VlcENvdW50KSB7XG4gICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgICAgb2JqLmluaXRDb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICB9XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGdvb2QsIHZhbCwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogZ29vZC5zb3VyY2VUeXBlLFxuICAgICAgICBzb3VyY2VJZDogZ29vZC5zb3VyY2VJZCxcbiAgICAgICAgY291bnQ6IHZhbFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwpXG4gICAgICAvLyDliKTmlq3nlKjmiLdtZW1iZXJIYXNoXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=