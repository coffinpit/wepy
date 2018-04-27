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
    }, _this.data = {
      isTemp: false,
      autoFocus: false
    }, _this.methods = {
      hiddenTap: function hiddenTap() {
        this.isTemp = false;
        this.autoFocus = true;
      },
      plusTap: function plusTap() {
        this.disable = false;
        this.isTemp = false;
        this.$emit('plusEdit');
      },
      minusTap: function minusTap() {
        this.isTemp = false;
        this.$emit('minusEdit');
      },
      inputTap: function inputTap(e) {
        this.isTemp = false;
        this.$emit('keyEdit', e.detail.value);
      },
      blurTap: function blurTap(e) {
        if (e.detail.value === '') {
          this.isTemp = true;
          this.autoFocus = false;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInByb3BzIiwibnVtIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImRlZmF1bHQiLCJ0d29XYXkiLCJjb21wdXRlZCIsImFibGUiLCJkaXNhYmxlIiwibWF4Q291bnQiLCJkYXRhIiwiaXNUZW1wIiwiYXV0b0ZvY3VzIiwibWV0aG9kcyIsImhpZGRlblRhcCIsInBsdXNUYXAiLCIkZW1pdCIsIm1pbnVzVGFwIiwiaW5wdXRUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJibHVyVGFwIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEssR0FBUTtBQUNOQyxXQUFLO0FBQ0hDLGNBQU0sQ0FBQ0MsTUFBRCxFQUFTQyxNQUFULENBREg7QUFFSEMsaUJBQVMsQ0FGTjtBQUdIQyxnQkFBUTtBQUhMO0FBREMsSyxRQU9SQyxRLEdBQVc7QUFDVEMsVUFEUyxrQkFDRDtBQUNOLFlBQUksS0FBS1AsR0FBTCxJQUFZLENBQWhCLEVBQW1CO0FBQ2pCLGlCQUFPLEtBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQVBRO0FBUVRRLGFBUlMscUJBUUU7QUFDVCxZQUFJLEtBQUtSLEdBQUwsSUFBWSxLQUFLUyxRQUFyQixFQUErQjtBQUM3QixpQkFBTyxJQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFkUSxLLFFBZ0JYQyxJLEdBQU87QUFDTEMsY0FBUSxLQURIO0FBRUxDLGlCQUFXO0FBRk4sSyxRQUlQQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUNYLGFBQUtILE1BQUwsR0FBYyxLQUFkO0FBQ0EsYUFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNELE9BSk87QUFLUkcsYUFMUSxxQkFLRztBQUNULGFBQUtQLE9BQUwsR0FBZSxLQUFmO0FBQ0EsYUFBS0csTUFBTCxHQUFjLEtBQWQ7QUFDQSxhQUFLSyxLQUFMLENBQVcsVUFBWDtBQUNELE9BVE87QUFVUkMsY0FWUSxzQkFVSTtBQUNWLGFBQUtOLE1BQUwsR0FBYyxLQUFkO0FBQ0EsYUFBS0ssS0FBTCxDQUFXLFdBQVg7QUFDRCxPQWJPO0FBY1JFLGNBZFEsb0JBY0VDLENBZEYsRUFjSztBQUNYLGFBQUtSLE1BQUwsR0FBYyxLQUFkO0FBQ0EsYUFBS0ssS0FBTCxDQUFXLFNBQVgsRUFBc0JHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBL0I7QUFDRCxPQWpCTztBQWtCUkMsYUFsQlEsbUJBa0JBSCxDQWxCQSxFQWtCRztBQUNULFlBQUlBLEVBQUVDLE1BQUYsQ0FBU0MsS0FBVCxLQUFtQixFQUF2QixFQUEyQjtBQUN6QixlQUFLVixNQUFMLEdBQWMsSUFBZDtBQUNBLGVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDRDtBQUNELGFBQUtJLEtBQUwsQ0FBVyxVQUFYLEVBQXVCRyxFQUFFQyxNQUFGLENBQVNDLEtBQWhDO0FBQ0Q7QUF4Qk8sSzs7Ozs7NkJBMEJBO0FBQ1IsV0FBS0UsTUFBTDtBQUNEOzs7O0VBeERrQyxlQUFLQyxTOztrQkFBckIxQixPIiwiZmlsZSI6ImNvdW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBudW06IHtcbiAgICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgICAgZGVmYXVsdDogMSxcbiAgICAgICAgdHdvV2F5OiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgYWJsZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLm51bSA8PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpc2FibGUgKCkge1xuICAgICAgICBpZiAodGhpcy5udW0gPj0gdGhpcy5tYXhDb3VudCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGlzVGVtcDogZmFsc2UsXG4gICAgICBhdXRvRm9jdXM6IGZhbHNlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBoaWRkZW5UYXAgKCkge1xuICAgICAgICB0aGlzLmlzVGVtcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuYXV0b0ZvY3VzID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIHBsdXNUYXAgKCkge1xuICAgICAgICB0aGlzLmRpc2FibGUgPSBmYWxzZVxuICAgICAgICB0aGlzLmlzVGVtcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGVtaXQoJ3BsdXNFZGl0JylcbiAgICAgIH0sXG4gICAgICBtaW51c1RhcCAoKSB7XG4gICAgICAgIHRoaXMuaXNUZW1wID0gZmFsc2VcbiAgICAgICAgdGhpcy4kZW1pdCgnbWludXNFZGl0JylcbiAgICAgIH0sXG4gICAgICBpbnB1dFRhcCAoZSkge1xuICAgICAgICB0aGlzLmlzVGVtcCA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGVtaXQoJ2tleUVkaXQnLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgIH0sXG4gICAgICBibHVyVGFwKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLnZhbHVlID09PSAnJykge1xuICAgICAgICAgIHRoaXMuaXNUZW1wID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuYXV0b0ZvY3VzID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRlbWl0KCdibHVyRWRpdCcsIGUuZGV0YWlsLnZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19