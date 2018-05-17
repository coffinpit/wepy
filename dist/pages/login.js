'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

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
      isNull: true,
      jscode: null
    }, _this.components = {
      loading: _loading2.default
    }, _this.methods = {
      login: function login(e) {
        var _this2 = this;

        if (e.detail.encryptedData) {
          this.$parent.getUserInfo(e, this.jscode, function () {
            _this2.goIndex();
          });
        } else {
          _wepy2.default.showModal({
            title: '提示',
            content: '拒绝授权将无法正常使用小程序全部功能，请重新登录并开启授权'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'goIndex',
    value: function goIndex() {
      _wepy2.default.switchTab({
        url: './index'
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this3 = this;

      // 获取跳转页面来源
      this.$parent.getLogin(function (code) {
        _this3.jscode = code;
      });
      _wepy2.default.getSetting({
        success: function success(res) {
          // res.authSetting['scope.userInfo']
          if (_wepy2.default.getStorageSync('token')) {
            _this3.isNull = true;
            // 已经授权，获取新的token
            var data = {
              phone: _wepy2.default.getStorageSync('phone')
            };
            _this3.$parent.requestToken(data, function () {
              _this3.goIndex();
            });
          } else {
            _this3.isNull = false;
          }
          _this3.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJjb21wb25lbnRzIiwibG9hZGluZyIsIm1ldGhvZHMiLCJsb2dpbiIsImUiLCJkZXRhaWwiLCJlbmNyeXB0ZWREYXRhIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiZ29JbmRleCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN3aXRjaFRhYiIsInVybCIsImdldExvZ2luIiwiY29kZSIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiZ2V0U3RvcmFnZVN5bmMiLCJwaG9uZSIsInJlcXVlc3RUb2tlbiIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxjQUFRO0FBRkgsSyxRQUlQQyxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBR2JDLE8sR0FBVTtBQUNSQyxXQURRLGlCQUNEQyxDQURDLEVBQ0U7QUFBQTs7QUFDUixZQUFJQSxFQUFFQyxNQUFGLENBQVNDLGFBQWIsRUFBNEI7QUFDMUIsZUFBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCSixDQUF6QixFQUE0QixLQUFLTCxNQUFqQyxFQUF5QyxZQUFNO0FBQzdDLG1CQUFLVSxPQUFMO0FBQ0QsV0FGRDtBQUdELFNBSkQsTUFJTztBQUNMLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sSUFETTtBQUViQyxxQkFBUztBQUZJLFdBQWY7QUFJRDtBQUNGO0FBWk8sSzs7Ozs7OEJBY0M7QUFDVCxxQkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGFBQUs7QUFEUSxPQUFmO0FBR0Q7Ozs2QkFDUztBQUFBOztBQUNSO0FBQ0EsV0FBS1AsT0FBTCxDQUFhUSxRQUFiLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QixlQUFLakIsTUFBTCxHQUFjaUIsSUFBZDtBQUNELE9BRkQ7QUFHQSxxQkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCO0FBQ0EsY0FBSSxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBQUosRUFBa0M7QUFDaEMsbUJBQUt0QixNQUFMLEdBQWMsSUFBZDtBQUNBO0FBQ0EsZ0JBQUlELE9BQU87QUFDVHdCLHFCQUFPLGVBQUtELGNBQUwsQ0FBb0IsT0FBcEI7QUFERSxhQUFYO0FBR0EsbUJBQUtiLE9BQUwsQ0FBYWUsWUFBYixDQUEwQnpCLElBQTFCLEVBQWdDLFlBQU07QUFDcEMscUJBQUtZLE9BQUw7QUFDRCxhQUZEO0FBR0QsV0FURCxNQVNPO0FBQ0wsbUJBQUtYLE1BQUwsR0FBYyxLQUFkO0FBQ0Q7QUFDRCxpQkFBS3lCLE1BQUw7QUFDRDtBQWhCYSxPQUFoQjtBQWtCRDs7OzZCQUNTLENBQ1Q7Ozs7RUF2RGdDLGVBQUtDLEk7O2tCQUFuQjlCLEsiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5qyi6L+OJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgaXNOdWxsOiB0cnVlLFxuICAgICAganNjb2RlOiBudWxsXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBsb2FkaW5nOiBMb2FkaW5nXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBsb2dpbiAoZSkge1xuICAgICAgICBpZiAoZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSkge1xuICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhlLCB0aGlzLmpzY29kZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5XmraPluLjkvb/nlKjlsI/nqIvluo/lhajpg6jlip/og73vvIzor7fph43mlrDnmbvlvZXlubblvIDlkK/mjojmnYMnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnb0luZGV4ICgpIHtcbiAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAvLyDojrflj5bot7PovazpobXpnaLmnaXmupBcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgIH0pXG4gICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgLy8gcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddXG4gICAgICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICB9XG4gIH1cbiJdfQ==