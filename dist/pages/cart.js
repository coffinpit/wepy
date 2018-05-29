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
    }, _this2.$repeat = { "cartList": { "com": "counteCold", "props": "" }, "item": { "com": "counteCold", "props": "" }, "expire": { "com": "counteCold", "props": "" } }, _this2.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.buyCount", "for": "expire", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:sourceId.sync": { "value": "item.sourceId", "for": "expire", "item": "item", "index": "index", "key": "index" }, "v-bind:isDisabled.sync": { "value": "item.disable", "for": "expire", "item": "item", "index": "index", "key": "index" } }, "defect": { "type": "2" } }, _this2.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold", "v-on:blurEdit": "blurCold" } }, _this2.components = {
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
      timeout: true
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
          var sourceId = e.currentTarget.dataset.id;
          this.cartList.forEach(function (item) {
            item.coldlist.forEach(function (val) {
              if (val.sourceId === sourceId && val.totalCount > _this3.validateCount) {
                val.count++;
                _this3.timeout = false;
                if (val.count > val.totalCount) {
                  val.count = val.totalCount;
                  _this3.maxModal('数量已达上限');
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
          var sourceId = e.currentTarget.dataset.id;
          this.cartList.forEach(function (item) {
            item.coldlist.forEach(function (val) {
              if (val.sourceId === sourceId && val.totalCount > _this4.validateCount) {
                val.count--;
                _this4.timeout = false;
                if (val.count < 1) {
                  val.count = 1;
                  _this4.maxModal('不能再少啦');
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
        _this.isLoading = false;
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.cartStatus.totalprice = data.price;
          _this.cartStatus.discount = data.reduction;
          _this.cartStatus.memberPrice = data.memberPrice;
          _this.finalprice = data.finalPrice;
          _this.freight = data.freight;
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
      console.log(data);
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
      this.clearList();
      this.initPageData();
      this.$apply();
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsInRpbWVvdXQiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibGVuZ3RoIiwiaGFzRXhwaXJlIiwibWV0aG9kcyIsImVkaXRUYXAiLCJjbGVhckxpc3QiLCJwbHVzQ29sZCIsImUiLCJzb3VyY2VJZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJmb3JFYWNoIiwiaXRlbSIsInZhbCIsInRvdGFsQ291bnQiLCJjb3VudCIsIm1heE1vZGFsIiwiYWRkQ2FydERhdGEiLCJpbml0UGFnZURhdGEiLCIkYXBwbHkiLCJtaW5Db2xkIiwia2V5Q29sZCIsImtleVZhbCIsImJsdXJDb2xkIiwiZGlzYWJsZSIsImluaXRDb3VudCIsImdvRGV0YWlsIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImdvQXBwbHlWaXAiLCJjb2xkQ2hlY2siLCJ2YWx1ZSIsImNoZWNrZWQiLCJmaWx0ZXIiLCJjb2xkQWxsIiwiaW5kZXgiLCJjaGVja0FsbCIsInRvdGFsIiwiY2hlY2siLCJpIiwiY2xlYXJFeHBpcmUiLCJyZXN1bHQiLCJvYmoiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNhbGVzVW5pdElkIiwicHVzaCIsImRlbGV0ZURhdGEiLCJkZWxldGVUYXAiLCJ0aGF0Iiwic291cmNlIiwiZHVyYXRpb24iLCJpbWFnZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsImFyciIsImluZGV4T2YiLCJzcGxpY2UiLCJqc29uIiwiY2IiLCJnZXRUb2tlbiIsIl90aGlzIiwic291cmNlTGlzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJIdHRwUmVxdWVzdCIsIkRlbGV0ZUNhcnRIdHRwIiwidGhlbiIsImVycm9yIiwibWlzc1Rva2VuIiwic2hvd0xvYWRpbmciLCJHZXRDYXJ0SHR0cCIsInNob3dTdWNjZXNzIiwidG90YWxwcmljZSIsInByaWNlIiwiZGlzY291bnQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJQcmljZSIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJzaG93VGl0bGUiLCJjYXRjaCIsInNob3dGYWlsIiwicGFyZW50IiwidGVtcEFyciIsInRlbXBFeHBpcmUiLCJrZWVwQ291bnQiLCJpc0FsbG93U2FsZSIsImJ1eUNvdW50IiwiY2hpbGQiLCJmaWx0ZXJMaXN0IiwicGF0aCIsImNvdmVyIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJnb29kIiwiQWRkQ2FydEh0dHAiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLE9BQU0sWUFBUCxFQUFvQixTQUFRLEVBQTVCLEVBQVosRUFBNEMsUUFB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IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb3VudGUgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcImNhcnRMaXN0XCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9LFwiaXRlbVwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcImV4cGlyZVwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmJ1eUNvdW50XCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnNvdXJjZUlkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zb3VyY2VJZFwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5kaXNhYmxlXCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjJcIn19O1xyXG4kZXZlbnRzID0ge1wiY291bnRlQ29sZFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDb2xkXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluQ29sZFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDb2xkXCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ29sZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY291bnRlQ29sZDogQ291bnRlLFxuICAgICAgY291bnRlTm9ybWFsOiBDb3VudGUsXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2FydGNvdW50OiBbXSxcbiAgICAgIGNoZWNrZWRMaXN0OiBbXSxcbiAgICAgIHRlbXBDb2xkTGlzdDogW10sXG4gICAgICB0ZW1wTm9ybWFsTGlzdDogW10sXG4gICAgICBjYXJ0U3RhdHVzOiB7fSxcbiAgICAgIGNhcnRMaXN0OiBbXSxcbiAgICAgIGNvbGRsaXN0OiBbXSxcbiAgICAgIGNvbGRUaXRsZTogJycsXG4gICAgICBjb2xkQ2hlY2tlZDogZmFsc2UsXG4gICAgICB0ZW1wQ29sZDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIGZpbmFscHJpY2U6IDAsXG4gICAgICBmcmVpZ2h0OiAwLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgdmFsaWRhdGVDb3VudDogMCxcbiAgICAgIGV4cGlyZTogW10sXG4gICAgICB0aW1lb3V0OiB0cnVlXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzRXhwaXJlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwaXJlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRUYXAgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgICBpZiAodGhpcy5pc0VkaXQpIHtcbiAgICAgICAgICB0aGlzLmNsZWFyTGlzdCgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwbHVzQ29sZCAoZSkge1xuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkICYmIHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ICsrXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICBpZiAodmFsLmNvdW50ID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbkNvbGQgKGUpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCAmJiB2YWwudG90YWxDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCAtLVxuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+S4jeiDveWGjeWwkeWVpicpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIC0xLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGtleUNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgfSxcbiAgICAgIGJsdXJDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgIGlmIChrZXlWYWwgPD0gMCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwudG90YWxDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCAmJiBrZXlWYWwgPiB2YWwudG90YWxDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwudG90YWxDb3VudCA8PSB0aGlzLnZhbGlkYXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAwXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0ga2V5VmFsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCF2YWwuZGlzYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCB2YWwuY291bnQgLSB2YWwuaW5pdENvdW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbC5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ2F0ZWdvcnkgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb09yZGVyICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRWRpdCkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXNFeHBpcmUpIHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfor7flhYjmuIXnqbrlpLHmlYjllYblk4HvvIzlho3mj5DkuqTorqLljZUnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI6YCA5Ye657yW6L6R54q25oCBJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGRDaGVjayAoZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSAhdmFsLmNoZWNrZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGl0ZW0udGVtcENvbGQubGVuZ3RoID09PSBpdGVtLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGRBbGwgKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZC5sZW5ndGggPT09IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSBbXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3RcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoZWNrQWxsICgpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMFxuICAgICAgICB2YXIgY2hlY2sgPSAwXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICB0b3RhbCArPSBpdGVtLmNvbGRsaXN0Lmxlbmd0aFxuICAgICAgICAgIGNoZWNrICs9IGl0ZW0udGVtcENvbGQubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHRvdGFsLCBjaGVjaylcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmICh0b3RhbCA9PT0gY2hlY2spIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsZWFyRXhwaXJlICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHRoaXMuZXhwaXJlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgICByZXN1bHQucHVzaChvYmopXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgdGhpcy5kZWxldGVEYXRhKHJlc3VsdCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZGVsZXRlVGFwICgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtLnRlbXBDb2xkKVxuICAgICAgICAgIGl0ZW0udGVtcENvbGQuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5zb3VyY2VUeXBlID0gc291cmNlLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIG9iai5zb3VyY2VJZCA9IHNvdXJjZS5zb3VyY2VJZFxuICAgICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nllYblk4EnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWxldGVEYXRhKHJlc3VsdCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhhdC5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2hlY2tlZCAoYXJyLCB2YWwpIHtcbiAgICAgIGlmIChhcnIuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICBhcnIucHVzaCh2YWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIuc3BsaWNlKGFyci5pbmRleE9mKHZhbCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIG1heE1vZGFsIChjb250ZW50KSB7XG4gICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiBjb250ZW50LFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlRGF0YSAoanNvbiwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VMaXN0OiBKU09OLnN0cmluZ2lmeShqc29uKVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUNhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlRGF0YSAoY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5jYXJ0TGlzdCA9IFtdXG4gICAgICB0aGlzLmV4cGlyZSA9IFtdXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHRoaXMuZmluYWxwcmljZSA9IDBcbiAgICAgIHRoaXMuZnJlaWdodCA9IDBcbiAgICAgIHRoaXMuY2FydFN0YXR1cyA9IHt9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy50b3RhbHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmNhcnRTdGF0dXMuZGlzY291bnQgPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmNhcnRTdGF0dXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIGlmIChvYmouY29sZGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIG9iai5zaG93VGl0bGUgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb2JqLnNob3dUaXRsZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNhcnRMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFBhZ2VEYXRhKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGZpbHRlckxpc3QgKHBhcmVudCkge1xuICAgICAgdmFyIHRlbXBBcnIgPSBbXVxuICAgICAgdmFyIHRlbXBFeHBpcmUgPSBbXVxuICAgICAgdGVtcEV4cGlyZSA9IHBhcmVudC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ua2VlcENvdW50IDw9IHRoaXMudmFsaWRhdGVDb3VudCB8fCAhaXRlbS5pc0FsbG93U2FsZSB8fCBpdGVtLmJ1eUNvdW50ID4gaXRlbS5rZWVwQ291bnRcbiAgICAgIH0pXG4gICAgICB0ZW1wRXhwaXJlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5kaXNhYmxlID0gdHJ1ZVxuICAgICAgICB0aGlzLmV4cGlyZS5wdXNoKGl0ZW0pXG4gICAgICB9KVxuICAgICAgdGVtcEFyciA9IHBhcmVudC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ua2VlcENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50ICYmIGl0ZW0uaXNBbGxvd1NhbGUgJiYgaXRlbS5idXlDb3VudCA8PSBpdGVtLmtlZXBDb3VudFxuICAgICAgfSlcbiAgICAgIHJldHVybiB0ZW1wQXJyXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgdmFyIHRlbXBFeHBpcmUgPSB0aGlzLmZpbHRlckxpc3QocGFyZW50KVxuICAgICAgdGVtcEV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGdvb2QsIHZhbCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiBnb29kLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiBnb29kLnNvdXJjZUlkLFxuICAgICAgICBjb3VudDogdmFsXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gX3RoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGNsZWFyTGlzdCAoKSB7XG4gICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbClcbiAgICAgIC8vIOWIpOaWreeUqOaIt21lbWJlckhhc2hcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaXNFZGl0ID0gZmFsc2VcbiAgICAgIHRoaXMuY2xlYXJMaXN0KClcbiAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==