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
      var _this4 = this;

      this.token = this.$parent.getToken();
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
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          _this.dataLength += data.spus.length;
          if (data.totalCount <= _this.pageSize) {
            _this.isDown = true;
          } else {
            _this.isDown = false;
          }
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
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initCollect();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isLoading = false;
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'CancelMark',
    value: function CancelMark(markId, cb) {
      var _this5 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        markId: markId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        if (res.data.error === 0) {
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
          }
        }
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
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.getTokenTime = 0;
      this.initCollect();
    }
  }]);

  return Collect;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Collect , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJpc0xvYWRpbmciLCJtZXRob2RzIiwiZWRpdEFsbCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJjaGVja2VkIiwiaW5kZXgiLCJtYXJrSWQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIkNhbmNlbE1hcmsiLCJpbml0Q29sbGVjdCIsImdvRGV0YWlsIiwiaWQiLCJ0eXBlIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwibWFya1R5cGUiLCJIdHRwUmVxdWVzdCIsIkdldE1hcmtTcHUiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJlcnJvciIsInNwdXMiLCJ0b3RhbENvdW50IiwiZm9yRWFjaCIsIml0ZW0iLCJnb29kIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJpc0FsbG93U2FsZSIsIm5vU2FsZXMiLCJwdXNoIiwibWlzc1Rva2VuIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsImNiIiwiQ2FuY2VsTWFya0h0dHAiLCJnZXRUb2tlblRpbWUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7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Q2dCO0FBQ2Y7QUFDQSxVQUFJLEtBQUt4RCxPQUFMLEdBQWUsS0FBS0MsWUFBeEIsRUFBc0M7QUFDcEM7QUFDQSxhQUFLRCxPQUFMO0FBQ0EsYUFBS3FCLFdBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUsxQixXQUFMLENBQWlCQyxNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxlQUFLTCxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0Y7QUFDRjs7OzZCQUNTO0FBQ1IsV0FBS2lFLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0ssWUFBTCxHQUFvQixDQUFwQjtBQUNBLFdBQUt4QyxXQUFMO0FBQ0Q7Ozs7RUFoS2tDLGVBQUt5QyxJOztrQkFBckIvRSxPIiwiZmlsZSI6ImNvbGxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOaUtuiXjydcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvbGxlY3RHb29kXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiY29sbGVjdExpc3RcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImlzRG93blwiOnt9LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiNFwifX07XHJcbiRldmVudHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb2xsZWN0R29vZDogR29vZHMsXG4gICAgICBpc0Rvd246IFJlYWNoZG93bixcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGVjdExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGNvbGxlY3RMaXN0OiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBjaGVja1Jlc3VsdDogJycsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgZGF0YUxlbmd0aDogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFsbCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNoZWNrZWQgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY2hlY2tSZXN1bHQgPSB0aGlzLmNvbGxlY3RMaXN0W2luZGV4XS5tYXJrSWRcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI5pS26JePJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5DYW5jZWxNYXJrKHRoaXMuY2hlY2tSZXN1bHQsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTGVuZ3RoID0gMFxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdExpc3QgPSBbXVxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdENvbGxlY3QoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQsIHR5cGUpIHtcbiAgICAgICAgY29uc29sZS5sb2codHlwZSlcbiAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENvbGxlY3QgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy5pc0VkaXQgPSBmYWxzZVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1NwdShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBfdGhpcy5kYXRhTGVuZ3RoICs9IGRhdGEuc3B1cy5sZW5ndGhcbiAgICAgICAgICBpZiAoZGF0YS50b3RhbENvdW50IDw9IF90aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuc3B1cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgZ29vZC5tYXJrSWQgPSBpdGVtLm1hcmtJZFxuICAgICAgICAgICAgaWYgKCFpdGVtLmlzQWxsb3dTYWxlKSB7XG4gICAgICAgICAgICAgIGdvb2Qubm9TYWxlcyA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdvb2Qubm9TYWxlcyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0TGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdENvbGxlY3QoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBDYW5jZWxNYXJrIChtYXJrSWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IG1hcmtJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5jb2xsZWN0TGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICB9XG4gIH1cbiJdfQ==