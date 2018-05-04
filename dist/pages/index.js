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
      navigationBarTitleText: '推荐',
      usingComponents: {
        'wxc-toast': '../../packages/@minui/wxc-toast/dist/index',
        'wxc-flex': '../../packages/@minui/wxc-flex/dist/index'
      }
    }, _this2.$repeat = {}, _this2.$props = { "recGoods": { "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "hotGoods": { "v-bind:goodsItem.sync": "goods" }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTitle" }, "defect": {}, "isDown": {} }, _this2.$events = { "recGoods": { "v-on:goodsTap": "goDetail" }, "hotGoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      recGoods: _goods2.default,
      hotGoods: _goods2.default,
      load: _loading2.default,
      searchbar: _searchbar2.default,
      defect: _defect2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      pageTitle: 'index',
      bannerLink: [{ path: '../image/bg-bannerA@2x.jpg', id: 'png1' }, { path: '../image/bg-bannerB@2x.jpg', id: 'png2' }, { path: '../image/bg-bannerC@2x.jpg', id: 'png3' }, { path: '../image/bg-bannerD@2x.jpg', id: 'png4' }],
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
      isDown: false
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
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Main, [{
    key: 'onShow',
    value: function onShow() {
      this.currentPage = 0;
      this.initPage();
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
      var token = this.$parent.getToken('index');
      var data = {
        pageNum: this.pageNum,
        recommendType: this.currentPage + 1,
        token: token,
        pageSize: '5'
      };
      parent.HttpRequest.IndexHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.totalPageNum = res.data.data.totalPageNum;
          var data = res.data.data.spus;
          console.log(data);
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
            if (data.length < _this3.pageSize) {
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
        }
        _this.$apply();
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
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Main , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1haW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidXNpbmdDb21wb25lbnRzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjR29vZHMiLCJob3RHb29kcyIsImxvYWQiLCJzZWFyY2hiYXIiLCJkZWZlY3QiLCJpc0Rvd24iLCJkYXRhIiwicGFnZVRpdGxlIiwiYmFubmVyTGluayIsInBhdGgiLCJpZCIsInRvcG5hdmlnYXRpb24iLCJjdXJyZW50UGFnZSIsInBhZ2VhdXRvIiwic3dpcGVyT3B0IiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudFRhYiIsImluZGljYXRvckRvdHMiLCJpbmRpY2F0b3JDb2xvciIsImluZGljYXRvckFjdGl2ZSIsImdvb2RzIiwibG9hZGVkIiwicGFnZU51bSIsInRvdGFsUGFnZU51bSIsImlzTnVsbCIsIm1ldGhvZHMiLCJuYXZUYWIiLCJpbmRleCIsImluaXRQYWdlIiwiY2hhbmdlVGFiIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJjaGFuZ2VCYW5uZXIiLCJnb0RldGFpbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnZXRJbml0RGF0YSIsImxlbmd0aCIsImNiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwicGFyZW50IiwiX3RoaXMiLCJ0b2tlbiIsImdldFRva2VuIiwicmVjb21tZW5kVHlwZSIsInBhZ2VTaXplIiwiSHR0cFJlcXVlc3QiLCJJbmRleEh0dHAiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3B1cyIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsImNvdmVyIiwidGl0bGUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJyZWR1Y3Rpb24iLCJzb3VyY2VJZCIsImRlc2NyaXB0IiwiZGVzYyIsInB1c2giLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdz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TCxHQUFZa0QsS0FBS0UsS0FBakI7QUFDQUQsaUJBQUtFLEtBQUwsR0FBYUgsS0FBS0csS0FBbEI7QUFDQUYsaUJBQUtHLEtBQUwsR0FBYUosS0FBS0ssV0FBbEI7QUFDQUosaUJBQUtLLFFBQUwsR0FBZ0JOLEtBQUtJLEtBQXJCO0FBQ0FILGlCQUFLTSxTQUFMLEdBQWlCUCxLQUFLTyxTQUF0QjtBQUNBTixpQkFBS2xELEVBQUwsR0FBVWlELEtBQUtRLFFBQWY7QUFDQVAsaUJBQUtRLFFBQUwsR0FBZ0JULEtBQUtVLElBQXJCO0FBQ0F4QixrQkFBTXZCLEtBQU4sQ0FBWWdELElBQVosQ0FBaUJWLElBQWpCO0FBQ0FuQixrQkFBTUEsSUFBTjtBQUNELFdBWEQ7QUFZRCxTQTFCRCxNQTBCTztBQUNMSSxnQkFBTW5CLE1BQU4sR0FBZSxJQUFmO0FBQ0Q7QUFDRG1CLGNBQU0wQixNQUFOO0FBQ0QsT0FoQ0Q7QUFpQ0Q7OzsrQkFDVztBQUNWLFdBQUtqRCxLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUtFLE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS0UsTUFBTCxHQUFjLEtBQWQ7QUFDQSxXQUFLYSxXQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtnQyxNQUFMO0FBQ0Q7Ozs7RUFqSStCLGVBQUtDLEk7O2tCQUFsQmhGLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o6o6I2QJyxcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICAnd3hjLXRvYXN0JzogJy4uLy4uL3BhY2thZ2VzL0BtaW51aS93eGMtdG9hc3QvZGlzdC9pbmRleCcsXG4gICAgICAgICd3eGMtZmxleCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLWZsZXgvZGlzdC9pbmRleCdcbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInJlY0dvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiaG90R29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCJ9LFwic2VhcmNoYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwYWdlZnJvbS5zeW5jXCI6XCJwYWdlVGl0bGVcIn0sXCJkZWZlY3RcIjp7fSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInJlY0dvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn0sXCJob3RHb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNHb29kczogR29vZHMsXG4gICAgICBob3RHb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nLFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBkZWZlY3Q6IERlZmVjdCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBwYWdlVGl0bGU6ICdpbmRleCcsXG4gICAgICBiYW5uZXJMaW5rOiBbe3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJBQDJ4LmpwZycsIGlkOiAncG5nMSd9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckJAMnguanBnJywgaWQ6ICdwbmcyJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQ0AyeC5qcGcnLCBpZDogJ3BuZzMnfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJEQDJ4LmpwZycsIGlkOiAncG5nNCd9XSxcbiAgICAgIHRvcG5hdmlnYXRpb246IFsn5o6o6I2QJywgJ+eDremXqCddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAyMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZmNjYwMCdcbiAgICAgIH0sXG4gICAgICBnb29kczogW10sXG4gICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBpc0Rvd246IGZhbHNlXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hdlRhYiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGluZGV4XG4gICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgICAgfSxcbiAgICAgIGNoYW5nZVRhYiAoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGNoYW5nZUJhbm5lciAoZSkge1xuICAgICAgICB0aGlzLnN3aXBlck9wdC5jdXJyZW50VGFiID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDBcbiAgICAgIHRoaXMuaW5pdFBhZ2UoKVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRJbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRJbml0RGF0YSAoY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy4kcGFyZW50XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignaW5kZXgnKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgcmVjb21tZW5kVHlwZTogdGhpcy5jdXJyZW50UGFnZSArIDEsXG4gICAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgICAgcGFnZVNpemU6ICc1J1xuICAgICAgfVxuICAgICAgcGFyZW50Lkh0dHBSZXF1ZXN0LkluZGV4SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2UgKCkge1xuICAgICAgdGhpcy5nb29kcyA9IFtdXG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICB0aGlzLmdldEluaXREYXRhKClcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==