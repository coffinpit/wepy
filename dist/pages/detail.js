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
          }
        } else {
          console.log(this.cartResult);
          _wepy2.default.navigateTo({
            url: './paybuy?id=' + this.cartResult.id + '&type=' + this.cartResult.type + '&count=' + this.cartNum
          });
        }
        this.methods.closeCart.apply(this);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsImNhcnRSZXN1bHQiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsIm51bSIsImRhdGEiLCJkZXRhaWwiLCJwYXRoIiwib2xkcHJpY2UiLCJleHByZXNzIiwidGl0bGUiLCJnb29kTGlzdCIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImdvb2RzRGV0YWlsIiwidHJhbnNwb3J0RGV0YWlsIiwiaXNMaW5rIiwiaXNBZGRDYXJ0IiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwibWV0aG9kcyIsImNvbGxlY3RUYXAiLCJzZXRNYXJrIiwiQ2FuY2VsTWFyayIsImNhcnQiLCJhY3Rpb24iLCJpbml0RGF0YSIsImluaXRDYXJ0UmVzdWx0IiwiY2xvc2VDYXJ0IiwicGx1c0NhcnQiLCJjb25zb2xlIiwibG9nIiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsInR5cGUiLCJhcHBseSIsImdvUnVsZXMiLCJyZXN1bHQiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2tlZCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJyZXMiLCJlcnJvciIsImNvbGxlY3Rpb25JZCIsInJlc2V0VXNlckxldmVsIiwibWVtYmVySGFzaCIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJnZXRNYXJrVXNlciIsInNrdXMiLCJmb3JFYWNoIiwiZ29vZCIsIm5hbWUiLCJwcm9kdWN0TmFtZSIsImdsb2JhbERhdGEiLCJ1c2VyTGV2ZWwiLCJrZWVwQ291dCIsImlzQWxsb3dTYWxlIiwicHVzaCIsIiRhcHBseSIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJtYXJrVHlwZSIsIkdldE1hcmtVc2VyIiwibGVuZ3RoIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsImdldFRva2VuIiwicGFnZVJvb3QiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQVYsRUFBbUYsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBakcsRSxTQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsWUFBVyxNQUFaLEVBQW1CLGFBQVksTUFBL0IsRUFBVixFQUFpRCxlQUFjLEVBQUMsaUJBQWdCLFVBQWpCLEVBQTRCLGtCQUFpQixXQUE3QyxFQUF5RCxnQkFBZSxTQUF4RSxFQUFrRixpQkFBZ0IsVUFBbEcsRUFBL0QsRSxTQUNUQyxVLEdBQWE7QUFDUkMsaUNBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLFEsR0FBVztBQUNUQyxlQURTLHVCQUNJO0FBQ1gsWUFBSSxLQUFLQyxVQUFMLENBQWdCQyxLQUFwQixFQUEyQjtBQUN6QixjQUFJQSxRQUFRLEtBQUtELFVBQUwsQ0FBZ0JDLEtBQWhCLENBQXNCQyxPQUF0QixDQUE4QixJQUE5QixFQUFvQyxFQUFwQyxJQUEwQyxLQUFLQyxPQUEzRDtBQUNBLGlCQUFPRixNQUFNRyxPQUFOLENBQWMsQ0FBZCxDQUFQO0FBQ0Q7QUFDRixPQU5RO0FBT1RDLFlBUFMsb0JBT0M7QUFDUixZQUFJQSxTQUFTLEtBQWI7QUFDQSxZQUFJLEtBQUtGLE9BQUwsSUFBZ0IsS0FBS0gsVUFBTCxDQUFnQk0sR0FBcEMsRUFBeUM7QUFDdkNELG1CQUFTLElBQVQ7QUFDRCxTQUZELE1BRU87QUFDTEEsbUJBQVMsS0FBVDtBQUNEO0FBQ0QsZUFBT0EsTUFBUDtBQUNEO0FBZlEsSyxTQWlCWEUsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsY0FBTSxFQURBO0FBRU5SLGVBQU8sRUFGRDtBQUdOUyxrQkFBVSxFQUhKO0FBSU5DLGlCQUFTLE1BSkg7QUFLTkMsZUFBTyxFQUxEO0FBTU5DLGtCQUFVO0FBTkosT0FESDtBQVNMQyxhQUFPLEVBVEY7QUFVTEMsY0FBUSxFQVZIO0FBV0xDLGVBQVMsS0FYSjtBQVlMQyxnQkFBVSxLQVpMO0FBYUxDLGlCQUFXLENBYk47QUFjTEMsa0JBQVksS0FkUDtBQWVMQyxvQkFBYyxDQWZUO0FBZ0JMQyxtQkFBYSxDQUFDO0FBQ1pULGVBQU8sTUFESztBQUVaSixnQkFBUTtBQUZJLE9BQUQsRUFHVjtBQUNESSxlQUFPLE1BRE47QUFFREosZ0JBQVE7QUFGUCxPQUhVLEVBTVY7QUFDREksZUFBTyxNQUROO0FBRURKLGdCQUFRO0FBRlAsT0FOVSxFQVNWO0FBQ0RJLGVBQU8sTUFETjtBQUVESixnQkFBUTtBQUZQLE9BVFUsQ0FoQlI7QUE2QkxjLHVCQUFpQixDQUFDO0FBQ2hCVixlQUFPLE1BRFM7QUFFaEJKLGdCQUFRO0FBRlEsT0FBRCxFQUdkO0FBQ0RJLGVBQU8sTUFETjtBQUVESixnQkFBUTtBQUZQLE9BSGMsRUFNZDtBQUNESSxlQUFPLE1BRE47QUFFREosZ0JBQVEsTUFGUDtBQUdEZSxnQkFBUTtBQUhQLE9BTmMsQ0E3Qlo7QUF3Q0xDLGlCQUFXLElBeENOO0FBeUNMckIsZUFBUyxDQXpDSjtBQTBDTHNCLG9CQUFjLENBMUNUO0FBMkNMekIsa0JBQVksRUEzQ1A7QUE0Q0xELGlCQUFXLENBNUNOO0FBNkNMMkIsaUJBQVcsS0E3Q047QUE4Q0xDLG9CQUFjLDhCQTlDVDtBQStDTEMsY0FBUTtBQS9DSCxLLFNBaURQQyxPLEdBQVU7QUFDUkMsZ0JBRFEsd0JBQ007QUFBQTs7QUFDWixZQUFJLENBQUMsS0FBS2QsT0FBVixFQUFtQjtBQUNqQixlQUFLZSxPQUFMLENBQWEsWUFBTTtBQUNqQixtQkFBS1osVUFBTCxHQUFrQixLQUFsQjtBQUNBLG1CQUFLSCxPQUFMLEdBQWUsSUFBZjtBQUNELFdBSEQ7QUFJRCxTQUxELE1BS087QUFDTCxlQUFLZ0IsVUFBTCxDQUFnQixZQUFNO0FBQ3BCLG1CQUFLYixVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsbUJBQUtILE9BQUwsR0FBZSxLQUFmO0FBQ0QsV0FIRDtBQUlEO0FBQ0YsT0FiTztBQWNSaUIsVUFkUSxnQkFjRkMsTUFkRSxFQWNNO0FBQ1osWUFBSUEsV0FBVyxTQUFmLEVBQTBCO0FBQ3hCLGVBQUtWLFNBQUwsR0FBaUIsSUFBakI7QUFDRCxTQUZELE1BRU8sSUFBSVUsV0FBVyxRQUFmLEVBQXlCO0FBQzlCLGVBQUtWLFNBQUwsR0FBaUIsS0FBakI7QUFDRDtBQUNELGFBQUtQLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxhQUFLUyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsYUFBS1MsUUFBTCxDQUFjLEtBQUtwQixNQUFuQixFQUEyQixLQUFLcUIsY0FBTCxFQUEzQjtBQUNELE9BdkJPO0FBd0JSQyxlQXhCUSx1QkF3Qks7QUFDWCxhQUFLcEIsUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUtTLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxhQUFLdkIsT0FBTCxHQUFlLENBQWY7QUFDRCxPQTVCTztBQTZCUm1DLGNBN0JRLHNCQTZCSTtBQUNWLGFBQUtuQyxPQUFMO0FBQ0EsWUFBSSxLQUFLQSxPQUFMLEdBQWUsS0FBS0gsVUFBTCxDQUFnQk0sR0FBbkMsRUFBd0M7QUFDdEMsZUFBS0gsT0FBTCxHQUFlLEtBQUtILFVBQUwsQ0FBZ0JNLEdBQS9CO0FBQ0Q7QUFDRGlDLGdCQUFRQyxHQUFSLENBQVksS0FBS3JDLE9BQWpCO0FBQ0QsT0FuQ087QUFvQ1JzQyxlQXBDUSx1QkFvQ0s7QUFDWCxhQUFLdEMsT0FBTDtBQUNBLFlBQUksS0FBS0EsT0FBTCxJQUFnQixDQUFwQixFQUF1QjtBQUNyQixlQUFLQSxPQUFMLEdBQWUsQ0FBZjtBQUNEO0FBQ0Q7QUFDRCxPQTFDTztBQTJDUnVDLGFBM0NRLG1CQTJDQ0MsR0EzQ0QsRUEyQ007QUFDWixhQUFLeEMsT0FBTCxHQUFld0MsR0FBZjtBQUNBLGVBQU8sS0FBS3hDLE9BQVo7QUFDRCxPQTlDTztBQStDUnlDLGNBL0NRLG9CQStDRUQsR0EvQ0YsRUErQ087QUFDYixZQUFJQSxPQUFPLENBQVgsRUFBYztBQUNaLGVBQUt4QyxPQUFMLEdBQWUsQ0FBZjtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtBLE9BQUwsR0FBZSxLQUFLSCxVQUFMLENBQWdCTSxHQUFuQyxFQUF3QztBQUM3QyxlQUFLSCxPQUFMLEdBQWUsS0FBS0gsVUFBTCxDQUFnQk0sR0FBL0I7QUFDRCxTQUZNLE1BRUE7QUFDTCxlQUFLSCxPQUFMLEdBQWV3QyxHQUFmO0FBQ0Q7QUFDRCxlQUFPLEtBQUt4QyxPQUFaO0FBQ0QsT0F4RE87QUF5RFIwQyxrQkF6RFEsd0JBeURNQyxDQXpETixFQXlEUztBQUNmO0FBQ0EsYUFBSzNDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsYUFBS0gsVUFBTCxHQUFrQixLQUFLUSxNQUFMLENBQVlLLFFBQVosQ0FBcUJpQyxFQUFFdEMsTUFBRixDQUFTdUMsS0FBOUIsQ0FBbEI7QUFDRCxPQTdETztBQThEUkMsWUE5RFEsb0JBOERFO0FBQ1IsWUFBSSxLQUFLeEIsU0FBVCxFQUFvQjtBQUNsQixjQUFJLEtBQUtyQixPQUFMLElBQWdCLEtBQUtILFVBQUwsQ0FBZ0JNLEdBQXBDLEVBQXlDO0FBQ3ZDLGlCQUFLbUIsWUFBTCxJQUFxQndCLFNBQVMsS0FBSzlDLE9BQWQsQ0FBckI7QUFDQTtBQUNBLGlCQUFLK0MsV0FBTDtBQUNEO0FBQ0YsU0FORCxNQU1PO0FBQ0xYLGtCQUFRQyxHQUFSLENBQVksS0FBS3hDLFVBQWpCO0FBQ0EseUJBQUttRCxVQUFMLENBQWdCO0FBQ2RDLGlCQUFLLGlCQUFpQixLQUFLcEQsVUFBTCxDQUFnQnFELEVBQWpDLEdBQXNDLFFBQXRDLEdBQWlELEtBQUtyRCxVQUFMLENBQWdCc0QsSUFBakUsR0FBd0UsU0FBeEUsR0FBb0YsS0FBS25EO0FBRGhGLFdBQWhCO0FBR0Q7QUFDRCxhQUFLMEIsT0FBTCxDQUFhUSxTQUFiLENBQXVCa0IsS0FBdkIsQ0FBNkIsSUFBN0I7QUFDRCxPQTVFTztBQTZFUkMsYUE3RVEscUJBNkVHO0FBQ1QsdUJBQUtMLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0Q7QUFqRk8sSzs7Ozs7bUNBbUZNO0FBQ2Q7QUFDRDs7O3FDQUNpQjtBQUNoQixXQUFLcEQsVUFBTCxHQUFrQixFQUFsQjtBQUNBO0FBQ0EsVUFBSXlELFNBQVMsS0FBS2pELE1BQUwsQ0FBWUssUUFBWixDQUFxQjZDLE1BQXJCLENBQTRCLFVBQUNDLElBQUQsRUFBVTtBQUNqRCxlQUFPQSxLQUFLQyxPQUFaO0FBQ0QsT0FGWSxDQUFiO0FBR0EsV0FBSzVELFVBQUwsR0FBa0J5RCxPQUFPLENBQVAsQ0FBbEI7QUFDRDs7OzZCQUNTSixFLEVBQUlRLEUsRUFBSTtBQUFBOztBQUNoQixXQUFLQyxPQUFMLENBQWFDLFdBQWI7QUFDQSxVQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFJekQsT0FBTztBQUNUTyxlQUFPLEtBQUtBLEtBREg7QUFFVG1ELGVBQU9aO0FBRkUsT0FBWDtBQUlBLFdBQUtTLE9BQUwsQ0FBYUksV0FBYixDQUF5QkMsVUFBekIsQ0FBb0M1RCxJQUFwQyxFQUEwQzZELElBQTFDLENBQStDLFVBQUNDLEdBQUQsRUFBUztBQUN0RDlCLGdCQUFRQyxHQUFSLENBQVk2QixHQUFaO0FBQ0EsZUFBSzdELE1BQUwsQ0FBWUssUUFBWixHQUF1QixFQUF2QjtBQUNBLFlBQUl3RCxJQUFJOUQsSUFBSixDQUFTK0QsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixjQUFJL0QsT0FBTzhELElBQUk5RCxJQUFKLENBQVNBLElBQXBCO0FBQ0EsY0FBSSxDQUFDQSxLQUFLZ0UsWUFBVixFQUF3QjtBQUN0QlAsa0JBQU1oRCxPQUFOLEdBQWdCLEtBQWhCO0FBQ0QsV0FGRCxNQUVPO0FBQ0xnRCxrQkFBTWhELE9BQU4sR0FBZ0IsSUFBaEI7QUFDRDtBQUNEO0FBQ0FnRCxnQkFBTUYsT0FBTixDQUFjVSxjQUFkLENBQTZCakUsS0FBS2tFLFVBQWxDLEVBQThDLE9BQUszRCxLQUFuRDtBQUNBa0QsZ0JBQU14RCxNQUFOLENBQWFDLElBQWIsR0FBb0JGLEtBQUttRSxLQUF6QjtBQUNBVixnQkFBTXhELE1BQU4sQ0FBYUksS0FBYixHQUFxQkwsS0FBS0ssS0FBMUI7QUFDQW9ELGdCQUFNeEQsTUFBTixDQUFhUCxLQUFiLEdBQXFCTSxLQUFLb0UsV0FBMUI7QUFDQVgsZ0JBQU14RCxNQUFOLENBQWFFLFFBQWIsR0FBd0JILEtBQUtOLEtBQTdCO0FBQ0ErRCxnQkFBTXhELE1BQU4sQ0FBYW9FLFFBQWIsR0FBd0JyRSxLQUFLc0UsSUFBN0I7QUFDQWIsZ0JBQU14RCxNQUFOLENBQWE4QyxJQUFiLEdBQW9CL0MsS0FBS3VFLFVBQXpCO0FBQ0FkLGdCQUFNeEQsTUFBTixDQUFhNkMsRUFBYixHQUFrQjlDLEtBQUt3RSxRQUF2QjtBQUNBZixnQkFBTXhELE1BQU4sQ0FBYXdFLFNBQWIsR0FBeUJ6RSxLQUFLZ0UsWUFBOUI7QUFDQVAsZ0JBQU1pQixXQUFOLENBQWtCMUUsS0FBS3dFLFFBQXZCLEVBQWlDeEUsS0FBS3VFLFVBQXRDO0FBQ0EsY0FBSXZFLEtBQUtnRSxZQUFULEVBQXVCO0FBQ3JCUCxrQkFBTWhELE9BQU4sR0FBZ0IsSUFBaEI7QUFDQWdELGtCQUFNN0MsVUFBTixHQUFtQixLQUFuQjtBQUNELFdBSEQsTUFHTztBQUNMNkMsa0JBQU1oRCxPQUFOLEdBQWdCLEtBQWhCO0FBQ0FnRCxrQkFBTTdDLFVBQU4sR0FBbUIsS0FBbkI7QUFDRDtBQUNEWixlQUFLMkUsSUFBTCxDQUFVQyxPQUFWLENBQWtCLFVBQUN4QixJQUFELEVBQVU7QUFDMUIsZ0JBQUl5QixPQUFPLEVBQVg7QUFDQUEsaUJBQUtDLElBQUwsR0FBWTFCLEtBQUsyQixXQUFMLEdBQW1CM0IsS0FBSy9DLEtBQXBDO0FBQ0EsZ0JBQUlvRCxNQUFNRixPQUFOLENBQWN5QixVQUFkLENBQXlCQyxTQUF6QixLQUF1QyxDQUEzQyxFQUE4QztBQUM1Q0osbUJBQUtuRixLQUFMLEdBQWEwRCxLQUFLMUQsS0FBbEI7QUFDRCxhQUZELE1BRU8sSUFBSStELE1BQU1GLE9BQU4sQ0FBY3lCLFVBQWQsQ0FBeUJDLFNBQXpCLEtBQXVDLENBQTNDLEVBQThDO0FBQ25ESixtQkFBS25GLEtBQUwsR0FBYTBELEtBQUtnQixXQUFsQjtBQUNEO0FBQ0RTLGlCQUFLOUUsR0FBTCxHQUFXcUQsS0FBSzhCLFFBQWhCO0FBQ0FMLGlCQUFLeEIsT0FBTCxHQUFlRCxLQUFLK0IsV0FBcEI7QUFDQU4saUJBQUs5QixJQUFMLEdBQVlLLEtBQUttQixVQUFqQjtBQUNBTSxpQkFBSy9CLEVBQUwsR0FBVU0sS0FBS29CLFFBQWY7QUFDQWYsa0JBQU14RCxNQUFOLENBQWFLLFFBQWIsQ0FBc0I4RSxJQUF0QixDQUEyQlAsSUFBM0I7QUFDQXBCLGtCQUFNNEIsTUFBTjtBQUNBL0Isa0JBQU1BLElBQU47QUFDRCxXQWZEO0FBZ0JEO0FBQ0YsT0E3Q0Q7QUE4Q0Q7OztrQ0FDYztBQUNiLFdBQUtDLE9BQUwsQ0FBYUMsV0FBYjtBQUNBLFVBQUl4RCxPQUFPO0FBQ1RPLGVBQU8sS0FBS0EsS0FESDtBQUVUZ0Usb0JBQVksS0FBSzlFLFVBQUwsQ0FBZ0JzRCxJQUZuQjtBQUdUeUIsa0JBQVUsS0FBSy9FLFVBQUwsQ0FBZ0JxRCxFQUhqQjtBQUlUd0MsZUFBTyxLQUFLMUY7QUFKSCxPQUFYO0FBTUEsV0FBSzJELE9BQUwsQ0FBYUksV0FBYixDQUF5QjRCLFdBQXpCLENBQXFDdkYsSUFBckMsRUFBMkM2RCxJQUEzQyxDQUFnRCxVQUFDQyxHQUFELEVBQVM7QUFDdkQ5QixnQkFBUUMsR0FBUixDQUFZNkIsR0FBWjtBQUNELE9BRkQ7QUFHRDs7O2dDQUNZaEIsRSxFQUFJQyxJLEVBQU07QUFDckIsV0FBS2xDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxVQUFJNEMsUUFBUSxJQUFaO0FBQ0EsVUFBSXpELE9BQU87QUFDVE8sZUFBTyxLQUFLQSxLQURIO0FBRVRpRixrQkFBVSxDQUZEO0FBR1RqQixvQkFBWXhCLElBSEg7QUFJVHlCLGtCQUFVMUI7QUFKRCxPQUFYO0FBTUEsV0FBS1MsT0FBTCxDQUFhSSxXQUFiLENBQXlCOEIsV0FBekIsQ0FBcUN6RixJQUFyQyxFQUEyQzZELElBQTNDLENBQWdELFVBQUNDLEdBQUQsRUFBUztBQUN2RDlCLGdCQUFRQyxHQUFSLENBQVk2QixHQUFaO0FBQ0EsWUFBSUEsSUFBSTlELElBQUosQ0FBUytELEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsY0FBSS9ELE9BQU84RCxJQUFJOUQsSUFBSixDQUFTQSxJQUFwQjtBQUNBeUQsZ0JBQU01QyxZQUFOLEdBQXFCYixLQUFLMEYsTUFBMUI7QUFDRDtBQUNEakMsY0FBTTRCLE1BQU47QUFDRCxPQVBEO0FBUUQ7Ozs0QkFDUS9CLEUsRUFBSTtBQUFBOztBQUNYLFVBQUlHLFFBQVEsSUFBWjtBQUNBLFVBQUl6RCxPQUFPO0FBQ1RPLGVBQU8sS0FBS0EsS0FESDtBQUVUaUYsa0JBQVUsQ0FGRDtBQUdUakIsb0JBQVksS0FBS3RFLE1BQUwsQ0FBWThDLElBSGY7QUFJVHlCLGtCQUFVLEtBQUt2RSxNQUFMLENBQVk2QztBQUpiLE9BQVg7QUFNQWQsY0FBUUMsR0FBUixDQUFZakMsSUFBWjtBQUNBLFdBQUt1RCxPQUFMLENBQWFJLFdBQWIsQ0FBeUJnQyxXQUF6QixDQUFxQzNGLElBQXJDLEVBQTJDNkQsSUFBM0MsQ0FBZ0QsVUFBQ0MsR0FBRCxFQUFTO0FBQ3ZELFlBQUlBLElBQUk5RCxJQUFKLENBQVMrRCxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCTixnQkFBTXBDLE1BQU4sR0FBZXlDLElBQUk5RCxJQUFKLENBQVNBLElBQXhCO0FBQ0F5RCxnQkFBTWlCLFdBQU4sQ0FBa0JqQixNQUFNeEQsTUFBTixDQUFhNkMsRUFBL0IsRUFBbUMsT0FBSzdDLE1BQUwsQ0FBWThDLElBQS9DO0FBQ0FPLGdCQUFNQSxJQUFOO0FBQ0Q7QUFDREcsY0FBTTRCLE1BQU47QUFDRCxPQVBEO0FBUUQ7OzsrQkFDVy9CLEUsRUFBSTtBQUFBOztBQUNkLFVBQUlHLFFBQVEsSUFBWjtBQUNBLFVBQUl6RCxPQUFPO0FBQ1RxQixnQkFBUSxLQUFLQSxNQUFMLElBQWUsS0FBS3BCLE1BQUwsQ0FBWXdFLFNBRDFCO0FBRVRsRSxlQUFPLEtBQUtBO0FBRkgsT0FBWDtBQUlBLFdBQUtnRCxPQUFMLENBQWFJLFdBQWIsQ0FBeUJpQyxjQUF6QixDQUF3QzVGLElBQXhDLEVBQThDNkQsSUFBOUMsQ0FBbUQsVUFBQ0MsR0FBRCxFQUFTO0FBQzFETCxjQUFNaUIsV0FBTixDQUFrQmpCLE1BQU14RCxNQUFOLENBQWE2QyxFQUEvQixFQUFtQyxPQUFLN0MsTUFBTCxDQUFZOEMsSUFBL0M7QUFDQU8sY0FBTUEsSUFBTjtBQUNBRyxjQUFNNEIsTUFBTjtBQUNELE9BSkQ7QUFLRDs7OzJCQUNPdkMsRSxFQUFJO0FBQ1YsV0FBS3RDLE1BQUwsR0FBY3NDLEdBQUdBLEVBQWpCO0FBQ0EsV0FBS3ZDLEtBQUwsR0FBYSxLQUFLZ0QsT0FBTCxDQUFhc0MsUUFBYixDQUFzQixRQUF0QixDQUFiO0FBQ0EsV0FBS2pFLFFBQUwsQ0FBYyxLQUFLcEIsTUFBbkI7QUFDQSxXQUFLK0MsT0FBTCxDQUFhdUMsUUFBYixHQUF3QixJQUF4QjtBQUNBLFVBQUlyQyxRQUFRLElBQVo7QUFDQSxxQkFBS3NDLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVbEMsR0FBVixFQUFlO0FBQ3RCTCxnQkFBTTlDLFNBQU4sR0FBa0JtRCxJQUFJbUMsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS1osTUFBTDtBQUNEOzs7O0VBM1NpQyxlQUFLYSxJOztrQkFBcEJ0SCxNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQucHJpY2UpIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgdmFyIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPj0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIG1heHRpcCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXh0aXAgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXh0aXBcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgcHJpY2U6ICcnLFxuICAgICAgICBvbGRwcmljZTogJycsXG4gICAgICAgIGV4cHJlc3M6ICczOC4wJyxcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBnb29kTGlzdDogW11cbiAgICAgIH0sXG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlSWQ6ICcnLFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pyq5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogMCxcbiAgICAgIGdvb2RzRGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9XSxcbiAgICAgIHRyYW5zcG9ydERldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfphY3pgIHojIPlm7QnLFxuICAgICAgICBkZXRhaWw6ICfotK3mu6Ey5YWs5pak5YWo5Zu95YyF6YKuJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeW/q+mAkicsXG4gICAgICAgIGRldGFpbDogJ+mhuuS4sOWGt+i/kCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHmlrnmoYgnLFxuICAgICAgICBkZXRhaWw6ICfphY3pgIHop4TliJknLFxuICAgICAgICBpc0xpbms6IHRydWVcbiAgICAgIH1dLFxuICAgICAgaXNBZGRDYXJ0OiB0cnVlLFxuICAgICAgY2FydE51bTogMSxcbiAgICAgIGFkZENhcnRDb3VudDogMCxcbiAgICAgIGNhcnRSZXN1bHQ6IFtdLFxuICAgICAgdG90YWxDYXJ0OiAwLFxuICAgICAgY2FydE1vZGFsOiBmYWxzZSxcbiAgICAgIGNvbGxlY3RJbWFnZTogJy4uL2ltYWdlL2ljb24tY2FydC1ibGFuay5wbmcnLFxuICAgICAgbWFya0lkOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5zZXRNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLkNhbmNlbE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhcnQgKGFjdGlvbikge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkQ2FydCcpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdhZGRCdXknKSB7XG4gICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLmluaXREYXRhKHRoaXMucGFnZUlkLCB0aGlzLmluaXRDYXJ0UmVzdWx0KCkpXG4gICAgICB9LFxuICAgICAgY2xvc2VDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgfSxcbiAgICAgIHBsdXNDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtICsrXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2FydE51bSlcbiAgICAgIH0sXG4gICAgICBtaW51c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gLS1cbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUNhcnQgKHZhbCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGJsdXJDYXJ0ICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FydENvdW50ICs9IHBhcnNlSW50KHRoaXMuY2FydE51bSlcbiAgICAgICAgICAgIC8vIOWPkemAgea3u+WKoOi0reeJqei9puivt+axglxuICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSgpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2FydFJlc3VsdClcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXlidXk/aWQ9JyArIHRoaXMuY2FydFJlc3VsdC5pZCArICcmdHlwZT0nICsgdGhpcy5jYXJ0UmVzdWx0LnR5cGUgKyAnJmNvdW50PScgKyB0aGlzLmNhcnROdW1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWV0aG9kcy5jbG9zZUNhcnQuYXBwbHkodGhpcylcbiAgICAgIH0sXG4gICAgICBnb1J1bGVzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3J1bGVzJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2FydERhdGEgKCkge1xuICAgICAgLy8g5b6A5ZCO5Y+w5Y+R6K+35rGC5riF56m66LSt54mp6L2m6YCJ6aG5XG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0ICgpIHtcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IFtdXG4gICAgICAvLyDmoLnmja7llYblk4FpZOWPkemAgeivt+axgui/lOWbnuWVhuWTgeivpuaDheaVsOaNriDku6XkuIvmqKHmi5/mlbDmja5cbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHJlc3VsdFswXVxuICAgIH1cbiAgICBpbml0RGF0YSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzcHVJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZXRhaWxIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKCFkYXRhLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIOa1i+ivleeUqOaIt+i6q+S7veWPmOWMllxuICAgICAgICAgIF90aGlzLiRwYXJlbnQucmVzZXRVc2VyTGV2ZWwoZGF0YS5tZW1iZXJIYXNoLCB0aGlzLnRva2VuKVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wYXRoID0gZGF0YS5jb3ZlclxuICAgICAgICAgIF90aGlzLmRldGFpbC50aXRsZSA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLm9sZHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5kZXNjcmlwdCA9IGRhdGEuZGVzY1xuICAgICAgICAgIF90aGlzLmRldGFpbC50eXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgICAgIF90aGlzLmRldGFpbC5jb2xsZWN0SWQgPSBkYXRhLmNvbGxlY3Rpb25JZFxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5za3VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QubmFtZSA9IGl0ZW0ucHJvZHVjdE5hbWUgKyBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLm51bSA9IGl0ZW0ua2VlcENvdXRcbiAgICAgICAgICAgIGdvb2QuY2hlY2tlZCA9IGl0ZW0uaXNBbGxvd1NhbGVcbiAgICAgICAgICAgIGdvb2QudHlwZSA9IGl0ZW0uc291cmNlVHlwZVxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmRldGFpbC5nb29kTGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGFkZENhcnREYXRhICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuY2FydFJlc3VsdC50eXBlLFxuICAgICAgICBzb3VyY2VJZDogdGhpcy5jYXJ0UmVzdWx0LmlkLFxuICAgICAgICBjb3VudDogdGhpcy5jYXJ0TnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldE1hcmtVc2VyIChpZCwgdHlwZSkge1xuICAgICAgdGhpcy5jb2xsZWN0ZWRudW0gPSAwXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0eXBlLFxuICAgICAgICBzb3VyY2VJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrVXNlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jb2xsZWN0ZWRudW0gPSBkYXRhLmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBzZXRNYXJrIChjYikge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5kZXRhaWwudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuZGV0YWlsLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdkZXRhaWwnKVxuICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLnBhZ2VJZClcbiAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19