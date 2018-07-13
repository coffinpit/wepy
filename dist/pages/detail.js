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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJyZWNHb29kcyIsImNvbXB1dGVkIiwidG90YWxDYXJ0IiwiY2FydFJlc3VsdCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJwcmljZSIsInJlcGxhY2UiLCJjYXJ0TnVtIiwidG9GaXhlZCIsIm1heHRpcCIsImJ1dHRvbkRpc2FibGUiLCJpc0FkZENhcnQiLCJudW0iLCJjYXJ0Q291bnQiLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0IiwiaW1hZ2VTcmMiLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwidG9rZW4iLCJwYWdlSWQiLCJjb2xsZWN0Iiwib3ZlcmZsb3ciLCJ3aW5IZWlnaHQiLCJjb2xsZWN0VHh0IiwiY29sbGVjdGVkbnVtIiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwidXNlckxldmVsIiwiaXNMb2FkZWQiLCJ2aWRlb0NvbnRleHQiLCJzaG93VmlkZW8iLCJzd2lwZXJTdG9wIiwicmVmcmVuY2VDb2RlIiwibWVtYmVySWQiLCJjdXJyZW50UGF0aCIsInVzZXJOYW1lIiwidXNlckF2YXRhciIsImN1c3RvbWVyX2luZm8iLCJidXNzaW5lc3NfaW5mbyIsInNrdUhlaWdodCIsInZpZGVvU3JjIiwiaGFzVmlkZW8iLCJyZWNnb29kTGlzdCIsImlzQWxsb3dTYWxlIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsImluaXREYXRhIiwicGF1c2UiLCJpbml0Q2FydFJlc3VsdCIsImNsb3NlQ2FydCIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsIiRwYXJlbnQiLCJwYWdlUm9vdCIsInR5cGUiLCJhcHBseSIsImdvUnVsZXMiLCJwbGF5VmlkZW8iLCJwbGF5Iiwic3RvcFZpZGVvIiwiY2hhbmdlU3dpcGVyIiwic2VlayIsInN3aXBlckVuZCIsImVycm9yVmlkZW8iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiLCJnb0ltYWdlTGluayIsImhyZWYiLCJyZXN1bHQiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2tlZCIsImkiLCJpc0NoZWNrZWQiLCJjYiIsImdldFRva2VuIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJoaWRlTG9hZGluZyIsImVycm9yIiwiY29sbGVjdGlvbklkIiwicmVzZXRVc2VyTGV2ZWwiLCJtZW1iZXJIYXNoIiwiZ2xvYmFsRGF0YSIsImNvdmVyIiwidmljZVRpdGxlIiwibWVtYmVyUHJpY2UiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJ0ZW1wU3JjIiwiSlNPTiIsInBhcnNlIiwiYmFzZTY0RGVjb2RlIiwiZmlsdGVyU3JjIiwia2V5IiwicHVzaCIsInZpZGVvIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJrZWVwQ291dCIsInNob3BwaW5nQ2FydENvdW50IiwiJGFwcGx5IiwiZGlzYWJsZUxpc3QiLCJzb3J0IiwiZ29vZDEiLCJnb29kMiIsIm1zZyIsImNvbmZpcm0iLCJuYXZpZ2F0ZUJhY2siLCJtaXNzVG9rZW4iLCJjYXRjaCIsIkdldFJlY29tbWVuZCIsIm9iaiIsImdldFJlY29tbWVuZCIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJtYXJrVHlwZSIsIkdldE1hcmtVc2VyIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZ2V0U3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsdUJBQXNCLGNBQXZCLEVBQXNDLDJCQUEwQixhQUFoRSxFQUE4RSx5QkFBd0IsVUFBdEcsRUFBaUgsc0JBQXFCLFlBQXRJLEVBQW1KLGlDQUFnQyxlQUFuTCxFQUFtTSw2QkFBNEIsZ0JBQS9OLEVBQWdQLDJCQUEwQixhQUExUSxFQUFWLEVBQW1TLGVBQWMsRUFBQyxTQUFRLFdBQVQsRUFBcUIsbUJBQWtCLFNBQXZDLEVBQWlELDBCQUF5QixTQUExRSxFQUFqVCxFQUFzWSxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsNkJBQTRCLGFBQS9DLEVBQTZELHlCQUF3QixXQUFyRixFQUFpRyxjQUFhLEVBQTlHLEVBQWpaLEUsU0FDVEMsTyxHQUFVLEVBQUMsVUFBUyxF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bnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBCb3R0b20gZnJvbSAnLi4vY29tcG9uZW50cy9ib3R0b21iYXInXG4gIGltcG9ydCBDb3VudCBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXInXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcbiAgaW1wb3J0IFJlY0dvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvcmVjb21tZW5kJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeivpuaDhSdcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImJvdHRvbVwiOntcInYtYmluZDpjYXJ0VmFsLnN5bmNcIjpcImFkZENhcnRDb3VudFwiLFwidi1iaW5kOm1lc3NhZ2VQYXRoLnN5bmNcIjpcImN1cnJlbnRQYXRoXCIsXCJ2LWJpbmQ6bmlja19uYW1lLnN5bmNcIjpcInVzZXJOYW1lXCIsXCJ2LWJpbmQ6YXZhdGFyLnN5bmNcIjpcInVzZXJBdmF0YXJcIixcInYtYmluZDpjdXN0b21lcl9pbmZvX3N0ci5zeW5jXCI6XCJjdXN0b21lcl9pbmZvXCIsXCJ2LWJpbmQ6bm90ZV9pbmZvX3N0ci5zeW5jXCI6XCJidXNzaW5lc3NfaW5mb1wiLFwidi1iaW5kOmlzQWxsb3dTYWxlLnN5bmNcIjpcImlzQWxsb3dTYWxlXCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIixcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjpcIm5vU2FsZXNcIn0sXCJyZWNHb29kc1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cmVjb21tZW5kTGlzdC5zeW5jXCI6XCJyZWNnb29kTGlzdFwiLFwidi1iaW5kOnVzZXJMZXZlbC5zeW5jXCI6XCJ1c2VyTGV2ZWxcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJib3R0b21cIjp7XCJ2LW9uOmJ1eVwiOlwiY2FydFwiLFwidi1vbjpjYXJ0XCI6XCJjYXJ0XCJ9LFwiY291bnRlckNhcnRcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzQ2FydFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzQ2FydFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDYXJ0XCIsXCJ2LW9uOmJsdXJFZGl0XCI6XCJibHVyQ2FydFwifSxcInJlY0dvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudSxcbiAgICAgIHJlY0dvb2RzOiBSZWNHb29kc1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQgJiYgT2JqZWN0LmtleXModGhpcy5jYXJ0UmVzdWx0KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIHByaWNlID0gdGhpcy5jYXJ0UmVzdWx0LnByaWNlLnJlcGxhY2UoLywvZywgJycpICogdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgcmV0dXJuIHByaWNlLnRvRml4ZWQoMilcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1heHRpcCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5idXR0b25EaXNhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNBZGRDYXJ0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID49IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub1NhbGVzICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBwcmljZTogJycsXG4gICAgICAgIG9sZHByaWNlOiAnJyxcbiAgICAgICAgZXhwcmVzczogJzM4LjAnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGdvb2RMaXN0OiBbXSxcbiAgICAgICAgaW1hZ2VTcmM6IFtdXG4gICAgICB9LFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmM1ZTYwJ1xuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnICcsXG4gICAgICBpc0FkZENhcnQ6IHRydWUsXG4gICAgICBjYXJ0TnVtOiAxLFxuICAgICAgYWRkQ2FydENvdW50OiAwLFxuICAgICAgY2FydFJlc3VsdDogW10sXG4gICAgICB0b3RhbENhcnQ6IDAsXG4gICAgICBjYXJ0TW9kYWw6IGZhbHNlLFxuICAgICAgY29sbGVjdEltYWdlOiAnLi4vaW1hZ2UvaWNvbi1jYXJ0LWJsYW5rLnBuZycsXG4gICAgICBtYXJrSWQ6ICcnLFxuICAgICAgdXNlckxldmVsOiAwLFxuICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgdmlkZW9Db250ZXh0OiAnJyxcbiAgICAgIHNob3dWaWRlbzogdHJ1ZSxcbiAgICAgIHN3aXBlclN0b3A6IHRydWUsXG4gICAgICByZWZyZW5jZUNvZGU6ICcnLFxuICAgICAgbWVtYmVySWQ6ICcnLFxuICAgICAgY3VycmVudFBhdGg6ICcnLFxuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlckF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICcnLFxuICAgICAgICAnbGV2ZWwnOiAnJyxcbiAgICAgICAgJ2NlbGxwaG9uZXMnOiBbWycnLCAnJ11dXG4gICAgICB9LFxuICAgICAgYnVzc2luZXNzX2luZm86IHtcbiAgICAgICAgJ3RpdGxlJzogJydcbiAgICAgIH0sXG4gICAgICBza3VIZWlnaHQ6ICcnLFxuICAgICAgdmlkZW9TcmM6IFtdLFxuICAgICAgaGFzVmlkZW86IGZhbHNlLFxuICAgICAgcmVjZ29vZExpc3Q6IFtdLFxuICAgICAgYnV0dG9uRGlzYWJsZTogdHJ1ZSxcbiAgICAgIGlzQWxsb3dTYWxlOiB0cnVlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb2xsZWN0VGFwICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLnNldE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FydCAoYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRDYXJ0Jykge1xuICAgICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdhZGRCdXknKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5idXR0b25EaXNhYmxlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNBZGRDYXJ0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQgPiAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSAtIHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FydE51bSArK1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbkRpc2FibGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA8PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYmx1ckNhcnQgKHZhbCkge1xuICAgICAgICBpZiAodmFsIDw9IDAgfHwgIXRoaXMuYnV0dG9uRGlzYWJsZSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQWRkQ2FydCAmJiB0aGlzLmNhcnRSZXN1bHQubnVtID4gMCAmJiB0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtIC0gdGhpcy5jYXJ0UmVzdWx0LmNhcnRDb3VudCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0FkZENhcnQgJiYgdGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDAgJiYgdGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwID8gMCA6IDFcbiAgICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB9LFxuICAgICAgZ29DYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uRGlzYWJsZSkge1xuICAgICAgICAgIGlmICh0aGlzLmlzQWRkQ2FydCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50ID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IHRoaXMuY2FydFJlc3VsdC5udW0gLSB0aGlzLmNhcnRSZXN1bHQuY2FydENvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0Q291bnQgKz0gcGFyc2VJbnQodGhpcy5jYXJ0TnVtKVxuICAgICAgICAgICAgICAgIC8vIOWPkemAgea3u+WKoOi0reeJqei9puivt+axglxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FydERhdGEoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwID8gMCA6IDFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWJ1eT9pZD0nICsgdGhpcy5jYXJ0UmVzdWx0LmlkICsgJyZ0eXBlPScgKyB0aGlzLmNhcnRSZXN1bHQudHlwZSArICcmY291bnQ9JyArIHRoaXMuY2FydE51bVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMubWV0aG9kcy5jbG9zZUNhcnQuYXBwbHkodGhpcylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1J1bGVzICgpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3J1bGVzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBsYXlWaWRlbyAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN3aXBlclN0b3ApIHtcbiAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGxheSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdG9wVmlkZW8gKCkge1xuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVN3aXBlciAoKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyU3RvcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnNlZWsoMClcbiAgICAgIH0sXG4gICAgICBzd2lwZXJFbmQgKCkge1xuICAgICAgICB0aGlzLnN3aXBlclN0b3AgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZXJyb3JWaWRlbyAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aSreaUvuWksei0pe+8jOivt+eojeWAmemHjeivlScsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvSW1hZ2VMaW5rIChocmVmKSB7XG4gICAgICAgIGlmIChocmVmKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vbGluaz9ocmVmPScgKyBocmVmXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2FydERhdGEgKCkge1xuICAgICAgLy8g5b6A5ZCO5Y+w5Y+R6K+35rGC5riF56m66LSt54mp6L2m6YCJ6aG5XG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0ICgpIHtcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IFtdXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWQgJiYgaXRlbS5pc0FsbG93U2FsZVxuICAgICAgfSlcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdIDogdGhpcy5kZXRhaWwuZ29vZExpc3RbMF1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kZXRhaWwuZ29vZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5pZCA9PT0gdGhpcy5kZXRhaWwuZ29vZExpc3RbaV0uaWQpIHtcbiAgICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdFtpXS5pc0NoZWNrZWQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3RbaV0uaXNDaGVja2VkID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oMCwgdGhpcy5yZWZyZW5jZUNvZGUpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnRva2VuKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc3B1SWQ6IHRoaXMucGFnZUlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGV0YWlsSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgdGhpcy5kZXRhaWwuZ29vZExpc3QgPSBbXVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pc0xvYWRlZCA9IHRydWVcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoIWRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXMuZGF0YS5kYXRhLmlzQWxsb3dTYWxlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWxsb3dTYWxlID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0FsbG93U2FsZSA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5rWL6K+V55So5oi36Lqr5Lu95Y+Y5YyWXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5yZXNldFVzZXJMZXZlbChkYXRhLm1lbWJlckhhc2gsIHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgICAgIF90aGlzLnVzZXJMZXZlbCA9IF90aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgICAgICAgIF90aGlzLm1lbWJlcklkID0gX3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm1lbWJlcklkXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucGF0aCA9IGRhdGEuY292ZXJcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudGl0bGUgPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnZpY2VUaXRsZSA9IGRhdGEudmljZVRpdGxlXG4gICAgICAgICAgX3RoaXMuY3VycmVudFBhdGggPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5vbGRwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucmVkdWN0aW9uID0gZGF0YS5yZWR1Y3Rpb25cbiAgICAgICAgICBfdGhpcy5kZXRhaWwuZGVzY3JpcHQgPSBkYXRhLmRlc2NcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5pZCA9IGRhdGEuc291cmNlSWRcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuY29sbGVjdElkID0gZGF0YS5jb2xsZWN0aW9uSWRcbiAgICAgICAgICB2YXIgdGVtcFNyYyA9IEpTT04ucGFyc2UoX3RoaXMuJHBhcmVudC5iYXNlNjREZWNvZGUoZGF0YS5kZXRhaWwpKVxuICAgICAgICAgIHZhciBmaWx0ZXJTcmMgPSBbXVxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0ZW1wU3JjKSB7XG4gICAgICAgICAgICBmaWx0ZXJTcmMucHVzaCh0ZW1wU3JjW2tleV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLmRldGFpbC5pbWFnZVNyYyA9IGZpbHRlclNyYy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIC8vIOi/h+a7pHZpZGVvXG4gICAgICAgICAgICByZXR1cm4gIWl0ZW0udmlkZW9cbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLnZpZGVvU3JjID0gZmlsdGVyU3JjLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgLy8g5o+Q5Y+WdmlkZW9cbiAgICAgICAgICAgIHJldHVybiBpdGVtLnZpZGVvXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoX3RoaXMudmlkZW9TcmMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgX3RoaXMuc3dpcGVyT3B0LmluZGljYXRvckRvdHMgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5oYXNWaWRlbyA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuc3dpcGVyT3B0LmluZGljYXRvckRvdHMgPSBmYWxzZVxuICAgICAgICAgICAgX3RoaXMuaGFzVmlkZW8gPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihkYXRhLnNvdXJjZUlkLCBkYXRhLnNvdXJjZVR5cGUpXG4gICAgICAgICAgaWYgKGRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkYXRhLnNrdXMubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgdGhpcy5za3VIZWlnaHQgPSAzMDBcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5za3VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QubmFtZSA9IGl0ZW0ucHJvZHVjdE5hbWUgKyBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoX3RoaXMudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5udW0gPSBpdGVtLmtlZXBDb3V0XG4gICAgICAgICAgICBpZiAoaXRlbS5rZWVwQ291dCA+IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QuY2FydENvdW50ID0gaXRlbS5zaG9wcGluZ0NhcnRDb3VudFxuICAgICAgICAgICAgZ29vZC50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5pc0FsbG93U2FsZSA9IGl0ZW0uaXNBbGxvd1NhbGVcbiAgICAgICAgICAgIF90aGlzLmRldGFpbC5nb29kTGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdmFyIGRpc2FibGVMaXN0ID0gX3RoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICFpdGVtLmlzQWxsb3dTYWxlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoZGlzYWJsZUxpc3QubGVuZ3RoID09PSBkYXRhLnNrdXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBfdGhpcy5idXR0b25EaXNhYmxlID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU0tV5oyJ5Lu36ZKx5o6S5bqPXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmdvb2RMaXN0LnNvcnQoKGdvb2QxLCBnb29kMikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGdvb2QxLnByaWNlLnJlcGxhY2UoLywvZywgJycpKSAtIHBhcnNlSW50KGdvb2QyLnByaWNlLnJlcGxhY2UoLywvZywgJycpKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmVycm9yID09PSAtMSAmJiByZXMuZGF0YS5tc2cgPT09ICdtaXNzIHNwdScpIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn6K+l5ZWG5ZOB5bey5LiL5p62JyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICAgICAgICBfdGhpcy51c2VyTGV2ZWwgPSBfdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjonICsgZXJyb3IpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0UmVjb21tZW5kICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5yZWNnb29kTGlzdCA9IFtdXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNwdUlkOiB0aGlzLnBhZ2VJZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFJlY29tbWVuZChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5jb3ZlciA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIG9iai5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIG9iai5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIHRoaXMucmVjZ29vZExpc3QucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvbW1lbmQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICB9KVxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLmNhcnRSZXN1bHQudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuY2FydFJlc3VsdC5pZCxcbiAgICAgICAgY291bnQ6IHRoaXMuY2FydE51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZENhcnRIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgLy8gX3RoaXMuaW5pdERhdGEoX3RoaXMuaW5pdENhcnRSZXN1bHQoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0TWFya1VzZXIgKGlkLCB0eXBlKSB7XG4gICAgICB0aGlzLmNvbGxlY3RlZG51bSA9ICcgJ1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBzb3VyY2VUeXBlOiB0eXBlLFxuICAgICAgICBzb3VyY2VJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrVXNlcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY29sbGVjdGVkbnVtID0gZGF0YS5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgc2V0TWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuZGV0YWlsLnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmRldGFpbC5pZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIHRoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLm1hcmtJZCA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgLy8gX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBDYW5jZWxNYXJrIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogdGhpcy5tYXJrSWQgfHwgdGhpcy5kZXRhaWwuY29sbGVjdElkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgLy8gX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyDovazlj5FcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGhpcy5kZXRhaWwudGl0bGUsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvZGV0YWlsP2lkPScgKyB0aGlzLnBhZ2VJZCArICcmcmVmcmVuY2VDb2RlPScgKyB0aGlzLm1lbWJlcklkXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoaWQpIHtcbiAgICAgIGlmIChpZC5zY2VuZSkge1xuICAgICAgICB0aGlzLnBhZ2VJZCA9IGRlY29kZVVSSUNvbXBvbmVudChpZC5zY2VuZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFnZUlkID0gaWQuaWRcbiAgICAgIH1cbiAgICAgIGlmIChpZC5yZWZyZW5jZUNvZGUpIHtcbiAgICAgICAgdGhpcy5yZWZyZW5jZUNvZGUgPSBpZC5yZWZyZW5jZUNvZGVcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IHRydWVcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5nZXRSZWNvbW1lbmQoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblJlYWR5ICgpIHtcbiAgICAgIHRoaXMudmlkZW9Db250ZXh0ID0gd2VweS5jcmVhdGVWaWRlb0NvbnRleHQoJ3ZpZGVvJylcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5tZXRob2RzLmNsb3NlQ2FydC5hcHBseSh0aGlzKVxuICAgICAgdGhpcy51c2VyTGV2ZWwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgIHRoaXMuaW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50LmdldFVzZXJOYW1lKClcbiAgICAgICAgdGhpcy51c2VyQXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgICB0aGlzLmN1c3RvbWVyX2luZm8gPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgpXG4gICAgICAgIHRoaXMuYnVzc2luZXNzX2luZm8gPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+WVhuWTgeivpuaDhemhtScsIHRoaXMuY3VycmVudFBhdGgsIG51bGwpXG4gICAgICAgIHRoaXMuaW5pdENhcnRSZXN1bHQoKVxuICAgICAgICB0aGlzLmFkZENhcnRDb3VudCA9IHRoaXMuY2FydFJlc3VsdC5jYXJ0Q291bnRcbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uVW5sb2FkICgpIHtcbiAgICAgIHZhciBwYWdlcyA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VzKClcbiAgICAgIGlmIChwYWdlc1twYWdlcy5sZW5ndGggLSAyXSAmJiBwYWdlc1twYWdlcy5sZW5ndGggLSAyXS5kYXRhLnBhZ2VJZCkge1xuICAgICAgICB0aGlzLnBhZ2VJZCA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdLmRhdGEucGFnZUlkXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=