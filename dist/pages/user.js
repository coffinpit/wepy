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

var User = function (_wepy$page) {
  _inherits(User, _wepy$page);

  function User() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '个人中心'
    }, _this2.data = {
      token: '',
      userInfo: '',
      isVip: false,
      validation: '',
      refunding: '',
      undelivered: '',
      unpaid: '',
      unreceipted: '',
      isLogin: false
    }, _this2.methods = {
      goService: function goService() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      },
      goAddress: function goAddress() {
        _wepy2.default.navigateTo({
          url: './address'
        });
      },
      goCollect: function goCollect() {
        _wepy2.default.navigateTo({
          url: './collect'
        });
      },
      goOrder: function goOrder() {
        _wepy2.default.navigateTo({
          url: './order'
        });
      },
      goSystem: function goSystem() {
        _wepy2.default.navigateTo({
          url: './system'
        });
      },
      goUnpaid: function goUnpaid() {
        _wepy2.default.navigateTo({
          url: './order?orderType=unpaid'
        });
      },
      goUndelivered: function goUndelivered() {
        _wepy2.default.navigateTo({
          url: './order?orderType=undelivered'
        });
      },
      goUnreceipted: function goUnreceipted() {
        _wepy2.default.navigateTo({
          url: './order?orderType=unreceipted'
        });
      },
      goRefunding: function goRefunding() {
        _wepy2.default.navigateTo({
          url: './order?orderType=refunding'
        });
      },
      goApplyVip: function goApplyVip() {
        _wepy2.default.navigateTo({
          url: './applyVip'
        });
      },
      bindGetUserInfo: function bindGetUserInfo(e) {
        if (e.detail.userInfo) {
          this.isLogin = false;
          this.$parent.globalData.userInfo = e.detail.userInfo;
          this.userInfo = e.detail.userInfo;
        } else {
          this.isLogin = true;
          _wepy2.default.showModal({
            title: '提示',
            content: '拒绝授权将无法获取用户信息'
          });
        }
      },
      clear: function clear() {
        _wepy2.default.getStorageInfo({
          success: function success(res) {
            _wepy2.default.showModal({
              title: '提示',
              content: '当前缓存' + res.currentSize + 'kb,是否清理缓存',
              success: function success(res) {
                if (res.confirm) {
                  _wepy2.default.clearStorage();
                }
              }
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(User, [{
    key: 'initUserData',
    value: function initUserData() {
      var _this3 = this;

      var _this = this;
      this.$parent.showLoading();
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserInfo(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          if (data.level === 0) {
            _this.isVip = false;
          } else if (data.level === 1) {
            _this.isVip = true;
          }
          _this3.validation = _this3.$parent.dateFormat(res.data.vipEnd, 'Y年m月d日');
        }
        _this.$apply();
      });
    }
  }, {
    key: 'initUserOrder',
    value: function initUserOrder() {
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetUserOrder(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.refunding = data.refunding;
          _this.undelivered = data.undelivered;
          _this.unpaid = data.unpaid;
          _this.unreceipted = data.unreceipted;
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this4 = this;

      this.token = this.$parent.getToken('user');
      var _this = this;
      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            _this.isLogin = false;
            // 已经授权，获取新的token
            _this.$parent.getUser(function () {
              _this.userInfo = _this4.$parent.globalData.userInfo;
            });
          } else {
            _this.isLogin = true;
          }
          _this.$apply();
        }
      });
      if (this.$parent.globalData.userLevel === 0) {
        this.isVip = false;
      } else if (this.$parent.globalData.userLevel === 1) {
        this.isVip = true;
      }
      console.log(this.$parent.globalData.userLevel);
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initUserData();
      this.initUserOrder();
      this.$apply();
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsImRldGFpbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2xlYXIiLCJnZXRTdG9yYWdlSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJjdXJyZW50U2l6ZSIsImNvbmZpcm0iLCJjbGVhclN0b3JhZ2UiLCJfdGhpcyIsInNob3dMb2FkaW5nIiwiSHR0cFJlcXVlc3QiLCJHZXRVc2VySW5mbyIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJsZXZlbCIsImRhdGVGb3JtYXQiLCJ2aXBFbmQiLCIkYXBwbHkiLCJHZXRVc2VyT3JkZXIiLCJzaG93U3VjY2VzcyIsInNob3dGYWlsIiwiY2F0Y2giLCJnZXRUb2tlbiIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImdldFVzZXIiLCJ1c2VyTGV2ZWwiLCJpbml0VXNlckRhdGEiLCJpbml0VXNlck9yZGVyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxnQkFBVSxFQUZMO0FBR0xDLGFBQU8sS0FIRjtBQUlMQyxrQkFBWSxFQUpQO0FBS0xDLGlCQUFXLEVBTE47QUFNTEMsbUJBQWEsRUFOUjtBQU9MQyxjQUFRLEVBUEg7QUFRTEMsbUJBQWEsRUFSUjtBQVNMQyxlQUFTO0FBVEosSyxTQVdQQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUNYLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BTE87QUFNUkMsZUFOUSx1QkFNSztBQUNYLHVCQUFLRixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BVk87QUFXUkUsZUFYUSx1QkFXSztBQUNYLHVCQUFLSCxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BZk87QUFnQlJHLGFBaEJRLHFCQWdCRztBQUNULHVCQUFLSixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BcEJPO0FBcUJSSSxjQXJCUSxzQkFxQkk7QUFDVix1QkFBS0wsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQXpCTztBQTBCUkssY0ExQlEsc0JBMEJJO0FBQ1YsdUJBQUtOLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0E5Qk87QUErQlJNLG1CQS9CUSwyQkErQlM7QUFDZix1QkFBS1AsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQW5DTztBQW9DUk8sbUJBcENRLDJCQW9DUztBQUNmLHVCQUFLUixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BeENPO0FBeUNSUSxpQkF6Q1EseUJBeUNPO0FBQ2IsdUJBQUtULFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0E3Q087QUE4Q1JTLGdCQTlDUSx3QkE4Q007QUFDWix1QkFBS1YsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQWxETztBQW1EUlUscUJBbkRRLDJCQW1EU0MsQ0FuRFQsRUFtRFk7QUFDbEIsWUFBSUEsRUFBRUMsTUFBRixDQUFTdkIsUUFBYixFQUF1QjtBQUNyQixlQUFLTyxPQUFMLEdBQWUsS0FBZjtBQUNBLGVBQUtpQixPQUFMLENBQWFDLFVBQWIsQ0FBd0J6QixRQUF4QixHQUFtQ3NCLEVBQUVDLE1BQUYsQ0FBU3ZCLFFBQTVDO0FBQ0EsZUFBS0EsUUFBTCxHQUFnQnNCLEVBQUVDLE1BQUYsQ0FBU3ZCLFFBQXpCO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsZUFBS08sT0FBTCxHQUFlLElBQWY7QUFDQSx5QkFBS21CLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxJQURNO0FBRWJDLHFCQUFTO0FBRkksV0FBZjtBQUlEO0FBQ0YsT0EvRE87QUFnRVJDLFdBaEVRLG1CQWdFQztBQUNQLHVCQUFLQyxjQUFMLENBQW9CO0FBQ2xCQyxtQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLDJCQUFLTixTQUFMLENBQWU7QUFDYkMscUJBQU8sSUFETTtBQUViQyx1QkFBUyxTQUFTSSxJQUFJQyxXQUFiLEdBQTJCLFdBRnZCO0FBR2JGLHVCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsb0JBQUlBLElBQUlFLE9BQVIsRUFBaUI7QUFDZixpQ0FBS0MsWUFBTDtBQUNEO0FBQ0Y7QUFQWSxhQUFmO0FBU0Q7QUFYaUIsU0FBcEI7QUFhRDtBQTlFTyxLOzs7OzttQ0FnRk07QUFBQTs7QUFDZCxVQUFJQyxRQUFRLElBQVo7QUFDQSxXQUFLWixPQUFMLENBQWFhLFdBQWI7QUFDQSxVQUFJdkMsT0FBTztBQUNUQyxlQUFPLEtBQUtBO0FBREgsT0FBWDtBQUdBLFdBQUt5QixPQUFMLENBQWFjLFdBQWIsQ0FBeUJDLFdBQXpCLENBQXFDekMsSUFBckMsRUFBMkMwQyxJQUEzQyxDQUFnRCxVQUFDUixHQUFELEVBQVM7QUFDdkRTLGdCQUFRQyxHQUFSLENBQVlWLEdBQVo7QUFDQSxZQUFJQSxJQUFJbEMsSUFBSixDQUFTNkMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixjQUFJN0MsT0FBT2tDLElBQUlsQyxJQUFKLENBQVNBLElBQXBCO0FBQ0EsY0FBSUEsS0FBSzhDLEtBQUwsS0FBZSxDQUFuQixFQUFzQjtBQUNwQlIsa0JBQU1uQyxLQUFOLEdBQWMsS0FBZDtBQUNELFdBRkQsTUFFTyxJQUFJSCxLQUFLOEMsS0FBTCxLQUFlLENBQW5CLEVBQXNCO0FBQzNCUixrQkFBTW5DLEtBQU4sR0FBYyxJQUFkO0FBQ0Q7QUFDRCxpQkFBS0MsVUFBTCxHQUFrQixPQUFLc0IsT0FBTCxDQUFhcUIsVUFBYixDQUF3QmIsSUFBSWxDLElBQUosQ0FBU2dELE1BQWpDLEVBQXlDLFFBQXpDLENBQWxCO0FBQ0Q7QUFDRFYsY0FBTVcsTUFBTjtBQUNELE9BWkQ7QUFhRDs7O29DQUNnQjtBQUNmLFdBQUt2QixPQUFMLENBQWFhLFdBQWI7QUFDQSxVQUFJRCxRQUFRLElBQVo7QUFDQSxVQUFJdEMsT0FBTztBQUNUQyxlQUFPLEtBQUtBO0FBREgsT0FBWDtBQUdBLFdBQUt5QixPQUFMLENBQWFjLFdBQWIsQ0FBeUJVLFlBQXpCLENBQXNDbEQsSUFBdEMsRUFBNEMwQyxJQUE1QyxDQUFpRCxVQUFDUixHQUFELEVBQVM7QUFDeERTLGdCQUFRQyxHQUFSLENBQVlWLEdBQVo7QUFDQSxZQUFJQSxJQUFJbEMsSUFBSixDQUFTNkMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QlAsZ0JBQU1aLE9BQU4sQ0FBY3lCLFdBQWQ7QUFDQSxjQUFJbkQsT0FBT2tDLElBQUlsQyxJQUFKLENBQVNBLElBQXBCO0FBQ0FzQyxnQkFBTWpDLFNBQU4sR0FBa0JMLEtBQUtLLFNBQXZCO0FBQ0FpQyxnQkFBTWhDLFdBQU4sR0FBb0JOLEtBQUtNLFdBQXpCO0FBQ0FnQyxnQkFBTS9CLE1BQU4sR0FBZVAsS0FBS08sTUFBcEI7QUFDQStCLGdCQUFNOUIsV0FBTixHQUFvQlIsS0FBS1EsV0FBekI7QUFDRCxTQVBELE1BT087QUFDTDhCLGdCQUFNWixPQUFOLENBQWMwQixRQUFkO0FBQ0Q7QUFDRGQsY0FBTVcsTUFBTjtBQUNELE9BYkQsRUFhR0ksS0FiSCxDQWFTLFlBQU07QUFDYmYsY0FBTVosT0FBTixDQUFjMEIsUUFBZDtBQUNELE9BZkQ7QUFnQkQ7Ozs2QkFDUztBQUFBOztBQUNSLFdBQUtuRCxLQUFMLEdBQWEsS0FBS3lCLE9BQUwsQ0FBYTRCLFFBQWIsQ0FBc0IsTUFBdEIsQ0FBYjtBQUNBLFVBQUloQixRQUFRLElBQVo7QUFDQSxxQkFBS2lCLFVBQUwsQ0FBZ0I7QUFDZHRCLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSUEsSUFBSXNCLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckNsQixrQkFBTTdCLE9BQU4sR0FBZ0IsS0FBaEI7QUFDQTtBQUNBNkIsa0JBQU1aLE9BQU4sQ0FBYytCLE9BQWQsQ0FBc0IsWUFBTTtBQUMxQm5CLG9CQUFNcEMsUUFBTixHQUFpQixPQUFLd0IsT0FBTCxDQUFhQyxVQUFiLENBQXdCekIsUUFBekM7QUFDRCxhQUZEO0FBR0QsV0FORCxNQU1PO0FBQ0xvQyxrQkFBTTdCLE9BQU4sR0FBZ0IsSUFBaEI7QUFDRDtBQUNENkIsZ0JBQU1XLE1BQU47QUFDRDtBQVphLE9BQWhCO0FBY0EsVUFBSSxLQUFLdkIsT0FBTCxDQUFhQyxVQUFiLENBQXdCK0IsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDM0MsYUFBS3ZELEtBQUwsR0FBYSxLQUFiO0FBQ0QsT0FGRCxNQUVPLElBQUksS0FBS3VCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QitCLFNBQXhCLEtBQXNDLENBQTFDLEVBQTZDO0FBQ2xELGFBQUt2RCxLQUFMLEdBQWEsSUFBYjtBQUNEO0FBQ0R3QyxjQUFRQyxHQUFSLENBQVksS0FBS2xCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QitCLFNBQXBDO0FBQ0EsV0FBS1QsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLVSxZQUFMO0FBQ0EsV0FBS0MsYUFBTDtBQUNBLFdBQUtYLE1BQUw7QUFDRDs7OztFQXZLK0IsZUFBS1ksSTs7a0JBQWxCaEUsSSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uuS4reW/gydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHVzZXJJbmZvOiAnJyxcbiAgICAgIGlzVmlwOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRpb246ICcnLFxuICAgICAgcmVmdW5kaW5nOiAnJyxcbiAgICAgIHVuZGVsaXZlcmVkOiAnJyxcbiAgICAgIHVucGFpZDogJycsXG4gICAgICB1bnJlY2VpcHRlZDogJycsXG4gICAgICBpc0xvZ2luOiBmYWxzZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29TZXJ2aWNlICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQWRkcmVzcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9hZGRyZXNzJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQ29sbGVjdCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9jb2xsZWN0J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvT3JkZXIgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TeXN0ZW0gKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc3lzdGVtJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvVW5wYWlkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnBhaWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbmRlbGl2ZXJlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5kZWxpdmVyZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnJlY2VpcHRlZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9dW5yZWNlaXB0ZWQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29SZWZ1bmRpbmcgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXJlZnVuZGluZydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0FwcGx5VmlwICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FwcGx5VmlwJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJpbmRHZXRVc2VySW5mbyAoZSkge1xuICAgICAgICBpZiAoZS5kZXRhaWwudXNlckluZm8pIHtcbiAgICAgICAgICB0aGlzLmlzTG9naW4gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgICB0aGlzLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzTG9naW4gPSB0cnVlXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aLkue7neaOiOadg+WwhuaXoOazleiOt+WPlueUqOaIt+S/oeaBrydcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xlYXIgKCkge1xuICAgICAgICB3ZXB5LmdldFN0b3JhZ2VJbmZvKHtcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+W9k+WJjee8k+WtmCcgKyByZXMuY3VycmVudFNpemUgKyAna2Is5piv5ZCm5riF55CG57yT5a2YJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgd2VweS5jbGVhclN0b3JhZ2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRVc2VyRGF0YSAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlckluZm8oZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKGRhdGEubGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIF90aGlzLmlzVmlwID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChyZXMuZGF0YS52aXBFbmQsICdZ5bm0beaciGTml6UnKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0VXNlck9yZGVyICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRVc2VyT3JkZXIoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMucmVmdW5kaW5nID0gZGF0YS5yZWZ1bmRpbmdcbiAgICAgICAgICBfdGhpcy51bmRlbGl2ZXJlZCA9IGRhdGEudW5kZWxpdmVyZWRcbiAgICAgICAgICBfdGhpcy51bnBhaWQgPSBkYXRhLnVucGFpZFxuICAgICAgICAgIF90aGlzLnVucmVjZWlwdGVkID0gZGF0YS51bnJlY2VpcHRlZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ3VzZXInKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgIF90aGlzLmlzTG9naW4gPSBmYWxzZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIF90aGlzLiRwYXJlbnQuZ2V0VXNlcigoKSA9PiB7XG4gICAgICAgICAgICAgIF90aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTG9naW4gPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAwKSB7XG4gICAgICAgIHRoaXMuaXNWaXAgPSBmYWxzZVxuICAgICAgfSBlbHNlIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdFVzZXJEYXRhKClcbiAgICAgIHRoaXMuaW5pdFVzZXJPcmRlcigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=