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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsImN1cnJlbnRQYWdlIiwicGFnZWF1dG8iLCJzd2lwZXJPcHQiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJjdXJyZW50VGFiIiwiaW5kaWNhdG9yRG90cyIsImluZGljYXRvckNvbG9yIiwiaW5kaWNhdG9yQWN0aXZlIiwiY2lyY3VsYXIiLCJnb29kcyIsImxvYWRlZCIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc051bGwiLCJpc0xvYWRpbmciLCJ1c2VyTGV2ZWwiLCJ2aXBFbmQiLCJtZXRob2RzIiwibmF2VGFiIiwiaW5kZXgiLCJpbml0UGFnZSIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJkYXRlRm9ybWF0IiwiZ2V0QmFubmVyIiwiZ2V0SW5pdERhdGEiLCJsZW5ndGgiLCJjYiIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJwYXJlbnQiLCJfdGhpcyIsInJlY29tbWVuZFR5cGUiLCJwYWdlU2l6ZSIsIkh0dHBSZXF1ZXN0IiwiSW5kZXhIdHRwIiwiaGlkZUxvYWRpbmciLCJzaG93RmFpbCIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInRpdGxlIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwibWlzc1Rva2VuIiwiJGFwcGx5IiwiY2F0Y2giLCJzaXRlTm8iLCJHZXRCYW5uZXIiLCJvYmoiLCJpbWFnZSIsInNvcnRJZCIsInNvcnQiLCJkZXRhaWxJZCIsInVyaSIsInNwbGl0Iiwib2JqMSIsIm9iajIiLCJ2YWwxIiwidmFsMiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixvQkFBWTtBQUZHO0FBRlYsSyxTQU9WQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMseUJBQXdCLE9BQXpCLEVBQWlDLGNBQWEsRUFBOUMsRUFBWixFQUE4RCxZQUFXLEVBQUMseUJBQXdCLE9BQXpCLEVBQXpFLEVBQTJHLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsV0FBMUMsRUFBdkgsRUFBOEssVUFBUyxFQUFDLFFBQU8sR0FBUixFQUF2TCxFQUFvTSxVQUFTLEVBQTdNLEUsU0FDVEMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLGlCQUFnQixVQUFqQixFQUFaLEVBQXlDLFlBQVcsRUFBQyxpQkFBZ0IsVUFBakIsRUFBcEQsRSxTQUNUQyxVLEdBQWE7QUFDUkMsK0JBRFE7QUFFUkMsK0JBRlE7QUFHUkMsNkJBSFE7QUFJUkMsb0NBSlE7QUFLUkMsOEJBTFE7QUFNUkM7QUFOUSxLLFNBUVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsaUJBQVcsT0FGTjtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLHFCQUFlLENBQUMs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d2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmraPlloTniZvogoknLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicmVjR29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJob3RHb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaXRsZVwifSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjFcIn0sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJyZWNHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9LFwiaG90R29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjR29vZHM6IEdvb2RzLFxuICAgICAgaG90R29vZHM6IEdvb2RzLFxuICAgICAgbG9hZDogTG9hZGluZyxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVRpdGxlOiAnaW5kZXgnLFxuICAgICAgYmFubmVyTGluazogW10sXG4gICAgICB0b3BuYXZpZ2F0aW9uOiBbJ+aOqOiNkCcsICfng63pl6gnXSxcbiAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgcGFnZWF1dG86IGZhbHNlLFxuICAgICAgc3dpcGVyT3B0OiB7XG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBpbnRlcnZhbDogMzAwMCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICAgIGluZGljYXRvckNvbG9yOiAnI2NjY2NjYycsXG4gICAgICAgIGluZGljYXRvckFjdGl2ZTogJyNlYzNkM2EnLFxuICAgICAgICBjaXJjdWxhcjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgdXNlckxldmVsOiBmYWxzZSxcbiAgICAgIHZpcEVuZDogJydcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2VGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gaW5kZXhcbiAgICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgdGhpcy5nZXRCYW5uZXIoKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHJlY29tbWVuZFR5cGU6IHRoaXMuY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6ICc1J1xuICAgICAgfVxuICAgICAgcGFyZW50Lkh0dHBSZXF1ZXN0LkluZGV4SHR0cChkYXRhLCAoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0UGFnZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2UgKCkge1xuICAgICAgdGhpcy5nb29kcyA9IFtdXG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICB9XG4gICAgZ2V0QmFubmVyICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5iYW5uZXJMaW5rID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgc2l0ZU5vOiAnaW5kZXgnXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QmFubmVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoucGF0aCA9IGl0ZW0uaW1hZ2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5zb3J0SWQgPSBpdGVtLnNvcnRcbiAgICAgICAgICAgIG9iai5kZXRhaWxJZCA9IGl0ZW0udXJpLnNwbGl0KCcsJylbMV1cbiAgICAgICAgICAgIF90aGlzLmJhbm5lckxpbmsucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5iYW5uZXJMaW5rLnNvcnQoKG9iajEsIG9iajIpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHZhbDEgPSBvYmoxLnNvcnRJZFxuICAgICAgICAgICAgICB2YXIgdmFsMiA9IG9iajIuc29ydElkXG4gICAgICAgICAgICAgIGlmICh2YWwxIDwgdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbDEgPiB2YWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgICAgICBfdGhpcy5nZXRCYW5uZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19