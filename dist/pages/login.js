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
    }, _this.data = {
      page: null
    }, _this.methods = {
      login: function login() {
        var _this2 = this;

        this.$parent.getUserInfo(this.page, function () {
          _this2.goIndex(_this2.page);
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'goIndex',
    value: function goIndex(page) {
      if (page) {
        if (page === 'index' || page === 'category' || page === 'cart' || page === 'user') {
          _wepy2.default.switchTab({
            url: './' + page
          });
        } else {
          _wepy2.default.navigateTo({
            url: './' + page
          });
        }
      } else {
        _wepy2.default.switchTab({
          url: './index'
        });
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(page) {
      // 获取跳转页面来源
      console.log(page);
      if (page) {
        this.page = page.page;
      }
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYWdlIiwibWV0aG9kcyIsImxvZ2luIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiZ29JbmRleCIsInN3aXRjaFRhYiIsInVybCIsIm5hdmlnYXRlVG8iLCJjb25zb2xlIiwibG9nIiwiJGFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsWUFBTTtBQURELEssUUFHUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0M7QUFBQTs7QUFDUCxhQUFLQyxPQUFMLENBQWFDLFdBQWIsQ0FBeUIsS0FBS0osSUFBOUIsRUFBb0MsWUFBTTtBQUN4QyxpQkFBS0ssT0FBTCxDQUFhLE9BQUtMLElBQWxCO0FBQ0QsU0FGRDtBQUdEO0FBTE8sSzs7Ozs7NEJBT0RBLEksRUFBTTtBQUNiLFVBQUlBLElBQUosRUFBVTtBQUNSLFlBQUlBLFNBQVMsT0FBVCxJQUFvQkEsU0FBUyxVQUE3QixJQUEyQ0EsU0FBUyxNQUFwRCxJQUE4REEsU0FBUyxNQUEzRSxFQUFtRjtBQUNqRix5QkFBS00sU0FBTCxDQUFlO0FBQ2JDLGlCQUFLLE9BQU9QO0FBREMsV0FBZjtBQUdELFNBSkQsTUFJTztBQUNMLHlCQUFLUSxVQUFMLENBQWdCO0FBQ2RELGlCQUFLLE9BQU9QO0FBREUsV0FBaEI7QUFHRDtBQUNGLE9BVkQsTUFVTztBQUNMLHVCQUFLTSxTQUFMLENBQWU7QUFDYkMsZUFBSztBQURRLFNBQWY7QUFHRDtBQUNGOzs7MkJBQ09QLEksRUFBTTtBQUNaO0FBQ0FTLGNBQVFDLEdBQVIsQ0FBWVYsSUFBWjtBQUNBLFVBQUlBLElBQUosRUFBVTtBQUNSLGFBQUtBLElBQUwsR0FBWUEsS0FBS0EsSUFBakI7QUFDRDtBQUNELFdBQUtXLE1BQUw7QUFDRDs7OzZCQUNTLENBQ1Q7Ozs7RUF4Q2dDLGVBQUtYLEk7O2tCQUFuQkosSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5qyi6L+OJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgcGFnZTogbnVsbFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbG9naW4gKCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8odGhpcy5wYWdlLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5nb0luZGV4KHRoaXMucGFnZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZ29JbmRleCAocGFnZSkge1xuICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgaWYgKHBhZ2UgPT09ICdpbmRleCcgfHwgcGFnZSA9PT0gJ2NhdGVnb3J5JyB8fCBwYWdlID09PSAnY2FydCcgfHwgcGFnZSA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgdXJsOiAnLi8nICsgcGFnZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vJyArIHBhZ2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkIChwYWdlKSB7XG4gICAgICAvLyDojrflj5bot7PovazpobXpnaLmnaXmupBcbiAgICAgIGNvbnNvbGUubG9nKHBhZ2UpXG4gICAgICBpZiAocGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlLnBhZ2VcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICB9XG4gIH1cbiJdfQ==