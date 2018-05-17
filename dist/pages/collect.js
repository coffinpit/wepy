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
    }, _this2.$repeat = {}, _this2.$props = { "collectGood": { "xmlns:v-bind": "", "v-bind:goodsItem.sync": "collectList", "xmlns:v-on": "" }, "isDown": {}, "defect": { "type": "4" } }, _this2.$events = { "collectGood": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
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
      dataLength: 0,
      isLoading: true
    }, _this2.methods = {
      editAll: function editAll() {
        this.isEdit = !this.isEdit;
      },
      goCategory: function goCategory() {
        _wepy2.default.switchTab({
          url: './category'
        });
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
      goDetail: function goDetail(id, type) {
        console.log(type);
        if (!type) {
          _wepy2.default.navigateTo({
            url: './detail?id=' + id
          });
        }
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
      this.isLoading = true;
      var data = {
        token: this.token,
        markType: 1,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$parent.HttpRequest.GetMarkSpu(data).then(function (res) {
        console.log(res);
        _this.isLoading = false;
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
            if (!item.isAllowSale) {
              good.noSales = true;
            } else {
              good.noSales = false;
            }
            _this.collectList.push(good);
          });
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.isLoading = false;
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
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJpc0xvYWRpbmciLCJtZXRob2RzIiwiZWRpdEFsbCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJjaGVja2VkIiwiaW5kZXgiLCJtYXJrSWQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIkNhbmNlbE1hcmsiLCJpbml0Q29sbGVjdCIsImdvRGV0YWlsIiwiaWQiLCJ0eXBlIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIm1hcmtUeXBlIiwiSHR0cFJlcXVlc3QiLCJHZXRNYXJrU3B1IiwidGhlbiIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsInNvdXJjZUlkIiwiZGVzY3JpcHQiLCJkZXNjIiwiaXNBbGxvd1NhbGUiLCJub1NhbGVzIiwicHVzaCIsInNob3dGYWlsIiwiJGFwcGx5IiwiY2F0Y2giLCJjYiIsIkNhbmNlbE1hcmtIdHRwIiwiZ2V0VG9rZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFD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QkQsU0E1QkQsTUE0Qk87QUFDTFgsZ0JBQU1GLE9BQU4sQ0FBYzBCLFFBQWQ7QUFDRDtBQUNEeEIsY0FBTXlCLE1BQU47QUFDRCxPQW5DRCxFQW1DR0MsS0FuQ0gsQ0FtQ1MsWUFBTTtBQUNiMUIsY0FBTXpCLFNBQU4sR0FBa0IsS0FBbEI7QUFDQXlCLGNBQU1GLE9BQU4sQ0FBYzBCLFFBQWQ7QUFDRCxPQXRDRDtBQXVDRDs7OytCQUNXekMsTSxFQUFRNEMsRSxFQUFJO0FBQ3RCLFVBQUkzQixRQUFRLElBQVo7QUFDQSxVQUFJakMsT0FBTztBQUNUZ0IsZ0JBQVFBLE1BREM7QUFFVGYsZUFBTyxLQUFLQTtBQUZILE9BQVg7QUFJQSxXQUFLOEIsT0FBTCxDQUFhSSxXQUFiLENBQXlCMEIsY0FBekIsQ0FBd0M3RCxJQUF4QyxFQUE4Q3FDLElBQTlDLENBQW1ELFVBQUNoQixHQUFELEVBQVM7QUFDMURPLGdCQUFRQyxHQUFSLENBQVlSLEdBQVo7QUFDQXVDLGNBQU1BLElBQU47QUFDQTNCLGNBQU15QixNQUFOO0FBQ0QsT0FKRDtBQUtEOzs7b0NBQ2dCO0FBQ2Y7QUFDQSxVQUFJLEtBQUt2RCxPQUFMLEdBQWUsS0FBS0MsWUFBeEIsRUFBc0M7QUFDcEM7QUFDQSxhQUFLRCxPQUFMO0FBQ0EsYUFBS3FCLFdBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUsxQixXQUFMLENBQWlCQyxNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxlQUFLTCxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0Y7QUFDRjs7OzZCQUNTO0FBQ1IsV0FBS08sS0FBTCxHQUFhLEtBQUs4QixPQUFMLENBQWErQixRQUFiLEVBQWI7QUFDQSxXQUFLSixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtsQyxXQUFMO0FBQ0Q7Ozs7RUF0SmtDLGVBQUt1QyxJOztrQkFBckI3RSxPIiwiZmlsZSI6ImNvbGxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOaUtuiXjydcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvbGxlY3RHb29kXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiY29sbGVjdExpc3RcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImlzRG93blwiOnt9LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiNFwifX07XHJcbiRldmVudHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb2xsZWN0R29vZDogR29vZHMsXG4gICAgICBpc0Rvd246IFJlYWNoZG93bixcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGVjdExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGNvbGxlY3RMaXN0OiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBjaGVja1Jlc3VsdDogJycsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgZGF0YUxlbmd0aDogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFsbCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNoZWNrZWQgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY2hlY2tSZXN1bHQgPSB0aGlzLmNvbGxlY3RMaXN0W2luZGV4XS5tYXJrSWRcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI5pS26JePJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5DYW5jZWxNYXJrKHRoaXMuY2hlY2tSZXN1bHQsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTGVuZ3RoID0gMFxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdExpc3QgPSBbXVxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdENvbGxlY3QoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQsIHR5cGUpIHtcbiAgICAgICAgY29uc29sZS5sb2codHlwZSlcbiAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENvbGxlY3QgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMuaXNFZGl0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE1hcmtTcHUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBfdGhpcy5kYXRhTGVuZ3RoICs9IGRhdGEuc3B1cy5sZW5ndGhcbiAgICAgICAgICBpZiAoZGF0YS50b3RhbENvdW50IDw9IF90aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzLmlzRG93bilcbiAgICAgICAgICBkYXRhLnNwdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIGdvb2QubWFya0lkID0gaXRlbS5tYXJrSWRcbiAgICAgICAgICAgIGlmICghaXRlbS5pc0FsbG93U2FsZSkge1xuICAgICAgICAgICAgICBnb29kLm5vU2FsZXMgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnb29kLm5vU2FsZXMgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdExpc3QucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBDYW5jZWxNYXJrIChtYXJrSWQsIGNiKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgbWFya0lkOiBtYXJrSWQsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsTWFya0h0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuaW5pdENvbGxlY3QoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGVjdExpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgfVxuICB9XG4iXX0=