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
            _this.getResult();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        // _this.$parent.showFail()
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2VhcmNoUmVzdWx0IiwiZGVmZWN0IiwiaXNEb3duIiwiZGF0YSIsInBhcmVudFRhYiIsImdvb2RzIiwia2V5d29yZHMiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJjb21wdXRlZCIsImlzU2VhcmNoIiwiaXNOdWxsIiwibGVuZ3RoIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2xlYXJJbnB1dCIsImtleVNlYXJjaCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImRvU2VhcmNoIiwiZ2V0UmVzdWx0Iiwic3dpdGNoVGFiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJ0b2tlbiIsImdldFRva2VuIiwic2VhcmNoIiwiZW5jb2RlVVJJIiwiSHR0cFJlcXVlc3QiLCJTZWFyY2hIdHRwIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImVycm9yIiwic3B1cyIsInRvdGFsQ291bnQiLCJmb3JFYWNoIiwiaXRlbSIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJ0aXRsZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInZpY2VUaXRsZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsInNvdXJjZUlkIiwicHVzaCIsIm1pc3NUb2tlbiIsIiRhcHBseSIsImNhdGNoIiwicGFyZW50IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7eUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEUsU0FDYkMs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SSxjQUFNK0IsTUFBTjtBQUNELE9BbENELEVBa0NHQyxLQWxDSCxDQWtDUyxZQUFNO0FBQ2JoQyxjQUFNRixPQUFOLENBQWNhLFdBQWQ7QUFDQTtBQUNELE9BckNEO0FBc0NEOzs7MkJBQ09zQixNLEVBQVE7QUFDZCxXQUFLMUQsU0FBTCxHQUFpQjBELE9BQU9DLElBQXhCO0FBQ0EsV0FBS0gsTUFBTDtBQUNEOzs7O0VBcklpQyxlQUFLRyxJOztrQkFBcEJ0RSxNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJzZWFyY2hSZXN1bHRcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiZGVmZWN0XCI6e30sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJzZWFyY2hSZXN1bHRcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgc2VhcmNoUmVzdWx0OiBHb29kcyxcbiAgICAgIGRlZmVjdDogRGVmZWN0LFxuICAgICAgaXNEb3duOiBSZWFjaGRvd25cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHBhcmVudFRhYjogJycsXG4gICAgICBnb29kczogW10sXG4gICAgICBrZXl3b3JkczogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJ1xuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzU2VhcmNoICgpIHtcbiAgICAgICAgaWYgKHRoaXMua2V5d29yZHMgPT09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsZWFySW5wdXQgKCkge1xuICAgICAgICB0aGlzLmtleXdvcmRzID0gJydcbiAgICAgIH0sXG4gICAgICBrZXlTZWFyY2ggKGUpIHtcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgZG9TZWFyY2ggKCkge1xuICAgICAgICBpZiAodGhpcy5pc1NlYXJjaCkge1xuICAgICAgICAgIHRoaXMuZ29vZHMgPSBbXVxuICAgICAgICAgIHRoaXMuZ2V0UmVzdWx0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXJlbnRUYWIgPT09ICdjYXRlZ29yeScpIHtcbiAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldFJlc3VsdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRSZXN1bHQgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzZWFyY2g6IGVuY29kZVVSSSh0aGlzLmtleXdvcmRzKSxcbiAgICAgICAgdG9rZW46IHRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VhcmNoSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5kZXRhaWwgPSBpdGVtLnZpY2VUaXRsZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMuZ2V0UmVzdWx0KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50VGFiID0gcGFyZW50LnBhZ2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==