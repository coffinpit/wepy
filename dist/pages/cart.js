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
        _this.$parent.showSuccess();
        _this.isLoading = false;
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.cartStatus.totalprice = data.price;
          _this.cartStatus.discount = data.reduction;
          _this.cartStatus.memberPrice = data.memberPrice;
          _this.finalprice = data.pay;
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
        _this.$parent.showSuccess();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsInRpbWVvdXQiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibGVuZ3RoIiwiaGFzRXhwaXJlIiwibWV0aG9kcyIsImVkaXRUYXAiLCJjbGVhckxpc3QiLCJwbHVzQ29sZCIsImUiLCJzb3VyY2VJZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJmb3JFYWNoIiwiaXRlbSIsInZhbCIsInRvdGFsQ291bnQiLCJjb3VudCIsIm1heE1vZGFsIiwiYWRkQ2FydERhdGEiLCJpbml0UGFnZURhdGEiLCIkYXBwbHkiLCJtaW5Db2xkIiwia2V5Q29sZCIsImtleVZhbCIsImJsdXJDb2xkIiwiZGlzYWJsZSIsImluaXRDb3VudCIsImdvRGV0YWlsIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImdvQXBwbHlWaXAiLCJjb2xkQ2hlY2siLCJ2YWx1ZSIsImNoZWNrZWQiLCJmaWx0ZXIiLCJjb2xkQWxsIiwiaW5kZXgiLCJjaGVja0FsbCIsInRvdGFsIiwiY2hlY2siLCJpIiwiY2xlYXJFeHBpcmUiLCJyZXN1bHQiLCJvYmoiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNhbGVzVW5pdElkIiwicHVzaCIsImRlbGV0ZURhdGEiLCJkZWxldGVUYXAiLCJ0aGF0Iiwic291cmNlIiwiZHVyYXRpb24iLCJpbWFnZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsImFyciIsImluZGV4T2YiLCJzcGxpY2UiLCJqc29uIiwiY2IiLCJnZXRUb2tlbiIsIl90aGlzIiwic291cmNlTGlzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJIdHRwUmVxdWVzdCIsIkRlbGV0ZUNhcnRIdHRwIiwidGhlbiIsImVycm9yIiwibWlzc1Rva2VuIiwic2hvd0xvYWRpbmciLCJHZXRDYXJ0SHR0cCIsInNob3dTdWNjZXNzIiwidG90YWxwcmljZSIsInByaWNlIiwiZGlzY291bnQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJQcmljZSIsInBheSIsImNoaWxkT3JkZXJzIiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInNob3dUaXRsZSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJ0ZW1wQXJyIiwidGVtcEV4cGlyZSIsImtlZXBDb3VudCIsImlzQWxsb3dTYWxlIiwiYnV5Q291bnQiLCJjaGlsZCIsImZpbHRlckxpc3QiLCJwYXRoIiwiY292ZXIiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJBZGRDYXJ0SHR0cCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBWixFQUE0QyxRQUFPLEVBQUMs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ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ291bnRlIGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJjYXJ0TGlzdFwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcIml0ZW1cIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJleHBpcmVcIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJjb3VudGVDb2xkXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5idXlDb3VudFwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzb3VyY2VJZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uc291cmNlSWRcIixcImZvclwiOlwiZXhwaXJlXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aXNEaXNhYmxlZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uZGlzYWJsZVwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIyXCJ9fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ29sZFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbkNvbGRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q29sZFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNvbGRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGNvdW50ZUNvbGQ6IENvdW50ZSxcbiAgICAgIGNvdW50ZU5vcm1hbDogQ291bnRlLFxuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGNhcnRjb3VudDogW10sXG4gICAgICBjaGVja2VkTGlzdDogW10sXG4gICAgICB0ZW1wQ29sZExpc3Q6IFtdLFxuICAgICAgdGVtcE5vcm1hbExpc3Q6IFtdLFxuICAgICAgY2FydFN0YXR1czoge30sXG4gICAgICBjYXJ0TGlzdDogW10sXG4gICAgICBjb2xkbGlzdDogW10sXG4gICAgICBjb2xkVGl0bGU6ICcnLFxuICAgICAgY29sZENoZWNrZWQ6IGZhbHNlLFxuICAgICAgdGVtcENvbGQ6IFtdLFxuICAgICAgaXNFZGl0OiBmYWxzZSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBmaW5hbHByaWNlOiAwLFxuICAgICAgZnJlaWdodDogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlQ291bnQ6IDAsXG4gICAgICBleHBpcmU6IFtdLFxuICAgICAgdGltZW91dDogdHJ1ZVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc0V4cGlyZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLmV4cGlyZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0VGFwICgpIHtcbiAgICAgICAgdGhpcy5pc0VkaXQgPSAhdGhpcy5pc0VkaXRcbiAgICAgICAgaWYgKHRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgdGhpcy5jbGVhckxpc3QoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGx1c0NvbGQgKGUpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCAmJiB2YWwudG90YWxDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCArK1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW5Db2xkIChlKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQgJiYgdmFsLnRvdGFsQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgLS1cbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfkuI3og73lho3lsJHllaYnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAtMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXlDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgIH0sXG4gICAgICBibHVyQ29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICBpZiAoa2V5VmFsIDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsLnRvdGFsQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQgJiYga2V5VmFsID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsLnRvdGFsQ291bnQgPD0gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMFxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IGtleVZhbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghdmFsLmRpc2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgdmFsLmNvdW50IC0gdmFsLmluaXRDb3VudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWwuY291bnRcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0NhdGVnb3J5ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2F0ZWdvcnknXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VkaXQpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzRXhwaXJlKSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWNhcnQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI5riF56m65aSx5pWI5ZWG5ZOB77yM5YaN5o+Q5Lqk6K6i5Y2VJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOmAgOWHuue8lui+keeKtuaAgScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQ2hlY2sgKGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWVcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gIXZhbC5jaGVja2VkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChpdGVtLnRlbXBDb2xkLmxlbmd0aCA9PT0gaXRlbS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQWxsIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja0FsbCAoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDBcbiAgICAgICAgdmFyIGNoZWNrID0gMFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdG90YWwgKz0gaXRlbS5jb2xkbGlzdC5sZW5ndGhcbiAgICAgICAgICBjaGVjayArPSBpdGVtLnRlbXBDb2xkLmxlbmd0aFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbCwgY2hlY2spXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAodG90YWwgPT09IGNoZWNrKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjbGVhckV4cGlyZSAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICB0aGlzLmV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgIHRoaXMuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coaXRlbS50ZW1wQ29sZClcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouc291cmNlVHlwZSA9IHNvdXJjZS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBvYmouc291cmNlSWQgPSBzb3VyY2Uuc291cmNlSWRcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5ZWG5ZOBJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpO+8nycsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHRoYXQuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldENoZWNrZWQgKGFyciwgdmFsKSB7XG4gICAgICBpZiAoYXJyLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgYXJyLnB1c2godmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZih2YWwpLCAxKVxuICAgICAgfVxuICAgIH1cbiAgICBtYXhNb2RhbCAoY29udGVudCkge1xuICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogY29udGVudCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgIH0pXG4gICAgfVxuICAgIGRlbGV0ZURhdGEgKGpzb24sIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlTGlzdDogSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZURhdGEgKGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2FydExpc3QgPSBbXVxuICAgICAgdGhpcy5leHBpcmUgPSBbXVxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZpbmFscHJpY2UgPSAwXG4gICAgICB0aGlzLmZyZWlnaHQgPSAwXG4gICAgICB0aGlzLmNhcnRTdGF0dXMgPSB7fVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jYXJ0U3RhdHVzLnRvdGFscHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy5kaXNjb3VudCA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IF90aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBpZiAob2JqLmNvbGRsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICBvYmouc2hvd1RpdGxlID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9iai5zaG93VGl0bGUgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jYXJ0TGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRQYWdlRGF0YShjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZmlsdGVyTGlzdCAocGFyZW50KSB7XG4gICAgICB2YXIgdGVtcEFyciA9IFtdXG4gICAgICB2YXIgdGVtcEV4cGlyZSA9IFtdXG4gICAgICB0ZW1wRXhwaXJlID0gcGFyZW50LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5rZWVwQ291bnQgPD0gdGhpcy52YWxpZGF0ZUNvdW50IHx8ICFpdGVtLmlzQWxsb3dTYWxlIHx8IGl0ZW0uYnV5Q291bnQgPiBpdGVtLmtlZXBDb3VudFxuICAgICAgfSlcbiAgICAgIHRlbXBFeHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmRpc2FibGUgPSB0cnVlXG4gICAgICAgIHRoaXMuZXhwaXJlLnB1c2goaXRlbSlcbiAgICAgIH0pXG4gICAgICB0ZW1wQXJyID0gcGFyZW50LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5rZWVwQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQgJiYgaXRlbS5pc0FsbG93U2FsZSAmJiBpdGVtLmJ1eUNvdW50IDw9IGl0ZW0ua2VlcENvdW50XG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRlbXBBcnJcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICB2YXIgdGVtcEV4cGlyZSA9IHRoaXMuZmlsdGVyTGlzdChwYXJlbnQpXG4gICAgICB0ZW1wRXhwaXJlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmluaXRDb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoZ29vZCwgdmFsLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IGdvb2Quc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGdvb2Quc291cmNlSWQsXG4gICAgICAgIGNvdW50OiB2YWxcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSBfdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgY2xlYXJMaXN0ICgpIHtcbiAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICBpLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgaXRlbS50ZW1wQ29sZCA9IFtdXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsKVxuICAgICAgLy8g5Yik5pat55So5oi3bWVtYmVySGFzaFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pc0VkaXQgPSBmYWxzZVxuICAgICAgdGhpcy5jbGVhckxpc3QoKVxuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19