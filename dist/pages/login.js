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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJvdmVyZmxvdyIsImhhc1Bob25lIiwiY29tcG9uZW50cyIsImxvYWRpbmciLCJtZXRob2RzIiwiY2hhbmdlTG9naW4iLCJlIiwiY29uc29sZSIsImxvZyIsImxvZ2luIiwiZGV0YWlsIiwiZW5jcnlwdGVkRGF0YSIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsIiRhcHBseSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImJpbmRHZXRVc2VySW5mbyIsImdldExvZ2luIiwiY29kZSIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJpdiIsIkh0dHBSZXF1ZXN0IiwiU2VuZFVzZXJJbmZvIiwidGhlbiIsInNob3dMb2FkaW5nIiwiZXJyb3IiLCJwaG9uZSIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdFRva2VuIiwiaGlkZUxvYWRpbmciLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwibGVuZ3RoIiwibmF2aWdhdGVCYWNrIiwiZ29JbmRleCIsInN3aXRjaFRhYiIsInVybCIsInBhcmFtIiwiZ2V0VXNlciIsInNob3dUb2FzdCIsImljb24iLCJpbWFnZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxjQUFRLElBRkg7QUFHTEMsb0JBQWMsRUFIVDtBQUlMQyxnQkFBVSxLQUpMO0FBS0xDLGdCQUFVO0FBTEwsSyxRQU9QQyxVLEdBQWE7QUFDWEM7QUFEVyxL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LGVBQUt0QixNQUFMLEdBQWNzQixJQUFkO0FBQ0QsT0FGRDtBQUdBLHFCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEI7QUFDQSxjQUFJLGVBQUtXLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBSixFQUFrQztBQUNoQyxtQkFBS3RCLE9BQUwsQ0FBYWtDLE9BQWI7QUFDQSxtQkFBS2pELE1BQUwsR0FBYyxJQUFkO0FBQ0E7QUFDQSxnQkFBSUQsT0FBTztBQUNUcUMscUJBQU8sZUFBS0MsY0FBTCxDQUFvQixPQUFwQjtBQURFLGFBQVg7QUFHQSxtQkFBS3RCLE9BQUwsQ0FBYXVCLFlBQWIsQ0FBMEJ2QyxJQUExQixFQUFnQyxZQUFNO0FBQ3BDLHFCQUFLOEMsT0FBTDtBQUNELGFBRkQsRUFFRyxZQUFNO0FBQ1AsNkJBQUtLLFNBQUwsQ0FBZTtBQUNiL0IsdUJBQU8sU0FETTtBQUViZ0Msc0JBQU0sTUFGTztBQUdiQyx1QkFBTztBQUhNLGVBQWY7QUFLRCxhQVJEO0FBU0QsV0FoQkQsTUFnQk87QUFDTCxtQkFBS3BELE1BQUwsR0FBYyxLQUFkO0FBQ0Q7QUFDRCxpQkFBS2lCLE1BQUw7QUFDRDtBQXZCYSxPQUFoQjtBQXlCRDs7OzZCQUNTO0FBQ1IsVUFBSSxlQUFLb0IsY0FBTCxDQUFvQixPQUFwQixDQUFKLEVBQWtDO0FBQ2hDLGFBQUtqQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS0EsUUFBTCxHQUFnQixLQUFoQjtBQUNEO0FBQ0Y7Ozs7RUE3SGdDLGVBQUtpRCxJOztrQkFBbkJ6RCxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUqOaIt+eZu+W9lSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGpzY29kZTogbnVsbCxcbiAgICAgIHJlZnJlbmNlQ29kZTogJycsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICBoYXNQaG9uZTogZmFsc2VcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGxvYWRpbmc6IExvYWRpbmdcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoYW5nZUxvZ2luIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9LFxuICAgICAgbG9naW4gKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLmVuY3J5cHRlZERhdGEpIHtcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oZSwgdGhpcy5qc2NvZGUsIHRoaXMucmVmcmVuY2VDb2RlLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgLy8gICB1cmw6ICcuL2dldFVzZXJJbmZvJ1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIHRoaXMuaGFzUGhvbmUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5q2j5bi45L2/55So5bCP56iL5bqP5YWo6YOo5Yqf6IO977yM6K+36YeN5paw5byA5ZCv5o6I5p2DJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBiaW5kR2V0VXNlckluZm8gKGUpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LmdldExvZ2luKChjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5qc2NvZGUgPSBjb2RlXG4gICAgICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgIGpzY29kZTogdGhpcy5qc2NvZGUsXG4gICAgICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgaXY6IGUuZGV0YWlsLml2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZW5kVXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldlBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogJ+aLkue7neaOiOadg+WwhuaXoOazleato+W4uOS9v+eUqOWwj+eoi+W6j+WFqOmDqOWKn+iDve+8jOivt+mHjeaWsOW8gOWQr+aOiOadgydcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZ29JbmRleCAoKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gcGFyYW0ucmVmcmVuY2VDb2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9ICcnXG4gICAgICB9XG4gICAgICAvLyDojrflj5bot7PovazpobXpnaLmnaXmupBcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgIH0pXG4gICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgLy8gcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddXG4gICAgICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyKClcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+mHjeaWsOaOiOadg+eZu+W9lScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJykpIHtcbiAgICAgICAgdGhpcy5oYXNQaG9uZSA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGFzUGhvbmUgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19