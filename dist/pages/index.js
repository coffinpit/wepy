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
      console.log(this.vipReduction);
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
      var _this5 = this;

      this.currentPage = 0;
      this.$parent.getUserLevel(this.token, function () {
        _this5.getUserLevel();
      });
      this.initPage();
    }
  }, {
    key: 'getBanner',
    value: function getBanner() {
      var _this6 = this;

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
            _this.token = _this6.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwidG9rZW4iLCJwYWdlVGl0bGUiLCJiYW5uZXJMaW5rIiwidG9wbmF2aWdhdGlvbiIsInRpdGxlIiwiaW1hZ2UiLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsImNpcmN1bGFyIiwiZ29vZHMiLCJsb2FkZWQiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwiaXNOdWxsIiwiaXNMb2FkaW5nIiwidXNlckxldmVsIiwidmlwRW5kIiwidmlwUmVkdWN0aW9uIiwiY2F0ZWdvcnlJbWFnZSIsInNob3dQcm9tb3QiLCJuaWNrX25hbWUiLCJhdmF0YXIiLCJjdXN0b21lcl9pbmZvX3N0ciIsIm5vdGVfaW5mb19zdHIiLCJtZXRob2RzIiwibmF2VGFiIiwiaW5kZXgiLCJpbml0UGFnZSIsImNoYW5nZVRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiY2hhbmdlQmFubmVyIiwic291cmNlIiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FwcGx5VmlwIiwiJHBhcmVudCIsImdldFRva2VuIiwiZ2V0VXNlckxldmVsIiwiJGFwcGx5IiwiZ2V0VXNlck5hbWUiLCJnZXRVc2VyQXZhdGFyIiwiZ2V0TWVzc2FnZSIsImdldEJ1c2luZXNzIiwiZ2xvYmFsRGF0YSIsImV4cGVjdGVkUmVkdWN0aW9uIiwiY29uc29sZSIsImxvZyIsImRhdGVGb3JtYXQiLCJnZXRJbml0RGF0YSIsImxlbmd0aCIsImNiIiwic2hvd0xvYWRpbmciLCJwYXJlbnQiLCJfdGhpcyIsInJlY29tbWVuZFR5cGUiLCJwYWdlU2l6ZSIsIkh0dHBSZXF1ZXN0IiwiSW5kZXhIdHRwIiwiaGlkZUxvYWRpbmciLCJzaG93RmFpbCIsInRoZW4iLCJyZXMiLCJlcnJvciIsInNwdXMiLCJ0b3RhbENvdW50IiwiZm9yRWFjaCIsIml0ZW0iLCJnb29kIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJ2aWNlVGl0bGUiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwibWlzc1Rva2VuIiwiY2F0Y2giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwic2l0ZU5vIiwiR2V0QmFubmVyIiwib2JqIiwic29ydElkIiwic29ydCIsImRldGFpbElkIiwidXJpIiwic3BsaXQiLCJvYmoxIiwib2JqMiIsInZhbDEiLCJ2YWwyIiwiZ2V0QmFubmVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUIsSUFGaEI7QUFHUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixvQkFBWTtBQUZHO0FBSFYsSyxTQVFWQyxPLEdBQVUsRUFBQyxpQkFBZ0IsRUFBQyxPQUFNLFVBQVAsRUFBa0IsU0FBUSxFQUExQixFQUFqQixFLFNBQ2JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyx5QkFBd0IsRUFBQyxTQUFRLE9BQVQsRUFBaUIsT0FBTSxlQUF2QixFQUF1QyxRQUFPLE1BQTlDLEVBQXFELFNBQVEsT0FBN0QsRUFBcUUsT0FBTSxLQUEzRSxFQUF6QixFQUEyRyxjQUFhLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxlQUFsQixFQUFrQyxRQUFPLE1BQXpDLEVBQWdELFNBQVEsT0FBeEQsRUFBZ0UsT0FBTSxLQUF0RSxFQUF4SCxFQUFaLEVBQWtOLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsV0FBMUMsRUFBOU4sRUFBcVIsVUFBUyxFQUFDLFFBQU8sR0FBUixFQUE5UixFQUEyUyxVQUFTLEVBQXBULEUsU0FDVEMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLGlCQUFnQixVQUFqQixFQUFaLEUsU0FDVEMsVSxHQUFhO0FBQ1JDLCtCQURRO0FBRVJDLCtCQUZRO0FBR1JDLDZCQUhRO0FBSVJDLG9DQUpRO0FBS1JDLDhCQUxRO0FBTVJDO0FBTlEsSyxTQVFWQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGlCQUFXLE9BRk47QUFHTEMsa0JBQVksRUFIUDtBQUlMQyxxQkFBZSxDQUFDO0FBQ2RDLGVBQU8sSUFETztBQUVkQyxlQUFPO0FBRk8sT0FBRCxFQUdaO0FBQ0RELGVBQU8sSUFETjtBQUVEQyxlQUFPO0FBRk4sT0FIWSxDQUpWO0FBV0xDLG1CQUFhLENBWFI7QUFZTEMsZ0JBQVUsS0FaTDtBQWFMQyxpQkFBVztBQUNUQyxrQkFBVSxJQUREO0FBRVRDLGtCQUFVLElBRkQ7QUFHVEMsa0JBQVUsSUFIRDtBQUlUQyxvQkFBWSxDQUpIO0FBS1RDLHVCQUFlLElBTE47QUFNVEMsd0JBQWdCLFNBTlA7QUFPVEMseUJBQWlCLFNBUFI7QUFRVEMsa0JBQVU7QUFSRCxPQWJOO0FBdUJMQyxhQUFPLEVBdkJGO0FBd0JMQyxjQUFRLEtBeEJIO0FBeUJMQyxlQUFTLENBekJKO0FBMEJMQyxvQkFBYyxFQTFCVDtBQTJCTEMsY0FBUSxJQTNCSDtBQTRCTHZCLGNBQVEsS0E1Qkg7QUE2Qkx3QixpQkFBVyxLQTdCTjtBQThCTEMsaUJBQVcsQ0E5Qk47QUErQkxDLGNBQVEsRUEvQkg7QUFnQ0xDLG9CQUFjLEVBaENUO0FBaUNMQyxxQkFBZSxDQUFDLHVCQUFELEVBQTBCLHVCQUExQixDQWpDVjtBQWtDTEMsa0JBQVksSUFsQ1A7QUFtQ0xDLGlCQUFXLEVBbkNOO0FBb0NMQyxjQUFRLEVBcENIO0FBcUNMQyx5QkFBbUIsRUFyQ2Q7QUFzQ0xDLHFCQUFlO0FBdENWLEssU0F5Q1BDLE8sR0FBVTtBQUNSQyxZQURRLGtCQUNBQyxLQURBLEVBQ087QUFDYixhQUFLNUIsV0FBTCxHQUFtQjRCLEtBQW5CO0FBQ0EsYUFBS0MsUUFBTDtBQUNELE9BSk87QUFLUkMsZUFMUSxxQkFLR0MsQ0FMSCxFQUtNO0FBQ1osYUFBSy9CLFdBQUwsR0FBbUIrQixFQUFFQyxNQUFGLENBQVNDLE9BQTVCO0FBQ0QsT0FQTztBQVFSQyxrQkFSUSx3QkFRTUgsQ0FSTixFQVFTO0FBQ2YsWUFBSUEsRUFBRUMsTUFBRixDQUFTRyxNQUFULEtBQW9CLE9BQXhCLEVBQWlDO0FBQy9CLGVBQUtqQyxTQUFMLENBQWVJLFVBQWYsR0FBNEJ5QixFQUFFQyxNQUFGLENBQVNDLE9BQXJDO0FBQ0Q7QUFDRixPQVpPO0FBYVJHLGNBYlEsb0JBYUVDLEVBYkYsRUFhTTtBQUNaLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUssaUJBQWlCRjtBQURSLFNBQWhCO0FBR0QsT0FqQk87QUFrQlJHLGdCQWxCUSx3QkFrQk07QUFDWix1QkFBS0YsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRDtBQXRCTyxLOzs7Ozs2QkF3QkE7QUFBQTs7QUFDUixXQUFLN0MsS0FBTCxHQUFhLEtBQUsrQyxPQUFMLENBQWFDLFFBQWIsRUFBYjtBQUNBLFdBQUtELE9BQUwsQ0FBYUUsWUFBYixDQUEwQixLQUFLakQsS0FBL0IsRUFBc0MsWUFBTTtBQUMxQyxlQUFLaUQsWUFBTDtBQUNBLGVBQUtDLE1BQUw7QUFDRCxPQUhEO0FBSUEsV0FBS3RCLFNBQUwsR0FBaUIsS0FBS21CLE9BQUwsQ0FBYUksV0FBYixFQUFqQjtBQUNBLFdBQUt0QixNQUFMLEdBQWMsS0FBS2tCLE9BQUwsQ0FBYUssYUFBYixFQUFkO0FBQ0EsV0FBS3RCLGlCQUFMLEdBQXlCLEtBQUtpQixPQUFMLENBQWFNLFVBQWIsRUFBekI7QUFDQSxXQUFLdEIsYUFBTCxHQUFxQixLQUFLZ0IsT0FBTCxDQUFhTyxXQUFiLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLENBQXJCO0FBQ0E7QUFDQTtBQUNEOzs7bUNBQ2U7QUFDZCxXQUFLL0IsU0FBTCxHQUFpQixLQUFLd0IsT0FBTCxDQUFhUSxVQUFiLENBQXdCaEMsU0FBekM7QUFDQSxXQUFLRSxZQUFMLEdBQW9CLEtBQUtzQixPQUFMLENBQWFRLFVBQWIsQ0FBd0JDLGlCQUE1QztBQUNBQyxjQUFRQyxHQUFSLENBQVksS0FBS2pDLFlBQWpCO0FBQ0EsV0FBS0QsTUFBTCxHQUFjLEtBQUt1QixPQUFMLENBQWFZLFVBQWIsQ0FBd0IsS0FBS1osT0FBTCxDQUFhUSxVQUFiLENBQXdCL0IsTUFBeEIsR0FBaUMsSUFBekQsRUFBK0QsUUFBL0QsQ0FBZDtBQUNBLFdBQUtHLFVBQUwsR0FBa0IsSUFBbEI7QUFDRDs7O29DQUNnQjtBQUNmO0FBQ0EsVUFBSSxLQUFLUixPQUFMLEdBQWUsS0FBS0MsWUFBeEIsRUFBc0M7QUFDcEM7QUFDQSxhQUFLRCxPQUFMO0FBQ0EsYUFBS3lDLFdBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUszQyxLQUFMLENBQVc0QyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGVBQUsvRCxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0Y7QUFDRjs7O2dDQUNZZ0UsRSxFQUFJO0FBQUE7O0FBQ2YsV0FBSzlELEtBQUwsR0FBYSxLQUFLK0MsT0FBTCxDQUFhQyxRQUFiLEVBQWI7QUFDQSxXQUFLRCxPQUFMLENBQWFnQixXQUFiO0FBQ0EsV0FBS2pFLE1BQUwsR0FBYyxLQUFkO0FBQ0EsVUFBSWtFLFNBQVMsS0FBS2pCLE9BQWxCO0FBQ0EsVUFBSWtCLFFBQVEsSUFBWjtBQUNBLFVBQUlsRSxPQUFPO0FBQ1RvQixpQkFBUyxLQUFLQSxPQURMO0FBRVQrQyx1QkFBZSxLQUFLNUQsV0FBTCxHQUFtQixDQUZ6QjtBQUdUTixlQUFPLEtBQUtBLEtBSEg7QUFJVG1FLGtCQUFVO0FBSkQsT0FBWDtBQU1BSCxhQUFPSSxXQUFQLENBQW1CQyxTQUFuQixDQUE2QnRFLElBQTdCLEVBQW1DLFlBQU07QUFDdkNrRSxjQUFNbEIsT0FBTixDQUFjdUIsV0FBZDtBQUNBTCxjQUFNbEIsT0FBTixDQUFjd0IsUUFBZDtBQUNBTixjQUFNNUMsTUFBTixHQUFlLElBQWY7QUFDRCxPQUpELEVBSUdtRCxJQUpILENBSVEsVUFBQ0MsR0FBRCxFQUFTO0FBQ2YsWUFBSVIsTUFBTTlDLE9BQU4sS0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkI4QyxnQkFBTWhELEtBQU4sR0FBYyxFQUFkO0FBQ0Q7QUFDRHdDLGdCQUFRQyxHQUFSLENBQVllLEdBQVo7QUFDQVIsY0FBTWxCLE9BQU4sQ0FBY3VCLFdBQWQ7QUFDQSxZQUFJRyxJQUFJMUUsSUFBSixDQUFTMkUsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QlQsZ0JBQU03QyxZQUFOLEdBQXFCcUQsSUFBSTFFLElBQUosQ0FBU0EsSUFBVCxDQUFjcUIsWUFBbkM7QUFDQSxjQUFJckIsT0FBTzBFLElBQUkxRSxJQUFKLENBQVNBLElBQVQsQ0FBYzRFLElBQXpCO0FBQ0EsY0FBSTVFLEtBQUs4RCxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCSSxrQkFBTTVDLE1BQU4sR0FBZSxJQUFmO0FBQ0QsV0FGRCxNQUVPO0FBQ0w0QyxrQkFBTTVDLE1BQU4sR0FBZSxLQUFmO0FBQ0EsZ0JBQUlvRCxJQUFJMUUsSUFBSixDQUFTQSxJQUFULENBQWM2RSxVQUFkLElBQTRCLE9BQUtULFFBQXJDLEVBQStDO0FBQzdDRixvQkFBTW5FLE1BQU4sR0FBZSxJQUFmO0FBQ0QsYUFGRCxNQUVPO0FBQ0xtRSxvQkFBTW5FLE1BQU4sR0FBZSxLQUFmO0FBQ0Q7QUFDRjtBQUNEQyxlQUFLOEUsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBTzVDLEtBQVAsRUFBaUI7QUFDNUIsZ0JBQUk2QyxPQUFPLEVBQVg7QUFDQUEsaUJBQUtDLElBQUwsR0FBWUYsS0FBS0csS0FBakI7QUFDQUYsaUJBQUszRSxLQUFMLEdBQWEwRSxLQUFLMUUsS0FBbEI7QUFDQTJFLGlCQUFLRyxLQUFMLEdBQWFKLEtBQUtLLFdBQWxCO0FBQ0FKLGlCQUFLSyxRQUFMLEdBQWdCTixLQUFLSSxLQUFyQjtBQUNBSCxpQkFBS00sU0FBTCxHQUFpQlAsS0FBS08sU0FBdEI7QUFDQU4saUJBQUtwQyxFQUFMLEdBQVVtQyxLQUFLUSxRQUFmO0FBQ0FQLGlCQUFLekMsTUFBTCxHQUFjd0MsS0FBS1MsU0FBbkI7QUFDQVIsaUJBQUtTLFFBQUwsR0FBZ0JWLEtBQUtXLElBQXJCO0FBQ0F4QixrQkFBTWhELEtBQU4sQ0FBWXlFLElBQVosQ0FBaUJYLElBQWpCO0FBQ0QsV0FYRDtBQVlBakIsZ0JBQU1BLElBQU47QUFDRCxTQTFCRCxNQTBCTztBQUNMLHlCQUFLUSxXQUFMO0FBQ0FMLGdCQUFNNUMsTUFBTixHQUFlLElBQWY7QUFDQSxjQUFJNEMsTUFBTWxCLE9BQU4sQ0FBYzRDLFNBQWxCLEVBQTZCO0FBQzNCMUIsa0JBQU1qRSxLQUFOLEdBQWMsT0FBSytDLE9BQUwsQ0FBYUMsUUFBYixDQUFzQnlCLElBQUkxRSxJQUFKLENBQVMyRSxLQUEvQixDQUFkO0FBQ0FULGtCQUFNOUIsUUFBTjtBQUNEO0FBQ0Y7QUFDRDhCLGNBQU1mLE1BQU47QUFDRCxPQTdDRCxFQTZDRzBDLEtBN0NILENBNkNTLFlBQU07QUFDYjNCLGNBQU1sQixPQUFOLENBQWN1QixXQUFkO0FBQ0FMLGNBQU1sQixPQUFOLENBQWN3QixRQUFkO0FBQ0FOLGNBQU01QyxNQUFOLEdBQWUsSUFBZjtBQUNELE9BakREO0FBa0REOzs7K0JBQ1c7QUFDVixXQUFLRixPQUFMLEdBQWUsQ0FBZjtBQUNBLFdBQUtFLE1BQUwsR0FBYyxLQUFkO0FBQ0EsV0FBS3VDLFdBQUwsQ0FBaUIsWUFBTTtBQUNyQix1QkFBS2lDLG1CQUFMO0FBQ0QsT0FGRDtBQUdEOzs7d0NBQ29CO0FBQUE7O0FBQ25CLFdBQUt2RixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS3lDLE9BQUwsQ0FBYUUsWUFBYixDQUEwQixLQUFLakQsS0FBL0IsRUFBc0MsWUFBTTtBQUMxQyxlQUFLaUQsWUFBTDtBQUNELE9BRkQ7QUFHQSxXQUFLZCxRQUFMO0FBQ0Q7OztnQ0FDWTtBQUFBOztBQUNYLFdBQUtuQyxLQUFMLEdBQWEsS0FBSytDLE9BQUwsQ0FBYUMsUUFBYixFQUFiO0FBQ0EsV0FBSzlDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxVQUFJK0QsUUFBUSxJQUFaO0FBQ0EsVUFBSWxFLE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVQ4RixnQkFBUTtBQUZDLE9BQVg7QUFJQSxXQUFLL0MsT0FBTCxDQUFhcUIsV0FBYixDQUF5QjJCLFNBQXpCLENBQW1DaEcsSUFBbkMsRUFBeUN5RSxJQUF6QyxDQUE4QyxVQUFDQyxHQUFELEVBQVM7QUFDckRoQixnQkFBUUMsR0FBUixDQUFZZSxHQUFaO0FBQ0EsWUFBSUEsSUFBSTFFLElBQUosQ0FBUzJFLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsY0FBSTNFLE9BQU8wRSxJQUFJMUUsSUFBSixDQUFTQSxJQUFwQjtBQUNBQSxlQUFLOEUsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQixnQkFBSWtCLE1BQU0sRUFBVjtBQUNBQSxnQkFBSWhCLElBQUosR0FBV0YsS0FBS3pFLEtBQWhCO0FBQ0EyRixnQkFBSXJELEVBQUosR0FBU21DLEtBQUtuQyxFQUFkO0FBQ0FxRCxnQkFBSUMsTUFBSixHQUFhbkIsS0FBS29CLElBQWxCO0FBQ0FGLGdCQUFJRyxRQUFKLEdBQWVyQixLQUFLc0IsR0FBTCxDQUFTQyxLQUFULENBQWUsR0FBZixFQUFvQixDQUFwQixDQUFmO0FBQ0FwQyxrQkFBTS9ELFVBQU4sQ0FBaUJ3RixJQUFqQixDQUFzQk0sR0FBdEI7QUFDQS9CLGtCQUFNL0QsVUFBTixDQUFpQmdHLElBQWpCLENBQXNCLFVBQUNJLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUNwQyxrQkFBSUMsT0FBT0YsS0FBS0wsTUFBaEI7QUFDQSxrQkFBSVEsT0FBT0YsS0FBS04sTUFBaEI7QUFDQSxrQkFBSU8sT0FBT0MsSUFBWCxFQUFpQjtBQUNmLHVCQUFPLENBQUMsQ0FBUjtBQUNELGVBRkQsTUFFTyxJQUFJRCxPQUFPQyxJQUFYLEVBQWlCO0FBQ3RCLHVCQUFPLENBQVA7QUFDRCxlQUZNLE1BRUE7QUFDTCx1QkFBTyxDQUFQO0FBQ0Q7QUFDRixhQVZEO0FBV0QsV0FsQkQ7QUFtQkQsU0FyQkQsTUFxQk87QUFDTCxjQUFJeEMsTUFBTWxCLE9BQU4sQ0FBYzRDLFNBQWxCLEVBQTZCO0FBQzNCMUIsa0JBQU1qRSxLQUFOLEdBQWMsT0FBSytDLE9BQUwsQ0FBYUMsUUFBYixFQUFkO0FBQ0FpQixrQkFBTXlDLFNBQU47QUFDRDtBQUNGO0FBQ0R6QyxjQUFNM0MsU0FBTixHQUFrQixJQUFsQjtBQUNBMkMsY0FBTWYsTUFBTjtBQUNELE9BL0JEO0FBZ0NEOzs7NkJBQ1M7QUFDUixXQUFLZixRQUFMO0FBQ0EsV0FBS3VFLFNBQUw7QUFDQSxXQUFLeEQsTUFBTDtBQUNEOzs7O0VBL08rQixlQUFLeUQsSTs7a0JBQWxCM0gsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmraPlloTniZvogoknLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtdG9hc3QnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10b2FzdC9kaXN0L2luZGV4JyxcbiAgICAgICAgJ3d4Yy1mbGV4JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtZmxleC9kaXN0L2luZGV4J1xuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJ0b3BuYXZpZ2F0aW9uXCI6e1wiY29tXCI6XCJyZWNHb29kc1wiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcInJlY0dvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6e1widmFsdWVcIjpcImdvb2RzXCIsXCJmb3JcIjpcInRvcG5hdmlnYXRpb25cIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJ0b3BuYXZpZ2F0aW9uXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpdGxlXCJ9LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiMVwifSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInJlY0dvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHJlY0dvb2RzOiBHb29kcyxcbiAgICAgIGhvdEdvb2RzOiBHb29kcyxcbiAgICAgIGxvYWQ6IExvYWRpbmcsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaCxcbiAgICAgIGRlZmVjdDogRGVmZWN0LFxuICAgICAgaXNEb3duOiBSZWFjaGRvd25cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VUaXRsZTogJ2luZGV4JyxcbiAgICAgIGJhbm5lckxpbms6IFtdLFxuICAgICAgdG9wbmF2aWdhdGlvbjogW3tcbiAgICAgICAgdGl0bGU6ICfmjqjojZAnLFxuICAgICAgICBpbWFnZTogJy4uL2ltYWdlL3JtZF9pY29uLnBuZydcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfng63pl6gnLFxuICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2hvdF9pY29uLnBuZydcbiAgICAgIH1dLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAzMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2VjM2QzYScsXG4gICAgICAgIGNpcmN1bGFyOiB0cnVlXG4gICAgICB9LFxuICAgICAgZ29vZHM6IFtdLFxuICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgaXNOdWxsOiB0cnVlLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICB1c2VyTGV2ZWw6IDAsXG4gICAgICB2aXBFbmQ6ICcnLFxuICAgICAgdmlwUmVkdWN0aW9uOiAnJyxcbiAgICAgIGNhdGVnb3J5SW1hZ2U6IFsnLi4vaW1hZ2Uvc3B0al9pbWcucG5nJywgJy4uL2ltYWdlL3Jtc3BfaW1nLnBuZyddLFxuICAgICAgc2hvd1Byb21vdDogdHJ1ZSxcbiAgICAgIG5pY2tfbmFtZTogJycsXG4gICAgICBhdmF0YXI6ICcnLFxuICAgICAgY3VzdG9tZXJfaW5mb19zdHI6ICcnLFxuICAgICAgbm90ZV9pbmZvX3N0cjogJydcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmF2VGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gaW5kZXhcbiAgICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIGlmIChlLmRldGFpbC5zb3VyY2UgPT09ICd0b3VjaCcpIHtcbiAgICAgICAgICB0aGlzLnN3aXBlck9wdC5jdXJyZW50VGFiID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BcHBseVZpcCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hcHBseVZpcCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJMZXZlbCh0aGlzLnRva2VuLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0VXNlckxldmVsKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICAgIHRoaXMubmlja19uYW1lID0gdGhpcy4kcGFyZW50LmdldFVzZXJOYW1lKClcbiAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgIHRoaXMubm90ZV9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRCdXNpbmVzcygn6aaW6aG1JywgbnVsbCwgbnVsbClcbiAgICAgIC8vIHRoaXMuY3VycmVudFBhZ2UgPSAwXG4gICAgICAvLyB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgfVxuICAgIGdldFVzZXJMZXZlbCAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy52aXBSZWR1Y3Rpb24gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5leHBlY3RlZFJlZHVjdGlvblxuICAgICAgY29uc29sZS5sb2codGhpcy52aXBSZWR1Y3Rpb24pXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZ5bm0beaciGTml6UnKVxuICAgICAgdGhpcy5zaG93UHJvbW90ID0gdHJ1ZVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHJlY29tbWVuZFR5cGU6IHRoaXMuY3VycmVudFBhZ2UgKyAxLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6ICc1J1xuICAgICAgfVxuICAgICAgcGFyZW50Lkh0dHBSZXF1ZXN0LkluZGV4SHR0cChkYXRhLCAoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChfdGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMuZ29vZHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZVxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFBhZ2UoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlICgpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKCkgPT4ge1xuICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmdldFVzZXJMZXZlbCgpXG4gICAgICB9KVxuICAgICAgdGhpcy5pbml0UGFnZSgpXG4gICAgfVxuICAgIGdldEJhbm5lciAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuYmFubmVyTGluayA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHNpdGVObzogJ2luZGV4J1xuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldEJhbm5lcihkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnBhdGggPSBpdGVtLmltYWdlXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouc29ydElkID0gaXRlbS5zb3J0XG4gICAgICAgICAgICBvYmouZGV0YWlsSWQgPSBpdGVtLnVyaS5zcGxpdCgnLCcpWzFdXG4gICAgICAgICAgICBfdGhpcy5iYW5uZXJMaW5rLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuYmFubmVyTGluay5zb3J0KChvYmoxLCBvYmoyKSA9PiB7XG4gICAgICAgICAgICAgIHZhciB2YWwxID0gb2JqMS5zb3J0SWRcbiAgICAgICAgICAgICAgdmFyIHZhbDIgPSBvYmoyLnNvcnRJZFxuICAgICAgICAgICAgICBpZiAodmFsMSA8IHZhbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwxID4gdmFsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICAgICAgX3RoaXMuZ2V0QmFubmVyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgdGhpcy5nZXRCYW5uZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19