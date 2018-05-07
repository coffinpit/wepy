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
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:cartVal.sync": "addCartCount" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum" } }, _this2.$events = { "bottom": { "v-on:buy": "cart", "v-on:cart": "cart" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart", "v-on:keyEdit": "keyCart", "v-on:blurEdit": "blurCart" } }, _this2.components = {
      bottom: _bottombar2.default,
      counterBuy: _counter2.default,
      counterCart: _counter2.default,
      menuList: _menu2.default
    }, _this2.computed = {
      totalCart: function totalCart() {
        if (this.cartResult.price) {
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
      collectednum: 0,
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
        this.cartNum = 1;
      },
      plusCart: function plusCart() {
        this.cartNum++;
        if (this.cartNum > this.cartResult.num) {
          this.cartNum = this.cartResult.num;
        }
        console.log(this.cartNum);
      },
      minusCart: function minusCart() {
        this.cartNum--;
        if (this.cartNum <= 0) {
          this.cartNum = 1;
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
        } else if (this.cartNum > this.cartResult.num) {
          this.cartNum = this.cartResult.num;
        } else {
          this.cartNum = val;
        }
        return this.cartNum;
      },
      addCartGoods: function addCartGoods(e) {
        // 发送选中结果
        this.cartNum = 1;
        this.cartResult = this.detail.goodList[e.detail.value];
      },
      goCart: function goCart() {
        if (this.isAddCart) {
          if (this.cartNum <= this.cartResult.num) {
            this.addCartCount += parseInt(this.cartNum);
            // 发送添加购物车请求
            this.addCartData();
            // 关闭浮层并清空数据
            this.methods.closeCart.apply(this);
          }
        } else {
          console.log(this.cartResult);
          _wepy2.default.navigateTo({
            url: './paybuy?id=' + this.cartResult.id + '&type=' + this.cartResult.type + '&count=' + this.cartNum
          });
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
      // 根据商品id发送请求返回商品详情数据 以下模拟数据
      var result = this.detail.goodList.filter(function (item) {
        return item.checked;
      });
      this.cartResult = result[0];
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
            good.checked = item.isAllowSale;
            good.type = item.sourceType;
            good.id = item.sourceId;
            _this.detail.goodList.push(good);
            _this.$apply();
            cb && cb();
          });
        }
      });
    }
  }, {
    key: 'addCartData',
    value: function addCartData() {
      this.$parent.showLoading();
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
      this.collectednum = 0;
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
      this.token = this.$parent.getToken('detail');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsImNhcnRSZXN1bHQiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsIm51bSIsImRhdGEiLCJkZXRhaWwiLCJwYXRoIiwib2xkcHJpY2UiLCJleHByZXNzIiwidGl0bGUiLCJnb29kTGlzdCIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImdvb2RzRGV0YWlsIiwidHJhbnNwb3J0RGV0YWlsIiwiaXNMaW5rIiwiaXNBZGRDYXJ0IiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwibWV0aG9kcyIsImNvbGxlY3RUYXAiLCJzZXRNYXJrIiwiQ2FuY2VsTWFyayIsImNhcnQiLCJhY3Rpb24iLCJpbml0RGF0YSIsImluaXRDYXJ0UmVzdWx0IiwiY2xvc2VDYXJ0IiwicGx1c0NhcnQiLCJjb25zb2xlIiwibG9nIiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsImFwcGx5IiwibmF2aWdhdGVUbyIsInVybCIsImlkIiwidHlwZSIsImdvUnVsZXMiLCJyZXN1bHQiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2tlZCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJyZXMiLCJlcnJvciIsImNvbGxlY3Rpb25JZCIsInJlc2V0VXNlckxldmVsIiwibWVtYmVySGFzaCIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJnZXRNYXJrVXNlciIsInNrdXMiLCJmb3JFYWNoIiwiZ29vZCIsIm5hbWUiLCJwcm9kdWN0TmFtZSIsImdsb2JhbERhdGEiLCJ1c2VyTGV2ZWwiLCJrZWVwQ291dCIsImlzQWxsb3dTYWxlIiwicHVzaCIsIiRhcHBseSIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJtYXJrVHlwZSIsIkdldE1hcmtVc2VyIiwibGVuZ3RoIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsImdldFRva2VuIiwicGFnZVJvb3QiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQVYsRUFBbUYsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBakcsRSxTQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsWUFBVyxNQUFaLEVBQW1CLGFBQVksTUFBL0IsRUFBVixFQUFpRCxlQUFjLEVBQUMsaUJBQWdCLFVBQWpCLEVBQTRCLGtCQUFpQixXQUE3QyxFQUF5RCxnQkFBZSxTQUF4RSxFQUFrRixpQkFBZ0IsVUFBbEcsRUFBL0QsRSxTQUNUQyxVLEdBQWE7QUFDUkMsaUNBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFK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LEtBQUtwQixNQUFuQjtBQUNBLFdBQUsrQyxPQUFMLENBQWF1QyxRQUFiLEdBQXdCLElBQXhCO0FBQ0EsVUFBSXJDLFFBQVEsSUFBWjtBQUNBLHFCQUFLc0MsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVsQyxHQUFWLEVBQWU7QUFDdEJMLGdCQUFNOUMsU0FBTixHQUFrQm1ELElBQUltQyxZQUFKLEdBQW1CLElBQXJDO0FBQ0Q7QUFIZ0IsT0FBbkI7QUFLQSxXQUFLWixNQUFMO0FBQ0Q7Ozs7RUE1U2lDLGVBQUthLEk7O2tCQUFwQnRILE0iLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBCb3R0b20gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b21iYXInXG4gIGltcG9ydCBDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJib3R0b21cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y2FydFZhbC5zeW5jXCI6XCJhZGRDYXJ0Q291bnRcIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiY2FydFwiLFwidi1vbjpjYXJ0XCI6XCJjYXJ0XCJ9LFwiY291bnRlckNhcnRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ2FydFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQ2FydFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDYXJ0XCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ2FydFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgYm90dG9tOiBCb3R0b20sXG4gICAgICBjb3VudGVyQnV5OiBDb3VudCxcbiAgICAgIGNvdW50ZXJDYXJ0OiBDb3VudCxcbiAgICAgIG1lbnVMaXN0OiBNZW51XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdG90YWxDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5wcmljZSkge1xuICAgICAgICAgIHZhciBwcmljZSA9IHRoaXMuY2FydFJlc3VsdC5wcmljZS5yZXBsYWNlKC8sL2csICcnKSAqIHRoaXMuY2FydE51bVxuICAgICAgICAgIHJldHVybiBwcmljZS50b0ZpeGVkKDIpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXh0aXAgKCkge1xuICAgICAgICB2YXIgbWF4dGlwID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgbWF4dGlwID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heHRpcFxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXVxuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAwLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBpc0FkZENhcnQ6IHRydWUsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYWRkQ2FydENvdW50OiAwLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZycsXG4gICAgICBtYXJrSWQ6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjb2xsZWN0VGFwICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLnNldE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FydCAoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRDYXJ0Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2FkZEJ1eScpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5wYWdlSWQsIHRoaXMuaW5pdENhcnRSZXN1bHQoKSlcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jYXJ0TnVtKVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYmx1ckNhcnQgKHZhbCkge1xuICAgICAgICBpZiAodmFsIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDYXJ0Q291bnQgKz0gcGFyc2VJbnQodGhpcy5jYXJ0TnVtKVxuICAgICAgICAgICAgLy8g5Y+R6YCB5re75Yqg6LSt54mp6L2m6K+35rGCXG4gICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKClcbiAgICAgICAgICAgIC8vIOWFs+mXrea1ruWxguW5tua4heepuuaVsOaNrlxuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmNsb3NlQ2FydC5hcHBseSh0aGlzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNhcnRSZXN1bHQpXG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P2lkPScgKyB0aGlzLmNhcnRSZXN1bHQuaWQgKyAnJnR5cGU9JyArIHRoaXMuY2FydFJlc3VsdC50eXBlICsgJyZjb3VudD0nICsgdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDYXJ0RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrotK3nianovabpgInpoblcbiAgICB9XG4gICAgaW5pdENhcnRSZXN1bHQgKCkge1xuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gW11cbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uIOS7peS4i+aooeaLn+aVsOaNrlxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0WzBdXG4gICAgfVxuICAgIGluaXREYXRhIChpZCwgY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNwdUlkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRldGFpbEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoIWRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5rWL6K+V55So5oi36Lqr5Lu95Y+Y5YyWXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5yZXNldFVzZXJMZXZlbChkYXRhLm1lbWJlckhhc2gsIHRoaXMudG9rZW4pXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnBhdGggPSBkYXRhLmNvdmVyXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnRpdGxlID0gZGF0YS50aXRsZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwub2xkcHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmRlc2NyaXB0ID0gZGF0YS5kZXNjXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnR5cGUgPSBkYXRhLnNvdXJjZVR5cGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuaWQgPSBkYXRhLnNvdXJjZUlkXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmNvbGxlY3RJZCA9IGRhdGEuY29sbGVjdGlvbklkXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoZGF0YS5zb3VyY2VJZCwgZGF0YS5zb3VyY2VUeXBlKVxuICAgICAgICAgIGlmIChkYXRhLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLnNrdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5uYW1lID0gaXRlbS5wcm9kdWN0TmFtZSArIGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QubnVtID0gaXRlbS5rZWVwQ291dFxuICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gaXRlbS5pc0FsbG93U2FsZVxuICAgICAgICAgICAgZ29vZC50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0TWFya1VzZXIgKGlkLCB0eXBlKSB7XG4gICAgICB0aGlzLmNvbGxlY3RlZG51bSA9IDBcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE1hcmtVc2VyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLmNvbGxlY3RlZG51bSA9IGRhdGEubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIHNldE1hcmsgKGNiKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLmRldGFpbC50eXBlLFxuICAgICAgICBzb3VyY2VJZDogdGhpcy5kZXRhaWwuaWRcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2V0TWFya0h0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLm1hcmtJZCA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBDYW5jZWxNYXJrIChjYikge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogdGhpcy5tYXJrSWQgfHwgdGhpcy5kZXRhaWwuY29sbGVjdElkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoaWQpIHtcbiAgICAgIHRoaXMucGFnZUlkID0gaWQuaWRcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2RldGFpbCcpXG4gICAgICB0aGlzLmluaXREYXRhKHRoaXMucGFnZUlkKVxuICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgKyAncHgnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=