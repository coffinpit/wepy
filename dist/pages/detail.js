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
      counterCart: _counter2.default
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwiY29tcHV0ZWQiLCJ0b3RhbEJ1eSIsImJ1eVJlc3VsdCIsInByaWNlIiwiYnV5TnVtIiwidG90YWxDYXJ0IiwiY2FydFJlc3VsdCIsImNhcnROdW0iLCJtYXh0aXAiLCJudW0iLCJkYXRhIiwiZGV0YWlsIiwicGF0aCIsIm9sZHByaWNlIiwiZXhwcmVzcyIsInRpdGxlIiwiZ29vZExpc3QiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiY29sbGVjdGVkVXNlciIsIm5hbWUiLCJnb29kc0RldGFpbCIsInRyYW5zcG9ydERldGFpbCIsImlzTGluayIsImFkZENhcnRDb3VudCIsImJ1eU1vZGFsIiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWV0aG9kcyIsImNvbGxlY3RUYXAiLCJidXkiLCJpbml0QnV5UmVzdWx0IiwiY2xvc2VCdXkiLCJjYXJ0IiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQnV5IiwiZSIsIm1pbnVzQnV5Iiwia2V5QnV5IiwidmFsIiwicGFyc2VJbnQiLCJibHVyQnV5IiwiYWRkQnV5R29vZHMiLCJ2YWx1ZSIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZ29DYXJ0IiwiYXBwbHkiLCJpZCIsImNoZWNrZWQiLCJyZXN1bHRidXkiLCJmaWx0ZXIiLCJpdGVtIiwicmVzdWx0IiwiY29uc29sZSIsImxvZyIsIl90aGlzIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5kb3dIZWlnaHQiLCIkYXBwbHkiLCJwYWdlIl0s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QW1CcUIsRUFBbkI7QUFDQSxXQUFLbEIsY0FBTCxDQUFvQmtCLEVBQXBCO0FBQ0EsVUFBSVEsUUFBUSxJQUFaO0FBQ0EscUJBQUtDLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJILGdCQUFNNUMsU0FBTixHQUFrQitDLElBQUlDLFlBQUosR0FBbUIsSUFBckM7QUFDRDtBQUhnQixPQUFuQjtBQUtBLFdBQUtDLE1BQUw7QUFDRDs7OztFQWhRaUMsZUFBS0MsSTs7a0JBQXBCL0UsTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEJvdHRvbSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbWJhcidcbiAgaW1wb3J0IENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJib3R0b21cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y2FydFZhbC5zeW5jXCI6XCJhZGRDYXJ0Q291bnRcIn0sXCJjb3VudGVyQnV5XCI6e1wiY2xhc3NcIjpcImNhbGN1bGF0ZVwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJidXlOdW1cIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiYnV5XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQnV5XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0J1eVwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQnV5XCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUJ1eVwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckJ1eVwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnRcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB0b3RhbEJ1eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1eVJlc3VsdC5wcmljZSAqIHRoaXMuYnV5TnVtXG4gICAgICB9LFxuICAgICAgdG90YWxDYXJ0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydFJlc3VsdC5wcmljZSAqIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIG1heHRpcCAoKSB7XG4gICAgICAgIHZhciBtYXh0aXAgPSBmYWxzZVxuICAgICAgICBpZiAodGhpcy5idXlOdW0gPj0gdGhpcy5idXlSZXN1bHQubnVtIHx8IHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgbWF4dGlwID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heHRpcFxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBwcmljZTogJzEwMC4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNDAuMCcsXG4gICAgICAgIGV4cHJlc3M6ICczOC4wJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJyxcbiAgICAgICAgZ29vZExpc3Q6IFtdXG4gICAgICB9LFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pyq5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogJzQnLFxuICAgICAgY29sbGVjdGVkVXNlcjogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH1dLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBidXlOdW06IDEsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYWRkQ2FydENvdW50OiAwLFxuICAgICAgYnV5UmVzdWx0OiBbXSxcbiAgICAgIGNhcnRSZXN1bHQ6IFtdLFxuICAgICAgdG90YWxCdXk6IDAsXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBidXlNb2RhbDogZmFsc2UsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICB0aGlzLmNvbGxlY3QgPSAhdGhpcy5jb2xsZWN0XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYnV5ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5idXlNb2RhbCA9IHRydWVcbiAgICAgICAgdGhpcy5pbml0QnV5UmVzdWx0KClcbiAgICAgIH0sXG4gICAgICBjbG9zZUJ1eSAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmJ1eU1vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy5idXlOdW0gPSAxXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgLy8g5Y+R6YCB5riF56m65ZWG5ZOB6K+35rGCXG4gICAgICB9LFxuICAgICAgY2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLmluaXRDYXJ0UmVzdWx0KClcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgIH0sXG4gICAgICBwbHVzQnV5IChlKSB7XG4gICAgICAgIHRoaXMuYnV5TnVtICsrXG4gICAgICAgIGlmICh0aGlzLmJ1eU51bSA+PSB0aGlzLmJ1eVJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmJ1eU51bSA9IHRoaXMuYnV5UmVzdWx0Lm51bVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reS5sOWinuWKoOaVsOmHj1xuICAgICAgfSxcbiAgICAgIG1pbnVzQnV5ICgpIHtcbiAgICAgICAgdGhpcy5idXlOdW0gLS1cbiAgICAgICAgaWYgKHRoaXMuYnV5TnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmJ1eU51bSA9IDFcbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3kubDlh4/lsJHmlbDph49cbiAgICAgIH0sXG4gICAgICBrZXlCdXkgKHZhbCwgZSkge1xuICAgICAgICB0aGlzLmJ1eU51bSA9IHZhbFxuICAgICAgICBpZiAodmFsID09PSAnMCcpIHtcbiAgICAgICAgICB0aGlzLmJ1eU51bSA9IDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmJ1eU51bSA9IHZhbFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJ1eU51bSA+PSB0aGlzLmJ1eVJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmJ1eU51bSA9IHBhcnNlSW50KHRoaXMuYnV5UmVzdWx0Lm51bSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5idXlOdW1cbiAgICAgICAgLy8g5Y+R6YCB6LSt5Lmw6L6T5YWl5pWw6YePXG4gICAgICB9LFxuICAgICAgYmx1ckJ1eSAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5idXlOdW0gPSAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhZGRCdXlHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5idXlOdW0gPSAxXG4gICAgICAgIHRoaXMuYnV5UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5aKe5Yqg5pWw6YePXG4gICAgICB9LFxuICAgICAgbWludXNDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtIC0tXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablh4/lsJHmlbDph49cbiAgICAgIH0sXG4gICAgICBrZXlDYXJ0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIGlmICh2YWwgPT09ICcwJykge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYmx1ckNhcnQgKHZhbCkge1xuICAgICAgICBpZiAodmFsID09PSAnJykge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmFkZENhcnRDb3VudCArPSB0aGlzLmNhcnROdW1cbiAgICAgICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0QnV5RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrnq4vljbPotK3kubDpgInpoblcbiAgICB9XG4gICAgaW5pdEJ1eVJlc3VsdCAoaWQpIHtcbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uIOS7peS4i+aooeaLn+aVsOaNrlxuICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbe1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJNTAwZycsXG4gICAgICAgIHByaWNlOiA2OSxcbiAgICAgICAgbnVtOiAwXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokxMDAwZycsXG4gICAgICAgIHByaWNlOiAxMjAsXG4gICAgICAgIG51bTogMixcbiAgICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJMjAwMGcnLFxuICAgICAgICBwcmljZTogMjIwLFxuICAgICAgICBudW06IDRcbiAgICAgIH1dXG4gICAgICBsZXQgcmVzdWx0YnV5ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmJ1eVJlc3VsdCA9IHJlc3VsdGJ1eVswXVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoaWQpIHtcbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uIOS7peS4i+aooeaLn+aVsOaNrlxuICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbe1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJNTAwZycsXG4gICAgICAgIHByaWNlOiA2OSxcbiAgICAgICAgbnVtOiAwXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokxMDAwZycsXG4gICAgICAgIHByaWNlOiAxMjAsXG4gICAgICAgIG51bTogMTIwLFxuICAgICAgICBjaGVja2VkOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokyMDAwZycsXG4gICAgICAgIHByaWNlOiAyMjAsXG4gICAgICAgIG51bTogNVxuICAgICAgfV1cbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHJlc3VsdFswXVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgIHRoaXMuaW5pdEJ1eVJlc3VsdChpZClcbiAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoaWQpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==