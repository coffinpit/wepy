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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwicGF5bWVudCIsIm1ldGhvZHMiLCJpbWFnZUxvYWQiLCJidXlWaXAiLCJnb1J1bGVzIiwidXJsIiwiZ29TZXJ2aWNlUnVsZXMiLCJuYXZpZ2F0ZVRvIiwicmFkaW9DaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNob29zZVR5cGUiLCJpbmRleCIsImNhbmNlbFRhcCIsImluaXREYXRhIiwiYXBwbHkiLCJjb25maXJtVGFwIiwiJHBhcmVudCIsImdldFRva2VuIiwiX3RoaXMiLCJhcHBUeXBlIiwic291cmNlVHlwZSIsInR5cGUiLCJzb3VyY2VJZCIsImlkIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJtZW1vX21haW4iLCJkYXRlX21haW4iLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsImVycm9yIiwidGltZVN0YW1wIiwidGltZXN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsIm5vbmNlc3RyIiwicHJlcGF5aWQiLCJzaWduRGF0YSIsInNpZ24iLCJnZXRQYXlTaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJnZXRVc2VyTGV2ZWwiLCJzd2l0Y2hUYWIiLCJwYXlGYWlsIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiR2V0U2VydmljZSIsImZvckVhY2giLCJpdGVtIiwib2JqIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsInB1c2giLCJnZXRTZXJ2aWNlIiwiJGFwcGx5IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJnbG9iYWxEYXRhIiwiZGF0ZUZvcm1hdCIsInJlZHVjdGlvbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzZMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLGlCQUFXLEVBSE47QUFJTEMsZUFBUyxDQUpKO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsZUFBUyxLQU5KO0FBT0xDLGtCQUFZLElBUFA7QUFRTEMsaUJBQVcsSUFSTjtBQVNMQyxjQUFRLEVBVEg7QUFVTEMsb0JBQWMsRUFWVDtBQVdMQyxpQkFBVyxDQVhOO0FBWUxDLGVBQVM7QUFaSixLLFNBY1BDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNLO0FBQ1gsYUFBS04sU0FBTCxHQUFpQixLQUFqQjtBQUNELE9BSE87QUFJUk8sWUFKUSxvQkFJRTtBQUNSLGFBQUtiLE1BQUwsR0FBYyxJQUFkO0FBQ0QsT0FOTztBQU9SYyxhQVBRLHFCQU9HO0FBQ1QsdUJBQUtBLE9BQUwsQ0FBYTtBQUNYQyxlQUFLO0FBRE0sU0FBYjtBQUdELE9BWE87QUFZUkMsb0JBWlEsNEJBWVU7QUFDaEIsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEYsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FoQk87QUFpQlJHLGlCQWpCUSx1QkFpQktDLENBakJMLEVBaUJRO0FBQ2QsYUFBS2YsT0FBTCxHQUFlLENBQUMsS0FBS0EsT0FBckI7QUFDQWdCLGdCQUFRQyxHQUFSLENBQVlGLEVBQUVHLE1BQWQ7QUFDRCxPQXBCTztBQXFCUkMsZ0JBckJRLHNCQXFCSUMsS0FyQkosRUFxQlc7QUFDakIsYUFBS3RCLE9BQUwsR0FBZXNCLEtBQWY7QUFDQSxhQUFLbkIsVUFBTCxHQUFrQixLQUFLRixRQUFMLENBQWNxQixLQUFkLENBQWxCO0FBQ0QsT0F4Qk87QUF5QlJDLGVBekJR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LEtBQU4sR0FBYyxPQUFLOEIsT0FBTCxDQUFhQyxRQUFiLENBQXNCYyxJQUFJOUMsSUFBSixDQUFTK0MsS0FBL0IsQ0FBZDtBQUNBZCxrQkFBTXdDLFVBQU47QUFDRDtBQUNGO0FBQ0R4QyxjQUFNeUMsTUFBTjtBQUNELE9BbkJEO0FBb0JEOzs7NkJBQ1M7QUFDUixVQUFJekMsUUFBUSxJQUFaO0FBQ0EscUJBQUswQyxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVTlCLEdBQVYsRUFBZTtBQUN0QmIsZ0JBQU05QixTQUFOLEdBQWtCMkMsSUFBSStCLFlBQUosR0FBbUIsSUFBckM7QUFDRDtBQUhnQixPQUFuQjtBQUtBLFdBQUtILE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBSy9ELFNBQUwsR0FBaUIsS0FBS29CLE9BQUwsQ0FBYStDLFVBQWIsQ0FBd0JuRSxTQUF6QztBQUNBLFdBQUtGLE1BQUwsR0FBYyxLQUFLc0IsT0FBTCxDQUFhZ0QsVUFBYixDQUF3QixLQUFLaEQsT0FBTCxDQUFhK0MsVUFBYixDQUF3QnJFLE1BQXhCLEdBQWlDLElBQXpELEVBQStELE9BQS9ELENBQWQ7QUFDQSxXQUFLQyxZQUFMLEdBQW9CLEtBQUtxQixPQUFMLENBQWErQyxVQUFiLENBQXdCRSxTQUE1QztBQUNBLFdBQUtQLFVBQUw7QUFDRDs7OztFQXZLbUMsZUFBS1EsSTs7a0JBQXRCcEYsUSIsImZpbGUiOiJhcHBseVZpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGx5VmlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55Sz6K+35Lya5ZGYJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaXNTaG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogJycsXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgdHlwZUxpc3Q6IFtdLFxuICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICByZXN1bHRMaXN0OiBudWxsLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgdmlwRW5kOiAnJyxcbiAgICAgIHZpcHJlZHVjdGlvbjogJycsXG4gICAgICB1c2VyTGV2ZWw6IDAsXG4gICAgICBwYXltZW50OiB0cnVlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbWFnZUxvYWQgKCkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgYnV5VmlwICgpIHtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHdlcHkuZ29SdWxlcyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1NlcnZpY2VSdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zZXJ2aWNlJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHJhZGlvQ2hhbmdlIChlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWRcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwpXG4gICAgICB9LFxuICAgICAgY2hvb3NlVHlwZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFtpbmRleF1cbiAgICAgIH0sXG4gICAgICBjYW5jZWxUYXAgKCkge1xuICAgICAgICB0aGlzLmluaXREYXRhLmFwcGx5KHRoaXMpXG4gICAgICB9LFxuICAgICAgY29uZmlybVRhcCAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJyxcbiAgICAgICAgICAgICAgc291cmNlVHlwZTogdGhpcy5yZXN1bHRMaXN0LnR5cGUsXG4gICAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnJlc3VsdExpc3QuaWQsXG4gICAgICAgICAgICAgIGJ1eUNvdW50OiAxLFxuICAgICAgICAgICAgICBhZGRyZXNzX21haW46ICcnLFxuICAgICAgICAgICAgICBtZW1vX21haW46ICcnLFxuICAgICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI6ZiF6K+744CK5Lya5ZGY5pyN5Yqh5Y2P6K6u44CLJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZVxuICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFswXVxuICAgICAgdGhpcy5jdXJyZW50ID0gMFxuICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2VcbiAgICB9XG4gICAgZ2V0U2VydmljZSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgdGhpcy50eXBlTGlzdCA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICAgICAgb2JqLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgb2JqLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIF90aGlzLnR5cGVMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMucmVzdWx0TGlzdCA9IF90aGlzLnR5cGVMaXN0WzBdXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuZ2V0U2VydmljZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgKyAncHgnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgdGhpcy52aXBFbmQgPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS52aXBFbmQgKiAxMDAwLCAnWS1tLWQnKVxuICAgICAgdGhpcy52aXByZWR1Y3Rpb24gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5yZWR1Y3Rpb25cbiAgICAgIHRoaXMuZ2V0U2VydmljZSgpXG4gICAgfVxuICB9XG4iXX0=