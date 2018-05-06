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
      collectedUser: [],
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
            // 关闭浮层并清空数据
            this.methods.closeCart.apply(this);
          }
        } else {
          console.log('跳转至购买页面');
        }
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
      this.collectedUser = [];
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
          data.forEach(function (item) {
            var obj = {};
            obj.id = item.id;
            obj.name = item.nickName;
            obj.path = item.avatar;
            _this.collectedUser.push(obj);
          });
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
        console.log(res);
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
      console.log(this.detail.collectId, this.markId);
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        console.log(res);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsImNhcnRSZXN1bHQiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsIm51bSIsImRhdGEiLCJkZXRhaWwiLCJwYXRoIiwib2xkcHJpY2UiLCJleHByZXNzIiwidGl0bGUiLCJnb29kTGlzdCIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImNvbGxlY3RlZFVzZXIiLCJnb29kc0RldGFpbCIsInRyYW5zcG9ydERldGFpbCIsImlzTGluayIsImlzQWRkQ2FydCIsImFkZENhcnRDb3VudCIsImNhcnRNb2RhbCIsImNvbGxlY3RJbWFnZSIsIm1hcmtJZCIsIm1ldGhvZHMiLCJjb2xsZWN0VGFwIiwic2V0TWFyayIsIkNhbmNlbE1hcmsiLCJjYXJ0IiwiYWN0aW9uIiwiaW5pdERhdGEiLCJpbml0Q2FydFJlc3VsdCIsImNsb3NlQ2FydCIsInBsdXNDYXJ0IiwiY29uc29sZSIsImxvZyIsIm1pbnVzQ2FydCIsImtleUNhcnQiLCJ2YWwiLCJibHVyQ2FydCIsImFkZENhcnRHb29kcyIsImUiLCJ2YWx1ZSIsImdvQ2FydCIsInBhcnNlSW50IiwiYWRkQ2FydERhdGEiLCJhcHBseSIsImdvUnVsZXMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJpZCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJyZXMiLCJlcnJvciIsImNvbGxlY3Rpb25JZCIsInJlc2V0VXNlckxldmVsIiwibWVtYmVySGFzaCIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJkZXNjcmlwdCIsImRlc2MiLCJ0eXBlIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwiY29sbGVjdElkIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJnbG9iYWxEYXRhIiwidXNlckxldmVsIiwia2VlcENvdXQiLCJpc0FsbG93U2FsZSIsInB1c2giLCIkYXBwbHkiLCJjb3VudCIsIkFkZENhcnRIdHRwIiwibWFya1R5cGUiLCJHZXRNYXJrVXNlciIsImxlbmd0aCIsIm9iaiIsIm5pY2tOYW1lIiwiYXZhdGFyIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsImdldFRva2VuIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsY0FBYSxFQUFkLEVBQWlCLGdCQUFlLEVBQWhDLEVBQW1DLHVCQUFzQixjQUF6RCxFQUFWLEVBQW1GLGVBQWMsRUFBQyxTQUFRLFdBQVQsRUFBcUIsbUJBQWtCLFNBQXZDLEVBQWpHLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLFlBQVcsTUFBWixFQUFtQixhQUFZLE1BQS9CLEVBQVYsRUFBaUQsZUFBYyxFQUFDLGlCQUFnQixVQUFqQixFQUE0QixrQkFBaUIsV0FBN0MsRUFBeUQsZ0JBQWUsU0FBeEUsRUFBa0YsaUJBQWdCLFVBQWxHLEVBQS9ELEUsU0FDVEMsVSxHQUFhO0FBQ1JDLGlDQURRO0FB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LEdBQVIsQ0FBWTRCLEdBQVo7QUFDQUwsY0FBTWtCLFdBQU4sQ0FBa0JsQixNQUFNeEQsTUFBTixDQUFhb0QsRUFBL0IsRUFBbUMsT0FBS3BELE1BQUwsQ0FBWXNFLElBQS9DO0FBQ0FqQixjQUFNQSxJQUFOO0FBQ0FHLGNBQU02QixNQUFOO0FBQ0QsT0FMRDtBQU1EOzs7MkJBQ09qQyxFLEVBQUk7QUFDVixXQUFLN0MsTUFBTCxHQUFjNkMsR0FBR0EsRUFBakI7QUFDQSxXQUFLOUMsS0FBTCxHQUFhLEtBQUtnRCxPQUFMLENBQWEwQyxRQUFiLENBQXNCLFFBQXRCLENBQWI7QUFDQSxXQUFLcEUsUUFBTCxDQUFjLEtBQUtyQixNQUFuQjtBQUNBLFVBQUlpRCxRQUFRLElBQVo7QUFDQSxxQkFBS3lDLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVckMsR0FBVixFQUFlO0FBQ3RCTCxnQkFBTTlDLFNBQU4sR0FBa0JtRCxJQUFJc0MsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS2QsTUFBTDtBQUNEOzs7O0VBcFRpQyxlQUFLZSxJOztrQkFBcEJ6SCxNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQucHJpY2UpIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgdmFyIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPj0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIG1heHRpcCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXh0aXAgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXh0aXBcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgcHJpY2U6ICcnLFxuICAgICAgICBvbGRwcmljZTogJycsXG4gICAgICAgIGV4cHJlc3M6ICczOC4wJyxcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBnb29kTGlzdDogW11cbiAgICAgIH0sXG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlSWQ6ICcnLFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pyq5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogMCxcbiAgICAgIGNvbGxlY3RlZFVzZXI6IFtdLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBpc0FkZENhcnQ6IHRydWUsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYWRkQ2FydENvdW50OiAwLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZycsXG4gICAgICBtYXJrSWQ6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjb2xsZWN0VGFwICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLnNldE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FydCAoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRDYXJ0Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2FkZEJ1eScpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5wYWdlSWQsIHRoaXMuaW5pdENhcnRSZXN1bHQoKSlcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jYXJ0TnVtKVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYmx1ckNhcnQgKHZhbCkge1xuICAgICAgICBpZiAodmFsIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDYXJ0Q291bnQgKz0gcGFyc2VJbnQodGhpcy5jYXJ0TnVtKVxuICAgICAgICAgICAgLy8g5Y+R6YCB5re75Yqg6LSt54mp6L2m6K+35rGCXG4gICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKClcbiAgICAgICAgICAgIC8vIOWFs+mXrea1ruWxguW5tua4heepuuaVsOaNrlxuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmNsb3NlQ2FydC5hcHBseSh0aGlzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn6Lez6L2s6Iez6LSt5Lmw6aG16Z2iJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDYXJ0RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrotK3nianovabpgInpoblcbiAgICB9XG4gICAgaW5pdENhcnRSZXN1bHQgKCkge1xuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gW11cbiAgICAgIC8vIOagueaNruWVhuWTgWlk5Y+R6YCB6K+35rGC6L+U5Zue5ZWG5ZOB6K+m5oOF5pWw5o2uIOS7peS4i+aooeaLn+aVsOaNrlxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0WzBdXG4gICAgfVxuICAgIGluaXREYXRhIChpZCwgY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNwdUlkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRldGFpbEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoIWRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5rWL6K+V55So5oi36Lqr5Lu95Y+Y5YyWXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5yZXNldFVzZXJMZXZlbChkYXRhLm1lbWJlckhhc2gsIHRoaXMudG9rZW4pXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnBhdGggPSBkYXRhLmNvdmVyXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnRpdGxlID0gZGF0YS50aXRsZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwub2xkcHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmRlc2NyaXB0ID0gZGF0YS5kZXNjXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnR5cGUgPSBkYXRhLnNvdXJjZVR5cGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuaWQgPSBkYXRhLnNvdXJjZUlkXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmNvbGxlY3RJZCA9IGRhdGEuY29sbGVjdGlvbklkXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoZGF0YS5zb3VyY2VJZCwgZGF0YS5zb3VyY2VUeXBlKVxuICAgICAgICAgIGlmIChkYXRhLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLnNrdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5uYW1lID0gaXRlbS5wcm9kdWN0TmFtZSArIGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QubnVtID0gaXRlbS5rZWVwQ291dFxuICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gaXRlbS5pc0FsbG93U2FsZVxuICAgICAgICAgICAgZ29vZC50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0TWFya1VzZXIgKGlkLCB0eXBlKSB7XG4gICAgICB0aGlzLmNvbGxlY3RlZG51bSA9IDBcbiAgICAgIHRoaXMuY29sbGVjdGVkVXNlciA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0eXBlLFxuICAgICAgICBzb3VyY2VJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrVXNlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jb2xsZWN0ZWRudW0gPSBkYXRhLmxlbmd0aFxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmlja05hbWVcbiAgICAgICAgICAgIG9iai5wYXRoID0gaXRlbS5hdmF0YXJcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3RlZFVzZXIucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgc2V0TWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuZGV0YWlsLnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmRldGFpbC5pZFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZXRNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsLmNvbGxlY3RJZCwgdGhpcy5tYXJrSWQpXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsTWFya0h0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdkZXRhaWwnKVxuICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLnBhZ2VJZClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19