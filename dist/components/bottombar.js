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

var Bottombar = function (_wepy$component) {
  _inherits(Bottombar, _wepy$component);

  function Bottombar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bottombar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bottombar.__proto__ || Object.getPrototypeOf(Bottombar)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      cartVal: Number
    }, _this.computed = {
      cartMaxVal: function cartMaxVal() {
        if (this.cartVal >= 99) {
          return 99;
        } else {
          return this.cartVal;
        }
      }
    }, _this.methods = {
      addCart: function addCart() {
        this.$emit('cart');
      },
      buyTap: function buyTap() {
        this.$emit('buy');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bottombar, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Bottombar;
}(_wepy2.default.component);

exports.default = Bottombar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdHRvbWJhci5qcyJdLCJuYW1lcyI6WyJCb3R0b21iYXIiLCJwcm9wcyIsImNhcnRWYWwiLCJOdW1iZXIiLCJjb21wdXRlZCIsImNhcnRNYXhWYWwiLCJtZXRob2RzIiwiYWRkQ2FydCIsIiRlbWl0IiwiYnV5VGFwIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxlQUFTQztBQURILEssUUFHUkMsUSxHQUFXO0FBQ1RDLGdCQURTLHdCQUNLO0FBQ1osWUFBSSxLQUFLSCxPQUFMLElBQWdCLEVBQXBCLEVBQXdCO0FBQ3RCLGlCQUFPLEVBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFLQSxPQUFaO0FBQ0Q7QUFDRjtBQVBRLEssUUFTWEksTyxHQUFVO0FBQ1JDLGFBRFEscUJBQ0c7QUFDVCxhQUFLQyxLQUFMLENBQVcsTUFBWDtBQUNELE9BSE87QUFJUkMsWUFKUSxvQkFJRTtBQUNSLGFBQUtELEtBQUwsQ0FBVyxLQUFYO0FBQ0Q7QUFOTyxLOzs7Ozs2QkFRQTtBQUNSLFdBQUtFLE1BQUw7QUFDRDs7OztFQXZCb0MsZUFBS0MsUzs7a0JBQXZCWCxTIiwiZmlsZSI6ImJvdHRvbWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdHRvbWJhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGNhcnRWYWw6IE51bWJlclxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGNhcnRNYXhWYWwgKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJ0VmFsID49IDk5KSB7XG4gICAgICAgICAgcmV0dXJuIDk5XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFZhbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBhZGRDYXJ0ICgpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2FydCcpXG4gICAgICB9LFxuICAgICAgYnV5VGFwICgpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnYnV5JylcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==