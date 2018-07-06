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
      var _this7 = this;

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
            _this.token = _this7.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'initPageData',
    value: function initPageData(cb) {
      var _this8 = this;

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
          _this.$parent.resetUserLevel(data.memberHash, _this8.token, function () {
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
            _this.token = _this8.$parent.getToken(res.data.error);
            _this.initPageData(cb);
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isLoading = false;
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'filterList',
    value: function filterList(parent) {
      var _this9 = this;

      var tempArr = [];
      var tempExpire = [];
      tempExpire = parent.filter(function (item) {
        return item.keepCount <= _this9.validateCount || !item.isAllowSale || item.buyCount > item.keepCount;
      });
      tempExpire.forEach(function (item) {
        item.disable = true;
        _this9.expire.push(item);
      });
      tempArr = parent.filter(function (item) {
        return item.keepCount > _this9.validateCount && item.isAllowSale && item.buyCount <= item.keepCount;
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
            _this.token = _this.$parent.getToken(res.data.error);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsInRpbWVvdXQiLCJ1c2VyTGV2ZWwiLCJjb21wdXRlZCIsImxlbmd0aCIsImhhc0V4cGlyZSIsIm1ldGhvZHMiLCJlZGl0VGFwIiwiY2xlYXJMaXN0IiwicGx1c0NvbGQiLCJlIiwic291cmNlSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZm9yRWFjaCIsIml0ZW0iLCJ2YWwiLCJ0b3RhbENvdW50IiwiY291bnQiLCJtYXhNb2RhbCIsImFkZENhcnREYXRhIiwiaW5pdFBhZ2VEYXRhIiwiJGFwcGx5IiwibWluQ29sZCIsImtleUNvbGQiLCJrZXlWYWwiLCJibHVyQ29sZCIsImRpc2FibGUiLCJpbml0Q291bnQiLCJnb0RldGFpbCIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29DYXRlZ29yeSIsInN3aXRjaFRhYiIsImdvT3JkZXIiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJnb0FwcGx5VmlwIiwiY29sZENoZWNrIiwidmFsdWUiLCJjaGVja2VkIiwiZmlsdGVyIiwiY29sZEFsbCIsImluZGV4IiwiY2hlY2tBbGwiLCJ0b3RhbCIsImNoZWNrIiwiaSIsImNsZWFyRXhwaXJlIiwicmVzdWx0Iiwib2JqIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsInB1c2giLCJkZWxldGVEYXRhIiwiZGVsZXRlVGFwIiwidGhhdCIsInNvdXJjZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWwiLCJhcnIiLCJpbmRleE9mIiwic3BsaWNlIiwianNvbiIsImNiIiwiJHBhcmVudCIsImdldFRva2VuIiwiX3RoaXMiLCJzb3VyY2VMaXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsIkh0dHBSZXF1ZXN0IiwiRGVsZXRlQ2FydEh0dHAiLCJ0aGVuIiwiZXJyb3IiLCJtaXNzVG9rZW4iLCJzaG93TG9hZGluZyIsIkdldENhcnRIdHRwIiwiaGlkZUxvYWRpbmciLCJ0b3RhbHByaWNlIiwicHJpY2UiLCJkaXNjb3VudCIsInJlZHVjdGlvbiIsIm1lbWJlclByaWNlIiwicGF5IiwicmVzZXRVc2VyTGV2ZWwiLCJtZW1iZXJIYXNoIiwiZ2xvYmFsRGF0YSIsImNoaWxkT3JkZXJzIiwiaWNvbkNsYXNzIiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInNob3dUaXRsZSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJ0ZW1wQXJyIiwidGVtcEV4cGlyZSIsImtlZXBDb3VudCIsImlzQWxsb3dTYWxlIiwiYnV5Q291bnQiLCJjaGlsZCIsImZpbHRlckxpc3QiLCJwYXRoIiwiY292ZXIiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJBZGRDYXJ0SHR0cCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJB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S0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QlYsZ0JBQU1BLElBQU47QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJRyxNQUFNRixPQUFOLENBQWNVLFNBQWxCLEVBQTZCO0FBQzNCUixrQkFBTS9GLEtBQU4sR0FBYytGLE1BQU1GLE9BQU4sQ0FBY0MsUUFBZCxDQUF1QlQsSUFBSXRGLElBQUosQ0FBU3VHLEtBQWhDLENBQWQ7QUFDRDtBQUNGO0FBQ0RQLGNBQU12RCxNQUFOO0FBQ0QsT0FWRDtBQVdEOzs7Z0NBQ1k7QUFDWCxXQUFLbEMsUUFBTCxDQUFjMEIsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDOUJBLGFBQUsxQixRQUFMLENBQWN5QixPQUFkLENBQXNCLFVBQUNvQyxDQUFELEVBQU87QUFDM0JBLFlBQUVQLE9BQUYsR0FBWSxLQUFaO0FBQ0QsU0FGRDtBQUdBNUIsYUFBS3hCLFdBQUwsR0FBbUIsS0FBbkI7QUFDQXdCLGFBQUt2QixRQUFMLEdBQWdCLEVBQWhCO0FBQ0QsT0FORDtBQU9EOzs7NkJBQ1M7QUFDUjtBQUNBLFdBQUs4QixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtyQixTQUFMLEdBQWlCLEtBQUswRSxPQUFMLENBQWFzQixVQUFiLENBQXdCaEcsU0FBekM7QUFDQSxXQUFLUixNQUFMLEdBQWMsS0FBZDtBQUNBLFdBQUtjLFNBQUw7QUFDQSxXQUFLYyxZQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNEOzs7d0NBQ29CO0FBQ25CLFdBQUs3QixNQUFMLEdBQWMsS0FBZDtBQUNBLFdBQUtjLFNBQUw7QUFDQSxXQUFLYyxZQUFMLENBQWtCLFlBQU07QUFDdEIsdUJBQUtvRyxtQkFBTDtBQUNELE9BRkQ7QUFHRDs7OztFQTljK0IsZUFBS0MsSTs7a0JBQWxCeEosSSIsImZpbGUiOiJjYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb3VudGUgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcImNhcnRMaXN0XCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9LFwiaXRlbVwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcImV4cGlyZVwiOntcImNvbVwiOlwiY291bnRlTm9ybWFsXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiY291bnRlQ29sZFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY291bnRcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnNvdXJjZUlkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zb3VyY2VJZFwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aXNEaXNhYmxlZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uZGlzYWJsZVwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiY291bnRlTm9ybWFsXCI6e1widi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uYnV5Q291bnRcIixcImZvclwiOlwiZXhwaXJlXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c291cmNlSWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLnNvdXJjZUlkXCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmlzRGlzYWJsZWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmRpc2FibGVcIixcImZvclwiOlwiZXhwaXJlXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiMlwifX07XHJcbiRldmVudHMgPSB7XCJjb3VudGVDb2xkXCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NvbGRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW5Db2xkXCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNvbGRcIixcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDb2xkXCJ9LFwiY291bnRlTm9ybWFsXCI6e1widi1vbjpibHVyRWRpdFwiOlwiYmx1ckNvbGRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGNvdW50ZUNvbGQ6IENvdW50ZSxcbiAgICAgIGNvdW50ZU5vcm1hbDogQ291bnRlLFxuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGNhcnRjb3VudDogW10sXG4gICAgICBjaGVja2VkTGlzdDogW10sXG4gICAgICB0ZW1wQ29sZExpc3Q6IFtdLFxuICAgICAgdGVtcE5vcm1hbExpc3Q6IFtdLFxuICAgICAgY2FydFN0YXR1czoge30sXG4gICAgICBjYXJ0TGlzdDogW10sXG4gICAgICBjb2xkbGlzdDogW10sXG4gICAgICBjb2xkVGl0bGU6ICcnLFxuICAgICAgY29sZENoZWNrZWQ6IGZhbHNlLFxuICAgICAgdGVtcENvbGQ6IFtdLFxuICAgICAgaXNFZGl0OiBmYWxzZSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBmaW5hbHByaWNlOiAwLFxuICAgICAgZnJlaWdodDogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlQ291bnQ6IDAsXG4gICAgICBleHBpcmU6IFtdLFxuICAgICAgdGltZW91dDogdHJ1ZSxcbiAgICAgIHVzZXJMZXZlbDogMFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIC8vIHVzZXJMZXZlbCAoKSB7XG4gICAgICAvLyAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgIC8vICAgICByZXR1cm4gZmFsc2VcbiAgICAgIC8vICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgIC8vICAgICByZXR1cm4gdHJ1ZVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc0V4cGlyZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLmV4cGlyZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0VGFwICgpIHtcbiAgICAgICAgdGhpcy5pc0VkaXQgPSAhdGhpcy5pc0VkaXRcbiAgICAgICAgaWYgKHRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgdGhpcy5jbGVhckxpc3QoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGx1c0NvbGQgKGUpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIHRoaXMudGltZW91dCA9IGZhbHNlXG4gICAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkICYmIHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLmNvdW50ICsgMVxuICAgICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPiB2YWwudG90YWxDb3VudCkge1xuICAgICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWluQ29sZCAoZSkge1xuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgdGhpcy50aW1lb3V0ID0gZmFsc2VcbiAgICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQgJiYgdmFsLnRvdGFsQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwuY291bnQgLSAxXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+S4jeiDveWGjeWwkeWVpicpXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIC0xLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGtleUNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgfSxcbiAgICAgIGJsdXJDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgIGlmIChrZXlWYWwgPD0gMCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwudG90YWxDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCAmJiBrZXlWYWwgPiB2YWwudG90YWxDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwudG90YWxDb3VudCA8PSB0aGlzLnZhbGlkYXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAwXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0ga2V5VmFsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCF2YWwuZGlzYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCB2YWwuY291bnQgLSB2YWwuaW5pdENvdW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbC5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ2F0ZWdvcnkgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb09yZGVyICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRWRpdCkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXNFeHBpcmUpIHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfor7flhYjmuIXnqbrlpLHmlYjllYblk4HvvIzlho3mj5DkuqTorqLljZUnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI6YCA5Ye657yW6L6R54q25oCBJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGRDaGVjayAoZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSAhdmFsLmNoZWNrZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGl0ZW0udGVtcENvbGQubGVuZ3RoID09PSBpdGVtLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGRBbGwgKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZC5sZW5ndGggPT09IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSBbXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3RcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoZWNrQWxsICgpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMFxuICAgICAgICB2YXIgY2hlY2sgPSAwXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICB0b3RhbCArPSBpdGVtLmNvbGRsaXN0Lmxlbmd0aFxuICAgICAgICAgIGNoZWNrICs9IGl0ZW0udGVtcENvbGQubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHRvdGFsLCBjaGVjaylcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmICh0b3RhbCA9PT0gY2hlY2spIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsZWFyRXhwaXJlICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHRoaXMuZXhwaXJlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgICByZXN1bHQucHVzaChvYmopXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgdGhpcy5kZWxldGVEYXRhKHJlc3VsdCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZGVsZXRlVGFwICgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtLnRlbXBDb2xkKVxuICAgICAgICAgIGl0ZW0udGVtcENvbGQuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5zb3VyY2VUeXBlID0gc291cmNlLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIG9iai5zb3VyY2VJZCA9IHNvdXJjZS5zb3VyY2VJZFxuICAgICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nllYblk4EnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWxldGVEYXRhKHJlc3VsdCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhhdC5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2hlY2tlZCAoYXJyLCB2YWwpIHtcbiAgICAgIGlmIChhcnIuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICBhcnIucHVzaCh2YWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIuc3BsaWNlKGFyci5pbmRleE9mKHZhbCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIG1heE1vZGFsIChjb250ZW50KSB7XG4gICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiBjb250ZW50LFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlRGF0YSAoanNvbiwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VMaXN0OiBKU09OLnN0cmluZ2lmeShqc29uKVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUNhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlRGF0YSAoY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5jYXJ0TGlzdCA9IFtdXG4gICAgICB0aGlzLmV4cGlyZSA9IFtdXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHRoaXMuZmluYWxwcmljZSA9IDBcbiAgICAgIHRoaXMuZnJlaWdodCA9IDBcbiAgICAgIHRoaXMuY2FydFN0YXR1cyA9IHt9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLmNhcnRTdGF0dXMudG90YWxwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICBfdGhpcy5jYXJ0U3RhdHVzLmRpc2NvdW50ID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5jYXJ0U3RhdHVzLm1lbWJlclByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmZpbmFscHJpY2UgPSBkYXRhLnBheVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICAgICAgX3RoaXMudXNlckxldmVsID0gX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgICAgIH0pXG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChpdGVtLnRpdGxlID09PSAn5Ya36ZO+6YWN6YCBJykge1xuICAgICAgICAgICAgICBvYmouaWNvbkNsYXNzID0gJ2ljb24tbmV3X2xscHMnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udGl0bGUgPT09ICfluLjop4TphY3pgIEnKSB7XG4gICAgICAgICAgICAgIG9iai5pY29uQ2xhc3MgPSAnaWNvbi1uZXdfY2dwcydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IF90aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBpZiAob2JqLmNvbGRsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICBvYmouc2hvd1RpdGxlID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9iai5zaG93VGl0bGUgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jYXJ0TGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRQYWdlRGF0YShjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZmlsdGVyTGlzdCAocGFyZW50KSB7XG4gICAgICB2YXIgdGVtcEFyciA9IFtdXG4gICAgICB2YXIgdGVtcEV4cGlyZSA9IFtdXG4gICAgICB0ZW1wRXhwaXJlID0gcGFyZW50LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5rZWVwQ291bnQgPD0gdGhpcy52YWxpZGF0ZUNvdW50IHx8ICFpdGVtLmlzQWxsb3dTYWxlIHx8IGl0ZW0uYnV5Q291bnQgPiBpdGVtLmtlZXBDb3VudFxuICAgICAgfSlcbiAgICAgIHRlbXBFeHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmRpc2FibGUgPSB0cnVlXG4gICAgICAgIHRoaXMuZXhwaXJlLnB1c2goaXRlbSlcbiAgICAgIH0pXG4gICAgICB0ZW1wQXJyID0gcGFyZW50LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5rZWVwQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQgJiYgaXRlbS5pc0FsbG93U2FsZSAmJiBpdGVtLmJ1eUNvdW50IDw9IGl0ZW0ua2VlcENvdW50XG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRlbXBBcnJcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICB2YXIgdGVtcEV4cGlyZSA9IHRoaXMuZmlsdGVyTGlzdChwYXJlbnQpXG4gICAgICB0ZW1wRXhwaXJlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmluaXRDb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoZ29vZCwgdmFsLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IGdvb2Quc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGdvb2Quc291cmNlSWQsXG4gICAgICAgIGNvdW50OiB2YWxcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IF90aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBjbGVhckxpc3QgKCkge1xuICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgIGkuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICBpdGVtLnRlbXBDb2xkID0gW11cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAvLyDliKTmlq3nlKjmiLdtZW1iZXJIYXNoXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5pc0VkaXQgPSBmYWxzZVxuICAgICAgdGhpcy5jbGVhckxpc3QoKVxuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XG4gICAgICB0aGlzLmlzRWRpdCA9IGZhbHNlXG4gICAgICB0aGlzLmNsZWFyTGlzdCgpXG4gICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19