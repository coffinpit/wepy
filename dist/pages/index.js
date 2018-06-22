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
      enablePullDownRefresh: true,
      usingComponents: {
        'wxc-toast': '../../packages/@minui/wxc-toast/dist/index',
        'wxc-flex': '../../packages/@minui/wxc-flex/dist/index'
      }
    }, _this2.$repeat = { "topnavigation": { "com": "recGoods", "props": "" } }, _this2.$props = { "recGoods": { "v-bind:goodsItem.sync": { "value": "goods", "for": "topnavigation", "item": "item", "index": "index", "key": "key" }, "xmlns:v-on": { "value": "", "for": "topnavigation", "item": "item", "index": "index", "key": "key" } }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTitle" }, "defect": { "type": "1" }, "isDown": {} }, _this2.$events = { "recGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
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
        interval: 3000,
        duration: 1000,
        currentTab: 0,
        indicatorDots: true,
        indicatorColor: '#cccccc',
        indicatorActive: '#ec3d3a',
        circular: true
      },
      goods: [],
      loaded: false,
      pageNum: 1,
      totalPageNum: '',
      isNull: true,
      isDown: false,
      isLoading: false,
      userLevel: false,
      vipEnd: '',
      categoryImage: ['../image/sptj_img.png', '../image/rmsp_img.png']
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
      this.getUserLevel();
      // this.currentPage = 0
      // this.isLoading = false
    }
  }, {
    key: 'getUserLevel',
    value: function getUserLevel() {
      this.userLevel = this.$parent.globalData.userLevel;
      this.vipEnd = this.$parent.dateFormat(this.$parent.globalData.vipEnd * 1000, 'Y年m月d日');
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
        _this.$parent.hideLoading();
        _this.$parent.showFail();
        _this.isNull = true;
      }).then(function (res) {
        if (_this.pageNum === 1) {
          _this.goods = [];
        }
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
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
          });
          cb && cb();
        } else {
          _wepy2.default.hideLoading();
          _this.isNull = true;
          if (_this.$parent.missToken) {
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.initPage();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.$parent.showFail();
        _this.isNull = true;
      });
    }
  }, {
    key: 'initPage',
    value: function initPage() {
      this.pageNum = 1;
      this.isNull = false;
      this.getInitData(function () {
        _wepy2.default.stopPullDownRefresh();
      });
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.currentPage = 0;
      this.getUserLevel();
      this.initPage();
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
      this.initPage();
      this.getBanner();
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiY2lyY3VsYXIiLCJnb29kcyIsImxvYWRlZCIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc051bGwiLCJpc0xvYWRpbmciLCJ1c2VyTGV2ZWwiLCJ2aXBFbmQiLCJjYXRlZ29yeUltYWdlIiwibWV0aG9kcyIsIm5hdlRhYiIsImluZGV4IiwiaW5pdFBhZ2UiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29BcHBseVZpcCIsImdldFVzZXJMZXZlbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZGF0ZUZvcm1hdCIsImdldEluaXREYXRhIiwibGVuZ3RoIiwiY2IiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwicGFyZW50IiwiX3RoaXMiLCJyZWNvbW1lbmRUeXBlIiwicGFnZVNpemUiLCJIdHRwUmVxdWVzdCIsIkluZGV4SHR0cCIsImhpZGVMb2FkaW5nIiwic2hvd0ZhaWwiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3B1cyIsInRvdGFsQ291bnQiLCJmb3JFYWNoIiwiaXRlbSIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJ0aXRsZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsInNvdXJjZUlkIiwiZGVzY3JpcHQiLCJkZXNjIiwicHVzaCIsIm1pc3NUb2tlbiIsIiRhcHBseSIsImNhdGNoIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsInNpdGVObyIsIkdldEJhbm5lciIsIm9iaiIsImltYWdlIiwic29ydElkIiwic29ydCIsImRldGFpbElkIiwidXJpIiwic3BsaXQiLCJvYmoxIiwib2JqMiIsInZhbDEiLCJ2YWwyIiwiZ2V0QmFubmVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUIsSUFGaEI7QUFHUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixvQkFBWTtBQUZHO0FBSFYsSyxTQVFWQyxPLEdBQVUsRUFBQyxpQkFBZ0IsRUFBQyxPQUFNLFVBQVAsRUFBa0IsU0FBUSxFQUExQixFQUFqQixFLFNBQ2JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyx5QkFBd0IsRUFBQyxTQUFRLE9BQVQsRUFBaUIsT0FBTSxlQUF2QixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUF6QixFQUEyRyxjQUFhLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxlQUFsQixFQUFrQyxRQUFPLE1BQXpDLEVBQWdELFNBQVEsT0FBeEQsRUFBZ0UsT0FBTSxLQUF0RSxFQUF4SCxFQUFaLEVBQWtOLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsV0FBMUMsRUFBOU4sRUFBcVIsVUFBUyxFQUFDLFFBQU8sR0FB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LElBQVgsRUFBaUI7QUFDdEIsdUJBQU8sQ0FBUDtBQUNELGVBRk0sTUFFQTtBQUNMLHVCQUFPLENBQVA7QUFDRDtBQUNGLGFBVkQ7QUFXRCxXQWxCRDtBQW1CRCxTQXJCRCxNQXFCTztBQUNMLGNBQUk1QyxNQUFNVCxPQUFOLENBQWNxQyxTQUFsQixFQUE2QjtBQUMzQjVCLGtCQUFNaEQsS0FBTixHQUFjLE9BQUt1QyxPQUFMLENBQWFNLFFBQWIsRUFBZDtBQUNBRyxrQkFBTTZDLFNBQU47QUFDRDtBQUNGO0FBQ0Q3QyxjQUFNNUIsU0FBTixHQUFrQixJQUFsQjtBQUNBNEIsY0FBTTZCLE1BQU47QUFDRCxPQS9CRDtBQWdDRDs7OzZCQUNTO0FBQ1IsV0FBS2xELFFBQUw7QUFDQSxXQUFLa0UsU0FBTDtBQUNBLFdBQUtoQixNQUFMO0FBQ0Q7Ozs7RUFuTitCLGVBQUtpQixJOztrQkFBbEI5RyxJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ato+WWhOeJm+iCiScsXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy10b2FzdCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRvYXN0L2Rpc3QvaW5kZXgnLFxuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHtcInRvcG5hdmlnYXRpb25cIjp7XCJjb21cIjpcInJlY0dvb2RzXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wicmVjR29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiZ29vZHNcIixcImZvclwiOlwidG9wbmF2aWdhdGlvblwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInRvcG5hdmlnYXRpb25cIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwic2VhcmNoYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwYWdlZnJvbS5zeW5jXCI6XCJwYWdlVGl0bGVcIn0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIxXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wicmVjR29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjR29vZHM6IEdvb2RzLFxuICAgICAgaG90R29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZyxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVRpdGxlOiAnaW5kZXgnLFxuICAgICAgYmFubmVyTGluazogW10sXG4gICAgICB0b3BuYXZpZ2F0aW9uOiBbJ+aOqOiNkCcsICfng63pl6gnXSxcbiAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgcGFnZWF1dG86IGZhbHNlLFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBpbnRlcnZhbDogMzAwMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNlYzNkM2EnLFxuICAgICAgICBjaXJjdWxhcjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgdXNlckxldmVsOiBmYWxzZSxcbiAgICAgIHZpcEVuZDogJycsXG4gICAgICBjYXRlZ29yeUltYWdlOiBbJy4uL2ltYWdlL3NwdGpfaW1nLnBuZycsICcuLi9pbWFnZS9ybXNwX2ltZy5wbmcnXVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYXZUYWIgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBpbmRleFxuICAgICAgICB0aGlzLmluaXRQYWdlKClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VUYWIgKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VCYW5uZXIgKGUpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJPcHQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwoKVxuICAgICAgLy8gdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIC8vIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICB9XG4gICAgZ2V0VXNlckxldmVsICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHJlY29tbWVuZFR5cGU6IHRoaXMuY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6ICc1J1xuICAgICAgfVxuICAgICAgcGFyZW50Lkh0dHBSZXF1ZXN0LkluZGV4SHR0cChkYXRhLCAoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChfdGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMuZ29vZHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFBhZ2UoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlICgpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuZ2V0VXNlckxldmVsKClcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgIH1cbiAgICBnZXRCYW5uZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmJhbm5lckxpbmsgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzaXRlTm86ICdpbmRleCdcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRCYW5uZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5wYXRoID0gaXRlbS5pbWFnZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLnNvcnRJZCA9IGl0ZW0uc29ydFxuICAgICAgICAgICAgb2JqLmRldGFpbElkID0gaXRlbS51cmkuc3BsaXQoJywnKVsxXVxuICAgICAgICAgICAgX3RoaXMuYmFubmVyTGluay5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsuc29ydCgob2JqMSwgb2JqMikgPT4ge1xuICAgICAgICAgICAgICB2YXIgdmFsMSA9IG9iajEuc29ydElkXG4gICAgICAgICAgICAgIHZhciB2YWwyID0gb2JqMi5zb3J0SWRcbiAgICAgICAgICAgICAgaWYgKHZhbDEgPCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsMSA+IHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgICAgIF90aGlzLmdldEJhbm5lcigpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLmluaXRQYWdlKClcbiAgICAgIHRoaXMuZ2V0QmFubmVyKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==