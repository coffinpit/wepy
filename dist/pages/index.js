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
    }, _this2.$repeat = {}, _this2.$props = { "goods": { "xmlns:v-bind": "", "v-bind:goodsItem.once": "goods", "xmlns:v-on": "" } }, _this2.$events = { "goods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      goods: _goods2.default,
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
      catogary: [{ path: '../image/login-bg.jpg', title: '肉禽' }, { path: '../image/login-bg.jpg', title: '水产' }, { path: '../image/login-bg.jpg', title: '厨具' }, { path: '../image/login-bg.jpg', title: '酒饮' }],
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
    key: 'onLoad',
    value: function onLoad() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZ29vZHMiLCJsb2FkIiwic2VhcmNoYmFyIiwiZGF0YSIsIndpbldpZHRoIiwid2luSGVpZ2h0IiwiYmFubmVyTGluayIsInBhdGgiLCJpZCIsInRvcG5hdmlnYXRpb24iLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsInBhZ2VUYWIiLCJjYXRvZ2FyeSIsInRpdGxlIiwic2Nyb2xsVG9wIiwiY3Jvc3MiLCJiYXNlSGVpZ2h0IiwicHJpY2UiLCJvbGRwcmljZSIsImxvYWRlZCIsIm1ldGhvZHMiLCJuYXZUYWIiLCJpbmRleCIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJzaG93TG9hZGluZyIsImljb24iLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJfdGhpcyIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwid2luZG93V2lkdGgiLCJ3aW5kb3dIZWlnaHQiLCJzY3JlZW5IZWlnaHQiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUEMsdUJBQWlCO0FBQ2Ys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dUJBQUtDLFdBQUw7QUFDRCxPQUZELEVBRUcsSUFGSDtBQUdEOzs7NkJBQ1M7QUFDUixVQUFJQyxRQUFRLElBQVo7QUFDQSxxQkFBS0MsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QkgsZ0JBQU01QyxRQUFOLEdBQWlCK0MsSUFBSUMsV0FBckI7QUFDQUosZ0JBQU0zQyxTQUFOLEdBQWtCOEMsSUFBSUUsWUFBdEI7QUFDQVgsa0JBQVFDLEdBQVIsQ0FBWVEsSUFBSUUsWUFBaEIsRUFBOEJGLElBQUlHLFlBQWxDO0FBQ0Q7QUFMZ0IsT0FBbkI7QUFPQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUFsRytCLGVBQUtDLEk7O2tCQUFsQmhFLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o6o6I2QJyxcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICAnd3hjLXRvYXN0JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtdG9hc3QvZGlzdC9pbmRleCcsXG4gICAgICAgICd3eGMtZmxleCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWZsZXgvZGlzdC9pbmRleCdcbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImdvb2RzXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpnb29kc0l0ZW0ub25jZVwiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJnb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBnb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nLFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2hcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHdpbldpZHRoOiAwLFxuICAgICAgd2luSGVpZ2h0OiAwLFxuICAgICAgYmFubmVyTGluazogW3twYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQUAyeC5qcGcnLCBpZDogJ3BuZzEnfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJCQDJ4LmpwZycsIGlkOiAncG5nMid9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckNAMnguanBnJywgaWQ6ICdwbmczJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyREAyeC5qcGcnLCBpZDogJ3BuZzQnfV0sXG4gICAgICB0b3BuYXZpZ2F0aW9uOiBbJ+aOqOiNkCcsICfng63pl6gnXSxcbiAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgcGFnZWF1dG86IGZhbHNlLFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBpbnRlcnZhbDogMjAwMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNmZjY2MDAnXG4gICAgICB9LFxuICAgICAgcGFnZVRhYjoge1xuICAgICAgICBjdXJyZW50UGFnZTogMVxuICAgICAgfSxcbiAgICAgIGNhdG9nYXJ5OiBbe3BhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLCB0aXRsZTogJ+iCieemvSd9LCB7cGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsIHRpdGxlOiAn5rC05LqnJ30sIHtwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJywgdGl0bGU6ICfljqjlhbcnfSwge3BhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLCB0aXRsZTogJ+mFkumlrid9XSxcbiAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIGNyb3NzOiAnc3RyZXRjaCcsXG4gICAgICBiYXNlSGVpZ2h0OiAxMDEsXG4gICAgICBnb29kczogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgIGlkOiAnMTIzMTEyMydcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgIGlkOiAnMTIzNDMyMSdcbiAgICAgIH1dLFxuICAgICAgbG9hZGVkOiBmYWxzZVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYXZUYWIgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBpbmRleFxuICAgICAgfSxcbiAgICAgIGNoYW5nZVRhYiAoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUJhbm5lciAoZSkge1xuICAgICAgICB0aGlzLnN3aXBlck9wdC5jdXJyZW50VGFiID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgY29uc3QgdG9rZW4gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICBjb25zb2xlLmxvZyh0b2tlbilcbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICBjb25zb2xlLmxvZygn5Yiw5bqV5LqGJylcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgICB9KVxuICAgICAgLy8g5Y+R6YCB6K+35rGC5bm25pi+56S65paw5pWw5o2uXG4gICAgICAvLyDor7fmsYLmiJDlip/lkI7pmpDol49sb2FkaW5nXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbldpZHRoID0gcmVzLndpbmRvd1dpZHRoXG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy53aW5kb3dIZWlnaHQsIHJlcy5zY3JlZW5IZWlnaHQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=