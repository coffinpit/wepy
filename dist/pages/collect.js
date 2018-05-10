'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

var _reachdown = require('./../components/reachdown.js');

var _reachdown2 = _interopRequireDefault(_reachdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collect = function (_wepy$page) {
  _inherits(Collect, _wepy$page);

  function Collect() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Collect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Collect.__proto__ || Object.getPrototypeOf(Collect)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '我的收藏'
    }, _this2.$repeat = {}, _this2.$props = { "collectGood": { "xmlns:v-bind": "", "v-bind:goodsItem.sync": "collectList", "xmlns:v-on": "" }, "isDown": {}, "defect": {} }, _this2.$events = { "collectGood": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      collectGood: _goods2.default,
      isDown: _reachdown2.default,
      defect: _defect2.default
    }, _this2.computed = {
      isNull: function isNull() {
        if (this.collectList.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }, _this2.data = {
      token: '',
      pageSize: 5,
      pageNum: 1,
      totalPageNum: '',
      collectList: [],
      isEdit: false,
      checkResult: '',
      isDown: false,
      dataLength: 0
    }, _this2.methods = {
      editAll: function editAll() {
        this.isEdit = !this.isEdit;
      },
      checked: function checked(index) {
        var _this3 = this;

        this.checkResult = this.collectList[index].markId;
        _wepy2.default.showModal({
          title: '提示',
          content: '确认取消收藏',
          success: function success(res) {
            if (res.confirm) {
              _this3.CancelMark(_this3.checkResult, function () {
                _this3.pageNum = 1;
                _this3.dataLength = 0;
                _this3.collectList = [];
                _this3.initCollect();
              });
            }
          }
        });
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Collect, [{
    key: 'initCollect',
    value: function initCollect() {
      this.$parent.showLoading();
      var _this = this;
      this.isEdit = false;
      this.isDown = false;
      var data = {
        token: this.token,
        markType: 1,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$parent.HttpRequest.GetMarkSpu(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          _this.dataLength += data.spus.length;
          if (data.totalCount <= _this.pageSize) {
            _this.isDown = true;
          } else {
            _this.isDown = false;
          }
          console.log(_this.isDown);
          data.spus.forEach(function (item) {
            var good = {};
            good.path = item.cover;
            good.title = item.title;
            good.price = item.memberPrice;
            good.oldprice = item.price;
            good.reduction = item.reduction;
            good.id = item.sourceId;
            good.descript = item.desc;
            good.markId = item.markId;
            _this.collectList.push(good);
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
    key: 'CancelMark',
    value: function CancelMark(markId, cb) {
      var _this = this;
      var data = {
        markId: markId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        console.log(res);
        cb && cb();
        _this.$apply();
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.initCollect();
      } else {
        if (this.collectList.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('collect');
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initCollect();
    }
  }]);

  return Collect;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Collect , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJtZXRob2RzIiwiZWRpdEFsbCIsImNoZWNrZWQiLCJpbmRleCIsIm1hcmtJZCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiQ2FuY2VsTWFyayIsImluaXRDb2xsZWN0IiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIm1hcmtUeXBlIiwiSHR0cFJlcXVlc3QiLCJHZXRNYXJrU3B1IiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInNob3dTdWNjZXNzIiwic3B1cyIsInRvdGFsQ291bnQiLCJmb3JFYWNoIiwiaXRlbSIsImdvb2QiLCJwYXRoIiwiY292ZXIiLCJwcmljZSIsIm1lbWJlclByaWNlIiwib2xkcHJpY2UiLCJyZWR1Y3Rpb24iLCJzb3VyY2VJZCIsImRlc2NyaXB0IiwiZGVzYyIsInB1c2giLCJzaG93RmFpbCIsIiRhcHBseSIsImNhdGNoIiwiY2IiLCJDYW5jZWxNYXJrSHR0cCIsImdldFRva2VuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpC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QUFDRCxPQUpEO0FBS0Q7OztvQ0FDZ0I7QUFDZjtBQUNBLFVBQUksS0FBS2pELE9BQUwsR0FBZSxLQUFLQyxZQUF4QixFQUFzQztBQUNwQztBQUNBLGFBQUtELE9BQUw7QUFDQSxhQUFLaUIsV0FBTDtBQUNELE9BSkQsTUFJTztBQUNMLFlBQUksS0FBS3RCLFdBQUwsQ0FBaUJDLE1BQWpCLEtBQTRCLENBQWhDLEVBQW1DO0FBQ2pDLGVBQUtMLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFDRjtBQUNGOzs7NkJBQ1M7QUFDUixXQUFLTyxLQUFMLEdBQWEsS0FBS3dCLE9BQUwsQ0FBYStCLFFBQWIsQ0FBc0IsU0FBdEIsQ0FBYjtBQUNBLFdBQUtKLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS2hDLFdBQUw7QUFDRDs7OztFQXJJa0MsZUFBS3FDLEk7O2tCQUFyQnZFLE8iLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5pS26JePJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiY29sbGVjdEdvb2RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmdvb2RzSXRlbS5zeW5jXCI6XCJjb2xsZWN0TGlzdFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiaXNEb3duXCI6e30sXCJkZWZlY3RcIjp7fX07XHJcbiRldmVudHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb2xsZWN0R29vZDogR29vZHMsXG4gICAgICBpc0Rvd246IFJlYWNoZG93bixcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGVjdExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGNvbGxlY3RMaXN0OiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBjaGVja1Jlc3VsdDogJycsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgZGF0YUxlbmd0aDogMFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFsbCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICB9LFxuICAgICAgY2hlY2tlZCAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jaGVja1Jlc3VsdCA9IHRoaXMuY29sbGVjdExpc3RbaW5kZXhdLm1hcmtJZFxuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTlj5bmtojmlLbol48nLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLkNhbmNlbE1hcmsodGhpcy5jaGVja1Jlc3VsdCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFMZW5ndGggPSAwXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0TGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q29sbGVjdCAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy5pc0VkaXQgPSBmYWxzZVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE1hcmtTcHUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBfdGhpcy5kYXRhTGVuZ3RoICs9IGRhdGEuc3B1cy5sZW5ndGhcbiAgICAgICAgICBpZiAoZGF0YS50b3RhbENvdW50IDw9IF90aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLmlzRG93bilcbiAgICAgICAgICBkYXRhLnNwdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIGdvb2QubWFya0lkID0gaXRlbS5tYXJrSWRcbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgQ2FuY2VsTWFyayAobWFya0lkLCBjYikge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogbWFya0lkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdjb2xsZWN0JylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdENvbGxlY3QoKVxuICAgIH1cbiAgfVxuIl19