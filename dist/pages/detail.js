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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsImNhcnRSZXN1bHQiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsIm51bSIsImRhdGEiLCJkZXRhaWwiLCJwYXRoIiwib2xkcHJpY2UiLCJleHByZXNzIiwidGl0bGUiLCJnb29kTGlzdCIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImNvbGxlY3RlZFVzZXIiLCJuYW1lIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJpc0FkZENhcnQiLCJhZGRDYXJ0Q291bnQiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsImNhcnQiLCJhY3Rpb24iLCJpbml0RGF0YSIsImluaXRDYXJ0UmVzdWx0IiwiY2xvc2VDYXJ0IiwicGx1c0NhcnQiLCJjb25zb2xlIiwibG9nIiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsImFwcGx5IiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJpZCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJyZXMiLCJjb2xsZWN0aW9uSWQiLCJtZW1iZXJIYXNoIiwiZ2xvYmFsRGF0YSIsInVzZXJIYXNoIiwicmVzZXRVc2VyTGV2ZWwiLCJlcnJvciIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJkZXNjcmlwdCIsImRlc2MiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJwcm9kdWN0TmFtZSIsInVzZXJMZXZlbCIsImtlZXBDb3V0IiwiaXNBbGxvd1NhbGUiLCJ0eXBlIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwicHVzaCIsIiRhcHBseSIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJHZXRVc2VySW5mbyIsImxldmVsIiwiZ2V0VG9rZW4iLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQVYsRUFBbUYsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBakcsRSxTQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsWUFBVyxNQUFaLEVBQW1CLGFBQVksTUFBL0IsRUFBVixFQUFpRCxlQUFjLEVBQUMsaUJBQWdCLFVBQWpCLEVBQTRCLGtCQUFpQixXQUE3QyxFQUF5RCxnQkFBZSxTQUF4RSxFQUFrRixpQkFBZ0IsVUFBbEcsRUFBL0QsRSxTQUNUQyxVLEdBQWE7QUFDUkMsaUNBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLFEsR0FBVztBQUNUQyxlQURTLHVCQUNJO0FBQ1gsWUFBSSxLQUFLQyxVQUFMLENBQWdCQyxLQUFwQixFQUEyQjtBQUN6QixjQUFJQSxRQUFRLEtBQUtELFVBQUwsQ0FBZ0JDLEtBQWhC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QjtBQUNBLFVBQUk0QyxRQUFRLElBQVo7QUFDQSxxQkFBS2lDLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVN0IsR0FBVixFQUFlO0FBQ3RCTCxnQkFBTXpDLFNBQU4sR0FBa0I4QyxJQUFJOEIsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS1IsTUFBTDtBQUNEOzs7O0VBeFBpQyxlQUFLUyxJOztrQkFBcEI1RyxNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQucHJpY2UpIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgdmFyIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPj0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIG1heHRpcCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXh0aXAgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXh0aXBcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgcHJpY2U6ICcnLFxuICAgICAgICBvbGRwcmljZTogJycsXG4gICAgICAgIGV4cHJlc3M6ICczOC4wJyxcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBnb29kTGlzdDogW11cbiAgICAgIH0sXG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlSWQ6ICcnLFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pyq5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogJzQnLFxuICAgICAgY29sbGVjdGVkVXNlcjogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH1dLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBpc0FkZENhcnQ6IHRydWUsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYWRkQ2FydENvdW50OiAwLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICB0aGlzLmNvbGxlY3QgPSAhdGhpcy5jb2xsZWN0XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FydCAoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRDYXJ0Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2FkZEJ1eScpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5wYWdlSWQsIHRoaXMuaW5pdENhcnRSZXN1bHQoKSlcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jYXJ0TnVtKVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICBpZiAodmFsID09PSAnMCcpIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGJsdXJDYXJ0ICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FydENvdW50ICs9IHBhcnNlSW50KHRoaXMuY2FydE51bSlcbiAgICAgICAgICAgIC8vIOWPkemAgea3u+WKoOi0reeJqei9puivt+axglxuICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSgpXG4gICAgICAgICAgICAvLyDlhbPpl63mta7lsYLlubbmuIXnqbrmlbDmja5cbiAgICAgICAgICAgIHRoaXMubWV0aG9kcy5jbG9zZUNhcnQuYXBwbHkodGhpcylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+i3s+i9rOiHs+i0reS5sOmhtemdoicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSBbXVxuICAgICAgLy8g5qC55o2u5ZWG5ZOBaWTlj5HpgIHor7fmsYLov5Tlm57llYblk4Hor6bmg4XmlbDmja4g5Lul5LiL5qih5ouf5pWw5o2uXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHRbMF1cbiAgICB9XG4gICAgaW5pdERhdGEgKGlkLCBjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc3B1SWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGV0YWlsSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFtdXG4gICAgICAgIGlmICghcmVzLmRhdGEuZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzLmRhdGEuZGF0YS5tZW1iZXJIYXNoICE9PSBfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckhhc2gpIHtcbiAgICAgICAgICBfdGhpcy5yZXNldFVzZXJMZXZlbCgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnBhdGggPSBkYXRhLmNvdmVyXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnRpdGxlID0gZGF0YS50aXRsZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwub2xkcHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmRlc2NyaXB0ID0gZGF0YS5kZXNjXG4gICAgICAgICAgZGF0YS5za3VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QubmFtZSA9IGl0ZW0ucHJvZHVjdE5hbWUgKyBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLm51bSA9IGl0ZW0ua2VlcENvdXRcbiAgICAgICAgICAgIGdvb2QuY2hlY2tlZCA9IGl0ZW0uaXNBbGxvd1NhbGVcbiAgICAgICAgICAgIGdvb2QudHlwZSA9IGl0ZW0uc291cmNlVHlwZVxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmRldGFpbC5nb29kTGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGFkZENhcnREYXRhICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuY2FydFJlc3VsdC50eXBlLFxuICAgICAgICBzb3VyY2VJZDogdGhpcy5jYXJ0UmVzdWx0LmlkLFxuICAgICAgICBjb3VudDogdGhpcy5jYXJ0TnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pXG4gICAgfVxuICAgIHJlc2V0VXNlckxldmVsICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID0gcmVzLmRhdGEuZGF0YS5sZXZlbFxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChpZCkge1xuICAgICAgdGhpcy5wYWdlSWQgPSBpZC5pZFxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignZGV0YWlsJylcbiAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5wYWdlSWQpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==