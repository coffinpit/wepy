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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsImlzTG9hZGluZyIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldFRvcENhdGVnb3J5IiwidGhlbiIsInJlcyIsImhpZGVMb2FkaW5nIiwiZXJyb3IiLCJvYmoiLCJ0aXRsZSIsImNoaWxkIiwiZ2V0Q2hpbGRDYXRlIiwicHVzaCIsIm1pc3NUb2tlbiIsImdldFRvcENhdGUiLCIkYXBwbHkiLCJjYXRjaCIsInNob3dGYWlsIiwiY2F0ZWdvcnlJZCIsImluY2x1ZFNlbGYiLCJHZXRDaGlsZENhdGVnb3J5IiwiY2IiLCJHZXRTcHVIdHRwIiwiY29uc29sZSIsImxvZyIsInNwdXMiLCJ0b3RhbENvdW50IiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsImdldFNob3dNb3JlIiwicGFnZVJvb3QiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs2TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssU0FJVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLHlCQUF3QixPQUF6QixFQUFpQyxjQUFhLEVBQTlDLEVBQWIsRUFBK0QsZUFBYyxFQUFDLFFBQU8sR0FBUixFQUE3RSxFQUEwRixhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXRHLEVBQTRKLFVBQVMsRUFBckssRSxTQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsaUJBQWdCLFVBQWpCLEVBQWIsRSxTQUNUQyxVLEdBQWE7QUFDUkMsZ0NBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsbUJBQWEsQ0FBQyx3REFBRCxFQUEyRCx3REFBM0QsRUFBcUgsd0RBQXJILEVBQStLLHdEQUEvSyxDQUZSO0FBR0xDLG1CQUFhLEVBSFI7QUFJTEMscUJBQWUsQ0FBQztBQUNkQyxjQUFNLEVBRFE7QUFFZEMsWUFBSTtBQUZVLE9BQUQsQ0FKVjtBQVFMQyxhQUFPLEVBUkY7QUFTTEMsZ0JBQVUsVUFUTDtBQVVMQyxrQkFBWSxDQVZQO0FBV0xDLG1CQUFhLENBWFI7QUFZTEMsY0FBUSxLQVpIO0FBYUxDLGdCQUFVLEVBYkw7QUFjTEMsZ0JBQVUsQ0FkTDtBQWVMQyxlQUFTLENBZko7QUFnQkxDLGdCQUFVLEVBaEJMO0FBaUJMQyxvQkFBYyxFQWpCVDtBQWtCTGpCLGNBQVEsS0FsQkg7QUFtQkxrQixpQkFBVztBQW5CTixLLFNBNEJQQyxPLEdB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LEVBQXVCc0MsRUFBdkI7QUFDRDtBQUNGO0FBQ0RwQixjQUFNYyxNQUFOO0FBQ0QsT0F2Q0QsRUF1Q0dDLEtBdkNILENBdUNTLFlBQU07QUFDYmYsY0FBTXRCLE1BQU4sR0FBZSxJQUFmO0FBQ0FzQixjQUFNSCxPQUFOLENBQWNtQixRQUFkO0FBQ0QsT0ExQ0Q7QUEyQ0Q7Ozs2QkFDUztBQUNSLFdBQUtILFVBQUw7QUFDQSxXQUFLc0IsV0FBTDtBQUNBLFdBQUtyQixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFVBQUksS0FBS2pCLE9BQUwsQ0FBYXVDLFFBQWpCLEVBQTJCO0FBQ3pCLGFBQUt2QyxPQUFMLENBQWF1QyxRQUFiLEdBQXdCLEtBQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBQ0Y7Ozt3Q0FDb0I7QUFDbkIsV0FBSzVELFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS1csTUFBTCxDQUFZLEtBQUtsQixXQUFMLENBQWlCLENBQWpCLEVBQW9CRyxFQUFoQyxFQUFvQyxZQUFNO0FBQ3hDLHVCQUFLZ0UsbUJBQUw7QUFDRCxPQUZEO0FBR0Q7Ozs7RUE1Tm1DLGVBQUtDLEk7O2tCQUF0Qm5GLFEiLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4HliIbnsbsnLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RJbWFnZVwiOntcInR5cGVcIjpcIjFcIn0sXCJzZWFyY2hiYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBhZ2Vmcm9tLnN5bmNcIjpcInBhZ2VUaWxlXCJ9LFwiaXNEb3duXCI6e319O1xyXG4kZXZlbnRzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIENhdGVnb29kczogR29vZHMsXG4gICAgICBkZWZlY3RJbWFnZTogRGVmZWN0LFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2gsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgY2F0ZWdvcnlJbWc6IFsnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vMjAxOC81Lzlyd3hyeXJva3MuanBnJywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tLzIwMTgvNS8ybHMyOHVuZHN3LmpwZycsICdodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS8yMDE4LzUvNXhvcDN1Z21vaC5qcGcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vMjAxOC81L2xwOHVxdzZzNnAuanBnJ10sXG4gICAgICBjYXRlZ29yeVRhYjogW10sXG4gICAgICBjaGlsZENhdGVnb3J5OiBbe1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgaWQ6ICcnXG4gICAgICB9XSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIHBhZ2VUaWxlOiAnY2F0ZWdvcnknLFxuICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgIGN1cnJlbnRJdGVtOiAwLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHNob3dNb3JlOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgaXNMb2FkaW5nOiBmYWxzZVxuICAgIH1cbiAgICBnZXRTaG93TW9yZSAoKSB7XG4gICAgICB0aGlzLmNhdGVnb3J5VGFiLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmNhdGVnb3J5Lmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICB0aGlzLnNob3dNb3JlID0gaW5kZXhcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoYW5nZVRhYiAoaW5kZXgsIGlkKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IGluZGV4XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICByZXFDYXRlZ29yeSAoaW5kZXgsIGlkKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSBpbmRleFxuICAgICAgICB0aGlzLnNvdXJjZUlkID0gaWRcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuc291cmNlSWQpXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldFRvcENhdGUgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VG9wQ2F0ZWdvcnkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmNoaWxkID0gX3RoaXMuZ2V0Q2hpbGRDYXRlKGl0ZW0uaWQpXG4gICAgICAgICAgICBfdGhpcy5jYXRlZ29yeVRhYi5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLnNvdXJjZUlkID0gX3RoaXMuY2F0ZWdvcnlUYWJbMF0uaWRcbiAgICAgICAgICBfdGhpcy5nZXRTcHUoX3RoaXMuc291cmNlSWQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5nZXRUb3BDYXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRDaGlsZENhdGUgKHNvdXJjZUlkKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgY2F0ZWdvcnlJZDogc291cmNlSWQsXG4gICAgICAgIGluY2x1ZFNlbGY6IDFcbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZCA9IFt7XG4gICAgICAgIG5hbWU6ICflhajpg6gnLFxuICAgICAgICBpZDogc291cmNlSWRcbiAgICAgIH1dXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Q2hpbGRDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5uYW1lID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBjaGlsZC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICAgIGdldFNwdSAoc291cmNlSWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgY2F0ZWdvcnlJZDogc291cmNlSWQsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U3B1SHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAoX3RoaXMucGFnZU51bSA9PT0gMSkge1xuICAgICAgICAgIF90aGlzLmdvb2RzID0gW11cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YS50b3RhbENvdW50IDw9IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuZ2V0U3B1KHNvdXJjZUlkLCBjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLmdldFRvcENhdGUoKVxuICAgICAgdGhpcy5nZXRTaG93TW9yZSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50LnBhZ2VSb290KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzLmN1cnJlbnRUYWIgPSAwXG4gICAgICAgIC8vIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICAgIC8vIGlmICh0aGlzLmNhdGVnb3J5VGFiLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAvLyAgIHRoaXMuZ2V0U3B1KHRoaXMuY2F0ZWdvcnlUYWJbMF0uaWQpXG4gICAgICAgIC8vIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xuICAgICAgdGhpcy5jdXJyZW50VGFiID0gMFxuICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuY2F0ZWdvcnlUYWJbMF0uaWQsICgpID0+IHtcbiAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=