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
        }
        _this.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2VhcmNoUmVzdWx0IiwiZGVmZWN0IiwiZGF0YSIsInBhcmVudFRhYiIsImdvb2RzIiwia2V5d29yZHMiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJjb21wdXRlZCIsImlzU2VhcmNoIiwiaXNOdWxsIiwibGVuZ3RoIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2xlYXJJbnB1dCIsImNvbnNvbGUiLCJsb2ciLCJrZXlTZWFyY2giLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJkb1NlYXJjaCIsImdldFJlc3VsdCIsInN3aXRjaFRhYiIsIl90aGlzIiwidG9rZW4iLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJzZWFyY2giLCJlbmNvZGVVUkkiLCJIdHRwUmVxdWVzdCIsIlNlYXJjaEh0dHAiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJzcHVzIiwiZm9yRWFjaCIsIml0ZW0iLCJnb29kIiwicGF0aCIsImNvdmVyIiwidGl0bGUiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJyZWR1Y3Rpb24iLCJzb3VyY2VJZCIsInB1c2giLCIkYXBwbHkiLCJwYXJlbnQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7eUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxrQkFBaUIsT0FBbEIsRUFBMEIsY0FBYSxFQUF2QyxFQUFoQixFQUEyRCxVQUFTLEVBQXBFLEUsU0FDVEMsTyxHQUFVLEVBQUMsZ0JBQWUsRUFBQyxpQkFBZ0IsVUFBakIsRUFBaEIsRSxTQUNUQyxVLEdBQWE7QUFDUkMsbUNBRFE7QUFFUkM7QUFGUSxLLFNBSVZDLEksR0FBTztBQUNMQyxpQkFBVyxFQUROO0FBRUxDLGFBQU8sRUFGRjtBQUdMQyxnQkFBVSxFQUhMO0FBSUxDLGdCQUFVLENBSkw7QUFLTEMsZUFBUztBQUxKLEssU0FTUEMsUSxHQUFXO0FBQ1RDLGNBRFMsc0JBQ0c7QUFDVixZQUFJLEtBQUtKLFFBQUwsS0FBa0IsRUFBdEIsRUFBMEI7QUFDeEIsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLElBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVEssWUFSUyxvQkFRQztBQUNSLFlBQUksS0FBS04sS0FBTCxDQUFXTyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQWRRLEssU0FnQlhDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNFQyxFQURGLEVBQ007QUFDWix1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLGlCQUFpQkY7QUFEUixTQUFoQjtBQUdELE9BTE87QUFNUkcsZ0JBTlEsd0JBTU07QUFDWixhQUFLWixRQUFMLEdBQWdCLEVBQWhCO0FBQ0FhLGdCQUFRQyxHQUFSLENBQVksS0FBS2QsUUFBakI7QUFDRCxPQVRPO0FBVVJlLGVBVlEscUJBVUdDLENBVkgsRUFVTTtBQUNaLGFBQUtoQixRQUFMLEdBQWdCZ0IsRUFBRUMsTUFBRixDQUFTQyxLQUF6QjtBQUNELE9BWk87QUFhUkMsY0FiUSxzQkFhSTtBQUNWLFlBQUksS0FBS2YsUUFBVCxFQUFtQjtBQUNqQixlQUFLZ0IsU0FBTDtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUksS0FBS3RCLFNBQUwsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakMsMkJBQUt1QixTQUFMLENBQWU7QUFDYlYsbUJBQUs7QUFEUSxhQUFmO0FBR0QsV0FKRCxNQUlPO0FBQ0wsMkJBQUtVLFNBQUwsQ0FBZTtBQUNiVixtQkFBSztBQURRLGFBQWY7QUFHRDtBQUNGO0FBQ0Y7QUEzQk8sSzs7Ozs7NkJBbEJBLENBQ1Q7OztnQ0E4Q1k7QUFDWCxVQUFJVyxRQUFRLElBQVo7QUFDQSxVQUFNQyxRQUFRLEtBQUtDLE9BQUwsQ0FBYUMsUUFBYixDQUFzQixRQUF0QixDQUFkO0FBQ0EsVUFBSTVCLE9BQU87QUFDVEksa0JBQVUsS0FBS0EsUUFETjtBQUVUQyxpQkFBUyxLQUFLQSxPQUZMO0FBR1R3QixnQkFBUUMsVUFBVSxLQUFLM0IsUUFBZixDQUhDO0FBSVR1QixlQUFPQTtBQUpFLE9BQVg7QUFNQSxXQUFLQyxPQUFMLENBQWFJLFdBQWIsQ0FBeUJDLFVBQXpCLENBQW9DaEMsSUFBcEMsRUFBMENpQyxJQUExQyxDQUErQyxVQUFDQyxHQUFELEVBQVM7QUFDdERsQixnQkFBUUMsR0FBUixDQUFZaUIsR0FBWjtBQUNBLFlBQUlBLElBQUlsQyxJQUFKLENBQVNtQyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUluQyxPQUFPa0MsSUFBSWxDLElBQUosQ0FBU0EsSUFBVCxDQUFjb0MsSUFBekI7QUFDQXBDLGVBQUtxQyxPQUFMLENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JCLGdCQUFJQyxPQUFPLEVBQVg7QUFDQUEsaUJBQUtDLElBQUwsR0FBWUYsS0FBS0csS0FBakI7QUFDQUYsaUJBQUtHLEtBQUwsR0FBYUosS0FBS0ksS0FBbEI7QUFDQUgsaUJBQUtJLEtBQUwsR0FBYUwsS0FBS00sV0FBbEI7QUFDQUwsaUJBQUtNLFFBQUwsR0FBZ0JQLEtBQUtLLEtBQXJCO0FBQ0FKLGlCQUFLTyxTQUFMLEdBQWlCUixLQUFLUSxTQUF0QjtBQUNBUCxpQkFBSzNCLEVBQUwsR0FBVTBCLEtBQUtTLFFBQWY7QUFDQXRCLGtCQUFNdkIsS0FBTixDQUFZOEMsSUFBWixDQUFpQlQsSUFBakI7QUFDRCxXQVREO0FBVUQ7QUFDRGQsY0FBTXdCLE1BQU47QUFDRCxPQWhCRDtBQWlCRDs7OzJCQUNPQyxNLEVBQVE7QUFDZCxXQUFLakQsU0FBTCxHQUFpQmlELE9BQU9DLElBQXhCO0FBQ0EsV0FBS0YsTUFBTDtBQUNEOzs7O0VBL0ZpQyxlQUFLRSxJOztrQkFBcEI1RCxNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJzZWFyY2hSZXN1bHRcIjp7XCJnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImRlZmVjdFwiOnt9fTtcclxuJGV2ZW50cyA9IHtcInNlYXJjaFJlc3VsdFwiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBzZWFyY2hSZXN1bHQ6IEdvb2RzLFxuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHBhcmVudFRhYjogJycsXG4gICAgICBnb29kczogW10sXG4gICAgICBrZXl3b3JkczogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDFcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc1NlYXJjaCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmtleXdvcmRzID09PSAnJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjbGVhcklucHV0ICgpIHtcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9ICcnXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMua2V5d29yZHMpXG4gICAgICB9LFxuICAgICAga2V5U2VhcmNoIChlKSB7XG4gICAgICAgIHRoaXMua2V5d29yZHMgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfSxcbiAgICAgIGRvU2VhcmNoICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTZWFyY2gpIHtcbiAgICAgICAgICB0aGlzLmdldFJlc3VsdCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50VGFiID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgIHVybDogJy4vY2F0ZWdvcnknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnZXRSZXN1bHQgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ3NlYXJjaCcpXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgc2VhcmNoOiBlbmNvZGVVUkkodGhpcy5rZXl3b3JkcyksXG4gICAgICAgIHRva2VuOiB0b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNlYXJjaEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBfdGhpcy5nb29kcy5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50VGFiID0gcGFyZW50LnBhZ2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==