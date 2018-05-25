'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

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
      navigationBarTitleText: '收货地址'
    }, _this2.data = {
      token: '',
      address: [],
      isNull: false,
      prevPage: '',
      sourceType: '',
      sourceId: '',
      count: '',
      orderId: '',
      detail: '',
      getTokenTime: 0
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "xmlns:wx": "", "type": "5" } }, _this2.$events = {}, _this2.components = {
      defect: _defect2.default
    }, _this2.methods = {
      editAdd: function editAdd(param) {
        _wepy2.default.navigateTo({
          url: './editAdd?detail=' + JSON.stringify(param)
        });
      },
      goNewAdd: function goNewAdd() {
        _wepy2.default.navigateTo({
          url: './newAdd'
        });
      },
      deleteAdd: function deleteAdd(id) {
        var _this = this;
        _wepy2.default.showModal({
          title: '提示',
          content: '是否删除',
          success: function success(res) {
            if (res.confirm) {
              _this.deleteAdd(id);
            }
          }
        });
      },
      backToOrder: function backToOrder(index, id) {
        var _this3 = this;

        if (this.prevPage === 'paycart') {
          _wepy2.default.navigateTo({
            url: './paycart?user=' + JSON.stringify(this.address[index])
          });
        }
        if (this.prevPage === 'paybuy') {
          _wepy2.default.navigateTo({
            url: './paybuy?user=' + JSON.stringify(this.address[index]) + '&type=' + this.sourceType + '&id=' + this.sourceId + '&count=' + this.count
          });
        }
        if (this.prevPage === 'order') {
          this.editOrderAdd(id, function () {
            _wepy2.default.navigateTo({
              url: './order'
            });
          });
        }
        if (this.prevPage === 'orderdetail') {
          this.editOrderAdd(id, function () {
            _wepy2.default.navigateTo({
              url: './orderDetail?id=' + _this3.orderId
            });
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Address, [{
    key: 'initAdd',
    value: function initAdd() {
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.address = [];
      this.$parent.HttpRequest.GetAddress(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
          }
          data.forEach(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.phone = item.phone;
            obj.add = item.address;
            obj.id = item.id;
            obj.areaId = item.areaId;
            obj.areaFullName = item.areaFullName;
            obj.areaFullId = item.areaFullId;
            _this.address.push(obj);
          });
        } else {
          _this.isNull = true;
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initAdd();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'deleteAdd',
    value: function deleteAdd(id) {
      var _this5 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        addressId: id
      };
      this.$parent.HttpRequest.DeleteAddress(data).then(function (res) {
        if (res.data.error === 0) {
          _this.initAdd();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'editOrderAdd',
    value: function editOrderAdd(id, cb) {
      var _this6 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.orderId,
        addressId: id
      };
      this.$parent.HttpRequest.EditOrderAdd(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this6.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(data) {
      console.log(data);
      this.prevPage = data.page;
      this.sourceType = data.sourceType;
      this.sourceId = data.sourceId;
      this.count = data.count;
      this.orderId = data.id;
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initAdd();
    }
  }]);

  return Address;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/address'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCJnZXRUb2tlblRpbWUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsInBhcmFtIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb05ld0FkZCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJlZGl0T3JkZXJBZGQiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIkh0dHBSZXF1ZXN0IiwiR2V0QWRkcmVzcyIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzaG93U3VjY2VzcyIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwib2JqIiwibmFtZSIsInBob25lIiwiYWRkIiwiYXJlYUlkIiwiYXJlYUZ1bGxOYW1lIiwiYXJlYUZ1bGxJZCIsInB1c2giLCJtaXNzVG9rZW4iLCJpbml0QWRkIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJjYiIsIkVkaXRPcmRlckFkZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFT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RCxNQUVPO0FBQ0wsY0FBSXRDLE1BQU1VLE9BQU4sQ0FBY3FCLFNBQWxCLEVBQTZCO0FBQzNCL0Isa0JBQU16QixLQUFOLEdBQWMsT0FBS21DLE9BQUwsQ0FBYUMsUUFBYixDQUFzQk4sSUFBSS9CLElBQUosQ0FBUzRDLEtBQS9CLENBQWQ7QUFDRDtBQUNGO0FBQ0YsT0FURDtBQVVEOzs7MkJBQ081QyxJLEVBQU07QUFDWjBDLGNBQVFDLEdBQVIsQ0FBWTNDLElBQVo7QUFDQSxXQUFLSSxRQUFMLEdBQWdCSixLQUFLa0UsSUFBckI7QUFDQSxXQUFLN0QsVUFBTCxHQUFrQkwsS0FBS0ssVUFBdkI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCTixLQUFLTSxRQUFyQjtBQUNBLFdBQUtDLEtBQUwsR0FBYVAsS0FBS08sS0FBbEI7QUFDQSxXQUFLQyxPQUFMLEdBQWVSLEtBQUt5QixFQUFwQjtBQUNBLFdBQUtrQyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtELE9BQUw7QUFDRDs7OztFQWxLa0MsZUFBS1EsSTs7a0JBQXJCckUsTyIsImZpbGUiOiJhZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUtui0p+WcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGFkZHJlc3M6IFtdLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHByZXZQYWdlOiAnJyxcbiAgICAgIHNvdXJjZVR5cGU6ICcnLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgY291bnQ6ICcnLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBkZXRhaWw6ICcnLFxuICAgICAgZ2V0VG9rZW5UaW1lOiAwXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkZWZlY3RcIjp7XCJ4bWxuczp3eFwiOlwiXCIsXCJ0eXBlXCI6XCI1XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0QWRkIChwYXJhbSkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZWRpdEFkZD9kZXRhaWw9JyArIEpTT04uc3RyaW5naWZ5KHBhcmFtKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvTmV3QWRkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL25ld0FkZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6ZmkJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlQWRkKGlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiYWNrVG9PcmRlciAoaW5kZXgsIGlkKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAncGF5Y2FydCcpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXljYXJ0P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ3BheWJ1eScpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXlidXk/dXNlcj0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5hZGRyZXNzW2luZGV4XSkgKyAnJnR5cGU9JyArIHRoaXMuc291cmNlVHlwZSArICcmaWQ9JyArIHRoaXMuc291cmNlSWQgKyAnJmNvdW50PScgKyB0aGlzLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ29yZGVyJykge1xuICAgICAgICAgIHRoaXMuZWRpdE9yZGVyQWRkKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAnb3JkZXJkZXRhaWwnKSB7XG4gICAgICAgICAgdGhpcy5lZGl0T3JkZXJBZGQoaWQsICgpID0+IHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vb3JkZXJEZXRhaWw/aWQ9JyArIHRoaXMub3JkZXJJZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXRBZGQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLmFkZHJlc3MgPSBbXVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldEFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLnBob25lID0gaXRlbS5waG9uZVxuICAgICAgICAgICAgb2JqLmFkZCA9IGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmFyZWFJZCA9IGl0ZW0uYXJlYUlkXG4gICAgICAgICAgICBvYmouYXJlYUZ1bGxOYW1lID0gaXRlbS5hcmVhRnVsbE5hbWVcbiAgICAgICAgICAgIG9iai5hcmVhRnVsbElkID0gaXRlbS5hcmVhRnVsbElkXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGRlbGV0ZUFkZCAoaWQpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBhZGRyZXNzSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGVsZXRlQWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaW5pdEFkZCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVkaXRPcmRlckFkZCAoaWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxuICAgICAgICBhZGRyZXNzSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRWRpdE9yZGVyQWRkKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChkYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy5wcmV2UGFnZSA9IGRhdGEucGFnZVxuICAgICAgdGhpcy5zb3VyY2VUeXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICB0aGlzLnNvdXJjZUlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgdGhpcy5jb3VudCA9IGRhdGEuY291bnRcbiAgICAgIHRoaXMub3JkZXJJZCA9IGRhdGEuaWRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdEFkZCgpXG4gICAgfVxuICB9XG4iXX0=