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
      isNull: false,
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
          console.log(data);
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
            if (data.length < _this3.pageSize) {
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
          _this.isNull = true;
        }
        _this.$apply();
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
      this.getInitData();
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwicGFnZVRpdGxlIiwiYmFubmVyTGluayIsInBhdGgiLCJpZCIsInRvcG5hdmlnYXRpb24iLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsImdvb2RzIiwibG9hZGVkIiwicGFnZU51bSIsInRvdGFsUGFnZU51bSIsImlzTnVsbCIsIm1ldGhvZHMiLCJuYXZUYWIiLCJpbmRleCIsImluaXRQYWdlIiwiY2hhbmdlVGFiIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJjaGFuZ2VCYW5uZXIiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnZXRJbml0RGF0YSIsImxlbmd0aCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwicGFyZW50IiwiX3RoaXMiLCJ0b2tlbiIsImdldFRva2VuIiwicmVjb21tZW5kVHlwZSIsInBhZ2VTaXplIiwiSHR0cFJlcXVlc3QiLCJJbmRleEh0dHAiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3B1cyIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsImNvdmVyIiwidGl0bGUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJyZWR1Y3Rpb24iLCJzb3VyY2VJZCIsImRlc2NyaXB0IiwiZGVzYyIsInB1c2giLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdz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TCxHQUFZa0QsS0FBS0UsS0FBakI7QUFDQUQsaUJBQUtFLEtBQUwsR0FBYUgsS0FBS0csS0FBbEI7QUFDQUYsaUJBQUtHLEtBQUwsR0FBYUosS0FBS0ssV0FBbEI7QUFDQUosaUJBQUtLLFFBQUwsR0FBZ0JOLEtBQUtJLEtBQXJCO0FBQ0FILGlCQUFLTSxTQUFMLEdBQWlCUCxLQUFLTyxTQUF0QjtBQUNBTixpQkFBS2xELEVBQUwsR0FBVWlELEtBQUtRLFFBQWY7QUFDQVAsaUJBQUtRLFFBQUwsR0FBZ0JULEtBQUtVLElBQXJCO0FBQ0F4QixrQkFBTXZCLEtBQU4sQ0FBWWdELElBQVosQ0FBaUJWLElBQWpCO0FBQ0FuQixrQkFBTUEsSUFBTjtBQUNELFdBWEQ7QUFZRCxTQTFCRCxNQTBCTztBQUNMSSxnQkFBTW5CLE1BQU4sR0FBZSxJQUFmO0FBQ0Q7QUFDRG1CLGNBQU0wQixNQUFOO0FBQ0QsT0FoQ0Q7QUFpQ0Q7OzsrQkFDVztBQUNWLFdBQUtqRCxLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUtFLE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS0UsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLYSxXQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtBLFdBQUw7QUFDQSxXQUFLZ0MsTUFBTDtBQUNEOzs7O0VBbEkrQixlQUFLQyxJOztrQkFBbEJoRixJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aOqOiNkCcsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy10b2FzdCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRvYXN0L2Rpc3QvaW5kZXgnLFxuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyZWNHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImhvdEdvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpdGxlXCJ9LFwiZGVmZWN0XCI6e30sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJyZWNHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9LFwiaG90R29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjR29vZHM6IEdvb2RzLFxuICAgICAgaG90R29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZyxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgcGFnZVRpdGxlOiAnaW5kZXgnLFxuICAgICAgYmFubmVyTGluazogW3twYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQUAyeC5qcGcnLCBpZDogJ3BuZzEnfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJCQDJ4LmpwZycsIGlkOiAncG5nMid9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckNAMnguanBnJywgaWQ6ICdwbmczJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyREAyeC5qcGcnLCBpZDogJ3BuZzQnfV0sXG4gICAgICB0b3BuYXZpZ2F0aW9uOiBbJ+aOqOiNkCcsICfng63pl6gnXSxcbiAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgcGFnZWF1dG86IGZhbHNlLFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBpbnRlcnZhbDogMjAwMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNmZjY2MDAnXG4gICAgICB9LFxuICAgICAgZ29vZHM6IFtdLFxuICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIGlzRG93bjogZmFsc2VcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2VGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gaW5kZXhcbiAgICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMFxuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldEluaXREYXRhIChjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdpbmRleCcpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICByZWNvbW1lbmRUeXBlOiB0aGlzLmN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogJzUnXG4gICAgICB9XG4gICAgICBwYXJlbnQuSHR0cFJlcXVlc3QuSW5kZXhIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZSAoKSB7XG4gICAgICB0aGlzLmdvb2RzID0gW11cbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=