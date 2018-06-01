'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_wepy$component) {
  _inherits(Search, _wepy$component);

  function Search() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.props = {}, _this.data = {
      fullMenu: false
    }, _this.methods = {
      showMenu: function showMenu() {
        this.fullMenu = !this.fullMenu;
      },
      goIndex: function goIndex() {
        this.$parent.pageRoot = false;
        _wepy2.default.switchTab({
          url: './index'
        });
      },
      goCategory: function goCategory() {
        this.$parent.pageRoot = false;
        _wepy2.default.switchTab({
          url: './category'
        });
      },
      goCate: function goCate() {
        this.$parent.pageRoot = false;
        _wepy2.default.switchTab({
          url: './cart'
        });
      },
      goUser: function goUser() {
        this.$parent.pageRoot = false;
        _wepy2.default.switchTab({
          url: './user'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Search, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Search;
}(_wepy2.default.component);

exports.default = Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiXSwibmFtZXMiOlsiU2VhcmNoIiwicHJvcHMiLCJkYXRhIiwiZnVsbE1lbnUiLCJtZXRob2RzIiwic2hvd01lbnUiLCJnb0luZGV4IiwiJHBhcmVudCIsInBhZ2VSb290Iiwic3dpdGNoVGFiIiwidXJsIiwiZ29DYXRlZ29yeSIsImdvQ2F0ZSIsImdvVXNlciIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxLLEdBQVEsRSxRQUVSQyxJLEdBQU87QUFDTEMsZ0JBQVU7QUFETCxLLFFBR1BDLE8sR0FBVTtBQUNSQyxjQURRLHNCQUNJO0FBQ1YsYUFBS0YsUUFBTCxHQUFnQixDQUFDLEtBQUtBLFFBQXRCO0FBQ0QsT0FITztBQUlSRyxhQUpRLHFCQUlHO0FBQ1QsYUFBS0MsT0FBTCxDQUFhQyxRQUFiLEdBQXdCLEtBQXhCO0FBQ0EsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdELE9BVE87QUFVUkMsZ0JBVlEsd0JBVU07QUFDWixhQUFLSixPQUFMLENBQWFDLFFBQWIsR0FBd0IsS0FBeEI7QUFDQSx1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGVBQUs7QUFEUSxTQUFmO0FBR0QsT0FmTztBQWdCUkUsWUFoQlEsb0JBZ0JFO0FBQ1IsYUFBS0wsT0FBTCxDQUFhQyxRQUFiLEdBQXdCLEtBQXhCO0FBQ0EsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdELE9BckJPO0FBc0JSRyxZQXRCUSxvQkFzQkU7QUFDUixhQUFLTixPQUFMLENBQWFDLFFBQWIsR0FBd0IsS0FBeEI7QUFDQSx1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGVBQUs7QUFEUSxTQUFmO0FBR0Q7QUEzQk8sSzs7Ozs7NkJBNkJBO0FBQ1IsV0FBS0ksTUFBTDtBQUNEOzs7O0VBckNpQyxlQUFLQyxTOztrQkFBcEJmLE0iLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIHByb3BzID0ge1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZnVsbE1lbnU6IGZhbHNlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBzaG93TWVudSAoKSB7XG4gICAgICAgIHRoaXMuZnVsbE1lbnUgPSAhdGhpcy5mdWxsTWVudVxuICAgICAgfSxcbiAgICAgIGdvSW5kZXggKCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSBmYWxzZVxuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0NhdGVnb3J5ICgpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2F0ZWdvcnknXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DYXRlICgpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnBhZ2VSb290ID0gZmFsc2VcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VzZXIgKCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQucGFnZVJvb3QgPSBmYWxzZVxuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi91c2VyJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19