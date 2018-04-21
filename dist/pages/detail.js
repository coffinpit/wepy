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
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "xmlns:v-on": "" }, "counterBuy": { "class": "calculate", "xmlns:v-bind": "", "v-bind:num.sync": "buyNum" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum" } }, _this2.$events = { "bottom": { "v-on:buy": "buy", "v-on:cart": "cart" }, "counterBuy": { "v-on:plusEdit": "plusBuy", "v-on:minusEdit": "minusBuy" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart" } }, _this2.components = {
      bottom: _bottombar2.default,
      counterBuy: _counter2.default,
      counterCart: _counter2.default
    }, _this2.computed = {
      totalBuy: function totalBuy() {
        return this.buyResult.price * this.buyNum;
      },
      totalCart: function totalCart() {
        return this.cartResult.price * this.cartNum;
      }
    }, _this2.data = {
      detail: {
        path: '../image/login-bg.jpg',
        price: '100.0',
        oldprice: '140.0',
        express: '38.0',
        title: '美国自然牛USDA PRIMA极佳级肉眼牛排',
        goodList: [{
          name: '自然牛肉500g',
          price: 69,
          num: 0
        }, {
          name: '自然牛肉1000g',
          price: 120,
          num: 98,
          checked: true
        }, {
          name: '自然牛肉2000g',
          price: 220,
          num: 98
        }] },
      collect: false,
      overflow: false,
      winHeight: 0,
      collectTxt: '收藏',
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
      buyResult: [],
      cartResult: [],
      buyModal: false,
      cartModal: false
    }, _this2.methods = {
      collectTap: function collectTap() {
        if (!this.collect) {
          this.collect = true;
          this.collectTxt = '已收藏';
        }
      },
      buy: function buy() {
        this.overflow = true;
        this.buyModal = true;
      },
      closeBuy: function closeBuy() {
        this.overflow = false;
        this.buyModal = false;
        this.initBuyResult();
        this.buyNum = 1;
        // 发送清空商品请求
      },
      cart: function cart() {
        this.overflow = true;
        this.cartModal = true;
      },
      closeCart: function closeCart() {
        this.overflow = false;
        this.cartModal = false;
      },
      plusBuy: function plusBuy() {
        console.log(this.buyNum);
        this.buyNum++;
        // 发送数量
      },
      minusBuy: function minusBuy() {
        this.buyNum--;
        if (this.buyNum <= 0) {
          this.buyNum = 0;
        }
        // 发送数量
      },
      addBuyGoods: function addBuyGoods(e) {
        // 发送选中结果
        this.buyResult = this.detail.goodList[e.detail.value];
        console.log(this.buyResult);
      },
      plusCart: function plusCart() {
        this.cartNum++;
      },
      minusCart: function minusCart() {
        this.cartNum--;
        if (this.cartNum <= 0) {
          this.cartNum = 0;
        }
      },
      addCartGoods: function addCartGoods(e) {
        // 发送选中结果
        this.cartResult = this.detail.goodList[e.detail.value];
        console.log(this.cartResult);
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
      // 根据商品id发送请求返回商品详情数据
      var result = this.detail.goodList.filter(function (item) {
        return item.checked;
      });
      this.buyResult = result[0];
    }
  }, {
    key: 'initCartResult',
    value: function initCartResult(id) {
      // 根据商品id发送请求返回商品详情数据
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwiY29tcHV0ZWQiLCJ0b3RhbEJ1eSIsImJ1eVJlc3VsdCIsInByaWNlIiwiYnV5TnVtIiwidG90YWxDYXJ0IiwiY2FydFJlc3VsdCIsImNhcnROdW0iLCJkYXRhIiwiZGV0YWlsIiwicGF0aCIsIm9sZHByaWNlIiwiZXhwcmVzcyIsInRpdGxlIiwiZ29vZExpc3QiLCJuYW1lIiwibnVtIiwiY2hlY2tlZCIsImNvbGxlY3QiLCJvdmVyZmxvdyIsIndpbkhlaWdodCIsImNvbGxlY3RUeHQiLCJjb2xsZWN0ZWRudW0iLCJjb2xsZWN0ZWRVc2VyIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJidXlNb2RhbCIsImNhcnRNb2RhbCIsIm1ldGhvZHMiLCJjb2xsZWN0VGFwIiwiYnV5IiwiY2xvc2VCdXkiLCJpbml0QnV5UmVzdWx0IiwiY2FydCIsImNsb3NlQ2FydCIsInBsdXNCdXkiLCJjb25zb2xlIiwibG9nIiwibWludXNCdXkiLCJhZGRCdXlHb29kcyIsImUiLCJ2YWx1ZSIsInBsdXNDYXJ0IiwibWludXNDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiaWQiLCJyZXN1bHQiLCJmaWx0ZXIiLCJpdGVtIiwiaW5pdENhcnRSZXN1bHQiLCJfdGhpcyIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwid2luZG93SGVpZ2h0IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxF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d2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImJvdHRvbVwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcImNvdW50ZXJCdXlcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJidXlOdW1cIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiYnV5XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQnV5XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0J1eVwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQnV5XCJ9LFwiY291bnRlckNhcnRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ2FydFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQ2FydFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgYm90dG9tOiBCb3R0b20sXG4gICAgICBjb3VudGVyQnV5OiBDb3VudCxcbiAgICAgIGNvdW50ZXJDYXJ0OiBDb3VudFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQnV5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnV5UmVzdWx0LnByaWNlICogdGhpcy5idXlOdW1cbiAgICAgIH0sXG4gICAgICB0b3RhbENhcnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0UmVzdWx0LnByaWNlICogdGhpcy5jYXJ0TnVtXG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHByaWNlOiAnMTAwLjAnLFxuICAgICAgICBvbGRwcmljZTogJzE0MC4wJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInLFxuICAgICAgICBnb29kTGlzdDogW3tcbiAgICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJNTAwZycsXG4gICAgICAgICAgcHJpY2U6IDY5LFxuICAgICAgICAgIG51bTogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTEwMDBnJyxcbiAgICAgICAgICBwcmljZTogMTIwLFxuICAgICAgICAgIG51bTogOTgsXG4gICAgICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTIwMDBnJyxcbiAgICAgICAgICBwcmljZTogMjIwLFxuICAgICAgICAgIG51bTogOThcbiAgICAgICAgfV19LFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogJzQnLFxuICAgICAgY29sbGVjdGVkVXNlcjogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH1dLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBidXlOdW06IDEsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYnV5UmVzdWx0OiBbXSxcbiAgICAgIGNhcnRSZXN1bHQ6IFtdLFxuICAgICAgYnV5TW9kYWw6IGZhbHNlLFxuICAgICAgY2FydE1vZGFsOiBmYWxzZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBidXkgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICB0aGlzLmJ1eU1vZGFsID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGNsb3NlQnV5ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgIHRoaXMuYnV5TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmluaXRCdXlSZXN1bHQoKVxuICAgICAgICB0aGlzLmJ1eU51bSA9IDFcbiAgICAgICAgLy8g5Y+R6YCB5riF56m65ZWG5ZOB6K+35rGCXG4gICAgICB9LFxuICAgICAgY2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgcGx1c0J1eSAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYnV5TnVtKVxuICAgICAgICB0aGlzLmJ1eU51bSArK1xuICAgICAgICAvLyDlj5HpgIHmlbDph49cbiAgICAgIH0sXG4gICAgICBtaW51c0J1eSAoKSB7XG4gICAgICAgIHRoaXMuYnV5TnVtIC0tXG4gICAgICAgIGlmICh0aGlzLmJ1eU51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5idXlOdW0gPSAwXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB5pWw6YePXG4gICAgICB9LFxuICAgICAgYWRkQnV5R29vZHMgKGUpIHtcbiAgICAgICAgLy8g5Y+R6YCB6YCJ5Lit57uT5p6cXG4gICAgICAgIHRoaXMuYnV5UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYnV5UmVzdWx0KVxuICAgICAgfSxcbiAgICAgIHBsdXNDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtICsrXG4gICAgICB9LFxuICAgICAgbWludXNDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtIC0tXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2FydFJlc3VsdClcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0QnV5RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrnq4vljbPotK3kubDpgInpoblcbiAgICB9XG4gICAgaW5pdEJ1eVJlc3VsdCAoaWQpIHtcbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmJ1eVJlc3VsdCA9IHJlc3VsdFswXVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoaWQpIHtcbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHRbMF1cbiAgICB9XG4gICAgb25Mb2FkIChpZCkge1xuICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICB0aGlzLmluaXRCdXlSZXN1bHQoaWQpXG4gICAgICB0aGlzLmluaXRDYXJ0UmVzdWx0KGlkKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgKyAncHgnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=