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
      memberId: ''
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
      var _this = this;
      var data = {
        markId: this.markId || this.detail.collectId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
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
      this.userLevel = this.$parent.globalData.userLevel;
      this.memberId = this.$parent.globalData.memberId;
      this.initData();
      this.$apply();
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlckJ1eSIsImNvdW50ZXJDYXJ0IiwibWVudUxpc3QiLCJjb21wdXRlZCIsInRvdGFsQ2FydCIsIk9iamVjdCIsImtleXMiLCJjYXJ0UmVzdWx0IiwibGVuZ3RoIiwicHJpY2UiLCJyZXBsYWNlIiwiY2FydE51bSIsInRvRml4ZWQiLCJtYXh0aXAiLCJudW0iLCJub1NhbGVzIiwiZGF0YSIsImRldGFpbCIsInBhdGgiLCJvbGRwcmljZSIsImV4cHJlc3MiLCJ0aXRsZSIsImdvb2RMaXN0Iiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsInRva2VuIiwicGFnZUlkIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImdvb2RzRGV0YWlsIiwidHJhbnNwb3J0RGV0YWlsIiwiaXNMaW5rIiwiaXNBZGRDYXJ0IiwiYWRkQ2FydENvdW50IiwiY2FydE1vZGFsIiwiY29sbGVjdEltYWdlIiwibWFya0lkIiwidXNlckxldmVsIiwiaXNMb2FkZWQiLCJ2aWRlb0NvbnRleHQiLCJzaG93VmlkZW8iLCJzd2lwZXJTdG9wIiwicmVmcmVuY2VDb2RlIiwibWVtYmVySWQiLCJtZXRob2RzIiwiY29sbGVjdFRhcCIsInNldE1hcmsiLCJDYW5jZWxNYXJrIiwiY2FydCIsImFjdGlvbiIsInBhdXNlIiwiaW5pdERhdGEiLCJpbml0Q2FydFJlc3VsdCIsImNsb3NlQ2FydCIsInBsdXNDYXJ0IiwibWludXNDYXJ0Iiwia2V5Q2FydCIsInZhbCIsImJsdXJDYXJ0IiwiYWRkQ2FydEdvb2RzIiwiZSIsInZhbHVlIiwiZ29DYXJ0IiwicGFyc2VJbnQiLCJhZGRDYXJ0RGF0YSIsIiRwYXJlbnQiLCJwYWdlUm9vdCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsInR5cGUiLCJhcHBseSIsImdvUnVsZXMiLCJwbGF5VmlkZW8iLCJwbGF5Iiwic3RvcFZpZGVvIiwiY2hhbmdlU3dpcGVyIiwic2VlayIsInN3aXBlckVuZCIsImVycm9yVmlkZW8iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiLCJyZXN1bHQiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2tlZCIsImNiIiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwic3B1SWQiLCJIdHRwUmVxdWVzdCIsIkRldGFpbEh0dHAiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImhpZGVMb2FkaW5nIiwiZXJyb3IiLCJjb2xsZWN0aW9uSWQiLCJyZXNldFVzZXJMZXZlbCIsIm1lbWJlckhhc2giLCJjb3ZlciIsIm1lbWJlclByaWNlIiwiZGVzY3JpcHQiLCJkZXNjIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwiY29sbGVjdElkIiwiZ2V0TWFya1VzZXIiLCJza3VzIiwiZm9yRWFjaCIsImdvb2QiLCJuYW1lIiwicHJvZHVjdE5hbWUiLCJrZWVwQ291dCIsInB1c2giLCIkYXBwbHkiLCJtaXNzVG9rZW4iLCJjYXRjaCIsInNob3dGYWlsIiwiY291bnQiLCJBZGRDYXJ0SHR0cCIsIm1hcmtUeXBlIiwiR2V0TWFya1VzZXIiLCJTZXRNYXJrSHR0cCIsIkNhbmNlbE1hcmtIdHRwIiwiZ2V0U3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsImdsb2JhbERhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0s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LElBQVo7QUFDQSxxQkFBS3FDLGFBQUwsQ0FBbUI7QUFDakI5QyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCUSxnQkFBTWxFLFNBQU4sR0FBa0IwRCxJQUFJOEMsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS1gsTUFBTDtBQUNEOzs7OEJBQ1U7QUFDVCxXQUFLaEYsWUFBTCxHQUFvQixlQUFLNEYsa0JBQUwsQ0FBd0IsT0FBeEIsQ0FBcEI7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBSzlGLFNBQUwsR0FBaUIsS0FBSzRCLE9BQUwsQ0FBYW1FLFVBQWIsQ0FBd0IvRixTQUF6QztBQUNBLFdBQUtNLFFBQUwsR0FBZ0IsS0FBS3NCLE9BQUwsQ0FBYW1FLFVBQWIsQ0FBd0J6RixRQUF4QztBQUNBLFdBQUtRLFFBQUw7QUFDQSxXQUFLb0UsTUFBTDtBQUNEOzs7O0VBOVppQyxlQUFLYyxJOztrQkFBcEJ0SixNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQm90dG9tIGZyb20gJy4uL2NvbXBvbmVudHMvYm90dG9tYmFyJ1xuICBpbXBvcnQgQ291bnQgZnJvbSAnLi4vY29tcG9uZW50cy9jb3VudGVyJ1xuICBpbXBvcnQgTWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB6K+m5oOFJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYm90dG9tXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNhcnRWYWwuc3luY1wiOlwiYWRkQ2FydENvdW50XCJ9LFwiY291bnRlckNhcnRcIjp7XCJjbGFzc1wiOlwiY2FsY3VsYXRlXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcImNhcnROdW1cIixcInYtYmluZDppc0Rpc2FibGVkLnN5bmNcIjpcIm5vU2FsZXNcIn19O1xyXG4kZXZlbnRzID0ge1wiYm90dG9tXCI6e1widi1vbjpidXlcIjpcImNhcnRcIixcInYtb246Y2FydFwiOlwiY2FydFwifSxcImNvdW50ZXJDYXJ0XCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NhcnRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW51c0NhcnRcIixcInYtb246a2V5RWRpdFwiOlwia2V5Q2FydFwiLFwidi1vbjpibHVyRWRpdFwiOlwiYmx1ckNhcnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGJvdHRvbTogQm90dG9tLFxuICAgICAgY291bnRlckJ1eTogQ291bnQsXG4gICAgICBjb3VudGVyQ2FydDogQ291bnQsXG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRvdGFsQ2FydCAoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcnRSZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgcHJpY2UgPSB0aGlzLmNhcnRSZXN1bHQucHJpY2UucmVwbGFjZSgvLC9nLCAnJykgKiB0aGlzLmNhcnROdW1cbiAgICAgICAgICByZXR1cm4gcHJpY2UudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF4dGlwICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+PSB0aGlzLmNhcnRSZXN1bHQubnVtKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vU2FsZXMgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIHByaWNlOiAnJyxcbiAgICAgICAgb2xkcHJpY2U6ICcnLFxuICAgICAgICBleHByZXNzOiAnMzguMCcsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZ29vZExpc3Q6IFtdXG4gICAgICB9LFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNmYzVlNjAnXG4gICAgICB9LFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZUlkOiAnJyxcbiAgICAgIGNvbGxlY3Q6IGZhbHNlLFxuICAgICAgb3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAwLFxuICAgICAgY29sbGVjdFR4dDogJ+acquaUtuiXjycsXG4gICAgICBjb2xsZWN0ZWRudW06ICcgJyxcbiAgICAgIGdvb2RzRGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9XSxcbiAgICAgIHRyYW5zcG9ydERldGFpbDogW3tcbiAgICAgICAgdGl0bGU6ICfphY3pgIHojIPlm7QnLFxuICAgICAgICBkZXRhaWw6ICfotK3mu6Ey5YWs5pak5YWo5Zu95YyF6YKuJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeW/q+mAkicsXG4gICAgICAgIGRldGFpbDogJ+mhuuS4sOWGt+i/kCdcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfphY3pgIHmlrnmoYgnLFxuICAgICAgICBkZXRhaWw6ICfphY3pgIHop4TliJknLFxuICAgICAgICBpc0xpbms6IHRydWVcbiAgICAgIH1dLFxuICAgICAgaXNBZGRDYXJ0OiB0cnVlLFxuICAgICAgY2FydE51bTogMSxcbiAgICAgIGFkZENhcnRDb3VudDogMCxcbiAgICAgIGNhcnRSZXN1bHQ6IFtdLFxuICAgICAgdG90YWxDYXJ0OiAwLFxuICAgICAgY2FydE1vZGFsOiBmYWxzZSxcbiAgICAgIGNvbGxlY3RJbWFnZTogJy4uL2ltYWdlL2ljb24tY2FydC1ibGFuay5wbmcnLFxuICAgICAgbWFya0lkOiAnJyxcbiAgICAgIHVzZXJMZXZlbDogMCxcbiAgICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICAgIHZpZGVvQ29udGV4dDogJycsXG4gICAgICBzaG93VmlkZW86IHRydWUsXG4gICAgICBzd2lwZXJTdG9wOiB0cnVlLFxuICAgICAgcmVmcmVuY2VDb2RlOiAnJyxcbiAgICAgIG1lbWJlcklkOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29sbGVjdFRhcCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0KSB7XG4gICAgICAgICAgdGhpcy5zZXRNYXJrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLkNhbmNlbE1hcmsoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHh0ID0gJ+acquaUtuiXjydcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhcnQgKGFjdGlvbikge1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkQ2FydCcpIHtcbiAgICAgICAgICB0aGlzLmlzQWRkQ2FydCA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdhZGRCdXknKSB7XG4gICAgICAgICAgdGhpcy5pc0FkZENhcnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSB0cnVlXG4gICAgICAgIHRoaXMuY2FydE1vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgICB0aGlzLmluaXREYXRhKHRoaXMuaW5pdENhcnRSZXN1bHQoKSlcbiAgICAgIH0sXG4gICAgICBjbG9zZUNhcnQgKCkge1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYXJ0TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLmNhcnROdW0gPSB0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDAgPyAwIDogMVxuICAgICAgfSxcbiAgICAgIHBsdXNDYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtICsrXG4gICAgICAgICAgaWYgKHRoaXMuY2FydE51bSA+IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW51c0NhcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gLS1cbiAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2FydE51bSA9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5YeP5bCR5pWw6YePXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsKSB7XG4gICAgICAgIHRoaXMuY2FydE51bSA9IHZhbFxuICAgICAgICByZXR1cm4gdGhpcy5jYXJ0TnVtXG4gICAgICB9LFxuICAgICAgYmx1ckNhcnQgKHZhbCkge1xuICAgICAgICBpZiAodmFsIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAxXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0UmVzdWx0Lm51bSA+IDAgJiYgdGhpcy5jYXJ0TnVtID4gdGhpcy5jYXJ0UmVzdWx0Lm51bSkge1xuICAgICAgICAgIHRoaXMuY2FydE51bSA9IHRoaXMuY2FydFJlc3VsdC5udW1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcnRSZXN1bHQubnVtIDw9IDApIHtcbiAgICAgICAgICB0aGlzLmNhcnROdW0gPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJ0TnVtID0gdmFsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydE51bVxuICAgICAgfSxcbiAgICAgIGFkZENhcnRHb29kcyAoZSkge1xuICAgICAgICAvLyDlj5HpgIHpgInkuK3nu5PmnpxcbiAgICAgICAgdGhpcy5jYXJ0TnVtID0gdGhpcy5jYXJ0UmVzdWx0Lm51bSA8PSAwID8gMCA6IDFcbiAgICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gdGhpcy5kZXRhaWwuZ29vZExpc3RbZS5kZXRhaWwudmFsdWVdXG4gICAgICB9LFxuICAgICAgZ29DYXJ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFJlc3VsdC5udW0gPiAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNBZGRDYXJ0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYXJ0TnVtIDw9IHRoaXMuY2FydFJlc3VsdC5udW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0Q291bnQgKz0gcGFyc2VJbnQodGhpcy5jYXJ0TnVtKVxuICAgICAgICAgICAgICAvLyDlj5HpgIHmt7vliqDotK3nianovabor7fmsYJcbiAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0RGF0YSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL3BheWJ1eT9pZD0nICsgdGhpcy5jYXJ0UmVzdWx0LmlkICsgJyZ0eXBlPScgKyB0aGlzLmNhcnRSZXN1bHQudHlwZSArICcmY291bnQ9JyArIHRoaXMuY2FydE51bVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tZXRob2RzLmNsb3NlQ2FydC5hcHBseSh0aGlzKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBwbGF5VmlkZW8gKCkge1xuICAgICAgICBpZiAodGhpcy5zd2lwZXJTdG9wKSB7XG4gICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSBmYWxzZVxuICAgICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBsYXkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3RvcFZpZGVvICgpIHtcbiAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VTd2lwZXIgKCkge1xuICAgICAgICB0aGlzLnN3aXBlclN0b3AgPSBmYWxzZVxuICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWVcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKVxuICAgICAgICB0aGlzLnZpZGVvQ29udGV4dC5zZWVrKDApXG4gICAgICB9LFxuICAgICAgc3dpcGVyRW5kICgpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJTdG9wID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGVycm9yVmlkZW8gKCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmkq3mlL7lpLHotKXvvIzor7fnqI3lgJnph43or5UnLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENhcnREYXRhICgpIHtcbiAgICAgIC8vIOW+gOWQjuWPsOWPkeivt+axgua4heepuui0reeJqei9pumAiemhuVxuICAgIH1cbiAgICBpbml0Q2FydFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLmNhcnRSZXN1bHQgPSBbXVxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGV0YWlsLmdvb2RMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkXG4gICAgICB9KVxuICAgICAgdGhpcy5jYXJ0UmVzdWx0ID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB0aGlzLmRldGFpbC5nb29kTGlzdFswXVxuICAgICAgdGhpcy5jYXJ0TnVtID0gcmVzdWx0Lmxlbmd0aCA+IDAgPyAxIDogMFxuICAgIH1cbiAgICBpbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oMCwgdGhpcy5yZWZyZW5jZUNvZGUpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzcHVJZDogdGhpcy5wYWdlSWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZXRhaWxIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICB0aGlzLmRldGFpbC5nb29kTGlzdCA9IFtdXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGVkID0gdHJ1ZVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmICghZGF0YS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDmtYvor5XnlKjmiLfouqvku73lj5jljJZcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnJlc2V0VXNlckxldmVsKGRhdGEubWVtYmVySGFzaCwgdGhpcy50b2tlbilcbiAgICAgICAgICBfdGhpcy5kZXRhaWwucGF0aCA9IGRhdGEuY292ZXJcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudGl0bGUgPSBkYXRhLnRpdGxlXG4gICAgICAgICAgX3RoaXMuZGV0YWlsLnByaWNlID0gZGF0YS5tZW1iZXJQcmljZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5vbGRwcmljZSA9IGRhdGEucHJpY2VcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuZGVzY3JpcHQgPSBkYXRhLmRlc2NcbiAgICAgICAgICBfdGhpcy5kZXRhaWwudHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgICAgIF90aGlzLmRldGFpbC5pZCA9IGRhdGEuc291cmNlSWRcbiAgICAgICAgICBfdGhpcy5kZXRhaWwuY29sbGVjdElkID0gZGF0YS5jb2xsZWN0aW9uSWRcbiAgICAgICAgICBfdGhpcy5nZXRNYXJrVXNlcihkYXRhLnNvdXJjZUlkLCBkYXRhLnNvdXJjZVR5cGUpXG4gICAgICAgICAgaWYgKGRhdGEuY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICflt7LmlLbol48nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3QgPSBmYWxzZVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdFR4dCA9ICfmnKrmlLbol48nXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuc2t1cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLm5hbWUgPSBpdGVtLnByb2R1Y3ROYW1lICsgaXRlbS50aXRsZVxuICAgICAgICAgICAgaWYgKF90aGlzLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2QubnVtID0gaXRlbS5rZWVwQ291dFxuICAgICAgICAgICAgaWYgKGl0ZW0ua2VlcENvdXQgPiAwKSB7XG4gICAgICAgICAgICAgIGdvb2QuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdvb2QuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnb29kLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBfdGhpcy5kZXRhaWwuZ29vZExpc3QucHVzaChnb29kKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0RGF0YShjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgYWRkQ2FydERhdGEgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuY2FydFJlc3VsdC50eXBlLFxuICAgICAgICBzb3VyY2VJZDogdGhpcy5jYXJ0UmVzdWx0LmlkLFxuICAgICAgICBjb3VudDogdGhpcy5jYXJ0TnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQWRkQ2FydEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRNYXJrVXNlciAoaWQsIHR5cGUpIHtcbiAgICAgIHRoaXMuY29sbGVjdGVkbnVtID0gJyAnXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE1hcmtVc2VyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLmNvbGxlY3RlZG51bSA9IGRhdGEubGVuZ3RoXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIHNldE1hcmsgKGNiKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHNvdXJjZVR5cGU6IHRoaXMuZGV0YWlsLnR5cGUsXG4gICAgICAgIHNvdXJjZUlkOiB0aGlzLmRldGFpbC5pZFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZXRNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMubWFya0lkID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLmdldE1hcmtVc2VyKF90aGlzLmRldGFpbC5pZCwgdGhpcy5kZXRhaWwudHlwZSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIENhbmNlbE1hcmsgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IHRoaXMubWFya0lkIHx8IHRoaXMuZGV0YWlsLmNvbGxlY3RJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuZ2V0TWFya1VzZXIoX3RoaXMuZGV0YWlsLmlkLCB0aGlzLmRldGFpbC50eXBlKVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8g6L2s5Y+RXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsLnRpdGxlLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2RldGFpbD9pZD0nICsgdGhpcy5wYWdlSWQgKyAnJnJlZnJlbmNlQ29kZT0nICsgdGhpcy5tZW1iZXJJZFxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKGlkKSB7XG4gICAgICB0aGlzLnBhZ2VJZCA9IGlkLmlkXG4gICAgICBpZiAoaWQucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gaWQucmVmcmVuY2VDb2RlXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSB0cnVlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICB0aGlzLnZpZGVvQ29udGV4dCA9IHdlcHkuY3JlYXRlVmlkZW9Db250ZXh0KCd2aWRlbycpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5tZW1iZXJJZCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm1lbWJlcklkXG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==