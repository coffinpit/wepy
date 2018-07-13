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
      categoryImg: ['http://p33mnuvro.bkt.clouddn.com/flimg_niupai.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_niurou.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_haixian.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_jiulei.png'],
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
            _this.getTopCate();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isNull = true;
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'getChildCate',
    value: function getChildCate(sourceId) {
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
            // _this.token = this.$parent.getToken(res.data.error)
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
      var _this4 = this;

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
            if (res.data.data.totalCount <= _this4.pageSize) {
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
      if (this.categoryTab.length > 0) {
        this.getSpu(this.categoryTab[0].id, function () {
          _wepy2.default.stopPullDownRefresh();
        });
      }
    }
  }]);

  return Category;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Category , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsImlzTG9hZGluZyIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldFRvcENhdGVnb3J5IiwidGhlbiIsInJlcyIsImhpZGVMb2FkaW5nIiwiZXJyb3IiLCJvYmoiLCJ0aXRsZSIsImNoaWxkIiwiZ2V0Q2hpbGRDYXRlIiwicHVzaCIsIm1pc3NUb2tlbiIsImdldFRvcENhdGUiLCIkYXBwbHkiLCJjYXRjaCIsImNhdGVnb3J5SWQiLCJpbmNsdWRTZWxmIiwiR2V0Q2hpbGRDYXRlZ29yeSIsImNiIiwiR2V0U3B1SHR0cCIsImNvbnNvbGUiLCJsb2ciLCJzcHVzIiwidG90YWxDb3VudCIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzaG93RmFpbCIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs2TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssU0FJVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLHlCQUF3QixPQUF6QixFQUFpQyxjQUFhLEVBQTlDLEVBQWIsRUFBK0QsZUFBYyxFQUFDLFFBQU8sR0FBUixFQUE3RSxFQUEwRixhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXRHLEVBQTRKLFVBQVMsRUFBckssRSxTQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsaUJBQWdCLFVBQWpCLEVBQWIsRSxTQUNUQyxVLEdBQWE7QUFDUkMsZ0NBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsbUJBQWEsQ0FBQyxtREFBRCxFQUFzRCxtREFBdEQsRUFBMkcsb0RBQTNHLEVBQWlLLG1EQUFqSyxDQUZSO0FBR0xDLG1CQUFhLEVBSFI7QUFJTEMscUJBQWUsQ0FBQztBQUNkQyxjQUFNLEVBRFE7QUFFZEMsWUFBSTtBQUZVLE9BQUQsQ0FKVjtBQVFMQyxhQUFPLEVBUkY7QUFTTEMsZ0JBQVUsVUFUTDtBQVVMQyxrQkFBWSxDQVZQO0FBV0xDLG1CQUFhLENBWFI7QUFZTEMsY0FBUSxLQVpIO0FBYUxDLGdCQUFVLEVBYkw7QUFjTEMsZ0JBQVUsQ0FkTDtBQWVMQyxlQUFTLENBZko7QUFnQkxDLGdCQUFVLEVBaEJMO0FBaUJMQyxvQkFBYyxFQWpCVDtBQWtCTGpCLGNBQVEsS0FsQkg7QUFtQkxrQixpQkFB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QUNSLFVBQUksS0FBS2pCLE9BQUwsQ0FBYXlDLFFBQWpCLEVBQTJCO0FBQ3pCLGFBQUt6QyxPQUFMLENBQWF5QyxRQUFiLEdBQXdCLEtBQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBQ0Y7Ozt3Q0FDb0I7QUFDbkIsV0FBSzlELFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsVUFBSSxLQUFLUCxXQUFMLENBQWlCMEIsTUFBakIsR0FBMEIsQ0FBOUIsRUFBaUM7QUFDL0IsYUFBS1IsTUFBTCxDQUFZLEtBQUtsQixXQUFMLENBQWlCLENBQWpCLEVBQW9CRyxFQUFoQyxFQUFvQyxZQUFNO0FBQ3hDLHlCQUFLa0UsbUJBQUw7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7OztFQTdObUMsZUFBS0MsSTs7a0JBQXRCckYsUSIsImZpbGUiOiJjYXRlZ29yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeWIhuexuycsXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkNhdGVnb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImRlZmVjdEltYWdlXCI6e1widHlwZVwiOlwiMVwifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpbGVcIn0sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgQ2F0ZWdvb2RzOiBHb29kcyxcbiAgICAgIGRlZmVjdEltYWdlOiBEZWZlY3QsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXRlZ29yeUltZzogWydodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS9mbGltZ19uaXVwYWkucG5nJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tL2ZsaW1nX25pdXJvdS5wbmcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vZmxpbWdfaGFpeGlhbi5wbmcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vZmxpbWdfaml1bGVpLnBuZyddLFxuICAgICAgY2F0ZWdvcnlUYWI6IFtdLFxuICAgICAgY2hpbGRDYXRlZ29yeTogW3tcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGlkOiAnJ1xuICAgICAgfV0sXG4gICAgICBnb29kczogW10sXG4gICAgICBwYWdlVGlsZTogJ2NhdGVnb3J5JyxcbiAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICBjdXJyZW50SXRlbTogMCxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBzaG93TW9yZTogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICB9XG4gICAgZ2V0U2hvd01vcmUgKCkge1xuICAgICAgdGhpcy5jYXRlZ29yeVRhYi5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5jYXRlZ29yeS5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgdGhpcy5zaG93TW9yZSA9IGluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGFuZ2VUYWIgKGluZGV4LCBpZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpbmRleFxuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgICAgICB0aGlzLnNvdXJjZUlkID0gaWRcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9LFxuICAgICAgcmVxQ2F0ZWdvcnkgKGluZGV4LCBpZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gaW5kZXhcbiAgICAgICAgdGhpcy5zb3VyY2VJZCA9IGlkXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRUb3BDYXRlICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFRvcENhdGVnb3J5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5jaGlsZCA9IF90aGlzLmdldENoaWxkQ2F0ZShpdGVtLmlkKVxuICAgICAgICAgICAgX3RoaXMuY2F0ZWdvcnlUYWIucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy5zb3VyY2VJZCA9IF90aGlzLmNhdGVnb3J5VGFiWzBdLmlkXG4gICAgICAgICAgX3RoaXMuZ2V0U3B1KF90aGlzLnNvdXJjZUlkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmdldFRvcENhdGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAvLyBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENoaWxkQ2F0ZSAoc291cmNlSWQpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgaW5jbHVkU2VsZjogMVxuICAgICAgfVxuICAgICAgdmFyIGNoaWxkID0gW3tcbiAgICAgICAgbmFtZTogJ+WFqOmDqCcsXG4gICAgICAgIGlkOiBzb3VyY2VJZFxuICAgICAgfV1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRDaGlsZENhdGVnb3J5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIGNoaWxkLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgLy8gX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgZ2V0U3B1IChzb3VyY2VJZCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTcHVIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChfdGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMuZ29vZHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLnRvdGFsQ291bnQgPD0gdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QuZGV0YWlsID0gaXRlbS52aWNlVGl0bGVcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBfdGhpcy5nb29kcy5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuZ2V0U3B1KHNvdXJjZUlkLCBjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLmdldFRvcENhdGUoKVxuICAgICAgdGhpcy5nZXRTaG93TW9yZSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50LnBhZ2VSb290KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzLmN1cnJlbnRUYWIgPSAwXG4gICAgICAgIC8vIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICAgIC8vIGlmICh0aGlzLmNhdGVnb3J5VGFiLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAvLyAgIHRoaXMuZ2V0U3B1KHRoaXMuY2F0ZWdvcnlUYWJbMF0uaWQpXG4gICAgICAgIC8vIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xuICAgICAgdGhpcy5jdXJyZW50VGFiID0gMFxuICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgIGlmICh0aGlzLmNhdGVnb3J5VGFiLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5jYXRlZ29yeVRhYlswXS5pZCwgKCkgPT4ge1xuICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=