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

var _recommend = require('./../components/recommend.js');

var _recommend2 = _interopRequireDefault(_recommend);

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
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "v-bind:cartVal.sync": "addCartCount", "v-bind:messagePath.sync": "currentPath", "v-bind:nick_name.sync": "userName", "v-bind:avatar.sync": "userAvatar", "v-bind:customer_info_str.sync": "customer_info", "v-bind:note_info_str.sync": "bussiness_info" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum", "v-bind:isDisabled.sync": "noSales" }, "recGoods": { "xmlns:v-bind": "", "v-bind:recommendList.sync": "recgoodList", "v-bind:userLevel.sync": "userLevel", "xmlns:v-on": "" } }, _this2.$events = { "bottom": { "v-on:buy": "cart", "v-on:cart": "cart" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart", "v-on:keyEdit": "keyCart", "v-on:blurEdit": "blurCart" }, "recGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      bottom: _bottombar2.default,
      counterBuy: _counter2.default,
      counterCart: _counter2.default,
      menuList: _menu2.default,
      recGoods: _recommend2.default
    }, _this2.computed = {
      totalCart: function totalCart() {
        if (this.cartResult && Object.keys(this.cartResult).length > 0) {
          var price = this.cartResult.price.replace(/,/g, '') * this.cartNum;
          return price.toFixed(2);
        }
      },
      maxtip: function maxtip() {
        if (!this.buttonDisable) {
          return false;
        } else {
          if (this.isAddCart) {
            if (this.cartNum >= this.cartResult.num - this.cartResult.cartCount) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.cartNum >= this.cartResult.num) {
              return true;
            } else {
              return false;
            }
          }
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
      videoSrc: [],
      hasVideo: false,
      recgoodList: [],
      buttonDisable: true
    }, _this2.methods = {
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      },
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
        if (this.buttonDisable) {
          if (this.isAddCart) {
            if (this.cartResult.num - this.cartResult.cartCount > 0) {
              this.cartNum++;
              if (this.cartNum > this.cartResult.num - this.cartResult.cartCount) {
                this.cartNum = this.cartResult.num - this.cartResult.cartCount;
              }
            }
          } else {
            this.cartNum++;
            if (this.cartNum > this.cartResult.num) {
              this.cartNum = this.cartResult.num;
            }
          }
        }
      },
      minusCart: function minusCart() {
        if (this.buttonDisable) {
          if (this.cartResult.num > 0) {
            this.cartNum--;
            if (this.cartNum <= 0) {
              this.cartNum = 1;
            }
          }
        }
        // 发送购物车减少数量
      },
      keyCart: function keyCart(val) {
        this.cartNum = val;
        return this.cartNum;
      },
      blurCart: function blurCart(val) {
        if (val <= 0 || !this.buttonDisable) {
          this.cartNum = 1;
        } else if (this.isAddCart && this.cartResult.num > 0 && this.cartNum > this.cartResult.num - this.cartResult.cartCount) {
          this.cartNum = 1;
        } else if (!this.isAddCart && this.cartResult.num > 0 && this.cartNum > this.cartResult.num) {
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
        var _this5 = this;

        if (this.buttonDisable) {
          if (this.isAddCart) {
            if (this.cartResult.num - this.cartResult.cartCount > 0) {
              this.overflow = false;
              this.cartModal = false;
              if (this.cartNum <= this.cartResult.num - this.cartResult.cartCount) {
                this.addCartCount += parseInt(this.cartNum);
                // 发送添加购物车请求
                this.addCartData(function () {
                  _this5.cartNum = _this5.cartResult.num <= 0 ? 0 : 1;
                });
              }
            }
          } else {
            this.$parent.pageRoot = false;
            _wepy2.default.navigateTo({
              url: './paybuy?id=' + this.cartResult.id + '&type=' + this.cartResult.type + '&count=' + this.cartNum
            });
            this.methods.closeCart.apply(this);
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
        return item.checked && item.isAllowSale;
      });
      this.cartResult = result.length > 0 ? result[0] : this.detail.goodList[0];
      for (var i = 0; i < this.detail.goodList.length; i++) {
        if (this.cartResult.id === this.detail.goodList[i].id) {
          this.detail.goodList[i].isChecked = true;
        } else {
          this.detail.goodList[i].isChecked = false;
        }
      }
      this.cartNum = 1;
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
            _this.hasVideo = true;
          } else {
            _this.swiperOpt.indicatorDots = false;
            _this.hasVideo = false;
          }
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
            good.isAllowSale = item.isAllowSale;
            _this.detail.goodList.push(good);
            _this.$apply();
          });
          var disableList = _this.detail.goodList.filter(function (item) {
            return !item.isAllowSale;
          });
          if (disableList.length === data.skus.length) {
            _this.buttonDisable = false;
          }
          // SKU按价钱排序
          _this.detail.goodList.sort(function (good1, good2) {
            return parseInt(good1.price.replace(/,/g, '')) - parseInt(good2.price.replace(/,/g, ''));
          });
          cb && cb();
        } else if (res.data.error === 0 && !res.data.data.isAllowSale || res.data.error === -1 && res.data.msg === 'miss spu') {
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
    key: 'getRecommend',
    value: function getRecommend() {
      var _this8 = this;

      this.token = this.$parent.getToken();
      this.recgoodList = [];
      var data = {
        token: this.token,
        spuId: this.pageId
      };
      this.$parent.HttpRequest.GetRecommend(data).then(function (res) {
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.cover = item.cover;
            obj.title = item.title;
            obj.price = item.memberPrice;
            obj.oldprice = item.price;
            obj.id = item.sourceId;
            _this8.recgoodList.push(obj);
          });
        } else {
          if (_this8.$parent.missToken) {
            _this8.token = _this8.$parent.getToken(res.data.error);
            _this8.getRecommend();
          }
        }
        _this8.$apply();
      }).catch(function () {
        _this8.$parent.showFail();
      });
    }
  }, {
    key: 'addCartData',
    value: function addCartData(cb) {
      var _this9 = this;

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
            _this.token = _this9.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'getMarkUser',
    value: function getMarkUser(id, type) {
      var _this10 = this;

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
            _this.token = _this10.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'setMark',
    value: function setMark(cb) {
      var _this11 = this;

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
        _this11.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.markId = res.data.data;
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
  }, {
    key: 'CancelMark',
    value: function CancelMark(cb) {
      var _this12 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        markId: this.markId || this.detail.collectId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        _this12.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.getMarkUser(_this.detail.id, _this12.detail.type);
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this12.$parent.getToken(res.data.error);
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
      this.getRecommend();
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
      var _this13 = this;

      this.methods.closeCart.apply(this);
      this.userLevel = this.$parent.globalData.userLevel;
      this.initData(function () {
        _this13.userName = _this13.$parent.getUserName();
        _this13.userAvatar = _this13.$parent.getUserAvatar();
        _this13.customer_info = _this13.$parent.getMessage();
        _this13.bussiness_info = _this13.$parent.getBusiness('商品详情页', _this13.currentPath, null);
        _this13.initCartResult();
        console.log(_this13.cartResult);
        _this13.addCartCount = _this13.cartResult.cartCount;
      });
      this.$apply();
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      var pages = this.getCurrentPages();
      if (pages[pages.length - 2].data.pageId) {
        this.pageId = pages[pages.length - 2].data.pageId;
      }
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJyZWNHb29kcyIsImNvbXB1dGVkIiwidG90YWxDYXJ0IiwiY2FydFJlc3VsdCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsImJ1dHRvbkRpc2FibGUiLCJpc0FkZENhcnQiLCJudW0iLCJjYXJ0Q291bnQiLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwiaW1hZ2VTcmMiLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwidXNlckxldmVsIiwiaXNMb2FkZWQiLCJ2aWRlb0NvbnRleHQiLCJzaG93VmlkZW8iLCJzd2lwZXJTdG9wIiwicmVmcmVuY2VDb2RlIiwibWVtYmVySWQiLCJjdXJyZW50UGF0aCIsInVzZXJOYW1lIiwidXNlckF2YXRhciIsImN1c3RvbWVyX2luZm8iLCJidXNzaW5lc3NfaW5mbyIsInNrdUhlaWdodCIsInZpZGVvU3JjIiwiaGFzVmlkZW8iLCJyZWNnb29kTGlzdCIsIm1ldGhvZHMiLCJnb0RldGFpbCIsImlkIiwibmF2aWdhdGVUbyIsInVybCIsImNvbGxlY3RUYXAiLCJzZXRNYXJrIiwiQ2FuY2VsTWFyayIsImNhcnQiLCJhY3Rpb24iLCJpbml0RGF0YSIsInBhdXNlIiwiaW5pdENhcnRSZXN1bHQiLCJjbG9zZUNhcnQiLCJwbHVzQ2FydCIsIm1pbnVzQ2FydCIsImtleUNhcnQiLCJ2YWwiLCJibHVyQ2FydCIsImFkZENhcnRHb29kcyIsImUiLCJ2YWx1ZSIsImdvQ2FydCIsInBhcnNlSW50IiwiYWRkQ2FydERhdGEiLCIkcGFyZW50IiwicGFnZVJvb3QiLCJ0eXBlIiwiYXBwbHkiLCJnb1J1bGVzIiwicGxheVZpZGVvIiwicGxheSIsInN0b3BWaWRlbyIsImNoYW5nZVN3aXBlciIsInNlZWsiLCJzd2lwZXJFbmQiLCJlcnJvclZpZGVvIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwicmVzIiwiZ29JbWFnZUxpbmsiLCJocmVmIiwicmVzdWx0IiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrZWQiLCJpc0FsbG93U2FsZSIsImkiLCJpc0NoZWNrZWQiLCJjYiIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsInNwdUlkIiwiSHR0cFJlcXVlc3QiLCJEZXRhaWxIdHRwIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImVycm9yIiwiY29sbGVjdGlvbklkIiwicmVzZXRVc2VyTGV2ZWwiLCJtZW1iZXJIYXNoIiwiZ2xvYmFsRGF0YSIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJ0ZW1wU3JjIiwiSlNPTiIsInBhcnNlIiwiYmFzZTY0RGVjb2RlIiwiZmlsdGVyU3JjIiwia2V5IiwicHVzaCIsInZpZGVvIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJrZWVwQ291dCIsInNob3BwaW5nQ2FydENvdW50IiwiJGFwcGx5IiwiZGlzYWJsZUxpc3QiLCJzb3J0IiwiZ29vZDEiLCJnb29kMiIsIm1zZyIsImNvbmZpcm0iLCJuYXZpZ2F0ZUJhY2siLCJtaXNzVG9rZW4iLCJjYXRjaCIsInNob3dGYWlsIiwiR2V0UmVjb21tZW5kIiwib2JqIiwiZ2V0UmVjb21tZW5kIiwiY291bnQiLCJBZGRDYXJ0SHR0cCIsIm1hcmtUeXBlIiwiR2V0TWFya1VzZXIiLCJTZXRNYXJrSHR0cCIsIkNhbmNlbE1hcmtIdHRwIiwiZ2V0U3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsdUJBQXNCLGNBQXZCLEVBQXNDLDJCQUEwQixhQUFoRSxFQUE4RSx5QkFBd0IsVUFBdEcsRUFBaUgsc0JBQXFCLFlBQXRJLEVBQW1KLGlDQUFnQyxlQUFuTCxFQUFtTSw2QkFBNEIsZ0JBQS9OLEVBQVYsRUFBMlAsZUFBYyxFQUFDLFNBQVEsV0FBVCxFQUFxQixtQkFBa0IsU0FBdkMsRUFBaUQsMEJBQXlCLFNBQTFFLEVBQXpRLEVBQThWLFlBQVcsRUFBQyxnQkFBZSxFQUFoQixFQUFtQiw2QkFBNEIsYUFBL0MsRUFBNkQseUJBQXdCLFdBQXJGLEVBQWlHLGNBQWEsRUFBOUcsRUFBelcsRSxTQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsWUFBVyxNQUFaLEVBQW1CLGFBQVksTUFBL0IsRUFBVixFQUFpRCxlQUFjLEVB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TUFBTUEsTUFBTTVLLE1BQU4sR0FBZSxDQUFyQixFQUF3QlcsSUFBeEIsQ0FBNkJpQixNQUEzQztBQUNEO0FBQ0Y7Ozs7RUFsakJpQyxlQUFLa0osSTs7a0JBQXBCL0wsTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEJvdHRvbSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbWJhcidcbiAgaW1wb3J0IENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IE1lbnUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51J1xuICBpbXBvcnQgUmVjR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvbW1lbmQnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1widi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCIsXCJ2LWJpbmQ6bWVzc2FnZVBhdGguc3luY1wiOlwiY3VycmVudFBhdGhcIixcInYtYmluZDpuaWNrX25hbWUuc3luY1wiOlwidXNlck5hbWVcIixcInYtYmluZDphdmF0YXIuc3luY1wiOlwidXNlckF2YXRhclwiLFwidi1iaW5kOmN1c3RvbWVyX2luZm9fc3RyLnN5bmNcIjpcImN1c3RvbWVyX2luZm9cIixcInYtYmluZDpub3RlX2luZm9fc3RyLnN5bmNcIjpcImJ1c3NpbmVzc19pbmZvXCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIixcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjpcIm5vU2FsZXNcIn0sXCJyZWNHb29kc1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cmVjb21tZW5kTGlzdC5zeW5jXCI6XCJyZWNnb29kTGlzdFwiLFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6XCJ1c2VyTGV2ZWxcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiY2FydFwiLFwidi1vbjpjYXJ0XCI6XCJjYXJ0XCJ9LFwiY291bnRlckNhcnRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ2FydFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQ2FydFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDYXJ0XCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ2FydFwifSxcInJlY0dvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudSxcbiAgICAgIHJlY0dvb2RzOiBSZWNHb29kc1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQgJiYgT2JqZWN0LmtleXModGhpcy5jYXJ0UmVzdWx0KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIHByaWNlID0gdGhpcy5jYXJ0UmVzdWx0LnByaWNlLnJlcGxhY2UoLywvZywgJycpICogdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgcmV0dXJuIHByaWNlLnRvRml4ZWQoMilcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1heHRpcCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5idXR0b25EaXNhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNBZGRDYXJ0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID49IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub1NhbGVzICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXSxcbiAgICAgICAgaW1hZ2VTcmM6IFtdXG4gICAgICB9LFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmM1ZTYwJ1xuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnICcsXG4gICAgICBpc0FkZENhcnQ6IHRydWUsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYWRkQ2FydENvdW50OiAwLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZycsXG4gICAgICBtYXJrSWQ6ICcnLFxuICAgICAgdXNlckxldmVsOiAwLFxuICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgdmlkZW9Db250ZXh0OiAnJyxcbiAgICAgIHNob3dWaWRlbzogdHJ1ZSxcbiAgICAgIHN3aXBlclN0b3A6IHRydWUsXG4gICAgICByZWZyZW5jZUNvZGU6ICcnLFxuICAgICAgbWVtYmVySWQ6ICcnLFxuICAgICAgY3VycmVudFBhdGg6ICcnLFxuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlckF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICcnLFxuICAgICAgICAnbGV2ZWwnOiAnJyxcbiAgICAgICAgJ2NlbGxwaG9uZXMnOiBbWycnLCAnJ11dXG4gICAgICB9LFxuICAgICAgYnVzc2luZXNzX2luZm86IHtcbiAgICAgICAgJ3RpdGxlJzogJydcbiAgICAgIH0sXG4gICAgICBza3VIZWlnaHQ6ICcnLFxuICAgICAgdmlkZW9TcmM6IFtdLFxuICAgICAgaGFzVmlkZW86IGZhbHNlLFxuICAgICAgcmVjZ29vZExpc3Q6IFtdLFxuICAgICAgYnV0dG9uRGlzYWJsZTogdHJ1ZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5zZXRNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLkNhbmNlbE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhcnQgKGFjdGlvbikge1xuICAgICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkQ2FydCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnYWRkQnV5Jykge1xuICAgICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm92ZXJmbG93ID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKClcbiAgICAgICAgICB0aGlzLmluaXRDYXJ0UmVzdWx0KClcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgfSxcbiAgICAgIHBsdXNDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uRGlzYWJsZSkge1xuICAgICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50ID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW51c0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5idXR0b25EaXNhYmxlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhcnROdW0gLS1cbiAgICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puWHj+WwkeaVsOmHj1xuICAgICAgfSxcbiAgICAgIGtleUNhcnQgKHZhbCkge1xuICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGJsdXJDYXJ0ICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA8PSAwIHx8ICF0aGlzLmJ1dHRvbkRpc2FibGUpIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0FkZENhcnQgJiYgdGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDAgJiYgdGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQpIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNBZGRDYXJ0ICYmIHRoaXMuY2FydFJlc3VsdC5udW0gPiAwICYmIHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBhZGRDYXJ0R29vZHMgKGUpIHtcbiAgICAgICAgLy8g5Y+R6YCB6YCJ5Lit57uT5p6cXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2UuZGV0YWlsLnZhbHVlXVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbkRpc2FibGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoaXMuY2FydE1vZGFsID0gZmFsc2VcbiAgICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydENvdW50ICs9IHBhcnNlSW50KHRoaXMuY2FydE51bSlcbiAgICAgICAgICAgICAgICAvLyDlj5HpgIHmt7vliqDotK3nianovabor7fmsYJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSBmYWxzZVxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9wYXlidXk/aWQ9JyArIHRoaXMuY2FydFJlc3VsdC5pZCArICcmdHlwZT0nICsgdGhpcy5jYXJ0UmVzdWx0LnR5cGUgKyAnJmNvdW50PScgKyB0aGlzLmNhcnROdW1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBwbGF5VmlkZW8gKCkge1xuICAgICAgICBpZiAodGhpcy5zd2lwZXJTdG9wKSB7XG4gICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSBmYWxzZVxuICAgICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBsYXkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3RvcFZpZGVvICgpIHtcbiAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VTd2lwZXIgKCkge1xuICAgICAgICB0aGlzLnN3aXBlclN0b3AgPSBmYWxzZVxuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5zZWVrKDApXG4gICAgICB9LFxuICAgICAgc3dpcGVyRW5kICgpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJTdG9wID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGVycm9yVmlkZW8gKCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmkq3mlL7lpLHotKXvvIzor7fnqI3lgJnph43or5UnLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0ltYWdlTGluayAoaHJlZikge1xuICAgICAgICBpZiAoaHJlZikge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL2xpbms/aHJlZj0nICsgaHJlZlxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSBbXVxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkICYmIGl0ZW0uaXNBbGxvd1NhbGVcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFswXSA6IHRoaXMuZGV0YWlsLmdvb2RMaXN0WzBdXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGV0YWlsLmdvb2RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQuaWQgPT09IHRoaXMuZGV0YWlsLmdvb2RMaXN0W2ldLmlkKSB7XG4gICAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3RbaV0uaXNDaGVja2VkID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0W2ldLmlzQ2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICB9XG4gICAgaW5pdERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKDAsIHRoaXMucmVmcmVuY2VDb2RlKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc3B1SWQ6IHRoaXMucGFnZUlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGV0YWlsSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDAgJiYgcmVzLmRhdGEuZGF0YS5pc0FsbG93U2FsZSkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGVkID0gdHJ1ZVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmICghZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICAgICAgX3RoaXMudXNlckxldmVsID0gX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgICAgICAgX3RoaXMubWVtYmVySWQgPSBfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEubWVtYmVySWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wYXRoID0gZGF0YS5jb3ZlclxuICAgICAgICAgIF90aGlzLmRldGFpbC50aXRsZSA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5jdXJyZW50UGF0aCA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLm9sZHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5yZWR1Y3Rpb24gPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmRldGFpbC5kZXNjcmlwdCA9IGRhdGEuZGVzY1xuICAgICAgICAgIF90aGlzLmRldGFpbC50eXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgICAgIF90aGlzLmRldGFpbC5jb2xsZWN0SWQgPSBkYXRhLmNvbGxlY3Rpb25JZFxuICAgICAgICAgIHZhciB0ZW1wU3JjID0gSlNPTi5wYXJzZShfdGhpcy4kcGFyZW50LmJhc2U2NERlY29kZShkYXRhLmRldGFpbCkpXG4gICAgICAgICAgdmFyIGZpbHRlclNyYyA9IFtdXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHRlbXBTcmMpIHtcbiAgICAgICAgICAgIGZpbHRlclNyYy5wdXNoKHRlbXBTcmNba2V5XSlcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmltYWdlU3JjID0gZmlsdGVyU3JjLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgLy8g6L+H5rukdmlkZW9cbiAgICAgICAgICAgIHJldHVybiAhaXRlbS52aWRlb1xuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMudmlkZW9TcmMgPSBmaWx0ZXJTcmMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAvLyDmj5Dlj5Z2aWRlb1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmlkZW9cbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChfdGhpcy52aWRlb1NyYy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBfdGhpcy5zd2lwZXJPcHQuaW5kaWNhdG9yRG90cyA9IHRydWVcbiAgICAgICAgICAgIF90aGlzLmhhc1ZpZGVvID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5zd2lwZXJPcHQuaW5kaWNhdG9yRG90cyA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5oYXNWaWRlbyA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEuc2t1cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICB0aGlzLnNrdUhlaWdodCA9IDMwMFxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLnNrdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5uYW1lID0gaXRlbS5wcm9kdWN0TmFtZSArIGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChfdGhpcy51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLm51bSA9IGl0ZW0ua2VlcENvdXRcbiAgICAgICAgICAgIGlmIChpdGVtLmtlZXBDb3V0ID4gMCkge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5jYXJ0Q291bnQgPSBpdGVtLnNob3BwaW5nQ2FydENvdW50XG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmlzQWxsb3dTYWxlID0gaXRlbS5pc0FsbG93U2FsZVxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICB2YXIgZGlzYWJsZUxpc3QgPSBfdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gIWl0ZW0uaXNBbGxvd1NhbGVcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChkaXNhYmxlTGlzdC5sZW5ndGggPT09IGRhdGEuc2t1cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIF90aGlzLmJ1dHRvbkRpc2FibGUgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTS1XmjInku7fpkrHmjpLluo9cbiAgICAgICAgICBfdGhpcy5kZXRhaWwuZ29vZExpc3Quc29ydCgoZ29vZDEsIGdvb2QyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoZ29vZDEucHJpY2UucmVwbGFjZSgvLC9nLCAnJykpIC0gcGFyc2VJbnQoZ29vZDIucHJpY2UucmVwbGFjZSgvLC9nLCAnJykpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlcy5kYXRhLmVycm9yID09PSAwICYmICFyZXMuZGF0YS5kYXRhLmlzQWxsb3dTYWxlKSB8fCAocmVzLmRhdGEuZXJyb3IgPT09IC0xICYmIHJlcy5kYXRhLm1zZyA9PT0gJ21pc3Mgc3B1JykpIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn6K+l5ZWG5ZOB5bey5LiL5p62JyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0RGF0YShjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0UmVjb21tZW5kICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5yZWNnb29kTGlzdCA9IFtdXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNwdUlkOiB0aGlzLnBhZ2VJZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFJlY29tbWVuZChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5jb3ZlciA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIHRoaXMucmVjZ29vZExpc3QucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb21tZW5kKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICB0aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIC8vIF90aGlzLmluaXREYXRhKF90aGlzLmluaXRDYXJ0UmVzdWx0KCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGdldE1hcmtVc2VyIChpZCwgdHlwZSkge1xuICAgICAgdGhpcy5jb2xsZWN0ZWRudW0gPSAnICdcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1VzZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY29sbGVjdGVkbnVtID0gZGF0YS5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgc2V0TWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuZGV0YWlsLnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmRldGFpbC5pZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8g6L2s5Y+RXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsLnRpdGxlLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2RldGFpbD9pZD0nICsgdGhpcy5wYWdlSWQgKyAnJnJlZnJlbmNlQ29kZT0nICsgdGhpcy5tZW1iZXJJZFxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICBpZiAoaWQucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gaWQucmVmcmVuY2VDb2RlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSB0cnVlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuZ2V0UmVjb21tZW5kKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLnZpZGVvQ29udGV4dCA9IHdlcHkuY3JlYXRlVmlkZW9Db250ZXh0KCd2aWRlbycpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5pbml0RGF0YSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgICB0aGlzLnVzZXJBdmF0YXIgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfaW5mbyA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgICAgdGhpcy5idXNzaW5lc3NfaW5mbyA9IHRoaXMuJHBhcmVudC5nZXRCdXNpbmVzcygn5ZWG5ZOB6K+m5oOF6aG1JywgdGhpcy5jdXJyZW50UGF0aCwgbnVsbClcbiAgICAgICAgdGhpcy5pbml0Q2FydFJlc3VsdCgpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2FydFJlc3VsdClcbiAgICAgICAgdGhpcy5hZGRDYXJ0Q291bnQgPSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblVubG9hZCAoKSB7XG4gICAgICB2YXIgcGFnZXMgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpXG4gICAgICBpZiAocGFnZXNbcGFnZXMubGVuZ3RoIC0gMl0uZGF0YS5wYWdlSWQpIHtcbiAgICAgICAgdGhpcy5wYWdlSWQgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXS5kYXRhLnBhZ2VJZFxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19