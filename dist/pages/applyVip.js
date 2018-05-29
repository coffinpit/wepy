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
      userLevel: 0
    }, _this2.methods = {
      imageLoad: function imageLoad() {
        this.isLoading = false;
      },
      buyVip: function buyVip() {
        this.isShow = true;
      },
      goRules: function goRules() {
        _wepy2.default.goRules({
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

        console.log(this.resultList);
        this.token = this.$parent.getToken();
        var _this = this;
        if (this.checked) {
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
                    _this3.$parent.getUserLevel(_this3.token);
                    _wepy2.default.switchTab({
                      url: './index'
                    });
                  } else if (res.errMsg === 'requestPayment:cancel') {
                    // 用户取消支付跳转订单列表
                    _this3.$parent.payFail();
                  }
                },
                'fail': function fail(res) {
                  _this3.$parent.payFail();
                },
                'complete': function complete(res) {}
              });
            } else {
              if (_this.$parent.missToken) {
                _this.token = _this3.$parent.getToken(res.data.error);
              }
            }
          });
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
      this.userLevel = this.$parent.globalData.userLevel;
      console.log(this.$parent.globalData.vipEnd);
      this.vipEnd = this.$parent.dateFormat(this.$parent.globalData.vipEnd * 1000, 'Y-m-d');
      this.vipreduction = this.$parent.globalData.reduction;
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
      this.getService();
    }
  }]);

  return ApplyVip;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ApplyVip , 'pages/applyVip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwibWV0aG9kcyIsImltYWdlTG9hZCIsImJ1eVZpcCIsImdvUnVsZXMiLCJ1cmwiLCJnb1NlcnZpY2VSdWxlcyIsIm5hdmlnYXRlVG8iLCJyYWRpb0NoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiY2hvb3NlVHlwZSIsImluZGV4IiwiY2FuY2VsVGFwIiwiaW5pdERhdGEiLCJhcHBseSIsImNvbmZpcm1UYXAiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJfdGhpcyIsImFwcFR5cGUiLCJzb3VyY2VUeXBlIiwidHlwZSIsInNvdXJjZUlkIiwiaWQiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsIm1lbW9fbWFpbiIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlT3JkZXJCdXkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImVyck1zZyIsImdldFVzZXJMZXZlbCIsInN3aXRjaFRhYiIsInBheUZhaWwiLCJtaXNzVG9rZW4iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJHZXRTZXJ2aWNlIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwicHVzaCIsImdldFNlcnZpY2UiLCIkYXBwbHkiLCJnbG9iYWxEYXRhIiwiZGF0ZUZvcm1hdCIsInJl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QU15QyxNQUFOO0FBQ0QsT0FuQkQ7QUFvQkQ7Ozs2QkFDUztBQUNSLFdBQUs5RCxTQUFMLEdBQWlCLEtBQUttQixPQUFMLENBQWE0QyxVQUFiLENBQXdCL0QsU0FBekM7QUFDQVUsY0FBUUMsR0FBUixDQUFZLEtBQUtRLE9BQUwsQ0FBYTRDLFVBQWIsQ0FBd0JqRSxNQUFwQztBQUNBLFdBQUtBLE1BQUwsR0FBYyxLQUFLcUIsT0FBTCxDQUFhNkMsVUFBYixDQUF3QixLQUFLN0MsT0FBTCxDQUFhNEMsVUFBYixDQUF3QmpFLE1BQXhCLEdBQWlDLElBQXpELEVBQStELE9BQS9ELENBQWQ7QUFDQSxXQUFLQyxZQUFMLEdBQW9CLEtBQUtvQixPQUFMLENBQWE0QyxVQUFiLENBQXdCRSxTQUE1QztBQUNBLFVBQUk1QyxRQUFRLElBQVo7QUFDQSxxQkFBSzZDLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVakMsR0FBVixFQUFlO0FBQ3RCYixnQkFBTTdCLFNBQU4sR0FBa0IwQyxJQUFJa0MsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS04sTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRCxVQUFMO0FBQ0Q7Ozs7RUFuS21DLGVBQUtRLEk7O2tCQUF0Qm5GLFEiLCJmaWxlIjoiYXBwbHlWaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBseVZpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+S8muWRmCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlzU2hvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6ICcnLFxuICAgICAgY3VycmVudDogMCxcbiAgICAgIHR5cGVMaXN0OiBbXSxcbiAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgcmVzdWx0TGlzdDogbnVsbCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHZpcEVuZDogJycsXG4gICAgICB2aXByZWR1Y3Rpb246ICcnLFxuICAgICAgdXNlckxldmVsOiAwXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbWFnZUxvYWQgKCkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgYnV5VmlwICgpIHtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHdlcHkuZ29SdWxlcyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1NlcnZpY2VSdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zZXJ2aWNlJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHJhZGlvQ2hhbmdlIChlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWRcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwpXG4gICAgICB9LFxuICAgICAgY2hvb3NlVHlwZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFtpbmRleF1cbiAgICAgIH0sXG4gICAgICBjYW5jZWxUYXAgKCkge1xuICAgICAgICB0aGlzLmluaXREYXRhLmFwcGx5KHRoaXMpXG4gICAgICB9LFxuICAgICAgY29uZmlybVRhcCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0TGlzdClcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCcsXG4gICAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnJlc3VsdExpc3QudHlwZSxcbiAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnJlc3VsdExpc3QuaWQsXG4gICAgICAgICAgICBidXlDb3VudDogMSxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogJycsXG4gICAgICAgICAgICBtZW1vX21haW46ICcnLFxuICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodGhpcy50b2tlbilcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZmFpbCc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb21wbGV0ZSc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flhYjpmIXor7vjgIrkvJrlkZjmnI3liqHljY/orq7jgIsnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlXG4gICAgICB0aGlzLnJlc3VsdExpc3QgPSB0aGlzLnR5cGVMaXN0WzBdXG4gICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZVxuICAgIH1cbiAgICBnZXRTZXJ2aWNlICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFNlcnZpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgICAgICBvYmoucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBvYmoudHlwZSA9IGl0ZW0uc291cmNlVHlwZVxuICAgICAgICAgICAgX3RoaXMudHlwZUxpc3QucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5yZXN1bHRMaXN0ID0gX3RoaXMudHlwZUxpc3RbMF1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5nZXRTZXJ2aWNlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudmlwRW5kKVxuICAgICAgdGhpcy52aXBFbmQgPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS52aXBFbmQgKiAxMDAwLCAnWS1tLWQnKVxuICAgICAgdGhpcy52aXByZWR1Y3Rpb24gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZWR1Y3Rpb25cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5nZXRTZXJ2aWNlKClcbiAgICB9XG4gIH1cbiJdfQ==