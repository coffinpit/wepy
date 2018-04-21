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

var Counter = function (_wepy$component) {
  _inherits(Counter, _wepy$component);

  function Counter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Counter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Counter.__proto__ || Object.getPrototypeOf(Counter)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      num: {
        type: [Number, String],
        default: 1
      }
    }, _this.data = {}, _this.methods = {
      plusTap: function plusTap() {
        this.$emit('plusEdit');
      },
      minusTap: function minusTap() {
        this.$emit('minusEdit');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Counter;
}(_wepy2.default.component);

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInByb3BzIiwibnVtIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImRlZmF1bHQiLCJkYXRhIiwibWV0aG9kcyIsInBsdXNUYXAiLCIkZW1pdCIsIm1pbnVzVGFwIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxLLEdBQVE7QUFDTkMsV0FBSztBQUNIQyxjQUFNLENBQUNDLE1BQUQsRUFBU0MsTUFBVCxDQURIO0FBRUhDLGlCQUFTO0FBRk47QUFEQyxLLFFBT1JDLEksR0FBTyxFLFFBR1BDLE8sR0FBVTtBQUNSQyxhQURRLHFCQUNHO0FBQ1QsYUFBS0MsS0FBTCxDQUFXLFVBQVg7QUFDRCxPQUhPO0FBSVJDLGNBSlEsc0JBSUk7QUFDVixhQUFLRCxLQUFMLENBQVcsV0FBWDtBQUNEO0FBTk8sSzs7OztFQVh5QixlQUFLRSxTOztrQkFBckJaLE8iLCJmaWxlIjoiY291bnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIG51bToge1xuICAgICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgICBkZWZhdWx0OiAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgcGx1c1RhcCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3BsdXNFZGl0JylcbiAgICAgIH0sXG4gICAgICBtaW51c1RhcCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ21pbnVzRWRpdCcpXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=