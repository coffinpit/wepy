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

var Recommend = function (_wepy$component) {
  _inherits(Recommend, _wepy$component);

  function Recommend() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Recommend);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Recommend.__proto__ || Object.getPrototypeOf(Recommend)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      recommendList: Array,
      userLevel: {
        type: Number,
        default: 0
      }
    }, _this.data = {}, _this.methods = {
      tap: function tap(id) {
        this.$emit('goodsTap', id);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Recommend, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Recommend;
}(_wepy2.default.component);

exports.default = Recommend;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29tbWVuZC5qcyJdLCJuYW1lcyI6WyJSZWNvbW1lbmQiLCJwcm9wcyIsInJlY29tbWVuZExpc3QiLCJBcnJheSIsInVzZXJMZXZlbCIsInR5cGUiLCJOdW1iZXIiLCJkZWZhdWx0IiwiZGF0YSIsIm1ldGhvZHMiLCJ0YXAiLCJpZCIsIiRlbWl0IiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxxQkFBZUMsS0FEVDtBQUVOQyxpQkFBVztBQUNUQyxjQUFNQyxNQURHO0FBRVRDLGlCQUFTO0FBRkE7QUFGTCxLLFFBT1JDLEksR0FBTyxFLFFBRVBDLE8sR0FBVTtBQUNSQyxTQURRLGVBQ0hDLEVBREcsRUFDQztBQUNQLGFBQUtDLEtBQUwsQ0FBVyxVQUFYLEVBQXVCRCxFQUF2QjtBQUNEO0FBSE8sSzs7Ozs7NkJBS0E7QUFDUixXQUFLRSxNQUFMO0FBQ0Q7Ozs7RUFqQm9DLGVBQUtDLFM7O2tCQUF2QmQsUyIsImZpbGUiOiJyZWNvbW1lbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29tbWVuZCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIHJlY29tbWVuZExpc3Q6IEFycmF5LFxuICAgICAgdXNlckxldmVsOiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgZGVmYXVsdDogMFxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgdGFwIChpZCkge1xuICAgICAgICB0aGlzLiRlbWl0KCdnb29kc1RhcCcsIGlkKVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19