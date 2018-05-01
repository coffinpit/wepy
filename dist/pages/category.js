'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _searchbar = require('./../components/searchbar.js');

var _searchbar2 = _interopRequireDefault(_searchbar);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hot = function (_wepy$page) {
  _inherits(Hot, _wepy$page);

  function Hot() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Hot);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Hot.__proto__ || Object.getPrototypeOf(Hot)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '商品分类'
    }, _this2.$repeat = {}, _this2.$props = { "Categoods": { "v-bind:goodsItem.once": "goods", "xmlns:v-on": "" }, "defectImage": {}, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTile" } }, _this2.$events = { "Categoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      Categoods: _goods2.default,
      defectImage: _defect2.default,
      searchbar: _searchbar2.default
    }, _this2.data = {
      token: '',
      categoryImg: ['../image/categoryA.jpg', '../image/categoryB.jpg', '../image/categoryC.jpg', '../image/categoryD.jpg'],
      categoryTab: [],
      childCategory: [{
        name: '',
        id: ''
      }],
      goods: [{
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1231123'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1234321'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1234321'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1234321'
      }],
      pageTile: 'category',
      currentTab: 0,
      currentItem: 0,
      isNull: false,
      showMore: ''
    }, _this2.methods = {
      changeTab: function changeTab(index, id) {
        this.currentTab = index;
        this.currentItem = 0;
      },
      reqCategory: function reqCategory(index) {
        this.currentItem = index;
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Hot, [{
    key: 'getShowMore',
    value: function getShowMore() {
      var _this3 = this;

      this.categoryTab.forEach(function (item, index) {
        if (item.category.length > 5) {
          _this3.showMore = index;
        }
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      console.log('到底了');
      // 显示加载状态
      _wepy2.default.showLoading({
        title: '加载中',
        icon: 'loading'
      });
      // 发送请求并显示新数据
      // 请求成功后隐藏loading
      setTimeout(function () {
        _wepy2.default.hideLoading();
      }, 1000);
    }
  }, {
    key: 'getTopCate',
    value: function getTopCate() {
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetTopCategory(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.title = item.name;
            obj.id = item.id;
            obj.child = _this.getChildCate(item.id);
            _this.categoryTab.push(obj);
          });
        }
        _this.$apply();
      });
    }
  }, {
    key: 'getChildCate',
    value: function getChildCate(sourceId) {
      var _this = this;
      var data = {
        token: this.token,
        categoryId: sourceId,
        includSelf: 1
      };
      var child = [{
        name: '全部',
        id: sourceId
      }];
      this.$parent.HttpRequest.GetChildCategory(data).then(function (res) {
        console.log(_this.categoryTab);
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.id = item.id;
            child.push(obj);
          });
        }
        _this.$apply();
      });
      return child;
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      if (this.goods.length === 0) {
        this.isNull = true;
      }
      this.token = this.$parent.getToken('category');
      this.getTopCate();
      this.getShowMore();
      console.log(this.categoryTab);
      console.log(this.showMore);
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // 数据刷新
      this.currentTab = 0;
      this.currentItem = 0;
    }
  }]);

  return Hot;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Hot , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkhvdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDYXRlZ29vZHMiLCJkZWZlY3RJbWFnZSIsInNlYXJjaGJhciIsImRhdGEiLCJ0b2tlbiIsImNhdGVnb3J5SW1nIiwiY2F0ZWdvcnlUYWIiLCJjaGlsZENhdGVnb3J5IiwibmFtZSIsImlkIiwiZ29vZHMiLCJwYXRoIiwidGl0bGUiLCJwcmljZSIsIm9sZHByaWNlIiwicGFnZVRpbGUiLCJjdXJyZW50VGFiIiwiY3VycmVudEl0ZW0iLCJpc051bGwiLCJzaG93TW9yZSIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJzaG93TG9hZGluZyIsImljb24iLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJfdGhpcyIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIkdldFRvcENhdGVnb3J5IiwidGhlbiIsInJlcyIsImVycm9yIiwib2JqIiwiY2hpbGQiLCJnZXRDaGlsZENhdGUiLCJwdXNoIiwiJGFwcGx5Iiwic291cmNlSWQiLCJjYXRlZ29yeUlkIiwiaW5jbHVkU2VsZiIsIkdldENoaWxkQ2F0ZWdvcnkiLCJnZXRUb2tlbiIsImdldFRvcENhdGUiLCJnZXRTaG93TW9yZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7O21MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyx5QkFBd0Is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T0FaRDtBQWFBLGFBQU9ILEtBQVA7QUFDRDs7OzZCQUNTO0FBQ1IsVUFBSSxLQUFLbkMsS0FBTCxDQUFXb0IsTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUMzQixhQUFLWixNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0QsV0FBS2QsS0FBTCxHQUFhLEtBQUtrQyxPQUFMLENBQWFlLFFBQWIsQ0FBc0IsVUFBdEIsQ0FBYjtBQUNBLFdBQUtDLFVBQUw7QUFDQSxXQUFLQyxXQUFMO0FBQ0F4QixjQUFRQyxHQUFSLENBQVksS0FBSzFCLFdBQWpCO0FBQ0F5QixjQUFRQyxHQUFSLENBQVksS0FBS2IsUUFBakI7QUFDQSxXQUFLNkIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUjtBQUNBLFdBQUtoQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNEOzs7O0VBbEo4QixlQUFLdUMsSTs7a0JBQWpCL0QsRyIsImZpbGUiOiJjYXRlZ29yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBIb3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliIbnsbsnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLm9uY2VcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RJbWFnZVwiOnt9LFwic2VhcmNoYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwYWdlZnJvbS5zeW5jXCI6XCJwYWdlVGlsZVwifX07XHJcbiRldmVudHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgQ2F0ZWdvb2RzOiBHb29kcyxcbiAgICAgIGRlZmVjdEltYWdlOiBEZWZlY3QsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2F0ZWdvcnlJbWc6IFsnLi4vaW1hZ2UvY2F0ZWdvcnlBLmpwZycsICcuLi9pbWFnZS9jYXRlZ29yeUIuanBnJywgJy4uL2ltYWdlL2NhdGVnb3J5Qy5qcGcnLCAnLi4vaW1hZ2UvY2F0ZWdvcnlELmpwZyddLFxuICAgICAgY2F0ZWdvcnlUYWI6IFtdLFxuICAgICAgY2hpbGRDYXRlZ29yeTogW3tcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGlkOiAnJ1xuICAgICAgfV0sXG4gICAgICBnb29kczogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgIGlkOiAnMTIzMTEyMydcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgIGlkOiAnMTIzNDMyMSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgIGlkOiAnMTIzNDMyMSdcbiAgICAgIH0sIHtcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mb57K+6YCJ5ZCO6IW/5bCP5pa5JyxcbiAgICAgICAgcHJpY2U6ICc5OS4wJyxcbiAgICAgICAgb2xkcHJpY2U6ICcxNjAuMCcsXG4gICAgICAgIGlkOiAnMTIzNDMyMSdcbiAgICAgIH1dLFxuICAgICAgcGFnZVRpbGU6ICdjYXRlZ29yeScsXG4gICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgY3VycmVudEl0ZW06IDAsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgc2hvd01vcmU6ICcnXG4gICAgfVxuICAgIGdldFNob3dNb3JlICgpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlUYWIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uY2F0ZWdvcnkubGVuZ3RoID4gNSkge1xuICAgICAgICAgIHRoaXMuc2hvd01vcmUgPSBpbmRleFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlVGFiIChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gaW5kZXhcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgIH0sXG4gICAgICByZXFDYXRlZ29yeSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IGluZGV4XG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgY29uc29sZS5sb2coJ+WIsOW6leS6hicpXG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgIGljb246ICdsb2FkaW5nJ1xuICAgICAgfSlcbiAgICAgIC8vIOWPkemAgeivt+axguW5tuaYvuekuuaWsOaVsOaNrlxuICAgICAgLy8g6K+35rGC5oiQ5Yqf5ZCO6ZqQ6JePbG9hZGluZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gICAgZ2V0VG9wQ2F0ZSAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouY2hpbGQgPSBfdGhpcy5nZXRDaGlsZENhdGUoaXRlbS5pZClcbiAgICAgICAgICAgIF90aGlzLmNhdGVnb3J5VGFiLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENoaWxkQ2F0ZSAoc291cmNlSWQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgY2F0ZWdvcnlJZDogc291cmNlSWQsXG4gICAgICAgIGluY2x1ZFNlbGY6IDFcbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZCA9IFt7XG4gICAgICAgIG5hbWU6ICflhajpg6gnLFxuICAgICAgICBpZDogc291cmNlSWRcbiAgICAgIH1dXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2hpbGRDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coX3RoaXMuY2F0ZWdvcnlUYWIpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignY2F0ZWdvcnknKVxuICAgICAgdGhpcy5nZXRUb3BDYXRlKClcbiAgICAgIHRoaXMuZ2V0U2hvd01vcmUoKVxuICAgICAgY29uc29sZS5sb2codGhpcy5jYXRlZ29yeVRhYilcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2hvd01vcmUpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICAvLyDmlbDmja7liLfmlrBcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgfVxuICB9XG4iXX0=