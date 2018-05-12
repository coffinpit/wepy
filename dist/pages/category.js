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
    }, _this2.$repeat = {}, _this2.$props = { "Categoods": { "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "defectImage": { "type": "1" }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTile" }, "isDown": {} }, _this2.$events = { "Categoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
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
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetTopCategory(data).then(function (res) {
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
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
        } else {
          _this.isNull = true;
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
        _this.$parent.showFail();
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
        } else {
          _this.isNull = true;
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
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
          _this.$parent.showSuccess();
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
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiSHR0cFJlcXVlc3QiLCJHZXRUb3BDYXRlZ29yeSIsInRoZW4iLCJyZXMiLCJlcnJvciIsInNob3dTdWNjZXNzIiwib2JqIiwidGl0bGUiLCJjaGlsZCIsImdldENoaWxkQ2F0ZSIsInB1c2giLCJzaG93RmFpbCIsIiRhcHBseSIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImNhdGVnb3J5SWQiLCJpbmNsdWRTZWxmIiwiR2V0Q2hpbGRDYXRlZ29yeSIsImNiIiwiR2V0U3B1SHR0cCIsInNwdXMiLCJ0b3RhbENvdW50IiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsImdldFRva2VuIiwiZ2V0VG9wQ2F0ZSIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJwYWdlIl0sIm1h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S0FBS1gsUUFBZjtBQUNBd0MsaUJBQUtPLFFBQUwsR0FBZ0JwQyxLQUFLcUMsSUFBckI7QUFDQWhDLGtCQUFNeEIsS0FBTixDQUFZbUMsSUFBWixDQUFpQmEsSUFBakI7QUFDQUosa0JBQU1BLElBQU47QUFDRCxXQVhEO0FBWUQsU0ExQkQsTUEwQk87QUFDTHBCLGdCQUFNcEIsTUFBTixHQUFlLElBQWY7QUFDQW9CLGdCQUFNRixPQUFOLENBQWNjLFFBQWQ7QUFDRDtBQUNEWixjQUFNYSxNQUFOO0FBQ0QsT0FwQ0QsRUFvQ0dDLEtBcENILENBb0NTLFlBQU07QUFDYmQsY0FBTXBCLE1BQU4sR0FBZSxJQUFmO0FBQ0FvQixjQUFNRixPQUFOLENBQWNjLFFBQWQ7QUFDRCxPQXZDRDtBQXdDRDs7OzZCQUNTO0FBQ1IsV0FBSzFDLEtBQUwsR0FBYSxLQUFLNEIsT0FBTCxDQUFhbUMsUUFBYixFQUFiO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUtDLFdBQUw7QUFDQSxXQUFLdEIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixVQUFJLEtBQUtmLE9BQUwsQ0FBYXNDLFFBQWpCLEVBQTJCO0FBQ3pCLGFBQUt0QyxPQUFMLENBQWFzQyxRQUFiLEdBQXdCLEtBQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSzFELFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsWUFBSSxLQUFLUCxXQUFMLENBQWlCeUIsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsZUFBS1IsTUFBTCxDQUFZLEtBQUtqQixXQUFMLENBQWlCLENBQWpCLEVBQW9CRyxFQUFoQztBQUNEO0FBQ0Y7QUFDRjs7OztFQXZNbUMsZUFBSzhELEk7O2tCQUF0Qi9FLFEiLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliIbnsbsnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RJbWFnZVwiOntcInR5cGVcIjpcIjFcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaWxlXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIENhdGVnb29kczogR29vZHMsXG4gICAgICBkZWZlY3RJbWFnZTogRGVmZWN0LFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2F0ZWdvcnlJbWc6IFsnLi4vaW1hZ2UvY2F0ZWdvcnlBLmpwZycsICcuLi9pbWFnZS9jYXRlZ29yeUIuanBnJywgJy4uL2ltYWdlL2NhdGVnb3J5Qy5qcGcnLCAnLi4vaW1hZ2UvY2F0ZWdvcnlELmpwZyddLFxuICAgICAgY2F0ZWdvcnlUYWI6IFtdLFxuICAgICAgY2hpbGRDYXRlZ29yeTogW3tcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGlkOiAnJ1xuICAgICAgfV0sXG4gICAgICBnb29kczogW10sXG4gICAgICBwYWdlVGlsZTogJ2NhdGVnb3J5JyxcbiAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICBjdXJyZW50SXRlbTogMCxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBzaG93TW9yZTogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZVxuICAgIH1cbiAgICBnZXRTaG93TW9yZSAoKSB7XG4gICAgICB0aGlzLmNhdGVnb3J5VGFiLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmNhdGVnb3J5Lmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNob3dNb3JlID0gaW5kZXhcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoYW5nZVRhYiAoaW5kZXgsIGlkKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IGluZGV4XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICByZXFDYXRlZ29yeSAoaW5kZXgsIGlkKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSBpbmRleFxuICAgICAgICB0aGlzLnNvdXJjZUlkID0gaWRcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldFRvcENhdGUgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFRvcENhdGVnb3J5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouY2hpbGQgPSBfdGhpcy5nZXRDaGlsZENhdGUoaXRlbS5pZClcbiAgICAgICAgICAgIF90aGlzLmNhdGVnb3J5VGFiLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuc291cmNlSWQgPSBfdGhpcy5jYXRlZ29yeVRhYlswXS5pZFxuICAgICAgICAgIF90aGlzLmdldFNwdShfdGhpcy5zb3VyY2VJZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdvb2RzKVxuICAgIH1cbiAgICBnZXRDaGlsZENhdGUgKHNvdXJjZUlkKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGNhdGVnb3J5SWQ6IHNvdXJjZUlkLFxuICAgICAgICBpbmNsdWRTZWxmOiAxXG4gICAgICB9XG4gICAgICB2YXIgY2hpbGQgPSBbe1xuICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgaWQ6IHNvdXJjZUlkXG4gICAgICB9XVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENoaWxkQ2F0ZWdvcnkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBnZXRTcHUgKHNvdXJjZUlkLCBjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTcHVIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChfdGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMuZ29vZHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChkYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBfdGhpcy5nb29kcy5wdXNoKGdvb2QpXG4gICAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuZ2V0VG9wQ2F0ZSgpXG4gICAgICB0aGlzLmdldFNob3dNb3JlKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQucGFnZVJvb3QpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcnlUYWIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5jYXRlZ29yeVRhYlswXS5pZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19