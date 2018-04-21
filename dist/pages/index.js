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
    }, _this2.$repeat = {}, _this2.$props = { "goods": { "xmlns:v-bind": "", "v-bind:goodsItem.once": "goods", "xmlns:v-on": "" }, "load": { "xmlns:wx": "" } }, _this2.$events = { "goods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZ29vZHMiLCJsb2FkIiwiZGF0YSIsIndpbldpZHRoIiwid2luSGVpZ2h0IiwiYmFubmVyTGluayIsInBhdGgiLCJpZCIsInRvcG5hdmlnYXRpb24iLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsInBhZ2VUYWIiLCJjYXRvZ2FyeSIsInRpdGxlIiwic2Nyb2xsVG9wIiwiY3Jvc3MiLCJiYXNlSGVpZ2h0IiwicHJpY2UiLCJvbGRwcmljZSIsImxvYWRlZCIsIm1ldGhvZHMiLCJuYXZUYWIiLCJpbmRleCIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwiYmluZERvd25Mb2FkIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwiaWNvbiIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImJpbmR0b3AiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiX3RoaXMiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0Iiwic2NyZWVuSGVpZ2h0IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyx1QkFBaUI7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YyxLQUFkO0FBQ0QsU0FGRCxFQUVHLElBRkg7QUFHRCxPQTdCTztBQThCUmlCLGNBOUJRLG9CQThCRXJDLEVBOUJGLEVBOEJNO0FBQ1osdUJBQUtzQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUssaUJBQWlCdkM7QUFEUixTQUFoQjtBQUdEO0FBbENPLEs7Ozs7OzZCQW9DQTtBQUNSLFVBQU13QyxRQUFRLGVBQUtDLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBZDtBQUNBWCxjQUFRQyxHQUFSLENBQVlTLEtBQVo7QUFDRDs7OzZCQUNTO0FBQ1IsVUFBSUUsUUFBUSxJQUFaO0FBQ0EscUJBQUtDLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJILGdCQUFNOUMsUUFBTixHQUFpQmlELElBQUlDLFdBQXJCO0FBQ0FKLGdCQUFNN0MsU0FBTixHQUFrQmdELElBQUlFLFlBQXRCO0FBQ0FqQixrQkFBUUMsR0FBUixDQUFZYyxJQUFJRSxZQUFoQixFQUE4QkYsSUFBSUcsWUFBbEM7QUFDRDtBQUxnQixPQUFuQjtBQU9BLFdBQUtDLE1BQUw7QUFDRDs7OztFQXhHK0IsZUFBS0MsSTs7a0JBQWxCakUsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmjqjojZAnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZ29vZHNcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdvb2RzSXRlbS5vbmNlXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwibG9hZFwiOntcInhtbG5zOnd4XCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wiZ29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgZ29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgd2luV2lkdGg6IDAsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBiYW5uZXJMaW5rOiBbe3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJBQDJ4LnBuZycsIGlkOiAncG5nMSd9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckJAMngucG5nJywgaWQ6ICdwbmcyJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQ0AyeC5wbmcnLCBpZDogJ3BuZzMnfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJEQDJ4LnBuZycsIGlkOiAncG5nNCd9XSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCcsICfmkJzntKInXSxcbiAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgcGFnZWF1dG86IGZhbHNlLFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBpbnRlcnZhbDogMjAwMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNmZjY2MDAnXG4gICAgICB9LFxuICAgICAgcGFnZVRhYjoge1xuICAgICAgICBjdXJyZW50UGFnZTogMVxuICAgICAgfSxcbiAgICAgIGNhdG9nYXJ5OiBbe3BhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLCB0aXRsZTogJ+iCieemvSd9LCB7cGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsIHRpdGxlOiAn5rC05LqnJ30sIHtwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJywgdGl0bGU6ICfljqjlhbcnfSwge3BhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLCB0aXRsZTogJ+mFkumlrid9XSxcbiAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIGNyb3NzOiAnc3RyZXRjaCcsXG4gICAgICBiYXNlSGVpZ2h0OiAxMDEsXG4gICAgICBnb29kczogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgIGlkOiAnMTIzMTEyMydcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgIGlkOiAnMTIzNDMyMSdcbiAgICAgIH1dLFxuICAgICAgbG9hZGVkOiBmYWxzZVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYXZUYWIgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBpbmRleFxuICAgICAgfSxcbiAgICAgIGNoYW5nZVRhYiAoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUJhbm5lciAoZSkge1xuICAgICAgICB0aGlzLnN3aXBlck9wdC5jdXJyZW50VGFiID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGJpbmREb3duTG9hZCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfliLDlupXkuoYnKVxuICAgICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgICB9KVxuICAgICAgICAvLyDlj5HpgIHor7fmsYLlubbmmL7npLrmlrDmlbDmja5cbiAgICAgICAgLy8g6K+35rGC5oiQ5Yqf5ZCO6ZqQ6JePbG9hZGluZ1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgfSwgMTAwMClcbiAgICAgIH0sXG4gICAgICBiaW5kdG9wICgpIHtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlXG4gICAgICAgIC8vIOmhtemdouWIneWni+S4uuesrOS4gOmhtSDlubblj5HpgIHor7fmsYJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZVxuICAgICAgICB9LCAzMDAwKVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgY29uc3QgdG9rZW4gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICBjb25zb2xlLmxvZyh0b2tlbilcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5XaWR0aCA9IHJlcy53aW5kb3dXaWR0aFxuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHRcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMud2luZG93SGVpZ2h0LCByZXMuc2NyZWVuSGVpZ2h0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19