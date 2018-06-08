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
      countTime: ''
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
            _this.goIndex();
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
      var _this4 = this;

      if (_wepy2.default.getStorageSync('token')) {
        this.isNull = true;
        var data = {
          phone: _wepy2.default.getStorageSync('phone')
        };
        this.$parent.requestToken(data, function () {
          _this4.goIndex();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LmpzIl0sIm5hbWVzIjpbIlN0YXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjb2RlVGV4dCIsInBob25lTnVtYmVyIiwiY29kZSIsIm15cmVnIiwib3JkZXJJZCIsImlzU2VuZGluZyIsInRpbWUiLCJpc051bGwiLCJjb3VudFRpbWUiLCJjb21wb25lbnRzIiwibG9hZGluZyIsIm1ldGhvZHMiLCJpbnB1dFBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmx1clBob25lIiwiYmx1ckNvZGUiLCJzZW5kQ29kZSIsIl90aGlzIiwidGVzdCIsInBob25lIiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiR2V0U2lnbkNvZGUiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiJGFwcGx5Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibG9naW4iLCJzaG93TG9hZGluZyIsImlkZW50aWZ5aW5nQ29kZSIsIkxvZ2luQnlQaG9uZSIsImhpZGVMb2FkaW5nIiwidG9rZW4iLCJ0aW1lT3V0Iiwic2V0U3RvcmFnZVN5bmMiLCJnZXRVc2VyTGV2ZWwiLCJnb0luZGV4IiwiaW1hZ2UiLCJjYXRjaCIsInNob3dGYWlsIiwic3dpdGNoVGFiIiwidXJsIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXF1ZXN0VG9rZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxPQURMO0FBRUxDLG1CQUFhLEVBRlI7QUFHTEMsWUFBTSxFQUhEO0FBSUxDLGFBQU8sMEJBSkY7QUFLTEMsZUFBUyxFQUxKO0FBTUxDLGlCQUFXLElBTk47QUFPTEMsWUFBTSxFQVBEO0FBUUxD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S0FBN0I7QUFDQSwyQkFBS0UsY0FBTCxDQUFvQixPQUFwQixFQUE2QnhCLE1BQU1sQixXQUFuQztBQUNBLDJCQUFLMEMsY0FBTCxDQUFvQixTQUFwQixFQUErQkQsT0FBL0I7QUFDQXZCLGtCQUFNRyxPQUFOLENBQWNzQixZQUFkLENBQTJCSCxLQUEzQjtBQUNBdEIsa0JBQU0wQixPQUFOO0FBQ0QsV0FURCxNQVNPO0FBQ0wxQixrQkFBTUcsT0FBTixDQUFja0IsV0FBZDtBQUNBLDJCQUFLUCxTQUFMLENBQWU7QUFDYkMscUJBQU8sTUFETTtBQUViQyxvQkFBTSxNQUZPO0FBR2JXLHFCQUFPO0FBSE0sYUFBZjtBQUtEO0FBQ0YsU0FuQkQsRUFtQkdDLEtBbkJILENBbUJTLFlBQU07QUFDYjVCLGdCQUFNRyxPQUFOLENBQWMwQixRQUFkO0FBQ0QsU0FyQkQ7QUFzQkQ7QUE1RU8sSzs7Ozs7OEJBOEVDO0FBQ1QscUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxhQUFLO0FBRFEsT0FBZjtBQUdEOzs7NkJBQ1M7QUFBQTs7QUFDUixVQUFJLGVBQUtDLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBSixFQUFrQztBQUNoQyxhQUFLNUMsTUFBTCxHQUFjLElBQWQ7QUFDQSxZQUFJUixPQUFPO0FBQ1RzQixpQkFBTyxlQUFLOEIsY0FBTCxDQUFvQixPQUFwQjtBQURFLFNBQVg7QUFHQSxhQUFLN0IsT0FBTCxDQUFhOEIsWUFBYixDQUEwQnJELElBQTFCLEVBQWdDLFlBQU07QUFDcEMsaUJBQUs4QyxPQUFMO0FBQ0QsU0FGRDtBQUdELE9BUkQsTUFRTztBQUNMLGFBQUt0QyxNQUFMLEdBQWMsS0FBZDtBQUNEO0FBQ0QsV0FBS3lCLE1BQUw7QUFDRDs7OytCQUNXO0FBQ1ZELG9CQUFjLEtBQUt2QixTQUFuQjtBQUNEOzs7O0VBckhnQyxlQUFLNkMsSTs7a0JBQW5CekQsSyIsImZpbGUiOiJzdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmrKLov44nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBjb2RlVGV4dDogJ+WPkemAgemqjOivgeeggScsXG4gICAgICBwaG9uZU51bWJlcjogJycsXG4gICAgICBjb2RlOiAnJyxcbiAgICAgIG15cmVnOiAvXlsxXVszLDQsNSw3LDhdWzAtOV17OX0kLyxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgaXNTZW5kaW5nOiB0cnVlLFxuICAgICAgdGltZTogNjAsXG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBjb3VudFRpbWU6ICcnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBsb2FkaW5nOiBMb2FkaW5nXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbnB1dFBob25lIChlKSB7XG4gICAgICAgIHRoaXMucGhvbmVOdW1iZXIgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy5waG9uZU51bWJlclxuICAgICAgfSxcbiAgICAgIGJsdXJQaG9uZSAoZSkge1xuICAgICAgICB0aGlzLnBob25lTnVtYmVyID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucGhvbmVOdW1iZXJcbiAgICAgIH0sXG4gICAgICBibHVyQ29kZSAoZSkge1xuICAgICAgICB0aGlzLmNvZGUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy5ibHVyQ29kZVxuICAgICAgfSxcbiAgICAgIHNlbmRDb2RlICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICBpZiAodGhpcy5teXJlZy50ZXN0KHRoaXMucGhvbmVOdW1iZXIpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTZW5kaW5nKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHRoaXMucGhvbmVOdW1iZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTaWduQ29kZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pc1NlbmRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICAgIF90aGlzLmNvdW50VGltZSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLnRpbWUgPSBfdGhpcy50aW1lIC0gMVxuICAgICAgICAgICAgICAgICAgX3RoaXMuY29kZVRleHQgPSB0aGlzLnRpbWUgKyAncydcbiAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aW1lIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGltZSA9IDYwXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvZGVUZXh0ID0gJ+WPkemAgemqjOivgeeggSdcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaXNTZW5kaW5nID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKF90aGlzLmNvdW50VGltZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICBfdGhpcy5vcmRlcklkID0gcmVzLmRhdGEuZGF0YS5vcmRlcklkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+3JyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsb2dpbiAoKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxuICAgICAgICAgIGlkZW50aWZ5aW5nQ29kZTogdGhpcy5jb2RlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkxvZ2luQnlQaG9uZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHJlcy5kYXRhLmRhdGEudG9rZW5cbiAgICAgICAgICAgIHZhciB0aW1lT3V0ID0gcmVzLmRhdGEuZGF0YS50aW1lT3V0XG4gICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncGhvbmUnLCBfdGhpcy5waG9uZU51bWJlcilcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3RpbWVvdXQnLCB0aW1lT3V0KVxuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodG9rZW4pXG4gICAgICAgICAgICBfdGhpcy5nb0luZGV4KClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlL2NhbmNlbC5wbmcnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBnb0luZGV4ICgpIHtcbiAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xuICAgICAgICB0aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgcGhvbmU6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Bob25lJylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRwYXJlbnQucmVxdWVzdFRva2VuKGRhdGEsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmdvSW5kZXgoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblVubG9hZCAoKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuY291bnRUaW1lKVxuICAgIH1cbiAgfVxuIl19