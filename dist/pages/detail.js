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
      },
      skuHeight: '',
      videoSrc: []
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
        var _this5 = this;

        if (this.cartResult.num - this.cartResult.cartCount > 0) {
          if (this.isAddCart) {
            this.overflow = false;
            this.cartModal = false;
            if (this.cartNum <= this.cartResult.num - this.cartResult.cartCount) {
              this.addCartCount += parseInt(this.cartNum);
              // 发送添加购物车请求
              this.addCartData(function () {
                _this5.cartNum = _this5.cartResult.num <= 0 ? 0 : 1;
              });
            }
          } else {
            this.$parent.pageRoot = false;
            _wepy2.default.navigateTo({
              url: './paybuy?id=' + this.cartResult.id + '&type=' + this.cartResult.type + '&count=' + this.cartNum
            });
          }
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
        var _this6 = this;

        _wepy2.default.showModal({
          title: '提示',
          content: '播放失败，请稍候重试',
          showCancel: false,
          success: function success(res) {
            _this6.showVideo = true;
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
      var _this7 = this;

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
        _this7.detail.goodList = [];
        if (res.data.error === 0 && res.data.data.isAllowSale) {
          _this.isLoaded = true;
          var data = res.data.data;
          if (!data.collectionId) {
            _this.collect = false;
          } else {
            _this.collect = true;
          }
          // 测试用户身份变化
          _this.$parent.resetUserLevel(data.memberHash, _this7.token, function () {
            _this.userLevel = _this.$parent.globalData.userLevel;
            _this.memberId = _this.$parent.globalData.memberId;
          });
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
          var filterSrc = [];
          for (var key in tempSrc) {
            filterSrc.push(tempSrc[key]);
          }
          _this.detail.imageSrc = filterSrc.filter(function (item) {
            // 过滤video
            return !item.video;
          });
          _this.videoSrc = filterSrc.filter(function (item) {
            // 提取video
            return item.video;
          });
          if (_this.videoSrc.length > 0) {
            _this.swiperOpt.indicatorDots = true;
          } else {
            _this.swiperOpt.indicatorDots = false;
          }
          console.log(_this.videoSrc);
          _this.getMarkUser(data.sourceId, data.sourceType);
          if (data.collectionId) {
            _this.collect = true;
            _this.collectTxt = '已收藏';
          } else {
            _this.collect = false;
            _this.collectTxt = '未收藏';
          }
          if (data.skus.length > 3) {
            _this7.skuHeight = 300;
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
            _this.detail.goodList.sort(function (good1, good2) {
              return good1.price - good2.price;
            });
            _this.$apply();
          });
          cb && cb();
        } else if (res.data.error === 0 && !res.data.data.isAllowSale) {
          _wepy2.default.showModal({
            title: '提示',
            content: '该商品已下架',
            showCancel: false,
            success: function success(res) {
              if (res.confirm) {
                _wepy2.default.navigateBack();
              }
            }
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this7.$parent.getToken(res.data.error);
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
    value: function addCartData(cb) {
      var _this8 = this;

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
          cb && cb();
          // _this.initData(_this.initCartResult())
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this8.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'getMarkUser',
    value: function getMarkUser(id, type) {
      var _this9 = this;

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
            _this.token = _this9.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'setMark',
    value: function setMark(cb) {
      var _this10 = this;

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
        _this10.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.markId = res.data.data;
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
  }, {
    key: 'CancelMark',
    value: function CancelMark(cb) {
      var _this11 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        markId: this.markId || this.detail.collectId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        _this11.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.getMarkUser(_this.detail.id, _this11.detail.type);
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this11.$parent.getToken(res.data.error);
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
      var _this12 = this;

      this.methods.closeCart.apply(this);
      this.userLevel = this.$parent.globalData.userLevel;
      this.initData(function () {
        _this12.userName = _this12.$parent.getUserName();
        _this12.userAvatar = _this12.$parent.getUserAvatar();
        _this12.customer_info = _this12.$parent.getMessage();
        _this12.bussiness_info = _this12.$parent.getBusiness('商品详情页', _this12.currentPath, null);
        _this12.initCartResult();
        _this12.addCartCount = _this12.cartResult.cartCount;
      });
      this.$apply();
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJjYXJ0Q291bnQiLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwiaW1hZ2VTcmMiLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJpc0FkZENhcnQiLCJhZGRDYXJ0Q291bnQiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtYXJrSWQiLCJ1c2VyTGV2ZWwiLCJpc0xvYWRlZCIsInZpZGVvQ29udGV4dCIsInNob3dWaWRlbyIsInN3aXBlclN0b3AiLCJyZWZyZW5jZUNvZGUiLCJtZW1iZXJJZCIsImN1cnJlbnRQYXRoIiwidXNlck5hbWUiLCJ1c2VyQXZhdGFyIiwiY3VzdG9tZXJfaW5mbyIsImJ1c3NpbmVzc19pbmZvIiwic2t1SGVpZ2h0IiwidmlkZW9TcmMiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsImluaXREYXRhIiwicGF1c2UiLCJpbml0Q2FydFJlc3VsdCIsImNsb3NlQ2FydCIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsIiRwYXJlbnQiLCJwYWdlUm9vdCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsInR5cGUiLCJnb1J1bGVzIiwicGxheVZpZGVvIiwicGxheSIsInN0b3BWaWRlbyIsImNoYW5nZVN3aXBlciIsInNlZWsiLCJzd2lwZXJFbmQiLCJlcnJvclZpZGVvIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwicmVzIiwiZ29JbWFnZUxpbmsiLCJocmVmIiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJpIiwiaXNDaGVja2VkIiwiY29uc29sZSIsImxvZyIsImNiIiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwic3B1SWQiLCJIdHRwUmVxdWVzdCIsIkRldGFpbEh0dHAiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJlcnJvciIsImlzQWxsb3dTYWxlIiwiY29sbGVjdGlvbklkIiwicmVzZXRVc2VyTGV2ZWwiLCJtZW1iZXJIYXNoIiwiZ2xvYmFsRGF0YSIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJ0ZW1wU3JjIiwiSlNPTiIsInBhcnNlIiwiYmFzZTY0RGVjb2RlIiwiZmlsdGVyU3JjIiwia2V5IiwicHVzaCIsInZpZGVvIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJrZWVwQ291dCIsInNob3BwaW5nQ2FydENvdW50Iiwic29ydCIsImdvb2QxIiwiZ29vZDIiLCIkYXBwbHkiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwibWlzc1Rva2VuIiwiY2F0Y2giLCJzaG93RmFpbCIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJtYXJrVHlwZSIsIkdldE1hcmtVc2VyIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsImdldFN5c3RlbUluZm8iLCJ3aW5kb3dIZWlnaHQiLCJjcmVhdGVWaWRlb0NvbnRleHQiLCJhcHBseSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQXdFLDJCQUEwQixhQUFsRyxFQUFnSCx5QkFBd0IsVUFBeEksRUFBbUosc0JBQXFCLFlBQXhLLEVBQXFMLGlDQUFnQyxlQUFyTixFQUFxTyw2QkFBNEIsZ0JBQWpRLEVBQVYsRUFBNlIsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBaUQsMEJBQXlCLFNBQTFFLEVBQTNTLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLFlBQVcsTUFBWixFQUFtQixhQUFZLE1BQS9CLEVBQVYsRUFBaUQsZUFBYyxFQUFDLGlCQUFnQixVQUFqQixFQUE0QixrQkFBaUIsV0FBN0MsRUFBeUQsZ0JBQWUsU0FBeEUsRUFBa0YsaUJBQWdCLFVBQWxHLEVBQS9ELEUsU0FDVEMsVSxHQUFhO0FBQ1JDLGlDQURRO0FBRVJDLG1DQUZRO0FBR1JDLG9DQUhRO0FBSVJDO0FBSlEsSyxTQU1WQyxRLEdBQVc7QUFDVEMsZUFEUyx1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U0FBekM7QUFDQSxXQUFLb0IsUUFBTCxDQUFjLFlBQU07QUFDbEIsZ0JBQUtaLFFBQUwsR0FBZ0IsUUFBSzJCLE9BQUwsQ0FBYXVGLFdBQWIsRUFBaEI7QUFDQSxnQkFBS2pILFVBQUwsR0FBa0IsUUFBSzBCLE9BQUwsQ0FBYXdGLGFBQWIsRUFBbEI7QUFDQSxnQkFBS2pILGFBQUwsR0FBcUIsUUFBS3lCLE9BQUwsQ0FBYXlGLFVBQWIsRUFBckI7QUFDQSxnQkFBS2pILGNBQUwsR0FBc0IsUUFBS3dCLE9BQUwsQ0FBYTBGLFdBQWIsQ0FBeUIsT0FBekIsRUFBa0MsUUFBS3RILFdBQXZDLEVBQW9ELElBQXBELENBQXRCO0FBQ0EsZ0JBQUtlLGNBQUw7QUFDQSxnQkFBSzFCLFlBQUwsR0FBb0IsUUFBS3JDLFVBQUwsQ0FBZ0JRLFNBQXBDO0FBQ0QsT0FQRDtBQVFBLFdBQUsySSxNQUFMO0FBQ0Q7Ozs7RUF2ZmlDLGVBQUtvQixJOztrQkFBcEJ0TCxNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCIsXCJ2LWJpbmQ6bWVzc2FnZVBhdGguc3luY1wiOlwiY3VycmVudFBhdGhcIixcInYtYmluZDpuaWNrX25hbWUuc3luY1wiOlwidXNlck5hbWVcIixcInYtYmluZDphdmF0YXIuc3luY1wiOlwidXNlckF2YXRhclwiLFwidi1iaW5kOmN1c3RvbWVyX2luZm9fc3RyLnN5bmNcIjpcImN1c3RvbWVyX2luZm9cIixcInYtYmluZDpub3RlX2luZm9fc3RyLnN5bmNcIjpcImJ1c3NpbmVzc19pbmZvXCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIixcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjpcIm5vU2FsZXNcIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcnRSZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub1NhbGVzICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXSxcbiAgICAgICAgaW1hZ2VTcmM6IFtdXG4gICAgICB9LFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmM1ZTYwJ1xuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnICcsXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGlzQWRkQ2FydDogdHJ1ZSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJyxcbiAgICAgIG1hcmtJZDogJycsXG4gICAgICB1c2VyTGV2ZWw6IDAsXG4gICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICB2aWRlb0NvbnRleHQ6ICcnLFxuICAgICAgc2hvd1ZpZGVvOiB0cnVlLFxuICAgICAgc3dpcGVyU3RvcDogdHJ1ZSxcbiAgICAgIHJlZnJlbmNlQ29kZTogJycsXG4gICAgICBtZW1iZXJJZDogJycsXG4gICAgICBjdXJyZW50UGF0aDogJycsXG4gICAgICB1c2VyTmFtZTogJycsXG4gICAgICB1c2VyQXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm86IHtcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJycsXG4gICAgICAgICdsZXZlbCc6ICcnLFxuICAgICAgICAnY2VsbHBob25lcyc6IFtbJycsICcnXV1cbiAgICAgIH0sXG4gICAgICBidXNzaW5lc3NfaW5mbzoge1xuICAgICAgICAndGl0bGUnOiAnJ1xuICAgICAgfSxcbiAgICAgIHNrdUhlaWdodDogJycsXG4gICAgICB2aWRlb1NyYzogW11cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29sbGVjdCkge1xuICAgICAgICAgIHRoaXMuc2V0TWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5DYW5jZWxNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYXJ0IChhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgoKSA9PiB7XG4gICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZENhcnQnKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IHRydWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2FkZEJ1eScpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IHRydWVcbiAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgICAgdGhpcy5pbml0Q2FydFJlc3VsdCgpXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xvc2VDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwID8gMCA6IDFcbiAgICAgIH0sXG4gICAgICBwbHVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCA+IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWludXNDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtIC0tXG4gICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUNhcnQgKHZhbCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGJsdXJDYXJ0ICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwICYmIHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnRcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwID8gMCA6IDFcbiAgICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB9LFxuICAgICAgZ29DYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50ID4gMCkge1xuICAgICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkQ2FydENvdW50ICs9IHBhcnNlSW50KHRoaXMuY2FydE51bSlcbiAgICAgICAgICAgICAgLy8g5Y+R6YCB5re75Yqg6LSt54mp6L2m6K+35rGCXG4gICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWJ1eT9pZD0nICsgdGhpcy5jYXJ0UmVzdWx0LmlkICsgJyZ0eXBlPScgKyB0aGlzLmNhcnRSZXN1bHQudHlwZSArICcmY291bnQ9JyArIHRoaXMuY2FydE51bVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1J1bGVzICgpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3J1bGVzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBsYXlWaWRlbyAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN3aXBlclN0b3ApIHtcbiAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGxheSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdG9wVmlkZW8gKCkge1xuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVN3aXBlciAoKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyU3RvcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnNlZWsoMClcbiAgICAgIH0sXG4gICAgICBzd2lwZXJFbmQgKCkge1xuICAgICAgICB0aGlzLnN3aXBlclN0b3AgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZXJyb3JWaWRlbyAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aSreaUvuWksei0pe+8jOivt+eojeWAmemHjeivlScsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvSW1hZ2VMaW5rIChocmVmKSB7XG4gICAgICAgIGlmIChocmVmKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vbGluaz9ocmVmPScgKyBocmVmXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2FydERhdGEgKCkge1xuICAgICAgLy8g5b6A5ZCO5Y+w5Y+R6K+35rGC5riF56m66LSt54mp6L2m6YCJ6aG5XG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0ICgpIHtcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IFtdXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFswXSA6IHRoaXMuZGV0YWlsLmdvb2RMaXN0WzBdXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGV0YWlsLmdvb2RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQuaWQgPT09IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2ldLmlkKSB7XG4gICAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3RbaV0uaXNDaGVja2VkID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0W2ldLmlzQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsLmdvb2RMaXN0KVxuICAgICAgdGhpcy5jYXJ0TnVtID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyAxIDogMFxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oMCwgdGhpcy5yZWZyZW5jZUNvZGUpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzcHVJZDogdGhpcy5wYWdlSWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZXRhaWxIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFtdXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCAmJiByZXMuZGF0YS5kYXRhLmlzQWxsb3dTYWxlKSB7XG4gICAgICAgICAgX3RoaXMuaXNMb2FkZWQgPSB0cnVlXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKCFkYXRhLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIOa1i+ivleeUqOaIt+i6q+S7veWPmOWMllxuICAgICAgICAgIF90aGlzLiRwYXJlbnQucmVzZXRVc2VyTGV2ZWwoZGF0YS5tZW1iZXJIYXNoLCB0aGlzLnRva2VuLCAoKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy51c2VyTGV2ZWwgPSBfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICAgICAgICBfdGhpcy5tZW1iZXJJZCA9IF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5tZW1iZXJJZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnBhdGggPSBkYXRhLmNvdmVyXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnRpdGxlID0gZGF0YS50aXRsZVxuICAgICAgICAgIF90aGlzLmN1cnJlbnRQYXRoID0gZGF0YS50aXRsZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwub2xkcHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmRlc2NyaXB0ID0gZGF0YS5kZXNjXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnR5cGUgPSBkYXRhLnNvdXJjZVR5cGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuaWQgPSBkYXRhLnNvdXJjZUlkXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmNvbGxlY3RJZCA9IGRhdGEuY29sbGVjdGlvbklkXG4gICAgICAgICAgdmFyIHRlbXBTcmMgPSBKU09OLnBhcnNlKF90aGlzLiRwYXJlbnQuYmFzZTY0RGVjb2RlKGRhdGEuZGV0YWlsKSlcbiAgICAgICAgICB2YXIgZmlsdGVyU3JjID0gW11cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGVtcFNyYykge1xuICAgICAgICAgICAgZmlsdGVyU3JjLnB1c2godGVtcFNyY1trZXldKVxuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5kZXRhaWwuaW1hZ2VTcmMgPSBmaWx0ZXJTcmMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAvLyDov4fmu6R2aWRlb1xuICAgICAgICAgICAgcmV0dXJuICFpdGVtLnZpZGVvXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy52aWRlb1NyYyA9IGZpbHRlclNyYy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIC8vIOaPkOWPlnZpZGVvXG4gICAgICAgICAgICByZXR1cm4gaXRlbS52aWRlb1xuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKF90aGlzLnZpZGVvU3JjLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIF90aGlzLnN3aXBlck9wdC5pbmRpY2F0b3JEb3RzID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5zd2lwZXJPcHQuaW5kaWNhdG9yRG90cyA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLnZpZGVvU3JjKVxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEuc2t1cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICB0aGlzLnNrdUhlaWdodCA9IDMwMFxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLnNrdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5uYW1lID0gaXRlbS5wcm9kdWN0TmFtZSArIGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChfdGhpcy51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLm51bSA9IGl0ZW0ua2VlcENvdXRcbiAgICAgICAgICAgIGlmIChpdGVtLmtlZXBDb3V0ID4gMCkge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5jYXJ0Q291bnQgPSBpdGVtLnNob3BwaW5nQ2FydENvdW50XG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBfdGhpcy5kZXRhaWwuZ29vZExpc3QucHVzaChnb29kKVxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnNvcnQoKGdvb2QxLCBnb29kMikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gZ29vZDEucHJpY2UgLSBnb29kMi5wcmljZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDAgJiYgIXJlcy5kYXRhLmRhdGEuaXNBbGxvd1NhbGUpIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn6K+l5ZWG5ZOB5bey5LiL5p62JyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0RGF0YShjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIC8vIF90aGlzLmluaXREYXRhKF90aGlzLmluaXRDYXJ0UmVzdWx0KCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGdldE1hcmtVc2VyIChpZCwgdHlwZSkge1xuICAgICAgdGhpcy5jb2xsZWN0ZWRudW0gPSAnICdcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1VzZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY29sbGVjdGVkbnVtID0gZGF0YS5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgc2V0TWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuZGV0YWlsLnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmRldGFpbC5pZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8g6L2s5Y+RXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsLnRpdGxlLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2RldGFpbD9pZD0nICsgdGhpcy5wYWdlSWQgKyAnJnJlZnJlbmNlQ29kZT0nICsgdGhpcy5tZW1iZXJJZFxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICBpZiAoaWQucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gaWQucmVmcmVuY2VDb2RlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSB0cnVlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLnZpZGVvQ29udGV4dCA9IHdlcHkuY3JlYXRlVmlkZW9Db250ZXh0KCd2aWRlbycpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5pbml0RGF0YSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLnVzZXJBdmF0YXIgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfaW5mbyA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5idXNzaW5lc3NfaW5mbyA9IHRoaXMuJHBhcmVudC5nZXRCdXNpbmVzcygn5ZWG5ZOB6K+m5oOF6aG1JywgdGhpcy5jdXJyZW50UGF0aCwgbnVsbClcbiAgICAgICAgdGhpcy5pbml0Q2FydFJlc3VsdCgpXG4gICAgICAgIHRoaXMuYWRkQ2FydENvdW50ID0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudFxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==