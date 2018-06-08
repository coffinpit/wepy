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
      navigationBarTitleText: '用户登录'
    }, _this.data = {
      isNull: true,
      jscode: null,
      refrenceCode: '',
      overflow: false,
      hasPhone: false
    }, _this.components = {
      loading: _loading2.default
    }, _this.methods = {
      changeLogin: function changeLogin(e) {
        console.log(e);
      },
      login: function login(e) {
        var _this2 = this;

        if (e.detail.encryptedData) {
          this.$parent.getUserInfo(e, this.jscode, this.refrenceCode, function () {
            // wepy.navigateTo({
            //   url: './getUserInfo'
            // })
            _this2.hasPhone = true;
            _this2.$apply();
          });
        } else {
          _wepy2.default.showModal({
            title: '提示',
            content: '拒绝授权将无法正常使用小程序全部功能，请重新开启授权'
          });
        }
      },
      bindGetUserInfo: function bindGetUserInfo(e) {
        var _this3 = this;

        this.$parent.getLogin(function (code) {
          _this3.jscode = code;
          _wepy2.default.getSetting({
            success: function success(res) {
              if (res.authSetting['scope.userInfo']) {
                var data = {
                  jscode: _this3.jscode,
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv
                };
                _this3.$parent.HttpRequest.SendUserInfo(data).then(function (res) {
                  _this3.$parent.showLoading();
                  console.log(res);
                  if (res.data.error === 0) {
                    var data = {
                      phone: _wepy2.default.getStorageSync('phone')
                    };
                    _this3.$parent.requestToken(data, function () {
                      _this3.$parent.hideLoading();
                      _wepy2.default.switchTab({
                        url: './index'
                      });
                    });
                  }
                });
              } else {
                _wepy2.default.showModal({
                  title: '提示',
                  content: '拒绝授权将无法正常使用小程序全部功能，请重新开启授权'
                });
              }
            }
          });
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
    value: function onLoad(param) {
      var _this4 = this;

      if (param.refrenceCode) {
        this.refrenceCode = param.refrenceCode;
      } else {
        this.refrenceCode = '';
      }
      // 获取跳转页面来源
      this.$parent.getLogin(function (code) {
        _this4.jscode = code;
      });
      _wepy2.default.getSetting({
        success: function success(res) {
          // res.authSetting['scope.userInfo']
          if (_wepy2.default.getStorageSync('token')) {
            _this4.isNull = true;
            // 已经授权，获取新的token
            var data = {
              phone: _wepy2.default.getStorageSync('phone')
            };
            _this4.$parent.requestToken(data, function () {
              _this4.goIndex();
            }, function () {
              _wepy2.default.showToast({
                title: '加载失败',
                icon: 'none',
                image: '../image/cancel.png'
              });
            });
          } else {
            _this4.isNull = false;
          }
          _this4.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (_wepy2.default.getStorageSync('phone')) {
        this.hasPhone = true;
      } else {
        this.hasPhone = false;
      }
    }
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJvdmVyZmxvdyIsImhhc1Bob25lIiwiY29tcG9uZW50cyIsImxvYWRpbmciLCJtZXRob2RzIiwiY2hhbmdlTG9naW4iLCJlIiwiY29uc29sZSIsImxvZyIsImxvZ2luIiwiZGV0YWlsIiwiZW5jcnlwdGVkRGF0YSIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsIiRhcHBseSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImJpbmRHZXRVc2VySW5mbyIsImdldExvZ2luIiwiY29kZSIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInNob3dMb2FkaW5nIiwiZXJyb3IiLCJwaG9uZSIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdFRva2VuIiwiaGlkZUxvYWRpbmciLCJzd2l0Y2hUYWIiLCJ1cmwiLCJwYXJhbSIsImdvSW5kZXgiLCJzaG93VG9hc3QiLCJpY29uIiwiaW1hZ2UiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxjQUFRLElBREg7QUFFTEMsY0FBUSxJQUZIO0FBR0xDLG9CQUFjLEVBSFQ7QUFJTEMsZ0JBQVUsS0FKTDtBQUtMQyxnQkFBVTtBQUxMLEssUUFPUEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUdiQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0tDLENBREwsRUFDUTtBQUNkQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0QsT0FITztBQUlSRyxXQUpRLGlC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QUFLQyxTQUFMLENBQWU7QUFDYnZCLHVCQUFPLE1BRE07QUFFYndCLHNCQUFNLE1BRk87QUFHYkMsdUJBQU87QUFITSxlQUFmO0FBS0QsYUFSRDtBQVNELFdBZkQsTUFlTztBQUNMLG1CQUFLNUMsTUFBTCxHQUFjLEtBQWQ7QUFDRDtBQUNELGlCQUFLaUIsTUFBTDtBQUNEO0FBdEJhLE9BQWhCO0FBd0JEOzs7NkJBQ1M7QUFDUixVQUFJLGVBQUtrQixjQUFMLENBQW9CLE9BQXBCLENBQUosRUFBa0M7QUFDaEMsYUFBSy9CLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLQSxRQUFMLEdBQWdCLEtBQWhCO0FBQ0Q7QUFDRjs7OztFQXJIZ0MsZUFBS3lDLEk7O2tCQUFuQmpELEsiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55So5oi355m75b2VJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgaXNOdWxsOiB0cnVlLFxuICAgICAganNjb2RlOiBudWxsLFxuICAgICAgcmVmcmVuY2VDb2RlOiAnJyxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIGhhc1Bob25lOiBmYWxzZVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgbG9hZGluZzogTG9hZGluZ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlTG9naW4gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH0sXG4gICAgICBsb2dpbiAoZSkge1xuICAgICAgICBpZiAoZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSkge1xuICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhlLCB0aGlzLmpzY29kZSwgdGhpcy5yZWZyZW5jZUNvZGUsICgpID0+IHtcbiAgICAgICAgICAgIC8vIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAvLyAgIHVybDogJy4vZ2V0VXNlckluZm8nXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgdGhpcy5oYXNQaG9uZSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5XmraPluLjkvb/nlKjlsI/nqIvluo/lhajpg6jlip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJpbmRHZXRVc2VySW5mbyAoZSkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICBqc2NvZGU6IHRoaXMuanNjb2RlLFxuICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VuZFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogJ+aLkue7neaOiOadg+WwhuaXoOazleato+W4uOS9v+eUqOWwj+eoi+W6j+WFqOmDqOWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZ29JbmRleCAoKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gcGFyYW0ucmVmcmVuY2VDb2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9ICcnXG4gICAgICB9XG4gICAgICAvLyDojrflj5bot7PovazpobXpnaLmnaXmupBcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgIH0pXG4gICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgLy8gcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddXG4gICAgICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJykpIHtcbiAgICAgICAgdGhpcy5oYXNQaG9uZSA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGFzUGhvbmUgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19