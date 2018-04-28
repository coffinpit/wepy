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

var Goods = function (_wepy$component) {
  _inherits(Goods, _wepy$component);

  function Goods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Goods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Goods.__proto__ || Object.getPrototypeOf(Goods)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      goodsItem: Array
    }, _this.methods = {
      tap: function tap(id) {
        this.$emit('goodsTap', id);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Goods, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log(this.goodsItem);
      this.$apply();
    }
  }]);

  return Goods;
}(_wepy2.default.component);

exports.default = Goods;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzLmpzIl0sIm5hbWVzIjpbIkdvb2RzIiwicHJvcHMiLCJnb29kc0l0ZW0iLCJBcnJheSIsIm1ldGhvZHMiLCJ0YXAiLCJpZCIsIiRlbWl0IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVdDO0FBREwsSyxRQUdSQyxPLEdBQVU7QUFDUkMsU0FEUSxlQUNIQyxFQURHLEVBQ0M7QUFDUCxhQUFLQyxLQUFMLENBQVcsVUFBWCxFQUF1QkQsRUFBdkI7QUFDRDtBQUhPLEs7Ozs7OzZCQUtBO0FBQ1JFLGNBQVFDLEdBQVIsQ0FBWSxLQUFLUCxTQUFqQjtBQUNBLFdBQUtRLE1BQUw7QUFDRDs7OztFQVpnQyxlQUFLQyxTOztrQkFBbkJYLEsiLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBHb29kcyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGdvb2RzSXRlbTogQXJyYXlcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRhcCAoaWQpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnZ29vZHNUYXAnLCBpZClcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ29vZHNJdGVtKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19