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

var NewAddress = function (_wepy$page) {
  _inherits(NewAddress, _wepy$page);

  function NewAddress() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, NewAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = NewAddress.__proto__ || Object.getPrototypeOf(NewAddress)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '新增地址'
    }, _this2.data = {
      token: '',
      num: 0,
      multiArray: [['北京市', '上海市', '广东省', '江西省'], ['市辖区', '县'], ['东城区', '西城区', '崇文区']],
      multiIndex: [0, 0, 0],
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

  _createClass(NewAddress, [{
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
    value: function onLoad() {
      // this.initTopArea()
      this.$apply();
    }
  }]);

  return NewAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(NewAddress , 'pages/newAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FkZC5qcyJdLCJuYW1lcyI6WyJOZXdBZGRyZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsIm51bSIsIm11bHRpQXJyYXkiLCJtdWx0aUluZGV4IiwibXVsdGlBcmVhSWQiLCJjb21wdXRlZCIsIm11bHRpVmFsdWUiLCJ0ZW1wQXJyIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInB1c2giLCJtZXRob2RzIiwidG9wQXJlYSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwidmFsdWUiLCJ0ZW1wIiwibWFwIiwiY2hpbGRBcmVhIiwiY29sdW1uIiwiZ2V0Q2l0eSIsImdldEFyZWEiLCJjYW5jZWwiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJfdGhpcyIsIkh0dHBSZXF1ZXN0IiwiR2V0VG9wQXJlYSIsInRoZW4iLCJyZXMiLCJlcnJvciIsIm1pc3NUb2tlbiIsImluaXRUb3BBcmVhIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7aU1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxXQUFLLENBRkE7QUFHTEMsa0JBQVksQ0FDVixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixDQURVLEVBRVYsQ0FBQyxLQUFELEVBQVEsR0FBUixDQUZVLEVBR1YsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsQ0FIVSxDQUhQO0FBUUxDLGtCQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBUlA7QUFTTEMsbUJBQWEsQ0FDWCxDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFFBQXJCLEVBQStCLFFBQS9CLENBRFcsRUFFWCxDQUFDLFFBQUQsRUFBVyxRQUFYLENBRlcsRUFHWCxDQUFDLFFBQUQsRUFB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QUFDVCxXQUFLRixVQUFMLENBQWdCLENBQWhCLElBQXFCLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLENBQXJCO0FBQ0EsV0FBS0UsV0FBTCxDQUFpQixDQUFqQixJQUFzQixDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLENBQXRCO0FBQ0EsV0FBS0QsVUFBTCxDQUFnQixDQUFoQixJQUFxQixDQUFyQjtBQUNBLFdBQUtxQixPQUFMO0FBQ0Q7Ozs4QkFDVTtBQUNULFdBQUtyQixVQUFMLENBQWdCLENBQWhCLElBQXFCLENBQXJCO0FBQ0EsV0FBS0QsVUFBTCxDQUFnQixDQUFoQixJQUFxQixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxNQUFwQyxFQUE0QyxLQUE1QyxDQUFyQjtBQUNBLFdBQUtFLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0IsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxTQUF4RCxFQUFtRSxTQUFuRSxDQUF0QjtBQUNEOzs7NkJBQ1M7QUFDUjtBQUNBLFdBQUtnQyxNQUFMO0FBQ0Q7Ozs7RUFyR3FDLGVBQUtDLEk7O2tCQUF4QnpDLFUiLCJmaWxlIjoibmV3QWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3QWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWsOWinuWcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIG51bTogMCxcbiAgICAgIG11bHRpQXJyYXk6IFtcbiAgICAgICAgWyfljJfkuqzluIInLCAn5LiK5rW35biCJywgJ+W5v+S4nOecgScsICfmsZ/opb/nnIEnXSxcbiAgICAgICAgWyfluILovpbljLonLCAn5Y6/J10sXG4gICAgICAgIFsn5Lic5Z+O5Yy6JywgJ+ilv+WfjuWMuicsICfltIfmlofljLonXVxuICAgICAgXSxcbiAgICAgIG11bHRpSW5kZXg6IFswLCAwLCAwXSxcbiAgICAgIG11bHRpQXJlYUlkOiBbXG4gICAgICAgIFsnMTAwMDAxJywgJzEwMDAwMicsICcxMDAwMDMnLCAnMTAwMDA0J10sXG4gICAgICAgIFsnMjAwMDAxJywgJzIwMDAwMiddLFxuICAgICAgICBbJzMwMDAwMScsICczMDAwMDInLCAnMzAwMDAzJ11cbiAgICAgIF1cbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBtdWx0aVZhbHVlICgpIHtcbiAgICAgICAgdmFyIHRlbXBBcnIgPSBbXVxuICAgICAgICB0aGlzLm11bHRpQXJlYUlkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgdGVtcEFyci5wdXNoKGl0ZW1bMF0pXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB0ZW1wQXJyXG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b3BBcmVhIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLnZhbHVlKVxuICAgICAgICB0aGlzLm11bHRpSW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB2YXIgdGVtcCA9IFtdXG4gICAgICAgIHRlbXAgPSB0aGlzLm11bHRpVmFsdWUubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpQXJlYUlkW2luZGV4XVt0aGlzLm11bHRpSW5kZXhbaW5kZXhdXVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm11bHRpVmFsdWUgPSB0ZW1wXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXVsdGlWYWx1ZSlcbiAgICAgIH0sXG4gICAgICBjaGlsZEFyZWEgKGUpIHtcbiAgICAgICAgdGhpcy5udW0gKytcbiAgICAgICAgY29uc29sZS5sb2coJ1NlbmQgUmVxdWVzdDonICsgdGhpcy5udW0pXG4gICAgICAgIHRoaXMubXVsdGlJbmRleFtlLmRldGFpbC5jb2x1bW5dID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgc3dpdGNoIChlLmRldGFpbC5jb2x1bW4pIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAvLyDpgInmi6nnnIFcbiAgICAgICAgICAgIC8vIHRlbXBbMF0g5L2c5Li6dG9wIGFyZWFJZCDlj5HpgIHor7fmsYLojrflj5bluIJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2l0eSgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIC8vIOmAieaLqeW4glxuICAgICAgICAgICAgLy8gdGVtcFsxXSDkvZzkuLphcmVhSWQg5Y+R6YCB6K+35rGC6I635Y+W5Yy6XG4gICAgICAgICAgICB0aGlzLmdldEFyZWEoKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIC8vIHRoaXMuaW5pdERlZmF1bHQoKVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VG9wQXJlYSAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge31cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BBcmVhKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdERlZmF1bHQgKCkge1xuICAgICAgdGhpcy5tdWx0aUFycmF5ID0gW1xuICAgICAgICBbJ+WMl+S6rOW4gicsICfkuIrmtbfluIInLCAn5bm/5Lic55yBJywgJ+axn+ilv+ecgSddLFxuICAgICAgICBbJ+W4gui+luWMuicsICfljr8nXSxcbiAgICAgICAgWyfkuJzln47ljLonLCAn6KW/5Z+O5Yy6JywgJ+W0h+aWh+WMuiddXG4gICAgICBdXG4gICAgICB0aGlzLm11bHRpSW5kZXggPSBbMCwgMCwgMF1cbiAgICAgIHRoaXMubXVsdGlBcmVhSWQgPSBbXG4gICAgICAgIFsnMTAwMDAxJywgJzEwMDAwMicsICcxMDAwMDMnLCAnMTAwMDA0J10sXG4gICAgICAgIFsnMjAwMDAxJywgJzIwMDAwMiddLFxuICAgICAgICBbJzMwMDAwMScsICczMDAwMDInLCAnMzAwMDAzJ11cbiAgICAgIF1cbiAgICB9XG4gICAgZ2V0Q2l0eSAoKSB7XG4gICAgICB0aGlzLm11bHRpQXJyYXlbMV0gPSBbJ+W5v+W3nicsICfmt7HlnLMnLCAn54+g5rW3JywgJ+axleWktCddXG4gICAgICB0aGlzLm11bHRpQXJlYUlkWzFdID0gWycyMDAwMDFCJywgJzIwMDAwMkInLCAnMjAwMDAzQicsICcyMDAwMDRCJ11cbiAgICAgIHRoaXMubXVsdGlJbmRleFsxXSA9IDBcbiAgICAgIHRoaXMuZ2V0QXJlYSgpXG4gICAgfVxuICAgIGdldEFyZWEgKCkge1xuICAgICAgdGhpcy5tdWx0aUluZGV4WzJdID0gMFxuICAgICAgdGhpcy5tdWx0aUFycmF5WzJdID0gWyfpnZnlronljLonLCAn6buE5rWm5Yy6JywgJ+W+kOaxh+WMuicsICfpnZLmtabljLonLCAn5Y2i5rm+5Yy6JywgJ+a1puS4nOaWsOWMuicsICflvpDmsYfljLonXVxuICAgICAgdGhpcy5tdWx0aUFyZWFJZFsyXSA9IFsnMzAwMDAxQicsICczMDAwMDJCJywgJzMwMDAwM0InLCAnMzAwMDA0QicsICczMDAwMDVCJywgJzMwMDAwNkInLCAnMzAwMDA3QiddXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAvLyB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==