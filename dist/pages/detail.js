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
        if (!this.collect) {
          this.collect = true;
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
      plusBuy: function plusBuy() {
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
        num: 98,
        checked: true
      }, {
        name: '自然牛肉2000g',
        price: 220,
        num: 98
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
        num: 98,
        checked: true
      }, {
        name: '自然牛肉2000g',
        price: 220,
        num: 98
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwiY29tcHV0ZWQiLCJ0b3RhbEJ1eSIsImJ1eVJlc3VsdCIsInByaWNlIiwiYnV5TnVtIiwidG90YWxDYXJ0IiwiY2FydFJlc3VsdCIsImNhcnROdW0iLCJkYXRhIiwiZGV0YWlsIiwicGF0aCIsIm9sZHByaWNlIiwiZXhwcmVzcyIsInRpdGxlIiwiZ29vZExpc3QiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiY29sbGVjdGVkVXNlciIsIm5hbWUiLCJnb29kc0RldGFpbCIsInRyYW5zcG9ydERldGFpbCIsImlzTGluayIsImJ1eU1vZGFsIiwiY2FydE1vZGFsIiwibWV0aG9kcyIsImNvbGxlY3RUYXAiLCJidXkiLCJpbml0QnV5UmVzdWx0IiwiY2xvc2VCdXkiLCJjYXJ0IiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQnV5IiwibWludXNCdXkiLCJhZGRCdXlHb29kcyIsImUiLCJ2YWx1ZSIsInBsdXNDYXJ0IiwibWludXNDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZ29DYXJ0Iiwic3dpdGNoVGFiIiwidXJsIiwiaWQiLCJudW0iLCJjaGVja2VkIiwicmVzdWx0YnV5IiwiZmlsdGVyIiwiaXRlbSIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJfdGhpcyIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwid2luZG93SGVpZ2h0IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBVixFQUE0QixjQUFhLEVBQUMsU0FBUSxXQUFULEVBQXFCLGdCQUFlLEVBQXBDLEVBQXVDLG1CQUFrQixRQUF6RCxFQUF6QyxFQUE0RyxlQUFjLEVBQUMsU0FBUSxXQUFULEVBQXFCLG1CQUFrQixTQUF2QyxFQUExSCxFLFNBQ1RDLE8sR0FBVSxFQUFDLFVBQVMsRUFBQyxZQUFXLEtBQVosRUFBa0IsYUFBWSxNQUE5QixFQUFWLEVBQWdELGNBQWEsRUFBQyxpQkFBZ0IsU0FBakIsRUFBMkIsa0JBQWlCLFVBQTVDLEVBQTdELEVBQXFILGVBQWMsRUFBQyxpQkFBZ0IsVUFBakIsRUFBNEIsa0JBQWlCLFdBQTdDLEVBQW5JLEUsU0FDVEMsVSxHQUFhO0FBQ1JDLGlDQURRO0FBRVJDLG1DQUZRO0FBR1JDO0FBSFEsSyxTQUtWQyxRLEdBQVc7QUFDVEMsY0FEUyxzQkFDRztBQUNWLGVBQU8sS0FBS0MsU0FBTCxDQUFlQyxLQUFmLEdBQXVCLEtBQUtDLE1BQW5DO0FBQ0QsT0FIUTtBQUlUQyxlQUpTLHVCQUlJO0FBQ1gsZUFBTyxLQUFLQyxVQUFMLENBQWdCSCxLQUFoQixHQUF3QixLQUFLSSxPQUFwQztBQUNEO0FBTlEsSyxTQVFYQyxJLEdBQU87QUFDTEMsY0FBUTtBQUNOQyxjQUFNLHVCQURBO0FBRU5QLGVBQU8sT0FGRDtBQUdOUSxrQkFBVSxPQUhKO0FBSU5DLGlCQUFTLE1BSkg7QUFLTkMsZUFBTyx3QkFMRDtBQU1OQyxrQkFBVTtBQU5KLE9BREg7QUFTTEMsZUFBUyxLQVRKO0FBVUxDLGdCQUFVLEtBVkw7QUFXTEMsaUJBQVcsQ0FYTjtBQVlMQyxrQkFBWSxJQVpQO0FBYUxDLG9CQUFjLEdBYlQ7QUFjTEMscUJBQWUsQ0FBQztBQUNkVixjQUFNLHVCQURRO0FBRWRXLGNBQU07QUFGUSxPQUFELEVBR1o7QUFDRFgsY0FBTSx1QkFETDtBQUVEVyxjQUFNO0FBRkwsT0FIWSxFQU1aO0FBQ0RYLGNBQU0sdUJBREw7QUFFRFcsY0FBTTtBQUZMLE9BTlksQ0FkVjtBQXdCTEMsbUJBQWEsQ0FBQztBQUNaVCxlQUFPLE1BREs7QUFFWkosZ0JBQVE7QUFGSSxPQUFELEVBR1Y7QUFDREksZUFBTyxNQUROO0FBRURKLGdCQUFRO0FBRlAsT0FIVSxFQU1WO0FBQ0RJLGVBQU8sTUFETjtBQUVESixnQkFBUTtBQUZQLE9BTlUsRUFTVjtBQUNESSxlQUFPLE1BRE47QUFFREosZ0JBQVE7QUFGUCxPQVRVLENBeEJSO0FBcUNMYyx1QkFBaUIsQ0FBQztBQUNoQlYsZUFBTyxNQURTO0FBRWhCSixnQkFBUTtBQUZRLE9BQUQsRUFHZDtBQUNESSxlQUFPLE1BRE47QUFFREosZ0JBQVE7QUFGUCxPQUhjLEVBTWQ7QUFDREksZUFBTyxNQUROO0FBRURKLGdCQUFRLE1BRlA7QUFHRGUsZ0JBQVE7QUFIUCxPQU5jLENBckNaO0FBZ0RMcEIsY0FBUSxDQWhESDtBQWlETEcsZUFBUyxDQWpESjtBQWtETEwsaUJBQVcsRUFsRE47QUFtRExJLGtCQUFZLEVBbkRQO0FBb0RMTCxnQkFBVSxDQXBETDtBQXFETEksaUJBQVcsQ0FyRE47QUFzRExvQixnQkFBVSxLQXRETDtBQXVETEMsaUJBQVc7QUF2RE4sSyxTQXlEUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHdCQUNNO0FBQ1osWUFBSSxDQUFDLEtBQUtiLE9BQVYsRUFBbUI7QUFDakIsZUFBS0EsT0FBTCxHQUFlLElBQWY7QUFDQSxlQUFLRyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0Q7QUFDRixPQU5PO0FBT1JXLFNBUFEsaUJBT0Q7QUFDTCxhQUFLYixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS1MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtLLGFBQUw7QUFDRCxPQVhPO0FBWVJDLGNBWlEsc0JBWUk7QUFDVixhQUFLZixRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsYUFBS1MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUtyQixNQUFMLEdBQWMsQ0FBZDtBQUNBLGFBQUtLLE1BQUwsQ0FBWUssUUFBWixHQUF1QixFQUF2QjtBQUNBO0FBQ0QsT0FsQk87QUFtQlJrQixVQW5CUSxrQkFtQkE7QUFDTixhQUFLaEIsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtVLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxhQUFLTyxjQUFMO0FBQ0QsT0F2Qk87QUF3QlJDLGVBeEJRLHVCQXdCSztBQUNYLGFBQUtsQixRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsYUFBS1UsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGFBQUtuQixPQUFMLEdBQWUsQ0FBZjtBQUNBLGFBQUtFLE1BQUwsQ0FBWUssUUFBWixHQUF1QixFQUF2QjtBQUNELE9BN0JPO0FBOEJScUIsYUE5QlEscUJBOEJHO0FBQ1QsYUFBSy9CLE1BQUw7QUFDQTtBQUNELE9BakNPO0FBa0NSZ0MsY0FsQ1Esc0JBa0NJO0FBQ1YsYUFBS2hDLE1BQUw7QUFDQSxZQUFJLEtBQUtBLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNwQixlQUFLQSxNQUFMLEdBQWMsQ0FBZDtBQUNEO0FBQ0Q7QUFDRCxPQXhDTztBQXlDUmlDLGlCQXpDUSx1QkF5Q0tDLENBekNMLEVBeUNRO0FBQ2Q7QUFDQSxhQUFLcEMsU0FBTCxHQUFpQixLQUFLTyxNQUFMLENBQVlLLFFBQVosQ0FBcUJ3QixFQUFFN0IsTUFBRixDQUFTOEIsS0FBOUIsQ0FBakI7QUFDRCxPQTVDTztBQTZDUkMsY0E3Q1Esc0JBNkNJO0FBQ1YsYUFBS2pDLE9BQUw7QUFDRCxPQS9DTztBQWdEUmtDLGVBaERRLHVCQWdESztBQUNYLGFBQUtsQyxPQUFMO0FBQ0EsWUFBSSxLQUFLQSxPQUFMLElBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLGVBQUtBLE9BQUwsR0FBZSxDQUFmO0FBQ0Q7QUFDRixPQXJETztBQXNEUm1DLGtCQXREUSx3QkFzRE1KLENBdEROLEVBc0RTO0FBQ2Y7QUFDQSxhQUFLaEMsVUFBTCxHQUFrQixLQUFLRyxNQUFMLENBQVlLLFFBQVosQ0FBcUJ3QixFQUFFN0IsTUFBRixDQUFTOEIsS0FBOUIsQ0FBbEI7QUFDRCxPQXpETztBQTBEUkksWUExRFEsb0JBMERFO0FBQ1IsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdEO0FBOURPLEs7Ozs7O21DQWdFTTtBQUNkO0FBQ0Q7OztrQ0FDYztBQUNiO0FBQ0Q7OztrQ0FDY0MsRSxFQUFJO0FBQ2pCO0FBQ0EsV0FBS3JDLE1BQUwsQ0FBWUssUUFBWixHQUF1QixDQUFDO0FBQ3RCTyxjQUFNLFVBRGdCO0FBRXRCbEIsZUFBTyxFQUZlO0FBR3RCNEMsYUFBSztBQUhpQixPQUFELEVBSXBCO0FBQ0QxQixjQUFNLFdBREw7QUFFRGxCLGVBQU8sR0FGTjtBQUdENEMsYUFBSyxFQUhKO0FBSURDLGlCQUFTO0FBSlIsT0FKb0IsRUFTcEI7QUFDRDNCLGNBQU0sV0FETDtBQUVEbEIsZUFBTyxHQUZOO0FBR0Q0QyxhQUFLO0FBSEosT0FUb0IsQ0FBdkI7QUFjQSxVQUFJRSxZQUFZLEtBQUt4QyxNQUFMLENBQVlLLFFBQVosQ0FBcUJvQyxNQUFyQixDQUE0QixVQUFDQyxJQUFELEVBQVU7QUFDcEQsZUFBT0EsS0FBS0gsT0FBWjtBQUNELE9BRmUsQ0FBaEI7QUFHQSxXQUFLOUMsU0FBTCxHQUFpQitDLFVBQVUsQ0FBVixDQUFqQjtBQUNEOzs7bUNBQ2VILEUsRUFBSTtBQUNsQjtBQUNBLFdBQUtyQyxNQUFMLENBQVlLLFFBQVosR0FBdUIsQ0FBQztBQUN0Qk8sY0FBTSxVQURnQjtBQUV0QmxCLGVBQU8sRUFGZTtBQUd0QjRDLGFBQUs7QUFIaUIsT0FBRCxFQUlwQjtBQUNEMUIsY0FBTSxXQURMO0FBRURsQixlQUFPLEdBRk47QUFHRDRDLGFBQUssRUFISjtBQUlEQyxpQkFBUztBQUpSLE9BSm9CLEVBU3BCO0FBQ0QzQixjQUFNLFdBREw7QUFFRGxCLGVBQU8sR0FGTjtBQUdENEMsYUFBSztBQUhKLE9BVG9CLENBQXZCO0FBY0EsVUFBSUssU0FBUyxLQUFLM0MsTUFBTCxDQUFZSyxRQUFaLENBQXFCb0MsTUFBckIsQ0FBNEIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pELGVBQU9BLEtBQUtILE9BQVo7QUFDRCxPQUZZLENBQWI7QUFHQSxXQUFLMUMsVUFBTCxHQUFrQjhDLE9BQU8sQ0FBUCxDQUFsQjtBQUNEOzs7MkJBQ09OLEUsRUFBSTtBQUNWTyxjQUFRQyxHQUFSLENBQVlSLEVBQVo7QUFDQSxXQUFLaEIsYUFBTCxDQUFtQmdCLEVBQW5CO0FBQ0EsV0FBS2IsY0FBTCxDQUFvQmEsRUFBcEI7QUFDQSxVQUFJUyxRQUFRLElBQVo7QUFDQSxxQkFBS0MsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QkgsZ0JBQU10QyxTQUFOLEdBQWtCeUMsSUFBSUMsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS0MsTUFBTDtBQUNEOzs7O0VBeE1pQyxlQUFLQyxJOztrQkFBcEJ2RSxNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImJvdHRvbVwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcImNvdW50ZXJCdXlcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJidXlOdW1cIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiYnV5XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQnV5XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0J1eVwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQnV5XCJ9LFwiY291bnRlckNhcnRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ2FydFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQ2FydFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgYm90dG9tOiBCb3R0b20sXG4gICAgICBjb3VudGVyQnV5OiBDb3VudCxcbiAgICAgIGNvdW50ZXJDYXJ0OiBDb3VudFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQnV5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnV5UmVzdWx0LnByaWNlICogdGhpcy5idXlOdW1cbiAgICAgIH0sXG4gICAgICB0b3RhbENhcnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0UmVzdWx0LnByaWNlICogdGhpcy5jYXJ0TnVtXG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHByaWNlOiAnMTAwLjAnLFxuICAgICAgICBvbGRwcmljZTogJzE0MC4wJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInLFxuICAgICAgICBnb29kTGlzdDogW11cbiAgICAgIH0sXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnNCcsXG4gICAgICBjb2xsZWN0ZWRVc2VyOiBbe1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfV0sXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGJ1eU51bTogMSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBidXlSZXN1bHQ6IFtdLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbEJ1eTogMCxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGJ1eU1vZGFsOiBmYWxzZSxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2VcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29sbGVjdCkge1xuICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYnV5ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5idXlNb2RhbCA9IHRydWVcbiAgICAgICAgdGhpcy5pbml0QnV5UmVzdWx0KClcbiAgICAgIH0sXG4gICAgICBjbG9zZUJ1eSAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmJ1eU1vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy5idXlOdW0gPSAxXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgLy8g5Y+R6YCB5riF56m65ZWG5ZOB6K+35rGCXG4gICAgICB9LFxuICAgICAgY2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLmluaXRDYXJ0UmVzdWx0KClcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgIH0sXG4gICAgICBwbHVzQnV5ICgpIHtcbiAgICAgICAgdGhpcy5idXlOdW0gKytcbiAgICAgICAgLy8g5Y+R6YCB5pWw6YePXG4gICAgICB9LFxuICAgICAgbWludXNCdXkgKCkge1xuICAgICAgICB0aGlzLmJ1eU51bSAtLVxuICAgICAgICBpZiAodGhpcy5idXlOdW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuYnV5TnVtID0gMFxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGFkZEJ1eUdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmJ1eVJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIHBsdXNDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtICsrXG4gICAgICB9LFxuICAgICAgbWludXNDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtIC0tXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB9LFxuICAgICAgZ29DYXJ0ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0QnV5RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrnq4vljbPotK3kubDpgInpoblcbiAgICB9XG4gICAgaW5pdEJ1eVJlc3VsdCAoaWQpIHtcbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uIOS7peS4i+aooeaLn+aVsOaNrlxuICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbe1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJNTAwZycsXG4gICAgICAgIHByaWNlOiA2OSxcbiAgICAgICAgbnVtOiAwXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokxMDAwZycsXG4gICAgICAgIHByaWNlOiAxMjAsXG4gICAgICAgIG51bTogOTgsXG4gICAgICAgIGNoZWNrZWQ6IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTIwMDBnJyxcbiAgICAgICAgcHJpY2U6IDIyMCxcbiAgICAgICAgbnVtOiA5OFxuICAgICAgfV1cbiAgICAgIGxldCByZXN1bHRidXkgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuYnV5UmVzdWx0ID0gcmVzdWx0YnV5WzBdXG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0IChpZCkge1xuICAgICAgLy8g5qC55o2u5ZWG5ZOBaWTlj5HpgIHor7fmsYLov5Tlm57llYblk4Hor6bmg4XmlbDmja4g5Lul5LiL5qih5ouf5pWw5o2uXG4gICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFt7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogok1MDBnJyxcbiAgICAgICAgcHJpY2U6IDY5LFxuICAgICAgICBudW06IDBcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ+iHqueEtueJm+iCiTEwMDBnJyxcbiAgICAgICAgcHJpY2U6IDEyMCxcbiAgICAgICAgbnVtOiA5OCxcbiAgICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJMjAwMGcnLFxuICAgICAgICBwcmljZTogMjIwLFxuICAgICAgICBudW06IDk4XG4gICAgICB9XVxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0WzBdXG4gICAgfVxuICAgIG9uTG9hZCAoaWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgdGhpcy5pbml0QnV5UmVzdWx0KGlkKVxuICAgICAgdGhpcy5pbml0Q2FydFJlc3VsdChpZClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19