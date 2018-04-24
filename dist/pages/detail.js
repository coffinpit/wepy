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
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "xmlns:v-on": "" }, "counterBuy": { "class": "calculate", "xmlns:v-bind": "", "v-bind:num.sync": "buyNum" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum" } }, _this2.$events = { "bottom": { "v-on:buy": "buy", "v-on:cart": "cart" }, "counterBuy": { "v-on:plusEdit": "plusBuy", "v-on:minusEdit": "minusBuy", "v-on:keyEdit": "keyBuy" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart", "v-on:keyEdit": "keyCart" } }, _this2.components = {
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
        if (this.buyNum === this.buyResult.num || this.cartNum === this.cartResult.num) {
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
      totalBuy: 0,
      totalCart: 0,
      buyModal: false,
      cartModal: false
    }, _this2.methods = {
      collectTap: function collectTap() {
        this.collect = !this.collect;
        if (!this.collect) {
          this.collectTxt = '已收藏';
        } else {
          this.collectTxt = '未收藏';
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
        if (this.buyNum > this.buyResult.num) {
          this.buyNum = this.buyResult.num;
        }
        // 发送购买增加数量
      },
      minusBuy: function minusBuy() {
        this.buyNum--;
        if (this.buyNum <= 0) {
          this.buyNum = 0;
        }
        // 发送购买减少数量
      },
      keyBuy: function keyBuy(val, e) {
        this.buyNum = val;
        // 发送购买输入数量
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
          this.cartNum = 0;
        }
        // 发送购物车减少数量
      },
      keyCart: function keyCart(val, e) {
        this.cartNum = val;
      },
      addCartGoods: function addCartGoods(e) {
        // 发送选中结果
        this.cartNum = 1;
        this.cartResult = this.detail.goodList[e.detail.value];
      },
      goCart: function goCart() {
        _wepy2.default.switchTab({
          url: './cart'
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
        num: 3,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwiY29tcHV0ZWQiLCJ0b3RhbEJ1eSIsImJ1eVJlc3VsdCIsInByaWNlIiwiYnV5TnVtIiwidG90YWxDYXJ0IiwiY2FydFJlc3VsdCIsImNhcnROdW0iLCJtYXh0aXAiLCJudW0iLCJkYXRhIiwiZGV0YWlsIiwicGF0aCIsIm9sZHByaWNlIiwiZXhwcmVzcyIsInRpdGxlIiwiZ29vZExpc3QiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiY29sbGVjdGVkVXNlciIsIm5hbWUiLCJnb29kc0RldGFpbCIsInRyYW5zcG9ydERldGFpbCIsImlzTGluayIsImJ1eU1vZGFsIiwiY2FydE1vZGFsIiwibWV0aG9kcyIsImNvbGxlY3RUYXAiLCJidXkiLCJpbml0QnV5UmVzdWx0IiwiY2xvc2VCdXkiLCJjYXJ0IiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQnV5IiwiZSIsIm1pbnVzQnV5Iiwia2V5QnV5IiwidmFsIiwiYWRkQnV5R29vZHMiLCJ2YWx1ZSIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsImFkZENhcnRHb29kcyIsImdvQ2FydCIsInN3aXRjaFRhYiIsInVybCIsImlkIiwiY2hlY2tlZCIsInJlc3VsdGJ1eSIsImZpbHRlciIsIml0ZW0iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiX3RoaXMiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd0hlaWdodCIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7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QVAsQ0FBbEI7QUFDRDs7OzJCQUNPTCxFLEVBQUk7QUFDVk0sY0FBUUMsR0FBUixDQUFZUCxFQUFaO0FBQ0EsV0FBS25CLGFBQUwsQ0FBbUJtQixFQUFuQjtBQUNBLFdBQUtoQixjQUFMLENBQW9CZ0IsRUFBcEI7QUFDQSxVQUFJUSxRQUFRLElBQVo7QUFDQSxxQkFBS0MsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QkgsZ0JBQU14QyxTQUFOLEdBQWtCMkMsSUFBSUMsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS0MsTUFBTDtBQUNEOzs7O0VBcE9pQyxlQUFLQyxJOztrQkFBcEIzRSxNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImJvdHRvbVwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcImNvdW50ZXJCdXlcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJidXlOdW1cIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiYnV5XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQnV5XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0J1eVwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQnV5XCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUJ1eVwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgYm90dG9tOiBCb3R0b20sXG4gICAgICBjb3VudGVyQnV5OiBDb3VudCxcbiAgICAgIGNvdW50ZXJDYXJ0OiBDb3VudFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQnV5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnV5UmVzdWx0LnByaWNlICogdGhpcy5idXlOdW1cbiAgICAgIH0sXG4gICAgICB0b3RhbENhcnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0UmVzdWx0LnByaWNlICogdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgdmFyIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmJ1eU51bSA9PT0gdGhpcy5idXlSZXN1bHQubnVtIHx8IHRoaXMuY2FydE51bSA9PT0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIG1heHRpcCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXh0aXAgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXh0aXBcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgcHJpY2U6ICcxMDAuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTQwLjAnLFxuICAgICAgICBleHByZXNzOiAnMzguMCcsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkicsXG4gICAgICAgIGdvb2RMaXN0OiBbXVxuICAgICAgfSxcbiAgICAgIGNvbGxlY3Q6IGZhbHNlLFxuICAgICAgb3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAwLFxuICAgICAgY29sbGVjdFR4dDogJ+aUtuiXjycsXG4gICAgICBjb2xsZWN0ZWRudW06ICc0JyxcbiAgICAgIGNvbGxlY3RlZFVzZXI6IFt7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9XSxcbiAgICAgIGdvb2RzRGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9XSxcbiAgICAgIHRyYW5zcG9ydERldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfphY3pgIHojIPlm7QnLFxuICAgICAgICBkZXRhaWw6ICfotK3mu6Ey5YWs5pak5YWo5Zu95YyF6YKuJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeW/q+mAkicsXG4gICAgICAgIGRldGFpbDogJ+mhuuS4sOWGt+i/kCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHmlrnmoYgnLFxuICAgICAgICBkZXRhaWw6ICfphY3pgIHop4TliJknLFxuICAgICAgICBpc0xpbms6IHRydWVcbiAgICAgIH1dLFxuICAgICAgYnV5TnVtOiAxLFxuICAgICAgY2FydE51bTogMSxcbiAgICAgIGJ1eVJlc3VsdDogW10sXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQnV5OiAwLFxuICAgICAgdG90YWxDYXJ0OiAwLFxuICAgICAgYnV5TW9kYWw6IGZhbHNlLFxuICAgICAgY2FydE1vZGFsOiBmYWxzZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdCA9ICF0aGlzLmNvbGxlY3RcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBidXkgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICB0aGlzLmJ1eU1vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLmluaXRCdXlSZXN1bHQoKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQnV5ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgIHRoaXMuYnV5TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmJ1eU51bSA9IDFcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgICAvLyDlj5HpgIHmuIXnqbrllYblk4Hor7fmsYJcbiAgICAgIH0sXG4gICAgICBjYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgfSxcbiAgICAgIHBsdXNCdXkgKGUpIHtcbiAgICAgICAgdGhpcy5idXlOdW0gKytcbiAgICAgICAgaWYgKHRoaXMuYnV5TnVtID4gdGhpcy5idXlSZXN1bHQubnVtKSB7XG4gICAgICAgICAgdGhpcy5idXlOdW0gPSB0aGlzLmJ1eVJlc3VsdC5udW1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3kubDlop7liqDmlbDph49cbiAgICAgIH0sXG4gICAgICBtaW51c0J1eSAoKSB7XG4gICAgICAgIHRoaXMuYnV5TnVtIC0tXG4gICAgICAgIGlmICh0aGlzLmJ1eU51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5idXlOdW0gPSAwXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt5Lmw5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5QnV5ICh2YWwsIGUpIHtcbiAgICAgICAgdGhpcy5idXlOdW0gPSB2YWxcbiAgICAgICAgLy8g5Y+R6YCB6LSt5Lmw6L6T5YWl5pWw6YePXG4gICAgICB9LFxuICAgICAgYWRkQnV5R29vZHMgKGUpIHtcbiAgICAgICAgLy8g5Y+R6YCB6YCJ5Lit57uT5p6cXG4gICAgICAgIHRoaXMuYnV5TnVtID0gMVxuICAgICAgICB0aGlzLmJ1eVJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIHBsdXNDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtICsrXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWinuWKoOaVsOmHj1xuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAwXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsLCBlKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXJ0J1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2FydERhdGEgKCkge1xuICAgICAgLy8g5b6A5ZCO5Y+w5Y+R6K+35rGC5riF56m66LSt54mp6L2m6YCJ6aG5XG4gICAgfVxuICAgIGluaXRCdXlEYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuueri+WNs+i0reS5sOmAiemhuVxuICAgIH1cbiAgICBpbml0QnV5UmVzdWx0IChpZCkge1xuICAgICAgLy8g5qC55o2u5ZWG5ZOBaWTlj5HpgIHor7fmsYLov5Tlm57llYblk4Hor6bmg4XmlbDmja4g5Lul5LiL5qih5ouf5pWw5o2uXG4gICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFt7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogok1MDBnJyxcbiAgICAgICAgcHJpY2U6IDY5LFxuICAgICAgICBudW06IDBcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTEwMDBnJyxcbiAgICAgICAgcHJpY2U6IDEyMCxcbiAgICAgICAgbnVtOiAyLFxuICAgICAgICBjaGVja2VkOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokyMDAwZycsXG4gICAgICAgIHByaWNlOiAyMjAsXG4gICAgICAgIG51bTogNFxuICAgICAgfV1cbiAgICAgIGxldCByZXN1bHRidXkgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuYnV5UmVzdWx0ID0gcmVzdWx0YnV5WzBdXG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0IChpZCkge1xuICAgICAgLy8g5qC55o2u5ZWG5ZOBaWTlj5HpgIHor7fmsYLov5Tlm57llYblk4Hor6bmg4XmlbDmja4g5Lul5LiL5qih5ouf5pWw5o2uXG4gICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFt7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogok1MDBnJyxcbiAgICAgICAgcHJpY2U6IDY5LFxuICAgICAgICBudW06IDBcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTEwMDBnJyxcbiAgICAgICAgcHJpY2U6IDEyMCxcbiAgICAgICAgbnVtOiAzLFxuICAgICAgICBjaGVja2VkOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokyMDAwZycsXG4gICAgICAgIHByaWNlOiAyMjAsXG4gICAgICAgIG51bTogNVxuICAgICAgfV1cbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHJlc3VsdFswXVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgIHRoaXMuaW5pdEJ1eVJlc3VsdChpZClcbiAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoaWQpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==