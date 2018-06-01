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
      swiperOpt: {
        autoplay: false,
        interval: 3000,
        duration: 1000,
        currentTab: 0,
        indicatorDots: true,
        indicatorColor: '#cccccc',
        indicatorActive: '#ff6600'
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
      initTime: 0,
      swiperStop: true
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
        this.showVideo = true;
        this.videoContext.pause();
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
      },
      swiperEnd: function swiperEnd() {
        this.swiperStop = true;
        this.initTime = 0;
        console.log(this.swiperStop);
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
        _this.$parent.showSuccess();
        _this4.detail.goodList = [];
        if (res.data.error === 0) {
          _this.isLoaded = true;
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
        _this.$parent.showSuccess();
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
      this.pageId = id.id;
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
      this.userLevel = this.$parent.globalData.userLevel;
      this.initData();
      this.$apply();
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0Iiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImdvb2RzRGV0YWlsIiwidHJhbnNwb3J0RGV0YWlsIiwiaXNMaW5rIiwiaXNBZGRDYXJ0IiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwidXNlckxldmVsIiwiaXNMb2FkZWQiLCJ2aWRlb0NvbnRleHQiLCJzaG93VmlkZW8iLCJpbml0VGltZSIsInN3aXBlclN0b3AiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsInBhdXNlIiwiaW5pdERhdGEiLCJpbml0Q2FydFJlc3VsdCIsImNsb3NlQ2FydCIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsIiRwYXJlbnQiLCJwYWdlUm9vdCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsInR5cGUiLCJhcHBseSIsImdvUnVsZXMiLCJwbGF5VmlkZW8iLCJwbGF5Iiwic3RvcFZpZGVvIiwiY2hhbmdlU3dpcGVyIiwic3dpcGVyRW5kIiwiY29uc29sZSIsImxvZyIsInJlc3VsdCIsImZpbHRlciIsIml0ZW0iLCJjaGVja2VkIiwiY2IiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJyZXMiLCJzaG93U3VjY2VzcyIsImVycm9yIiwiY29sbGVjdGlvbklkIiwicmVzZXRVc2VyTGV2ZWwiLCJtZW1iZXJIYXNoIiwiY292ZXIiLCJtZW1iZXJQcmljZSIsImRlc2NyaXB0IiwiZGVzYyIsInNvdXJjZVR5cGUiLCJzb3VyY2VJZCIsImNvbGxlY3RJZCIsImdldE1hcmtVc2VyIiwic2t1cyIsImZvckVhY2giLCJnb29kIiwibmFtZSIsInByb2R1Y3ROYW1lIiwia2VlcENvdXQiLCJwdXNoIiwiJGFwcGx5IiwibWlzc1Rva2VuIiwiY2F0Y2giLCJzaG93RmFpbCIsImNvdW50IiwiQWRkQ2FydEh0dHAiLCJtYXJrVHlwZSIsIkdldE1hcmtVc2VyIiwiU2V0TWFya0h0dHAiLCJDYW5jZWxNYXJrSHR0cCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwid2luZG93SGVpZ2h0IiwiY3JlYXRlVmlkZW9Db250ZXh0IiwiZ2xvYmFsRGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxj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ICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIixcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjpcIm5vU2FsZXNcIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcnRSZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vU2FsZXMgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIHByaWNlOiAnJyxcbiAgICAgICAgb2xkcHJpY2U6ICcnLFxuICAgICAgICBleHByZXNzOiAnMzguMCcsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZ29vZExpc3Q6IFtdXG4gICAgICB9LFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmY2NjAwJ1xuICAgICAgfSxcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VJZDogJycsXG4gICAgICBjb2xsZWN0OiBmYWxzZSxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGNvbGxlY3RUeHQ6ICfmnKrmlLbol48nLFxuICAgICAgY29sbGVjdGVkbnVtOiAnICcsXG4gICAgICBnb29kc0RldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfV0sXG4gICAgICB0cmFuc3BvcnREZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB6IyD5Zu0JyxcbiAgICAgICAgZGV0YWlsOiAn6LSt5ruhMuWFrOaWpOWFqOWbveWMhemCridcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHlv6vpgJInLFxuICAgICAgICBkZXRhaWw6ICfpobrkuLDlhrfov5AnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5pa55qGIJyxcbiAgICAgICAgZGV0YWlsOiAn6YWN6YCB6KeE5YiZJyxcbiAgICAgICAgaXNMaW5rOiB0cnVlXG4gICAgICB9XSxcbiAgICAgIGlzQWRkQ2FydDogdHJ1ZSxcbiAgICAgIGNhcnROdW06IDEsXG4gICAgICBhZGRDYXJ0Q291bnQ6IDAsXG4gICAgICBjYXJ0UmVzdWx0OiBbXSxcbiAgICAgIHRvdGFsQ2FydDogMCxcbiAgICAgIGNhcnRNb2RhbDogZmFsc2UsXG4gICAgICBjb2xsZWN0SW1hZ2U6ICcuLi9pbWFnZS9pY29uLWNhcnQtYmxhbmsucG5nJyxcbiAgICAgIG1hcmtJZDogJycsXG4gICAgICB1c2VyTGV2ZWw6IDAsXG4gICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICB2aWRlb0NvbnRleHQ6ICcnLFxuICAgICAgc2hvd1ZpZGVvOiB0cnVlLFxuICAgICAgaW5pdFRpbWU6IDAsXG4gICAgICBzd2lwZXJTdG9wOiB0cnVlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjb2xsZWN0VGFwICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLnNldE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FydCAoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRDYXJ0Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2FkZEJ1eScpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5pbml0Q2FydFJlc3VsdCgpKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablh4/lsJHmlbDph49cbiAgICAgIH0sXG4gICAgICBrZXlDYXJ0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBibHVyQ2FydCAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCAmJiB0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgICB0aGlzLmFkZENhcnRDb3VudCArPSBwYXJzZUludCh0aGlzLmNhcnROdW0pXG4gICAgICAgICAgICAgIC8vIOWPkemAgea3u+WKoOi0reeJqei9puivt+axglxuICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P2lkPScgKyB0aGlzLmNhcnRSZXN1bHQuaWQgKyAnJnR5cGU9JyArIHRoaXMuY2FydFJlc3VsdC50eXBlICsgJyZjb3VudD0nICsgdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1J1bGVzICgpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3J1bGVzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBsYXlWaWRlbyAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN3aXBlclN0b3ApIHtcbiAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGxheSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdG9wVmlkZW8gKCkge1xuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVN3aXBlciAoKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyU3RvcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICB9LFxuICAgICAgc3dpcGVyRW5kICgpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJTdG9wID0gdHJ1ZVxuICAgICAgICB0aGlzLmluaXRUaW1lID0gMFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN3aXBlclN0b3ApXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDYXJ0RGF0YSAoKSB7XG4gICAgICAvLyDlvoDlkI7lj7Dlj5Hor7fmsYLmuIXnqbrotK3nianovabpgInpoblcbiAgICB9XG4gICAgaW5pdENhcnRSZXN1bHQgKCkge1xuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gW11cbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hlY2tlZFxuICAgICAgfSlcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdIDogdGhpcy5kZXRhaWwuZ29vZExpc3RbMF1cbiAgICAgIHRoaXMuY2FydE51bSA9IHJlc3VsdC5sZW5ndGggPiAwID8gMSA6IDBcbiAgICB9XG4gICAgaW5pdERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNwdUlkOiB0aGlzLnBhZ2VJZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRldGFpbEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNMb2FkZWQgPSB0cnVlXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKCFkYXRhLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIOa1i+ivleeUqOaIt+i6q+S7veWPmOWMllxuICAgICAgICAgIF90aGlzLiRwYXJlbnQucmVzZXRVc2VyTGV2ZWwoZGF0YS5tZW1iZXJIYXNoLCB0aGlzLnRva2VuKVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wYXRoID0gZGF0YS5jb3ZlclxuICAgICAgICAgIF90aGlzLmRldGFpbC50aXRsZSA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLm9sZHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5kZXNjcmlwdCA9IGRhdGEuZGVzY1xuICAgICAgICAgIF90aGlzLmRldGFpbC50eXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgICAgIF90aGlzLmRldGFpbC5jb2xsZWN0SWQgPSBkYXRhLmNvbGxlY3Rpb25JZFxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5za3VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QubmFtZSA9IGl0ZW0ucHJvZHVjdE5hbWUgKyBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoX3RoaXMudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5udW0gPSBpdGVtLmtlZXBDb3V0XG4gICAgICAgICAgICBpZiAoaXRlbS5rZWVwQ291dCA+IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QudHlwZSA9IGl0ZW0uc291cmNlVHlwZVxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmRldGFpbC5nb29kTGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGdldE1hcmtVc2VyIChpZCwgdHlwZSkge1xuICAgICAgdGhpcy5jb2xsZWN0ZWRudW0gPSAnICdcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1VzZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY29sbGVjdGVkbnVtID0gZGF0YS5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgc2V0TWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5kZXRhaWwudHlwZSxcbiAgICAgICAgc291cmNlSWQ6IHRoaXMuZGV0YWlsLmlkXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogdGhpcy5tYXJrSWQgfHwgdGhpcy5kZXRhaWwuY29sbGVjdElkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihfdGhpcy5kZXRhaWwuaWQsIHRoaXMuZGV0YWlsLnR5cGUpXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyDovazlj5FcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGhpcy5kZXRhaWwudGl0bGUsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvZGV0YWlsP2lkPScgKyB0aGlzLnBhZ2VJZFxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSB0cnVlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLnZpZGVvQ29udGV4dCA9IHdlcHkuY3JlYXRlVmlkZW9Db250ZXh0KCd2aWRlbycpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=