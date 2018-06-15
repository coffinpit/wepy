'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplyVip = function (_wepy$page) {
  _inherits(ApplyVip, _wepy$page);

  function ApplyVip() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, ApplyVip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = ApplyVip.__proto__ || Object.getPrototypeOf(ApplyVip)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '申请会员'
    }, _this2.data = {
      token: '',
      isShow: false,
      winHeight: '',
      current: 0,
      typeList: [],
      checked: false,
      resultList: null,
      isLoading: true,
      vipEnd: '',
      vipreduction: '',
      userLevel: 0,
      payment: true,
      nick_name: '',
      avatar: '',
      customer_info_str: ''
    }, _this2.methods = {
      imageLoad: function imageLoad() {
        this.isLoading = false;
      },
      buyVip: function buyVip() {
        this.isShow = true;
      },
      goRules: function goRules() {
        _wepy2.default.navigateTo({
          url: './rules'
        });
      },
      goServiceRules: function goServiceRules() {
        _wepy2.default.navigateTo({
          url: './service'
        });
      },
      radioChange: function radioChange(e) {
        this.checked = !this.checked;
        console.log(e.detail);
      },
      chooseType: function chooseType(index) {
        this.current = index;
        this.resultList = this.typeList[index];
      },
      cancelTap: function cancelTap() {
        this.initData.apply(this);
      },
      confirmTap: function confirmTap() {
        var _this3 = this;

        this.token = this.$parent.getToken();
        var _this = this;
        if (this.checked) {
          if (this.payment) {
            var data = {
              token: this.token,
              appType: 'miniApp',
              sourceType: this.resultList.type,
              sourceId: this.resultList.id,
              buyCount: 1,
              address_main: '',
              memo_main: '',
              date_main: 4
            };
            this.$parent.HttpRequest.CreateOrderBuy(data).then(function (res) {
              if (res.data.error === 0) {
                var data = res.data.data;
                var timeStamp = data.timestamp.toString();
                var nonceStr = data.noncestr;
                var prepayid = 'prepay_id=' + data.prepayid;
                var signData = {
                  'appId': 'wx4fadd384b39658cd',
                  'timeStamp': timeStamp,
                  'nonceStr': nonceStr,
                  'package': prepayid,
                  'signType': 'MD5'
                };
                var sign = _this3.$parent.HttpRequest.getPaySign(signData);
                _wepy2.default.requestPayment({
                  'timeStamp': timeStamp,
                  'nonceStr': nonceStr,
                  'package': prepayid,
                  'signType': 'MD5',
                  'paySign': sign,
                  'success': function success(res) {
                    console.log('success');
                    if (res.errMsg === 'requestPayment:ok') {
                      // 用户支付成功跳转首页
                      _this3.$parent.getUserLevel(_this3.token, function () {
                        _wepy2.default.switchTab({
                          url: './index'
                        });
                      });
                    } else if (res.errMsg === 'requestPayment:cancel') {
                      // 用户取消支付跳转订单列表
                      _this3.$parent.payFail();
                    }
                  },
                  'fail': function fail(res) {
                    _this3.$parent.payFail();
                  },
                  'complete': function complete(res) {
                    _this3.payment = true;
                  }
                });
              } else {
                if (_this.$parent.missToken) {
                  _this.token = _this3.$parent.getToken(res.data.error);
                }
              }
            });
          }
          this.payment = false;
        } else {
          _wepy2.default.showToast({
            title: '请先阅读《会员服务协议》',
            icon: 'none'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(ApplyVip, [{
    key: 'initData',
    value: function initData() {
      this.isShow = false;
      this.resultList = this.typeList[0];
      this.current = 0;
      this.checked = false;
    }
  }, {
    key: 'getService',
    value: function getService() {
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.initData();
      this.typeList = [];
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetService(data).then(function (res) {
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.title = item.productName;
            obj.price = item.price;
            obj.id = item.sourceId;
            obj.type = item.sourceType;
            _this.typeList.push(obj);
            _this.resultList = _this.typeList[0];
          });
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.getService();
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this = this;
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          _this.winHeight = res.windowHeight + 'px';
        }
      });
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.userLevel = this.$parent.globalData.userLevel;
      this.vipEnd = this.$parent.dateFormat(this.$parent.globalData.vipEnd * 1000, 'Y-m-d');
      this.vipreduction = this.$parent.globalData.reduction;
      this.getService();
      this.nick_name = this.$parent.getUserName();
      this.avatar = this.$parent.getUserAvatar();
      this.customer_info_str = this.$parent.getMessage('VIP申请退卡');
    }
  }]);

  return ApplyVip;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ApplyVip , 'pages/applyVip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwicGF5bWVudCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibWV0aG9kcyIsImltYWdlTG9hZCIsImJ1eVZpcCIsImdvUnVsZXMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29TZXJ2aWNlUnVsZXMiLCJyYWRpb0NoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiY2hvb3NlVHlwZSIsImluZGV4IiwiY2FuY2VsVGFwIiwiaW5pdERhdGEiLCJhcHBseSIsImNvbmZpcm1UYXAiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJfdGhpcyIsImFwcFR5cGUiLCJzb3VyY2VUeXBlIiwidHlwZSIsInNvdXJjZUlkIiwiaWQiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsIm1lbW9fbWFpbiIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlT3JkZXJCdXkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImVyck1zZyIsImdldFVzZXJMZXZlbCIsInN3aXRjaFRhYiIsInBheUZhaWwiLCJtaXNzVG9rZW4iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJHZXRTZXJ2aWNlIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwicHVzaCIsImdldFNlcnZpY2UiLCIkYXBwbHkiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsImdsb2JhbERhdGEiLCJkYXRlRm9ybWF0IiwicmVkdWN0aW9uIiwiZ2V0VXNlck5hbWUiLCJnZXRVc2VyQXZhdGFyIiwiZ2V0TWVzc2FnZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzZMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLGlCQUFXLEVBSE47QUFJTEMsZUFBUyxDQUpKO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsZUFBUyxLQU5KO0FBT0xDLGtCQUFZLElBUFA7QUFRTEMsaUJBQVcsSUFSTjtBQVNMQyxjQUFRLEVBVEg7QUFVTEMsb0JBQWMsRUFWVDtBQVdMQyxpQkFBVyxDQVhOO0FBWUxDLGVBQVMsSUFaSjtBQWFMQyxpQkFBVyxFQWJOO0FBY0xDLGNBQVEsRUFkSDtBQWVMQyx5QkFBbUI7QUFmZCxLLFNBaUJQQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUNYLGFBQUtULFNBQUwsR0FBaUIsS0FBakI7QUFDRCxPQUhPO0FBSVJVLFlBSlEsb0JBSUU7QUFDUixhQUFLaEIsTUFBTCxHQUFjLElBQWQ7QUFDRCxPQU5PO0FBT1JpQixhQVBRLHFCQU9HO0FBQ1QsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FYTztBQVlSQyxvQkFaUSw0QkFZVTtBQUNoQix1QkFBS0YsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQWhCTztBQWlCUkUsaUJBakJRLHVCQWlCS0MsQ0FqQkwsRUFpQlE7QUFDZCxhQUFLbEIsT0FBTCxHQUFlLENBQUMsS0FBS0EsT0FBckI7QUFDQW1CLGdCQUFRQyxHQUFSLENBQVlGLEVBQUVHLE1BQWQ7QUFDRCxPQXBC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QUFLQyxJOztrQkFBdEIxRixRIiwiZmlsZSI6ImFwcGx5VmlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbHlWaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlLPor7fkvJrlkZgnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpc1Nob3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAnJyxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICB0eXBlTGlzdDogW10sXG4gICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgIHJlc3VsdExpc3Q6IG51bGwsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICB2aXBFbmQ6ICcnLFxuICAgICAgdmlwcmVkdWN0aW9uOiAnJyxcbiAgICAgIHVzZXJMZXZlbDogMCxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgaW1hZ2VMb2FkICgpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgfSxcbiAgICAgIGJ1eVZpcCAoKSB7XG4gICAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TZXJ2aWNlUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc2VydmljZSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICByYWRpb0NoYW5nZSAoZSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkXG4gICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsKVxuICAgICAgfSxcbiAgICAgIGNob29zZVR5cGUgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMucmVzdWx0TGlzdCA9IHRoaXMudHlwZUxpc3RbaW5kZXhdXG4gICAgICB9LFxuICAgICAgY2FuY2VsVGFwICgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YS5hcHBseSh0aGlzKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm1UYXAgKCkge1xuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCcsXG4gICAgICAgICAgICAgIHNvdXJjZVR5cGU6IHRoaXMucmVzdWx0TGlzdC50eXBlLFxuICAgICAgICAgICAgICBzb3VyY2VJZDogdGhpcy5yZXN1bHRMaXN0LmlkLFxuICAgICAgICAgICAgICBidXlDb3VudDogMSxcbiAgICAgICAgICAgICAgYWRkcmVzc19tYWluOiAnJyxcbiAgICAgICAgICAgICAgbWVtb19tYWluOiAnJyxcbiAgICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlT3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckxldmVsKHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wYXltZW50ID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOmYheivu+OAiuS8muWRmOacjeWKoeWNj+iuruOAiycsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhICgpIHtcbiAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2VcbiAgICAgIHRoaXMucmVzdWx0TGlzdCA9IHRoaXMudHlwZUxpc3RbMF1cbiAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlXG4gICAgfVxuICAgIGdldFNlcnZpY2UgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIHRoaXMudHlwZUxpc3QgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgICAgIG9iai5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIG9iai50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBfdGhpcy50eXBlTGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLnJlc3VsdExpc3QgPSBfdGhpcy50eXBlTGlzdFswXVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmdldFNlcnZpY2UoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy51c2VyTGV2ZWwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgIHRoaXMudmlwRW5kID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudmlwRW5kICogMTAwMCwgJ1ktbS1kJylcbiAgICAgIHRoaXMudmlwcmVkdWN0aW9uID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVkdWN0aW9uXG4gICAgICB0aGlzLmdldFNlcnZpY2UoKVxuICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpXG4gICAgICB0aGlzLmN1c3RvbWVyX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoJ1ZJUOeUs+ivt+mAgOWNoScpXG4gICAgfVxuICB9XG4iXX0=