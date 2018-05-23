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
      userLevel: 0,
      getTokenTime: 0
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
      var _this3 = this;

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
          if (res.data.error === -1 && res.data.msg === 'miss token') {
            _this.getTokenTime++;
            if (_this.getTokenTime < 3) {
              _this.token = _this3.$parent.getToken();
              _this.getService();
            } else {
              _this.$parent.showFail();
            }
          } else if (res.data.error === -2) {
            _this.$parent.showFail(res.data.msg);
          }
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
      this.getTokenTime = 0;
      this.getService();
    }
  }]);

  return ApplyVip;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ApplyVip , 'pages/applyVip'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwiaXNMb2FkaW5nIiwidmlwRW5kIiwidmlwcmVkdWN0aW9uIiwidXNlckxldmVsIiwiZ2V0VG9rZW5UaW1lIiwibWV0aG9kcyIsImltYWdlTG9hZCIsImJ1eVZpcCIsImdvUnVsZXMiLCJ1cmwiLCJnb1NlcnZpY2VSdWxlcyIsIm5hdmlnYXRlVG8iLCJyYWRpb0NoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiY2hvb3NlVHlwZSIsImluZGV4IiwiY2FuY2VsVGFwIiwiaW5pdERhdGEiLCJhcHBseSIsImNvbmZpcm1UYXAiLCJhcHBUeXBlIiwic291cmNlVHlwZSIsInR5cGUiLCJzb3VyY2VJZCIsImlkIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJtZW1vX21haW4iLCJkYXRlX21haW4iLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVPcmRlckJ1eSIsInRoZW4iLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJfdGhpcyIsIkdldFNlcnZpY2UiLCJlcnJvciIsImZvckVhY2giLCJpdGVtIiwib2JqIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsInB1c2giLCJtc2ciLCJnZXRUb2tlbiIsImdldFNlcnZpY2UiLCJzaG93RmFpbCIsIiRhcHBseSIsImdsb2JhbERhdGEiLCJkYXRlRm9ybWF0IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs2TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxT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QUFRQyxHQUFSLENBQVksS0FBS1osU0FBakI7QUFDQSxXQUFLRixNQUFMLEdBQWMsS0FBSytCLE9BQUwsQ0FBYXVCLFVBQWIsQ0FBd0IsS0FBS3RELE1BQUwsR0FBYyxJQUF0QyxFQUE0QyxPQUE1QyxDQUFkO0FBQ0EsVUFBSXVDLFFBQVEsSUFBWjtBQUNBLHFCQUFLZ0IsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVyQixHQUFWLEVBQWU7QUFDdEJJLGdCQUFNN0MsU0FBTixHQUFrQnlDLElBQUlzQixZQUFKLEdBQW1CLElBQXJDO0FBQ0Q7QUFIZ0IsT0FBbkI7QUFLQSxXQUFLTCxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtqRCxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsV0FBSytDLFVBQUw7QUFDRDs7OztFQS9IbUMsZUFBS1EsSTs7a0JBQXRCdEUsUSIsImZpbGUiOiJhcHBseVZpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGx5VmlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55Sz6K+35Lya5ZGYJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaXNTaG93OiBmYWxzZSxcbiAgICAgIHdpbkhlaWdodDogJycsXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgdHlwZUxpc3Q6IFtdLFxuICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICByZXN1bHRMaXN0OiBudWxsLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgdmlwRW5kOiAnMTUyNjYxMTA3MScsXG4gICAgICB2aXByZWR1Y3Rpb246ICcxMjMuMDAnLFxuICAgICAgdXNlckxldmVsOiAwLFxuICAgICAgZ2V0VG9rZW5UaW1lOiAwXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbWFnZUxvYWQgKCkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgYnV5VmlwICgpIHtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlXG4gICAgICB9LFxuICAgICAgZ29SdWxlcyAoKSB7XG4gICAgICAgIHdlcHkuZ29SdWxlcyh7XG4gICAgICAgICAgdXJsOiAnLi9ydWxlcydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb1NlcnZpY2VSdWxlcyAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zZXJ2aWNlJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHJhZGlvQ2hhbmdlIChlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWRcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwpXG4gICAgICB9LFxuICAgICAgY2hvb3NlVHlwZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFtpbmRleF1cbiAgICAgIH0sXG4gICAgICBjYW5jZWxUYXAgKCkge1xuICAgICAgICB0aGlzLmluaXREYXRhLmFwcGx5KHRoaXMpXG4gICAgICB9LFxuICAgICAgY29uZmlybVRhcCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0TGlzdClcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICBhcHBUeXBlOiAnaW9zJyxcbiAgICAgICAgICAgIHNvdXJjZVR5cGU6IHRoaXMucmVzdWx0TGlzdC50eXBlLFxuICAgICAgICAgICAgc291cmNlSWQ6IHRoaXMucmVzdWx0TGlzdC5pZCxcbiAgICAgICAgICAgIGJ1eUNvdW50OiAxLFxuICAgICAgICAgICAgYWRkcmVzc19tYWluOiAnJyxcbiAgICAgICAgICAgIG1lbW9fbWFpbjogJycsXG4gICAgICAgICAgICBkYXRlX21haW46IDRcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNyZWF0ZU9yZGVyQnV5KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flhYjpmIXor7vjgIrkvJrlkZjmnI3liqHljY/orq7jgIsnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlXG4gICAgICB0aGlzLnJlc3VsdExpc3QgPSB0aGlzLnR5cGVMaXN0WzBdXG4gICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZVxuICAgIH1cbiAgICBnZXRTZXJ2aWNlICgpIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgdGhpcy50eXBlTGlzdCA9IFtdXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTZXJ2aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICAgICAgb2JqLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgb2JqLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIF90aGlzLnR5cGVMaXN0LnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMucmVzdWx0TGlzdCA9IF90aGlzLnR5cGVMaXN0WzBdXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IC0xICYmIHJlcy5kYXRhLm1zZyA9PT0gJ21pc3MgdG9rZW4nKSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRUb2tlblRpbWUgKytcbiAgICAgICAgICAgIGlmIChfdGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgICAgICAgX3RoaXMuZ2V0U2VydmljZSgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmVycm9yID09PSAtMikge1xuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbChyZXMuZGF0YS5tc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLnVzZXJMZXZlbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJMZXZlbFxuICAgICAgY29uc29sZS5sb2codGhpcy51c2VyTGV2ZWwpXG4gICAgICB0aGlzLnZpcEVuZCA9IHRoaXMuJHBhcmVudC5kYXRlRm9ybWF0KHRoaXMudmlwRW5kICogMTAwMCwgJ1ktbS1kJylcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICB0aGlzLmdldFNlcnZpY2UoKVxuICAgIH1cbiAgfVxuIl19