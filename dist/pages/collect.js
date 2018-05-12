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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJpc0xvYWRpbmciLCJtZXRob2RzIiwiZWRpdEFsbCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJjaGVja2VkIiwiaW5kZXgiLCJtYXJrSWQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIkNhbmNlbE1hcmsiLCJpbml0Q29sbGVjdCIsImdvRGV0YWlsIiwiaWQiLCJuYXZpZ2F0ZVRvIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiX3RoaXMiLCJtYXJrVHlwZSIsIkh0dHBSZXF1ZXN0IiwiR2V0TWFya1NwdSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzaG93U3VjY2VzcyIsInNwdXMiLCJ0b3RhbENvdW50IiwiZm9yRWFjaCIsIml0ZW0iLCJnb29kIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsImNiIiwiQ2FuY2VsTWFya0h0dHAiLCJnZXRUb2tlbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7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QVEsSUFBWjtBQUNBLFVBQUk5QixPQUFPO0FBQ1RnQixnQkFBUUEsTUFEQztBQUVUZixlQUFPLEtBQUtBO0FBRkgsT0FBWDtBQUlBLFdBQUsyQixPQUFMLENBQWFJLFdBQWIsQ0FBeUIwQixjQUF6QixDQUF3QzFELElBQXhDLEVBQThDa0MsSUFBOUMsQ0FBbUQsVUFBQ2IsR0FBRCxFQUFTO0FBQzFEYyxnQkFBUUMsR0FBUixDQUFZZixHQUFaO0FBQ0FvQyxjQUFNQSxJQUFOO0FBQ0EzQixjQUFNeUIsTUFBTjtBQUNELE9BSkQ7QUFLRDs7O29DQUNnQjtBQUNmO0FBQ0EsVUFBSSxLQUFLcEQsT0FBTCxHQUFlLEtBQUtDLFlBQXhCLEVBQXNDO0FBQ3BDO0FBQ0EsYUFBS0QsT0FBTDtBQUNBLGFBQUtxQixXQUFMO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSSxLQUFLMUIsV0FBTCxDQUFpQkMsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsZUFBS0wsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFDUztBQUNSLFdBQUtPLEtBQUwsR0FBYSxLQUFLMkIsT0FBTCxDQUFhK0IsUUFBYixFQUFiO0FBQ0EsV0FBS0osTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLL0IsV0FBTDtBQUNEOzs7O0VBOUlrQyxlQUFLb0MsSTs7a0JBQXJCMUUsTyIsImZpbGUiOiJjb2xsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmlLbol48nXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImNvbGxlY3RMaXN0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJpc0Rvd25cIjp7fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjRcIn19O1xyXG4kZXZlbnRzID0ge1wiY29sbGVjdEdvb2RcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY29sbGVjdEdvb2Q6IEdvb2RzLFxuICAgICAgaXNEb3duOiBSZWFjaGRvd24sXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBjb2xsZWN0TGlzdDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgY2hlY2tSZXN1bHQ6ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGRhdGFMZW5ndGg6IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRBbGwgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgfSxcbiAgICAgIGdvQ2F0ZWdvcnkgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjaGVja2VkIChpbmRleCkge1xuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0ID0gdGhpcy5jb2xsZWN0TGlzdFtpbmRleF0ubWFya0lkXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOaUtuiXjycsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyayh0aGlzLmNoZWNrUmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUxlbmd0aCA9IDBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RMaXN0ID0gW11cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDb2xsZWN0ICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLmlzRWRpdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrU3B1KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgX3RoaXMuZGF0YUxlbmd0aCArPSBkYXRhLnNwdXMubGVuZ3RoXG4gICAgICAgICAgaWYgKGRhdGEudG90YWxDb3VudCA8PSBfdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcy5pc0Rvd24pXG4gICAgICAgICAgZGF0YS5zcHVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBnb29kID0ge31cbiAgICAgICAgICAgIGdvb2QucGF0aCA9IGl0ZW0uY292ZXJcbiAgICAgICAgICAgIGdvb2QudGl0bGUgPSBpdGVtLnRpdGxlXG4gICAgICAgICAgICBnb29kLnByaWNlID0gaXRlbS5tZW1iZXJQcmljZVxuICAgICAgICAgICAgZ29vZC5vbGRwcmljZSA9IGl0ZW0ucHJpY2VcbiAgICAgICAgICAgIGdvb2QucmVkdWN0aW9uID0gaXRlbS5yZWR1Y3Rpb25cbiAgICAgICAgICAgIGdvb2QuaWQgPSBpdGVtLnNvdXJjZUlkXG4gICAgICAgICAgICBnb29kLmRlc2NyaXB0ID0gaXRlbS5kZXNjXG4gICAgICAgICAgICBnb29kLm1hcmtJZCA9IGl0ZW0ubWFya0lkXG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0TGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIENhbmNlbE1hcmsgKG1hcmtJZCwgY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IG1hcmtJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5jb2xsZWN0TGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICB9XG4gIH1cbiJdfQ==