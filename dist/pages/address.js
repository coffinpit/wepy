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
            obj.areaFullName = item.areaFullName;
            obj.areaFullId = item.areaFullId;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsInBhcmFtIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb05ld0FkZCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJlZGl0T3JkZXJBZGQiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldEFkZHJlc3MiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm5hbWUiLCJwaG9uZSIsImFkZCIsImFyZWFJZCIsImFyZWFGdWxsTmFtZSIsImFyZWFGdWxsSWQiLCJwdXNoIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJpbml0QWRkIiwiY2IiLCJFZGl0T3JkZXJBZGQiLCJwYWdlIiwiZ2V0VG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxLQUhIO0FBSUxD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RCxPQUFPO0FBQ1RDLGVBQU8sS0FBS0EsS0FESDtBQUVUTyxpQkFBUyxLQUFLQSxPQUZMO0FBR1RrRCxtQkFBV2xDO0FBSEYsT0FBWDtBQUtBLFdBQUtXLE9BQUwsQ0FBYUUsV0FBYixDQUF5QnlCLFlBQXpCLENBQXNDOUQsSUFBdEMsRUFBNEN1QyxJQUE1QyxDQUFpRCxVQUFDVCxHQUFELEVBQVM7QUFDeERVLGdCQUFRQyxHQUFSLENBQVlYLEdBQVo7QUFDQSxZQUFJQSxJQUFJOUIsSUFBSixDQUFTMEMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4Qm1CLGdCQUFNQSxJQUFOO0FBQ0Q7QUFDRixPQUxEO0FBTUQ7OzsyQkFDTzdELEksRUFBTTtBQUNad0MsY0FBUUMsR0FBUixDQUFZekMsSUFBWjtBQUNBLFdBQUtJLFFBQUwsR0FBZ0JKLEtBQUsrRCxJQUFyQjtBQUNBLFdBQUsxRCxVQUFMLEdBQWtCTCxLQUFLSyxVQUF2QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JOLEtBQUtNLFFBQXJCO0FBQ0EsV0FBS0MsS0FBTCxHQUFhUCxLQUFLTyxLQUFsQjtBQUNBLFdBQUtDLE9BQUwsR0FBZVIsS0FBS3dCLEVBQXBCO0FBQ0EsV0FBS3ZCLEtBQUwsR0FBYSxLQUFLa0MsT0FBTCxDQUFhNkIsUUFBYixFQUFiO0FBQ0EsV0FBS1IsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLSSxPQUFMO0FBQ0Q7Ozs7RUEvSWtDLGVBQUtHLEk7O2tCQUFyQmxFLE8iLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbotKflnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBhZGRyZXNzOiBbXSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBwcmV2UGFnZTogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgZGV0YWlsOiAnJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZGVmZWN0XCI6e1wieG1sbnM6d3hcIjpcIlwiLFwidHlwZVwiOlwiNVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFkZCAocGFyYW0pIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2VkaXRBZGQ/ZGV0YWlsPScgKyBKU09OLnN0cmluZ2lmeShwYXJhbSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb05ld0FkZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9uZXdBZGQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpCcsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIF90aGlzLmRlbGV0ZUFkZChpZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYmFja1RvT3JkZXIgKGluZGV4LCBpZCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ3BheWNhcnQnKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydD91c2VyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZHJlc3NbaW5kZXhdKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXlidXknKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pICsgJyZ0eXBlPScgKyB0aGlzLnNvdXJjZVR5cGUgKyAnJmlkPScgKyB0aGlzLnNvdXJjZUlkICsgJyZjb3VudD0nICsgdGhpcy5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdvcmRlcicpIHtcbiAgICAgICAgICB0aGlzLmVkaXRPcmRlckFkZChpZCwgKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ29yZGVyZGV0YWlsJykge1xuICAgICAgICAgIHRoaXMuZWRpdE9yZGVyQWRkKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyB0aGlzLm9yZGVySWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0QWRkICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkcmVzcyA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLnBob25lID0gaXRlbS5waG9uZVxuICAgICAgICAgICAgb2JqLmFkZCA9IGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmFyZWFJZCA9IGl0ZW0uYXJlYUlkXG4gICAgICAgICAgICBvYmouYXJlYUZ1bGxOYW1lID0gaXRlbS5hcmVhRnVsbE5hbWVcbiAgICAgICAgICAgIG9iai5hcmVhRnVsbElkID0gaXRlbS5hcmVhRnVsbElkXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVkaXRPcmRlckFkZCAoaWQsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkVkaXRPcmRlckFkZChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMucHJldlBhZ2UgPSBkYXRhLnBhZ2VcbiAgICAgIHRoaXMuc291cmNlVHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IGRhdGEuc291cmNlSWRcbiAgICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50XG4gICAgICB0aGlzLm9yZGVySWQgPSBkYXRhLmlkXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdEFkZCgpXG4gICAgfVxuICB9XG4iXX0=