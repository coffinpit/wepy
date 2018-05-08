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
    }, _this2.$repeat = {}, _this2.$props = { "recGoods": { "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "hotGoods": { "v-bind:goodsItem.sync": "goods" }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTitle" }, "defect": {}, "isDown": {} }, _this2.$events = { "recGoods": { "v-on:goodsTap": "goDetail" }, "hotGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      recGoods: _goods2.default,
      hotGoods: _goods2.default,
      load: _loading2.default,
      searchbar: _searchbar2.default,
      defect: _defect2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      pageTitle: 'index',
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
      goods: [],
      loaded: false,
      pageNum: 1,
      totalPageNum: '',
      isNull: true,
      isDown: false
    }, _this2.methods = {
      navTab: function navTab(index) {
        this.currentPage = index;
        this.initPage();
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
      this.currentPage = 0;
      this.initPage();
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.getInitData();
      } else {
        if (this.goods.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'getInitData',
    value: function getInitData(cb) {
      var _this3 = this;

      this.$parent.showLoading();
      this.isDown = false;
      var parent = this.$parent;
      var _this = this;
      var token = this.$parent.getToken('index');
      var data = {
        pageNum: this.pageNum,
        recommendType: this.currentPage + 1,
        token: token,
        pageSize: '5'
      };
      parent.HttpRequest.IndexHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.totalPageNum = res.data.data.totalPageNum;
          var data = res.data.data.spus;
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
            if (data.totalCount <= _this3.pageSize) {
              _this.isDown = true;
            } else {
              _this.isDown = false;
            }
          }
          data.forEach(function (item, index) {
            var good = {};
            good.path = item.cover;
            good.title = item.title;
            good.price = item.memberPrice;
            good.oldprice = item.price;
            good.reduction = item.reduction;
            good.id = item.sourceId;
            good.descript = item.desc;
            _this.goods.push(good);
            cb && cb();
          });
        } else {
          _this.$parent.showFail();
          _this.isNull = true;
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
      });
    }
  }, {
    key: 'initPage',
    value: function initPage() {
      this.goods = [];
      this.pageNum = 1;
      this.isNull = false;
      this.getInitData();
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwicGFnZVRpdGxlIiwiYmFubmVyTGluayIsInBhdGgiLCJpZCIsInRvcG5hdmlnYXRpb24iLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsImdvb2RzIiwibG9hZGVkIiwicGFnZU51bSIsInRvdGFsUGFnZU51bSIsImlzTnVsbCIsIm1ldGhvZHMiLCJuYXZUYWIiLCJpbmRleCIsImluaXRQYWdlIiwiY2hhbmdlVGFiIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJjaGFuZ2VCYW5uZXIiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnZXRJbml0RGF0YSIsImxlbmd0aCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwicGFyZW50IiwiX3RoaXMiLCJ0b2tlbiIsImdldFRva2VuIiwicmVjb21tZW5kVHlwZSIsInBhZ2VTaXplIiwiSHR0cFJlcXVlc3QiLCJJbmRleEh0dHAiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3B1cyIsInRvdGFsQ291bnQiLCJmb3JFYWNoIiwiaXRlbSIsImdvb2QiLCJjb3ZlciIsInRpdGxlIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwic2hvd0ZhaWwiLCIk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LElBQUwsR0FBWW1ELEtBQUtFLEtBQWpCO0FBQ0FELGlCQUFLRSxLQUFMLEdBQWFILEtBQUtHLEtBQWxCO0FBQ0FGLGlCQUFLRyxLQUFMLEdBQWFKLEtBQUtLLFdBQWxCO0FBQ0FKLGlCQUFLSyxRQUFMLEdBQWdCTixLQUFLSSxLQUFyQjtBQUNBSCxpQkFBS00sU0FBTCxHQUFpQlAsS0FBS08sU0FBdEI7QUFDQU4saUJBQUtuRCxFQUFMLEdBQVVrRCxLQUFLUSxRQUFmO0FBQ0FQLGlCQUFLUSxRQUFMLEdBQWdCVCxLQUFLVSxJQUFyQjtBQUNBekIsa0JBQU12QixLQUFOLENBQVlpRCxJQUFaLENBQWlCVixJQUFqQjtBQUNBcEIsa0JBQU1BLElBQU47QUFDRCxXQVhEO0FBWUQsU0F6QkQsTUF5Qk87QUFDTEksZ0JBQU1ILE9BQU4sQ0FBYzhCLFFBQWQ7QUFDQTNCLGdCQUFNbkIsTUFBTixHQUFlLElBQWY7QUFDRDtBQUNEbUIsY0FBTTRCLE1BQU47QUFDRCxPQWhDRCxFQWdDR0MsS0FoQ0gsQ0FnQ1MsWUFBTTtBQUNiN0IsY0FBTW5CLE1BQU4sR0FBZSxJQUFmO0FBQ0QsT0FsQ0Q7QUFtQ0Q7OzsrQkFDVztBQUNWLFdBQUtKLEtBQUwsR0FBYSxFQUFiO0FBQ0EsV0FBS0UsT0FBTCxHQUFlLENBQWY7QUFDQSxXQUFLRSxNQUFMLEdBQWMsS0FBZDtBQUNBLFdBQUthLFdBQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS2tDLE1BQUw7QUFDRDs7OztFQW5JK0IsZUFBS0UsSTs7a0JBQWxCbkYsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmjqjojZAnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicmVjR29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJob3RHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaXRsZVwifSxcImRlZmVjdFwiOnt9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wicmVjR29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifSxcImhvdEdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHJlY0dvb2RzOiBHb29kcyxcbiAgICAgIGhvdEdvb2RzOiBHb29kcyxcbiAgICAgIGxvYWQ6IExvYWRpbmcsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaCxcbiAgICAgIGRlZmVjdDogRGVmZWN0LFxuICAgICAgaXNEb3duOiBSZWFjaGRvd25cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHBhZ2VUaXRsZTogJ2luZGV4JyxcbiAgICAgIGJhbm5lckxpbms6IFt7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckFAMnguanBnJywgaWQ6ICdwbmcxJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQkAyeC5qcGcnLCBpZDogJ3BuZzInfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJDQDJ4LmpwZycsIGlkOiAncG5nMyd9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckRAMnguanBnJywgaWQ6ICdwbmc0J31dLFxuICAgICAgdG9wbmF2aWdhdGlvbjogWyfmjqjojZAnLCAn54Ot6ZeoJ10sXG4gICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgIHBhZ2VhdXRvOiBmYWxzZSxcbiAgICAgIHN3aXBlck9wdDoge1xuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgaW50ZXJ2YWw6IDIwMDAsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmY2NjAwJ1xuICAgICAgfSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGlzRG93bjogZmFsc2VcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2VGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gaW5kZXhcbiAgICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMFxuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldEluaXREYXRhIChjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdpbmRleCcpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICByZWNvbW1lbmRUeXBlOiB0aGlzLmN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogJzUnXG4gICAgICB9XG4gICAgICBwYXJlbnQuSHR0cFJlcXVlc3QuSW5kZXhIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChkYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlICgpIHtcbiAgICAgIHRoaXMuZ29vZHMgPSBbXVxuICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=