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
        if (this.cartNum >= this.cartResult.num) {
          return true;
        } else {
          return false;
        }
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
        this.initData(this.initCartResult());
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
    value: function initData(cb) {
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token,
        spuId: this.pageId
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
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initData(cb);
          }
        }
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'addCartData',
    value: function addCartData() {
      var _this5 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        sourceType: this.cartResult.type,
        sourceId: this.cartResult.id,
        count: this.cartNum
      };
      this.$parent.HttpRequest.AddCartHttp(data).then(function (res) {
        if (res.data.error === 0) {} else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'getMarkUser',
    value: function getMarkUser(id, type) {
      var _this6 = this;

      this.collectednum = ' ';
      this.token = this.$parent.getToken();
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
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this6.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'setMark',
    value: function setMark(cb) {
      var _this7 = this;

      var _this = this;
      this.token = this.$parent.getToken();
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
          _this.getMarkUser(_this.detail.id, _this7.detail.type);
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this7.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'CancelMark',
    value: function CancelMark(cb) {
      var _this8 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        markId: this.markId || this.detail.collectId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        if (res.data.error === 0) {
          _this.getMarkUser(_this.detail.id, _this8.detail.type);
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this8.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
    // 转发

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.detail.title,
        path: '/pages/detail?id=' + this.pageId
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad(id) {
      this.userLevel = this.$parent.globalData.userLevel;
      this.pageId = id.id;
      this.initData();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJpc0FkZENhcnQiLCJhZGRDYXJ0Q291bnQiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtYXJrSWQiLCJ1c2VyTGV2ZWwiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsImluaXREYXRhIiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQ2FydCIsIm1pbnVzQ2FydCIsImtleUNhcnQiLCJ2YWwiLCJibHVyQ2FydCIsImFkZENhcnRHb29kcyIsImUiLCJ2YWx1ZSIsImdvQ2FydCIsInBhcnNlSW50IiwiYWRkQ2FydERhdGEiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaWQiLCJ0eXBlIiwiYXBwbHkiLCJnb1J1bGVzIiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJjYiIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzaG93U3VjY2VzcyIsImNvbGxlY3Rpb25JZCIsInJlc2V0VXNlckxldmVsIiwibWVtYmVySGFzaCIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJnZXRNYXJrVXNlciIsInNrdXMiLCJmb3JFYWNoIiwiZ29vZCIsIm5hbWUiLCJwcm9kdWN0TmFtZSIsImtlZXBDb3V0IiwicHVzaCIsIiRhcHBseSIsIm1pc3NUb2tlbiIsImNhdGNoIiwic2hvd0ZhaWwiLCJjb3VudCIsIkFkZENhcnRIdHRwIiwibWFya1R5cGUiLCJHZXRNYXJrVXNlciIsIlNldE1hcmtIdHRwIiwiQ2FuY2VsTWFya0h0dHAiLCJnbG9iYWxEYXRhIiwicGFnZVJvb3QiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQVYsRUFBbUYsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBaUQsMEJBQXlCLFNBQTFFLEVBQWpHLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLFlBQVcsTUFBWixFQUFtQixhQUFZLE1BQS9CLEVBQVYsRUFBaUQsZUFBYyxFQUFDLGlCQUFnQixVQUFqQixFQUE0QixrQkFBaUIsV0FBN0MsRUFBeUQsZ0JBQWUsU0FBeEUsRUFBa0YsaUJB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O3NDQUNtQnZCLEcsRUFBSztBQUN0QixhQUFPO0FBQ0x6RCxlQUFPLEtBQUtKLE1BQUwsQ0FBWUksS0FEZDtBQUVMSCxjQUFNLHNCQUFzQixLQUFLTTtBQUY1QixPQUFQO0FBSUQ7OzsyQkFDT3FDLEUsRUFBSTtBQUNWLFdBQUt2QixTQUFMLEdBQWlCLEtBQUtnQyxPQUFMLENBQWF5QyxVQUFiLENBQXdCekUsU0FBekM7QUFDQSxXQUFLZCxNQUFMLEdBQWNxQyxHQUFHQSxFQUFqQjtBQUNBLFdBQUtoQixRQUFMO0FBQ0EsV0FBS3lCLE9BQUwsQ0FBYTBDLFFBQWIsR0FBd0IsSUFBeEI7QUFDQSxVQUFJdkMsUUFBUSxJQUFaO0FBQ0EscUJBQUt3QyxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVXBDLEdBQVYsRUFBZTtBQUN0QkwsZ0JBQU05QyxTQUFOLEdBQWtCbUQsSUFBSXFDLFlBQUosR0FBbUIsSUFBckM7QUFDRDtBQUhnQixPQUFuQjtBQUtBLFdBQUtkLE1BQUw7QUFDRDs7OztFQWxXaUMsZUFBS2UsSTs7a0JBQXBCNUgsTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEJvdHRvbSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbWJhcidcbiAgaW1wb3J0IENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IE1lbnUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImJvdHRvbVwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjYXJ0VmFsLnN5bmNcIjpcImFkZENhcnRDb3VudFwifSxcImNvdW50ZXJDYXJ0XCI6e1wiY2xhc3NcIjpcImNhbGN1bGF0ZVwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJjYXJ0TnVtXCIsXCJ2LWJpbmQ6aXNEaXNhYmxlZC5zeW5jXCI6XCJub1NhbGVzXCJ9fTtcclxuJGV2ZW50cyA9IHtcImJvdHRvbVwiOntcInYtb246YnV5XCI6XCJjYXJ0XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQ2FydFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDYXJ0XCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWludXNDYXJ0XCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNhcnRcIixcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDYXJ0XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBib3R0b206IEJvdHRvbSxcbiAgICAgIGNvdW50ZXJCdXk6IENvdW50LFxuICAgICAgY291bnRlckNhcnQ6IENvdW50LFxuICAgICAgbWVudUxpc3Q6IE1lbnVcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB0b3RhbENhcnQgKCkge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYXJ0UmVzdWx0KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIHByaWNlID0gdGhpcy5jYXJ0UmVzdWx0LnByaWNlLnJlcGxhY2UoLywvZywgJycpICogdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgcmV0dXJuIHByaWNlLnRvRml4ZWQoMilcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1heHRpcCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPj0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub1NhbGVzICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXVxuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnICcsXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGlzQWRkQ2FydDogdHJ1ZSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJyxcbiAgICAgIG1hcmtJZDogJycsXG4gICAgICB1c2VyTGV2ZWw6IDBcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29sbGVjdCkge1xuICAgICAgICAgIHRoaXMuc2V0TWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5DYW5jZWxNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYXJ0IChhY3Rpb24pIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZENhcnQnKSB7XG4gICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnYWRkQnV5Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IHRydWVcbiAgICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLmluaXRDYXJ0UmVzdWx0KCkpXG4gICAgICB9LFxuICAgICAgY2xvc2VDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwID8gMCA6IDFcbiAgICAgIH0sXG4gICAgICBwbHVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWludXNDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtIC0tXG4gICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUNhcnQgKHZhbCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGJsdXJDYXJ0ICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwICYmIHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBhZGRDYXJ0R29vZHMgKGUpIHtcbiAgICAgICAgLy8g5Y+R6YCB6YCJ5Lit57uT5p6cXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkQ2FydENvdW50ICs9IHBhcnNlSW50KHRoaXMuY2FydE51bSlcbiAgICAgICAgICAgICAgLy8g5Y+R6YCB5re75Yqg6LSt54mp6L2m6K+35rGCXG4gICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWJ1eT9pZD0nICsgdGhpcy5jYXJ0UmVzdWx0LmlkICsgJyZ0eXBlPScgKyB0aGlzLmNhcnRSZXN1bHQudHlwZSArICcmY291bnQ9JyArIHRoaXMuY2FydE51bVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tZXRob2RzLmNsb3NlQ2FydC5hcHBseSh0aGlzKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSBbXVxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB0aGlzLmRldGFpbC5nb29kTGlzdFswXVxuICAgICAgdGhpcy5jYXJ0TnVtID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyAxIDogMFxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc3B1SWQ6IHRoaXMucGFnZUlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGV0YWlsSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFtdXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmICghZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbilcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucGF0aCA9IGRhdGEuY292ZXJcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudGl0bGUgPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5vbGRwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuZGVzY3JpcHQgPSBkYXRhLmRlc2NcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5pZCA9IGRhdGEuc291cmNlSWRcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuY29sbGVjdElkID0gZGF0YS5jb2xsZWN0aW9uSWRcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihkYXRhLnNvdXJjZUlkLCBkYXRhLnNvdXJjZVR5cGUpXG4gICAgICAgICAgaWYgKGRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuc2t1cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLm5hbWUgPSBpdGVtLnByb2R1Y3ROYW1lICsgaXRlbS50aXRsZVxuICAgICAgICAgICAgaWYgKF90aGlzLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QubnVtID0gaXRlbS5rZWVwQ291dFxuICAgICAgICAgICAgaWYgKGl0ZW0ua2VlcENvdXQgPiAwKSB7XG4gICAgICAgICAgICAgIGdvb2QuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdvb2QuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBfdGhpcy5kZXRhaWwuZ29vZExpc3QucHVzaChnb29kKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0RGF0YShjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGdldE1hcmtVc2VyIChpZCwgdHlwZSkge1xuICAgICAgdGhpcy5jb2xsZWN0ZWRudW0gPSAnICdcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1VzZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY29sbGVjdGVkbnVtID0gZGF0YS5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgc2V0TWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5kZXRhaWwudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuZGV0YWlsLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogdGhpcy5tYXJrSWQgfHwgdGhpcy5kZXRhaWwuY29sbGVjdElkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyDovazlj5FcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGhpcy5kZXRhaWwudGl0bGUsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvZGV0YWlsP2lkPScgKyB0aGlzLnBhZ2VJZFxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5wYWdlSWQgPSBpZC5pZFxuICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSB0cnVlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==