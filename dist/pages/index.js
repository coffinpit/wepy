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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZ29vZHMiLCJsb2FkIiwic2VhcmNoYmFyIiwiZGF0YSIsIndpbldpZHRoIiwid2luSGVpZ2h0IiwiYmFubmVyTGluayIsInBhdGgiLCJpZCIsInRvcG5hdmlnYXRpb24iLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsInBhZ2VUYWIiLCJzY3JvbGxUb3AiLCJjcm9zcyIsImJhc2VIZWlnaHQiLCJ0aXRsZSIsInByaWNlIiwib2xkcHJpY2UiLCJsb2FkZWQiLCJtZXRob2RzIiwibmF2VGFiIiwiaW5kZXgiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImdvRGV0YWlsIiwibmF2aWdhdGVUbyIsInVybCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJpY29uIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwiX3RoaXMiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0Iiwic2NyZWVuSGVpZ2h0IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLElBRGpCO0FBRVBDLHVCQUFpQjtBQUNmLHFCQUFhLDRDQURF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UixDQUFZUSxJQUFJRSxZQUFoQixFQUE4QkYsSUFBSUcsWUFBbEM7QUFDRDtBQUxnQixPQUFuQjtBQU9BLFdBQUtDLE1BQUw7QUFDRDs7OztFQWpHK0IsZUFBS0MsSTs7a0JBQWxCL0QsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmjqjojZAnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZ29vZHNcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdvb2RzSXRlbS5vbmNlXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcImdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGdvb2RzOiBHb29kcyxcbiAgICAgIGxvYWQ6IExvYWRpbmcsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgd2luV2lkdGg6IDAsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBiYW5uZXJMaW5rOiBbe3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJBQDJ4LmpwZycsIGlkOiAncG5nMSd9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckJAMnguanBnJywgaWQ6ICdwbmcyJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQ0AyeC5qcGcnLCBpZDogJ3BuZzMnfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJEQDJ4LmpwZycsIGlkOiAncG5nNCd9XSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAyMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZmNjYwMCdcbiAgICAgIH0sXG4gICAgICBwYWdlVGFiOiB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiAxXG4gICAgICB9LFxuICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgY3Jvc3M6ICdzdHJldGNoJyxcbiAgICAgIGJhc2VIZWlnaHQ6IDEwMSxcbiAgICAgIGdvb2RzOiBbe1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgaWQ6ICcxMjMxMTIzJ1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgaWQ6ICcxMjM0MzIxJ1xuICAgICAgfV0sXG4gICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hdlRhYiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGluZGV4XG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIGNvbnNvbGUubG9nKHRva2VuKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCfliLDlupXkuoYnKVxuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICBpY29uOiAnbG9hZGluZydcbiAgICAgIH0pXG4gICAgICAvLyDlj5HpgIHor7fmsYLlubbmmL7npLrmlrDmlbDmja5cbiAgICAgIC8vIOivt+axguaIkOWKn+WQjumakOiXj2xvYWRpbmdcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luV2lkdGggPSByZXMud2luZG93V2lkdGhcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLndpbmRvd0hlaWdodCwgcmVzLnNjcmVlbkhlaWdodClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==