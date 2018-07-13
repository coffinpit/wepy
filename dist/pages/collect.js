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
            _this.initCollect();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isLoading = false;
        // _this.$parent.showFail()
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
            // _this.token = this.$parent.getToken(res.data.error)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJpc0xvYWRpbmciLCJtZXRob2RzIiwiZWRpdEFsbCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJjaGVja2VkIiwiaW5kZXgiLCJtYXJrSWQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIkNhbmNlbE1hcmsiLCJpbml0UGFnZURhdGEiLCJnb0RldGFpbCIsImlkIiwidHlwZSIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwiJHBhcmVudCIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIm1hcmtUeXBlIiwiSHR0cFJlcXVlc3QiLCJHZXRNYXJrU3B1IiwidGhlbiIsImhpZGVMb2FkaW5nIiwiZXJyb3IiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsImRldGFpbCIsInZpY2VUaXRsZSIsInJlZHVjdGlvbiIsInNvdXJjZUlkIiwiZGVzY3JpcHQiLCJkZXNjIiwiaXNBbGxvd1NhbGUiLCJub1NhbGVzIiwicHVzaCIsIm1pc3NUb2tlbiIsImluaXRDb2xsZWN0IiwiJGFwcGx5IiwiY2F0Y2giLCJjYiIsIkNhbmNlbE1hcmtIdHRwIiwiZ2V0VG9rZW5UaW1lIiwicGFn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Q0wsWUFBSSxLQUFLL0QsV0FBTCxDQUFpQkMsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsZUFBS0wsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFDUztBQUNSLFdBQUtvRSxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtJLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxXQUFLMUMsWUFBTDtBQUNEOzs7O0VBbktrQyxlQUFLMkMsSTs7a0JBQXJCakYsTyIsImZpbGUiOiJjb2xsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmlLbol48nXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImNvbGxlY3RMaXN0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJpc0Rvd25cIjp7fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjRcIn19O1xyXG4kZXZlbnRzID0ge1wiY29sbGVjdEdvb2RcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY29sbGVjdEdvb2Q6IEdvb2RzLFxuICAgICAgaXNEb3duOiBSZWFjaGRvd24sXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBjb2xsZWN0TGlzdDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgY2hlY2tSZXN1bHQ6ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGRhdGFMZW5ndGg6IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRBbGwgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgfSxcbiAgICAgIGdvQ2F0ZWdvcnkgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjaGVja2VkIChpbmRleCkge1xuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0ID0gdGhpcy5jb2xsZWN0TGlzdFtpbmRleF0ubWFya0lkXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOaUtuiXjycsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyayh0aGlzLmNoZWNrUmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQsIHR5cGUpIHtcbiAgICAgICAgY29uc29sZS5sb2codHlwZSlcbiAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENvbGxlY3QgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdGhpcy5pc0VkaXQgPSBmYWxzZVxuICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1NwdShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBfdGhpcy5kYXRhTGVuZ3RoICs9IGRhdGEuc3B1cy5sZW5ndGhcbiAgICAgICAgICBpZiAoZGF0YS50b3RhbENvdW50IDw9IF90aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuc3B1cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLmRldGFpbCA9IGl0ZW0udmljZVRpdGxlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgZ29vZC5tYXJrSWQgPSBpdGVtLm1hcmtJZFxuICAgICAgICAgICAgaWYgKCFpdGVtLmlzQWxsb3dTYWxlKSB7XG4gICAgICAgICAgICAgIGdvb2Qubm9TYWxlcyA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdvb2Qubm9TYWxlcyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0TGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmluaXRDb2xsZWN0KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgaW5pdFBhZ2VEYXRhICgpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuZGF0YUxlbmd0aCA9IDBcbiAgICAgIHRoaXMuY29sbGVjdExpc3QgPSBbXVxuICAgICAgdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgfVxuICAgIENhbmNlbE1hcmsgKG1hcmtJZCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogbWFya0lkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAvLyBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgIHRoaXMuaW5pdFBhZ2VEYXRhKClcbiAgICB9XG4gIH1cbiJdfQ==