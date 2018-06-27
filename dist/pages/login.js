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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJvdmVyZmxvdyIsImhhc1Bob25lIiwiY29tcG9uZW50cyIsImxvYWRpbmciLCJtZXRob2RzIiwibG9naW4iLCJlIiwiZGV0YWlsIiwiZW5jcnlwdGVkRGF0YSIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsIiRhcHBseSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImJpbmRHZXRVc2VySW5mbyIsImdldExvZ2luIiwiY29kZSIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInNob3dMb2FkaW5nIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwicGhvbmUiLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3RUb2tlbiIsImhpZGVMb2FkaW5nIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsIm5hdmlnYXRlQmFjayIsImdvSW5kZXgiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJwYXJhbSIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZ2V0VXNlciIsInNob3dUb2FzdCIsImljb24iLCJpbWFnZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxjQUFRLElBRkg7QUFHTEMsb0JBQWMsRUFIVDtBQUlMQyxnQkFBVSxLQUpMO0FBS0xDLGdCQUFVO0FBTEwsSyxRQU9QQyxVLEdB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QUFhTyxRQUFiLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM5QixlQUFLbkIsTUFBTCxHQUFjbUIsSUFBZDtBQUNELE9BRkQ7QUFHQSxxQkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCO0FBQ0EsY0FBSSxlQUFLYSxjQUFMLENBQW9CLE9BQXBCLENBQUosRUFBa0M7QUFDaEMsbUJBQUt4QixPQUFMLENBQWFzQyxPQUFiO0FBQ0EsbUJBQUtsRCxNQUFMLEdBQWMsSUFBZDtBQUNBO0FBQ0EsZ0JBQUlELE9BQU87QUFDVG9DLHFCQUFPLGVBQUtDLGNBQUwsQ0FBb0IsT0FBcEI7QUFERSxhQUFYO0FBR0EsbUJBQUt4QixPQUFMLENBQWF5QixZQUFiLENBQTBCdEMsSUFBMUIsRUFBZ0MsWUFBTTtBQUNwQyxxQkFBSzZDLE9BQUw7QUFDRCxhQUZELEVBRUcsWUFBTTtBQUNQLDZCQUFLTyxTQUFMLENBQWU7QUFDYm5DLHVCQUFPLFNBRE07QUFFYm9DLHNCQUFNLE1BRk87QUFHYkMsdUJBQU87QUFITSxlQUFmO0FBS0QsYUFSRDtBQVNELFdBaEJELE1BZ0JPO0FBQ0wsbUJBQUtyRCxNQUFMLEdBQWMsS0FBZDtBQUNEO0FBQ0QsaUJBQUtjLE1BQUw7QUFDRDtBQXZCYSxPQUFoQjtBQXlCRDs7OzZCQUNTO0FBQ1IsVUFBSSxlQUFLc0IsY0FBTCxDQUFvQixPQUFwQixDQUFKLEVBQWtDO0FBQ2hDLGFBQUtoQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS0EsUUFBTCxHQUFnQixLQUFoQjtBQUNEO0FBQ0Y7Ozs7RUE1SGdDLGVBQUtrRCxJOztrQkFBbkIxRCxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUqOaIt+eZu+W9lSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGpzY29kZTogbnVsbCxcbiAgICAgIHJlZnJlbmNlQ29kZTogJycsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICBoYXNQaG9uZTogZmFsc2VcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGxvYWRpbmc6IExvYWRpbmdcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGxvZ2luIChlKSB7XG4gICAgICAgIGlmIChlLmRldGFpbC5lbmNyeXB0ZWREYXRhKSB7XG4gICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKGUsIHRoaXMuanNjb2RlLCB0aGlzLnJlZnJlbmNlQ29kZSwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIC8vICAgdXJsOiAnLi9nZXRVc2VySW5mbydcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICB0aGlzLmhhc1Bob25lID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aLkue7neaOiOadg+WwhuaXoOazleato+W4uOS9v+eUqOWwj+eoi+W6j+WFqOmDqOWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYmluZEdldFVzZXJJbmZvIChlKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICAgIHRoaXMuanNjb2RlID0gY29kZVxuICAgICAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICBqc2NvZGU6IHRoaXMuanNjb2RlLFxuICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgIGl2OiBlLmRldGFpbC5pdlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuU2VuZFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VzID0gdGhpcy5nZXRDdXJyZW50UGFnZXMoKVxuICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5XmraPluLjkvb/nlKjlsI/nqIvluo/lhajpg6jlip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGdvSW5kZXggKCkge1xuICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgaWYgKHBhcmFtLnJlZnJlbmNlQ29kZSkge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9IHBhcmFtLnJlZnJlbmNlQ29kZVxuICAgICAgfSBlbHNlIGlmIChwYXJhbS5zY2VuZSkge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbS5zY2VuZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gJydcbiAgICAgIH1cbiAgICAgIC8vIOiOt+WPlui3s+i9rOmhtemdouadpea6kFxuICAgICAgdGhpcy4kcGFyZW50LmdldExvZ2luKChjb2RlKSA9PiB7XG4gICAgICAgIHRoaXMuanNjb2RlID0gY29kZVxuICAgICAgfSlcbiAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAvLyByZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ11cbiAgICAgICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXIoKVxuICAgICAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzojrflj5bmlrDnmoR0b2tlblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQucmVxdWVzdFRva2VuKGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+36YeN5paw5o6I5p2D55m75b2VJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKSkge1xuICAgICAgICB0aGlzLmhhc1Bob25lID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYXNQaG9uZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=