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

    var _temp, _this, _ret;

    _classCallCheck(this, Address);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Address.__proto__ || Object.getPrototypeOf(Address)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '新增地址'
    }, _this.data = {
      token: '',
      num: 0,
      multiArray: [['北京市', '上海市', '广东省', '江西省'], ['市辖区', '县'], ['东城区', '西城区', '崇文区']],
      multiIndex: [0, 0, 0],
      multiAreaId: [['100001', '100002', '100003', '100004'], ['200001', '200002'], ['300001', '300002', '300003']]
    }, _this.computed = {
      multiValue: function multiValue() {
        var tempArr = [];
        this.multiAreaId.forEach(function (item, index) {
          tempArr.push(item[0]);
        });
        return tempArr;
      }
    }, _this.methods = {
      topArea: function topArea(e) {
        var _this2 = this;

        console.log(e.detail.value);
        this.multiIndex = e.detail.value;
        var temp = [];
        temp = this.multiValue.map(function (item, index) {
          return _this2.multiAreaId[index][_this2.multiIndex[index]];
        });
        this.multiValue = temp;
        console.log(this.multiValue);
      },
      childArea: function childArea(e) {
        this.num++;
        console.log('Send Request:' + this.num);
        this.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
          case 0:
            // 选择省
            // temp[0] 作为top areaId 发送请求获取市
            this.getCity();
            break;
          case 1:
            // 选择市
            // temp[1] 作为areaId 发送请求获取区
            this.getArea();
            break;
        }
      },
      cancel: function cancel() {
        this.initDefault();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Address, [{
    key: 'initTopArea',
    value: function initTopArea() {
      var data = {};
      this.$parent.HttpRequest.GetTopArea(data).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'initDefault',
    value: function initDefault() {
      this.multiArray = [['北京市', '上海市', '广东省', '江西省'], ['市辖区', '县'], ['东城区', '西城区', '崇文区']];
      this.multiIndex = [0, 0, 0];
      this.multiAreaId = [['100001', '100002', '100003', '100004'], ['200001', '200002'], ['300001', '300002', '300003']];
    }
  }, {
    key: 'getCity',
    value: function getCity() {
      this.multiArray[1] = ['广州', '深圳', '珠海', '汕头'];
      this.multiAreaId[1] = ['200001B', '200002B', '200003B', '200004B'];
      this.multiIndex[1] = 0;
      this.getArea();
    }
  }, {
    key: 'getArea',
    value: function getArea() {
      this.multiIndex[2] = 0;
      this.multiArray[2] = ['静安区', '黄浦区', '徐汇区', '青浦区', '卢湾区', '浦东新区', '徐汇区'];
      this.multiAreaId[2] = ['300001B', '300002B', '300003B', '300004B', '300005B', '300006B', '300007B'];
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      // this.initTopArea()
      this.token = this.$parent.getToken('newAdd');
      this.$apply();
    }
  }]);

  return Address;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/newAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FkZC5qcyJdLCJuYW1lcyI6WyJBZGRyZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsIm51bSIsIm11bHRpQXJyYXkiLCJtdWx0aUluZGV4IiwibXVsdGlBcmVhSWQiLCJjb21wdXRlZCIsIm11bHRpVmFsdWUiLCJ0ZW1wQXJyIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInB1c2giLCJtZXRob2RzIiwidG9wQXJlYSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwidmFsdWUiLCJ0ZW1wIiwibWFwIiwiY2hpbGRBcmVhIiwiY29sdW1uIiwiZ2V0Q2l0eSIsImdldEFyZWEiLCJjYW5jZWwiLCJpbml0RGVmYXVsdCIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIkdldFRvcEFyZWEiLCJ0aGVuIiwicmVzIiwiZ2V0VG9rZW4iLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLFdBQUssQ0FGQTtBQUdMQyxrQkFBWSxDQUNWLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLENBRFUsRUFFVixDQUFDLEtBQUQsRUFBUSxHQUFSLENBRlUsRUFHVixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixDQUhVLENBSFA7QUFRTEMsa0JBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FSUDtBQVNMQyxtQkFBYSxDQUNYLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsUUFBckIsRUFBK0IsUUFBL0IsQ0FEVyxFQUVYLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FGVyxFQUdYLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsUUFBckIsQ0FIVztBQVRSLEss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QUFMLENBQWdCLENBQWhCLElBQXFCLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLE1BQXBDLEVBQTRDLEtBQTVDLENBQXJCO0FBQ0EsV0FBS0UsV0FBTCxDQUFpQixDQUFqQixJQUFzQixDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFNBQXhELEVBQW1FLFNBQW5FLENBQXRCO0FBQ0Q7Ozs2QkFDUztBQUNSO0FBQ0EsV0FBS0osS0FBTCxHQUFhLEtBQUsyQixPQUFMLENBQWFLLFFBQWIsQ0FBc0IsUUFBdEIsQ0FBYjtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7OztFQTlGa0MsZUFBS0MsSTs7a0JBQXJCdEMsTyIsImZpbGUiOiJuZXdBZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5paw5aKe5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgbnVtOiAwLFxuICAgICAgbXVsdGlBcnJheTogW1xuICAgICAgICBbJ+WMl+S6rOW4gicsICfkuIrmtbfluIInLCAn5bm/5Lic55yBJywgJ+axn+ilv+ecgSddLFxuICAgICAgICBbJ+W4gui+luWMuicsICfljr8nXSxcbiAgICAgICAgWyfkuJzln47ljLonLCAn6KW/5Z+O5Yy6JywgJ+W0h+aWh+WMuiddXG4gICAgICBdLFxuICAgICAgbXVsdGlJbmRleDogWzAsIDAsIDBdLFxuICAgICAgbXVsdGlBcmVhSWQ6IFtcbiAgICAgICAgWycxMDAwMDEnLCAnMTAwMDAyJywgJzEwMDAwMycsICcxMDAwMDQnXSxcbiAgICAgICAgWycyMDAwMDEnLCAnMjAwMDAyJ10sXG4gICAgICAgIFsnMzAwMDAxJywgJzMwMDAwMicsICczMDAwMDMnXVxuICAgICAgXVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIG11bHRpVmFsdWUgKCkge1xuICAgICAgICB2YXIgdGVtcEFyciA9IFtdXG4gICAgICAgIHRoaXMubXVsdGlBcmVhSWQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICB0ZW1wQXJyLnB1c2goaXRlbVswXSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRlbXBBcnJcbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvcEFyZWEgKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpXG4gICAgICAgIHRoaXMubXVsdGlJbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHZhciB0ZW1wID0gW11cbiAgICAgICAgdGVtcCA9IHRoaXMubXVsdGlWYWx1ZS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlBcmVhSWRbaW5kZXhdW3RoaXMubXVsdGlJbmRleFtpbmRleF1dXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubXVsdGlWYWx1ZSA9IHRlbXBcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tdWx0aVZhbHVlKVxuICAgICAgfSxcbiAgICAgIGNoaWxkQXJlYSAoZSkge1xuICAgICAgICB0aGlzLm51bSArK1xuICAgICAgICBjb25zb2xlLmxvZygnU2VuZCBSZXF1ZXN0OicgKyB0aGlzLm51bSlcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICBzd2l0Y2ggKGUuZGV0YWlsLmNvbHVtbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIC8vIOmAieaLqeecgVxuICAgICAgICAgICAgLy8gdGVtcFswXSDkvZzkuLp0b3AgYXJlYUlkIOWPkemAgeivt+axguiOt+WPluW4glxuICAgICAgICAgICAgdGhpcy5nZXRDaXR5KClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgLy8g6YCJ5oup5biCXG4gICAgICAgICAgICAvLyB0ZW1wWzFdIOS9nOS4umFyZWFJZCDlj5HpgIHor7fmsYLojrflj5bljLpcbiAgICAgICAgICAgIHRoaXMuZ2V0QXJlYSgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FuY2VsICgpIHtcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdCgpXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRUb3BBcmVhICgpIHtcbiAgICAgIHZhciBkYXRhID0ge31cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BBcmVhKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICB9KVxuICAgIH1cbiAgICBpbml0RGVmYXVsdCAoKSB7XG4gICAgICB0aGlzLm11bHRpQXJyYXkgPSBbXG4gICAgICAgIFsn5YyX5Lqs5biCJywgJ+S4iua1t+W4gicsICflub/kuJznnIEnLCAn5rGf6KW/55yBJ10sXG4gICAgICAgIFsn5biC6L6W5Yy6JywgJ+WOvyddLFxuICAgICAgICBbJ+S4nOWfjuWMuicsICfopb/ln47ljLonLCAn5bSH5paH5Yy6J11cbiAgICAgIF1cbiAgICAgIHRoaXMubXVsdGlJbmRleCA9IFswLCAwLCAwXVxuICAgICAgdGhpcy5tdWx0aUFyZWFJZCA9IFtcbiAgICAgICAgWycxMDAwMDEnLCAnMTAwMDAyJywgJzEwMDAwMycsICcxMDAwMDQnXSxcbiAgICAgICAgWycyMDAwMDEnLCAnMjAwMDAyJ10sXG4gICAgICAgIFsnMzAwMDAxJywgJzMwMDAwMicsICczMDAwMDMnXVxuICAgICAgXVxuICAgIH1cbiAgICBnZXRDaXR5ICgpIHtcbiAgICAgIHRoaXMubXVsdGlBcnJheVsxXSA9IFsn5bm/5beeJywgJ+a3seWcsycsICfnj6DmtbcnLCAn5rGV5aS0J11cbiAgICAgIHRoaXMubXVsdGlBcmVhSWRbMV0gPSBbJzIwMDAwMUInLCAnMjAwMDAyQicsICcyMDAwMDNCJywgJzIwMDAwNEInXVxuICAgICAgdGhpcy5tdWx0aUluZGV4WzFdID0gMFxuICAgICAgdGhpcy5nZXRBcmVhKClcbiAgICB9XG4gICAgZ2V0QXJlYSAoKSB7XG4gICAgICB0aGlzLm11bHRpSW5kZXhbMl0gPSAwXG4gICAgICB0aGlzLm11bHRpQXJyYXlbMl0gPSBbJ+mdmeWuieWMuicsICfpu4TmtabljLonLCAn5b6Q5rGH5Yy6JywgJ+mdkua1puWMuicsICfljaLmub7ljLonLCAn5rWm5Lic5paw5Yy6JywgJ+W+kOaxh+WMuiddXG4gICAgICB0aGlzLm11bHRpQXJlYUlkWzJdID0gWyczMDAwMDFCJywgJzMwMDAwMkInLCAnMzAwMDAzQicsICczMDAwMDRCJywgJzMwMDAwNUInLCAnMzAwMDA2QicsICczMDAwMDdCJ11cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIC8vIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignbmV3QWRkJylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==