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
                _this3.initPageData();
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
            good.detail = item.viceTitle;
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
    key: 'initPageData',
    value: function initPageData() {
      this.pageNum = 1;
      this.dataLength = 0;
      this.collectList = [];
      this.initCollect();
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
      this.initPageData();
    }
  }]);

  return Collect;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Collect , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJpc0xvYWRpbmciLCJtZXRob2RzIiwiZWRpdEFsbCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJjaGVja2VkIiwiaW5kZXgiLCJtYXJrSWQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIkNhbmNlbE1hcmsiLCJpbml0UGFnZURhdGEiLCJnb0RldGFpbCIsImlkIiwidHlwZSIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwiJHBhcmVudCIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIm1hcmtUeXBlIiwiSHR0cFJlcXVlc3QiLCJHZXRNYXJrU3B1IiwidGhlbiIsImhpZGVMb2FkaW5nIiwiZXJyb3IiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsImRldGFpbCIsInZpY2VUaXRsZSIsInJlZHVjdGlvbiIsInNvdXJjZUlkIiwiZGVzY3JpcHQiLCJkZXNjIiwiaXNBbGxvd1NhbGUiLCJub1NhbGVzIiwicHVzaCIsIm1pc3NUb2tlbiIsImluaXRDb2xsZWN0IiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsImNiIiwiQ2FuY2VsTWFya0h0dHAiLCJnZXRUb2tl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LE9BQUwsQ0FBYUMsUUFBYixDQUFzQlgsSUFBSXJCLElBQUosQ0FBU3dDLEtBQS9CLENBQWQ7QUFDRDtBQUNGO0FBQ0ROLGNBQU00QixNQUFOO0FBQ0QsT0FURDtBQVVEOzs7b0NBQ2dCO0FBQ2Y7QUFDQSxVQUFJLEtBQUszRCxPQUFMLEdBQWUsS0FBS0MsWUFBeEIsRUFBc0M7QUFDcEM7QUFDQSxhQUFLRCxPQUFMO0FBQ0EsYUFBSzBELFdBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUsvRCxXQUFMLENBQWlCQyxNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxlQUFLTCxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0Y7QUFDRjs7OzZCQUNTO0FBQ1IsV0FBS29FLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0ssWUFBTCxHQUFvQixDQUFwQjtBQUNBLFdBQUszQyxZQUFMO0FBQ0Q7Ozs7RUFwS2tDLGVBQUs0QyxJOztrQkFBckJsRixPIiwiZmlsZSI6ImNvbGxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG4gIGltcG9ydCBSZWFjaGRvd24gZnJvbSAnLi4vY29tcG9uZW50cy9yZWFjaGRvd24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOaUtuiXjydcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvbGxlY3RHb29kXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiY29sbGVjdExpc3RcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImlzRG93blwiOnt9LFwiZGVmZWN0XCI6e1widHlwZVwiOlwiNFwifX07XHJcbiRldmVudHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb2xsZWN0R29vZDogR29vZHMsXG4gICAgICBpc0Rvd246IFJlYWNoZG93bixcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgaXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGVjdExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIGNvbGxlY3RMaXN0OiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBjaGVja1Jlc3VsdDogJycsXG4gICAgICBpc0Rvd246IGZhbHNlLFxuICAgICAgZGF0YUxlbmd0aDogMCxcbiAgICAgIGlzTG9hZGluZzogdHJ1ZVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFsbCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICB9LFxuICAgICAgZ29DYXRlZ29yeSAoKSB7XG4gICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcbiAgICAgICAgICB1cmw6ICcuL2NhdGVnb3J5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNoZWNrZWQgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY2hlY2tSZXN1bHQgPSB0aGlzLmNvbGxlY3RMaXN0W2luZGV4XS5tYXJrSWRcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu6K6k5Y+W5raI5pS26JePJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5DYW5jZWxNYXJrKHRoaXMuY2hlY2tSZXN1bHQsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCwgdHlwZSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0eXBlKVxuICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q29sbGVjdCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLmlzRWRpdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrU3B1KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSBkYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIF90aGlzLmRhdGFMZW5ndGggKz0gZGF0YS5zcHVzLmxlbmd0aFxuICAgICAgICAgIGlmIChkYXRhLnRvdGFsQ291bnQgPD0gX3RoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5zcHVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QuZGV0YWlsID0gaXRlbS52aWNlVGl0bGVcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBnb29kLm1hcmtJZCA9IGl0ZW0ubWFya0lkXG4gICAgICAgICAgICBpZiAoIWl0ZW0uaXNBbGxvd1NhbGUpIHtcbiAgICAgICAgICAgICAgZ29vZC5ub1NhbGVzID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZ29vZC5ub1NhbGVzID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNvbGxlY3RMaXN0LnB1c2goZ29vZClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGluaXRQYWdlRGF0YSAoKSB7XG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmRhdGFMZW5ndGggPSAwXG4gICAgICB0aGlzLmNvbGxlY3RMaXN0ID0gW11cbiAgICAgIHRoaXMuaW5pdENvbGxlY3QoKVxuICAgIH1cbiAgICBDYW5jZWxNYXJrIChtYXJrSWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IG1hcmtJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5jb2xsZWN0TGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5nZXRUb2tlblRpbWUgPSAwXG4gICAgICB0aGlzLmluaXRQYWdlRGF0YSgpXG4gICAgfVxuICB9XG4iXX0=