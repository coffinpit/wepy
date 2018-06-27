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
      vipReduction: '',
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
      var _this3 = this;

      this.token = this.$parent.getToken();
      this.$parent.getUserLevel(this.token, function () {
        _this3.getUserLevel();
      });
      // this.currentPage = 0
      // this.isLoading = false
    }
  }, {
    key: 'getUserLevel',
    value: function getUserLevel() {
      this.userLevel = this.$parent.globalData.userLevel;
      this.vipReduction = this.$parent.globalData.reduction;
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
            _this.token = _this4.$parent.getToken(res.data.error);
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
      var _this5 = this;

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
            _this.token = _this5.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiY2lyY3VsYXIiLCJnb29kcyIsImxvYWRlZCIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc051bGwiLCJpc0xvYWRpbmciLCJ1c2VyTGV2ZWwiLCJ2aXBFbmQiLCJ2aXBSZWR1Y3Rpb24iLCJjYXRlZ29yeUltYWdlIiwibWV0aG9kcyIsIm5hdlRhYiIsImluZGV4IiwiaW5pdFBhZ2UiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29BcHBseVZpcCIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsImdldFVzZXJMZXZlbCIsImdsb2JhbERhdGEiLCJyZWR1Y3Rpb24iLCJkYXRlRm9ybWF0IiwiZ2V0SW5pdERhdGEiLCJsZW5ndGgiLCJjYiIsInNob3dMb2FkaW5nIiwicGFyZW50IiwiX3RoaXMiLCJyZWNvbW1lbmRUeXBlIiwicGFnZVNpemUiLCJIdHRwUmVxdWVzdCIsIkluZGV4SHR0cCIsImhpZGVMb2FkaW5nIiwic2hvd0ZhaWwiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3B1cyIsInRvdGFsQ291bnQiLCJmb3JFYWNoIiwiaXRlbSIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJ0aXRsZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInNvdXJjZUlkIiwidmljZVRpdGxlIiwiZGVzY3JpcHQiLCJkZXNjIiwicHVzaCIsIm1pc3NUb2tlbiIsIiRhcHBseSIsImNhdGNoIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsInNpdGVObyIsIkdldEJhbm5lciIsIm9iaiIsImltYWdlIiwic29ydElkIiwic29ydCIsImRldGFpbElkIiwidXJpIiwic3BsaXQiLCJvYmoxIiwib2JqMiIsInZhbDEiLCJ2YWwyIiwiZ2V0QmFubmVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUIsSUFGaEI7QUFHUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixvQkFBWTtBQUZHO0FBSFYsSyxTQVFWQyxPLEdBQVUsRUFBQyxpQkFBZ0IsRUFBQyxPQUFNLFVBQVAsRUFBa0IsU0FBUSxFQUExQixFQUFqQixFLFNBQ2JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyx5QkFBd0IsRUFBQyxTQUFRLE9BQVQsRUFBaUIsT0FBTSxlQUF2QixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUF6QixFQUEyRyxjQUFhLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxlQUFsQixFQUFrQyxRQUFPLE1BQXpDLEVBQWdELFNBQVEsT0FBeEQsRUFBZ0UsT0FBTSxLQUF0RSxFQUF4SCxFQUFaLEVBQWtOLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsV0FBMUMsRUFB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QUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBZjtBQUNBeEMsa0JBQU1oRCxVQUFOLENBQWlCMkUsSUFBakIsQ0FBc0JPLEdBQXRCO0FBQ0FsQyxrQkFBTWhELFVBQU4sQ0FBaUJxRixJQUFqQixDQUFzQixVQUFDSSxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDcEMsa0JBQUlDLE9BQU9GLEtBQUtMLE1BQWhCO0FBQ0Esa0JBQUlRLE9BQU9GLEtBQUtOLE1BQWhCO0FBQ0Esa0JBQUlPLE9BQU9DLElBQVgsRUFBaUI7QUFDZix1QkFBTyxDQUFDLENBQVI7QUFDRCxlQUZELE1BRU8sSUFBSUQsT0FBT0MsSUFBWCxFQUFpQjtBQUN0Qix1QkFBTyxDQUFQO0FBQ0QsZUFGTSxNQUVBO0FBQ0wsdUJBQU8sQ0FBUDtBQUNEO0FBQ0YsYUFWRDtBQVdELFdBbEJEO0FBbUJELFNBckJELE1BcUJPO0FBQ0wsY0FBSTVDLE1BQU1YLE9BQU4sQ0FBY3VDLFNBQWxCLEVBQTZCO0FBQzNCNUIsa0JBQU1sRCxLQUFOLEdBQWMsT0FBS3VDLE9BQUwsQ0FBYUMsUUFBYixFQUFkO0FBQ0FVLGtCQUFNNkMsU0FBTjtBQUNEO0FBQ0Y7QUFDRDdDLGNBQU05QixTQUFOLEdBQWtCLElBQWxCO0FBQ0E4QixjQUFNNkIsTUFBTjtBQUNELE9BL0JEO0FBZ0NEOzs7NkJBQ1M7QUFDUixXQUFLbkQsUUFBTDtBQUNBLFdBQUttRSxTQUFMO0FBQ0EsV0FBS2hCLE1BQUw7QUFDRDs7OztFQXpOK0IsZUFBS2lCLEk7O2tCQUFsQmhILEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5q2j5ZaE54mb6IKJJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZSxcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICAnd3hjLXRvYXN0JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtdG9hc3QvZGlzdC9pbmRleCcsXG4gICAgICAgICd3eGMtZmxleCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWZsZXgvZGlzdC9pbmRleCdcbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge1widG9wbmF2aWdhdGlvblwiOntcImNvbVwiOlwicmVjR29vZHNcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJyZWNHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOntcInZhbHVlXCI6XCJnb29kc1wiLFwiZm9yXCI6XCJ0b3BuYXZpZ2F0aW9uXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwidG9wbmF2aWdhdGlvblwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaXRsZVwifSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjFcIn0sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJyZWNHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNHb29kczogR29vZHMsXG4gICAgICBob3RHb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nLFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlVGl0bGU6ICdpbmRleCcsXG4gICAgICBiYW5uZXJMaW5rOiBbXSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAzMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2VjM2QzYScsXG4gICAgICAgIGNpcmN1bGFyOiB0cnVlXG4gICAgICB9LFxuICAgICAgZ29vZHM6IFtdLFxuICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgaXNOdWxsOiB0cnVlLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICB1c2VyTGV2ZWw6IGZhbHNlLFxuICAgICAgdmlwRW5kOiAnJyxcbiAgICAgIHZpcFJlZHVjdGlvbjogJycsXG4gICAgICBjYXRlZ29yeUltYWdlOiBbJy4uL2ltYWdlL3NwdGpfaW1nLnBuZycsICcuLi9pbWFnZS9ybXNwX2ltZy5wbmcnXVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYXZUYWIgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBpbmRleFxuICAgICAgICB0aGlzLmluaXRQYWdlKClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VUYWIgKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VCYW5uZXIgKGUpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJPcHQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckxldmVsKHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwoKVxuICAgICAgfSlcbiAgICAgIC8vIHRoaXMuY3VycmVudFBhZ2UgPSAwXG4gICAgICAvLyB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgfVxuICAgIGdldFVzZXJMZXZlbCAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy52aXBSZWR1Y3Rpb24gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZWR1Y3Rpb25cbiAgICAgIHRoaXMudmlwRW5kID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudmlwRW5kICogMTAwMCwgJ1nlubRt5pyIZOaXpScpXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldEluaXREYXRhIChjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudFxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgcmVjb21tZW5kVHlwZTogdGhpcy5jdXJyZW50UGFnZSArIDEsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogJzUnXG4gICAgICB9XG4gICAgICBwYXJlbnQuSHR0cFJlcXVlc3QuSW5kZXhIdHRwKGRhdGEsICgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKF90aGlzLnBhZ2VOdW0gPT09IDEpIHtcbiAgICAgICAgICBfdGhpcy5nb29kcyA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBfdGhpcy5nb29kcy5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0UGFnZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2UgKCkge1xuICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgdGhpcy5nZXRJbml0RGF0YSgoKSA9PiB7XG4gICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMFxuICAgICAgdGhpcy5nZXRVc2VyTGV2ZWwoKVxuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgfVxuICAgIGdldEJhbm5lciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuYmFubmVyTGluayA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNpdGVObzogJ2luZGV4J1xuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldEJhbm5lcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnBhdGggPSBpdGVtLmltYWdlXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouc29ydElkID0gaXRlbS5zb3J0XG4gICAgICAgICAgICBvYmouZGV0YWlsSWQgPSBpdGVtLnVyaS5zcGxpdCgnLCcpWzFdXG4gICAgICAgICAgICBfdGhpcy5iYW5uZXJMaW5rLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuYmFubmVyTGluay5zb3J0KChvYmoxLCBvYmoyKSA9PiB7XG4gICAgICAgICAgICAgIHZhciB2YWwxID0gb2JqMS5zb3J0SWRcbiAgICAgICAgICAgICAgdmFyIHZhbDIgPSBvYmoyLnNvcnRJZFxuICAgICAgICAgICAgICBpZiAodmFsMSA8IHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwxID4gdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICAgICAgX3RoaXMuZ2V0QmFubmVyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgdGhpcy5nZXRCYW5uZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19