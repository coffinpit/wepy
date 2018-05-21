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
        console.log(this.resultList);
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
            console.log(res);
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
        }
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwibWV0aG9kcyIsImltYWdlTG9hZCIsImJ1eVZpcCIsImdvUnVsZXMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29TZXJ2aWNlUnVsZXMiLCJyYWRpb0NoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiY2hvb3NlVHlwZSIsImluZGV4IiwiY2FuY2VsVGFwIiwiaW5pdERhdGEiLCJhcHBseSIsImNvbmZpcm1UYXAiLCJhcHBUeXBlIiwic291cmNlVHlwZSIsInR5cGUiLCJzb3VyY2VJZCIsImlkIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJtZW1vX21haW4iLCJkYXRlX21haW4iLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVPcmRlckJ1eSIsInRoZW4iLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJfdGhpcyIsIkdldFNlcnZpY2UiLCJlcnJvciIsImZvckVhY2giLCJpdGVtIiwib2JqIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsInB1c2giLCIkYXBwbHkiLCJnZXRUb2tlbiIsImdsb2JhbERhdGEiLCJkYXRlRm9ybWF0IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJnZXRTZXJ2aWNlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7NkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVM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TSxLQUFLRSxXQUFqQjtBQUNBRCxnQkFBSUUsS0FBSixHQUFZSCxLQUFLRyxLQUFqQjtBQUNBRixnQkFBSWxCLEVBQUosR0FBU2lCLEtBQUtsQixRQUFkO0FBQ0FtQixnQkFBSXBCLElBQUosR0FBV21CLEtBQUtwQixVQUFoQjtBQUNBZ0Isa0JBQU0xQyxRQUFOLENBQWVrRCxJQUFmLENBQW9CSCxHQUFwQjtBQUNBTCxrQkFBTXhDLFVBQU4sR0FBbUJ3QyxNQUFNMUMsUUFBTixDQUFlLENBQWYsQ0FBbkI7QUFDRCxXQVJEO0FBU0Q7QUFDRDBDLGNBQU1TLE1BQU47QUFDRCxPQWREO0FBZUQ7Ozs2QkFDUztBQUNSLFdBQUt2RCxLQUFMLEdBQWEsS0FBS3NDLE9BQUwsQ0FBYWtCLFFBQWIsRUFBYjtBQUNBLFdBQUs5QyxTQUFMLEdBQWlCLEtBQUs0QixPQUFMLENBQWFtQixVQUFiLENBQXdCL0MsU0FBekM7QUFDQVUsY0FBUUMsR0FBUixDQUFZLEtBQUtYLFNBQWpCO0FBQ0EsV0FBS0YsTUFBTCxHQUFjLEtBQUs4QixPQUFMLENBQWFvQixVQUFiLENBQXdCLEtBQUtsRCxNQUFMLEdBQWMsSUFBdEMsRUFBNEMsT0FBNUMsQ0FBZDtBQUNBLFVBQUlzQyxRQUFRLElBQVo7QUFDQSxxQkFBS2EsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVsQixHQUFWLEVBQWU7QUFDdEJJLGdCQUFNNUMsU0FBTixHQUFrQndDLElBQUltQixZQUFKLEdBQW1CLElBQXJDO0FBQ0Q7QUFIZ0IsT0FBbkI7QUFLQSxXQUFLTixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtPLFVBQUw7QUFDRDs7OztFQWpIbUMsZUFBS0MsSTs7a0JBQXRCbkUsUSIsImZpbGUiOiJhcHBseVZpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGx5VmlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55Sz6K+35Lya5ZGYJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaXNTaG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogJycsXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgdHlwZUxpc3Q6IFtdLFxuICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICByZXN1bHRMaXN0OiBudWxsLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgdmlwRW5kOiAnMTUyNjYxMTA3MScsXG4gICAgICB2aXByZWR1Y3Rpb246ICcxMjMuMDAnLFxuICAgICAgdXNlckxldmVsOiAwXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbWFnZUxvYWQgKCkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgYnV5VmlwICgpIHtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1NlcnZpY2VSdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zZXJ2aWNlJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHJhZGlvQ2hhbmdlIChlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWRcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwpXG4gICAgICB9LFxuICAgICAgY2hvb3NlVHlwZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFtpbmRleF1cbiAgICAgIH0sXG4gICAgICBjYW5jZWxUYXAgKCkge1xuICAgICAgICB0aGlzLmluaXREYXRhLmFwcGx5KHRoaXMpXG4gICAgICB9LFxuICAgICAgY29uZmlybVRhcCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0TGlzdClcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBhcHBUeXBlOiAnaW9zJyxcbiAgICAgICAgICAgIHNvdXJjZVR5cGU6IHRoaXMucmVzdWx0TGlzdC50eXBlLFxuICAgICAgICAgICAgc291cmNlSWQ6IHRoaXMucmVzdWx0TGlzdC5pZCxcbiAgICAgICAgICAgIGJ1eUNvdW50OiAxLFxuICAgICAgICAgICAgYWRkcmVzc19tYWluOiAnJyxcbiAgICAgICAgICAgIG1lbW9fbWFpbjogJycsXG4gICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNyZWF0ZU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flhYjpmIXor7vjgIrkvJrlkZjmnI3liqHljY/orq7jgIsnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlXG4gICAgICB0aGlzLnJlc3VsdExpc3QgPSB0aGlzLnR5cGVMaXN0WzBdXG4gICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZVxuICAgIH1cbiAgICBnZXRTZXJ2aWNlICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgdGhpcy50eXBlTGlzdCA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICAgICAgb2JqLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgb2JqLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIF90aGlzLnR5cGVMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMucmVzdWx0TGlzdCA9IF90aGlzLnR5cGVMaXN0WzBdXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy51c2VyTGV2ZWwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTGV2ZWxcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlckxldmVsKVxuICAgICAgdGhpcy52aXBFbmQgPSB0aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdCh0aGlzLnZpcEVuZCAqIDEwMDAsICdZLW0tZCcpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCArICdweCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuZ2V0U2VydmljZSgpXG4gICAgfVxuICB9XG4iXX0=