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
      resultList: null
    }, _this2.methods = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImNoZWNrZWQiLCJyZXN1bHRMaXN0IiwibWV0aG9kcyIsImJ1eVZpcCIsImdvUnVsZXMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29TZXJ2aWNlUnVsZXMiLCJyYWRpb0NoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiY2hvb3NlVHlwZSIsImluZGV4IiwiY2FuY2VsVGFwIiwiaW5pdERhdGEiLCJhcHBseSIsImNvbmZpcm1UYXAiLCJhcHBUeXBlIiwic291cmNlVHlwZSIsInR5cGUiLCJzb3VyY2VJZCIsImlkIiwiYnV5Q291bnQiLCJhZGRyZXNzX21haW4iLCJtZW1vX21haW4iLCJkYXRlX21haW4iLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJDcmVhdGVPcmRlckJ1eSIsInRoZW4iLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJfdGhpcyIsIkdldFNlcnZpY2UiLCJlcnJvciIsImZvckVhY2giLCJpdGVtIiwib2JqIiwicHJvZHVjdE5hbWUiLCJwcmljZSIsInB1c2giLCIkYXBwbHkiLCJnZXRUb2tlbiIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwid2luZG93SGVpZ2h0IiwiZ2V0U2VydmljZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzZMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLGlCQUFXLEVBSE47QUFJTEMsZUFBUyxDQUpKO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsZUFBUyxLQU5KO0FBT0xDLGtC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LENBQWYsQ0FBbkI7QUFDRCxXQVJEO0FBU0Q7QUFDRHFDLGNBQU1TLE1BQU47QUFDRCxPQWREO0FBZUQ7Ozs2QkFDUztBQUNSLFdBQUtsRCxLQUFMLEdBQWEsS0FBS2lDLE9BQUwsQ0FBYWtCLFFBQWIsRUFBYjtBQUNBLFVBQUlWLFFBQVEsSUFBWjtBQUNBLHFCQUFLVyxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVWhCLEdBQVYsRUFBZTtBQUN0QkksZ0JBQU12QyxTQUFOLEdBQWtCbUMsSUFBSWlCLFlBQUosR0FBbUIsSUFBckM7QUFDRDtBQUhnQixPQUFuQjtBQUtBLFdBQUtKLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0ssVUFBTDtBQUNEOzs7O0VBdkdtQyxlQUFLQyxJOztrQkFBdEI1RCxRIiwiZmlsZSI6ImFwcGx5VmlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbHlWaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlLPor7fkvJrlkZgnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBpc1Nob3c6IGZhbHNlLFxuICAgICAgd2luSGVpZ2h0OiAnJyxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICB0eXBlTGlzdDogW10sXG4gICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgIHJlc3VsdExpc3Q6IG51bGxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJ1eVZpcCAoKSB7XG4gICAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TZXJ2aWNlUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc2VydmljZSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICByYWRpb0NoYW5nZSAoZSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkXG4gICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsKVxuICAgICAgfSxcbiAgICAgIGNob29zZVR5cGUgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMucmVzdWx0TGlzdCA9IHRoaXMudHlwZUxpc3RbaW5kZXhdXG4gICAgICB9LFxuICAgICAgY2FuY2VsVGFwICgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YS5hcHBseSh0aGlzKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm1UYXAgKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdExpc3QpXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ2lvcycsXG4gICAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnJlc3VsdExpc3QudHlwZSxcbiAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnJlc3VsdExpc3QuaWQsXG4gICAgICAgICAgICBidXlDb3VudDogMSxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogJycsXG4gICAgICAgICAgICBtZW1vX21haW46ICcnLFxuICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI6ZiF6K+744CK5Lya5ZGY5pyN5Yqh5Y2P6K6u44CLJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZVxuICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFswXVxuICAgICAgdGhpcy5jdXJyZW50ID0gMFxuICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2VcbiAgICB9XG4gICAgZ2V0U2VydmljZSAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIHRoaXMudHlwZUxpc3QgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgICAgIG9iai5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIG9iai50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBfdGhpcy50eXBlTGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLnJlc3VsdExpc3QgPSBfdGhpcy50eXBlTGlzdFswXVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5nZXRTZXJ2aWNlKClcbiAgICB9XG4gIH1cbiJdfQ==