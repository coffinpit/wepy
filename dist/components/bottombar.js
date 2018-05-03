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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdHRvbWJhci5qcyJdLCJuYW1lcyI6WyJCb3R0b21iYXIiLCJwcm9wcyIsImNhcnRWYWwiLCJOdW1iZXIiLCJjb21wdXRlZCIsImNhcnRNYXhWYWwiLCJtZXRob2RzIiwiYWRkQ2FydCIsIiRlbWl0IiwiYnV5VGFwIiwiZ29DYXJ0Iiwic3dpdGNoVGFiIiwidXJsIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxlQUFTQztBQURILEssUUFHUkMsUSxHQUFXO0FBQ1RDLGdCQURTLHdCQUNLO0FBQ1osWUFBSSxLQUFLSCxPQUFMLElBQWdCLEVBQXBCLEVBQXdCO0FBQ3RCLGlCQUFPLEVBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxLQUFLQSxPQUFaO0FBQ0Q7QUFDRjtBQVBRLEssUUFTWEksTyxHQUFVO0FBQ1JDLGFBRFEscUJBQ0c7QUFDVCxhQUFLQyxLQUFMLENBQVcsTUFBWCxFQUFtQixTQUFuQjtBQUNELE9BSE87QUFJUkMsWUFKUSxvQkFJRTtBQUNSLGFBQUtELEtBQUwsQ0FBVyxLQUFYLEVBQWtCLFFBQWxCO0FBQ0QsT0FOTztBQU9SRSxZQVBRLG9CQU9FO0FBQ1IsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdEO0FBWE8sSzs7Ozs7NkJBYUE7QUFDUixXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUE1Qm9DLGVBQUtDLFM7O2tCQUF2QmQsUyIsImZpbGUiOiJib3R0b21iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCb3R0b21iYXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBjYXJ0VmFsOiBOdW1iZXJcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBjYXJ0TWF4VmFsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFZhbCA+PSA5OSkge1xuICAgICAgICAgIHJldHVybiA5OVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNhcnRWYWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgYWRkQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NhcnQnLCAnYWRkQ2FydCcpXG4gICAgICB9LFxuICAgICAgYnV5VGFwICgpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnYnV5JywgJ2FkZEJ1eScpXG4gICAgICB9LFxuICAgICAgZ29DYXJ0ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==