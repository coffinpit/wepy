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
      getTokenTime: 0
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
      this.getTokenTime = 0;
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
          if (res.data.error === -1 && res.data.msg === 'miss token') {
            _this.getTokenTime++;
            if (_this.getTokenTime < 3) {
              _this.token = _this3.$parent.getToken(res.data.error);
              _this.getInitData();
            } else {
              _this.$parent.showFail();
            }
          } else if (res.data.error === -2) {
            _this.$parent.showFail(res.data.msg);
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
          if (res.data.error === -1 && res.data.msg === 'miss token') {
            _this.getTokenTime++;
            if (_this.getTokenTime < 3) {
              _this.token = _this4.$parent.getToken();
              _this.getBanner();
            } else {
              _this.$parent.showFail();
            }
          } else if (res.data.error === -2) {
            _this.$parent.showFail(res.data.msg);
          }
        }
        _this.isLoading = true;
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      // this.token = this.$parent.getToken()
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiZ29vZHMiLCJsb2FkZWQiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNOdWxsIiwiaXNMb2FkaW5nIiwiZ2V0VG9rZW5UaW1lIiwibWV0aG9kcyIsIm5hdlRhYiIsImluZGV4IiwiaW5pdFBhZ2UiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29BcHBseVZpcCIsImdldEJhbm5lciIsImdldEluaXREYXRhIiwibGVuZ3RoIiwiY2IiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJwYXJlbnQiLCJfdGhpcyIsInJlY29tbWVuZFR5cGUiLCJwYWdlU2l6ZSIsIkh0dHBSZXF1ZXN0IiwiSW5kZXhIdHRwIiwic2hvd0ZhaWwiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInRpdGxlIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwibXNnIiwiZ2V0VG9rZW4iLCIkYXBwbHkiLCJjYXRjaCIsInNpdGVObyIsIkdldEJhbm5lciIsIm9iaiIsImltYWdlIiwic29ydElkIiwic29ydCIsImRldGFpbElkIiwidXJpIiwic3BsaXQiLCJvYmoxIiwib2JqMiIsInZhbDEiLCJ2YWwyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyx1QkFBaUI7QUFDZixxQkFBYSw0Q0FERTtBQUVmLG9CQUFZO0FBRkc7QUFGVixLLFNBT1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyx5QkFBd0IsT0FBekIsRUFBaUMsY0FBYSxFQUE5QyxFQUFaLEVBQThELFlBQVcsRUFBQyx5QkFBd0IsT0FBekIsRUFBekUsRUFBMkcsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixXQUExQyxFQUF2SCxFQUE4SyxVQUFTLEVBQUMsUUFBTyxHQUFSLEVBQXZMLEVBQW9NLFVBQVMsRUFBN00sRSxTQUNUQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsaUJBQWdCLFVBQWpCLEVBQVosRUFBeUMsWUFBVyxFQUFDLGlCQUFnQixVQUFqQixFQUFwRCxFLFNBQ1RDLFUsR0FBYTtBQUNSQywrQkFEUTtBQUVSQywrQkFGUTtBQUdSQyw2QkFIUTtBQUlSQyxvQ0FKUTtBQUtSQyw4QkFMUTtBQU1SQztBQU5RLEssU0FRVkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxpQkFBVyxPQUZOO0FBR0xDLGtCQUFZLEVBSFA7QUFJTEMscUJBQWUsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUpWO0FBS0xDLG1CQUFhLENBTFI7QUFNTEMsZ0JBQVUs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SWxELElBQUosQ0FBU3VFLEdBQWhDO0FBQ0Q7QUFDRjtBQUNENUIsY0FBTXZCLFNBQU4sR0FBa0IsSUFBbEI7QUFDQXVCLGNBQU04QixNQUFOO0FBQ0QsT0F0Q0Q7QUF1Q0Q7Ozs2QkFDUztBQUNSO0FBQ0EsV0FBS0EsTUFBTDtBQUNEOzs7O0VBNU0rQixlQUFLZSxJOztrQkFBbEJ0RyxJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ato+WWhOeJm+iCiScsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy10b2FzdCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRvYXN0L2Rpc3QvaW5kZXgnLFxuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyZWNHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImhvdEdvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpdGxlXCJ9LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiMVwifSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInJlY0dvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn0sXCJob3RHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNHb29kczogR29vZHMsXG4gICAgICBob3RHb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nLFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlVGl0bGU6ICdpbmRleCcsXG4gICAgICBiYW5uZXJMaW5rOiBbXSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAyMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZmNjYwMCdcbiAgICAgIH0sXG4gICAgICBnb29kczogW10sXG4gICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIGdldFRva2VuVGltZTogMFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYXZUYWIgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBpbmRleFxuICAgICAgICB0aGlzLmluaXRQYWdlKClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VUYWIgKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VCYW5uZXIgKGUpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJPcHQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB0aGlzLmdldEJhbm5lcigpXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldEluaXREYXRhIChjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHJlY29tbWVuZFR5cGU6IHRoaXMuY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6ICc1J1xuICAgICAgfVxuICAgICAgcGFyZW50Lkh0dHBSZXF1ZXN0LkluZGV4SHR0cChkYXRhLCAoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YS50b3RhbENvdW50IDw9IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IC0xICYmIHJlcy5kYXRhLm1zZyA9PT0gJ21pc3MgdG9rZW4nKSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRUb2tlblRpbWUgKytcbiAgICAgICAgICAgIGlmIChfdGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICBfdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmVycm9yID09PSAtMikge1xuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbChyZXMuZGF0YS5tc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZSAoKSB7XG4gICAgICB0aGlzLmdvb2RzID0gW11cbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKVxuICAgIH1cbiAgICBnZXRCYW5uZXIgKCkge1xuICAgICAgdGhpcy5iYW5uZXJMaW5rID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc2l0ZU5vOiAnaW5kZXgnXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QmFubmVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoucGF0aCA9IGl0ZW0uaW1hZ2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5zb3J0SWQgPSBpdGVtLnNvcnRcbiAgICAgICAgICAgIG9iai5kZXRhaWxJZCA9IGl0ZW0udXJpLnNwbGl0KCcsJylbMV1cbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5iYW5uZXJMaW5rLnNvcnQoKG9iajEsIG9iajIpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHZhbDEgPSBvYmoxLnNvcnRJZFxuICAgICAgICAgICAgICB2YXIgdmFsMiA9IG9iajIuc29ydElkXG4gICAgICAgICAgICAgIGlmICh2YWwxIDwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbDEgPiB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAtMSAmJiByZXMuZGF0YS5tc2cgPT09ICdtaXNzIHRva2VuJykge1xuICAgICAgICAgICAgX3RoaXMuZ2V0VG9rZW5UaW1lICsrXG4gICAgICAgICAgICBpZiAoX3RoaXMuZ2V0VG9rZW5UaW1lIDwgMykge1xuICAgICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgICAgIF90aGlzLmdldEJhbm5lcigpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmVycm9yID09PSAtMikge1xuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbChyZXMuZGF0YS5tc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAvLyB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==