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

      var _this = this;
      var data = {
        token: this.token
      };
      this.address = [];
      this.$parent.HttpRequest.GetAddress(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
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
        }
        _this.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRlZmVjdCIsIm1ldGhvZHMiLCJlZGl0QWRkIiwiZ29OZXdBZGQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZGVsZXRlQWRkIiwiaWQiLCJfdGhpcyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiYmFja1RvT3JkZXIiLCJpbmRleCIsIkpTT04iLCJzdHJpbmdpZnkiLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJHZXRBZGRyZXNzIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwib2JqIiwibmFtZSIsInBob25lIiwiYWRkIiwiYXJlYUlkIiwicHVzaCIsIiRhcHBseSIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJpbml0QWRkIiwicGFnZSIsImdldFRva2VuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzJMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsZUFBUyxFQUZKO0FBR0xDLGNBQVEsS0FISDtBQUlMQyxnQkFBVSxFQUpMO0FBS0xDLGtCQUFZLEVBTFA7QUFNTEMsZ0JBQVUsRUFOTDtBQU9MQyxhQUFPO0FBUEYsSyxTQVNSQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsWUFBVyxFQUFaLEVBQVYsRSxTQUNUQyxPLEdBQVUs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Y0FBTTJCLE1BQU47QUFDRCxPQUhEO0FBSUQ7OzsyQkFDTy9DLEksRUFBTTtBQUNabUMsY0FBUUMsR0FBUixDQUFZcEMsSUFBWjtBQUNBLFdBQUtJLFFBQUwsR0FBZ0JKLEtBQUttRCxJQUFyQjtBQUNBLFdBQUs5QyxVQUFMLEdBQWtCTCxLQUFLSyxVQUF2QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JOLEtBQUtNLFFBQXJCO0FBQ0EsV0FBS0MsS0FBTCxHQUFhUCxLQUFLTyxLQUFsQjtBQUNBLFdBQUtOLEtBQUwsR0FBYSxLQUFLOEIsT0FBTCxDQUFhcUIsUUFBYixDQUFzQixTQUF0QixDQUFiO0FBQ0EsV0FBS0wsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRyxPQUFMO0FBQ0Q7Ozs7RUF0R2tDLGVBQUtDLEk7O2tCQUFyQnRELE8iLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbotKflnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBhZGRyZXNzOiBbXSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBwcmV2UGFnZTogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIGNvdW50OiAnJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZGVmZWN0XCI6e1wieG1sbnM6d3hcIjpcIlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFkZCAoKSB7XG4gICAgICB9LFxuICAgICAgZ29OZXdBZGQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbmV3QWRkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUFkZCAoaWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaQnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBfdGhpcy5kZWxldGVBZGQoaWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJhY2tUb09yZGVyIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ3BheWNhcnQnKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydD91c2VyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZHJlc3NbaW5kZXhdKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXlidXknKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pICsgJyZ0eXBlPScgKyB0aGlzLnNvdXJjZVR5cGUgKyAnJmlkPScgKyB0aGlzLnNvdXJjZUlkICsgJyZjb3VudD0nICsgdGhpcy5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdEFkZCAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkcmVzcyA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLnBob25lID0gaXRlbS5waG9uZVxuICAgICAgICAgICAgb2JqLmFkZCA9IGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmFyZWFJZCA9IGl0ZW0uYXJlYUlkXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGRlbGV0ZUFkZCAoaWQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIF90aGlzLmluaXRBZGQoKVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChkYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy5wcmV2UGFnZSA9IGRhdGEucGFnZVxuICAgICAgdGhpcy5zb3VyY2VUeXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICB0aGlzLnNvdXJjZUlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgdGhpcy5jb3VudCA9IGRhdGEuY291bnRcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2FkZHJlc3MnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0QWRkKClcbiAgICB9XG4gIH1cbiJdfQ==