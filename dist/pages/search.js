'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

var _reachdown = require('./../components/reachdown.js');

var _reachdown2 = _interopRequireDefault(_reachdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_wepy$page) {
  _inherits(Search, _wepy$page);

  function Search() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '搜索'
    }, _this2.$repeat = {}, _this2.$props = { "searchResult": { "xmlns:v-bind": "", "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "defect": {}, "isDown": {} }, _this2.$events = { "searchResult": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      searchResult: _goods2.default,
      defect: _defect2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      parentTab: '',
      goods: [],
      keywords: '',
      pageSize: 5,
      pageNum: 1,
      isDown: false,
      totalPageNum: ''
    }, _this2.computed = {
      isSearch: function isSearch() {
        if (this.keywords === '') {
          return false;
        } else {
          return true;
        }
      },
      isNull: function isNull() {
        if (this.goods.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    }, _this2.methods = {
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      },
      clearInput: function clearInput() {
        this.keywords = '';
      },
      keySearch: function keySearch(e) {
        this.keywords = e.detail.value;
      },
      doSearch: function doSearch() {
        if (this.isSearch) {
          this.goods = [];
          this.getResult();
        } else {
          if (this.parentTab === 'category') {
            _wepy2.default.switchTab({
              url: './category'
            });
          } else {
            _wepy2.default.switchTab({
              url: './index'
            });
          }
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Search, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.getInitData();
      } else {
        if (this.goods.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'getResult',
    value: function getResult() {
      var _this3 = this;

      this.$parent.showLoading();
      this.isDown = false;
      var _this = this;
      var token = this.$parent.getToken();
      var data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        search: encodeURI(this.keywords),
        token: token
      };
      this.$parent.HttpRequest.SearchHttp(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          _this.totalPageNum = res.data.data.totalPageNum;
          var data = res.data.data.spus;
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
            if (res.data.data.totalCount <= _this3.pageSize) {
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
            good.descript = item.desc;
            good.id = item.sourceId;
            _this.goods.push(good);
          });
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(parent) {
      this.parentTab = parent.page;
      this.$apply();
    }
  }]);

  return Search;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Search , 'pages/search'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2VhcmNoUmVzdWx0IiwiZGVmZWN0IiwiaXNEb3duIiwiZGF0YSIsInBhcmVudFRhYiIsImdvb2RzIiwia2V5d29yZHMiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJjb21wdXRlZCIsImlzU2VhcmNoIiwiaXNOdWxsIiwibGVuZ3RoIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2xlYXJJbnB1dCIsImtleVNlYXJjaCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImRvU2VhcmNoIiwiZ2V0UmVzdWx0Iiwic3dpdGNoVGFiIiwiZ2V0SW5pdERhdGEiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJfdGhpcyIsInRva2VuIiwiZ2V0VG9rZW4iLCJzZWFyY2giLCJlbmNvZGVVUkkiLCJIdHRwUmVxdWVzdCIsIlNlYXJjaEh0dHAiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInRpdGxlIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwiZGVzY3JpcHQiLCJkZXNjIiwic291cmNlSWQiLCJwdXNoIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsInBhcmVudCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JD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K0IsUUFBZDtBQUNELE9BakNEO0FBa0NEOzs7MkJBQ09HLE0sRUFBUTtBQUNkLFdBQUsxRCxTQUFMLEdBQWlCMEQsT0FBT0MsSUFBeEI7QUFDQSxXQUFLSCxNQUFMO0FBQ0Q7Ozs7RUFqSWlDLGVBQUtHLEk7O2tCQUFwQnRFLE0iLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aQnOe0oidcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInNlYXJjaFJlc3VsdFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RcIjp7fSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInNlYXJjaFJlc3VsdFwiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBzZWFyY2hSZXN1bHQ6IEdvb2RzLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgcGFyZW50VGFiOiAnJyxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGtleXdvcmRzOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNTZWFyY2ggKCkge1xuICAgICAgICBpZiAodGhpcy5rZXl3b3JkcyA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xlYXJJbnB1dCAoKSB7XG4gICAgICAgIHRoaXMua2V5d29yZHMgPSAnJ1xuICAgICAgfSxcbiAgICAgIGtleVNlYXJjaCAoZSkge1xuICAgICAgICB0aGlzLmtleXdvcmRzID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICBkb1NlYXJjaCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2VhcmNoKSB7XG4gICAgICAgICAgdGhpcy5nb29kcyA9IFtdXG4gICAgICAgICAgdGhpcy5nZXRSZXN1bHQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnBhcmVudFRhYiA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuZ2V0SW5pdERhdGEoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0UmVzdWx0ICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgc2VhcmNoOiBlbmNvZGVVUkkodGhpcy5rZXl3b3JkcyksXG4gICAgICAgIHRva2VuOiB0b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNlYXJjaEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50VGFiID0gcGFyZW50LnBhZ2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==