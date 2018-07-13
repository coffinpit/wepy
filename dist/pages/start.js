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

var Start = function (_wepy$page) {
  _inherits(Start, _wepy$page);

  function Start() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Start);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Start.__proto__ || Object.getPrototypeOf(Start)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '欢迎'
    }, _this2.data = {
      codeText: '发送验证码',
      phoneNumber: '',
      code: '',
      myreg: /^[1][3,4,5,7,8][0-9]{9}$/,
      orderId: '',
      isSending: true,
      time: 60,
      isNull: true,
      countTime: '',
      jscode: '',
      hasPhone: false
    }, _this2.components = {
      loading: _loading2.default
    }, _this2.methods = {
      inputPhone: function inputPhone(e) {
        this.phoneNumber = e.detail.value;
        return this.phoneNumber;
      },
      blurPhone: function blurPhone(e) {
        this.phoneNumber = e.detail.value;
        return this.phoneNumber;
      },
      blurCode: function blurCode(e) {
        this.code = e.detail.value;
        return this.blurCode;
      },
      sendCode: function sendCode() {
        var _this3 = this;

        var _this = this;
        if (this.myreg.test(this.phoneNumber)) {
          if (this.isSending) {
            var data = {
              phone: this.phoneNumber
            };
            this.$parent.HttpRequest.GetSignCode(data).then(function (res) {
              console.log(res);
              if (res.data.error === 0) {
                _this.isSending = false;
                _this.countTime = setInterval(function () {
                  _this.time = _this.time - 1;
                  _this.codeText = _this3.time + 's';
                  if (_this.time <= 0) {
                    _this.time = 60;
                    _this.codeText = '发送验证码';
                    _this.isSending = true;
                    clearInterval(_this.countTime);
                  }
                  _this.$apply();
                }, 1000);
                _this.orderId = res.data.data.orderId;
              }
              _this.$apply();
            });
          }
        } else {
          _wepy2.default.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          });
        }
      },
      login: function login() {
        this.$parent.showLoading();
        var _this = this;
        var data = {
          orderId: this.orderId,
          identifyingCode: this.code
        };
        this.$parent.HttpRequest.LoginByPhone(data).then(function (res) {
          console.log(res);
          if (res.data.error === 0) {
            _this.$parent.hideLoading();
            var token = res.data.data.token;
            var timeOut = res.data.data.timeOut;
            _wepy2.default.setStorageSync('token', token);
            _wepy2.default.setStorageSync('phone', _this.phoneNumber);
            _wepy2.default.setStorageSync('timeout', timeOut);
            _this.$parent.getUserLevel(token);
            _this.hasPhone = true;
          } else {
            _this.$parent.hideLoading();
            _wepy2.default.showToast({
              title: '登录失败',
              icon: 'none',
              image: '../image/cancel.png'
            });
          }
        }).catch(function () {
          // _this.$parent.showFail()
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
                  if (res.data.error === 0) {
                    var data = {
                      phone: _wepy2.default.getStorageSync('phone')
                    };
                    _this4.$parent.requestToken(data, function () {
                      _this4.$parent.hideLoading();
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
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Start, [{
    key: 'goIndex',
    value: function goIndex() {
      _wepy2.default.switchTab({
        url: './index'
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this5 = this;

      if (_wepy2.default.getStorageSync('token')) {
        this.$parent.getUser();
        this.isNull = true;
        var data = {
          phone: _wepy2.default.getStorageSync('phone')
        };
        this.$parent.requestToken(data, function () {
          _this5.goIndex();
        });
      } else {
        this.isNull = false;
      }
      this.$apply();
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      clearInterval(this.countTime);
    }
  }]);

  return Start;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Start , 'pages/start'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LmpzIl0sIm5hbWVzIjpbIlN0YXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjb2RlVGV4dCIsInBob25lTnVtYmVyIiwiY29kZSIsIm15cmVnIiwib3JkZXJJZCIsImlzU2VuZGluZyIsInRpbWUiLCJpc051bGwiLCJjb3VudFRpbWUiLCJqc2NvZGUiLCJoYXNQaG9uZSIsImNvbXBvbmVudHMiLCJsb2FkaW5nIiwibWV0aG9kcyIsImlucHV0UGhvbmUiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJibHVyUGhvbmUiLCJibHVyQ29kZSIsInNlbmRDb2RlIiwiX3RoaXMiLCJ0ZXN0IiwicGhvbmUiLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJHZXRTaWduQ29kZSIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCIkYXBwbHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJsb2dpbiIsInNob3dMb2FkaW5nIiwiaWRlbnRpZnlpbmdDb2RlIiwiTG9naW5CeVBob25lIiwiaGlkZUxvYWRpbmciLCJ0b2tlbiIsInRpbWVPdXQiLCJzZXRTdG9yYWdlU3luYyIsImdldFVzZXJMZXZlbCIsImltYWdlIiwiY2F0Y2giLCJiaW5kR2V0VXNlckluZm8iLCJnZXRMb2dpbiIsImdldFNldHRpbmciLCJzdWNjZXNzIiwiYXV0aFNldHRpbmciLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJTZW5kVXNlckluZm8iLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3RUb2tlbiIsInN3aXRjaFRhYiIsInVybCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJnZXRVc2VyIiwiZ29JbmRleCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7dUxB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QUtuQyxPQUFMLENBQWFvQyxZQUFiLENBQTBCN0QsSUFBMUIsRUFBZ0MsWUFBTTtBQUNwQyxpQkFBS21FLE9BQUw7QUFDRCxTQUZEO0FBR0QsT0FURCxNQVNPO0FBQ0wsYUFBSzNELE1BQUwsR0FBYyxLQUFkO0FBQ0Q7QUFDRCxXQUFLMkIsTUFBTDtBQUNEOzs7K0JBQ1c7QUFDVkQsb0JBQWMsS0FBS3pCLFNBQW5CO0FBQ0Q7Ozs7RUE3SmdDLGVBQUsyRCxJOztrQkFBbkJ2RSxLIiwiZmlsZSI6InN0YXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+asoui/jidcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGNvZGVUZXh0OiAn5Y+R6YCB6aqM6K+B56CBJyxcbiAgICAgIHBob25lTnVtYmVyOiAnJyxcbiAgICAgIGNvZGU6ICcnLFxuICAgICAgbXlyZWc6IC9eWzFdWzMsNCw1LDcsOF1bMC05XXs5fSQvLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBpc1NlbmRpbmc6IHRydWUsXG4gICAgICB0aW1lOiA2MCxcbiAgICAgIGlzTnVsbDogdHJ1ZSxcbiAgICAgIGNvdW50VGltZTogJycsXG4gICAgICBqc2NvZGU6ICcnLFxuICAgICAgaGFzUGhvbmU6IGZhbHNlXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBsb2FkaW5nOiBMb2FkaW5nXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbnB1dFBob25lIChlKSB7XG4gICAgICAgIHRoaXMucGhvbmVOdW1iZXIgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy5waG9uZU51bWJlclxuICAgICAgfSxcbiAgICAgIGJsdXJQaG9uZSAoZSkge1xuICAgICAgICB0aGlzLnBob25lTnVtYmVyID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucGhvbmVOdW1iZXJcbiAgICAgIH0sXG4gICAgICBibHVyQ29kZSAoZSkge1xuICAgICAgICB0aGlzLmNvZGUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy5ibHVyQ29kZVxuICAgICAgfSxcbiAgICAgIHNlbmRDb2RlICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICBpZiAodGhpcy5teXJlZy50ZXN0KHRoaXMucGhvbmVOdW1iZXIpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTZW5kaW5nKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHRoaXMucGhvbmVOdW1iZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTaWduQ29kZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pc1NlbmRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICAgIF90aGlzLmNvdW50VGltZSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLnRpbWUgPSBfdGhpcy50aW1lIC0gMVxuICAgICAgICAgICAgICAgICAgX3RoaXMuY29kZVRleHQgPSB0aGlzLnRpbWUgKyAncydcbiAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aW1lIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGltZSA9IDYwXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvZGVUZXh0ID0gJ+WPkemAgemqjOivgeeggSdcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaXNTZW5kaW5nID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKF90aGlzLmNvdW50VGltZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICBfdGhpcy5vcmRlcklkID0gcmVzLmRhdGEuZGF0YS5vcmRlcklkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+3JyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsb2dpbiAoKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxuICAgICAgICAgIGlkZW50aWZ5aW5nQ29kZTogdGhpcy5jb2RlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkxvZ2luQnlQaG9uZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICAgICAgICAgIHZhciB0aW1lT3V0ID0gcmVzLmRhdGEuZGF0YS50aW1lT3V0XG4gICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncGhvbmUnLCBfdGhpcy5waG9uZU51bWJlcilcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnLCB0aW1lT3V0KVxuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodG9rZW4pXG4gICAgICAgICAgICBfdGhpcy5oYXNQaG9uZSA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJpbmRHZXRVc2VySW5mbyAoZSkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0TG9naW4oKGNvZGUpID0+IHtcbiAgICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAganNjb2RlOiB0aGlzLmpzY29kZSxcbiAgICAgICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICAgICAgICBpdjogZS5kZXRhaWwuaXZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LlNlbmRVc2VySW5mbyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucmVxdWVzdFRva2VuKGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmi5Lnu53mjojmnYPlsIbml6Dms5XmraPluLjkvb/nlKjlsI/nqIvluo/lhajpg6jlip/og73vvIzor7fph43mlrDlvIDlkK/mjojmnYMnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGdvSW5kZXggKCkge1xuICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyKClcbiAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5nb0luZGV4KClcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25VbmxvYWQgKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNvdW50VGltZSlcbiAgICB9XG4gIH1cbiJdfQ==