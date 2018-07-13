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
      imageList: ['http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_01.jpg?', 'http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_02.jpg?', 'http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_03.jpg?', 'http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_04.jpg?', 'http://p33mnuvro.bkt.clouddn.com/image/webimg/vip_06.jpg?']
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
    }
  }]);

  return ApplyVip;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ApplyVip , 'pages/applyVip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwicGF5bWVudCIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsImltYWdlTGlzdCIsIm1ldGhvZHMiLCJpbWFnZUxvYWQiLCJidXlWaXAiLCJnb1J1bGVzIiwibmF2aWdhdGVUbyIsInVybCIsImdvU2VydmljZVJ1bGVzIiwicmFkaW9DaGFuZ2UiLCJlIiwiY2hvb3NlVHlwZSIsImluZGV4IiwiY2FuY2VsVGFwIiwiaW5pdERhdGEiLCJhcHBseSIsImNvbmZpcm1UYXAiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJfdGhpcyIsImFwcFR5cGUiLCJzb3VyY2VUeXBlIiwidHlwZSIsInNvdXJjZUlkIiwiaWQiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsIm1lbW9fbWFpbiIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlT3JkZXJCdXkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInNpZ25EYXRhIiwic2lnbiIsImdldFBheVNpZ24iLCJyZXF1ZXN0UGF5bWVudCIsImNvbnNvbGUiLCJsb2ciLCJlcnJNc2ciLCJnZXRVc2VyTGV2ZWwiLCJuYXZpZ2F0ZUJhY2siLCJwYXlGYWlsIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiR2V0U2VydmljZSIsImZvckVhY2giLCJpdGVtIiwib2JqIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsInB1c2giLCJnZXRTZXJ2aWNlIiwiJGFwcGx5IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJnbG9iYWxEYXRhIiwiZGF0ZUZvcm1hdCIsInJlZHVjdGlvbiIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzZMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLGlCQUFXLEVBSE47QUFJTEMsZUFBUyxDQUpKO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsZUFBUyxLQU5KO0FBT0xDLGtCQUFZLElBUFA7QUFRTEMsaUJBQVcsSUFSTjtBQVNMQyxjQUFRLEVBVEg7QUFVTEMsb0JBQWMsRUFWVDtBQVdMQyxpQkFBVyxDQVhOO0FBWUxDLGVBQVMsSUFaSjtBQWFMQyxpQkFBVyxFQWJOO0FBY0xDLGNBQVEsRUFkSDtBQWVMQyx5QkFBbUIsRUFmZDtBQWdCTEMscUJBQWUsRUFoQlY7QUFpQkxDLGlCQUFXLENBQUMsMkRBQUQsRUFBOEQsMkRBQTlELEVBQTJILDJEQUEzSCxFQUF3TCwyREFBeEwsRUFBcVAsMkRBQXJQO0FBakJOLEssU0FtQlBDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNLO0FBQ1gsYUFBS1gsU0FBTCxHQUFpQixLQUFqQjtBQUNELE9BSE87QUFJUlksWUFKUSxvQkFJRTtBQUNSLGFBQUtsQixNQUFMLEdBQWMsSUFBZDtBQUNELE9BTk87QUFPUm1CLGFBUFEscUJBT0c7QUFDVCx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQVhPO0FBWVJDLG9CQVpRLDRCQVlVO0FBQ2hCLHVCQUFLRixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFE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STs7a0JBQXRCNUYsUSIsImZpbGUiOiJhcHBseVZpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGx5VmlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Lya5ZGY5Lit5b+DJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaXNTaG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogJycsXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgdHlwZUxpc3Q6IFtdLFxuICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICByZXN1bHRMaXN0OiBudWxsLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgdmlwRW5kOiAnJyxcbiAgICAgIHZpcHJlZHVjdGlvbjogJycsXG4gICAgICB1c2VyTGV2ZWw6IDAsXG4gICAgICBwYXltZW50OiB0cnVlLFxuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJyxcbiAgICAgIGltYWdlTGlzdDogWydodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS9pbWFnZS93ZWJpbWcvdmlwXzAxLmpwZz8nLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vaW1hZ2Uvd2ViaW1nL3ZpcF8wMi5qcGc/JywgJ2h0dHA6Ly9wMzNtbnV2cm8uYmt0LmNsb3VkZG4uY29tL2ltYWdlL3dlYmltZy92aXBfMDMuanBnPycsICdodHRwOi8vcDMzbW51dnJvLmJrdC5jbG91ZGRuLmNvbS9pbWFnZS93ZWJpbWcvdmlwXzA0LmpwZz8nLCAnaHR0cDovL3AzM21udXZyby5ia3QuY2xvdWRkbi5jb20vaW1hZ2Uvd2ViaW1nL3ZpcF8wNi5qcGc/J11cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGltYWdlTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIH0sXG4gICAgICBidXlWaXAgKCkge1xuICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWVcbiAgICAgIH0sXG4gICAgICBnb1J1bGVzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3J1bGVzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvU2VydmljZVJ1bGVzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL3NlcnZpY2UnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgcmFkaW9DaGFuZ2UgKGUpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZFxuICAgICAgfSxcbiAgICAgIGNob29zZVR5cGUgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMucmVzdWx0TGlzdCA9IHRoaXMudHlwZUxpc3RbaW5kZXhdXG4gICAgICB9LFxuICAgICAgY2FuY2VsVGFwICgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YS5hcHBseSh0aGlzKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm1UYXAgKCkge1xuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgaWYgKHRoaXMucGF5bWVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBhcHBUeXBlOiAnbWluaUFwcCcsXG4gICAgICAgICAgICAgIHNvdXJjZVR5cGU6IHRoaXMucmVzdWx0TGlzdC50eXBlLFxuICAgICAgICAgICAgICBzb3VyY2VJZDogdGhpcy5yZXN1bHRMaXN0LmlkLFxuICAgICAgICAgICAgICBidXlDb3VudDogMSxcbiAgICAgICAgICAgICAgYWRkcmVzc19tYWluOiAnJyxcbiAgICAgICAgICAgICAgbWVtb19tYWluOiAnJyxcbiAgICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ3JlYXRlT3JkZXJCdXkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSBkYXRhLnRpbWVzdGFtcC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICAgIHZhciBwcmVwYXlpZCA9ICdwcmVwYXlfaWQ9JyArIGRhdGEucHJlcGF5aWRcbiAgICAgICAgICAgICAgICB2YXIgc2lnbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAnYXBwSWQnOiAnd3g0ZmFkZDM4NGIzOTY1OGNkJyxcbiAgICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiAnTUQ1J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2lnbiA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5nZXRQYXlTaWduKHNpZ25EYXRhKVxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBwcmVwYXlpZCxcbiAgICAgICAgICAgICAgICAgICdzaWduVHlwZSc6ICdNRDUnLFxuICAgICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBzaWduLFxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLfmlK/ku5jmiJDlip/ot7PovazpppbpobVcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckxldmVsKHRoaXMudG9rZW4sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+WPlua2iOaUr+S7mOi3s+i9rOiuouWNleWIl+ihqFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5wYXlGYWlsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucGF5RmFpbCgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBheW1lbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgIC8vIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wYXltZW50ID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WFiOmYheivu+OAiuS8muWRmOacjeWKoeWNj+iuruOAiycsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhICgpIHtcbiAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2VcbiAgICAgIHRoaXMucmVzdWx0TGlzdCA9IHRoaXMudHlwZUxpc3RbMF1cbiAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlXG4gICAgfVxuICAgIGdldFNlcnZpY2UgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIHRoaXMudHlwZUxpc3QgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgICAgIG9iai5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIG9iai50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBfdGhpcy50eXBlTGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLnJlc3VsdExpc3QgPSBfdGhpcy50eXBlTGlzdFswXVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRTZXJ2aWNlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMudXNlckxldmVsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnZpcEVuZCAqIDEwMDAsICdZLW0tZCcpXG4gICAgICB0aGlzLnZpcHJlZHVjdGlvbiA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnJlZHVjdGlvblxuICAgICAgdGhpcy5nZXRTZXJ2aWNlKClcbiAgICAgIHRoaXMubmlja19uYW1lID0gdGhpcy4kcGFyZW50LmdldFVzZXJOYW1lKClcbiAgICAgIHRoaXMuYXZhdGFyID0gdGhpcy4kcGFyZW50LmdldFVzZXJBdmF0YXIoKVxuICAgICAgdGhpcy5jdXN0b21lcl9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRNZXNzYWdlKClcbiAgICAgIHRoaXMubm90ZV9pbmZvX3N0ciA9IHRoaXMuJHBhcmVudC5nZXRCdXNpbmVzcygnVklQ55Sz6K+36YCA5Y2hJywgbnVsbCwgbnVsbClcbiAgICB9XG4gIH1cbiJdfQ==