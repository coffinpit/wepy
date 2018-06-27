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
      customer_info_str: '',
      note_info_str: ''
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
                        // wepy.switchTab({
                        //   url: './index'
                        // })
                        _wepy2.default.navigateBack();
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
      this.customer_info_str = this.$parent.getMessage();
      this.note_info_str = this.$parent.getBusiness('VIP申请退卡', null, null);
    }
  }]);

  return ApplyVip;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ApplyVip , 'pages/applyVip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwicGF5bWVudCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsIm1ldGhvZHMiLCJpbWFnZUxvYWQiLCJidXlWaXAiLCJnb1J1bGVzIiwibmF2aWdhdGVUbyIsInVybCIsImdvU2VydmljZVJ1bGVzIiwicmFkaW9DaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNob29zZVR5cGUiLCJpbmRleCIsImNhbmNlbFRhcCIsImluaXREYXRhIiwiYXBwbHkiLCJjb25maXJtVGFwIiwiJHBhcmVudCIsImdldFRva2VuIiwiX3RoaXMiLCJhcHBUeXBlIiwic291cmNlVHlwZSIsInR5cGUiLCJzb3VyY2VJZCIsImlkIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJtZW1vX21haW4iLCJkYXRlX21haW4iLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJnZXRVc2VyTGV2ZWwiLCJuYXZpZ2F0ZUJhY2siLCJwYXlGYWlsIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiR2V0U2VydmljZSIsImZvckVhY2giLCJpdGVtIiwib2JqIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsInB1c2giLCJnZXRTZXJ2aWNlIiwiJGFwcGx5IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJnbG9iYWxEYXRhIiwiZGF0ZUZvcm1hdCIsInJlZHVjdGlvbiIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzZMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLGlCQUFXLEVBSE47QUFJTEMsZUFBUyxDQUpKO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsZUFBUyxLQU5KO0FBT0xDLGtCQUFZLElBUFA7QUFRTEMsaUJBQVcsSUFSTjtBQVNMQyxjQUFRLEVBVEg7QUFVTEMsb0JBQWMsRUFWVDtBQVdMQyxpQkFBVyxDQVhOO0FBWUxDLGVBQVMsSUFaSjtBQWFMQyxpQkFBVyxFQWJOO0FBY0xDLGNBQVEsRUFkSDtBQWVMQyx5QkFBbUIsRUFmZDtBQWdCTEMscUJBQWU7QUFoQlYsSyxTQWtCUEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0s7QUFDWCxhQUFLVixTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsT0FITztBQUlSVyxZQUpRLG9CQUlFO0FBQ1IsYUFBS2pCLE1BQUwsR0FBYyxJQUFkO0FBQ0QsT0FOTztBQU9Sa0IsYUFQUSxxQkFPRztBQUNULHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BWE87QUFZUkMsb0JBWlEsNEJBWVU7QUFDaEIsdUJBQUtGLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FoQk87QUFpQlJFLGlCQWpCUSx1QkFpQktDLENBakJMLEVBaUJRO0FBQ2QsYUFBS25CLE9BQUwsR0FBZSxDQUFDLEtBQUtB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QWIsRUFBekI7QUFDQSxXQUFLdkUsYUFBTCxHQUFxQixLQUFLbUIsT0FBTCxDQUFhcUQsV0FBYixDQUF5QixTQUF6QixFQUFvQyxJQUFwQyxFQUEwQyxJQUExQyxDQUFyQjtBQUNEOzs7O0VBaExtQyxlQUFLQyxJOztrQkFBdEI1RixRIiwiZmlsZSI6ImFwcGx5VmlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbHlWaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlLPor7fkvJrlkZgnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpc1Nob3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAnJyxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICB0eXBlTGlzdDogW10sXG4gICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgIHJlc3VsdExpc3Q6IG51bGwsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICB2aXBFbmQ6ICcnLFxuICAgICAgdmlwcmVkdWN0aW9uOiAnJyxcbiAgICAgIHVzZXJMZXZlbDogMCxcbiAgICAgIHBheW1lbnQ6IHRydWUsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG5vdGVfaW5mb19zdHI6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbWFnZUxvYWQgKCkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgYnV5VmlwICgpIHtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1NlcnZpY2VSdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zZXJ2aWNlJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHJhZGlvQ2hhbmdlIChlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWRcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwpXG4gICAgICB9LFxuICAgICAgY2hvb3NlVHlwZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFtpbmRleF1cbiAgICAgIH0sXG4gICAgICBjYW5jZWxUYXAgKCkge1xuICAgICAgICB0aGlzLmluaXREYXRhLmFwcGx5KHRoaXMpXG4gICAgICB9LFxuICAgICAgY29uZmlybVRhcCAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJyxcbiAgICAgICAgICAgICAgc291cmNlVHlwZTogdGhpcy5yZXN1bHRMaXN0LnR5cGUsXG4gICAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnJlc3VsdExpc3QuaWQsXG4gICAgICAgICAgICAgIGJ1eUNvdW50OiAxLFxuICAgICAgICAgICAgICBhZGRyZXNzX21haW46ICcnLFxuICAgICAgICAgICAgICBtZW1vX21haW46ICcnLFxuICAgICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI6ZiF6K+744CK5Lya5ZGY5pyN5Yqh5Y2P6K6u44CLJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZVxuICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFswXVxuICAgICAgdGhpcy5jdXJyZW50ID0gMFxuICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2VcbiAgICB9XG4gICAgZ2V0U2VydmljZSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgdGhpcy50eXBlTGlzdCA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICAgICAgb2JqLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgb2JqLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIF90aGlzLnR5cGVMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMucmVzdWx0TGlzdCA9IF90aGlzLnR5cGVMaXN0WzBdXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuZ2V0U2VydmljZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgKyAncHgnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy52aXBFbmQgPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS52aXBFbmQgKiAxMDAwLCAnWS1tLWQnKVxuICAgICAgdGhpcy52aXByZWR1Y3Rpb24gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZWR1Y3Rpb25cbiAgICAgIHRoaXMuZ2V0U2VydmljZSgpXG4gICAgICB0aGlzLm5pY2tfbmFtZSA9IHRoaXMuJHBhcmVudC5nZXRVc2VyTmFtZSgpXG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKClcbiAgICAgIHRoaXMuY3VzdG9tZXJfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgpXG4gICAgICB0aGlzLm5vdGVfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ1ZJUOeUs+ivt+mAgOWNoScsIG51bGwsIG51bGwpXG4gICAgfVxuICB9XG4iXX0=