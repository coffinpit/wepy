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
      hasPhone: false,
      isError: false,
      httpId: '',
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: ''
    }, _this.components = {
      loading: _loading2.default
    }, _this.methods = {
      login: function login(e) {
        var _this2 = this;

        if (e.detail.encryptedData) {
          this.$parent.getUserInfo(e, this.jscode, this.refrenceCode, function () {
            // wepy.navigateTo({
            //   url: './getUserInfo'
            // })
            _this2.hasPhone = true;
            _this2.$apply();
          }, function () {
            _this2.showError();
            _this2.$apply();
          });
        } else {
          _wepy2.default.showModal({
            title: '提示',
            content: '拒绝授权将无法正常使用小程序全部功能，请重新开启授权'
          });
        }
      },
      loginAgain: function loginAgain() {
        var _this3 = this;

        _wepy2.default.clearStorageSync();
        this.$parent.getLogin(function (code) {
          _this3.jscode = code;
        });
        this.isNull = false;
        this.isError = false;
        this.hasPhone = false;
      },
      callPhone: function callPhone() {
        _wepy2.default.makePhoneCall({
          phoneNumber: '021-65870021'
        });
      },
      bindGetUserInfo: function bindGetUserInfo(e) {
        var _this4 = this;

        this.$parent.getLogin(function (code) {
          _this4.jscode = code;
          _wepy2.default.getSetting({
            success: function success(res) {
              if (res.authSetting['scope.userInfo']) {
                _this4.$parent.globalData.userInfo = e.detail.userInfo;
                var data = {
                  jscode: _this4.jscode,
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv
                };
                _this4.$parent.HttpRequest.SendUserInfo(data).then(function (res) {
                  _this4.$parent.showLoading();
                  console.log(res);
                  if (res.data.error !== undefined && res.data.error === 0) {
                    var data = {
                      phone: _wepy2.default.getStorageSync('phone')
                    };
                    _this4.$parent.requestToken(data, function () {
                      _this4.$parent.hideLoading();
                      var pages = _this4.getCurrentPages();
                      var prevPage = pages[pages.length - 2];
                      if (prevPage) {
                        _wepy2.default.navigateBack();
                      } else {
                        _this4.goIndex();
                      }
                    }, function () {
                      _this4.$parent.hideLoading();
                      _this4.showError();
                      _this4.$apply();
                    });
                  } else {
                    _this4.$parent.hideLoading();
                    _this4.showError();
                    _this4.$apply();
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
    key: 'showError',
    value: function showError() {
      this.isError = true;
      this.httpId = this.$parent.errorHttpId;
      this.note_info_str = this.$parent.getBusiness('用户登录错误码：' + this.$parent.errorHttpId, null, null);
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      var _this5 = this;

      if (param.refrenceCode) {
        this.refrenceCode = param.refrenceCode;
      } else if (param.scene) {
        this.refrenceCode = decodeURIComponent(param.scene);
      } else {
        this.refrenceCode = '';
      }
      // 获取跳转页面来源
      this.$parent.getLogin(function (code) {
        _this5.jscode = code;
      });
      if (_wepy2.default.getStorageSync('phone') === '') {
        _wepy2.default.clearStorageSync();
        this.isNull = false;
      } else {
        _wepy2.default.getSetting({
          success: function success(res) {
            // res.authSetting['scope.userInfo']
            if (_wepy2.default.getStorageSync('token')) {
              _this5.$parent.getUser();
              _this5.isNull = true;
              // 已经授权，获取新的token
              var data = {
                phone: _wepy2.default.getStorageSync('phone')
              };
              _this5.$parent.requestToken(data, function () {
                _this5.goIndex();
              }, function () {
                _this5.showError();
                _this5.$apply();
              });
            } else {
              _this5.isNull = false;
            }
            _this5.$apply();
          }
        });
      }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJvdmVyZmxvdyIsImhhc1Bob25lIiwiaXNFcnJvciIsImh0dHBJZCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsImNvbXBvbmVudHMiLCJsb2FkaW5nIiwibWV0aG9kcyIsImxvZ2luIiwiZSIsImRldGFpbCIsImVuY3J5cHRlZERhdGEiLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCIkYXBwbHkiLCJzaG93RXJyb3IiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJsb2dpbkFnYWluIiwiY2xlYXJTdG9yYWdlU3luYyIsImdldExvZ2luIiwiY29kZSIsImNhbGxQaG9uZSIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsImJpbmRHZXRVc2VySW5mbyIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInNob3dMb2FkaW5nIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidW5kZWZpbmVkIiwicGhvbmUiLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3RUb2tlbiIsImhpZGVMb2FkaW5nIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsIm5hdmlnYXRlQmFjayIsImdvSW5kZXgiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJlcnJvckh0dHBJZCIsImdldEJ1c2luZXNzIiwicGFyYW0iLCJzY2VuZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldFVzZXIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7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QyxlQUFLOEQsSTs7a0JBQW5CdEUsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlKjmiLfnmbvlvZUnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBqc2NvZGU6IG51bGwsXG4gICAgICByZWZyZW5jZUNvZGU6ICcnLFxuICAgICAgb3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgaGFzUGhvbmU6IGZhbHNlLFxuICAgICAgaXNFcnJvcjogZmFsc2UsXG4gICAgICBodHRwSWQ6ICcnLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJ1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgbG9hZGluZzogTG9hZGluZ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbG9naW4gKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLmVuY3J5cHRlZERhdGEpIHtcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oZSwgdGhpcy5qc2NvZGUsIHRoaXMucmVmcmVuY2VDb2RlLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgLy8gICB1cmw6ICcuL2dldFVzZXJJbmZvJ1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIHRoaXMuaGFzUGhvbmUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoKVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aLkue7neaOiOadg+WwhuaXoOazleato+W4uOS9v+eUqOWwj+eoi+W6j+WFqOmDqOWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbG9naW5BZ2FpbiAoKSB7XG4gICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlU3luYygpXG4gICAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuanNjb2RlID0gY29kZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaXNFcnJvciA9IGZhbHNlXG4gICAgICAgIHRoaXMuaGFzUGhvbmUgPSBmYWxzZVxuICAgICAgfSxcbiAgICAgIGNhbGxQaG9uZSAoKSB7XG4gICAgICAgIHdlcHkubWFrZVBob25lQ2FsbCh7XG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcwMjEtNjU4NzAwMjEnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYmluZEdldFVzZXJJbmZvIChlKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuanNjb2RlID0gY29kZVxuICAgICAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICBqc2NvZGU6IHRoaXMuanNjb2RlLFxuICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VuZFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldlBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKClcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvcigpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5XmraPluLjkvb/nlKjlsI/nqIvluo/lhajpg6jlip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGdvSW5kZXggKCkge1xuICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgfSlcbiAgICB9XG4gICAgc2hvd0Vycm9yICgpIHtcbiAgICAgIHRoaXMuaXNFcnJvciA9IHRydWVcbiAgICAgIHRoaXMuaHR0cElkID0gdGhpcy4kcGFyZW50LmVycm9ySHR0cElkXG4gICAgICB0aGlzLm5vdGVfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+eUqOaIt+eZu+W9lemUmeivr+egge+8micgKyB0aGlzLiRwYXJlbnQuZXJyb3JIdHRwSWQsIG51bGwsIG51bGwpXG4gICAgfVxuICAgIG9uTG9hZCAocGFyYW0pIHtcbiAgICAgIGlmIChwYXJhbS5yZWZyZW5jZUNvZGUpIHtcbiAgICAgICAgdGhpcy5yZWZyZW5jZUNvZGUgPSBwYXJhbS5yZWZyZW5jZUNvZGVcbiAgICAgIH0gZWxzZSBpZiAocGFyYW0uc2NlbmUpIHtcbiAgICAgICAgdGhpcy5yZWZyZW5jZUNvZGUgPSBkZWNvZGVVUklDb21wb25lbnQocGFyYW0uc2NlbmUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9ICcnXG4gICAgICB9XG4gICAgICAvLyDojrflj5bot7PovazpobXpnaLmnaXmupBcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgIH0pXG4gICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKSA9PT0gJycpIHtcbiAgICAgICAgd2VweS5jbGVhclN0b3JhZ2VTeW5jKClcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAvLyByZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ11cbiAgICAgICAgICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpKSB7XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyKClcbiAgICAgICAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOiOt+WPluaWsOeahHRva2VuXG4gICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKClcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJykpIHtcbiAgICAgICAgdGhpcy5oYXNQaG9uZSA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGFzUGhvbmUgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19