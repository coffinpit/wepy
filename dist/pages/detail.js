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
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "v-bind:cartVal.sync": "addCartCount", "v-bind:messagePath.sync": "currentPath", "v-bind:nick_name.sync": "userName", "v-bind:avatar.sync": "userAvatar", "v-bind:customer_info_str.sync": "customer_info", "v-bind:note_info_str.sync": "bussiness_info", "v-bind:isAllowSale.sync": "isAllowSale" }, "counterCart": { "class": "calculate", "v-bind:num.sync": "cartNum", "v-bind:isDisabled.sync": "noSales" }, "recGoods": { "xmlns:v-bind": "", "v-bind:recommendList.sync": "recgoodList", "v-bind:userLevel.sync": "userLevel", "xmlns:v-on": "" } }, _this2.$events = { "bottom": { "v-on:buy": "cart", "v-on:cart": "cart" }, "counterCart": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minusCart", "v-on:keyEdit": "keyCart", "v-on:blurEdit": "blurCart" }, "recGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
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
      buttonDisable: true,
      isAllowSale: true
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
      console.log(this.token);
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token,
        spuId: this.pageId
      };
      this.$parent.HttpRequest.DetailHttp(data).then(function (res) {
        _this.$parent.hideLoading();
        console.log(res);
        _this7.detail.goodList = [];
        if (res.data.error === 0) {
          _this.isLoaded = true;
          var data = res.data.data;
          if (!data.collectionId) {
            _this.collect = false;
          } else {
            _this.collect = true;
          }
          if (!res.data.data.isAllowSale) {
            _this7.isAllowSale = false;
          } else {
            _this7.isAllowSale = true;
          }
          // 测试用户身份变化
          _this.$parent.resetUserLevel(data.memberHash, _this7.token, function () {
            _this.userLevel = _this.$parent.globalData.userLevel;
            _this.memberId = _this.$parent.globalData.memberId;
          });
          _this.detail.path = data.cover;
          _this.detail.title = data.title;
          _this.detail.viceTitle = data.viceTitle;
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
          // 过滤下架或库存不足的SKU
          var disableList = _this.detail.goodList.filter(function (item) {
            return !item.isAllowSale || item.num <= 0;
          });
          // 判断是否所有SKU都下架
          if (disableList.length === data.skus.length) {
            _this.buttonDisable = false;
          }
          // SKU按价钱排序
          _this.detail.goodList.sort(function (good1, good2) {
            return parseInt(good1.price.replace(/,/g, '')) - parseInt(good2.price.replace(/,/g, ''));
          });
          cb && cb();
        } else if (res.data.error === -1 && res.data.msg === 'miss spu') {
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
            _this.initData(function () {
              _this.userLevel = _this.$parent.globalData.userLevel;
            });
          }
        }
        _this.$apply();
      }).catch(function (error) {
        console.log('error:' + error);
        _this.$parent.hideLoading();
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
            _this8.getRecommend();
          }
        }
        _this8.$apply();
      }).catch(function () {});
    }
  }, {
    key: 'addCartData',
    value: function addCartData(cb) {
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
            // _this.token = this.$parent.getToken(res.data.error)
          }
        }
      });
    }
  }, {
    key: 'getMarkUser',
    value: function getMarkUser(id, type) {
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
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.collectednum = data.length;
        } else {
          if (_this.$parent.missToken) {
            // _this.token = this.$parent.getToken(res.data.error)
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
        console.log(res);
        _this9.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.markId = res.data.data;
          _this.getMarkUser(_this.detail.id, _this9.detail.type);
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            // _this.token = this.$parent.getToken(res.data.error)
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
            // _this.token = this.$parent.getToken(res.data.error)
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
      if (id.scene) {
        this.pageId = decodeURIComponent(id.scene);
      } else {
        this.pageId = id.id;
      }
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
      var _this11 = this;

      this.token = this.$parent.getToken();
      this.methods.closeCart.apply(this);
      this.userLevel = this.$parent.globalData.userLevel;
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
  }, {
    key: 'onUnload',
    value: function onUnload() {
      var pages = this.getCurrentPages();
      if (pages[pages.length - 2] && pages[pages.length - 2].data.pageId) {
        this.pageId = pages[pages.length - 2].data.pageId;
      }
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJyZWNHb29kcyIsImNvbXB1dGVkIiwidG90YWxDYXJ0IiwiY2FydFJlc3VsdCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsImJ1dHRvbkRpc2FibGUiLCJpc0FkZENhcnQiLCJudW0iLCJjYXJ0Q291bnQiLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwiaW1hZ2VTcmMiLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwidXNlckxldmVsIiwiaXNMb2FkZWQiLCJ2aWRlb0NvbnRleHQiLCJzaG93VmlkZW8iLCJzd2lwZXJTdG9wIiwicmVmcmVuY2VDb2RlIiwibWVtYmVySWQiLCJjdXJyZW50UGF0aCIsInVzZXJOYW1lIiwidXNlckF2YXRhciIsImN1c3RvbWVyX2luZm8iLCJidXNzaW5lc3NfaW5mbyIsInNrdUhlaWdodCIsInZpZGVvU3JjIiwiaGFzVmlkZW8iLCJyZWNnb29kTGlzdCIsImlzQWxsb3dTYWxlIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsImluaXREYXRhIiwicGF1c2UiLCJpbml0Q2FydFJlc3VsdCIsImNsb3NlQ2FydCIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsIiRwYXJlbnQiLCJwYWdlUm9vdCIsInR5cGUiLCJhcHBseSIsImdvUnVsZXMiLCJwbGF5VmlkZW8iLCJwbGF5Iiwic3RvcFZpZGVvIiwiY2hhbmdlU3dpcGVyIiwic2VlayIsInN3aXBlckVuZCIsImVycm9yVmlkZW8iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiLCJnb0ltYWdlTGluayIsImhyZWYiLCJyZXN1bHQiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2tlZCIsImkiLCJpc0NoZWNrZWQiLCJjYiIsImdldFRva2VuIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJoaWRlTG9hZGluZyIsImVycm9yIiwiY29sbGVjdGlvbklkIiwicmVzZXRVc2VyTGV2ZWwiLCJtZW1iZXJIYXNoIiwiZ2xvYmFsRGF0YSIsImNvdmVyIiwidmljZVRpdGxlIiwibWVtYmVyUHJpY2UiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJ0ZW1wU3JjIiwiSlNPTiIsInBhcnNlIiwiYmFzZTY0RGVjb2RlIiwiZmlsdGVyU3JjIiwia2V5IiwicHVzaCIsInZpZGVvIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJrZWVwQ291dCIsInNob3BwaW5nQ2FydENvdW50IiwiJGFwcGx5IiwiZGlzYWJsZUxpc3QiLCJzb3J0IiwiZ29vZDEiLCJnb29kMiIsIm1zZyIsImNvbmZpcm0iLCJuYXZpZ2F0ZUJhY2siLCJtaXNzVG9rZW4iLCJjYXRjaCIsIkdldFJlY29tbWVuZCIsIm9iaiIsImdldFJlY29tbWVuZCIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJtYXJrVHlwZSIsIkdldE1hcmtVc2VyIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZ2V0U3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsdUJBQXNCLGNBQXZCLEVBQXNDLDJCQUEwQixhQUFoRSxFQUE4RSx5QkFBd0IsVUFBdEcsRUFBaUgsc0JBQXFCLFlBQXRJLEVBQW1KLGlDQUFnQyxlQUFuTCxFQUFtTSw2QkFBNEIsZ0JBQS9OLEVBQWdQLDJCQUEwQixhQUExUSxFQUFWLEVBQW1TLGVBQWMsRUFBQyxTQUFRLFdBQVQsRUFBcUIsbUJBQWtCLFNBQXZDLEVBQWlELDBCQUF5QixTQUExRSxFQUFqVCxFQUFzWSxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsNkJBQTRCLGFBQS9DLEVBQTZELHlCQUF3QixXQUFyRixFQUFpRyxjQUFhLEVBQTlHLEVBQWpaLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxF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QXBCak0sTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEJvdHRvbSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbWJhcidcbiAgaW1wb3J0IENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcbiAgaW1wb3J0IE1lbnUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51J1xuICBpbXBvcnQgUmVjR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvbW1lbmQnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1widi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCIsXCJ2LWJpbmQ6bWVzc2FnZVBhdGguc3luY1wiOlwiY3VycmVudFBhdGhcIixcInYtYmluZDpuaWNrX25hbWUuc3luY1wiOlwidXNlck5hbWVcIixcInYtYmluZDphdmF0YXIuc3luY1wiOlwidXNlckF2YXRhclwiLFwidi1iaW5kOmN1c3RvbWVyX2luZm9fc3RyLnN5bmNcIjpcImN1c3RvbWVyX2luZm9cIixcInYtYmluZDpub3RlX2luZm9fc3RyLnN5bmNcIjpcImJ1c3NpbmVzc19pbmZvXCIsXCJ2LWJpbmQ6aXNBbGxvd1NhbGUuc3luY1wiOlwiaXNBbGxvd1NhbGVcIn0sXCJjb3VudGVyQ2FydFwiOntcImNsYXNzXCI6XCJjYWxjdWxhdGVcIixcInYtYmluZDpudW0uc3luY1wiOlwiY2FydE51bVwiLFwidi1iaW5kOmlzRGlzYWJsZWQuc3luY1wiOlwibm9TYWxlc1wifSxcInJlY0dvb2RzXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpyZWNvbW1lbmRMaXN0LnN5bmNcIjpcInJlY2dvb2RMaXN0XCIsXCJ2LWJpbmQ6dXNlckxldmVsLnN5bmNcIjpcInVzZXJMZXZlbFwiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcImJvdHRvbVwiOntcInYtb246YnV5XCI6XCJjYXJ0XCIsXCJ2LW9uOmNhcnRcIjpcImNhcnRcIn0sXCJjb3VudGVyQ2FydFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDYXJ0XCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWludXNDYXJ0XCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNhcnRcIixcInYtb246Ymx1ckVkaXRcIjpcImJsdXJDYXJ0XCJ9LFwicmVjR29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgYm90dG9tOiBCb3R0b20sXG4gICAgICBjb3VudGVyQnV5OiBDb3VudCxcbiAgICAgIGNvdW50ZXJDYXJ0OiBDb3VudCxcbiAgICAgIG1lbnVMaXN0OiBNZW51LFxuICAgICAgcmVjR29vZHM6IFJlY0dvb2RzXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdG90YWxDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdCAmJiBPYmplY3Qua2V5cyh0aGlzLmNhcnRSZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbkRpc2FibGUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPj0gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID49IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vU2FsZXMgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIHByaWNlOiAnJyxcbiAgICAgICAgb2xkcHJpY2U6ICcnLFxuICAgICAgICBleHByZXNzOiAnMzguMCcsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZ29vZExpc3Q6IFtdLFxuICAgICAgICBpbWFnZVNyYzogW11cbiAgICAgIH0sXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICBpbnRlcnZhbDogMzAwMCxcbiAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogZmFsc2UsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNmYzVlNjAnXG4gICAgICB9LFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZUlkOiAnJyxcbiAgICAgIGNvbGxlY3Q6IGZhbHNlLFxuICAgICAgb3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAwLFxuICAgICAgY29sbGVjdFR4dDogJ+acquaUtuiXjycsXG4gICAgICBjb2xsZWN0ZWRudW06ICcgJyxcbiAgICAgIGlzQWRkQ2FydDogdHJ1ZSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJyxcbiAgICAgIG1hcmtJZDogJycsXG4gICAgICB1c2VyTGV2ZWw6IDAsXG4gICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICB2aWRlb0NvbnRleHQ6ICcnLFxuICAgICAgc2hvd1ZpZGVvOiB0cnVlLFxuICAgICAgc3dpcGVyU3RvcDogdHJ1ZSxcbiAgICAgIHJlZnJlbmNlQ29kZTogJycsXG4gICAgICBtZW1iZXJJZDogJycsXG4gICAgICBjdXJyZW50UGF0aDogJycsXG4gICAgICB1c2VyTmFtZTogJycsXG4gICAgICB1c2VyQXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm86IHtcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJycsXG4gICAgICAgICdsZXZlbCc6ICcnLFxuICAgICAgICAnY2VsbHBob25lcyc6IFtbJycsICcnXV1cbiAgICAgIH0sXG4gICAgICBidXNzaW5lc3NfaW5mbzoge1xuICAgICAgICAndGl0bGUnOiAnJ1xuICAgICAgfSxcbiAgICAgIHNrdUhlaWdodDogJycsXG4gICAgICB2aWRlb1NyYzogW10sXG4gICAgICBoYXNWaWRlbzogZmFsc2UsXG4gICAgICByZWNnb29kTGlzdDogW10sXG4gICAgICBidXR0b25EaXNhYmxlOiB0cnVlLFxuICAgICAgaXNBbGxvd1NhbGU6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29sbGVjdCkge1xuICAgICAgICAgIHRoaXMuc2V0TWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5DYW5jZWxNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYXJ0IChhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgoKSA9PiB7XG4gICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZENhcnQnKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IHRydWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2FkZEJ1eScpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IHRydWVcbiAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgICAgdGhpcy5pbml0Q2FydFJlc3VsdCgpXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xvc2VDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwID8gMCA6IDFcbiAgICAgIH0sXG4gICAgICBwbHVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbkRpc2FibGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0TnVtICsrXG4gICAgICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtICsrXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWludXNDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uRGlzYWJsZSkge1xuICAgICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtIC0tXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablh4/lsJHmlbDph49cbiAgICAgIH0sXG4gICAgICBrZXlDYXJ0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBibHVyQ2FydCAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPD0gMCB8fCAhdGhpcy5idXR0b25EaXNhYmxlKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNBZGRDYXJ0ICYmIHRoaXMuY2FydFJlc3VsdC5udW0gPiAwICYmIHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQWRkQ2FydCAmJiB0aGlzLmNhcnRSZXN1bHQubnVtID4gMCAmJiB0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5idXR0b25EaXNhYmxlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNBZGRDYXJ0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQgPiAwKSB7XG4gICAgICAgICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnRDb3VudCArPSBwYXJzZUludCh0aGlzLmNhcnROdW0pXG4gICAgICAgICAgICAgICAgLy8g5Y+R6YCB5re75Yqg6LSt54mp6L2m6K+35rGCXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P2lkPScgKyB0aGlzLmNhcnRSZXN1bHQuaWQgKyAnJnR5cGU9JyArIHRoaXMuY2FydFJlc3VsdC50eXBlICsgJyZjb3VudD0nICsgdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmNsb3NlQ2FydC5hcHBseSh0aGlzKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSBmYWxzZVxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgcGxheVZpZGVvICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3dpcGVyU3RvcCkge1xuICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gZmFsc2VcbiAgICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wbGF5KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN0b3BWaWRlbyAoKSB7XG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICB9LFxuICAgICAgY2hhbmdlU3dpcGVyICgpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJTdG9wID0gZmFsc2VcbiAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKClcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQuc2VlaygwKVxuICAgICAgfSxcbiAgICAgIHN3aXBlckVuZCAoKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyU3RvcCA9IHRydWVcbiAgICAgIH0sXG4gICAgICBlcnJvclZpZGVvICgpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5pKt5pS+5aSx6LSl77yM6K+356iN5YCZ6YeN6K+VJyxcbiAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29JbWFnZUxpbmsgKGhyZWYpIHtcbiAgICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9saW5rP2hyZWY9JyArIGhyZWZcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDYXJ0RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrotK3nianovabpgInpoblcbiAgICB9XG4gICAgaW5pdENhcnRSZXN1bHQgKCkge1xuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gW11cbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZCAmJiBpdGVtLmlzQWxsb3dTYWxlXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB0aGlzLmRldGFpbC5nb29kTGlzdFswXVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRldGFpbC5nb29kTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0LmlkID09PSB0aGlzLmRldGFpbC5nb29kTGlzdFtpXS5pZCkge1xuICAgICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0W2ldLmlzQ2hlY2tlZCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdFtpXS5pc0NoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgfVxuICAgIGluaXREYXRhIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigwLCB0aGlzLnJlZnJlbmNlQ29kZSlcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9rZW4pXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzcHVJZDogdGhpcy5wYWdlSWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZXRhaWxIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFtdXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGVkID0gdHJ1ZVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmICghZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJlcy5kYXRhLmRhdGEuaXNBbGxvd1NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBbGxvd1NhbGUgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzQWxsb3dTYWxlID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICAgICAgX3RoaXMudXNlckxldmVsID0gX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgICAgICAgX3RoaXMubWVtYmVySWQgPSBfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEubWVtYmVySWRcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wYXRoID0gZGF0YS5jb3ZlclxuICAgICAgICAgIF90aGlzLmRldGFpbC50aXRsZSA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudmljZVRpdGxlID0gZGF0YS52aWNlVGl0bGVcbiAgICAgICAgICBfdGhpcy5jdXJyZW50UGF0aCA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLm9sZHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5yZWR1Y3Rpb24gPSBkYXRhLnJlZHVjdGlvblxuICAgICAgICAgIF90aGlzLmRldGFpbC5kZXNjcmlwdCA9IGRhdGEuZGVzY1xuICAgICAgICAgIF90aGlzLmRldGFpbC50eXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgICAgIF90aGlzLmRldGFpbC5jb2xsZWN0SWQgPSBkYXRhLmNvbGxlY3Rpb25JZFxuICAgICAgICAgIHZhciB0ZW1wU3JjID0gSlNPTi5wYXJzZShfdGhpcy4kcGFyZW50LmJhc2U2NERlY29kZShkYXRhLmRldGFpbCkpXG4gICAgICAgICAgdmFyIGZpbHRlclNyYyA9IFtdXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHRlbXBTcmMpIHtcbiAgICAgICAgICAgIGZpbHRlclNyYy5wdXNoKHRlbXBTcmNba2V5XSlcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmltYWdlU3JjID0gZmlsdGVyU3JjLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgLy8g6L+H5rukdmlkZW9cbiAgICAgICAgICAgIHJldHVybiAhaXRlbS52aWRlb1xuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMudmlkZW9TcmMgPSBmaWx0ZXJTcmMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAvLyDmj5Dlj5Z2aWRlb1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmlkZW9cbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChfdGhpcy52aWRlb1NyYy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBfdGhpcy5zd2lwZXJPcHQuaW5kaWNhdG9yRG90cyA9IHRydWVcbiAgICAgICAgICAgIF90aGlzLmhhc1ZpZGVvID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5zd2lwZXJPcHQuaW5kaWNhdG9yRG90cyA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5oYXNWaWRlbyA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEuc2t1cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICB0aGlzLnNrdUhlaWdodCA9IDMwMFxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLnNrdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5uYW1lID0gaXRlbS5wcm9kdWN0TmFtZSArIGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGlmIChfdGhpcy51c2VyTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLm51bSA9IGl0ZW0ua2VlcENvdXRcbiAgICAgICAgICAgIGlmIChpdGVtLmtlZXBDb3V0ID4gMCkge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnb29kLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5jYXJ0Q291bnQgPSBpdGVtLnNob3BwaW5nQ2FydENvdW50XG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmlzQWxsb3dTYWxlID0gaXRlbS5pc0FsbG93U2FsZVxuICAgICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAvLyDov4fmu6TkuIvmnrbmiJblupPlrZjkuI3otrPnmoRTS1VcbiAgICAgICAgICB2YXIgZGlzYWJsZUxpc3QgPSBfdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gIWl0ZW0uaXNBbGxvd1NhbGUgfHwgaXRlbS5udW0gPD0gMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLy8g5Yik5pat5piv5ZCm5omA5pyJU0tV6YO95LiL5p62XG4gICAgICAgICAgaWYgKGRpc2FibGVMaXN0Lmxlbmd0aCA9PT0gZGF0YS5za3VzLmxlbmd0aCkge1xuICAgICAgICAgICAgX3RoaXMuYnV0dG9uRGlzYWJsZSA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFNLVeaMieS7t+mSseaOkuW6j1xuICAgICAgICAgIF90aGlzLmRldGFpbC5nb29kTGlzdC5zb3J0KChnb29kMSwgZ29vZDIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChnb29kMS5wcmljZS5yZXBsYWNlKC8sL2csICcnKSkgLSBwYXJzZUludChnb29kMi5wcmljZS5yZXBsYWNlKC8sL2csICcnKSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gLTEgJiYgcmVzLmRhdGEubXNnID09PSAnbWlzcyBzcHUnKSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+ivpeWVhuWTgeW3suS4i+aeticsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgICAgICAgX3RoaXMudXNlckxldmVsID0gX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3I6JyArIGVycm9yKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldFJlY29tbWVuZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMucmVjZ29vZExpc3QgPSBbXVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzcHVJZDogdGhpcy5wYWdlSWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRSZWNvbW1lbmQoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmouY292ZXIgPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBvYmoucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBvYmoub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICB0aGlzLnJlY2dvb2RMaXN0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb21tZW5kKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIC8vIF90aGlzLmluaXREYXRhKF90aGlzLmluaXRDYXJ0UmVzdWx0KCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAvLyBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGdldE1hcmtVc2VyIChpZCwgdHlwZSkge1xuICAgICAgdGhpcy5jb2xsZWN0ZWRudW0gPSAnICdcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1VzZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLmNvbGxlY3RlZG51bSA9IGRhdGEubGVuZ3RoXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAvLyBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIHNldE1hcmsgKGNiKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLmRldGFpbC50eXBlLFxuICAgICAgICBzb3VyY2VJZDogdGhpcy5kZXRhaWwuaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZXRNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8g6L2s5Y+RXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsLnRpdGxlLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2RldGFpbD9pZD0nICsgdGhpcy5wYWdlSWQgKyAnJnJlZnJlbmNlQ29kZT0nICsgdGhpcy5tZW1iZXJJZFxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICBpZiAoaWQuc2NlbmUpIHtcbiAgICAgICAgdGhpcy5wYWdlSWQgPSBkZWNvZGVVUklDb21wb25lbnQoaWQuc2NlbmUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICB9XG4gICAgICBpZiAoaWQucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gaWQucmVmcmVuY2VDb2RlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSB0cnVlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuZ2V0UmVjb21tZW5kKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLnZpZGVvQ29udGV4dCA9IHdlcHkuY3JlYXRlVmlkZW9Db250ZXh0KCd2aWRlbycpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMubWV0aG9kcy5jbG9zZUNhcnQuYXBwbHkodGhpcylcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICAgIHRoaXMudXNlckF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgdGhpcy5jdXN0b21lcl9pbmZvID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoKVxuICAgICAgICB0aGlzLmJ1c3NpbmVzc19pbmZvID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCfllYblk4Hor6bmg4XpobUnLCB0aGlzLmN1cnJlbnRQYXRoLCBudWxsKVxuICAgICAgICB0aGlzLmluaXRDYXJ0UmVzdWx0KClcbiAgICAgICAgdGhpcy5hZGRDYXJ0Q291bnQgPSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblVubG9hZCAoKSB7XG4gICAgICB2YXIgcGFnZXMgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpXG4gICAgICBpZiAocGFnZXNbcGFnZXMubGVuZ3RoIC0gMl0gJiYgcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl0uZGF0YS5wYWdlSWQpIHtcbiAgICAgICAgdGhpcy5wYWdlSWQgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXS5kYXRhLnBhZ2VJZFxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19