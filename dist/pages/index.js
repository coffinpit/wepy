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
      // this.currentPage = 0
      // this.isLoading = false
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiY2lyY3VsYXIiLCJnb29kcyIsImxvYWRlZCIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc051bGwiLCJpc0xvYWRpbmciLCJ1c2VyTGV2ZWwiLCJ2aXBFbmQiLCJtZXRob2RzIiwibmF2VGFiIiwiaW5kZXgiLCJpbml0UGFnZSIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJkYXRlRm9ybWF0IiwiZ2V0SW5pdERhdGEiLCJsZW5ndGgiLCJjYiIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJwYXJlbnQiLCJfdGhpcyIsInJlY29tbWVuZFR5cGUiLCJwYWdlU2l6ZSIsIkh0dHBSZXF1ZXN0IiwiSW5kZXhIdHRwIiwiaGlkZUxvYWRpbmciLCJzaG93RmFpbCIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInRpdGxlIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwibWlzc1Rva2VuIiwiJGFwcGx5IiwiY2F0Y2giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwic2l0ZU5vIiwiR2V0QmFubmVyIiwib2JqIiwiaW1hZ2UiLCJzb3J0SWQiLCJzb3J0IiwiZGV0YWlsSWQiLCJ1cmkiLCJzcGxpdCIsIm9iajEiLCJvYmoyIiwidmFsMSIsInZhbDIiLCJnZXRCYW5uZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLDZCQUF1QixJQUZoQjtBQUdQQyx1QkFBaUI7QUFDZixxQkFBYSw0Q0FERTtBQUVmLG9CQUFZO0FBRkc7QUFIVixLLFNBUVZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyx5QkFBd0IsT0FBekIsRUFBaUMsY0FBYSxFQUE5QyxFQUFaLEVBQThELFlBQVcsRUFBQyx5QkFBd0IsT0FBekIsRUFBekUsRUFBMkcsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixXQUExQyxFQUF2SCxFQUE4SyxVQUFTLEVBQUMsUUFBTyxHQUFSLEVBQXZMLEVBQW9NLFVBQVMsRUFBN00sRSxTQUNUQyxPLEdBQVUsRUFBQyxZQUFXLEVBQUMsaUJBQWdCLFVBQWpCLEVBQVosRUFBeUMsWUFBVyxFQUFDLGlCQUFnQixVQUFqQixFQUFwRCxFLFNBQ1RDLFUsR0FBYTtBQUNSQywrQkFEUTtBQUVSQywrQkFGUTtBQUdSQyw2QkFIUTtBQUlSQyxvQ0FKUTtBQUtSQyw4QkFMUTtBQU1SQztBQU5RLEssU0FRVkMsSSxHQUFPO0FB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LGNBQU02QixNQUFOO0FBQ0QsT0EvQkQ7QUFnQ0Q7Ozs2QkFDUztBQUNSLFdBQUtqRCxRQUFMO0FBQ0EsV0FBS2lFLFNBQUw7QUFDQSxXQUFLaEIsTUFBTDtBQUNEOzs7O0VBOU0rQixlQUFLaUIsSTs7a0JBQWxCNUcsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmraPlloTniZvogoknLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicmVjR29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJob3RHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaXRsZVwifSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjFcIn0sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJyZWNHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9LFwiaG90R29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjR29vZHM6IEdvb2RzLFxuICAgICAgaG90R29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZyxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVRpdGxlOiAnaW5kZXgnLFxuICAgICAgYmFubmVyTGluazogW10sXG4gICAgICB0b3BuYXZpZ2F0aW9uOiBbJ+aOqOiNkCcsICfng63pl6gnXSxcbiAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgcGFnZWF1dG86IGZhbHNlLFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBpbnRlcnZhbDogMzAwMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNlYzNkM2EnLFxuICAgICAgICBjaXJjdWxhcjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgdXNlckxldmVsOiBmYWxzZSxcbiAgICAgIHZpcEVuZDogJydcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2VGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gaW5kZXhcbiAgICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgLy8gdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIC8vIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0SW5pdERhdGEgKGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy4kcGFyZW50XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICByZWNvbW1lbmRUeXBlOiB0aGlzLmN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiAnNSdcbiAgICAgIH1cbiAgICAgIHBhcmVudC5IdHRwUmVxdWVzdC5JbmRleEh0dHAoZGF0YSwgKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAoX3RoaXMucGFnZU51bSA9PT0gMSkge1xuICAgICAgICAgIF90aGlzLmdvb2RzID0gW11cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YS50b3RhbENvdW50IDw9IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRQYWdlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0UGFnZSAoKSB7XG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICB0aGlzLmdldEluaXREYXRhKCgpID0+IHtcbiAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAwXG4gICAgICB0aGlzLmluaXRQYWdlKClcbiAgICB9XG4gICAgZ2V0QmFubmVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5iYW5uZXJMaW5rID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc2l0ZU5vOiAnaW5kZXgnXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QmFubmVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoucGF0aCA9IGl0ZW0uaW1hZ2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5zb3J0SWQgPSBpdGVtLnNvcnRcbiAgICAgICAgICAgIG9iai5kZXRhaWxJZCA9IGl0ZW0udXJpLnNwbGl0KCcsJylbMV1cbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5iYW5uZXJMaW5rLnNvcnQoKG9iajEsIG9iajIpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHZhbDEgPSBvYmoxLnNvcnRJZFxuICAgICAgICAgICAgICB2YXIgdmFsMiA9IG9iajIuc29ydElkXG4gICAgICAgICAgICAgIGlmICh2YWwxIDwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbDEgPiB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgICBfdGhpcy5nZXRCYW5uZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB0aGlzLmdldEJhbm5lcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=