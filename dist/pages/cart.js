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

    var _temp, _this, _ret;

    _classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '购物车'
    }, _this.$repeat = { "coldlist": { "com": "counteCold", "props": "" }, "normallist": { "com": "counteNormal", "props": "" } }, _this.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "data-index": { "value": "{{index}}", "for": "coldlist", "item": "item", "index": "index", "key": "index" } }, "counteNormal": { "v-bind:num.sync": { "value": "item.count", "for": "normallist", "item": "item", "index": "index", "key": "index" }, "data-index": { "value": "{{index}}", "for": "normallist", "item": "item", "index": "index", "key": "index" } } }, _this.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold" }, "counteNormal": { "v-on:plusEdit": "plusNormal", "v-on:minusEdit": "minNormal", "v-on:keyEdit": "keyNormal" } }, _this.components = {
      counteCold: _counter2.default,
      counteNormal: _counter2.default
    }, _this.computed = {
      isNull: function isNull() {
        if (this.coldlist.length === 0 && this.normallist.length === 0) {
          return true;
        } else {
          return false;
        }
      },
      coldNull: function coldNull() {
        if (this.coldlist.length === 0) {
          return true;
        } else {
          return false;
        }
      },
      normalNull: function normalNull() {
        if (this.normallist.length === 0) {
          return true;
        } else {
          return false;
        }
      },
      totalprice: function totalprice() {
        var result = 0;
        this.coldlist.forEach(function (item) {
          result += parseInt(item.price * item.count);
        });
        this.normallist.forEach(function (item) {
          result += parseInt(item.price * item.count);
        });
        return result;
      },
      freight: function freight() {
        var result = 0;
        this.coldlist.forEach(function (item) {
          result += parseInt(item.freightPrice);
        });
        this.normallist.forEach(function (item) {
          result += parseInt(item.freightPrice);
        });
        return result;
      }
    }, _this.data = {
      animate: '',
      current: '',
      indexId: '',
      cartcount: [],
      isEdit: false,
      editTxt: '编辑',
      checkedList: [],
      tempColdList: [],
      tempNormalList: [],
      cartStatus: {
        totalprice: '300',
        discount: '110'
      },
      coldlist: [],
      normallist: [],
      coldArray: [],
      coldChecked: false,
      tempCold: [],
      normalArray: [],
      normalChecked: false,
      tempNormal: []
    }, _this.methods = {
      plusCold: function plusCold(e) {
        var index = e.source.$index;
        this.coldlist[index].count++;
        this.$apply();
        // 发送购物车修改数据
      },
      plusNormal: function plusNormal(e) {
        var index = e.source.$index;
        this.normallist[index].count++;
        this.$apply();
      },
      minCold: function minCold(e) {
        var index = e.source.$index;
        this.coldlist[index].count--;
        this.$apply();
      },
      minNormal: function minNormal(e) {
        var index = e.source.$index;
        this.normallist[index].count--;
        this.$apply();
        // 发送购物车修改数据
      },
      keyCold: function keyCold(val, e) {
        var index = e.source.$index;
        this.coldlist[index].count = val;
      },
      keyNormal: function keyNormal(val, e) {
        var index = e.source.$index;
        this.normallist[index].count = val;
      },
      goDetail: function goDetail(id) {
        console.log(id);
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      },
      coldCheck: function coldCheck(e) {
        var value = e.currentTarget.dataset.value;
        // 计算选中值
        this.getChecked(this.coldArray, value);
        this.coldlist.forEach(function (val) {
          if (val.id === value) {
            val.checked = !val.checked;
          }
        });
        this.tempCold = this.coldlist.filter(function (item) {
          return item.checked;
        });
        if (this.tempCold.length === this.coldlist.length) {
          this.coldChecked = true;
        } else {
          this.coldChecked = false;
        }
      },
      normalCheck: function normalCheck(e) {
        var value = e.currentTarget.dataset.value;
        // 计算选中值
        this.getChecked(this.normalArray, value);
        this.normallist.forEach(function (val) {
          if (val.id === value) {
            val.checked = !val.checked;
          }
        });
        this.tempNormal = this.normallist.filter(function (item) {
          return item.checked;
        });
        if (this.tempNormal.length === this.normallist.length) {
          this.normalChecked = true;
        } else {
          this.normalChecked = false;
        }
      },
      coldAll: function coldAll() {
        var _this2 = this;

        if (this.tempCold.length === this.coldlist.length) {
          this.coldlist.forEach(function (item) {
            item.checked = false;
            _this2.coldChecked = false;
            _this2.coldArray = [];
          });
          this.tempCold = [];
        } else {
          this.coldlist.forEach(function (item) {
            _this2.coldlist.forEach(function (item) {
              item.checked = true;
              _this2.coldChecked = true;
              if (_this2.coldArray.indexOf(item.id) === -1) {
                _this2.coldArray.push(item.id);
              }
            });
          });
          this.tempCold = this.coldlist;
        }
      },
      normalAll: function normalAll() {
        var _this3 = this;

        if (this.tempNormal.length === this.normallist.length) {
          this.normallist.forEach(function (item) {
            item.checked = false;
            _this3.normalChecked = false;
            _this3.normalArray = [];
          });
          this.tempNormal = [];
        } else {
          this.normallist.forEach(function (item) {
            _this3.normallist.forEach(function (item) {
              item.checked = true;
              _this3.normalChecked = true;
              if (_this3.normalArray.indexOf(item.id) === -1) {
                _this3.normalArray.push(item.id);
              }
            });
          });
          this.tempNormal = this.normallist;
        }
      },
      checkAll: function checkAll() {
        var _this4 = this;

        console.log(this.tempCold, this.tempNormal);
        if (this.tempCold.length === this.coldlist.length && this.tempNormal.length === this.normallist.length) {
          this.coldlist.forEach(function (item) {
            item.checked = false;
            _this4.coldChecked = false;
            _this4.coldArray = [];
          });
          this.tempCold = [];
          this.normallist.forEach(function (item) {
            item.checked = false;
            _this4.normalChecked = false;
            _this4.normalArray = [];
          });
        } else {
          this.coldlist.forEach(function (item) {
            _this4.coldlist.forEach(function (item) {
              item.checked = true;
              _this4.coldChecked = true;
              if (_this4.coldArray.indexOf(item.id) === -1) {
                _this4.coldArray.push(item.id);
              }
            });
          });
          this.tempCold = this.coldlist;
          this.normallist.forEach(function (item) {
            _this4.normallist.forEach(function (item) {
              item.checked = true;
              _this4.normalChecked = true;
              if (_this4.normalArray.indexOf(item.id) === -1) {
                _this4.normalArray.push(item.id);
              }
            });
          });
          this.tempNormal = this.normallist;
        }
      },
      deleteTap: function deleteTap() {
        var that = this;
        console.log(this.coldArray, this.normalArray);
        var coldFilter = this.coldlist;
        var normalFilter = this.normallist;
        this.coldArray.forEach(function (item) {
          coldFilter = coldFilter.filter(function (val) {
            return val.id !== item;
          });
        });
        this.normalArray.forEach(function (item) {
          normalFilter = normalFilter.filter(function (val) {
            return val.id !== item;
          });
        });
        var coldSelected = this.coldlist;
        this.coldArray.forEach(function (item) {
          coldSelected = coldSelected.filter(function (val) {
            return val.id === item;
          });
        });
        if (this.coldArray.length === 0 && this.normalArray.length === 0) {
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
                that.coldlist = coldFilter;
                that.tempCold = [];
                that.normallist = normalFilter;
                that.tempNormal = [];
              }
              if (res.cancel) {}
              that.$apply();
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
    key: 'initPageData',
    value: function initPageData() {
      this.coldlist = [{
        freightPrice: '18',
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1231123',
        detail: '500g × 5',
        count: '10',
        checked: false
      }, {
        freightPrice: '20',
        path: '../image/login-bg.jpg',
        title: '美国自然牛',
        price: '99.0',
        oldprice: '160.0',
        id: '1223123',
        detail: '500g × 5',
        count: '6',
        checked: false
      }];
      this.normallist = [{
        freightPrice: '10',
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1261123',
        detail: '500g × 5',
        count: '10',
        checked: false
      }, {
        freightPrice: '5',
        path: '../image/login-bg.jpg',
        title: '阿根廷红虾',
        price: '99.0',
        oldprice: '160.0',
        id: '1234443',
        detail: '500g × 5',
        count: '6',
        checked: false
      }];
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.initPageData();
      this.$apply();
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiY29tcHV0ZWQiLCJpc051bGwiLCJjb2xkbGlzdCIsImxlbmd0aCIsIm5vcm1hbGxpc3QiLCJjb2xkTnVsbCIsIm5vcm1hbE51bGwiLCJ0b3RhbHByaWNlIiwicmVzdWx0IiwiZm9yRWFjaCIsIml0ZW0iLCJwYXJzZUludCIsInByaWNlIiwiY291bnQiLCJmcmVpZ2h0IiwiZnJlaWdodFByaWNlIiwiZGF0YSIsImFuaW1hdGUiLCJjdXJyZW50IiwiaW5kZXhJZCIsImNhcnRjb3VudCIsImlzRWRpdCIsImVkaXRUeHQiLCJjaGVja2VkTGlzdCIsInRlbXBDb2xkTGlzdCIsInRlbXBOb3JtYWxMaXN0IiwiY2FydFN0YXR1cyIsImRpc2NvdW50IiwiY29sZEFycmF5IiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsIm5vcm1hbEFycmF5Iiwibm9ybWFsQ2hlY2tlZCIsInRlbXBOb3JtYWwiLCJtZXRob2RzIiwicGx1c0NvbGQiLCJlIiwiaW5kZXgiLCJzb3VyY2UiLCIkaW5kZXgiLCIkYXBwbHkiLCJwbHVzTm9ybWFsIiwibWluQ29sZCIsIm1pbk5vcm1hbCIsImtleUNvbGQiLCJ2YWwiLCJrZXlOb3JtYWwiLCJnb0RldGFpbCIsImlkIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb2xkQ2hlY2siLCJ2YWx1ZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZ2V0Q2hlY2tlZCIsImNoZWNrZWQiLCJmaWx0ZXIiLCJub3JtYWxDaGVjayIsImNvbGRBbGwiLCJpbmRleE9mIiwicHVzaCIsIm5vcm1hbEFsbCIsImNoZWNrQWxsIiwiZGVsZXRlVGFwIiwidGhhdCIsImNvbGRGaWx0ZXIiLCJub3JtYWxGaWx0ZXIiLCJjb2xkU2VsZWN0ZWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWwiLCJhcnIiLCJzcGxpY2UiLCJwYXRoIiwib2xkcHJpY2UiLCJkZXRhaWwiLCJpbml0UGFnZURhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxFQUE1QixFQUFaLEVBQTRDLGNBQWEsRUFBQyxPQUFNLGNBQVAsRUFBc0IsU0FBUSxFQUE5QixFQUF6RCxFLFFBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sVUFBbEIsRUFBNkIsUUFBTyxNQUFwQyxFQUEyQyxTQUFRLE9BQW5ELEVBQTJELE9BQU0sT0FBakUsRUFBaEIsRUFBMEYsbUJBQWtCLEVBQUMsU0FBUSxZQUFULEVBQXNCLE9BQU0sVUFBNUIsRUFBdUMsUUFBTyxNQUE5QyxFQUFxRCxTQUFRLE9BQTdELEVBQXFFLE9BQU0sT0FBM0UsRUFBNUcsRUFBZ00sY0FBYSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sVUFBbEIsRUFBNkIsUUFBTyxNQUFwQyxFQUEyQyxTQUFRLE9BQW5ELEVBQTJELE9BQU0sT0FBakUsRUFBN00sRUFBdVIsY0FBYSxFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLFVBQTNCLEVBQXNDLFFBQU8sTUFBN0MsRUFBb0QsU0FBUSxPQUE1RCxFQUFvRSxPQUFNLE9BQTFFLEVBQXBTLEVBQWQsRUFBc1ksZ0JBQWUsRUFBQyxtQkFBa0IsRUFBQyxTQUFRLFlBQVQsRUFBc0IsT0FBTSxZQUE1QixFQUF5QyxRQUFPLE1BQWhELEVBQXVE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QkFBYyxJQURoQjtBQUVFb0UsY0FBTSx1QkFGUjtBQUdFWCxlQUFPLE9BSFQ7QUFJRTVELGVBQU8sTUFKVDtBQUtFd0Usa0JBQVUsT0FMWjtBQU1FcEMsWUFBSSxTQU5OO0FBT0VxQyxnQkFBUSxVQVBWO0FBUUV4RSxlQUFPLEdBUlQ7QUFTRTZDLGlCQUFTO0FBVFgsT0FaYyxDQUFoQjtBQXdCQSxXQUFLdEQsVUFBTCxHQUFrQixDQUNoQjtBQUNFVyxzQkFBYyxJQURoQjtBQUVFb0UsY0FBTSx1QkFGUjtBQUdFWCxlQUFPLGFBSFQ7QUFJRTVELGVBQU8sTUFKVDtBQUtFd0Usa0JBQVUsT0FMWjtBQU1FcEMsWUFBSSxTQU5OO0FBT0VxQyxnQkFBUSxVQVBWO0FBUUV4RSxlQUFPLElBUlQ7QUFTRTZDLGlCQUFTO0FBVFgsT0FEZ0IsRUFZaEI7QUFDRTNDLHNCQUFjLEdBRGhCO0FBRUVvRSxjQUFNLHVCQUZSO0FBR0VYLGVBQU8sT0FIVDtBQUlFNUQsZUFBTyxNQUpUO0FBS0V3RSxrQkFBVSxPQUxaO0FBTUVwQyxZQUFJLFNBTk47QUFPRXFDLGdCQUFRLFVBUFY7QUFRRXhFLGVBQU8sR0FSVDtBQVNFNkMsaUJBQVM7QUFUWCxPQVpnQixDQUFsQjtBQXdCRDs7OzZCQUNTO0FBQ1IsV0FBSzRCLFlBQUw7QUFDQSxXQUFLOUMsTUFBTDtBQUNEOzs7O0VBL1UrQixlQUFLK0MsSTs7a0JBQWxCaEcsSSIsImZpbGUiOiJjYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb3VudGUgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcImNvbGRsaXN0XCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9LFwibm9ybWFsbGlzdFwiOntcImNvbVwiOlwiY291bnRlTm9ybWFsXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiY291bnRlQ29sZFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvdW50XCIsXCJmb3JcIjpcImNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJjb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwiZGF0YS1pbmRleFwiOntcInZhbHVlXCI6XCJ7e2luZGV4fX1cIixcImZvclwiOlwiY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJjb3VudGVOb3JtYWxcIjp7XCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb3VudFwiLFwiZm9yXCI6XCJub3JtYWxsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJkYXRhLWluZGV4XCI6e1widmFsdWVcIjpcInt7aW5kZXh9fVwiLFwiZm9yXCI6XCJub3JtYWxsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ29sZFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbkNvbGRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q29sZFwifSxcImNvdW50ZU5vcm1hbFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNOb3JtYWxcIixcInYtb246bWludXNFZGl0XCI6XCJtaW5Ob3JtYWxcIixcInYtb246a2V5RWRpdFwiOlwia2V5Tm9ybWFsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb3VudGVDb2xkOiBDb3VudGUsXG4gICAgICBjb3VudGVOb3JtYWw6IENvdW50ZVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGRsaXN0Lmxlbmd0aCA9PT0gMCAmJiB0aGlzLm5vcm1hbGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbGROdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sZGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vcm1hbE51bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5ub3JtYWxsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3RhbHByaWNlICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDBcbiAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmVzdWx0ICs9IHBhcnNlSW50KGl0ZW0ucHJpY2UgKiBpdGVtLmNvdW50KVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJlc3VsdCArPSBwYXJzZUludChpdGVtLnByaWNlICogaXRlbS5jb3VudClcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfSxcbiAgICAgIGZyZWlnaHQgKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gMFxuICAgICAgICB0aGlzLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXN1bHQgKz0gcGFyc2VJbnQoaXRlbS5mcmVpZ2h0UHJpY2UpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubm9ybWFsbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmVzdWx0ICs9IHBhcnNlSW50KGl0ZW0uZnJlaWdodFByaWNlKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBhbmltYXRlOiAnJyxcbiAgICAgIGN1cnJlbnQ6ICcnLFxuICAgICAgaW5kZXhJZDogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdLFxuICAgICAgaXNFZGl0OiBmYWxzZSxcbiAgICAgIGVkaXRUeHQ6ICfnvJbovpEnLFxuICAgICAgY2hlY2tlZExpc3Q6IFtdLFxuICAgICAgdGVtcENvbGRMaXN0OiBbXSxcbiAgICAgIHRlbXBOb3JtYWxMaXN0OiBbXSxcbiAgICAgIGNhcnRTdGF0dXM6IHtcbiAgICAgICAgdG90YWxwcmljZTogJzMwMCcsXG4gICAgICAgIGRpc2NvdW50OiAnMTEwJ1xuICAgICAgfSxcbiAgICAgIGNvbGRsaXN0OiBbXSxcbiAgICAgIG5vcm1hbGxpc3Q6IFtdLFxuICAgICAgY29sZEFycmF5OiBbXSxcbiAgICAgIGNvbGRDaGVja2VkOiBmYWxzZSxcbiAgICAgIHRlbXBDb2xkOiBbXSxcbiAgICAgIG5vcm1hbEFycmF5OiBbXSxcbiAgICAgIG5vcm1hbENoZWNrZWQ6IGZhbHNlLFxuICAgICAgdGVtcE5vcm1hbDogW11cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHBsdXNDb2xkIChlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLmNvbGRsaXN0W2luZGV4XS5jb3VudCArK1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgfSxcbiAgICAgIHBsdXNOb3JtYWwgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMubm9ybWFsbGlzdFtpbmRleF0uY291bnQgKytcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIG1pbkNvbGQgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50IC0tXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBtaW5Ob3JtYWwgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMubm9ybWFsbGlzdFtpbmRleF0uY291bnQgLS1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgIH0sXG4gICAgICBrZXlDb2xkICh2YWwsIGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50ID0gdmFsXG4gICAgICB9LFxuICAgICAga2V5Tm9ybWFsICh2YWwsIGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMubm9ybWFsbGlzdFtpbmRleF0uY291bnQgPSB2YWxcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sZENoZWNrIChlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlXG4gICAgICAgIC8vIOiuoeeul+mAieS4reWAvFxuICAgICAgICB0aGlzLmdldENoZWNrZWQodGhpcy5jb2xkQXJyYXksIHZhbHVlKVxuICAgICAgICB0aGlzLmNvbGRsaXN0LmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgIGlmICh2YWwuaWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICB2YWwuY2hlY2tlZCA9ICF2YWwuY2hlY2tlZFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZW1wQ29sZCA9IHRoaXMuY29sZGxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgICB9KVxuICAgICAgICBpZiAodGhpcy50ZW1wQ29sZC5sZW5ndGggPT09IHRoaXMuY29sZGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vcm1hbENoZWNrIChlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlXG4gICAgICAgIC8vIOiuoeeul+mAieS4reWAvFxuICAgICAgICB0aGlzLmdldENoZWNrZWQodGhpcy5ub3JtYWxBcnJheSwgdmFsdWUpXG4gICAgICAgIHRoaXMubm9ybWFsbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICBpZiAodmFsLmlkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSAhdmFsLmNoZWNrZWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVtcE5vcm1hbCA9IHRoaXMubm9ybWFsbGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICAgIH0pXG4gICAgICAgIGlmICh0aGlzLnRlbXBOb3JtYWwubGVuZ3RoID09PSB0aGlzLm5vcm1hbGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5ub3JtYWxDaGVja2VkID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubm9ybWFsQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb2xkQWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMudGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5jb2xkQXJyYXkgPSBbXVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy50ZW1wQ29sZCA9IFtdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgICB0aGlzLmNvbGRDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgICBpZiAodGhpcy5jb2xkQXJyYXkuaW5kZXhPZihpdGVtLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGRBcnJheS5wdXNoKGl0ZW0uaWQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnRlbXBDb2xkID0gdGhpcy5jb2xkbGlzdFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbm9ybWFsQWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMudGVtcE5vcm1hbC5sZW5ndGggPT09IHRoaXMubm9ybWFsbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMubm9ybWFsQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLm5vcm1hbEFycmF5ID0gW11cbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMudGVtcE5vcm1hbCA9IFtdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ub3JtYWxsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgICAgdGhpcy5ub3JtYWxDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgICBpZiAodGhpcy5ub3JtYWxBcnJheS5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsQXJyYXkucHVzaChpdGVtLmlkKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy50ZW1wTm9ybWFsID0gdGhpcy5ub3JtYWxsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja0FsbCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGVtcENvbGQsIHRoaXMudGVtcE5vcm1hbClcbiAgICAgICAgaWYgKHRoaXMudGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNvbGRsaXN0Lmxlbmd0aCAmJiB0aGlzLnRlbXBOb3JtYWwubGVuZ3RoID09PSB0aGlzLm5vcm1hbGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmNvbGRBcnJheSA9IFtdXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnRlbXBDb2xkID0gW11cbiAgICAgICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMubm9ybWFsQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLm5vcm1hbEFycmF5ID0gW11cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgICAgdGhpcy5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgICAgaWYgKHRoaXMuY29sZEFycmF5LmluZGV4T2YoaXRlbS5pZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xkQXJyYXkucHVzaChpdGVtLmlkKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy50ZW1wQ29sZCA9IHRoaXMuY29sZGxpc3RcbiAgICAgICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3JtYWxsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgICB0aGlzLm5vcm1hbENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICAgIGlmICh0aGlzLm5vcm1hbEFycmF5LmluZGV4T2YoaXRlbS5pZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3JtYWxBcnJheS5wdXNoKGl0ZW0uaWQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnRlbXBOb3JtYWwgPSB0aGlzLm5vcm1hbGxpc3RcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbGRBcnJheSwgdGhpcy5ub3JtYWxBcnJheSlcbiAgICAgICAgdmFyIGNvbGRGaWx0ZXIgPSB0aGlzLmNvbGRsaXN0XG4gICAgICAgIHZhciBub3JtYWxGaWx0ZXIgPSB0aGlzLm5vcm1hbGxpc3RcbiAgICAgICAgdGhpcy5jb2xkQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbGRGaWx0ZXIgPSBjb2xkRmlsdGVyLmZpbHRlcigodmFsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLmlkICE9PSBpdGVtXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5ub3JtYWxBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgbm9ybWFsRmlsdGVyID0gbm9ybWFsRmlsdGVyLmZpbHRlcigodmFsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLmlkICE9PSBpdGVtXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIGNvbGRTZWxlY3RlZCA9IHRoaXMuY29sZGxpc3RcbiAgICAgICAgdGhpcy5jb2xkQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbGRTZWxlY3RlZCA9IGNvbGRTZWxlY3RlZC5maWx0ZXIoKHZhbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC5pZCA9PT0gaXRlbVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGlmICh0aGlzLmNvbGRBcnJheS5sZW5ndGggPT09IDAgJiYgdGhpcy5ub3JtYWxBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LmNvbGRsaXN0ID0gY29sZEZpbHRlclxuICAgICAgICAgICAgICAgIHRoYXQudGVtcENvbGQgPSBbXVxuICAgICAgICAgICAgICAgIHRoYXQubm9ybWFsbGlzdCA9IG5vcm1hbEZpbHRlclxuICAgICAgICAgICAgICAgIHRoYXQudGVtcE5vcm1hbCA9IFtdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRDaGVja2VkIChhcnIsIHZhbCkge1xuICAgICAgaWYgKGFyci5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgIGFyci5wdXNoKHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyci5zcGxpY2UoYXJyLmluZGV4T2YodmFsKSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFBhZ2VEYXRhICgpIHtcbiAgICAgIHRoaXMuY29sZGxpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBmcmVpZ2h0UHJpY2U6ICcxOCcsXG4gICAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgICAgaWQ6ICcxMjMxMTIzJyxcbiAgICAgICAgICBkZXRhaWw6ICc1MDBnIMOXIDUnLFxuICAgICAgICAgIGNvdW50OiAnMTAnLFxuICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmcmVpZ2h0UHJpY2U6ICcyMCcsXG4gICAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZsnLFxuICAgICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgICAgaWQ6ICcxMjIzMTIzJyxcbiAgICAgICAgICBkZXRhaWw6ICc1MDBnIMOXIDUnLFxuICAgICAgICAgIGNvdW50OiAnNicsXG4gICAgICAgICAgY2hlY2tlZDogZmFsc2VcbiAgICAgICAgfVxuICAgICAgXVxuICAgICAgdGhpcy5ub3JtYWxsaXN0ID0gW1xuICAgICAgICB7XG4gICAgICAgICAgZnJlaWdodFByaWNlOiAnMTAnLFxuICAgICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICAgIGlkOiAnMTI2MTEyMycsXG4gICAgICAgICAgZGV0YWlsOiAnNTAwZyDDlyA1JyxcbiAgICAgICAgICBjb3VudDogJzEwJyxcbiAgICAgICAgICBjaGVja2VkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZnJlaWdodFByaWNlOiAnNScsXG4gICAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgICAgdGl0bGU6ICfpmL/moLnlu7fnuqLomb4nLFxuICAgICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgICAgaWQ6ICcxMjM0NDQzJyxcbiAgICAgICAgICBkZXRhaWw6ICc1MDBnIMOXIDUnLFxuICAgICAgICAgIGNvdW50OiAnNicsXG4gICAgICAgICAgY2hlY2tlZDogZmFsc2VcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19