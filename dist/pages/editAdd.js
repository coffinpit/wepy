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
                _wepy2.default.navigateBack();
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
      if (param) {
        var address = JSON.parse(param.detail);
        this.userName = address.name;
        this.userPhone = address.phone;
        this.userAdd = address.detail;
        this.postcode = address.postCode;
        this.fullarea = address.areaFullId.split(',');
        this.id = address.id;
      }
      this.initTopArea();
      this.$apply();
    }
  }]);

  return EditAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditAddress , 'pages/editAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRBZGQuanMiXSwibmFtZXMiOlsiRWRpdEFkZHJlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwibXVsdGlBcnJheSIsIm11bHRpSW5kZXgiLCJtdWx0aUFyZWFJZCIsIm11bHRpVmFsdWUiLCJ1c2VyTmFtZSIsInVzZXJQaG9uZSIsInBvc3Rjb2RlIiwiZnVsbGFyZWEiLCJpZCIsIm15cmVnIiwidXNlckFkZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm5hbWVUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJwaG9uZVRhcCIsInBvc3RUYXAiLCJ1c2VyQWRkVGFwIiwidG9wQXJlYSIsImNoaWxkQXJlYSIsImNvbHVtbiIsImdldENpdHkiLCJnZXRBcmVhIiwiY29uc29sZSIsImxvZyIsImNhbmNlbCIsImluaXRUb3BBcmVhIiwiY29uZmlybSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsInRlc3QiLCJuYW1lIiwicGhvbmUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsImFkZHJlc3NJZCIsIkh0dHBSZXF1ZXN0IiwidGhlbiIsInJlcyIsImVycm9yIiwibmF2aWdhdGVCYWNrIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZ2V0QXJlYURhdGEiLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCJhcmVhX25hbWUiLCJhcmVhX2lkIiwiaW5kZXgiLCJpbmRleE9mIiwicGFyc2VJbnQiLCJjYiIsInBhcmVudElkIiwiR2V0VG9wQXJlYSIsIiRhcHBseSIsInBhcmFtIiwiYWRkcmVzcyIsIkpTT04iLCJwYXJzZSIsImFyZWFGdWxsSWQiLCJzcGxpdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsa0JBQVksRUFGUDtBQUdMQyxrQkFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUhQO0FBSUxDLG1CQUFhLEVBSlI7QUFLTEMsa0JBQVksRUFMUDtBQU1MQyxnQkFBVSxFQU5MO0FBT0xDLGlCQUFXLEVBUE47QUFRTEMsZ0JBQVUsRUFSTDtBQVNMQyxnQkFBVSxFQVRMO0FBVUxDLFVBQUksRUFWQztBQVdMQyxhQUFPLDBCQVhGO0FBWUxDLGVBQVM7QUFaSixLLFFBY1BDLFEsR0FBVztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUFMsSyxRQVNYQyxPLEdBQVU7QUFDUkMsYUFEUSxtQkFDQ0MsQ0FERCxFQUNJO0FBQ1YsYUFBS1YsUUFBTCxHQUFnQlUsRUFBRUMsTUFBRixDQUFTQyxLQUF6QjtBQUNBLGVBQU8sS0FBS1osUUFBWjtBQUNELE9BSk87QUFLUmEsY0FMUSxvQkFLRUgsQ0FMRixFQUtLO0FBQ1gsYUFBS1QsU0FBTCxHQUFpQlMsRUFBRUMsTUFBRixDQUFTQyxLQUExQjtBQUNBLGVBQU8sS0FBS1gsU0FBWjtBQUNELE9BUk87QUFTUmEsYUFUUSxtQkFTQ0osQ0FURCxFQVNJO0FBQ1YsYUFBS1IsUUFBTCxHQUFnQlEsRUFBRUMsTUFBRixDQUFTQyxLQUF6QjtBQUNBLGVBQU8sS0FBS1YsUUFBWjtBQUNELE9BWk87QUFhUmEsZ0JBYlEsc0JBYUlMLENBYkosRUFhTztBQUNiLGFBQUtKLE9BQUwsR0FBZUksRUFBRUMsTUFBRixDQUFTQyxLQUF4QjtBQUNELE9BZk87QUFnQlJJLGFBaEJRLG1CQWdCQ04sQ0FoQkQsRUFnQkk7QUFDVixhQUFLYixVQUFMLEdBQWtCYSxFQUFFQyxNQUFGLENBQVNDLEtBQTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsT0F4Qk87QUF5QlJLLGVBekJRLHFCQXlCR1AsQ0F6QkgsRUF5Qk07QUFBQTs7QUFDWixhQUFLYixVQUFMLENBQWdCYSxFQUFFQyxNQUFGLENBQVNPLE1BQXpCLElBQW1DUixFQUFFQyxNQUFGLENBQVNDLEtBQTVDO0FBQ0EsZ0JBQVFGLEVBQUVDLE1BQUYsQ0FBU08sTUFBakI7QUFDRSxlQUFLLENBQUw7QUFDRTtBQUNBO0FBQ0E7QUFDQSxpQkFBS0MsT0FBTCxDQUFhLEtBQUtyQixXQUFMLENBQWlCLENBQWpCLEVBQW9CWSxFQUFFQyxNQUFGLENBQVNDLEtBQTdCLENBQWIsRUFBa0QsWUFBTTtBQUN0RCxxQkFBS1EsT0FBTCxDQUFhLE9BQUt0QixXQUFMLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLENBQWI7QUFDRCxhQUZEO0FBR0E7QUFDRixlQUFLLENBQUw7QUFDRTtBQUNBO0FBQ0E7QUFDQXVCLG9CQUFRQyxHQUFSLENBQVksS0FBS3hCLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JZLEVBQUVDLE1BQUYsQ0FBU0MsS0FBN0IsQ0FBWjtBQUNBLGlCQUFLUSxPQUFMLENBQWEsS0FBS3RCLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JZLEVBQUVDLE1BQUYsQ0FBU0MsS0FBN0IsQ0FBYjtBQUNBO0FBQ0YsZUFBSyxDQUFMO0FBQ0UsaUJBQUtmLFVBQUwsQ0FBZ0IsQ0FBaEIsSUFBcUJhLEVBQUVDLE1BQUYsQ0FBU0MsS0FBOUI7QUFDQSxpQkFBS2IsVUFBTCxHQUFrQixLQUFLRCxXQUFMLENBQWlCLENBQWpCLEVBQW9CWSxFQUFFQyxNQUFGLENBQVNDLEtBQTdCLENBQWxCO0FBQ0E7QUFuQko7QUFxQkQsT0FoRE87QUFpRFJXLFlBakRRLG9CQWlERTtBQUNSLGFBQUtDLFdBQUw7QUFDRCxPQW5ETztBQW9EUkMsYUFwRFEscUJBb0RHO0FBQUE7O0FBQ1RKLGdCQUFRQyxHQUFSLENBQVksS0FBS3ZCLFVBQWpCO0FBQ0EsYUFBS0osS0FBTCxHQUFhLEtBQUsrQixPQUFMLENBQWFDLFFBQWIsRUFBYjtBQUNBLFlBQUksS0FBSzNCLFFBQUwsSUFBaUIsS0FBS0MsU0FBdEIsSUFBbUMsS0FBS0ssT0FBNUMsRUFBcUQ7QUFDbkQsY0FBSSxLQUFLRCxLQUFMLENBQVd1QixJQUFYLENBQWdCLEtBQUszQixTQUFyQixDQUFKLEVBQXFDO0FBQ25DLGdCQUFJUCxPQUFPO0FBQ1RDLHFCQUFPLEtBQUtBLEtBREg7QUFFVGtDLG9CQUFNLEtBQUs3QixRQUZGO0FBR1Q4QixxQkFBTyxLQUFLN0IsU0FISDtBQUlUOEIsc0JBQVEsS0FBS2hDLFVBSko7QUFLVFksc0JBQVEsS0FBS0wsT0FMSjtBQU1UMEIsd0JBQVUsS0FBSzlCLFFBTk47QUFPVCtCLHlCQUFXLEtBQUs3QjtBQVBQLGFBQVg7QUFTQSxpQkFBS3NCLE9BQUwsQ0FBYVEsV0FBYixDQUF5QjNDLFdBQXpCLENBQXFDRyxJQUFyQyxFQUEyQ3lDLElBQTNDLENBQWdELFVBQUNDLEdBQUQsRUFBUztBQUN2RGYsc0JBQVFDLEdBQVIsQ0FBWWMsR0FBWjtBQUNBLGtCQUFJQSxJQUFJMUMsSUFBSixDQUFTMkMsS0FBVCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QiwrQkFBS0MsWUFBTDtBQUNELGVBRkQsTUFFTztBQUNMLG9CQUFJLE9BQUtaLE9BQUwsQ0FBYWEsU0FBakIsRUFBNEI7QUFDMUIseUJBQUs1QyxLQUFMLEdBQWEsT0FBSytCLE9BQUwsQ0FBYUMsUUFBYixDQUFzQlMsSUFBSTFDLElBQUosQ0FBUzJDLEtBQS9CLENBQWI7QUFDRDtBQUNGO0FBQ0YsYUFURDtBQVVELFdBcEJELE1Bb0JPO0FBQ0wsMkJBQUtHLFNBQUwsQ0FBZTtBQUNiQyxxQkFBTyxXQURNO0FBRWJDLG9CQUFNO0FBRk8sYUFBZjtBQUlEO0FBQ0YsU0EzQkQsTUEyQk87QUFDTCx5QkFBS0YsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLFdBRE07QUFFYkMsa0JBQU07QUFGTyxXQUFmO0FBSUQ7QUFDRjtBQXhGTyxLOzs7OztrQ0EwRks7QUFBQTs7QUFDYnJCLGNBQVFDLEdBQVIsQ0FBWSxLQUFLbkIsUUFBakI7QUFDQSxXQUFLUCxVQUFMLENBQWdCLENBQWhCLElBQXFCLEVBQXJCO0FBQ0EsV0FBS0UsV0FBTCxDQUFpQixDQUFqQixJQUFzQixFQUF0QjtBQUNBLFdBQUs2QyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLFVBQUNQLEdBQUQsRUFBUztBQUMzQixZQUFJMUMsT0FBTzBDLElBQUkxQyxJQUFKLENBQVNBLElBQXBCO0FBQ0FBLGFBQUtrRCxPQUFMLENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JCLGlCQUFLakQsVUFBTCxDQUFnQixDQUFoQixFQUFtQmtELElBQW5CLENBQXdCRCxLQUFLRSxTQUE3QjtBQUNBLGlCQUFLakQsV0FBTCxDQUFpQixDQUFqQixFQUFvQmdELElBQXBCLENBQXlCRCxLQUFLRyxPQUE5QjtBQUNELFNBSEQ7QUFJQSxZQUFJQyxRQUFRLE9BQUtuRCxXQUFMLENBQWlCLENBQWpCLEVBQW9Cb0QsT0FBcEIsQ0FBNEJDLFNBQVMsT0FBS2hELFFBQUwsQ0FBYyxDQUFkLENBQVQsQ0FBNUIsQ0FBWjtBQUNBLGVBQUtOLFVBQUwsR0FBa0IsQ0FBQ29ELEtBQUQsRUFBUSxDQUFSLEVBQVcsQ0FBWCxDQUFsQjtBQUNBLGVBQUs5QixPQUFMLENBQWEsT0FBS2hCLFFBQUwsQ0FBYyxDQUFkLENBQWIsRUFBK0IsWUFBTTtBQUNuQyxpQkFBS04sVUFBTCxDQUFnQixDQUFoQixJQUFxQixPQUFLQyxXQUFMLENBQWlCLENBQWpCLEVBQW9Cb0QsT0FBcEIsQ0FBNEJDLFNBQVMsT0FBS2hELFFBQUwsQ0FBYyxDQUFkLENBQVQsQ0FBNUIsQ0FBckI7QUFDQSxpQkFBS2lCLE9BQUwsQ0FBYSxPQUFLakIsUUFBTCxDQUFjLENBQWQsQ0FBYixFQUErQixZQUFNO0FBQ25DLG1CQUFLTixVQUFMLENBQWdCLENBQWhCLElBQXFCLE9BQUtDLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JvRCxPQUFwQixDQUE0QkMsU0FBUyxPQUFLaEQsUUFBTCxDQUFjLENBQWQsQ0FBVCxDQUE1QixDQUFyQjtBQUNBLG1CQUFLSixVQUFMLEdBQWtCLE9BQUtJLFFBQUwsQ0FBYyxDQUFkLENBQWxCO0FBQ0QsV0FIRDtBQUlELFNBTkQ7QUFPRCxPQWZEO0FBZ0JEOzs7Z0NBQ1lDLEUsRUFBSWdELEUsRUFBSTtBQUFBOztBQUNuQixVQUFJMUQsT0FBTztBQUNUMkQsa0JBQVVqRDtBQURELE9BQVg7QUFHQSxXQUFLc0IsT0FBTCxDQUFhUSxXQUFiLENBQXlCb0IsVUFBekIsQ0FBb0M1RCxJQUFwQyxFQUEwQ3lDLElBQTFDLENBQStDLFVBQUNDLEdBQUQsRUFBUztBQUN0RGYsZ0JBQVFDLEdBQVIsQ0FBWWMsR0FBWjtBQUNBLFlBQUlBLElBQUkxQyxJQUFKLENBQVMyQyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCZSxnQkFBTUEsR0FBR2hCLEdBQUgsQ0FBTjtBQUNEO0FBQ0QsZUFBS21CLE1BQUw7QUFDRCxPQU5EO0FBT0Q7Ozs0QkFDUW5ELEUsRUFBSWdELEUsRUFBSTtBQUFBOztBQUNmLFdBQUt4RCxVQUFMLENBQWdCLENBQWhCLElBQXFCLEVBQXJCO0FBQ0EsV0FBS0UsV0FBTCxDQUFpQixDQUFqQixJQUFzQixFQUF0QjtBQUNBLFdBQUs2QyxXQUFMLENBQWlCdkMsRUFBakIsRUFBcUIsVUFBQ2dDLEdBQUQsRUFBUztBQUM1QixZQUFJMUMsT0FBTzBDLElBQUkxQyxJQUFKLENBQVNBLElBQXBCO0FBQ0FBLGFBQUtrRCxPQUFMLENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JCLGlCQUFLakQsVUFBTCxDQUFnQixDQUFoQixFQUFtQmtELElBQW5CLENBQXdCRCxLQUFLRSxTQUE3QjtBQUNBLGlCQUFLakQsV0FBTCxDQUFpQixDQUFqQixFQUFvQmdELElBQXBCLENBQXlCRCxLQUFLRyxPQUE5QjtBQUNELFNBSEQ7QUFJQSxlQUFLbkQsVUFBTCxDQUFnQixDQUFoQixJQUFxQixDQUFyQjtBQUNBdUQsY0FBTUEsSUFBTjtBQUNELE9BUkQ7QUFTRDs7OzRCQUNRaEQsRSxFQUFJZ0QsRSxFQUFJO0FBQUE7O0FBQ2YsV0FBS3hELFVBQUwsQ0FBZ0IsQ0FBaEIsSUFBcUIsRUFBckI7QUFDQSxXQUFLRSxXQUFMLENBQWlCLENBQWpCLElBQXNCLEVBQXRCO0FBQ0EsV0FBSzZDLFdBQUwsQ0FBaUJ2QyxFQUFqQixFQUFxQixVQUFDZ0MsR0FBRCxFQUFTO0FBQzVCLFlBQUkxQyxPQUFPMEMsSUFBSTFDLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsYUFBS2tELE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsaUJBQUtqRCxVQUFMLENBQWdCLENBQWhCLEVBQW1Ca0QsSUFBbkIsQ0FBd0JELEtBQUtFLFNBQTdCO0FBQ0EsaUJBQUtqRCxXQUFMLENBQWlCLENBQWpCLEVBQW9CZ0QsSUFBcEIsQ0FBeUJELEtBQUtHLE9BQTlCO0FBQ0QsU0FIRDtBQUlBLGVBQUtuRCxVQUFMLENBQWdCLENBQWhCLElBQXFCLENBQXJCO0FBQ0EsZUFBS0UsVUFBTCxHQUFrQixPQUFLRCxXQUFMLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLENBQWxCO0FBQ0FzRCxjQUFNQSxJQUFOO0FBQ0QsT0FURDtBQVVEOzs7MkJBQ09JLEssRUFBTztBQUNiLFVBQUlBLEtBQUosRUFBVztBQUNULFlBQUlDLFVBQVVDLEtBQUtDLEtBQUwsQ0FBV0gsTUFBTTdDLE1BQWpCLENBQWQ7QUFDQSxhQUFLWCxRQUFMLEdBQWdCeUQsUUFBUTVCLElBQXhCO0FBQ0EsYUFBSzVCLFNBQUwsR0FBaUJ3RCxRQUFRM0IsS0FBekI7QUFDQSxhQUFLeEIsT0FBTCxHQUFlbUQsUUFBUTlDLE1BQXZCO0FBQ0EsYUFBS1QsUUFBTCxHQUFnQnVELFFBQVF6QixRQUF4QjtBQUNBLGFBQUs3QixRQUFMLEdBQWdCc0QsUUFBUUcsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUIsR0FBekIsQ0FBaEI7QUFDQSxhQUFLekQsRUFBTCxHQUFVcUQsUUFBUXJELEVBQWxCO0FBQ0Q7QUFDRCxXQUFLb0IsV0FBTDtBQUNBLFdBQUsrQixNQUFMO0FBQ0Q7Ozs7RUE3THNDLGVBQUtPLEk7O2tCQUF6QnZFLFciLCJmaWxlIjoiZWRpdEFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgbXVsdGlBcnJheTogW10sXG4gICAgICBtdWx0aUluZGV4OiBbMCwgMCwgMF0sXG4gICAgICBtdWx0aUFyZWFJZDogW10sXG4gICAgICBtdWx0aVZhbHVlOiAnJyxcbiAgICAgIHVzZXJOYW1lOiAnJyxcbiAgICAgIHVzZXJQaG9uZTogJycsXG4gICAgICBwb3N0Y29kZTogJycsXG4gICAgICBmdWxsYXJlYTogJycsXG4gICAgICBpZDogJycsXG4gICAgICBteXJlZzogL15bMV1bMyw0LDUsNyw4XVswLTldezl9JC8sXG4gICAgICB1c2VyQWRkOiAnJ1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIC8vIG11bHRpVmFsdWUgKCkge1xuICAgICAgLy8gICB2YXIgdGVtcEFyciA9IFtdXG4gICAgICAvLyAgIHRoaXMubXVsdGlBcmVhSWQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIC8vICAgICB0ZW1wQXJyLnB1c2goaXRlbVswXSlcbiAgICAgIC8vICAgfSlcbiAgICAgIC8vICAgcmV0dXJuIHRlbXBBcnJcbiAgICAgIC8vIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hbWVUYXAgKGUpIHtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJOYW1lXG4gICAgICB9LFxuICAgICAgcGhvbmVUYXAgKGUpIHtcbiAgICAgICAgdGhpcy51c2VyUGhvbmUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyUGhvbmVcbiAgICAgIH0sXG4gICAgICBwb3N0VGFwIChlKSB7XG4gICAgICAgIHRoaXMucG9zdGNvZGUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Y29kZVxuICAgICAgfSxcbiAgICAgIHVzZXJBZGRUYXAgKGUpIHtcbiAgICAgICAgdGhpcy51c2VyQWRkID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICB0b3BBcmVhIChlKSB7XG4gICAgICAgIHRoaXMubXVsdGlJbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIC8vIHZhciB0ZW1wID0gW11cbiAgICAgICAgLy8gdGVtcCA9IHRoaXMubXVsdGlWYWx1ZS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIC8vICAgcmV0dXJuIHRoaXMubXVsdGlBcmVhSWRbaW5kZXhdW3RoaXMubXVsdGlJbmRleFtpbmRleF1dXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIHRoaXMubXVsdGlWYWx1ZSA9IHRlbXBcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tdWx0aVZhbHVlKVxuICAgICAgfSxcbiAgICAgIGNoaWxkQXJlYSAoZSkge1xuICAgICAgICB0aGlzLm11bHRpSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHN3aXRjaCAoZS5kZXRhaWwuY29sdW1uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgLy8g6YCJ5oup55yBXG4gICAgICAgICAgICAvLyB0ZW1wWzBdIOS9nOS4unRvcCBhcmVhSWQg5Y+R6YCB6K+35rGC6I635Y+W5biCXG4gICAgICAgICAgICAvLyB0aGlzLmdldENpdHkoKVxuICAgICAgICAgICAgdGhpcy5nZXRDaXR5KHRoaXMubXVsdGlBcmVhSWRbMF1bZS5kZXRhaWwudmFsdWVdLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLm11bHRpQXJlYUlkWzFdWzBdKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgLy8g6YCJ5oup5biCXG4gICAgICAgICAgICAvLyB0ZW1wWzFdIOS9nOS4umFyZWFJZCDlj5HpgIHor7fmsYLojrflj5bljLpcbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0QXJlYSgpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm11bHRpQXJlYUlkWzFdW2UuZGV0YWlsLnZhbHVlXSlcbiAgICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLm11bHRpQXJlYUlkWzFdW2UuZGV0YWlsLnZhbHVlXSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgdGhpcy5tdWx0aUluZGV4WzJdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIHRoaXMubXVsdGlWYWx1ZSA9IHRoaXMubXVsdGlBcmVhSWRbMl1bZS5kZXRhaWwudmFsdWVdXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FuY2VsICgpIHtcbiAgICAgICAgdGhpcy5pbml0VG9wQXJlYSgpXG4gICAgICB9LFxuICAgICAgY29uZmlybSAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXVsdGlWYWx1ZSlcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIGlmICh0aGlzLnVzZXJOYW1lICYmIHRoaXMudXNlclBob25lICYmIHRoaXMudXNlckFkZCkge1xuICAgICAgICAgIGlmICh0aGlzLm15cmVnLnRlc3QodGhpcy51c2VyUGhvbmUpKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIG5hbWU6IHRoaXMudXNlck5hbWUsXG4gICAgICAgICAgICAgIHBob25lOiB0aGlzLnVzZXJQaG9uZSxcbiAgICAgICAgICAgICAgYXJlYUlkOiB0aGlzLm11bHRpVmFsdWUsXG4gICAgICAgICAgICAgIGRldGFpbDogdGhpcy51c2VyQWRkLFxuICAgICAgICAgICAgICBwb3N0Q29kZTogdGhpcy5wb3N0Y29kZSxcbiAgICAgICAgICAgICAgYWRkcmVzc0lkOiB0aGlzLmlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRWRpdEFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnlrozmlbTmlLbotKfkv6Hmga8nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VG9wQXJlYSAoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmZ1bGxhcmVhKVxuICAgICAgdGhpcy5tdWx0aUFycmF5WzBdID0gW11cbiAgICAgIHRoaXMubXVsdGlBcmVhSWRbMF0gPSBbXVxuICAgICAgdGhpcy5nZXRBcmVhRGF0YSgwLCAocmVzKSA9PiB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLm11bHRpQXJyYXlbMF0ucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLm11bHRpQXJlYUlkWzBdLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICB9KVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLm11bHRpQXJlYUlkWzBdLmluZGV4T2YocGFyc2VJbnQodGhpcy5mdWxsYXJlYVswXSkpXG4gICAgICAgIHRoaXMubXVsdGlJbmRleCA9IFtpbmRleCwgMCwgMF1cbiAgICAgICAgdGhpcy5nZXRDaXR5KHRoaXMuZnVsbGFyZWFbMF0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLm11bHRpSW5kZXhbMV0gPSB0aGlzLm11bHRpQXJlYUlkWzFdLmluZGV4T2YocGFyc2VJbnQodGhpcy5mdWxsYXJlYVsxXSkpXG4gICAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMuZnVsbGFyZWFbMV0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlJbmRleFsyXSA9IHRoaXMubXVsdGlBcmVhSWRbMl0uaW5kZXhPZihwYXJzZUludCh0aGlzLmZ1bGxhcmVhWzJdKSlcbiAgICAgICAgICAgIHRoaXMubXVsdGlWYWx1ZSA9IHRoaXMuZnVsbGFyZWFbMl1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0QXJlYURhdGEgKGlkLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhcmVudElkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFRvcEFyZWEoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IocmVzKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENpdHkgKGlkLCBjYikge1xuICAgICAgdGhpcy5tdWx0aUFycmF5WzFdID0gW11cbiAgICAgIHRoaXMubXVsdGlBcmVhSWRbMV0gPSBbXVxuICAgICAgdGhpcy5nZXRBcmVhRGF0YShpZCwgKHJlcykgPT4ge1xuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5tdWx0aUFycmF5WzFdLnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgICAgICAgdGhpcy5tdWx0aUFyZWFJZFsxXS5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4WzFdID0gMFxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRBcmVhIChpZCwgY2IpIHtcbiAgICAgIHRoaXMubXVsdGlBcnJheVsyXSA9IFtdXG4gICAgICB0aGlzLm11bHRpQXJlYUlkWzJdID0gW11cbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoaWQsIChyZXMpID0+IHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMubXVsdGlBcnJheVsyXS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgICAgICAgIHRoaXMubXVsdGlBcmVhSWRbMl0ucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubXVsdGlJbmRleFsyXSA9IDBcbiAgICAgICAgdGhpcy5tdWx0aVZhbHVlID0gdGhpcy5tdWx0aUFyZWFJZFsyXVswXVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0pIHtcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBKU09OLnBhcnNlKHBhcmFtLmRldGFpbClcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IGFkZHJlc3MubmFtZVxuICAgICAgICB0aGlzLnVzZXJQaG9uZSA9IGFkZHJlc3MucGhvbmVcbiAgICAgICAgdGhpcy51c2VyQWRkID0gYWRkcmVzcy5kZXRhaWxcbiAgICAgICAgdGhpcy5wb3N0Y29kZSA9IGFkZHJlc3MucG9zdENvZGVcbiAgICAgICAgdGhpcy5mdWxsYXJlYSA9IGFkZHJlc3MuYXJlYUZ1bGxJZC5zcGxpdCgnLCcpXG4gICAgICAgIHRoaXMuaWQgPSBhZGRyZXNzLmlkXG4gICAgICB9XG4gICAgICB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==