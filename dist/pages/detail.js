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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwiY29tcHV0ZWQiLCJ0b3RhbEJ1eSIsImJ1eVJlc3VsdCIsInByaWNlIiwiYnV5TnVtIiwidG90YWxDYXJ0IiwiY2FydFJlc3VsdCIsImNhcnROdW0iLCJtYXh0aXAiLCJudW0iLCJkYXRhIiwiZGV0YWlsIiwicGF0aCIsIm9sZHByaWNlIiwiZXhwcmVzcyIsInRpdGxlIiwiZ29vZExpc3QiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiY29sbGVjdGVkVXNlciIsIm5hbWUiLCJnb29kc0RldGFpbCIsInRyYW5zcG9ydERldGFpbCIsImlzTGluayIsImJ1eU1vZGFsIiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWV0aG9kcyIsImNvbGxlY3RUYXAiLCJidXkiLCJpbml0QnV5UmVzdWx0IiwiY2xvc2VCdXkiLCJjYXJ0IiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQnV5IiwiZSIsIm1pbnVzQnV5Iiwia2V5QnV5IiwidmFsIiwiYWRkQnV5R29vZHMiLCJ2YWx1ZSIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsImFkZENhcnRHb29kcyIsImdvQ2FydCIsInN3aXRjaFRhYiIsInVybCIsImlkIiwiY2hlY2tlZCIsInJlc3VsdGJ1eSIsImZpbHRlciIsIml0ZW0iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiX3RoaXMiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd0hlaWdodCIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsY0FBYSxFQUFkLEVBQVYsRUFBNEIsY0FBYSxFQUFDLFNBQVEsV0FBVCxFQUFxQixnQkFBZSxFQUFwQyxFQUF1QyxtQkFBa0IsUUFBekQsRUFBekMsRUFBNEcsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBMUgsRSxTQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsWUFBVyxLQUFaLEVBQWtCLGFBQVksTUFBOUIsRUFBVixFQUFnRCxjQUFhLEVBQUMsaUJBQWdCLFNBQWpCLEVBQTJCLGtCQUFpQixVQUE1QyxFQUF1RCxnQkFBZSxRQUF0RSxFQUE3RCxFQUE2SSxlQUFjLEVBQUMsaUJBQWdCLFVBQWpCLEVBQTRCLGtCQUFpQixXQUE3QyxFQUF5RCxnQkFBZSxTQUF4RSxFQUEzSixFLFNBQ1RDLFUsR0FBYTtBQUNSQyxpQ0FEUTtBQUVSQyxtQ0FGUTtBQUdSQztBQUhRLEssU0FLVkMsUSxHQUFXO0FBQ1RDLGNBRFMsc0JBQ0c7QUFDVixlQUFPLEtBQUtDLFNBQUwsQ0FBZUMsS0FBZixHQUF1QixLQUFLQyxNQUFuQztBQUNELE9BSFE7QUFJVEMsZUFKUyx1QkFJSTtBQUNYLGVBQU8sS0FBS0MsVUFBTCxDQUFnQkgsS0FBaEIsR0FBd0IsS0FBS0ksT0FBcEM7QUFDRCxPQU5RO0FBT1RDLFlBUFMsb0JBT0M7QUFDUixZQUFJQSxTQUFTLEtBQWI7QUFDQSxZQUFJLEtBQUtKLE1BQUwsS0FBZ0IsS0FBS0YsU0FBTCxDQUFlTyxHQUEvQixJQUFzQyxLQUFLRixPQUFMLEtBQWlCLEtBQUtELFVBQUwsQ0FBZ0JHLEdBQTNFLEVBQWdGO0FBQzlFRCxtQkFBUyxJQUFUO0FBQ0QsU0FGRCxNQUVPO0FBQ0xBLG1CQUFTLEtBQVQ7QUFDRDtBQUNELGVBQU9BLE1BQVA7QUFDRDtBQWZRLEssU0FpQlhFLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGNBQU0sdUJBREE7QUFFTlQsZUFBTyxPQUZEO0FBR05VLGtCQUFVLE9BSEo7QUFJTkMsaUJBQVMsTUFKSDtBQUtOQyxlQUFPLHdCQUxEO0FBTU5DLGtCQUFVO0FBTkosT0FESDtBQVNMQyxlQUFTLEtBVEo7QUFVTEMsZ0JBQVUsS0FWTDtBQVdMQyxpQkFBVyxDQVhOO0FBWUxDLGtCQUFZLEtBWlA7QUFhTEMsb0JBQWMsR0FiVDtBQWNMQyxxQkFBZSxDQUFDO0FBQ2RWLGNBQU0sdUJBRFE7QUFFZFcsY0FBTTtBQUZRLE9BQUQsRUFHWjtBQUNEWCxjQUFNLHVCQURMO0FBRURXLGNBQU07QUFGTCxPQUhZLEVBTVo7QUFDRFgsY0FBTSx1QkFETDtBQUVEVyxjQUFNO0FBRkwsT0FOWSxDQWRWO0FBd0JMQyxtQkFBYSxDQUFDO0FBQ1pULGVBQU8sTUFESztBQUVaSixnQkFBUTtBQUZJLE9BQUQsRUFHVjtBQUNESSxlQUFPLE1BRE47QUFFREosZ0JBQVE7QUFGUCxPQUhVLEVBTVY7QUFDREksZUFBTyxNQUROO0FBRURKLGdCQUFRO0FBRlAsT0FOVSxFQVNWO0FBQ0RJLGVBQU8sTUFETjtBQUVESixnQkFBUTtBQUZQLE9BVFUsQ0F4QlI7QUFxQ0xjLHVCQUFpQixDQUFDO0FBQ2hCVixlQUFPLE1BRFM7QUFFaEJKLGdCQUFRO0FBRlEsT0FBRCxFQUdkO0FBQ0RJLGVBQU8sTUFETjtBQUVESixnQkFBUTtBQUZQLE9BSGMsRUFNZDtBQUNESSxlQUFPLE1BRE47QUFFREosZ0JBQVEsTUFGUDtBQUdEZSxnQkFBUTtBQUhQLE9BTmMsQ0FyQ1o7QUFnREx0QixjQUFRLENBaERIO0FBaURMRyxlQUFTLENBakRKO0FBa0RMTCxpQkFBVyxFQWxETjtBQW1ETEksa0JBQVksRUFuRFA7QUFvRExMLGdCQUFVLENBcERMO0FBcURMSSxpQkFBVyxDQXJETjtBQXNETHNCLGdCQUFVLEtBdERMO0FBdURMQyxpQkFBVyxLQXZETjtBQXdETEMsb0JBQWM7QUF4RFQsSyxTQTBEUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHdCQUNNO0FBQ1osYUFBS2QsT0FBTCxHQUFlLENBQUMsS0FBS0EsT0FBckI7QUFDQSxZQUFJLENBQUMsS0FBS0EsT0FBVixFQUFtQjtBQUNqQixlQUFLRyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS0EsVUFBTCxHQUFrQixLQUFsQjtBQUNEO0FBQ0YsT0FSTztBQVNSWSxTQVRRLGlCQVNEO0FBQ0wsYUFBS2QsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtTLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxhQUFLTSxhQUFMO0FBQ0QsT0FiTztBQWNSQyxjQWRRLHNCQWNJO0FBQ1YsYUFBS2hCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLUyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsYUFBS3ZCLE1BQUwsR0FBYyxDQUFkO0FBQ0EsYUFBS08sTUFBTCxDQUFZSyxRQUFaLEdBQXVCLEVBQXZCO0FBQ0E7QUFDRCxPQXBCTztBQXFCUm1CLFVBckJRLGtCQXFCQTtBQUNOLGFBQUtqQixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS1UsU0FBTCxHQUFpQixJQUFqQjtBQUNBLGFBQUtRLGNBQUw7QUFDRCxPQXpCTztBQTBCUkMsZUExQlEsdUJBMEJLO0FBQ1gsYUFBS25CLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLVSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsYUFBS3JCLE9BQUwsR0FBZSxDQUFmO0FBQ0EsYUFBS0ksTUFBTCxDQUFZSyxRQUFaLEdBQXVCLEVBQXZCO0FBQ0QsT0EvQk87QUFnQ1JzQixhQWhDUSxtQkFnQ0NDLENBaENELEVBZ0NJO0FBQ1YsYUFBS25DLE1BQUw7QUFDQSxZQUFJLEtBQUtBLE1BQUwsR0FBYyxLQUFLRixTQUFMLENBQWVPLEdBQWpDLEVBQXNDO0FBQ3BDLGVBQUtMLE1BQUwsR0FBYyxLQUFLRixTQUFMLENBQWVPLEdBQTdCO0FBQ0Q7QUFDRDtBQUNELE9BdENPO0FBdUNSK0IsY0F2Q1Esc0JBdUNJO0FBQ1YsYUFBS3BDLE1BQUw7QUFDQSxZQUFJLEtBQUtBLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNwQixlQUFLQSxNQUFMLEdBQWMsQ0FBZDtBQUNEO0FBQ0Q7QUFDRCxPQTdDTztBQThDUnFDLFlBOUNRLGtCQThDQUMsR0E5Q0EsRUE4Q0tILENBOUNMLEVBOENRO0FBQ2QsYUFBS25DLE1BQUwsR0FBY3NDLEdBQWQ7QUFDQTtBQUNELE9BakRPO0FBa0RSQyxpQkFsRFEsdUJBa0RLSixDQWxETCxFQWtEUTtBQUNkO0FBQ0EsYUFBS25DLE1BQUwsR0FBYyxDQUFkO0FBQ0EsYUFBS0YsU0FBTCxHQUFpQixLQUFLUyxNQUFMLENBQVlLLFFBQVosQ0FBcUJ1QixFQUFFNUIsTUFBRixDQUFTaUMsS0FBOUIsQ0FBakI7QUFDRCxPQXRETztBQXVEUkMsY0F2RFEsc0JBdURJO0FBQ1YsYUFBS3RDLE9BQUw7QUFDQSxZQUFJLEtBQUtBLE9BQUwsR0FBZSxLQUFLRCxVQUFMLENBQWdCRyxHQUFuQyxFQUF3QztBQUN0QyxlQUFLRixPQUFMLEdBQWUsS0FBS0QsVUFBTCxDQUFnQkcsR0FBL0I7QUFDRDtBQUNEO0FBQ0QsT0E3RE87QUE4RFJxQyxlQTlEUSx1QkE4REs7QUFDWCxhQUFLdkMsT0FBTDtBQUNBLFlBQUksS0FBS0EsT0FBTCxJQUFnQixDQUFwQixFQUF1QjtBQUNyQixlQUFLQSxPQUFMLEdBQWUsQ0FBZjtBQUNEO0FBQ0Q7QUFDRCxPQXBFTztBQXFFUndDLGFBckVRLG1CQXFFQ0wsR0FyRUQsRUFxRU1ILENBckVOLEVBcUVTO0FBQ2YsYUFBS2hDLE9BQUwsR0FBZW1DLEdBQWY7QUFDRCxPQXZFTztBQXdFUk0sa0JBeEVRLHdCQXdFTVQsQ0F4RU4sRUF3RVM7QUFDZjtBQUNBLGFBQUtoQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGFBQUtELFVBQUwsR0FBa0IsS0FBS0ssTUFBTCxDQUFZSyxRQUFaLENBQXFCdUIsRUFBRTVCLE1BQUYsQ0FBU2lDLEtBQTlCLENBQWxCO0FBQ0QsT0E1RU87QUE2RVJLLFlBN0VRLG9CQTZFRTtBQUNSLHVCQUFLQyxTQUFMLENBQWU7QUFDYkMsZUFBSztBQURRLFNBQWY7QUFHRDtBQWpGTyxLOzs7OzttQ0FtRk07QUFDZDtBQUNEOzs7a0NBQ2M7QUFDYjtBQUNEOzs7a0NBQ2NDLEUsRUFBSTtBQUNqQjtBQUNBLFdBQUt6QyxNQUFMLENBQVlLLFFBQVosR0FBdUIsQ0FBQztBQUN0Qk8sY0FBTSxVQURnQjtBQUV0QnBCLGVBQU8sRUFGZTtBQUd0Qk0sYUFBSztBQUhpQixPQUFELEVBSXBCO0FBQ0RjLGNBQU0sV0FETDtBQUVEcEIsZUFBTyxHQUZOO0FBR0RNLGFBQUssQ0FISjtBQUlENEMsaUJBQVM7QUFKUixPQUpvQixFQVNwQjtBQUNEOUIsY0FBTSxXQURMO0FBRURwQixlQUFPLEdBRk47QUFHRE0sYUFBSztBQUhKLE9BVG9CLENBQXZCO0FBY0EsVUFBSTZDLFlBQVksS0FBSzNDLE1BQUwsQ0FBWUssUUFBWixDQUFxQnVDLE1BQXJCLENBQTRCLFVBQUNDLElBQUQsRUFBVTtBQUNwRCxlQUFPQSxLQUFLSCxPQUFaO0FBQ0QsT0FGZSxDQUFoQjtBQUdBLFdBQUtuRCxTQUFMLEdBQWlCb0QsVUFBVSxDQUFWLENBQWpCO0FBQ0Q7OzttQ0FDZUYsRSxFQUFJO0FBQ2xCO0FBQ0EsV0FBS3pDLE1BQUwsQ0FBWUssUUFBWixHQUF1QixDQUFDO0FBQ3RCTyxjQUFNLFVBRGdCO0FBRXRCcEIsZUFBTyxFQUZlO0FBR3RCTSxhQUFLO0FBSGlCLE9BQUQsRUFJcEI7QUFDRGMsY0FBTSxXQURMO0FBRURwQixlQUFPLEdBRk47QUFHRE0sYUFBSyxDQUhKO0FBSUQ0QyxpQkFBUztBQUpSLE9BSm9CLEVBU3BCO0FBQ0Q5QixjQUFNLFdBREw7QUFFRHBCLGVBQU8sR0FGTjtBQUdETSxhQUFLO0FBSEosT0FUb0IsQ0FBdkI7QUFjQSxVQUFJZ0QsU0FBUyxLQUFLOUMsTUFBTCxDQUFZSyxRQUFaLENBQXFCdUMsTUFBckIsQ0FBNEIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pELGVBQU9BLEtBQUtILE9BQVo7QUFDRCxPQUZZLENBQWI7QUFHQSxXQUFLL0MsVUFBTCxHQUFrQm1ELE9BQU8sQ0FBUCxDQUFsQjtBQUNEOzs7MkJBQ09MLEUsRUFBSTtBQUNWTSxjQUFRQyxHQUFSLENBQVlQLEVBQVo7QUFDQSxXQUFLbkIsYUFBTCxDQUFtQm1CLEVBQW5CO0FBQ0EsV0FBS2hCLGNBQUwsQ0FBb0JnQixFQUFwQjtBQUNBLFVBQUlRLFFBQVEsSUFBWjtBQUNBLHFCQUFLQyxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxnQkFBTXpDLFNBQU4sR0FBa0I0QyxJQUFJQyxZQUFKLEdBQW1CLElBQXJDO0FBQ0Q7QUFIZ0IsT0FBbkI7QUFLQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUFyT2lDLGVBQUtDLEk7O2tCQUFwQjVFLE0iLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBCb3R0b20gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b21iYXInXG4gIGltcG9ydCBDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9LFwiY291bnRlckJ1eVwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImJ1eU51bVwifSxcImNvdW50ZXJDYXJ0XCI6e1wiY2xhc3NcIjpcImNhbGN1bGF0ZVwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJjYXJ0TnVtXCJ9fTtcclxuJGV2ZW50cyA9IHtcImJvdHRvbVwiOntcInYtb246YnV5XCI6XCJidXlcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJCdXlcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQnV5XCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWludXNCdXlcIixcInYtb246a2V5RWRpdFwiOlwia2V5QnV5XCJ9LFwiY291bnRlckNhcnRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ2FydFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQ2FydFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDYXJ0XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBib3R0b206IEJvdHRvbSxcbiAgICAgIGNvdW50ZXJCdXk6IENvdW50LFxuICAgICAgY291bnRlckNhcnQ6IENvdW50XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdG90YWxCdXkgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idXlSZXN1bHQucHJpY2UgKiB0aGlzLmJ1eU51bVxuICAgICAgfSxcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnRSZXN1bHQucHJpY2UgKiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBtYXh0aXAgKCkge1xuICAgICAgICB2YXIgbWF4dGlwID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuYnV5TnVtID09PSB0aGlzLmJ1eVJlc3VsdC5udW0gfHwgdGhpcy5jYXJ0TnVtID09PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgbWF4dGlwID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heHRpcFxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBwcmljZTogJzEwMC4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNDAuMCcsXG4gICAgICAgIGV4cHJlc3M6ICczOC4wJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJyxcbiAgICAgICAgZ29vZExpc3Q6IFtdXG4gICAgICB9LFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pyq5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogJzQnLFxuICAgICAgY29sbGVjdGVkVXNlcjogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH1dLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBidXlOdW06IDEsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYnV5UmVzdWx0OiBbXSxcbiAgICAgIGNhcnRSZXN1bHQ6IFtdLFxuICAgICAgdG90YWxCdXk6IDAsXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBidXlNb2RhbDogZmFsc2UsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICB0aGlzLmNvbGxlY3QgPSAhdGhpcy5jb2xsZWN0XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYnV5ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5idXlNb2RhbCA9IHRydWVcbiAgICAgICAgdGhpcy5pbml0QnV5UmVzdWx0KClcbiAgICAgIH0sXG4gICAgICBjbG9zZUJ1eSAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmJ1eU1vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy5idXlOdW0gPSAxXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgLy8g5Y+R6YCB5riF56m65ZWG5ZOB6K+35rGCXG4gICAgICB9LFxuICAgICAgY2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLmluaXRDYXJ0UmVzdWx0KClcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgIH0sXG4gICAgICBwbHVzQnV5IChlKSB7XG4gICAgICAgIHRoaXMuYnV5TnVtICsrXG4gICAgICAgIGlmICh0aGlzLmJ1eU51bSA+IHRoaXMuYnV5UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuYnV5TnVtID0gdGhpcy5idXlSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt5Lmw5aKe5Yqg5pWw6YePXG4gICAgICB9LFxuICAgICAgbWludXNCdXkgKCkge1xuICAgICAgICB0aGlzLmJ1eU51bSAtLVxuICAgICAgICBpZiAodGhpcy5idXlOdW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuYnV5TnVtID0gMFxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reS5sOWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUJ1eSAodmFsLCBlKSB7XG4gICAgICAgIHRoaXMuYnV5TnVtID0gdmFsXG4gICAgICAgIC8vIOWPkemAgei0reS5sOi+k+WFpeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGFkZEJ1eUdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmJ1eU51bSA9IDFcbiAgICAgICAgdGhpcy5idXlSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBwbHVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablop7liqDmlbDph49cbiAgICAgIH0sXG4gICAgICBtaW51c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gLS1cbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMFxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUNhcnQgKHZhbCwgZSkge1xuICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgIH0sXG4gICAgICBhZGRDYXJ0R29vZHMgKGUpIHtcbiAgICAgICAgLy8g5Y+R6YCB6YCJ5Lit57uT5p6cXG4gICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB9LFxuICAgICAgZ29DYXJ0ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0QnV5RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrnq4vljbPotK3kubDpgInpoblcbiAgICB9XG4gICAgaW5pdEJ1eVJlc3VsdCAoaWQpIHtcbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uIOS7peS4i+aooeaLn+aVsOaNrlxuICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbe1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJNTAwZycsXG4gICAgICAgIHByaWNlOiA2OSxcbiAgICAgICAgbnVtOiAwXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokxMDAwZycsXG4gICAgICAgIHByaWNlOiAxMjAsXG4gICAgICAgIG51bTogMixcbiAgICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJMjAwMGcnLFxuICAgICAgICBwcmljZTogMjIwLFxuICAgICAgICBudW06IDRcbiAgICAgIH1dXG4gICAgICBsZXQgcmVzdWx0YnV5ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmJ1eVJlc3VsdCA9IHJlc3VsdGJ1eVswXVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoaWQpIHtcbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uIOS7peS4i+aooeaLn+aVsOaNrlxuICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbe1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJNTAwZycsXG4gICAgICAgIHByaWNlOiA2OSxcbiAgICAgICAgbnVtOiAwXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICfoh6rnhLbniZvogokxMDAwZycsXG4gICAgICAgIHByaWNlOiAxMjAsXG4gICAgICAgIG51bTogMyxcbiAgICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJMjAwMGcnLFxuICAgICAgICBwcmljZTogMjIwLFxuICAgICAgICBudW06IDVcbiAgICAgIH1dXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHRbMF1cbiAgICB9XG4gICAgb25Mb2FkIChpZCkge1xuICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICB0aGlzLmluaXRCdXlSZXN1bHQoaWQpXG4gICAgICB0aGlzLmluaXRDYXJ0UmVzdWx0KGlkKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgKyAncHgnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=