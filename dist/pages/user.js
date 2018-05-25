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

      this.token = this.$parent.getToken();
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
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.initUserData();
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'initUserOrder',
    value: function initUserOrder() {
      var _this4 = this;

      this.token = this.$parent.getToken();
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
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initUserOrder();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this5 = this;

      var _this = this;
      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            _this.isLogin = false;
            // 已经授权，获取新的token
            _this.$parent.getUser(function () {
              _this.userInfo = _this5.$parent.globalData.userInfo;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJ1c2VySW5mbyIsImlzVmlwIiwidmFsaWRhdGlvbiIsInJlZnVuZGluZyIsInVuZGVsaXZlcmVkIiwidW5wYWlkIiwidW5yZWNlaXB0ZWQiLCJpc0xvZ2luIiwibWV0aG9kcyIsImdvU2VydmljZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0FkZHJlc3MiLCJnb0NvbGxlY3QiLCJnb09yZGVyIiwiZ29TeXN0ZW0iLCJnb1VucGFpZCIsImdvVW5kZWxpdmVyZWQiLCJnb1VucmVjZWlwdGVkIiwiZ29SZWZ1bmRpbmciLCJnb0FwcGx5VmlwIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsImRldGFpbCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2xlYXIiLCJnZXRTdG9yYWdlSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJjdXJyZW50U2l6ZSIsImNvbmZpcm0iLCJjbGVhclN0b3JhZ2UiLCJnZXRUb2tlbiIsIl90aGlzIiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldFVzZXJJbmZvIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImxldmVsIiwiZGF0ZUZvcm1hdCIsInZpcEVuZCIsIm1pc3NUb2tlbiIsImluaXRVc2VyRGF0YSIsIiRhcHBseSIsIkdldFVzZXJPcmRlciIsInNob3dTdWNjZXNzIiwiaW5pdFVzZXJPcmRlciIsImNhdGNoIiwic2hvd0ZhaWwiLCJnZXRTZXR0aW5nIiwiYXV0aFNldHRpbmciLCJnZXRVc2VyIiwidXNlckxldmVsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxnQkFBVSxFQUZMO0FBR0xDLGFBQU8sS0FIRjtBQUlMQyxrQkFBWSxFQUpQO0FBS0xDLGlCQUFXLEVBTE47QUFNTEMsbUJBQWEsRUFOUjtBQU9MQyxjQUFRLEVBUEg7QUFRTEMsbUJBQWEsRUFSUjtBQVNMQyxlQUFTO0FBVEosSyxTQVdQQyxPLEdBQVU7QUFDUkMsZUFEUSx1QkFDSztBQUNYLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BTE87QUFNUkMsZUFOUSx1QkFNSztBQUNYLHVCQUFLRixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BVk87QUFXUkUsZUFYUSx1QkFXSztBQUNYLHVCQUFLSCxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BZk87QUFnQlJHLGFBaEJRLHFCQWdCRztBQUNULHVCQUFLSixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BcEJPO0FBcUJSSSxjQXJCUSxzQkFxQkk7QUFDVix1QkFBS0wsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQXpCTztBQTBCUkssY0ExQlEsc0JBMEJJO0FBQ1YsdUJBQUtOLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0E5Qk87QUErQlJNLG1CQS9CUSwyQkErQlM7QUFDZix1QkFBS1AsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQW5DTztBQW9DUk8sbUJBcENRLDJCQW9DUztBQUNmLHVCQUFLUixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BeENPO0FBeUNSUSxpQkF6Q1EseUJBeUNPO0FBQ2IsdUJBQUtULFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0E3Q087QUE4Q1JTLGdCQTlDUSx3QkE4Q007QUFDWix1QkFBS1YsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQWxETztBQW1EUlUscUJBbkRRLDJCQW1EU0MsQ0FuRFQsRUFtRFk7QUFDbEIsWUFBSUEsRUFBRUMsTUFBRixDQUFTdkIsUUFBYixFQUF1QjtBQUNyQixlQUFLTyxPQUFMLEdBQWUsS0FBZjtBQUNBLGVBQUtpQixPQUFMLENBQWFDLFVBQWIsQ0FBd0J6QixRQUF4QixHQUFtQ3NCLEVBQUVDLE1BQUYsQ0FBU3ZCLFFBQTVDO0FBQ0EsZUFBS0EsUUFBTCxHQUFnQnNCLEVBQUVDLE1BQUYsQ0FBU3ZCLFFBQXpCO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsZUFBS08sT0FBTCxHQUFlLElBQWY7QUFDQSx5QkFBS21CLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxJQURNO0FBRWJDLHFCQUFTO0FBRkksV0FBZjtBQUlEO0FBQ0YsT0EvRE87QUFnRVJDLFdBaEVRLG1CQWdFQztBQUNQLHVCQUFLQyxjQUFMLENBQW9CO0FBQ2xCQyxtQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLDJCQUFLTixTQUFMLENBQWU7QUFDYkMscUJBQU8sSUFETTtBQUViQyx1QkFBUyxTQUFTSSxJQUFJQyxXQUFiLEdBQTJCLFdBRnZCO0FBR2JGLHVCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsb0JBQUlBLElBQUlFLE9BQVIsRUFBaUI7QUFDZixpQ0FBS0MsWUFBTDtBQUNEO0FBQ0Y7QUFQWSxhQUFmO0FBU0Q7QUFYaUIsU0FBcEI7QUFhRDtBQTlFTyxLOzs7OzttQ0FnRk07QUFBQTs7QUFDZCxXQUFLcEMsS0FBTCxHQUFhLEtBQUt5QixPQUFMLENBQWFZLFFBQWIsRUFBYjtBQUNBLFVBQUlDLFFBQVEsSUFBWjtBQUNBLFdBQUtiLE9BQUwsQ0FBYWMsV0FBYjtBQUNBLFVBQUl4QyxPQUFPO0FBQ1RDLGVBQU8sS0FBS0E7QUFESCxPQUFYO0FBR0EsV0FBS3lCLE9BQUwsQ0FBYWUsV0FBYixDQUF5QkMsV0FBekIsQ0FBcUMxQyxJQUFyQyxFQUEyQzJDLElBQTNDLENBQWdELFVBQUNULEdBQUQsRUFBUztBQUN2RFUsZ0JBQVFDLEdBQVIsQ0FBWVgsR0FBWjtBQUNBLFlBQUlBLElBQUlsQyxJQUFKLENBQVM4QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUk5QyxPQUFPa0MsSUFBSWxDLElBQUosQ0FBU0EsSUFBcEI7QUFDQSxjQUFJQSxLQUFLK0MsS0FBTCxLQUFlLENBQW5CLEVBQXNCO0FBQ3BCUixrQkFBTXBDLEtBQU4sR0FBYyxLQUFkO0FBQ0QsV0FGRCxNQUVPLElBQUlILEtBQUsrQyxLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDM0JSLGtCQUFNcEMsS0FBTixHQUFjLElBQWQ7QUFDRDtBQUNELGlCQUFLQyxVQUFMLEdBQWtCLE9BQUtzQixPQUFMLENBQWFzQixVQUFiLENBQXdCZCxJQUFJbEMsSUFBSixDQUFTaUQsTUFBakMsRUFBeUMsUUFBekMsQ0FBbEI7QUFDRCxTQVJELE1BUU87QUFDTCxjQUFJVixNQUFNYixPQUFOLENBQWN3QixTQUFsQixFQUE2QjtBQUMzQlgsa0JBQU10QyxLQUFOLEdBQWMsT0FBS3lCLE9BQUwsQ0FBYVksUUFBYixDQUFzQkosSUFBSWxDLElBQUosQ0FBUzhDLEtBQS9CLENBQWQ7QUFDQVAsa0JBQU1ZLFlBQU47QUFDRDtBQUNGO0FBQ0RaLGNBQU1hLE1BQU47QUFDRCxPQWpCRDtBQWtCRDs7O29DQUNnQjtBQUFBOztBQUNmLFdBQUtuRCxLQUFMLEdBQWEsS0FBS3lCLE9BQUwsQ0FBYVksUUFBYixFQUFiO0FBQ0EsV0FBS1osT0FBTCxDQUFhYyxXQUFiO0FBQ0EsVUFBSUQsUUFBUSxJQUFaO0FBQ0EsVUFBSXZDLE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLeUIsT0FBTCxDQUFhZSxXQUFiLENBQXlCWSxZQUF6QixDQUFzQ3JELElBQXRDLEVBQTRDMkMsSUFBNUMsQ0FBaUQsVUFBQ1QsR0FBRCxFQUFTO0FBQ3hEVSxnQkFBUUMsR0FBUixDQUFZWCxHQUFaO0FBQ0EsWUFBSUEsSUFBSWxDLElBQUosQ0FBUzhDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJQLGdCQUFNYixPQUFOLENBQWM0QixXQUFkO0FBQ0EsY0FBSXRELE9BQU9rQyxJQUFJbEMsSUFBSixDQUFTQSxJQUFwQjtBQUNBdUMsZ0JBQU1sQyxTQUFOLEdBQWtCTCxLQUFLSyxTQUF2QjtBQUNBa0MsZ0JBQU1qQyxXQUFOLEdBQW9CTixLQUFLTSxXQUF6QjtBQUNBaUMsZ0JBQU1oQyxNQUFOLEdBQWVQLEtBQUtPLE1BQXBCO0FBQ0FnQyxnQkFBTS9CLFdBQU4sR0FBb0JSLEtBQUtRLFdBQXpCO0FBQ0QsU0FQRCxNQU9PO0FBQ0wsY0FBSStCLE1BQU1iLE9BQU4sQ0FBY3dCLFNBQWxCLEVBQTZCO0FBQzNCWCxrQkFBTXRDLEtBQU4sR0FBYyxPQUFLeUIsT0FBTCxDQUFhWSxRQUFiLENBQXNCSixJQUFJbEMsSUFBSixDQUFTOEMsS0FBL0IsQ0FBZDtBQUNBUCxrQkFBTWdCLGFBQU47QUFDRDtBQUNGO0FBQ0RoQixjQUFNYSxNQUFOO0FBQ0QsT0FoQkQsRUFnQkdJLEtBaEJILENBZ0JTLFlBQU07QUFDYmpCLGNBQU1iLE9BQU4sQ0FBYytCLFFBQWQ7QUFDRCxPQWxCRDtBQW1CRDs7OzZCQUNTO0FBQUE7O0FBQ1IsVUFBSWxCLFFBQVEsSUFBWjtBQUNBLHFCQUFLbUIsVUFBTCxDQUFnQjtBQUNkekIsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixjQUFJQSxJQUFJeUIsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQ3BCLGtCQUFNOUIsT0FBTixHQUFnQixLQUFoQjtBQUNBO0FBQ0E4QixrQkFBTWIsT0FBTixDQUFja0MsT0FBZCxDQUFzQixZQUFNO0FBQzFCckIsb0JBQU1yQyxRQUFOLEdBQWlCLE9BQUt3QixPQUFMLENBQWFDLFVBQWIsQ0FBd0J6QixRQUF6QztBQUNELGFBRkQ7QUFHRCxXQU5ELE1BTU87QUFDTHFDLGtCQUFNOUIsT0FBTixHQUFnQixJQUFoQjtBQUNEO0FBQ0Q4QixnQkFBTWEsTUFBTjtBQUNEO0FBWmEsT0FBaEI7QUFjQSxVQUFJLEtBQUsxQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JrQyxTQUF4QixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxhQUFLMUQsS0FBTCxHQUFhLEtBQWI7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLdUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCa0MsU0FBeEIsS0FBc0MsQ0FBMUMsRUFBNkM7QUFDbEQsYUFBSzFELEtBQUwsR0FBYSxJQUFiO0FBQ0Q7QUFDRHlDLGNBQVFDLEdBQVIsQ0FBWSxLQUFLbkIsT0FBTCxDQUFhQyxVQUFiLENBQXdCa0MsU0FBcEM7QUFDQSxXQUFLVCxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtELFlBQUw7QUFDQSxXQUFLSSxhQUFMO0FBQ0EsV0FBS0gsTUFBTDtBQUNEOzs7O0VBaEwrQixlQUFLVSxJOztrQkFBbEJqRSxJIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlckluZm86ICcnLFxuICAgICAgaXNWaXA6IGZhbHNlLFxuICAgICAgdmFsaWRhdGlvbjogJycsXG4gICAgICByZWZ1bmRpbmc6ICcnLFxuICAgICAgdW5kZWxpdmVyZWQ6ICcnLFxuICAgICAgdW5wYWlkOiAnJyxcbiAgICAgIHVucmVjZWlwdGVkOiAnJyxcbiAgICAgIGlzTG9naW46IGZhbHNlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb1NlcnZpY2UgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29BZGRyZXNzICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2FkZHJlc3MnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Db2xsZWN0ICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2NvbGxlY3QnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29PcmRlciAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1N5c3RlbSAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zeXN0ZW0nXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29VbnBhaWQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vb3JkZXI/b3JkZXJUeXBlPXVucGFpZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VuZGVsaXZlcmVkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bmRlbGl2ZXJlZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1VucmVjZWlwdGVkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL29yZGVyP29yZGVyVHlwZT11bnJlY2VpcHRlZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1JlZnVuZGluZyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9vcmRlcj9vcmRlclR5cGU9cmVmdW5kaW5nJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvQXBwbHlWaXAgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vYXBwbHlWaXAnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYmluZEdldFVzZXJJbmZvIChlKSB7XG4gICAgICAgIGlmIChlLmRldGFpbC51c2VySW5mbykge1xuICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICAgIHRoaXMudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IHRydWVcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV6I635Y+W55So5oi35L+h5oGvJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbGVhciAoKSB7XG4gICAgICAgIHdlcHkuZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN57yT5a2YJyArIHJlcy5jdXJyZW50U2l6ZSArICdrYizmmK/lkKbmuIXnkIbnvJPlrZgnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LmNsZWFyU3RvcmFnZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFVzZXJEYXRhICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFVzZXJJbmZvKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxldmVsID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxldmVsID09PSAxKSB7XG4gICAgICAgICAgICBfdGhpcy5pc1ZpcCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQocmVzLmRhdGEudmlwRW5kLCAnWeW5tG3mnIhk5pelJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFVzZXJEYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRVc2VyT3JkZXIgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VXNlck9yZGVyKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnJlZnVuZGluZyA9IGRhdGEucmVmdW5kaW5nXG4gICAgICAgICAgX3RoaXMudW5kZWxpdmVyZWQgPSBkYXRhLnVuZGVsaXZlcmVkXG4gICAgICAgICAgX3RoaXMudW5wYWlkID0gZGF0YS51bnBhaWRcbiAgICAgICAgICBfdGhpcy51bnJlY2VpcHRlZCA9IGRhdGEudW5yZWNlaXB0ZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFVzZXJPcmRlcigpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0xvZ2luID0gZmFsc2VcbiAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOiOt+WPluaWsOeahHRva2VuXG4gICAgICAgICAgICBfdGhpcy4kcGFyZW50LmdldFVzZXIoKCkgPT4ge1xuICAgICAgICAgICAgICBfdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc0xvZ2luID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbCA9PT0gMCkge1xuICAgICAgICB0aGlzLmlzVmlwID0gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckxldmVsID09PSAxKSB7XG4gICAgICAgIHRoaXMuaXNWaXAgPSB0cnVlXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWwpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRVc2VyRGF0YSgpXG4gICAgICB0aGlzLmluaXRVc2VyT3JkZXIoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19