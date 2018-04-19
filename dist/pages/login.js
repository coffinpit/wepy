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

    var _temp, _this2, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '欢迎'
    }, _this2.data = {}, _this2.methods = {
      goIndex: function goIndex() {
        _wepy2.default.switchTab({
          url: './index'
        });
      },
      login: function login() {
        var _this3 = this;

        var _this = this.$parent;
        _this.getUserInfo(function (data) {
          console.log(data);
          // 修改以下的请求回调
          _this.HttpRequest.UserLogin(data).then(function (token) {
            _wepy2.default.setStorageSync('token', token);
            _this3.methods.goIndex();
          });
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtZXRob2RzIiwiZ29JbmRleCIsInN3aXRjaFRhYiIsInVybCIsImxvZ2luIiwiX3RoaXMiLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCJjb25zb2xlIiwibG9nIiwiSHR0cFJlcXVlc3QiLCJVc2VyTG9naW4iLCJ0aGVuIiwidG9rZW4iLCJzZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImdldFN0b3JhZ2VTeW5jIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTyxFLFNBRVBDLE8sR0FBVTtBQUNSQyxhQURRLHFCQUNHO0FBQ1QsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdELE9BTE87QUFNUkMsV0FOUSxtQkFNQztBQUFBOztBQUNQLFlBQUlDLFFBQVEsS0FBS0MsT0FBakI7QUFDQUQsY0FBTUUsV0FBTixDQUFrQixVQUFDUixJQUFELEVBQVU7QUFDMUJTLGtCQUFRQyxHQUFSLENBQVlWLElBQVo7QUFDQTtBQUNBTSxnQkFBTUssV0FBTixDQUFrQkMsU0FBbEIsQ0FBNEJaLElBQTVCLEVBQWtDYSxJQUFsQyxDQUF1QyxVQUFDQyxLQUFELEVBQVc7QUFDaEQsMkJBQUtDLGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkJELEtBQTdCO0FBQ0EsbUJBQUtiLE9BQUwsQ0FBYUMsT0FBYjtBQUNELFdBSEQ7QUFJRCxTQVBEO0FBUUQ7QUFoQk8sSzs7Ozs7NkJBa0JBO0FBQ1IsV0FBS2MsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixVQUFNRixRQUFRLGVBQUtHLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBZDtBQUNBSCxlQUFTSSxXQUFXLEtBQUtqQixPQUFMLENBQWFDLE9BQXhCLEVBQWlDLElBQWpDLENBQVQ7QUFDRDs7OztFQTlCZ0MsZUFBS2lCLEk7O2tCQUFuQnRCLEsiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+asoui/jidcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvSW5kZXggKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBsb2dpbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXMuJHBhcmVudFxuICAgICAgICBfdGhpcy5nZXRVc2VySW5mbygoZGF0YSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgLy8g5L+u5pS55Lul5LiL55qE6K+35rGC5Zue6LCDXG4gICAgICAgICAgX3RoaXMuSHR0cFJlcXVlc3QuVXNlckxvZ2luKGRhdGEpLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmdvSW5kZXgoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9ubG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIHRva2VuICYmIHNldFRpbWVvdXQodGhpcy5tZXRob2RzLmdvSW5kZXgsIDE1MDApXG4gICAgfVxuICB9XG4iXX0=