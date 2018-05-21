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

    var _temp, _this, _ret;

    _classCallCheck(this, EditAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditAddress.__proto__ || Object.getPrototypeOf(EditAddress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '编辑地址'
    }, _this.data = {
      userName: '',
      userPhone: '',
      userAdd: '',
      token: '',
      num: 0,
      multiArray: [['北京市', '上海市', '广东省', '江西省'], ['市辖区', '县'], ['东城区', '西城区', '崇文区']],
      multiIndex: [],
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

  _createClass(EditAddress, [{
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
    value: function onLoad(param) {
      var _this3 = this;

      // this.initTopArea()
      var address = JSON.parse(param.detail);
      this.userName = address.name;
      this.userPhone = address.phone;
      this.userAdd = address.add;
      var addArray = address.areaFullName.split(',');
      addArray.forEach(function (item) {
        _this3.multiArray.forEach(function (area, index) {
          if (area.indexOf(item) > -1) {
            _this3.multiIndex.push(area.indexOf(item));
          }
        });
      });
      console.log(this.multiIndex);
      this.token = this.$parent.getToken('newAdd');
      this.$apply();
    }
  }]);

  return EditAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditAddress , 'pages/editAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRBZGQuanMiXSwibmFtZXMiOlsiRWRpdEFkZHJlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwidXNlclBob25lIiwidXNlckFkZCIsInRva2VuIiwibnVtIiwibXVsdGlBcnJheSIsIm11bHRpSW5kZXgiLCJtdWx0aUFyZWFJZCIsImNvbXB1dGVkIiwibXVsdGlWYWx1ZSIsInRlbXBBcnIiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwicHVzaCIsIm1ldGhvZHMiLCJ0b3BBcmVhIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsInRlbXAiLCJtYXAiLCJjaGlsZEFyZWEiLCJjb2x1bW4iLCJnZXRDaXR5IiwiZ2V0QXJlYSIsImNhbmNlbCIsImluaXREZWZhdWx0IiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiR2V0VG9wQXJlYSIsInRoZW4iLCJyZXMiLCJwYXJhbSIsImFkZHJlc3MiLCJKU09OIiwicGFyc2UiLCJuYW1lIiwicGhvbmUiLCJhZGQiLCJhZGRBcnJheSIsImFyZWFGdWxsTmFtZSIsInNwbGl0IiwiYXJlYSIsImluZGV4T2YiLCJnZXRUb2tlbiIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxFQURMO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsZUFBUyxFQUhKO0FBSUxDLGFBQU8sRUFKRjtBQUtMQyxXQUFLLENBTEE7QUFNTEMsa0JBQVksQ0FDVixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixDQURVLEVBRVYsQ0FBQyxLQUFELEVBQVEsR0FBUixDQUZVLEVBR1YsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsQ0FIVSxDQU5Q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QUFPQU0sY0FBUUMsR0FBUixDQUFZLEtBQUtiLFVBQWpCO0FBQ0EsV0FBS0gsS0FBTCxHQUFhLEtBQUsyQixPQUFMLENBQWFpQixRQUFiLENBQXNCLFFBQXRCLENBQWI7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUE5R3NDLGVBQUtDLEk7O2tCQUF6QnJELFciLCJmaWxlIjoiZWRpdEFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJyxcbiAgICAgIHVzZXJBZGQ6ICcnLFxuICAgICAgdG9rZW46ICcnLFxuICAgICAgbnVtOiAwLFxuICAgICAgbXVsdGlBcnJheTogW1xuICAgICAgICBbJ+WMl+S6rOW4gicsICfkuIrmtbfluIInLCAn5bm/5Lic55yBJywgJ+axn+ilv+ecgSddLFxuICAgICAgICBbJ+W4gui+luWMuicsICfljr8nXSxcbiAgICAgICAgWyfkuJzln47ljLonLCAn6KW/5Z+O5Yy6JywgJ+W0h+aWh+WMuiddXG4gICAgICBdLFxuICAgICAgbXVsdGlJbmRleDogW10sXG4gICAgICBtdWx0aUFyZWFJZDogW1xuICAgICAgICBbJzEwMDAwMScsICcxMDAwMDInLCAnMTAwMDAzJywgJzEwMDAwNCddLFxuICAgICAgICBbJzIwMDAwMScsICcyMDAwMDInXSxcbiAgICAgICAgWyczMDAwMDEnLCAnMzAwMDAyJywgJzMwMDAwMyddXG4gICAgICBdXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgbXVsdGlWYWx1ZSAoKSB7XG4gICAgICAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgICAgdGhpcy5tdWx0aUFyZWFJZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHRlbXBBcnIucHVzaChpdGVtWzBdKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGVtcEFyclxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9wQXJlYSAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdmFyIHRlbXAgPSBbXVxuICAgICAgICB0ZW1wID0gdGhpcy5tdWx0aVZhbHVlLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tdWx0aUFyZWFJZFtpbmRleF1bdGhpcy5tdWx0aUluZGV4W2luZGV4XV1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5tdWx0aVZhbHVlID0gdGVtcFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm11bHRpVmFsdWUpXG4gICAgICB9LFxuICAgICAgY2hpbGRBcmVhIChlKSB7XG4gICAgICAgIHRoaXMubnVtICsrXG4gICAgICAgIGNvbnNvbGUubG9nKCdTZW5kIFJlcXVlc3Q6JyArIHRoaXMubnVtKVxuICAgICAgICB0aGlzLm11bHRpSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHN3aXRjaCAoZS5kZXRhaWwuY29sdW1uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgLy8g6YCJ5oup55yBXG4gICAgICAgICAgICAvLyB0ZW1wWzBdIOS9nOS4unRvcCBhcmVhSWQg5Y+R6YCB6K+35rGC6I635Y+W5biCXG4gICAgICAgICAgICB0aGlzLmdldENpdHkoKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAvLyDpgInmi6nluIJcbiAgICAgICAgICAgIC8vIHRlbXBbMV0g5L2c5Li6YXJlYUlkIOWPkemAgeivt+axguiOt+WPluWMulxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhKClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICB0aGlzLmluaXREZWZhdWx0KClcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFRvcEFyZWEgKCkge1xuICAgICAgdmFyIGRhdGEgPSB7fVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFRvcEFyZWEoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXREZWZhdWx0ICgpIHtcbiAgICAgIHRoaXMubXVsdGlBcnJheSA9IFtcbiAgICAgICAgWyfljJfkuqzluIInLCAn5LiK5rW35biCJywgJ+W5v+S4nOecgScsICfmsZ/opb/nnIEnXSxcbiAgICAgICAgWyfluILovpbljLonLCAn5Y6/J10sXG4gICAgICAgIFsn5Lic5Z+O5Yy6JywgJ+ilv+WfjuWMuicsICfltIfmlofljLonXVxuICAgICAgXVxuICAgICAgdGhpcy5tdWx0aUluZGV4ID0gWzAsIDAsIDBdXG4gICAgICB0aGlzLm11bHRpQXJlYUlkID0gW1xuICAgICAgICBbJzEwMDAwMScsICcxMDAwMDInLCAnMTAwMDAzJywgJzEwMDAwNCddLFxuICAgICAgICBbJzIwMDAwMScsICcyMDAwMDInXSxcbiAgICAgICAgWyczMDAwMDEnLCAnMzAwMDAyJywgJzMwMDAwMyddXG4gICAgICBdXG4gICAgfVxuICAgIGdldENpdHkgKCkge1xuICAgICAgdGhpcy5tdWx0aUFycmF5WzFdID0gWyflub/lt54nLCAn5rex5ZyzJywgJ+ePoOa1tycsICfmsZXlpLQnXVxuICAgICAgdGhpcy5tdWx0aUFyZWFJZFsxXSA9IFsnMjAwMDAxQicsICcyMDAwMDJCJywgJzIwMDAwM0InLCAnMjAwMDA0QiddXG4gICAgICB0aGlzLm11bHRpSW5kZXhbMV0gPSAwXG4gICAgICB0aGlzLmdldEFyZWEoKVxuICAgIH1cbiAgICBnZXRBcmVhICgpIHtcbiAgICAgIHRoaXMubXVsdGlJbmRleFsyXSA9IDBcbiAgICAgIHRoaXMubXVsdGlBcnJheVsyXSA9IFsn6Z2Z5a6J5Yy6JywgJ+m7hOa1puWMuicsICflvpDmsYfljLonLCAn6Z2S5rWm5Yy6JywgJ+WNoua5vuWMuicsICfmtabkuJzmlrDljLonLCAn5b6Q5rGH5Yy6J11cbiAgICAgIHRoaXMubXVsdGlBcmVhSWRbMl0gPSBbJzMwMDAwMUInLCAnMzAwMDAyQicsICczMDAwMDNCJywgJzMwMDAwNEInLCAnMzAwMDA1QicsICczMDAwMDZCJywgJzMwMDAwN0InXVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICAvLyB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIHZhciBhZGRyZXNzID0gSlNPTi5wYXJzZShwYXJhbS5kZXRhaWwpXG4gICAgICB0aGlzLnVzZXJOYW1lID0gYWRkcmVzcy5uYW1lXG4gICAgICB0aGlzLnVzZXJQaG9uZSA9IGFkZHJlc3MucGhvbmVcbiAgICAgIHRoaXMudXNlckFkZCA9IGFkZHJlc3MuYWRkXG4gICAgICB2YXIgYWRkQXJyYXkgPSBhZGRyZXNzLmFyZWFGdWxsTmFtZS5zcGxpdCgnLCcpXG4gICAgICBhZGRBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlBcnJheS5mb3JFYWNoKChhcmVhLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChhcmVhLmluZGV4T2YoaXRlbSkgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5tdWx0aUluZGV4LnB1c2goYXJlYS5pbmRleE9mKGl0ZW0pKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLm11bHRpSW5kZXgpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCduZXdBZGQnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19