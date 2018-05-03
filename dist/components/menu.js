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
        _wepy2.default.switchTab({
          url: './index'
        });
      },
      goCategory: function goCategory() {
        _wepy2.default.switchTab({
          url: './category'
        });
      },
      goUser: function goUser() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiXSwibmFtZXMiOlsiU2VhcmNoIiwicHJvcHMiLCJkYXRhIiwiZnVsbE1lbnUiLCJtZXRob2RzIiwic2hvd01lbnUiLCJnb0luZGV4Iiwic3dpdGNoVGFiIiwidXJsIiwiZ29DYXRlZ29yeSIsImdvVXNlciIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxLLEdBQVEsRSxRQUVSQyxJLEdBQU87QUFDTEMsZ0JBQVU7QUFETCxLLFFBR1BDLE8sR0FBVTtBQUNSQyxjQURRLHNCQUNJO0FBQ1YsYUFBS0YsUUFBTCxHQUFnQixDQUFDLEtBQUtBLFFBQXRCO0FBQ0QsT0FITztBQUlSRyxhQUpRLHFCQUlHO0FBQ1QsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdELE9BUk87QUFTUkMsZ0JBVFEsd0JBU007QUFDWix1QkFBS0YsU0FBTCxDQUFlO0FBQ2JDLGVBQUs7QUFEUSxTQUFmO0FBR0QsT0FiTztBQWNSRSxZQWRRLG9CQWNFO0FBQ1IsdUJBQUtILFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdEO0FBbEJPLEs7Ozs7OzZCQW9CQTtBQUNSLFdBQUtHLE1BQUw7QUFDRDs7OztFQTVCaUMsZUFBS0MsUzs7a0JBQXBCWixNIiwiZmlsZSI6Im1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGZ1bGxNZW51OiBmYWxzZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgc2hvd01lbnUgKCkge1xuICAgICAgICB0aGlzLmZ1bGxNZW51ID0gIXRoaXMuZnVsbE1lbnVcbiAgICAgIH0sXG4gICAgICBnb0luZGV4ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVXNlciAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL3VzZXInXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=