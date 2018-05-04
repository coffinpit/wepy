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

var Address = function (_wepy$page) {
  _inherits(Address, _wepy$page);

  function Address() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Address);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Address.__proto__ || Object.getPrototypeOf(Address)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '新增地址'
    }, _this2.data = {
      token: '',
      index: 0,
      topArea: []
    }, _this2.methods = {
      bindRegionChange: function bindRegionChange(e) {
        console.log(e.detail.value);
        this.index = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Address, [{
    key: 'deleteAdd',
    value: function deleteAdd(id) {
      var _this = this;
      var data = {
        token: this.token,
        addressId: id
      };
      this.$parent.HttpRequest.DeleteAddress(data).then(function (res) {
        _this.$apply();
      });
    }
  }, {
    key: 'initTopArea',
    value: function initTopArea() {
      var data = {};
      this.$parent.HttpRequest.GetTopArea(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.initTopArea();
      this.token = this.$parent.getToken('newAdd');
      this.$apply();
    }
  }]);

  return Address;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/newAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FkZC5qcyJdLCJuYW1lcyI6WyJBZGRyZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsImluZGV4IiwidG9wQXJlYSIsIm1ldGhvZHMiLCJiaW5kUmVnaW9uQ2hhbmdlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsImlkIiwiX3RoaXMiLCJhZGRyZXNzSWQiLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJEZWxldGVBZGRyZXNzIiwidGhlbiIsInJlcyIsIiRhcHBseSIsIkdldFRvcEFyZWEiLCJpbml0VG9wQXJlYSIsImdldFRva2VuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxhQUFPLENBRkY7QUFHTEMsZUFBUztBQUhKLEssU0FLUEMsTyxHQUFVO0FBQ1JDLHNCQURRLDRCQUNVQyxDQURWLEVBQ2E7QUFDbkJDLGdCQUFRQyxHQUFSLENBQVlGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBckI7QUFDQSxhQUFLUixLQUFMLEdBQWFJLEVBQUVHLE1BQUYsQ0FBU0MsS0FBdEI7QUFDRDtBQUpPLEs7Ozs7OzhCQU1DQyxFLEVBQUk7QUFDYixVQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFJWixPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUWSxtQkFBV0Y7QUFGRixPQUFYO0FBSUEsV0FBS0csT0FBTCxDQUFhQyxXQUFiLENBQXlCQyxhQUF6QixDQUF1Q2hCLElBQXZDLEVBQTZDaUIsSUFBN0MsQ0FBa0QsVUFBQ0MsR0FBRCxFQUFTO0FBQ3pETixjQUFNTyxNQUFOO0FBQ0QsT0FGRDtBQUdEOzs7a0NBQ2M7QUFDYixVQUFJbkIsT0FBTyxFQUFYO0FBQ0EsV0FBS2MsT0FBTCxDQUFhQyxXQUFiLENBQXlCSyxVQUF6QixDQUFvQ3BCLElBQXBDLEVBQTBDaUIsSUFBMUMsQ0FBK0MsVUFBQ0MsR0FBRCxFQUFTO0FBQ3REWCxnQkFBUUMsR0FBUixDQUFZVSxHQUFaO0FBQ0QsT0FGRDtBQUdEOzs7NkJBQ1M7QUFDUixXQUFLRyxXQUFMO0FBQ0EsV0FBS3BCLEtBQUwsR0FBYSxLQUFLYSxPQUFMLENBQWFRLFFBQWIsQ0FBc0IsUUFBdEIsQ0FBYjtBQUNBLFdBQUtILE1BQUw7QUFDRDs7OztFQW5Da0MsZUFBS0ksSTs7a0JBQXJCMUIsTyIsImZpbGUiOiJuZXdBZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5paw5aKe5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICB0b3BBcmVhOiBbXVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgYmluZFJlZ2lvbkNoYW5nZSAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgdGhpcy5pbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZUFkZCAoaWQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0VG9wQXJlYSAoKSB7XG4gICAgICB2YXIgZGF0YSA9IHt9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VG9wQXJlYShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignbmV3QWRkJylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==