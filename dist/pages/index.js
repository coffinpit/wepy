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

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

var _reachdown = require('./../components/reachdown.js');

var _reachdown2 = _interopRequireDefault(_reachdown);

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
    }, _this2.$repeat = {}, _this2.$props = { "recGoods": { "xmlns:v-bind": "", "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "hotGoods": { "v-bind:goodsItem.sync": "goods" }, "defect": {}, "isDown": {} }, _this2.$events = { "recGoods": { "v-on:goodsTap": "goDetail" }, "hotGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      recGoods: _goods2.default,
      hotGoods: _goods2.default,
      load: _loading2.default,
      searchbar: _searchbar2.default,
      defect: _defect2.default,
      isDown: _reachdown2.default
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
      goods: [],
      loaded: false,
      pageNum: 1,
      totalPageNum: '',
      isNull: false,
      isDown: false
    }, _this2.methods = {
      navTab: function navTab(index) {
        this.currentPage = index;
        this.goods = [];
        this.pageNum = 1;
        this.isNull = false;
        this.getInitData();
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
    value: function onShow() {}
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      _wepy2.default.showLoading({
        title: '加载中',
        icon: 'loading'
      });
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.getInitData(function () {
          // 请求成功后隐藏loading
          _wepy2.default.hideLoading();
        });
      } else {
        _wepy2.default.hideLoading();
        this.isDown = true;
      }
    }
  }, {
    key: 'getInitData',
    value: function getInitData(cb) {
      var _this3 = this;

      this.isDown = false;
      var parent = this.$parent;
      var _this = this;
      var token = _wepy2.default.getStorageSync('token');
      var data = {
        pageNum: this.pageNum,
        recommendType: this.currentPage + 1,
        token: token,
        pageSize: '5'
      };
      parent.HttpRequest.UserHttp(data).then(function (res) {
        if (res.data.error === 0) {
          _this.totalPageNum = res.data.data.totalPageNum;
          var data = res.data.data.spus;
          console.log(data);
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
          }
          data.forEach(function (item, index) {
            var good = {};
            good.path = item.cover;
            good.title = item.title;
            good.price = item.memberPrice;
            good.oldprice = item.price;
            good.reduction = item.reduction;
            good.id = item.sourceId;
            _this.goods.push(good);
            cb && cb();
          });
        } else {
          _this3.isNull = true;
        }
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this = this;
      this.getInitData();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwid2luV2lkdGgiLCJ3aW5IZWlnaHQiLCJiYW5uZXJMaW5rIiwicGF0aCIsImlkIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwicGFnZVRhYiIsInNjcm9sbFRvcCIsImNyb3NzIiwiYmFzZUhlaWdodCIsImdvb2RzIiwibG9hZGVkIiwicGFnZU51bSIsInRvdGFsUGFnZU51bSIsImlzTnVsbCIsIm1ldGhvZHMiLCJuYXZUYWIiLCJpbmRleCIsImdldEluaXREYXRhIiwiY2hhbmdlVGFiIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJjaGFuZ2VCYW5uZXIiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJzaG93TG9hZGluZyIsInRpdGxlIiwiaWNvbiIsImhpZGVMb2FkaW5nIiwiY2IiLCJwYXJlbnQiLCIkcGFyZW50IiwiX3RoaXMiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwicmVjb21tZW5kVHlwZSIsInBhZ2VTaXplIiwiSHR0cFJlcXVlc3QiLCJVc2VySHR0cCIsInRoZW4iLCJyZXMiLCJlcnJvciIsInNwdXMiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJnb29kIiwiY292ZXIiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJyZWR1Y3Rpb24iLCJzb3VyY2VJZCIsInB1c2giLCIkYXBwbHkiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0Iiwic2NyZWVuSGVpZ2h0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyx1QkFBaUI7QUFDZixxQkFBYSw0Q0FERTtBQUVmLG9CQUFZO0FBRkc7QUFGVixLLFNBT1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix5QkFBd0IsT0FBM0MsRUFBbUQsY0FBYSxFQUFoRSxFQUFaLEVBQWdGLFlBQVcsRUFBQyx5QkFBd0IsT0FBekIsRUFBM0YsRUFBNkgsVUFBUyxFQUF0SSxFQUF5SSxVQUFTLEVBQWxKLEUsU0FDVEMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLGlCQUFnQixVQUFqQixFQUFaLEVBQXlDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBcEQsRSxTQUNUQyxVLEdBQWE7QUFDUkMsK0JBRFE7QUFFUkMsK0JBRlE7QUFHUkMsNkJBSFE7QUFJUkMsb0NBSlE7QUFLUkMsOEJBTFE7QUFNUkM7QUFOUSxLLFNBUVZDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLGlCQUFXLENBRk47QUFHTEMsa0JBQVksQ0FBQyxFQUFDQyxNQUFNLDRCQUFQLEVBQXFDQyxJQUFJLE1BQXpDLEVBQUQsRUFBbUQsRUFBQ0QsTUFBTSw0QkFBUCxFQUFxQ0MsSUFBSSxNQUF6QyxFQUFuRCxFQUFxRyxFQUFDRCxNQUFNLDRCQUFQLEVBQXFDQyxJQUFJLE1BQXpDLEVBQXJHLEVBQXVKLEVBQUNELE1BQU0sNEJBQVAsRUFBcUNDLElBQUksTUFBekMsRUFBdkosQ0FIUDtBQUlMQyxxQkFBZSxDQUFD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QUFmO0FBQ0Q7QUFDRHpCLGVBQUsyRCxPQUFMLENBQWEsVUFBQ0MsSUFBRCxFQUFPaEMsS0FBUCxFQUFpQjtBQUM1QixnQkFBSWlDLE9BQU8sRUFBWDtBQUNBQSxpQkFBS3pELElBQUwsR0FBWXdELEtBQUtFLEtBQWpCO0FBQ0FELGlCQUFLdEIsS0FBTCxHQUFhcUIsS0FBS3JCLEtBQWxCO0FBQ0FzQixpQkFBS0UsS0FBTCxHQUFhSCxLQUFLSSxXQUFsQjtBQUNBSCxpQkFBS0ksUUFBTCxHQUFnQkwsS0FBS0csS0FBckI7QUFDQUYsaUJBQUtLLFNBQUwsR0FBaUJOLEtBQUtNLFNBQXRCO0FBQ0FMLGlCQUFLeEQsRUFBTCxHQUFVdUQsS0FBS08sUUFBZjtBQUNBdEIsa0JBQU14QixLQUFOLENBQVkrQyxJQUFaLENBQWlCUCxJQUFqQjtBQUNBbkIsa0JBQU1BLElBQU47QUFDRCxXQVZEO0FBV0QsU0FwQkQsTUFvQk87QUFDTCxpQkFBS2pCLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFDRG9CLGNBQU13QixNQUFOO0FBQ0QsT0F6QkQ7QUEwQkQ7Ozs2QkFDUztBQUNSLFVBQUl4QixRQUFRLElBQVo7QUFDQSxXQUFLaEIsV0FBTDtBQUNBLHFCQUFLeUMsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVsQixHQUFWLEVBQWU7QUFDdEJSLGdCQUFNNUMsUUFBTixHQUFpQm9ELElBQUltQixXQUFyQjtBQUNBM0IsZ0JBQU0zQyxTQUFOLEdBQWtCbUQsSUFBSW9CLFlBQXRCO0FBQ0FqQixrQkFBUUMsR0FBUixDQUFZSixJQUFJb0IsWUFBaEIsRUFBOEJwQixJQUFJcUIsWUFBbEM7QUFDRDtBQUxnQixPQUFuQjtBQU9BLFdBQUtMLE1BQUw7QUFDRDs7OztFQTFJK0IsZUFBS00sSTs7a0JBQWxCekYsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmjqjojZAnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicmVjR29vZHNcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiaG90R29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCJ9LFwiZGVmZWN0XCI6e30sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJyZWNHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9LFwiaG90R29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjR29vZHM6IEdvb2RzLFxuICAgICAgaG90R29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZyxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgd2luV2lkdGg6IDAsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBiYW5uZXJMaW5rOiBbe3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJBQDJ4LmpwZycsIGlkOiAncG5nMSd9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckJAMnguanBnJywgaWQ6ICdwbmcyJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQ0AyeC5qcGcnLCBpZDogJ3BuZzMnfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJEQDJ4LmpwZycsIGlkOiAncG5nNCd9XSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAyMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZmNjYwMCdcbiAgICAgIH0sXG4gICAgICBwYWdlVGFiOiB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiAxXG4gICAgICB9LFxuICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgY3Jvc3M6ICdzdHJldGNoJyxcbiAgICAgIGJhc2VIZWlnaHQ6IDEwMSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBpc0Rvd246IGZhbHNlXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hdlRhYiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGluZGV4XG4gICAgICAgIHRoaXMuZ29vZHMgPSBbXVxuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICBpY29uOiAnbG9hZGluZydcbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldEluaXREYXRhKCgpID0+IHtcbiAgICAgICAgICAvLyDor7fmsYLmiJDlip/lkI7pmpDol49sb2FkaW5nXG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGdldEluaXREYXRhIChjYikge1xuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudFxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgY29uc3QgdG9rZW4gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICByZWNvbW1lbmRUeXBlOiB0aGlzLmN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogJzUnXG4gICAgICB9XG4gICAgICBwYXJlbnQuSHR0cFJlcXVlc3QuVXNlckh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5XaWR0aCA9IHJlcy53aW5kb3dXaWR0aFxuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHRcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMud2luZG93SGVpZ2h0LCByZXMuc2NyZWVuSGVpZ2h0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19