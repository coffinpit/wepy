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
      region: ['广东省', '广州市', '海珠区'],
      customItem: '全部'
    }, _this2.methods = {
      bindRegionChange: function bindRegionChange(e) {
        console.log(e.detail.value);
        this.region = e.detail.value;
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
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('newAdd');
      this.$apply();
    }
  }]);

  return Address;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/newAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FkZC5qcyJdLCJuYW1lcyI6WyJBZGRyZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsInJlZ2lvbiIsImN1c3RvbUl0ZW0iLCJtZXRob2RzIiwiYmluZFJlZ2lvbkNoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwidmFsdWUiLCJpZCIsIl90aGlzIiwiYWRkcmVzc0lkIiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiRGVsZXRlQWRkcmVzcyIsInRoZW4iLCJyZXMiLCIkYXBwbHkiLCJnZXRUb2tlbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzJMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsY0FBUSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixDQUZIO0FBR0xDLGtCQUFZO0FBSFAsSyxTQUtQQyxPLEdBQVU7QUFDUkMsc0JBRFEsNEJBQ1VDLENBRFYsRUFDYTtBQUNuQkMsZ0JBQVFDLEdBQVIsQ0FBWUYsRUFBRUcsTUFBRixDQUFTQyxLQUFyQjtBQUNBLGFBQUtSLE1BQUwsR0FBY0ksRUFBRUcsTUFBRixDQUFTQyxLQUF2QjtBQUNEO0FBSk8sSzs7Ozs7OEJBTUNDLEUsRUFBSTtBQUNiLFVBQUlDLFFBQVEsSUFBWjtBQUNBLFVBQUlaLE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVRZLG1CQUFXRjtBQUZGLE9BQVg7QUFJQSxXQUFLRyxPQUFMLENBQWFDLFdBQWIsQ0FBeUJDLGFBQXpCLENBQXVDaEIsSUFBdkMsRUFBNkNpQixJQUE3QyxDQUFrRCxVQUFDQyxHQUFELEVBQVM7QUFDekROLGNBQU1PLE1BQU47QUFDRCxPQUZEO0FBR0Q7Ozs2QkFDUztBQUNSLFdBQUtsQixLQUFMLEdBQWEsS0FBS2EsT0FBTCxDQUFhTSxRQUFiLENBQXNCLFFBQXRCLENBQWI7QUFDQSxXQUFLRCxNQUFMO0FBQ0Q7Ozs7RUE1QmtDLGVBQUtFLEk7O2tCQUFyQnhCLE8iLCJmaWxlIjoibmV3QWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWsOWinuWcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHJlZ2lvbjogWyflub/kuJznnIEnLCAn5bm/5bee5biCJywgJ+a1t+ePoOWMuiddLFxuICAgICAgY3VzdG9tSXRlbTogJ+WFqOmDqCdcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRSZWdpb25DaGFuZ2UgKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpXG4gICAgICAgIHRoaXMucmVnaW9uID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBhZGRyZXNzSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGVsZXRlQWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCduZXdBZGQnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19