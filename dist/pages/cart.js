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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsInRpbWVvdXQiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibGVuZ3RoIiwiaGFzRXhwaXJlIiwibWV0aG9kcyIsImVkaXRUYXAiLCJjbGVhckxpc3QiLCJwbHVzQ29sZCIsImUiLCJzb3VyY2VJZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJmb3JFYWNoIiwiaXRlbSIsInZhbCIsInRvdGFsQ291bnQiLCJjb3VudCIsIm1heE1vZGFsIiwiYWRkQ2FydERhdGEiLCJpbml0UGFnZURhdGEiLCIkYXBwbHkiLCJtaW5Db2xkIiwia2V5Q29sZCIsImtleVZhbCIsImJsdXJDb2xkIiwiZGlzYWJsZSIsImluaXRDb3VudCIsImdvRGV0YWlsIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImdvQXBwbHlWaXAiLCJjb2xkQ2hlY2siLCJ2YWx1ZSIsImNoZWNrZWQiLCJmaWx0ZXIiLCJjb2xkQWxsIiwiaW5kZXgiLCJjaGVja0FsbCIsInRvdGFsIiwiY2hlY2siLCJpIiwiY2xlYXJFeHBpcmUiLCJyZXN1bHQiLCJvYmoiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNhbGVzVW5pdElkIiwicHVzaCIsImRlbGV0ZURhdGEiLCJkZWxldGVUYXAiLCJ0aGF0Iiwic291cmNlIiwiZHVyYXRpb24iLCJpbWFnZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsImFyciIsImluZGV4T2YiLCJzcGxpY2UiLCJqc29uIiwiY2IiLCJnZXRUb2tlbiIsIl90aGlzIiwic291cmNlTGlzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJIdHRwUmVxdWVzdCIsIkRlbGV0ZUNhcnRIdHRwIiwidGhlbiIsImVycm9yIiwibWlzc1Rva2VuIiwic2hvd0xvYWRpbmciLCJHZXRDYXJ0SHR0cCIsImhpZGVMb2FkaW5nIiwidG90YWxwcmljZSIsInByaWNlIiwiZGlzY291bnQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJQcmljZSIsInBheSIsImNoaWxkT3JkZXJzIiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInNob3dUaXRsZSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJ0ZW1wQXJyIiwidGVtcEV4cGlyZSIsImtlZXBDb3VudCIsImlzQWxsb3dTYWxlIiwiYnV5Q291bnQiLCJjaGlsZCIsImZpbHRlckxpc3QiLCJwYXRoIiwiY292ZXIiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJBZGRDYXJ0SHR0cCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLEtBRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFNBSVZDLE8sR0FB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QUNEUCxjQUFNdEQsTUFBTjtBQUNELE9BVkQ7QUFXRDs7O2dDQUNZO0FBQ1gsV0FBS3BDLFFBQUwsQ0FBYzRCLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzlCQSxhQUFLNUIsUUFBTCxDQUFjMkIsT0FBZCxDQUFzQixVQUFDb0MsQ0FBRCxFQUFPO0FBQzNCQSxZQUFFUCxPQUFGLEdBQVksS0FBWjtBQUNELFNBRkQ7QUFHQTVCLGFBQUsxQixXQUFMLEdBQW1CLEtBQW5CO0FBQ0EwQixhQUFLekIsUUFBTCxHQUFnQixFQUFoQjtBQUNELE9BTkQ7QUFPRDs7OzZCQUNTO0FBQ1J3QyxjQUFRQyxHQUFSLENBQVksS0FBSzlCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBcEM7QUFDQTtBQUNBLFdBQUtzQixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUsvQixNQUFMLEdBQWMsS0FBZDtBQUNBLFdBQUtnQixTQUFMO0FBQ0EsV0FBS2MsWUFBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7O3dDQUNvQjtBQUNuQixXQUFLL0IsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLZ0IsU0FBTDtBQUNBLFdBQUtjLFlBQUwsQ0FBa0IsWUFBTTtBQUN0Qix1QkFBSytGLG1CQUFMO0FBQ0QsT0FGRDtBQUdEOzs7O0VBcGMrQixlQUFLQyxJOztrQkFBbEJySixJIiwiZmlsZSI6ImNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvdW50ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9picsXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wiY2FydExpc3RcIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJpdGVtXCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9LFwiZXhwaXJlXCI6e1wiY29tXCI6XCJjb3VudGVOb3JtYWxcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJjb3VudGVDb2xkXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb3VudFwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c291cmNlSWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLnNvdXJjZUlkXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5kaXNhYmxlXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJjb3VudGVOb3JtYWxcIjp7XCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5idXlDb3VudFwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzb3VyY2VJZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uc291cmNlSWRcIixcImZvclwiOlwiZXhwaXJlXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aXNEaXNhYmxlZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uZGlzYWJsZVwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIyXCJ9fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ29sZFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbkNvbGRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q29sZFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNvbGRcIn0sXCJjb3VudGVOb3JtYWxcIjp7XCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ29sZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY291bnRlQ29sZDogQ291bnRlLFxuICAgICAgY291bnRlTm9ybWFsOiBDb3VudGUsXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2FydGNvdW50OiBbXSxcbiAgICAgIGNoZWNrZWRMaXN0OiBbXSxcbiAgICAgIHRlbXBDb2xkTGlzdDogW10sXG4gICAgICB0ZW1wTm9ybWFsTGlzdDogW10sXG4gICAgICBjYXJ0U3RhdHVzOiB7fSxcbiAgICAgIGNhcnRMaXN0OiBbXSxcbiAgICAgIGNvbGRsaXN0OiBbXSxcbiAgICAgIGNvbGRUaXRsZTogJycsXG4gICAgICBjb2xkQ2hlY2tlZDogZmFsc2UsXG4gICAgICB0ZW1wQ29sZDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIGZpbmFscHJpY2U6IDAsXG4gICAgICBmcmVpZ2h0OiAwLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgdmFsaWRhdGVDb3VudDogMCxcbiAgICAgIGV4cGlyZTogW10sXG4gICAgICB0aW1lb3V0OiB0cnVlXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlckxldmVsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzRXhwaXJlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwaXJlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRUYXAgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgICBpZiAodGhpcy5pc0VkaXQpIHtcbiAgICAgICAgICB0aGlzLmNsZWFyTGlzdCgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwbHVzQ29sZCAoZSkge1xuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgdGhpcy50aW1lb3V0ID0gZmFsc2VcbiAgICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQgJiYgdmFsLnRvdGFsQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwuY291bnQgKyAxXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHRydWVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW5Db2xkIChlKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBmYWxzZVxuICAgICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCAmJiB2YWwudG90YWxDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC5jb3VudCAtIDFcbiAgICAgICAgICAgICAgICBpZiAodmFsLmNvdW50IDwgMSkge1xuICAgICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMVxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5LiN6IO95YaN5bCR5ZWmJylcbiAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHRydWVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgLTEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAga2V5Q29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICB9LFxuICAgICAgYmx1ckNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQpIHtcbiAgICAgICAgICAgICAgaWYgKGtleVZhbCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbC50b3RhbENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50ICYmIGtleVZhbCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbC50b3RhbENvdW50IDw9IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDBcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSBrZXlWYWxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIXZhbC5kaXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIHZhbC5jb3VudCAtIHZhbC5pbml0Q291bnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhc0V4cGlyZSkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9wYXljYXJ0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOa4heepuuWkseaViOWVhuWTge+8jOWGjeaPkOS6pOiuouWNlScsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flhYjpgIDlh7rnvJbovpHnirbmgIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sZENoZWNrIChlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YWwuY2hlY2tlZCA9ICF2YWwuY2hlY2tlZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IGl0ZW0uY29sZGxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoaXRlbS50ZW1wQ29sZC5sZW5ndGggPT09IGl0ZW0uY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sZEFsbCAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkLmxlbmd0aCA9PT0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IFtdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hlY2tBbGwgKCkge1xuICAgICAgICB2YXIgdG90YWwgPSAwXG4gICAgICAgIHZhciBjaGVjayA9IDBcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHRvdGFsICs9IGl0ZW0uY29sZGxpc3QubGVuZ3RoXG4gICAgICAgICAgY2hlY2sgKz0gaXRlbS50ZW1wQ29sZC5sZW5ndGhcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2codG90YWwsIGNoZWNrKVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHRvdGFsID09PSBjaGVjaykge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgIGkuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gW11cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgIGkuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IGl0ZW0uY29sZGxpc3RcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xlYXJFeHBpcmUgKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5leHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgIG9iai5zb3VyY2VUeXBlID0gaXRlbS5zYWxlc1VuaXRUeXBlXG4gICAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICAgIHJlc3VsdC5wdXNoKG9iailcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICB0aGlzLmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVUYXAgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0udGVtcENvbGQpXG4gICAgICAgICAgaXRlbS50ZW1wQ29sZC5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBzb3VyY2Uuc291cmNlVHlwZVxuICAgICAgICAgICAgb2JqLnNvdXJjZUlkID0gc291cmNlLnNvdXJjZUlkXG4gICAgICAgICAgICByZXN1bHQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGF0LmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRDaGVja2VkIChhcnIsIHZhbCkge1xuICAgICAgaWYgKGFyci5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgIGFyci5wdXNoKHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5zcGxpY2UoYXJyLmluZGV4T2YodmFsKSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgbWF4TW9kYWwgKGNvbnRlbnQpIHtcbiAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IGNvbnRlbnQsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVEYXRhIChqc29uLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZUxpc3Q6IEpTT04uc3RyaW5naWZ5KGpzb24pXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGVsZXRlQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2VEYXRhIChjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLmNhcnRMaXN0ID0gW11cbiAgICAgIHRoaXMuZXhwaXJlID0gW11cbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdGhpcy5maW5hbHByaWNlID0gMFxuICAgICAgdGhpcy5mcmVpZ2h0ID0gMFxuICAgICAgdGhpcy5jYXJ0U3RhdHVzID0ge31cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy50b3RhbHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmNhcnRTdGF0dXMuZGlzY291bnQgPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmNhcnRTdGF0dXMubWVtYmVyUHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZmluYWxwcmljZSA9IGRhdGEucGF5XG4gICAgICAgICAgX3RoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSBfdGhpcy5pbml0Q2hpbGQoaXRlbS5zYWxlc1VuaXRzKVxuICAgICAgICAgICAgaWYgKG9iai5jb2xkbGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgb2JqLnNob3dUaXRsZSA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvYmouc2hvd1RpdGxlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY2FydExpc3QucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0UGFnZURhdGEoY2IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGZpbHRlckxpc3QgKHBhcmVudCkge1xuICAgICAgdmFyIHRlbXBBcnIgPSBbXVxuICAgICAgdmFyIHRlbXBFeHBpcmUgPSBbXVxuICAgICAgdGVtcEV4cGlyZSA9IHBhcmVudC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ua2VlcENvdW50IDw9IHRoaXMudmFsaWRhdGVDb3VudCB8fCAhaXRlbS5pc0FsbG93U2FsZSB8fCBpdGVtLmJ1eUNvdW50ID4gaXRlbS5rZWVwQ291bnRcbiAgICAgIH0pXG4gICAgICB0ZW1wRXhwaXJlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5kaXNhYmxlID0gdHJ1ZVxuICAgICAgICB0aGlzLmV4cGlyZS5wdXNoKGl0ZW0pXG4gICAgICB9KVxuICAgICAgdGVtcEFyciA9IHBhcmVudC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ua2VlcENvdW50ID4gdGhpcy52YWxpZGF0ZUNvdW50ICYmIGl0ZW0uaXNBbGxvd1NhbGUgJiYgaXRlbS5idXlDb3VudCA8PSBpdGVtLmtlZXBDb3VudFxuICAgICAgfSlcbiAgICAgIHJldHVybiB0ZW1wQXJyXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgdmFyIHRlbXBFeHBpcmUgPSB0aGlzLmZpbHRlckxpc3QocGFyZW50KVxuICAgICAgdGVtcEV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5idXlDb3VudFxuICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGdvb2QsIHZhbCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiBnb29kLnNvdXJjZVR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiBnb29kLnNvdXJjZUlkLFxuICAgICAgICBjb3VudDogdmFsXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSBfdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgY2xlYXJMaXN0ICgpIHtcbiAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICBpLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgaXRlbS50ZW1wQ29sZCA9IFtdXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsKVxuICAgICAgLy8g5Yik5pat55So5oi3bWVtYmVySGFzaFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pc0VkaXQgPSBmYWxzZVxuICAgICAgdGhpcy5jbGVhckxpc3QoKVxuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XG4gICAgICB0aGlzLmlzRWRpdCA9IGZhbHNlXG4gICAgICB0aGlzLmNsZWFyTGlzdCgpXG4gICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19