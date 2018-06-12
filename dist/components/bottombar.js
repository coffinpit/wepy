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
      cartVal: Number,
      messagePath: String
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
        this.$emit('cart', 'addCart');
      },
      buyTap: function buyTap() {
        this.$emit('buy', 'addBuy');
      },
      goCart: function goCart() {
        _wepy2.default.switchTab({
          url: './cart'
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdHRvbWJhci5qcyJdLCJuYW1lcyI6WyJCb3R0b21iYXIiLCJwcm9wcyIsImNhcnRWYWwiLCJOdW1iZXIiLCJtZXNzYWdlUGF0aCIsIlN0cmluZyIsImNvbXB1dGVkIiwiY2FydE1heFZhbCIsIm1ldGhvZHMiLCJhZGRDYXJ0IiwiJGVtaXQiLCJidXlUYXAiLCJnb0NhcnQiLCJzd2l0Y2hUYWIiLCJ1cmwiLCIkYXBwbHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLGVBQVNDLE1BREg7QUFFTkMsbUJBQWFDO0FBRlAsSyxRQUlSQyxRLEdBQVc7QUFDVEMsZ0JBRFMsd0JBQ0s7QUFDWixZQUFJLEtBQUtMLE9BQUwsSUFBZ0IsRUFBcEIsRUFBd0I7QUFDdEIsaUJBQU8sRUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLEtBQUtBLE9BQVo7QUFDRDtBQUNGO0FBUFEsSyxRQVNYTSxPLEdBQVU7QUFDUkMsYUFEUSxxQkFDRztBQUNULGFBQUtDLEtBQUwsQ0FBVyxNQUFYLEVBQW1CLFNBQW5CO0FBQ0QsT0FITztBQUlSQyxZQUpRLG9CQUlFO0FBQ1IsYUFBS0QsS0FBTCxDQUFXLEtBQVgsRUFBa0IsUUFBbEI7QUFDRCxPQU5PO0FBT1JFLFlBUFEsb0JBT0U7QUFDUix1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGVBQUs7QUFEUSxTQUFmO0FBR0Q7QUFYTyxLOzs7Ozs2QkFhQTtBQUNSLFdBQUtDLE1BQUw7QUFDRDs7OztFQTdCb0MsZUFBS0MsUzs7a0JBQXZCaEIsUyIsImZpbGUiOiJib3R0b21iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCb3R0b21iYXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBjYXJ0VmFsOiBOdW1iZXIsXG4gICAgICBtZXNzYWdlUGF0aDogU3RyaW5nXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgY2FydE1heFZhbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcnRWYWwgPj0gOTkpIHtcbiAgICAgICAgICByZXR1cm4gOTlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jYXJ0VmFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGFkZENhcnQgKCkge1xuICAgICAgICB0aGlzLiRlbWl0KCdjYXJ0JywgJ2FkZENhcnQnKVxuICAgICAgfSxcbiAgICAgIGJ1eVRhcCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2J1eScsICdhZGRCdXknKVxuICAgICAgfSxcbiAgICAgIGdvQ2FydCAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhcnQnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=