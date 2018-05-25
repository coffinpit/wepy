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
      vipEnd: '1526611071',
      vipreduction: '123.00',
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
            appType: 'ios',
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
              var paySign = data.sign;
              console.log(prepayid);
              _wepy2.default.requestPayment({
                'timeStamp': timeStamp,
                'nonceStr': nonceStr,
                'package': prepayid,
                'signType': 'MD5',
                'paySign': paySign,
                'success': function success(res) {
                  console.log('success');
                  if (res.errMsg === 'requestPayment:ok') {
                    // 用户支付成功跳转首页
                    _wepy2.default.switchTab({
                      url: './index'
                    });
                  } else if (res.errMsg === 'requestPayment:cancel') {
                    // 用户取消支付跳转订单列表
                    _wepy2.default.showModal({
                      title: '提示',
                      content: '支付失败',
                      showCancel: false,
                      success: function success(res) {
                        if (res.confirm) {
                          _wepy2.default.redirectTo({
                            url: './order'
                          });
                        }
                      }
                    });
                  }
                },
                'fail': function fail(res) {
                  console.log('fail');
                },
                'complete': function complete(res) {
                  console.log('complete');
                }
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
      console.log(this.userLevel);
      this.vipEnd = this.$parent.dateFormat(this.vipEnd * 1000, 'Y-m-d');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwibWV0aG9kcyIsImltYWdlTG9hZCIsImJ1eVZpcCIsImdvUnVsZXMiLCJ1cmwiLCJnb1NlcnZpY2VSdWxlcyIsIm5hdmlnYXRlVG8iLCJyYWRpb0NoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiY2hvb3NlVHlwZSIsImluZGV4IiwiY2FuY2VsVGFwIiwiaW5pdERhdGEiLCJhcHBseSIsImNvbmZpcm1UYXAiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJfdGhpcyIsImFwcFR5cGUiLCJzb3VyY2VUeXBlIiwidHlwZSIsInNvdXJjZUlkIiwiaWQiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsIm1lbW9fbWFpbiIsImRhdGVfbWFpbiIsIkh0dHBSZXF1ZXN0IiwiQ3JlYXRlT3JkZXJCdXkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJ0aW1lU3RhbXAiLCJ0aW1lc3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwibm9uY2VzdHIiLCJwcmVwYXlpZCIsInBheVNpZ24iLCJzaWduIiwicmVxdWVzdFBheW1lbnQiLCJlcnJNc2ciLCJzd2l0Y2hUYWIiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwiaWNvbiIsIkdldFNlcnZpY2UiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJwdXNoIiwiZ2V0U2VydmljZSIsIiRhcHBseSIsImdsb2JhbERhdGEiLCJkYXRlRm9ybWF0IiwiZ2V0U3lzdGVtSW5mbyIsIndpbmRvd0hlaWdodCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzZMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLGlCQUFXLEVBSE47QUFJTEMsZUFBUyxDQUpKO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsZUFBUyxLQU5KO0FBT0xDLGtCQUFZLElBUFA7QUFRTEMsaUJBQVcsSUFSTjtBQVNMQyxjQUFRLFlBVEg7QUFVTEMsb0JBQWMsUUFWVDtBQVdMQyxpQkFBVztBQVhOLEssU0FhUEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0s7QUFDWCxhQUFLTCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsT0FITztBQUlSTSxZQUpRLG9CQUlFO0FBQ1IsYUFBS1osTUFBTCxHQUFjLElBQWQ7QUFDRCxPQU5PO0FBT1JhLGFBUFEscUJBT0c7QUFDVCx1QkFBS0EsT0FBTCxDQUFhO0FBQ1hDLGVBQUs7QUFETSxTQUFiO0FBR0QsT0FYTztBQVlSQyxvQkFaUSw0QkFZVTtBQUNoQix1QkFBS0MsVUFBTCxDQUFnQjtBQUNkRixlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQWhCTztBQWlCUkcsaUJBakJRLHVCQWlCS0MsQ0FqQkwsRUFpQlE7QUFDZCxhQUFLZCxPQUFMLEdBQWUsQ0FBQyxLQUFLQSxPQUFyQjtBQUNBZSxnQkFBUUMsR0FBUixDQUFZRixFQUFFRyxNQUFkO0FBQ0QsT0FwQk87QUFxQlJDLGdCQXJCUSxzQkFxQklDLEtBckJKLEVBcUJXO0FBQ2pCLGFBQUtyQixPQUFMLEdBQWVxQixLQUFmO0FBQ0EsYUFBS2xCLFVBQUwsR0FBa0IsS0FBS0YsUUFBTCxDQUFjb0IsS0FBZCxDQUFsQjtBQUNELE9BeEJPO0FBeUJSQyxlQXpCUSx1QkF5Qks7QUFDWCxhQUFLQyxRQUFMLENBQWNDLEtBQWQsQ0FBb0IsSUFBcEI7QUFDRCxPQTNCTztBQTRCUkMsZ0JBNUJRLHdCQTRCTTtBQUFBOztBQUNaUixnQkFBUUMsR0FBUixDQUFZLEtBQUtmLFVBQWpCO0FBQ0EsYUFBS04sS0FBTCxHQUFhLEtBQUs2QixPQUFMLENBQWFDLFFBQWIsRUFBYjtBQUNBLFlBQUlDLFFBQVEsSUFBWjtBQUNBLFlBQUksS0FBSzFCLE9BQVQsRUFBa0I7QUFDaEIsY0FBSU4sT0FBTztBQUNUQyxtQkFBTyxLQUFLQSxLQURIO0FBRVRnQyxxQkFBUyxLQUZBO0FBR1RDLHdCQUFZLEtBQUszQixVQUFMLENBQWdCNEIsSUFIbkI7QUFJVEMsc0JBQVUsS0FBSzdCLFVBQUwsQ0FBZ0I4QixFQUpqQjtBQUtUQyxzQkFBVSxDQUxEO0FBTVRDLDBCQUFjLEVBTkw7QUFPVEMsdUJBQVcsRUFQRjtBQVFUQyx1QkFBVztBQVJGLFdBQVg7QUFVQSxlQUFLWCxPQUFMLENBQWFZLFdBQWIsQ0FBeUJDLGNBQXpCLENBQXdDM0MsSUFBeEMsRUFBOEM0QyxJQUE5QyxDQUFtRCxVQUFDQyxHQUFELEVBQVM7QUFDMUQsZ0JBQUlBLElBQUk3QyxJQUFKLENBQVM4QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGtCQUFJOUMsT0FBTzZDLElBQUk3QyxJQUFKLENBQVNBLElBQXBCO0FBQ0Esa0JBQUkrQyxZQUFZL0MsS0FBS2dELFNBQUwsQ0FBZUMsUUFBZixFQUFoQjtBQUNBLGtCQUFJQyxXQUFXbEQsS0FBS21ELFFBQXBCO0FBQ0Esa0JBQUlDLFdBQVcsZUFBZXBELEtBQUtvRCxRQUFuQztBQUNBLGtCQUFJQyxVQUFVckQsS0FBS3NELElBQW5CO0FBQ0FqQyxzQkFBUUMsR0FBUixDQUFZOEIsUUFBWjtBQUNBLDZCQUFLRyxjQUFMLENBQW9CO0FBQ2xCLDZCQUFhUixTQURLO0FBRWxCLDRCQUFZRyxRQUZNO0FBR2xCLDJCQUFXRSxRQUhPO0FBSWxCLDRCQUFZLEtBSk07QUFLbEIsMkJBQVdDLE9BTE87QUFNbEIsMkJBQVcsaUJBQUNSLEdBQUQsRUFBUztBQUNsQnhCLDBCQUFRQyxHQUFSLENBQVksU0FBWjtBQUNBLHNCQUFJdUIsSUFBSVcsTUFBSixLQUFlLG1CQUFuQixFQUF3QztBQUN0QztBQUNBLG1DQUFLQyxTQUFMLENBQWU7QUFDYnpDLDJCQUFLO0FBRFEscUJBQWY7QUFHRCxtQkFMRCxNQUtPLElBQUk2QixJQUFJVyxNQUFKLEtBQWUsdUJBQW5CLEVBQTRDO0FBQ2pEO0FBQ0EsbUNBQUtFLFNBQUwsQ0FBZTtBQUNiQyw2QkFBTyxJQURNO0FBRWJDLCtCQUFTLE1BRkk7QUFHYkMsa0NBQVksS0FIQztBQUliQywrQkFBUyxpQkFBQ2pCLEdBQUQsRUFBUztBQUNoQiw0QkFBSUEsSUFBSWtCLE9BQVIsRUFBaUI7QUFDZix5Q0FBS0MsVUFBTCxDQUFnQjtBQUNkaEQsaUNBQUs7QUFEUywyQkFBaEI7QUFHRDtBQUNGO0FBVlkscUJBQWY7QUFZRDtBQUNGLGlCQTVCaUI7QUE2QmxCLHdCQUFRLGNBQUM2QixHQUFELEVBQVM7QUFDZnhCLDBCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNELGlCQS9CaUI7QUFnQ2xCLDRCQUFZLGtCQUFDdUIsR0FBRCxFQUFTO0FBQ25CeEIsMEJBQVFDLEdBQVIsQ0FBWSxVQUFaO0FBQ0Q7QUFsQ2lCLGVBQXBCO0FBb0NELGFBM0NELE1BMkNPO0FBQ0wsa0JBQUlVLE1BQU1GLE9BQU4sQ0FBY21DLFNBQWxCLEVBQTZCO0FBQzNCakMsc0JBQU0vQixLQUFOLEdBQWMsT0FBSzZCLE9BQUwsQ0FBYUMsUUFBYixDQUFzQmMsSUFBSTdDLElBQUosQ0FBUzhDLEtBQS9CLENBQWQ7QUFDRDtBQUNGO0FBQ0YsV0FqREQ7QUFrREQsU0E3REQsTUE2RE87QUFDTCx5QkFBS29CLFNBQUwsQ0FBZTtBQUNiUCxtQkFBTyxjQURNO0FBRWJRLGtCQUFNO0FBRk8sV0FBZjtBQUlEO0FBQ0Y7QUFuR08sSzs7Ozs7K0JBcUdFO0FBQ1YsV0FBS2pFLE1BQUwsR0FBYyxLQUFkO0FBQ0EsV0FBS0ssVUFBTCxHQUFrQixLQUFLRixRQUFMLENBQWMsQ0FBZCxDQUFsQjtBQUNBLFdBQUtELE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS0UsT0FBTCxHQUFlLEtBQWY7QUFDRDs7O2lDQUNhO0FBQUE7O0FBQ1osV0FBS0wsS0FBTCxHQUFhLEtBQUs2QixPQUFMLENBQWFDLFFBQWIsRUFBYjtBQUNBLFdBQUtKLFFBQUw7QUFDQSxXQUFLdEIsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFVBQUkyQixRQUFRLElBQVo7QUFDQSxVQUFJaEMsT0FBTztBQUNUQyxlQUFPLEtBQUtBO0FBREgsT0FBWDtBQUdBLFdBQUs2QixPQUFMLENBQWFZLFdBQWIsQ0FBeUIwQixVQUF6QixDQUFvQ3BFLElBQXBDLEVBQTBDNEMsSUFBMUMsQ0FBK0MsVUFBQ0MsR0FBRCxFQUFTO0FBQ3RELFlBQUlBLElBQUk3QyxJQUFKLENBQVM4QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUk5QyxPQUFPNkMsSUFBSTdDLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsZUFBS3FFLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsZ0JBQUlDLE1BQU0sRUFBVjtBQUNBQSxnQkFBSVosS0FBSixHQUFZVyxLQUFLRSxXQUFqQjtBQUNBRCxnQkFBSUUsS0FBSixHQUFZSCxLQUFLRyxLQUFqQjtBQUNBRixnQkFBSWxDLEVBQUosR0FBU2lDLEtBQUtsQyxRQUFkO0FBQ0FtQyxnQkFBSXBDLElBQUosR0FBV21DLEtBQUtwQyxVQUFoQjtBQUNBRixrQkFBTTNCLFFBQU4sQ0FBZXFFLElBQWYsQ0FBb0JILEdBQXBCO0FBQ0F2QyxrQkFBTXpCLFVBQU4sR0FBbUJ5QixNQUFNM0IsUUFBTixDQUFlLENBQWYsQ0FBbkI7QUFDRCxXQVJEO0FBU0QsU0FYRCxNQVdPO0FBQ0wsY0FBSTJCLE1BQU1GLE9BQU4sQ0FBY21DLFNBQWxCLEVBQTZCO0FBQzNCakMsa0JBQU0vQixLQUFOLEdBQWMsT0FBSzZCLE9BQUwsQ0FBYUMsUUFBYixDQUFzQmMsSUFBSTdDLElBQUosQ0FBUzhDLEtBQS9CLENBQWQ7QUFDQWQsa0JBQU0yQyxVQUFOO0FBQ0Q7QUFDRjtBQUNEM0MsY0FBTTRDLE1BQU47QUFDRCxPQW5CRDtBQW9CRDs7OzZCQUNTO0FBQ1IsV0FBS2pFLFNBQUwsR0FBaUIsS0FBS21CLE9BQUwsQ0FBYStDLFVBQWIsQ0FBd0JsRSxTQUF6QztBQUNBVSxjQUFRQyxHQUFSLENBQVksS0FBS1gsU0FBakI7QUFDQSxXQUFLRixNQUFMLEdBQWMsS0FBS3FCLE9BQUwsQ0FBYWdELFVBQWIsQ0FBd0IsS0FBS3JFLE1BQUwsR0FBYyxJQUF0QyxFQUE0QyxPQUE1QyxDQUFkO0FBQ0EsVUFBSXVCLFFBQVEsSUFBWjtBQUNBLHFCQUFLK0MsYUFBTCxDQUFtQjtBQUNqQmpCLGlCQUFTLGlCQUFVakIsR0FBVixFQUFlO0FBQ3RCYixnQkFBTTdCLFNBQU4sR0FBa0IwQyxJQUFJbUMsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS0osTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRCxVQUFMO0FBQ0Q7Ozs7RUF2S21DLGVBQUtNLEk7O2tCQUF0QnBGLFEiLCJmaWxlIjoiYXBwbHlWaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBseVZpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+S8muWRmCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlzU2hvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6ICcnLFxuICAgICAgY3VycmVudDogMCxcbiAgICAgIHR5cGVMaXN0OiBbXSxcbiAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgcmVzdWx0TGlzdDogbnVsbCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIHZpcEVuZDogJzE1MjY2MTEwNzEnLFxuICAgICAgdmlwcmVkdWN0aW9uOiAnMTIzLjAwJyxcbiAgICAgIHVzZXJMZXZlbDogMFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgaW1hZ2VMb2FkICgpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgfSxcbiAgICAgIGJ1eVZpcCAoKSB7XG4gICAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB3ZXB5LmdvUnVsZXMoe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TZXJ2aWNlUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc2VydmljZSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICByYWRpb0NoYW5nZSAoZSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkXG4gICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsKVxuICAgICAgfSxcbiAgICAgIGNob29zZVR5cGUgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMucmVzdWx0TGlzdCA9IHRoaXMudHlwZUxpc3RbaW5kZXhdXG4gICAgICB9LFxuICAgICAgY2FuY2VsVGFwICgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YS5hcHBseSh0aGlzKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm1UYXAgKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdExpc3QpXG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ2lvcycsXG4gICAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnJlc3VsdExpc3QudHlwZSxcbiAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnJlc3VsdExpc3QuaWQsXG4gICAgICAgICAgICBidXlDb3VudDogMSxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogJycsXG4gICAgICAgICAgICBtZW1vX21haW46ICcnLFxuICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgdmFyIHRpbWVTdGFtcCA9IGRhdGEudGltZXN0YW1wLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgdmFyIG5vbmNlU3RyID0gZGF0YS5ub25jZXN0clxuICAgICAgICAgICAgICB2YXIgcHJlcGF5aWQgPSAncHJlcGF5X2lkPScgKyBkYXRhLnByZXBheWlkXG4gICAgICAgICAgICAgIHZhciBwYXlTaWduID0gZGF0YS5zaWduXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZXBheWlkKVxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyLFxuICAgICAgICAgICAgICAgICdwYWNrYWdlJzogcHJlcGF5aWQsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiBwYXlTaWduLFxuICAgICAgICAgICAgICAgICdzdWNjZXNzJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdyZXF1ZXN0UGF5bWVudDpvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g55So5oi35pSv5LuY5oiQ5Yqf6Lez6L2s6aaW6aG1XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyTXNnID09PSAncmVxdWVzdFBheW1lbnQ6Y2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDnlKjmiLflj5bmtojmlK/ku5jot7PovazorqLljZXliJfooahcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5pSv5LuY5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2NvbXBsZXRlJzogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBsZXRlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flhYjpmIXor7vjgIrkvJrlkZjmnI3liqHljY/orq7jgIsnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlXG4gICAgICB0aGlzLnJlc3VsdExpc3QgPSB0aGlzLnR5cGVMaXN0WzBdXG4gICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZVxuICAgIH1cbiAgICBnZXRTZXJ2aWNlICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICB0aGlzLnR5cGVMaXN0ID0gW11cbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFNlcnZpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGl0bGUgPSBpdGVtLnByb2R1Y3ROYW1lXG4gICAgICAgICAgICBvYmoucHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBvYmoudHlwZSA9IGl0ZW0uc291cmNlVHlwZVxuICAgICAgICAgICAgX3RoaXMudHlwZUxpc3QucHVzaChvYmopXG4gICAgICAgICAgICBfdGhpcy5yZXN1bHRMaXN0ID0gX3RoaXMudHlwZUxpc3RbMF1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5nZXRTZXJ2aWNlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgY29uc29sZS5sb2codGhpcy51c2VyTGV2ZWwpXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMudmlwRW5kICogMTAwMCwgJ1ktbS1kJylcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5nZXRTZXJ2aWNlKClcbiAgICB9XG4gIH1cbiJdfQ==