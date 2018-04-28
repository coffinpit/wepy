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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hot = function (_wepy$page) {
  _inherits(Hot, _wepy$page);

  function Hot() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Hot);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Hot.__proto__ || Object.getPrototypeOf(Hot)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '商品分类'
    }, _this.$repeat = {}, _this.$props = { "Categoods": { "xmlns:v-bind": "", "v-bind:goodsItem.once": "goods", "xmlns:v-on": "" }, "defectImage": {} }, _this.$events = { "Categoods": { "v-on:goodsTap": "goDetail" } }, _this.components = {
      Categoods: _goods2.default,
      defectImage: _defect2.default,
      searchbar: _searchbar2.default
    }, _this.data = {
      categoryImg: ['../image/categoryA.jpg', '../image/categoryB.jpg', '../image/categoryC.jpg', '../image/categoryD.jpg'],
      categoryTab: [{
        'title': '肉禽',
        'category': [{
          name: '全部',
          id: '12313'
        }, {
          name: '猪肉',
          id: '34123'
        }, {
          name: '牛肉',
          id: '12342'
        }, {
          name: '羊肉',
          id: '64524'
        }, {
          name: '禽肉',
          id: '84532'
        }]
      }, {
        'title': '水产',
        'category': [{
          name: '全部',
          id: '16343'
        }, {
          name: '鱼类',
          id: '74532'
        }, {
          name: '虾类',
          id: '42134'
        }, {
          name: '贝类',
          id: '42342'
        }, {
          name: '软体',
          id: '56234'
        }, {
          name: '蟹类',
          id: '56234'
        }]
      }, {
        'title': '厨具',
        'category': [{
          name: '全部',
          id: '16343'
        }, {
          name: '调料',
          id: '74532'
        }, {
          name: '锅具',
          id: '42134'
        }, {
          name: '刀铲',
          id: '42342'
        }, {
          name: '盆锅',
          id: '56234'
        }]
      }, {
        'title': '酒饮',
        'category': [{
          name: '全部',
          id: '16343'
        }, {
          name: '葡萄酒',
          id: '74532'
        }, {
          name: '果汁',
          id: '42134'
        }, {
          name: '啤酒',
          id: '42342'
        }, {
          name: '烈酒',
          id: '56234'
        }]
      }],
      goods: [{
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1231123'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1234321'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1234321'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1234321'
      }],
      currentTab: 0,
      currentItem: 0,
      isNull: false,
      showMore: ''
    }, _this.methods = {
      changeTab: function changeTab(index) {
        this.currentTab = index;
        this.currentItem = 0;
      },
      reqCategory: function reqCategory(index) {
        this.currentItem = index;
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Hot, [{
    key: 'getShowMore',
    value: function getShowMore() {
      var _this2 = this;

      this.categoryTab.forEach(function (item, index) {
        if (item.category.length > 5) {
          _this2.showMore = index;
        }
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      console.log('到底了');
      // 显示加载状态
      _wepy2.default.showLoading({
        title: '加载中',
        icon: 'loading'
      });
      // 发送请求并显示新数据
      // 请求成功后隐藏loading
      setTimeout(function () {
        _wepy2.default.hideLoading();
      }, 1000);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      if (this.goods.length === 0) {
        this.isNull = true;
      }
      this.getShowMore();
      console.log(this.showMore);
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // 数据刷新
      this.currentTab = 0;
      this.currentItem = 0;
    }
  }]);

  return Hot;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Hot , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkhvdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDYXRlZ29vZHMiLCJkZWZlY3RJbWFnZSIsInNlYXJjaGJhciIsImRhdGEiLCJjYXRlZ29yeUltZyIsImNhdGVnb3J5VGFiIiwibmFtZSIsImlkIiwiZ29vZHMiLCJwYXRoIiwidGl0bGUiLCJwcmljZSIsIm9sZHByaWNlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJtZXRob2RzIiwiY2hhbmdlVGFiIiwiaW5kZXgiLCJyZXFDYXRlZ29yeSIsImdvRGV0YWlsIiwibmF2aWdhdGVUbyIsInVybCIsImZvckVhY2giLCJpdGVtIiwiY2F0ZWdvcnkiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJpY29uIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwiZ2V0U2hvd01vcmUiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIseUJBQXdCLE9BQTNDLEVBQW1ELGNBQWEsRUFBaEUsRUFBYixFQUFpRixlQUFjLEVBQS9GLEUsUUFDVEMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLGlCQUFnQixVQUFqQixFQUFiLEUsUUFDVEMsVSxHQUFhO0FBQ1JDLGdDQURRO0FBRVJDLG1DQUZRO0FBR1JDO0FBSFEsSyxRQUtWQyxJLEdBQU87QUFDTEMsbUJBQWEsQ0FBQyx3QkFBRCxFQUEyQix3QkFBM0IsRUFBcUQsd0JB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VUFBTCxDQUFnQjtBQUNkQyxlQUFLLGlCQUFpQmhCO0FBRFIsU0FBaEI7QUFHRDtBQVpPLEs7Ozs7O2tDQVBLO0FBQUE7O0FBQ2IsV0FBS0YsV0FBTCxDQUFpQm1CLE9BQWpCLENBQXlCLFVBQUNDLElBQUQsRUFBT04sS0FBUCxFQUFpQjtBQUN4QyxZQUFJTSxLQUFLQyxRQUFMLENBQWNDLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUIsaUJBQUtYLFFBQUwsR0FBZ0JHLEtBQWhCO0FBQ0Q7QUFDRixPQUpEO0FBS0Q7OztvQ0FlZ0I7QUFDZlMsY0FBUUMsR0FBUixDQUFZLEtBQVo7QUFDQTtBQUNBLHFCQUFLQyxXQUFMLENBQWlCO0FBQ2ZwQixlQUFPLEtBRFE7QUFFZnFCLGNBQU07QUFGUyxPQUFqQjtBQUlBO0FBQ0E7QUFDQUMsaUJBQVcsWUFBTTtBQUNmLHVCQUFLQyxXQUFMO0FBQ0QsT0FGRCxFQUVHLElBRkg7QUFHRDs7OzZCQUNTO0FBQ1IsVUFBSSxLQUFLekIsS0FBTCxDQUFXbUIsTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUMzQixhQUFLWixNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0QsV0FBS21CLFdBQUw7QUFDQU4sY0FBUUMsR0FBUixDQUFZLEtBQUtiLFFBQWpCO0FBQ0EsV0FBS21CLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1I7QUFDQSxXQUFLdEIsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDs7OztFQXRLOEIsZUFBS3NCLEk7O2tCQUFqQjNDLEciLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEdvb2RzIGZyb20gJy4uL2NvbXBvbmVudHMvZ29vZHMnXG4gIGltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG90IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZWG5ZOB5YiG57G7J1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ2F0ZWdvb2RzXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpnb29kc0l0ZW0ub25jZVwiOlwiZ29vZHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImRlZmVjdEltYWdlXCI6e319O1xyXG4kZXZlbnRzID0ge1wiQ2F0ZWdvb2RzXCI6e1widi1vbjpnb29kc1RhcFwiOlwiZ29EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIENhdGVnb29kczogR29vZHMsXG4gICAgICBkZWZlY3RJbWFnZTogRGVmZWN0LFxuICAgICAgc2VhcmNoYmFyOiBTZWFyY2hcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGNhdGVnb3J5SW1nOiBbJy4uL2ltYWdlL2NhdGVnb3J5QS5qcGcnLCAnLi4vaW1hZ2UvY2F0ZWdvcnlCLmpwZycsICcuLi9pbWFnZS9jYXRlZ29yeUMuanBnJywgJy4uL2ltYWdlL2NhdGVnb3J5RC5qcGcnXSxcbiAgICAgIGNhdGVnb3J5VGFiOiBbe1xuICAgICAgICAndGl0bGUnOiAn6IKJ56a9JyxcbiAgICAgICAgJ2NhdGVnb3J5JzogW3tcbiAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgICBpZDogJzEyMzEzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+eMquiCiScsXG4gICAgICAgICAgaWQ6ICczNDEyMydcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfniZvogoknLFxuICAgICAgICAgIGlkOiAnMTIzNDInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn576K6IKJJyxcbiAgICAgICAgICBpZDogJzY0NTI0J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+emveiCiScsXG4gICAgICAgICAgaWQ6ICc4NDUzMidcbiAgICAgICAgfV1cbiAgICAgIH0sIHtcbiAgICAgICAgJ3RpdGxlJzogJ+awtOS6pycsXG4gICAgICAgICdjYXRlZ29yeSc6IFt7XG4gICAgICAgICAgbmFtZTogJ+WFqOmDqCcsXG4gICAgICAgICAgaWQ6ICcxNjM0MydcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfpsbznsbsnLFxuICAgICAgICAgIGlkOiAnNzQ1MzInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn6Jm+57G7JyxcbiAgICAgICAgICBpZDogJzQyMTM0J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+i0neexuycsXG4gICAgICAgICAgaWQ6ICc0MjM0MidcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfova/kvZMnLFxuICAgICAgICAgIGlkOiAnNTYyMzQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn6J+557G7JyxcbiAgICAgICAgICBpZDogJzU2MjM0J1xuICAgICAgICB9XVxuICAgICAgfSwge1xuICAgICAgICAndGl0bGUnOiAn5Y6o5YW3JyxcbiAgICAgICAgJ2NhdGVnb3J5JzogW3tcbiAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgICBpZDogJzE2MzQzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+iwg+aWmScsXG4gICAgICAgICAgaWQ6ICc3NDUzMidcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfplIXlhbcnLFxuICAgICAgICAgIGlkOiAnNDIxMzQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn5YiA6ZOyJyxcbiAgICAgICAgICBpZDogJzQyMzQyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+ebhumUhScsXG4gICAgICAgICAgaWQ6ICc1NjIzNCdcbiAgICAgICAgfV1cbiAgICAgIH0sIHtcbiAgICAgICAgJ3RpdGxlJzogJ+mFkumlricsXG4gICAgICAgICdjYXRlZ29yeSc6IFt7XG4gICAgICAgICAgbmFtZTogJ+WFqOmDqCcsXG4gICAgICAgICAgaWQ6ICcxNjM0MydcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfokaHokITphZInLFxuICAgICAgICAgIGlkOiAnNzQ1MzInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn5p6c5rGBJyxcbiAgICAgICAgICBpZDogJzQyMTM0J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+WVpOmFkicsXG4gICAgICAgICAgaWQ6ICc0MjM0MidcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfng4jphZInLFxuICAgICAgICAgIGlkOiAnNTYyMzQnXG4gICAgICAgIH1dXG4gICAgICB9XSxcbiAgICAgIGdvb2RzOiBbe1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgaWQ6ICcxMjMxMTIzJ1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgaWQ6ICcxMjM0MzIxJ1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgaWQ6ICcxMjM0MzIxJ1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgaWQ6ICcxMjM0MzIxJ1xuICAgICAgfV0sXG4gICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgY3VycmVudEl0ZW06IDAsXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgc2hvd01vcmU6ICcnXG4gICAgfVxuICAgIGdldFNob3dNb3JlICgpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnlUYWIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uY2F0ZWdvcnkubGVuZ3RoID4gNSkge1xuICAgICAgICAgIHRoaXMuc2hvd01vcmUgPSBpbmRleFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlVGFiIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpbmRleFxuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgICAgfSxcbiAgICAgIHJlcUNhdGVnb3J5IChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gaW5kZXhcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICBjb25zb2xlLmxvZygn5Yiw5bqV5LqGJylcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgICB9KVxuICAgICAgLy8g5Y+R6YCB6K+35rGC5bm25pi+56S65paw5pWw5o2uXG4gICAgICAvLyDor7fmsYLmiJDlip/lkI7pmpDol49sb2FkaW5nXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgaWYgKHRoaXMuZ29vZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5nZXRTaG93TW9yZSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnNob3dNb3JlKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgLy8g5pWw5o2u5Yi35pawXG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSAwXG4gICAgICB0aGlzLmN1cnJlbnRJdGVtID0gMFxuICAgIH1cbiAgfVxuIl19