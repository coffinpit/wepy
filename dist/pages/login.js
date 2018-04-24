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
      goIndex: function goIndex() {
        _wepy2.default.switchTab({
          url: './index'
        });
      },
      login: function login() {
        var _this2 = this;

        _wepy2.default.login({
          success: function success(res) {
            console.log(res.code);
            _wepy2.default.getUserInfo({
              success: function success(data) {
                console.log(data);
                // 往服务器发送code和encryptedData 获取token
                // wepy.setStorage('token', token)
                _this2.methods.goIndex();
              }
            });
          }
        });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtZXRob2RzIiwiZ29JbmRleCIsInN3aXRjaFRhYiIsInVybCIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiZ2V0VXNlckluZm8iLCIkYXBwbHkiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTyxFLFFBRVBDLE8sR0FBVTtBQUNSQyxhQURRLHFCQUNHO0FBQ1QsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdELE9BTE87QUFNUkMsV0FOUSxtQkFNQztBQUFBOztBQUNQLHVCQUFLQSxLQUFMLENBQVc7QUFDVEMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQkMsb0JBQVFDLEdBQVIsQ0FBWUYsSUFBSUcsSUFBaEI7QUFDQSwyQkFBS0MsV0FBTCxDQUFpQjtBQUNmTCx1QkFBUyxpQkFBQ04sSUFBRCxFQUFVO0FBQ2pCUSx3QkFBUUMsR0FBUixDQUFZVCxJQUFaO0FBQ0E7QUFDQTtBQUNBLHVCQUFLQyxPQUFMLENBQWFDLE9BQWI7QUFDRDtBQU5jLGFBQWpCO0FBUUQ7QUFYUSxTQUFYO0FBYUQ7QUFwQk8sSzs7Ozs7NkJBc0JBO0FBQ1IsV0FBS1UsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixVQUFNQyxRQUFRLGVBQUtDLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBZDtBQUNBRCxlQUFTRSxXQUFXLEtBQUtkLE9BQUwsQ0FBYUMsT0FBeEIsRUFBaUMsSUFBakMsQ0FBVDtBQUNEOzs7O0VBbENnQyxlQUFLYyxJOztrQkFBbkJuQixLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmrKLov44nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0luZGV4ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgbG9naW4gKCkge1xuICAgICAgICB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSlcbiAgICAgICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgLy8g5b6A5pyN5Yqh5Zmo5Y+R6YCBY29kZeWSjGVuY3J5cHRlZERhdGEg6I635Y+WdG9rZW5cbiAgICAgICAgICAgICAgICAvLyB3ZXB5LnNldFN0b3JhZ2UoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLmdvSW5kZXgoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25sb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgdG9rZW4gJiYgc2V0VGltZW91dCh0aGlzLm1ldGhvZHMuZ29JbmRleCwgMTUwMClcbiAgICB9XG4gIH1cbiJdfQ==