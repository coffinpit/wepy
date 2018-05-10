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
      count: ''
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "xmlns:wx": "" } }, _this2.$events = {}, _this2.components = {
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
      backToOrder: function backToOrder(index) {
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
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Address, [{
    key: 'initAdd',
    value: function initAdd() {
      var _this3 = this;

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
            _this3.isNull = true;
          } else {
            _this3.isNull = false;
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
    key: 'onLoad',
    value: function onLoad(data) {
      console.log(data);
      this.prevPage = data.page;
      this.sourceType = data.sourceType;
      this.sourceId = data.sourceId;
      this.count = data.count;
      this.token = this.$parent.getToken('address');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRlZmVjdCIsIm1ldGhvZHMiLCJlZGl0QWRkIiwiZ29OZXdBZGQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZGVsZXRlQWRkIiwiaWQiLCJfdGhpcyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiYmFja1RvT3JkZXIiLCJpbmRleCIsIkpTT04iLCJzdHJpbmdpZnkiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldEFkZHJlc3MiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm5hbWUiLCJwaG9uZSIsImFkZCIsImFyZWFJZCIsInB1c2giLCJzaG93RmFpbCIsIiRhcHBseSIsImNhdGNoIiwiYWRkcmVzc0lkIiwiRGVsZXRlQWRkcmVzcyIsImluaXRBZGQiLCJwYWdlIiwiZ2V0VG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxLQUhIO0FBSUxDLGdCQUFVLEVBSkw7QUFLTEMsa0JBQVksRUFMUDtBQU1MQyxnQkFBVSxFQU5MO0FBT0xDLGFBQU87QUFQRixLLFNBU1JDLE8sR0FBVSxFLFNBQ2JDLE0sR0FB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OzhCQUNVOUIsRSxFQUFJO0FBQ2IsVUFBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBSXBCLE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVRtRCxtQkFBV2pDO0FBRkYsT0FBWDtBQUlBLFdBQUtZLE9BQUwsQ0FBYUUsV0FBYixDQUF5Qm9CLGFBQXpCLENBQXVDckQsSUFBdkMsRUFBNkNtQyxJQUE3QyxDQUFrRCxVQUFDVixHQUFELEVBQVM7QUFDekRMLGNBQU1rQyxPQUFOO0FBQ0FsQyxjQUFNOEIsTUFBTjtBQUNELE9BSEQ7QUFJRDs7OzJCQUNPbEQsSSxFQUFNO0FBQ1pvQyxjQUFRQyxHQUFSLENBQVlyQyxJQUFaO0FBQ0EsV0FBS0ksUUFBTCxHQUFnQkosS0FBS3VELElBQXJCO0FBQ0EsV0FBS2xELFVBQUwsR0FBa0JMLEtBQUtLLFVBQXZCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQk4sS0FBS00sUUFBckI7QUFDQSxXQUFLQyxLQUFMLEdBQWFQLEtBQUtPLEtBQWxCO0FBQ0EsV0FBS04sS0FBTCxHQUFhLEtBQUs4QixPQUFMLENBQWF5QixRQUFiLENBQXNCLFNBQXRCLENBQWI7QUFDQSxXQUFLTixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtJLE9BQUw7QUFDRDs7OztFQTVHa0MsZUFBS0MsSTs7a0JBQXJCMUQsTyIsImZpbGUiOiJhZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUtui0p+WcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGFkZHJlc3M6IFtdLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHByZXZQYWdlOiAnJyxcbiAgICAgIHNvdXJjZVR5cGU6ICcnLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgY291bnQ6ICcnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkZWZlY3RcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0QWRkICgpIHtcbiAgICAgIH0sXG4gICAgICBnb05ld0FkZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9uZXdBZGQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpCcsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIF90aGlzLmRlbGV0ZUFkZChpZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYmFja1RvT3JkZXIgKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAncGF5Y2FydCcpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXljYXJ0P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ3BheWJ1eScpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXlidXk/dXNlcj0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5hZGRyZXNzW2luZGV4XSkgKyAnJnR5cGU9JyArIHRoaXMuc291cmNlVHlwZSArICcmaWQ9JyArIHRoaXMuc291cmNlSWQgKyAnJmNvdW50PScgKyB0aGlzLmNvdW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0QWRkICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkcmVzcyA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLnBob25lID0gaXRlbS5waG9uZVxuICAgICAgICAgICAgb2JqLmFkZCA9IGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmFyZWFJZCA9IGl0ZW0uYXJlYUlkXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMucHJldlBhZ2UgPSBkYXRhLnBhZ2VcbiAgICAgIHRoaXMuc291cmNlVHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IGRhdGEuc291cmNlSWRcbiAgICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdhZGRyZXNzJylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdEFkZCgpXG4gICAgfVxuICB9XG4iXX0=