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
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:cartVal.sync": "addCartCount", "v-bind:messagePath.sync": "currentPath", "v-bind:nick_name.sync": "userName", "v-bind:avatar.sync": "userAvatar", "v-bind:customer_info_str.sync": "customer_info", "v-bind:note_info_str.sync": "bussiness_info" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum", "v-bind:isDisabled.sync": "noSales" } }, _this2.$events = { "bottom": { "v-on:buy": "cart", "v-on:cart": "cart" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart", "v-on:keyEdit": "keyCart", "v-on:blurEdit": "blurCart" } }, _this2.components = {
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
        if (this.cartNum >= this.cartResult.num - this.cartResult.cartCount) {
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
        goodList: [],
        imageSrc: []
      },
      swiperOpt: {
        autoplay: false,
        interval: 3000,
        duration: 500,
        currentTab: 0,
        indicatorDots: false,
        indicatorColor: '#cccccc',
        indicatorActive: '#fc5e60'
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
      userLevel: 0,
      isLoaded: false,
      videoContext: '',
      showVideo: true,
      swiperStop: true,
      refrenceCode: '',
      memberId: '',
      currentPath: '',
      userName: '',
      userAvatar: '',
      customer_info: {
        'description': '',
        'level': '',
        'cellphones': [['', '']]
      },
      bussiness_info: {
        'title': ''
      }
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
        var _this4 = this;

        this.initData(function () {
          if (action === 'addCart') {
            _this4.isAddCart = true;
          } else if (action === 'addBuy') {
            _this4.isAddCart = false;
          }
          _this4.overflow = true;
          _this4.cartModal = true;
          _this4.showVideo = true;
          _this4.videoContext.pause();
          _this4.initCartResult();
        });
      },
      closeCart: function closeCart() {
        this.overflow = false;
        this.cartModal = false;
        this.cartNum = this.cartResult.num <= 0 ? 0 : 1;
      },
      plusCart: function plusCart() {
        if (this.cartResult.num - this.cartResult.cartCount > 0) {
          this.cartNum++;
          if (this.cartNum > this.cartResult.num - this.cartResult.cartCount) {
            this.cartNum = this.cartResult.num - this.cartResult.cartCount;
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
        } else if (this.cartResult.num > 0 && this.cartNum > this.cartResult.num - this.cartResult.cartCount) {
          this.cartNum = this.cartResult.num - this.cartResult.cartCount;
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
        if (this.cartResult.num - this.cartResult.cartCount > 0) {
          if (this.isAddCart) {
            if (this.cartNum <= this.cartResult.num - this.cartResult.cartCount) {
              console.log(this.addCartCount);
              this.addCartCount += parseInt(this.cartNum);
              // 发送添加购物车请求
              this.addCartData();
            }
          } else {
            this.$parent.pageRoot = false;
            _wepy2.default.navigateTo({
              url: './paybuy?id=' + this.cartResult.id + '&type=' + this.cartResult.type + '&count=' + this.cartNum
            });
          }
          this.methods.closeCart.apply(this);
        }
      },
      goRules: function goRules() {
        this.$parent.pageRoot = false;
        _wepy2.default.navigateTo({
          url: './rules'
        });
      },
      playVideo: function playVideo() {
        if (this.swiperStop) {
          this.showVideo = false;
          this.videoContext.play();
        }
      },
      stopVideo: function stopVideo() {
        this.showVideo = true;
        this.videoContext.pause();
      },
      changeSwiper: function changeSwiper() {
        this.swiperStop = false;
        this.showVideo = true;
        this.videoContext.pause();
        this.videoContext.seek(0);
      },
      swiperEnd: function swiperEnd() {
        this.swiperStop = true;
      },
      errorVideo: function errorVideo() {
        var _this5 = this;

        _wepy2.default.showModal({
          title: '提示',
          content: '播放失败，请稍候重试',
          showCancel: false,
          success: function success(res) {
            _this5.showVideo = true;
          }
        });
      },
      goImageLink: function goImageLink(href) {
        if (href) {
          _wepy2.default.navigateTo({
            url: './link?href=' + href
          });
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
      var result = this.detail.goodList.filter(function (item) {
        return item.checked;
      });
      this.cartResult = result.length > 0 ? result[0] : this.detail.goodList[0];
      for (var i = 0; i < this.detail.goodList.length; i++) {
        if (this.cartResult.id === this.detail.goodList[i].id) {
          this.detail.goodList[i].isChecked = true;
        } else {
          this.detail.goodList[i].isChecked = false;
        }
      }
      console.log(this.detail.goodList);
      this.cartNum = result.length > 0 ? 1 : 0;
    }
  }, {
    key: 'initData',
    value: function initData(cb) {
      var _this6 = this;

      this.token = this.$parent.getToken(0, this.refrenceCode);
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token,
        spuId: this.pageId
      };
      this.$parent.HttpRequest.DetailHttp(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        _this6.detail.goodList = [];
        if (res.data.error === 0) {
          _this.isLoaded = true;
          var data = res.data.data;
          if (!data.collectionId) {
            _this.collect = false;
          } else {
            _this.collect = true;
          }
          // 测试用户身份变化
          _this.$parent.resetUserLevel(data.memberHash, _this6.token);
          _this.detail.path = data.cover;
          _this.detail.title = data.title;
          _this.currentPath = data.title;
          _this.detail.price = data.memberPrice;
          _this.detail.oldprice = data.price;
          _this.detail.reduction = data.reduction;
          _this.detail.descript = data.desc;
          _this.detail.type = data.sourceType;
          _this.detail.id = data.sourceId;
          _this.detail.collectId = data.collectionId;
          var tempSrc = JSON.parse(_this.$parent.base64Decode(data.detail));
          for (var key in tempSrc) {
            _this.detail.imageSrc.push(tempSrc[key]);
          }
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
            good.cartCount = item.shoppingCartCount;
            good.type = item.sourceType;
            good.id = item.sourceId;
            _this.detail.goodList.push(good);
            _this.$apply();
          });
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this6.$parent.getToken(res.data.error);
            _this.initData(cb);
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'addCartData',
    value: function addCartData() {
      var _this7 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        sourceType: this.cartResult.type,
        sourceId: this.cartResult.id,
        count: this.cartNum
      };
      this.$parent.HttpRequest.AddCartHttp(data).then(function (res) {
        if (res.data.error === 0) {
          // _this.initData(_this.initCartResult())
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this7.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'getMarkUser',
    value: function getMarkUser(id, type) {
      var _this8 = this;

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
            _this.token = _this8.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'setMark',
    value: function setMark(cb) {
      var _this9 = this;

      var _this = this;
      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var data = {
        token: this.token,
        markType: 1,
        sourceType: this.detail.type,
        sourceId: this.detail.id
      };
      this.$parent.HttpRequest.SetMarkHttp(data).then(function (res) {
        _this9.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.markId = res.data.data;
          _this.getMarkUser(_this.detail.id, _this9.detail.type);
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this9.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'CancelMark',
    value: function CancelMark(cb) {
      var _this10 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        markId: this.markId || this.detail.collectId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        _this10.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.getMarkUser(_this.detail.id, _this10.detail.type);
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this10.$parent.getToken(res.data.error);
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
        path: '/pages/detail?id=' + this.pageId + '&refrenceCode=' + this.memberId
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad(id) {
      this.pageId = id.id;
      if (id.refrenceCode) {
        this.refrenceCode = id.refrenceCode;
      }
      this.$parent.pageRoot = true;
      var _this = this;
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          _this.winHeight = res.windowHeight + 'px';
        }
      });
      this.$apply();
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.videoContext = _wepy2.default.createVideoContext('video');
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this11 = this;

      this.userLevel = this.$parent.globalData.userLevel;
      this.memberId = this.$parent.globalData.memberId;
      this.initData(function () {
        _this11.userName = _this11.$parent.getUserName();
        _this11.userAvatar = _this11.$parent.getUserAvatar();
        _this11.customer_info = _this11.$parent.getMessage();
        _this11.bussiness_info = _this11.$parent.getBusiness('商品详情页', _this11.currentPath, null);
        _this11.initCartResult();
        _this11.addCartCount = _this11.cartResult.cartCount;
      });
      this.$apply();
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJjYXJ0Q291bnQiLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwiaW1hZ2VTcmMiLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJpc0FkZENhcnQiLCJhZGRDYXJ0Q291bnQiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtYXJrSWQiLCJ1c2VyTGV2ZWwiLCJpc0xvYWRlZCIsInZpZGVvQ29udGV4dCIsInNob3dWaWRlbyIsInN3aXBlclN0b3AiLCJyZWZyZW5jZUNvZGUiLCJtZW1iZXJJZCIsImN1cnJlbnRQYXRoIiwidXNlck5hbWUiLCJ1c2VyQXZhdGFyIiwiY3VzdG9tZXJfaW5mbyIsImJ1c3NpbmVzc19pbmZvIiwibWV0aG9kcyIsImNvbGxlY3RUYXAiLCJzZXRNYXJrIiwiQ2FuY2VsTWFyayIsImNhcnQiLCJhY3Rpb24iLCJpbml0RGF0YSIsInBhdXNlIiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQ2FydCIsIm1pbnVzQ2FydCIsImtleUNhcnQiLCJ2YWwiLCJibHVyQ2FydCIsImFkZENhcnRHb29kcyIsImUiLCJ2YWx1ZSIsImdvQ2FydCIsImNvbnNvbGUiLCJsb2ciLCJwYXJzZUludCIsImFkZENhcnREYXRhIiwiJHBhcmVudCIsInBhZ2VSb290IiwibmF2aWdhdGVUbyIsInVybCIsImlkIiwidHlwZSIsImFwcGx5IiwiZ29SdWxlcyIsInBsYXlWaWRlbyIsInBsYXkiLCJzdG9wVmlkZW8iLCJjaGFuZ2VTd2lwZXIiLCJzZWVrIiwic3dpcGVyRW5kIiwiZXJyb3JWaWRlbyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsInJlcyIsImdvSW1hZ2VMaW5rIiwiaHJlZiIsInJlc3VsdCIsImZpbHRlciIsIml0ZW0iLCJjaGVja2VkIiwiaSIsImlzQ2hlY2tlZCIsImNiIiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwic3B1SWQiLCJIdHRwUmVxdWVzdCIsIkRldGFpbEh0dHAiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJlcnJvciIsImNvbGxlY3Rpb25JZCIsInJlc2V0VXNlckxldmVsIiwibWVtYmVySGFzaCIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJ0ZW1wU3JjIiwiSlNPTiIsInBhcnNlIiwiYmFzZTY0RGVjb2RlIiwia2V5IiwicHVzaCIsImdldE1hcmtVc2VyIiwic2t1cyIsImZvckVhY2giLCJnb29kIiwibmFtZSIsInByb2R1Y3ROYW1lIiwia2VlcENvdXQiLCJzaG9wcGluZ0NhcnRDb3VudCIsIiRhcHBseSIsIm1pc3NUb2tlbiIsImNhdGNoIiwic2hvd0ZhaWwiLCJjb3VudCIsIkFkZENhcnRIdHRwIiwibWFya1R5cGUiLCJHZXRNYXJrVXNlciIsIlNldE1hcmtIdHRwIiwiQ2FuY2VsTWFya0h0dHAiLCJnZXRTeXN0ZW1JbmZvIiwid2luZG93SGVpZ2h0IiwiY3JlYXRlVmlkZW9Db250ZXh0IiwiZ2xvYmFsRGF0YSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQXdFLDJCQUEwQixhQUFsRyxFQUFnSCx5QkFBd0IsVUFBeEksRUFBbUosc0JBQXFCLFlBQXhLLEVBQXFMLGlDQUFnQyxlQUFyTixFQUFxTyw2QkFBNEIsZ0JBQWpRLEVBQVYsRUFBNlIsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBaUQsMEJBQXlCLFNBQTFFLEVBQTNTLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLFlBQVcsTUFBWixFQUFtQixhQUFZLE1BQS9CLEVBQVYsRUFBaUQsZUFBYyxFQUFDLGlCQUFnQixVQUFqQixFQUE0QixrQkFBaUIsV0FBN0MsRUFBeUQsZ0JBQWUsU0FBeEUsRUFBa0YsaUJBQWdCLFVBQWxHLEVBQS9ELEUsU0FDVEMsVSxHQUFhO0FBQ1JDLGlDQURRO0FBRVJDLG1DQUZRO0FBR1JDLG9DQUhRO0FBSVJDO0FBSlEsSyxTQU1WQyxRLEdBQVc7QUFDVEMsZUFEUyx1QkFDSTtBQUNYLFlBQUlDLE9BQU9DLElBQVAsQ0FBWSxLQUFLQyxVQUFqQixFQUE2QkMsTUFBN0IsR0FBc0MsQ0FBMUMsRUFBNkM7QUFDM0MsY0FBSUMsUUFBUSxLQUFLRixVQUFMLENB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ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCIsXCJ2LWJpbmQ6bWVzc2FnZVBhdGguc3luY1wiOlwiY3VycmVudFBhdGhcIixcInYtYmluZDpuaWNrX25hbWUuc3luY1wiOlwidXNlck5hbWVcIixcInYtYmluZDphdmF0YXIuc3luY1wiOlwidXNlckF2YXRhclwiLFwidi1iaW5kOmN1c3RvbWVyX2luZm9fc3RyLnN5bmNcIjpcImN1c3RvbWVyX2luZm9cIixcInYtYmluZDpub3RlX2luZm9fc3RyLnN5bmNcIjpcImJ1c3NpbmVzc19pbmZvXCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIixcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjpcIm5vU2FsZXNcIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcnRSZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub1NhbGVzICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXSxcbiAgICAgICAgaW1hZ2VTcmM6IFtdXG4gICAgICB9LFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmM1ZTYwJ1xuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnICcsXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGlzQWRkQ2FydDogdHJ1ZSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJyxcbiAgICAgIG1hcmtJZDogJycsXG4gICAgICB1c2VyTGV2ZWw6IDAsXG4gICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICB2aWRlb0NvbnRleHQ6ICcnLFxuICAgICAgc2hvd1ZpZGVvOiB0cnVlLFxuICAgICAgc3dpcGVyU3RvcDogdHJ1ZSxcbiAgICAgIHJlZnJlbmNlQ29kZTogJycsXG4gICAgICBtZW1iZXJJZDogJycsXG4gICAgICBjdXJyZW50UGF0aDogJycsXG4gICAgICB1c2VyTmFtZTogJycsXG4gICAgICB1c2VyQXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm86IHtcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJycsXG4gICAgICAgICdsZXZlbCc6ICcnLFxuICAgICAgICAnY2VsbHBob25lcyc6IFtbJycsICcnXV1cbiAgICAgIH0sXG4gICAgICBidXNzaW5lc3NfaW5mbzoge1xuICAgICAgICAndGl0bGUnOiAnJ1xuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5zZXRNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLkNhbmNlbE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhcnQgKGFjdGlvbikge1xuICAgICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkQ2FydCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnYWRkQnV5Jykge1xuICAgICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKClcbiAgICAgICAgICB0aGlzLmluaXRDYXJ0UmVzdWx0KClcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgfSxcbiAgICAgIHBsdXNDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50ID4gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW51c0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gLS1cbiAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYmx1ckNhcnQgKHZhbCkge1xuICAgICAgICBpZiAodmFsIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDAgJiYgdGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQpIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQgPiAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNBZGRDYXJ0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWRkQ2FydENvdW50KVxuICAgICAgICAgICAgICB0aGlzLmFkZENhcnRDb3VudCArPSBwYXJzZUludCh0aGlzLmNhcnROdW0pXG4gICAgICAgICAgICAgIC8vIOWPkemAgea3u+WKoOi0reeJqei9puivt+axglxuICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P2lkPScgKyB0aGlzLmNhcnRSZXN1bHQuaWQgKyAnJnR5cGU9JyArIHRoaXMuY2FydFJlc3VsdC50eXBlICsgJyZjb3VudD0nICsgdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1J1bGVzICgpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3J1bGVzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBsYXlWaWRlbyAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN3aXBlclN0b3ApIHtcbiAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGxheSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdG9wVmlkZW8gKCkge1xuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVN3aXBlciAoKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyU3RvcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnNlZWsoMClcbiAgICAgIH0sXG4gICAgICBzd2lwZXJFbmQgKCkge1xuICAgICAgICB0aGlzLnN3aXBlclN0b3AgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZXJyb3JWaWRlbyAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aSreaUvuWksei0pe+8jOivt+eojeWAmemHjeivlScsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvSW1hZ2VMaW5rIChocmVmKSB7XG4gICAgICAgIGlmIChocmVmKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vbGluaz9ocmVmPScgKyBocmVmXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2FydERhdGEgKCkge1xuICAgICAgLy8g5b6A5ZCO5Y+w5Y+R6K+35rGC5riF56m66LSt54mp6L2m6YCJ6aG5XG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0ICgpIHtcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IFtdXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFswXSA6IHRoaXMuZGV0YWlsLmdvb2RMaXN0WzBdXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGV0YWlsLmdvb2RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQuaWQgPT09IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2ldLmlkKSB7XG4gICAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3RbaV0uaXNDaGVja2VkID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0W2ldLmlzQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsLmdvb2RMaXN0KVxuICAgICAgdGhpcy5jYXJ0TnVtID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyAxIDogMFxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oMCwgdGhpcy5yZWZyZW5jZUNvZGUpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzcHVJZDogdGhpcy5wYWdlSWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZXRhaWxIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFtdXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGVkID0gdHJ1ZVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmICghZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbilcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucGF0aCA9IGRhdGEuY292ZXJcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudGl0bGUgPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuY3VycmVudFBhdGggPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5vbGRwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucmVkdWN0aW9uID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5kZXRhaWwuZGVzY3JpcHQgPSBkYXRhLmRlc2NcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5pZCA9IGRhdGEuc291cmNlSWRcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuY29sbGVjdElkID0gZGF0YS5jb2xsZWN0aW9uSWRcbiAgICAgICAgICB2YXIgdGVtcFNyYyA9IEpTT04ucGFyc2UoX3RoaXMuJHBhcmVudC5iYXNlNjREZWNvZGUoZGF0YS5kZXRhaWwpKVxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0ZW1wU3JjKSB7XG4gICAgICAgICAgICBfdGhpcy5kZXRhaWwuaW1hZ2VTcmMucHVzaCh0ZW1wU3JjW2tleV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5za3VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QubmFtZSA9IGl0ZW0ucHJvZHVjdE5hbWUgKyBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoX3RoaXMudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5udW0gPSBpdGVtLmtlZXBDb3V0XG4gICAgICAgICAgICBpZiAoaXRlbS5rZWVwQ291dCA+IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QuY2FydENvdW50ID0gaXRlbS5zaG9wcGluZ0NhcnRDb3VudFxuICAgICAgICAgICAgZ29vZC50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgLy8gX3RoaXMuaW5pdERhdGEoX3RoaXMuaW5pdENhcnRSZXN1bHQoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0TWFya1VzZXIgKGlkLCB0eXBlKSB7XG4gICAgICB0aGlzLmNvbGxlY3RlZG51bSA9ICcgJ1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0eXBlLFxuICAgICAgICBzb3VyY2VJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrVXNlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jb2xsZWN0ZWRudW0gPSBkYXRhLmxlbmd0aFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBzZXRNYXJrIChjYikge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5kZXRhaWwudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuZGV0YWlsLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2V0TWFya0h0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLm1hcmtJZCA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBDYW5jZWxNYXJrIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogdGhpcy5tYXJrSWQgfHwgdGhpcy5kZXRhaWwuY29sbGVjdElkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyDovazlj5FcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGhpcy5kZXRhaWwudGl0bGUsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvZGV0YWlsP2lkPScgKyB0aGlzLnBhZ2VJZCArICcmcmVmcmVuY2VDb2RlPScgKyB0aGlzLm1lbWJlcklkXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoaWQpIHtcbiAgICAgIHRoaXMucGFnZUlkID0gaWQuaWRcbiAgICAgIGlmIChpZC5yZWZyZW5jZUNvZGUpIHtcbiAgICAgICAgdGhpcy5yZWZyZW5jZUNvZGUgPSBpZC5yZWZyZW5jZUNvZGVcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblJlYWR5ICgpIHtcbiAgICAgIHRoaXMudmlkZW9Db250ZXh0ID0gd2VweS5jcmVhdGVWaWRlb0NvbnRleHQoJ3ZpZGVvJylcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLm1lbWJlcklkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEubWVtYmVySWRcbiAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50LmdldFVzZXJOYW1lKClcbiAgICAgICAgdGhpcy51c2VyQXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgICB0aGlzLmN1c3RvbWVyX2luZm8gPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgpXG4gICAgICAgIHRoaXMuYnVzc2luZXNzX2luZm8gPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+WVhuWTgeivpuaDhemhtScsIHRoaXMuY3VycmVudFBhdGgsIG51bGwpXG4gICAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoKVxuICAgICAgICB0aGlzLmFkZENhcnRDb3VudCA9IHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnRcbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=