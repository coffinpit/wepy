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
      isNull: true
    }, _this.methods = {
      login: function login(e) {
        var _this2 = this;

        this.$parent.getUserInfo(e, function () {
          _this2.goIndex();
        });
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
      this.$parent.getLogin();
      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            _this3.isNull = true;
            // 已经授权，获取新的token
            _this3.$parent.requestToken({ phone: '13402155751' }, function () {
              _this3.goIndex();
            });
          } else {
            _this3.isNull = false;
            console.log(_this3.isNull);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJtZXRob2RzIiwibG9naW4iLCJlIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiZ29JbmRleCIsInN3aXRjaFRhYiIsInVybCIsImdldExvZ2luIiwiZ2V0U2V0dGluZyIsInN1Y2Nlc3MiLCJyZXMiLCJhdXRoU2V0dGluZyIsInJlcXVlc3RUb2tlbiIsInBob25lIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxjQUFRO0FBREgsSyxRQUdQQyxPLEdBQVU7QUFDUkMsV0FEUSxpQkFDREMsQ0FEQyxFQUNFO0FBQUE7O0FBQ1IsYUFBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCRixDQUF6QixFQUE0QixZQUFNO0FBQ2hDLGlCQUFLRyxPQUFMO0FBQ0QsU0FGRDtBQUdEO0FBTE8sSzs7Ozs7OEJBT0M7QUFDVCxxQkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGFBQUs7QUFEUSxPQUFmO0FBR0Q7Ozs2QkFDUztBQUFBOztBQUNSO0FBQ0EsV0FBS0osT0FBTCxDQUFhSyxRQUFiO0FBQ0EscUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJQSxJQUFJQyxXQUFKLENBQWdCLGdCQUFoQixDQUFKLEVBQXVDO0FBQ3JDLG1CQUFLYixNQUFMLEdBQWMsSUFBZDtBQUNBO0FBQ0EsbUJBQUtJLE9BQUwsQ0FBYVUsWUFBYixDQUEwQixFQUFDQyxPQUFPLGFBQVIsRUFBMUIsRUFBa0QsWUFBTTtBQUN0RCxxQkFBS1QsT0FBTDtBQUNELGFBRkQ7QUFHRCxXQU5ELE1BTU87QUFDTCxtQkFBS04sTUFBTCxHQUFjLEtBQWQ7QUFDQWdCLG9CQUFRQyxHQUFSLENBQVksT0FBS2pCLE1BQWpCO0FBQ0Q7QUFDRCxpQkFBS2tCLE1BQUw7QUFDRDtBQWJhLE9BQWhCO0FBZUQ7Ozs2QkFDUyxDQUNUOzs7O0VBdkNnQyxlQUFLQyxJOztrQkFBbkJ2QixLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmrKLov44nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBpc051bGw6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGxvZ2luIChlKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhlLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZ29JbmRleCAoKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgLy8g6I635Y+W6Lez6L2s6aG16Z2i5p2l5rqQXG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKVxuICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oe3Bob25lOiAnMTM0MDIxNTU3NTEnfSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmdvSW5kZXgoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pc051bGwpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICB9XG4gIH1cbiJdfQ==