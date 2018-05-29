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
      navigationBarTitleText: '正善牛肉',
      usingComponents: {
        'wxc-toast': '../../packages/@minui/wxc-toast/dist/index',
        'wxc-flex': '../../packages/@minui/wxc-flex/dist/index'
      }
    }, _this2.$repeat = {}, _this2.$props = { "recGoods": { "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "hotGoods": { "v-bind:goodsItem.sync": "goods" }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTitle" }, "defect": { "type": "1" }, "isDown": {} }, _this2.$events = { "recGoods": { "v-on:goodsTap": "goDetail" }, "hotGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      recGoods: _goods2.default,
      hotGoods: _goods2.default,
      load: _loading2.default,
      searchbar: _searchbar2.default,
      defect: _defect2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      token: '',
      pageTitle: 'index',
      bannerLink: [],
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
      isDown: false,
      isLoading: false,
      userLevel: false,
      vipEnd: ''
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
      },
      goApplyVip: function goApplyVip() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Main, [{
    key: 'onShow',
    value: function onShow() {
      this.currentPage = 0;
      this.isLoading = false;
      this.initPage();
      this.getBanner();
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

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      this.isDown = false;
      var parent = this.$parent;
      var _this = this;
      var data = {
        pageNum: this.pageNum,
        recommendType: this.currentPage + 1,
        token: this.token,
        pageSize: '5'
      };
      parent.HttpRequest.IndexHttp(data, function () {
        _this.$parent.showFail();
        _this.isNull = true;
      }).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          _this.totalPageNum = res.data.data.totalPageNum;
          var data = res.data.data.spus;
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
            if (res.data.data.totalCount <= _this3.pageSize) {
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
          if (_this.$parent.missToken) {
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.getInitData();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
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
    key: 'getBanner',
    value: function getBanner() {
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.bannerLink = [];
      var _this = this;
      var data = {
        token: this.token,
        siteNo: 'index'
      };
      this.$parent.HttpRequest.GetBanner(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.path = item.image;
            obj.id = item.id;
            obj.sortId = item.sort;
            obj.detailId = item.uri.split(',')[1];
            _this.bannerLink.push(obj);
            _this.bannerLink.sort(function (obj1, obj2) {
              var val1 = obj1.sortId;
              var val2 = obj2.sortId;
              if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }
            });
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken();
            _this.getBanner();
          }
        }
        _this.isLoading = true;
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.userLevel = this.$parent.globalData.userLevel;
      console.log(this.userLevel);
      this.vipEnd = this.$parent.dateFormat(this.$parent.globalData.vipEnd * 1000, 'Y年m月d日');
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiZ29vZHMiLCJsb2FkZWQiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNOdWxsIiwiaXNMb2FkaW5nIiwidXNlckxldmVsIiwidmlwRW5kIiwibWV0aG9kcyIsIm5hdlRhYiIsImluZGV4IiwiaW5pdFBhZ2UiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29BcHBseVZpcCIsImdldEJhbm5lciIsImdldEluaXREYXRhIiwibGVuZ3RoIiwiY2IiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsInBhcmVudCIsIl90aGlzIiwicmVjb21tZW5kVHlwZSIsInBhZ2VTaXplIiwiSHR0cFJlcXVlc3QiLCJJbmRleEh0dHAiLCJzaG93RmFpbCIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzaG93U3VjY2VzcyIsInNwdXMiLCJ0b3RhbENvdW50IiwiZm9yRWFjaCIsIml0ZW0iLCJnb29kIiwicGF0aCIsImNvdmVyIiwidGl0bGUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJyZWR1Y3Rpb24iLCJzb3VyY2VJZCIsImRlc2NyaXB0IiwiZGVzYyIsInB1c2giLCJtaXNzVG9rZW4iLCIkYXBwbHkiLCJjYXRjaCIsInNpdGVObyIsIkdldEJhbm5lciIsIm9iaiIsImltYWdlIiwic29ydElkIiwic29ydCIsImRldGFpbElkIiwidXJpIiwic3BsaXQiLCJvYmoxIiwib2JqMiIsInZhbDEiLCJ2YWwyIiwiZ2xvYmFsRGF0YSIsImRhdGVGb3JtYXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLHVCQUFpQjtBQUNmLHFCQUFhLDRDQURFO0FBRWYsb0JBQVk7QUFGRztBQUZWLEssU0FPVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLHlCQUF3QixPQUF6QixFQUFpQyxjQUFhLEVBQTlDLEVBQVosRUFBOEQsWUFBVyxFQUFDLHlCQUF3QixPQUF6QixFQUF6RSxFQUEyRyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFdBQTFDLEVBQXZILEVBQThLLFVBQVMsRUFBQyxRQUFPLEdBQVIsRUFBdkwsRUFBb00sVUFBUyxFQUE3TSxFLFNBQ1RDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBWixFQUF5QyxZQUFXLEVBQUMsaUJBQWdCLFVBQWpCLEVBQXBELEUsU0FDVEMsVSxHQUFhO0FBQ1JDLCtCQURRO0FBRVJDLCtCQUZRO0FBR1JDLDZCQUhRO0FBSVJDLG9DQUpRO0FBS1JDLDhCQUxRO0FBTVJDO0FBTlEsSyxTQVFWQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGlCQUFXLE9BRk47QUFHTEMsa0JBQVksRUFIUDtBQUlMQyxxQkFBZSxDQUFDLElBQUQsRUFBTyxJ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QixDQUFzQk0sR0FBdEI7QUFDQWpDLGtCQUFNMUMsVUFBTixDQUFpQjhFLElBQWpCLENBQXNCLFVBQUNJLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUNwQyxrQkFBSUMsT0FBT0YsS0FBS0wsTUFBaEI7QUFDQSxrQkFBSVEsT0FBT0YsS0FBS04sTUFBaEI7QUFDQSxrQkFBSU8sT0FBT0MsSUFBWCxFQUFpQjtBQUNmLHVCQUFPLENBQUMsQ0FBUjtBQUNELGVBRkQsTUFFTyxJQUFJRCxPQUFPQyxJQUFYLEVBQWlCO0FBQ3RCLHVCQUFPLENBQVA7QUFDRCxlQUZNLE1BRUE7QUFDTCx1QkFBTyxDQUFQO0FBQ0Q7QUFDRixhQVZEO0FBV0QsV0FsQkQ7QUFtQkQsU0FyQkQsTUFxQk87QUFDTCxjQUFJM0MsTUFBTUosT0FBTixDQUFjZ0MsU0FBbEIsRUFBNkI7QUFDM0I1QixrQkFBTTVDLEtBQU4sR0FBYyxPQUFLd0MsT0FBTCxDQUFhQyxRQUFiLEVBQWQ7QUFDQUcsa0JBQU1SLFNBQU47QUFDRDtBQUNGO0FBQ0RRLGNBQU16QixTQUFOLEdBQWtCLElBQWxCO0FBQ0F5QixjQUFNNkIsTUFBTjtBQUNELE9BL0JEO0FBZ0NEOzs7NkJBQ1M7QUFDUixXQUFLckQsU0FBTCxHQUFpQixLQUFLb0IsT0FBTCxDQUFhZ0QsVUFBYixDQUF3QnBFLFNBQXpDO0FBQ0FnQyxjQUFRQyxHQUFSLENBQVksS0FBS2pDLFNBQWpCO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLEtBQUttQixPQUFMLENBQWFpRCxVQUFiLENBQXdCLEtBQUtqRCxPQUFMLENBQWFnRCxVQUFiLENBQXdCbkUsTUFBeEIsR0FBaUMsSUFBekQsRUFBK0QsUUFBL0QsQ0FBZDtBQUNBLFdBQUtvRCxNQUFMO0FBQ0Q7Ozs7RUFsTStCLGVBQUtpQixJOztrQkFBbEJ6RyxJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ato+WWhOeJm+iCiScsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy10b2FzdCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRvYXN0L2Rpc3QvaW5kZXgnLFxuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyZWNHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImhvdEdvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpdGxlXCJ9LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiMVwifSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInJlY0dvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn0sXCJob3RHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNHb29kczogR29vZHMsXG4gICAgICBob3RHb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nLFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlVGl0bGU6ICdpbmRleCcsXG4gICAgICBiYW5uZXJMaW5rOiBbXSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAyMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZmNjYwMCdcbiAgICAgIH0sXG4gICAgICBnb29kczogW10sXG4gICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIHVzZXJMZXZlbDogZmFsc2UsXG4gICAgICB2aXBFbmQ6ICcnXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hdlRhYiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGluZGV4XG4gICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVRhYiAoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUJhbm5lciAoZSkge1xuICAgICAgICB0aGlzLnN3aXBlck9wdC5jdXJyZW50VGFiID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMFxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB0aGlzLmdldEJhbm5lcigpXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldEluaXREYXRhIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudFxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgcmVjb21tZW5kVHlwZTogdGhpcy5jdXJyZW50UGFnZSArIDEsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogJzUnXG4gICAgICB9XG4gICAgICBwYXJlbnQuSHR0cFJlcXVlc3QuSW5kZXhIdHRwKGRhdGEsICgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZSAoKSB7XG4gICAgICB0aGlzLmdvb2RzID0gW11cbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKVxuICAgIH1cbiAgICBnZXRCYW5uZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmJhbm5lckxpbmsgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzaXRlTm86ICdpbmRleCdcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRCYW5uZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5wYXRoID0gaXRlbS5pbWFnZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLnNvcnRJZCA9IGl0ZW0uc29ydFxuICAgICAgICAgICAgb2JqLmRldGFpbElkID0gaXRlbS51cmkuc3BsaXQoJywnKVsxXVxuICAgICAgICAgICAgX3RoaXMuYmFubmVyTGluay5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsuc29ydCgob2JqMSwgb2JqMikgPT4ge1xuICAgICAgICAgICAgICB2YXIgdmFsMSA9IG9iajEuc29ydElkXG4gICAgICAgICAgICAgIHZhciB2YWwyID0gb2JqMi5zb3J0SWRcbiAgICAgICAgICAgICAgaWYgKHZhbDEgPCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsMSA+IHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgICAgIF90aGlzLmdldEJhbm5lcigpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgY29uc29sZS5sb2codGhpcy51c2VyTGV2ZWwpXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19