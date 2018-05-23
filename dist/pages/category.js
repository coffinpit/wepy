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
      isDown: false,
      isLoading: false,
      getTokenTime: 0
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
      var _this4 = this;

      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetTopCategory(data).then(function (res) {
        if (res.data.error === 0) {
          _this.isLoading = true;
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
          if (res.data.error === -1 && res.data.msg === 'miss token') {
            _this.getTokenTime++;
            if (_this.getTokenTime < 3) {
              _this.token = _this4.$parent.getToken();
              _this.getTopCate();
            } else {
              _this.$parent.showFail();
            }
          } else if (res.data.error === -2) {
            _this.$parent.showFail(res.data.msg);
          }
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
      var _this5 = this;

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
            if (res.data.data.totalCount <= _this5.pageSize) {
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
      this.getTokenTime = 0;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsImlzTG9hZGluZyIsImdldFRva2VuVGltZSIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiSHR0cFJlcXVlc3QiLCJHZXRUb3BDYXRlZ29yeSIsInRoZW4iLCJyZXMiLCJlcnJvciIsInNob3dTdWNjZXNzIiwib2JqIiwidGl0bGUiLCJjaGlsZCIsImdldENoaWxkQ2F0ZSIsInB1c2giLCJtc2ciLCJnZXRUb2tlbiIsImdldFRvcENhdGUiLCJzaG93RmFpbCIsIiRhcHBseSIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImNhdGVnb3J5SWQiLCJpbmNsdWRTZWxmIiwiR2V0Q2hpbGRDYXRlZ29yeSIsImNiIiwiR2V0U3B1SHR0cCIsInNwdXMiLCJ0b3RhbENvdW50IiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsImdl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SzhCLE9BQUwsQ0FBYWUsUUFBYixFQUFiO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUtzQixXQUFMO0FBQ0EsV0FBS3BCLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBSy9CLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxVQUFJLEtBQUthLE9BQUwsQ0FBYXVDLFFBQWpCLEVBQTJCO0FBQ3pCLGFBQUt2QyxPQUFMLENBQWF1QyxRQUFiLEdBQXdCLEtBQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSzdELFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsWUFBSSxLQUFLUCxXQUFMLENBQWlCMkIsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsZUFBS1IsTUFBTCxDQUFZLEtBQUtuQixXQUFMLENBQWlCLENBQWpCLEVBQW9CRyxFQUFoQztBQUNEO0FBQ0Y7QUFDRjs7OztFQXJObUMsZUFBS2lFLEk7O2tCQUF0QmxGLFEiLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliIbnsbsnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RJbWFnZVwiOntcInR5cGVcIjpcIjFcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaWxlXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIENhdGVnb29kczogR29vZHMsXG4gICAgICBkZWZlY3RJbWFnZTogRGVmZWN0LFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2F0ZWdvcnlJbWc6IFsnLi4vaW1hZ2UvY2F0ZWdvcnlBLmpwZycsICcuLi9pbWFnZS9jYXRlZ29yeUIuanBnJywgJy4uL2ltYWdlL2NhdGVnb3J5Qy5qcGcnLCAnLi4vaW1hZ2UvY2F0ZWdvcnlELmpwZyddLFxuICAgICAgY2F0ZWdvcnlUYWI6IFtdLFxuICAgICAgY2hpbGRDYXRlZ29yeTogW3tcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGlkOiAnJ1xuICAgICAgfV0sXG4gICAgICBnb29kczogW10sXG4gICAgICBwYWdlVGlsZTogJ2NhdGVnb3J5JyxcbiAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICBjdXJyZW50SXRlbTogMCxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBzaG93TW9yZTogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICBnZXRUb2tlblRpbWU6IDBcbiAgICB9XG4gICAgZ2V0U2hvd01vcmUgKCkge1xuICAgICAgdGhpcy5jYXRlZ29yeVRhYi5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5jYXRlZ29yeS5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgdGhpcy5zaG93TW9yZSA9IGluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGFuZ2VUYWIgKGluZGV4LCBpZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpbmRleFxuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgICAgICB0aGlzLnNvdXJjZUlkID0gaWRcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9LFxuICAgICAgcmVxQ2F0ZWdvcnkgKGluZGV4LCBpZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gaW5kZXhcbiAgICAgICAgdGhpcy5zb3VyY2VJZCA9IGlkXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRUb3BDYXRlICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5jaGlsZCA9IF90aGlzLmdldENoaWxkQ2F0ZShpdGVtLmlkKVxuICAgICAgICAgICAgX3RoaXMuY2F0ZWdvcnlUYWIucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy5zb3VyY2VJZCA9IF90aGlzLmNhdGVnb3J5VGFiWzBdLmlkXG4gICAgICAgICAgX3RoaXMuZ2V0U3B1KF90aGlzLnNvdXJjZUlkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IC0xICYmIHJlcy5kYXRhLm1zZyA9PT0gJ21pc3MgdG9rZW4nKSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRUb2tlblRpbWUgKytcbiAgICAgICAgICAgIGlmIChfdGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgICAgICAgX3RoaXMuZ2V0VG9wQ2F0ZSgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmVycm9yID09PSAtMikge1xuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbChyZXMuZGF0YS5tc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2codGhpcy5nb29kcylcbiAgICB9XG4gICAgZ2V0Q2hpbGRDYXRlIChzb3VyY2VJZCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgaW5jbHVkU2VsZjogMVxuICAgICAgfVxuICAgICAgdmFyIGNoaWxkID0gW3tcbiAgICAgICAgbmFtZTogJ+WFqOmDqCcsXG4gICAgICAgIGlkOiBzb3VyY2VJZFxuICAgICAgfV1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRDaGlsZENhdGVnb3J5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgZ2V0U3B1IChzb3VyY2VJZCwgY2IpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgY2F0ZWdvcnlJZDogc291cmNlSWQsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U3B1SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAoX3RoaXMucGFnZU51bSA9PT0gMSkge1xuICAgICAgICAgIF90aGlzLmdvb2RzID0gW11cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YS50b3RhbENvdW50IDw9IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmdldFRvcENhdGUoKVxuICAgICAgdGhpcy5nZXRTaG93TW9yZSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQucGFnZVJvb3QpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcnlUYWIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5jYXRlZ29yeVRhYlswXS5pZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19