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
          if (res.data.error === -1 && res.data.msg === 'miss token') {
            _this.getTokenTime++;
            if (_this.getTokenTime < 3) {
              _this.token = _this4.$parent.getToken();
              _this.initAdd();
            } else {
              _this.$parent.showFail();
            }
          } else if (res.data.error === -2) {
            _this.$parent.showFail(res.data.msg);
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
      var _this = this;
      var data = {
        token: this.token,
        addressId: id
      };
      this.$parent.HttpRequest.DeleteAddress(data).then(function (res) {
        _this.initAdd();
        _this.$apply();
      });
    }
  }, {
    key: 'editOrderAdd',
    value: function editOrderAdd(id, cb) {
      var data = {
        token: this.token,
        orderId: this.orderId,
        addressId: id
      };
      this.$parent.HttpRequest.EditOrderAdd(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
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
      this.token = this.$parent.getToken();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.getTokenTime = 0;
      this.initAdd();
    }
  }]);

  return Address;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/address'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCJnZXRUb2tlblRpbWUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsInBhcmFtIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb05ld0FkZCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJlZGl0T3JkZXJBZGQiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldEFkZHJlc3MiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm5hbWUiLCJwaG9uZSIsImFkZCIsImFyZWFJZCIsImFyZWFGdWxsTmFtZSIsImFyZWFGdWxsSWQiLCJwdXNoIiwibXNnIiwiZ2V0VG9rZW4iLCJpbml0QWRkIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJjYiIsIkVkaXRPcmRlckFkZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFTLEVBRko7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LEtBQUtLLFVBQXZCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQk4sS0FBS00sUUFBckI7QUFDQSxXQUFLQyxLQUFMLEdBQWFQLEtBQUtPLEtBQWxCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlUixLQUFLeUIsRUFBcEI7QUFDQSxXQUFLeEIsS0FBTCxHQUFhLEtBQUttQyxPQUFMLENBQWFxQixRQUFiLEVBQWI7QUFDQSxXQUFLRyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtsRCxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsV0FBS2dELE9BQUw7QUFDRDs7OztFQTdKa0MsZUFBS1EsSTs7a0JBQXJCckUsTyIsImZpbGUiOiJhZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUtui0p+WcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGFkZHJlc3M6IFtdLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHByZXZQYWdlOiAnJyxcbiAgICAgIHNvdXJjZVR5cGU6ICcnLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgY291bnQ6ICcnLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBkZXRhaWw6ICcnLFxuICAgICAgZ2V0VG9rZW5UaW1lOiAwXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkZWZlY3RcIjp7XCJ4bWxuczp3eFwiOlwiXCIsXCJ0eXBlXCI6XCI1XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0QWRkIChwYXJhbSkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZWRpdEFkZD9kZXRhaWw9JyArIEpTT04uc3RyaW5naWZ5KHBhcmFtKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvTmV3QWRkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL25ld0FkZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6ZmkJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlQWRkKGlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiYWNrVG9PcmRlciAoaW5kZXgsIGlkKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAncGF5Y2FydCcpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXljYXJ0P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ3BheWJ1eScpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXlidXk/dXNlcj0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5hZGRyZXNzW2luZGV4XSkgKyAnJnR5cGU9JyArIHRoaXMuc291cmNlVHlwZSArICcmaWQ9JyArIHRoaXMuc291cmNlSWQgKyAnJmNvdW50PScgKyB0aGlzLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ29yZGVyJykge1xuICAgICAgICAgIHRoaXMuZWRpdE9yZGVyQWRkKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAnb3JkZXJkZXRhaWwnKSB7XG4gICAgICAgICAgdGhpcy5lZGl0T3JkZXJBZGQoaWQsICgpID0+IHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vb3JkZXJEZXRhaWw/aWQ9JyArIHRoaXMub3JkZXJJZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXRBZGQgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5hZGRyZXNzID0gW11cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5waG9uZSA9IGl0ZW0ucGhvbmVcbiAgICAgICAgICAgIG9iai5hZGQgPSBpdGVtLmFkZHJlc3NcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5hcmVhSWQgPSBpdGVtLmFyZWFJZFxuICAgICAgICAgICAgb2JqLmFyZWFGdWxsTmFtZSA9IGl0ZW0uYXJlYUZ1bGxOYW1lXG4gICAgICAgICAgICBvYmouYXJlYUZ1bGxJZCA9IGl0ZW0uYXJlYUZ1bGxJZFxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IC0xICYmIHJlcy5kYXRhLm1zZyA9PT0gJ21pc3MgdG9rZW4nKSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRUb2tlblRpbWUgKytcbiAgICAgICAgICAgIGlmIChfdGhpcy5nZXRUb2tlblRpbWUgPCAzKSB7XG4gICAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgICAgICAgX3RoaXMuaW5pdEFkZCgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmVycm9yID09PSAtMikge1xuICAgICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbChyZXMuZGF0YS5tc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVkaXRPcmRlckFkZCAoaWQsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkVkaXRPcmRlckFkZChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMucHJldlBhZ2UgPSBkYXRhLnBhZ2VcbiAgICAgIHRoaXMuc291cmNlVHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IGRhdGEuc291cmNlSWRcbiAgICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50XG4gICAgICB0aGlzLm9yZGVySWQgPSBkYXRhLmlkXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuZ2V0VG9rZW5UaW1lID0gMFxuICAgICAgdGhpcy5pbml0QWRkKClcbiAgICB9XG4gIH1cbiJdfQ==