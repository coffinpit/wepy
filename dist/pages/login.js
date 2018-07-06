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
      if (_wepy2.default.getStorageSync('phone') === '') {
        _wepy2.default.clearStorageSync();
        this.isNull = false;
      } else {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJvdmVyZmxvdyIsImhhc1Bob25lIiwiY29tcG9uZW50cyIsImxvYWRpbmciLCJtZXRob2RzIiwibG9naW4iLCJlIiwiZGV0YWlsIiwiZW5jcnlwdGVkRGF0YSIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsIiRhcHBseSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImJpbmRHZXRVc2VySW5mbyIsImdldExvZ2luIiwiY29kZSIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInNob3dMb2FkaW5nIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwicGhvbmUiLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3RUb2tlbiIsImhpZGVMb2FkaW5nIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsIm5hdmlnYXRlQmFjayIsImdvSW5kZXgiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJwYXJhbSIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiY2xlYXJTdG9yYWdlU3luYyIsImdldFVzZXIiLCJzaG93VG9hc3QiLCJpY29uIiwiaW1hZ2UiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxjQUFRLElBREg7QUFFTEMsY0FBUSxJQUZIO0FBR0xDLG9CQUFjLEVBSFQ7QUFJTEMsZ0JBQVUsS0FKTDtBQUtMQyxnQkFB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LCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55So5oi355m75b2VJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgaXNOdWxsOiB0cnVlLFxuICAgICAganNjb2RlOiBudWxsLFxuICAgICAgcmVmcmVuY2VDb2RlOiAnJyxcbiAgICAgIG92ZXJmbG93OiBmYWxzZSxcbiAgICAgIGhhc1Bob25lOiBmYWxzZVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgbG9hZGluZzogTG9hZGluZ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbG9naW4gKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLmVuY3J5cHRlZERhdGEpIHtcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oZSwgdGhpcy5qc2NvZGUsIHRoaXMucmVmcmVuY2VDb2RlLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgLy8gICB1cmw6ICcuL2dldFVzZXJJbmZvJ1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIHRoaXMuaGFzUGhvbmUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5q2j5bi45L2/55So5bCP56iL5bqP5YWo6YOo5Yqf6IO977yM6K+36YeN5paw5byA5ZCv5o6I5p2DJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBiaW5kR2V0VXNlckluZm8gKGUpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LmdldExvZ2luKChjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5qc2NvZGUgPSBjb2RlXG4gICAgICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgIGpzY29kZTogdGhpcy5qc2NvZGUsXG4gICAgICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgaXY6IGUuZGV0YWlsLml2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZW5kVXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldlBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogJ+aLkue7neaOiOadg+WwhuaXoOazleato+W4uOS9v+eUqOWwj+eoi+W6j+WFqOmDqOWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZ29JbmRleCAoKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gcGFyYW0ucmVmcmVuY2VDb2RlXG4gICAgICB9IGVsc2UgaWYgKHBhcmFtLnNjZW5lKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtLnNjZW5lKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWZyZW5jZUNvZGUgPSAnJ1xuICAgICAgfVxuICAgICAgLy8g6I635Y+W6Lez6L2s6aG16Z2i5p2l5rqQXG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKGNvZGUpID0+IHtcbiAgICAgICAgdGhpcy5qc2NvZGUgPSBjb2RlXG4gICAgICB9KVxuICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJykgPT09ICcnKSB7XG4gICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlU3luYygpXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgLy8gcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddXG4gICAgICAgICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlcigpXG4gICAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzojrflj5bmlrDnmoR0b2tlblxuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+mHjeaWsOaOiOadg+eZu+W9lScsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKSkge1xuICAgICAgICB0aGlzLmhhc1Bob25lID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYXNQaG9uZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=