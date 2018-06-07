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
      payment: true
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
    }
  }]);

  return ApplyVip;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ApplyVip , 'pages/applyVip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwicGF5bWVudCIsIm1ldGhvZHMiLCJpbWFnZUxvYWQiLCJidXlWaXAiLCJnb1J1bGVzIiwibmF2aWdhdGVUbyIsInVybCIsImdvU2VydmljZVJ1bGVzIiwicmFkaW9DaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNob29zZVR5cGUiLCJpbmRleCIsImNhbmNlbFRhcCIsImluaXREYXRhIiwiYXBwbHkiLCJjb25maXJtVGFwIiwiJHBhcmVudCIsImdldFRva2VuIiwiX3RoaXMiLCJhcHBUeXBlIiwic291cmNlVHlwZSIsInR5cGUiLCJzb3VyY2VJZCIsImlkIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJtZW1vX21haW4iLCJkYXRlX21haW4iLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJnZXRVc2VyTGV2ZWwiLCJzd2l0Y2hUYWIiLCJwYXlGYWlsIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiR2V0U2VydmljZSIsImZvckVhY2giLCJpdGVtIiwib2JqIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsInB1c2giLCJnZXRTZXJ2aWNlIiwiJGFwcGx5IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJnbG9iYWxEYXRhIiwiZGF0ZUZvcm1hdCIsInJlZHVjdGlvbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzZMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLGlCQUFXLEVBSE47QUFJTEMsZUFBUyxDQUpKO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsZUFBUyxLQU5KO0FBT0xDLGtCQUFZLElBUFA7QUFRTEMsaUJBQVcsSUFSTjtBQVNMQyxjQUFRLEVBVEg7QUFVTEMsb0JBQWMsRUFWVDtBQVdMQyxpQkFBVyxDQVhOO0FBWUxDLGVBQVM7QUFaSixLLFNBY1BDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNLO0FBQ1gsYUFBS04sU0FBTCxHQUFpQixLQUFqQjtBQUNELE9BSE87QUFJUk8sWUFKUSxvQkFJRTtBQUNSLGFBQUtiLE1BQUwsR0FBYyxJQUFkO0FBQ0QsT0FOTztBQU9SYyxhQVBRLHFCQU9HO0FBQ1QsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FYTztBQVlSQyxvQkFaUSw0QkFZVTtBQUNoQix1QkFBS0YsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQWhCTztBQWlCUkUsaUJBakJRLHVCQWlCS0MsQ0FqQkwsRUFpQlE7QUFDZCxhQUFLZixPQUFMLEdBQWUsQ0FBQyxLQUFLQSxPQUFyQjtBQUNBZ0IsZ0JBQVFDLEdBQVIsQ0FBWUYsRUFBRUcsTUFBZDtBQUNELE9BcEJPO0FBcUJSQyxnQkFyQlEsc0JBcUJJQyxLQXJCSixFQXFCVztBQUNqQixhQUFLdEIsT0FBTCxHQUFlc0IsS0FBZjtBQUNBLGFBQUtuQixVQUFMLEdBQWtCLEtBQUtGLFFBQUwsQ0FBY3FCLEtBQWQsQ0FBbEI7QUFDRCxPQXhCTztBQXlCUkMsZUF6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aEMsS0FBTixHQUFjLE9BQUs4QixPQUFMLENBQWFDLFFBQWIsQ0FBc0JjLElBQUk5QyxJQUFKLENBQVMrQyxLQUEvQixDQUFkO0FBQ0FkLGtCQUFNd0MsVUFBTjtBQUNEO0FBQ0Y7QUFDRHhDLGNBQU15QyxNQUFOO0FBQ0QsT0FuQkQ7QUFvQkQ7Ozs2QkFDUztBQUNSLFVBQUl6QyxRQUFRLElBQVo7QUFDQSxxQkFBSzBDLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVOUIsR0FBVixFQUFlO0FBQ3RCYixnQkFBTTlCLFNBQU4sR0FBa0IyQyxJQUFJK0IsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS0gsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLL0QsU0FBTCxHQUFpQixLQUFLb0IsT0FBTCxDQUFhK0MsVUFBYixDQUF3Qm5FLFNBQXpDO0FBQ0EsV0FBS0YsTUFBTCxHQUFjLEtBQUtzQixPQUFMLENBQWFnRCxVQUFiLENBQXdCLEtBQUtoRCxPQUFMLENBQWErQyxVQUFiLENBQXdCckUsTUFBeEIsR0FBaUMsSUFBekQsRUFBK0QsT0FBL0QsQ0FBZDtBQUNBLFdBQUtDLFlBQUwsR0FBb0IsS0FBS3FCLE9BQUwsQ0FBYStDLFVBQWIsQ0FBd0JFLFNBQTVDO0FBQ0EsV0FBS1AsVUFBTDtBQUNEOzs7O0VBdkttQyxlQUFLUSxJOztrQkFBdEJwRixRIiwiZmlsZSI6ImFwcGx5VmlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbHlWaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlLPor7fkvJrlkZgnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpc1Nob3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAnJyxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICB0eXBlTGlzdDogW10sXG4gICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgIHJlc3VsdExpc3Q6IG51bGwsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICB2aXBFbmQ6ICcnLFxuICAgICAgdmlwcmVkdWN0aW9uOiAnJyxcbiAgICAgIHVzZXJMZXZlbDogMCxcbiAgICAgIHBheW1lbnQ6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGltYWdlTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIH0sXG4gICAgICBidXlWaXAgKCkge1xuICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWVcbiAgICAgIH0sXG4gICAgICBnb1J1bGVzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3J1bGVzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvU2VydmljZVJ1bGVzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3NlcnZpY2UnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgcmFkaW9DaGFuZ2UgKGUpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZFxuICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbClcbiAgICAgIH0sXG4gICAgICBjaG9vc2VUeXBlIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICB0aGlzLnJlc3VsdExpc3QgPSB0aGlzLnR5cGVMaXN0W2luZGV4XVxuICAgICAgfSxcbiAgICAgIGNhbmNlbFRhcCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEuYXBwbHkodGhpcylcbiAgICAgIH0sXG4gICAgICBjb25maXJtVGFwICgpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgIGlmICh0aGlzLnBheW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgYXBwVHlwZTogJ21pbmlBcHAnLFxuICAgICAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnJlc3VsdExpc3QudHlwZSxcbiAgICAgICAgICAgICAgc291cmNlSWQ6IHRoaXMucmVzdWx0TGlzdC5pZCxcbiAgICAgICAgICAgICAgYnV5Q291bnQ6IDEsXG4gICAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogJycsXG4gICAgICAgICAgICAgIG1lbW9fbWFpbjogJycsXG4gICAgICAgICAgICAgIGRhdGVfbWFpbjogNFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNyZWF0ZU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgICB2YXIgdGltZVN0YW1wID0gZGF0YS50aW1lc3RhbXAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIHZhciBub25jZVN0ciA9IGRhdGEubm9uY2VzdHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgICAgdmFyIHNpZ25EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgJ2FwcElkJzogJ3d4NGZhZGQzODRiMzk2NThjZCcsXG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuZ2V0UGF5U2lnbihzaWduRGF0YSlcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6b2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJMZXZlbCh0aGlzLnRva2VuLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50OmNhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnZmFpbCc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdjb21wbGV0ZSc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucGF5bWVudCA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flhYjpmIXor7vjgIrkvJrlkZjmnI3liqHljY/orq7jgIsnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlXG4gICAgICB0aGlzLnJlc3VsdExpc3QgPSB0aGlzLnR5cGVMaXN0WzBdXG4gICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZVxuICAgIH1cbiAgICBnZXRTZXJ2aWNlICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFNlcnZpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgICAgICBvYmoucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBvYmoudHlwZSA9IGl0ZW0uc291cmNlVHlwZVxuICAgICAgICAgICAgX3RoaXMudHlwZUxpc3QucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5yZXN1bHRMaXN0ID0gX3RoaXMudHlwZUxpc3RbMF1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5nZXRTZXJ2aWNlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZLW0tZCcpXG4gICAgICB0aGlzLnZpcHJlZHVjdGlvbiA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlZHVjdGlvblxuICAgICAgdGhpcy5nZXRTZXJ2aWNlKClcbiAgICB9XG4gIH1cbiJdfQ==