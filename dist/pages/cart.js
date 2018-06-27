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
          console.log(data.memberHash);
          _this.$parent.resetUserLevel(data.memberHash, _this8.token, function () {
            _this.userLevel = _this.$parent.globalData.userLevel;
          });
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
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
      console.log(this.$parent.globalData.userLevel);
      // 判断用户memberHash
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.isEdit = false;
      this.userLevel = this.$parent.globalData.userLevel;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsInRpbWVvdXQiLCJ1c2VyTGV2ZWwiLCJjb21wdXRlZCIsImxlbmd0aCIsImhhc0V4cGlyZSIsIm1ldGhvZHMiLCJlZGl0VGFwIiwiY2xlYXJMaXN0IiwicGx1c0NvbGQiLCJlIiwic291cmNlSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZm9yRWFjaCIsIml0ZW0iLCJ2YWwiLCJ0b3RhbENvdW50IiwiY291bnQiLCJtYXhNb2RhbCIsImFkZENhcnREYXRhIiwiaW5pdFBhZ2VEYXRhIiwiJGFwcGx5IiwibWluQ29sZCIsImtleUNvbGQiLCJrZXlWYWwiLCJibHVyQ29sZCIsImRpc2FibGUiLCJpbml0Q291bnQiLCJnb0RldGFpbCIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29DYXRlZ29yeSIsInN3aXRjaFRhYiIsImdvT3JkZXIiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJnb0FwcGx5VmlwIiwiY29sZENoZWNrIiwidmFsdWUiLCJjaGVja2VkIiwiZmlsdGVyIiwiY29sZEFsbCIsImluZGV4IiwiY2hlY2tBbGwiLCJ0b3RhbCIsImNoZWNrIiwiaSIsImNsZWFyRXhwaXJlIiwicmVzdWx0Iiwib2JqIiwic291cmNlVHlwZSIsInNhbGVzVW5pdFR5cGUiLCJzYWxlc1VuaXRJZCIsInB1c2giLCJkZWxldGVEYXRhIiwiZGVsZXRlVGFwIiwidGhhdCIsInNvdXJjZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWwiLCJhcnIiLCJpbmRleE9mIiwic3BsaWNlIiwianNvbiIsImNiIiwiJHBhcmVudCIsImdldFRva2VuIiwiX3RoaXMiLCJzb3VyY2VMaXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsIkh0dHBSZXF1ZXN0IiwiRGVsZXRlQ2FydEh0dHAiLCJ0aGVuIiwiZXJyb3IiLCJtaXNzVG9rZW4iLCJzaG93TG9hZGluZyIsIkdldENhcnRIdHRwIiwiaGlkZUxvYWRpbmciLCJ0b3RhbHByaWNlIiwicHJpY2UiLCJkaXNjb3VudCIsInJlZHVjdGlvbiIsIm1lbWJlclByaWNlIiwicGF5IiwibWVtYmVySGFzaCIsInJlc2V0VXNlckxldmVsIiwiZ2xvYmFsRGF0YSIsImNoaWxkT3JkZXJzIiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInNob3dUaXRsZSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJ0ZW1wQXJyIiwidGVtcEV4cGlyZSIsImtlZXBDb3VudCIsImlzQWxsb3dTYWxlIiwiYnV5Q291bnQiLCJjaGlsZCIsImZpbHRlckxpc3QiLCJwYXRoIiwiY292ZXIiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJBZGRDYXJ0SHR0cCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLEtBRGpCO0FB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Y0MsUUFBZCxDQUF1QlQsSUFBSXRGLElBQUosQ0FBU3VHLEtBQWhDLENBQWQ7QUFDRDtBQUNGO0FBQ0RQLGNBQU12RCxNQUFOO0FBQ0QsT0FWRDtBQVdEOzs7Z0NBQ1k7QUFDWCxXQUFLbEMsUUFBTCxDQUFjMEIsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDOUJBLGFBQUsxQixRQUFMLENBQWN5QixPQUFkLENBQXNCLFVBQUNvQyxDQUFELEVBQU87QUFDM0JBLFlBQUVQLE9BQUYsR0FBWSxLQUFaO0FBQ0QsU0FGRDtBQUdBNUIsYUFBS3hCLFdBQUwsR0FBbUIsS0FBbkI7QUFDQXdCLGFBQUt2QixRQUFMLEdBQWdCLEVBQWhCO0FBQ0QsT0FORDtBQU9EOzs7NkJBQ1M7QUFDUnNDLGNBQVFDLEdBQVIsQ0FBWSxLQUFLNEMsT0FBTCxDQUFhc0IsVUFBYixDQUF3QmhHLFNBQXBDO0FBQ0E7QUFDQSxXQUFLcUIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLN0IsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLUSxTQUFMLEdBQWlCLEtBQUswRSxPQUFMLENBQWFzQixVQUFiLENBQXdCaEcsU0FBekM7QUFDQSxXQUFLTSxTQUFMO0FBQ0EsV0FBS2MsWUFBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7O3dDQUNvQjtBQUNuQixXQUFLN0IsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLYyxTQUFMO0FBQ0EsV0FBS2MsWUFBTCxDQUFrQixZQUFNO0FBQ3RCLHVCQUFLbUcsbUJBQUw7QUFDRCxPQUZEO0FBR0Q7Ozs7RUEzYytCLGVBQUtDLEk7O2tCQUFsQnZKLEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ291bnRlIGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJjYXJ0TGlzdFwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcIml0ZW1cIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJleHBpcmVcIjp7XCJjb21cIjpcImNvdW50ZU5vcm1hbFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvdW50XCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzb3VyY2VJZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uc291cmNlSWRcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmlzRGlzYWJsZWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmRpc2FibGVcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImNvdW50ZU5vcm1hbFwiOntcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmJ1eUNvdW50XCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnNvdXJjZUlkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zb3VyY2VJZFwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5kaXNhYmxlXCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjJcIn19O1xyXG4kZXZlbnRzID0ge1wiY291bnRlQ29sZFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDb2xkXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluQ29sZFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDb2xkXCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ29sZFwifSxcImNvdW50ZU5vcm1hbFwiOntcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDb2xkXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb3VudGVDb2xkOiBDb3VudGUsXG4gICAgICBjb3VudGVOb3JtYWw6IENvdW50ZSxcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdLFxuICAgICAgY2hlY2tlZExpc3Q6IFtdLFxuICAgICAgdGVtcENvbGRMaXN0OiBbXSxcbiAgICAgIHRlbXBOb3JtYWxMaXN0OiBbXSxcbiAgICAgIGNhcnRTdGF0dXM6IHt9LFxuICAgICAgY2FydExpc3Q6IFtdLFxuICAgICAgY29sZGxpc3Q6IFtdLFxuICAgICAgY29sZFRpdGxlOiAnJyxcbiAgICAgIGNvbGRDaGVja2VkOiBmYWxzZSxcbiAgICAgIHRlbXBDb2xkOiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgZmluYWxwcmljZTogMCxcbiAgICAgIGZyZWlnaHQ6IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICB2YWxpZGF0ZUNvdW50OiAwLFxuICAgICAgZXhwaXJlOiBbXSxcbiAgICAgIHRpbWVvdXQ6IHRydWUsXG4gICAgICB1c2VyTGV2ZWw6IDBcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAvLyB1c2VyTGV2ZWwgKCkge1xuICAgICAgLy8gICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAvLyAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIHRydWVcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYXNFeHBpcmUgKCkge1xuICAgICAgICBpZiAodGhpcy5leHBpcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdFRhcCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICAgIGlmICh0aGlzLmlzRWRpdCkge1xuICAgICAgICAgIHRoaXMuY2xlYXJMaXN0KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBsdXNDb2xkIChlKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBmYWxzZVxuICAgICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCAmJiB2YWwudG90YWxDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC5jb3VudCArIDFcbiAgICAgICAgICAgICAgICBpZiAodmFsLmNvdW50ID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbkNvbGQgKGUpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIHRoaXMudGltZW91dCA9IGZhbHNlXG4gICAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkICYmIHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLmNvdW50IC0gMVxuICAgICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfkuI3og73lho3lsJHllaYnKVxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAtMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXlDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgIH0sXG4gICAgICBibHVyQ29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICBpZiAoa2V5VmFsIDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsLnRvdGFsQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQgJiYga2V5VmFsID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsLnRvdGFsQ291bnQgPD0gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMFxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IGtleVZhbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghdmFsLmRpc2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgdmFsLmNvdW50IC0gdmFsLmluaXRDb3VudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWwuY291bnRcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0NhdGVnb3J5ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2F0ZWdvcnknXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VkaXQpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzRXhwaXJlKSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWNhcnQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI5riF56m65aSx5pWI5ZWG5ZOB77yM5YaN5o+Q5Lqk6K6i5Y2VJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOmAgOWHuue8lui+keeKtuaAgScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQ2hlY2sgKGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWVcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gIXZhbC5jaGVja2VkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChpdGVtLnRlbXBDb2xkLmxlbmd0aCA9PT0gaXRlbS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQWxsIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja0FsbCAoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDBcbiAgICAgICAgdmFyIGNoZWNrID0gMFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdG90YWwgKz0gaXRlbS5jb2xkbGlzdC5sZW5ndGhcbiAgICAgICAgICBjaGVjayArPSBpdGVtLnRlbXBDb2xkLmxlbmd0aFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbCwgY2hlY2spXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAodG90YWwgPT09IGNoZWNrKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjbGVhckV4cGlyZSAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICB0aGlzLmV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgIHRoaXMuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coaXRlbS50ZW1wQ29sZClcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouc291cmNlVHlwZSA9IHNvdXJjZS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBvYmouc291cmNlSWQgPSBzb3VyY2Uuc291cmNlSWRcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5ZWG5ZOBJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpO+8nycsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHRoYXQuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldENoZWNrZWQgKGFyciwgdmFsKSB7XG4gICAgICBpZiAoYXJyLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgYXJyLnB1c2godmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZih2YWwpLCAxKVxuICAgICAgfVxuICAgIH1cbiAgICBtYXhNb2RhbCAoY29udGVudCkge1xuICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogY29udGVudCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgIH0pXG4gICAgfVxuICAgIGRlbGV0ZURhdGEgKGpzb24sIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlTGlzdDogSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZURhdGEgKGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2FydExpc3QgPSBbXVxuICAgICAgdGhpcy5leHBpcmUgPSBbXVxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZpbmFscHJpY2UgPSAwXG4gICAgICB0aGlzLmZyZWlnaHQgPSAwXG4gICAgICB0aGlzLmNhcnRTdGF0dXMgPSB7fVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jYXJ0U3RhdHVzLnRvdGFscHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy5kaXNjb3VudCA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgLy8g5rWL6K+V55So5oi36Lqr5Lu95Y+Y5YyWXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YS5tZW1iZXJIYXNoKVxuICAgICAgICAgIF90aGlzLiRwYXJlbnQucmVzZXRVc2VyTGV2ZWwoZGF0YS5tZW1iZXJIYXNoLCB0aGlzLnRva2VuLCAoKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy51c2VyTGV2ZWwgPSBfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICAgICAgfSlcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIGlmIChvYmouY29sZGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIG9iai5zaG93VGl0bGUgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb2JqLnNob3dUaXRsZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNhcnRMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFBhZ2VEYXRhKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBmaWx0ZXJMaXN0IChwYXJlbnQpIHtcbiAgICAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgIHZhciB0ZW1wRXhwaXJlID0gW11cbiAgICAgIHRlbXBFeHBpcmUgPSBwYXJlbnQuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmtlZXBDb3VudCA8PSB0aGlzLnZhbGlkYXRlQ291bnQgfHwgIWl0ZW0uaXNBbGxvd1NhbGUgfHwgaXRlbS5idXlDb3VudCA+IGl0ZW0ua2VlcENvdW50XG4gICAgICB9KVxuICAgICAgdGVtcEV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IHRydWVcbiAgICAgICAgdGhpcy5leHBpcmUucHVzaChpdGVtKVxuICAgICAgfSlcbiAgICAgIHRlbXBBcnIgPSBwYXJlbnQuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmtlZXBDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCAmJiBpdGVtLmlzQWxsb3dTYWxlICYmIGl0ZW0uYnV5Q291bnQgPD0gaXRlbS5rZWVwQ291bnRcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGVtcEFyclxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHZhciB0ZW1wRXhwaXJlID0gdGhpcy5maWx0ZXJMaXN0KHBhcmVudClcbiAgICAgIHRlbXBFeHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGFkZENhcnREYXRhIChnb29kLCB2YWwsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogZ29vZC5zb3VyY2VUeXBlLFxuICAgICAgICBzb3VyY2VJZDogZ29vZC5zb3VyY2VJZCxcbiAgICAgICAgY291bnQ6IHZhbFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gX3RoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGNsZWFyTGlzdCAoKSB7XG4gICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbClcbiAgICAgIC8vIOWIpOaWreeUqOaIt21lbWJlckhhc2hcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaXNFZGl0ID0gZmFsc2VcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLmNsZWFyTGlzdCgpXG4gICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcbiAgICAgIHRoaXMuaXNFZGl0ID0gZmFsc2VcbiAgICAgIHRoaXMuY2xlYXJMaXN0KClcbiAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKCgpID0+IHtcbiAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=