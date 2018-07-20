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
      categoryImg: ['http://p33mnuvro.bkt.clouddn.com/flimg_niupai.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_niurou.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_haixian.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_jiulei.png', 'http://p33mnuvro.bkt.clouddn.com/flimg_qita.png'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsImlzTG9hZGluZyIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldFRvcENhdGVnb3J5IiwidGhlbiIsInJlcyIsImhpZGVMb2FkaW5nIiwiZXJyb3IiLCJvYmoiLCJ0aXRsZSIsImNoaWxkIiwiZ2V0Q2hpbGRDYXRlIiwicHVzaCIsIm1pc3NUb2tlbiIsImdldFRvcENhdGUiLCIkYXBwbHkiLCJjYXRjaCIsImNhdGVnb3J5SWQiLCJpbmNsdWRTZWxmIiwiR2V0Q2hpbGRDYXRlZ29yeSIsImNiIiwiR2V0U3B1SHR0cCIsImNvbnNvbGUiLCJsb2ciLCJzcHVzIiwidG90YWxDb3VudCIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJkZXRhaWwiLCJ2aWNlVGl0bGUiLCJyZWR1Y3Rpb24iLCJkZXNjcmlwdCIsImRlc2MiLCJzaG93RmFpbCIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs2TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssU0FJVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLHlCQUF3QixPQUF6QixFQUFpQyxjQUFhLEVBQTlDLEVBQWIsRUFBK0QsZUFBYyxFQUFDLFFBQU8sR0FBUixFQUE3RSxFQUEwRixhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXRHLEVBQTRKLFVBQVMsRUFBckssRSxTQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsaUJBQWdCLFVBQWpCLEVBQWIsRSxTQUNUQyxVLEdBQWE7QUFDUkMsZ0NBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsbUJBQWEsQ0FBQyxtREFBRCxFQUFzRCxtREFBdEQsRUFBMkcsb0RBQTNHLEVBQWlLLG1EQUFqSyxFQUFzTixpREFBdE4sQ0FGUjtBQUdMQyxtQkFBYSxFQUhSO0FBSUxDLHFCQUFlLENBQUM7QUFDZEMsY0FBTSxFQURRO0FBRWRDLFlBQUk7QUFGVSxPQUFELENBSlY7QUFRTEMsYUFBTyxFQVJGO0FBU0xDLGdCQUFVLFVBVEw7QUFVTEMsa0JBQVksQ0FWUDtBQVdMQyxtQkFBYSxDQVhSO0FBWUxDLGNBQVEsS0FaSDtBQWFMQyxnQkFBVSxFQWJMO0FBY0xDLGdCQUFVLENBZEw7QUFlTEMsZUFBUyxDQWZKO0FBZ0JMQyxnQkFBVSxFQWhCTDtBQWlCTEMsb0JBQWMsRUFqQlQ7QUFrQkxqQixjQUFRLEtBbEJI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QUNEOzs7NkJBQ1M7QUFDUixVQUFJLEtBQUtqQixPQUFMLENBQWF5QyxRQUFqQixFQUEyQjtBQUN6QixhQUFLekMsT0FBTCxDQUFheUMsUUFBYixHQUF3QixLQUF4QjtBQUNELE9BRkQsTUFFTztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQUNGOzs7d0NBQ29CO0FBQ25CLFdBQUs5RCxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFVBQUksS0FBS1AsV0FBTCxDQUFpQjBCLE1BQWpCLEdBQTBCLENBQTlCLEVBQWlDO0FBQy9CLGFBQUtSLE1BQUwsQ0FBWSxLQUFLbEIsV0FBTCxDQUFpQixDQUFqQixFQUFvQkcsRUFBaEMsRUFBb0MsWUFBTTtBQUN4Qyx5QkFBS2tFLG1CQUFMO0FBQ0QsU0FGRDtBQUdEO0FBQ0Y7Ozs7RUE3Tm1DLGVBQUtDLEk7O2tCQUF0QnJGLFEiLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliIbnsbsnLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RJbWFnZVwiOntcInR5cGVcIjpcIjFcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaWxlXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIENhdGVnb29kczogR29vZHMsXG4gICAgICBkZWZlY3RJbWFnZTogRGVmZWN0LFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2F0ZWdvcnlJbWc6IFsnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vZmxpbWdfbml1cGFpLnBuZycsICdodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS9mbGltZ19uaXVyb3UucG5nJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tL2ZsaW1nX2hhaXhpYW4ucG5nJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tL2ZsaW1nX2ppdWxlaS5wbmcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vZmxpbWdfcWl0YS5wbmcnXSxcbiAgICAgIGNhdGVnb3J5VGFiOiBbXSxcbiAgICAgIGNoaWxkQ2F0ZWdvcnk6IFt7XG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBpZDogJydcbiAgICAgIH1dLFxuICAgICAgZ29vZHM6IFtdLFxuICAgICAgcGFnZVRpbGU6ICdjYXRlZ29yeScsXG4gICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgY3VycmVudEl0ZW06IDAsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgc2hvd01vcmU6ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlXG4gICAgfVxuICAgIGdldFNob3dNb3JlICgpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlUYWIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uY2F0ZWdvcnkubGVuZ3RoID4gNSkge1xuICAgICAgICAgIHRoaXMuc2hvd01vcmUgPSBpbmRleFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlVGFiIChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gaW5kZXhcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgdGhpcy5zb3VyY2VJZCA9IGlkXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSxcbiAgICAgIHJlcUNhdGVnb3J5IChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IGluZGV4XG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0VG9wQ2F0ZSAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouY2hpbGQgPSBfdGhpcy5nZXRDaGlsZENhdGUoaXRlbS5pZClcbiAgICAgICAgICAgIF90aGlzLmNhdGVnb3J5VGFiLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuc291cmNlSWQgPSBfdGhpcy5jYXRlZ29yeVRhYlswXS5pZFxuICAgICAgICAgIF90aGlzLmdldFNwdShfdGhpcy5zb3VyY2VJZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRUb3BDYXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRDaGlsZENhdGUgKHNvdXJjZUlkKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgY2F0ZWdvcnlJZDogc291cmNlSWQsXG4gICAgICAgIGluY2x1ZFNlbGY6IDFcbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZCA9IFt7XG4gICAgICAgIG5hbWU6ICflhajpg6gnLFxuICAgICAgICBpZDogc291cmNlSWRcbiAgICAgIH1dXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2hpbGRDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5uYW1lID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGdldFNwdSAoc291cmNlSWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgY2F0ZWdvcnlJZDogc291cmNlSWQsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U3B1SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAoX3RoaXMucGFnZU51bSA9PT0gMSkge1xuICAgICAgICAgIF90aGlzLmdvb2RzID0gW11cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YS50b3RhbENvdW50IDw9IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmdldFNwdShzb3VyY2VJZCwgY2IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5nZXRUb3BDYXRlKClcbiAgICAgIHRoaXMuZ2V0U2hvd01vcmUoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgaWYgKHRoaXMuJHBhcmVudC5wYWdlUm9vdCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhpcy5jdXJyZW50VGFiID0gMFxuICAgICAgICAvLyB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgICAgICAvLyBpZiAodGhpcy5jYXRlZ29yeVRhYi5sZW5ndGggIT09IDApIHtcbiAgICAgICAgLy8gICB0aGlzLmdldFNwdSh0aGlzLmNhdGVnb3J5VGFiWzBdLmlkKVxuICAgICAgICAvLyB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICBpZiAodGhpcy5jYXRlZ29yeVRhYi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuY2F0ZWdvcnlUYWJbMF0uaWQsICgpID0+IHtcbiAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19