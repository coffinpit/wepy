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
        }
      },
      typeTxt: function typeTxt() {
        if (this.type === '1') {
          return '商品都在拼命的跑过来';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmVjdC5qcyJdLCJuYW1lcyI6WyJEZWZlY3QiLCJwcm9wcyIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwiY29tcHV0ZWQiLCJ0eXBlSWNvbiIsInR5cGVUeHQiLCJkYXRhIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxZQUFNO0FBQ0pBLGNBQU1DLE1BREY7QUFFSkMsaUJBQVM7QUFGTDtBQURBLEssUUFNUkMsUSxHQUFXO0FBQ1RDLGNBRFMsc0JBQ0c7QUFDVixZQUFJLEtBQUtKLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUNyQixpQkFBTyxlQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLGNBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sYUFBUDtBQUNELFNBRk0sTUFFQSxJQUFJLEtBQUtBLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUM1QixpQkFBTyxhQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLGFBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sWUFBUDtBQUNEO0FBQ0YsT0FmUTtBQWdCVEssYUFoQlMscUJBZ0JFO0FBQ1QsWUFBSSxLQUFLTCxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDckIsaUJBQU8sWUFBUDtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtBLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUM1QixpQkFBTyxTQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLFFBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLQSxJQUFMLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUIsaUJBQU8sUUFBUDtBQUNELFNBRk0sTUFFQSxJQUFJLEtBQUtBLElBQUwsS0FBYyxHQUFsQixFQUF1QjtBQUM1QixpQkFBTyxXQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUksS0FBS0EsSUFBTCxLQUFjLEdBQWxCLEVBQXVCO0FBQzVCLGlCQUFPLFFBQVA7QUFDRDtBQUNGO0FBOUJRLEssUUFnQ1hNLEksR0FBTyxFOzs7Ozs2QkFFRztBQUNSLFdBQUtDLE1BQUw7QUFDRDs7OztFQTNDaUMsZUFBS0MsUzs7a0JBQXBCVixNIiwiZmlsZSI6ImRlZmVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmVjdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICB0eXBlOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGRlZmF1bHQ6ICcxJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgdHlwZUljb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICcxJykge1xyXG4gICAgICAgICAgcmV0dXJuICdpY29uLWtzal9zcGxiJ1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnMicpIHtcclxuICAgICAgICAgIHJldHVybiAnaWNvbi1rc2pfZ3djJ1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnMycpIHtcclxuICAgICAgICAgIHJldHVybiAnaWNvbi1rc2pfZGQnXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICc0Jykge1xyXG4gICAgICAgICAgcmV0dXJuICdpY29uLWtzal9zYydcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzUnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2ljb24ta3NqX2R6J1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnNicpIHtcclxuICAgICAgICAgIHJldHVybiAnaWNvbi1tZV94eCdcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGVUeHQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICcxJykge1xyXG4gICAgICAgICAgcmV0dXJuICfllYblk4Hpg73lnKjmi7zlkb3nmoTot5Hov4fmnaUnXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICcyJykge1xyXG4gICAgICAgICAgcmV0dXJuICfotK3nianovabnqbrnqbrlpoLkuZ8nXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICczJykge1xyXG4gICAgICAgICAgcmV0dXJuICfmmoLml6Dku7vkvZXorqLljZUnXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICc0Jykge1xyXG4gICAgICAgICAgcmV0dXJuICfmmoLml6Dku7vkvZXmlLbol48nXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICc1Jykge1xyXG4gICAgICAgICAgcmV0dXJuICfotbblv6vmt7vliqDnrKzkuIDkuKrlnLDlnYAnXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICc2Jykge1xyXG4gICAgICAgICAgcmV0dXJuICfmmoLml6Dku7vkvZXmtojmga8nXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgfVxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG4gIH1cclxuIl19