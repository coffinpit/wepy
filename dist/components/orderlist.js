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
      goDetail: function goDetail(id, sourceType) {
        if (sourceType !== 7) {
          _wepy2.default.navigateTo({
            url: './detail?id=' + id
          });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVybGlzdC5qcyJdLCJuYW1lcyI6WyJPcmRlckxpc3QiLCJwcm9wcyIsIm9yZGVyTGlzdCIsIkFycmF5IiwidXNlckxldmVsIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJzb3VyY2VUeXBlIiwibmF2aWdhdGVUbyIsInVybCIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsaUJBQVdDLEtBREw7QUFFTkMsaUJBQVc7QUFDVEMsY0FBTUMsT0FERztBQUVUQyxpQkFBUztBQUZBO0FBRkwsSyxRQU9SQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDRUMsRUFERixFQUNNQyxVQUROLEVBQ2tCO0FBQ3hCLFlBQUlBLGVBQWUsQ0FBbkIsRUFBc0I7QUFDcEIseUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsaUJBQUssaUJBQWlCSDtBQURSLFdBQWhCO0FBR0Q7QUFDRjtBQVBPLEs7Ozs7OzZCQVNBO0FBQ1IsV0FBS0ksTUFBTDtBQUNEOzs7O0VBbkJvQyxlQUFLQyxTOztrQkFBdkJmLFMiLCJmaWxlIjoib3JkZXJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJMaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIHByb3BzID0ge1xuICAgICAgb3JkZXJMaXN0OiBBcnJheSxcbiAgICAgIHVzZXJMZXZlbDoge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29EZXRhaWwgKGlkLCBzb3VyY2VUeXBlKSB7XG4gICAgICAgIGlmIChzb3VyY2VUeXBlICE9PSA3KSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==