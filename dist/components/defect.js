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

var Defect = function (_wepy$component) {
  _inherits(Defect, _wepy$component);

  function Defect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Defect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Defect.__proto__ || Object.getPrototypeOf(Defect)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      type: {
        type: String,
        default: '1'
      }
    }, _this.computed = {
      typeIcon: function typeIcon() {
        if (this.type === '1') {
          return 'icon-ksj_splb';
        } else if (this.type === '2') {
          return 'icon-ksj_gwc';
        } else if (this.type === '3') {
          return 'icon-ksj_dd';
        } else if (this.type === '4') {
          return 'icon-ksj_sc';
        } else if (this.type === '5') {
          return 'icon-ksj_dz';
        } else if (this.type === '6') {
          return 'icon-me_xx';
        } else if (this.type === '7') {
          return 'icon-dz_sc';
        } else if (this.type === '8') {
          return 'icon-ksj_splb';
        } else if (this.type === '9') {
          return 'icon-ksj_dz';
        }
      },
      typeTxt: function typeTxt() {
        if (this.type === '1') {
          return '哎呦，被抢空了';
        } else if (this.type === '2') {
          return '购物车空空如也';
        } else if (this.type === '3') {
          return '暂无任何订单';
        } else if (this.type === '4') {
          return '暂无任何收藏';
        } else if (this.type === '5') {
          return '赶快添加第一个地址';
        } else if (this.type === '6') {
          return '暂无任何消息';
        } else if (this.type === '7') {
          return '暂无发票信息';
        } else if (this.type === '8') {
          return '该商品已下架';
        } else if (this.type === '9') {
          return '暂无物流信息';
        }
      }
    }, _this.data = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Defect, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Defect;
}(_wepy2.default.component);

exports.default = Defect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmVjdC5qcyJdLCJuYW1lcyI6WyJEZWZlY3QiLCJwcm9wcyIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwiY29tcHV0ZWQiLCJ0eXBlSWNvbiIsInR5cGVUeHQiLCJkYXRhIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxZQUFNO0FBQ0pBLGNBQU1DLE1BREY7QUFFSkMsaUJBQVM7QUFGTDtBQURBLEssUUFNUkMsUSxHQUFXO0FBQ1RDLGNBRFMsc0JBQ0c7QUFDVixZQUFJLEtBQUtKLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUNyQixpQkFBTyxlQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLGNBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sYUFBUDtBQUNELFNBRk0sTUFFQSxJQUFJLEtBQUtBLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUM1QixpQkFBTyxhQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLGFBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sWUFBUDtBQUNELFNBRk0sTUFFQSxJQUFJLEtBQUtBLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUM1QixpQkFBTyxZQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLGVBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sYUFBUDtBQUNEO0FBQ0YsT0FyQlE7QUFzQlRLLGFBdEJTLHFCQXNCRTtBQUNULFlBQUksS0FBS0wsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQ3JCLGlCQUFPLFNBQVA7QUFDRCxTQUZELE1BRU8sSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sU0FBUDtBQUNELFNBRk0sTUFFQSxJQUFJLEtBQUtBLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUM1QixpQkFBTyxRQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLFFBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sV0FBUDtBQUNELFNBRk0sTUFFQSxJQUFJLEtBQUtBLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUM1QixpQkFBTyxRQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLFFBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sUUFBUDtBQUNELFNBRk0sTUFFQSxJQUFJLEtBQUtBLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUM1QixpQkFBTyxRQUFQO0FBQ0Q7QUFDRjtBQTFDUSxLLFFBNENYTSxJLEdBQU8sRTs7Ozs7NkJBRUc7QUFDUixXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUF2RGlDLGVBQUtDLFM7O2tCQUFwQlYsTSIsImZpbGUiOiJkZWZlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEZWZlY3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgdHlwZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiAnMSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIHR5cGVJY29uICgpIHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnMScpIHtcclxuICAgICAgICAgIHJldHVybiAnaWNvbi1rc2pfc3BsYidcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzInKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2ljb24ta3NqX2d3YydcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzMnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2ljb24ta3NqX2RkJ1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnNCcpIHtcclxuICAgICAgICAgIHJldHVybiAnaWNvbi1rc2pfc2MnXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICc1Jykge1xyXG4gICAgICAgICAgcmV0dXJuICdpY29uLWtzal9keidcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzYnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2ljb24tbWVfeHgnXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICc3Jykge1xyXG4gICAgICAgICAgcmV0dXJuICdpY29uLWR6X3NjJ1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnOCcpIHtcclxuICAgICAgICAgIHJldHVybiAnaWNvbi1rc2pfc3BsYidcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzknKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2ljb24ta3NqX2R6J1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdHlwZVR4dCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJzEnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+WTjuWRpu+8jOiiq+aKouepuuS6hidcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzInKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+i0reeJqei9puepuuepuuWmguS5nydcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzMnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+aaguaXoOS7u+S9leiuouWNlSdcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzQnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+aaguaXoOS7u+S9leaUtuiXjydcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzUnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+i1tuW/q+a3u+WKoOesrOS4gOS4quWcsOWdgCdcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzYnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+aaguaXoOS7u+S9lea2iOaBrydcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzcnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+aaguaXoOWPkeelqOS/oeaBrydcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzgnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+ivpeWVhuWTgeW3suS4i+aetidcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzknKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ+aaguaXoOeJqea1geS/oeaBrydcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICB9XHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=