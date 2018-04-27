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
    }, _this.$repeat = { "coldlist": { "com": "counteCold", "props": "" }, "normallist": { "com": "counteNormal", "props": "" } }, _this.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "data-index": { "value": "{{index}}", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "class": { "value": "{{ hiddenColdTemp === index ? '' : 'hidden-temp'}}", "for": "coldlist", "item": "item", "index": "index", "key": "index" } }, "counteNormal": { "v-bind:num.sync": { "value": "item.count", "for": "normallist", "item": "item", "index": "index", "key": "index" }, "data-index": { "value": "{{index}}", "for": "normallist", "item": "item", "index": "index", "key": "index" }, "class": { "value": "{{ hiddenNormalTemp === index ? '' : 'hidden-temp'}}", "for": "normallist", "item": "item", "index": "index", "key": "index" } } }, _this.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold", "v-on:blurEdit": "blurCold" }, "counteNormal": { "v-on:plusEdit": "plusNormal", "v-on:minusEdit": "minNormal", "v-on:keyEdit": "keyNormal", "v-on:blurEdit": "blurNormal" } }, _this.components = {
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
      tempNormal: [],
      hiddenColdTemp: 0,
      hiddenNormalTemp: 0
    }, _this.methods = {
      plusCold: function plusCold(e) {
        var index = e.source.$index;
        this.coldlist[index].count++;
        if (this.coldlist[index].count >= this.coldlist[index].totalCount) {
          this.coldlist[index].count = this.coldlist[index].totalCount;
          this.maxModal();
        }
        this.$apply();
        // 发送购物车修改数据
      },
      plusNormal: function plusNormal(e) {
        var index = e.source.$index;
        this.normallist[index].count++;
        console.log(this.normallist[index].count, this.normallist[index].totalCount);
        if (this.normallist[index].count >= this.normallist[index].totalCount) {
          this.normallist[index].count = this.normallist[index].totalCount;
          this.maxModal();
        }
        this.$apply();
        // 发送购物车修改数据
      },
      minCold: function minCold(e) {
        var index = e.source.$index;
        this.coldlist[index].count--;
        if (this.coldlist[index].count <= 0) {
          this.coldlist[index].count = 1;
        }
        this.$apply();
        // 发送购物车修改数据
      },
      minNormal: function minNormal(e) {
        var index = e.source.$index;
        this.normallist[index].count--;
        if (this.normallist[index].count <= 0) {
          this.normallist[index].count = 1;
        }
        this.$apply();
        // 发送购物车修改数据
      },
      keyCold: function keyCold(val, e) {
        var index = e.source.$index;
        this.hiddenColdTemp = e.source.$index;
        if (val === '0') {
          this.coldlist[index].count = 1;
        } else {
          this.coldlist[index].count = val;
        }
        if (this.coldlist[index].count > this.coldlist[index].totalCount) {
          this.coldlist[index].count = this.coldlist[index].totalCount;
          console.log(this.coldlist[index].count, this.coldlist[index].totalCount);
          this.maxModal();
        }
        return this.coldlist[index].count;
      },
      blurCold: function blurCold(val, e) {
        var index = e.source.$index;
        if (val === '') {
          this.coldlist[index].count = 1;
        }
      },
      keyNormal: function keyNormal(val, e) {
        var index = e.source.$index;
        this.hiddenNormalTemp = e.source.$index;
        this.normallist[index].count = val;
        if (val === '0') {
          this.normallist[index].count = 1;
        } else {
          this.normallist[index].count = val;
        }
        if (this.normallist[index].count > this.normallist[index].totalCount) {
          this.normallist[index].count = this.normallist[index].totalCount;
          this.maxModal();
        }
        return this.normallist[index].count;
      },
      blurNormal: function blurNormal(val, e) {
        var index = e.source.$index;
        if (val === '') {
          this.normalist[index].count = 1;
        }
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
    key: 'maxModal',
    value: function maxModal() {
      _wepy2.default.showToast({
        title: '数量已达上限',
        duration: 1000,
        image: '../image/cancel.png'
      });
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
        checked: false,
        totalCount: '12'
      }, {
        freightPrice: '20',
        path: '../image/login-bg.jpg',
        title: '美国自然牛',
        price: '99.0',
        oldprice: '160.0',
        id: '1223123',
        detail: '500g × 5',
        count: '6',
        checked: false,
        totalCount: '8'
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
        checked: false,
        totalCount: '14'
      }, {
        freightPrice: '5',
        path: '../image/login-bg.jpg',
        title: '阿根廷红虾',
        price: '99.0',
        oldprice: '160.0',
        id: '1234443',
        detail: '500g × 5',
        count: '6',
        checked: false,
        totalCount: '6'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGVDb2xkIiwiY291bnRlTm9ybWFsIiwiY29tcHV0ZWQiLCJpc051bGwiLCJjb2xkbGlzdCIsImxlbmd0aCIsIm5vcm1hbGxpc3QiLCJjb2xkTnVsbCIsIm5vcm1hbE51bGwiLCJ0b3RhbHByaWNlIiwicmVzdWx0IiwiZm9yRWFjaCIsIml0ZW0iLCJwYXJzZUludCIsInByaWNlIiwiY291bnQiLCJmcmVpZ2h0IiwiZnJlaWdodFByaWNlIiwiZGF0YSIsImFuaW1hdGUiLCJjdXJyZW50IiwiaW5kZXhJZCIsImNhcnRjb3VudCIsImlzRWRpdCIsImVkaXRUeHQiLCJjaGVja2VkTGlzdCIsInRlbXBDb2xkTGlzdCIsInRlbXBOb3JtYWxMaXN0IiwiY2FydFN0YXR1cyIsImRpc2NvdW50IiwiY29sZEFycmF5IiwiY29sZENoZWNrZWQiLCJ0ZW1wQ29sZCIsIm5vcm1hbEFycmF5Iiwibm9ybWFsQ2hlY2tlZCIsInRlbXBOb3JtYWwiLCJoaWRkZW5Db2xkVGVtcCIsImhpZGRlbk5vcm1hbFRlbXAiLCJtZXRob2RzIiwicGx1c0NvbGQiLCJlIiwiaW5kZXgiLCJzb3VyY2UiLCIkaW5kZXgiLCJ0b3RhbENvdW50IiwibWF4TW9kYWwiLCIkYXBwbHkiLCJwbHVzTm9ybWFsIiwiY29uc29sZSIsImxvZyIsIm1pbkNvbGQiLCJtaW5Ob3JtYWwiLCJrZXlDb2xkIiwidmFsIiwiYmx1ckNvbGQiLCJrZXlOb3JtYWwiLCJibHVyTm9ybWFsIiwibm9ybWFsaXN0IiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb2xkQ2hlY2siLCJ2YWx1ZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZ2V0Q2hlY2tlZCIsImNoZWNrZWQiLCJmaWx0ZXIiLCJub3JtYWxDaGVjayIsImNvbGRBbGwiLCJpbmRleE9mIiwicHVzaCIsIm5vcm1hbEFsbCIsImNoZWNrQWxsIiwiZGVsZXRlVGFwIiwidGhhdCIsImNvbGRGaWx0ZXIiLCJub3JtYWxGaWx0ZXIiLCJjb2xkU2VsZWN0ZWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImR1cmF0aW9uIiwiaW1hZ2UiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWwiLCJhcnIiLCJzcGxpY2UiLCJwYXRoIiwib2xkcHJpY2UiLCJkZXRhaWwiLCJpbml0UGFnZURhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxFQUE1QixFQUFaLEVBQTRDLGNBQWEsRUFBQyxPQUFNLGNBQVAsRUFBc0IsU0FBUSxFQUE5QixFQUF6RCxFLFFBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sVUFBbEIsRUFBNkIsUUFBTyxNQUFwQyxFQUEyQyxTQUFRLE9BQW5ELEVBQTJELE9BQU0sT0FBakUsRUFBaEIsRUFBMEYsbUJBQWtCLEVBQUMsU0FBUSxZQUFULEVBQXNCLE9BQU0sVUFBNUIsRUFBdUMsUUFBTyxNQUE5QyxFQUFxRCxTQUFRLE9BQTdELEVBQXFFLE9BQU0sT0FBM0UsRUFBNUcsRUFBZ00sY0FBYSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sVUFBbEIsRUFBNkIsUUFBTyxNQUFwQyxFQUEyQyxTQUFRLE9BQW5ELEVBQTJELE9BQU0sT0FBakUsRUFBN00sRUFBdVIsY0FBYSxFQUFDLFNBQVEsV0FBVCxFQUFxQixPQUFNLFVBQTNCLEVBQXNDLFFBQU8sTUFBN0MsRUFBb0QsU0FBUSxPQUE1RCxFQUFvRSxPQUFN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WjtBQU1FbEMsWUFBSSxTQU5OO0FBT0VtQyxnQkFBUSxVQVBWO0FBUUUvRSxlQUFPLEdBUlQ7QUFTRW9ELGlCQUFTLEtBVFg7QUFVRXZCLG9CQUFZO0FBVmQsT0FiYyxDQUFoQjtBQTBCQSxXQUFLdEMsVUFBTCxHQUFrQixDQUNoQjtBQUNFVyxzQkFBYyxJQURoQjtBQUVFMkUsY0FBTSx1QkFGUjtBQUdFWCxlQUFPLGFBSFQ7QUFJRW5FLGVBQU8sTUFKVDtBQUtFK0Usa0JBQVUsT0FMWjtBQU1FbEMsWUFBSSxTQU5OO0FBT0VtQyxnQkFBUSxVQVBWO0FBUUUvRSxlQUFPLElBUlQ7QUFTRW9ELGlCQUFTLEtBVFg7QUFVRXZCLG9CQUFZO0FBVmQsT0FEZ0IsRUFhaEI7QUFDRTNCLHNCQUFjLEdBRGhCO0FBRUUyRSxjQUFNLHVCQUZSO0FBR0VYLGVBQU8sT0FIVDtBQUlFbkUsZUFBTyxNQUpUO0FBS0UrRSxrQkFBVSxPQUxaO0FBTUVsQyxZQUFJLFNBTk47QUFPRW1DLGdCQUFRLFVBUFY7QUFRRS9FLGVBQU8sR0FSVDtBQVNFb0QsaUJBQVMsS0FUWDtBQVVFdkIsb0JBQVk7QUFWZCxPQWJnQixDQUFsQjtBQTBCRDs7OzZCQUNTO0FBQ1IsV0FBS21ELFlBQUw7QUFDQSxXQUFLakQsTUFBTDtBQUNEOzs7O0VBL1krQixlQUFLa0QsSTs7a0JBQWxCdkcsSSIsImZpbGUiOiJjYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb3VudGUgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnXG4gICAgfVxuICAgJHJlcGVhdCA9IHtcImNvbGRsaXN0XCI6e1wiY29tXCI6XCJjb3VudGVDb2xkXCIsXCJwcm9wc1wiOlwiXCJ9LFwibm9ybWFsbGlzdFwiOntcImNvbVwiOlwiY291bnRlTm9ybWFsXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiY291bnRlQ29sZFwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvdW50XCIsXCJmb3JcIjpcImNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJjb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwiZGF0YS1pbmRleFwiOntcInZhbHVlXCI6XCJ7e2luZGV4fX1cIixcImZvclwiOlwiY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcImNsYXNzXCI6e1widmFsdWVcIjpcInt7IGhpZGRlbkNvbGRUZW1wID09PSBpbmRleCA/ICcnIDogJ2hpZGRlbi10ZW1wJ319XCIsXCJmb3JcIjpcImNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiY291bnRlTm9ybWFsXCI6e1widi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY291bnRcIixcImZvclwiOlwibm9ybWFsbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwiZGF0YS1pbmRleFwiOntcInZhbHVlXCI6XCJ7e2luZGV4fX1cIixcImZvclwiOlwibm9ybWFsbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwiY2xhc3NcIjp7XCJ2YWx1ZVwiOlwie3sgaGlkZGVuTm9ybWFsVGVtcCA9PT0gaW5kZXggPyAnJyA6ICdoaWRkZW4tdGVtcCd9fVwiLFwiZm9yXCI6XCJub3JtYWxsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ29sZFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbkNvbGRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q29sZFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNvbGRcIn0sXCJjb3VudGVOb3JtYWxcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzTm9ybWFsXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluTm9ybWFsXCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleU5vcm1hbFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ck5vcm1hbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY291bnRlQ29sZDogQ291bnRlLFxuICAgICAgY291bnRlTm9ybWFsOiBDb3VudGVcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5jb2xkbGlzdC5sZW5ndGggPT09IDAgJiYgdGhpcy5ub3JtYWxsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb2xkTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGRsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub3JtYWxOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMubm9ybWFsbGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG90YWxwcmljZSAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAwXG4gICAgICAgIHRoaXMuY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJlc3VsdCArPSBwYXJzZUludChpdGVtLnByaWNlICogaXRlbS5jb3VudClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5ub3JtYWxsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXN1bHQgKz0gcGFyc2VJbnQoaXRlbS5wcmljZSAqIGl0ZW0uY291bnQpXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0sXG4gICAgICBmcmVpZ2h0ICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDBcbiAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmVzdWx0ICs9IHBhcnNlSW50KGl0ZW0uZnJlaWdodFByaWNlKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHJlc3VsdCArPSBwYXJzZUludChpdGVtLmZyZWlnaHRQcmljZSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgYW5pbWF0ZTogJycsXG4gICAgICBjdXJyZW50OiAnJyxcbiAgICAgIGluZGV4SWQ6ICcnLFxuICAgICAgY2FydGNvdW50OiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBlZGl0VHh0OiAn57yW6L6RJyxcbiAgICAgIGNoZWNrZWRMaXN0OiBbXSxcbiAgICAgIHRlbXBDb2xkTGlzdDogW10sXG4gICAgICB0ZW1wTm9ybWFsTGlzdDogW10sXG4gICAgICBjYXJ0U3RhdHVzOiB7XG4gICAgICAgIHRvdGFscHJpY2U6ICczMDAnLFxuICAgICAgICBkaXNjb3VudDogJzExMCdcbiAgICAgIH0sXG4gICAgICBjb2xkbGlzdDogW10sXG4gICAgICBub3JtYWxsaXN0OiBbXSxcbiAgICAgIGNvbGRBcnJheTogW10sXG4gICAgICBjb2xkQ2hlY2tlZDogZmFsc2UsXG4gICAgICB0ZW1wQ29sZDogW10sXG4gICAgICBub3JtYWxBcnJheTogW10sXG4gICAgICBub3JtYWxDaGVja2VkOiBmYWxzZSxcbiAgICAgIHRlbXBOb3JtYWw6IFtdLFxuICAgICAgaGlkZGVuQ29sZFRlbXA6IDAsXG4gICAgICBoaWRkZW5Ob3JtYWxUZW1wOiAwXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBwbHVzQ29sZCAoZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBlLnNvdXJjZS4kaW5kZXhcbiAgICAgICAgdGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQgKytcbiAgICAgICAgaWYgKHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50ID49IHRoaXMuY29sZGxpc3RbaW5kZXhdLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICB0aGlzLmNvbGRsaXN0W2luZGV4XS5jb3VudCA9IHRoaXMuY29sZGxpc3RbaW5kZXhdLnRvdGFsQ291bnRcbiAgICAgICAgICB0aGlzLm1heE1vZGFsKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgfSxcbiAgICAgIHBsdXNOb3JtYWwgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMubm9ybWFsbGlzdFtpbmRleF0uY291bnQgKytcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub3JtYWxsaXN0W2luZGV4XS5jb3VudCwgdGhpcy5ub3JtYWxsaXN0W2luZGV4XS50b3RhbENvdW50KVxuICAgICAgICBpZiAodGhpcy5ub3JtYWxsaXN0W2luZGV4XS5jb3VudCA+PSB0aGlzLm5vcm1hbGxpc3RbaW5kZXhdLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICB0aGlzLm5vcm1hbGxpc3RbaW5kZXhdLmNvdW50ID0gdGhpcy5ub3JtYWxsaXN0W2luZGV4XS50b3RhbENvdW50XG4gICAgICAgICAgdGhpcy5tYXhNb2RhbCgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgIH0sXG4gICAgICBtaW5Db2xkIChlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLmNvbGRsaXN0W2luZGV4XS5jb3VudCAtLVxuICAgICAgICBpZiAodGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQgPD0gMCkge1xuICAgICAgICAgIHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50ID0gMVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICB9LFxuICAgICAgbWluTm9ybWFsIChlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLm5vcm1hbGxpc3RbaW5kZXhdLmNvdW50IC0tXG4gICAgICAgIGlmICh0aGlzLm5vcm1hbGxpc3RbaW5kZXhdLmNvdW50IDw9IDApIHtcbiAgICAgICAgICB0aGlzLm5vcm1hbGxpc3RbaW5kZXhdLmNvdW50ID0gMVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICB9LFxuICAgICAga2V5Q29sZCAodmFsLCBlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLmhpZGRlbkNvbGRUZW1wID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIGlmICh2YWwgPT09ICcwJykge1xuICAgICAgICAgIHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50ID0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50ID0gdmFsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50ID4gdGhpcy5jb2xkbGlzdFtpbmRleF0udG90YWxDb3VudCkge1xuICAgICAgICAgIHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50ID0gdGhpcy5jb2xkbGlzdFtpbmRleF0udG90YWxDb3VudFxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29sZGxpc3RbaW5kZXhdLmNvdW50LCB0aGlzLmNvbGRsaXN0W2luZGV4XS50b3RhbENvdW50KVxuICAgICAgICAgIHRoaXMubWF4TW9kYWwoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGRsaXN0W2luZGV4XS5jb3VudFxuICAgICAgfSxcbiAgICAgIGJsdXJDb2xkICh2YWwsIGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIGlmICh2YWwgPT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5jb2xkbGlzdFtpbmRleF0uY291bnQgPSAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXlOb3JtYWwgKHZhbCwgZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBlLnNvdXJjZS4kaW5kZXhcbiAgICAgICAgdGhpcy5oaWRkZW5Ob3JtYWxUZW1wID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMubm9ybWFsbGlzdFtpbmRleF0uY291bnQgPSB2YWxcbiAgICAgICAgaWYgKHZhbCA9PT0gJzAnKSB7XG4gICAgICAgICAgdGhpcy5ub3JtYWxsaXN0W2luZGV4XS5jb3VudCA9IDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5vcm1hbGxpc3RbaW5kZXhdLmNvdW50ID0gdmFsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm9ybWFsbGlzdFtpbmRleF0uY291bnQgPiB0aGlzLm5vcm1hbGxpc3RbaW5kZXhdLnRvdGFsQ291bnQpIHtcbiAgICAgICAgICB0aGlzLm5vcm1hbGxpc3RbaW5kZXhdLmNvdW50ID0gdGhpcy5ub3JtYWxsaXN0W2luZGV4XS50b3RhbENvdW50XG4gICAgICAgICAgdGhpcy5tYXhNb2RhbCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsbGlzdFtpbmRleF0uY291bnRcbiAgICAgIH0sXG4gICAgICBibHVyTm9ybWFsICh2YWwsIGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIGlmICh2YWwgPT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5ub3JtYWxpc3RbaW5kZXhdLmNvdW50ID0gMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGRDaGVjayAoZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZVxuICAgICAgICAvLyDorqHnrpfpgInkuK3lgLxcbiAgICAgICAgdGhpcy5nZXRDaGVja2VkKHRoaXMuY29sZEFycmF5LCB2YWx1ZSlcbiAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgICBpZiAodmFsLmlkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSAhdmFsLmNoZWNrZWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudGVtcENvbGQgPSB0aGlzLmNvbGRsaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHRoaXMudGVtcENvbGQubGVuZ3RoID09PSB0aGlzLmNvbGRsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb2xkQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub3JtYWxDaGVjayAoZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZVxuICAgICAgICAvLyDorqHnrpfpgInkuK3lgLxcbiAgICAgICAgdGhpcy5nZXRDaGVja2VkKHRoaXMubm9ybWFsQXJyYXksIHZhbHVlKVxuICAgICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbC5pZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHZhbC5jaGVja2VkID0gIXZhbC5jaGVja2VkXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlbXBOb3JtYWwgPSB0aGlzLm5vcm1hbGxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgICB9KVxuICAgICAgICBpZiAodGhpcy50ZW1wTm9ybWFsLmxlbmd0aCA9PT0gdGhpcy5ub3JtYWxsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMubm9ybWFsQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5vcm1hbENoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29sZEFsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLnRlbXBDb2xkLmxlbmd0aCA9PT0gdGhpcy5jb2xkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmNvbGRDaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuY29sZEFycmF5ID0gW11cbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMudGVtcENvbGQgPSBbXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgICAgdGhpcy5jb2xkQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgICAgaWYgKHRoaXMuY29sZEFycmF5LmluZGV4T2YoaXRlbS5pZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xkQXJyYXkucHVzaChpdGVtLmlkKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy50ZW1wQ29sZCA9IHRoaXMuY29sZGxpc3RcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vcm1hbEFsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLnRlbXBOb3JtYWwubGVuZ3RoID09PSB0aGlzLm5vcm1hbGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5ub3JtYWxsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLm5vcm1hbENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5ub3JtYWxBcnJheSA9IFtdXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnRlbXBOb3JtYWwgPSBbXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubm9ybWFsbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICAgIHRoaXMubm9ybWFsQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgICAgaWYgKHRoaXMubm9ybWFsQXJyYXkuaW5kZXhPZihpdGVtLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vcm1hbEFycmF5LnB1c2goaXRlbS5pZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMudGVtcE5vcm1hbCA9IHRoaXMubm9ybWFsbGlzdFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hlY2tBbGwgKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRlbXBDb2xkLCB0aGlzLnRlbXBOb3JtYWwpXG4gICAgICAgIGlmICh0aGlzLnRlbXBDb2xkLmxlbmd0aCA9PT0gdGhpcy5jb2xkbGlzdC5sZW5ndGggJiYgdGhpcy50ZW1wTm9ybWFsLmxlbmd0aCA9PT0gdGhpcy5ub3JtYWxsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuY29sZENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5jb2xkQXJyYXkgPSBbXVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy50ZW1wQ29sZCA9IFtdXG4gICAgICAgICAgdGhpcy5ub3JtYWxsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLm5vcm1hbENoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5ub3JtYWxBcnJheSA9IFtdXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICAgIHRoaXMuY29sZENoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICAgIGlmICh0aGlzLmNvbGRBcnJheS5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sZEFycmF5LnB1c2goaXRlbS5pZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMudGVtcENvbGQgPSB0aGlzLmNvbGRsaXN0XG4gICAgICAgICAgdGhpcy5ub3JtYWxsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgICAgdGhpcy5ub3JtYWxDaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgICBpZiAodGhpcy5ub3JtYWxBcnJheS5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsQXJyYXkucHVzaChpdGVtLmlkKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy50ZW1wTm9ybWFsID0gdGhpcy5ub3JtYWxsaXN0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWxldGVUYXAgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb2xkQXJyYXksIHRoaXMubm9ybWFsQXJyYXkpXG4gICAgICAgIHZhciBjb2xkRmlsdGVyID0gdGhpcy5jb2xkbGlzdFxuICAgICAgICB2YXIgbm9ybWFsRmlsdGVyID0gdGhpcy5ub3JtYWxsaXN0XG4gICAgICAgIHRoaXMuY29sZEFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb2xkRmlsdGVyID0gY29sZEZpbHRlci5maWx0ZXIoKHZhbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC5pZCAhPT0gaXRlbVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubm9ybWFsQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIG5vcm1hbEZpbHRlciA9IG5vcm1hbEZpbHRlci5maWx0ZXIoKHZhbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC5pZCAhPT0gaXRlbVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHZhciBjb2xkU2VsZWN0ZWQgPSB0aGlzLmNvbGRsaXN0XG4gICAgICAgIHRoaXMuY29sZEFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb2xkU2VsZWN0ZWQgPSBjb2xkU2VsZWN0ZWQuZmlsdGVyKCh2YWwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWwuaWQgPT09IGl0ZW1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBpZiAodGhpcy5jb2xkQXJyYXkubGVuZ3RoID09PSAwICYmIHRoaXMubm9ybWFsQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nllYblk4EnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5jb2xkbGlzdCA9IGNvbGRGaWx0ZXJcbiAgICAgICAgICAgICAgICB0aGF0LnRlbXBDb2xkID0gW11cbiAgICAgICAgICAgICAgICB0aGF0Lm5vcm1hbGxpc3QgPSBub3JtYWxGaWx0ZXJcbiAgICAgICAgICAgICAgICB0aGF0LnRlbXBOb3JtYWwgPSBbXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2hlY2tlZCAoYXJyLCB2YWwpIHtcbiAgICAgIGlmIChhcnIuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICBhcnIucHVzaCh2YWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIuc3BsaWNlKGFyci5pbmRleE9mKHZhbCksIDEpXG4gICAgICB9XG4gICAgfVxuICAgIG1heE1vZGFsICgpIHtcbiAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfmlbDph4/lt7Lovr7kuIrpmZAnLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2VEYXRhICgpIHtcbiAgICAgIHRoaXMuY29sZGxpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBmcmVpZ2h0UHJpY2U6ICcxOCcsXG4gICAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgICAgaWQ6ICcxMjMxMTIzJyxcbiAgICAgICAgICBkZXRhaWw6ICc1MDBnIMOXIDUnLFxuICAgICAgICAgIGNvdW50OiAnMTAnLFxuICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIHRvdGFsQ291bnQ6ICcxMidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZyZWlnaHRQcmljZTogJzIwJyxcbiAgICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJmycsXG4gICAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgICBpZDogJzEyMjMxMjMnLFxuICAgICAgICAgIGRldGFpbDogJzUwMGcgw5cgNScsXG4gICAgICAgICAgY291bnQ6ICc2JyxcbiAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICB0b3RhbENvdW50OiAnOCdcbiAgICAgICAgfVxuICAgICAgXVxuICAgICAgdGhpcy5ub3JtYWxsaXN0ID0gW1xuICAgICAgICB7XG4gICAgICAgICAgZnJlaWdodFByaWNlOiAnMTAnLFxuICAgICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICAgIGlkOiAnMTI2MTEyMycsXG4gICAgICAgICAgZGV0YWlsOiAnNTAwZyDDlyA1JyxcbiAgICAgICAgICBjb3VudDogJzEwJyxcbiAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICB0b3RhbENvdW50OiAnMTQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmcmVpZ2h0UHJpY2U6ICc1JyxcbiAgICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgICB0aXRsZTogJ+mYv+agueW7t+e6ouiZvicsXG4gICAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgICBpZDogJzEyMzQ0NDMnLFxuICAgICAgICAgIGRldGFpbDogJzUwMGcgw5cgNScsXG4gICAgICAgICAgY291bnQ6ICc2JyxcbiAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICB0b3RhbENvdW50OiAnNidcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19