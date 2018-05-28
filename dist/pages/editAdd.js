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
      token: '',
      multiArray: [],
      multiIndex: [0, 0, 0],
      multiAreaId: [],
      multiValue: '',
      userName: '',
      userPhone: '',
      postcode: '',
      fullarea: '',
      id: '',
      myreg: /^[1][3,4,5,7,8][0-9]{9}$/,
      userAdd: ''
    }, _this.computed = {
      // multiValue () {
      //   var tempArr = []
      //   this.multiAreaId.forEach((item, index) => {
      //     tempArr.push(item[0])
      //   })
      //   return tempArr
      // }
    }, _this.methods = {
      nameTap: function nameTap(e) {
        this.userName = e.detail.value;
        return this.userName;
      },
      phoneTap: function phoneTap(e) {
        this.userPhone = e.detail.value;
        return this.userPhone;
      },
      postTap: function postTap(e) {
        this.postcode = e.detail.value;
        return this.postcode;
      },
      userAddTap: function userAddTap(e) {
        this.userAdd = e.detail.value;
      },
      topArea: function topArea(e) {
        this.multiIndex = e.detail.value;
        // var temp = []
        // temp = this.multiValue.map((item, index) => {
        //   return this.multiAreaId[index][this.multiIndex[index]]
        // })
        // this.multiValue = temp
        // console.log(this.multiValue)
      },
      childArea: function childArea(e) {
        var _this2 = this;

        this.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
          case 0:
            // 选择省
            // temp[0] 作为top areaId 发送请求获取市
            // this.getCity()
            this.getCity(this.multiAreaId[0][e.detail.value], function () {
              _this2.getArea(_this2.multiAreaId[1][0]);
            });
            break;
          case 1:
            // 选择市
            // temp[1] 作为areaId 发送请求获取区
            // this.getArea()
            console.log(this.multiAreaId[1][e.detail.value]);
            this.getArea(this.multiAreaId[1][e.detail.value]);
            break;
          case 2:
            this.multiIndex[2] = e.detail.value;
            this.multiValue = this.multiAreaId[2][e.detail.value];
            break;
        }
      },
      cancel: function cancel() {
        this.initTopArea();
      },
      confirm: function confirm() {
        var _this3 = this;

        console.log(this.multiValue);
        this.token = this.$parent.getToken();
        if (this.userName && this.userPhone && this.userAdd) {
          if (this.myreg.test(this.userPhone)) {
            var data = {
              token: this.token,
              name: this.userName,
              phone: this.userPhone,
              areaId: this.multiValue,
              detail: this.userAdd,
              postCode: this.postcode,
              addressId: this.id
            };
            this.$parent.HttpRequest.EditAddress(data).then(function (res) {
              console.log(res);
              if (res.data.error === 0) {
                _wepy2.default.redirectTo({
                  url: './address'
                });
              } else {
                if (_this3.$parent.missToken) {
                  _this3.token = _this3.$parent.getToken(res.data.error);
                }
              }
            });
          } else {
            _wepy2.default.showToast({
              title: '请输入正确的手机号',
              icon: 'none'
            });
          }
        } else {
          _wepy2.default.showToast({
            title: '请填写完整收货信息',
            icon: 'none'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditAddress, [{
    key: 'initTopArea',
    value: function initTopArea() {
      var _this4 = this;

      console.log(this.fullarea);
      this.multiArray[0] = [];
      this.multiAreaId[0] = [];
      this.getAreaData(0, function (res) {
        var data = res.data.data;
        data.forEach(function (item) {
          _this4.multiArray[0].push(item.area_name);
          _this4.multiAreaId[0].push(item.area_id);
        });
        var index = _this4.multiAreaId[0].indexOf(parseInt(_this4.fullarea[0]));
        _this4.multiIndex = [index, 0, 0];
        _this4.getCity(_this4.fullarea[0], function () {
          _this4.multiIndex[1] = _this4.multiAreaId[1].indexOf(parseInt(_this4.fullarea[1]));
          _this4.getArea(_this4.fullarea[1], function () {
            _this4.multiIndex[2] = _this4.multiAreaId[2].indexOf(parseInt(_this4.fullarea[2]));
            _this4.multiValue = _this4.fullarea[2];
          });
        });
      });
    }
  }, {
    key: 'getAreaData',
    value: function getAreaData(id, cb) {
      var _this5 = this;

      var data = {
        parentId: id
      };
      this.$parent.HttpRequest.GetTopArea(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb(res);
        }
        _this5.$apply();
      });
    }
  }, {
    key: 'getCity',
    value: function getCity(id, cb) {
      var _this6 = this;

      this.multiArray[1] = [];
      this.multiAreaId[1] = [];
      this.getAreaData(id, function (res) {
        var data = res.data.data;
        data.forEach(function (item) {
          _this6.multiArray[1].push(item.area_name);
          _this6.multiAreaId[1].push(item.area_id);
        });
        _this6.multiIndex[1] = 0;
        cb && cb();
      });
    }
  }, {
    key: 'getArea',
    value: function getArea(id, cb) {
      var _this7 = this;

      this.multiArray[2] = [];
      this.multiAreaId[2] = [];
      this.getAreaData(id, function (res) {
        var data = res.data.data;
        data.forEach(function (item) {
          _this7.multiArray[2].push(item.area_name);
          _this7.multiAreaId[2].push(item.area_id);
        });
        _this7.multiIndex[2] = 0;
        _this7.multiValue = _this7.multiAreaId[2][0];
        cb && cb();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      var address = JSON.parse(param.detail);
      this.userName = address.name;
      this.userPhone = address.phone;
      this.userAdd = address.detail;
      this.fullarea = address.areaFullId.split(',');
      this.id = address.id;
      this.initTopArea();
      this.$apply();
    }
  }]);

  return EditAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditAddress , 'pages/editAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRBZGQuanMiXSwibmFtZXMiOlsiRWRpdEFkZHJlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwibXVsdGlBcnJheSIsIm11bHRpSW5kZXgiLCJtdWx0aUFyZWFJZCIsIm11bHRpVmFsdWUiLCJ1c2VyTmFtZSIsInVzZXJQaG9uZSIsInBvc3Rjb2RlIiwiZnVsbGFyZWEiLCJpZCIsIm15cmVnIiwidXNlckFkZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm5hbWVUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJwaG9uZVRhcCIsInBvc3RUYXAiLCJ1c2VyQWRkVGFwIiwidG9wQXJlYSIsImNoaWxkQXJlYSIsImNvbHVtbiIsImdldENpdHkiLCJnZXRBcmVhIiwiY29uc29sZSIsImxvZyIsImNhbmNlbCIsImluaXRUb3BBcmVhIiwiY29uZmlybSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsInRlc3QiLCJuYW1lIiwicGhvbmUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsImFkZHJlc3NJZCIsIkh0dHBSZXF1ZXN0IiwidGhlbiIsInJlcyIsImVycm9yIiwicmVkaXJlY3RUbyIsInVybCIsIm1pc3NUb2tlbiIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImdldEFyZWFEYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwiYXJlYV9uYW1lIiwiYXJlYV9pZCIsImluZGV4IiwiaW5kZXhPZiIsInBhcnNlSW50IiwiY2IiLCJwYXJlbnRJZCIsIkdldFRvcEFyZWEiLCIkYXBwbHkiLCJwYXJhbSIsImFkZHJlc3MiLCJKU09OIiwicGFyc2UiLCJhcmVhRnVsbElkIiwic3BsaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGtCQUFZLEVBRlA7QUFHTEMsa0JBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FIUDtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLGtCQUFZLEVBTFA7QUFNTEMsZ0JBQVUsRUFOTDtBQU9MQyxpQkFBVyxFQVBOO0FBUUxDLGdCQUFVLEVBUkw7QUFTTEMsZ0JBQVUsRUFUTDtBQVVMQyxVQUFJLEVBVkM7QUFXTEMsYUFBTywwQkFYRjtBQVlMQyxlQUFTO0FBWkosSyxRQWNQQyxRLEdBQVc7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBTLEssUUFTWEMsTyxHQUFVO0FBQ1JDLGFBRFEsbUJBQ0NDLENBREQsRUFDSTtBQUNWLGFBQUtWLFFBQUwsR0FBZ0JVLEVBQUVDLE1BQUYsQ0FBU0MsS0FBekI7QUFDQSxlQUFPLEtBQUtaLFFBQVo7QUFDRCxPQUpPO0FBS1JhLGNBTFEsb0JBS0VILENBTEYsRUFLSztBQUNYLGFBQUtULFNBQUwsR0FBaUJTLEVBQUVDLE1BQUYsQ0FBU0MsS0FBMUI7QUFDQSxlQUFPLEtBQUtYLFNBQVo7QUFDRCxPQVJPO0FBU1JhLGFBVFEsbUJBU0NKLENBVEQsRUFTSTtBQUNWLGFBQUtSLFFBQUwsR0FBZ0JRLEVBQUVDLE1BQUYsQ0FBU0MsS0FBekI7QUFDQSxlQUFPLEtBQUtWLFFBQVo7QUFDRCxPQVpPO0FBYVJhLGdCQWJRLHNCQWFJTCxDQWJKLEVBYU87QUFDYixhQUFLSixPQUFMLEdBQWVJLEVBQUVDLE1BQUYsQ0FBU0MsS0FBeEI7QUFDRCxPQWZPO0FBZ0JSSSxhQWhCUSxtQkFnQkNOLENBaEJELEVBZ0JJO0FBQ1YsYUFBS2IsVUFBTCxHQUFrQmEsRUFBRUMsTUFBRixDQUFTQyxLQUEzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELE9BeEJPO0FBeUJSSyxlQXpCUSxxQkF5QkdQLENBekJILEVBeUJNO0FBQUE7O0FBQ1osYUFBS2IsVUFBTCxDQUFnQmEsRUFBRUMsTUFBRixDQUFTTyxNQUF6QixJQUFtQ1IsRUFBRUMsTUFBRixDQUFTQyxLQUE1QztBQUNBLGdCQUFRRixFQUFFQyxNQUFGLENBQVNPLE1BQWpCO0FBQ0UsZUFBSyxDQUFMO0FBQ0U7QUFDQTtBQUNBO0FBQ0EsaUJBQUtDLE9BQUwsQ0FBYSxLQUFLckIsV0FBTCxDQUFpQixDQUFqQixFQUFvQlksRUFBRUMsTUFBRixDQUFTQyxLQUE3QixDQUFiLEVBQWtELFlBQU07QUFDdEQscUJBQUtRLE9BQUwsQ0FBYSxPQUFLdEIsV0FBTCxDQUFpQixDQUFqQixFQUFvQixDQUFwQixDQUFiO0FBQ0QsYUFGRDtBQUdBO0FBQ0YsZUFBSyxDQUFMO0FBQ0U7QUFDQTtBQUNBO0FBQ0F1QixvQkFBUUMsR0FBUixDQUFZLEtBQUt4QixXQUFMLENBQWlCLENBQWpCLEVBQW9CWSxFQUFFQyxNQUFGLENBQVNDLEtBQTdCLENBQVo7QUFDQSxpQkFBS1EsT0FBTCxDQUFhLEtBQUt0QixXQUFMLENBQWlCLENBQWpCLEVBQW9CWSxFQUFFQyxNQUFGLENBQVNDLEtBQTdCLENBQWI7QUFDQTtBQUNGLGVBQUssQ0FBTDtBQUNFLGlCQUFLZixVQUFMLENBQWdCLENBQWhCLElBQXFCYSxFQUFFQyxNQUFGLENBQVNDLEtBQTlCO0FBQ0EsaUJBQUtiLFVBQUwsR0FBa0IsS0FBS0QsV0FBTCxDQUFpQixDQUFqQixFQUFvQlksRUFBRUMsTUFBRixDQUFTQyxLQUE3QixDQUFsQjtBQUNBO0FBbkJKO0FBcUJELE9BaERPO0FBaURSVyxZQWpEUSxvQkFpREU7QUFDUixhQUFLQyxXQUFMO0FBQ0QsT0FuRE87QUFvRFJDLGFBcERRLHFCQW9ERztBQUFBOztBQUNUSixnQkFBUUMsR0FBUixDQUFZLEtBQUt2QixVQUFqQjtBQUNBLGFBQUtKLEtBQUwsR0FBYSxLQUFLK0IsT0FBTCxDQUFhQyxRQUFiLEVBQWI7QUFDQSxZQUFJLEtBQUszQixRQUFMLElBQWlCLEtBQUtDLFNBQXRCLElBQW1DLEtBQUtLLE9BQTVDLEVBQXFEO0FBQ25ELGNBQUksS0FBS0QsS0FBTCxDQUFXdUIsSUFBWCxDQUFnQixLQUFLM0IsU0FBckIsQ0FBSixFQUFxQztBQUNuQyxnQkFBSVAsT0FBTztBQUNUQyxxQkFBTyxLQUFLQSxLQURIO0FBRVRrQyxvQkFBTSxLQUFLN0IsUUFGRjtBQUdUOEIscUJBQU8sS0FBSzdCLFNBSEg7QUFJVDhCLHNCQUFRLEtBQUtoQyxVQUpKO0FBS1RZLHNCQUFRLEtBQUtMLE9BTEo7QUFNVDBCLHdCQUFVLEtBQUs5QixRQU5OO0FBT1QrQix5QkFBVyxLQUFLN0I7QUFQUCxhQUFYO0FBU0EsaUJBQUtzQixPQUFMLENBQWFRLFdBQWIsQ0FBeUIzQyxXQUF6QixDQUFxQ0csSUFBckMsRUFBMkN5QyxJQUEzQyxDQUFnRCxVQUFDQyxHQUFELEVBQVM7QUFDdkRmLHNCQUFRQyxHQUFSLENBQVljLEdBQVo7QUFDQSxrQkFBSUEsSUFBSTFDLElBQUosQ0FBUzJDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsK0JBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsdUJBQUs7QUFEUyxpQkFBaEI7QUFHRCxlQUpELE1BSU87QUFDTCxvQkFBSSxPQUFLYixPQUFMLENBQWFjLFNBQWpCLEVBQTRCO0FBQzFCLHlCQUFLN0MsS0FBTCxHQUFhLE9BQUsrQixPQUFMLENBQWFDLFFBQWIsQ0FBc0JTLElBQUkxQyxJQUFKLENBQVMyQyxLQUEvQixDQUFiO0FBQ0Q7QUFDRjtBQUNGLGFBWEQ7QUFZRCxXQXRCRCxNQXNCTztBQUNMLDJCQUFLSSxTQUFMLENBQWU7QUFDYkMscUJBQU8sV0FETTtBQUViQyxvQkFBTTtBQUZPLGFBQWY7QUFJRDtBQUNGLFNBN0JELE1BNkJPO0FBQ0wseUJBQUtGLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxXQURNO0FBRWJDLGtCQUFNO0FBRk8sV0FBZjtBQUlEO0FBQ0Y7QUExRk8sSzs7Ozs7a0NBNEZLO0FBQUE7O0FBQ2J0QixjQUFRQyxHQUFSLENBQVksS0FBS25CLFFBQWpCO0FBQ0EsV0FBS1AsVUFBTCxDQUFnQixDQUFoQixJQUFxQixFQUFyQjtBQUNBLFdBQUtFLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0IsRUFBdEI7QUFDQSxXQUFLOEMsV0FBTCxDQUFpQixDQUFqQixFQUFvQixVQUFDUixHQUFELEVBQVM7QUFDM0IsWUFBSTFDLE9BQU8wQyxJQUFJMUMsSUFBSixDQUFTQSxJQUFwQjtBQUNBQSxhQUFLbUQsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQixpQkFBS2xELFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUJtRCxJQUFuQixDQUF3QkQsS0FBS0UsU0FBN0I7QUFDQSxpQkFBS2xELFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JpRCxJQUFwQixDQUF5QkQsS0FBS0csT0FBOUI7QUFDRCxTQUhEO0FBSUEsWUFBSUMsUUFBUSxPQUFLcEQsV0FBTCxDQUFpQixDQUFqQixFQUFvQnFELE9BQXBCLENBQTRCQyxTQUFTLE9BQUtqRCxRQUFMLENBQWMsQ0FBZCxDQUFULENBQTVCLENBQVo7QUFDQSxlQUFLTixVQUFMLEdBQWtCLENBQUNxRCxLQUFELEVBQVEsQ0FBUixFQUFXLENBQVgsQ0FBbEI7QUFDQSxlQUFLL0IsT0FBTCxDQUFhLE9BQUtoQixRQUFMLENBQWMsQ0FBZCxDQUFiLEVBQStCLFlBQU07QUFDbkMsaUJBQUtOLFVBQUwsQ0FBZ0IsQ0FBaEIsSUFBcUIsT0FBS0MsV0FBTCxDQUFpQixDQUFqQixFQUFvQnFELE9BQXBCLENBQTRCQyxTQUFTLE9BQUtqRCxRQUFMLENBQWMsQ0FBZCxDQUFULENBQTVCLENBQXJCO0FBQ0EsaUJBQUtpQixPQUFMLENBQWEsT0FBS2pCLFFBQUwsQ0FBYyxDQUFkLENBQWIsRUFBK0IsWUFBTTtBQUNuQyxtQkFBS04sVUFBTCxDQUFnQixDQUFoQixJQUFxQixPQUFLQyxXQUFMLENBQWlCLENBQWpCLEVBQW9CcUQsT0FBcEIsQ0FBNEJDLFNBQVMsT0FBS2pELFFBQUwsQ0FBYyxDQUFkLENBQVQsQ0FBNUIsQ0FBckI7QUFDQSxtQkFBS0osVUFBTCxHQUFrQixPQUFLSSxRQUFMLENBQWMsQ0FBZCxDQUFsQjtBQUNELFdBSEQ7QUFJRCxTQU5EO0FBT0QsT0FmRDtBQWdCRDs7O2dDQUNZQyxFLEVBQUlpRCxFLEVBQUk7QUFBQTs7QUFDbkIsVUFBSTNELE9BQU87QUFDVDRELGtCQUFVbEQ7QUFERCxPQUFYO0FBR0EsV0FBS3NCLE9BQUwsQ0FBYVEsV0FBYixDQUF5QnFCLFVBQXpCLENBQW9DN0QsSUFBcEMsRUFBMEN5QyxJQUExQyxDQUErQyxVQUFDQyxHQUFELEVBQVM7QUFDdERmLGdCQUFRQyxHQUFSLENBQVljLEdBQVo7QUFDQSxZQUFJQSxJQUFJMUMsSUFBSixDQUFTMkMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QmdCLGdCQUFNQSxHQUFHakIsR0FBSCxDQUFOO0FBQ0Q7QUFDRCxlQUFLb0IsTUFBTDtBQUNELE9BTkQ7QUFPRDs7OzRCQUNRcEQsRSxFQUFJaUQsRSxFQUFJO0FBQUE7O0FBQ2YsV0FBS3pELFVBQUwsQ0FBZ0IsQ0FBaEIsSUFBcUIsRUFBckI7QUFDQSxXQUFLRSxXQUFMLENBQWlCLENBQWpCLElBQXNCLEVBQXRCO0FBQ0EsV0FBSzhDLFdBQUwsQ0FBaUJ4QyxFQUFqQixFQUFxQixVQUFDZ0MsR0FBRCxFQUFTO0FBQzVCLFlBQUkxQyxPQUFPMEMsSUFBSTFDLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsYUFBS21ELE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsaUJBQUtsRCxVQUFMLENBQWdCLENBQWhCLEVBQW1CbUQsSUFBbkIsQ0FBd0JELEtBQUtFLFNBQTdCO0FBQ0EsaUJBQUtsRCxXQUFMLENBQWlCLENBQWpCLEVBQW9CaUQsSUFBcEIsQ0FBeUJELEtBQUtHLE9BQTlCO0FBQ0QsU0FIRDtBQUlBLGVBQUtwRCxVQUFMLENBQWdCLENBQWhCLElBQXFCLENBQXJCO0FBQ0F3RCxjQUFNQSxJQUFOO0FBQ0QsT0FSRDtBQVNEOzs7NEJBQ1FqRCxFLEVBQUlpRCxFLEVBQUk7QUFBQTs7QUFDZixXQUFLekQsVUFBTCxDQUFnQixDQUFoQixJQUFxQixFQUFyQjtBQUNBLFdBQUtFLFdBQUwsQ0FBaUIsQ0FBakIsSUFBc0IsRUFBdEI7QUFDQSxXQUFLOEMsV0FBTCxDQUFpQnhDLEVBQWpCLEVBQXFCLFVBQUNnQyxHQUFELEVBQVM7QUFDNUIsWUFBSTFDLE9BQU8wQyxJQUFJMUMsSUFBSixDQUFTQSxJQUFwQjtBQUNBQSxhQUFLbUQsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQixpQkFBS2xELFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUJtRCxJQUFuQixDQUF3QkQsS0FBS0UsU0FBN0I7QUFDQSxpQkFBS2xELFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JpRCxJQUFwQixDQUF5QkQsS0FBS0csT0FBOUI7QUFDRCxTQUhEO0FBSUEsZUFBS3BELFVBQUwsQ0FBZ0IsQ0FBaEIsSUFBcUIsQ0FBckI7QUFDQSxlQUFLRSxVQUFMLEdBQWtCLE9BQUtELFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBbEI7QUFDQXVELGNBQU1BLElBQU47QUFDRCxPQVREO0FBVUQ7OzsyQkFDT0ksSyxFQUFPO0FBQ2IsVUFBSUMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXSCxNQUFNOUMsTUFBakIsQ0FBZDtBQUNBLFdBQUtYLFFBQUwsR0FBZ0IwRCxRQUFRN0IsSUFBeEI7QUFDQSxXQUFLNUIsU0FBTCxHQUFpQnlELFFBQVE1QixLQUF6QjtBQUNBLFdBQUt4QixPQUFMLEdBQWVvRCxRQUFRL0MsTUFBdkI7QUFDQSxXQUFLUixRQUFMLEdBQWdCdUQsUUFBUUcsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUIsR0FBekIsQ0FBaEI7QUFDQSxXQUFLMUQsRUFBTCxHQUFVc0QsUUFBUXRELEVBQWxCO0FBQ0EsV0FBS29CLFdBQUw7QUFDQSxXQUFLZ0MsTUFBTDtBQUNEOzs7O0VBNUxzQyxlQUFLTyxJOztrQkFBekJ4RSxXIiwiZmlsZSI6ImVkaXRBZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0QWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e8lui+keWcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIG11bHRpQXJyYXk6IFtdLFxuICAgICAgbXVsdGlJbmRleDogWzAsIDAsIDBdLFxuICAgICAgbXVsdGlBcmVhSWQ6IFtdLFxuICAgICAgbXVsdGlWYWx1ZTogJycsXG4gICAgICB1c2VyTmFtZTogJycsXG4gICAgICB1c2VyUGhvbmU6ICcnLFxuICAgICAgcG9zdGNvZGU6ICcnLFxuICAgICAgZnVsbGFyZWE6ICcnLFxuICAgICAgaWQ6ICcnLFxuICAgICAgbXlyZWc6IC9eWzFdWzMsNCw1LDcsOF1bMC05XXs5fSQvLFxuICAgICAgdXNlckFkZDogJydcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAvLyBtdWx0aVZhbHVlICgpIHtcbiAgICAgIC8vICAgdmFyIHRlbXBBcnIgPSBbXVxuICAgICAgLy8gICB0aGlzLm11bHRpQXJlYUlkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAvLyAgICAgdGVtcEFyci5wdXNoKGl0ZW1bMF0pXG4gICAgICAvLyAgIH0pXG4gICAgICAvLyAgIHJldHVybiB0ZW1wQXJyXG4gICAgICAvLyB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYW1lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyTmFtZVxuICAgICAgfSxcbiAgICAgIHBob25lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclBob25lXG4gICAgICB9LFxuICAgICAgcG9zdFRhcCAoZSkge1xuICAgICAgICB0aGlzLnBvc3Rjb2RlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdGNvZGVcbiAgICAgIH0sXG4gICAgICB1c2VyQWRkVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlckFkZCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgdG9wQXJlYSAoZSkge1xuICAgICAgICB0aGlzLm11bHRpSW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAvLyB2YXIgdGVtcCA9IFtdXG4gICAgICAgIC8vIHRlbXAgPSB0aGlzLm11bHRpVmFsdWUubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyAgIHJldHVybiB0aGlzLm11bHRpQXJlYUlkW2luZGV4XVt0aGlzLm11bHRpSW5kZXhbaW5kZXhdXVxuICAgICAgICAvLyB9KVxuICAgICAgICAvLyB0aGlzLm11bHRpVmFsdWUgPSB0ZW1wXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubXVsdGlWYWx1ZSlcbiAgICAgIH0sXG4gICAgICBjaGlsZEFyZWEgKGUpIHtcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICBzd2l0Y2ggKGUuZGV0YWlsLmNvbHVtbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIC8vIOmAieaLqeecgVxuICAgICAgICAgICAgLy8gdGVtcFswXSDkvZzkuLp0b3AgYXJlYUlkIOWPkemAgeivt+axguiOt+WPluW4glxuICAgICAgICAgICAgLy8gdGhpcy5nZXRDaXR5KClcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2l0eSh0aGlzLm11bHRpQXJlYUlkWzBdW2UuZGV0YWlsLnZhbHVlXSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5tdWx0aUFyZWFJZFsxXVswXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIC8vIOmAieaLqeW4glxuICAgICAgICAgICAgLy8gdGVtcFsxXSDkvZzkuLphcmVhSWQg5Y+R6YCB6K+35rGC6I635Y+W5Yy6XG4gICAgICAgICAgICAvLyB0aGlzLmdldEFyZWEoKVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tdWx0aUFyZWFJZFsxXVtlLmRldGFpbC52YWx1ZV0pXG4gICAgICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5tdWx0aUFyZWFJZFsxXVtlLmRldGFpbC52YWx1ZV0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHRoaXMubXVsdGlJbmRleFsyXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICB0aGlzLm11bHRpVmFsdWUgPSB0aGlzLm11bHRpQXJlYUlkWzJdW2UuZGV0YWlsLnZhbHVlXVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm0gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm11bHRpVmFsdWUpXG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAodGhpcy51c2VyTmFtZSAmJiB0aGlzLnVzZXJQaG9uZSAmJiB0aGlzLnVzZXJBZGQpIHtcbiAgICAgICAgICBpZiAodGhpcy5teXJlZy50ZXN0KHRoaXMudXNlclBob25lKSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lLFxuICAgICAgICAgICAgICBwaG9uZTogdGhpcy51c2VyUGhvbmUsXG4gICAgICAgICAgICAgIGFyZWFJZDogdGhpcy5tdWx0aVZhbHVlLFxuICAgICAgICAgICAgICBkZXRhaWw6IHRoaXMudXNlckFkZCxcbiAgICAgICAgICAgICAgcG9zdENvZGU6IHRoaXMucG9zdGNvZGUsXG4gICAgICAgICAgICAgIGFkZHJlc3NJZDogdGhpcy5pZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkVkaXRBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcuL2FkZHJlc3MnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7cnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35aGr5YaZ5a6M5pW05pS26LSn5L+h5oGvJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFRvcEFyZWEgKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5mdWxsYXJlYSlcbiAgICAgIHRoaXMubXVsdGlBcnJheVswXSA9IFtdXG4gICAgICB0aGlzLm11bHRpQXJlYUlkWzBdID0gW11cbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoMCwgKHJlcykgPT4ge1xuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5tdWx0aUFycmF5WzBdLnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgICAgICAgdGhpcy5tdWx0aUFyZWFJZFswXS5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5tdWx0aUFyZWFJZFswXS5pbmRleE9mKHBhcnNlSW50KHRoaXMuZnVsbGFyZWFbMF0pKVxuICAgICAgICB0aGlzLm11bHRpSW5kZXggPSBbaW5kZXgsIDAsIDBdXG4gICAgICAgIHRoaXMuZ2V0Q2l0eSh0aGlzLmZ1bGxhcmVhWzBdLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tdWx0aUluZGV4WzFdID0gdGhpcy5tdWx0aUFyZWFJZFsxXS5pbmRleE9mKHBhcnNlSW50KHRoaXMuZnVsbGFyZWFbMV0pKVxuICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLmZ1bGxhcmVhWzFdLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm11bHRpSW5kZXhbMl0gPSB0aGlzLm11bHRpQXJlYUlkWzJdLmluZGV4T2YocGFyc2VJbnQodGhpcy5mdWxsYXJlYVsyXSkpXG4gICAgICAgICAgICB0aGlzLm11bHRpVmFsdWUgPSB0aGlzLmZ1bGxhcmVhWzJdXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldEFyZWFEYXRhIChpZCwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwYXJlbnRJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BBcmVhKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKHJlcylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRDaXR5IChpZCwgY2IpIHtcbiAgICAgIHRoaXMubXVsdGlBcnJheVsxXSA9IFtdXG4gICAgICB0aGlzLm11bHRpQXJlYUlkWzFdID0gW11cbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoaWQsIChyZXMpID0+IHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMubXVsdGlBcnJheVsxXS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgICAgICAgIHRoaXMubXVsdGlBcmVhSWRbMV0ucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubXVsdGlJbmRleFsxXSA9IDBcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0QXJlYSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLm11bHRpQXJyYXlbMl0gPSBbXVxuICAgICAgdGhpcy5tdWx0aUFyZWFJZFsyXSA9IFtdXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKGlkLCAocmVzKSA9PiB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLm11bHRpQXJyYXlbMl0ucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLm11bHRpQXJlYUlkWzJdLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm11bHRpSW5kZXhbMl0gPSAwXG4gICAgICAgIHRoaXMubXVsdGlWYWx1ZSA9IHRoaXMubXVsdGlBcmVhSWRbMl1bMF1cbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgdmFyIGFkZHJlc3MgPSBKU09OLnBhcnNlKHBhcmFtLmRldGFpbClcbiAgICAgIHRoaXMudXNlck5hbWUgPSBhZGRyZXNzLm5hbWVcbiAgICAgIHRoaXMudXNlclBob25lID0gYWRkcmVzcy5waG9uZVxuICAgICAgdGhpcy51c2VyQWRkID0gYWRkcmVzcy5kZXRhaWxcbiAgICAgIHRoaXMuZnVsbGFyZWEgPSBhZGRyZXNzLmFyZWFGdWxsSWQuc3BsaXQoJywnKVxuICAgICAgdGhpcy5pZCA9IGFkZHJlc3MuaWRcbiAgICAgIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19