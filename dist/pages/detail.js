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
        if (this.cartNum > this.cartResult.num) {
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
      isAddCart: true,
      cartNum: 1,
      addCartCount: 0,
      cartResult: [],
      totalCart: 0,
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
          console.log('跳转至购买页面');
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
      var _this3 = this;

      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token,
        spuId: id
      };
      this.$parent.HttpRequest.DetailHttp(data).then(function (res) {
        console.log(res);
        _this3.detail.goodList = [];
        if (!res.data.data.collectionId) {
          _this3.collect = false;
        } else {
          _this3.collect = true;
        }
        if (res.data.data.memberHash !== _this.$parent.globalData.userHash) {
          _this.resetUserLevel();
        }
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.detail.path = data.cover;
          _this.detail.title = data.title;
          _this.detail.price = data.memberPrice;
          _this.detail.oldprice = data.price;
          _this.detail.descript = data.desc;
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
    key: 'resetUserLevel',
    value: function resetUserLevel() {
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserInfo(data).then(function (res) {
        _this.$parent.globalData.userLevel = res.data.data.level;
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(id) {
      this.pageId = id.id;
      this.token = this.$parent.getToken('detail');
      this.initData(this.pageId);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsImNhcnRSZXN1bHQiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsIm51bSIsImRhdGEiLCJkZXRhaWwiLCJwYXRoIiwib2xkcHJpY2UiLCJleHByZXNzIiwidGl0bGUiLCJnb29kTGlzdCIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImNvbGxlY3RlZFVzZXIiLCJuYW1lIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJpc0FkZENhcnQiLCJhZGRDYXJ0Q291bnQiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsImNhcnQiLCJhY3Rpb24iLCJpbml0RGF0YSIsImluaXRDYXJ0UmVzdWx0IiwiY2xvc2VDYXJ0IiwicGx1c0NhcnQiLCJjb25zb2xlIiwibG9nIiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsImFwcGx5IiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJpZCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJyZXMiLCJjb2xsZWN0aW9uSWQiLCJtZW1iZXJIYXNoIiwiZ2xvYmFsRGF0YSIsInVzZXJIYXNoIiwicmVzZXRVc2VyTGV2ZWwiLCJlcnJvciIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJkZXNjcmlwdCIsImRlc2MiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJwcm9kdWN0TmFtZSIsInVzZXJMZXZlbCIsImtlZXBDb3V0IiwiaXNBbGxvd1NhbGUiLCJ0eXBlIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwicHVzaCIsIiRhcHBseSIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJHZXRVc2VySW5mbyIsImxldmVsIiwiZ2V0VG9rZW4iLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQVYsRUFBbUYsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBakcsRSxTQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsWUFBVyxNQUFaLEVBQW1CLGFBQVksTUFBL0IsRUFBVixFQUFpRCxlQUFjLEVBQUMsaUJBQWdCLFVBQWpCLEVBQTRCLGtCQUFpQixXQUE3QyxFQUF5RCxnQkFBZSxTQUF4RSxFQUFrRixpQkFBZ0IsVUFBbEcsRUFBL0QsRSxTQUNUQyxVLEdBQWE7QUFDUkMsaUNBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLFEsR0FBVztBQUNUQyxlQURTLHVCQUNJO0FBQ1gsWUFBSSxLQUFLQyxVQUFMLENBQWdCQyxLQUFwQixFQUEyQjtBQUN6QixjQUFJQSxRQUFRLEtBQUtELFVBQUwsQ0FBZ0JDLEtBQWhC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YixDQUFzQixRQUF0QixDQUFiO0FBQ0EsV0FBS3pELFFBQUwsQ0FBYyxLQUFLbkIsTUFBbkI7QUFDQSxVQUFJNEMsUUFBUSxJQUFaO0FBQ0EscUJBQUtpQyxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVTdCLEdBQVYsRUFBZTtBQUN0QkwsZ0JBQU16QyxTQUFOLEdBQWtCOEMsSUFBSThCLFlBQUosR0FBbUIsSUFBckM7QUFDRDtBQUhnQixPQUFuQjtBQUtBLFdBQUtSLE1BQUw7QUFDRDs7OztFQXZQaUMsZUFBS1MsSTs7a0JBQXBCNUcsTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEJvdHRvbSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbWJhcidcbiAgaW1wb3J0IENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IE1lbnUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImJvdHRvbVwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjYXJ0VmFsLnN5bmNcIjpcImFkZENhcnRDb3VudFwifSxcImNvdW50ZXJDYXJ0XCI6e1wiY2xhc3NcIjpcImNhbGN1bGF0ZVwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJjYXJ0TnVtXCJ9fTtcclxuJGV2ZW50cyA9IHtcImJvdHRvbVwiOntcInYtb246YnV5XCI6XCJjYXJ0XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQ2FydFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDYXJ0XCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWludXNDYXJ0XCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNhcnRcIixcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDYXJ0XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBib3R0b206IEJvdHRvbSxcbiAgICAgIGNvdW50ZXJCdXk6IENvdW50LFxuICAgICAgY291bnRlckNhcnQ6IENvdW50LFxuICAgICAgbWVudUxpc3Q6IE1lbnVcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB0b3RhbENhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0LnByaWNlKSB7XG4gICAgICAgICAgdmFyIHByaWNlID0gdGhpcy5jYXJ0UmVzdWx0LnByaWNlLnJlcGxhY2UoLywvZywgJycpICogdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgcmV0dXJuIHByaWNlLnRvRml4ZWQoMilcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1heHRpcCAoKSB7XG4gICAgICAgIHZhciBtYXh0aXAgPSBmYWxzZVxuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIG1heHRpcCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXh0aXAgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXh0aXBcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgcHJpY2U6ICcnLFxuICAgICAgICBvbGRwcmljZTogJycsXG4gICAgICAgIGV4cHJlc3M6ICczOC4wJyxcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBnb29kTGlzdDogW11cbiAgICAgIH0sXG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlSWQ6ICcnLFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pyq5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogJzQnLFxuICAgICAgY29sbGVjdGVkVXNlcjogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH1dLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBpc0FkZENhcnQ6IHRydWUsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYWRkQ2FydENvdW50OiAwLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICB0aGlzLmNvbGxlY3QgPSAhdGhpcy5jb2xsZWN0XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FydCAoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRDYXJ0Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2FkZEJ1eScpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5wYWdlSWQsIHRoaXMuaW5pdENhcnRSZXN1bHQoKSlcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jYXJ0TnVtKVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYmx1ckNhcnQgKHZhbCkge1xuICAgICAgICBpZiAodmFsIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDYXJ0Q291bnQgKz0gcGFyc2VJbnQodGhpcy5jYXJ0TnVtKVxuICAgICAgICAgICAgLy8g5Y+R6YCB5re75Yqg6LSt54mp6L2m6K+35rGCXG4gICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKClcbiAgICAgICAgICAgIC8vIOWFs+mXrea1ruWxguW5tua4heepuuaVsOaNrlxuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmNsb3NlQ2FydC5hcHBseSh0aGlzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn6Lez6L2s6Iez6LSt5Lmw6aG16Z2iJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2FydERhdGEgKCkge1xuICAgICAgLy8g5b6A5ZCO5Y+w5Y+R6K+35rGC5riF56m66LSt54mp6L2m6YCJ6aG5XG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0ICgpIHtcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IFtdXG4gICAgICAvLyDmoLnmja7llYblk4FpZOWPkemAgeivt+axgui/lOWbnuWVhuWTgeivpuaDheaVsOaNriDku6XkuIvmqKHmi5/mlbDmja5cbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHJlc3VsdFswXVxuICAgIH1cbiAgICBpbml0RGF0YSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzcHVJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZXRhaWxIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgaWYgKCFyZXMuZGF0YS5kYXRhLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgIHRoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLm1lbWJlckhhc2ggIT09IF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySGFzaCkge1xuICAgICAgICAgIF90aGlzLnJlc2V0VXNlckxldmVsKClcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucGF0aCA9IGRhdGEuY292ZXJcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudGl0bGUgPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5vbGRwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuZGVzY3JpcHQgPSBkYXRhLmRlc2NcbiAgICAgICAgICBkYXRhLnNrdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5uYW1lID0gaXRlbS5wcm9kdWN0TmFtZSArIGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QubnVtID0gaXRlbS5rZWVwQ291dFxuICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gaXRlbS5pc0FsbG93U2FsZVxuICAgICAgICAgICAgZ29vZC50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSlcbiAgICB9XG4gICAgcmVzZXRVc2VyTGV2ZWwgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPSByZXMuZGF0YS5kYXRhLmxldmVsXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdkZXRhaWwnKVxuICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLnBhZ2VJZClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19