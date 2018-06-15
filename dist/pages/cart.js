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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwidmFsaWRhdGVDb3VudCIsImV4cGlyZSIsInRpbWVvdXQiLCJjb21wdXRlZCIsInVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibGVuZ3RoIiwiaGFzRXhwaXJlIiwibWV0aG9kcyIsImVkaXRUYXAiLCJjbGVhckxpc3QiLCJwbHVzQ29sZCIsImUiLCJzb3VyY2VJZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJmb3JFYWNoIiwiaXRlbSIsInZhbCIsInRvdGFsQ291bnQiLCJjb3VudCIsIm1heE1vZGFsIiwiYWRkQ2FydERhdGEiLCJpbml0UGFnZURhdGEiLCIkYXBwbHkiLCJtaW5Db2xkIiwia2V5Q29sZCIsImtleVZhbCIsImJsdXJDb2xkIiwiZGlzYWJsZSIsImluaXRDb3VudCIsImdvRGV0YWlsIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImdvQXBwbHlWaXAiLCJjb2xkQ2hlY2siLCJ2YWx1ZSIsImNoZWNrZWQiLCJmaWx0ZXIiLCJjb2xkQWxsIiwiaW5kZXgiLCJjaGVja0FsbCIsInRvdGFsIiwiY2hlY2siLCJpIiwiY2xlYXJFeHBpcmUiLCJyZXN1bHQiLCJvYmoiLCJzb3VyY2VUeXBlIiwic2FsZXNVbml0VHlwZSIsInNhbGVzVW5pdElkIiwicHVzaCIsImRlbGV0ZURhdGEiLCJkZWxldGVUYXAiLCJ0aGF0Iiwic291cmNlIiwiZHVyYXRpb24iLCJpbWFnZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsImFyciIsImluZGV4T2YiLCJzcGxpY2UiLCJqc29uIiwiY2IiLCJnZXRUb2tlbiIsIl90aGlzIiwic291cmNlTGlzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJIdHRwUmVxdWVzdCIsIkRlbGV0ZUNhcnRIdHRwIiwidGhlbiIsImVycm9yIiwibWlzc1Rva2VuIiwic2hvd0xvYWRpbmciLCJHZXRDYXJ0SHR0cCIsImhpZGVMb2FkaW5nIiwidG90YWxwcmljZSIsInByaWNlIiwiZGlzY291bnQiLCJyZWR1Y3Rpb24iLCJtZW1iZXJQcmljZSIsInBheSIsImNoaWxkT3JkZXJzIiwiaW5pdENoaWxkIiwic2FsZXNVbml0cyIsInNob3dUaXRsZSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJ0ZW1wQXJyIiwidGVtcEV4cGlyZSIsImtlZXBDb3VudCIsImlzQWxsb3dTYWxlIiwiYnV5Q291bnQiLCJjaGlsZCIsImZpbHRlckxpc3QiLCJwYXRoIiwiY292ZXIiLCJvbGRwcmljZSIsInByb2R1Y3RJZCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJBZGRDYXJ0SHR0cCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLEtBRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFNBSVZDLE8sR0FB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LEdBQWMsS0FBZDtBQUNBLFdBQUtnQixTQUFMO0FBQ0EsV0FBS2MsWUFBTCxDQUFrQixZQUFNO0FBQ3RCLHVCQUFLK0YsbUJBQUw7QUFDRCxPQUZEO0FBR0Q7Ozs7RUFsYytCLGVBQUtDLEk7O2tCQUFsQnJKLEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ291bnRlIGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJjYXJ0TGlzdFwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcIml0ZW1cIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJleHBpcmVcIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJjb3VudGVDb2xkXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5idXlDb3VudFwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzb3VyY2VJZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uc291cmNlSWRcIixcImZvclwiOlwiZXhwaXJlXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6aXNEaXNhYmxlZC5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uZGlzYWJsZVwiLFwiZm9yXCI6XCJleHBpcmVcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIyXCJ9fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ29sZFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbkNvbGRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q29sZFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNvbGRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGNvdW50ZUNvbGQ6IENvdW50ZSxcbiAgICAgIGNvdW50ZU5vcm1hbDogQ291bnRlLFxuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGNhcnRjb3VudDogW10sXG4gICAgICBjaGVja2VkTGlzdDogW10sXG4gICAgICB0ZW1wQ29sZExpc3Q6IFtdLFxuICAgICAgdGVtcE5vcm1hbExpc3Q6IFtdLFxuICAgICAgY2FydFN0YXR1czoge30sXG4gICAgICBjYXJ0TGlzdDogW10sXG4gICAgICBjb2xkbGlzdDogW10sXG4gICAgICBjb2xkVGl0bGU6ICcnLFxuICAgICAgY29sZENoZWNrZWQ6IGZhbHNlLFxuICAgICAgdGVtcENvbGQ6IFtdLFxuICAgICAgaXNFZGl0OiBmYWxzZSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBmaW5hbHByaWNlOiAwLFxuICAgICAgZnJlaWdodDogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlQ291bnQ6IDAsXG4gICAgICBleHBpcmU6IFtdLFxuICAgICAgdGltZW91dDogdHJ1ZVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc0V4cGlyZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLmV4cGlyZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0VGFwICgpIHtcbiAgICAgICAgdGhpcy5pc0VkaXQgPSAhdGhpcy5pc0VkaXRcbiAgICAgICAgaWYgKHRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgdGhpcy5jbGVhckxpc3QoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGx1c0NvbGQgKGUpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCAmJiB2YWwudG90YWxDb3VudCA+IHRoaXMudmFsaWRhdGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCArK1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW5Db2xkIChlKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQgJiYgdmFsLnRvdGFsQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgLS1cbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfkuI3og73lho3lsJHllaYnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAtMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXlDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgIH0sXG4gICAgICBibHVyQ29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICBpZiAoa2V5VmFsIDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsLnRvdGFsQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQgJiYga2V5VmFsID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsLnRvdGFsQ291bnQgPD0gdGhpcy52YWxpZGF0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMFxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IGtleVZhbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghdmFsLmRpc2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgdmFsLmNvdW50IC0gdmFsLmluaXRDb3VudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWwuY291bnRcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0NhdGVnb3J5ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2F0ZWdvcnknXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VkaXQpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzRXhwaXJlKSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWNhcnQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI5riF56m65aSx5pWI5ZWG5ZOB77yM5YaN5o+Q5Lqk6K6i5Y2VJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOmAgOWHuue8lui+keeKtuaAgScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQ2hlY2sgKGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWVcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gIXZhbC5jaGVja2VkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChpdGVtLnRlbXBDb2xkLmxlbmd0aCA9PT0gaXRlbS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQWxsIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja0FsbCAoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDBcbiAgICAgICAgdmFyIGNoZWNrID0gMFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdG90YWwgKz0gaXRlbS5jb2xkbGlzdC5sZW5ndGhcbiAgICAgICAgICBjaGVjayArPSBpdGVtLnRlbXBDb2xkLmxlbmd0aFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbCwgY2hlY2spXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAodG90YWwgPT09IGNoZWNrKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjbGVhckV4cGlyZSAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICB0aGlzLmV4cGlyZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgIHRoaXMuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coaXRlbS50ZW1wQ29sZClcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouc291cmNlVHlwZSA9IHNvdXJjZS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBvYmouc291cmNlSWQgPSBzb3VyY2Uuc291cmNlSWRcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5ZWG5ZOBJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpO+8nycsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHRoYXQuZGVsZXRlRGF0YShyZXN1bHQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldENoZWNrZWQgKGFyciwgdmFsKSB7XG4gICAgICBpZiAoYXJyLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgYXJyLnB1c2godmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZih2YWwpLCAxKVxuICAgICAgfVxuICAgIH1cbiAgICBtYXhNb2RhbCAoY29udGVudCkge1xuICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogY29udGVudCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgIH0pXG4gICAgfVxuICAgIGRlbGV0ZURhdGEgKGpzb24sIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlTGlzdDogSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZURhdGEgKGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2FydExpc3QgPSBbXVxuICAgICAgdGhpcy5leHBpcmUgPSBbXVxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZpbmFscHJpY2UgPSAwXG4gICAgICB0aGlzLmZyZWlnaHQgPSAwXG4gICAgICB0aGlzLmNhcnRTdGF0dXMgPSB7fVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jYXJ0U3RhdHVzLnRvdGFscHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy5kaXNjb3VudCA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuY2FydFN0YXR1cy5tZW1iZXJQcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5maW5hbHByaWNlID0gZGF0YS5wYXlcbiAgICAgICAgICBfdGhpcy5mcmVpZ2h0ID0gZGF0YS5mcmVpZ2h0XG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IF90aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBpZiAob2JqLmNvbGRsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICBvYmouc2hvd1RpdGxlID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9iai5zaG93VGl0bGUgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jYXJ0TGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRQYWdlRGF0YShjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZmlsdGVyTGlzdCAocGFyZW50KSB7XG4gICAgICB2YXIgdGVtcEFyciA9IFtdXG4gICAgICB2YXIgdGVtcEV4cGlyZSA9IFtdXG4gICAgICB0ZW1wRXhwaXJlID0gcGFyZW50LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5rZWVwQ291bnQgPD0gdGhpcy52YWxpZGF0ZUNvdW50IHx8ICFpdGVtLmlzQWxsb3dTYWxlIHx8IGl0ZW0uYnV5Q291bnQgPiBpdGVtLmtlZXBDb3VudFxuICAgICAgfSlcbiAgICAgIHRlbXBFeHBpcmUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmRpc2FibGUgPSB0cnVlXG4gICAgICAgIHRoaXMuZXhwaXJlLnB1c2goaXRlbSlcbiAgICAgIH0pXG4gICAgICB0ZW1wQXJyID0gcGFyZW50LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5rZWVwQ291bnQgPiB0aGlzLnZhbGlkYXRlQ291bnQgJiYgaXRlbS5pc0FsbG93U2FsZSAmJiBpdGVtLmJ1eUNvdW50IDw9IGl0ZW0ua2VlcENvdW50XG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRlbXBBcnJcbiAgICB9XG4gICAgaW5pdENoaWxkIChwYXJlbnQpIHtcbiAgICAgIHZhciBjaGlsZCA9IFtdXG4gICAgICB2YXIgdGVtcEV4cGlyZSA9IHRoaXMuZmlsdGVyTGlzdChwYXJlbnQpXG4gICAgICB0ZW1wRXhwaXJlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgIG9iai5jb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmluaXRDb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgb2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICBvYmoudG90YWxDb3VudCA9IGl0ZW0ua2VlcENvdW50XG4gICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoZ29vZCwgdmFsLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IGdvb2Quc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGdvb2Quc291cmNlSWQsXG4gICAgICAgIGNvdW50OiB2YWxcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IF90aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBjbGVhckxpc3QgKCkge1xuICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgIGkuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICBpdGVtLnRlbXBDb2xkID0gW11cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwpXG4gICAgICAvLyDliKTmlq3nlKjmiLdtZW1iZXJIYXNoXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmlzRWRpdCA9IGZhbHNlXG4gICAgICB0aGlzLmNsZWFyTGlzdCgpXG4gICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcbiAgICAgIHRoaXMuaXNFZGl0ID0gZmFsc2VcbiAgICAgIHRoaXMuY2xlYXJMaXN0KClcbiAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKCgpID0+IHtcbiAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=