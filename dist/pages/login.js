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
                _this3.$parent.globalData.userInfo = e.detail.userInfo;
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
                      var pages = _this3.getCurrentPages();
                      var prevPage = pages[pages.length - 2];
                      if (prevPage) {
                        _wepy2.default.navigateBack();
                      } else {
                        _this3.goIndex();
                      }
                    });
                  } else {
                    _this3.$parent.hideLoading();
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
      } else if (param.scene) {
        this.refrenceCode = decodeURIComponent(param.scene);
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
            _this4.$parent.getUser();
            _this4.isNull = true;
            // 已经授权，获取新的token
            var data = {
              phone: _wepy2.default.getStorageSync('phone')
            };
            _this4.$parent.requestToken(data, function () {
              _this4.goIndex();
            }, function () {
              _wepy2.default.showToast({
                title: '请重新授权登录',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJvdmVyZmxvdyIsImhhc1Bob25lIiwiY29tcG9uZW50cyIsImxvYWRpbmciLCJtZXRob2RzIiwiY2hhbmdlTG9naW4iLCJlIiwiY29uc29sZSIsImxvZyIsImxvZ2luIiwiZGV0YWlsIiwiZW5jcnlwdGVkRGF0YSIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsIiRhcHBseSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImJpbmRHZXRVc2VySW5mbyIsImdldExvZ2luIiwiY29kZSIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInNob3dMb2FkaW5nIiwiZXJyb3IiLCJwaG9uZSIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdFRva2VuIiwiaGlkZUxvYWRpbmciLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwibGVuZ3RoIiwibmF2aWdhdGVCYWNrIiwiZ29JbmRleCIsInN3aXRjaFRhYiIsInVybCIsInBhcmFtIiwic2NlbmUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJnZXRVc2VyIiwic2hvd1RvYXN0IiwiaWNvbiIsImltYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsY0FBUSxJQURIO0FBRUxDLGNBQVEsSUFGSDtBQUdMQyxvQkFBYyxFQUhUO0FBSUxDLGdCQUFVLEtBSkw7QUFLTEMsZ0JBQVU7QUFM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cnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlKjmiLfnmbvlvZUnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBqc2NvZGU6IG51bGwsXG4gICAgICByZWZyZW5jZUNvZGU6ICcnLFxuICAgICAgb3ZlcmZsb3c6IGZhbHNlLFxuICAgICAgaGFzUGhvbmU6IGZhbHNlXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBsb2FkaW5nOiBMb2FkaW5nXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGFuZ2VMb2dpbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfSxcbiAgICAgIGxvZ2luIChlKSB7XG4gICAgICAgIGlmIChlLmRldGFpbC5lbmNyeXB0ZWREYXRhKSB7XG4gICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKGUsIHRoaXMuanNjb2RlLCB0aGlzLnJlZnJlbmNlQ29kZSwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIC8vICAgdXJsOiAnLi9nZXRVc2VySW5mbydcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICB0aGlzLmhhc1Bob25lID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aLkue7neaOiOadg+WwhuaXoOazleato+W4uOS9v+eUqOWwj+eoi+W6j+WFqOmDqOWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYmluZEdldFVzZXJJbmZvIChlKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuanNjb2RlID0gY29kZVxuICAgICAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICBqc2NvZGU6IHRoaXMuanNjb2RlLFxuICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VuZFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VzID0gdGhpcy5nZXRDdXJyZW50UGFnZXMoKVxuICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5XmraPluLjkvb/nlKjlsI/nqIvluo/lhajpg6jlip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGdvSW5kZXggKCkge1xuICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgaWYgKHBhcmFtLnJlZnJlbmNlQ29kZSkge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9IHBhcmFtLnJlZnJlbmNlQ29kZVxuICAgICAgfSBlbHNlIGlmIChwYXJhbS5zY2VuZSkge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbS5zY2VuZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gJydcbiAgICAgIH1cbiAgICAgIC8vIOiOt+WPlui3s+i9rOmhtemdouadpea6kFxuICAgICAgdGhpcy4kcGFyZW50LmdldExvZ2luKChjb2RlKSA9PiB7XG4gICAgICAgIHRoaXMuanNjb2RlID0gY29kZVxuICAgICAgfSlcbiAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAvLyByZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ11cbiAgICAgICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXIoKVxuICAgICAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzojrflj5bmlrDnmoR0b2tlblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucmVxdWVzdFRva2VuKGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+36YeN5paw5o6I5p2D55m75b2VJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKSkge1xuICAgICAgICB0aGlzLmhhc1Bob25lID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYXNQaG9uZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=