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

var Service = function (_wepy$page) {
  _inherits(Service, _wepy$page);

  function Service() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Service);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Service.__proto__ || Object.getPrototypeOf(Service)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '会员服务协议'
    }, _this.data = {
      url: ''
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Service, [{
    key: 'onLoad',
    value: function onLoad() {
      this.url = this.$parent.HttpRequest.$$baseHtml + this.$parent.HttpRequest.$$pathHtml.service;
      this.$apply();
    }
  }]);

  return Service;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Service , 'pages/service'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UuanMiXSwibmFtZXMiOlsiU2VydmljZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidXJsIiwibWV0aG9kcyIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIiQkYmFzZUh0bWwiLCIkJHBhdGhIdG1sIiwic2VydmljZSIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxXQUFLO0FBREEsSyxRQUdQQyxPLEdBQVUsRTs7Ozs7NkJBRUE7QUFDUixXQUFLRCxHQUFMLEdBQVcsS0FBS0UsT0FBTCxDQUFhQyxXQUFiLENBQXlCQyxVQUF6QixHQUFzQyxLQUFLRixPQUFMLENBQWFDLFdBQWIsQ0FBeUJFLFVBQXpCLENBQW9DQyxPQUFyRjtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7OztFQVprQyxlQUFLQyxJOztrQkFBckJaLE8iLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZpY2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJrlkZjmnI3liqHljY/orq4nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB1cmw6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnVybCA9IHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC4kJGJhc2VIdG1sICsgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LiQkcGF0aEh0bWwuc2VydmljZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19