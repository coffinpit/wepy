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

var OrderList = function (_wepy$component) {
  _inherits(OrderList, _wepy$component);

  function OrderList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      orderList: Array,
      userLevel: {
        type: Boolean,
        default: false
      }
    }, _this.methods = {
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderList, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return OrderList;
}(_wepy2.default.component);

exports.default = OrderList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJPcmRlckxpc3QiLCJwcm9wcyIsIm9yZGVyTGlzdCIsIkFycmF5IiwidXNlckxldmVsIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBV0MsS0FETDtBQUVOQyxpQkFBVztBQUNUQyxjQUFNQyxPQURHO0FBRVRDLGlCQUFTO0FBRkE7QUFGTCxLLFFBT1JDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNFQyxFQURGLEVBQ007QUFDWix1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLGlCQUFpQkY7QUFEUixTQUFoQjtBQUdEO0FBTE8sSzs7Ozs7NkJBT0E7QUFDUixXQUFLRyxNQUFMO0FBQ0Q7Ozs7RUFqQm9DLGVBQUtDLFM7O2tCQUF2QmQsUyIsImZpbGUiOiJvcmRlcmxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckxpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBvcmRlckxpc3Q6IEFycmF5LFxuICAgICAgdXNlckxldmVsOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==