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
        }
        _this.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJtZXRob2RzIiwiZWRpdEFsbCIsImNoZWNrZWQiLCJpbmRleCIsIm1hcmtJZCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiQ2FuY2VsTWFyayIsImluaXRDb2xsZWN0IiwiZ29EZXRhaWwiLCJpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIm1hcmtUeXBlIiwiSHR0cFJlcXVlc3QiLCJHZXRNYXJrU3B1IiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInNwdXMiLCJ0b3RhbENvdW50IiwiZm9yRWFjaCIsIml0ZW0iLCJnb29kIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJwdXNoIiwiJGFwcGx5IiwiY2IiLCJDYW5jZWxNYXJrSHR0cCIsImdldFRva2VuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEUsU0FDYkMsTSxHQUFTLEVB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RUFBbUM7QUFDakMsZUFBS0wsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFDUztBQUNSLFdBQUtPLEtBQUwsR0FBYSxLQUFLd0IsT0FBTCxDQUFhNEIsUUFBYixDQUFzQixTQUF0QixDQUFiO0FBQ0EsV0FBS0gsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLOUIsV0FBTDtBQUNEOzs7O0VBaElrQyxlQUFLa0MsSTs7a0JBQXJCcEUsTyIsImZpbGUiOiJjb2xsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmlLbol48nXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImNvbGxlY3RMaXN0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJpc0Rvd25cIjp7fSxcImRlZmVjdFwiOnt9fTtcclxuJGV2ZW50cyA9IHtcImNvbGxlY3RHb29kXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGNvbGxlY3RHb29kOiBHb29kcyxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duLFxuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5jb2xsZWN0TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgY29sbGVjdExpc3Q6IFtdLFxuICAgICAgaXNFZGl0OiBmYWxzZSxcbiAgICAgIGNoZWNrUmVzdWx0OiAnJyxcbiAgICAgIGlzRG93bjogZmFsc2UsXG4gICAgICBkYXRhTGVuZ3RoOiAwXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0QWxsICgpIHtcbiAgICAgICAgdGhpcy5pc0VkaXQgPSAhdGhpcy5pc0VkaXRcbiAgICAgIH0sXG4gICAgICBjaGVja2VkIChpbmRleCkge1xuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0ID0gdGhpcy5jb2xsZWN0TGlzdFtpbmRleF0ubWFya0lkXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOaUtuiXjycsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyayh0aGlzLmNoZWNrUmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUxlbmd0aCA9IDBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RMaXN0ID0gW11cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDb2xsZWN0ICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLmlzRWRpdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG1hcmtUeXBlOiAxLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0TWFya1NwdShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSBkYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIF90aGlzLmRhdGFMZW5ndGggKz0gZGF0YS5zcHVzLmxlbmd0aFxuICAgICAgICAgIGlmIChkYXRhLnRvdGFsQ291bnQgPD0gX3RoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgIF90aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coX3RoaXMuaXNEb3duKVxuICAgICAgICAgIGRhdGEuc3B1cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgZ29vZC5tYXJrSWQgPSBpdGVtLm1hcmtJZFxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdExpc3QucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIENhbmNlbE1hcmsgKG1hcmtJZCwgY2IpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBtYXJrSWQ6IG1hcmtJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5DYW5jZWxNYXJrSHR0cChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5jb2xsZWN0TGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbignY29sbGVjdCcpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICB9XG4gIH1cbiJdfQ==