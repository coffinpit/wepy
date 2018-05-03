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
      sourceId: Number
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
        this.$emit('keyEdit', e.detail.value);
      },
      blurTap: function blurTap(e) {
        this.$emit('blurEdit', e.detail.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInByb3BzIiwibnVtIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImRlZmF1bHQiLCJ0d29XYXkiLCJzb3VyY2VJZCIsImNvbXB1dGVkIiwiYWJsZSIsImRpc2FibGUiLCJtYXhDb3VudCIsImRhdGEiLCJtZXRob2RzIiwicGx1c1RhcCIsImUiLCIkZW1pdCIsIm1pbnVzVGFwIiwiaW5wdXRUYXAiLCJkZXRhaWwiLCJ2YWx1ZSIsImJsdXJUYXAiLCIkYXBwbHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSyxHQUFRO0FBQ05DLFdBQUs7QUFDSEMsY0FBTSxDQUFDQyxNQUFELEVBQVNDLE1BQVQsQ0FESDtBQUVIQyxpQkFBUyxDQUZOO0FBR0hDLGdCQUFRO0FBSEwsT0FEQztBQU1OQyxnQkFBVUo7QUFOSixLLFFBUVJLLFEsR0FBVztBQUNUQyxVQURTLGtCQUNEO0FBQ04sWUFBSSxLQUFLUixHQUFMLElBQVksQ0FBaEIsRUFBbUI7QUFDakIsaUJBQU8sS0FBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLElBQVA7QUFDRDtBQUNGLE9BUFE7QUFRVFMsYUFSUyxxQkFRRTtBQUNULFlBQUksS0FBS1QsR0FBTCxJQUFZLEtBQUtVLFFBQXJCLEVBQStCO0FBQzdCLGlCQUFPLElBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRjtBQWRRLEssUUFnQlhDLEksR0FBTyxFLFFBRVBDLE8sR0FBVTtBQUNSQyxhQURRLG1CQUNDQyxDQURELEVBQ0k7QUFDVixhQUFLTCxPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUtNLEtBQUwsQ0FBVyxVQUFYLEVBQXVCRCxDQUF2QjtBQUNELE9BSk87QUFLUkUsY0FMUSxvQkFLRUYsQ0FMRixFQUtLO0FBQ1gsYUFBS0MsS0FBTCxDQUFXLFdBQVgsRUFBd0JELENBQXhCO0FBQ0QsT0FQTztBQVFSRyxjQVJRLG9CQVFFSCxDQVJGLEVBUUs7QUFDWCxhQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFzQkQsRUFBRUksTUFBRixDQUFTQyxLQUEvQjtBQUNELE9BVk87QUFXUkMsYUFYUSxtQkFXQU4sQ0FYQSxFQVdHO0FBQ1QsYUFBS0MsS0FBTCxDQUFXLFVBQVgsRUFBdUJELEVBQUVJLE1BQUYsQ0FBU0MsS0FBaEM7QUFDRDtBQWJPLEs7Ozs7OzZCQWVBO0FBQ1IsV0FBS0UsTUFBTDtBQUNEOzs7O0VBNUNrQyxlQUFLQyxTOztrQkFBckJ4QixPIiwiZmlsZSI6ImNvdW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBudW06IHtcbiAgICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgICAgZGVmYXVsdDogMSxcbiAgICAgICAgdHdvV2F5OiB0cnVlXG4gICAgICB9LFxuICAgICAgc291cmNlSWQ6IE51bWJlclxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGFibGUgKCkge1xuICAgICAgICBpZiAodGhpcy5udW0gPD0gMSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkaXNhYmxlICgpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtID49IHRoaXMubWF4Q291bnQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBwbHVzVGFwIChlKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGVtaXQoJ3BsdXNFZGl0JywgZSlcbiAgICAgIH0sXG4gICAgICBtaW51c1RhcCAoZSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdtaW51c0VkaXQnLCBlKVxuICAgICAgfSxcbiAgICAgIGlucHV0VGFwIChlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2tleUVkaXQnLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgIH0sXG4gICAgICBibHVyVGFwKGUpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnYmx1ckVkaXQnLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==