'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _searchbar = require('./../components/searchbar.js');

var _searchbar2 = _interopRequireDefault(_searchbar);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

var _reachdown = require('./../components/reachdown.js');

var _reachdown2 = _interopRequireDefault(_reachdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Category = function (_wepy$page) {
  _inherits(Category, _wepy$page);

  function Category() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Category);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Category.__proto__ || Object.getPrototypeOf(Category)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '商品分类'
    }, _this2.$repeat = {}, _this2.$props = { "Categoods": { "v-bind:goodsItem.sync": "goods", "xmlns:v-on": "" }, "searchbar": { "xmlns:v-bind": "", "v-bind:pagefrom.sync": "pageTile" }, "isDown": {} }, _this2.$events = { "Categoods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      Categoods: _goods2.default,
      defectImage: _defect2.default,
      searchbar: _searchbar2.default,
      isDown: _reachdown2.default
    }, _this2.data = {
      token: '',
      categoryImg: ['../image/categoryA.jpg', '../image/categoryB.jpg', '../image/categoryC.jpg', '../image/categoryD.jpg'],
      categoryTab: [],
      childCategory: [{
        name: '',
        id: ''
      }],
      goods: [],
      pageTile: 'category',
      currentTab: 0,
      currentItem: 0,
      isNull: false,
      showMore: '',
      pageSize: 5,
      pageNum: 1,
      sourceId: '',
      totalPageNum: '',
      isDown: false
    }, _this2.methods = {
      changeTab: function changeTab(index, id) {
        this.currentTab = index;
        this.currentItem = 0;
        this.sourceId = id;
        this.isNull = false;
        this.pageNum = 1;
        this.getSpu(this.sourceId);
      },
      reqCategory: function reqCategory(index, id) {
        this.currentItem = index;
        this.sourceId = id;
        this.isNull = false;
        this.pageNum = 1;
        this.getSpu(this.sourceId);
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Category, [{
    key: 'getShowMore',
    value: function getShowMore() {
      var _this3 = this;

      this.categoryTab.forEach(function (item, index) {
        if (item.category.length > 5) {
          _this3.showMore = index;
        }
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.getSpu(this.sourceId);
      } else {
        if (this.goods.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'getTopCate',
    value: function getTopCate() {
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetTopCategory(data).then(function (res) {
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.title = item.name;
            obj.id = item.id;
            obj.child = _this.getChildCate(item.id);
            _this.categoryTab.push(obj);
          });
          _this.sourceId = _this.categoryTab[0].id;
          _this.getSpu(_this.sourceId);
        }
        _this.$apply();
      });
      console.log(this.goods);
    }
  }, {
    key: 'getChildCate',
    value: function getChildCate(sourceId) {
      var _this = this;
      var data = {
        token: this.token,
        categoryId: sourceId,
        includSelf: 1
      };
      var child = [{
        name: '全部',
        id: sourceId
      }];
      this.$parent.HttpRequest.GetChildCategory(data).then(function (res) {
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.id = item.id;
            child.push(obj);
          });
        }
        _this.$apply();
      });
      return child;
    }
  }, {
    key: 'getSpu',
    value: function getSpu(sourceId, cb) {
      var _this4 = this;

      this.$parent.showLoading();
      this.isDown = false;
      var _this = this;
      var data = {
        categoryId: sourceId,
        token: this.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$parent.HttpRequest.GetSpuHttp(data).then(function (res) {
        console.log(res);
        if (_this.pageNum === 1) {
          _this.goods = [];
        }
        if (res.data.error === 0) {
          _this.totalPageNum = res.data.data.totalPageNum;
          var data = res.data.data.spus;
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
            if (data.length < _this4.pageSize) {
              _this.isDown = true;
            } else {
              _this.isDown = false;
            }
          }
          data.forEach(function (item) {
            var good = {};
            good.path = item.cover;
            good.title = item.title;
            good.price = item.memberPrice;
            good.oldprice = item.price;
            good.reduction = item.reduction;
            good.id = item.sourceId;
            good.descript = item.desc;
            _this.goods.push(good);
            cb && cb();
          });
        } else {
          _this.isNull = true;
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('category');
      this.getTopCate();
      this.getShowMore();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (this.$parent.pageRoot) {
        this.$parent.pageRoot = false;
      } else {
        this.currentTab = 0;
        this.currentItem = 0;
        if (this.categoryTab.length !== 0) {
          this.getSpu(this.categoryTab[0].id);
        }
      }
    }
  }]);

  return Category;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Category , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhdGVnb29kcyIsImRlZmVjdEltYWdlIiwic2VhcmNoYmFyIiwiaXNEb3duIiwiZGF0YSIsInRva2VuIiwiY2F0ZWdvcnlJbWciLCJjYXRlZ29yeVRhYiIsImNoaWxkQ2F0ZWdvcnkiLCJuYW1lIiwiaWQiLCJnb29kcyIsInBhZ2VUaWxlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJzb3VyY2VJZCIsInRvdGFsUGFnZU51bSIsIm1ldGhvZHMiLCJjaGFuZ2VUYWIiLCJpbmRleCIsImdldFNwdSIsInJlcUNhdGVnb3J5IiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJjYXRlZ29yeSIsImxlbmd0aCIsIl90aGlzIiwiJHBhcmVudCIsIkh0dHBSZXF1ZXN0IiwiR2V0VG9wQ2F0ZWdvcnkiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJvYmoiLCJ0aXRsZSIsImNoaWxkIiwiZ2V0Q2hpbGRDYXRlIiwicHVzaCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJjYXRlZ29yeUlkIiwiaW5jbHVkU2VsZiIsIkdldENoaWxkQ2F0ZWdvcnkiLCJjYiIsInNob3dMb2FkaW5nIiwiR2V0U3B1SHR0cCIsInNwdXMiLCJnb29kIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwiZGVzY3JpcHQiLCJkZXNjIiwiY2F0Y2giLCJnZXRUb2tlbiIsImdldFRvcENhdGUiLCJnZXRTaG93TW9yZSIsInBhZ2VSb290IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs2TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMseUJBQXdCLE9BQXpCLEVBQWlDLGNBQWEsRUFBOUMsRUFBYixFQUErRCxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQTNFLEVBQWlJLFVBQVMsRUFBMUksRSxTQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsaUJBQWdCLFVBQWpCLEVBQWIsRSxTQUNUQyxVLEdBQWE7QUFDUkMsZ0NBRFE7QUFFUkMsbUNBRlE7QUFHUkMsb0NBSFE7QUFJUkM7QUFKUSxLLFNBTVZDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsbUJBQWEsQ0FBQyx3QkFBRCxFQUEyQix3QkFBM0IsRUFBcUQsd0JBQXJELEVBQStFLHdCQUEvRSxDQUZSO0FBR0xDLG1CQUFhLEVBSFI7QUFJTEMscUJBQWUsQ0FBQztBQUNkQyxjQUFNLEVBRFE7QUFFZEMsWUFBSTtBQUZVLE9BQUQsQ0FKVjtBQVFMQyxhQUFPLEVBUkY7QUFTTEMsZ0JBQVUsVUFUTDtBQVVMQyxrQkFBWSxDQVZQO0FBV0xDLG1CQUFhLENBWFI7QUFZTEMsY0FBUSxLQVpIO0FBYUxDLGdCQUFVLEVBYkw7QUFjTEMsZ0JBQVUsQ0FkTDtBQWVMQyxlQUFTLENBZko7QUFnQkxDLGdCQUFVLEVBaEJMO0FBaUJMQyxvQkFBYyxFQWpCVDtBQWtCTGpCLGNBQVE7QUFsQkgsSyxTQTJCUGtCLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNHQyxLQURILEVBQ1ViLEVBRFYsRUFDYztBQUNwQixhQUFLRyxVQUFMLEdBQWtCVSxLQUFsQjtBQUNBLGFBQUtULFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxhQUFLSyxRQUFMLEdBQWdCVCxFQUFoQjtBQUNBLGFBQUtLLE1BQUwsR0FBYyxLQUFkO0FBQ0EsYUFBS0csT0FBTCxHQUFlLENBQWY7QUFDQSxhQUFLTSxNQUFMLENBQVksS0FBS0wsUUFBakI7QUFDRCxPQVJPO0FBU1JNLGlCQVRRLHVCQVNLRixLQVRMLEVBU1liLEVBVFosRUFTZ0I7QUFDdEIsYUFBS0ksV0FBTCxHQUFtQlMsS0FBbkI7QUFDQSxhQUFLSixRQUFMLEdBQWdCVCxFQUFoQjtBQUNBLGFBQUtLLE1BQUwsR0FBYyxLQUFkO0FBQ0EsYUFBS0csT0FBTCxHQUFlLENBQWY7QUFDQSxhQUFLTSxNQUFMLENBQVksS0FBS0wsUUFBakI7QUFDRCxPQWZPO0FBZ0JSTyxjQWhCUSxvQkFnQkVoQixFQWhCRixFQWdCTTtBQUNaLHVCQUFLaUIsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLGlCQUFpQmxCO0FBRFIsU0FBaEI7QUFHRDtBQXBCTyxLOzs7OztrQ0FQSztBQUFBOztBQUNiLFdBQUtILFdBQUwsQ0FBaUJzQixPQUFqQixDQUF5QixVQUFDQyxJQUFELEVBQU9QLEtBQVAsRUFBaUI7QUFDeEMsWUFBSU8sS0FBS0MsUUFBTCxDQUFjQyxNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQzVCLGlCQUFLaEIsUUFBTCxHQUFnQk8sS0FBaEI7QUFDRDtBQUNGLE9BSkQ7QUFLRDs7O29DQXVCZ0I7QUFDZixVQUFJLEtBQUtMLE9BQUwsR0FBZSxLQUFLRSxZQUF4QixFQUFzQztBQUNwQztBQUNBLGFBQUtGLE9BQUw7QUFDQSxhQUFLTSxNQUFMLENBQVksS0FBS0wsUUFBakI7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUtSLEtBQUwsQ0FBV3FCLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsZUFBSzdCLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFDRjtBQUNGOzs7aUNBQ2E7QUFDWixVQUFJOEIsUUFBUSxJQUFaO0FBQ0EsVUFBSTdCLE9BQU87QUFDVEMsZUFBTyxLQUFLQTtBQURILE9BQVg7QUFHQSxXQUFLNkIsT0FBTCxDQUFhQyxXQUFiLENBQXlCQyxjQUF6QixDQUF3Q2hDLElBQXhDLEVBQThDaUMsSUFBOUMsQ0FBbUQsVUFBQ0MsR0FBRCxFQUFTO0FBQzFELFlBQUlBLElBQUlsQyxJQUFKLENBQVNtQyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUluQyxPQUFPa0MsSUFBSWxDLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsZUFBS3lCLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsZ0JBQUlVLE1BQU0sRUFBVjtBQUNBQSxnQkFBSUMsS0FBSixHQUFZWCxLQUFLckIsSUFBakI7QUFDQStCLGdCQUFJOUIsRUFBSixHQUFTb0IsS0FBS3BCLEVBQWQ7QUFDQThCLGdCQUFJRSxLQUFKLEdBQVlULE1BQU1VLFlBQU4sQ0FBbUJiLEtBQUtwQixFQUF4QixDQUFaO0FBQ0F1QixrQkFBTTFCLFdBQU4sQ0FBa0JxQyxJQUFsQixDQUF1QkosR0FBdkI7QUFDRCxXQU5EO0FBT0FQLGdCQUFNZCxRQUFOLEdBQWlCYyxNQUFNMUIsV0FBTixDQUFrQixDQUFsQixFQUFxQkcsRUFBdEM7QUFDQXVCLGdCQUFNVCxNQUFOLENBQWFTLE1BQU1kLFFBQW5CO0FBQ0Q7QUFDRGMsY0FBTVksTUFBTjtBQUNELE9BZEQ7QUFlQUMsY0FBUUMsR0FBUixDQUFZLEtBQUtwQyxLQUFqQjtBQUNEOzs7aUNBQ2FRLFEsRUFBVTtBQUN0QixVQUFJYyxRQUFRLElBQVo7QUFDQSxVQUFJN0IsT0FBTztBQUNUQyxlQUFPLEtBQUtBLEtBREg7QUFFVDJDLG9CQUFZN0IsUUFGSDtBQUdUOEIsb0JBQVk7QUFISCxPQUFYO0FBS0EsVUFBSVAsUUFBUSxDQUFDO0FBQ1hqQyxjQUFNLElBREs7QUFFWEMsWUFBSVM7QUFGTyxPQUFELENBQVo7QUFJQSxXQUFLZSxPQUFMLENBQWFDLFdBQWIsQ0FBeUJlLGdCQUF6QixDQUEwQzlDLElBQTFDLEVBQWdEaUMsSUFBaEQsQ0FBcUQsVUFBQ0MsR0FBRCxFQUFTO0FBQzVELFlBQUlBLElBQUlsQyxJQUFKLENBQVNtQyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUluQyxPQUFPa0MsSUFBSWxDLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsZUFBS3lCLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsZ0JBQUlVLE1BQU0sRUFBVjtBQUNBQSxnQkFBSS9CLElBQUosR0FBV3FCLEtBQUtyQixJQUFoQjtBQUNBK0IsZ0JBQUk5QixFQUFKLEdBQVNvQixLQUFLcEIsRUFBZDtBQUNBZ0Msa0JBQU1FLElBQU4sQ0FBV0osR0FBWDtBQUNELFdBTEQ7QUFNRDtBQUNEUCxjQUFNWSxNQUFOO0FBQ0QsT0FYRDtBQVlBLGFBQU9ILEtBQVA7QUFDRDs7OzJCQUNPdkIsUSxFQUFVZ0MsRSxFQUFJO0FBQUE7O0FBQ3BCLFdBQUtqQixPQUFMLENBQWFrQixXQUFiO0FBQ0EsV0FBS2pELE1BQUwsR0FBYyxLQUFkO0FBQ0EsVUFBSThCLFFBQVEsSUFBWjtBQUNBLFVBQUk3QixPQUFPO0FBQ1Q0QyxvQkFBWTdCLFFBREg7QUFFVGQsZUFBTyxLQUFLQSxLQUZIO0FBR1RZLGtCQUFVLEtBQUtBLFFBSE47QUFJVEMsaUJBQVMsS0FBS0E7QUFKTCxPQUFYO0FBTUEsV0FBS2dCLE9BQUwsQ0FBYUMsV0FBYixDQUF5QmtCLFVBQXpCLENBQW9DakQsSUFBcEMsRUFBMENpQyxJQUExQyxDQUErQyxVQUFDQyxHQUFELEVBQVM7QUFDdERRLGdCQUFRQyxHQUFSLENBQVlULEdBQVo7QUFDQSxZQUFJTCxNQUFNZixPQUFOLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCZSxnQkFBTXRCLEtBQU4sR0FBYyxFQUFkO0FBQ0Q7QUFDRCxZQUFJMkIsSUFBSWxDLElBQUosQ0FBU21DLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJOLGdCQUFNYixZQUFOLEdBQXFCa0IsSUFBSWxDLElBQUosQ0FBU0EsSUFBVCxDQUFjZ0IsWUFBbkM7QUFDQSxjQUFJaEIsT0FBT2tDLElBQUlsQyxJQUFKLENBQVNBLElBQVQsQ0FBY2tELElBQXpCO0FBQ0EsY0FBSWxELEtBQUs0QixNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCQyxrQkFBTWxCLE1BQU4sR0FBZSxJQUFmO0FBQ0QsV0FGRCxNQUVPO0FBQ0xrQixrQkFBTWxCLE1BQU4sR0FBZSxLQUFmO0FBQ0EsZ0JBQUlYLEtBQUs0QixNQUFMLEdBQWMsT0FBS2YsUUFBdkIsRUFBaUM7QUFDL0JnQixvQkFBTTlCLE1BQU4sR0FBZSxJQUFmO0FBQ0QsYUFGRCxNQUVPO0FBQ0w4QixvQkFBTTlCLE1BQU4sR0FBZSxLQUFmO0FBQ0Q7QUFDRjtBQUNEQyxlQUFLeUIsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQixnQkFBSXlCLE9BQU8sRUFBWDtBQUNBQSxpQkFBS0MsSUFBTCxHQUFZMUIsS0FBSzJCLEtBQWpCO0FBQ0FGLGlCQUFLZCxLQUFMLEdBQWFYLEtBQUtXLEtBQWxCO0FBQ0FjLGlCQUFLRyxLQUFMLEdBQWE1QixLQUFLNkIsV0FBbEI7QUFDQUosaUJBQUtLLFFBQUwsR0FBZ0I5QixLQUFLNEIsS0FBckI7QUFDQUgsaUJBQUtNLFNBQUwsR0FBaUIvQixLQUFLK0IsU0FBdEI7QUFDQU4saUJBQUs3QyxFQUFMLEdBQVVvQixLQUFLWCxRQUFmO0FBQ0FvQyxpQkFBS08sUUFBTCxHQUFnQmhDLEtBQUtpQyxJQUFyQjtBQUNBOUIsa0JBQU10QixLQUFOLENBQVlpQyxJQUFaLENBQWlCVyxJQUFqQjtBQUNBSixrQkFBTUEsSUFBTjtBQUNELFdBWEQ7QUFZRCxTQXpCRCxNQXlCTztBQUNMbEIsZ0JBQU1sQixNQUFOLEdBQWUsSUFBZjtBQUNEO0FBQ0RrQixjQUFNWSxNQUFOO0FBQ0QsT0FsQ0QsRUFrQ0dtQixLQWxDSCxDQWtDUyxZQUFNO0FBQ2IvQixjQUFNbEIsTUFBTixHQUFlLElBQWY7QUFDRCxPQXBDRDtBQXFDRDs7OzZCQUNTO0FBQ1IsV0FBS1YsS0FBTCxHQUFhLEtBQUs2QixPQUFMLENBQWErQixRQUFiLENBQXNCLFVBQXRCLENBQWI7QUFDQSxXQUFLQyxVQUFMO0FBQ0EsV0FBS0MsV0FBTDtBQUNBLFdBQUt0QixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFVBQUksS0FBS1gsT0FBTCxDQUFha0MsUUFBakIsRUFBMkI7QUFDekIsYUFBS2xDLE9BQUwsQ0FBYWtDLFFBQWIsR0FBd0IsS0FBeEI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLdkQsVUFBTCxHQUFrQixDQUFsQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxZQUFJLEtBQUtQLFdBQUwsQ0FBaUJ5QixNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxlQUFLUixNQUFMLENBQVksS0FBS2pCLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JHLEVBQWhDO0FBQ0Q7QUFDRjtBQUNGOzs7O0VBeExtQyxlQUFLMkQsSTs7a0JBQXRCNUUsUSIsImZpbGUiOiJjYXRlZ29yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb29kcydcbiAgaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaGJhcidcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcbiAgaW1wb3J0IFJlYWNoZG93biBmcm9tICcuLi9jb21wb25lbnRzL3JlYWNoZG93bidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeWIhuexuydcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkNhdGVnb29kc1wiOntcInYtYmluZDpnb29kc0l0ZW0uc3luY1wiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcInNlYXJjaGJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFnZWZyb20uc3luY1wiOlwicGFnZVRpbGVcIn0sXCJpc0Rvd25cIjp7fX07XHJcbiRldmVudHMgPSB7XCJDYXRlZ29vZHNcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgQ2F0ZWdvb2RzOiBHb29kcyxcbiAgICAgIGRlZmVjdEltYWdlOiBEZWZlY3QsXG4gICAgICBzZWFyY2hiYXI6IFNlYXJjaCxcbiAgICAgIGlzRG93bjogUmVhY2hkb3duXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBjYXRlZ29yeUltZzogWycuLi9pbWFnZS9jYXRlZ29yeUEuanBnJywgJy4uL2ltYWdlL2NhdGVnb3J5Qi5qcGcnLCAnLi4vaW1hZ2UvY2F0ZWdvcnlDLmpwZycsICcuLi9pbWFnZS9jYXRlZ29yeUQuanBnJ10sXG4gICAgICBjYXRlZ29yeVRhYjogW10sXG4gICAgICBjaGlsZENhdGVnb3J5OiBbe1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgaWQ6ICcnXG4gICAgICB9XSxcbiAgICAgIGdvb2RzOiBbXSxcbiAgICAgIHBhZ2VUaWxlOiAnY2F0ZWdvcnknLFxuICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgIGN1cnJlbnRJdGVtOiAwLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHNob3dNb3JlOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBpc0Rvd246IGZhbHNlXG4gICAgfVxuICAgIGdldFNob3dNb3JlICgpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlUYWIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uY2F0ZWdvcnkubGVuZ3RoID4gNSkge1xuICAgICAgICAgIHRoaXMuc2hvd01vcmUgPSBpbmRleFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlVGFiIChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gaW5kZXhcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IDBcbiAgICAgICAgdGhpcy5zb3VyY2VJZCA9IGlkXG4gICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSxcbiAgICAgIHJlcUNhdGVnb3J5IChpbmRleCwgaWQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IGluZGV4XG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBpZFxuICAgICAgICB0aGlzLmlzTnVsbCA9IGZhbHNlXG4gICAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgICAgdGhpcy5nZXRTcHUodGhpcy5zb3VyY2VJZClcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmdldFNwdSh0aGlzLnNvdXJjZUlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2V0VG9wQ2F0ZSAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRUb3BDYXRlZ29yeShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50aXRsZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmNoaWxkID0gX3RoaXMuZ2V0Q2hpbGRDYXRlKGl0ZW0uaWQpXG4gICAgICAgICAgICBfdGhpcy5jYXRlZ29yeVRhYi5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLnNvdXJjZUlkID0gX3RoaXMuY2F0ZWdvcnlUYWJbMF0uaWRcbiAgICAgICAgICBfdGhpcy5nZXRTcHUoX3RoaXMuc291cmNlSWQpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmdvb2RzKVxuICAgIH1cbiAgICBnZXRDaGlsZENhdGUgKHNvdXJjZUlkKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGNhdGVnb3J5SWQ6IHNvdXJjZUlkLFxuICAgICAgICBpbmNsdWRTZWxmOiAxXG4gICAgICB9XG4gICAgICB2YXIgY2hpbGQgPSBbe1xuICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgaWQ6IHNvdXJjZUlkXG4gICAgICB9XVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldENoaWxkQ2F0ZWdvcnkoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgY2hpbGQucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICBnZXRTcHUgKHNvdXJjZUlkLCBjYikge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBjYXRlZ29yeUlkOiBzb3VyY2VJZCxcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRTcHVIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChfdGhpcy5wYWdlTnVtID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMuZ29vZHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IHJlcy5kYXRhLmRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhLnNwdXNcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IHRoaXMucGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgX3RoaXMuZ29vZHMucHVzaChnb29kKVxuICAgICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdjYXRlZ29yeScpXG4gICAgICB0aGlzLmdldFRvcENhdGUoKVxuICAgICAgdGhpcy5nZXRTaG93TW9yZSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50LnBhZ2VSb290KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5wYWdlUm9vdCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSAwXG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICAgIGlmICh0aGlzLmNhdGVnb3J5VGFiLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuZ2V0U3B1KHRoaXMuY2F0ZWdvcnlUYWJbMF0uaWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==