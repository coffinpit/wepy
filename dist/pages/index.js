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
      isLoading: false
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
        }
        _this.isLoading = true;
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken();
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiZ29vZHMiLCJsb2FkZWQiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNOdWxsIiwiaXNMb2FkaW5nIiwibWV0aG9kcyIsIm5hdlRhYiIsImluZGV4IiwiaW5pdFBhZ2UiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29BcHBseVZpcCIsImdldEJhbm5lciIsImdldEluaXREYXRhIiwibGVuZ3RoIiwiY2IiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJwYXJlbnQiLCJfdGhpcyIsInJlY29tbWVuZFR5cGUiLCJwYWdlU2l6ZSIsIkh0dHBSZXF1ZXN0IiwiSW5kZXhIdHRwIiwic2hvd0ZhaWwiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInRpdGxlIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwiJGFwcGx5IiwiY2F0Y2giLCJzaXRlTm8iLCJHZXRCYW5uZXIiLCJvYmoiLCJpbWFnZSIsInNvcnRJZCIsInNvcnQiLCJkZXRhaWxJZCIsInVyaSIsInNwbGl0Iiwib2JqMSIsIm9iajIiLCJ2YWwxIiwidmFsMiIsImdldFRva2VuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyx1QkFBaUI7QUFDZixxQkFBYSw0Q0FERTtBQUVmLG9CQUFZO0FBRkc7QUFGVixLLFNBT1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyx5QkFBd0IsT0FBekIsRUFBaUMsY0FBYSxFQUE5QyxFQUFaLEVBQThELFlBQVcsRUFBQyx5QkFBd0IsT0FBekIsRUFBekUsRUFBMkcsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixXQUExQyxFQUF2SCxFQUE4SyxVQUFTLEVBQUMsUUFBTyxHQUFSLEVBQXZMLEVBQW9NLFVBQVMsRUFBN00sRSxTQUNUQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsaUJBQWdCLFVBQWpCLEVBQVosRUFBeUMsWUFBVyxFQUFDLGlCQUFnQixVQUFqQixFQUFwRCxFLFNBQ1RDLFUsR0FBYTtBQUNSQywrQkFEUTtBQUVSQywrQkFGUTtBQUdSQyw2QkFIUTtBQUlSQyxvQ0FKUTtBQUtSQyw4QkFMUTtBQU1SQztBQU5RLEssU0FRVkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxpQkFBVyxPQUZOO0FBR0xDLGtCQUFZLEVBSFA7QUFJTEMscUJBQWUsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUpWO0FBS0xDLG1CQUFhLENBTFI7QUFNTEMsZ0JBQVUsS0FOTDtBQU9MQyxpQkFBVztBQUNU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QixjQUFNNEIsTUFBTjtBQUNELE9BMUJEO0FBMkJEOzs7NkJBQ1M7QUFDUixXQUFLckUsS0FBTCxHQUFhLEtBQUtzQyxPQUFMLENBQWE4QyxRQUFiLEVBQWI7QUFDQSxXQUFLZixNQUFMO0FBQ0Q7Ozs7RUFwTCtCLGVBQUtnQixJOztrQkFBbEJwRyxJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ato+WWhOeJm+iCiScsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy10b2FzdCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRvYXN0L2Rpc3QvaW5kZXgnLFxuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJyZWNHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImhvdEdvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpdGxlXCJ9LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiMVwifSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInJlY0dvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn0sXCJob3RHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNHb29kczogR29vZHMsXG4gICAgICBob3RHb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nLFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlVGl0bGU6ICdpbmRleCcsXG4gICAgICBiYW5uZXJMaW5rOiBbXSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAyMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZmNjYwMCdcbiAgICAgIH0sXG4gICAgICBnb29kczogW10sXG4gICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYXZUYWIgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBpbmRleFxuICAgICAgICB0aGlzLmluaXRQYWdlKClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VUYWIgKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VCYW5uZXIgKGUpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJPcHQuY3VycmVudFRhYiA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgdGhpcy5nZXRCYW5uZXIoKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy4kcGFyZW50XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICByZWNvbW1lbmRUeXBlOiB0aGlzLmN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiAnNSdcbiAgICAgIH1cbiAgICAgIHBhcmVudC5IdHRwUmVxdWVzdC5JbmRleEh0dHAoZGF0YSwgKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKGRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBfdGhpcy5nb29kcy5wdXNoKGdvb2QpXG4gICAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlICgpIHtcbiAgICAgIHRoaXMuZ29vZHMgPSBbXVxuICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgfVxuICAgIGdldEJhbm5lciAoKSB7XG4gICAgICB0aGlzLmJhbm5lckxpbmsgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBzaXRlTm86ICdpbmRleCdcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRCYW5uZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5wYXRoID0gaXRlbS5pbWFnZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLnNvcnRJZCA9IGl0ZW0uc29ydFxuICAgICAgICAgICAgb2JqLmRldGFpbElkID0gaXRlbS51cmkuc3BsaXQoJywnKVsxXVxuICAgICAgICAgICAgX3RoaXMuYmFubmVyTGluay5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsuc29ydCgob2JqMSwgb2JqMikgPT4ge1xuICAgICAgICAgICAgICB2YXIgdmFsMSA9IG9iajEuc29ydElkXG4gICAgICAgICAgICAgIHZhciB2YWwyID0gb2JqMi5zb3J0SWRcbiAgICAgICAgICAgICAgaWYgKHZhbDEgPCB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsMSA+IHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=