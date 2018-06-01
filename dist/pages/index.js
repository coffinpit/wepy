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
        interval: 3000,
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
      this.userLevel = this.$parent.globalData.userLevel;
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
        _this.$parent.showSuccess();
        _this.$parent.showFail();
        _this.isNull = true;
      }).then(function (res) {
        console.log(res);
        _this.$parent.showSuccess();
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
            cb && cb();
          });
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
        _this.$parent.showSuccess();
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
      this.vipEnd = this.$parent.dateFormat(this.$parent.globalData.vipEnd * 1000, 'Y年m月d日');
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiZ29vZHMiLCJsb2FkZWQiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNOdWxsIiwiaXNMb2FkaW5nIiwidXNlckxldmVsIiwidmlwRW5kIiwibWV0aG9kcyIsIm5hdlRhYiIsImluZGV4IiwiaW5pdFBhZ2UiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29BcHBseVZpcCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZ2V0QmFubmVyIiwiZ2V0SW5pdERhdGEiLCJsZW5ndGgiLCJjYiIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJwYXJlbnQiLCJfdGhpcyIsInJlY29tbWVuZFR5cGUiLCJwYWdlU2l6ZSIsIkh0dHBSZXF1ZXN0IiwiSW5kZXhIdHRwIiwic2hvd1N1Y2Nlc3MiLCJzaG93RmFpbCIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInRpdGxlIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwiaGlkZUxvYWRpbmciLCJtaXNzVG9rZW4iLCIkYXBwbHkiLCJjYXRjaCIsInNpdGVObyIsIkdldEJhbm5lciIsIm9iaiIsImltYWdlIiwic29ydElkIiwic29ydCIsImRldGFpbElkIiwidXJpIiwic3BsaXQiLCJvYmoxIiwib2JqMiIsInZhbDEiLCJ2YWwyIiwiZGF0ZUZvcm1hdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixvQkFBWTtBQUZHO0FBRlYsSyxTQU9WQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMseUJBQXdCLE9BQXpCLEVBQWlDLGNBQWEsRUFBOUMsRUFBWixFQUE4RCxZQUFXLEVBQUMseUJBQXdCLE9BQXpCLEVBQXpFLEVBQTJHLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsV0FBMUMsRUFBdkgsRUFBOEssVUFBUyxFQUFDLFFBQU8sR0FBUixFQUF2TCxFQUFvTSxVQUFTLEVBQTdNLEUsU0FDVEMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLGlCQUFnQixVQUFqQixFQUFaLEVBQXlDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBcEQsRSxTQUNUQyxVLEdBQWE7QUFDUkMsK0JBRFE7QUFFUkMsK0JBRlE7QUFHUkMsNkJBSFE7QUFJUkMsb0NBSlE7QUFLUkMsOEJBTFE7QUFNUkM7QUFOUSxLLFNBUVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsaUJBQVcsT0FGTjtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLHFCQUFlLENB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J3dlcHknXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ato+WWhOeJm+iCiScsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy10b2FzdCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRvYXN0L2Rpc3QvaW5kZXgnLFxuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyZWNHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImhvdEdvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpdGxlXCJ9LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiMVwifSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInJlY0dvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn0sXCJob3RHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNHb29kczogR29vZHMsXG4gICAgICBob3RHb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nLFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlVGl0bGU6ICdpbmRleCcsXG4gICAgICBiYW5uZXJMaW5rOiBbXSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAzMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZmNjYwMCdcbiAgICAgIH0sXG4gICAgICBnb29kczogW10sXG4gICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIHVzZXJMZXZlbDogZmFsc2UsXG4gICAgICB2aXBFbmQ6ICcnXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hdlRhYiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGluZGV4XG4gICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVRhYiAoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUJhbm5lciAoZSkge1xuICAgICAgICB0aGlzLnN3aXBlck9wdC5jdXJyZW50VGFiID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgdGhpcy5nZXRCYW5uZXIoKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHJlY29tbWVuZFR5cGU6IHRoaXMuY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6ICc1J1xuICAgICAgfVxuICAgICAgcGFyZW50Lkh0dHBSZXF1ZXN0LkluZGV4SHR0cChkYXRhLCAoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0UGFnZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2UgKCkge1xuICAgICAgdGhpcy5nb29kcyA9IFtdXG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICB9XG4gICAgZ2V0QmFubmVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5iYW5uZXJMaW5rID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc2l0ZU5vOiAnaW5kZXgnXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QmFubmVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoucGF0aCA9IGl0ZW0uaW1hZ2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5zb3J0SWQgPSBpdGVtLnNvcnRcbiAgICAgICAgICAgIG9iai5kZXRhaWxJZCA9IGl0ZW0udXJpLnNwbGl0KCcsJylbMV1cbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5iYW5uZXJMaW5rLnNvcnQoKG9iajEsIG9iajIpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHZhbDEgPSBvYmoxLnNvcnRJZFxuICAgICAgICAgICAgICB2YXIgdmFsMiA9IG9iajIuc29ydElkXG4gICAgICAgICAgICAgIGlmICh2YWwxIDwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbDEgPiB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgICBfdGhpcy5nZXRCYW5uZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy52aXBFbmQgPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS52aXBFbmQgKiAxMDAwLCAnWeW5tG3mnIhk5pelJylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==