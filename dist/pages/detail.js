'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _bottombar = require('./../components/bottombar.js');

var _bottombar2 = _interopRequireDefault(_bottombar);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _menu = require('./../components/menu.js');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Detail = function (_wepy$page) {
  _inherits(Detail, _wepy$page);

  function Detail() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Detail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '商品详情'
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:cartVal.sync": "addCartCount" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum", "v-bind:isDisabled.sync": "noSales" } }, _this2.$events = { "bottom": { "v-on:buy": "cart", "v-on:cart": "cart" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart", "v-on:keyEdit": "keyCart", "v-on:blurEdit": "blurCart" } }, _this2.components = {
      bottom: _bottombar2.default,
      counterBuy: _counter2.default,
      counterCart: _counter2.default,
      menuList: _menu2.default
    }, _this2.computed = {
      totalCart: function totalCart() {
        if (Object.keys(this.cartResult).length > 0) {
          var price = this.cartResult.price.replace(/,/g, '') * this.cartNum;
          return price.toFixed(2);
        }
      },
      maxtip: function maxtip() {
        var maxtip = false;
        if (this.cartNum >= this.cartResult.num) {
          maxtip = true;
        } else {
          maxtip = false;
        }
        return maxtip;
      },
      noSales: function noSales() {
        if (this.cartResult.num > 0) {
          return false;
        } else {
          return true;
        }
      }
    }, _this2.data = {
      detail: {
        path: '',
        price: '',
        oldprice: '',
        express: '38.0',
        title: '',
        goodList: []
      },
      token: '',
      pageId: '',
      collect: false,
      overflow: false,
      winHeight: 0,
      collectTxt: '未收藏',
      collectednum: ' ',
      goodsDetail: [{
        title: '商品名称',
        detail: '美国自然牛USDA PRIMA极佳级肉眼牛排'
      }, {
        title: '商品名称',
        detail: '美国自然牛USDA PRIMA极佳级肉眼牛排'
      }, {
        title: '商品名称',
        detail: '美国自然牛USDA PRIMA极佳级肉眼牛排'
      }, {
        title: '商品名称',
        detail: '美国自然牛USDA PRIMA极佳级肉眼牛排'
      }],
      transportDetail: [{
        title: '配送范围',
        detail: '购满2公斤全国包邮'
      }, {
        title: '配送快递',
        detail: '顺丰冷运'
      }, {
        title: '配送方案',
        detail: '配送规则',
        isLink: true
      }],
      isAddCart: true,
      cartNum: 1,
      addCartCount: 0,
      cartResult: [],
      totalCart: 0,
      cartModal: false,
      collectImage: '../image/icon-cart-blank.png',
      markId: ''
    }, _this2.methods = {
      collectTap: function collectTap() {
        var _this3 = this;

        if (!this.collect) {
          this.setMark(function () {
            _this3.collectTxt = '已收藏';
            _this3.collect = true;
          });
        } else {
          this.CancelMark(function () {
            _this3.collectTxt = '未收藏';
            _this3.collect = false;
          });
        }
      },
      cart: function cart(action) {
        if (action === 'addCart') {
          this.isAddCart = true;
        } else if (action === 'addBuy') {
          this.isAddCart = false;
        }
        this.overflow = true;
        this.cartModal = true;
        this.initData(this.pageId, this.initCartResult());
      },
      closeCart: function closeCart() {
        this.overflow = false;
        this.cartModal = false;
        this.cartNum = this.cartResult.num <= 0 ? 0 : 1;
      },
      plusCart: function plusCart() {
        if (this.cartResult.num > 0) {
          this.cartNum++;
          if (this.cartNum > this.cartResult.num) {
            this.cartNum = this.cartResult.num;
          }
        }
      },
      minusCart: function minusCart() {
        if (this.cartResult.num > 0) {
          this.cartNum--;
          if (this.cartNum <= 0) {
            this.cartNum = 1;
          }
        }
        // 发送购物车减少数量
      },
      keyCart: function keyCart(val) {
        this.cartNum = val;
        return this.cartNum;
      },
      blurCart: function blurCart(val) {
        if (val <= 0) {
          this.cartNum = 1;
        } else if (this.cartResult.num > 0 && this.cartNum > this.cartResult.num) {
          this.cartNum = this.cartResult.num;
        } else if (this.cartResult.num <= 0) {
          this.cartNum = 0;
        } else {
          this.cartNum = val;
        }
        return this.cartNum;
      },
      addCartGoods: function addCartGoods(e) {
        // 发送选中结果
        this.cartNum = this.cartResult.num <= 0 ? 0 : 1;
        this.cartResult = this.detail.goodList[e.detail.value];
      },
      goCart: function goCart() {
        if (this.cartResult.num > 0) {
          if (this.isAddCart) {
            if (this.cartNum <= this.cartResult.num) {
              this.addCartCount += parseInt(this.cartNum);
              // 发送添加购物车请求
              this.addCartData();
            }
          } else {
            _wepy2.default.navigateTo({
              url: './paybuy?id=' + this.cartResult.id + '&type=' + this.cartResult.type + '&count=' + this.cartNum
            });
          }
          this.methods.closeCart.apply(this);
        }
      },
      goRules: function goRules() {
        _wepy2.default.navigateTo({
          url: './rules'
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Detail, [{
    key: 'initCartData',
    value: function initCartData() {
      // 往后台发请求清空购物车选项
    }
  }, {
    key: 'initCartResult',
    value: function initCartResult() {
      this.cartResult = [];
      var result = this.detail.goodList.filter(function (item) {
        return item.checked;
      });
      this.cartResult = result.length > 0 ? result[0] : this.detail.goodList[0];
      this.cartNum = result.length > 0 ? 1 : 0;
    }
  }, {
    key: 'initData',
    value: function initData(id, cb) {
      var _this4 = this;

      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token,
        spuId: id
      };
      this.$parent.HttpRequest.DetailHttp(data).then(function (res) {
        console.log(res);
        _this4.detail.goodList = [];
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          if (!data.collectionId) {
            _this.collect = false;
          } else {
            _this.collect = true;
          }
          // 测试用户身份变化
          _this.$parent.resetUserLevel(data.memberHash, _this4.token);
          _this.detail.path = data.cover;
          _this.detail.title = data.title;
          _this.detail.price = data.memberPrice;
          _this.detail.oldprice = data.price;
          _this.detail.descript = data.desc;
          _this.detail.type = data.sourceType;
          _this.detail.id = data.sourceId;
          _this.detail.collectId = data.collectionId;
          _this.getMarkUser(data.sourceId, data.sourceType);
          if (data.collectionId) {
            _this.collect = true;
            _this.collectTxt = '已收藏';
          } else {
            _this.collect = false;
            _this.collectTxt = '未收藏';
          }
          data.skus.forEach(function (item) {
            var good = {};
            good.name = item.productName + item.title;
            if (_this.$parent.globalData.userLevel === 0) {
              good.price = item.price;
            } else if (_this.$parent.globalData.userLevel === 1) {
              good.price = item.memberPrice;
            }
            good.num = item.keepCout;
            if (item.keepCout > 0) {
              good.checked = true;
            } else {
              good.checked = false;
            }
            good.type = item.sourceType;
            good.id = item.sourceId;
            _this.detail.goodList.push(good);
            _this.$apply();
            cb && cb();
          });
        } else {
          _this.$parent.showFail();
        }
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'addCartData',
    value: function addCartData() {
      var data = {
        token: this.token,
        sourceType: this.cartResult.type,
        sourceId: this.cartResult.id,
        count: this.cartNum
      };
      this.$parent.HttpRequest.AddCartHttp(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'getMarkUser',
    value: function getMarkUser(id, type) {
      this.collectednum = ' ';
      var _this = this;
      var data = {
        token: this.token,
        markType: 1,
        sourceType: type,
        sourceId: id
      };
      this.$parent.HttpRequest.GetMarkUser(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.collectednum = data.length;
        }
        _this.$apply();
      });
    }
  }, {
    key: 'setMark',
    value: function setMark(cb) {
      var _this5 = this;

      var _this = this;
      var data = {
        token: this.token,
        markType: 1,
        sourceType: this.detail.type,
        sourceId: this.detail.id
      };
      console.log(data);
      this.$parent.HttpRequest.SetMarkHttp(data).then(function (res) {
        if (res.data.error === 0) {
          _this.markId = res.data.data;
          _this.getMarkUser(_this.detail.id, _this5.detail.type);
          cb && cb();
        }
        _this.$apply();
      });
    }
  }, {
    key: 'CancelMark',
    value: function CancelMark(cb) {
      var _this6 = this;

      var _this = this;
      var data = {
        markId: this.markId || this.detail.collectId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        _this.getMarkUser(_this.detail.id, _this6.detail.type);
        cb && cb();
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(id) {
      this.pageId = id.id;
      this.token = this.$parent.getToken();
      this.initData(this.pageId);
      this.$parent.pageRoot = true;
      var _this = this;
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          _this.winHeight = res.windowHeight + 'px';
        }
      });
      this.$apply();
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJpc0FkZENhcnQiLCJhZGRDYXJ0Q291bnQiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtYXJrSWQiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsImluaXREYXRhIiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQ2FydCIsIm1pbnVzQ2FydCIsImtleUNhcnQiLCJ2YWwiLCJibHVyQ2FydCIsImFkZENhcnRHb29kcyIsImUiLCJ2YWx1ZSIsImdvQ2FydCIsInBhcnNlSW50IiwiYWRkQ2FydERhdGEiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaWQiLCJ0eXBlIiwiYXBwbHkiLCJnb1J1bGVzIiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJjYiIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsIl90aGlzIiwic3B1SWQiLCJIdHRwUmVxdWVzdCIsIkRldGFpbEh0dHAiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJjb2xsZWN0aW9uSWQiLCJyZXNldFVzZXJMZXZlbCIsIm1lbWJlckhhc2giLCJjb3ZlciIsIm1lbWJlclByaWNlIiwiZGVzY3JpcHQiLCJkZXNjIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwiY29sbGVjdElkIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJnbG9iYWxEYXRhIiwidXNlckxldmVsIiwia2VlcENvdXQiLCJwdXNoIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJjYXRjaCIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJtYXJrVHlwZSIsIkdldE1hcmtVc2VyIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsImdldFRva2VuIiwicGFnZVJvb3QiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQVYsRUFBbUYsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBaUQsMEJBQXlCLFNBQTFFLEVBQWpHLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLFlBQVcsTUFBWixFQUFtQixhQUFZLE1BQS9CLEVBQVYsRUFBaUQsZUFBYyxFQUFDLGlCQUFnQixVQUFqQixFQUE0QixrQkFBaUIsV0FBN0MsRUFBeUQsZ0JBQWUsU0FBeEUsRUFBa0YsaUJBQWdCLFVBQWxHLEVB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QUFjLEtBQUtwQixNQUFuQjtBQUNBLFdBQUs2QyxPQUFMLENBQWEwQyxRQUFiLEdBQXdCLElBQXhCO0FBQ0EsVUFBSXhDLFFBQVEsSUFBWjtBQUNBLHFCQUFLeUMsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVyQyxHQUFWLEVBQWU7QUFDdEJMLGdCQUFNNUMsU0FBTixHQUFrQmlELElBQUlzQyxZQUFKLEdBQW1CLElBQXJDO0FBQ0Q7QUFIZ0IsT0FBbkI7QUFLQSxXQUFLYixNQUFMO0FBQ0Q7Ozs7RUFoVWlDLGVBQUtjLEk7O2tCQUFwQjNILE0iLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBCb3R0b20gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b21iYXInXG4gIGltcG9ydCBDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJib3R0b21cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y2FydFZhbC5zeW5jXCI6XCJhZGRDYXJ0Q291bnRcIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwiLFwidi1iaW5kOmlzRGlzYWJsZWQuc3luY1wiOlwibm9TYWxlc1wifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiY2FydFwiLFwidi1vbjpjYXJ0XCI6XCJjYXJ0XCJ9LFwiY291bnRlckNhcnRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ2FydFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQ2FydFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDYXJ0XCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ2FydFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgYm90dG9tOiBCb3R0b20sXG4gICAgICBjb3VudGVyQnV5OiBDb3VudCxcbiAgICAgIGNvdW50ZXJDYXJ0OiBDb3VudCxcbiAgICAgIG1lbnVMaXN0OiBNZW51XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdG90YWxDYXJ0ICgpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuY2FydFJlc3VsdCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBwcmljZSA9IHRoaXMuY2FydFJlc3VsdC5wcmljZS5yZXBsYWNlKC8sL2csICcnKSAqIHRoaXMuY2FydE51bVxuICAgICAgICAgIHJldHVybiBwcmljZS50b0ZpeGVkKDIpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXh0aXAgKCkge1xuICAgICAgICB2YXIgbWF4dGlwID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgbWF4dGlwID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heHRpcFxuICAgICAgfSxcbiAgICAgIG5vU2FsZXMgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIHByaWNlOiAnJyxcbiAgICAgICAgb2xkcHJpY2U6ICcnLFxuICAgICAgICBleHByZXNzOiAnMzguMCcsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZ29vZExpc3Q6IFtdXG4gICAgICB9LFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZUlkOiAnJyxcbiAgICAgIGNvbGxlY3Q6IGZhbHNlLFxuICAgICAgb3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAwLFxuICAgICAgY29sbGVjdFR4dDogJ+acquaUtuiXjycsXG4gICAgICBjb2xsZWN0ZWRudW06ICcgJyxcbiAgICAgIGdvb2RzRGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9XSxcbiAgICAgIHRyYW5zcG9ydERldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfphY3pgIHojIPlm7QnLFxuICAgICAgICBkZXRhaWw6ICfotK3mu6Ey5YWs5pak5YWo5Zu95YyF6YKuJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeW/q+mAkicsXG4gICAgICAgIGRldGFpbDogJ+mhuuS4sOWGt+i/kCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHmlrnmoYgnLFxuICAgICAgICBkZXRhaWw6ICfphY3pgIHop4TliJknLFxuICAgICAgICBpc0xpbms6IHRydWVcbiAgICAgIH1dLFxuICAgICAgaXNBZGRDYXJ0OiB0cnVlLFxuICAgICAgY2FydE51bTogMSxcbiAgICAgIGFkZENhcnRDb3VudDogMCxcbiAgICAgIGNhcnRSZXN1bHQ6IFtdLFxuICAgICAgdG90YWxDYXJ0OiAwLFxuICAgICAgY2FydE1vZGFsOiBmYWxzZSxcbiAgICAgIGNvbGxlY3RJbWFnZTogJy4uL2ltYWdlL2ljb24tY2FydC1ibGFuay5wbmcnLFxuICAgICAgbWFya0lkOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5zZXRNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLkNhbmNlbE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhcnQgKGFjdGlvbikge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkQ2FydCcpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdhZGRCdXknKSB7XG4gICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLmluaXREYXRhKHRoaXMucGFnZUlkLCB0aGlzLmluaXRDYXJ0UmVzdWx0KCkpXG4gICAgICB9LFxuICAgICAgY2xvc2VDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwID8gMCA6IDFcbiAgICAgIH0sXG4gICAgICBwbHVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWludXNDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtIC0tXG4gICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUNhcnQgKHZhbCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGJsdXJDYXJ0ICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwICYmIHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBhZGRDYXJ0R29vZHMgKGUpIHtcbiAgICAgICAgLy8g5Y+R6YCB6YCJ5Lit57uT5p6cXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkQ2FydENvdW50ICs9IHBhcnNlSW50KHRoaXMuY2FydE51bSlcbiAgICAgICAgICAgICAgLy8g5Y+R6YCB5re75Yqg6LSt54mp6L2m6K+35rGCXG4gICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWJ1eT9pZD0nICsgdGhpcy5jYXJ0UmVzdWx0LmlkICsgJyZ0eXBlPScgKyB0aGlzLmNhcnRSZXN1bHQudHlwZSArICcmY291bnQ9JyArIHRoaXMuY2FydE51bVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tZXRob2RzLmNsb3NlQ2FydC5hcHBseSh0aGlzKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSBbXVxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB0aGlzLmRldGFpbC5nb29kTGlzdFswXVxuICAgICAgdGhpcy5jYXJ0TnVtID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyAxIDogMFxuICAgIH1cbiAgICBpbml0RGF0YSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzcHVJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZXRhaWxIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKCFkYXRhLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIOa1i+ivleeUqOaIt+i6q+S7veWPmOWMllxuICAgICAgICAgIF90aGlzLiRwYXJlbnQucmVzZXRVc2VyTGV2ZWwoZGF0YS5tZW1iZXJIYXNoLCB0aGlzLnRva2VuKVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wYXRoID0gZGF0YS5jb3ZlclxuICAgICAgICAgIF90aGlzLmRldGFpbC50aXRsZSA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLm9sZHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5kZXNjcmlwdCA9IGRhdGEuZGVzY1xuICAgICAgICAgIF90aGlzLmRldGFpbC50eXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgICAgIF90aGlzLmRldGFpbC5jb2xsZWN0SWQgPSBkYXRhLmNvbGxlY3Rpb25JZFxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5za3VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QubmFtZSA9IGl0ZW0ucHJvZHVjdE5hbWUgKyBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLm51bSA9IGl0ZW0ua2VlcENvdXRcbiAgICAgICAgICAgIGlmIChpdGVtLmtlZXBDb3V0ID4gMCkge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGFkZENhcnREYXRhICgpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0TWFya1VzZXIgKGlkLCB0eXBlKSB7XG4gICAgICB0aGlzLmNvbGxlY3RlZG51bSA9ICcgJ1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1VzZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY29sbGVjdGVkbnVtID0gZGF0YS5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgc2V0TWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuZGV0YWlsLnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmRldGFpbC5pZFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZXRNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMubWFya0lkID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKF90aGlzLmRldGFpbC5pZCwgdGhpcy5kZXRhaWwudHlwZSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIENhbmNlbE1hcmsgKGNiKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgbWFya0lkOiB0aGlzLm1hcmtJZCB8fCB0aGlzLmRldGFpbC5jb2xsZWN0SWQsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsTWFya0h0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIF90aGlzLmdldE1hcmtVc2VyKF90aGlzLmRldGFpbC5pZCwgdGhpcy5kZXRhaWwudHlwZSlcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChpZCkge1xuICAgICAgdGhpcy5wYWdlSWQgPSBpZC5pZFxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmluaXREYXRhKHRoaXMucGFnZUlkKVxuICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgKyAncHgnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=