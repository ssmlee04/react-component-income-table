import React from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './../index.css';

export class IncomeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { profile, prop = 'income_and_revenue', imgProp = 'income_table', count = 4, isSmall, theme = 'light' } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 12 }}>Not available at this time... </div>
      );
    }
    const greenOrRed = (str, high, low) => {
      return '';
    };

    const calculateMargins = (data) => {
      let divider = 1000;
      let unit = 'thousand';
      let u = 'K';
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
      data = data.filter(d => d.reportDate);
      data = data.map(d => {
        d.reportDate = d.reportDate.replace(/-/g, '').slice(0, 6);
        return d;
      });
      data = _.sortBy(data, (d) => {
        return d.reportDate;
      });

      return data.map((d, i) => {
        const qq = ~~d.reportDate.slice(4, 6);
        let yy = d.reportDate.slice(0, 4);
        let qtr;
        if (qq <= 3) {
          qtr = 'Q1';
        }
        else if (qq <= 6) {
          qtr = 'Q2';
        }
        else if (qq <= 9) {
          qtr = 'Q3';
        }
        else if (qq <= 12) {
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

    const data = calculateMargins(_.get(profile, `${prop}.data`, []));
    const unit = _.get(data, '0.unit') || 'million';
    const currency = _.get(data, '0.currency') || 'USD';
    const arr = data.slice(count * -1);

    return (
      <div style={{ width: '100%', padding: 5 }} className={`theme-black-${theme}`}>
        <div className={`theme-darkred-${theme} mb-2`} style={{ fontWeight: 'bold' }}>{profile.ticker} - {profile.name}&nbsp;<span className={`theme-green-${theme}`}>Income Statement</span></div>
        <table className='table table-sm' style={{ marginBottom: 0, fontSize: 10 }}>
          <thead>
            <tr>
              <th className='bold align-left pl-0'>Unit: {unit} {currency}</th>
              {_.range(count).map(d => <th key={d} className={`bold align-right bg-lightgray-ul-${d} hov pr-0`}>{arr[d] && arr[d].quarterStr}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='align-left bold' colSpan={count + 1} style={{ borderTop: '1px solid crimson', borderBottom: '1px solid crimson' }}>Revenue</td>
            </tr>
            <tr>
              <td className='align-left bold'>Total Revenue</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].revSmall && `$${parseFloat(arr[d].revSmall).toFixed(2)}`}</td>)}
            </tr>
            <tr>
              <td className={`align-left bold theme-green-${theme}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Revenue Growth Rate (yoy)</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov ${greenOrRed(arr[d] && arr[d].revenueGrowthYoY, 40, -20)}`}>{arr[d] && arr[d].revenueGrowthYoY + '%'}</td>)}
            </tr>
            <tr>
              <td className={`align-left bold theme-lightblue-${theme}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Revenue Growth Rate (qoq)</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov ${greenOrRed(arr[d] && arr[d].revenueGrowthQoQ, 10, -10)}`}>{arr[d] && arr[d].revenueGrowthQoQ + '%'}</td>)}
            </tr>
            <tr>
              <td className='align-left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cost of Revenue</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].cogsSmall && `$${parseFloat(arr[d].cogsSmall).toFixed(2)}`}</td>)}
            </tr>
            <tr>
              <td className='align-left bold'>Gross Profit</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].gpSmall && `$${parseFloat(arr[d].gpSmall).toFixed(2)}`}</td>)}
            </tr>
            <tr>
              <td className={`align-left bold theme-green-${theme}`}>Gross Margin</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov ${greenOrRed(arr[d] && arr[d].gpMargin, 40, 0)}`}>{arr[d] && arr[d].gpMargin + '%'}</td>)}
            </tr>
            <tr>
              <td className='align-left bold' colSpan={count + 1} style={{ borderTop: '1px solid crimson', borderBottom: '1px solid crimson' }}>Operating</td>
            </tr>
            <tr>
              <td className='align-left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isSmall ? 'R & D' : 'Research and Development'}</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].rndSmall && `$${parseFloat(arr[d].rndSmall).toFixed(2)}`}</td>)}
            </tr>
            <tr>
              <td className={`align-left bold theme-lightblue-${theme}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R&D Growth Rate (qoq)</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].rndGrowthQoQ && `${arr[d].rndGrowthQoQ} %`}</td>)}
            </tr>
            {_.get(arr, '0.sm') !== undefined && _.get(arr, '0.ga') !== undefined ? <React.Fragment><tr>
              <td className='align-left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isSmall ? 'S & M' : 'Selling & Marketing Expense'}</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].smSmall > 0 ? `$${parseFloat(arr[d].smSmall).toFixed(2)}` : ''}</td>)}
            </tr><tr>
              <td className={`align-left bold theme-lightblue-${theme}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S&M Growth Rate (qoq)</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].smGrowthQoQ && `${arr[d].smGrowthQoQ} %`}</td>)}
            </tr><tr>
              <td className='align-left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isSmall ? 'G & A' : 'General & Administrative Expense'}</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].gaSmall > 0 ? `$${parseFloat(arr[d].gaSmall).toFixed(2)}` : ''}</td>)}
            </tr><tr>
              <td className={`align-left bold theme-lightblue-${theme}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;G&A Growth Rate (qoq)</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].gaGrowthQoQ && `${arr[d].gaGrowthQoQ} %`}</td>)}
            </tr></React.Fragment> :
            <React.Fragment><tr>
              <td className='align-left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isSmall ? 'SG & A' : 'Selling, General & Administrative Expense'}</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].sgnaSmall && `$${parseFloat(arr[d].sgnaSmall).toFixed(2)}`}</td>)}
            </tr>
            <tr>
              <td className={`align-left bold theme-lightblue-${theme}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SG & A Growth Rate (qoq)</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].sgnaGrowthQoQ && `${arr[d].sgnaGrowthQoQ} %`}</td>)}
            </tr></React.Fragment>}
            {_.get(arr, '0.ie') !== undefined ? <tr>
              <td className='align-left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Interest Expense</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].ieSmall > 0 ? `$${parseFloat(arr[d].ieSmall).toFixed(2)}` : ''}</td>)}
            </tr> : null}
            {_.get(arr, '0.toe') !== undefined ? <tr>
              <td className='align-left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Operating Expense</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].toeSmall > 0 ? `$${parseFloat(arr[d].toeSmall).toFixed(2)}` : ''}</td>)}
            </tr> : null}
            <tr>
              <td className='align-left bold'>Operating Income</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].oiSmall && `$${parseFloat(arr[d].oiSmall).toFixed(2)}`}</td>)}
            </tr>
            <tr>
              <td className={`align-left bold theme-green-${theme}`}>Operating Margin</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov ${greenOrRed(arr[d] && arr[d].oiMargin, 20, 0)}`}>{arr[d] && arr[d].oiMargin + '%'}</td>)}
            </tr>
            <tr>
              <td className='align-left bold' colSpan={count + 1} style={{ borderTop: '1px solid crimson', borderBottom: '1px solid crimson' }}>Income</td>
            </tr>
            <tr>
              <td className='align-left bold'>Net Income</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].niSmall && `$${parseFloat(arr[d].niSmall).toFixed(2)}`}</td>)}
            </tr>
            <tr>
              <td className={`align-left bold theme-green-${theme}`}>Net Profit Margin</td>
              {_.range(count).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov ${greenOrRed(arr[d] && arr[d].niMargin, 20, -20)}`}>{arr[d] && arr[d].niMargin + '%'}</td>)}
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 12, padding: 5, paddingTop: 5 }}>Crafted by <a href='https://twitter.com/tradeideashq' target='_blank' className={`theme-darkred-${theme}`}>@tradeideashq</a> with <span style={{ fontSize: 16, color: 'red' }}>💡</span></div>
      </div>
    );
  }
}

export default IncomeTable;
