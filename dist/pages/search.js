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
    }, _this2.$repeat = {}, _this2.$props = { "searchResult": { "goodsItem.sync": "goods", "xmlns:v-on": "" }, "defect": {} }, _this2.$events = { "searchResult": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      searchResult: _goods2.default,
      defect: _defect2.default
    }, _this2.data = {
      parentTab: '',
      goods: [],
      keywords: '',
      pageSize: 5,
      pageNum: 1
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
        console.log(this.keywords);
      },
      keySearch: function keySearch(e) {
        this.keywords = e.detail.value;
      },
      doSearch: function doSearch() {
        if (this.isSearch) {
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
    key: 'getResult',
    value: function getResult() {
      this.$parent.showLoading();
      var _this = this;
      var token = this.$parent.getToken('search');
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
          var data = res.data.data.spus;
          data.forEach(function (item) {
            var good = {};
            good.path = item.cover;
            good.title = item.title;
            good.price = item.memberPrice;
            good.oldprice = item.price;
            good.reduction = item.reduction;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2VhcmNoUmVzdWx0IiwiZGVmZWN0IiwiZGF0YSIsInBhcmVudFRhYiIsImdvb2RzIiwia2V5d29yZHMiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJjb21wdXRlZCIsImlzU2VhcmNoIiwiaXNOdWxsIiwibGVuZ3RoIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2xlYXJJbnB1dCIsImNvbnNvbGUiLCJsb2ciLCJrZXlTZWFyY2giLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJkb1NlYXJjaCIsImdldFJlc3VsdCIsInN3aXRjaFRhYiIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsIl90aGlzIiwidG9rZW4iLCJnZXRUb2tlbiIsInNlYXJjaCIsImVuY29kZVVSSSIsIkh0dHBSZXF1ZXN0IiwiU2VhcmNoSHR0cCIsInRoZW4iLCJyZXMiLCJlcnJvciIsInNob3dTdWNjZXNzIiwic3B1cyIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInRpdGxlIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJwdXNoIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsInBhcmVudCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGtCQUFpQixPQUFsQixFQUEwQixjQUFhLEVBQXZDLEVBQWhCLEVBQTJELFVBQVMsRUFBcEUs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QVosQ0FBaUJULElBQWpCO0FBQ0QsV0FURDtBQVVELFNBYkQsTUFhTztBQUNMZCxnQkFBTUYsT0FBTixDQUFjMEIsUUFBZDtBQUNEO0FBQ0R4QixjQUFNeUIsTUFBTjtBQUNELE9BbkJELEVBbUJHQyxLQW5CSCxDQW1CUyxZQUFNO0FBQ2IxQixjQUFNRixPQUFOLENBQWMwQixRQUFkO0FBQ0QsT0FyQkQ7QUFzQkQ7OzsyQkFDT0csTSxFQUFRO0FBQ2QsV0FBS3JELFNBQUwsR0FBaUJxRCxPQUFPQyxJQUF4QjtBQUNBLFdBQUtILE1BQUw7QUFDRDs7OztFQXJHaUMsZUFBS0csSTs7a0JBQXBCaEUsTSIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pCc57SiJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wic2VhcmNoUmVzdWx0XCI6e1wiZ29vZHNJdGVtLnN5bmNcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RcIjp7fX07XHJcbiRldmVudHMgPSB7XCJzZWFyY2hSZXN1bHRcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgc2VhcmNoUmVzdWx0OiBHb29kcyxcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBwYXJlbnRUYWI6ICcnLFxuICAgICAgZ29vZHM6IFtdLFxuICAgICAga2V5d29yZHM6ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNTZWFyY2ggKCkge1xuICAgICAgICBpZiAodGhpcy5rZXl3b3JkcyA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xlYXJJbnB1dCAoKSB7XG4gICAgICAgIHRoaXMua2V5d29yZHMgPSAnJ1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmtleXdvcmRzKVxuICAgICAgfSxcbiAgICAgIGtleVNlYXJjaCAoZSkge1xuICAgICAgICB0aGlzLmtleXdvcmRzID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICBkb1NlYXJjaCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2VhcmNoKSB7XG4gICAgICAgICAgdGhpcy5nZXRSZXN1bHQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnBhcmVudFRhYiA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0UmVzdWx0ICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignc2VhcmNoJylcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtLFxuICAgICAgICBzZWFyY2g6IGVuY29kZVVSSSh0aGlzLmtleXdvcmRzKSxcbiAgICAgICAgdG9rZW46IHRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VhcmNoSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGEuc3B1c1xuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIF90aGlzLmdvb2RzLnB1c2goZ29vZClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50VGFiID0gcGFyZW50LnBhZ2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==