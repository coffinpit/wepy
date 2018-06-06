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
      jscode: null,
      refrenceCode: ''
    }, _this.components = {
      loading: _loading2.default
    }, _this.methods = {
      login: function login(e) {
        var _this2 = this;

        if (e.detail.encryptedData) {
          console.log('login' + this.refrenceCode);
          this.$parent.getUserInfo(e, this.jscode, this.refrenceCode, function () {
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
    value: function onLoad(param) {
      var _this3 = this;

      if (param.refrenceCode) {
        this.refrenceCode = param.refrenceCode;
      } else {
        this.refrenceCode = '';
      }
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
            }, function () {
              _wepy2.default.showToast({
                title: '加载失败',
                icon: 'none',
                image: '../image/cancel.png'
              });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJjb21wb25lbnRzIiwibG9hZGluZyIsIm1ldGhvZHMiLCJsb2dpbiIsImUiLCJkZXRhaWwiLCJlbmNyeXB0ZWREYXRhIiwiY29uc29sZSIsImxvZyIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsImdvSW5kZXgiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJwYXJhbSIsImdldExvZ2luIiwiY29kZSIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiZ2V0U3RvcmFnZVN5bmMiLCJwaG9uZSIsInJlcXVlc3RUb2tlbiIsInNob3dUb2FzdCIsImljb24iLCJpbWFnZSIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxjQUFRLElBRkg7QUFHTEMsb0JBQWM7QUFIVCxLLFFBS1BDLFUsR0FBYTtBQUNYQztBQURXLEssUUFHYkMsTyxHQUFVO0FBQ1JDLFdBRFEsaUJBQ0RDLENBREMsRUFDRTtBQUFBOztBQUNSLFlBQUlBLEVBQUVDLE1BQUYsQ0FBU0MsYUFBYixFQUE0QjtBQUMxQkMsa0JBQVFDLEdBQVIsQ0FBWSxVQUFVLEtBQUtULFlBQTNCO0FBQ0EsZUFBS1UsT0FBTCxDQUFhQyxXQUFiLENBQXlCTixDQUF6QixFQUE0QixLQUFLTixNQUFqQyxFQUF5QyxLQUFLQyxZQUE5QyxFQUE0RCxZQUFNO0FBQ2hFLG1CQUFLWSxPQUFMO0FBQ0QsV0FGRDtBQUdELFNBTEQsTUFLTztBQUNMLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sSUFETTtBQUViQyxxQkFBUztBQUZJLFdBQWY7QUFJRDtBQUNGO0FBYk8sSzs7Ozs7OEJBZUM7QUFDVCxxQkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGFBQUs7QUFEUSxPQUFmO0FBR0Q7OzsyQkFDT0MsSyxFQUFPO0FBQUE7O0FBQ2IsVUFBSUEsTUFBTWxCLFlBQVYsRUFBd0I7QUFDdEIsYUFBS0EsWUFBTCxHQUFvQmtCLE1BQU1sQixZQUExQjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtBLFlBQUwsR0FBb0IsRUFBcEI7QUFDRDtBQUNEO0FBQ0EsV0FBS1UsT0FBTCxDQUFhUyxRQUFiLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QixlQUFLckIsTUFBTCxHQUFjcUIsSUFBZDtBQUNELE9BRkQ7QUFHQSxxQkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCO0FBQ0EsY0FBSSxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBQUosRUFBa0M7QUFDaEMsbUJBQUsxQixNQUFMLEdBQWMsSUFBZDtBQUNBO0FBQ0EsZ0JBQUlELE9BQU87QUFDVDRCLHFCQUFPLGVBQUtELGNBQUwsQ0FBb0IsT0FBcEI7QUFERSxhQUFYO0FBR0EsbUJBQUtkLE9BQUwsQ0FBYWdCLFlBQWIsQ0FBMEI3QixJQUExQixFQUFnQyxZQUFNO0FBQ3BDLHFCQUFLZSxPQUFMO0FBQ0QsYUFGRCxFQUVHLFlBQU07QUFDUCw2QkFBS2UsU0FBTCxDQUFlO0FBQ2JiLHVCQUFPLE1BRE07QUFFYmMsc0JBQU0sTUFGTztBQUdiQyx1QkFBTztBQUhNLGVBQWY7QUFLRCxhQVJEO0FBU0QsV0FmRCxNQWVPO0FBQ0wsbUJBQUsvQixNQUFMLEdBQWMsS0FBZDtBQUNEO0FBQ0QsaUJBQUtnQyxNQUFMO0FBQ0Q7QUF0QmEsT0FBaEI7QUF3QkQ7Ozs2QkFDUyxDQUNUOzs7O0VBcEVnQyxlQUFLQyxJOztrQkFBbkJyQyxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+asoui/jidcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGpzY29kZTogbnVsbCxcbiAgICAgIHJlZnJlbmNlQ29kZTogJydcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGxvYWRpbmc6IExvYWRpbmdcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGxvZ2luIChlKSB7XG4gICAgICAgIGlmIChlLmRldGFpbC5lbmNyeXB0ZWREYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2luJyArIHRoaXMucmVmcmVuY2VDb2RlKVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhlLCB0aGlzLmpzY29kZSwgdGhpcy5yZWZyZW5jZUNvZGUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5q2j5bi45L2/55So5bCP56iL5bqP5YWo6YOo5Yqf6IO977yM6K+36YeN5paw55m75b2V5bm25byA5ZCv5o6I5p2DJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ29JbmRleCAoKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gcGFyYW0ucmVmcmVuY2VDb2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9ICcnXG4gICAgICB9XG4gICAgICAvLyDojrflj5bot7PovazpobXpnaLmnaXmupBcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgIH0pXG4gICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgLy8gcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddXG4gICAgICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgIH1cbiAgfVxuIl19