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
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:cartVal.sync": "addCartCount" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum", "v-bind:isDisabled.sync": "noSales" } }, _this2.$events = { "bottom": { "v-on:buy": "cart", "v-on:cart": "cart" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart", "v-on:keyEdit": "keyCart", "v-on:blurEdit": "blurCart" } }, _this2.components = {
      bottom: _bottombar2.default,
      counterBuy: _counter2.default,
      counterCart: _counter2.default,
      menuList: _menu2.default
    }, _this2.computed = {
      totalCart: function totalCart() {
        if (Object.keys(this.cartResult).length > 0) {
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
      },
      noSales: function noSales() {
        if (this.cartResult.num > 0) {
          return false;
        } else {
          return true;
        }
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
      collectednum: ' ',
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
      markId: '',
      userLevel: 0
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
        this.cartNum = this.cartResult.num <= 0 ? 0 : 1;
      },
      plusCart: function plusCart() {
        if (this.cartResult.num > 0) {
          this.cartNum++;
          if (this.cartNum > this.cartResult.num) {
            this.cartNum = this.cartResult.num;
          }
        }
      },
      minusCart: function minusCart() {
        if (this.cartResult.num > 0) {
          this.cartNum--;
          if (this.cartNum <= 0) {
            this.cartNum = 1;
          }
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
        } else if (this.cartResult.num > 0 && this.cartNum > this.cartResult.num) {
          this.cartNum = this.cartResult.num;
        } else if (this.cartResult.num <= 0) {
          this.cartNum = 0;
        } else {
          this.cartNum = val;
        }
        return this.cartNum;
      },
      addCartGoods: function addCartGoods(e) {
        // 发送选中结果
        this.cartNum = this.cartResult.num <= 0 ? 0 : 1;
        this.cartResult = this.detail.goodList[e.detail.value];
      },
      goCart: function goCart() {
        if (this.cartResult.num > 0) {
          if (this.isAddCart) {
            if (this.cartNum <= this.cartResult.num) {
              this.addCartCount += parseInt(this.cartNum);
              // 发送添加购物车请求
              this.addCartData();
            }
          } else {
            _wepy2.default.navigateTo({
              url: './paybuy?id=' + this.cartResult.id + '&type=' + this.cartResult.type + '&count=' + this.cartNum
            });
          }
          this.methods.closeCart.apply(this);
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
      var result = this.detail.goodList.filter(function (item) {
        return item.checked;
      });
      this.cartResult = result.length > 0 ? result[0] : this.detail.goodList[0];
      this.cartNum = result.length > 0 ? 1 : 0;
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
          _this.$parent.showSuccess();
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
            if (_this.userLevel === 0) {
              good.price = item.price;
            } else if (_this.userLevel === 1) {
              good.price = item.memberPrice;
            }
            good.num = item.keepCout;
            if (item.keepCout > 0) {
              good.checked = true;
            } else {
              good.checked = false;
            }
            good.type = item.sourceType;
            good.id = item.sourceId;
            _this.detail.goodList.push(good);
            _this.$apply();
            cb && cb();
          });
        } else {
          _this.$parent.showFail();
        }
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'addCartData',
    value: function addCartData() {
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
      this.collectednum = ' ';
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
      this.userLevel = this.$parent.globalData.userLevel;
      this.pageId = id.id;
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJpc0FkZENhcnQiLCJhZGRDYXJ0Q291bnQiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtYXJrSWQiLCJ1c2VyTGV2ZWwiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsImluaXREYXRhIiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQ2FydCIsIm1pbnVzQ2FydCIsImtleUNhcnQiLCJ2YWwiLCJibHVyQ2FydCIsImFkZENhcnRHb29kcyIsImUiLCJ2YWx1ZSIsImdvQ2FydCIsInBhcnNlSW50IiwiYWRkQ2FydERhdGEiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaWQiLCJ0eXBlIiwiYXBwbHkiLCJnb1J1bGVzIiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJjYiIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsIl90aGlzIiwic3B1SWQiLCJIdHRwUmVxdWVzdCIsIkRldGFpbEh0dHAiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJjb2xsZWN0aW9uSWQiLCJyZXNldFVzZXJMZXZlbCIsIm1lbWJlckhhc2giLCJjb3ZlciIsIm1lbWJlclByaWNlIiwiZGVzY3JpcHQiLCJkZXNjIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwiY29sbGVjdElkIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJrZWVwQ291dCIsInB1c2giLCIkYXBwbHkiLCJzaG93RmFpbCIsImNhdGNoIiwiY291bnQiLCJBZGRDYXJ0SHR0cCIsIm1hcmtUeXBlIiwiR2V0TWFya1VzZXIiLCJTZXRNYXJrSHR0cCIsIkNhbmNlbE1hcmtIdHRwIiwiZ2xvYmFsRGF0YSIsImdldFRva2VuIiwicGFnZVJvb3QiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQVYsRUFBbUYsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBaUQsMEJBQXlCLFNBQTFFLEVBQWpHLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLFlBQVcsTUFBWixFQUFtQixhQUFZLE1BQS9CLEVBQVYsRUFBaUQsZUFBYyxFQUFDLGlCQUFnQixVQUFqQixFQUE0QixrQkFBaUIsV0FBN0MsRUFBeUQsZ0JBQWUsU0FBeEUsRUFBa0YsaUJBQWdCLFVBQWxHLEVB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QUFhd0MsUUFBYixFQUFiO0FBQ0EsV0FBS2pFLFFBQUwsQ0FBYyxLQUFLckIsTUFBbkI7QUFDQSxXQUFLOEMsT0FBTCxDQUFheUMsUUFBYixHQUF3QixJQUF4QjtBQUNBLFVBQUl2QyxRQUFRLElBQVo7QUFDQSxxQkFBS3dDLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVcEMsR0FBVixFQUFlO0FBQ3RCTCxnQkFBTTdDLFNBQU4sR0FBa0JrRCxJQUFJcUMsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS2QsTUFBTDtBQUNEOzs7O0VBbFVpQyxlQUFLZSxJOztrQkFBcEIzSCxNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIixcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjpcIm5vU2FsZXNcIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcnRSZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgdmFyIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPj0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIG1heHRpcCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXh0aXAgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXh0aXBcbiAgICAgIH0sXG4gICAgICBub1NhbGVzICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXVxuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnICcsXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGlzQWRkQ2FydDogdHJ1ZSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJyxcbiAgICAgIG1hcmtJZDogJycsXG4gICAgICB1c2VyTGV2ZWw6IDBcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29sbGVjdCkge1xuICAgICAgICAgIHRoaXMuc2V0TWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5DYW5jZWxNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYXJ0IChhY3Rpb24pIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZENhcnQnKSB7XG4gICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnYWRkQnV5Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IHRydWVcbiAgICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLnBhZ2VJZCwgdGhpcy5pbml0Q2FydFJlc3VsdCgpKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablh4/lsJHmlbDph49cbiAgICAgIH0sXG4gICAgICBrZXlDYXJ0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBibHVyQ2FydCAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCAmJiB0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgICB0aGlzLmFkZENhcnRDb3VudCArPSBwYXJzZUludCh0aGlzLmNhcnROdW0pXG4gICAgICAgICAgICAgIC8vIOWPkemAgea3u+WKoOi0reeJqei9puivt+axglxuICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9wYXlidXk/aWQ9JyArIHRoaXMuY2FydFJlc3VsdC5pZCArICcmdHlwZT0nICsgdGhpcy5jYXJ0UmVzdWx0LnR5cGUgKyAnJmNvdW50PScgKyB0aGlzLmNhcnROdW1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWV0aG9kcy5jbG9zZUNhcnQuYXBwbHkodGhpcylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDYXJ0RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrotK3nianovabpgInpoblcbiAgICB9XG4gICAgaW5pdENhcnRSZXN1bHQgKCkge1xuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gW11cbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdIDogdGhpcy5kZXRhaWwuZ29vZExpc3RbMF1cbiAgICAgIHRoaXMuY2FydE51bSA9IHJlc3VsdC5sZW5ndGggPiAwID8gMSA6IDBcbiAgICB9XG4gICAgaW5pdERhdGEgKGlkLCBjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc3B1SWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGV0YWlsSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFtdXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmICghZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbilcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucGF0aCA9IGRhdGEuY292ZXJcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudGl0bGUgPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5vbGRwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuZGVzY3JpcHQgPSBkYXRhLmRlc2NcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5pZCA9IGRhdGEuc291cmNlSWRcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuY29sbGVjdElkID0gZGF0YS5jb2xsZWN0aW9uSWRcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihkYXRhLnNvdXJjZUlkLCBkYXRhLnNvdXJjZVR5cGUpXG4gICAgICAgICAgaWYgKGRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuc2t1cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLm5hbWUgPSBpdGVtLnByb2R1Y3ROYW1lICsgaXRlbS50aXRsZVxuICAgICAgICAgICAgaWYgKF90aGlzLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QubnVtID0gaXRlbS5rZWVwQ291dFxuICAgICAgICAgICAgaWYgKGl0ZW0ua2VlcENvdXQgPiAwKSB7XG4gICAgICAgICAgICAgIGdvb2QuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdvb2QuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBfdGhpcy5kZXRhaWwuZ29vZExpc3QucHVzaChnb29kKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKCkge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLmNhcnRSZXN1bHQudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuY2FydFJlc3VsdC5pZCxcbiAgICAgICAgY291bnQ6IHRoaXMuY2FydE51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRNYXJrVXNlciAoaWQsIHR5cGUpIHtcbiAgICAgIHRoaXMuY29sbGVjdGVkbnVtID0gJyAnXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0eXBlLFxuICAgICAgICBzb3VyY2VJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrVXNlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jb2xsZWN0ZWRudW0gPSBkYXRhLmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBzZXRNYXJrIChjYikge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5kZXRhaWwudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuZGV0YWlsLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5wYWdlSWQgPSBpZC5pZFxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmluaXREYXRhKHRoaXMucGFnZUlkKVxuICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gdHJ1ZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgKyAncHgnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=