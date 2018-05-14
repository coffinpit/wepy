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
    }, _this2.$repeat = { "cartList": { "com": "counteCold", "props": "" }, "item": { "com": "counteCold", "props": "" } }, _this2.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:sourceId.sync": { "value": "item.sourceId", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" } }, "defect": { "type": "2" } }, _this2.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold", "v-on:blurEdit": "blurCold" } }, _this2.components = {
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
      isLoading: true
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
          _this6.cartStatus.totalprice = data.price;
          _this6.cartStatus.discount = data.reduction;
          _this6.cartStatus.memberPrice = data.memberPrice;
          _this6.finalprice = data.finalPrice;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGVmZWN0IiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwiaXNMb2FkaW5nIiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImxlbmd0aCIsIm1ldGhvZHMiLCJlZGl0VGFwIiwicGx1c0NvbGQiLCJlIiwic291cmNlSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZm9yRWFjaCIsIml0ZW0iLCJ2YWwiLCJjb3VudCIsInRvdGFsQ291bnQiLCJtYXhNb2RhbCIsImFkZENhcnREYXRhIiwiaW5pdFBhZ2VEYXRhIiwiJGFwcGx5IiwibWluQ29sZCIsImtleUNvbGQiLCJrZXlWYWwiLCJibHVyQ29sZCIsImNvbnNvbGUiLCJsb2ciLCJpbml0Q291bnQiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsImdvQXBwbHlWaXAiLCJjb2xkQ2hlY2siLCJ2YWx1ZSIsImNoZWNrZWQiLCJmaWx0ZXIiLCJjb2xkQWxsIiwiaW5kZXgiLCJjaGVja0FsbCIsInRvdGFsIiwiY2hlY2siLCJpIiwiZGVsZXRlVGFwIiwidGhhdCIsInJlc3VsdCIsInNvdXJjZSIsIm9iaiIsInNvdXJjZVR5cGUiLCJwdXNoIiwic2hvd1RvYXN0IiwidGl0bGUiLCJkdXJhdGlvbiIsImltYWdlIiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiZGVsZXRlRGF0YSIsImNhbmNlbCIsImFyciIsImluZGV4T2YiLCJzcGxpY2UiLCJqc29uIiwiY2IiLCJzb3VyY2VMaXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsIkh0dHBSZXF1ZXN0IiwiRGVsZXRlQ2FydEh0dHAiLCJ0aGVuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkdldENhcnRIdHRwIiwiZXJyb3IiLCJzaG93U3VjY2VzcyIsInRvdGFscHJpY2UiLCJwcmljZSIsImRpc2NvdW50IiwicmVkdWN0aW9uIiwibWVtYmVyUHJpY2UiLCJmaW5hbFByaWNlIiwiY2hpbGRPcmRlcnMiLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwic2hvd0ZhaWwiLCJjYXRjaCIsInBhcmVudCIsImNoaWxkIiwicGF0aCIsImNvdmVyIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJidXlDb3VudCIsImtlZXBDb3VudCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJBZGRDYXJ0SHR0cCIsImdldFRva2VuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxFQUE1QixFQUFaLEVBQTRDLFFBQU8sRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxFQUE1QixFQUFuRCxFLFNBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sZUFBbEIsRUFBa0MsUUFBTyxNQUF6QyxFQUFnRCxTQUFRLE9BQXhELEVBQWdFLE9BQU0sT0FBdEUsRUFBaEIs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VyxjQUFRQyxHQUFSLENBQVk1QyxJQUFaO0FBQ0EsV0FBS21CLE9BQUwsQ0FBYXNFLFdBQWIsQ0FBeUJnQyxXQUF6QixDQUFxQ3pILElBQXJDLEVBQTJDMkYsSUFBM0MsQ0FBZ0QsVUFBQ2QsR0FBRCxFQUFTO0FBQ3ZEbEMsZ0JBQVFDLEdBQVIsQ0FBWWlDLEdBQVo7QUFDQVEsY0FBTUEsSUFBTjtBQUNELE9BSEQ7QUFJRDs7OzZCQUNTO0FBQ1IsV0FBS3BGLEtBQUwsR0FBYSxLQUFLa0IsT0FBTCxDQUFhdUcsUUFBYixFQUFiO0FBQ0EvRSxjQUFRQyxHQUFSLENBQVksS0FBS3pCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsU0FBcEM7QUFDQTtBQUNBLFdBQUtvQixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtELFlBQUw7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUF0VitCLGVBQUtxRixJOztrQkFBbEJySSxJIiwiZmlsZSI6ImNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvdW50ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9pidcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wiY2FydExpc3RcIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJpdGVtXCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiY291bnRlQ29sZFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY291bnRcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnNvdXJjZUlkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zb3VyY2VJZFwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiMlwifX07XHJcbiRldmVudHMgPSB7XCJjb3VudGVDb2xkXCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NvbGRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW5Db2xkXCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNvbGRcIixcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDb2xkXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb3VudGVDb2xkOiBDb3VudGUsXG4gICAgICBjb3VudGVOb3JtYWw6IENvdW50ZSxcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdLFxuICAgICAgY2hlY2tlZExpc3Q6IFtdLFxuICAgICAgdGVtcENvbGRMaXN0OiBbXSxcbiAgICAgIHRlbXBOb3JtYWxMaXN0OiBbXSxcbiAgICAgIGNhcnRTdGF0dXM6IHt9LFxuICAgICAgY2FydExpc3Q6IFtdLFxuICAgICAgY29sZGxpc3Q6IFtdLFxuICAgICAgY29sZFRpdGxlOiAnJyxcbiAgICAgIGNvbGRDaGVja2VkOiBmYWxzZSxcbiAgICAgIHRlbXBDb2xkOiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgZmluYWxwcmljZTogMCxcbiAgICAgIGZyZWlnaHQ6IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB1c2VyTGV2ZWwgKCkge1xuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRUYXAgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgfSxcbiAgICAgIHBsdXNDb2xkIChlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICB2YWwuY291bnQgKytcbiAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBtaW5Db2xkIChlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICB2YWwuY291bnQgLS1cbiAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA8IDEpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5LiN6IO95YaN5bCR5ZWmJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgLTEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGtleUNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgfSxcbiAgICAgIGJsdXJDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgIGlmIChrZXlWYWwgPD0gMCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlWYWwgPiB2YWwudG90YWxDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSBrZXlWYWxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2codmFsLmluaXRDb3VudClcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCB2YWwuY291bnQgLSB2YWwuaW5pdENvdW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gdmFsLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydCdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQ2hlY2sgKGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudmFsdWVcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhbC5jaGVja2VkID0gIXZhbC5jaGVja2VkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChpdGVtLnRlbXBDb2xkLmxlbmd0aCA9PT0gaXRlbS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xkQWxsIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZCA9IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja0FsbCAoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDBcbiAgICAgICAgdmFyIGNoZWNrID0gMFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdG90YWwgKz0gaXRlbS5jb2xkbGlzdC5sZW5ndGhcbiAgICAgICAgICBjaGVjayArPSBpdGVtLnRlbXBDb2xkLmxlbmd0aFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbCwgY2hlY2spXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAodG90YWwgPT09IGNoZWNrKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpdGVtLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBbXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgaS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICBpdGVtLnRlbXBDb2xkID0gaXRlbS5jb2xkbGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVUYXAgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0udGVtcENvbGQuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5zb3VyY2VUeXBlID0gc291cmNlLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIG9iai5zb3VyY2VJZCA9IHNvdXJjZS5zb3VyY2VJZFxuICAgICAgICAgICAgcmVzdWx0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nllYblk4EnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5kZWxldGVEYXRhKHJlc3VsdCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhhdC5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2hlY2tlZCAoYXJyLCB2YWwpIHtcbiAgICAgIGlmIChhcnIuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICBhcnIucHVzaCh2YWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIuc3BsaWNlKGFyci5pbmRleE9mKHZhbCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIG1heE1vZGFsIChjb250ZW50KSB7XG4gICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiBjb250ZW50LFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlRGF0YSAoanNvbiwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlTGlzdDogSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZURhdGEgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5jYXJ0TGlzdCA9IFtdXG4gICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZpbmFscHJpY2UgPSAwXG4gICAgICB0aGlzLmZyZWlnaHQgPSAwXG4gICAgICB0aGlzLmNhcnRTdGF0dXMgPSB7fVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIHRoaXMuY2FydFN0YXR1cy50b3RhbHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIHRoaXMuY2FydFN0YXR1cy5kaXNjb3VudCA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgdGhpcy5jYXJ0U3RhdHVzLm1lbWJlclByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIHRoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIHRoaXMuZnJlaWdodCA9IGRhdGEuZnJlaWdodFxuICAgICAgICAgIGRhdGEuY2hpbGRPcmRlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmouZnJlaWdodCA9IGl0ZW0uZnJlaWdodFxuICAgICAgICAgICAgb2JqLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIG9iai50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgICBvYmouY29sZGxpc3QgPSB0aGlzLmluaXRDaGlsZChpdGVtLnNhbGVzVW5pdHMpXG4gICAgICAgICAgICBfdGhpcy5jYXJ0TGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIGlmIChpdGVtLmJ1eUNvdW50IDw9IGl0ZW0ua2VlcENvdW50KSB7XG4gICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgICAgb2JqLmluaXRDb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICB9XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGdvb2QsIHZhbCwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogZ29vZC5zb3VyY2VUeXBlLFxuICAgICAgICBzb3VyY2VJZDogZ29vZC5zb3VyY2VJZCxcbiAgICAgICAgY291bnQ6IHZhbFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwpXG4gICAgICAvLyDliKTmlq3nlKjmiLdtZW1iZXJIYXNoXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=