'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vip = function (_wepy$component) {
  _inherits(Vip, _wepy$component);

  function Vip() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Vip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Vip.__proto__ || Object.getPrototypeOf(Vip)).call.apply(_ref, [this].concat(args))), _this2), _this2.props = {
      isShow: {
        type: Boolean,
        default: false
      }
    }, _this2.data = {
      current: 0,
      typeList: [],
      checked: false,
      resultList: null
    }, _this2.methods = {
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

  _createClass(Vip, [{
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
        console.log(_this.resultList);
        _this.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      console.log(this.isShow);
      this.getService();
      this.$apply();
    }
  }]);

  return Vip;
}(_wepy2.default.component);

exports.default = Vip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpcC5qcyJdLCJuYW1lcyI6WyJWaXAiLCJwcm9wcyIsImlzU2hvdyIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsImRhdGEiLCJjdXJyZW50IiwidHlwZUxpc3QiLCJjaGVja2VkIiwicmVzdWx0TGlzdCIsIm1ldGhvZHMiLCJnb1J1bGVzIiwibmF2aWdhdGVUbyIsInVybCIsImdvU2VydmljZVJ1bGVzIiwicmFkaW9DaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImNob29zZVR5cGUiLCJpbmRleCIsImNhbmNlbFRhcCIsImluaXREYXRhIiwiYXBwbHkiLCJjb25maXJtVGFwIiwidG9rZW4iLCJhcHBUeXBlIiwic291cmNlVHlwZSIsInNvdXJjZUlkIiwiaWQiLCJidXlDb3VudCIsImFkZHJlc3NfbWFpbiIsIm1lbW9fbWFpbiIsImRhdGVfbWFpbiIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIkNyZWF0ZU9yZGVyQnV5IiwidGhlbiIsInJlcyIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIl90aGlzIiwiR2V0U2VydmljZSIsImVycm9yIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwicHVzaCIsIiRhcHBseSIsImdldFNlcnZpY2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7O21MQUNuQkMsSyxHQUFRO0FBQ05DLGNBQVE7QUFDTkMsY0FBTUMsT0FEQTtBQUVOQyxpQkFBUztBQUZIO0FBREYsSyxTQU1SQyxJLEdBQU87QUFDTEMsZUFBUyxDQURKO0FBRUxDLGdCQUFVLEVBRkw7QUFHTEMsZUFBUyxLQUhKO0FBSUxDLGtCQUFZO0FBSlAsSyxTQU1QQyxPLEdBQVU7QUFDUkMsYUFEUSxxQkFDRztBQUNULHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BTE87QUFNUkMs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LE1BQWpCO0FBQ0EsV0FBS29ELFVBQUw7QUFDQSxXQUFLRCxNQUFMO0FBQ0Q7Ozs7RUFoRzhCLGVBQUtFLFM7O2tCQUFqQnZELEciLCJmaWxlIjoidmlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIFxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWaXAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBpc1Nob3c6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICB0eXBlTGlzdDogW10sXG4gICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgIHJlc3VsdExpc3Q6IG51bGxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vcnVsZXMnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29TZXJ2aWNlUnVsZXMgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc2VydmljZSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICByYWRpb0NoYW5nZSAoZSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkXG4gICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsKVxuICAgICAgfSxcbiAgICAgIGNob29zZVR5cGUgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMucmVzdWx0TGlzdCA9IHRoaXMudHlwZUxpc3RbaW5kZXhdXG4gICAgICB9LFxuICAgICAgY2FuY2VsVGFwICgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YS5hcHBseSh0aGlzKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm1UYXAgKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdExpc3QpXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgYXBwVHlwZTogJ2lvcycsXG4gICAgICAgICAgICBzb3VyY2VUeXBlOiB0aGlzLnJlc3VsdExpc3QudHlwZSxcbiAgICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnJlc3VsdExpc3QuaWQsXG4gICAgICAgICAgICBidXlDb3VudDogMSxcbiAgICAgICAgICAgIGFkZHJlc3NfbWFpbjogJycsXG4gICAgICAgICAgICBtZW1vX21haW46ICcnLFxuICAgICAgICAgICAgZGF0ZV9tYWluOiA0XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DcmVhdGVPcmRlckJ1eShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35YWI6ZiF6K+744CK5Lya5ZGY5pyN5Yqh5Y2P6K6u44CLJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZVxuICAgICAgdGhpcy5yZXN1bHRMaXN0ID0gdGhpcy50eXBlTGlzdFswXVxuICAgICAgdGhpcy5jdXJyZW50ID0gMFxuICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2VcbiAgICB9XG4gICAgZ2V0U2VydmljZSAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIHRoaXMudHlwZUxpc3QgPSBbXVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0ucHJvZHVjdE5hbWVcbiAgICAgICAgICAgIG9iai5wcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIG9iai50eXBlID0gaXRlbS5zb3VyY2VUeXBlXG4gICAgICAgICAgICBfdGhpcy50eXBlTGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLnJlc3VsdExpc3QgPSBfdGhpcy50eXBlTGlzdFswXVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coX3RoaXMucmVzdWx0TGlzdClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmlzU2hvdylcbiAgICAgIHRoaXMuZ2V0U2VydmljZSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=