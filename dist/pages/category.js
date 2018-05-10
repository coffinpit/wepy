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
        } else {
          _this.isNull = true;
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
        _this.$parent.showFail();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIl90aGlzIiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiR2V0VG9wQ2F0ZWdvcnkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJvYmoiLCJ0aXRsZSIsImNoaWxkIiwiZ2V0Q2hpbGRDYXRlIiwicHVzaCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJjYXRlZ29yeUlkIiwiaW5jbHVkU2VsZiIsIkdldENoaWxkQ2F0ZWdvcnkiLCJzaG93RmFpbCIsImNhdGNoIiwiY2IiLCJzaG93TG9hZGluZyIsIkdldFNwdUh0dHAiLCJzaG93U3VjY2VzcyIsInNwdXMiLCJ0b3RhbENvdW50IiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsImdldFRva2VuIiwiZ2V0VG9wQ2F0ZSIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJwYWdlIl0sIm1h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SUFBZjtBQUNBa0IsZ0JBQU1DLE9BQU4sQ0FBY2lCLFFBQWQ7QUFDRDtBQUNEbEIsY0FBTVksTUFBTjtBQUNELE9BcENELEVBb0NHTyxLQXBDSCxDQW9DUyxZQUFNO0FBQ2JuQixjQUFNbEIsTUFBTixHQUFlLElBQWY7QUFDQWtCLGNBQU1DLE9BQU4sQ0FBY2lCLFFBQWQ7QUFDRCxPQXZDRDtBQXdDRDs7OzZCQUNTO0FBQ1IsV0FBSzlDLEtBQUwsR0FBYSxLQUFLNkIsT0FBTCxDQUFha0MsUUFBYixDQUFzQixVQUF0QixDQUFiO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUtDLFdBQUw7QUFDQSxXQUFLekIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixVQUFJLEtBQUtYLE9BQUwsQ0FBYXFDLFFBQWpCLEVBQTJCO0FBQ3pCLGFBQUtyQyxPQUFMLENBQWFxQyxRQUFiLEdBQXdCLEtBQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSzFELFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsWUFBSSxLQUFLUCxXQUFMLENBQWlCeUIsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsZUFBS1IsTUFBTCxDQUFZLEtBQUtqQixXQUFMLENBQWlCLENBQWpCLEVBQW9CRyxFQUFoQztBQUNEO0FBQ0Y7QUFDRjs7OztFQWpNbUMsZUFBSzhELEk7O2tCQUF0Qi9FLFEiLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliIbnsbsnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RJbWFnZVwiOntcInR5cGVcIjpcIjFcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaWxlXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIENhdGVnb29kczogR29vZHMsXG4gICAgICBkZWZlY3RJbWFnZTogRGVmZWN0LFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2F0ZWdvcnlJbWc6IFsnLi4vaW1hZ2UvY2F0ZWdvcnlBLmpwZycsICcuLi9pbWFnZS9jYXRlZ29yeUIuanBnJywgJy4uL2ltYWdlL2NhdGVnb3J5Qy5qcGcnLCAnLi4vaW1hZ2UvY2F0ZWdvcnlELmpwZyddLFxuICAgICAgY2F0ZWdvcnlUYWI6IFtdLFxuICAgICAgY2hpbGRDYXRlZ29yeTogW3tcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGlkOiAnJ1xuICAgICAgfV0sXG4gICAgICBnb29kczogW10sXG4gICAgICBwYWdlVGlsZTogJ2NhdGVnb3J5JyxcbiAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICBjdXJyZW50SXRlbTogMCxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBzaG93TW9yZTogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZVxuICAgIH1cbiAgICBnZXRTaG93TW9yZSAoKSB7XG4gICAgICB0aGlzLmNhdGVnb3J5VGFiLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmNhdGVnb3J5Lmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNob3dNb3JlID0gaW5kZXhcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoYW5nZVRhYiAoaW5kZXgsIGlkKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IGluZGV4XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICByZXFDYXRlZ29yeSAoaW5kZXgsIGlkKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSBpbmRleFxuICAgICAgICB0aGlzLnNvdXJjZUlkID0gaWRcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldFRvcENhdGUgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VG9wQ2F0ZWdvcnkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5jaGlsZCA9IF90aGlzLmdldENoaWxkQ2F0ZShpdGVtLmlkKVxuICAgICAgICAgICAgX3RoaXMuY2F0ZWdvcnlUYWIucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy5zb3VyY2VJZCA9IF90aGlzLmNhdGVnb3J5VGFiWzBdLmlkXG4gICAgICAgICAgX3RoaXMuZ2V0U3B1KF90aGlzLnNvdXJjZUlkKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2codGhpcy5nb29kcylcbiAgICB9XG4gICAgZ2V0Q2hpbGRDYXRlIChzb3VyY2VJZCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgaW5jbHVkU2VsZjogMVxuICAgICAgfVxuICAgICAgdmFyIGNoaWxkID0gW3tcbiAgICAgICAgbmFtZTogJ+WFqOmDqCcsXG4gICAgICAgIGlkOiBzb3VyY2VJZFxuICAgICAgfV1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRDaGlsZENhdGVnb3J5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGdldFNwdSAoc291cmNlSWQsIGNiKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGNhdGVnb3J5SWQ6IHNvdXJjZUlkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFNwdUh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKF90aGlzLnBhZ2VOdW0gPT09IDEpIHtcbiAgICAgICAgICBfdGhpcy5nb29kcyA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKGRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2NhdGVnb3J5JylcbiAgICAgIHRoaXMuZ2V0VG9wQ2F0ZSgpXG4gICAgICB0aGlzLmdldFNob3dNb3JlKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQucGFnZVJvb3QpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcnlUYWIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5jYXRlZ29yeVRhYlswXS5pZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19