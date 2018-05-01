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
    }, _this2.$repeat = {}, _this2.$props = { "recGoods": { "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "hotGoods": { "v-bind:goodsItem.sync": "goods" }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTile" }, "defect": {}, "isDown": {} }, _this2.$events = { "recGoods": { "v-on:goodsTap": "goDetail" }, "hotGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      recGoods: _goods2.default,
      hotGoods: _goods2.default,
      load: _loading2.default,
      searchbar: _searchbar2.default,
      defect: _defect2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      winWidth: 0,
      winHeight: 0,
      pageTile: 'index',
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
      var token = this.$parent.getToken('index');
      var data = {
        pageNum: this.pageNum,
        recommendType: this.currentPage + 1,
        token: token,
        pageSize: '5'
      };
      parent.HttpRequest.IndexHttp(data).then(function (res) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwid2luV2lkdGgiLCJ3aW5IZWlnaHQiLCJwYWdlVGlsZSIsImJhbm5lckxpbmsiLCJwYXRoIiwiaWQiLCJ0b3BuYXZpZ2F0aW9uIiwiY3VycmVudFBhZ2UiLCJwYWdlYXV0byIsInN3aXBlck9wdCIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImN1cnJlbnRUYWIiLCJpbmRpY2F0b3JEb3RzIiwiaW5kaWNhdG9yQ29sb3IiLCJpbmRpY2F0b3JBY3RpdmUiLCJnb29kcyIsImxvYWRlZCIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc051bGwiLCJtZXRob2RzIiwibmF2VGFiIiwiaW5kZXgiLCJpbml0UGFnZSIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImljb24iLCJnZXRJbml0RGF0YSIsImhpZGVMb2FkaW5nIiwiY2IiLCJwYXJlbnQiLCIkcGFyZW50IiwiX3RoaXMiLCJ0b2tlbiIsImdldFRva2VuIiwicmVjb21tZW5kVHlwZSIsInBhZ2VTaXplIiwiSHR0cFJlcXVlc3QiLCJJbmRleEh0dHAiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJzcHVzIiwiY29uc29sZSIsImxvZyIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsImNvdmVyIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJwdXNoIiwiJGFwcGx5IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsInNjcmVlbkhlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixvQkFBWTtBQUZHO0FBRlYsSyxTQU9WQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMseUJBQXdCLE9BQXpCLEVBQWlDLGNBQWEsRUFBOUMsRUFBWixFQUE4RCxZQUFXLEVBQUMseUJBQXdCLE9BQXpCLEVBQXpFLEVBQTJHLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsVUFBMUMsRUFBdkgsRUFBNkssVUFBUyxFQUF0TCxFQUF5TCxVQUFTLEVBQWxNLEUsU0FDVEMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLGlCQUFnQixVQUFqQixFQUFaLEVBQXlDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBcEQsRSxTQUNUQyxVLEdBQWE7QUFDUkMsK0JBRFE7QUFFUkMsK0JBRlE7QUFHUkMsNkJBSFE7QUFJUkMsb0NBSlE7QUFLUkMsOEJBTFE7QUFNUkM7QUFOUSxLLFNBUVZDLEksR0FBTztBQUNMQyxnQkFBVSxDQURMO0FBRUxDLGlCQUFXLENBRk47QUFHTEMsZ0JBQVUsT0FITDtBQUlMQyxrQkFBWSxDQUFDLEVBQUNDLE1BQU0sNEJBQVAsRUFBcUNDLElBQUksTUFBekMsRUFBRCxFQUFtRCxFQUFDRCxNQUFNLDRCQUFQLEVBQXFDQyxJQUFJLE1BQXpDLEVBQW5ELEVBQXFHLEVBQUNELE1BQU0sNEJBQVAsRUFBcUNDLElBQUksTUFBekMsRUFBckcsRUFBdUosRUFBQ0QsTUFBTSw0QkFBUCxFQUFxQ0MsSUFBSSxNQUF6QyxF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QUEsaUJBQUt0RCxJQUFMLEdBQVlxRCxLQUFLRSxLQUFqQjtBQUNBRCxpQkFBS3ZCLEtBQUwsR0FBYXNCLEtBQUt0QixLQUFsQjtBQUNBdUIsaUJBQUtFLEtBQUwsR0FBYUgsS0FBS0ksV0FBbEI7QUFDQUgsaUJBQUtJLFFBQUwsR0FBZ0JMLEtBQUtHLEtBQXJCO0FBQ0FGLGlCQUFLSyxTQUFMLEdBQWlCTixLQUFLTSxTQUF0QjtBQUNBTCxpQkFBS3JELEVBQUwsR0FBVW9ELEtBQUtPLFFBQWY7QUFDQXRCLGtCQUFNekIsS0FBTixDQUFZZ0QsSUFBWixDQUFpQlAsSUFBakI7QUFDQW5CLGtCQUFNQSxJQUFOO0FBQ0QsV0FWRDtBQVdELFNBcEJELE1Bb0JPO0FBQ0wsaUJBQUtsQixNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0RxQixjQUFNd0IsTUFBTjtBQUNELE9BekJEO0FBMEJEOzs7K0JBQ1c7QUFDVixXQUFLakQsS0FBTCxHQUFhLEVBQWI7QUFDQSxXQUFLRSxPQUFMLEdBQWUsQ0FBZjtBQUNBLFdBQUtFLE1BQUwsR0FBYyxLQUFkO0FBQ0EsV0FBS2dCLFdBQUw7QUFDRDs7OzZCQUNTO0FBQ1IsVUFBSUssUUFBUSxJQUFaO0FBQ0EsV0FBS0wsV0FBTDtBQUNBLHFCQUFLOEIsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVsQixHQUFWLEVBQWU7QUFDdEJSLGdCQUFNMUMsUUFBTixHQUFpQmtELElBQUltQixXQUFyQjtBQUNBM0IsZ0JBQU16QyxTQUFOLEdBQWtCaUQsSUFBSW9CLFlBQXRCO0FBQ0FqQixrQkFBUUMsR0FBUixDQUFZSixJQUFJb0IsWUFBaEIsRUFBOEJwQixJQUFJcUIsWUFBbEM7QUFDRDtBQUxnQixPQUFuQjtBQU9BLFdBQUtMLE1BQUw7QUFDRDs7OztFQTFJK0IsZUFBS00sSTs7a0JBQWxCdkYsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmjqjojZAnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicmVjR29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJob3RHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaWxlXCJ9LFwiZGVmZWN0XCI6e30sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJyZWNHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9LFwiaG90R29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjR29vZHM6IEdvb2RzLFxuICAgICAgaG90R29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZyxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgd2luV2lkdGg6IDAsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBwYWdlVGlsZTogJ2luZGV4JyxcbiAgICAgIGJhbm5lckxpbms6IFt7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckFAMnguanBnJywgaWQ6ICdwbmcxJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQkAyeC5qcGcnLCBpZDogJ3BuZzInfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJDQDJ4LmpwZycsIGlkOiAncG5nMyd9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckRAMnguanBnJywgaWQ6ICdwbmc0J31dLFxuICAgICAgdG9wbmF2aWdhdGlvbjogWyfmjqjojZAnLCAn54Ot6ZeoJ10sXG4gICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgIHBhZ2VhdXRvOiBmYWxzZSxcbiAgICAgIHN3aXBlck9wdDoge1xuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgaW50ZXJ2YWw6IDIwMDAsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZmY2NjAwJ1xuICAgICAgfSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBpc0Rvd246IGZhbHNlXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hdlRhYiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGluZGV4XG4gICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVRhYiAoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUJhbm5lciAoZSkge1xuICAgICAgICB0aGlzLnN3aXBlck9wdC5jdXJyZW50VGFiID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgoKSA9PiB7XG4gICAgICAgICAgLy8g6K+35rGC5oiQ5Yqf5ZCO6ZqQ6JePbG9hZGluZ1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdpbmRleCcpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICByZWNvbW1lbmRUeXBlOiB0aGlzLmN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogJzUnXG4gICAgICB9XG4gICAgICBwYXJlbnQuSHR0cFJlcXVlc3QuSW5kZXhIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZSAoKSB7XG4gICAgICB0aGlzLmdvb2RzID0gW11cbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luV2lkdGggPSByZXMud2luZG93V2lkdGhcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLndpbmRvd0hlaWdodCwgcmVzLnNjcmVlbkhlaWdodClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==