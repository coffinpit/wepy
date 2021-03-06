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

var Rules = function (_wepy$page) {
  _inherits(Rules, _wepy$page);

  function Rules() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Rules);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Rules.__proto__ || Object.getPrototypeOf(Rules)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '配送规则'
    }, _this.data = {
      url: ''
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Rules, [{
    key: 'onLoad',
    value: function onLoad() {
      this.url = this.$parent.HttpRequest.$$baseHtml + this.$parent.HttpRequest.$$pathHtml.rules;
      console.log(this.url);
      this.$apply();
    }
  }]);

  return Rules;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Rules , 'pages/rules'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzLmpzIl0sIm5hbWVzIjpbIlJ1bGVzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1cmwiLCJtZXRob2RzIiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiJCRiYXNlSHRtbCIsIiQkcGF0aEh0bWwiLCJydWxlcyIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsV0FBSztBQURBLEssUUFHUEMsTyxHQUFVLEU7Ozs7OzZCQUVBO0FBQ1IsV0FBS0QsR0FBTCxHQUFXLEtBQUtFLE9BQUwsQ0FBYUMsV0FBYixDQUF5QkMsVUFBekIsR0FBc0MsS0FBS0YsT0FBTCxDQUFhQyxXQUFiLENBQXlCRSxVQUF6QixDQUFvQ0MsS0FBckY7QUFDQUMsY0FBUUMsR0FBUixDQUFZLEtBQUtSLEdBQWpCO0FBQ0EsV0FBS1MsTUFBTDtBQUNEOzs7O0VBYmdDLGVBQUtDLEk7O2tCQUFuQmQsSyIsImZpbGUiOiJydWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6YWN6YCB6KeE5YiZJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdXJsOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy51cmwgPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuJCRiYXNlSHRtbCArIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC4kJHBhdGhIdG1sLnJ1bGVzXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnVybClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==