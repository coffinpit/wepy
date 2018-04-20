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
        this.num = this.num + 1;
        console.log(this.$name + ' plus tap');
        this.$emit('plusEdit');
      },
      minusTap: function minusTap() {
        this.num = this.num - 1;
        if (this.num < 0) {
          this.num = 0;
        }
        console.log(this.$name + ' minus tap');
        this.$emit('minusEdit');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Counter;
}(_wepy2.default.component);

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInByb3BzIiwibnVtIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImRlZmF1bHQiLCJkYXRhIiwibWV0aG9kcyIsInBsdXNUYXAiLCJjb25zb2xlIiwibG9nIiwiJG5hbWUiLCIkZW1pdCIsIm1pbnVzVGFwIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxLLEdBQVE7QUFDTkMsV0FBSztBQUNIQyxjQUFNLENBQUNDLE1BQUQsRUFBU0MsTUFBVCxDQURIO0FBRUhDLGlCQUFTO0FBRk47QUFEQyxLLFFBT1JDLEksR0FBTyxFLFFBR1BDLE8sR0FBVTtBQUNSQyxhQURRLHFCQUNHO0FBQ1QsYUFBS1AsR0FBTCxHQUFXLEtBQUtBLEdBQUwsR0FBVyxDQUF0QjtBQUNBUSxnQkFBUUMsR0FBUixDQUFZLEtBQUtDLEtBQUwsR0FBYSxXQUF6QjtBQUNBLGFBQUtDLEtBQUwsQ0FBVyxVQUFYO0FBQ0QsT0FMTztBQU1SQyxjQU5RLHNCQU1JO0FBQ1YsYUFBS1osR0FBTCxHQUFXLEtBQUtBLEdBQUwsR0FBVyxDQUF0QjtBQUNBLFlBQUksS0FBS0EsR0FBTCxHQUFXLENBQWYsRUFBa0I7QUFDaEIsZUFBS0EsR0FBTCxHQUFXLENBQVg7QUFDRDtBQUNEUSxnQkFBUUMsR0FBUixDQUFZLEtBQUtDLEtBQUwsR0FBYSxZQUF6QjtBQUNBLGFBQUtDLEtBQUwsQ0FBVyxXQUFYO0FBQ0Q7QUFiTyxLOzs7O0VBWHlCLGVBQUtFLFM7O2tCQUFyQmYsTyIsImZpbGUiOiJjb3VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIFxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDb3VudGVyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIHByb3BzID0ge1xuICAgICAgbnVtOiB7XG4gICAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICAgIGRlZmF1bHQ6IDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBwbHVzVGFwICgpIHtcbiAgICAgICAgdGhpcy5udW0gPSB0aGlzLm51bSArIDFcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kbmFtZSArICcgcGx1cyB0YXAnKVxuICAgICAgICB0aGlzLiRlbWl0KCdwbHVzRWRpdCcpXG4gICAgICB9LFxuICAgICAgbWludXNUYXAgKCkge1xuICAgICAgICB0aGlzLm51bSA9IHRoaXMubnVtIC0gMVxuICAgICAgICBpZiAodGhpcy5udW0gPCAwKSB7XG4gICAgICAgICAgdGhpcy5udW0gPSAwXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kbmFtZSArICcgbWludXMgdGFwJylcbiAgICAgICAgdGhpcy4kZW1pdCgnbWludXNFZGl0JylcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==