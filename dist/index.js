"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Analyst = void 0;

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

var Analyst =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Analyst, _React$Component);

  function Analyst(props) {
    var _this;

    _classCallCheck(this, Analyst);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Analyst).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(Analyst, [{
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

      var profile = this.props.profile;
      var copied = this.state.copied;

      if (!profile) {
        return _react["default"].createElement("div", {
          style: {
            fontSize: 12
          }
        }, "Not available at this time... ");
      }

      if (profile.income_table && profile.income_table.url) {
        var btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-10' : 'react-components-show-url btn btn-sm btn-warning font-10';
        var btnText = copied ? 'Copied' : 'Copy Img';
        return _react["default"].createElement("div", {
          className: "react-components-show-button"
        }, _react["default"].createElement("img", {
          alt: "".concat(profile.ticker, " - ").concat(profile.name, " analyst opinions"),
          src: profile.income_table.url,
          style: {
            width: '100%'
          }
        }), _react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: profile.income_table.url || '',
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
        var divider = 1000000;
        var unit = 'million';
        var u = 'm';
        if (!data || !data.length) return data;

        if (data[0].rev > 1000000000) {
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

      var data = calculateMargins(_lodash["default"].get(profile, 'income_and_revenue.data', []));
      var unit = _lodash["default"].get(data, '0.unit') || 'million';
      var arr = data.slice(-4);
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5,
          fontSize: 12
        }
      }, _react["default"].createElement("div", {
        style: {
          color: 'darkred',
          fontWeight: 'bold'
        }
      }, profile.ticker, " - ", profile.name), _react["default"].createElement("table", {
        className: "table table-sm"
      }, _react["default"].createElement("thead", {
        className: "bold"
      }, _react["default"].createElement("th", {
        className: "left lighter"
      }, "Unit: (", unit, ")"), _react["default"].createElement("th", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].quarterStr), _react["default"].createElement("th", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].quarterStr), _react["default"].createElement("th", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].quarterStr), _react["default"].createElement("th", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].quarterStr)), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "Qtr Revenue"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].revSmall && parseFloat(arr[0].revSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].revSmall && parseFloat(arr[1].revSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].revSmall && parseFloat(arr[2].revSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].revSmall && parseFloat(arr[3].revSmall).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold crimson"
      }, "Rev Growth yoy"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5 bold ".concat(greenOrRed(arr[0] && arr[0].revenueGrowthYoy, 40, -20))
      }, arr[0] && arr[0].revenueGrowthYoy + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4 bold ".concat(greenOrRed(arr[1] && arr[1].revenueGrowthYoy, 40, -20))
      }, arr[1] && arr[1].revenueGrowthYoy + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3 bold ".concat(greenOrRed(arr[2] && arr[2].revenueGrowthYoy, 40, -20))
      }, arr[2] && arr[2].revenueGrowthYoy + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2 bold ".concat(greenOrRed(arr[3] && arr[3].revenueGrowthYoy, 40, -20))
      }, arr[3] && arr[3].revenueGrowthYoy + ' %')), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: ""
      }, "Cost of Revenue"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].cogsSmall && parseFloat(arr[0].cogsSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].cogsSmall && parseFloat(arr[1].cogsSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].cogsSmall && parseFloat(arr[2].cogsSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].cogsSmall && parseFloat(arr[3].cogsSmall).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "Gross Profit"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].gpSmall && parseFloat(arr[0].gpSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].gpSmall && parseFloat(arr[1].gpSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].gpSmall && parseFloat(arr[2].gpSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].gpSmall && parseFloat(arr[3].gpSmall).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold crimson"
      }, "Gross Profit Mgn"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5 bold ".concat(greenOrRed(arr[0] && arr[0].gpMargin, 40, 0))
      }, arr[0] && arr[0].gpMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4 bold ".concat(greenOrRed(arr[1] && arr[1].gpMargin, 40, 0))
      }, arr[1] && arr[1].gpMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3 bold ".concat(greenOrRed(arr[2] && arr[2].gpMargin, 40, 0))
      }, arr[2] && arr[2].gpMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2 bold ".concat(greenOrRed(arr[3] && arr[3].gpMargin, 40, 0))
      }, arr[3] && arr[3].gpMargin + ' %')), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "R & D"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].rndSmall && parseFloat(arr[0].rndSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].rndSmall && parseFloat(arr[1].rndSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].rndSmall && parseFloat(arr[2].rndSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].rndSmall && parseFloat(arr[3].rndSmall).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "SG & A"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].sgnaSmall && parseFloat(arr[0].sgnaSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].sgnaSmall && parseFloat(arr[1].sgnaSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].sgnaSmall && parseFloat(arr[2].sgnaSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].sgnaSmall && parseFloat(arr[3].sgnaSmall).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: ""
      }, "Operating Income"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].oiSmall && parseFloat(arr[0].oiSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].oiSmall && parseFloat(arr[1].oiSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].oiSmall && parseFloat(arr[2].oiSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].oiSmall && parseFloat(arr[3].oiSmall).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold crimson"
      }, "Operating Mgn"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5 bold ".concat(greenOrRed(arr[0] && arr[0].oiMargin, 20, 0))
      }, arr[0] && arr[0].oiMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4 bold ".concat(greenOrRed(arr[1] && arr[1].oiMargin, 20, 0))
      }, arr[1] && arr[1].oiMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3 bold ".concat(greenOrRed(arr[2] && arr[2].oiMargin, 20, 0))
      }, arr[2] && arr[2].oiMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2 bold ".concat(greenOrRed(arr[3] && arr[3].oiMargin, 20, 0))
      }, arr[3] && arr[3].oiMargin + ' %')), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: ""
      }, "Net Income"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].niSmall && parseFloat(arr[0].niSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].niSmall && parseFloat(arr[1].niSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].niSmall && parseFloat(arr[2].niSmall).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].niSmall && parseFloat(arr[3].niSmall).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold crimson"
      }, "Net Income Mgn"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5 bold ".concat(greenOrRed(arr[0] && arr[0].niMargin, 20, -20))
      }, arr[0] && arr[0].niMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4 bold ".concat(greenOrRed(arr[1] && arr[1].niMargin, 20, -20))
      }, arr[1] && arr[1].niMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3 bold ".concat(greenOrRed(arr[2] && arr[2].niMargin, 20, -20))
      }, arr[2] && arr[2].niMargin + ' %'), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2 bold ".concat(greenOrRed(arr[3] && arr[3].niMargin, 20, -20))
      }, arr[3] && arr[3].niMargin + ' %')))));
    }
  }]);

  return Analyst;
}(_react["default"].Component);

exports.Analyst = Analyst;
var _default = Analyst;
exports["default"] = _default;