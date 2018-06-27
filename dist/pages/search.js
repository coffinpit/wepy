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
        this.getResult();
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
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
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
            good.detail = item.viceTitle;
            good.reduction = item.reduction;
            good.descript = item.desc;
            good.id = item.sourceId;
            _this.goods.push(good);
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.getResult();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2VhcmNoUmVzdWx0IiwiZGVmZWN0IiwiaXNEb3duIiwiZGF0YSIsInBhcmVudFRhYiIsImdvb2RzIiwia2V5d29yZHMiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJjb21wdXRlZCIsImlzU2VhcmNoIiwiaXNOdWxsIiwibGVuZ3RoIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2xlYXJJbnB1dCIsImtleVNlYXJjaCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImRvU2VhcmNoIiwiZ2V0UmVzdWx0Iiwic3dpdGNoVGFiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJ0b2tlbiIsImdldFRva2VuIiwic2VhcmNoIiwiZW5jb2RlVVJJIiwiSHR0cFJlcXVlc3QiLCJTZWFyY2hIdHRwIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImVycm9yIiwic3B1cyIsInRvdGFsQ291bnQiLCJmb3JFYWNoIiwiaXRlbSIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJ0aXRsZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInZpY2VUaXRsZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsInNvdXJjZUlkIiwicHVzaCIsIm1pc3NUb2tlbiIsIiRhcHBseSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdB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YyxPQUFLSCxPQUFMLENBQWFJLFFBQWIsQ0FBc0JNLElBQUlsQyxJQUFKLENBQVNzQyxLQUEvQixDQUFkO0FBQ0FaLGtCQUFNSixTQUFOO0FBQ0Q7QUFDRjtBQUNESSxjQUFNK0IsTUFBTjtBQUNELE9BbkNELEVBbUNHQyxLQW5DSCxDQW1DUyxZQUFNO0FBQ2JoQyxjQUFNRixPQUFOLENBQWNhLFdBQWQ7QUFDQVgsY0FBTUYsT0FBTixDQUFjbUMsUUFBZDtBQUNELE9BdENEO0FBdUNEOzs7MkJBQ09DLE0sRUFBUTtBQUNkLFdBQUszRCxTQUFMLEdBQWlCMkQsT0FBT0MsSUFBeEI7QUFDQSxXQUFLSixNQUFMO0FBQ0Q7Ozs7RUF0SWlDLGVBQUtJLEk7O2tCQUFwQnZFLE0iLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aQnOe0oidcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInNlYXJjaFJlc3VsdFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RcIjp7fSxcImlzRG93blwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInNlYXJjaFJlc3VsdFwiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBzZWFyY2hSZXN1bHQ6IEdvb2RzLFxuICAgICAgZGVmZWN0OiBEZWZlY3QsXG4gICAgICBpc0Rvd246IFJlYWNoZG93blxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgcGFyZW50VGFiOiAnJyxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIGtleXdvcmRzOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNTZWFyY2ggKCkge1xuICAgICAgICBpZiAodGhpcy5rZXl3b3JkcyA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xlYXJJbnB1dCAoKSB7XG4gICAgICAgIHRoaXMua2V5d29yZHMgPSAnJ1xuICAgICAgfSxcbiAgICAgIGtleVNlYXJjaCAoZSkge1xuICAgICAgICB0aGlzLmtleXdvcmRzID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICBkb1NlYXJjaCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2VhcmNoKSB7XG4gICAgICAgICAgdGhpcy5nb29kcyA9IFtdXG4gICAgICAgICAgdGhpcy5nZXRSZXN1bHQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnBhcmVudFRhYiA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuZ2V0UmVzdWx0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdldFJlc3VsdCAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW0sXG4gICAgICAgIHNlYXJjaDogZW5jb2RlVVJJKHRoaXMua2V5d29yZHMpLFxuICAgICAgICB0b2tlbjogdG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZWFyY2hIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSByZXMuZGF0YS5kYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YS5zcHVzXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YS50b3RhbENvdW50IDw9IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmdldFJlc3VsdCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAocGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudFRhYiA9IHBhcmVudC5wYWdlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=