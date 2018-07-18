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
      navigationBarTitleText: '会员中心'
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
      note_info_str: '',
      imageList: ['http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_01.jpg', 'http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_02.jpg', 'http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_03.jpg', 'http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_04.jpg', 'http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_06.jpg']
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
                  // _this.token = this.$parent.getToken(res.data.error)
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
      for (var i = 0; i < this.imageList.length; i++) {
        this.imageList[i] += '?' + Math.random() / 9999;
      }
    }
  }]);

  return ApplyVip;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ApplyVip , 'pages/applyVip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwicGF5bWVudCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsImltYWdlTGlzdCIsIm1ldGhvZHMiLCJpbWFnZUxvYWQiLCJidXlWaXAiLCJnb1J1bGVzIiwibmF2aWdhdGVUbyIsInVybCIsImdvU2VydmljZVJ1bGVzIiwicmFkaW9DaGFuZ2UiLCJlIiwiY2hvb3NlVHlwZSIsImluZGV4IiwiY2FuY2VsVGFwIiwiaW5pdERhdGEiLCJhcHBseSIsImNvbmZpcm1UYXAiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJfdGhpcyIsImFwcFR5cGUiLCJzb3VyY2VUeXBlIiwidHlwZSIsInNvdXJjZUlkIiwiaWQiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsIm1lbW9fbWFpbiIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlT3JkZXJCdXkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImNvbnNvbGUiLCJsb2ciLCJlcnJNc2ciLCJnZXRVc2VyTGV2ZWwiLCJuYXZpZ2F0ZUJhY2siLCJwYXlGYWlsIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiR2V0U2VydmljZSIsImZvckVhY2giLCJpdGVtIiwib2JqIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsInB1c2giLCJnZXRTZXJ2aWNlIiwiJGFwcGx5IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJnbG9iYWxEYXRhIiwiZGF0ZUZvcm1hdCIsInJlZHVjdGlvbiIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsImkiLCJsZW5ndGgiLCJNYXRoIiwicmFuZG9tIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7NkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxjQUFRLEtBRkg7QUFHTEMsaUJBQVcsRUFITjtBQUlMQyxlQUFTLENBSko7QUFLTEMsZ0JBQVUsRUFMTDtBQU1MQyxlQUFTLEtBTko7QUFPTEMsa0JBQVksSUFQUDtBQVFMQyxpQkFBVyxJQVJOO0FBU0xDLGNBQVEsRUFUSDtBQVVMQyxvQkFBYyxFQVZUO0FBV0xDLGlCQUFXLENBWE47QUFZTEMsZUFBUyxJQVpKO0FBYUxDLGlCQUFXLEVBYk47QUFjTEMsY0FBUSxFQWRIO0FBZUxDLHlCQUFtQixFQWZkO0FBZ0JMQyxxQkFBZSxFQWhCVjtBQWlCTEMsaUJBQVcsQ0FBQywwREFBRCxFQUE2RCwwREFBN0QsRUFBeUgsMERBQXpILEVBQXFMLDBEQUFyTCxFQUFpUCwwREFBalA7QUFqQk4sSyxTQW1CUEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0s7QUFDWCxhQUFLWCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsT0FITztBQUlSWSxZQUpRLG9CQUlFO0FBQ1IsYUFBS2xCLE1BQUwsR0FBYyxJQUFkO0FBQ0QsT0FOTztBQU9SbUIsYUFQUSxxQkFPRztBQUNULHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BWE87QUFZUkMsb0JBWlEsNEJBWVU7QUFDaEIsdUJB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QyxDQUFyQjtBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUt4RSxTQUFMLENBQWV5RSxNQUFuQyxFQUEyQ0QsR0FBM0MsRUFBZ0Q7QUFDOUMsYUFBS3hFLFNBQUwsQ0FBZXdFLENBQWYsS0FBcUIsTUFBTUUsS0FBS0MsTUFBTCxLQUFnQixJQUEzQztBQUNEO0FBQ0Y7Ozs7RUFsTG1DLGVBQUtDLEk7O2tCQUF0QmhHLFEiLCJmaWxlIjoiYXBwbHlWaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBseVZpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8muWRmOS4reW/gydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlzU2hvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6ICcnLFxuICAgICAgY3VycmVudDogMCxcbiAgICAgIHR5cGVMaXN0OiBbXSxcbiAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgcmVzdWx0TGlzdDogbnVsbCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHZpcEVuZDogJycsXG4gICAgICB2aXByZWR1Y3Rpb246ICcnLFxuICAgICAgdXNlckxldmVsOiAwLFxuICAgICAgcGF5bWVudDogdHJ1ZSxcbiAgICAgIG5pY2tfbmFtZTogJycsXG4gICAgICBhdmF0YXI6ICcnLFxuICAgICAgY3VzdG9tZXJfaW5mb19zdHI6ICcnLFxuICAgICAgbm90ZV9pbmZvX3N0cjogJycsXG4gICAgICBpbWFnZUxpc3Q6IFsnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vaW1hZ2Uvd2ViaW1nL3ZpcF8wMS5qcGcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vaW1hZ2Uvd2ViaW1nL3ZpcF8wMi5qcGcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vaW1hZ2Uvd2ViaW1nL3ZpcF8wMy5qcGcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vaW1hZ2Uvd2ViaW1nL3ZpcF8wNC5qcGcnLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vaW1hZ2Uvd2ViaW1nL3ZpcF8wNi5qcGcnXVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgaW1hZ2VMb2FkICgpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgfSxcbiAgICAgIGJ1eVZpcCAoKSB7XG4gICAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TZXJ2aWNlUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc2VydmljZSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICByYWRpb0NoYW5nZSAoZSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkXG4gICAgICB9LFxuICAgICAgY2hvb3NlVHlwZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFtpbmRleF1cbiAgICAgIH0sXG4gICAgICBjYW5jZWxUYXAgKCkge1xuICAgICAgICB0aGlzLmluaXREYXRhLmFwcGx5KHRoaXMpXG4gICAgICB9LFxuICAgICAgY29uZmlybVRhcCAoKSB7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXltZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIGFwcFR5cGU6ICdtaW5pQXBwJyxcbiAgICAgICAgICAgICAgc291cmNlVHlwZTogdGhpcy5yZXN1bHRMaXN0LnR5cGUsXG4gICAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnJlc3VsdExpc3QuaWQsXG4gICAgICAgICAgICAgIGJ1eUNvdW50OiAxLFxuICAgICAgICAgICAgICBhZGRyZXNzX21haW46ICcnLFxuICAgICAgICAgICAgICBtZW1vX21haW46ICcnLFxuICAgICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSBkYXRhLm5vbmNlc3RyXG4gICAgICAgICAgICAgICAgdmFyIHByZXBheWlkID0gJ3ByZXBheV9pZD0nICsgZGF0YS5wcmVwYXlpZFxuICAgICAgICAgICAgICAgIHZhciBzaWduRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICdhcHBJZCc6ICd3eDRmYWRkMzg0YjM5NjU4Y2QnLFxuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzaWduID0gdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LmdldFBheVNpZ24oc2lnbkRhdGEpXG4gICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzogbm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHByZXBheWlkLFxuICAgICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgICAncGF5U2lnbic6IHNpZ24sXG4gICAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3JlcXVlc3RQYXltZW50Om9rJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+aUr+S7mOaIkOWKn+i3s+i9rOmmlumhtVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VyTGV2ZWwodGhpcy50b2tlbiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35Y+W5raI5pSv5LuY6Lez6L2s6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LnBheUZhaWwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2ZhaWwnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnY29tcGxldGUnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5bWVudCA9IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgICAgICAgLy8gX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBheW1lbnQgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI6ZiF6K+744CK5Lya5ZGY5pyN5Yqh5Y2P6K6u44CLJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZVxuICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFswXVxuICAgICAgdGhpcy5jdXJyZW50ID0gMFxuICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2VcbiAgICB9XG4gICAgZ2V0U2VydmljZSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgdGhpcy50eXBlTGlzdCA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICAgICAgb2JqLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgb2JqLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIF90aGlzLnR5cGVMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMucmVzdWx0TGlzdCA9IF90aGlzLnR5cGVMaXN0WzBdXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmdldFNlcnZpY2UoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy51c2VyTGV2ZWwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgIHRoaXMudmlwRW5kID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudmlwRW5kICogMTAwMCwgJ1ktbS1kJylcbiAgICAgIHRoaXMudmlwcmVkdWN0aW9uID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVkdWN0aW9uXG4gICAgICB0aGlzLmdldFNlcnZpY2UoKVxuICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpXG4gICAgICB0aGlzLmN1c3RvbWVyX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoKVxuICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCdWSVDnlLPor7fpgIDljaEnLCBudWxsLCBudWxsKVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmltYWdlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmltYWdlTGlzdFtpXSArPSAnPycgKyBNYXRoLnJhbmRvbSgpIC8gOTk5OVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19