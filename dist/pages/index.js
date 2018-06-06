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
        indicatorActive: '#ec3d3a'
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
      this.vipEnd = this.$parent.dateFormat(this.$parent.globalData.vipEnd * 1000, 'Y年m月d日');
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
        _this.$parent.hideLoading();
        _this.$parent.showFail();
        _this.isNull = true;
      }).then(function (res) {
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
        _this.$parent.hideLoading();
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
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiZ29vZHMiLCJsb2FkZWQiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNOdWxsIiwiaXNMb2FkaW5nIiwidXNlckxldmVsIiwidmlwRW5kIiwibWV0aG9kcyIsIm5hdlRhYiIsImluZGV4IiwiaW5pdFBhZ2UiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29BcHBseVZpcCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZGF0ZUZvcm1hdCIsImdldEJhbm5lciIsImdldEluaXREYXRhIiwibGVuZ3RoIiwiY2IiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwicGFyZW50IiwiX3RoaXMiLCJyZWNvbW1lbmRUeXBlIiwicGFnZVNpemUiLCJIdHRwUmVxdWVzdCIsIkluZGV4SHR0cCIsImhpZGVMb2FkaW5nIiwic2hvd0ZhaWwiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3B1cyIsInRvdGFsQ291bnQiLCJmb3JFYWNoIiwiaXRlbSIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJ0aXRsZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsInNvdXJjZUlkIiwiZGVzY3JpcHQiLCJkZXNjIiwicHVzaCIsIm1pc3NUb2tlbiIsIiRhcHBseSIsImNhdGNoIiwic2l0ZU5vIiwiR2V0QmFubmVyIiwib2JqIiwiaW1hZ2UiLCJzb3J0SWQiLCJzb3J0IiwiZGV0YWlsSWQiLCJ1cmkiLCJzcGxpdCIsIm9iajEiLCJvYmoyIiwidmFsMSIsInZhbDIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLHVCQUFpQjtBQUNmLHFCQUFhLDRDQURFO0FBRWYsb0JBQVk7QUFGRztBQUZWLEssU0FPVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLHlCQUF3QixPQUF6QixFQUFpQyxjQUFhLEVBQTlDLEVBQVosRUFBOEQsWUFBVyxFQUFDLHlCQUF3QixPQUF6QixFQUF6RSxFQUEyRyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFdBQTFDLEVBQXZILEVBQThLLFVBQVMsRUFBQyxRQUFPLEdBQVIsRUFBdkwsRUFBb00sVUFBUyxFQUE3TSxFLFNBQ1RDLE8sR0FBVSxFQUFDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBWixFQUF5QyxZQUFXLEVBQUMsaUJBQWdCLFVBQWpCLEVBQXBELEUsU0FDVEMsVSxHQUFhO0FBQ1JDLCtCQURRO0FBRVJDLCtCQUZRO0FBR1JDLDZCQUhRO0FBSVJDLG9DQUpRO0FBS1JDLDhCQUxRO0FBTVJDO0FBTlEsSyxTQVFWQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGlCQUFXLE9BRk47QUFHTEMsa0JBQVksRUFIUDtBQUlMQyxxQkFBZSxDQUFDLElBQUQsRUFBTyxJ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QVU7QUFDckIsZ0JBQUlrQixNQUFNLEVBQVY7QUFDQUEsZ0JBQUloQixJQUFKLEdBQVdGLEtBQUttQixLQUFoQjtBQUNBRCxnQkFBSS9DLEVBQUosR0FBUzZCLEtBQUs3QixFQUFkO0FBQ0ErQyxnQkFBSUUsTUFBSixHQUFhcEIsS0FBS3FCLElBQWxCO0FBQ0FILGdCQUFJSSxRQUFKLEdBQWV0QixLQUFLdUIsR0FBTCxDQUFTQyxLQUFULENBQWUsR0FBZixFQUFvQixDQUFwQixDQUFmO0FBQ0F2QyxrQkFBTTVDLFVBQU4sQ0FBaUJ1RSxJQUFqQixDQUFzQk0sR0FBdEI7QUFDQWpDLGtCQUFNNUMsVUFBTixDQUFpQmdGLElBQWpCLENBQXNCLFVBQUNJLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUNwQyxrQkFBSUMsT0FBT0YsS0FBS0wsTUFBaEI7QUFDQSxrQkFBSVEsT0FBT0YsS0FBS04sTUFBaEI7QUFDQSxrQkFBSU8sT0FBT0MsSUFBWCxFQUFpQjtBQUNmLHVCQUFPLENBQUMsQ0FBUjtBQUNELGVBRkQsTUFFTyxJQUFJRCxPQUFPQyxJQUFYLEVBQWlCO0FBQ3RCLHVCQUFPLENBQVA7QUFDRCxlQUZNLE1BRUE7QUFDTCx1QkFBTyxDQUFQO0FBQ0Q7QUFDRixhQVZEO0FBV0QsV0FsQkQ7QUFtQkQsU0FyQkQsTUFxQk87QUFDTCxjQUFJM0MsTUFBTVYsT0FBTixDQUFjc0MsU0FBbEIsRUFBNkI7QUFDM0I1QixrQkFBTTlDLEtBQU4sR0FBYyxPQUFLb0MsT0FBTCxDQUFhTyxRQUFiLEVBQWQ7QUFDQUcsa0JBQU1QLFNBQU47QUFDRDtBQUNGO0FBQ0RPLGNBQU0zQixTQUFOLEdBQWtCLElBQWxCO0FBQ0EyQixjQUFNNkIsTUFBTjtBQUNELE9BL0JEO0FBZ0NEOzs7NkJBQ1M7QUFDUixXQUFLQSxNQUFMO0FBQ0Q7Ozs7RUFwTStCLGVBQUtlLEk7O2tCQUFsQnpHLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5q2j5ZaE54mb6IKJJyxcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICAnd3hjLXRvYXN0JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtdG9hc3QvZGlzdC9pbmRleCcsXG4gICAgICAgICd3eGMtZmxleCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWZsZXgvZGlzdC9pbmRleCdcbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInJlY0dvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiaG90R29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCJ9LFwic2VhcmNoYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwYWdlZnJvbS5zeW5jXCI6XCJwYWdlVGl0bGVcIn0sXCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCIxXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wicmVjR29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifSxcImhvdEdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHJlY0dvb2RzOiBHb29kcyxcbiAgICAgIGhvdEdvb2RzOiBHb29kcyxcbiAgICAgIGxvYWQ6IExvYWRpbmcsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaCxcbiAgICAgIGRlZmVjdDogRGVmZWN0LFxuICAgICAgaXNEb3duOiBSZWFjaGRvd25cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VUaXRsZTogJ2luZGV4JyxcbiAgICAgIGJhbm5lckxpbms6IFtdLFxuICAgICAgdG9wbmF2aWdhdGlvbjogWyfmjqjojZAnLCAn54Ot6ZeoJ10sXG4gICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgIHBhZ2VhdXRvOiBmYWxzZSxcbiAgICAgIHN3aXBlck9wdDoge1xuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxuICAgICAgICBpbmRpY2F0b3JDb2xvcjogJyNjY2NjY2MnLFxuICAgICAgICBpbmRpY2F0b3JBY3RpdmU6ICcjZWMzZDNhJ1xuICAgICAgfSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgdXNlckxldmVsOiBmYWxzZSxcbiAgICAgIHZpcEVuZDogJydcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2VGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gaW5kZXhcbiAgICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgdGhpcy5nZXRCYW5uZXIoKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHJlY29tbWVuZFR5cGU6IHRoaXMuY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6ICc1J1xuICAgICAgfVxuICAgICAgcGFyZW50Lkh0dHBSZXF1ZXN0LkluZGV4SHR0cChkYXRhLCAoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0UGFnZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2UgKCkge1xuICAgICAgdGhpcy5nb29kcyA9IFtdXG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICB9XG4gICAgZ2V0QmFubmVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5iYW5uZXJMaW5rID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc2l0ZU5vOiAnaW5kZXgnXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QmFubmVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoucGF0aCA9IGl0ZW0uaW1hZ2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5zb3J0SWQgPSBpdGVtLnNvcnRcbiAgICAgICAgICAgIG9iai5kZXRhaWxJZCA9IGl0ZW0udXJpLnNwbGl0KCcsJylbMV1cbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5iYW5uZXJMaW5rLnNvcnQoKG9iajEsIG9iajIpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHZhbDEgPSBvYmoxLnNvcnRJZFxuICAgICAgICAgICAgICB2YXIgdmFsMiA9IG9iajIuc29ydElkXG4gICAgICAgICAgICAgIGlmICh2YWwxIDwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbDEgPiB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgICBfdGhpcy5nZXRCYW5uZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19