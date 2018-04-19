'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigator = function (_wepy$component) {
  _inherits(Navigator, _wepy$component);

  function Navigator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Navigator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      usingComponents: {
        'wxc-flex': '../../packages/@minui/wxc-flex/dist/index'
      }
    }, _this.props = {
      navIndex: String
    }, _this.data = {
      cross: 'stretch',
      topnavigation: [{
        title: '首页',
        url: './main'
      }, {
        title: '热门',
        url: './hot'
      }, {
        title: '搜索',
        url: './search'
      }]
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Navigator;
}(_wepy2.default.component);

exports.default = Navigator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci5qcyJdLCJuYW1lcyI6WyJOYXZpZ2F0b3IiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJwcm9wcyIsIm5hdkluZGV4IiwiU3RyaW5nIiwiZGF0YSIsImNyb3NzIiwidG9wbmF2aWdhdGlvbiIsInRpdGxlIiwidXJsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsdUJBQWlCO0FBQ2Ysb0JBQVk7QUFERztBQURWLEssUUFLVEMsSyxHQUFRO0FBQ05DLGdCQUFVQztBQURKLEssUUFHUkMsSSxHQUFPO0FBQ0xDLGFBQU8sU0FERjtBQUVMQyxxQkFBZSxDQUFDO0FBQ2RDLGVBQU8sSUFETztBQUVkQyxhQUFLO0FBRlMsT0FBRCxFQUdaO0FBQ0RELGVBQU8sSUFETjtBQUVEQyxhQUFLO0FBRkosT0FIWSxFQU1aO0FBQ0RELGVBQU8sSUFETjtBQUVEQyxhQUFLO0FBRkosT0FOWTtBQUZWLEs7Ozs7RUFUOEIsZUFBS0MsUzs7a0JBQXZCWCxTIiwiZmlsZSI6Im5hdmlnYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdG9yIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgIHByb3BzID0ge1xuICAgICAgbmF2SW5kZXg6IFN0cmluZ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgY3Jvc3M6ICdzdHJldGNoJyxcbiAgICAgIHRvcG5hdmlnYXRpb246IFt7XG4gICAgICAgIHRpdGxlOiAn6aaW6aG1JyxcbiAgICAgICAgdXJsOiAnLi9tYWluJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+eDremXqCcsXG4gICAgICAgIHVybDogJy4vaG90J1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+aQnOe0oicsXG4gICAgICAgIHVybDogJy4vc2VhcmNoJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cbiJdfQ==