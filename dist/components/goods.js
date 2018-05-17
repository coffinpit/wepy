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
      tap: function tap(id, type) {
        this.$emit('goodsTap', id, type);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzLmpzIl0sIm5hbWVzIjpbIkdvb2RzIiwicHJvcHMiLCJnb29kc0l0ZW0iLCJBcnJheSIsIm1ldGhvZHMiLCJ0YXAiLCJpZCIsInR5cGUiLCIkZW1pdCIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXQztBQURMLEssUUFHUkMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsRUFERyxFQUNDQyxJQURELEVBQ087QUFDYixhQUFLQyxLQUFMLENBQVcsVUFBWCxFQUF1QkYsRUFBdkIsRUFBMkJDLElBQTNCO0FBQ0Q7QUFITyxLOzs7Ozs2QkFLQTtBQUNSRSxjQUFRQyxHQUFSLENBQVksS0FBS1IsU0FBakI7QUFDQSxXQUFLUyxNQUFMO0FBQ0Q7Ozs7RUFaZ0MsZUFBS0MsUzs7a0JBQW5CWixLIiwiZmlsZSI6Imdvb2RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29vZHMgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBnb29kc0l0ZW06IEFycmF5XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0YXAgKGlkLCB0eXBlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2dvb2RzVGFwJywgaWQsIHR5cGUpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdvb2RzSXRlbSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==