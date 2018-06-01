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
      categoryImg: ['http://p33mnuvro.bkt.clouddn.com/2018/5/9rwxryroks.jpg', 'http://p33mnuvro.bkt.clouddn.com/2018/5/2ls28undsw.jpg', 'http://p33mnuvro.bkt.clouddn.com/2018/5/5xop3ugmoh.jpg', 'http://p33mnuvro.bkt.clouddn.com/2018/5/lp8uqw6s6p.jpg'],
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
      isLoading: false
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
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetTopCategory(data).then(function (res) {
        _this.$parent.showSuccess();
        if (res.data.error === 0) {
          _this.isLoading = true;
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
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.getTopCate();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showSuccess();
        _this.isNull = true;
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'getChildCate',
    value: function getChildCate(sourceId) {
      var _this5 = this;

      this.token = this.$parent.getToken();
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
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
          }
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
      var _this6 = this;

      this.token = this.$parent.getToken();
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
            if (res.data.data.totalCount <= _this6.pageSize) {
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
          if (_this.$parent.missToken) {
            _this.token = _this6.$parent.getToken(res.data.error);
            _this.getSpu(sourceId, cb);
          }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsImlzTG9hZGluZyIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldFRvcENhdGVnb3J5IiwidGhlbiIsInJlcyIsInNob3dTdWNjZXNzIiwiZXJyb3IiLCJvYmoiLCJ0aXRsZSIsImNoaWxkIiwiZ2V0Q2hpbGRDYXRlIiwicHVzaCIsIm1pc3NUb2tlbiIsImdldFRvcENhdGUiLCIkYXBwbHkiLCJjYXRjaCIsInNob3dGYWlsIiwiY2F0ZWdvcnlJZCIsImluY2x1ZFNlbGYiLCJHZXRDaGlsZENhdGVnb3J5IiwiY2IiLCJHZXRTcHVIdHRwIiwiY29uc29sZSIsImxvZyIsInNwdXMiLCJ0b3RhbENvdW50IiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzZMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyx5QkFBd0IsT0FBekIsRUFBaUMsY0FBYSxFQUE5QyxFQUFiLEVBQStELGVBQWMsRUFBQyxRQUFPLEdBQVIsRUFBN0UsRUFBMEYsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixVQUExQyxFQUF0RyxFQUE0SixVQUFTLEVBQXJLLEUsU0FDVEMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLGlCQUFnQixVQUFqQixFQUFiLEUsU0FDVEMsVSxHQUFhO0FBQ1JDLGdDQURRO0FBRVJDLG1DQUZRO0FBR1JDLG9DQUhRO0FBSVJDO0FBSlEsSyxTQU1WQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLG1CQUFhLENBQUMsd0RBQUQsRUFBMkQsd0RBQTNELEVBQXFILHdEQUFySCxFQUErSyx3REFBL0ssQ0FGUjtBQUdMQyxtQkFBYSxFQUhSO0FBSUxDLHFCQUFlLENBQUM7QUFDZEMsY0FBTSxFQURRO0FBRWRDLFlBQUk7QUFGVSxPQUFELENBSlY7QUFRTEMsYUFBTyxFQVJGO0FBU0xDLGdCQUFVLFVBVEw7QUFVTEMsa0JBQVksQ0FWUDtBQVdMQyxtQkFBYSxDQVhSO0FBWUxDLGNBQVEsS0FaSDtBQWFMQyxnQkFBVSxFQWJMO0FBY0xDLGdCQUFVLENBZEw7QUFlTEMsZUFBUyxDQWZKO0FBZ0JMQyxnQkFBVSxFQWhCTDtBQWlCTEMsb0JBQWMsRUFqQlQ7QUFrQkxqQixjQUFRLEtBbEJIO0FBbUJMa0IsaUJBQVc7QUFuQk4sSyxTQTRCUEMsTyxHQUFVO0FBQ1JDLGVBRFEscUJBQ0dDLEtBREgsRUFDVWQsRUFEVixFQUNjO0FBQ3BCLGFBQUtHLFVBQUwsR0FBa0JXLEtBQWxCO0FBQ0EsYUFBS1YsV0FBTCxHQUFtQixDQUFuQjtBQUNBLGFBQUtLLFFBQUwsR0FBZ0JULEVBQWhCO0FBQ0EsYUFBS0ssTUFBTCxHQUFjLEtBQWQ7QUFDQSxhQUFLRyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGFBQUtPLE1BQUwsQ0FBWSxLQUFLTixRQUFqQjtBQUNELE9BUk87QUFTUk8saUJBVFEsdUJBU0tGLEtBVEwsRUFTWWQsRUFUWixFQVNnQjtBQUN0QixhQUFLSSxXQUFMLEdBQW1CVSxLQUFuQjtBQUNBLGFBQUtMLFFBQUwsR0FBZ0JULEVBQWhCO0FBQ0EsYUFBS0ssTUFBTCxHQUFjLEtBQWQ7QUFDQSxhQUFLRyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGFBQUtPLE1BQUwsQ0FBWSxLQUFLTixRQUFqQjtBQUNELE9BZk87QUFnQlJRLGNBaEJRLG9CQWdCRWpCLEVBaEJGLEVBZ0JNO0FBQ1osdUJBQUtrQixVQUFMLENBQWdCO0FBQ2RDLGVBQUssaUJBQWlCbkI7QUFEUixTQUFoQjtBQUdEO0FBcEJPLEs7Ozs7O2tDQVBLO0FBQUE7O0FBQ2IsV0FBS0gsV0FBTCxDQUFpQnVCLE9BQWpCLENBQXlCLFVBQUNDLElBQUQsRUFBT1AsS0FBUCxFQUFpQjtBQUN4QyxZQUFJTyxLQUFLQyxRQUFMLENBQWNDLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUIsaUJBQUtqQixRQUFMLEdBQWdCUSxLQUFoQjtBQUNEO0FBQ0YsT0FKRDtBQUtEOzs7b0NBdUJnQjtBQUNmLFVBQUksS0FBS04sT0FBTCxHQUFlLEtBQUtFLFlBQXhCLEVBQXNDO0FBQ3BDO0FBQ0EsYUFBS0YsT0FBTDtBQUNBLGFBQUtPLE1BQUwsQ0FBWSxLQUFLTixRQUFqQjtBQUNELE9BSkQsTUFJTztBQUNMLFlBQUksS0FBS1IsS0FBTCxDQUFXc0IsTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUMzQixlQUFLOUIsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7OztpQ0FDYTtBQUFBOztBQUNaLFdBQUsrQixPQUFMLENBQWFDLFdBQWI7QUFDQSxXQUFLOUIsS0FBTCxHQUFhLEtBQUs2QixPQUFMLENBQWFFLFFBQWIsRUFBYjtBQUNBLFVBQUlDLFFBQVEsSUFBWjtBQUNBLFVBQUlqQyxPQUFPO0FBQ1RDLGVBQU8sS0FBS0E7QUFESCxPQUFYO0FBR0EsV0FBSzZCLE9BQUwsQ0FBYUksV0FBYixDQUF5QkMsY0FBekIsQ0FBd0NuQyxJQUF4QyxFQUE4Q29DLElBQTlDLENBQW1ELFVBQUNDLEdBQUQsRUFBUztBQUMxREosY0FBTUgsT0FBTixDQUFjUSxXQUFkO0FBQ0EsWUFBSUQsSUFBSXJDLElBQUosQ0FBU3VDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJOLGdCQUFNaEIsU0FBTixHQUFrQixJQUFsQjtBQUNBLGNBQUlqQixPQUFPcUMsSUFBSXJDLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsZUFBSzBCLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsZ0JBQUlhLE1BQU0sRUFBVjtBQUNBQSxnQkFBSUMsS0FBSixHQUFZZCxLQUFLdEIsSUFBakI7QUFDQW1DLGdCQUFJbEMsRUFBSixHQUFTcUIsS0FBS3JCLEVBQWQ7QUFDQWtDLGdCQUFJRSxLQUFKLEdBQVlULE1BQU1VLFlBQU4sQ0FBbUJoQixLQUFLckIsRUFBeEIsQ0FBWjtBQUNBMkIsa0JBQU05QixXQUFOLENBQWtCeUMsSUFBbEIsQ0FBdUJKLEdBQXZCO0FBQ0QsV0FORDtBQU9BUCxnQkFBTWxCLFFBQU4sR0FBaUJrQixNQUFNOUIsV0FBTixDQUFrQixDQUFsQixFQUFxQkcsRUFBdEM7QUFDQTJCLGdCQUFNWixNQUFOLENBQWFZLE1BQU1sQixRQUFuQjtBQUNELFNBWkQsTUFZTztBQUNMa0IsZ0JBQU10QixNQUFOLEdBQWUsSUFBZjtBQUNBLGNBQUlzQixNQUFNSCxPQUFOLENBQWNlLFNBQWxCLEVBQTZCO0FBQzNCWixrQkFBTWhDLEtBQU4sR0FBYyxPQUFLNkIsT0FBTCxDQUFhRSxRQUFiLENBQXNCSyxJQUFJckMsSUFBSixDQUFTdUMsS0FBL0IsQ0FBZDtBQUNBTixrQkFBTWEsVUFBTjtBQUNEO0FBQ0Y7QUFDRGIsY0FBTWMsTUFBTjtBQUNELE9BdEJELEVBc0JHQyxLQXRCSCxDQXNCUyxZQUFNO0FBQ2JmLGNBQU1ILE9BQU4sQ0FBY1EsV0FBZDtBQUNBTCxjQUFNdEIsTUFBTixHQUFlLElBQWY7QUFDQXNCLGNBQU1ILE9BQU4sQ0FBY21CLFFBQWQ7QUFDRCxPQTFCRDtBQTJCRDs7O2lDQUNhbEMsUSxFQUFVO0FBQUE7O0FBQ3RCLFdBQUtkLEtBQUwsR0FBYSxLQUFLNkIsT0FBTCxDQUFhRSxRQUFiLEVBQWI7QUFDQSxVQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFJakMsT0FBTztBQUNUQyxlQUFPLEtBQUtBLEtBREg7QUFFVGlELG9CQUFZbkMsUUFGSDtBQUdUb0Msb0JBQVk7QUFISCxPQUFYO0FBS0EsVUFBSVQsUUFBUSxDQUFDO0FBQ1hyQyxjQUFNLElBREs7QUFFWEMsWUFBSVM7QUFGTyxPQUFELENBQVo7QUFJQSxXQUFLZSxPQUFMLENBQWFJLFdBQWIsQ0FBeUJrQixnQkFBekIsQ0FBMENwRCxJQUExQyxFQUFnRG9DLElBQWhELENBQXFELFVBQUNDLEdBQUQsRUFBUztBQUM1RCxZQUFJQSxJQUFJckMsSUFBSixDQUFTdUMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixjQUFJdkMsT0FBT3FDLElBQUlyQyxJQUFKLENBQVNBLElBQXBCO0FBQ0FBLGVBQUswQixPQUFMLENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JCLGdCQUFJYSxNQUFNLEVBQVY7QUFDQUEsZ0JBQUluQyxJQUFKLEdBQVdzQixLQUFLdEIsSUFBaEI7QUFDQW1DLGdCQUFJbEMsRUFBSixHQUFTcUIsS0FBS3JCLEVBQWQ7QUFDQW9DLGtCQUFNRSxJQUFOLENBQVdKLEdBQVg7QUFDRCxXQUxEO0FBTUQsU0FSRCxNQVFPO0FBQ0xQLGdCQUFNdEIsTUFBTixHQUFlLElBQWY7QUFDQSxjQUFJc0IsTUFBTUgsT0FBTixDQUFjZSxTQUFsQixFQUE2QjtBQUMzQlosa0JBQU1oQyxLQUFOLEdBQWMsT0FBSzZCLE9BQUwsQ0FBYUUsUUFBYixDQUFzQkssSUFBSXJDLElBQUosQ0FBU3VDLEtBQS9CLENBQWQ7QUFDRDtBQUNGO0FBQ0ROLGNBQU1jLE1BQU47QUFDRCxPQWhCRCxFQWdCR0MsS0FoQkgsQ0FnQlMsWUFBTTtBQUNiZixjQUFNdEIsTUFBTixHQUFlLElBQWY7QUFDRCxPQWxCRDtBQW1CQSxhQUFPK0IsS0FBUDtBQUNEOzs7MkJBQ08zQixRLEVBQVVzQyxFLEVBQUk7QUFBQTs7QUFDcEIsV0FBS3BELEtBQUwsR0FBYSxLQUFLNkIsT0FBTCxDQUFhRSxRQUFiLEVBQWI7QUFDQSxXQUFLRixPQUFMLENBQWFDLFdBQWI7QUFDQSxXQUFLaEMsTUFBTCxHQUFjLEtBQWQ7QUFDQSxVQUFJa0MsUUFBUSxJQUFaO0FBQ0EsVUFBSWpDLE9BQU87QUFDVGtELG9CQUFZbkMsUUFESDtBQUVUZCxlQUFPLEtBQUtBLEtBRkg7QUFHVFksa0JBQVUsS0FBS0EsUUFITjtBQUlUQyxpQkFBUyxLQUFLQTtBQUpMLE9BQVg7QUFNQSxXQUFLZ0IsT0FBTCxDQUFhSSxXQUFiLENBQXlCb0IsVUFBekIsQ0FBb0N0RCxJQUFwQyxFQUEwQ29DLElBQTFDLENBQStDLFVBQUNDLEdBQUQsRUFBUztBQUN0RGtCLGdCQUFRQyxHQUFSLENBQVluQixHQUFaO0FBQ0EsWUFBSUosTUFBTW5CLE9BQU4sS0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkJtQixnQkFBTTFCLEtBQU4sR0FBYyxFQUFkO0FBQ0Q7QUFDRCxZQUFJOEIsSUFBSXJDLElBQUosQ0FBU3VDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJOLGdCQUFNSCxPQUFOLENBQWNRLFdBQWQ7QUFDQUwsZ0JBQU1qQixZQUFOLEdBQXFCcUIsSUFBSXJDLElBQUosQ0FBU0EsSUFBVCxDQUFjZ0IsWUFBbkM7QUFDQSxjQUFJaEIsT0FBT3FDLElBQUlyQyxJQUFKLENBQVNBLElBQVQsQ0FBY3lELElBQXpCO0FBQ0EsY0FBSXpELEtBQUs2QixNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCSSxrQkFBTXRCLE1BQU4sR0FBZSxJQUFmO0FBQ0QsV0FGRCxNQUVPO0FBQ0xzQixrQkFBTXRCLE1BQU4sR0FBZSxLQUFmO0FBQ0EsZ0JBQUkwQixJQUFJckMsSUFBSixDQUFTQSxJQUFULENBQWMwRCxVQUFkLElBQTRCLE9BQUs3QyxRQUFyQyxFQUErQztBQUM3Q29CLG9CQUFNbEMsTUFBTixHQUFlLElBQWY7QUFDRCxhQUZELE1BRU87QUFDTGtDLG9CQUFNbEMsTUFBTixHQUFlLEtBQWY7QUFDRDtBQUNGO0FBQ0RDLGVBQUswQixPQUFMLENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JCLGdCQUFJZ0MsT0FBTyxFQUFYO0FBQ0FBLGlCQUFLQyxJQUFMLEdBQVlqQyxLQUFLa0MsS0FBakI7QUFDQUYsaUJBQUtsQixLQUFMLEdBQWFkLEtBQUtjLEtBQWxCO0FBQ0FrQixpQkFBS0csS0FBTCxHQUFhbkMsS0FBS29DLFdBQWxCO0FBQ0FKLGlCQUFLSyxRQUFMLEdBQWdCckMsS0FBS21DLEtBQXJCO0FBQ0FILGlCQUFLTSxTQUFMLEdBQWlCdEMsS0FBS3NDLFNBQXRCO0FBQ0FOLGlCQUFLckQsRUFBTCxHQUFVcUIsS0FBS1osUUFBZjtBQUNBNEMsaUJBQUtPLFFBQUwsR0FBZ0J2QyxLQUFLd0MsSUFBckI7QUFDQWxDLGtCQUFNMUIsS0FBTixDQUFZcUMsSUFBWixDQUFpQmUsSUFBakI7QUFDQU4sa0JBQU1BLElBQU47QUFDRCxXQVhEO0FBWUQsU0ExQkQsTUEwQk87QUFDTHBCLGdCQUFNdEIsTUFBTixHQUFlLElBQWY7QUFDQSxjQUFJc0IsTUFBTUgsT0FBTixDQUFjZSxTQUFsQixFQUE2QjtBQUMzQlosa0JBQU1oQyxLQUFOLEdBQWMsT0FBSzZCLE9BQUwsQ0FBYUUsUUFBYixDQUFzQkssSUFBSXJDLElBQUosQ0FBU3VDLEtBQS9CLENBQWQ7QUFDQU4sa0JBQU1aLE1BQU4sQ0FBYU4sUUFBYixFQUF1QnNDLEVBQXZCO0FBQ0Q7QUFDRjtBQUNEcEIsY0FBTWMsTUFBTjtBQUNELE9BdkNELEVBdUNHQyxLQXZDSCxDQXVDUyxZQUFNO0FBQ2JmLGNBQU10QixNQUFOLEdBQWUsSUFBZjtBQUNBc0IsY0FBTUgsT0FBTixDQUFjbUIsUUFBZDtBQUNELE9BMUNEO0FBMkNEOzs7NkJBQ1M7QUFDUixXQUFLSCxVQUFMO0FBQ0EsV0FBS3NCLFdBQUw7QUFDQSxXQUFLckIsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixVQUFJLEtBQUtqQixPQUFMLENBQWF1QyxRQUFqQixFQUEyQjtBQUN6QixhQUFLdkMsT0FBTCxDQUFhdUMsUUFBYixHQUF3QixLQUF4QjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUs1RCxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFlBQUksS0FBS1AsV0FBTCxDQUFpQjBCLE1BQWpCLEtBQTRCLENBQWhDLEVBQW1DO0FBQ2pDLGVBQUtSLE1BQUwsQ0FBWSxLQUFLbEIsV0FBTCxDQUFpQixDQUFqQixFQUFvQkcsRUFBaEM7QUFDRDtBQUNGO0FBQ0Y7Ozs7RUFwTm1DLGVBQUtnRSxJOztrQkFBdEJqRixRIiwiZmlsZSI6ImNhdGVnb3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoYmFyJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB5YiG57G7J1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiZGVmZWN0SW1hZ2VcIjp7XCJ0eXBlXCI6XCIxXCJ9LFwic2VhcmNoYmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwYWdlZnJvbS5zeW5jXCI6XCJwYWdlVGlsZVwifSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcIkNhdGVnb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBDYXRlZ29vZHM6IEdvb2RzLFxuICAgICAgZGVmZWN0SW1hZ2U6IERlZmVjdCxcbiAgICAgIHNlYXJjaGJhcjogU2VhcmNoLFxuICAgICAgaXNEb3duOiBSZWFjaGRvd25cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGNhdGVnb3J5SW1nOiBbJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tLzIwMTgvNS85cnd4cnlyb2tzLmpwZycsICdodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS8yMDE4LzUvMmxzMjh1bmRzdy5qcGcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vMjAxOC81LzV4b3AzdWdtb2guanBnJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tLzIwMTgvNS9scDh1cXc2czZwLmpwZyddLFxuICAgICAgY2F0ZWdvcnlUYWI6IFtdLFxuICAgICAgY2hpbGRDYXRlZ29yeTogW3tcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGlkOiAnJ1xuICAgICAgfV0sXG4gICAgICBnb29kczogW10sXG4gICAgICBwYWdlVGlsZTogJ2NhdGVnb3J5JyxcbiAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICBjdXJyZW50SXRlbTogMCxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBzaG93TW9yZTogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICB9XG4gICAgZ2V0U2hvd01vcmUgKCkge1xuICAgICAgdGhpcy5jYXRlZ29yeVRhYi5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5jYXRlZ29yeS5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgdGhpcy5zaG93TW9yZSA9IGluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGFuZ2VUYWIgKGluZGV4LCBpZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpbmRleFxuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgICAgICB0aGlzLnNvdXJjZUlkID0gaWRcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9LFxuICAgICAgcmVxQ2F0ZWdvcnkgKGluZGV4LCBpZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gaW5kZXhcbiAgICAgICAgdGhpcy5zb3VyY2VJZCA9IGlkXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRUb3BDYXRlICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFRvcENhdGVnb3J5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5jaGlsZCA9IF90aGlzLmdldENoaWxkQ2F0ZShpdGVtLmlkKVxuICAgICAgICAgICAgX3RoaXMuY2F0ZWdvcnlUYWIucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy5zb3VyY2VJZCA9IF90aGlzLmNhdGVnb3J5VGFiWzBdLmlkXG4gICAgICAgICAgX3RoaXMuZ2V0U3B1KF90aGlzLnNvdXJjZUlkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuZ2V0VG9wQ2F0ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0Q2hpbGRDYXRlIChzb3VyY2VJZCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGNhdGVnb3J5SWQ6IHNvdXJjZUlkLFxuICAgICAgICBpbmNsdWRTZWxmOiAxXG4gICAgICB9XG4gICAgICB2YXIgY2hpbGQgPSBbe1xuICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgaWQ6IHNvdXJjZUlkXG4gICAgICB9XVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENoaWxkQ2F0ZWdvcnkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBnZXRTcHUgKHNvdXJjZUlkLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGNhdGVnb3J5SWQ6IHNvdXJjZUlkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFNwdUh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKF90aGlzLnBhZ2VOdW0gPT09IDEpIHtcbiAgICAgICAgICBfdGhpcy5nb29kcyA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuZ2V0U3B1KHNvdXJjZUlkLCBjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLmdldFRvcENhdGUoKVxuICAgICAgdGhpcy5nZXRTaG93TW9yZSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50LnBhZ2VSb290KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSAwXG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICAgIGlmICh0aGlzLmNhdGVnb3J5VGFiLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuY2F0ZWdvcnlUYWJbMF0uaWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==