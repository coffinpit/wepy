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
      detail: ''
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "xmlns:wx": "", "type": "5" } }, _this2.$events = {}, _this2.components = {
      defect: _defect2.default
    }, _this2.methods = {
      editAdd: function editAdd() {},
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
            _this4.isNull = true;
          } else {
            _this4.isNull = false;
          }
          data.forEach(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.phone = item.phone;
            obj.add = item.address;
            obj.id = item.id;
            obj.areaId = item.areaId;
            _this.address.push(obj);
          });
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
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
      this.initAdd();
    }
  }]);

  return Address;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/address'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsImdvTmV3QWRkIiwibmF2aWdhdGVUbyIsInVybCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJKU09OIiwic3RyaW5naWZ5IiwiZWRpdE9yZGVyQWRkIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiSHR0cFJlcXVlc3QiLCJHZXRBZGRyZXNzIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInNob3dTdWNjZXNzIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJuYW1lIiwicGhvbmUiLCJhZGQiLCJhcmVhSWQiLCJwdXNoIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJpbml0QWRkIiwiY2IiLCJFZGl0T3JkZXJBZGQiLCJwYWdlIiwiZ2V0VG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxLQUhIO0FBSUxDLGdCQUFVLEVBSkw7QUFLTEMsa0JBQVksRUFMUDtBQU1MQyxn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WjtBQUNBLFlBQUlBLElBQUkzQixJQUFKLENBQVN5QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCaUIsZ0JBQU1BLElBQU47QUFDRDtBQUNGLE9BTEQ7QUFNRDs7OzJCQUNPMUQsSSxFQUFNO0FBQ1p1QyxjQUFRQyxHQUFSLENBQVl4QyxJQUFaO0FBQ0EsV0FBS0ksUUFBTCxHQUFnQkosS0FBSzRELElBQXJCO0FBQ0EsV0FBS3ZELFVBQUwsR0FBa0JMLEtBQUtLLFVBQXZCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQk4sS0FBS00sUUFBckI7QUFDQSxXQUFLQyxLQUFMLEdBQWFQLEtBQUtPLEtBQWxCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlUixLQUFLcUIsRUFBcEI7QUFDQSxXQUFLcEIsS0FBTCxHQUFhLEtBQUtpQyxPQUFMLENBQWEyQixRQUFiLEVBQWI7QUFDQSxXQUFLUixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtJLE9BQUw7QUFDRDs7OztFQTFJa0MsZUFBS0csSTs7a0JBQXJCL0QsTyIsImZpbGUiOiJhZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUtui0p+WcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGFkZHJlc3M6IFtdLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHByZXZQYWdlOiAnJyxcbiAgICAgIHNvdXJjZVR5cGU6ICcnLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgY291bnQ6ICcnLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBkZXRhaWw6ICcnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkZWZlY3RcIjp7XCJ4bWxuczp3eFwiOlwiXCIsXCJ0eXBlXCI6XCI1XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0QWRkICgpIHtcbiAgICAgIH0sXG4gICAgICBnb05ld0FkZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9uZXdBZGQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpCcsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIF90aGlzLmRlbGV0ZUFkZChpZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYmFja1RvT3JkZXIgKGluZGV4LCBpZCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ3BheWNhcnQnKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydD91c2VyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZHJlc3NbaW5kZXhdKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXlidXknKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pICsgJyZ0eXBlPScgKyB0aGlzLnNvdXJjZVR5cGUgKyAnJmlkPScgKyB0aGlzLnNvdXJjZUlkICsgJyZjb3VudD0nICsgdGhpcy5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdvcmRlcicpIHtcbiAgICAgICAgICB0aGlzLmVkaXRPcmRlckFkZChpZCwgKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ29yZGVyZGV0YWlsJykge1xuICAgICAgICAgIHRoaXMuZWRpdE9yZGVyQWRkKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyB0aGlzLm9yZGVySWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0QWRkICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkcmVzcyA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLnBob25lID0gaXRlbS5waG9uZVxuICAgICAgICAgICAgb2JqLmFkZCA9IGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmFyZWFJZCA9IGl0ZW0uYXJlYUlkXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVkaXRPcmRlckFkZCAoaWQsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkVkaXRPcmRlckFkZChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMucHJldlBhZ2UgPSBkYXRhLnBhZ2VcbiAgICAgIHRoaXMuc291cmNlVHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IGRhdGEuc291cmNlSWRcbiAgICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50XG4gICAgICB0aGlzLm9yZGVySWQgPSBkYXRhLmlkXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdEFkZCgpXG4gICAgfVxuICB9XG4iXX0=