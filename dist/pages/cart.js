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
        if (this.isEdit) {
          this.clearList();
        }
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
    value: function initPageData() {
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
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this8.$parent.getToken(res.data.error);
            _this.initPageData();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsImNvbXB1dGVkIiwidXNlckxldmVsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJsZW5ndGgiLCJoYXNFeHBpcmUiLCJtZXRob2RzIiwiZWRpdFRhcCIsImNsZWFyTGlzdCIsInBsdXNDb2xkIiwiZSIsInNvdXJjZUlkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsImZvckVhY2giLCJpdGVtIiwidmFsIiwidG90YWxDb3VudCIsImNvdW50IiwibWF4TW9kYWwiLCJhZGRDYXJ0RGF0YSIsImluaXRQYWdlRGF0YSIsIiRhcHBseSIsIm1pbkNvbGQiLCJrZXlDb2xkIiwia2V5VmFsIiwiYmx1ckNvbGQiLCJkaXNhYmxlIiwiaW5pdENvdW50IiwiZ29EZXRhaWwiLCJjb25zb2xlIiwibG9nIiwibmF2aWdhdGVUbyIsInVybCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJnb09yZGVyIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZ29BcHBseVZpcCIsImNvbGRDaGVjayIsInZhbHVlIiwiY2hlY2tlZCIsImZpbHRlciIsImNvbGRBbGwiLCJpbmRleCIsImNoZWNrQWxsIiwidG90YWwiLCJjaGVjayIsImkiLCJjbGVhckV4cGlyZSIsInJlc3VsdCIsIm9iaiIsInNvdXJjZVR5cGUiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJwdXNoIiwiZGVsZXRlRGF0YSIsImRlbGV0ZVRhcCIsInRoYXQiLCJzb3VyY2UiLCJkdXJhdGlvbiIsImltYWdlIiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2VsIiwiYXJyIiwiaW5kZXhPZiIsInNwbGljZSIsImpzb24iLCJjYiIsImdldFRva2VuIiwiX3RoaXMiLCJzb3VyY2VMaXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsIkh0dHBSZXF1ZXN0IiwiRGVsZXRlQ2FydEh0dHAiLCJ0aGVuIiwiZXJyb3IiLCJtaXNzVG9rZW4iLCJzaG93TG9hZGluZyIsIkdldENhcnRIdHRwIiwic2hvd1N1Y2Nlc3MiLCJ0b3RhbHByaWNlIiwicHJpY2UiLCJkaXNjb3VudCIsInJlZHVjdGlvbiIsIm1lbWJlclByaWNlIiwiZmluYWxQcmljZSIsImNoaWxkT3JkZXJzIiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInNob3dUaXRsZSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJ0ZW1wQXJyIiwidGVtcEV4cGlyZSIsImtlZXBDb3VudCIsImlzQWxsb3dTYWxlIiwiYnV5Q291bnQiLCJjaGlsZCIsImZpbHRlckxpc3QiLCJwYXRoIiwiY292ZXIiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJBZGRDYXJ0SHR0cCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBWixFQUE0QyxRQUFPLEVBQUMsT0FB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TixDQUFjMEUsUUFBZCxDQUF1QlIsSUFBSXZGLElBQUosQ0FBU3VHLEtBQWhDLENBQWQ7QUFDRDtBQUNGO0FBQ0RQLGNBQU10RCxNQUFOO0FBQ0QsT0FWRDtBQVdEOzs7Z0NBQ1k7QUFDWCxXQUFLbkMsUUFBTCxDQUFjMkIsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDOUJBLGFBQUszQixRQUFMLENBQWMwQixPQUFkLENBQXNCLFVBQUNvQyxDQUFELEVBQU87QUFDM0JBLFlBQUVQLE9BQUYsR0FBWSxLQUFaO0FBQ0QsU0FGRDtBQUdBNUIsYUFBS3pCLFdBQUwsR0FBbUIsS0FBbkI7QUFDQXlCLGFBQUt4QixRQUFMLEdBQWdCLEVBQWhCO0FBQ0QsT0FORDtBQU9EOzs7NkJBQ1M7QUFDUnVDLGNBQVFDLEdBQVIsQ0FBWSxLQUFLOUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixTQUFwQztBQUNBO0FBQ0EsV0FBS3NCLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBSzlCLE1BQUwsR0FBYyxLQUFkO0FBQ0EsV0FBS2UsU0FBTDtBQUNBLFdBQUtjLFlBQUw7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUE5YStCLGVBQUs4RixJOztrQkFBbEJsSixJIiwiZmlsZSI6ImNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvdW50ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9pidcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wiY2FydExpc3RcIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJpdGVtXCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9LFwiZXhwaXJlXCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiY291bnRlQ29sZFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uYnV5Q291bnRcIixcImZvclwiOlwiZXhwaXJlXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c291cmNlSWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLnNvdXJjZUlkXCIsXCJmb3JcIjpcImV4cGlyZVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOmlzRGlzYWJsZWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmRpc2FibGVcIixcImZvclwiOlwiZXhwaXJlXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiMlwifX07XHJcbiRldmVudHMgPSB7XCJjb3VudGVDb2xkXCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NvbGRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW5Db2xkXCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNvbGRcIixcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDb2xkXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb3VudGVDb2xkOiBDb3VudGUsXG4gICAgICBjb3VudGVOb3JtYWw6IENvdW50ZSxcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdLFxuICAgICAgY2hlY2tlZExpc3Q6IFtdLFxuICAgICAgdGVtcENvbGRMaXN0OiBbXSxcbiAgICAgIHRlbXBOb3JtYWxMaXN0OiBbXSxcbiAgICAgIGNhcnRTdGF0dXM6IHt9LFxuICAgICAgY2FydExpc3Q6IFtdLFxuICAgICAgY29sZGxpc3Q6IFtdLFxuICAgICAgY29sZFRpdGxlOiAnJyxcbiAgICAgIGNvbGRDaGVja2VkOiBmYWxzZSxcbiAgICAgIHRlbXBDb2xkOiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgZmluYWxwcmljZTogMCxcbiAgICAgIGZyZWlnaHQ6IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICB2YWxpZGF0ZUNvdW50OiAwLFxuICAgICAgZXhwaXJlOiBbXVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc0V4cGlyZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLmV4cGlyZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0VGFwICgpIHtcbiAgICAgICAgdGhpcy5pc0VkaXQgPSAhdGhpcy5pc0VkaXRcbiAgICAgICAgaWYgKHRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgdGhpcy5jbGVhckxpc3QoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGx1c0NvbGQgKGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkICYmIHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgIHZhbC5jb3VudCArK1xuICAgICAgICAgICAgICBpZiAodmFsLmNvdW50ID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIG1pbkNvbGQgKGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkICYmIHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgIHZhbC5jb3VudCAtLVxuICAgICAgICAgICAgICBpZiAodmFsLmNvdW50IDwgMSkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfkuI3og73lho3lsJHllaYnKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAtMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAga2V5Q29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICB9LFxuICAgICAgYmx1ckNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQpIHtcbiAgICAgICAgICAgICAgaWYgKGtleVZhbCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50ICYmIGtleVZhbCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbC50b3RhbENvdW50IDw9IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDBcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSBrZXlWYWxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIXZhbC5kaXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIHZhbC5jb3VudCAtIHZhbC5pbml0Q291bnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhc0V4cGlyZSkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9wYXljYXJ0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOa4heepuuWkseaViOWVhuWTge+8jOWGjeaPkOS6pOiuouWNlScsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flhYjpgIDlh7rnvJbovpHnirbmgIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sZENoZWNrIChlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9ICF2YWwuY2hlY2tlZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IGl0ZW0uY29sZGxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoaXRlbS50ZW1wQ29sZC5sZW5ndGggPT09IGl0ZW0uY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sZEFsbCAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkLmxlbmd0aCA9PT0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IFtdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hlY2tBbGwgKCkge1xuICAgICAgICB2YXIgdG90YWwgPSAwXG4gICAgICAgIHZhciBjaGVjayA9IDBcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHRvdGFsICs9IGl0ZW0uY29sZGxpc3QubGVuZ3RoXG4gICAgICAgICAgY2hlY2sgKz0gaXRlbS50ZW1wQ29sZC5sZW5ndGhcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2codG90YWwsIGNoZWNrKVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHRvdGFsID09PSBjaGVjaykge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgIGkuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gW11cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgIGkuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IGl0ZW0uY29sZGxpc3RcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xlYXJFeHBpcmUgKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5leHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICAgIHJlc3VsdC5wdXNoKG9iailcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICB0aGlzLmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVUYXAgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0udGVtcENvbGQpXG4gICAgICAgICAgaXRlbS50ZW1wQ29sZC5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBzb3VyY2Uuc291cmNlVHlwZVxuICAgICAgICAgICAgb2JqLnNvdXJjZUlkID0gc291cmNlLnNvdXJjZUlkXG4gICAgICAgICAgICByZXN1bHQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGF0LmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRDaGVja2VkIChhcnIsIHZhbCkge1xuICAgICAgaWYgKGFyci5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgIGFyci5wdXNoKHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5zcGxpY2UoYXJyLmluZGV4T2YodmFsKSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgbWF4TW9kYWwgKGNvbnRlbnQpIHtcbiAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IGNvbnRlbnQsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVEYXRhIChqc29uLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZUxpc3Q6IEpTT04uc3RyaW5naWZ5KGpzb24pXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGVsZXRlQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2VEYXRhICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5jYXJ0TGlzdCA9IFtdXG4gICAgICB0aGlzLmV4cGlyZSA9IFtdXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHRoaXMuZmluYWxwcmljZSA9IDBcbiAgICAgIHRoaXMuZnJlaWdodCA9IDBcbiAgICAgIHRoaXMuY2FydFN0YXR1cyA9IHt9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy50b3RhbHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmNhcnRTdGF0dXMuZGlzY291bnQgPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmNhcnRTdGF0dXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIF90aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gX3RoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIGlmIChvYmouY29sZGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIG9iai5zaG93VGl0bGUgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb2JqLnNob3dUaXRsZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNhcnRMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGZpbHRlckxpc3QgKHBhcmVudCkge1xuICAgICAgdmFyIHRlbXBBcnIgPSBbXVxuICAgICAgdmFyIHRlbXBFeHBpcmUgPSBbXVxuICAgICAgdGVtcEV4cGlyZSA9IHBhcmVudC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ua2VlcENvdW50IDw9IHRoaXMudmFsaWRhdGVDb3VudCB8fCAhaXRlbS5pc0FsbG93U2FsZSB8fCBpdGVtLmJ1eUNvdW50ID4gaXRlbS5rZWVwQ291bnRcbiAgICAgIH0pXG4gICAgICB0ZW1wRXhwaXJlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5kaXNhYmxlID0gdHJ1ZVxuICAgICAgICB0aGlzLmV4cGlyZS5wdXNoKGl0ZW0pXG4gICAgICB9KVxuICAgICAgdGVtcEFyciA9IHBhcmVudC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ua2VlcENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50ICYmIGl0ZW0uaXNBbGxvd1NhbGUgJiYgaXRlbS5idXlDb3VudCA8PSBpdGVtLmtlZXBDb3VudFxuICAgICAgfSlcbiAgICAgIHJldHVybiB0ZW1wQXJyXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgdmFyIHRlbXBFeHBpcmUgPSB0aGlzLmZpbHRlckxpc3QocGFyZW50KVxuICAgICAgdGVtcEV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGdvb2QsIHZhbCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiBnb29kLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiBnb29kLnNvdXJjZUlkLFxuICAgICAgICBjb3VudDogdmFsXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gX3RoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGNsZWFyTGlzdCAoKSB7XG4gICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbClcbiAgICAgIC8vIOWIpOaWreeUqOaIt21lbWJlckhhc2hcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaXNFZGl0ID0gZmFsc2VcbiAgICAgIHRoaXMuY2xlYXJMaXN0KClcbiAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==