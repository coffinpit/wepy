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
      prevPage: ''
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
        if (this.prevPage === 'order') {
          var pages = this.getCurrentPages();
          var prevpage = pages[pages.length - 2];
          prevpage.setData({
            addressMain: this.address[index].areaId,
            user: this.address[index]
          });
          console.log(this.address[index].areaId);
          _wepy2.default.navigateBack();
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
      this.prevPage = data.page;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsImdvTmV3QWRkIiwibmF2aWdhdGVUbyIsInVybCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZwYWdlIiwibGVuZ3RoIiwic2V0RGF0YSIsImFkZHJlc3NNYWluIiwiYXJlYUlkIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZUJhY2siLCIkcGFyZW50IiwiSHR0cFJlcXVlc3QiLCJHZXRBZGRyZXNzIiwidGhlbiIsImVycm9yIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJuYW1lIiwicGhvbmUiLCJhZGQiLCJwdXNoIiwiJGFwcGx5IiwiYWRkcmVzc0lkIiwiRGVsZXRlQWRkcmVzcyIsImluaXRBZGQiLCJwYWdlIiwiZ2V0VG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxLQUhIO0FBSUxDLGdCQUFVO0FBSkwsSyxTQU1SQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsWUFBVyxFQUFaLEVBQVYsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFD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LElBQXJCO0FBQ0EsV0FBS3BELEtBQUwsR0FBYSxLQUFLb0MsT0FBTCxDQUFhaUIsUUFBYixDQUFzQixTQUF0QixDQUFiO0FBQ0EsV0FBS0wsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRyxPQUFMO0FBQ0Q7Ozs7RUEvRmtDLGVBQUtDLEk7O2tCQUFyQnhELE8iLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbotKflnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBhZGRyZXNzOiBbXSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBwcmV2UGFnZTogJydcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImRlZmVjdFwiOntcInhtbG5zOnd4XCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRBZGQgKCkge1xuICAgICAgfSxcbiAgICAgIGdvTmV3QWRkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL25ld0FkZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6ZmkJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlQWRkKGlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiYWNrVG9PcmRlciAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdvcmRlcicpIHtcbiAgICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpXG4gICAgICAgICAgdmFyIHByZXZwYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl1cbiAgICAgICAgICBwcmV2cGFnZS5zZXREYXRhKHtcbiAgICAgICAgICAgIGFkZHJlc3NNYWluOiB0aGlzLmFkZHJlc3NbaW5kZXhdLmFyZWFJZCxcbiAgICAgICAgICAgIHVzZXI6IHRoaXMuYWRkcmVzc1tpbmRleF1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWRkcmVzc1tpbmRleF0uYXJlYUlkKVxuICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0QWRkICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5hZGRyZXNzID0gW11cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5uYW1lID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmoucGhvbmUgPSBpdGVtLnBob25lXG4gICAgICAgICAgICBvYmouYWRkID0gaXRlbS5hZGRyZXNzXG4gICAgICAgICAgICBvYmouaWQgPSBpdGVtLmlkXG4gICAgICAgICAgICBvYmouYXJlYUlkID0gaXRlbS5hcmVhSWRcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3MucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBhZGRyZXNzSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGVsZXRlQWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuaW5pdEFkZCgpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGRhdGEpIHtcbiAgICAgIHRoaXMucHJldlBhZ2UgPSBkYXRhLnBhZ2VcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oJ2FkZHJlc3MnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0QWRkKClcbiAgICB9XG4gIH1cbiJdfQ==