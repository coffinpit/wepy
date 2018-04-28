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
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:cartVal.sync": "addCartCount" }, "counterBuy": { "class": "calculate", "v-bind:num.sync": "buyNum" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum" } }, _this2.$events = { "bottom": { "v-on:buy": "buy", "v-on:cart": "cart" }, "counterBuy": { "v-on:plusEdit": "plusBuy", "v-on:minusEdit": "minusBuy", "v-on:keyEdit": "keyBuy", "v-on:blurEdit": "blurBuy" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart", "v-on:keyEdit": "keyCart", "v-on:blurEdit": "blurCart" } }, _this2.components = {
      bottom: _bottombar2.default,
      counterBuy: _counter2.default,
      counterCart: _counter2.default,
      menuList: _menu2.default
    }, _this2.computed = {
      totalBuy: function totalBuy() {
        return this.buyResult.price * this.buyNum;
      },
      totalCart: function totalCart() {
        return this.cartResult.price * this.cartNum;
      },
      maxtip: function maxtip() {
        var maxtip = false;
        if (this.buyNum >= this.buyResult.num || this.cartNum >= this.cartResult.num) {
          maxtip = true;
        } else {
          maxtip = false;
        }
        return maxtip;
      }
    }, _this2.data = {
      detail: {
        path: '../image/login-bg.jpg',
        price: '100.0',
        oldprice: '140.0',
        express: '38.0',
        title: '美国自然牛USDA PRIMA极佳级肉眼牛排',
        goodList: []
      },
      collect: false,
      overflow: false,
      winHeight: 0,
      collectTxt: '未收藏',
      collectednum: '4',
      collectedUser: [{
        path: '../image/login-bg.jpg',
        name: 'xxx'
      }, {
        path: '../image/login-bg.jpg',
        name: 'xxx'
      }, {
        path: '../image/login-bg.jpg',
        name: 'xxx'
      }],
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
      buyNum: 1,
      cartNum: 1,
      addCartCount: 0,
      buyResult: [],
      cartResult: [],
      totalBuy: 0,
      totalCart: 0,
      buyModal: false,
      cartModal: false,
      collectImage: '../image/icon-cart-blank.png'
    }, _this2.methods = {
      collectTap: function collectTap() {
        this.collect = !this.collect;
        if (!this.collect) {
          this.collectTxt = '未收藏';
        } else {
          this.collectTxt = '已收藏';
        }
      },
      buy: function buy() {
        this.overflow = true;
        this.buyModal = true;
        this.initBuyResult();
      },
      closeBuy: function closeBuy() {
        this.overflow = false;
        this.buyModal = false;
        this.buyNum = 1;
        this.detail.goodList = [];
        // 发送清空商品请求
      },
      cart: function cart() {
        this.overflow = true;
        this.cartModal = true;
        this.initCartResult();
      },
      closeCart: function closeCart() {
        this.overflow = false;
        this.cartModal = false;
        this.cartNum = 1;
        this.detail.goodList = [];
      },
      plusBuy: function plusBuy(e) {
        this.buyNum++;
        if (this.buyNum >= this.buyResult.num) {
          this.buyNum = this.buyResult.num;
        }
        // 发送购买增加数量
      },
      minusBuy: function minusBuy() {
        this.buyNum--;
        if (this.buyNum <= 0) {
          this.buyNum = 1;
        }
        // 发送购买减少数量
      },
      keyBuy: function keyBuy(val, e) {
        this.buyNum = val;
        if (val === '0') {
          this.buyNum = 1;
        } else {
          this.buyNum = val;
        }
        if (this.buyNum >= this.buyResult.num) {
          this.buyNum = parseInt(this.buyResult.num);
        }
        return this.buyNum;
        // 发送购买输入数量
      },
      blurBuy: function blurBuy(val) {
        if (val === '') {
          this.buyNum = 1;
        }
      },
      addBuyGoods: function addBuyGoods(e) {
        // 发送选中结果
        this.buyNum = 1;
        this.buyResult = this.detail.goodList[e.detail.value];
      },
      plusCart: function plusCart() {
        this.cartNum++;
        if (this.cartNum > this.cartResult.num) {
          this.cartNum = this.cartResult.num;
        }
        // 发送购物车增加数量
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
        if (val === '0') {
          this.cartNum = 1;
        } else {
          this.cartNum = val;
        }
        return this.cartNum;
      },
      blurCart: function blurCart(val) {
        if (val === '') {
          this.cartNum = 1;
        }
      },
      addCartGoods: function addCartGoods(e) {
        // 发送选中结果
        this.cartNum = 1;
        this.cartResult = this.detail.goodList[e.detail.value];
      },
      goCart: function goCart() {
        if (this.cartNum <= this.cartResult.num) {
          this.addCartCount += this.cartNum;
          this.methods.closeCart.apply(this);
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Detail, [{
    key: 'initCartData',
    value: function initCartData() {
      // 往后台发请求清空购物车选项
    }
  }, {
    key: 'initBuyData',
    value: function initBuyData() {
      // 往后台发请求清空立即购买选项
    }
  }, {
    key: 'initBuyResult',
    value: function initBuyResult(id) {
      // 根据商品id发送请求返回商品详情数据 以下模拟数据
      this.detail.goodList = [{
        name: '自然牛肉500g',
        price: 69,
        num: 0
      }, {
        name: '自然牛肉1000g',
        price: 120,
        num: 2,
        checked: true
      }, {
        name: '自然牛肉2000g',
        price: 220,
        num: 4
      }];
      var resultbuy = this.detail.goodList.filter(function (item) {
        return item.checked;
      });
      this.buyResult = resultbuy[0];
    }
  }, {
    key: 'initCartResult',
    value: function initCartResult(id) {
      // 根据商品id发送请求返回商品详情数据 以下模拟数据
      this.detail.goodList = [{
        name: '自然牛肉500g',
        price: 69,
        num: 0
      }, {
        name: '自然牛肉1000g',
        price: 120,
        num: 120,
        checked: true
      }, {
        name: '自然牛肉2000g',
        price: 220,
        num: 5
      }];
      var result = this.detail.goodList.filter(function (item) {
        return item.checked;
      });
      this.cartResult = result[0];
    }
  }, {
    key: 'onLoad',
    value: function onLoad(id) {
      console.log(id);
      this.initBuyResult(id);
      this.initCartResult(id);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQnV5IiwiYnV5UmVzdWx0IiwicHJpY2UiLCJidXlOdW0iLCJ0b3RhbENhcnQiLCJjYXJ0UmVzdWx0IiwiY2FydE51bSIsIm1heHRpcCIsIm51bSIsImRhdGEiLCJkZXRhaWwiLCJwYXRoIiwib2xkcHJpY2UiLCJleHByZXNzIiwidGl0bGUiLCJnb29kTGlzdCIsImNvbGxlY3QiLCJvdmVyZmxvdyIsIndpbkhlaWdodCIsImNvbGxlY3RUeHQiLCJjb2xsZWN0ZWRudW0iLCJjb2xsZWN0ZWRVc2VyIiwibmFtZSIsImdvb2RzRGV0YWlsIiwidHJhbnNwb3J0RGV0YWlsIiwiaXNMaW5rIiwiYWRkQ2FydENvdW50IiwiYnV5TW9kYWwiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsImJ1eSIsImluaXRCdXlSZXN1bHQiLCJjbG9zZUJ1eSIsImNhcnQiLCJpbml0Q2FydFJlc3VsdCIsImNsb3NlQ2FydCIsInBsdXNCdXkiLCJlIiwibWludXNCdXkiLCJrZXlCdXkiLCJ2YWwiLCJwYXJzZUludCIsImJsdXJCdXkiLCJhZGRCdXlHb29kcyIsInZhbHVlIiwicGx1c0NhcnQiLCJtaW51c0NhcnQiLCJrZXlDYXJ0IiwiYmx1ckNhcnQiLCJhZGRDYXJ0R29vZHMiLCJnb0NhcnQiLCJhcHBseSIsImlkIiwiY2hlY2tlZCIsInJlc3VsdGJ1eSIsImZpbHRlciIsIml0ZW0iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiX3RoaXMiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd0hlaWdodCIsIiRhcHBs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LENBQVlQLEVBQVo7QUFDQSxXQUFLckIsYUFBTCxDQUFtQnFCLEVBQW5CO0FBQ0EsV0FBS2xCLGNBQUwsQ0FBb0JrQixFQUFwQjtBQUNBLFVBQUlRLFFBQVEsSUFBWjtBQUNBLHFCQUFLQyxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxnQkFBTTVDLFNBQU4sR0FBa0IrQyxJQUFJQyxZQUFKLEdBQW1CLElBQXJDO0FBQ0Q7QUFIZ0IsT0FBbkI7QUFLQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUFqUWlDLGVBQUtDLEk7O2tCQUFwQmhGLE0iLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBCb3R0b20gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b21iYXInXG4gIGltcG9ydCBDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJib3R0b21cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y2FydFZhbC5zeW5jXCI6XCJhZGRDYXJ0Q291bnRcIn0sXCJjb3VudGVyQnV5XCI6e1wiY2xhc3NcIjpcImNhbGN1bGF0ZVwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJidXlOdW1cIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiYnV5XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQnV5XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0J1eVwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQnV5XCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUJ1eVwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckJ1eVwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQnV5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnV5UmVzdWx0LnByaWNlICogdGhpcy5idXlOdW1cbiAgICAgIH0sXG4gICAgICB0b3RhbENhcnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0UmVzdWx0LnByaWNlICogdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgdmFyIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmJ1eU51bSA+PSB0aGlzLmJ1eVJlc3VsdC5udW0gfHwgdGhpcy5jYXJ0TnVtID49IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICBtYXh0aXAgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWF4dGlwID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4dGlwXG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHByaWNlOiAnMTAwLjAnLFxuICAgICAgICBvbGRwcmljZTogJzE0MC4wJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInLFxuICAgICAgICBnb29kTGlzdDogW11cbiAgICAgIH0sXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnNCcsXG4gICAgICBjb2xsZWN0ZWRVc2VyOiBbe1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfV0sXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGJ1eU51bTogMSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBidXlSZXN1bHQ6IFtdLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbEJ1eTogMCxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGJ1eU1vZGFsOiBmYWxzZSxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdCA9ICF0aGlzLmNvbGxlY3RcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBidXkgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICB0aGlzLmJ1eU1vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLmluaXRCdXlSZXN1bHQoKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQnV5ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgIHRoaXMuYnV5TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmJ1eU51bSA9IDFcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgICAvLyDlj5HpgIHmuIXnqbrllYblk4Hor7fmsYJcbiAgICAgIH0sXG4gICAgICBjYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgfSxcbiAgICAgIHBsdXNCdXkgKGUpIHtcbiAgICAgICAgdGhpcy5idXlOdW0gKytcbiAgICAgICAgaWYgKHRoaXMuYnV5TnVtID49IHRoaXMuYnV5UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuYnV5TnVtID0gdGhpcy5idXlSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt5Lmw5aKe5Yqg5pWw6YePXG4gICAgICB9LFxuICAgICAgbWludXNCdXkgKCkge1xuICAgICAgICB0aGlzLmJ1eU51bSAtLVxuICAgICAgICBpZiAodGhpcy5idXlOdW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuYnV5TnVtID0gMVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reS5sOWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUJ1eSAodmFsLCBlKSB7XG4gICAgICAgIHRoaXMuYnV5TnVtID0gdmFsXG4gICAgICAgIGlmICh2YWwgPT09ICcwJykge1xuICAgICAgICAgIHRoaXMuYnV5TnVtID0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYnV5TnVtID0gdmFsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYnV5TnVtID49IHRoaXMuYnV5UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuYnV5TnVtID0gcGFyc2VJbnQodGhpcy5idXlSZXN1bHQubnVtKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJ1eU51bVxuICAgICAgICAvLyDlj5HpgIHotK3kubDovpPlhaXmlbDph49cbiAgICAgIH0sXG4gICAgICBibHVyQnV5ICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLmJ1eU51bSA9IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFkZEJ1eUdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmJ1eU51bSA9IDFcbiAgICAgICAgdGhpcy5idXlSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBwbHVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablop7liqDmlbDph49cbiAgICAgIH0sXG4gICAgICBtaW51c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gLS1cbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUNhcnQgKHZhbCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgaWYgKHZhbCA9PT0gJzAnKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBibHVyQ2FydCAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuYWRkQ2FydENvdW50ICs9IHRoaXMuY2FydE51bVxuICAgICAgICAgIHRoaXMubWV0aG9kcy5jbG9zZUNhcnQuYXBwbHkodGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2FydERhdGEgKCkge1xuICAgICAgLy8g5b6A5ZCO5Y+w5Y+R6K+35rGC5riF56m66LSt54mp6L2m6YCJ6aG5XG4gICAgfVxuICAgIGluaXRCdXlEYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuueri+WNs+i0reS5sOmAiemhuVxuICAgIH1cbiAgICBpbml0QnV5UmVzdWx0IChpZCkge1xuICAgICAgLy8g5qC55o2u5ZWG5ZOBaWTlj5HpgIHor7fmsYLov5Tlm57llYblk4Hor6bmg4XmlbDmja4g5Lul5LiL5qih5ouf5pWw5o2uXG4gICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFt7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogok1MDBnJyxcbiAgICAgICAgcHJpY2U6IDY5LFxuICAgICAgICBudW06IDBcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTEwMDBnJyxcbiAgICAgICAgcHJpY2U6IDEyMCxcbiAgICAgICAgbnVtOiAyLFxuICAgICAgICBjaGVja2VkOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokyMDAwZycsXG4gICAgICAgIHByaWNlOiAyMjAsXG4gICAgICAgIG51bTogNFxuICAgICAgfV1cbiAgICAgIGxldCByZXN1bHRidXkgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuYnV5UmVzdWx0ID0gcmVzdWx0YnV5WzBdXG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0IChpZCkge1xuICAgICAgLy8g5qC55o2u5ZWG5ZOBaWTlj5HpgIHor7fmsYLov5Tlm57llYblk4Hor6bmg4XmlbDmja4g5Lul5LiL5qih5ouf5pWw5o2uXG4gICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFt7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogok1MDBnJyxcbiAgICAgICAgcHJpY2U6IDY5LFxuICAgICAgICBudW06IDBcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTEwMDBnJyxcbiAgICAgICAgcHJpY2U6IDEyMCxcbiAgICAgICAgbnVtOiAxMjAsXG4gICAgICAgIGNoZWNrZWQ6IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTIwMDBnJyxcbiAgICAgICAgcHJpY2U6IDIyMCxcbiAgICAgICAgbnVtOiA1XG4gICAgICB9XVxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0WzBdXG4gICAgfVxuICAgIG9uTG9hZCAoaWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgdGhpcy5pbml0QnV5UmVzdWx0KGlkKVxuICAgICAgdGhpcy5pbml0Q2FydFJlc3VsdChpZClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19