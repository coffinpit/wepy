'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

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
    }, _this2.$repeat = { "cartList": { "com": "counteCold", "props": "" }, "item": { "com": "counteCold", "props": "" } }, _this2.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:sourceId.sync": { "value": "item.sourceId", "for": "item.coldlist", "item": "item", "index": "index", "key": "index" } } }, _this2.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold", "v-on:blurEdit": "blurCold" } }, _this2.components = {
      counteCold: _counter2.default,
      counteNormal: _counter2.default
    }, _this2.data = {
      token: '',
      cartcount: [],
      checkedList: [],
      tempColdList: [],
      tempNormalList: [],
      cartStatus: {
        totalprice: '',
        discount: ''
      },
      cartList: [],
      coldlist: [],
      coldTitle: '',
      coldChecked: false,
      tempCold: [],
      isEdit: false,
      isNull: false,
      finalprice: 0,
      freight: 0,
      orderHash: ''
    }, _this2.computed = {
      userLevel: function userLevel() {
        if (this.$parent.globalData.userLevel === 0) {
          return false;
        } else if (this.$parent.globalData.userLevel === 1) {
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
        var _this6 = this;

        if (!this.isEdit) {
          this.applyOrder(function () {
            _wepy2.default.navigateTo({
              url: './order?hash=' + _this6.orderHash + '&order=' + JSON.stringify(_this6.cartList)
            });
          });
        }
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
      var _this7 = this;

      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.cartList = [];
      this.finalprice = 0;
      this.freight = 0;
      this.isNull = false;
      this.$parent.HttpRequest.GetCartHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          _this7.cartStatus.totalprice = data.price;
          _this7.cartStatus.discount = data.reduction;
          if (_this.$parent.globalData.userLevel === 0) {
            _this7.finalprice = data.finalPrice;
          } else if (_this.$parent.globalData.userLevel === 1) {
            _this7.finalprice = data.finalPrice;
          }
          _this7.freight = data.freight;
          if (data.childOrders.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
          }
          _this7.orderHash = data.hash;
          data.childOrders.forEach(function (item) {
            var obj = {};
            obj.title = item.title;
            obj.freight = item.freight;
            obj.coldChecked = false;
            obj.tempCold = [];
            obj.coldlist = _this7.initChild(item.salesUnits);
            _this.cartList.push(obj);
            _this.$apply();
          });
        }
        _this.$apply();
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
    key: 'applyOrder',
    value: function applyOrder(cb) {
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.ApplyOrderHttp(data).then(function (res) {
        console.log(res);
        cb && cb();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('cart');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJ0b3RhbHByaWNlIiwiZGlzY291bnQiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0Iiwib3JkZXJIYXNoIiwiY29tcHV0ZWQiLCJ1c2VyTGV2ZWwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIm1ldGhvZHMiLCJlZGl0VGFwIiwicGx1c0NvbGQiLCJlIiwic291cmNlSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiZm9yRWFjaCIsIml0ZW0iLCJ2YWwiLCJjb3VudCIsInRvdGFsQ291bnQiLCJtYXhNb2RhbCIsImFkZENhcnREYXRhIiwiaW5pdFBhZ2VEYXRhIiwiJGFwcGx5IiwibWluQ29sZCIsImtleUNvbGQiLCJrZXlWYWwiLCJibHVyQ29sZCIsImNvbnNvbGUiLCJsb2ciLCJpbml0Q291bnQiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0NhdGVnb3J5Iiwic3dpdGNoVGFiIiwiZ29PcmRlciIsImFwcGx5T3JkZXIiLCJKU09OIiwic3RyaW5naWZ5IiwiY29sZENoZWNrIiwidmFsdWUiLCJjaGVja2VkIiwiZmlsdGVyIiwibGVuZ3RoIiwiY29sZEFsbCIsImluZGV4IiwiY2hlY2tBbGwiLCJ0b3RhbCIsImNoZWNrIiwiaSIsImRlbGV0ZVRhcCIsInRoYXQiLCJyZXN1bHQiLCJzb3VyY2UiLCJvYmoiLCJzb3VyY2VUeXBlIiwicHVzaCIsInNob3dUb2FzdCIsInRpdGxlIiwiZHVyYXRpb24iLCJpbWFnZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImRlbGV0ZURhdGEiLCJjYW5jZWwiLCJhcnIiLCJpbmRleE9mIiwic3BsaWNlIiwianNvbiIsImNiIiwic291cmNlTGlzdCIsIkh0dHBSZXF1ZXN0IiwiRGVsZXRlQ2FydEh0dHAiLCJ0aGVuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIkdldENhcnRIdHRwIiwiZXJyb3IiLCJwcmljZSIsInJlZHVjdGlvbiIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImhhc2giLCJpbml0Q2hpbGQiLCJzYWxlc1VuaXRzIiwicGFyZW50IiwiY2hpbGQiLCJwYXRoIiwiY292ZXIiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicHJvZHVjdElkIiwic2FsZXNVbml0VHlwZSIsInNhbGVzVW5pdElkIiwiYnV5Q291bnQiLCJrZWVwQ291bnQiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJnb29kIiwiQWRkQ2FydEh0dHAiLCJBcHBseU9yZGVySHR0cCIsImdldFRva2VuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBWixFQUE0QyxRQUFPLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBbkQsRSxTQUNiQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLGVBQWxCLEVBQWtDLFFBQU8sTUFBekMsRUFBZ0QsU0FBUSxPQUF4RCxFQUFnRSxPQUFNLE9BQXRFLEVBQWhCLEVBQStGLG1CQUFrQixFQUFDLFNBQVEsWUFB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QUFiLENBQXlCNEIsV0FBekIsQ0FBcUN2SCxJQUFyQyxFQUEyQzZGLElBQTNDLENBQWdELFVBQUNaLEdBQUQsRUFBUztBQUN2RHJDLGdCQUFRQyxHQUFSLENBQVlvQyxHQUFaO0FBQ0FRLGNBQU1BLElBQU47QUFDRCxPQUhEO0FBSUQ7OzsrQkFDV0EsRSxFQUFJO0FBQ2QsVUFBSXpGLE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLb0IsT0FBTCxDQUFhc0UsV0FBYixDQUF5QjZCLGNBQXpCLENBQXdDeEgsSUFBeEMsRUFBOEM2RixJQUE5QyxDQUFtRCxVQUFDWixHQUFELEVBQVM7QUFDMURyQyxnQkFBUUMsR0FBUixDQUFZb0MsR0FBWjtBQUNBUSxjQUFNQSxJQUFOO0FBQ0QsT0FIRDtBQUlEOzs7NkJBQ1M7QUFDUixXQUFLeEYsS0FBTCxHQUFhLEtBQUtvQixPQUFMLENBQWFvRyxRQUFiLENBQXNCLE1BQXRCLENBQWI7QUFDQTtBQUNBLFdBQUtsRixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtELFlBQUw7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUF2VitCLGVBQUttRixJOztrQkFBbEJuSSxJIiwiZmlsZSI6ImNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvdW50ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9pidcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wiY2FydExpc3RcIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJpdGVtXCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiY291bnRlQ29sZFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY291bnRcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiaXRlbS5jb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnNvdXJjZUlkLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5zb3VyY2VJZFwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ29sZFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbkNvbGRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q29sZFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNvbGRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGNvdW50ZUNvbGQ6IENvdW50ZSxcbiAgICAgIGNvdW50ZU5vcm1hbDogQ291bnRlXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdLFxuICAgICAgY2hlY2tlZExpc3Q6IFtdLFxuICAgICAgdGVtcENvbGRMaXN0OiBbXSxcbiAgICAgIHRlbXBOb3JtYWxMaXN0OiBbXSxcbiAgICAgIGNhcnRTdGF0dXM6IHtcbiAgICAgICAgdG90YWxwcmljZTogJycsXG4gICAgICAgIGRpc2NvdW50OiAnJ1xuICAgICAgfSxcbiAgICAgIGNhcnRMaXN0OiBbXSxcbiAgICAgIGNvbGRsaXN0OiBbXSxcbiAgICAgIGNvbGRUaXRsZTogJycsXG4gICAgICBjb2xkQ2hlY2tlZDogZmFsc2UsXG4gICAgICB0ZW1wQ29sZDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIGZpbmFscHJpY2U6IDAsXG4gICAgICBmcmVpZ2h0OiAwLFxuICAgICAgb3JkZXJIYXNoOiAnJ1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHVzZXJMZXZlbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0VGFwICgpIHtcbiAgICAgICAgdGhpcy5pc0VkaXQgPSAhdGhpcy5pc0VkaXRcbiAgICAgIH0sXG4gICAgICBwbHVzQ29sZCAoZSkge1xuICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQpIHtcbiAgICAgICAgICAgICAgdmFsLmNvdW50ICsrXG4gICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPiB2YWwudG90YWxDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgbWluQ29sZCAoZSkge1xuICAgICAgICB2YXIgc291cmNlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gc291cmNlSWQpIHtcbiAgICAgICAgICAgICAgdmFsLmNvdW50IC0tXG4gICAgICAgICAgICAgIGlmICh2YWwuY291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gMVxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+S4jeiDveWGjeWwkeWVpicpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSh2YWwsIC0xLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBrZXlDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgIH0sXG4gICAgICBibHVyQ29sZCAoa2V5VmFsLCBlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICBpZiAoa2V5VmFsIDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5VmFsID4gdmFsLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSB2YWwudG90YWxDb3VudFxuICAgICAgICAgICAgICAgIHRoaXMubWF4TW9kYWwoJ+aVsOmHj+W3sui+vuS4iumZkCcpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0ga2V5VmFsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbC5pbml0Q291bnQpXG4gICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgdmFsLmNvdW50IC0gdmFsLmluaXRDb3VudCwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHZhbC5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ2F0ZWdvcnkgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb09yZGVyICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRWRpdCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlPcmRlcigoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyP2hhc2g9JyArIHRoaXMub3JkZXJIYXNoICsgJyZvcmRlcj0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5jYXJ0TGlzdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbGRDaGVjayAoZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSAhdmFsLmNoZWNrZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGl0ZW0udGVtcENvbGQubGVuZ3RoID09PSBpdGVtLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGRBbGwgKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZC5sZW5ndGggPT09IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSBbXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3RcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoZWNrQWxsICgpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMFxuICAgICAgICB2YXIgY2hlY2sgPSAwXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICB0b3RhbCArPSBpdGVtLmNvbGRsaXN0Lmxlbmd0aFxuICAgICAgICAgIGNoZWNrICs9IGl0ZW0udGVtcENvbGQubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHRvdGFsLCBjaGVjaylcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmICh0b3RhbCA9PT0gY2hlY2spIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS50ZW1wQ29sZC5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBzb3VyY2Uuc291cmNlVHlwZVxuICAgICAgICAgICAgb2JqLnNvdXJjZUlkID0gc291cmNlLnNvdXJjZUlkXG4gICAgICAgICAgICByZXN1bHQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGF0LmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRDaGVja2VkIChhcnIsIHZhbCkge1xuICAgICAgaWYgKGFyci5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgIGFyci5wdXNoKHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5zcGxpY2UoYXJyLmluZGV4T2YodmFsKSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgbWF4TW9kYWwgKGNvbnRlbnQpIHtcbiAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IGNvbnRlbnQsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVEYXRhIChqc29uLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VMaXN0OiBKU09OLnN0cmluZ2lmeShqc29uKVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUNhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlRGF0YSAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLmNhcnRMaXN0ID0gW11cbiAgICAgIHRoaXMuZmluYWxwcmljZSA9IDBcbiAgICAgIHRoaXMuZnJlaWdodCA9IDBcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICB0aGlzLmNhcnRTdGF0dXMudG90YWxwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICB0aGlzLmNhcnRTdGF0dXMuZGlzY291bnQgPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBpZiAoZGF0YS5jaGlsZE9yZGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vcmRlckhhc2ggPSBkYXRhLmhhc2hcbiAgICAgICAgICBkYXRhLmNoaWxkT3JkZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgb2JqLmZyZWlnaHQgPSBpdGVtLmZyZWlnaHRcbiAgICAgICAgICAgIG9iai5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICBvYmoudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgb2JqLmNvbGRsaXN0ID0gdGhpcy5pbml0Q2hpbGQoaXRlbS5zYWxlc1VuaXRzKVxuICAgICAgICAgICAgX3RoaXMuY2FydExpc3QucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRDaGlsZCAocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBbXVxuICAgICAgcGFyZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgIG9iai5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgb2JqLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICBvYmouaWQgPSBpdGVtLnByb2R1Y3RJZFxuICAgICAgICBvYmouc291cmNlVHlwZSA9IGl0ZW0uc2FsZXNVbml0VHlwZVxuICAgICAgICBvYmouc291cmNlSWQgPSBpdGVtLnNhbGVzVW5pdElkXG4gICAgICAgIGlmIChpdGVtLmJ1eUNvdW50IDw9IGl0ZW0ua2VlcENvdW50KSB7XG4gICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0uYnV5Q291bnRcbiAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgICAgb2JqLmluaXRDb3VudCA9IGl0ZW0uYnV5Q291bnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmouZGV0YWlsID0gaXRlbS52aWNlVGl0bGUgKyAnw5cnICsgaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouY291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICB9XG4gICAgICAgIG9iai5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgb2JqLnRvdGFsQ291bnQgPSBpdGVtLmtlZXBDb3VudFxuICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGdvb2QsIHZhbCwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogZ29vZC5zb3VyY2VUeXBlLFxuICAgICAgICBzb3VyY2VJZDogZ29vZC5zb3VyY2VJZCxcbiAgICAgICAgY291bnQ6IHZhbFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBhcHBseU9yZGVyIChjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQXBwbHlPcmRlckh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2NhcnQnKVxuICAgICAgLy8g5Yik5pat55So5oi3bWVtYmVySGFzaFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19