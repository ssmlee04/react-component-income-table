"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.IncomeTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactCopyToClipboard = require("react-copy-to-clipboard");

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
    key: "render",
    value: function render() {
      var _this$props = this.props,
          profile = _this$props.profile,
          _this$props$prop = _this$props.prop,
          prop = _this$props$prop === void 0 ? 'income_and_revenue' : _this$props$prop,
          _this$props$imgProp = _this$props.imgProp,
          imgProp = _this$props$imgProp === void 0 ? 'income_table' : _this$props$imgProp,
          _this$props$count = _this$props.count,
          count = _this$props$count === void 0 ? 4 : _this$props$count,
          isSmall = _this$props.isSmall,
          _this$props$theme = _this$props.theme,
          theme = _this$props$theme === void 0 ? 'light' : _this$props$theme;
      var copied = this.state.copied;

      if (!profile) {
        return _react["default"].createElement("div", {
          style: {
            fontSize: 12
          }
        }, "Not available at this time... ");
      }

      var greenOrRed = function greenOrRed(str, high, low) {
        return '';
      };

      var calculateMargins = function calculateMargins(data) {
        var divider = 1000;
        var unit = 'thousand';
        var u = 'K';
        if (!data || !data.length) return data;

        if (data[data.length - 1].rev > 2000000) {
          divider = 1000000;
          unit = 'milllion';
          u = 'M';
        }

        if (data[data.length - 1].rev > 2000000000) {
          divider = 1000000000;
          unit = 'billion';
          u = 'B';
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
          d.revenueGrowthYoY = data[i - 4] ? ((d.rev / data[i - 4].rev - 1) * 100).toFixed(2) : '';
          d.revenueGrowthQoQ = data[i - 1] ? ((d.rev / data[i - 1].rev - 1) * 100).toFixed(2) : '';
          d.rndGrowthQoQ = d.rnd && data[i - 1] ? ((d.rnd / data[i - 1].rnd - 1) * 100).toFixed(2) : '';
          d.sgnaGrowthQoQ = d.sgna && data[i - 1] ? ((d.sgna / data[i - 1].sgna - 1) * 100).toFixed(2) : '';
          d.gaGrowthQoQ = d.ga && data[i - 1] ? ((d.ga / data[i - 1].ga - 1) * 100).toFixed(2) : '';
          d.smGrowthQoQ = d.sm && data[i - 1] ? ((d.sm / data[i - 1].sm - 1) * 100).toFixed(2) : '';
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
      var currency = _lodash["default"].get(data, '0.currency') || 'USD';
      var arr = data.slice(count * -1);
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5
        },
        className: "theme-black-".concat(theme)
      }, _react["default"].createElement("div", {
        className: "theme-darkred-".concat(theme, " mb-2"),
        style: {
          fontWeight: 'bold'
        }
      }, profile.ticker, " - ", profile.name, "\xA0", _react["default"].createElement("span", {
        className: "theme-green-".concat(theme)
      }, "Income Statement")), _react["default"].createElement("table", {
        className: "table table-sm",
        style: {
          marginBottom: 0,
          fontSize: 10
        }
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        className: "bold align-left pl-0"
      }, "Unit: ", unit, " ", currency), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("th", {
          key: d,
          className: "bold align-right bg-lightgray-ul-".concat(d, " hov pr-0")
        }, arr[d] && arr[d].quarterStr);
      }))), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold",
        colSpan: count + 1,
        style: {
          borderTop: '1px solid crimson',
          borderBottom: '1px solid crimson'
        }
      }, "Revenue")), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold"
      }, "Total Revenue"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].revSmall && "$".concat(parseFloat(arr[d].revSmall).toFixed(2)));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-green-".concat(theme)
      }, "\xA0\xA0\xA0\xA0\xA0\xA0Revenue Growth Rate (yoy)"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov ").concat(greenOrRed(arr[d] && arr[d].revenueGrowthYoY, 40, -20))
        }, arr[d] && arr[d].revenueGrowthYoY + '%');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-lightblue-".concat(theme)
      }, "\xA0\xA0\xA0\xA0\xA0\xA0Revenue Growth Rate (qoq)"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov ").concat(greenOrRed(arr[d] && arr[d].revenueGrowthQoQ, 10, -10))
        }, arr[d] && arr[d].revenueGrowthQoQ + '%');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left"
      }, "\xA0\xA0\xA0\xA0\xA0\xA0Cost of Revenue"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].cogsSmall && "$".concat(parseFloat(arr[d].cogsSmall).toFixed(2)));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold"
      }, "Gross Profit"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].gpSmall && "$".concat(parseFloat(arr[d].gpSmall).toFixed(2)));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-green-".concat(theme)
      }, "Gross Margin"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov ").concat(greenOrRed(arr[d] && arr[d].gpMargin, 40, 0))
        }, arr[d] && arr[d].gpMargin + '%');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold",
        colSpan: count + 1,
        style: {
          borderTop: '1px solid crimson',
          borderBottom: '1px solid crimson'
        }
      }, "Operating")), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left"
      }, "\xA0\xA0\xA0\xA0\xA0\xA0", isSmall ? 'R & D' : 'Research and Development'), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].rndSmall && "$".concat(parseFloat(arr[d].rndSmall).toFixed(2)));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-lightblue-".concat(theme)
      }, "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0R&D Growth Rate (qoq)"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].rndGrowthQoQ && "".concat(arr[d].rndGrowthQoQ, " %"));
      })), _lodash["default"].get(arr, '0.sm') !== undefined && _lodash["default"].get(arr, '0.ga') !== undefined ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left"
      }, "\xA0\xA0\xA0\xA0\xA0\xA0", isSmall ? 'S & M' : 'Selling & Marketing Expense'), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].smSmall > 0 ? "$".concat(parseFloat(arr[d].smSmall).toFixed(2)) : '');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-lightblue-".concat(theme)
      }, "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0S&M Growth Rate (qoq)"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].smGrowthQoQ && "".concat(arr[d].smGrowthQoQ, " %"));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left"
      }, "\xA0\xA0\xA0\xA0\xA0\xA0", isSmall ? 'G & A' : 'General & Administrative Expense'), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].gaSmall > 0 ? "$".concat(parseFloat(arr[d].gaSmall).toFixed(2)) : '');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-lightblue-".concat(theme)
      }, "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0G&A Growth Rate (qoq)"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].gaGrowthQoQ && "".concat(arr[d].gaGrowthQoQ, " %"));
      }))) : _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left"
      }, "\xA0\xA0\xA0\xA0\xA0\xA0", isSmall ? 'SG & A' : 'Selling, General & Administrative Expense'), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].sgnaSmall && "$".concat(parseFloat(arr[d].sgnaSmall).toFixed(2)));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-lightblue-".concat(theme)
      }, "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0SG & A Growth Rate (qoq)"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].sgnaGrowthQoQ && "".concat(arr[d].sgnaGrowthQoQ, " %"));
      }))), _lodash["default"].get(arr, '0.ie') !== undefined ? _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left"
      }, "\xA0\xA0\xA0\xA0\xA0\xA0Interest Expense"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].ieSmall > 0 ? "$".concat(parseFloat(arr[d].ieSmall).toFixed(2)) : '');
      })) : null, _lodash["default"].get(arr, '0.toe') !== undefined ? _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left"
      }, "\xA0\xA0\xA0\xA0\xA0\xA0Operating Expense"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].toeSmall > 0 ? "$".concat(parseFloat(arr[d].toeSmall).toFixed(2)) : '');
      })) : null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold"
      }, "Operating Income"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].oiSmall && "$".concat(parseFloat(arr[d].oiSmall).toFixed(2)));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-green-".concat(theme)
      }, "Operating Margin"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov ").concat(greenOrRed(arr[d] && arr[d].oiMargin, 20, 0))
        }, arr[d] && arr[d].oiMargin + '%');
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold",
        colSpan: count + 1,
        style: {
          borderTop: '1px solid crimson',
          borderBottom: '1px solid crimson'
        }
      }, "Income")), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold"
      }, "Net Income"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].niSmall && "$".concat(parseFloat(arr[d].niSmall).toFixed(2)));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "align-left bold theme-green-".concat(theme)
      }, "Net Profit Margin"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov ").concat(greenOrRed(arr[d] && arr[d].niMargin, 20, -20))
        }, arr[d] && arr[d].niMargin + '%');
      })))), _react["default"].createElement("div", {
        style: {
          fontSize: 12,
          padding: 5,
          paddingTop: 5
        }
      }, "Crafted by ", _react["default"].createElement("a", {
        href: "https://twitter.com/tradeideashq",
        target: "_blank",
        className: "theme-darkred-".concat(theme)
      }, "@tradeideashq"), " with ", _react["default"].createElement("span", {
        style: {
          fontSize: 16,
          color: 'red'
        }
      }, "\uD83D\uDCA1")));
    }
  }]);

  return IncomeTable;
}(_react["default"].Component);

exports.IncomeTable = IncomeTable;
var _default = IncomeTable;
exports["default"] = _default;