'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
    }, _this2.$repeat = {}, _this2.$props = { "goods": { "xmlns:v-bind": "", "v-bind:goodsItem.once": "goods" }, "load": { "xmlns:wx": "" } }, _this2.$events = {}, _this2.components = {
      goods: _goods2.default,
      load: _loading2.default
    }, _this2.data = {
      winWidth: 0,
      winHeight: 0,
      bannerLink: [{ path: '../image/bg-bannerA@2x.png', id: 'png1' }, { path: '../image/bg-bannerB@2x.png', id: 'png2' }, { path: '../image/bg-bannerC@2x.png', id: 'png3' }, { path: '../image/bg-bannerD@2x.png', id: 'png4' }],
      topnavigation: ['推荐', '热门', '搜索'],
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
        oldprice: '160.0'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0'
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
      bindDownLoad: function bindDownLoad() {
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
      },
      bindtop: function bindtop() {
        var _this3 = this;

        this.loaded = true;
        // 页面初始为第一页 并发送请求
        setTimeout(function () {
          _this3.loaded = false;
        }, 3000);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZ29vZHMiLCJsb2FkIiwiZGF0YSIsIndpbldpZHRoIiwid2luSGVpZ2h0IiwiYmFubmVyTGluayIsInBhdGgiLCJpZCIsInRvcG5hdmlnYXRpb24iLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsInBhZ2VUYWIiLCJjYXRvZ2FyeSIsInRpdGxlIiwic2Nyb2xsVG9wIiwiY3Jvc3MiLCJiYXNlSGVpZ2h0IiwicHJpY2UiLCJvbGRwcmljZSIsImxvYWRlZCIsIm1ldGhvZHMiLCJuYXZUYWIiLCJpbmRleCIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwiYmluZERvd25Mb2FkIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwiaWNvbiIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImJpbmR0b3AiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiX3RoaXMiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0Iiwic2NyZWVuSGVpZ2h0IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyx1QkFBaUI7QUFDZixxQkFBYSw0Q0FERTtBQUVmLG9CQUFZO0FB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QUFZTSxLQUFaO0FBQ0Q7Ozs2QkFDUztBQUNSLFVBQUlFLFFBQVEsSUFBWjtBQUNBLHFCQUFLQyxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxnQkFBTTNDLFFBQU4sR0FBaUI4QyxJQUFJQyxXQUFyQjtBQUNBSixnQkFBTTFDLFNBQU4sR0FBa0I2QyxJQUFJRSxZQUF0QjtBQUNBZCxrQkFBUUMsR0FBUixDQUFZVyxJQUFJRSxZQUFoQixFQUE4QkYsSUFBSUcsWUFBbEM7QUFDRDtBQUxnQixPQUFuQjtBQU9BLFdBQUtDLE1BQUw7QUFDRDs7OztFQWpHK0IsZUFBS0MsSTs7a0JBQWxCOUQsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmjqjojZAnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZ29vZHNcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdvb2RzSXRlbS5vbmNlXCI6XCJnb29kc1wifSxcImxvYWRcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGdvb2RzOiBHb29kcyxcbiAgICAgIGxvYWQ6IExvYWRpbmdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHdpbldpZHRoOiAwLFxuICAgICAgd2luSGVpZ2h0OiAwLFxuICAgICAgYmFubmVyTGluazogW3twYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQUAyeC5wbmcnLCBpZDogJ3BuZzEnfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJCQDJ4LnBuZycsIGlkOiAncG5nMid9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckNAMngucG5nJywgaWQ6ICdwbmczJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyREAyeC5wbmcnLCBpZDogJ3BuZzQnfV0sXG4gICAgICB0b3BuYXZpZ2F0aW9uOiBbJ+aOqOiNkCcsICfng63pl6gnLCAn5pCc57SiJ10sXG4gICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgIHBhZ2VhdXRvOiBmYWxzZSxcbiAgICAgIHN3aXBlck9wdDoge1xuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgaW50ZXJ2YWw6IDIwMDAsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmY2NjAwJ1xuICAgICAgfSxcbiAgICAgIHBhZ2VUYWI6IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IDFcbiAgICAgIH0sXG4gICAgICBjYXRvZ2FyeTogW3twYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJywgdGl0bGU6ICfogonnpr0nfSwge3BhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLCB0aXRsZTogJ+awtOS6pyd9LCB7cGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsIHRpdGxlOiAn5Y6o5YW3J30sIHtwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJywgdGl0bGU6ICfphZLppa4nfV0sXG4gICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICBjcm9zczogJ3N0cmV0Y2gnLFxuICAgICAgYmFzZUhlaWdodDogMTAxLFxuICAgICAgZ29vZHM6IFt7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTYwLjAnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTYwLjAnXG4gICAgICB9XSxcbiAgICAgIGxvYWRlZDogZmFsc2VcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2VGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gaW5kZXhcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VUYWIgKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VCYW5uZXIgKGUpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJPcHQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBiaW5kRG93bkxvYWQgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygn5Yiw5bqV5LqGJylcbiAgICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgICBpY29uOiAnbG9hZGluZydcbiAgICAgICAgfSlcbiAgICAgICAgLy8g5Y+R6YCB6K+35rGC5bm25pi+56S65paw5pWw5o2uXG4gICAgICAgIC8vIOivt+axguaIkOWKn+WQjumakOiXj2xvYWRpbmdcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIH0sIDEwMDApXG4gICAgICB9LFxuICAgICAgYmluZHRvcCAoKSB7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZVxuICAgICAgICAvLyDpobXpnaLliJ3lp4vkuLrnrKzkuIDpobUg5bm25Y+R6YCB6K+35rGCXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2VcbiAgICAgICAgfSwgMzAwMClcbiAgICAgIH1cbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgY29uc29sZS5sb2codG9rZW4pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luV2lkdGggPSByZXMud2luZG93V2lkdGhcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLndpbmRvd0hlaWdodCwgcmVzLnNjcmVlbkhlaWdodClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==