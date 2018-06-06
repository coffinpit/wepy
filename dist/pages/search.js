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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2VhcmNoUmVzdWx0IiwiZGVmZWN0IiwiaXNEb3duIiwiZGF0YSIsInBhcmVudFRhYiIsImdvb2RzIiwia2V5d29yZHMiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJjb21wdXRlZCIsImlzU2VhcmNoIiwiaXNOdWxsIiwibGVuZ3RoIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2xlYXJJbnB1dCIsImtleVNlYXJjaCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImRvU2VhcmNoIiwiZ2V0UmVzdWx0Iiwic3dpdGNoVGFiIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJ0b2tlbiIsImdldFRva2VuIiwic2VhcmNoIiwiZW5jb2RlVVJJIiwiSHR0cFJlcXVlc3QiLCJTZWFyY2hIdHRwIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImVycm9yIiwic3B1cyIsInRvdGFsQ291bnQiLCJmb3JFYWNoIiwiaXRlbSIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJ0aXRsZSIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsImRlc2NyaXB0IiwiZGVzYyIsInNvdXJjZUlkIiwicHVzaCIsIm1pc3NUb2tlbiIsIiRhcHBseSIsImNhdGNoIiwic2hvd0ZhaWwiLCJwYXJlbnQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNiQyxN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S0FBL0IsQ0FBZDtBQUNBWixrQkFBTUosU0FBTjtBQUNEO0FBQ0Y7QUFDREksY0FBTThCLE1BQU47QUFDRCxPQWxDRCxFQWtDR0MsS0FsQ0gsQ0FrQ1MsWUFBTTtBQUNiL0IsY0FBTUYsT0FBTixDQUFjYSxXQUFkO0FBQ0FYLGNBQU1GLE9BQU4sQ0FBY2tDLFFBQWQ7QUFDRCxPQXJDRDtBQXNDRDs7OzJCQUNPQyxNLEVBQVE7QUFDZCxXQUFLMUQsU0FBTCxHQUFpQjBELE9BQU9DLElBQXhCO0FBQ0EsV0FBS0osTUFBTDtBQUNEOzs7O0VBcklpQyxlQUFLSSxJOztrQkFBcEJ0RSxNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJzZWFyY2hSZXN1bHRcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiZGVmZWN0XCI6e30sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJzZWFyY2hSZXN1bHRcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgc2VhcmNoUmVzdWx0OiBHb29kcyxcbiAgICAgIGRlZmVjdDogRGVmZWN0LFxuICAgICAgaXNEb3duOiBSZWFjaGRvd25cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHBhcmVudFRhYjogJycsXG4gICAgICBnb29kczogW10sXG4gICAgICBrZXl3b3JkczogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJ1xuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzU2VhcmNoICgpIHtcbiAgICAgICAgaWYgKHRoaXMua2V5d29yZHMgPT09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmdvb2RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsZWFySW5wdXQgKCkge1xuICAgICAgICB0aGlzLmtleXdvcmRzID0gJydcbiAgICAgIH0sXG4gICAgICBrZXlTZWFyY2ggKGUpIHtcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgZG9TZWFyY2ggKCkge1xuICAgICAgICBpZiAodGhpcy5pc1NlYXJjaCkge1xuICAgICAgICAgIHRoaXMuZ29vZHMgPSBbXVxuICAgICAgICAgIHRoaXMuZ2V0UmVzdWx0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXJlbnRUYWIgPT09ICdjYXRlZ29yeScpIHtcbiAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldFJlc3VsdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRSZXN1bHQgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzZWFyY2g6IGVuY29kZVVSSSh0aGlzLmtleXdvcmRzKSxcbiAgICAgICAgdG9rZW46IHRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VhcmNoSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gcmVzLmRhdGEuZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEudG90YWxDb3VudCA8PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5nZXRSZXN1bHQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnRUYWIgPSBwYXJlbnQucGFnZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19