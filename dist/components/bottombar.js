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
      messagePath: String,
      nick_name: String,
      avatar: String,
      customer_info_str: String,
      note_info_str: String,
      isAllowSale: {
        type: Boolean,
        default: true
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdHRvbWJhci5qcyJdLCJuYW1lcyI6WyJCb3R0b21iYXIiLCJwcm9wcyIsImNhcnRWYWwiLCJOdW1iZXIiLCJtZXNzYWdlUGF0aCIsIlN0cmluZyIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsImlzQWxsb3dTYWxlIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwiY29tcHV0ZWQiLCJjYXJ0TWF4VmFsIiwibWV0aG9kcyIsImFkZENhcnQiLCIkZW1pdCIsImJ1eVRhcCIsImdvQ2FydCIsInN3aXRjaFRhYiIsInVybCIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsZUFBU0MsTUFESDtBQUVOQyxtQkFBYUMsTUFGUDtBQUdOQyxpQkFBV0QsTUFITDtBQUlORSxjQUFRRixNQUpGO0FBS05HLHlCQUFtQkgsTUFMYjtBQU1OSSxxQkFBZUosTUFOVDtBQU9OSyxtQkFBYTtBQUNYQyxjQUFNQyxPQURLO0FBRVhDLGlCQUFTO0FBRkU7QUFQUCxLLFFBWVJDLFEsR0FBVztBQUNUQyxnQkFEUyx3QkFDSztBQUNaLFlBQUksS0FBS2IsT0FBTCxJQUFnQixFQUFwQixFQUF3QjtBQUN0QixpQkFBTyxFQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQU8sS0FBS0EsT0FBWjtBQUNEO0FBQ0Y7QUFQUSxLLFFBU1hjLE8sR0FBVTtBQUNSQyxhQURRLHFCQUNHO0FBQ1QsYUFBS0MsS0FBTCxDQUFXLE1BQVgsRUFBbUIsU0FBbkI7QUFDRCxPQUhPO0FBSVJDLFlBSlEsb0JBSUU7QUFDUixhQUFLRCxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFsQjtBQUNELE9BTk87QUFPUkUsWUFQUSxvQkFPRTtBQUNSLHVCQUFLQyxTQUFMLENBQWU7QUFDYkMsZUFBSztBQURRLFNBQWY7QUFHRDtBQVhPLEs7Ozs7OzZCQWFBO0FBQ1IsV0FBS0MsTUFBTDtBQUNEOzs7O0VBckNvQyxlQUFLQyxTOztrQkFBdkJ4QixTIiwiZmlsZSI6ImJvdHRvbWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdHRvbWJhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGNhcnRWYWw6IE51bWJlcixcbiAgICAgIG1lc3NhZ2VQYXRoOiBTdHJpbmcsXG4gICAgICBuaWNrX25hbWU6IFN0cmluZyxcbiAgICAgIGF2YXRhcjogU3RyaW5nLFxuICAgICAgY3VzdG9tZXJfaW5mb19zdHI6IFN0cmluZyxcbiAgICAgIG5vdGVfaW5mb19zdHI6IFN0cmluZyxcbiAgICAgIGlzQWxsb3dTYWxlOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBjYXJ0TWF4VmFsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FydFZhbCA+PSA5OSkge1xuICAgICAgICAgIHJldHVybiA5OVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNhcnRWYWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgYWRkQ2FydCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NhcnQnLCAnYWRkQ2FydCcpXG4gICAgICB9LFxuICAgICAgYnV5VGFwICgpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnYnV5JywgJ2FkZEJ1eScpXG4gICAgICB9LFxuICAgICAgZ29DYXJ0ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vY2FydCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==