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
      navigationBarTitleText: '商品分类',
      enablePullDownRefresh: true
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
        _this.$parent.hideLoading();
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
        _this.$parent.hideLoading();
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
          _this.$parent.hideLoading();
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
            good.detail = item.viceTitle;
            good.reduction = item.reduction;
            good.id = item.sourceId;
            good.descript = item.desc;
            _this.goods.push(good);
          });
          cb && cb();
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
        // this.currentTab = 0
        // this.currentItem = 0
        // if (this.categoryTab.length !== 0) {
        //   this.getSpu(this.categoryTab[0].id)
        // }
      }
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.currentTab = 0;
      this.currentItem = 0;
      this.getSpu(this.categoryTab[0].id, function () {
        _wepy2.default.stopPullDownRefresh();
      });
    }
  }]);

  return Category;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Category , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsImlzTG9hZGluZyIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldFRvcENhdGVnb3J5IiwidGhlbiIsInJlcyIsImhpZGVMb2FkaW5nIiwiZXJyb3IiLCJvYmoiLCJ0aXRsZSIsImNoaWxkIiwiZ2V0Q2hpbGRDYXRlIiwicHVzaCIsIm1pc3NUb2tlbiIsImdldFRvcENhdGUiLCIkYXBwbHkiLCJjYXRjaCIsInNob3dGYWlsIiwiY2F0ZWdvcnlJZCIsImluY2x1ZFNlbGYiLCJHZXRDaGlsZENhdGVnb3J5IiwiY2IiLCJHZXRTcHVIdHRwIiwiY29uc29sZSIsImxvZyIsInNwdXMiLCJ0b3RhbENvdW50IiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsImRldGFpbCIsInZpY2VUaXRsZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs2TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssU0FJVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLHlCQUF3QixPQUF6QixFQUFpQyxjQUFhLEVBQTlDLEVBQWIsRUFBK0QsZUFBYyxFQUFDLFFBQU8sR0FBUixFQUE3RSxFQUEwRixhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXRHLEVBQTRKLFVBQVMsRUFBckssRSxTQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsaUJBQWdCLFVBQWpCLEVBQWIsRSxTQUNUQyxVLEdBQWE7QUFDUkMsZ0NBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsbUJBQWEsQ0FBQyx3REFBRCxFQUEyRCx3REFBM0QsRUFBcUgsd0RBQXJILEVBQStLLHdEQUEvSyxDQUZSO0FBR0xDLG1CQUFhLEVBSFI7QUFJTEMscUJBQWUsQ0FBQztBQUNkQyxjQUFNLEVBRFE7QUFFZEMsWUFBSTtBQUZVLE9BQUQsQ0FKVjtBQVFMQyxhQUFPLEVBUkY7QUFTTEMsZ0JBQVUsVUFUTDtBQVVMQyxrQkFBWSxDQVZQO0FBV0xDLG1CQUFhLENBWFI7QUFZTEMsY0FBUSxLQVpIO0FBYUxDLGdCQUFVLEVBYkw7QUFjTEMsZ0JBQVUsQ0FkTDtBQWVMQyxlQUFTLENBZko7QUFnQkxDLGdCQUFVLEVBaEJMO0FBaUJMQyxvQkFBYyxFQWpCVDtBQWtCTGpCLGNBQVEsS0FsQkg7QUFtQkxrQixpQkFBVztBQW5CTixLLFNBNEJQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDR0MsS0FESCxFQUNVZCxFQURWLEVBQ2M7QUFDcEIsYUFBS0csVUFBTCxHQUFrQlcsS0FBbEI7QUFDQSxhQUFLVixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsYUFBS0ssUUFBTCxHQUFnQlQsRUFBaEI7QUFDQSxhQUFLSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUtHLE9BQUwsR0FBZSxDQUFmO0FBQ0EsYUFBS08sTUFBTCxDQUFZLEtBQUtOLFFBQWpCO0FBQ0QsT0FSTztBQVNSTyxpQkFUUSx1QkFTS0YsS0FUTCxFQVNZZCxFQVRaLEVBU2dCO0FBQ3RCLGFBQUtJLFdBQUwsR0FBbUJVLEtBQW5CO0FBQ0EsYUFBS0wsUUFBTCxHQUFnQlQsRUFBaEI7QUFDQSxhQUFLSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUtHLE9BQUwsR0FBZSxDQUFmO0FBQ0EsYUFBS08sTUFBTCxDQUFZLEtBQUtOLFFBQWpCO0FBQ0QsT0FmTztBQWdCUlEsY0FoQlEsb0JBZ0JFakIsRUFoQkYsRUFnQk07QUFDWix1QkFBS2tCLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxpQkFBaUJuQjtBQURSLFNBQWhCO0FBR0Q7QUFwQk8sSzs7Ozs7a0NBUEs7QUFBQTs7QUFDYixXQUFLSCxXQUFMLENBQWlCdUIsT0FBakIsQ0FBeUIsVUFBQ0MsSUFBRCxFQUFPUCxLQUFQLEVBQWlCO0FBQ3hDLFlBQUlPLEtBQUtDLFFBQUwsQ0FBY0MsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUM1QixpQkFBS2pCLFFBQUwsR0FBZ0JRLEtBQWhCO0FBQ0Q7QUFDRixPQUpEO0FBS0Q7OztvQ0F1QmdCO0FBQ2YsVUFBSSxLQUFLTixPQUFMLEdBQWUsS0FBS0UsWUFBeEIsRUFBc0M7QUFDcEM7QUFDQSxhQUFLRixPQUFMO0FBQ0EsYUFBS08sTUFBTCxDQUFZLEtBQUtOLFFBQWpCO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSSxLQUFLUixLQUFMLENBQVdzQixNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGVBQUs5QixNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0Y7QUFDRjs7O2lDQUNhO0FBQUE7O0FBQ1osV0FBSytCLE9BQUwsQ0FBYUMsV0FBYjtBQUNBLFdBQUs5QixLQUFMLEdBQWEsS0FBSzZCLE9BQUwsQ0FBYUUsUUFBYixFQUFiO0FBQ0EsVUFBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBSWpDLE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLNkIsT0FBTCxDQUFhSSxXQUFiLENBQXlCQyxjQUF6QixDQUF3Q25DLElBQXhDLEVBQThDb0MsSUFBOUMsQ0FBbUQsVUFBQ0MsR0FBRCxFQUFTO0FBQzFESixjQUFNSCxPQUFOLENBQWNRLFdBQWQ7QUFDQSxZQUFJRCxJQUFJckMsSUFBSixDQUFTdUMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4Qk4sZ0JBQU1oQixTQUFOLEdBQWtCLElBQWxCO0FBQ0EsY0FBSWpCLE9BQU9xQyxJQUFJckMsSUFBSixDQUFTQSxJQUFwQjtBQUNBQSxlQUFLMEIsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQixnQkFBSWEsTUFBTSxFQUFWO0FBQ0FBLGdCQUFJQyxLQUFKLEdBQVlkLEtBQUt0QixJQUFqQjtBQUNBbUMsZ0JBQUlsQyxFQUFKLEdBQVNxQixLQUFLckIsRUFBZDtBQUNBa0MsZ0JBQUlFLEtBQUosR0FBWVQsTUFBTVUsWUFBTixDQUFtQmhCLEtBQUtyQixFQUF4QixDQUFaO0FBQ0EyQixrQkFBTTlCLFdBQU4sQ0FBa0J5QyxJQUFsQixDQUF1QkosR0FBdkI7QUFDRCxXQU5EO0FBT0FQLGdCQUFNbEIsUUFBTixHQUFpQmtCLE1BQU05QixXQUFOLENBQWtCLENBQWxCLEVBQXFCRyxFQUF0QztBQUNBMkIsZ0JBQU1aLE1BQU4sQ0FBYVksTUFBTWxCLFFBQW5CO0FBQ0QsU0FaRCxNQVlPO0FBQ0xrQixnQkFBTXRCLE1BQU4sR0FBZSxJQUFmO0FBQ0EsY0FBSXNCLE1BQU1ILE9BQU4sQ0FBY2UsU0FBbEIsRUFBNkI7QUFDM0JaLGtCQUFNaEMsS0FBTixHQUFjLE9BQUs2QixPQUFMLENBQWFFLFFBQWIsQ0FBc0JLLElBQUlyQyxJQUFKLENBQVN1QyxLQUEvQixDQUFkO0FBQ0FOLGtCQUFNYSxVQUFOO0FBQ0Q7QUFDRjtBQUNEYixjQUFNYyxNQUFOO0FBQ0QsT0F0QkQsRUFzQkdDLEtBdEJILENBc0JTLFlBQU07QUFDYmYsY0FBTUgsT0FBTixDQUFjUSxXQUFkO0FBQ0FMLGNBQU10QixNQUFOLEdBQWUsSUFBZjtBQUNBc0IsY0FBTUgsT0FBTixDQUFjbUIsUUFBZDtBQUNELE9BMUJEO0FBMkJEOzs7aUNBQ2FsQyxRLEVBQVU7QUFBQTs7QUFDdEIsV0FBS2QsS0FBTCxHQUFhLEtBQUs2QixPQUFMLENBQWFFLFFBQWIsRUFBYjtBQUNBLFVBQUlDLFFBQVEsSUFBWjtBQUNBLFVBQUlqQyxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUaUQsb0JBQVluQyxRQUZIO0FBR1RvQyxvQkFBWTtBQUhILE9BQVg7QUFLQSxVQUFJVCxRQUFRLENBQUM7QUFDWHJDLGNBQU0sSUFESztBQUVYQyxZQUFJUztBQUZPLE9BQUQsQ0FBWjtBQUlBLFdBQUtlLE9BQUwsQ0FBYUksV0FBYixDQUF5QmtCLGdCQUF6QixDQUEwQ3BELElBQTFDLEVBQWdEb0MsSUFBaEQsQ0FBcUQsVUFBQ0MsR0FBRCxFQUFTO0FBQzVELFlBQUlBLElBQUlyQyxJQUFKLENBQVN1QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUl2QyxPQUFPcUMsSUFBSXJDLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsZUFBSzBCLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsZ0JBQUlhLE1BQU0sRUFBVjtBQUNBQSxnQkFBSW5DLElBQUosR0FBV3NCLEtBQUt0QixJQUFoQjtBQUNBbUMsZ0JBQUlsQyxFQUFKLEdBQVNxQixLQUFLckIsRUFBZDtBQUNBb0Msa0JBQU1FLElBQU4sQ0FBV0osR0FBWDtBQUNELFdBTEQ7QUFNRCxTQVJELE1BUU87QUFDTFAsZ0JBQU10QixNQUFOLEdBQWUsSUFBZjtBQUNBLGNBQUlzQixNQUFNSCxPQUFOLENBQWNlLFNBQWxCLEVBQTZCO0FBQzNCWixrQkFBTWhDLEtBQU4sR0FBYyxPQUFLNkIsT0FBTCxDQUFhRSxRQUFiLENBQXNCSyxJQUFJckMsSUFBSixDQUFTdUMsS0FBL0IsQ0FBZDtBQUNEO0FBQ0Y7QUFDRE4sY0FBTWMsTUFBTjtBQUNELE9BaEJELEVBZ0JHQyxLQWhCSCxDQWdCUyxZQUFNO0FBQ2JmLGNBQU10QixNQUFOLEdBQWUsSUFBZjtBQUNELE9BbEJEO0FBbUJBLGFBQU8rQixLQUFQO0FBQ0Q7OzsyQkFDTzNCLFEsRUFBVXNDLEUsRUFBSTtBQUFBOztBQUNwQixXQUFLcEQsS0FBTCxHQUFhLEtBQUs2QixPQUFMLENBQWFFLFFBQWIsRUFBYjtBQUNBLFdBQUtGLE9BQUwsQ0FBYUMsV0FBYjtBQUNBLFdBQUtoQyxNQUFMLEdBQWMsS0FBZDtBQUNBLFVBQUlrQyxRQUFRLElBQVo7QUFDQSxVQUFJakMsT0FBTztBQUNUa0Qsb0JBQVluQyxRQURIO0FBRVRkLGVBQU8sS0FBS0EsS0FGSDtBQUdUWSxrQkFBVSxLQUFLQSxRQUhOO0FBSVRDLGlCQUFTLEtBQUtBO0FBSkwsT0FBWDtBQU1BLFdBQUtnQixPQUFMLENBQWFJLFdBQWIsQ0FBeUJvQixVQUF6QixDQUFvQ3RELElBQXBDLEVBQTBDb0MsSUFBMUMsQ0FBK0MsVUFBQ0MsR0FBRCxFQUFTO0FBQ3REa0IsZ0JBQVFDLEdBQVIsQ0FBWW5CLEdBQVo7QUFDQSxZQUFJSixNQUFNbkIsT0FBTixLQUFrQixDQUF0QixFQUF5QjtBQUN2Qm1CLGdCQUFNMUIsS0FBTixHQUFjLEVBQWQ7QUFDRDtBQUNELFlBQUk4QixJQUFJckMsSUFBSixDQUFTdUMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4Qk4sZ0JBQU1ILE9BQU4sQ0FBY1EsV0FBZDtBQUNBTCxnQkFBTWpCLFlBQU4sR0FBcUJxQixJQUFJckMsSUFBSixDQUFTQSxJQUFULENBQWNnQixZQUFuQztBQUNBLGNBQUloQixPQUFPcUMsSUFBSXJDLElBQUosQ0FBU0EsSUFBVCxDQUFjeUQsSUFBekI7QUFDQSxjQUFJekQsS0FBSzZCLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckJJLGtCQUFNdEIsTUFBTixHQUFlLElBQWY7QUFDRCxXQUZELE1BRU87QUFDTHNCLGtCQUFNdEIsTUFBTixHQUFlLEtBQWY7QUFDQSxnQkFBSTBCLElBQUlyQyxJQUFKLENBQVNBLElBQVQsQ0FBYzBELFVBQWQsSUFBNEIsT0FBSzdDLFFBQXJDLEVBQStDO0FBQzdDb0Isb0JBQU1sQyxNQUFOLEdBQWUsSUFBZjtBQUNELGFBRkQsTUFFTztBQUNMa0Msb0JBQU1sQyxNQUFOLEdBQWUsS0FBZjtBQUNEO0FBQ0Y7QUFDREMsZUFBSzBCLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsZ0JBQUlnQyxPQUFPLEVBQVg7QUFDQUEsaUJBQUtDLElBQUwsR0FBWWpDLEtBQUtrQyxLQUFqQjtBQUNBRixpQkFBS2xCLEtBQUwsR0FBYWQsS0FBS2MsS0FBbEI7QUFDQWtCLGlCQUFLRyxLQUFMLEdBQWFuQyxLQUFLb0MsV0FBbEI7QUFDQUosaUJBQUtLLFFBQUwsR0FBZ0JyQyxLQUFLbUMsS0FBckI7QUFDQUgsaUJBQUtNLE1BQUwsR0FBY3RDLEtBQUt1QyxTQUFuQjtBQUNBUCxpQkFBS1EsU0FBTCxHQUFpQnhDLEtBQUt3QyxTQUF0QjtBQUNBUixpQkFBS3JELEVBQUwsR0FBVXFCLEtBQUtaLFFBQWY7QUFDQTRDLGlCQUFLUyxRQUFMLEdBQWdCekMsS0FBSzBDLElBQXJCO0FBQ0FwQyxrQkFBTTFCLEtBQU4sQ0FBWXFDLElBQVosQ0FBaUJlLElBQWpCO0FBQ0QsV0FYRDtBQVlBTixnQkFBTUEsSUFBTjtBQUNELFNBM0JELE1BMkJPO0FBQ0xwQixnQkFBTXRCLE1BQU4sR0FBZSxJQUFmO0FBQ0EsY0FBSXNCLE1BQU1ILE9BQU4sQ0FBY2UsU0FBbEIsRUFBNkI7QUFDM0JaLGtCQUFNaEMsS0FBTixHQUFjLE9BQUs2QixPQUFMLENBQWFFLFFBQWIsQ0FBc0JLLElBQUlyQyxJQUFKLENBQVN1QyxLQUEvQixDQUFkO0FBQ0FOLGtCQUFNWixNQUFOLENBQWFOLFFBQWIsRUFBdUJzQyxFQUF2QjtBQUNEO0FBQ0Y7QUFDRHBCLGNBQU1jLE1BQU47QUFDRCxPQXhDRCxFQXdDR0MsS0F4Q0gsQ0F3Q1MsWUFBTTtBQUNiZixjQUFNdEIsTUFBTixHQUFlLElBQWY7QUFDQXNCLGNBQU1ILE9BQU4sQ0FBY21CLFFBQWQ7QUFDRCxPQTNDRDtBQTRDRDs7OzZCQUNTO0FBQ1IsV0FBS0gsVUFBTDtBQUNBLFdBQUt3QixXQUFMO0FBQ0EsV0FBS3ZCLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsVUFBSSxLQUFLakIsT0FBTCxDQUFheUMsUUFBakIsRUFBMkI7QUFDekIsYUFBS3pDLE9BQUwsQ0FBYXlDLFFBQWIsR0FBd0IsS0FBeEI7QUFDRCxPQUZELE1BRU87QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7QUFDRjs7O3dDQUNvQjtBQUNuQixXQUFLOUQsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxXQUFLVyxNQUFMLENBQVksS0FBS2xCLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JHLEVBQWhDLEVBQW9DLFlBQU07QUFDeEMsdUJBQUtrRSxtQkFBTDtBQUNELE9BRkQ7QUFHRDs7OztFQTdObUMsZUFBS0MsSTs7a0JBQXRCckYsUSIsImZpbGUiOiJjYXRlZ29yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeWIhuexuycsXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkNhdGVnb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImRlZmVjdEltYWdlXCI6e1widHlwZVwiOlwiMVwifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpbGVcIn0sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgQ2F0ZWdvb2RzOiBHb29kcyxcbiAgICAgIGRlZmVjdEltYWdlOiBEZWZlY3QsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXRlZ29yeUltZzogWydodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS8yMDE4LzUvOXJ3eHJ5cm9rcy5qcGcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vMjAxOC81LzJsczI4dW5kc3cuanBnJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tLzIwMTgvNS81eG9wM3VnbW9oLmpwZycsICdodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS8yMDE4LzUvbHA4dXF3NnM2cC5qcGcnXSxcbiAgICAgIGNhdGVnb3J5VGFiOiBbXSxcbiAgICAgIGNoaWxkQ2F0ZWdvcnk6IFt7XG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBpZDogJydcbiAgICAgIH1dLFxuICAgICAgZ29vZHM6IFtdLFxuICAgICAgcGFnZVRpbGU6ICdjYXRlZ29yeScsXG4gICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgY3VycmVudEl0ZW06IDAsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgc2hvd01vcmU6ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlXG4gICAgfVxuICAgIGdldFNob3dNb3JlICgpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlUYWIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uY2F0ZWdvcnkubGVuZ3RoID4gNSkge1xuICAgICAgICAgIHRoaXMuc2hvd01vcmUgPSBpbmRleFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlVGFiIChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gaW5kZXhcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgdGhpcy5zb3VyY2VJZCA9IGlkXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSxcbiAgICAgIHJlcUNhdGVnb3J5IChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IGluZGV4XG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0VG9wQ2F0ZSAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouY2hpbGQgPSBfdGhpcy5nZXRDaGlsZENhdGUoaXRlbS5pZClcbiAgICAgICAgICAgIF90aGlzLmNhdGVnb3J5VGFiLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuc291cmNlSWQgPSBfdGhpcy5jYXRlZ29yeVRhYlswXS5pZFxuICAgICAgICAgIF90aGlzLmdldFNwdShfdGhpcy5zb3VyY2VJZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmdldFRvcENhdGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENoaWxkQ2F0ZSAoc291cmNlSWQpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgaW5jbHVkU2VsZjogMVxuICAgICAgfVxuICAgICAgdmFyIGNoaWxkID0gW3tcbiAgICAgICAgbmFtZTogJ+WFqOmDqCcsXG4gICAgICAgIGlkOiBzb3VyY2VJZFxuICAgICAgfV1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRDaGlsZENhdGVnb3J5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgZ2V0U3B1IChzb3VyY2VJZCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTcHVIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChfdGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMuZ29vZHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QuZGV0YWlsID0gaXRlbS52aWNlVGl0bGVcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBfdGhpcy5nb29kcy5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5nZXRTcHUoc291cmNlSWQsIGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuZ2V0VG9wQ2F0ZSgpXG4gICAgICB0aGlzLmdldFNob3dNb3JlKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQucGFnZVJvb3QpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgICAgLy8gdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgLy8gaWYgKHRoaXMuY2F0ZWdvcnlUYWIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIC8vICAgdGhpcy5nZXRTcHUodGhpcy5jYXRlZ29yeVRhYlswXS5pZClcbiAgICAgICAgLy8gfVxuICAgICAgfVxuICAgIH1cbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSAwXG4gICAgICB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgICAgdGhpcy5nZXRTcHUodGhpcy5jYXRlZ29yeVRhYlswXS5pZCwgKCkgPT4ge1xuICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==