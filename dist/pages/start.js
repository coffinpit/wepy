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
      isNull: true
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
                var countTime = setInterval(function () {
                  _this.time = _this.time - 1;
                  _this.codeText = _this3.time + 's';
                  if (_this.time <= 0) {
                    _this.time = 60;
                    _this.codeText = '发送验证码';
                    _this.isSending = true;
                    clearInterval(countTime);
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
            _this.$parent.showSuccess();
            var token = res.data.data.token;
            var timeOut = res.data.data.timeOut;
            _wepy2.default.setStorageSync('token', token);
            _wepy2.default.setStorageSync('phone', _this.phoneNumber);
            _wepy2.default.setStorageSync('timeout', timeOut);
            _this.$parent.getUserLevel(token);
            _this.goIndex();
          } else {
            _this.$parent.showSuccess();
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
  }]);

  return Start;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Start , 'pages/start'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LmpzIl0sIm5hbWVzIjpbIlN0YXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjb2RlVGV4dCIsInBob25lTnVtYmVyIiwiY29kZSIsIm15cmVnIiwib3JkZXJJZCIsImlzU2VuZGluZyIsInRpbWUiLCJpc051bGwiLCJjb21wb25lbnRzIiwibG9hZGluZyIsIm1ldGhvZHMiLCJpbnB1dFBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmx1clBob25lIiwiYmx1ckNvZGUiLCJzZW5kQ29kZSIsIl90aGlzIiwidGVzdCIsInBob25lIiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiR2V0U2lnbkNvZGUiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiY291bnRUaW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiJGFwcGx5Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibG9naW4iLCJzaG93TG9hZGluZyIsImlkZW50aWZ5aW5nQ29kZSIsIkxvZ2luQnlQaG9uZSIsInNob3dTdWNjZXNzIiwidG9rZW4iLCJ0aW1lT3V0Iiwic2V0U3RvcmFnZVN5bmMiLCJnZXRVc2VyTGV2ZWwiLCJnb0luZGV4IiwiaW1hZ2UiLCJjYXRjaCIsInNob3dGYWlsIiwic3dpdGNoVGFiIiwidXJsIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXF1ZXN0VG9rZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3VMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxPQURMO0FBRUxDLG1CQUFhLEVBRlI7QUFHTEMsWUFBTSxFQUhEO0FBSUxDLGFBQU8sMEJBSkY7QUFLTEMsZUFBUyxFQUxKO0FBTUxDLGlCQUFXLElBTk47QUFPTEMsWUFBTSxFQVBEO0FBUUxD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cEIsRUFBNkJ6QixNQUFNakIsV0FBbkM7QUFDQSwyQkFBSzBDLGNBQUwsQ0FBb0IsU0FBcEIsRUFBK0JELE9BQS9CO0FBQ0F4QixrQkFBTUcsT0FBTixDQUFjdUIsWUFBZCxDQUEyQkgsS0FBM0I7QUFDQXZCLGtCQUFNMkIsT0FBTjtBQUNELFdBVEQsTUFTTztBQUNMM0Isa0JBQU1HLE9BQU4sQ0FBY21CLFdBQWQ7QUFDQSwyQkFBS1AsU0FBTCxDQUFlO0FBQ2JDLHFCQUFPLE1BRE07QUFFYkMsb0JBQU0sTUFGTztBQUdiVyxxQkFBTztBQUhNLGFBQWY7QUFLRDtBQUNGLFNBbkJELEVBbUJHQyxLQW5CSCxDQW1CUyxZQUFNO0FBQ2I3QixnQkFBTUcsT0FBTixDQUFjMkIsUUFBZDtBQUNELFNBckJEO0FBc0JEO0FBNUVPLEs7Ozs7OzhCQThFQztBQUNULHFCQUFLQyxTQUFMLENBQWU7QUFDYkMsYUFBSztBQURRLE9BQWY7QUFHRDs7OzZCQUNTO0FBQUE7O0FBQ1IsVUFBSSxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBQUosRUFBa0M7QUFDaEMsYUFBSzVDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsWUFBSVIsT0FBTztBQUNUcUIsaUJBQU8sZUFBSytCLGNBQUwsQ0FBb0IsT0FBcEI7QUFERSxTQUFYO0FBR0EsYUFBSzlCLE9BQUwsQ0FBYStCLFlBQWIsQ0FBMEJyRCxJQUExQixFQUFnQyxZQUFNO0FBQ3BDLGlCQUFLOEMsT0FBTDtBQUNELFNBRkQ7QUFHRCxPQVJELE1BUU87QUFDTCxhQUFLdEMsTUFBTCxHQUFjLEtBQWQ7QUFDRDtBQUNELFdBQUt5QixNQUFMO0FBQ0Q7Ozs7RUFqSGdDLGVBQUtxQixJOztrQkFBbkJ6RCxLIiwiZmlsZSI6InN0YXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+asoui/jidcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGNvZGVUZXh0OiAn5Y+R6YCB6aqM6K+B56CBJyxcbiAgICAgIHBob25lTnVtYmVyOiAnJyxcbiAgICAgIGNvZGU6ICcnLFxuICAgICAgbXlyZWc6IC9eWzFdWzMsNCw1LDcsOF1bMC05XXs5fSQvLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBpc1NlbmRpbmc6IHRydWUsXG4gICAgICB0aW1lOiA2MCxcbiAgICAgIGlzTnVsbDogdHJ1ZVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgbG9hZGluZzogTG9hZGluZ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgaW5wdXRQaG9uZSAoZSkge1xuICAgICAgICB0aGlzLnBob25lTnVtYmVyID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucGhvbmVOdW1iZXJcbiAgICAgIH0sXG4gICAgICBibHVyUGhvbmUgKGUpIHtcbiAgICAgICAgdGhpcy5waG9uZU51bWJlciA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzLnBob25lTnVtYmVyXG4gICAgICB9LFxuICAgICAgYmx1ckNvZGUgKGUpIHtcbiAgICAgICAgdGhpcy5jb2RlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMuYmx1ckNvZGVcbiAgICAgIH0sXG4gICAgICBzZW5kQ29kZSAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgaWYgKHRoaXMubXlyZWcudGVzdCh0aGlzLnBob25lTnVtYmVyKSkge1xuICAgICAgICAgIGlmICh0aGlzLmlzU2VuZGluZykge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHBob25lOiB0aGlzLnBob25lTnVtYmVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U2lnbkNvZGUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaXNTZW5kaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB2YXIgY291bnRUaW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgX3RoaXMudGltZSA9IF90aGlzLnRpbWUgLSAxXG4gICAgICAgICAgICAgICAgICBfdGhpcy5jb2RlVGV4dCA9IHRoaXMudGltZSArICdzJ1xuICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnRpbWUgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aW1lID0gNjBcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29kZVRleHQgPSAn5Y+R6YCB6aqM6K+B56CBJ1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pc1NlbmRpbmcgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY291bnRUaW1lKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgICAgIF90aGlzLm9yZGVySWQgPSByZXMuZGF0YS5kYXRhLm9yZGVySWRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7cnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxvZ2luICgpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWQsXG4gICAgICAgICAgaWRlbnRpZnlpbmdDb2RlOiB0aGlzLmNvZGVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuTG9naW5CeVBob25lKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgICAgdmFyIHRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlblxuICAgICAgICAgICAgdmFyIHRpbWVPdXQgPSByZXMuZGF0YS5kYXRhLnRpbWVPdXRcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgdG9rZW4pXG4gICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwaG9uZScsIF90aGlzLnBob25lTnVtYmVyKVxuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndGltZW91dCcsIHRpbWVPdXQpXG4gICAgICAgICAgICBfdGhpcy4kcGFyZW50LmdldFVzZXJMZXZlbCh0b2tlbilcbiAgICAgICAgICAgIF90aGlzLmdvSW5kZXgoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGdvSW5kZXggKCkge1xuICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpKSB7XG4gICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHBhcmVudC5yZXF1ZXN0VG9rZW4oZGF0YSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=