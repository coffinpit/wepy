'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _navigator = require('./../components/navigator.js');

var _navigator2 = _interopRequireDefault(_navigator);

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
    }, _this.$repeat = {}, _this.$props = { "nav": { "navIndex": "2" } }, _this.$events = {}, _this.components = {
      nav: _navigator2.default
    }, _this.data = {
      userInfo: {}
    }, _this.methods = {
      goBack: function goBack() {
        var pageList = this.getCurrentPages();
        var prePage = pageList[pageList.length - 2];
        prePage.setData({
          page: 'search'
        });
        _wepy2.default.navigateBack({
          delta: 1
        });
      },
      getCurrentId: function getCurrentId(e) {
        console.log(e.currentTarget.dataset.id);
        this.userInfo = this.$parent.globalData.userInfo;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Search, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onload',
    value: function onload() {
      this.$apply();
    }
  }]);

  return Search;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Search , 'pages/search'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibmF2IiwiZGF0YSIsInVzZXJJbmZvIiwibWV0aG9kcyIsImdvQmFjayIsInBhZ2VMaXN0IiwiZ2V0Q3VycmVudFBhZ2VzIiwicHJlUGFnZSIsImxlbmd0aCIsInNldERhdGEiLCJwYWdlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJnZXRDdXJyZW50SWQiLCJlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIiRhcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxPQUFNLEVBQUMsWUFBVyxHQUFaLEVBQVAsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFFBR1ZDLEksR0FBTztBQUNMQyxnQkFBVTtBQURMLEssUUFNUEMsTyxHQUFVO0FBQ1JDLFlBRFEsb0JBQ0U7QUFDUixZQUFJQyxXQUFXLEtBQUtDLGVBQUwsRUFBZjtBQUNBLFlBQUlDLFVBQVVGLFNBQVNBLFNBQVNHLE1BQVQsR0FBa0IsQ0FBM0IsQ0FBZDtBQUNBRCxnQkFBUUUsT0FBUixDQUFnQjtBQUNkQyxnQkFBTTtBQURRLFNBQWhCO0FBR0EsdUJBQUtDLFlBQUwsQ0FBa0I7QUFDaEJDLGlCQUFPO0FBRFMsU0FBbEI7QUFHRCxPQVZPO0FBV1JDLGtCQVhRLHdCQVdNQyxDQVhOLEVBV1M7QUFDZkMsZ0JBQVFDLEdBQVIsQ0FBWUYsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXBDO0FBQ0EsYUFBS2pCLFFBQUwsR0FBZ0IsS0FBS2tCLE9BQUwsQ0FBYUMsVUFBYixDQUF3Qm5CLFFBQXhDO0FBQ0Q7QUFkTyxLOzs7Ozs2QkFIQSxDQUVUOzs7NkJBaUJTO0FBQ1IsV0FBS29CLE1BQUw7QUFDRDs7OztFQWxDaUMsZUFBS1osSTs7a0JBQXBCakIsTSIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE5hdiBmcm9tICcuLi9jb21wb25lbnRzL25hdmlnYXRvcidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJuYXZcIjp7XCJuYXZJbmRleFwiOlwiMlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBuYXY6IE5hdlxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdXNlckluZm86IHt9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG5cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvQmFjayAoKSB7XG4gICAgICAgIGxldCBwYWdlTGlzdCA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VzKClcbiAgICAgICAgbGV0IHByZVBhZ2UgPSBwYWdlTGlzdFtwYWdlTGlzdC5sZW5ndGggLSAyXVxuICAgICAgICBwcmVQYWdlLnNldERhdGEoe1xuICAgICAgICAgIHBhZ2U6ICdzZWFyY2gnXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICBkZWx0YTogMVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdldEN1cnJlbnRJZCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZClcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICB9XG4gICAgfVxuICAgIG9ubG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=