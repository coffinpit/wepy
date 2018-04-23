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
        default: 1
      }
    }, _this.data = {}, _this.methods = {
      plusTap: function plusTap() {
        this.$emit('plusEdit');
      },
      minusTap: function minusTap() {
        this.$emit('minusEdit');
      },
      inputTap: function inputTap(e) {
        var reg = /^[1-9]\d*$|^0$/;
        if (e.detail.value === '') {
          e.detail.value = 0;
        }
        if (!reg.test(e.detail.value)) {
          _wepy2.default.showToast({
            title: '请输入有效数字',
            image: '../image/cancel.png',
            duration: 1000
          });
        }
        this.$emit('keyEdit', e.detail.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInByb3BzIiwibnVtIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImRlZmF1bHQiLCJkYXRhIiwibWV0aG9kcyIsInBsdXNUYXAiLCIkZW1pdCIsIm1pbnVzVGFwIiwiaW5wdXRUYXAiLCJlIiwicmVnIiwiZGV0YWlsIiwidmFsdWUiLCJ0ZXN0Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpbWFnZSIsImR1cmF0aW9uIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEssR0FBUTtBQUNOQyxXQUFLO0FBQ0hDLGNBQU0sQ0FBQ0MsTUFBRCxFQUFTQyxNQUFULENBREg7QUFFSEMsaUJBQVM7QUFGTjtBQURDLEssUUFPUkMsSSxHQUFPLEUsUUFHUEMsTyxHQUFVO0FBQ1JDLGFBRFEscUJBQ0c7QUFDVCxhQUFLQyxLQUFMLENBQVcsVUFBWDtBQUNELE9BSE87QUFJUkMsY0FKUSxzQkFJSTtBQUNWLGFBQUtELEtBQUwsQ0FBVyxXQUFYO0FBQ0QsT0FOTztBQU9SRSxjQVBRLG9CQU9FQyxDQVBGLEVBT0s7QUFDWCxZQUFJQyxNQUFNLGdCQUFWO0FBQ0EsWUFBSUQsRUFBRUUsTUFBRixDQUFTQyxLQUFULEtBQW1CLEVBQXZCLEVBQTJCO0FBQ3pCSCxZQUFFRSxNQUFGLENBQVNDLEtBQVQsR0FBaUIsQ0FBakI7QUFDRDtBQUNELFlBQUksQ0FBQ0YsSUFBSUcsSUFBSixDQUFTSixFQUFFRSxNQUFGLENBQVNDLEtBQWxCLENBQUwsRUFBK0I7QUFDN0IseUJBQUtFLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxTQURNO0FBRWJDLG1CQUFPLHFCQUZNO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjtBQUtEO0FBQ0QsYUFBS1gsS0FBTCxDQUFXLFNBQVgsRUFBc0JHLEVBQUVFLE1BQUYsQ0FBU0MsS0FBL0I7QUFDRDtBQXBCTyxLOzs7Ozs2QkFzQkQ7QUFDUCxXQUFLTSxNQUFMO0FBQ0Q7Ozs7RUFuQ2tDLGVBQUtDLFM7O2tCQUFyQnZCLE8iLCJmaWxlIjoiY291bnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIG51bToge1xuICAgICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgICBkZWZhdWx0OiAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgcGx1c1RhcCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3BsdXNFZGl0JylcbiAgICAgIH0sXG4gICAgICBtaW51c1RhcCAoKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ21pbnVzRWRpdCcpXG4gICAgICB9LFxuICAgICAgaW5wdXRUYXAgKGUpIHtcbiAgICAgICAgdmFyIHJlZyA9IC9eWzEtOV1cXGQqJHxeMCQvXG4gICAgICAgIGlmIChlLmRldGFpbC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICBlLmRldGFpbC52YWx1ZSA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlZy50ZXN0KGUuZGV0YWlsLnZhbHVlKSkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5pyJ5pWI5pWw5a2XJyxcbiAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kZW1pdCgna2V5RWRpdCcsIGUuZGV0YWlsLnZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=