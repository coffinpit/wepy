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
          _this.$parent.showFail();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LmpzIl0sIm5hbWVzIjpbIlN0YXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjb2RlVGV4dCIsInBob25lTnVtYmVyIiwiY29kZSIsIm15cmVnIiwib3JkZXJJZCIsImlzU2VuZGluZyIsInRpbWUiLCJpc051bGwiLCJjb3VudFRpbWUiLCJqc2NvZGUiLCJoYXNQaG9uZSIsImNvbXBvbmVudHMiLCJsb2FkaW5nIiwibWV0aG9kcyIsImlucHV0UGhvbmUiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJibHVyUGhvbmUiLCJibHVyQ29kZSIsInNlbmRDb2RlIiwiX3RoaXMiLCJ0ZXN0IiwicGhvbmUiLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJHZXRTaWduQ29kZSIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCIkYXBwbHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJsb2dpbiIsInNob3dMb2FkaW5nIiwiaWRlbnRpZnlpbmdDb2RlIiwiTG9naW5CeVBob25lIiwiaGlkZUxvYWRpbmciLCJ0b2tlbiIsInRpbWVPdXQiLCJzZXRTdG9yYWdlU3luYyIsImdldFVzZXJMZXZlbCIsImltYWdlIiwiY2F0Y2giLCJzaG93RmFpbCIsImJpbmRHZXRVc2VySW5mbyIsImdldExvZ2luIiwiZ2V0U2V0dGluZyIsInN1Y2Nlc3MiLCJhdXRoU2V0dGluZyIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsImVuY3J5cHRlZERhdGEiLCJpdiIsIlNlbmRVc2VySW5mbyIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdFRva2VuIiwic3dpdGNoVGFiIiwidXJsIiwic2hvd01vZGFsIiwiY29udGVudCIsImdldFVzZXIiLCJnb0luZGV4IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7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cUMsY0FBTCxDQUFvQixPQUFwQjtBQURFLFNBQVg7QUFHQSxhQUFLcEMsT0FBTCxDQUFhcUMsWUFBYixDQUEwQjlELElBQTFCLEVBQWdDLFlBQU07QUFDcEMsaUJBQUtvRSxPQUFMO0FBQ0QsU0FGRDtBQUdELE9BVEQsTUFTTztBQUNMLGFBQUs1RCxNQUFMLEdBQWMsS0FBZDtBQUNEO0FBQ0QsV0FBSzJCLE1BQUw7QUFDRDs7OytCQUNXO0FBQ1ZELG9CQUFjLEtBQUt6QixTQUFuQjtBQUNEOzs7O0VBN0pnQyxlQUFLNEQsSTs7a0JBQW5CeEUsSyIsImZpbGUiOiJzdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmrKLov44nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBjb2RlVGV4dDogJ+WPkemAgemqjOivgeeggScsXG4gICAgICBwaG9uZU51bWJlcjogJycsXG4gICAgICBjb2RlOiAnJyxcbiAgICAgIG15cmVnOiAvXlsxXVszLDQsNSw3LDhdWzAtOV17OX0kLyxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgaXNTZW5kaW5nOiB0cnVlLFxuICAgICAgdGltZTogNjAsXG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBjb3VudFRpbWU6ICcnLFxuICAgICAganNjb2RlOiAnJyxcbiAgICAgIGhhc1Bob25lOiBmYWxzZVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgbG9hZGluZzogTG9hZGluZ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgaW5wdXRQaG9uZSAoZSkge1xuICAgICAgICB0aGlzLnBob25lTnVtYmVyID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucGhvbmVOdW1iZXJcbiAgICAgIH0sXG4gICAgICBibHVyUGhvbmUgKGUpIHtcbiAgICAgICAgdGhpcy5waG9uZU51bWJlciA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzLnBob25lTnVtYmVyXG4gICAgICB9LFxuICAgICAgYmx1ckNvZGUgKGUpIHtcbiAgICAgICAgdGhpcy5jb2RlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMuYmx1ckNvZGVcbiAgICAgIH0sXG4gICAgICBzZW5kQ29kZSAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgaWYgKHRoaXMubXlyZWcudGVzdCh0aGlzLnBob25lTnVtYmVyKSkge1xuICAgICAgICAgIGlmICh0aGlzLmlzU2VuZGluZykge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHBob25lOiB0aGlzLnBob25lTnVtYmVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U2lnbkNvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaXNTZW5kaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3VudFRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBfdGhpcy50aW1lID0gX3RoaXMudGltZSAtIDFcbiAgICAgICAgICAgICAgICAgIF90aGlzLmNvZGVUZXh0ID0gdGhpcy50aW1lICsgJ3MnXG4gICAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGltZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRpbWUgPSA2MFxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb2RlVGV4dCA9ICflj5HpgIHpqozor4HnoIEnXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmlzU2VuZGluZyA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfdGhpcy5jb3VudFRpbWUpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgX3RoaXMub3JkZXJJZCA9IHJlcy5kYXRhLmRhdGEub3JkZXJJZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtycsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbG9naW4gKCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcbiAgICAgICAgICBpZGVudGlmeWluZ0NvZGU6IHRoaXMuY29kZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5Mb2dpbkJ5UGhvbmUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICB2YXIgdG9rZW4gPSByZXMuZGF0YS5kYXRhLnRva2VuXG4gICAgICAgICAgICB2YXIgdGltZU91dCA9IHJlcy5kYXRhLmRhdGEudGltZU91dFxuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Bob25lJywgX3RoaXMucGhvbmVOdW1iZXIpXG4gICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0aW1lb3V0JywgdGltZU91dClcbiAgICAgICAgICAgIF90aGlzLiRwYXJlbnQuZ2V0VXNlckxldmVsKHRva2VuKVxuICAgICAgICAgICAgX3RoaXMuaGFzUGhvbmUgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+eZu+W9leWksei0pScsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZS9jYW5jZWwucG5nJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiaW5kR2V0VXNlckluZm8gKGUpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LmdldExvZ2luKChjb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5qc2NvZGUgPSBjb2RlXG4gICAgICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgIGpzY29kZTogdGhpcy5qc2NvZGUsXG4gICAgICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgaXY6IGUuZGV0YWlsLml2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5TZW5kVXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwaG9uZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5q2j5bi45L2/55So5bCP56iL5bqP5YWo6YOo5Yqf6IO977yM6K+36YeN5paw5byA5ZCv5o6I5p2DJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBnb0luZGV4ICgpIHtcbiAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlcigpXG4gICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oZGF0YSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uVW5sb2FkICgpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jb3VudFRpbWUpXG4gICAgfVxuICB9XG4iXX0=