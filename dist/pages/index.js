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
      topnavigation: [{
        title: '推荐',
        image: '../image/rmd_icon.png'
      }, {
        title: '热门',
        image: '../image/hot_icon.png'
      }],
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
      userLevel: 0,
      vipEnd: '',
      vipReduction: '',
      categoryImage: ['../image/sptj_img.png', '../image/rmsp_img.png'],
      showPromot: true,
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: ''
    }, _this2.methods = {
      navTab: function navTab(index) {
        this.currentPage = index;
        this.initPage();
      },
      changeTab: function changeTab(e) {
        this.currentPage = e.detail.current;
      },
      changeBanner: function changeBanner(e) {
        if (e.detail.source === 'touch') {
          this.swiperOpt.currentTab = e.detail.current;
        }
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
      var _this3 = this;

      this.token = this.$parent.getToken();
      this.$parent.getUserLevel(this.token, function () {
        _this3.getUserLevel();
        _this3.$apply();
      });
      this.nick_name = this.$parent.getUserName();
      this.avatar = this.$parent.getUserAvatar();
      this.customer_info_str = this.$parent.getMessage();
      this.note_info_str = this.$parent.getBusiness('首页', null, null);
      // this.currentPage = 0
      // this.isLoading = false
    }
  }, {
    key: 'getUserLevel',
    value: function getUserLevel() {
      this.userLevel = this.$parent.globalData.userLevel;
      this.vipReduction = this.$parent.globalData.expectedReduction;
      this.vipEnd = this.$parent.dateFormat(this.$parent.globalData.vipEnd * 1000, 'Y年m月d日');
      this.showPromot = true;
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
      var _this4 = this;

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
        // _this.$parent.showFail()
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
            if (res.data.data.totalCount <= _this4.pageSize) {
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
            good.detail = item.viceTitle;
            good.descript = item.desc;
            _this.goods.push(good);
          });
          cb && cb();
        } else {
          _wepy2.default.hideLoading();
          _this.isNull = true;
          if (_this.$parent.missToken) {
            _this.initPage();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        // _this.$parent.showFail()
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
      var _this5 = this;

      this.currentPage = 0;
      this.getBanner();
      this.$parent.getUserLevel(this.token, function () {
        _this5.getUserLevel();
      });
      this.initPage();
    }
  }, {
    key: 'getBanner',
    value: function getBanner() {
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
            _this.getBanner();
          }
        }
        _this.isLoading = true;
        _this.$apply();
      });
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: '正善牛肉',
        path: '/pages/login'
      };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsInRpdGxlIiwiaW1hZ2UiLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsImNpcmN1bGFyIiwiZ29vZHMiLCJsb2FkZWQiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNOdWxsIiwiaXNMb2FkaW5nIiwidXNlckxldmVsIiwidmlwRW5kIiwidmlwUmVkdWN0aW9uIiwiY2F0ZWdvcnlJbWFnZSIsInNob3dQcm9tb3QiLCJuaWNrX25hbWUiLCJhdmF0YXIiLCJjdXN0b21lcl9pbmZvX3N0ciIsIm5vdGVfaW5mb19zdHIiLCJtZXRob2RzIiwibmF2VGFiIiwiaW5kZXgiLCJpbml0UGFnZSIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwic291cmNlIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwiJHBhcmVudCIsImdldFRva2VuIiwiZ2V0VXNlckxldmVsIiwiJGFwcGx5IiwiZ2V0VXNlck5hbWUiLCJnZXRVc2VyQXZhdGFyIiwiZ2V0TWVzc2FnZSIsImdldEJ1c2luZXNzIiwiZ2xvYmFsRGF0YSIsImV4cGVjdGVkUmVkdWN0aW9uIiwiZGF0ZUZvcm1hdCIsImdldEluaXREYXRhIiwibGVuZ3RoIiwiY2IiLCJzaG93TG9hZGluZyIsInBhcmVudCIsIl90aGlzIiwicmVjb21tZW5kVHlwZSIsInBhZ2VTaXplIiwiSHR0cFJlcXVlc3QiLCJJbmRleEh0dHAiLCJoaWRlTG9hZGluZyIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsInNvdXJjZUlkIiwidmljZVRpdGxlIiwiZGVzY3JpcHQiLCJkZXNjIiwicHVzaCIsIm1pc3NUb2tlbiIsImNhdGNoIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImdldEJhbm5lciIsInNpdGVObyIsIkdldEJhbm5lciIsIm9iaiIsInNvcnRJZCIsInNvcnQiLCJkZXRhaWxJZCIsInVyaSIsInNwbGl0Iiwib2JqMSIsIm9iajIiLCJ2YWwxIiwidmFsMiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCLElBRmhCO0FBR1BDLHVCQUFpQjtBQUNmLHFCQUFhLDRDQURFO0FBRWYsb0JBQVk7QUFGRztBQUhWLEssU0FRVkMsTyxHQUFVLEVBQUMsaUJBQWdCLEVBQUMsT0FBTSxVQUFQLEVBQWtCLFNBQVEsRUFBMUIsRUFBakIsRSxTQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMseUJBQXdCLEVBQUMsU0FBUSxPQUFULEVBQWlCLE9BQU0sZUFBdkIsRUFBdUMsUUFBTyxNQUE5QyxFQUFxRCxTQUFRLE9BQTdELEVBQXFFLE9BQU0sS0FBM0UsRUFBekIsRUFBMkcsY0FB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QUFDdEIsdUJBQU8sQ0FBUDtBQUNELGVBRk0sTUFFQTtBQUNMLHVCQUFPLENBQVA7QUFDRDtBQUNGLGFBVkQ7QUFXRCxXQWxCRDtBQW1CRCxTQXJCRCxNQXFCTztBQUNMLGNBQUkxQyxNQUFNaEIsT0FBTixDQUFjMkMsU0FBbEIsRUFBNkI7QUFDM0IzQixrQkFBTThCLFNBQU47QUFDRDtBQUNGO0FBQ0Q5QixjQUFNekMsU0FBTixHQUFrQixJQUFsQjtBQUNBeUMsY0FBTWIsTUFBTjtBQUNELE9BOUJEO0FBK0JEOzs7c0NBQ2tCb0IsRyxFQUFLO0FBQ3RCLGFBQU87QUFDTGxFLGVBQU8sTUFERjtBQUVMMkUsY0FBTTtBQUZELE9BQVA7QUFJRDs7OzZCQUNTO0FBQ1IsV0FBSzVDLFFBQUw7QUFDQSxXQUFLMEQsU0FBTDtBQUNBLFdBQUszQyxNQUFMO0FBQ0Q7Ozs7RUFuUCtCLGVBQUt3RCxJOztrQkFBbEIxSCxJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ato+WWhOeJm+iCiScsXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy10b2FzdCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRvYXN0L2Rpc3QvaW5kZXgnLFxuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHtcInRvcG5hdmlnYXRpb25cIjp7XCJjb21cIjpcInJlY0dvb2RzXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wicmVjR29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiZ29vZHNcIixcImZvclwiOlwidG9wbmF2aWdhdGlvblwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcInRvcG5hdmlnYXRpb25cIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwic2VhcmNoYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwYWdlZnJvbS5zeW5jXCI6XCJwYWdlVGl0bGVcIn0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIxXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wicmVjR29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjR29vZHM6IEdvb2RzLFxuICAgICAgaG90R29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZyxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVRpdGxlOiAnaW5kZXgnLFxuICAgICAgYmFubmVyTGluazogW10sXG4gICAgICB0b3BuYXZpZ2F0aW9uOiBbe1xuICAgICAgICB0aXRsZTogJ+aOqOiNkCcsXG4gICAgICAgIGltYWdlOiAnLi4vaW1hZ2Uvcm1kX2ljb24ucG5nJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+eDremXqCcsXG4gICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvaG90X2ljb24ucG5nJ1xuICAgICAgfV0sXG4gICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgIHBhZ2VhdXRvOiBmYWxzZSxcbiAgICAgIHN3aXBlck9wdDoge1xuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZWMzZDNhJyxcbiAgICAgICAgY2lyY3VsYXI6IHRydWVcbiAgICAgIH0sXG4gICAgICBnb29kczogW10sXG4gICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIHVzZXJMZXZlbDogMCxcbiAgICAgIHZpcEVuZDogJycsXG4gICAgICB2aXBSZWR1Y3Rpb246ICcnLFxuICAgICAgY2F0ZWdvcnlJbWFnZTogWycuLi9pbWFnZS9zcHRqX2ltZy5wbmcnLCAnLi4vaW1hZ2Uvcm1zcF9pbWcucG5nJ10sXG4gICAgICBzaG93UHJvbW90OiB0cnVlLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJ1xuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYXZUYWIgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBpbmRleFxuICAgICAgICB0aGlzLmluaXRQYWdlKClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VUYWIgKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VCYW5uZXIgKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLnNvdXJjZSA9PT0gJ3RvdWNoJykge1xuICAgICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckxldmVsKHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwoKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpXG4gICAgICB0aGlzLmN1c3RvbWVyX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoKVxuICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCfpppbpobUnLCBudWxsLCBudWxsKVxuICAgICAgLy8gdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIC8vIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICB9XG4gICAgZ2V0VXNlckxldmVsICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLnZpcFJlZHVjdGlvbiA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmV4cGVjdGVkUmVkdWN0aW9uXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgdGhpcy5zaG93UHJvbW90ID0gdHJ1ZVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHJlY29tbWVuZFR5cGU6IHRoaXMuY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6ICc1J1xuICAgICAgfVxuICAgICAgcGFyZW50Lkh0dHBSZXF1ZXN0LkluZGV4SHR0cChkYXRhLCAoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAvLyBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChfdGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMuZ29vZHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZVxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmluaXRQYWdlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZSAoKSB7XG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICB0aGlzLmdldEluaXREYXRhKCgpID0+IHtcbiAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAwXG4gICAgICB0aGlzLmdldEJhbm5lcigpXG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckxldmVsKHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwoKVxuICAgICAgfSlcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgIH1cbiAgICBnZXRCYW5uZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmJhbm5lckxpbmsgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzaXRlTm86ICdpbmRleCdcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRCYW5uZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5wYXRoID0gaXRlbS5pbWFnZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLnNvcnRJZCA9IGl0ZW0uc29ydFxuICAgICAgICAgICAgb2JqLmRldGFpbElkID0gaXRlbS51cmkuc3BsaXQoJywnKVsxXVxuICAgICAgICAgICAgX3RoaXMuYmFubmVyTGluay5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsuc29ydCgob2JqMSwgb2JqMikgPT4ge1xuICAgICAgICAgICAgICB2YXIgdmFsMSA9IG9iajEuc29ydElkXG4gICAgICAgICAgICAgIHZhciB2YWwyID0gb2JqMi5zb3J0SWRcbiAgICAgICAgICAgICAgaWYgKHZhbDEgPCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsMSA+IHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmdldEJhbm5lcigpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uU2hhcmVBcHBNZXNzYWdlIChyZXMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiAn5q2j5ZaE54mb6IKJJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9sb2dpbidcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgdGhpcy5nZXRCYW5uZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19