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
        this.$parent.getUserInfo(this.page);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYWdlIiwibWV0aG9kcyIsImxvZ2luIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFlBQU07QUFERCxLLFFBR1BDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNDO0FBQ1AsYUFBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCLEtBQUtKLElBQTlCO0FBQ0Q7QUFITyxLOzs7OzsyQkFLRkEsSSxFQUFNO0FBQ1o7QUFDQUssY0FBUUMsR0FBUixDQUFZTixJQUFaO0FBQ0EsVUFBSUEsSUFBSixFQUFVO0FBQ1IsYUFBS0EsSUFBTCxHQUFZQSxLQUFLQSxJQUFqQjtBQUNEO0FBQ0QsV0FBS08sTUFBTDtBQUNEOzs7NkJBQ1MsQ0FDVDs7OztFQXJCZ0MsZUFBS1AsSTs7a0JBQW5CSixLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmrKLov44nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBwYWdlOiBudWxsXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBsb2dpbiAoKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyh0aGlzLnBhZ2UpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAocGFnZSkge1xuICAgICAgLy8g6I635Y+W6Lez6L2s6aG16Z2i5p2l5rqQXG4gICAgICBjb25zb2xlLmxvZyhwYWdlKVxuICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZS5wYWdlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgfVxuICB9XG4iXX0=