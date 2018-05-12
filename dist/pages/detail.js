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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsImNhcnRSZXN1bHQiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsIm51bSIsImRhdGEiLCJkZXRhaWwiLCJwYXRoIiwib2xkcHJpY2UiLCJleHByZXNzIiwidGl0bGUiLCJnb29kTGlzdCIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImdvb2RzRGV0YWlsIiwidHJhbnNwb3J0RGV0YWlsIiwiaXNMaW5rIiwiaXNBZGRDYXJ0IiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwibWV0aG9kcyIsImNvbGxlY3RUYXAiLCJzZXRNYXJrIiwiQ2FuY2VsTWFyayIsImNhcnQiLCJhY3Rpb24iLCJpbml0RGF0YSIsImluaXRDYXJ0UmVzdWx0IiwiY2xvc2VDYXJ0IiwicGx1c0NhcnQiLCJjb25zb2xlIiwibG9nIiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsInR5cGUiLCJhcHBseSIsImdvUnVsZXMiLCJyZXN1bHQiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2tlZCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJyZXMiLCJlcnJvciIsInNob3dTdWNjZXNzIiwiY29sbGVjdGlvbklkIiwicmVzZXRVc2VyTGV2ZWwiLCJtZW1iZXJIYXNoIiwiY292ZXIiLCJtZW1iZXJQcmljZSIsImRlc2NyaXB0IiwiZGVzYyIsInNvdXJjZVR5cGUiLCJzb3VyY2VJZCIsImNvbGxlY3RJZCIsImdldE1hcmtVc2VyIiwic2t1cyIsImZvckVhY2giLCJnb29kIiwibmFtZSIsInByb2R1Y3ROYW1lIiwiZ2xvYmFsRGF0YSIsInVzZXJMZXZlbCIsImtlZXBDb3V0IiwiaXNBbGxvd1NhbGUiLCJwdXNoIiwiJGFwcGx5Iiwic2hvd0ZhaWwiLCJjYXRjaCIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJtYXJrVHlwZSIsIkdldE1hcmtVc2VyIiwibGVuZ3RoIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsImdldFRva2VuIiwicGFnZVJvb3QiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQVYsRUFBbUYsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBakcsRSxTQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsWUFBVyxNQUFaLEVBQW1CLGFBQVksTUFBL0IsRUFBVixFQUFpRCxlQUFjLEVBQUMsaUJBQWdCLFVBQWpCLEVBQTRCLGtCQUFpQixXQUE3QyxFQUF5RCxnQkFBZSxTQUF4RSxFQUFrRixpQkFBZ0IsVUFBbEcsRUFBL0QsRSxTQUNUQyxVLEdBQWE7QUFDUkMsaUNBRFE7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RDtBQUtEOzs7MkJBQ094QyxFLEVBQUk7QUFDVixXQUFLdEMsTUFBTCxHQUFjc0MsR0FBR0EsRUFBakI7QUFDQSxXQUFLdkMsS0FBTCxHQUFhLEtBQUtnRCxPQUFMLENBQWF5QyxRQUFiLEVBQWI7QUFDQSxXQUFLcEUsUUFBTCxDQUFjLEtBQUtwQixNQUFuQjtBQUNBLFdBQUsrQyxPQUFMLENBQWEwQyxRQUFiLEdBQXdCLElBQXhCO0FBQ0EsVUFBSXhDLFFBQVEsSUFBWjtBQUNBLHFCQUFLeUMsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVyQyxHQUFWLEVBQWU7QUFDdEJMLGdCQUFNOUMsU0FBTixHQUFrQm1ELElBQUlzQyxZQUFKLEdBQW1CLElBQXJDO0FBQ0Q7QUFIZ0IsT0FBbkI7QUFLQSxXQUFLZCxNQUFMO0FBQ0Q7Ozs7RUEvU2lDLGVBQUtlLEk7O2tCQUFwQnpILE0iLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBCb3R0b20gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b21iYXInXG4gIGltcG9ydCBDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJib3R0b21cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y2FydFZhbC5zeW5jXCI6XCJhZGRDYXJ0Q291bnRcIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiY2FydFwiLFwidi1vbjpjYXJ0XCI6XCJjYXJ0XCJ9LFwiY291bnRlckNhcnRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ2FydFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQ2FydFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDYXJ0XCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ2FydFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgYm90dG9tOiBCb3R0b20sXG4gICAgICBjb3VudGVyQnV5OiBDb3VudCxcbiAgICAgIGNvdW50ZXJDYXJ0OiBDb3VudCxcbiAgICAgIG1lbnVMaXN0OiBNZW51XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdG90YWxDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5wcmljZSkge1xuICAgICAgICAgIHZhciBwcmljZSA9IHRoaXMuY2FydFJlc3VsdC5wcmljZS5yZXBsYWNlKC8sL2csICcnKSAqIHRoaXMuY2FydE51bVxuICAgICAgICAgIHJldHVybiBwcmljZS50b0ZpeGVkKDIpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXh0aXAgKCkge1xuICAgICAgICB2YXIgbWF4dGlwID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgbWF4dGlwID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heHRpcCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1heHRpcFxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXVxuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnICcsXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGlzQWRkQ2FydDogdHJ1ZSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJyxcbiAgICAgIG1hcmtJZDogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29sbGVjdCkge1xuICAgICAgICAgIHRoaXMuc2V0TWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5DYW5jZWxNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYXJ0IChhY3Rpb24pIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZENhcnQnKSB7XG4gICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnYWRkQnV5Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IHRydWVcbiAgICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLnBhZ2VJZCwgdGhpcy5pbml0Q2FydFJlc3VsdCgpKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgIH0sXG4gICAgICBwbHVzQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNhcnROdW0pXG4gICAgICB9LFxuICAgICAgbWludXNDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtIC0tXG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablh4/lsJHmlbDph49cbiAgICAgIH0sXG4gICAgICBrZXlDYXJ0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBibHVyQ2FydCAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBhZGRDYXJ0R29vZHMgKGUpIHtcbiAgICAgICAgLy8g5Y+R6YCB6YCJ5Lit57uT5p6cXG4gICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB9LFxuICAgICAgZ29DYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBZGRDYXJ0KSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENhcnRDb3VudCArPSBwYXJzZUludCh0aGlzLmNhcnROdW0pXG4gICAgICAgICAgICAvLyDlj5HpgIHmt7vliqDotK3nianovabor7fmsYJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNhcnRSZXN1bHQpXG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P2lkPScgKyB0aGlzLmNhcnRSZXN1bHQuaWQgKyAnJnR5cGU9JyArIHRoaXMuY2FydFJlc3VsdC50eXBlICsgJyZjb3VudD0nICsgdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSBbXVxuICAgICAgLy8g5qC55o2u5ZWG5ZOBaWTlj5HpgIHor7fmsYLov5Tlm57llYblk4Hor6bmg4XmlbDmja4g5Lul5LiL5qih5ouf5pWw5o2uXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHRbMF1cbiAgICB9XG4gICAgaW5pdERhdGEgKGlkLCBjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc3B1SWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGV0YWlsSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFtdXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmICghZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbilcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucGF0aCA9IGRhdGEuY292ZXJcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudGl0bGUgPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5vbGRwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuZGVzY3JpcHQgPSBkYXRhLmRlc2NcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5pZCA9IGRhdGEuc291cmNlSWRcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuY29sbGVjdElkID0gZGF0YS5jb2xsZWN0aW9uSWRcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihkYXRhLnNvdXJjZUlkLCBkYXRhLnNvdXJjZVR5cGUpXG4gICAgICAgICAgaWYgKGRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuc2t1cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLm5hbWUgPSBpdGVtLnByb2R1Y3ROYW1lICsgaXRlbS50aXRsZVxuICAgICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5udW0gPSBpdGVtLmtlZXBDb3V0XG4gICAgICAgICAgICBnb29kLmNoZWNrZWQgPSBpdGVtLmlzQWxsb3dTYWxlXG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBfdGhpcy5kZXRhaWwuZ29vZExpc3QucHVzaChnb29kKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKCkge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLmNhcnRSZXN1bHQudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuY2FydFJlc3VsdC5pZCxcbiAgICAgICAgY291bnQ6IHRoaXMuY2FydE51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRNYXJrVXNlciAoaWQsIHR5cGUpIHtcbiAgICAgIHRoaXMuY29sbGVjdGVkbnVtID0gJyAnXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0eXBlLFxuICAgICAgICBzb3VyY2VJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrVXNlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jb2xsZWN0ZWRudW0gPSBkYXRhLmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBzZXRNYXJrIChjYikge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5kZXRhaWwudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuZGV0YWlsLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5wYWdlSWQpXG4gICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSB0cnVlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==