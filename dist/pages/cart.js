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
          var data = res.data.data;
          _this6.cartStatus.totalprice = data.price;
          _this6.cartStatus.discount = data.reduction;
          if (_this.$parent.globalData.userLevel === 0) {
            _this6.finalprice = data.finalPrice;
          } else if (_this.$parent.globalData.userLevel === 1) {
            _this6.finalprice = data.finalPrice;
          }
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
        }
        _this.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImxlbmd0aCIsIm1ldGhvZHMiLCJlZGl0VGFwIiwicGx1c0NvbGQiLCJlIiwic291cmNlSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZm9yRWFjaCIsIml0ZW0iLCJ2YWwiLCJjb3VudCIsInRvdGFsQ291bnQiLCJtYXhNb2RhbCIsImFkZENhcnREYXRhIiwiaW5pdFBhZ2VEYXRhIiwiJGFwcGx5IiwibWluQ29sZCIsImtleUNvbGQiLCJrZXlWYWwiLCJibHVyQ29sZCIsImNvbnNvbGUiLCJsb2ciLCJpbml0Q291bnQiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsImNvbGRDaGVjayIsInZhbHVlIiwiY2hlY2tlZCIsImZpbHRlciIsImNvbGRBbGwiLCJpbmRleCIsImNoZWNrQWxsIiwidG90YWwiLCJjaGVjayIsImkiLCJkZWxldGVUYXAiLCJ0aGF0IiwicmVzdWx0Iiwic291cmNlIiwib2JqIiwic291cmNlVHlwZSIsInB1c2giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJkZWxldGVEYXRhIiwiY2FuY2VsIiwiYXJyIiwiaW5kZXhPZiIsInNwbGljZSIsImpzb24iLCJjYiIsInNvdXJjZUxpc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiSHR0cFJlcXVlc3QiLCJEZWxldGVDYXJ0SHR0cCIsInRoZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0Q2FydEh0dHAiLCJlcnJvciIsInRvdGFscHJpY2UiLCJwcmljZSIsImRpc2NvdW50IiwicmVkdWN0aW9uIiwiZmluYWxQcmljZSIsImNoaWxkT3JkZXJzIiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsImJ1eUNvdW50Iiwia2VlcENvdW50IiwiZGV0YWlsIiwidmljZVRpdGxlIiwiZ29vZCIsIkFkZENhcnRIdHRwIiwiZ2V0VG9rZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxFQUE1QixFQUFaLEVBQTRDLFFBQU8sRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxFQUE1QixFQUFuRCxFLFNBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sZUFBbEIsRUFBa0MsUUFBTyxNQUF6QyxFQUFnRCxTQUFRLE9BQXhELEVBQWdFLE9BQU0sT0FBdEUsRUFBaEIsRUFBK0YsbUJBQWtCLEVBQUMsU0FBUSxZQUFULEVBQXNCLE9BQU0sZUFBNUIsRUFBNEMsUUFBTyxNQUFuRCxFQUEwRCxTQUFRLE9B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b0IsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRCxZQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNEOzs7O0VBMVUrQixlQUFLaUYsSTs7a0JBQWxCL0gsSSIsImZpbGUiOiJjYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb3VudGUgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcImNhcnRMaXN0XCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9LFwiaXRlbVwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvdW50XCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzb3VyY2VJZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uc291cmNlSWRcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7XCJjb3VudGVDb2xkXCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NvbGRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW5Db2xkXCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNvbGRcIixcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDb2xkXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb3VudGVDb2xkOiBDb3VudGUsXG4gICAgICBjb3VudGVOb3JtYWw6IENvdW50ZVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2FydGNvdW50OiBbXSxcbiAgICAgIGNoZWNrZWRMaXN0OiBbXSxcbiAgICAgIHRlbXBDb2xkTGlzdDogW10sXG4gICAgICB0ZW1wTm9ybWFsTGlzdDogW10sXG4gICAgICBjYXJ0U3RhdHVzOiB7fSxcbiAgICAgIGNhcnRMaXN0OiBbXSxcbiAgICAgIGNvbGRsaXN0OiBbXSxcbiAgICAgIGNvbGRUaXRsZTogJycsXG4gICAgICBjb2xkQ2hlY2tlZDogZmFsc2UsXG4gICAgICB0ZW1wQ29sZDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIGZpbmFscHJpY2U6IDAsXG4gICAgICBmcmVpZ2h0OiAwXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0VGFwICgpIHtcbiAgICAgICAgdGhpcy5pc0VkaXQgPSAhdGhpcy5pc0VkaXRcbiAgICAgIH0sXG4gICAgICBwbHVzQ29sZCAoZSkge1xuICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQpIHtcbiAgICAgICAgICAgICAgdmFsLmNvdW50ICsrXG4gICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPiB2YWwudG90YWxDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgbWluQ29sZCAoZSkge1xuICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQpIHtcbiAgICAgICAgICAgICAgdmFsLmNvdW50IC0tXG4gICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMVxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+S4jeiDveWGjeWwkeWVpicpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIC0xLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBrZXlDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgIH0sXG4gICAgICBibHVyQ29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICBpZiAoa2V5VmFsIDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5VmFsID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0ga2V5VmFsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbC5pbml0Q291bnQpXG4gICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgdmFsLmNvdW50IC0gdmFsLmluaXRDb3VudCwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHZhbC5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ2F0ZWdvcnkgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb09yZGVyICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRWRpdCkge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL3BheWNhcnQnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbGRDaGVjayAoZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSAhdmFsLmNoZWNrZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGl0ZW0udGVtcENvbGQubGVuZ3RoID09PSBpdGVtLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGRBbGwgKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZC5sZW5ndGggPT09IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSBbXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3RcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoZWNrQWxsICgpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMFxuICAgICAgICB2YXIgY2hlY2sgPSAwXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICB0b3RhbCArPSBpdGVtLmNvbGRsaXN0Lmxlbmd0aFxuICAgICAgICAgIGNoZWNrICs9IGl0ZW0udGVtcENvbGQubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHRvdGFsLCBjaGVjaylcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmICh0b3RhbCA9PT0gY2hlY2spIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS50ZW1wQ29sZC5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBzb3VyY2Uuc291cmNlVHlwZVxuICAgICAgICAgICAgb2JqLnNvdXJjZUlkID0gc291cmNlLnNvdXJjZUlkXG4gICAgICAgICAgICByZXN1bHQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGF0LmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRDaGVja2VkIChhcnIsIHZhbCkge1xuICAgICAgaWYgKGFyci5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgIGFyci5wdXNoKHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5zcGxpY2UoYXJyLmluZGV4T2YodmFsKSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgbWF4TW9kYWwgKGNvbnRlbnQpIHtcbiAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IGNvbnRlbnQsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVEYXRhIChqc29uLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VMaXN0OiBKU09OLnN0cmluZ2lmeShqc29uKVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUNhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlRGF0YSAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLmNhcnRMaXN0ID0gW11cbiAgICAgIHRoaXMuZmluYWxwcmljZSA9IDBcbiAgICAgIHRoaXMuZnJlaWdodCA9IDBcbiAgICAgIHRoaXMuY2FydFN0YXR1cyA9IHt9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgdGhpcy5jYXJ0U3RhdHVzLnRvdGFscHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgdGhpcy5jYXJ0U3RhdHVzLmRpc2NvdW50ID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5maW5hbHByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLmNhcnRMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBpZiAoaXRlbS5idXlDb3VudCA8PSBpdGVtLmtlZXBDb3VudCkge1xuICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0ua2VlcENvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgfVxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGFkZENhcnREYXRhIChnb29kLCB2YWwsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IGdvb2Quc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGdvb2Quc291cmNlSWQsXG4gICAgICAgIGNvdW50OiB2YWxcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2NhcnQnKVxuICAgICAgY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsKVxuICAgICAgLy8g5Yik5pat55So5oi3bWVtYmVySGFzaFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19