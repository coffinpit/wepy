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

var EditAddress = function (_wepy$page) {
  _inherits(EditAddress, _wepy$page);

  function EditAddress() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, EditAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = EditAddress.__proto__ || Object.getPrototypeOf(EditAddress)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '编辑地址'
    }, _this2.data = {
      userName: '',
      userPhone: '',
      userAdd: '',
      token: '',
      num: 0,
      multiArray: [['北京市', '上海市', '广东省', '江西省'], ['市辖区', '县'], ['东城区', '西城区', '崇文区']],
      multiIndex: [],
      multiAreaId: [['100001', '100002', '100003', '100004'], ['200001', '200002'], ['300001', '300002', '300003']]
    }, _this2.computed = {
      multiValue: function multiValue() {
        var tempArr = [];
        this.multiAreaId.forEach(function (item, index) {
          tempArr.push(item[0]);
        });
        return tempArr;
      }
    }, _this2.methods = {
      topArea: function topArea(e) {
        var _this3 = this;

        console.log(e.detail.value);
        this.multiIndex = e.detail.value;
        var temp = [];
        temp = this.multiValue.map(function (item, index) {
          return _this3.multiAreaId[index][_this3.multiIndex[index]];
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
        // this.initDefault()
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(EditAddress, [{
    key: 'initTopArea',
    value: function initTopArea() {
      var _this4 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {};
      this.$parent.HttpRequest.GetTopArea(data).then(function (res) {
        if (res.data.error === 0) {} else {
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initTopArea();
          }
        }
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
    value: function onLoad(param) {
      var _this5 = this;

      // this.initTopArea()
      var address = JSON.parse(param.detail);
      this.userName = address.name;
      this.userPhone = address.phone;
      this.userAdd = address.add;
      var addArray = address.areaFullName.split(',');
      addArray.forEach(function (item) {
        _this5.multiArray.forEach(function (area, index) {
          if (area.indexOf(item) > -1) {
            _this5.multiIndex.push(area.indexOf(item));
          }
        });
      });
      this.$apply();
    }
  }]);

  return EditAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditAddress , 'pages/editAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRBZGQuanMiXSwibmFtZXMiOlsiRWRpdEFkZHJlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwidXNlclBob25lIiwidXNlckFkZCIsInRva2VuIiwibnVtIiwibXVsdGlBcnJheSIsIm11bHRpSW5kZXgiLCJtdWx0aUFyZWFJZCIsImNvbXB1dGVkIiwibXVsdGlWYWx1ZSIsInRlbXBBcnIiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwicHVzaCIsIm1ldGhvZHMiLCJ0b3BBcmVhIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsInRlbXAiLCJtYXAiLCJjaGlsZEFyZWEiLCJjb2x1bW4iLCJnZXRDaXR5IiwiZ2V0QXJlYSIsImNhbmNlbCIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsIl90aGlzIiwiSHR0cFJlcXVlc3QiLCJHZXRUb3BBcmVhIiwidGhlbiIsInJlcyIsImVycm9yIiwibWlzc1Rva2VuIiwiaW5pdFRvcEFyZWEiLCJwYXJhbSIsImFkZHJlc3MiLCJKU09OIiwicGFyc2UiLCJuYW1lIiwicGhvbmUiLCJhZGQiLCJhZGRBcnJheSIsImFyZWFGdWxsTmFtZSIsInNwbGl0IiwiYXJlYSIsImluZGV4T2YiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OzttTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsZ0JBQVUsRUFETDtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLGVBQVMsRUFISjtBQUlMQyxhQUFPLEVBSkY7QUFLTEMsV0FBSyxDQUxBO0FBTUxDLGtCQUFZLENBQ1YsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsQ0FEVSxFQUVWLENBQUMsS0FBRCxFQUFRLEdBQVIsQ0FGVSxFQUdWLENBQUMsS0FBRCxF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QUFxQkMsS0FBckIsQ0FBMkIsR0FBM0IsQ0FBZjtBQUNBRixlQUFTbkMsT0FBVCxDQUFpQixVQUFDQyxJQUFELEVBQVU7QUFDekIsZUFBS1AsVUFBTCxDQUFnQk0sT0FBaEIsQ0FBd0IsVUFBQ3NDLElBQUQsRUFBT3BDLEtBQVAsRUFBaUI7QUFDdkMsY0FBSW9DLEtBQUtDLE9BQUwsQ0FBYXRDLElBQWIsSUFBcUIsQ0FBQyxDQUExQixFQUE2QjtBQUMzQixtQkFBS04sVUFBTCxDQUFnQlEsSUFBaEIsQ0FBcUJtQyxLQUFLQyxPQUFMLENBQWF0QyxJQUFiLENBQXJCO0FBQ0Q7QUFDRixTQUpEO0FBS0QsT0FORDtBQU9BLFdBQUt1QyxNQUFMO0FBQ0Q7Ozs7RUFwSHNDLGVBQUtDLEk7O2tCQUF6QnhELFciLCJmaWxlIjoiZWRpdEFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJyxcbiAgICAgIHVzZXJBZGQ6ICcnLFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgbnVtOiAwLFxuICAgICAgbXVsdGlBcnJheTogW1xuICAgICAgICBbJ+WMl+S6rOW4gicsICfkuIrmtbfluIInLCAn5bm/5Lic55yBJywgJ+axn+ilv+ecgSddLFxuICAgICAgICBbJ+W4gui+luWMuicsICfljr8nXSxcbiAgICAgICAgWyfkuJzln47ljLonLCAn6KW/5Z+O5Yy6JywgJ+W0h+aWh+WMuiddXG4gICAgICBdLFxuICAgICAgbXVsdGlJbmRleDogW10sXG4gICAgICBtdWx0aUFyZWFJZDogW1xuICAgICAgICBbJzEwMDAwMScsICcxMDAwMDInLCAnMTAwMDAzJywgJzEwMDAwNCddLFxuICAgICAgICBbJzIwMDAwMScsICcyMDAwMDInXSxcbiAgICAgICAgWyczMDAwMDEnLCAnMzAwMDAyJywgJzMwMDAwMyddXG4gICAgICBdXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgbXVsdGlWYWx1ZSAoKSB7XG4gICAgICAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgICAgdGhpcy5tdWx0aUFyZWFJZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHRlbXBBcnIucHVzaChpdGVtWzBdKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGVtcEFyclxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9wQXJlYSAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdmFyIHRlbXAgPSBbXVxuICAgICAgICB0ZW1wID0gdGhpcy5tdWx0aVZhbHVlLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tdWx0aUFyZWFJZFtpbmRleF1bdGhpcy5tdWx0aUluZGV4W2luZGV4XV1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5tdWx0aVZhbHVlID0gdGVtcFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm11bHRpVmFsdWUpXG4gICAgICB9LFxuICAgICAgY2hpbGRBcmVhIChlKSB7XG4gICAgICAgIHRoaXMubnVtICsrXG4gICAgICAgIGNvbnNvbGUubG9nKCdTZW5kIFJlcXVlc3Q6JyArIHRoaXMubnVtKVxuICAgICAgICB0aGlzLm11bHRpSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHN3aXRjaCAoZS5kZXRhaWwuY29sdW1uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgLy8g6YCJ5oup55yBXG4gICAgICAgICAgICAvLyB0ZW1wWzBdIOS9nOS4unRvcCBhcmVhSWQg5Y+R6YCB6K+35rGC6I635Y+W5biCXG4gICAgICAgICAgICB0aGlzLmdldENpdHkoKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAvLyDpgInmi6nluIJcbiAgICAgICAgICAgIC8vIHRlbXBbMV0g5L2c5Li6YXJlYUlkIOWPkemAgeivt+axguiOt+WPluWMulxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhKClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICAvLyB0aGlzLmluaXREZWZhdWx0KClcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFRvcEFyZWEgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHt9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VG9wQXJlYShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgIF90aGlzLmluaXRUb3BBcmVhKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXREZWZhdWx0ICgpIHtcbiAgICAgIHRoaXMubXVsdGlBcnJheSA9IFtcbiAgICAgICAgWyfljJfkuqzluIInLCAn5LiK5rW35biCJywgJ+W5v+S4nOecgScsICfmsZ/opb/nnIEnXSxcbiAgICAgICAgWyfluILovpbljLonLCAn5Y6/J10sXG4gICAgICAgIFsn5Lic5Z+O5Yy6JywgJ+ilv+WfjuWMuicsICfltIfmlofljLonXVxuICAgICAgXVxuICAgICAgdGhpcy5tdWx0aUluZGV4ID0gWzAsIDAsIDBdXG4gICAgICB0aGlzLm11bHRpQXJlYUlkID0gW1xuICAgICAgICBbJzEwMDAwMScsICcxMDAwMDInLCAnMTAwMDAzJywgJzEwMDAwNCddLFxuICAgICAgICBbJzIwMDAwMScsICcyMDAwMDInXSxcbiAgICAgICAgWyczMDAwMDEnLCAnMzAwMDAyJywgJzMwMDAwMyddXG4gICAgICBdXG4gICAgfVxuICAgIGdldENpdHkgKCkge1xuICAgICAgdGhpcy5tdWx0aUFycmF5WzFdID0gWyflub/lt54nLCAn5rex5ZyzJywgJ+ePoOa1tycsICfmsZXlpLQnXVxuICAgICAgdGhpcy5tdWx0aUFyZWFJZFsxXSA9IFsnMjAwMDAxQicsICcyMDAwMDJCJywgJzIwMDAwM0InLCAnMjAwMDA0QiddXG4gICAgICB0aGlzLm11bHRpSW5kZXhbMV0gPSAwXG4gICAgICB0aGlzLmdldEFyZWEoKVxuICAgIH1cbiAgICBnZXRBcmVhICgpIHtcbiAgICAgIHRoaXMubXVsdGlJbmRleFsyXSA9IDBcbiAgICAgIHRoaXMubXVsdGlBcnJheVsyXSA9IFsn6Z2Z5a6J5Yy6JywgJ+m7hOa1puWMuicsICflvpDmsYfljLonLCAn6Z2S5rWm5Yy6JywgJ+WNoua5vuWMuicsICfmtabkuJzmlrDljLonLCAn5b6Q5rGH5Yy6J11cbiAgICAgIHRoaXMubXVsdGlBcmVhSWRbMl0gPSBbJzMwMDAwMUInLCAnMzAwMDAyQicsICczMDAwMDNCJywgJzMwMDAwNEInLCAnMzAwMDA1QicsICczMDAwMDZCJywgJzMwMDAwN0InXVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICAvLyB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIHZhciBhZGRyZXNzID0gSlNPTi5wYXJzZShwYXJhbS5kZXRhaWwpXG4gICAgICB0aGlzLnVzZXJOYW1lID0gYWRkcmVzcy5uYW1lXG4gICAgICB0aGlzLnVzZXJQaG9uZSA9IGFkZHJlc3MucGhvbmVcbiAgICAgIHRoaXMudXNlckFkZCA9IGFkZHJlc3MuYWRkXG4gICAgICB2YXIgYWRkQXJyYXkgPSBhZGRyZXNzLmFyZWFGdWxsTmFtZS5zcGxpdCgnLCcpXG4gICAgICBhZGRBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlBcnJheS5mb3JFYWNoKChhcmVhLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChhcmVhLmluZGV4T2YoaXRlbSkgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5tdWx0aUluZGV4LnB1c2goYXJlYS5pbmRleE9mKGl0ZW0pKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=