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
        if (res.data.error === 0) {
          _this.isLoaded = true;
          var data = res.data.data;
          if (!data.collectionId) {
            _this.collect = false;
          } else {
            _this.collect = true;
          }
          // 测试用户身份变化
          _this.$parent.resetUserLevel(data.memberHash, _this7.token);
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

      this.userLevel = this.$parent.globalData.userLevel;
      this.memberId = this.$parent.globalData.memberId;
      this.methods.closeCart.apply(this);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJjYXJ0Q291bnQiLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwiaW1hZ2VTcmMiLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiZ29vZHNEZXRhaWwiLCJ0cmFuc3BvcnREZXRhaWwiLCJpc0xpbmsiLCJpc0FkZENhcnQiLCJhZGRDYXJ0Q291bnQiLCJjYXJ0TW9kYWwiLCJjb2xsZWN0SW1hZ2UiLCJtYXJrSWQiLCJ1c2VyTGV2ZWwiLCJpc0xvYWRlZCIsInZpZGVvQ29udGV4dCIsInNob3dWaWRlbyIsInN3aXBlclN0b3AiLCJyZWZyZW5jZUNvZGUiLCJtZW1iZXJJZCIsImN1cnJlbnRQYXRoIiwidXNlck5hbWUiLCJ1c2VyQXZhdGFyIiwiY3VzdG9tZXJfaW5mbyIsImJ1c3NpbmVzc19pbmZvIiwic2t1SGVpZ2h0IiwidmlkZW9TcmMiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsImluaXREYXRhIiwicGF1c2UiLCJpbml0Q2FydFJlc3VsdCIsImNsb3NlQ2FydCIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsIiRwYXJlbnQiLCJwYWdlUm9vdCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsInR5cGUiLCJnb1J1bGVzIiwicGxheVZpZGVvIiwicGxheSIsInN0b3BWaWRlbyIsImNoYW5nZVN3aXBlciIsInNlZWsiLCJzd2lwZXJFbmQiLCJlcnJvclZpZGVvIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwicmVzIiwiZ29JbWFnZUxpbmsiLCJocmVmIiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJpIiwiaXNDaGVja2VkIiwiY29uc29sZSIsImxvZyIsImNiIiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwic3B1SWQiLCJIdHRwUmVxdWVzdCIsIkRldGFpbEh0dHAiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJlcnJvciIsImNvbGxlY3Rpb25JZCIsInJlc2V0VXNlckxldmVsIiwibWVtYmVySGFzaCIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJ0ZW1wU3JjIiwiSlNPTiIsInBhcnNlIiwiYmFzZTY0RGVjb2RlIiwiZmlsdGVyU3JjIiwia2V5IiwicHVzaCIsInZpZGVvIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJrZWVwQ291dCIsInNob3BwaW5nQ2FydENvdW50Iiwic29ydCIsImdvb2QxIiwiZ29vZDIiLCIkYXBwbHkiLCJtaXNzVG9rZW4iLCJjYXRjaCIsInNob3dGYWlsIiwiY291bnQiLCJBZGRDYXJ0SHR0cCIsIm1hcmtUeXBlIiwiR2V0TWFya1VzZXIiLCJTZXRNYXJrSHR0cCIsIkNhbmNlbE1hcmtIdHRwIiwiZ2V0U3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsImdsb2JhbERhdGEiLCJhcHBseSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsdUJBQXNCLGNBQXpELEVBQXdFLDJCQUEwQixhQUFsRyxFQUFnSCx5QkFBd0IsVUFBeEksRUFBbUosc0JBQXFCLFlBQXhLLEVBQXFMLGlDQUFnQyxlQUFyTixFQUFxTyw2QkFBNEIsZ0JBQWpRLEVBQVYsRUFBNlIsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBaUQsMEJBQXlCLFNBQTFFLEVBQTNTLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLFlBQVcsTUFBWixFQUFtQixhQUFZLE1BQS9CLEVBQVYsRUFBaUQsZUFBYyxFQUFDLGlCQUFnQixVQUFqQixFQUE0QixrQkFBaUIsV0FBN0MsRUFBeUQsZ0JBQWUsU0FBeEUsRUFBa0YsaUJBQWdCLFVBQWxHLEVBQS9ELEUsU0FDVEMsVSxHQUFhO0FBQ1JDLGlDQURRO0FBRVJDLG1DQUZRO0FBR1JDLG9DQUhRO0FBSVJDO0FBSlEsSyxTQU1WQyxRLEdBQVc7QUFDVEMsZUFEUyx1QkFDSTtBQUNYLFlBQUlDLE9BQU9DLElBQVAsQ0FBWSxLQUFLQyxV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b3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEJvdHRvbSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbWJhcidcbiAgaW1wb3J0IENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IE1lbnUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImJvdHRvbVwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjYXJ0VmFsLnN5bmNcIjpcImFkZENhcnRDb3VudFwiLFwidi1iaW5kOm1lc3NhZ2VQYXRoLnN5bmNcIjpcImN1cnJlbnRQYXRoXCIsXCJ2LWJpbmQ6bmlja19uYW1lLnN5bmNcIjpcInVzZXJOYW1lXCIsXCJ2LWJpbmQ6YXZhdGFyLnN5bmNcIjpcInVzZXJBdmF0YXJcIixcInYtYmluZDpjdXN0b21lcl9pbmZvX3N0ci5zeW5jXCI6XCJjdXN0b21lcl9pbmZvXCIsXCJ2LWJpbmQ6bm90ZV9pbmZvX3N0ci5zeW5jXCI6XCJidXNzaW5lc3NfaW5mb1wifSxcImNvdW50ZXJDYXJ0XCI6e1wiY2xhc3NcIjpcImNhbGN1bGF0ZVwiLFwidi1iaW5kOm51bS5zeW5jXCI6XCJjYXJ0TnVtXCIsXCJ2LWJpbmQ6aXNEaXNhYmxlZC5zeW5jXCI6XCJub1NhbGVzXCJ9fTtcclxuJGV2ZW50cyA9IHtcImJvdHRvbVwiOntcInYtb246YnV5XCI6XCJjYXJ0XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQ2FydFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDYXJ0XCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWludXNDYXJ0XCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNhcnRcIixcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDYXJ0XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBib3R0b206IEJvdHRvbSxcbiAgICAgIGNvdW50ZXJCdXk6IENvdW50LFxuICAgICAgY291bnRlckNhcnQ6IENvdW50LFxuICAgICAgbWVudUxpc3Q6IE1lbnVcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICB0b3RhbENhcnQgKCkge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYXJ0UmVzdWx0KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIHByaWNlID0gdGhpcy5jYXJ0UmVzdWx0LnByaWNlLnJlcGxhY2UoLywvZywgJycpICogdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgcmV0dXJuIHByaWNlLnRvRml4ZWQoMilcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1heHRpcCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnROdW0gPj0gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbm9TYWxlcyAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgcHJpY2U6ICcnLFxuICAgICAgICBvbGRwcmljZTogJycsXG4gICAgICAgIGV4cHJlc3M6ICczOC4wJyxcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBnb29kTGlzdDogW10sXG4gICAgICAgIGltYWdlU3JjOiBbXVxuICAgICAgfSxcbiAgICAgIHN3aXBlck9wdDoge1xuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIGludGVydmFsOiAzMDAwLFxuICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBpbmRpY2F0b3JEb3RzOiBmYWxzZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZjNWU2MCdcbiAgICAgIH0sXG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlSWQ6ICcnLFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pyq5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogJyAnLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBpc0FkZENhcnQ6IHRydWUsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYWRkQ2FydENvdW50OiAwLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZycsXG4gICAgICBtYXJrSWQ6ICcnLFxuICAgICAgdXNlckxldmVsOiAwLFxuICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgdmlkZW9Db250ZXh0OiAnJyxcbiAgICAgIHNob3dWaWRlbzogdHJ1ZSxcbiAgICAgIHN3aXBlclN0b3A6IHRydWUsXG4gICAgICByZWZyZW5jZUNvZGU6ICcnLFxuICAgICAgbWVtYmVySWQ6ICcnLFxuICAgICAgY3VycmVudFBhdGg6ICcnLFxuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlckF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICcnLFxuICAgICAgICAnbGV2ZWwnOiAnJyxcbiAgICAgICAgJ2NlbGxwaG9uZXMnOiBbWycnLCAnJ11dXG4gICAgICB9LFxuICAgICAgYnVzc2luZXNzX2luZm86IHtcbiAgICAgICAgJ3RpdGxlJzogJydcbiAgICAgIH0sXG4gICAgICBza3VIZWlnaHQ6ICcnLFxuICAgICAgdmlkZW9TcmM6IFtdXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjb2xsZWN0VGFwICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLnNldE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FydCAoYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRDYXJ0Jykge1xuICAgICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdhZGRCdXknKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQgPiAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtICsrXG4gICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablh4/lsJHmlbDph49cbiAgICAgIH0sXG4gICAgICBrZXlDYXJ0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBibHVyQ2FydCAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCAmJiB0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBhZGRDYXJ0R29vZHMgKGUpIHtcbiAgICAgICAgLy8g5Y+R6YCB6YCJ5Lit57uT5p6cXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCA+IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCkge1xuICAgICAgICAgICAgICB0aGlzLmFkZENhcnRDb3VudCArPSBwYXJzZUludCh0aGlzLmNhcnROdW0pXG4gICAgICAgICAgICAgIC8vIOWPkemAgea3u+WKoOi0reeJqei9puivt+axglxuICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSBmYWxzZVxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9wYXlidXk/aWQ9JyArIHRoaXMuY2FydFJlc3VsdC5pZCArICcmdHlwZT0nICsgdGhpcy5jYXJ0UmVzdWx0LnR5cGUgKyAnJmNvdW50PScgKyB0aGlzLmNhcnROdW1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBwbGF5VmlkZW8gKCkge1xuICAgICAgICBpZiAodGhpcy5zd2lwZXJTdG9wKSB7XG4gICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSBmYWxzZVxuICAgICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBsYXkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3RvcFZpZGVvICgpIHtcbiAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VTd2lwZXIgKCkge1xuICAgICAgICB0aGlzLnN3aXBlclN0b3AgPSBmYWxzZVxuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5zZWVrKDApXG4gICAgICB9LFxuICAgICAgc3dpcGVyRW5kICgpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJTdG9wID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGVycm9yVmlkZW8gKCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmkq3mlL7lpLHotKXvvIzor7fnqI3lgJnph43or5UnLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0ltYWdlTGluayAoaHJlZikge1xuICAgICAgICBpZiAoaHJlZikge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL2xpbms/aHJlZj0nICsgaHJlZlxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSBbXVxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB0aGlzLmRldGFpbC5nb29kTGlzdFswXVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRldGFpbC5nb29kTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0LmlkID09PSB0aGlzLmRldGFpbC5nb29kTGlzdFtpXS5pZCkge1xuICAgICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0W2ldLmlzQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdFtpXS5pc0NoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmRldGFpbC5nb29kTGlzdClcbiAgICAgIHRoaXMuY2FydE51bSA9IHJlc3VsdC5sZW5ndGggPiAwID8gMSA6IDBcbiAgICB9XG4gICAgaW5pdERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKDAsIHRoaXMucmVmcmVuY2VDb2RlKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc3B1SWQ6IHRoaXMucGFnZUlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGV0YWlsSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pc0xvYWRlZCA9IHRydWVcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoIWRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5rWL6K+V55So5oi36Lqr5Lu95Y+Y5YyWXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5yZXNldFVzZXJMZXZlbChkYXRhLm1lbWJlckhhc2gsIHRoaXMudG9rZW4pXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnBhdGggPSBkYXRhLmNvdmVyXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnRpdGxlID0gZGF0YS50aXRsZVxuICAgICAgICAgIF90aGlzLmN1cnJlbnRQYXRoID0gZGF0YS50aXRsZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wcmljZSA9IGRhdGEubWVtYmVyUHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwub2xkcHJpY2UgPSBkYXRhLnByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnJlZHVjdGlvbiA9IGRhdGEucmVkdWN0aW9uXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmRlc2NyaXB0ID0gZGF0YS5kZXNjXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnR5cGUgPSBkYXRhLnNvdXJjZVR5cGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuaWQgPSBkYXRhLnNvdXJjZUlkXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmNvbGxlY3RJZCA9IGRhdGEuY29sbGVjdGlvbklkXG4gICAgICAgICAgdmFyIHRlbXBTcmMgPSBKU09OLnBhcnNlKF90aGlzLiRwYXJlbnQuYmFzZTY0RGVjb2RlKGRhdGEuZGV0YWlsKSlcbiAgICAgICAgICB2YXIgZmlsdGVyU3JjID0gW11cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGVtcFNyYykge1xuICAgICAgICAgICAgZmlsdGVyU3JjLnB1c2godGVtcFNyY1trZXldKVxuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5kZXRhaWwuaW1hZ2VTcmMgPSBmaWx0ZXJTcmMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAvLyDov4fmu6R2aWRlb1xuICAgICAgICAgICAgcmV0dXJuICFpdGVtLnZpZGVvXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy52aWRlb1NyYyA9IGZpbHRlclNyYy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIC8vIOaPkOWPlnZpZGVvXG4gICAgICAgICAgICByZXR1cm4gaXRlbS52aWRlb1xuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKF90aGlzLnZpZGVvU3JjLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIF90aGlzLnN3aXBlck9wdC5pbmRpY2F0b3JEb3RzID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5zd2lwZXJPcHQuaW5kaWNhdG9yRG90cyA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLnZpZGVvU3JjKVxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEuc2t1cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICB0aGlzLnNrdUhlaWdodCA9IDMwMFxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLnNrdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5uYW1lID0gaXRlbS5wcm9kdWN0TmFtZSArIGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChfdGhpcy51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLm51bSA9IGl0ZW0ua2VlcENvdXRcbiAgICAgICAgICAgIGlmIChpdGVtLmtlZXBDb3V0ID4gMCkge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5jYXJ0Q291bnQgPSBpdGVtLnNob3BwaW5nQ2FydENvdW50XG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBfdGhpcy5kZXRhaWwuZ29vZExpc3QucHVzaChnb29kKVxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnNvcnQoKGdvb2QxLCBnb29kMikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gZ29vZDEucHJpY2UgLSBnb29kMi5wcmljZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLmNhcnRSZXN1bHQudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuY2FydFJlc3VsdC5pZCxcbiAgICAgICAgY291bnQ6IHRoaXMuY2FydE51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgLy8gX3RoaXMuaW5pdERhdGEoX3RoaXMuaW5pdENhcnRSZXN1bHQoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0TWFya1VzZXIgKGlkLCB0eXBlKSB7XG4gICAgICB0aGlzLmNvbGxlY3RlZG51bSA9ICcgJ1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0eXBlLFxuICAgICAgICBzb3VyY2VJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrVXNlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5jb2xsZWN0ZWRudW0gPSBkYXRhLmxlbmd0aFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBzZXRNYXJrIChjYikge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5kZXRhaWwudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuZGV0YWlsLmlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2V0TWFya0h0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLm1hcmtJZCA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBDYW5jZWxNYXJrIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogdGhpcy5tYXJrSWQgfHwgdGhpcy5kZXRhaWwuY29sbGVjdElkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyDovazlj5FcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGhpcy5kZXRhaWwudGl0bGUsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvZGV0YWlsP2lkPScgKyB0aGlzLnBhZ2VJZCArICcmcmVmcmVuY2VDb2RlPScgKyB0aGlzLm1lbWJlcklkXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoaWQpIHtcbiAgICAgIHRoaXMucGFnZUlkID0gaWQuaWRcbiAgICAgIGlmIChpZC5yZWZyZW5jZUNvZGUpIHtcbiAgICAgICAgdGhpcy5yZWZyZW5jZUNvZGUgPSBpZC5yZWZyZW5jZUNvZGVcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblJlYWR5ICgpIHtcbiAgICAgIHRoaXMudmlkZW9Db250ZXh0ID0gd2VweS5jcmVhdGVWaWRlb0NvbnRleHQoJ3ZpZGVvJylcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLm1lbWJlcklkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEubWVtYmVySWRcbiAgICAgIHRoaXMubWV0aG9kcy5jbG9zZUNhcnQuYXBwbHkodGhpcylcbiAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50LmdldFVzZXJOYW1lKClcbiAgICAgICAgdGhpcy51c2VyQXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgICB0aGlzLmN1c3RvbWVyX2luZm8gPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgpXG4gICAgICAgIHRoaXMuYnVzc2luZXNzX2luZm8gPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+WVhuWTgeivpuaDhemhtScsIHRoaXMuY3VycmVudFBhdGgsIG51bGwpXG4gICAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoKVxuICAgICAgICB0aGlzLmFkZENhcnRDb3VudCA9IHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnRcbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=