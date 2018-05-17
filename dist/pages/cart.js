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
      expire: []
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
      },
      plusCold: function plusCold(e) {
        var _this3 = this;

        var sourceId = e.currentTarget.dataset.id;
        this.cartList.forEach(function (item) {
          item.coldlist.forEach(function (val) {
            if (val.sourceId === sourceId && val.totalCount > _this3.validateCount) {
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
            if (val.sourceId === sourceId && val.totalCount > _this4.validateCount) {
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
      var _this7 = this;

      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.cartList = [];
      this.expire = [];
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
          _this7.cartStatus.totalprice = data.price;
          _this7.cartStatus.discount = data.reduction;
          _this7.cartStatus.memberPrice = data.memberPrice;
          _this7.finalprice = data.finalPrice;
          _this7.freight = data.freight;
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.freight = item.freight;
            obj.coldChecked = false;
            obj.tempCold = [];
            obj.coldlist = _this7.initChild(item.salesUnits);
            if (obj.coldlist.length === 0) {
              obj.showTitle = false;
            } else {
              obj.showTitle = true;
            }
            _this.cartList.push(obj);
            _this.$apply();
          });
          console.log(_this7.cartList);
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
      var _this9 = this;

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
        }
        _this9.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsImNvbXB1dGVkIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJsZW5ndGgiLCJoYXNFeHBpcmUiLCJtZXRob2RzIiwiZWRpdFRhcCIsInBsdXNDb2xkIiwiZSIsInNvdXJjZUlkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsImZvckVhY2giLCJpdGVtIiwidmFsIiwidG90YWxDb3VudCIsImNvdW50IiwibWF4TW9kYWwiLCJhZGRDYXJ0RGF0YSIsImluaXRQYWdlRGF0YSIsIiRhcHBseSIsIm1pbkNvbGQiLCJrZXlDb2xkIiwia2V5VmFsIiwiYmx1ckNvbGQiLCJkaXNhYmxlIiwiaW5pdENvdW50IiwiZ29EZXRhaWwiLCJjb25zb2xlIiwibG9nIiwibmF2aWdhdGVUbyIsInVybCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJnb09yZGVyIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZ29BcHBseVZpcCIsImNvbGRDaGVjayIsInZhbHVlIiwiY2hlY2tlZCIsImZpbHRlciIsImNvbGRBbGwiLCJpbmRleCIsImNoZWNrQWxsIiwidG90YWwiLCJjaGVjayIsImkiLCJjbGVhckV4cGlyZSIsInJlc3VsdCIsIm9iaiIsInNvdXJjZVR5cGUiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJwdXNoIiwiZGVsZXRlRGF0YSIsImRlbGV0ZVRhcCIsInRoYXQiLCJzb3VyY2UiLCJkdXJhdGlvbiIsImltYWdlIiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2VsIiwiYXJyIiwiaW5kZXhPZiIsInNwbGljZSIsImpzb24iLCJjYiIsInNvdXJjZUxpc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiSHR0cFJlcXVlc3QiLCJEZWxldGVDYXJ0SHR0cCIsInRoZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0Q2FydEh0dHAiLCJlcnJvciIsInNob3dTdWNjZXNzIiwidG90YWxwcmljZSIsInByaWNlIiwiZGlzY291bnQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJQcmljZSIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJzaG93VGl0bGUiLCJzaG93RmFpbCIsImNhdGNoIiwicGFyZW50IiwidGVtcEFyciIsInRlbXBFeHBpcmUiLCJrZWVwQ291bnQiLCJpc0FsbG93U2FsZSIsImJ1eUNvdW50IiwiY2hpbGQiLCJmaWx0ZXJMaXN0IiwicGF0aCIsImNvdmVyIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJnb29kIiwiQWRkQ2FydEh0dHAiLCJnZXRUb2tlbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBWixFQUE0QyxRQUFPLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIs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c0csS0FBS3RHLFFBSE47QUFJVFEsZUFBT0Y7QUFKRSxPQUFYO0FBTUFjLGNBQVFDLEdBQVIsQ0FBWWxELElBQVo7QUFDQSxXQUFLcUIsT0FBTCxDQUFhNEUsV0FBYixDQUF5Qm1DLFdBQXpCLENBQXFDcEksSUFBckMsRUFBMkNtRyxJQUEzQyxDQUFnRCxVQUFDYixHQUFELEVBQVM7QUFDdkRyQyxnQkFBUUMsR0FBUixDQUFZb0MsR0FBWjtBQUNBLFlBQUlBLElBQUl0RixJQUFKLENBQVN1RyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCVixnQkFBTUEsSUFBTjtBQUNEO0FBQ0QsZUFBS3BELE1BQUw7QUFDRCxPQU5EO0FBT0Q7Ozs2QkFDUztBQUNSLFdBQUt4QyxLQUFMLEdBQWEsS0FBS29CLE9BQUwsQ0FBYWdILFFBQWIsRUFBYjtBQUNBcEYsY0FBUUMsR0FBUixDQUFZLEtBQUs3QixPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLFNBQXBDO0FBQ0E7QUFDQSxXQUFLcUIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRCxZQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNEOzs7O0VBalorQixlQUFLNkYsSTs7a0JBQWxCaEosSSIsImZpbGUiOiJjYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb3VudGUgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcImNhcnRMaXN0XCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9LFwiaXRlbVwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcImV4cGlyZVwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmJ1eUNvdW50XCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnNvdXJjZUlkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zb3VyY2VJZFwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5kaXNhYmxlXCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjJcIn19O1xyXG4kZXZlbnRzID0ge1wiY291bnRlQ29sZFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDb2xkXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluQ29sZFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDb2xkXCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ29sZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY291bnRlQ29sZDogQ291bnRlLFxuICAgICAgY291bnRlTm9ybWFsOiBDb3VudGUsXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2FydGNvdW50OiBbXSxcbiAgICAgIGNoZWNrZWRMaXN0OiBbXSxcbiAgICAgIHRlbXBDb2xkTGlzdDogW10sXG4gICAgICB0ZW1wTm9ybWFsTGlzdDogW10sXG4gICAgICBjYXJ0U3RhdHVzOiB7fSxcbiAgICAgIGNhcnRMaXN0OiBbXSxcbiAgICAgIGNvbGRsaXN0OiBbXSxcbiAgICAgIGNvbGRUaXRsZTogJycsXG4gICAgICBjb2xkQ2hlY2tlZDogZmFsc2UsXG4gICAgICB0ZW1wQ29sZDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIGZpbmFscHJpY2U6IDAsXG4gICAgICBmcmVpZ2h0OiAwLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgdmFsaWRhdGVDb3VudDogMCxcbiAgICAgIGV4cGlyZTogW11cbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYXNFeHBpcmUgKCkge1xuICAgICAgICBpZiAodGhpcy5leHBpcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdFRhcCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICB9LFxuICAgICAgcGx1c0NvbGQgKGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkICYmIHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgIHZhbC5jb3VudCArK1xuICAgICAgICAgICAgICBpZiAodmFsLmNvdW50ID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIG1pbkNvbGQgKGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkICYmIHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgIHZhbC5jb3VudCAtLVxuICAgICAgICAgICAgICBpZiAodmFsLmNvdW50IDwgMSkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfkuI3og73lho3lsJHllaYnKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAtMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAga2V5Q29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICB9LFxuICAgICAgYmx1ckNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQpIHtcbiAgICAgICAgICAgICAgaWYgKGtleVZhbCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50ICYmIGtleVZhbCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbC50b3RhbENvdW50IDw9IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDBcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSBrZXlWYWxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIXZhbC5kaXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIHZhbC5jb3VudCAtIHZhbC5pbml0Q291bnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhc0V4cGlyZSkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9wYXljYXJ0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOa4heepuuWkseaViOWVhuWTge+8jOWGjeaPkOS6pOiuouWNlScsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flhYjpgIDlh7rnvJbovpHnirbmgIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sZENoZWNrIChlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9ICF2YWwuY2hlY2tlZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IGl0ZW0uY29sZGxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoaXRlbS50ZW1wQ29sZC5sZW5ndGggPT09IGl0ZW0uY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sZEFsbCAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkLmxlbmd0aCA9PT0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IFtdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hlY2tBbGwgKCkge1xuICAgICAgICB2YXIgdG90YWwgPSAwXG4gICAgICAgIHZhciBjaGVjayA9IDBcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHRvdGFsICs9IGl0ZW0uY29sZGxpc3QubGVuZ3RoXG4gICAgICAgICAgY2hlY2sgKz0gaXRlbS50ZW1wQ29sZC5sZW5ndGhcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2codG90YWwsIGNoZWNrKVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHRvdGFsID09PSBjaGVjaykge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgIGkuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gW11cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgIGkuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IGl0ZW0uY29sZGxpc3RcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xlYXJFeHBpcmUgKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5leHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICAgIHJlc3VsdC5wdXNoKG9iailcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICB0aGlzLmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVUYXAgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0udGVtcENvbGQpXG4gICAgICAgICAgaXRlbS50ZW1wQ29sZC5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBzb3VyY2Uuc291cmNlVHlwZVxuICAgICAgICAgICAgb2JqLnNvdXJjZUlkID0gc291cmNlLnNvdXJjZUlkXG4gICAgICAgICAgICByZXN1bHQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGF0LmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRDaGVja2VkIChhcnIsIHZhbCkge1xuICAgICAgaWYgKGFyci5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgIGFyci5wdXNoKHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5zcGxpY2UoYXJyLmluZGV4T2YodmFsKSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgbWF4TW9kYWwgKGNvbnRlbnQpIHtcbiAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IGNvbnRlbnQsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVEYXRhIChqc29uLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VMaXN0OiBKU09OLnN0cmluZ2lmeShqc29uKVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUNhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlRGF0YSAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLmNhcnRMaXN0ID0gW11cbiAgICAgIHRoaXMuZXhwaXJlID0gW11cbiAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHRoaXMuZmluYWxwcmljZSA9IDBcbiAgICAgIHRoaXMuZnJlaWdodCA9IDBcbiAgICAgIHRoaXMuY2FydFN0YXR1cyA9IHt9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgdGhpcy5jYXJ0U3RhdHVzLnRvdGFscHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgdGhpcy5jYXJ0U3RhdHVzLmRpc2NvdW50ID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICB0aGlzLmNhcnRTdGF0dXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgdGhpcy5maW5hbHByaWNlID0gZGF0YS5maW5hbFByaWNlXG4gICAgICAgICAgdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIGlmIChvYmouY29sZGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIG9iai5zaG93VGl0bGUgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb2JqLnNob3dUaXRsZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNhcnRMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2FydExpc3QpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBmaWx0ZXJMaXN0IChwYXJlbnQpIHtcbiAgICAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgIHZhciB0ZW1wRXhwaXJlID0gW11cbiAgICAgIHRlbXBFeHBpcmUgPSBwYXJlbnQuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmtlZXBDb3VudCA8PSB0aGlzLnZhbGlkYXRlQ291bnQgfHwgIWl0ZW0uaXNBbGxvd1NhbGUgfHwgaXRlbS5idXlDb3VudCA+IGl0ZW0ua2VlcENvdW50XG4gICAgICB9KVxuICAgICAgdGVtcEV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IHRydWVcbiAgICAgICAgdGhpcy5leHBpcmUucHVzaChpdGVtKVxuICAgICAgfSlcbiAgICAgIHRlbXBBcnIgPSBwYXJlbnQuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmtlZXBDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCAmJiBpdGVtLmlzQWxsb3dTYWxlICYmIGl0ZW0uYnV5Q291bnQgPD0gaXRlbS5rZWVwQ291bnRcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGVtcEFyclxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHZhciB0ZW1wRXhwaXJlID0gdGhpcy5maWx0ZXJMaXN0KHBhcmVudClcbiAgICAgIHRlbXBFeHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgb2JqLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgb2JqLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgIG9iai5pZCA9IGl0ZW0ucHJvZHVjdElkXG4gICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgIG9iai5zb3VyY2VJZCA9IGl0ZW0uc2FsZXNVbml0SWRcbiAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGFkZENhcnREYXRhIChnb29kLCB2YWwsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IGdvb2Quc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGdvb2Quc291cmNlSWQsXG4gICAgICAgIGNvdW50OiB2YWxcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbClcbiAgICAgIC8vIOWIpOaWreeUqOaIt21lbWJlckhhc2hcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==