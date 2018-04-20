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

var Bottombar = function (_wepy$component) {
  _inherits(Bottombar, _wepy$component);

  function Bottombar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bottombar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bottombar.__proto__ || Object.getPrototypeOf(Bottombar)).call.apply(_ref, [this].concat(args))), _this), _this.methods = {
      addCart: function addCart() {
        this.$emit('cart');
      },
      buyTap: function buyTap() {
        this.$emit('buy');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Bottombar;
}(_wepy2.default.component);

exports.default = Bottombar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdHRvbWJhci5qcyJdLCJuYW1lcyI6WyJCb3R0b21iYXIiLCJtZXRob2RzIiwiYWRkQ2FydCIsIiRlbWl0IiwiYnV5VGFwIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxPLEdBQVU7QUFDUkMsYUFEUSxxQkFDRztBQUNULGFBQUtDLEtBQUwsQ0FBVyxNQUFYO0FBQ0QsT0FITztBQUlSQyxZQUpRLG9CQUlFO0FBQ1IsYUFBS0QsS0FBTCxDQUFXLEtBQVg7QUFDRDtBQU5PLEs7Ozs7RUFEMkIsZUFBS0UsUzs7a0JBQXZCTCxTIiwiZmlsZSI6ImJvdHRvbWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdHRvbWJhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgYWRkQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NhcnQnKVxuICAgICAgfSxcbiAgICAgIGJ1eVRhcCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2J1eScpXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=