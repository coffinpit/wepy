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

    var _temp, _this, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '搜索'
    }, _this.$repeat = {}, _this.$props = { "searchResult": { "goodsItem.sync": "goods", "xmlns:v-on": "" }, "defect": {} }, _this.$events = { "searchResult": { "v-on:goodsTap": "goDetail" } }, _this.components = {
      searchResult: _goods2.default,
      defect: _defect2.default
    }, _this.data = {
      parentTab: '',
      goods: [],
      search: '',
      pageSize: 5,
      pageNum: 1
    }, _this.computed = {
      isSearch: function isSearch() {
        if (this.search === '') {
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
    }, _this.methods = {
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      },
      keySearch: function keySearch(e) {
        this.search = e.detail.value;
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Search, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'getResult',
    value: function getResult() {
      var token = this.$parent.getToken('search');
      var data = {
        token: token,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        search: this.search
      };
      console.log(token);
      console.log(data);
      this.$parent.HttpRequest.SearchHttp(data).then(function (res) {
        console.log(res);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2VhcmNoUmVzdWx0IiwiZGVmZWN0IiwiZGF0YSIsInBhcmVudFRhYiIsImdvb2RzIiwic2VhcmNoIiwicGFnZVNpemUiLCJwYWdlTnVtIiwiY29tcHV0ZWQiLCJpc1NlYXJjaCIsImlzTnVsbCIsImxlbmd0aCIsIm1ldGhvZHMiLCJnb0RldGFpbCIsImlkIiwibmF2aWdhdGVUbyIsInVybCIsImtleVNlYXJjaCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImRvU2VhcmNoIiwiZ2V0UmVzdWx0Iiwic3dpdGNoVGFiIiwidG9rZW4iLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJjb25zb2xlIiwibG9nIiwiSHR0cFJlcXVlc3QiLCJTZWFyY2hIdHRwIiwidGhlbiIsInJlcyIsInBhcmVudCIsInBhZ2UiLCIkYXBwbHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGtCQUFpQixPQUFsQixFQUEwQixjQUFhLEVBQXZDLEVBQWhCLEVBQTJELFVBQVMsRUFBcEUsRSxRQUNUQyxPLEdBQVUsRUFBQyxnQkFBZSxFQUFDLGlCQUFnQixVQUFqQixFQUFoQixFLFFBQ1RDLFUsR0FBYTtBQUNSQyxtQ0FEUTtBQUVSQztBQUZRLEssUUFJVkMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsYUFBTyxFQUZGO0FBR0xDLGNBQVEsRUFISDtBQUlMQyxnQkFBVSxDQUpMO0FBS0xDLGVBQVM7QUFMSixLLFFBU1BDLFEsR0FBVztBQUNUQyxjQURTLHNCQUNHO0FBQ1YsWUFBSSxLQUFLSixNQUFMLEtBQWdCLEVBQXBCLEVBQXdCO0FBQ3RCLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQVBRO0FBUVRLLFlBUlMsb0JBUUM7QUFDUixZQUFJLEtBQUtOLEtBQUwsQ0FBV08sTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUMzQixpQkFBTyxLQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFkUSxLLFFBZ0JYQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDRUMsRUFERixFQUNNO0FBQ1osdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSyxpQkFBaUJGO0FBRFIsU0FBaEI7QUFHRCxPQUxPO0FBTVJHLGVBTlEscUJBTUdDLENBTkgsRUFNTTtBQUNaLGFBQUtiLE1BQUwsR0FBY2EsRUFBRUMsTUFBRixDQUFTQyxLQUF2QjtBQUNELE9BUk87QUFTUkMsY0FUUSxzQkFTSTtBQUNWLFlBQUksS0FBS1osUUFBVCxFQUFtQjtBQUNqQixlQUFLYSxTQUFMO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBSSxLQUFLbkIsU0FBTCxLQUFtQixVQUF2QixFQUFtQztBQUNqQywyQkFBS29CLFNBQUwsQ0FBZTtBQUNiUCxtQkFBSztBQURRLGFBQWY7QUFHRCxXQUpELE1BSU87QUFDTCwyQkFBS08sU0FBTCxDQUFlO0FBQ2JQLG1CQUFLO0FBRFEsYUFBZjtBQUdEO0FBQ0Y7QUFDRjtBQXZCTyxLOzs7Ozs2QkFsQkEsQ0FDVDs7O2dDQTBDWTtBQUNYLFVBQU1RLFFBQVEsS0FBS0MsT0FBTCxDQUFhQyxRQUFiLENBQXNCLFFBQXRCLENBQWQ7QUFDQSxVQUFJeEIsT0FBTztBQUNUc0IsZUFBT0EsS0FERTtBQUVUbEIsa0JBQVUsS0FBS0EsUUFGTjtBQUdUQyxpQkFBUyxLQUFLQSxPQUhMO0FBSVRGLGdCQUFRLEtBQUtBO0FBSkosT0FBWDtBQU1Bc0IsY0FBUUMsR0FBUixDQUFZSixLQUFaO0FBQ0FHLGNBQVFDLEdBQVIsQ0FBWTFCLElBQVo7QUFDQSxXQUFLdUIsT0FBTCxDQUFhSSxXQUFiLENBQXlCQyxVQUF6QixDQUFvQzVCLElBQXBDLEVBQTBDNkIsSUFBMUMsQ0FBK0MsVUFBQ0MsR0FBRCxFQUFTO0FBQ3RETCxnQkFBUUMsR0FBUixDQUFZSSxHQUFaO0FBQ0QsT0FGRDtBQUdEOzs7MkJBQ09DLE0sRUFBUTtBQUNkLFdBQUs5QixTQUFMLEdBQWlCOEIsT0FBT0MsSUFBeEI7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUE5RWlDLGVBQUtELEk7O2tCQUFwQnpDLE0iLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aQnOe0oidcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInNlYXJjaFJlc3VsdFwiOntcImdvb2RzSXRlbS5zeW5jXCI6XCJnb29kc1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiZGVmZWN0XCI6e319O1xyXG4kZXZlbnRzID0ge1wic2VhcmNoUmVzdWx0XCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHNlYXJjaFJlc3VsdDogR29vZHMsXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgcGFyZW50VGFiOiAnJyxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIHNlYXJjaDogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDFcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc1NlYXJjaCAoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaCA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAga2V5U2VhcmNoIChlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICBkb1NlYXJjaCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2VhcmNoKSB7XG4gICAgICAgICAgdGhpcy5nZXRSZXN1bHQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnBhcmVudFRhYiA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0UmVzdWx0ICgpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdzZWFyY2gnKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bSxcbiAgICAgICAgc2VhcmNoOiB0aGlzLnNlYXJjaFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2codG9rZW4pXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNlYXJjaEh0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAocGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudFRhYiA9IHBhcmVudC5wYWdlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=