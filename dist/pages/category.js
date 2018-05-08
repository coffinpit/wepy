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

var _reachdown = require('./../components/reachdown.js');

var _reachdown2 = _interopRequireDefault(_reachdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Category = function (_wepy$page) {
  _inherits(Category, _wepy$page);

  function Category() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Category);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Category.__proto__ || Object.getPrototypeOf(Category)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '商品分类'
    }, _this2.$repeat = {}, _this2.$props = { "Categoods": { "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTile" }, "isDown": {} }, _this2.$events = { "Categoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      Categoods: _goods2.default,
      defectImage: _defect2.default,
      searchbar: _searchbar2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      token: '',
      categoryImg: ['../image/categoryA.jpg', '../image/categoryB.jpg', '../image/categoryC.jpg', '../image/categoryD.jpg'],
      categoryTab: [],
      childCategory: [{
        name: '',
        id: ''
      }],
      goods: [],
      pageTile: 'category',
      currentTab: 0,
      currentItem: 0,
      isNull: false,
      showMore: '',
      pageSize: 5,
      pageNum: 1,
      sourceId: '',
      totalPageNum: '',
      isDown: false
    }, _this2.methods = {
      changeTab: function changeTab(index, id) {
        this.currentTab = index;
        this.currentItem = 0;
        this.sourceId = id;
        this.isNull = false;
        this.pageNum = 1;
        this.getSpu(this.sourceId);
      },
      reqCategory: function reqCategory(index, id) {
        this.currentItem = index;
        this.sourceId = id;
        this.isNull = false;
        this.pageNum = 1;
        this.getSpu(this.sourceId);
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Category, [{
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
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.getSpu(this.sourceId);
      } else {
        if (this.goods.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'getTopCate',
    value: function getTopCate() {
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetTopCategory(data).then(function (res) {
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.title = item.name;
            obj.id = item.id;
            obj.child = _this.getChildCate(item.id);
            _this.categoryTab.push(obj);
          });
          _this.sourceId = _this.categoryTab[0].id;
          _this.getSpu(_this.sourceId);
        }
        _this.$apply();
      });
      console.log(this.goods);
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
    key: 'getSpu',
    value: function getSpu(sourceId, cb) {
      var _this4 = this;

      this.$parent.showLoading();
      this.isDown = false;
      var _this = this;
      var data = {
        categoryId: sourceId,
        token: this.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$parent.HttpRequest.GetSpuHttp(data).then(function (res) {
        console.log(res);
        if (_this.pageNum === 1) {
          _this.goods = [];
        }
        if (res.data.error === 0) {
          _this.totalPageNum = res.data.data.totalPageNum;
          var data = res.data.data.spus;
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
            if (data.totalCount <= _this4.pageSize) {
              _this.isDown = true;
            } else {
              _this.isDown = false;
            }
          }
          data.forEach(function (item) {
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
      }).catch(function () {
        _this.isNull = true;
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('category');
      this.getTopCate();
      this.getShowMore();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (this.$parent.pageRoot) {
        this.$parent.pageRoot = false;
      } else {
        this.currentTab = 0;
        this.currentItem = 0;
        if (this.categoryTab.length !== 0) {
          this.getSpu(this.categoryTab[0].id);
        }
      }
    }
  }]);

  return Category;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Category , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIl90aGlzIiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiR2V0VG9wQ2F0ZWdvcnkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJvYmoiLCJ0aXRsZSIsImNoaWxkIiwiZ2V0Q2hpbGRDYXRlIiwicHVzaCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJjYXRlZ29yeUlkIiwiaW5jbHVkU2VsZiIsIkdldENoaWxkQ2F0ZWdvcnkiLCJjYiIsInNob3dMb2FkaW5nIiwiR2V0U3B1SHR0cCIsInNwdXMiLCJ0b3RhbENvdW50IiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsImNhdGNoIiwiZ2V0VG9rZW4iLCJnZXRUb3BDYXRlIiwiZ2V0U2hvd01vcmUiLCJwYWdlUm9vdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7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T0FBTCxDQUFhbUMsUUFBakIsRUFBMkI7QUFDekIsYUFBS25DLE9BQUwsQ0FBYW1DLFFBQWIsR0FBd0IsS0FBeEI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLeEQsVUFBTCxHQUFrQixDQUFsQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxZQUFJLEtBQUtQLFdBQUwsQ0FBaUJ5QixNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxlQUFLUixNQUFMLENBQVksS0FBS2pCLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JHLEVBQWhDO0FBQ0Q7QUFDRjtBQUNGOzs7O0VBeExtQyxlQUFLNEQsSTs7a0JBQXRCN0UsUSIsImZpbGUiOiJjYXRlZ29yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeWIhuexuydcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkNhdGVnb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpbGVcIn0sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgQ2F0ZWdvb2RzOiBHb29kcyxcbiAgICAgIGRlZmVjdEltYWdlOiBEZWZlY3QsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXRlZ29yeUltZzogWycuLi9pbWFnZS9jYXRlZ29yeUEuanBnJywgJy4uL2ltYWdlL2NhdGVnb3J5Qi5qcGcnLCAnLi4vaW1hZ2UvY2F0ZWdvcnlDLmpwZycsICcuLi9pbWFnZS9jYXRlZ29yeUQuanBnJ10sXG4gICAgICBjYXRlZ29yeVRhYjogW10sXG4gICAgICBjaGlsZENhdGVnb3J5OiBbe1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgaWQ6ICcnXG4gICAgICB9XSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIHBhZ2VUaWxlOiAnY2F0ZWdvcnknLFxuICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgIGN1cnJlbnRJdGVtOiAwLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHNob3dNb3JlOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc0Rvd246IGZhbHNlXG4gICAgfVxuICAgIGdldFNob3dNb3JlICgpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlUYWIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uY2F0ZWdvcnkubGVuZ3RoID4gNSkge1xuICAgICAgICAgIHRoaXMuc2hvd01vcmUgPSBpbmRleFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlVGFiIChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gaW5kZXhcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgdGhpcy5zb3VyY2VJZCA9IGlkXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSxcbiAgICAgIHJlcUNhdGVnb3J5IChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IGluZGV4XG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0VG9wQ2F0ZSAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmNoaWxkID0gX3RoaXMuZ2V0Q2hpbGRDYXRlKGl0ZW0uaWQpXG4gICAgICAgICAgICBfdGhpcy5jYXRlZ29yeVRhYi5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLnNvdXJjZUlkID0gX3RoaXMuY2F0ZWdvcnlUYWJbMF0uaWRcbiAgICAgICAgICBfdGhpcy5nZXRTcHUoX3RoaXMuc291cmNlSWQpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdvb2RzKVxuICAgIH1cbiAgICBnZXRDaGlsZENhdGUgKHNvdXJjZUlkKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGNhdGVnb3J5SWQ6IHNvdXJjZUlkLFxuICAgICAgICBpbmNsdWRTZWxmOiAxXG4gICAgICB9XG4gICAgICB2YXIgY2hpbGQgPSBbe1xuICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgaWQ6IHNvdXJjZUlkXG4gICAgICB9XVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENoaWxkQ2F0ZWdvcnkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBnZXRTcHUgKHNvdXJjZUlkLCBjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTcHVIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChfdGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMuZ29vZHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChkYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBfdGhpcy5nb29kcy5wdXNoKGdvb2QpXG4gICAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2NhdGVnb3J5JylcbiAgICAgIHRoaXMuZ2V0VG9wQ2F0ZSgpXG4gICAgICB0aGlzLmdldFNob3dNb3JlKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQucGFnZVJvb3QpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcnlUYWIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5jYXRlZ29yeVRhYlswXS5pZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19