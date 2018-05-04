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
        default: 1,
        twoWay: true
      },
      sourceId: {
        type: Number,
        default: null
      }
    }, _this.computed = {
      able: function able() {
        if (this.num <= 1) {
          return false;
        } else {
          return true;
        }
      },
      disable: function disable() {
        if (this.num >= this.maxCount) {
          return true;
        } else {
          return false;
        }
      }
    }, _this.data = {}, _this.methods = {
      plusTap: function plusTap(e) {
        this.disable = false;
        this.$emit('plusEdit', e);
      },
      minusTap: function minusTap(e) {
        this.$emit('minusEdit', e);
      },
      inputTap: function inputTap(e) {
        this.$emit('keyEdit', e.detail.value, e);
      },
      blurTap: function blurTap(e) {
        this.$emit('blurEdit', e.detail.value, e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Counter, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Counter;
}(_wepy2.default.component);

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInByb3BzIiwibnVtIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImRlZmF1bHQiLCJ0d29XYXkiLCJzb3VyY2VJZCIsImNvbXB1dGVkIiwiYWJsZSIsImRpc2FibGUiLCJtYXhDb3VudCIsImRhdGEiLCJtZXRob2RzIiwicGx1c1RhcCIsImUiLCIkZW1pdCIsIm1pbnVzVGFwIiwiaW5wdXRUYXAiLCJkZXRhaWwiLCJ2YWx1ZSIsImJsdXJUYXAiLCIkYXBwbHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSyxHQUFRO0FBQ05DLFdBQUs7QUFDSEMsY0FBTSxDQUFDQyxNQUFELEVBQVNDLE1BQVQsQ0FESDtBQUVIQyxpQkFBUyxDQUZOO0FBR0hDLGdCQUFRO0FBSEwsT0FEQztBQU1OQyxnQkFBVTtBQUNSTCxjQUFNQyxNQURFO0FBRVJFLGlCQUFTO0FBRkQ7QUFOSixLLFFBV1JHLFEsR0FBVztBQUNUQyxVQURTLGtCQUNEO0FBQ04sWUFBSSxLQUFLUixHQUFMLElBQVksQ0FBaEIsRUFBbUI7QUFDakIsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLElBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVFMsYUFSUyxxQkFRRTtBQUNULFlBQUksS0FBS1QsR0FBTCxJQUFZLEtBQUtVLFFBQXJCLEVBQStCO0FBQzdCLGlCQUFPLElBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRjtBQWRRLEssUUFnQlhDLEksR0FBTyxFLFFBRVBDLE8sR0FBVTtBQUNSQyxhQURRLG1CQUNDQyxDQURELEVBQ0k7QUFDVixhQUFLTCxPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUtNLEtBQUwsQ0FBVyxVQUFYLEVBQXVCRCxDQUF2QjtBQUNELE9BSk87QUFLUkUsY0FMUSxvQkFLRUYsQ0FMRixFQUtLO0FBQ1gsYUFBS0MsS0FBTCxDQUFXLFdBQVgsRUFBd0JELENBQXhCO0FBQ0QsT0FQTztBQVFSRyxjQVJRLG9CQVFFSCxDQVJGLEVBUUs7QUFDWCxhQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFzQkQsRUFBRUksTUFBRixDQUFTQyxLQUEvQixFQUFzQ0wsQ0FBdEM7QUFDRCxPQVZPO0FBV1JNLGFBWFEsbUJBV0FOLENBWEEsRUFXRztBQUNULGFBQUtDLEtBQUwsQ0FBVyxVQUFYLEVBQXVCRCxFQUFFSSxNQUFGLENBQVNDLEtBQWhDLEVBQXVDTCxDQUF2QztBQUNEO0FBYk8sSzs7Ozs7NkJBZUE7QUFDUixXQUFLTyxNQUFMO0FBQ0Q7Ozs7RUEvQ2tDLGVBQUtDLFM7O2tCQUFyQnhCLE8iLCJmaWxlIjoiY291bnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIG51bToge1xuICAgICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgICBkZWZhdWx0OiAxLFxuICAgICAgICB0d29XYXk6IHRydWVcbiAgICAgIH0sXG4gICAgICBzb3VyY2VJZDoge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgIH1cbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBhYmxlICgpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtIDw9IDEpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzYWJsZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLm51bSA+PSB0aGlzLm1heENvdW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgcGx1c1RhcCAoZSkge1xuICAgICAgICB0aGlzLmRpc2FibGUgPSBmYWxzZVxuICAgICAgICB0aGlzLiRlbWl0KCdwbHVzRWRpdCcsIGUpXG4gICAgICB9LFxuICAgICAgbWludXNUYXAgKGUpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnbWludXNFZGl0JywgZSlcbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdrZXlFZGl0JywgZS5kZXRhaWwudmFsdWUsIGUpXG4gICAgICB9LFxuICAgICAgYmx1clRhcChlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2JsdXJFZGl0JywgZS5kZXRhaWwudmFsdWUsIGUpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=