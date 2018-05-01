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
        return this.cartResult.price * this.cartNum;
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
        if (this.isAddCart) {
          if (this.cartNum <= this.cartResult.num) {
            this.addCartCount += this.cartNum;
            this.methods.closeCart.apply(this);
            this.addCartData();
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
      console.log(this.cartResult);
    }
  }, {
    key: 'initData',
    value: function initData(id, cb) {
      var _this3 = this;

      var token = this.$parent.getToken('detail');
      var _this = this;
      var data = {
        token: token,
        spuId: id
      };
      this.$parent.HttpRequest.DetailHttp(data).then(function (res) {
        console.log(res);
        _this3.detail.goodList = [];
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.detail.path = data.cover;
          _this.detail.title = data.title;
          _this.detail.price = data.memberPrice;
          _this.detail.oldprice = data.price;
          data.skus.forEach(function (item) {
            var good = {};
            good.name = item.productName + item.title;
            good.price = item.price;
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
      var token = this.$parent.getToken('detail');
      var data = {
        token: token,
        sourceType: this.cartResult.type,
        soureceId: this.cartResult.id,
        count: this.cartNum
      };
      console.log(data);
      this.$parent.HttpRequest.AddCartHttp(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(id) {
      this.pageId = id.id;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsImNhcnRSZXN1bHQiLCJwcmljZSIsImNhcnROdW0iLCJtYXh0aXAiLCJudW0iLCJkYXRhIiwiZGV0YWlsIiwicGF0aCIsIm9sZHByaWNlIiwiZXhwcmVzcyIsInRpdGxlIiwiZ29vZExpc3QiLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiY29sbGVjdGVkVXNlciIsIm5hbWUiLCJnb29kc0RldGFpbCIsInRyYW5zcG9ydERldGFpbCIsImlzTGluayIsImlzQWRkQ2FydCIsImFkZENhcnRDb3VudCIsImNhcnRNb2RhbCIsImNvbGxlY3RJbWFnZSIsIm1ldGhvZHMiLCJjb2xsZWN0VGFwIiwiY2FydCIsImFjdGlvbiIsImluaXREYXRhIiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQ2FydCIsIm1pbnVzQ2FydCIsImtleUNhcnQiLCJ2YWwiLCJibHVyQ2FydCIsImFkZENhcnRHb29kcyIsImUiLCJ2YWx1ZSIsImdvQ2FydCIsImFwcGx5IiwiYWRkQ2FydERhdGEiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJpZCIsImNiIiwidG9rZW4iLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJfdGhpcyIsInNwdUlkIiwiSHR0cFJlcXVlc3QiLCJEZXRhaWxIdHRwIiwidGhlbiIsInJlcyIsImVycm9yIiwiY292ZXIiLCJtZW1iZXJQcmljZSIsInNrdXMiLCJmb3JFYWNoIiwiZ29vZCIsInByb2R1Y3ROYW1lIiwia2VlcENvdXQiLCJpc0FsbG93U2FsZSIsInR5cGUiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJwdXNoIiwiJGFwcGx5Iiwic291cmVjZUlkIiwiY291bnQiLCJBZGRDYXJ0SHR0cCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwid2luZG93SGVpZ2h0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7eUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGNBQWEsRUFBZCxFQUFpQixnQkFBZSxFQUFoQyxFQUFtQyx1QkFBc0IsY0FBekQsRUFBVixFQUFtRixlQUFjLEVBQUMsU0FBUSxXQUFULEVBQXFCLG1CQUFrQixTQUF2QyxFQUFqRyxFLFNBQ1RDLE8sR0FBVSxFQUFDLFVBQVMsRUFBQyxZQUFXLE1BQVosRUFBbUIsYUFBWSxNQUEvQixFQUFWLEVBQWlELGVBQWMsRUFBQyxpQkFBZ0IsVUFBakIsRUFBNEIsa0JBQWlCLFdBQTdDLEVBQXlELGdCQUFlLFNBQXhFLEVBQWtGLGlCQUFnQixVQUFsRyxFQUEvRCxFLFNBQ1RDLFUsR0FBYTtBQUNSQyxpQ0FEUTtBQUVSQyxtQ0FGUTtBQUdSQyxvQ0FIUTtBQUlSQztBQUpRLEssU0FNVkMsUSxHQUFXO0FBQ1RDLGVBRFMsdUJBQ0k7QUFDWCxlQUFPLEtBQUtDLFVBQUwsQ0FBZ0JDLEtBQWhCLEdBQXdCLEtBQUtDLE9BQXBDO0FBQ0QsT0FIUTtBQUlUQyxZQUpTLG9CQUlDO0FBQ1IsWUFBSUEsU0FBUyxLQUFiO0FBQ0EsWUFBSSxLQUFLRCxPQUFMLElBQWdCLEtBQUtGLFVBQUwsQ0FBZ0JJLEdBQXBDLEVBQXlDO0FBQ3ZDRCxtQkFBUyxJQUFUO0FBQ0QsU0FGRCxNQUVPO0FBQ0xBLG1CQUFTLEtBQVQ7QUFDRDtBQUNELGVBQU9BLE1BQVA7QUFDRDtB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dGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnRSZXN1bHQucHJpY2UgKiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBtYXh0aXAgKCkge1xuICAgICAgICB2YXIgbWF4dGlwID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgbWF4dGlwID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heHRpcFxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXVxuICAgICAgfSxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnNCcsXG4gICAgICBjb2xsZWN0ZWRVc2VyOiBbe1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfV0sXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGlzQWRkQ2FydDogdHJ1ZSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdCA9ICF0aGlzLmNvbGxlY3RcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYXJ0IChhY3Rpb24pIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZENhcnQnKSB7XG4gICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnYWRkQnV5Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IHRydWVcbiAgICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLnBhZ2VJZCwgdGhpcy5pbml0Q2FydFJlc3VsdCgpKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgIH0sXG4gICAgICBwbHVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablop7liqDmlbDph49cbiAgICAgIH0sXG4gICAgICBtaW51c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gLS1cbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUNhcnQgKHZhbCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgaWYgKHZhbCA9PT0gJzAnKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBibHVyQ2FydCAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDYXJ0Q291bnQgKz0gdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+i3s+i9rOiHs+i0reS5sOmhtemdoicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSBbXVxuICAgICAgLy8g5qC55o2u5ZWG5ZOBaWTlj5HpgIHor7fmsYLov5Tlm57llYblk4Hor6bmg4XmlbDmja4g5Lul5LiL5qih5ouf5pWw5o2uXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHRbMF1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2FydFJlc3VsdClcbiAgICB9XG4gICAgaW5pdERhdGEgKGlkLCBjYikge1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2RldGFpbCcpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzcHVJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZXRhaWxIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnBhdGggPSBkYXRhLmNvdmVyXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnRpdGxlID0gZGF0YS50aXRsZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwub2xkcHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgZGF0YS5za3VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QubmFtZSA9IGl0ZW0ucHJvZHVjdE5hbWUgKyBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5udW0gPSBpdGVtLmtlZXBDb3V0XG4gICAgICAgICAgICBnb29kLmNoZWNrZWQgPSBpdGVtLmlzQWxsb3dTYWxlXG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBfdGhpcy5kZXRhaWwuZ29vZExpc3QucHVzaChnb29kKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignZGV0YWlsJylcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuY2FydFJlc3VsdC50eXBlLFxuICAgICAgICBzb3VyZWNlSWQ6IHRoaXMuY2FydFJlc3VsdC5pZCxcbiAgICAgICAgY291bnQ6IHRoaXMuY2FydE51bVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChpZCkge1xuICAgICAgdGhpcy5wYWdlSWQgPSBpZC5pZFxuICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLnBhZ2VJZClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19