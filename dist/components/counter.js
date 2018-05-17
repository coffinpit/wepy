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
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    }, _this.computed = {
      isAble: function isAble() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInByb3BzIiwibnVtIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImRlZmF1bHQiLCJ0d29XYXkiLCJzb3VyY2VJZCIsImlzRGlzYWJsZWQiLCJCb29sZWFuIiwiY29tcHV0ZWQiLCJpc0FibGUiLCJkaXNhYmxlIiwibWF4Q291bnQiLCJkYXRhIiwibWV0aG9kcyIsInBsdXNUYXAiLCJlIiwiJGVtaXQiLCJtaW51c1RhcCIsImlucHV0VGFwIiwiZGV0YWlsIiwidmFsdWUiLCJibHVyVGFwIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEssR0FBUTtBQUNOQyxXQUFLO0FBQ0hDLGNBQU0sQ0FBQ0MsTUFBRCxFQUFTQyxNQUFULENBREg7QUFFSEMsaUJBQVMsQ0FGTjtBQUdIQyxnQkFBUTtBQUhMLE9BREM7QUFNTkMsZ0JBQVU7QUFDUkwsY0FBTUMsTUFERTtBQUVSRSxpQkFBUztBQUZELE9BTko7QUFVTkcsa0JBQVk7QUFDVk4sY0FBTU8sT0FESTtBQUVWSixpQkFBUztBQUZDO0FBVk4sSyxRQWVSSyxRLEdBQVc7QUFDVEMsWUFEUyxvQkFDQztBQUNSLFlBQUksS0FBS1YsR0FBTCxJQUFZLENBQWhCLEVBQW1CO0FBQ2pCLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQVBRO0FBUVRXLGFBUlMscUJBUUU7QUFDVCxZQUFJLEtBQUtYLEdBQUwsSUFBWSxLQUFLWSxRQUFyQixFQUErQjtBQUM3QixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFkUSxLLFFBZ0JYQyxJLEdBQU8sRSxRQUVQQyxPLEdBQVU7QUFDUkMsYUFEUSxtQkFDQ0MsQ0FERCxFQUNJO0FBQ1YsYUFBS0wsT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFLTSxLQUFMLENBQVcsVUFBWCxFQUF1QkQsQ0FBdkI7QUFDRCxPQUpPO0FBS1JFLGNBTFEsb0JBS0VGLENBTEYsRUFLSztBQUNYLGFBQUtDLEtBQUwsQ0FBVyxXQUFYLEVBQXdCRCxDQUF4QjtBQUNELE9BUE87QUFRUkcsY0FSUSxvQkFRRUgsQ0FSRixFQVFLO0FBQ1gsYUFBS0MsS0FBTCxDQUFXLFNBQVgsRUFBc0JELEVBQUVJLE1BQUYsQ0FBU0MsS0FBL0IsRUFBc0NMLENBQXRDO0FBQ0QsT0FWTztBQVdSTSxhQVhRLG1CQVdBTixDQVhBLEVBV0c7QUFDVCxhQUFLQyxLQUFMLENBQVcsVUFBWCxFQUF1QkQsRUFBRUksTUFBRixDQUFTQyxLQUFoQyxFQUF1Q0wsQ0FBdkM7QUFDRDtBQWJPLEs7Ozs7OzZCQWVBO0FBQ1IsV0FBS08sTUFBTDtBQUNEOzs7O0VBbkRrQyxlQUFLQyxTOztrQkFBckIxQixPIiwiZmlsZSI6ImNvdW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBudW06IHtcbiAgICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgICAgZGVmYXVsdDogMSxcbiAgICAgICAgdHdvV2F5OiB0cnVlXG4gICAgICB9LFxuICAgICAgc291cmNlSWQ6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICB9LFxuICAgICAgaXNEaXNhYmxlZDoge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzQWJsZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLm51bSA8PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpc2FibGUgKCkge1xuICAgICAgICBpZiAodGhpcy5udW0gPj0gdGhpcy5tYXhDb3VudCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHBsdXNUYXAgKGUpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlID0gZmFsc2VcbiAgICAgICAgdGhpcy4kZW1pdCgncGx1c0VkaXQnLCBlKVxuICAgICAgfSxcbiAgICAgIG1pbnVzVGFwIChlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ21pbnVzRWRpdCcsIGUpXG4gICAgICB9LFxuICAgICAgaW5wdXRUYXAgKGUpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgna2V5RWRpdCcsIGUuZGV0YWlsLnZhbHVlLCBlKVxuICAgICAgfSxcbiAgICAgIGJsdXJUYXAoZSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdibHVyRWRpdCcsIGUuZGV0YWlsLnZhbHVlLCBlKVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19