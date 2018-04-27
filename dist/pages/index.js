'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _searchbar = require('./../components/searchbar.js');

var _searchbar2 = _interopRequireDefault(_searchbar);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_wepy$page) {
  _inherits(Main, _wepy$page);

  function Main() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Main);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Main.__proto__ || Object.getPrototypeOf(Main)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '推荐',
      usingComponents: {
        'wxc-toast': '../../packages/@minui/wxc-toast/dist/index',
        'wxc-flex': '../../packages/@minui/wxc-flex/dist/index'
      }
    }, _this2.$repeat = {}, _this2.$props = { "recGoods": { "xmlns:v-bind": "", "v-bind:goodsItem.once": "goods", "xmlns:v-on": "" }, "hotGoods": { "v-bind:goodsItem.once": "goods" } }, _this2.$events = { "recGoods": { "v-on:goodsTap": "goDetail" }, "hotGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      recGoods: _goods2.default,
      hotGoods: _goods2.default,
      load: _loading2.default,
      searchbar: _searchbar2.default
    }, _this2.data = {
      winWidth: 0,
      winHeight: 0,
      bannerLink: [{ path: '../image/bg-bannerA@2x.jpg', id: 'png1' }, { path: '../image/bg-bannerB@2x.jpg', id: 'png2' }, { path: '../image/bg-bannerC@2x.jpg', id: 'png3' }, { path: '../image/bg-bannerD@2x.jpg', id: 'png4' }],
      topnavigation: ['推荐', '热门'],
      currentPage: 0,
      pageauto: false,
      swiperOpt: {
        autoplay: true,
        interval: 2000,
        duration: 1000,
        currentTab: 0,
        indicatorDots: true,
        indicatorColor: '#cccccc',
        indicatorActive: '#ff6600'
      },
      pageTab: {
        currentPage: 1
      },
      scrollTop: 0,
      cross: 'stretch',
      baseHeight: 101,
      goods: [{
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1231123'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1234321'
      }],
      loaded: false
    }, _this2.methods = {
      navTab: function navTab(index) {
        this.currentPage = index;
      },
      changeTab: function changeTab(e) {
        this.currentPage = e.detail.current;
      },
      changeBanner: function changeBanner(e) {
        this.swiperOpt.currentTab = e.detail.current;
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Main, [{
    key: 'onShow',
    value: function onShow() {
      var token = _wepy2.default.getStorageSync('token');
      console.log(token);
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      console.log('到底了');
      // 显示加载状态
      _wepy2.default.showLoading({
        title: '加载中',
        icon: 'loading'
      });
      // 发送请求并显示新数据
      // 请求成功后隐藏loading
      setTimeout(function () {
        _wepy2.default.hideLoading();
      }, 1000);
    }
  }, {
    key: 'getInitData',
    value: function getInitData() {
      var _this = this.$parent;
      var data = {
        token: '5a98c06cbc74d423378',
        recommendType: 1,
        pageSize: 5,
        pageNum: 1
      };
      _this.HttpRequest.UserHttp(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getInitData();
      var _this = this;
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          _this.winWidth = res.windowWidth;
          _this.winHeight = res.windowHeight;
          console.log(res.windowHeight, res.screenHeight);
        }
      });
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkYXRhIiwid2luV2lkdGgiLCJ3aW5IZWlnaHQiLCJiYW5uZXJMaW5rIiwicGF0aCIsImlkIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwicGFnZVRhYiIsInNjcm9sbFRvcCIsImNyb3NzIiwiYmFzZUhlaWdodCIsImdvb2RzIiwidGl0bGUiLCJwcmljZSIsIm9sZHByaWNlIiwibG9hZGVkIiwibWV0aG9kcyIsIm5hdlRhYiIsImluZGV4IiwiY2hhbmdlVGFiIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJjaGFuZ2VCYW5uZXIiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwiaWNvbiIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsIl90aGlzIiwiJHBhcmVudCIsInJlY29tbWVuZFR5cGUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJIdHRwUmVxdWVzdCIsIlVzZXJIdHRwIiwidGhlbiIsInJlcyIsImdldEluaXREYXRhIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsInNjcmVlbkhlaWdodCIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FB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T0FGRCxFQUVHLElBRkg7QUFHRDs7O2tDQUNjO0FBQ2IsVUFBSUMsUUFBUSxLQUFLQyxPQUFqQjtBQUNBLFVBQUk5QyxPQUFPO0FBQ1RxQyxlQUFPLHFCQURFO0FBRVRVLHVCQUFlLENBRk47QUFHVEMsa0JBQVUsQ0FIRDtBQUlUQyxpQkFBUztBQUpBLE9BQVg7QUFNQUosWUFBTUssV0FBTixDQUFrQkMsUUFBbEIsQ0FBMkJuRCxJQUEzQixFQUFpQ29ELElBQWpDLENBQXNDLFVBQUNDLEdBQUQsRUFBUztBQUM3Q2QsZ0JBQVFDLEdBQVIsQ0FBWWEsR0FBWjtBQUNELE9BRkQ7QUFHRDs7OzZCQUNTO0FBQ1IsV0FBS0MsV0FBTDtBQUNBLFVBQUlULFFBQVEsSUFBWjtBQUNBLHFCQUFLVSxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVUgsR0FBVixFQUFlO0FBQ3RCUixnQkFBTTVDLFFBQU4sR0FBaUJvRCxJQUFJSSxXQUFyQjtBQUNBWixnQkFBTTNDLFNBQU4sR0FBa0JtRCxJQUFJSyxZQUF0QjtBQUNBbkIsa0JBQVFDLEdBQVIsQ0FBWWEsSUFBSUssWUFBaEIsRUFBOEJMLElBQUlNLFlBQWxDO0FBQ0Q7QUFMZ0IsT0FBbkI7QUFPQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUEvRytCLGVBQUtDLEk7O2tCQUFsQnpFLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o6o6I2QJyxcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICAnd3hjLXRvYXN0JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtdG9hc3QvZGlzdC9pbmRleCcsXG4gICAgICAgICd3eGMtZmxleCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWZsZXgvZGlzdC9pbmRleCdcbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInJlY0dvb2RzXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpnb29kc0l0ZW0ub25jZVwiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImhvdEdvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5vbmNlXCI6XCJnb29kc1wifX07XHJcbiRldmVudHMgPSB7XCJyZWNHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9LFwiaG90R29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjR29vZHM6IEdvb2RzLFxuICAgICAgaG90R29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZyxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB3aW5XaWR0aDogMCxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGJhbm5lckxpbms6IFt7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckFAMnguanBnJywgaWQ6ICdwbmcxJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQkAyeC5qcGcnLCBpZDogJ3BuZzInfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJDQDJ4LmpwZycsIGlkOiAncG5nMyd9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckRAMnguanBnJywgaWQ6ICdwbmc0J31dLFxuICAgICAgdG9wbmF2aWdhdGlvbjogWyfmjqjojZAnLCAn54Ot6ZeoJ10sXG4gICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgIHBhZ2VhdXRvOiBmYWxzZSxcbiAgICAgIHN3aXBlck9wdDoge1xuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgaW50ZXJ2YWw6IDIwMDAsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmY2NjAwJ1xuICAgICAgfSxcbiAgICAgIHBhZ2VUYWI6IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IDFcbiAgICAgIH0sXG4gICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICBjcm9zczogJ3N0cmV0Y2gnLFxuICAgICAgYmFzZUhlaWdodDogMTAxLFxuICAgICAgZ29vZHM6IFt7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICBpZDogJzEyMzExMjMnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICBpZDogJzEyMzQzMjEnXG4gICAgICB9XSxcbiAgICAgIGxvYWRlZDogZmFsc2VcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2VGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gaW5kZXhcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VUYWIgKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VCYW5uZXIgKGUpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJPcHQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgY29uc29sZS5sb2codG9rZW4pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgY29uc29sZS5sb2coJ+WIsOW6leS6hicpXG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgfSlcbiAgICAgIC8vIOWPkemAgeivt+axguW5tuaYvuekuuaWsOaVsOaNrlxuICAgICAgLy8g6K+35rGC5oiQ5Yqf5ZCO6ZqQ6JePbG9hZGluZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gICAgZ2V0SW5pdERhdGEgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcy4kcGFyZW50XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46ICc1YTk4YzA2Y2JjNzRkNDIzMzc4JyxcbiAgICAgICAgcmVjb21tZW5kVHlwZTogMSxcbiAgICAgICAgcGFnZVNpemU6IDUsXG4gICAgICAgIHBhZ2VOdW06IDFcbiAgICAgIH1cbiAgICAgIF90aGlzLkh0dHBSZXF1ZXN0LlVzZXJIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luV2lkdGggPSByZXMud2luZG93V2lkdGhcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLndpbmRvd0hlaWdodCwgcmVzLnNjcmVlbkhlaWdodClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==