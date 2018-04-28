'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
  _inherits(Login, _wepy$page);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '欢迎'
    }, _this.data = {}, _this.methods = {
      login: function login() {
        this.$parent.getUserInfo();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'onload',
    value: function onload() {
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var token = _wepy2.default.getStorageSync('token');
      token && setTimeout(this.methods.goIndex, 1500);
    }
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtZXRob2RzIiwibG9naW4iLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCIkYXBwbHkiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwic2V0VGltZW91dCIsImdvSW5kZXgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU8sRSxRQUVQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQztBQUNQLGFBQUtDLE9BQUwsQ0FBYUMsV0FBYjtBQUNEO0FBSE8sSzs7Ozs7NkJBS0E7QUFDUixXQUFLQyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFVBQU1DLFFBQVEsZUFBS0MsY0FBTCxDQUFvQixPQUFwQixDQUFkO0FBQ0FELGVBQVNFLFdBQVcsS0FBS1AsT0FBTCxDQUFhUSxPQUF4QixFQUFpQyxJQUFqQyxDQUFUO0FBQ0Q7Ozs7RUFqQmdDLGVBQUtDLEk7O2tCQUFuQmIsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5qyi6L+OJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbG9naW4gKCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKVxuICAgICAgfVxuICAgIH1cbiAgICBvbmxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgY29uc3QgdG9rZW4gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB0b2tlbiAmJiBzZXRUaW1lb3V0KHRoaXMubWV0aG9kcy5nb0luZGV4LCAxNTAwKVxuICAgIH1cbiAgfVxuIl19