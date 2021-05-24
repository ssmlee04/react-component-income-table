"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.IncomeTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactCopyToClipboard = require("react-copy-to-clipboard");

require("./../index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var greenOrRed = function greenOrRed(str, high, low) {
  var v = parseFloat(str);
  if (v > high) return 'green';
  if (v < low) return 'red';
};

var IncomeTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IncomeTable, _React$Component);

  function IncomeTable(props) {
    var _this;

    _classCallCheck(this, IncomeTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IncomeTable).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(IncomeTable, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var profile = this.props.profile;
      if (!profile) return true;
      if (nextState.copied) return true;
      if (profile.ticker !== nextProps.profile.ticker) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          profile = _this$props.profile,
          _this$props$prop = _this$props.prop,
          prop = _this$props$prop === void 0 ? 'income_and_revenue' : _this$props$prop,
          _this$props$imgProp = _this$props.imgProp,
          imgProp = _this$props$imgProp === void 0 ? 'income_table' : _this$props$imgProp,
          _this$props$count = _this$props.count,
          count = _this$props$count === void 0 ? 4 : _this$props$count;
      var copied = this.state.copied;

      if (!profile) {
        return _react["default"].createElement("div", {
          style: {
            fontSize: 12
          }
        }, "Not available at this time... ");
      }

      if (profile[imgProp] && profile[imgProp].url) {
        var btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
        var btnText = copied ? 'Copied' : 'Copy Img';
        return _react["default"].createElement("div", {
          className: "react-components-show-button"
        }, _react["default"].createElement("img", {
          alt: "".concat(profile.ticker, " - ").concat(profile.name, " income statement table condensed"),
          src: profile[imgProp].url,
          style: {
            width: '100%'
          }
        }), _react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: profile[imgProp].url || '',
          onCopy: function onCopy() {
            return _this2.setState({
              copied: true
            });
          }
        }, _react["default"].createElement("button", {
          className: btnClass,
          value: btnText
        }, btnText)));
      }

      var calculateMargins = function calculateMargins(data) {
        var divider = 1000;
        var unit = 'thousand';
        var u = 'k';
        if (!data || !data.length) return data;

        if (data[data.length - 1].rev > 2000000) {
          divider = 1000000;
          unit = 'milllion';
          u = 'm';
        }

        if (data[data.length - 1].rev > 2000000000) {
          divider = 1000000000;
          unit = 'billion';
          u = 'b';
        }

        data = data.filter(function (d) {
          return d.reportDate;
        });
        data = data.map(function (d) {
          d.reportDate = d.reportDate.replace(/-/g, '').slice(0, 6);
          return d;
        });
        data = _lodash["default"].sortBy(data, function (d) {
          return d.reportDate;
        });
        return data.map(function (d, i) {
          var qq = ~~d.reportDate.slice(4, 6);
          var yy = d.reportDate.slice(0, 4);
          var qtr;

          if (qq <= 3) {
            qtr = 'Q1';
          } else if (qq <= 6) {
            qtr = 'Q2';
          } else if (qq <= 9) {
            qtr = 'Q3';
          } else if (qq <= 12) {
            qtr = 'Q4';
          }

          d.unit = unit;
          d.u = u;
          d.cogsSmall = d.cogs / divider;
          d.ebitSmall = d.ebit / divider;
          d.gpSmall = d.gp / divider;
          d.incomeTaxSmall = d.incomeTax / divider;
          d.niSmall = d.ni / divider;
          d.oiSmall = d.oi / divider;
          d.operatingExpenseSmall = d.operatingExpense / divider;
          d.otherIncomeExpenseSmall = d.otherIncomeExpense / divider;
          d.rndSmall = d.rnd / divider;
          d.sgnaSmall = d.sgna / divider;
          d.ieSmall = d.ie / divider;
          d.toeSmall = d.toe / divider;
          d.gaSmall = d.ga / divider;
          d.smSmall = d.sm / divider;
          d.revSmall = d.rev / divider;
          d.revenueGrowthYoy = data[i - 4] ? ((d.rev / data[i - 4].rev - 1) * 100).toFixed(2) : '';
          d.quarterStr = yy + qtr;
          d.gpMargin = parseFloat((d.gp / d.rev * 100).toFixed(2));
          d.oiMargin = parseFloat((d.oi / d.rev * 100).toFixed(2));
          d.ebitMargin = parseFloat((d.ebit / d.rev * 100).toFixed(2));
          d.niMargin = parseFloat((d.ni / d.rev * 100).toFixed(2));
          return d;
        });
      };

      var data = calculateMargins(_lodash["default"].get(profile, "".concat(prop, ".data"), []));
      var unit = _lodash["default"].get(data, '0.unit') || 'million';
      var arr = data.slice(count * -1);
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5
        }
      }, _react["default"].createElement("div", {
        style: {
          color: 'darkred',
          fontWeight: 'bold',
          fontSize: 12,
          marginBottom: 3
        }
      }, profile.ticker, " - ", profile.name, _react["default"].createElement("span", {
        style: {
          marginLeft: 5,
          color: 'green'
        }
      }, "Income Statement")), _react["default"].createElement("table", {
        className: "table table-sm",
        style: {
          marginBottom: 0,
          fontSize: 10
        }
      }, _react["default"].createElement("thead", {
        className: "bold"
      }, _react["default"].createElement("th", {
        className: "left lighter"
      }, "Unit: (", unit, ")"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("th", {
          key: d,
          className: "bg-lightgray-ul-".concat(d)
        }, arr[d] && arr[d].quarterStr);
      })), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "Qtr Revenue"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].revSmall && parseFloat(arr[d].revSmall).toFixed(2));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold crimson"
      }, "Rev Growth yoy"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " ").concat(greenOrRed(arr[d] && arr[d].revenueGrowthYoy, 40, -20))
        }, arr[d] && arr[d].revenueGrowthYoy + ' %');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "Cost of Revenue"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].cogsSmall && parseFloat(arr[d].cogsSmall).toFixed(2));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "Gross Profit"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].gpSmall && parseFloat(arr[d].gpSmall).toFixed(2));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold crimson"
      }, "Gross Profit Mgn"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " ").concat(greenOrRed(arr[d] && arr[d].gpMargin, 40, 0))
        }, arr[d] && arr[d].gpMargin + ' %');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "R & D"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].rndSmall && parseFloat(arr[d].rndSmall).toFixed(2));
      })), _lodash["default"].get(arr, '0.sm') !== undefined && _lodash["default"].get(arr, '0.ga') !== undefined ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "S & M"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].smSmall >= 0 && parseFloat(arr[d].smSmall).toFixed(2));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "G & A"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].gaSmall >= 0 && parseFloat(arr[d].gaSmall).toFixed(2));
      }))) : _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "SG & A"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d)
        }, arr[d] && arr[d].sgnaSmall && parseFloat(arr[d].sgnaSmall).toFixed(2));
      })), _lodash["default"].get(arr, '0.ie') !== undefined ? _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: ""
      }, "Interest Expense"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].ieSmall >= 0 && parseFloat(arr[d].ieSmall).toFixed(2));
      })) : null, _lodash["default"].get(arr, '0.toe') !== undefined ? _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: ""
      }, "Operating Expense"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].toeSmall >= 0 && parseFloat(arr[d].toeSmall).toFixed(2));
      })) : null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: ""
      }, "Operating Income"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].oiSmall && parseFloat(arr[d].oiSmall).toFixed(2));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold crimson"
      }, "Operating Mgn"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " ").concat(greenOrRed(arr[d] && arr[d].oiMargin, 20, 0))
        }, arr[d] && arr[d].oiMargin + ' %');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: ""
      }, "Net Income"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " lighter")
        }, arr[d] && arr[d].niSmall && parseFloat(arr[d].niSmall).toFixed(2));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold crimson"
      }, "Net Income Mgn"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " ").concat(greenOrRed(arr[d] && arr[d].niMargin, 20, -20))
        }, arr[d] && arr[d].niMargin + ' %');
      })))), _react["default"].createElement("div", {
        style: {
          fontSize: 12,
          color: 'gray'
        }
      }, "Generated by ", _react["default"].createElement("span", {
        style: {
          color: 'darkred'
        }
      }, "@earningsfly"), " with ", _react["default"].createElement("span", {
        style: {
          fontSize: 16,
          color: 'red'
        }
      }, "\uD83D\uDE80")));
    }
  }]);

  return IncomeTable;
}(_react["default"].Component);

exports.IncomeTable = IncomeTable;
var _default = IncomeTable;
exports["default"] = _default;