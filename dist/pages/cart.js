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
      navigationBarTitleText: '购物车',
      enablePullDownRefresh: true
    }, _this2.$repeat = { "cartList": { "com": "counteCold", "props": "" }, "item": { "com": "counteCold", "props": "" }, "expire": { "com": "counteNormal", "props": "" } }, _this2.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:sourceId.sync": { "value": "item.sourceId", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:isDisabled.sync": { "value": "item.disable", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" } }, "counteNormal": { "v-bind:num.sync": { "value": "item.buyCount", "for": "expire", "item": "item", "index": "index", "key": "index" }, "v-bind:sourceId.sync": { "value": "item.sourceId", "for": "expire", "item": "item", "index": "index", "key": "index" }, "v-bind:isDisabled.sync": { "value": "item.disable", "for": "expire", "item": "item", "index": "index", "key": "index" } }, "defect": { "type": "2" } }, _this2.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold", "v-on:blurEdit": "blurCold" }, "counteNormal": { "v-on:blurEdit": "blurCold" } }, _this2.components = {
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
      isLoading: true,
      validateCount: 0,
      expire: [],
      timeout: true,
      userLevel: 0
    }, _this2.computed = {
      // userLevel () {
      //   if (this.$parent.globalData.userLevel === 0) {
      //     return false
      //   } else if (this.$parent.globalData.userLevel === 1) {
      //     return true
      //   }
      // },
      isNull: function isNull() {
        if (this.cartList.length === 0) {
          return true;
        } else {
          return false;
        }
      },
      hasExpire: function hasExpire() {
        if (this.expire.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    }, _this2.methods = {
      editTap: function editTap() {
        this.isEdit = !this.isEdit;
        if (this.isEdit) {
          this.clearList();
        }
      },
      plusCold: function plusCold(e) {
        var _this3 = this;

        if (this.timeout) {
          this.timeout = false;
          var sourceId = e.currentTarget.dataset.id;
          this.cartList.forEach(function (item) {
            item.coldlist.forEach(function (val) {
              if (val.sourceId === sourceId && val.totalCount > _this3.validateCount) {
                val.count = val.count + 1;
                if (val.count > val.totalCount) {
                  val.count = val.totalCount;
                  _this3.maxModal('数量已达上限');
                  _this3.timeout = true;
                } else {
                  // 发送购物车修改数据
                  _this3.addCartData(val, 1, function () {
                    _this3.initPageData(function () {
                      _this3.timeout = true;
                    });
                  });
                }
              }
            });
          });
          this.$apply();
        }
      },
      minCold: function minCold(e) {
        var _this4 = this;

        if (this.timeout) {
          this.timeout = false;
          var sourceId = e.currentTarget.dataset.id;
          this.cartList.forEach(function (item) {
            item.coldlist.forEach(function (val) {
              if (val.sourceId === sourceId && val.totalCount > _this4.validateCount) {
                val.count = val.count - 1;
                if (val.count < 1) {
                  val.count = 1;
                  _this4.maxModal('不能再少啦');
                  _this4.timeout = true;
                } else {
                  // 发送购物车修改数据
                  _this4.addCartData(val, -1, function () {
                    _this4.initPageData(function () {
                      _this4.timeout = true;
                    });
                  });
                }
              }
            });
          });
          this.$apply();
        }
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
              } else if (val.totalCount > _this5.validateCount && keyVal > val.totalCount) {
                val.count = val.totalCount;
                _this5.maxModal('数量已达上限');
              } else if (val.totalCount <= _this5.validateCount) {
                val.count = 0;
              } else {
                val.count = keyVal;
              }
              if (!val.disable) {
                _this5.addCartData(val, val.count - val.initCount, function () {
                  _this5.initPageData();
                });
              }
            }
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
          if (!this.hasExpire) {
            _wepy2.default.navigateTo({
              url: './paycart'
            });
          } else {
            _wepy2.default.showToast({
              title: '请先清空失效商品，再提交订单',
              icon: 'none'
            });
          }
        } else {
          _wepy2.default.showToast({
            title: '请先退出编辑状态',
            icon: 'none'
          });
        }
      },
      goApplyVip: function goApplyVip() {
        _wepy2.default.navigateTo({
          url: './applyVip'
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
      clearExpire: function clearExpire() {
        var _this6 = this;

        var result = [];
        this.expire.forEach(function (item) {
          var obj = {};
          obj.sourceType = item.salesUnitType;
          obj.sourceId = item.salesUnitId;
          result.push(obj);
        });
        console.log(result);
        this.deleteData(result, function () {
          _this6.initPageData();
          _this6.$apply();
        });
      },
      deleteTap: function deleteTap() {
        var that = this;
        var result = [];
        this.cartList.forEach(function (item) {
          console.log(item.tempCold);
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
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        sourceList: JSON.stringify(json)
      };
      this.$parent.HttpRequest.DeleteCartHttp(data).then(function (res) {
        if (res.data.error === 0) {
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            // _this.token = this.$parent.getToken(res.data.error)
          }
        }
      });
    }
  }, {
    key: 'initPageData',
    value: function initPageData(cb) {
      var _this7 = this;

      this.$parent.showLoading();
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token
      };
      this.cartList = [];
      this.expire = [];
      this.isLoading = true;
      this.finalprice = 0;
      this.freight = 0;
      this.cartStatus = {};
      this.$parent.HttpRequest.GetCartHttp(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        _this.isLoading = false;
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.cartStatus.totalprice = data.price;
          _this.cartStatus.discount = data.reduction;
          _this.cartStatus.memberPrice = data.memberPrice;
          _this.finalprice = data.pay;
          _this.freight = data.freight;
          // 测试用户身份变化
          _this.$parent.resetUserLevel(data.memberHash, _this7.token, function () {
            _this.userLevel = _this.$parent.globalData.userLevel;
          });
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            if (item.title === '冷链配送') {
              obj.iconClass = 'icon-new_llps';
            } else if (item.title === '常规配送') {
              obj.iconClass = 'icon-new_cgps';
            }
            obj.freight = item.freight;
            obj.coldChecked = false;
            obj.tempCold = [];
            obj.coldlist = _this.initChild(item.salesUnits);
            if (obj.coldlist.length === 0) {
              obj.showTitle = false;
            } else {
              obj.showTitle = true;
            }
            _this.cartList.push(obj);
            _this.$apply();
          });
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.initPageData(cb);
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isLoading = false;
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'filterList',
    value: function filterList(parent) {
      var _this8 = this;

      var tempArr = [];
      var tempExpire = [];
      tempExpire = parent.filter(function (item) {
        return item.keepCount <= _this8.validateCount || !item.isAllowSale || item.buyCount > item.keepCount;
      });
      tempExpire.forEach(function (item) {
        item.disable = true;
        _this8.expire.push(item);
      });
      tempArr = parent.filter(function (item) {
        return item.keepCount > _this8.validateCount && item.isAllowSale && item.buyCount <= item.keepCount;
      });
      return tempArr;
    }
  }, {
    key: 'initChild',
    value: function initChild(parent) {
      var child = [];
      var tempExpire = this.filterList(parent);
      tempExpire.forEach(function (item) {
        var obj = {};
        obj.path = item.cover;
        obj.title = item.title;
        obj.price = item.memberPrice;
        obj.oldprice = item.price;
        obj.id = item.productId;
        obj.sourceType = item.salesUnitType;
        obj.sourceId = item.salesUnitId;
        obj.detail = item.viceTitle + '×' + item.buyCount;
        obj.count = item.buyCount;
        obj.initCount = item.buyCount;
        obj.checked = false;
        obj.totalCount = item.keepCount;
        child.push(obj);
      });
      return child;
    }
  }, {
    key: 'addCartData',
    value: function addCartData(good, val, cb) {
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        sourceType: good.sourceType,
        sourceId: good.sourceId,
        count: val
      };
      this.$parent.HttpRequest.AddCartHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            // _this.token = _this.$parent.getToken(res.data.error)
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'clearList',
    value: function clearList() {
      this.cartList.forEach(function (item) {
        item.coldlist.forEach(function (i) {
          i.checked = false;
        });
        item.coldChecked = false;
        item.tempCold = [];
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      // 判断用户memberHash
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.userLevel = this.$parent.globalData.userLevel;
      this.isEdit = false;
      this.clearList();
      this.initPageData();
      this.$apply();
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.isEdit = false;
      this.clearList();
      this.initPageData(function () {
        _wepy2.default.stopPullDownRefresh();
      });
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsInRpbWVvdXQiLCJ1c2VyTGV2ZWwiLCJjb21wdXRlZCIsImxlbmd0aCIsImhhc0V4cGlyZSIsIm1ldGhvZHMiLCJlZGl0VGFwIiwiY2xlYXJMaXN0IiwicGx1c0NvbGQiLCJlIiwic291cmNlSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZm9yRWFjaCIsIml0ZW0iLCJ2YWwiLCJ0b3RhbENvdW50IiwiY291bnQiLCJtYXhNb2RhbCIsImFkZENhcnREYXRhIiwiaW5pdFBhZ2VEYXRhIiwiJGFwcGx5IiwibWluQ29sZCIsImtleUNvbGQiLCJrZXlWYWwiLCJibHVyQ29sZCIsImRpc2FibGUiLCJpbml0Q291bnQiLCJnb0RldGFpbCIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29DYXRlZ29yeSIsInN3aXRjaFRhYiIsImdvT3JkZXIiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJnb0FwcGx5VmlwIiwiY29sZENoZWNrIiwidmFsdWUiLCJjaGVja2VkIiwiZmlsdGVyIiwiY29sZEFsbCIsImluZGV4IiwiY2hlY2tBbGwiLCJ0b3RhbCIsImNoZWNrIiwiaSIsImNsZWFyRXhwaXJlIiwicmVzdWx0Iiwib2JqIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsInB1c2giLCJkZWxldGVEYXRhIiwiZGVsZXRlVGFwIiwidGhhdCIsInNvdXJjZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWwiLCJhcnIiLCJpbmRleE9mIiwic3BsaWNlIiwianNvbiIsImNiIiwiJHBhcmVudCIsImdldFRva2VuIiwiX3RoaXMiLCJzb3VyY2VMaXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsIkh0dHBSZXF1ZXN0IiwiRGVsZXRlQ2FydEh0dHAiLCJ0aGVuIiwiZXJyb3IiLCJtaXNzVG9rZW4iLCJzaG93TG9hZGluZyIsIkdldENhcnRIdHRwIiwiaGlkZUxvYWRpbmciLCJ0b3RhbHByaWNlIiwicHJpY2UiLCJkaXNjb3VudCIsInJlZHVjdGlvbiIsIm1lbWJlclByaWNlIiwicGF5IiwicmVzZXRVc2VyTGV2ZWwiLCJtZW1iZXJIYXNoIiwiZ2xvYmFsRGF0YSIsImNoaWxkT3JkZXJzIiwiaWNvbkNsYXNzIiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInNob3dUaXRsZSIsImNhdGNoIiwicGFyZW50IiwidGVtcEFyciIsInRlbXBFeHBpcmUiLCJrZWVwQ291bnQiLCJpc0FsbG93U2FsZSIsImJ1eUNvdW50IiwiY2hpbGQiLCJmaWx0ZXJMaXN0IiwicGF0aCIsImNvdmVyIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJnb29kIiwiQWRkQ2FydEh0dHAiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixLQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxTQUlWQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBWixFQUE0QyxRQUFPLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBbkQsRUFBbUYsVUFBUyxFQUFDLE9BQU0sY0FBUCxFQUFzQixTQUFRLEVBQTlCLEVBQTVGLEUsU0FDYkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxlQUFsQixFQUFrQyxRQUFPLE1BQXpDLEVBQWdELFNBQVEsT0FBeEQsRUFBZ0UsT0FBTSxPQUF0RSxFQUFoQixFQUErRixtQkFBa0IsRUFBQyxTQUFRLFlBQVQsRUFBc0IsT0FBTSxlQUE1QixFQUE0QyxRQUFPLE1BQW5ELEVBQTBELFNBQVEsT0FBbEUsRUFBMEUsT0FBTSxPQUFoRixFQUFqSCxFQUEwTSxjQUFhLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxlQUFsQixFQUFrQyxRQUFPLE1BQXpDLEVBQWdELFNBQVEsT0FBeEQsRUFBZ0UsT0FBTSxPQUF0RSxFQUF2TixFQUFzUyx3QkFBdUIsRUFBQyxTQUFRLGVBQVQsRUFBeUIsT0FBTSxlQUEvQixFQUErQyxRQUFPLE1BQXRELEVBQTZELFNBQVEsT0FBckUsRUFBNkUsT0FBTSxPQUFuRixFQUE3VCxFQUF5WiwwQkFBeUIsRUFBQyxTQUFRLGNBQVQsRUFBd0IsT0FBTSxlQUE5QixFQUE4QyxRQUFPLE1BQXJELEVBQTRELFNBQVEsT0FBcEUsRUFBNEUsT0FBTSxPQUFsRixFQUFsYixFQUFkLEVBQTRoQixnQkFBZSxFQUFDLG1CQUFrQixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLFFBQS9CLEVBQXdDLFFBQU8sTUFBL0MsRUFBc0QsU0FBUSxPQUE5RCxFQUFzRSxPQUFNLE9BQTVFLEVBQW5CLEVBQXdHLHdCQUF1QixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLFFBQS9CLEVBQXdDLFFBQU8sTUFBL0MsRUFBc0QsU0FBUSxPQUE5RCxFQUFzRSxPQUFNLE9BQTVFLEVBQS9ILEVBQW9OLDBCQUF5QixFQUFDLFNBQVEsY0FBVCxFQUF3QixPQUFNLFFBQTlCLEVBQXVDLFFBQU8sTUFBOUMsRUFBcUQsU0FBUSxPQUE3RCxFQUFxRSxPQUFNLE9BQTNFLEVBQTdPLEVBQTNpQixFQUE2MkIsVUFBUyxFQUFDLFFBQU8sR0FBUixFQUF0M0IsRSxTQUNUQyxPLEdBQVUsRUFBQyxjQUFhLEVBQUMsaUJBQWdCLFVBQWpCLEVBQTRCLGtCQUFpQixTQUE3QyxFQUF1RCxnQkFBZSxTQUF0RSxFQUFnRixpQkFBZ0IsVUFBaEcsRUFBZCxFQUEwSCxnQkFBZSxFQUFDLGlCQUFnQixVQUFqQixFQUF6SSxFLFNBQ1RDLFUsR0FBYTtBQUNSQyxtQ0FEUTtBQUVSQyxxQ0FGUTtBQUdSQztBQUhRLEssU0FLVkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLG1CQUFhLEVBSFI7QUFJTEMsb0JBQWMsRUFKVDtBQUtMQyxzQkFBZ0IsRUFMWDtBQU1MQyxrQkFBWSxFQU5QO0FBT0xDLGdCQUFVLEVBUEw7QUFRTEMsZ0JBQVUsRUFSTDtBQVNMQyxpQkFBVyxFQVROO0FBVUxDLG1CQUFhLEtBVlI7QUFXTEMsZ0JBQVUsRUFYTDtBQVlMQyxjQUFRLEtBWkg7QUFhTEMsY0FBUSxLQWJIO0FBY0xDLGtCQUFZLENBZFA7QUFlTEMsZUFBUyxDQWZKO0FBZ0JMQyxpQkFBVyxJQWhCTjtBQWlCTEMscUJBQWUsQ0FqQlY7QUFrQkxDLGNBQVEsRUFsQkg7QUFtQkxDLGVBQVMsSUFuQko7QUFvQkxDLGlCQUFXO0FBcEJOLEssU0FzQlBDLFEsR0FBVztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FSLFlBUlMsb0JBUUM7QUFDUixZQUFJLEtBQUtOLFFBQUwsQ0FBY2UsTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUM5QixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0YsT0FkUTtBQWVUQyxlQWZTLHVCQWVJO0FBQ1gsWUFBSSxLQUFLTCxNQUFMLENBQVlJLE1BQVosS0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUIsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLElBQVA7QUFDRDtBQUNGO0FBckJRLEssU0F1QlhFLE8sR0FBVTtBQUNSQyxhQURRLHFCQUNHO0FBQ1QsYUFBS2IsTUFBTCxHQUFjLENBQUMsS0FBS0EsTUFBcEI7QUFDQSxZQUFJLEtBQUtBLE1BQVQsRUFBaUI7QUFDZixlQUFLYyxTQUFMO0FBQ0Q7QUFDRixPQU5PO0FBT1JDLGNBUFEsb0JBT0VDLENBUEYsRUFPSztBQUFBOztBQUNYLFlBQUksS0FBS1QsT0FBVCxFQUFrQjtBQUNoQixlQUFLQSxPQUFMLEdBQWUsS0FBZjtBQUNBLGNBQUlVLFdBQVdELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxFQUF2QztBQUNBLGVBQUt6QixRQUFMLENBQWMwQixPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QkEsaUJBQUsxQixRQUFMLENBQWN5QixPQUFkLENBQXNCLFVBQUNFLEdBQUQsRUFBUztBQUM3QixrQkFBSUEsSUFBSU4sUUFBSixLQUFpQkEsUUFBakIsSUFBNkJNLElBQUlDLFVBQUosR0FBaUIsT0FBS25CLGFBQXZELEVBQXNFO0FBQ3BFa0Isb0JBQUlFLEtBQUosR0FBWUYsSUFBSUUsS0FBSixHQUFZLENBQXhCO0FBQ0Esb0JBQUlGLElBQUlFLEtBQUosR0FBWUYsSUFBSUMsVUFBcEIsRUFBZ0M7QUFDOUJELHNCQUFJRSxLQUFKLEdBQVlGLElBQUlDLFVBQWhCO0FBQ0EseUJBQUtFLFFBQUwsQ0FBYyxRQUFkO0FBQ0EseUJBQUtuQixPQUFMLEdBQWUsSUFBZjtBQUNELGlCQUpELE1BSU87QUFDTDtBQUNBLHlCQUFLb0IsV0FBTCxDQUFpQkosR0FBakIsRUFBc0IsQ0FBdEIsRUFBeUIsWUFBTTtBQUM3QiwyQkFBS0ssWUFBTCxDQUFrQixZQUFNO0FBQ3RCLDZCQUFLckIsT0FBTCxHQUFlLElBQWY7QUFDRCxxQkFGRDtBQUdELG1CQUpEO0FBS0Q7QUFDRjtBQUNGLGFBaEJEO0FBaUJELFdBbEJEO0FBbUJBLGVBQUtzQixNQUFMO0FBQ0Q7QUFDRixPQWhDTztBQWlDUkMsYUFqQ1EsbUJBaUNDZCxDQWpDRCxFQWlDSTtBQUFBOztBQUNWLFlBQUksS0FBS1QsT0FBVCxFQUFrQjtBQUNoQixlQUFLQSxPQUFMLEdBQWUsS0FBZjtBQUNBLGNBQUlVLFdBQVdELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxFQUF2QztBQUNBLGVBQUt6QixRQUFMLENBQWMwQixPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QkEsaUJBQUsxQixRQUFMLENBQWN5QixPQUFkLENBQXNCLFVBQUNFLEdBQUQsRUFBUztBQUM3QixrQkFBSUEsSUFBSU4sUUFBSixLQUFpQkEsUUFBakIsSUFBNkJNLElBQUlDLFVBQUosR0FBaUIsT0FBS25CLGFBQXZELEVBQXNFO0FBQ3BFa0Isb0JBQUlFLEtBQUosR0FBWUYsSUFBSUUsS0FBSixHQUFZLENBQXhCO0FBQ0Esb0JBQUlGLElBQUlFLEtBQUosR0FBWSxDQUFoQixFQUFtQjtBQUNqQkYsc0JBQUlFLEtBQUosR0FBWSxDQUFaO0FBQ0EseUJBQUtDLFFBQUwsQ0FBYyxPQUFkO0FBQ0EseUJBQUtuQixPQUFMLEdBQWUsSUFBZjtBQUNELGlCQUpELE1BSU87QUFDTDtBQUNBLHlCQUFLb0IsV0FBTCxDQUFpQkosR0FBakIsRUFBc0IsQ0FBQyxDQUF2QixFQUEwQixZQUFNO0FBQzlCLDJCQUFLSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsNkJBQUtyQixPQUFMLEdBQWUsSUFBZjtBQUNELHFCQUZEO0FBR0QsbUJBSkQ7QUFLRDtBQUNGO0FBQ0YsYUFoQkQ7QUFpQkQsV0FsQkQ7QUFtQkEsZUFBS3NCLE1BQUw7QUFDRDtBQUNGLE9BMURPO0FBMkRSRSxhQTNEUSxtQkEyRENDLE1BM0RELEVBMkRTaEIsQ0EzRFQsRUEyRFksQ0FDbkIsQ0E1RE87QUE2RFJpQixjQTdEUSxvQkE2REVELE1BN0RGLEVBNkRVaEIsQ0E3RFYsRUE2RGE7QUFBQTs7QUFDbkIsWUFBSUMsV0FBV0QsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXZDO0FBQ0EsYUFBS3pCLFFBQUwsQ0FBYzBCLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzlCQSxlQUFLMUIsUUFBTCxDQUFjeUIsT0FBZCxDQUFzQixVQUFDRSxHQUFELEVBQVM7QUFDN0IsZ0JBQUlBLElBQUlOLFFBQUosS0FBaUJBLFFBQXJCLEVBQStCO0FBQzdCLGtCQUFJZSxVQUFVLENBQWQsRUFBaUI7QUFDZlQsb0JBQUlFLEtBQUosR0FBWSxDQUFaO0FBQ0QsZUFGRCxNQUVPLElBQUlGLElBQUlDLFVBQUosR0FBaUIsT0FBS25CLGFBQXRCLElBQXVDMkIsU0FBU1QsSUFBSUMsVUFBeEQsRUFBb0U7QUFDekVELG9CQUFJRSxLQUFKLEdBQVlGLElBQUlDLFVBQWhCO0FBQ0EsdUJBQUtFLFFBQUwsQ0FBYyxRQUFkO0FBQ0QsZUFITSxNQUdBLElBQUlILElBQUlDLFVBQUosSUFBa0IsT0FBS25CLGFBQTNCLEVBQTBDO0FBQy9Da0Isb0JBQUlFLEtBQUosR0FBWSxDQUFaO0FBQ0QsZUFGTSxNQUVBO0FBQ0xGLG9CQUFJRSxLQUFKLEdBQVlPLE1BQVo7QUFDRDtBQUNELGtCQUFJLENBQUNULElBQUlXLE9BQVQsRUFBa0I7QUFDaEIsdUJBQUtQLFdBQUwsQ0FBaUJKLEdBQWpCLEVBQXNCQSxJQUFJRSxLQUFKLEdBQVlGLElBQUlZLFNBQXRDLEVBQWlELFlBQU07QUFDckQseUJBQUtQLFlBQUw7QUFDRCxpQkFGRDtBQUdEO0FBQ0Y7QUFDRCxtQkFBT0wsSUFBSUUsS0FBWDtBQUNELFdBbkJEO0FBb0JELFNBckJEO0FBc0JELE9BckZPO0FBc0ZSVyxjQXRGUSxvQkFzRkVoQixFQXRGRixFQXNGTTtBQUNaaUIsZ0JBQVFDLEdBQVIsQ0FBWWxCLEVBQVo7QUFDQSx1QkFBS21CLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxpQkFBaUJwQjtBQURSLFNBQWhCO0FBR0QsT0EzRk87QUE0RlJxQixnQkE1RlEsd0JBNEZNO0FBQ1osdUJBQUtDLFNBQUwsQ0FBZTtBQUNiRixlQUFLO0FBRFEsU0FBZjtBQUdELE9BaEdPO0FBaUdSRyxhQWpHUSxxQkFpR0c7QUFDVCxZQUFJLENBQUMsS0FBSzNDLE1BQVYsRUFBa0I7QUFDaEIsY0FBSSxDQUFDLEtBQUtXLFNBQVYsRUFBcUI7QUFDbkIsMkJBQUs0QixVQUFMLENBQWdCO0FBQ2RDLG1CQUFLO0FBRFMsYUFBaEI7QUFHRCxXQUpELE1BSU87QUFDTCwyQkFBS0ksU0FBTCxDQUFlO0FBQ2JDLHFCQUFPLGdCQURNO0FBRWJDLG9CQUFNO0FBRk8sYUFBZjtBQUlEO0FBQ0YsU0FYRCxNQVdPO0FBQ0wseUJBQUtGLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxVQURNO0FBRWJDLGtCQUFNO0FBRk8sV0FBZjtBQUlEO0FBQ0YsT0FuSE87QUFvSFJDLGdCQXBIUSx3QkFvSE07QUFDWix1QkFBS1IsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQXhITztBQXlIUlEsZUF6SFEscUJBeUhHaEMsQ0F6SEgsRUF5SE07QUFDWixZQUFJaUMsUUFBUWpDLEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCOEIsS0FBcEM7QUFDQSxhQUFLdEQsUUFBTCxDQUFjMEIsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDOUJBLGVBQUsxQixRQUFMLENBQWN5QixPQUFkLENBQXNCLFVBQUNFLEdBQUQsRUFBUztBQUM3QixnQkFBSUEsSUFBSU4sUUFBSixLQUFpQmdDLEtBQXJCLEVBQTRCO0FBQzFCMUIsa0JBQUkyQixPQUFKLEdBQWMsQ0FBQzNCLElBQUkyQixPQUFuQjtBQUNEO0FBQ0YsV0FKRDtBQUtBNUIsZUFBS3ZCLFFBQUwsR0FBZ0J1QixLQUFLMUIsUUFBTCxDQUFjdUQsTUFBZCxDQUFxQixVQUFDN0IsSUFBRCxFQUFVO0FBQzdDLG1CQUFPQSxLQUFLNEIsT0FBWjtBQUNELFdBRmUsQ0FBaEI7QUFHQSxjQUFJNUIsS0FBS3ZCLFFBQUwsQ0FBY1csTUFBZCxLQUF5QlksS0FBSzFCLFFBQUwsQ0FBY2MsTUFBM0MsRUFBbUQ7QUFDakRZLGlCQUFLeEIsV0FBTCxHQUFtQixJQUFuQjtBQUNELFdBRkQsTUFFTztBQUNMd0IsaUJBQUt4QixXQUFMLEdBQW1CLEtBQW5CO0FBQ0Q7QUFDRixTQWREO0FBZUQsT0ExSU87QUEySVJzRCxhQTNJUSxtQkEySUNDLEtBM0lELEVBMklRO0FBQ2QsWUFBSSxLQUFLMUQsUUFBTCxDQUFjMEQsS0FBZCxFQUFxQnRELFFBQXJCLENBQThCVyxNQUE5QixLQUF5QyxLQUFLZixRQUFMLENBQWMwRCxLQUFkLEVBQXFCekQsUUFBckIsQ0FBOEJjLE1BQTNFLEVBQW1GO0FBQ2pGLGVBQUtmLFFBQUwsQ0FBYzBELEtBQWQsRUFBcUJ6RCxRQUFyQixDQUE4QnlCLE9BQTlCLENBQXNDLFVBQUNDLElBQUQsRUFBVTtBQUM5Q0EsaUJBQUs0QixPQUFMLEdBQWUsS0FBZjtBQUNELFdBRkQ7QUFHQSxlQUFLdkQsUUFBTCxDQUFjMEQsS0FBZCxFQUFxQnZELFdBQXJCLEdBQW1DLEtBQW5DO0FBQ0EsZUFBS0gsUUFBTCxDQUFjMEQsS0FBZCxFQUFxQnRELFFBQXJCLEdBQWdDLEVBQWhDO0FBQ0QsU0FORCxNQU1PO0FBQ0wsZUFBS0osUUFBTCxDQUFjMEQsS0FBZCxFQUFxQnpELFFBQXJCLENBQThCeUIsT0FBOUIsQ0FBc0MsVUFBQ0MsSUFBRCxFQUFVO0FBQzlDQSxpQkFBSzRCLE9BQUwsR0FBZSxJQUFmO0FBQ0QsV0FGRDtBQUdBLGVBQUt2RCxRQUFMLENBQWMwRCxLQUFkLEVBQXFCdkQsV0FBckIsR0FBbUMsSUFBbkM7QUFDQSxlQUFLSCxRQUFMLENBQWMwRCxLQUFkLEVBQXFCdEQsUUFBckIsR0FBZ0MsS0FBS0osUUFBTCxDQUFjMEQsS0FBZCxFQUFxQnpELFFBQXJEO0FBQ0Q7QUFDRixPQXpKTztBQTBKUjBELGNBMUpRLHNCQTBKSTtBQUNWLFlBQUlDLFFBQVEsQ0FBWjtBQUNBLFlBQUlDLFFBQVEsQ0FBWjtBQUNBLGFBQUs3RCxRQUFMLENBQWMwQixPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBTytCLEtBQVAsRUFBaUI7QUFDckNFLG1CQUFTakMsS0FBSzFCLFFBQUwsQ0FBY2MsTUFBdkI7QUFDQThDLG1CQUFTbEMsS0FBS3ZCLFFBQUwsQ0FBY1csTUFBdkI7QUFDRCxTQUhEO0FBSUEyQixnQkFBUUMsR0FBUixDQUFZaUIsS0FBWixFQUFtQkMsS0FBbkI7QUFDQSxhQUFLN0QsUUFBTCxDQUFjMEIsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQU8rQixLQUFQLEVBQWlCO0FBQ3JDLGNBQUlFLFVBQVVDLEtBQWQsRUFBcUI7QUFDbkJsQyxpQkFBSzFCLFFBQUwsQ0FBY3lCLE9BQWQsQ0FBc0IsVUFBQ29DLENBQUQsRUFBTztBQUMzQkEsZ0JBQUVQLE9BQUYsR0FBWSxLQUFaO0FBQ0QsYUFGRDtBQUdBNUIsaUJBQUt4QixXQUFMLEdBQW1CLEtBQW5CO0FBQ0F3QixpQkFBS3ZCLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRCxXQU5ELE1BTU87QUFDTHVCLGlCQUFLMUIsUUFBTCxDQUFjeUIsT0FBZCxDQUFzQixVQUFDb0MsQ0FBRCxFQUFPO0FBQzNCQSxnQkFBRVAsT0FBRixHQUFZLElBQVo7QUFDRCxhQUZEO0FBR0E1QixpQkFBS3hCLFdBQUwsR0FBbUIsSUFBbkI7QUFDQXdCLGlCQUFLdkIsUUFBTCxHQUFnQnVCLEtBQUsxQixRQUFyQjtBQUNEO0FBQ0YsU0FkRDtBQWVELE9BakxPO0FBa0xSOEQsaUJBbExRLHlCQWtMTztBQUFBOztBQUNiLFlBQUlDLFNBQVMsRUFBYjtBQUNBLGFBQUtyRCxNQUFMLENBQVllLE9BQVosQ0FBb0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzVCLGNBQUlzQyxNQUFNLEVBQVY7QUFDQUEsY0FBSUMsVUFBSixHQUFpQnZDLEtBQUt3QyxhQUF0QjtBQUNBRixjQUFJM0MsUUFBSixHQUFlSyxLQUFLeUMsV0FBcEI7QUFDQUosaUJBQU9LLElBQVAsQ0FBWUosR0FBWjtBQUNELFNBTEQ7QUFNQXZCLGdCQUFRQyxHQUFSLENBQVlxQixNQUFaO0FBQ0EsYUFBS00sVUFBTCxDQUFnQk4sTUFBaEIsRUFBd0IsWUFBTTtBQUM1QixpQkFBSy9CLFlBQUw7QUFDQSxpQkFBS0MsTUFBTDtBQUNELFNBSEQ7QUFJRCxPQS9MTztBQWdNUnFDLGVBaE1RLHVCQWdNSztBQUNYLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUlSLFNBQVMsRUFBYjtBQUNBLGFBQUtoRSxRQUFMLENBQWMwQixPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QmUsa0JBQVFDLEdBQVIsQ0FBWWhCLEtBQUt2QixRQUFqQjtBQUNBdUIsZUFBS3ZCLFFBQUwsQ0FBY3NCLE9BQWQsQ0FBc0IsVUFBQytDLE1BQUQsRUFBWTtBQUNoQyxnQkFBSVIsTUFBTSxFQUFWO0FBQ0FBLGdCQUFJQyxVQUFKLEdBQWlCTyxPQUFPUCxVQUF4QjtBQUNBRCxnQkFBSTNDLFFBQUosR0FBZW1ELE9BQU9uRCxRQUF0QjtBQUNBMEMsbUJBQU9LLElBQVAsQ0FBWUosR0FBWjtBQUNELFdBTEQ7QUFNRCxTQVJEO0FBU0EsWUFBSUQsT0FBT2pELE1BQVAsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIseUJBQUtrQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sT0FETTtBQUVid0Isc0JBQVUsSUFGRztBQUdiQyxtQkFBTztBQUhNLFdBQWY7QUFLRCxTQU5ELE1BTU87QUFDTCx5QkFBS0MsU0FBTCxDQUFlO0FBQ2IxQixtQkFBTyxJQURNO0FBRWIyQixxQkFBUyxPQUZJO0FBR2JDLHFCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsa0JBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDZlIscUJBQUtGLFVBQUwsQ0FBZ0JOLE1BQWhCLEVBQXdCLFlBQU07QUFDNUJRLHVCQUFLdkMsWUFBTDtBQUNBdUMsdUJBQUt0QyxNQUFMO0FBQ0QsaUJBSEQ7QUFJRDtBQUNELGtCQUFJNkMsSUFBSUUsTUFBUixFQUFnQixDQUNmO0FBQ0Y7QUFaWSxXQUFmO0FBY0Q7QUFDRjtBQWxPTyxLOzs7OzsrQkFvT0VDLEcsRUFBS3RELEcsRUFBSztBQUNwQixVQUFJc0QsSUFBSUMsT0FBSixDQUFZdkQsR0FBWixNQUFxQixDQUFDLENBQTFCLEVBQTZCO0FBQzNCc0QsWUFBSWIsSUFBSixDQUFTekMsR0FBVDtBQUNELE9BRkQsTUFFTztBQUNMc0QsWUFBSUUsTUFBSixDQUFXRixJQUFJQyxPQUFKLENBQVl2RCxHQUFaLENBQVgsRUFBNkIsQ0FBN0I7QUFDRDtBQUNGOzs7NkJBQ1NpRCxPLEVBQVM7QUFDakIscUJBQUs1QixTQUFMLENBQWU7QUFDYkMsZUFBTzJCLE9BRE07QUFFYkgsa0JBQVUsSUFGRztBQUdiQyxlQUFPO0FBSE0sT0FBZjtBQUtEOzs7K0JBQ1dVLEksRUFBTUMsRSxFQUFJO0FBQ3BCLFdBQUs1RixLQUFMLEdBQWEsS0FBSzZGLE9BQUwsQ0FBYUMsUUFBYixFQUFiO0FBQ0EsVUFBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBSWhHLE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVRnRyxvQkFBWUMsS0FBS0MsU0FBTCxDQUFlUCxJQUFmO0FBRkgsT0FBWDtBQUlBLFdBQUtFLE9BQUwsQ0FBYU0sV0FBYixDQUF5QkMsY0FBekIsQ0FBd0NyRyxJQUF4QyxFQUE4Q3NHLElBQTlDLENBQW1ELFVBQUNoQixHQUFELEVBQVM7QUFDMUQsWUFBSUEsSUFBSXRGLElBQUosQ0FBU3VHLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJWLGdCQUFNQSxJQUFOO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBSUcsTUFBTUYsT0FBTixDQUFjVSxTQUFsQixFQUE2QjtBQUMzQjtBQUNEO0FBQ0Y7QUFDRixPQVJEO0FBU0Q7OztpQ0FDYVgsRSxFQUFJO0FBQUE7O0FBQ2hCLFdBQUtDLE9BQUwsQ0FBYVcsV0FBYjtBQUNBLFdBQUt4RyxLQUFMLEdBQWEsS0FBSzZGLE9BQUwsQ0FBYUMsUUFBYixFQUFiO0FBQ0EsVUFBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBSWhHLE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLTSxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsV0FBS1csTUFBTCxHQUFjLEVBQWQ7QUFDQSxXQUFLRixTQUFMLEdBQWlCLElBQWpCO0FBQ0EsV0FBS0YsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS1QsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFdBQUt3RixPQUFMLENBQWFNLFdBQWIsQ0FBeUJNLFdBQXpCLENBQXFDMUcsSUFBckMsRUFBMkNzRyxJQUEzQyxDQUFnRCxVQUFDaEIsR0FBRCxFQUFTO0FBQ3ZEckMsZ0JBQVFDLEdBQVIsQ0FBWW9DLEdBQVo7QUFDQVUsY0FBTUYsT0FBTixDQUFjYSxXQUFkO0FBQ0FYLGNBQU1oRixTQUFOLEdBQWtCLEtBQWxCO0FBQ0EsWUFBSXNFLElBQUl0RixJQUFKLENBQVN1RyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUl2RyxPQUFPc0YsSUFBSXRGLElBQUosQ0FBU0EsSUFBcEI7QUFDQWdHLGdCQUFNMUYsVUFBTixDQUFpQnNHLFVBQWpCLEdBQThCNUcsS0FBSzZHLEtBQW5DO0FBQ0FiLGdCQUFNMUYsVUFBTixDQUFpQndHLFFBQWpCLEdBQTRCOUcsS0FBSytHLFNBQWpDO0FBQ0FmLGdCQUFNMUYsVUFBTixDQUFpQjBHLFdBQWpCLEdBQStCaEgsS0FBS2dILFdBQXBDO0FBQ0FoQixnQkFBTWxGLFVBQU4sR0FBbUJkLEtBQUtpSCxHQUF4QjtBQUNBakIsZ0JBQU1qRixPQUFOLEdBQWdCZixLQUFLZSxPQUFyQjtBQUNBO0FBQ0FpRixnQkFBTUYsT0FBTixDQUFjb0IsY0FBZCxDQUE2QmxILEtBQUttSCxVQUFsQyxFQUE4QyxPQUFLbEgsS0FBbkQsRUFBMEQsWUFBTTtBQUM5RCtGLGtCQUFNNUUsU0FBTixHQUFrQjRFLE1BQU1GLE9BQU4sQ0FBY3NCLFVBQWQsQ0FBeUJoRyxTQUEzQztBQUNELFdBRkQ7QUFHQXBCLGVBQUtxSCxXQUFMLENBQWlCcEYsT0FBakIsQ0FBeUIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDLGdCQUFJc0MsTUFBTSxFQUFWO0FBQ0FBLGdCQUFJZixLQUFKLEdBQVl2QixLQUFLdUIsS0FBakI7QUFDQSxnQkFBSXZCLEtBQUt1QixLQUFMLEtBQWUsTUFBbkIsRUFBMkI7QUFDekJlLGtCQUFJOEMsU0FBSixHQUFnQixlQUFoQjtBQUNELGFBRkQsTUFFTyxJQUFJcEYsS0FBS3VCLEtBQUwsS0FBZSxNQUFuQixFQUEyQjtBQUNoQ2Usa0JBQUk4QyxTQUFKLEdBQWdCLGVBQWhCO0FBQ0Q7QUFDRDlDLGdCQUFJekQsT0FBSixHQUFjbUIsS0FBS25CLE9BQW5CO0FBQ0F5RCxnQkFBSTlELFdBQUosR0FBa0IsS0FBbEI7QUFDQThELGdCQUFJN0QsUUFBSixHQUFlLEVBQWY7QUFDQTZELGdCQUFJaEUsUUFBSixHQUFld0YsTUFBTXVCLFNBQU4sQ0FBZ0JyRixLQUFLc0YsVUFBckIsQ0FBZjtBQUNBLGdCQUFJaEQsSUFBSWhFLFFBQUosQ0FBYWMsTUFBYixLQUF3QixDQUE1QixFQUErQjtBQUM3QmtELGtCQUFJaUQsU0FBSixHQUFnQixLQUFoQjtBQUNELGFBRkQsTUFFTztBQUNMakQsa0JBQUlpRCxTQUFKLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRHpCLGtCQUFNekYsUUFBTixDQUFlcUUsSUFBZixDQUFvQkosR0FBcEI7QUFDQXdCLGtCQUFNdkQsTUFBTjtBQUNELFdBbkJEO0FBb0JBb0QsZ0JBQU1BLElBQU47QUFDRCxTQWhDRCxNQWdDTztBQUNMLGNBQUlHLE1BQU1GLE9BQU4sQ0FBY1UsU0FBbEIsRUFBNkI7QUFDM0JSLGtCQUFNeEQsWUFBTixDQUFtQnFELEVBQW5CO0FBQ0Q7QUFDRjtBQUNERyxjQUFNdkQsTUFBTjtBQUNELE9BMUNELEVBMENHaUYsS0ExQ0gsQ0EwQ1MsWUFBTTtBQUNiMUIsY0FBTUYsT0FBTixDQUFjYSxXQUFkO0FBQ0FYLGNBQU1oRixTQUFOLEdBQWtCLEtBQWxCO0FBQ0E7QUFDRCxPQTlDRDtBQStDRDs7OytCQUNXMkcsTSxFQUFRO0FBQUE7O0FBQ2xCLFVBQUlDLFVBQVUsRUFBZDtBQUNBLFVBQUlDLGFBQWEsRUFBakI7QUFDQUEsbUJBQWFGLE9BQU81RCxNQUFQLENBQWMsVUFBQzdCLElBQUQsRUFBVTtBQUNuQyxlQUFPQSxLQUFLNEYsU0FBTCxJQUFrQixPQUFLN0csYUFBdkIsSUFBd0MsQ0FBQ2lCLEtBQUs2RixXQUE5QyxJQUE2RDdGLEtBQUs4RixRQUFMLEdBQWdCOUYsS0FBSzRGLFNBQXpGO0FBQ0QsT0FGWSxDQUFiO0FBR0FELGlCQUFXNUYsT0FBWCxDQUFtQixVQUFDQyxJQUFELEVBQVU7QUFDM0JBLGFBQUtZLE9BQUwsR0FBZSxJQUFmO0FBQ0EsZUFBSzVCLE1BQUwsQ0FBWTBELElBQVosQ0FBaUIxQyxJQUFqQjtBQUNELE9BSEQ7QUFJQTBGLGdCQUFVRCxPQUFPNUQsTUFBUCxDQUFjLFVBQUM3QixJQUFELEVBQVU7QUFDaEMsZUFBT0EsS0FBSzRGLFNBQUwsR0FBaUIsT0FBSzdHLGFBQXRCLElBQXVDaUIsS0FBSzZGLFdBQTVDLElBQTJEN0YsS0FBSzhGLFFBQUwsSUFBaUI5RixLQUFLNEYsU0FBeEY7QUFDRCxPQUZTLENBQVY7QUFHQSxhQUFPRixPQUFQO0FBQ0Q7Ozs4QkFDVUQsTSxFQUFRO0FBQ2pCLFVBQUlNLFFBQVEsRUFBWjtBQUNBLFVBQUlKLGFBQWEsS0FBS0ssVUFBTCxDQUFnQlAsTUFBaEIsQ0FBakI7QUFDQUUsaUJBQVc1RixPQUFYLENBQW1CLFVBQUNDLElBQUQsRUFBVTtBQUMzQixZQUFJc0MsTUFBTSxFQUFWO0FBQ0FBLFlBQUkyRCxJQUFKLEdBQVdqRyxLQUFLa0csS0FBaEI7QUFDQTVELFlBQUlmLEtBQUosR0FBWXZCLEtBQUt1QixLQUFqQjtBQUNBZSxZQUFJcUMsS0FBSixHQUFZM0UsS0FBSzhFLFdBQWpCO0FBQ0F4QyxZQUFJNkQsUUFBSixHQUFlbkcsS0FBSzJFLEtBQXBCO0FBQ0FyQyxZQUFJeEMsRUFBSixHQUFTRSxLQUFLb0csU0FBZDtBQUNBOUQsWUFBSUMsVUFBSixHQUFpQnZDLEtBQUt3QyxhQUF0QjtBQUNBRixZQUFJM0MsUUFBSixHQUFlSyxLQUFLeUMsV0FBcEI7QUFDQUgsWUFBSStELE1BQUosR0FBYXJHLEtBQUtzRyxTQUFMLEdBQWlCLEdBQWpCLEdBQXVCdEcsS0FBSzhGLFFBQXpDO0FBQ0F4RCxZQUFJbkMsS0FBSixHQUFZSCxLQUFLOEYsUUFBakI7QUFDQXhELFlBQUl6QixTQUFKLEdBQWdCYixLQUFLOEYsUUFBckI7QUFDQXhELFlBQUlWLE9BQUosR0FBYyxLQUFkO0FBQ0FVLFlBQUlwQyxVQUFKLEdBQWlCRixLQUFLNEYsU0FBdEI7QUFDQUcsY0FBTXJELElBQU4sQ0FBV0osR0FBWDtBQUNELE9BZkQ7QUFnQkEsYUFBT3lELEtBQVA7QUFDRDs7O2dDQUNZUSxJLEVBQU10RyxHLEVBQUswRCxFLEVBQUk7QUFDMUIsV0FBSzVGLEtBQUwsR0FBYSxLQUFLNkYsT0FBTCxDQUFhQyxRQUFiLEVBQWI7QUFDQSxVQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFJaEcsT0FBTztBQUNUQyxlQUFPLEtBQUtBLEtBREg7QUFFVHdFLG9CQUFZZ0UsS0FBS2hFLFVBRlI7QUFHVDVDLGtCQUFVNEcsS0FBSzVHLFFBSE47QUFJVFEsZUFBT0Y7QUFKRSxPQUFYO0FBTUEsV0FBSzJELE9BQUwsQ0FBYU0sV0FBYixDQUF5QnNDLFdBQXpCLENBQXFDMUksSUFBckMsRUFBMkNzRyxJQUEzQyxDQUFnRCxVQUFDaEIsR0FBRCxFQUFTO0FBQ3ZEckMsZ0JBQVFDLEdBQVIsQ0FBWW9DLEdBQVo7QUFDQSxZQUFJQSxJQUFJdEYsSUFBSixDQUFTdUcsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QlYsZ0JBQU1BLElBQU47QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJRyxNQUFNRixPQUFOLENBQWNVLFNBQWxCLEVBQTZCO0FBQzNCO0FBQ0Q7QUFDRjtBQUNEUixjQUFNdkQsTUFBTjtBQUNELE9BVkQ7QUFXRDs7O2dDQUNZO0FBQ1gsV0FBS2xDLFFBQUwsQ0FBYzBCLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzlCQSxhQUFLMUIsUUFBTCxDQUFjeUIsT0FBZCxDQUFzQixVQUFDb0MsQ0FBRCxFQUFPO0FBQzNCQSxZQUFFUCxPQUFGLEdBQVksS0FBWjtBQUNELFNBRkQ7QUFHQTVCLGFBQUt4QixXQUFMLEdBQW1CLEtBQW5CO0FBQ0F3QixhQUFLdkIsUUFBTCxHQUFnQixFQUFoQjtBQUNELE9BTkQ7QUFPRDs7OzZCQUNTO0FBQ1I7QUFDQSxXQUFLOEIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLckIsU0FBTCxHQUFpQixLQUFLMEUsT0FBTCxDQUFhc0IsVUFBYixDQUF3QmhHLFNBQXpDO0FBQ0EsV0FBS1IsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLYyxTQUFMO0FBQ0EsV0FBS2MsWUFBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7O3dDQUNvQjtBQUNuQixXQUFLN0IsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLYyxTQUFMO0FBQ0EsV0FBS2MsWUFBTCxDQUFrQixZQUFNO0FBQ3RCLHVCQUFLbUcsbUJBQUw7QUFDRCxPQUZEO0FBR0Q7Ozs7RUE3YytCLGVBQUtDLEk7O2tCQUFsQnZKLEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ291bnRlIGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJjYXJ0TGlzdFwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcIml0ZW1cIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJleHBpcmVcIjp7XCJjb21cIjpcImNvdW50ZU5vcm1hbFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvdW50XCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzb3VyY2VJZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uc291cmNlSWRcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmlzRGlzYWJsZWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmRpc2FibGVcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImNvdW50ZU5vcm1hbFwiOntcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmJ1eUNvdW50XCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnNvdXJjZUlkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zb3VyY2VJZFwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5kaXNhYmxlXCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjJcIn19O1xyXG4kZXZlbnRzID0ge1wiY291bnRlQ29sZFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDb2xkXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluQ29sZFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDb2xkXCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ29sZFwifSxcImNvdW50ZU5vcm1hbFwiOntcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDb2xkXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb3VudGVDb2xkOiBDb3VudGUsXG4gICAgICBjb3VudGVOb3JtYWw6IENvdW50ZSxcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdLFxuICAgICAgY2hlY2tlZExpc3Q6IFtdLFxuICAgICAgdGVtcENvbGRMaXN0OiBbXSxcbiAgICAgIHRlbXBOb3JtYWxMaXN0OiBbXSxcbiAgICAgIGNhcnRTdGF0dXM6IHt9LFxuICAgICAgY2FydExpc3Q6IFtdLFxuICAgICAgY29sZGxpc3Q6IFtdLFxuICAgICAgY29sZFRpdGxlOiAnJyxcbiAgICAgIGNvbGRDaGVja2VkOiBmYWxzZSxcbiAgICAgIHRlbXBDb2xkOiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgZmluYWxwcmljZTogMCxcbiAgICAgIGZyZWlnaHQ6IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICB2YWxpZGF0ZUNvdW50OiAwLFxuICAgICAgZXhwaXJlOiBbXSxcbiAgICAgIHRpbWVvdXQ6IHRydWUsXG4gICAgICB1c2VyTGV2ZWw6IDBcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAvLyB1c2VyTGV2ZWwgKCkge1xuICAgICAgLy8gICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAvLyAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIHRydWVcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYXNFeHBpcmUgKCkge1xuICAgICAgICBpZiAodGhpcy5leHBpcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdFRhcCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICAgIGlmICh0aGlzLmlzRWRpdCkge1xuICAgICAgICAgIHRoaXMuY2xlYXJMaXN0KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBsdXNDb2xkIChlKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBmYWxzZVxuICAgICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCAmJiB2YWwudG90YWxDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC5jb3VudCArIDFcbiAgICAgICAgICAgICAgICBpZiAodmFsLmNvdW50ID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbkNvbGQgKGUpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIHRoaXMudGltZW91dCA9IGZhbHNlXG4gICAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkICYmIHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLmNvdW50IC0gMVxuICAgICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfkuI3og73lho3lsJHllaYnKVxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAtMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXlDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgIH0sXG4gICAgICBibHVyQ29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICBpZiAoa2V5VmFsIDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsLnRvdGFsQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQgJiYga2V5VmFsID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsLnRvdGFsQ291bnQgPD0gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMFxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IGtleVZhbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghdmFsLmRpc2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgdmFsLmNvdW50IC0gdmFsLmluaXRDb3VudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWwuY291bnRcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0NhdGVnb3J5ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2F0ZWdvcnknXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VkaXQpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzRXhwaXJlKSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWNhcnQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI5riF56m65aSx5pWI5ZWG5ZOB77yM5YaN5o+Q5Lqk6K6i5Y2VJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOmAgOWHuue8lui+keeKtuaAgScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQ2hlY2sgKGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWVcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gIXZhbC5jaGVja2VkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChpdGVtLnRlbXBDb2xkLmxlbmd0aCA9PT0gaXRlbS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQWxsIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja0FsbCAoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDBcbiAgICAgICAgdmFyIGNoZWNrID0gMFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdG90YWwgKz0gaXRlbS5jb2xkbGlzdC5sZW5ndGhcbiAgICAgICAgICBjaGVjayArPSBpdGVtLnRlbXBDb2xkLmxlbmd0aFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbCwgY2hlY2spXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAodG90YWwgPT09IGNoZWNrKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjbGVhckV4cGlyZSAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICB0aGlzLmV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgIHRoaXMuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coaXRlbS50ZW1wQ29sZClcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouc291cmNlVHlwZSA9IHNvdXJjZS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBvYmouc291cmNlSWQgPSBzb3VyY2Uuc291cmNlSWRcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5ZWG5ZOBJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpO+8nycsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHRoYXQuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldENoZWNrZWQgKGFyciwgdmFsKSB7XG4gICAgICBpZiAoYXJyLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgYXJyLnB1c2godmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZih2YWwpLCAxKVxuICAgICAgfVxuICAgIH1cbiAgICBtYXhNb2RhbCAoY29udGVudCkge1xuICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogY29udGVudCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgIH0pXG4gICAgfVxuICAgIGRlbGV0ZURhdGEgKGpzb24sIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlTGlzdDogSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgLy8gX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZURhdGEgKGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2FydExpc3QgPSBbXVxuICAgICAgdGhpcy5leHBpcmUgPSBbXVxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZpbmFscHJpY2UgPSAwXG4gICAgICB0aGlzLmZyZWlnaHQgPSAwXG4gICAgICB0aGlzLmNhcnRTdGF0dXMgPSB7fVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jYXJ0U3RhdHVzLnRvdGFscHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy5kaXNjb3VudCA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgLy8g5rWL6K+V55So5oi36Lqr5Lu95Y+Y5YyWXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5yZXNldFVzZXJMZXZlbChkYXRhLm1lbWJlckhhc2gsIHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgICAgIF90aGlzLnVzZXJMZXZlbCA9IF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgICAgICB9KVxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoaXRlbS50aXRsZSA9PT0gJ+WGt+mTvumFjemAgScpIHtcbiAgICAgICAgICAgICAgb2JqLmljb25DbGFzcyA9ICdpY29uLW5ld19sbHBzJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnRpdGxlID09PSAn5bi46KeE6YWN6YCBJykge1xuICAgICAgICAgICAgICBvYmouaWNvbkNsYXNzID0gJ2ljb24tbmV3X2NncHMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSBfdGhpcy5pbml0Q2hpbGQoaXRlbS5zYWxlc1VuaXRzKVxuICAgICAgICAgICAgaWYgKG9iai5jb2xkbGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgb2JqLnNob3dUaXRsZSA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvYmouc2hvd1RpdGxlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY2FydExpc3QucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuaW5pdFBhZ2VEYXRhKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBmaWx0ZXJMaXN0IChwYXJlbnQpIHtcbiAgICAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgIHZhciB0ZW1wRXhwaXJlID0gW11cbiAgICAgIHRlbXBFeHBpcmUgPSBwYXJlbnQuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmtlZXBDb3VudCA8PSB0aGlzLnZhbGlkYXRlQ291bnQgfHwgIWl0ZW0uaXNBbGxvd1NhbGUgfHwgaXRlbS5idXlDb3VudCA+IGl0ZW0ua2VlcENvdW50XG4gICAgICB9KVxuICAgICAgdGVtcEV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IHRydWVcbiAgICAgICAgdGhpcy5leHBpcmUucHVzaChpdGVtKVxuICAgICAgfSlcbiAgICAgIHRlbXBBcnIgPSBwYXJlbnQuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmtlZXBDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCAmJiBpdGVtLmlzQWxsb3dTYWxlICYmIGl0ZW0uYnV5Q291bnQgPD0gaXRlbS5rZWVwQ291bnRcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGVtcEFyclxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHZhciB0ZW1wRXhwaXJlID0gdGhpcy5maWx0ZXJMaXN0KHBhcmVudClcbiAgICAgIHRlbXBFeHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGFkZENhcnREYXRhIChnb29kLCB2YWwsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogZ29vZC5zb3VyY2VUeXBlLFxuICAgICAgICBzb3VyY2VJZDogZ29vZC5zb3VyY2VJZCxcbiAgICAgICAgY291bnQ6IHZhbFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIF90aGlzLnRva2VuID0gX3RoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGNsZWFyTGlzdCAoKSB7XG4gICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIC8vIOWIpOaWreeUqOaIt21lbWJlckhhc2hcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLmlzRWRpdCA9IGZhbHNlXG4gICAgICB0aGlzLmNsZWFyTGlzdCgpXG4gICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcbiAgICAgIHRoaXMuaXNFZGl0ID0gZmFsc2VcbiAgICAgIHRoaXMuY2xlYXJMaXN0KClcbiAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKCgpID0+IHtcbiAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=