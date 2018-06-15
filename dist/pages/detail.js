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
        duration: 500,
        currentTab: 0,
        indicatorDots: true,
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
        this.videoContext.seek(0);
      },
      swiperEnd: function swiperEnd() {
        this.swiperStop = true;
      },
      errorVideo: function errorVideo() {
        var _this4 = this;

        _wepy2.default.showModal({
          title: '提示',
          content: '播放失败，请稍候重试',
          showCancel: false,
          success: function success(res) {
            _this4.showVideo = true;
          }
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
      var _this5 = this;

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
        _this5.detail.goodList = [];
        if (res.data.error === 0) {
          _this.isLoaded = true;
          var data = res.data.data;
          if (!data.collectionId) {
            _this.collect = false;
          } else {
            _this.collect = true;
          }
          // 测试用户身份变化
          _this.$parent.resetUserLevel(data.memberHash, _this5.token);
          _this.detail.path = data.cover;
          _this.detail.title = data.title;
          _this.currentPath = data.title;
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
            _this.token = _this5.$parent.getToken(res.data.error);
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
      var _this6 = this;

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
            _this.token = _this6.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'getMarkUser',
    value: function getMarkUser(id, type) {
      var _this7 = this;

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
            _this.token = _this7.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'setMark',
    value: function setMark(cb) {
      var _this8 = this;

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
        _this8.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.markId = res.data.data;
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
  }, {
    key: 'CancelMark',
    value: function CancelMark(cb) {
      var _this9 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        markId: this.markId || this.detail.collectId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        _this9.$parent.hideLoading();
        if (res.data.error === 0) {
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
      var _this10 = this;

      this.userLevel = this.$parent.globalData.userLevel;
      this.memberId = this.$parent.globalData.memberId;
      this.initData(function () {
        _this10.userName = _this10.$parent.getUserName();
        _this10.userAvatar = _this10.$parent.getUserAvatar();
        // if (this.userLevel === 0) {
        //   this.customer_info.level = 'normal'
        // } else if (this.userLevel === 1) {
        //   this.customer_info.level = 'vip'
        // }
        // this.customer_info.cellphones[0][1] = wepy.getStorageSync('phone')
        // this.customer_info.description = '商品详情页' + this.currentPath
        // this.customer_info = JSON.stringify(this.customer_info)
        _this10.customer_info = _this10.$parent.getMessage('商品详情页', _this10.currentPath);
        _this10.bussiness_info = _this10.$parent.getBusiness('test');
      });
      this.$apply();
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0Iiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImdvb2RzRGV0YWlsIiwidHJhbnNwb3J0RGV0YWlsIiwiaXNMaW5rIiwiaXNBZGRDYXJ0IiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwidXNlckxldmVsIiwiaXNMb2FkZWQiLCJ2aWRlb0NvbnRleHQiLCJzaG93VmlkZW8iLCJzd2lwZXJTdG9wIiwicmVmcmVuY2VDb2RlIiwibWVtYmVySWQiLCJjdXJyZW50UGF0aCIsInVzZXJOYW1lIiwidXNlckF2YXRhciIsImN1c3RvbWVyX2luZm8iLCJidXNzaW5lc3NfaW5mbyIsIm1ldGhvZHMiLCJjb2xsZWN0VGFwIiwic2V0TWFyayIsIkNhbmNlbE1hcmsiLCJjYXJ0IiwiYWN0aW9uIiwicGF1c2UiLCJpbml0RGF0YSIsImluaXRDYXJ0UmVzdWx0IiwiY2xvc2VDYXJ0IiwicGx1c0NhcnQiLCJtaW51c0NhcnQiLCJrZXlDYXJ0IiwidmFsIiwiYmx1ckNhcnQiLCJhZGRDYXJ0R29vZHMiLCJlIiwidmFsdWUiLCJnb0NhcnQiLCJwYXJzZUludCIsImFkZENhcnREYXRhIiwiJHBhcmVudCIsInBhZ2VSb290IiwibmF2aWdhdGVUbyIsInVybCIsImlkIiwidHlwZSIsImFwcGx5IiwiZ29SdWxlcyIsInBsYXlWaWRlbyIsInBsYXkiLCJzdG9wVmlkZW8iLCJjaGFuZ2VTd2lwZXIiLCJzZWVrIiwic3dpcGVyRW5kIiwiZXJyb3JWaWRlbyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsInJlcyIsInJlc3VsdCIsImZpbHRlciIsIml0ZW0iLCJjaGVja2VkIiwiY2IiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJzcHVJZCIsIkh0dHBSZXF1ZXN0IiwiRGV0YWlsSHR0cCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiaGlkZUxvYWRpbmciLCJlcnJvciIsImNvbGxlY3Rpb25JZCIsInJlc2V0VXNlckxldmVsIiwibWVtYmVySGFzaCIsImNvdmVyIiwibWVtYmVyUHJpY2UiLCJkZXNjcmlwdCIsImRlc2MiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb2xsZWN0SWQiLCJnZXRNYXJrVXNlciIsInNrdXMiLCJmb3JFYWNoIiwiZ29vZCIsIm5hbWUiLCJwcm9kdWN0TmFtZSIsImtlZXBDb3V0IiwicHVzaCIsIiRhcHBseSIsIm1pc3NUb2tlbiIsImNhdGNoIiwic2hvd0ZhaWwiLCJjb3VudCIsIkFkZENhcnRIdHRwIiwibWFya1R5cGUiLCJHZXRNYXJrVXNlciIsIlNldE1hcmtIdHRwIiwiQ2FuY2VsTWFya0h0dHAiLCJnZXRTeXN0ZW1JbmZvIiwid2luZG93SGVpZ2h0IiwiY3JlYXRlVmlkZW9Db250ZXh0IiwiZ2xvYmFsRGF0YSIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIs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QUF3QjlGLFFBQXhDO0FBQ0EsV0FBS2EsUUFBTCxDQUFjLFlBQU07QUFDbEIsZ0JBQUtYLFFBQUwsR0FBZ0IsUUFBS3lCLE9BQUwsQ0FBYW9FLFdBQWIsRUFBaEI7QUFDQSxnQkFBSzVGLFVBQUwsR0FBa0IsUUFBS3dCLE9BQUwsQ0FBYXFFLGFBQWIsRUFBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQUs1RixhQUFMLEdBQXFCLFFBQUt1QixPQUFMLENBQWFzRSxVQUFiLENBQXdCLE9BQXhCLEVBQWlDLFFBQUtoRyxXQUF0QyxDQUFyQjtBQUNBLGdCQUFLSSxjQUFMLEdBQXNCLFFBQUtzQixPQUFMLENBQWF1RSxXQUFiLENBQXlCLE1BQXpCLENBQXRCO0FBQ0QsT0FiRDtBQWNBLFdBQUtqQixNQUFMO0FBQ0Q7Ozs7RUEzYmlDLGVBQUtrQixJOztrQkFBcEIvSixNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCIsXCJ2LWJpbmQ6bWVzc2FnZVBhdGguc3luY1wiOlwiY3VycmVudFBhdGhcIixcInYtYmluZDpuaWNrX25hbWUuc3luY1wiOlwidXNlck5hbWVcIixcInYtYmluZDphdmF0YXIuc3luY1wiOlwidXNlckF2YXRhclwiLFwidi1iaW5kOmN1c3RvbWVyX2luZm9fc3RyLnN5bmNcIjpcImN1c3RvbWVyX2luZm9cIixcInYtYmluZDpub3RlX2luZm9fc3RyLnN5bmNcIjpcImJ1c3NpbmVzc19pbmZvXCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIixcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjpcIm5vU2FsZXNcIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcnRSZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vU2FsZXMgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIHByaWNlOiAnJyxcbiAgICAgICAgb2xkcHJpY2U6ICcnLFxuICAgICAgICBleHByZXNzOiAnMzguMCcsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZ29vZExpc3Q6IFtdXG4gICAgICB9LFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNmYzVlNjAnXG4gICAgICB9LFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZUlkOiAnJyxcbiAgICAgIGNvbGxlY3Q6IGZhbHNlLFxuICAgICAgb3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAwLFxuICAgICAgY29sbGVjdFR4dDogJ+acquaUtuiXjycsXG4gICAgICBjb2xsZWN0ZWRudW06ICcgJyxcbiAgICAgIGdvb2RzRGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9XSxcbiAgICAgIHRyYW5zcG9ydERldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfphY3pgIHojIPlm7QnLFxuICAgICAgICBkZXRhaWw6ICfotK3mu6Ey5YWs5pak5YWo5Zu95YyF6YKuJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeW/q+mAkicsXG4gICAgICAgIGRldGFpbDogJ+mhuuS4sOWGt+i/kCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHmlrnmoYgnLFxuICAgICAgICBkZXRhaWw6ICfphY3pgIHop4TliJknLFxuICAgICAgICBpc0xpbms6IHRydWVcbiAgICAgIH1dLFxuICAgICAgaXNBZGRDYXJ0OiB0cnVlLFxuICAgICAgY2FydE51bTogMSxcbiAgICAgIGFkZENhcnRDb3VudDogMCxcbiAgICAgIGNhcnRSZXN1bHQ6IFtdLFxuICAgICAgdG90YWxDYXJ0OiAwLFxuICAgICAgY2FydE1vZGFsOiBmYWxzZSxcbiAgICAgIGNvbGxlY3RJbWFnZTogJy4uL2ltYWdlL2ljb24tY2FydC1ibGFuay5wbmcnLFxuICAgICAgbWFya0lkOiAnJyxcbiAgICAgIHVzZXJMZXZlbDogMCxcbiAgICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICAgIHZpZGVvQ29udGV4dDogJycsXG4gICAgICBzaG93VmlkZW86IHRydWUsXG4gICAgICBzd2lwZXJTdG9wOiB0cnVlLFxuICAgICAgcmVmcmVuY2VDb2RlOiAnJyxcbiAgICAgIG1lbWJlcklkOiAnJyxcbiAgICAgIGN1cnJlbnRQYXRoOiAnJyxcbiAgICAgIHVzZXJOYW1lOiAnJyxcbiAgICAgIHVzZXJBdmF0YXI6ICcnLFxuICAgICAgY3VzdG9tZXJfaW5mbzoge1xuICAgICAgICAnZGVzY3JpcHRpb24nOiAnJyxcbiAgICAgICAgJ2xldmVsJzogJycsXG4gICAgICAgICdjZWxscGhvbmVzJzogW1snJywgJyddXVxuICAgICAgfSxcbiAgICAgIGJ1c3NpbmVzc19pbmZvOiB7XG4gICAgICAgICd0aXRsZSc6ICcnXG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjb2xsZWN0VGFwICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3QpIHtcbiAgICAgICAgICB0aGlzLnNldE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5pyq5pS26JePJ1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FydCAoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRDYXJ0Jykge1xuICAgICAgICAgIHRoaXMuaXNBZGRDYXJ0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2FkZEJ1eScpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5pbml0Q2FydFJlc3VsdCgpKVxuICAgICAgfSxcbiAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnRNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCA/IDAgOiAxXG4gICAgICB9LFxuICAgICAgcGx1c0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gKytcbiAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbnVzQ2FydCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSAtLVxuICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jYXJ0TnVtID0gMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHotK3nianovablh4/lsJHmlbDph49cbiAgICAgIH0sXG4gICAgICBrZXlDYXJ0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIHJldHVybiB0aGlzLmNhcnROdW1cbiAgICAgIH0sXG4gICAgICBibHVyQ2FydCAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtID4gMCAmJiB0aGlzLmNhcnROdW0gPiB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPD0gMCkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYWRkQ2FydEdvb2RzIChlKSB7XG4gICAgICAgIC8vIOWPkemAgemAieS4ree7k+aenFxuICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgICB0aGlzLmNhcnRSZXN1bHQgPSB0aGlzLmRldGFpbC5nb29kTGlzdFtlLmRldGFpbC52YWx1ZV1cbiAgICAgIH0sXG4gICAgICBnb0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5pc0FkZENhcnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcnROdW0gPD0gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgICAgICB0aGlzLmFkZENhcnRDb3VudCArPSBwYXJzZUludCh0aGlzLmNhcnROdW0pXG4gICAgICAgICAgICAgIC8vIOWPkemAgea3u+WKoOi0reeJqei9puivt+axglxuICAgICAgICAgICAgICB0aGlzLmFkZENhcnREYXRhKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P2lkPScgKyB0aGlzLmNhcnRSZXN1bHQuaWQgKyAnJnR5cGU9JyArIHRoaXMuY2FydFJlc3VsdC50eXBlICsgJyZjb3VudD0nICsgdGhpcy5jYXJ0TnVtXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1ldGhvZHMuY2xvc2VDYXJ0LmFwcGx5KHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1J1bGVzICgpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3J1bGVzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBsYXlWaWRlbyAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN3aXBlclN0b3ApIHtcbiAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGxheSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdG9wVmlkZW8gKCkge1xuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVN3aXBlciAoKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyU3RvcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnNlZWsoMClcbiAgICAgIH0sXG4gICAgICBzd2lwZXJFbmQgKCkge1xuICAgICAgICB0aGlzLnN3aXBlclN0b3AgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZXJyb3JWaWRlbyAoKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aSreaUvuWksei0pe+8jOivt+eojeWAmemHjeivlScsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2FydERhdGEgKCkge1xuICAgICAgLy8g5b6A5ZCO5Y+w5Y+R6K+35rGC5riF56m66LSt54mp6L2m6YCJ6aG5XG4gICAgfVxuICAgIGluaXRDYXJ0UmVzdWx0ICgpIHtcbiAgICAgIHRoaXMuY2FydFJlc3VsdCA9IFtdXG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFswXSA6IHRoaXMuZGV0YWlsLmdvb2RMaXN0WzBdXG4gICAgICB0aGlzLmNhcnROdW0gPSByZXN1bHQubGVuZ3RoID4gMCA/IDEgOiAwXG4gICAgfVxuICAgIGluaXREYXRhIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigwLCB0aGlzLnJlZnJlbmNlQ29kZSlcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNwdUlkOiB0aGlzLnBhZ2VJZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRldGFpbEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIHRoaXMuZGV0YWlsLmdvb2RMaXN0ID0gW11cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNMb2FkZWQgPSB0cnVlXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKCFkYXRhLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIOa1i+ivleeUqOaIt+i6q+S7veWPmOWMllxuICAgICAgICAgIF90aGlzLiRwYXJlbnQucmVzZXRVc2VyTGV2ZWwoZGF0YS5tZW1iZXJIYXNoLCB0aGlzLnRva2VuKVxuICAgICAgICAgIF90aGlzLmRldGFpbC5wYXRoID0gZGF0YS5jb3ZlclxuICAgICAgICAgIF90aGlzLmRldGFpbC50aXRsZSA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5jdXJyZW50UGF0aCA9IGRhdGEudGl0bGVcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucHJpY2UgPSBkYXRhLm1lbWJlclByaWNlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLm9sZHByaWNlID0gZGF0YS5wcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5kZXNjcmlwdCA9IGRhdGEuZGVzY1xuICAgICAgICAgIF90aGlzLmRldGFpbC50eXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLmlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgICAgIF90aGlzLmRldGFpbC5jb2xsZWN0SWQgPSBkYXRhLmNvbGxlY3Rpb25JZFxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKGRhdGEuc291cmNlSWQsIGRhdGEuc291cmNlVHlwZSlcbiAgICAgICAgICBpZiAoZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+W3suaUtuiXjydcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5za3VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QubmFtZSA9IGl0ZW0ucHJvZHVjdE5hbWUgKyBpdGVtLnRpdGxlXG4gICAgICAgICAgICBpZiAoX3RoaXMudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ29vZC5udW0gPSBpdGVtLmtlZXBDb3V0XG4gICAgICAgICAgICBpZiAoaXRlbS5rZWVwQ291dCA+IDApIHtcbiAgICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZ29vZC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QudHlwZSA9IGl0ZW0uc291cmNlVHlwZVxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmRldGFpbC5nb29kTGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBhZGRDYXJ0RGF0YSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc291cmNlVHlwZTogdGhpcy5jYXJ0UmVzdWx0LnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmNhcnRSZXN1bHQuaWQsXG4gICAgICAgIGNvdW50OiB0aGlzLmNhcnROdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRDYXJ0SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGdldE1hcmtVc2VyIChpZCwgdHlwZSkge1xuICAgICAgdGhpcy5jb2xsZWN0ZWRudW0gPSAnICdcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgc291cmNlVHlwZTogdHlwZSxcbiAgICAgICAgc291cmNlSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1VzZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuY29sbGVjdGVkbnVtID0gZGF0YS5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgc2V0TWFyayAoY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuZGV0YWlsLnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmRldGFpbC5pZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNldE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5tYXJrSWQgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8g6L2s5Y+RXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsLnRpdGxlLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2RldGFpbD9pZD0nICsgdGhpcy5wYWdlSWQgKyAnJnJlZnJlbmNlQ29kZT0nICsgdGhpcy5tZW1iZXJJZFxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICBpZiAoaWQucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gaWQucmVmcmVuY2VDb2RlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSB0cnVlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLnZpZGVvQ29udGV4dCA9IHdlcHkuY3JlYXRlVmlkZW9Db250ZXh0KCd2aWRlbycpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5tZW1iZXJJZCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm1lbWJlcklkXG4gICAgICB0aGlzLmluaXREYXRhKCgpID0+IHtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICAgIHRoaXMudXNlckF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgICAgLy8gaWYgKHRoaXMudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgIC8vICAgdGhpcy5jdXN0b21lcl9pbmZvLmxldmVsID0gJ25vcm1hbCdcbiAgICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLnVzZXJMZXZlbCA9PT0gMSkge1xuICAgICAgICAvLyAgIHRoaXMuY3VzdG9tZXJfaW5mby5sZXZlbCA9ICd2aXAnXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdGhpcy5jdXN0b21lcl9pbmZvLmNlbGxwaG9uZXNbMF1bMV0gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgIC8vIHRoaXMuY3VzdG9tZXJfaW5mby5kZXNjcmlwdGlvbiA9ICfllYblk4Hor6bmg4XpobUnICsgdGhpcy5jdXJyZW50UGF0aFxuICAgICAgICAvLyB0aGlzLmN1c3RvbWVyX2luZm8gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmN1c3RvbWVyX2luZm8pXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfaW5mbyA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKCfllYblk4Hor6bmg4XpobUnLCB0aGlzLmN1cnJlbnRQYXRoKVxuICAgICAgICB0aGlzLmJ1c3NpbmVzc19pbmZvID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCd0ZXN0JylcbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=