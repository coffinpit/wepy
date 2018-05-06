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
      userLevel: 0
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
            url: './order'
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
      var _this6 = this;

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
          _this6.cartStatus.totalprice = data.price;
          _this6.cartStatus.discount = data.reduction;
          if (_this.$parent.globalData.userLevel === 0) {
            _this6.finalprice = data.finalPrice;
          } else if (_this.$parent.globalData.userLevel === 1) {
            _this6.finalprice = data.finalPrice;
          }
          _this6.freight = data.freight;
          if (data.childOrders.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
          }
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
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('cart');
      console.log(this.$parent.globalData.userLevel);
      if (this.$parent.globalData.userLevel === 0) {
        this.userLevel = false;
      } else if (this.$parent.globalData.userLevel === 1) {
        this.userLevel = true;
      }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiZGF0YSIsInRva2VuIiwiY2FydGNvdW50IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsImNhcnRTdGF0dXMiLCJ0b3RhbHByaWNlIiwiZGlzY291bnQiLCJjYXJ0TGlzdCIsImNvbGRsaXN0IiwiY29sZFRpdGxlIiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsImlzRWRpdCIsImlzTnVsbCIsImZpbmFscHJpY2UiLCJmcmVpZ2h0IiwidXNlckxldmVsIiwibWV0aG9kcyIsImVkaXRUYXAiLCJwbHVzQ29sZCIsImUiLCJzb3VyY2VJZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJmb3JFYWNoIiwiaXRlbSIsInZhbCIsImNvdW50IiwidG90YWxDb3VudCIsIm1heE1vZGFsIiwiYWRkQ2FydERhdGEiLCJpbml0UGFnZURhdGEiLCIkYXBwbHkiLCJtaW5Db2xkIiwia2V5Q29sZCIsImtleVZhbCIsImJsdXJDb2xkIiwiY29uc29sZSIsImxvZyIsImluaXRDb3VudCIsImdvRGV0YWlsIiwibmF2aWdhdGVUbyIsInVybCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJnb09yZGVyIiwiY29sZENoZWNrIiwidmFsdWUiLCJjaGVja2VkIiwiZmlsdGVyIiwibGVuZ3RoIiwiY29sZEFsbCIsImluZGV4IiwiY2hlY2tBbGwiLCJ0b3RhbCIsImNoZWNrIiwiaSIsImRlbGV0ZVRhcCIsInRoYXQiLCJyZXN1bHQiLCJzb3VyY2UiLCJvYmoiLCJzb3VyY2VUeXBlIiwicHVzaCIsInNob3dUb2FzdCIsInRpdGxlIiwiZHVyYXRpb24iLCJpbWFnZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImRlbGV0ZURhdGEiLCJjYW5jZWwiLCJhcnIiLCJpbmRleE9mIiwic3BsaWNlIiwianNvbiIsImNiIiwic291cmNlTGlzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJEZWxldGVDYXJ0SHR0cCIsInRoZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwiR2V0Q2FydEh0dHAiLCJlcnJvciIsInByaWNlIiwicmVkdWN0aW9uIiwiZ2xvYmFsRGF0YSIsImZpbmFsUHJpY2UiLCJjaGlsZE9yZGVycyIsImluaXRDaGlsZCIsInNhbGVzVW5pdHMiLCJwYXJlbnQiLCJjaGlsZCIsInBhdGgiLCJjb3ZlciIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJwcm9kdWN0SWQiLCJzYWxlc1VuaXRUeXBlIiwic2FsZXNVbml0SWQiLCJidXlDb3VudCIsImtlZXBDb3VudCIsImRldGFpbCIsInZpY2VUaXRsZSIsImdvb2QiLCJBZGRDYXJ0SHR0cCIsImdldFRva2VuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBWixFQUE0QyxRQUFPLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsRUFBNUIsRUFBbkQsRSxTQUNiQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLGVBQWxCLEVBQWtDLFFBQU8sTUFBekMsRUFBZ0QsU0FBUSxPQUF4RCxFQUFnRSxPQUFNLE9BQXRFLEVBQWhCLEVBQStGLG1CQUFrQixFQUFDLFNBQVEsWUFBVCxFQUFzQixPQUFNLGVBQTVCLEVBQTRDLFFBQU8sTUFBbkQsRUFBMEQsU0FBUSxPQUFsRSxFQUEwRSxPQUFNLE9BQWhGLEVBQWpILEVBQTBNLGNBQWEsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLGVBQWxCLEVBQWtDLFFBQU8sTUFBekMsRUFBZ0QsU0FBUSxPQUF4RCxFQUFnRSxPQUFNLE9BQXRFLEVBQXZOLEVBQXNTLHdCQUF1QixFQUFDLFNBQVEsZUFBVCxFQUF5QixPQUFNLGVBQS9CLEVBQStDLFFBQU8sTUFBdEQsRUFBNkQsU0FBUSxPQUFyRSxFQUE2RSxPQUFNLE9BQW5GLEVBQTdULEVBQWQsRSxTQUNUQyxPLEdBQVUsRUFBQyxjQUFhLEVBQUMsaUJBQWdCLFVBQWpCLEVBQTRCLGtCQUFpQixTQUE3QyxFQUF1RCxnQkFBZSxTQUF0RSxFQUFnRixpQkFBZ0IsVUFBaEcsRUFBZCxFLFNBQ1RDLFUsR0FBYTtBQUNSQyxtQ0FEUTtBQUVSQztBQUZRLEssU0FJVkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLG1CQUFhLEVBSFI7QUFJTEMsb0JBQWMsRUFKVDtBQUtMQyxzQkFBZ0IsRUFMWDtBQU1MQyxrQkFBWTtBQUNWQyxvQkFBWSxFQURGO0FBRVZDLGtCQUFVO0FBRkEsT0FOUDtBQVVMQyxnQkFBVSxFQVZMO0FBV0xDLGdCQUFVLEVBWEw7QUFZTEMsaUJBQVcsRUFaTjtBQWFMQyxtQkFBYSxLQWJSO0FBY0xDLGdCQUFVLEVBZEw7QUFlTEMsY0FBUSxLQWZIO0FBZ0JMQyxjQUFRLEtBaEJIO0FBaUJMQyxrQkFBWSxDQWpCUDtBQWtCTEMsZUFBUyxDQWxCSjtBQW1CTEMsaUJBQVc7QUFuQk4sSyxTQXFCUEMsTyxHQUFVO0FBQ1JDLGFBRFEscUJBQ0c7QUFDVCxhQUFLTixNQUFMLEdBQWMsQ0FBQyxLQUFLQSxNQUFwQjtBQUNELE9BSE87QUFJUk8sY0FKUSxvQkFJRUMsQ0FKRixFQUlLO0FBQUE7O0FBQ1gsWUFBSUMsV0FBV0QsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXZDO0FBQ0EsYUFBS2pCLFFBQUwsQ0FBY2tCLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzlCQSxlQUFLbEIsUUFBTCxDQUFjaUIsT0FBZCxDQUFzQixVQUFDRSxHQUFELEVBQVM7QUFDN0IsZ0JBQUlBLElBQUlOLFFBQUosS0FBaUJBLFFBQXJCLEVBQStCO0FBQzdCTSxrQkFBSUMsS0FBSjtBQUNBLGtCQUFJRCxJQUFJQyxLQUFKLEdBQVlELElBQUlFLFVBQXBCLEVBQWdDO0FBQzlCRixvQkFBSUMsS0FBSixHQUFZRCxJQUFJRSxVQUFoQjtBQUNBLHVCQUFLQyxRQUFMLENBQWMsUUFBZDtBQUNELGVBSEQsTUFHTztBQUNMO0FBQ0EsdUJBQUtDLFdBQUwsQ0FBaUJKLEdBQWpCLEVBQXNCLENBQXRCLEVBQXlCLFlBQU07QUFDN0IseUJBQUtLLFlBQUw7QUFDRCxpQkFGRDtBQUdEO0FBQ0Y7QUFDRixXQWJEO0FBY0QsU0FmRDtBQWdCQSxhQUFLQyxNQUFMO0FBQ0QsT0F2Qk87QUF3QlJDLGFBeEJRLG1CQXdCQ2QsQ0F4QkQsRUF3Qkk7QUFBQTs7QUFDVixZQUFJQyxXQUFXRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsRUFBdkM7QUFDQSxhQUFLakIsUUFBTCxDQUFja0IsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDOUJBLGVBQUtsQixRQUFMLENBQWNpQixPQUFkLENBQXNCLFVBQUNFLEdBQUQsRUFBUztBQUM3QixnQkFBSUEsSUFBSU4sUUFBSixLQUFpQkEsUUFBckIsRUFBK0I7QUFDN0JNLGtCQUFJQyxLQUFKO0FBQ0Esa0JBQUlELElBQUlDLEtBQUosR0FBWSxDQUFoQixFQUFtQjtBQUNqQkQsb0JBQUlDLEtBQUosR0FBWSxDQUFaO0FBQ0EsdUJBQUtFLFFBQUwsQ0FBYyxPQUFkO0FBQ0QsZUFIRCxNQUdPO0FBQ0w7QUFDQSx1QkFBS0MsV0FBTCxDQUFpQkosR0FBakIsRUFBc0IsQ0FBQyxDQUF2QixFQUEwQixZQUFNO0FBQzlCLHlCQUFLSyxZQUFMO0FBQ0QsaUJBRkQ7QUFHRDtBQUNGO0FBQ0YsV0FiRDtBQWNELFNBZkQ7QUFnQkEsYUFBS0MsTUFBTDtBQUNELE9BM0NPO0FBNENSRSxhQTVDUSxtQkE0Q0NDLE1BNUNELEVBNENTaEIsQ0E1Q1QsRUE0Q1ksQ0FDbkIsQ0E3Q087QUE4Q1JpQixjQTlDUSxvQkE4Q0VELE1BOUNGLEVBOENVaEIsQ0E5Q1YsRUE4Q2E7QUFBQTs7QUFDbkIsWUFBSUMsV0FBV0QsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXZDO0FBQ0EsYUFBS2pCLFFBQUwsQ0FBY2tCLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzlCQSxlQUFLbEIsUUFBTCxDQUFjaUIsT0FBZCxDQUFzQixVQUFDRSxHQUFELEVBQVM7QUFDN0IsZ0JBQUlBLElBQUlOLFFBQUosS0FBaUJBLFFBQXJCLEVBQStCO0FBQzdCLGtCQUFJZSxVQUFVLENBQWQsRUFBaUI7QUFDZlQsb0JBQUlDLEtBQUosR0FBWSxDQUFaO0FBQ0QsZUFGRCxNQUVPLElBQUlRLFNBQVNULElBQUlFLFVBQWpCLEVBQTZCO0FBQ2xDRixvQkFBSUMsS0FBSixHQUFZRCxJQUFJRSxVQUFoQjtBQUNBLHVCQUFLQyxRQUFMLENBQWMsUUFBZDtBQUNELGVBSE0sTUFHQTtBQUNMSCxvQkFBSUMsS0FBSixHQUFZUSxNQUFaO0FBQ0Q7QUFDRjtBQUNERSxvQkFBUUMsR0FBUixDQUFZWixJQUFJYSxTQUFoQjtBQUNBLG1CQUFLVCxXQUFMLENBQWlCSixHQUFqQixFQUFzQkEsSUFBSUMsS0FBSixHQUFZRCxJQUFJYSxTQUF0QyxFQUFpRCxZQUFNO0FBQ3JELHFCQUFLUixZQUFMO0FBQ0QsYUFGRDtBQUdBLG1CQUFPTCxJQUFJQyxLQUFYO0FBQ0QsV0FoQkQ7QUFpQkQsU0FsQkQ7QUFtQkQsT0FuRU87QUFvRVJhLGNBcEVRLG9CQW9FRWpCLEVBcEVGLEVBb0VNO0FBQ1pjLGdCQUFRQyxHQUFSLENBQVlmLEVBQVo7QUFDQSx1QkFBS2tCLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxpQkFBaUJuQjtBQURSLFNBQWhCO0FBR0QsT0F6RU87QUEwRVJvQixnQkExRVEsd0JBMEVNO0FBQ1osdUJBQUtDLFNBQUwsQ0FBZTtBQUNiRixlQUFLO0FBRFEsU0FBZjtBQUdELE9BOUVPO0FBK0VSRyxhQS9FUSxxQkErRUc7QUFDVCxZQUFJLENBQUMsS0FBS2xDLE1BQVYsRUFBa0I7QUFDaEIseUJBQUs4QixVQUFMLENBQWdCO0FBQ2RDLGlCQUFLO0FBRFMsV0FBaEI7QUFHRDtBQUNGLE9BckZPO0FBc0ZSSSxlQXRGUSxxQkFzRkczQixDQXRGSCxFQXNGTTtBQUNaLFlBQUk0QixRQUFRNUIsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0J5QixLQUFwQztBQUNBLGFBQUt6QyxRQUFMLENBQWNrQixPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QkEsZUFBS2xCLFFBQUwsQ0FBY2lCLE9BQWQsQ0FBc0IsVUFBQ0UsR0FBRCxFQUFTO0FBQzdCLGdCQUFJQSxJQUFJTixRQUFKLEtBQWlCMkIsS0FBckIsRUFBNEI7QUFDMUJyQixrQkFBSXNCLE9BQUosR0FBYyxDQUFDdEIsSUFBSXNCLE9BQW5CO0FBQ0Q7QUFDRixXQUpEO0FBS0F2QixlQUFLZixRQUFMLEdBQWdCZSxLQUFLbEIsUUFBTCxDQUFjMEMsTUFBZCxDQUFxQixVQUFDeEIsSUFBRCxFQUFVO0FBQzdDLG1CQUFPQSxLQUFLdUIsT0FBWjtBQUNELFdBRmUsQ0FBaEI7QUFHQSxjQUFJdkIsS0FBS2YsUUFBTCxDQUFjd0MsTUFBZCxLQUF5QnpCLEtBQUtsQixRQUFMLENBQWMyQyxNQUEzQyxFQUFtRDtBQUNqRHpCLGlCQUFLaEIsV0FBTCxHQUFtQixJQUFuQjtBQUNELFdBRkQsTUFFTztBQUNMZ0IsaUJBQUtoQixXQUFMLEdBQW1CLEtBQW5CO0FBQ0Q7QUFDRixTQWREO0FBZUQsT0F2R087QUF3R1IwQyxhQXhHUSxtQkF3R0NDLEtBeEdELEVBd0dRO0FBQ2QsWUFBSSxLQUFLOUMsUUFBTCxDQUFjOEMsS0FBZCxFQUFxQjFDLFFBQXJCLENBQThCd0MsTUFBOUIsS0FBeUMsS0FBSzVDLFFBQUwsQ0FBYzhDLEtBQWQsRUFBcUI3QyxRQUFyQixDQUE4QjJDLE1BQTNFLEVBQW1GO0FBQ2pGLGVBQUs1QyxRQUFMLENBQWM4QyxLQUFkLEVBQXFCN0MsUUFBckIsQ0FBOEJpQixPQUE5QixDQUFzQyxVQUFDQyxJQUFELEVBQVU7QUFDOUNBLGlCQUFLdUIsT0FBTCxHQUFlLEtBQWY7QUFDRCxXQUZEO0FBR0EsZUFBSzFDLFFBQUwsQ0FBYzhDLEtBQWQsRUFBcUIzQyxXQUFyQixHQUFtQyxLQUFuQztBQUNBLGVBQUtILFFBQUwsQ0FBYzhDLEtBQWQsRUFBcUIxQyxRQUFyQixHQUFnQyxFQUFoQztBQUNELFNBTkQsTUFNTztBQUNMLGVBQUtKLFFBQUwsQ0FBYzhDLEtBQWQsRUFBcUI3QyxRQUFyQixDQUE4QmlCLE9BQTlCLENBQXNDLFVBQUNDLElBQUQsRUFBVTtBQUM5Q0EsaUJBQUt1QixPQUFMLEdBQWUsSUFBZjtBQUNELFdBRkQ7QUFHQSxlQUFLMUMsUUFBTCxDQUFjOEMsS0FBZCxFQUFxQjNDLFdBQXJCLEdBQW1DLElBQW5DO0FBQ0EsZUFBS0gsUUFBTCxDQUFjOEMsS0FBZCxFQUFxQjFDLFFBQXJCLEdBQWdDLEtBQUtKLFFBQUwsQ0FBYzhDLEtBQWQsRUFBcUI3QyxRQUFyRDtBQUNEO0FBQ0YsT0F0SE87QUF1SFI4QyxjQXZIUSxzQkF1SEk7QUFDVixZQUFJQyxRQUFRLENBQVo7QUFDQSxZQUFJQyxRQUFRLENBQVo7QUFDQSxhQUFLakQsUUFBTCxDQUFja0IsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQU8yQixLQUFQLEVBQWlCO0FBQ3JDRSxtQkFBUzdCLEtBQUtsQixRQUFMLENBQWMyQyxNQUF2QjtBQUNBSyxtQkFBUzlCLEtBQUtmLFFBQUwsQ0FBY3dDLE1BQXZCO0FBQ0QsU0FIRDtBQUlBYixnQkFBUUMsR0FBUixDQUFZZ0IsS0FBWixFQUFtQkMsS0FBbkI7QUFDQSxhQUFLakQsUUFBTCxDQUFja0IsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQU8yQixLQUFQLEVBQWlCO0FBQ3JDLGNBQUlFLFVBQVVDLEtBQWQsRUFBcUI7QUFDbkI5QixpQkFBS2xCLFFBQUwsQ0FBY2lCLE9BQWQsQ0FBc0IsVUFBQ2dDLENBQUQsRUFBTztBQUMzQkEsZ0JBQUVSLE9BQUYsR0FBWSxLQUFaO0FBQ0QsYUFGRDtBQUdBdkIsaUJBQUtoQixXQUFMLEdBQW1CLEtBQW5CO0FBQ0FnQixpQkFBS2YsUUFBTCxHQUFnQixFQUFoQjtBQUNELFdBTkQsTUFNTztBQUNMZSxpQkFBS2xCLFFBQUwsQ0FBY2lCLE9BQWQsQ0FBc0IsVUFBQ2dDLENBQUQsRUFBTztBQUMzQkEsZ0JBQUVSLE9BQUYsR0FBWSxJQUFaO0FBQ0QsYUFGRDtBQUdBdkIsaUJBQUtoQixXQUFMLEdBQW1CLElBQW5CO0FBQ0FnQixpQkFBS2YsUUFBTCxHQUFnQmUsS0FBS2xCLFFBQXJCO0FBQ0Q7QUFDRixTQWREO0FBZUQsT0E5SU87QUErSVJrRCxlQS9JUSx1QkErSUs7QUFDWCxZQUFJQyxPQUFPLElBQVg7QUFDQSxZQUFJQyxTQUFTLEVBQWI7QUFDQSxhQUFLckQsUUFBTCxDQUFja0IsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDOUJBLGVBQUtmLFFBQUwsQ0FBY2MsT0FBZCxDQUFzQixVQUFDb0MsTUFBRCxFQUFZO0FBQ2hDLGdCQUFJQyxNQUFNLEVBQVY7QUFDQUEsZ0JBQUlDLFVBQUosR0FBaUJGLE9BQU9FLFVBQXhCO0FBQ0FELGdCQUFJekMsUUFBSixHQUFld0MsT0FBT3hDLFFBQXRCO0FBQ0F1QyxtQkFBT0ksSUFBUCxDQUFZRixHQUFaO0FBQ0QsV0FMRDtBQU1ELFNBUEQ7QUFRQSxZQUFJRixPQUFPVCxNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLHlCQUFLYyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sT0FETTtBQUViQyxzQkFBVSxJQUZHO0FBR2JDLG1CQUFPO0FBSE0sV0FBZjtBQUtELFNBTkQsTUFNTztBQUNMLHlCQUFLQyxTQUFMLENBQWU7QUFDYkgsbUJBQU8sSUFETTtBQUViSSxxQkFBUyxPQUZJO0FBR2JDLHFCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsa0JBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDZmQscUJBQUtlLFVBQUwsQ0FBZ0JkLE1BQWhCLEVBQXdCLFlBQU07QUFDNUJELHVCQUFLM0IsWUFBTDtBQUNBMkIsdUJBQUsxQixNQUFMO0FBQ0QsaUJBSEQ7QUFJRDtBQUNELGtCQUFJdUMsSUFBSUcsTUFBUixFQUFnQixDQUNmO0FBQ0Y7QUFaWSxXQUFmO0FBY0Q7QUFDRjtBQWhMTyxLOzs7OzsrQkFrTEVDLEcsRUFBS2pELEcsRUFBSztBQUNwQixVQUFJaUQsSUFBSUMsT0FBSixDQUFZbEQsR0FBWixNQUFxQixDQUFDLENBQTFCLEVBQTZCO0FBQzNCaUQsWUFBSVosSUFBSixDQUFTckMsR0FBVDtBQUNELE9BRkQsTUFFTztBQUNMaUQsWUFBSUUsTUFBSixDQUFXRixJQUFJQyxPQUFKLENBQVlsRCxHQUFaLENBQVgsRUFBNkIsQ0FBN0I7QUFDRDtBQUNGOzs7NkJBQ1MyQyxPLEVBQVM7QUFDakIscUJBQUtMLFNBQUwsQ0FBZTtBQUNiQyxlQUFPSSxPQURNO0FBRWJILGtCQUFVLElBRkc7QUFHYkMsZUFBTztBQUhNLE9BQWY7QUFLRDs7OytCQUNXVyxJLEVBQU1DLEUsRUFBSTtBQUNwQixVQUFJbEYsT0FBTztBQUNUQyxlQUFPLEtBQUtBLEtBREg7QUFFVGtGLG9CQUFZQyxLQUFLQyxTQUFMLENBQWVKLElBQWY7QUFGSCxPQUFYO0FBSUEsV0FBS0ssT0FBTCxDQUFhQyxXQUFiLENBQXlCQyxjQUF6QixDQUF3Q3hGLElBQXhDLEVBQThDeUYsSUFBOUMsQ0FBbUQsVUFBQ2YsR0FBRCxFQUFTO0FBQzFEbEMsZ0JBQVFDLEdBQVIsQ0FBWWlDLEdBQVo7QUFDQVEsY0FBTUEsSUFBTjtBQUNELE9BSEQ7QUFJRDs7O21DQUNlO0FBQUE7O0FBQ2QsV0FBS0ksT0FBTCxDQUFhSSxXQUFiO0FBQ0EsVUFBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBSTNGLE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLUSxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsV0FBS08sVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS0YsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLdUUsT0FBTCxDQUFhQyxXQUFiLENBQXlCSyxXQUF6QixDQUFxQzVGLElBQXJDLEVBQTJDeUYsSUFBM0MsQ0FBZ0QsVUFBQ2YsR0FBRCxFQUFTO0FBQ3ZEbEMsZ0JBQVFDLEdBQVIsQ0FBWWlDLEdBQVo7QUFDQSxZQUFJQSxJQUFJMUUsSUFBSixDQUFTNkYsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixjQUFJN0YsT0FBTzBFLElBQUkxRSxJQUFKLENBQVNBLElBQXBCO0FBQ0EsaUJBQUtNLFVBQUwsQ0FBZ0JDLFVBQWhCLEdBQTZCUCxLQUFLOEYsS0FBbEM7QUFDQSxpQkFBS3hGLFVBQUwsQ0FBZ0JFLFFBQWhCLEdBQTJCUixLQUFLK0YsU0FBaEM7QUFDQSxjQUFJSixNQUFNTCxPQUFOLENBQWNVLFVBQWQsQ0FBeUI5RSxTQUF6QixLQUF1QyxDQUEzQyxFQUE4QztBQUM1QyxtQkFBS0YsVUFBTCxHQUFrQmhCLEtBQUtpRyxVQUF2QjtBQUNELFdBRkQsTUFFTyxJQUFJTixNQUFNTCxPQUFOLENBQWNVLFVBQWQsQ0FBeUI5RSxTQUF6QixLQUF1QyxDQUEzQyxFQUE4QztBQUNuRCxtQkFBS0YsVUFBTCxHQUFrQmhCLEtBQUtpRyxVQUF2QjtBQUNEO0FBQ0QsaUJBQUtoRixPQUFMLEdBQWVqQixLQUFLaUIsT0FBcEI7QUFDQSxjQUFJakIsS0FBS2tHLFdBQUwsQ0FBaUI3QyxNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQ3NDLGtCQUFNNUUsTUFBTixHQUFlLElBQWY7QUFDRCxXQUZELE1BRU87QUFDTDRFLGtCQUFNNUUsTUFBTixHQUFlLEtBQWY7QUFDRDtBQUNEZixlQUFLa0csV0FBTCxDQUFpQnZFLE9BQWpCLENBQXlCLFVBQUNDLElBQUQsRUFBVTtBQUNqQyxnQkFBSW9DLE1BQU0sRUFBVjtBQUNBQSxnQkFBSUksS0FBSixHQUFZeEMsS0FBS3dDLEtBQWpCO0FBQ0FKLGdCQUFJL0MsT0FBSixHQUFjVyxLQUFLWCxPQUFuQjtBQUNBK0MsZ0JBQUlwRCxXQUFKLEdBQWtCLEtBQWxCO0FBQ0FvRCxnQkFBSW5ELFFBQUosR0FBZSxFQUFmO0FBQ0FtRCxnQkFBSXRELFFBQUosR0FBZSxPQUFLeUYsU0FBTCxDQUFldkUsS0FBS3dFLFVBQXBCLENBQWY7QUFDQVQsa0JBQU1sRixRQUFOLENBQWV5RCxJQUFmLENBQW9CRixHQUFwQjtBQUNBMkIsa0JBQU14RCxNQUFOO0FBQ0QsV0FURDtBQVVEO0FBQ0R3RCxjQUFNeEQsTUFBTjtBQUNELE9BN0JEO0FBOEJEOzs7OEJBQ1VrRSxNLEVBQVE7QUFDakIsVUFBSUMsUUFBUSxFQUFaO0FBQ0FELGFBQU8xRSxPQUFQLENBQWUsVUFBQ0MsSUFBRCxFQUFVO0FBQ3ZCLFlBQUlvQyxNQUFNLEVBQVY7QUFDQUEsWUFBSXVDLElBQUosR0FBVzNFLEtBQUs0RSxLQUFoQjtBQUNBeEMsWUFBSUksS0FBSixHQUFZeEMsS0FBS3dDLEtBQWpCO0FBQ0FKLFlBQUk4QixLQUFKLEdBQVlsRSxLQUFLNkUsV0FBakI7QUFDQXpDLFlBQUkwQyxRQUFKLEdBQWU5RSxLQUFLa0UsS0FBcEI7QUFDQTlCLFlBQUl0QyxFQUFKLEdBQVNFLEtBQUsrRSxTQUFkO0FBQ0EzQyxZQUFJQyxVQUFKLEdBQWlCckMsS0FBS2dGLGFBQXRCO0FBQ0E1QyxZQUFJekMsUUFBSixHQUFlSyxLQUFLaUYsV0FBcEI7QUFDQSxZQUFJakYsS0FBS2tGLFFBQUwsSUFBaUJsRixLQUFLbUYsU0FBMUIsRUFBcUM7QUFDbkMvQyxjQUFJZ0QsTUFBSixHQUFhcEYsS0FBS3FGLFNBQUwsR0FBaUIsR0FBakIsR0FBdUJyRixLQUFLa0YsUUFBekM7QUFDQTlDLGNBQUlsQyxLQUFKLEdBQVlGLEtBQUtrRixRQUFqQjtBQUNBOUMsY0FBSXRCLFNBQUosR0FBZ0JkLEtBQUtrRixRQUFyQjtBQUNELFNBSkQsTUFJTztBQUNMOUMsY0FBSWdELE1BQUosR0FBYXBGLEtBQUtxRixTQUFMLEdBQWlCLEdBQWpCLEdBQXVCckYsS0FBS21GLFNBQXpDO0FBQ0EvQyxjQUFJbEMsS0FBSixHQUFZRixLQUFLbUYsU0FBakI7QUFDQS9DLGNBQUl0QixTQUFKLEdBQWdCZCxLQUFLbUYsU0FBckI7QUFDRDtBQUNEL0MsWUFBSWIsT0FBSixHQUFjLEtBQWQ7QUFDQWEsWUFBSWpDLFVBQUosR0FBaUJILEtBQUttRixTQUF0QjtBQUNBVCxjQUFNcEMsSUFBTixDQUFXRixHQUFYO0FBQ0QsT0FyQkQ7QUFzQkEsYUFBT3NDLEtBQVA7QUFDRDs7O2dDQUNZWSxJLEVBQU1yRixHLEVBQUtxRCxFLEVBQUk7QUFDMUIsVUFBSWxGLE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVRnRSxvQkFBWWlELEtBQUtqRCxVQUZSO0FBR1QxQyxrQkFBVTJGLEtBQUszRixRQUhOO0FBSVRPLGVBQU9EO0FBSkUsT0FBWDtBQU1BVyxjQUFRQyxHQUFSLENBQVl6QyxJQUFaO0FBQ0EsV0FBS3NGLE9BQUwsQ0FBYUMsV0FBYixDQUF5QjRCLFdBQXpCLENBQXFDbkgsSUFBckMsRUFBMkN5RixJQUEzQyxDQUFnRCxVQUFDZixHQUFELEVBQVM7QUFDdkRsQyxnQkFBUUMsR0FBUixDQUFZaUMsR0FBWjtBQUNBUSxjQUFNQSxJQUFOO0FBQ0QsT0FIRDtBQUlEOzs7NkJBQ1M7QUFDUixXQUFLakYsS0FBTCxHQUFhLEtBQUtxRixPQUFMLENBQWE4QixRQUFiLENBQXNCLE1BQXRCLENBQWI7QUFDQTVFLGNBQVFDLEdBQVIsQ0FBWSxLQUFLNkMsT0FBTCxDQUFhVSxVQUFiLENBQXdCOUUsU0FBcEM7QUFDQSxVQUFJLEtBQUtvRSxPQUFMLENBQWFVLFVBQWIsQ0FBd0I5RSxTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxhQUFLQSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsT0FGRCxNQUVPLElBQUksS0FBS29FLE9BQUwsQ0FBYVUsVUFBYixDQUF3QjlFLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQ2xELGFBQUtBLFNBQUwsR0FBaUIsSUFBakI7QUFDRDtBQUNEO0FBQ0EsV0FBS2lCLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0QsWUFBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7OztFQXhVK0IsZUFBS2tGLEk7O2tCQUFsQjlILEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ291bnRlIGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJjYXJ0TGlzdFwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcIml0ZW1cIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJjb3VudGVDb2xkXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb3VudFwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJpdGVtLmNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c291cmNlSWQuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLnNvdXJjZUlkXCIsXCJmb3JcIjpcIml0ZW0uY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge1wiY291bnRlQ29sZFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDb2xkXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluQ29sZFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDb2xkXCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ29sZFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY291bnRlQ29sZDogQ291bnRlLFxuICAgICAgY291bnRlTm9ybWFsOiBDb3VudGVcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGNhcnRjb3VudDogW10sXG4gICAgICBjaGVja2VkTGlzdDogW10sXG4gICAgICB0ZW1wQ29sZExpc3Q6IFtdLFxuICAgICAgdGVtcE5vcm1hbExpc3Q6IFtdLFxuICAgICAgY2FydFN0YXR1czoge1xuICAgICAgICB0b3RhbHByaWNlOiAnJyxcbiAgICAgICAgZGlzY291bnQ6ICcnXG4gICAgICB9LFxuICAgICAgY2FydExpc3Q6IFtdLFxuICAgICAgY29sZGxpc3Q6IFtdLFxuICAgICAgY29sZFRpdGxlOiAnJyxcbiAgICAgIGNvbGRDaGVja2VkOiBmYWxzZSxcbiAgICAgIHRlbXBDb2xkOiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgZmluYWxwcmljZTogMCxcbiAgICAgIGZyZWlnaHQ6IDAsXG4gICAgICB1c2VyTGV2ZWw6IDBcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRUYXAgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgfSxcbiAgICAgIHBsdXNDb2xkIChlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICB2YWwuY291bnQgKytcbiAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA+IHZhbC50b3RhbENvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFsLmNvdW50ID0gdmFsLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICB0aGlzLm1heE1vZGFsKCfmlbDph4/lt7Lovr7kuIrpmZAnKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBtaW5Db2xkIChlKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsLnNvdXJjZUlkID09PSBzb3VyY2VJZCkge1xuICAgICAgICAgICAgICB2YWwuY291bnQgLS1cbiAgICAgICAgICAgICAgaWYgKHZhbC5jb3VudCA8IDEpIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSAxXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5LiN6IO95YaN5bCR5ZWmJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKHZhbCwgLTEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGtleUNvbGQgKGtleVZhbCwgZSkge1xuICAgICAgfSxcbiAgICAgIGJsdXJDb2xkIChrZXlWYWwsIGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZUlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwuc291cmNlSWQgPT09IHNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgIGlmIChrZXlWYWwgPD0gMCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IDFcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlWYWwgPiB2YWwudG90YWxDb3VudCkge1xuICAgICAgICAgICAgICAgIHZhbC5jb3VudCA9IHZhbC50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhNb2RhbCgn5pWw6YeP5bey6L6+5LiK6ZmQJylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwuY291bnQgPSBrZXlWYWxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2codmFsLmluaXRDb3VudClcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEodmFsLCB2YWwuY291bnQgLSB2YWwuaW5pdENvdW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gdmFsLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbGRDaGVjayAoZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZVxuICAgICAgICB0aGlzLmNhcnRMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbC5zb3VyY2VJZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSAhdmFsLmNoZWNrZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGl0ZW0udGVtcENvbGQubGVuZ3RoID09PSBpdGVtLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGRBbGwgKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRMaXN0W2luZGV4XS50ZW1wQ29sZC5sZW5ndGggPT09IHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNhcnRMaXN0W2luZGV4XS5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5jYXJ0TGlzdFtpbmRleF0udGVtcENvbGQgPSBbXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY2FydExpc3RbaW5kZXhdLnRlbXBDb2xkID0gdGhpcy5jYXJ0TGlzdFtpbmRleF0uY29sZGxpc3RcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoZWNrQWxsICgpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMFxuICAgICAgICB2YXIgY2hlY2sgPSAwXG4gICAgICAgIHRoaXMuY2FydExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICB0b3RhbCArPSBpdGVtLmNvbGRsaXN0Lmxlbmd0aFxuICAgICAgICAgIGNoZWNrICs9IGl0ZW0udGVtcENvbGQubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHRvdGFsLCBjaGVjaylcbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmICh0b3RhbCA9PT0gY2hlY2spIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGl0ZW0uY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgaXRlbS50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY29sZGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBpLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIGl0ZW0udGVtcENvbGQgPSBpdGVtLmNvbGRsaXN0XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5jYXJ0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS50ZW1wQ29sZC5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBzb3VyY2Uuc291cmNlVHlwZVxuICAgICAgICAgICAgb2JqLnNvdXJjZUlkID0gc291cmNlLnNvdXJjZUlkXG4gICAgICAgICAgICByZXN1bHQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRlbGV0ZURhdGEocmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGF0LmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRDaGVja2VkIChhcnIsIHZhbCkge1xuICAgICAgaWYgKGFyci5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgIGFyci5wdXNoKHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5zcGxpY2UoYXJyLmluZGV4T2YodmFsKSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgbWF4TW9kYWwgKGNvbnRlbnQpIHtcbiAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IGNvbnRlbnQsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVEYXRhIChqc29uLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VMaXN0OiBKU09OLnN0cmluZ2lmeShqc29uKVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUNhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlRGF0YSAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLmNhcnRMaXN0ID0gW11cbiAgICAgIHRoaXMuZmluYWxwcmljZSA9IDBcbiAgICAgIHRoaXMuZnJlaWdodCA9IDBcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICB0aGlzLmNhcnRTdGF0dXMudG90YWxwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICB0aGlzLmNhcnRTdGF0dXMuZGlzY291bnQgPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmFscHJpY2UgPSBkYXRhLmZpbmFsUHJpY2VcbiAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZmluYWxwcmljZSA9IGRhdGEuZmluYWxQcmljZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmZyZWlnaHQgPSBkYXRhLmZyZWlnaHRcbiAgICAgICAgICBpZiAoZGF0YS5jaGlsZE9yZGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5jaGlsZE9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5mcmVpZ2h0ID0gaXRlbS5mcmVpZ2h0XG4gICAgICAgICAgICBvYmouY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgb2JqLnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgIG9iai5jb2xkbGlzdCA9IHRoaXMuaW5pdENoaWxkKGl0ZW0uc2FsZXNVbml0cylcbiAgICAgICAgICAgIF90aGlzLmNhcnRMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0Q2hpbGQgKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkID0gW11cbiAgICAgIHBhcmVudC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICBvYmoucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgb2JqLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgb2JqLmlkID0gaXRlbS5wcm9kdWN0SWRcbiAgICAgICAgb2JqLnNvdXJjZVR5cGUgPSBpdGVtLnNhbGVzVW5pdFR5cGVcbiAgICAgICAgb2JqLnNvdXJjZUlkID0gaXRlbS5zYWxlc1VuaXRJZFxuICAgICAgICBpZiAoaXRlbS5idXlDb3VudCA8PSBpdGVtLmtlZXBDb3VudCkge1xuICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZSArICfDlycgKyBpdGVtLmJ1eUNvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5idXlDb3VudFxuICAgICAgICAgIG9iai5pbml0Q291bnQgPSBpdGVtLmJ1eUNvdW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlICsgJ8OXJyArIGl0ZW0ua2VlcENvdW50XG4gICAgICAgICAgb2JqLmNvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgICBvYmouaW5pdENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgfVxuICAgICAgICBvYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIG9iai50b3RhbENvdW50ID0gaXRlbS5rZWVwQ291bnRcbiAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGFkZENhcnREYXRhIChnb29kLCB2YWwsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IGdvb2Quc291cmNlVHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGdvb2Quc291cmNlSWQsXG4gICAgICAgIGNvdW50OiB2YWxcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2NhcnQnKVxuICAgICAgY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsKVxuICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICB0aGlzLnVzZXJMZXZlbCA9IGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICB0aGlzLnVzZXJMZXZlbCA9IHRydWVcbiAgICAgIH1cbiAgICAgIC8vIOWIpOaWreeUqOaIt21lbWJlckhhc2hcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==