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
      defectImage: _defect2.default
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkhvdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDYXRlZ29vZHMiLCJkZWZlY3RJbWFnZSIsImRhdGEiLCJjYXRlZ29yeUltZyIsImNhdGVnb3J5VGFiIiwibmFtZSIsImlkIiwiZ29vZHMiLCJwYXRoIiwidGl0bGUiLCJwcmljZSIsIm9sZHByaWNlIiwiY3VycmVudFRhYiIsImN1cnJlbnRJdGVtIiwiaXNOdWxsIiwic2hvd01vcmUiLCJtZXRob2RzIiwiY2hhbmdlVGFiIiwiaW5kZXgiLCJyZXFDYXRlZ29yeSIsImdvRGV0YWlsIiwibmF2aWdhdGVUbyIsInVybCIsImZvckVhY2giLCJpdGVtIiwiY2F0ZWdvcnkiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJpY29uIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwiZ2V0U2hvd01vcmUiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7Ozs7Ozs7Ozs7Ozs7Z0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHlCQUF3QixPQUEzQyxFQUFtRCxjQUFhLEVBQWhFLEVBQWIsRUFBaUYsZUFBYyxFQUEvRixFLFFBQ1RDLE8sR0FBVSxFQUFDLGFBQVksRUFBQyxpQkFBZ0IsVUFBakIsRUFBYixFLFFBQ1RDLFUsR0FBYTtBQUNSQyxnQ0FEUTtBQUVSQztBQUZRLEssUUFJVkMsSSxHQUFPO0FBQ0xDLG1CQUFhLENBQUMsd0JBQUQsRUFBMkIsd0JBQTNCLEVBQXFELHdCQUFyRCxFQUErRSx3QkFBL0UsQ0FEUjtBQUVMQyxtQkFB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QURSLFNBQWhCO0FBR0Q7QUFaTyxLOzs7OztrQ0FQSztBQUFBOztBQUNiLFdBQUtGLFdBQUwsQ0FBaUJtQixPQUFqQixDQUF5QixVQUFDQyxJQUFELEVBQU9OLEtBQVAsRUFBaUI7QUFDeEMsWUFBSU0sS0FBS0MsUUFBTCxDQUFjQyxNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQzVCLGlCQUFLWCxRQUFMLEdBQWdCRyxLQUFoQjtBQUNEO0FBQ0YsT0FKRDtBQUtEOzs7b0NBZWdCO0FBQ2ZTLGNBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0E7QUFDQSxxQkFBS0MsV0FBTCxDQUFpQjtBQUNmcEIsZUFBTyxLQURRO0FBRWZxQixjQUFNO0FBRlMsT0FBakI7QUFJQTtBQUNBO0FBQ0FDLGlCQUFXLFlBQU07QUFDZix1QkFBS0MsV0FBTDtBQUNELE9BRkQsRUFFRyxJQUZIO0FBR0Q7Ozs2QkFDUztBQUNSLFVBQUksS0FBS3pCLEtBQUwsQ0FBV21CLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsYUFBS1osTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNELFdBQUttQixXQUFMO0FBQ0FOLGNBQVFDLEdBQVIsQ0FBWSxLQUFLYixRQUFqQjtBQUNBLFdBQUttQixNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSO0FBQ0EsV0FBS3RCLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7Ozs7RUFySzhCLGVBQUtzQixJOztrQkFBakIxQyxHIiwiZmlsZSI6ImNhdGVnb3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWTgeWIhuexuydcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkNhdGVnb29kc1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLm9uY2VcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkZWZlY3RJbWFnZVwiOnt9fTtcclxuJGV2ZW50cyA9IHtcIkNhdGVnb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBDYXRlZ29vZHM6IEdvb2RzLFxuICAgICAgZGVmZWN0SW1hZ2U6IERlZmVjdFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgY2F0ZWdvcnlJbWc6IFsnLi4vaW1hZ2UvY2F0ZWdvcnlBLmpwZycsICcuLi9pbWFnZS9jYXRlZ29yeUIuanBnJywgJy4uL2ltYWdlL2NhdGVnb3J5Qy5qcGcnLCAnLi4vaW1hZ2UvY2F0ZWdvcnlELmpwZyddLFxuICAgICAgY2F0ZWdvcnlUYWI6IFt7XG4gICAgICAgICd0aXRsZSc6ICfogonnpr0nLFxuICAgICAgICAnY2F0ZWdvcnknOiBbe1xuICAgICAgICAgIG5hbWU6ICflhajpg6gnLFxuICAgICAgICAgIGlkOiAnMTIzMTMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn54yq6IKJJyxcbiAgICAgICAgICBpZDogJzM0MTIzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+eJm+iCiScsXG4gICAgICAgICAgaWQ6ICcxMjM0MidcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfnvorogoknLFxuICAgICAgICAgIGlkOiAnNjQ1MjQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn56a96IKJJyxcbiAgICAgICAgICBpZDogJzg0NTMyJ1xuICAgICAgICB9XVxuICAgICAgfSwge1xuICAgICAgICAndGl0bGUnOiAn5rC05LqnJyxcbiAgICAgICAgJ2NhdGVnb3J5JzogW3tcbiAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgICBpZDogJzE2MzQzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+mxvOexuycsXG4gICAgICAgICAgaWQ6ICc3NDUzMidcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfomb7nsbsnLFxuICAgICAgICAgIGlkOiAnNDIxMzQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn6LSd57G7JyxcbiAgICAgICAgICBpZDogJzQyMzQyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+i9r+S9kycsXG4gICAgICAgICAgaWQ6ICc1NjIzNCdcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfon7nnsbsnLFxuICAgICAgICAgIGlkOiAnNTYyMzQnXG4gICAgICAgIH1dXG4gICAgICB9LCB7XG4gICAgICAgICd0aXRsZSc6ICfljqjlhbcnLFxuICAgICAgICAnY2F0ZWdvcnknOiBbe1xuICAgICAgICAgIG5hbWU6ICflhajpg6gnLFxuICAgICAgICAgIGlkOiAnMTYzNDMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn6LCD5paZJyxcbiAgICAgICAgICBpZDogJzc0NTMyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+mUheWFtycsXG4gICAgICAgICAgaWQ6ICc0MjEzNCdcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfliIDpk7InLFxuICAgICAgICAgIGlkOiAnNDIzNDInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn55uG6ZSFJyxcbiAgICAgICAgICBpZDogJzU2MjM0J1xuICAgICAgICB9XVxuICAgICAgfSwge1xuICAgICAgICAndGl0bGUnOiAn6YWS6aWuJyxcbiAgICAgICAgJ2NhdGVnb3J5JzogW3tcbiAgICAgICAgICBuYW1lOiAn5YWo6YOoJyxcbiAgICAgICAgICBpZDogJzE2MzQzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+iRoeiQhOmFkicsXG4gICAgICAgICAgaWQ6ICc3NDUzMidcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICfmnpzmsYEnLFxuICAgICAgICAgIGlkOiAnNDIxMzQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn5ZWk6YWSJyxcbiAgICAgICAgICBpZDogJzQyMzQyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ+eDiOmFkicsXG4gICAgICAgICAgaWQ6ICc1NjIzNCdcbiAgICAgICAgfV1cbiAgICAgIH1dLFxuICAgICAgZ29vZHM6IFt7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICBpZDogJzEyMzExMjMnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICBpZDogJzEyMzQzMjEnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICBpZDogJzEyMzQzMjEnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICB0aXRsZTogJ+e+juWbveiHqueEtueJm+eyvumAieWQjuiFv+Wwj+aWuScsXG4gICAgICAgIHByaWNlOiAnOTkuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTYwLjAnLFxuICAgICAgICBpZDogJzEyMzQzMjEnXG4gICAgICB9XSxcbiAgICAgIGN1cnJlbnRUYWI6IDAsXG4gICAgICBjdXJyZW50SXRlbTogMCxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBzaG93TW9yZTogJydcbiAgICB9XG4gICAgZ2V0U2hvd01vcmUgKCkge1xuICAgICAgdGhpcy5jYXRlZ29yeVRhYi5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5jYXRlZ29yeS5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgdGhpcy5zaG93TW9yZSA9IGluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGFuZ2VUYWIgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRhYiA9IGluZGV4XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgICB9LFxuICAgICAgcmVxQ2F0ZWdvcnkgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSBpbmRleFxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZGV0YWlsP2lkPScgKyBpZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCfliLDlupXkuoYnKVxuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICBpY29uOiAnbG9hZGluZydcbiAgICAgIH0pXG4gICAgICAvLyDlj5HpgIHor7fmsYLlubbmmL7npLrmlrDmlbDmja5cbiAgICAgIC8vIOivt+axguaIkOWKn+WQjumakOiXj2xvYWRpbmdcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICBpZiAodGhpcy5nb29kcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLmdldFNob3dNb3JlKClcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2hvd01vcmUpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICAvLyDmlbDmja7liLfmlrBcbiAgICAgIHRoaXMuY3VycmVudFRhYiA9IDBcbiAgICAgIHRoaXMuY3VycmVudEl0ZW0gPSAwXG4gICAgfVxuICB9XG4iXX0=