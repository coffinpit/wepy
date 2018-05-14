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
      navigationBarTitleText: '身份购买'
    }, _this2.data = {
      token: '',
      isShow: false,
      winHeight: '',
      current: 0,
      typeList: [],
      isRead: false,
      checked: false
    }, _this2.methods = {
      buyVip: function buyVip() {
        this.isShow = true;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(ApplyVip, [{
    key: 'getService',
    value: function getService() {
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetService(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.title = item.productName;
            obj.price = item.price;
            obj.id = item.sourceId;
            obj.type = item.sourceType;
            _this.typeList.push(obj);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5VmlwLmpzIl0sIm5hbWVzIjpbIkFwcGx5VmlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImlzU2hvdyIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJ0eXBlTGlzdCIsImlzUmVhZCIsImNoZWNrZWQiLCJtZXRob2RzIiwiYnV5VmlwIiwiX3RoaXMiLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJHZXRTZXJ2aWNlIiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidGl0bGUiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwiaWQiLCJzb3VyY2VJZCIsInR5cGUiLCJzb3VyY2VUeXBlIiwicHVzaCIsIiRhcHBseSIsImdldFRva2VuIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJnZXRTZXJ2aWNlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7NkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxjQUFRLEtBRkg7QUFHTEMsaUJBQVcsRUFITjtBQUlMQyxlQUFTLENBSko7QUFLTEMsZ0JBQVUsRUFMTDtBQU1MQyxjQUFRLEtBTkg7QUFPTEMsZUFBUztBQVBKLEssU0FTUEMsTyxHQUFVO0FBQ1JDLFlBRFEsb0JBQ0U7QUFDUixhQUFLUCxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBSE8sSzs7Ozs7aUNBS0k7QUFDWixVQUFJUSxRQUFRLElBQVo7QUFDQSxVQUFJVixPQUFPO0FBQ1RDLGVBQU8sS0FBS0E7QUFESCxPQUFYO0FBR0EsV0FBS1UsT0FBTCxDQUFhQyxXQUFiLENBQXlCQyxVQUF6QixDQUFvQ2IsSUFBcEMsRUFBMENjLElBQTFDLENBQStDLFVBQUNDLEdBQUQsRUFBUztBQUN0REMsZ0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLFlBQUlBLElBQUlmLElBQUosQ0FBU2tCLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsY0FBSWxCLE9BQU9lLElBQUlmLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsZUFBS21CLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsZ0JBQUlDLE1BQU0sRUFBVjtBQUNBQSxnQkFBSUMsS0FBSixHQUFZRixLQUFLRyxXQUFqQjtBQUNBRixnQkFBSUcsS0FBSixHQUFZSixLQUFLSSxLQUFqQjtBQUNBSCxnQkFBSUksRUFBSixHQUFTTCxLQUFLTSxRQUFkO0FBQ0FMLGdCQUFJTSxJQUFKLEdBQVdQLEtBQUtRLFVBQWhCO0FBQ0FsQixrQkFBTUwsUUFBTixDQUFld0IsSUFBZixDQUFvQlIsR0FBcEI7QUFDRCxXQVBEO0FBUUQ7QUFDRFgsY0FBTW9CLE1BQU47QUFDRCxPQWREO0FBZUQ7Ozs2QkFDUztBQUNSLFdBQUs3QixLQUFMLEdBQWEsS0FBS1UsT0FBTCxDQUFhb0IsUUFBYixFQUFiO0FBQ0EsVUFBSXJCLFFBQVEsSUFBWjtBQUNBLHFCQUFLc0IsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVsQixHQUFWLEVBQWU7QUFDdEJMLGdCQUFNUCxTQUFOLEdBQWtCWSxJQUFJbUIsWUFBSixHQUFtQixJQUFyQztBQUNEO0FBSGdCLE9BQW5CO0FBS0EsV0FBS0osTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLSyxVQUFMO0FBQ0Q7Ozs7RUFuRG1DLGVBQUtDLEk7O2tCQUF0QnZDLFEiLCJmaWxlIjoiYXBwbHlWaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBseVZpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i6q+S7vei0reS5sCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGlzU2hvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6ICcnLFxuICAgICAgY3VycmVudDogMCxcbiAgICAgIHR5cGVMaXN0OiBbXSxcbiAgICAgIGlzUmVhZDogZmFsc2UsXG4gICAgICBjaGVja2VkOiBmYWxzZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgYnV5VmlwICgpIHtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGdldFNlcnZpY2UgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0U2VydmljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRpdGxlID0gaXRlbS5wcm9kdWN0TmFtZVxuICAgICAgICAgICAgb2JqLnByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgb2JqLnR5cGUgPSBpdGVtLnNvdXJjZVR5cGVcbiAgICAgICAgICAgIF90aGlzLnR5cGVMaXN0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5nZXRTZXJ2aWNlKClcbiAgICB9XG4gIH1cbiJdfQ==