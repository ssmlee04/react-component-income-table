import React from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './../index.css';

const greenOrRed = (str, high, low) => {
  const v = parseFloat(str);
  if (v > high) return 'green';
  if (v < low) return 'red';
};

export class Analyst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { profile } = this.props;
    if (!profile) return true;
    if (nextState.copied) return true;
    if (profile.ticker !== nextProps.profile.ticker) return true;
    return false;
  }

  render() {
    const { profile } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 12 }}>Not available at this time... </div>
      );
    }
    if (profile.income_table && profile.income_table.url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-10' : 'react-components-show-url btn btn-sm btn-warning font-10';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} income statement table condensed`} src={profile.income_table.url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile.income_table.url || ''}
            onCopy={() => this.setState({ copied: true })}
          >
            <button className={btnClass} value={btnText}>{btnText}</button>
          </CopyToClipboard>
        </div>
      );
    }

    const calculateMargins = (data) => {
      let divider = 1000;
      let unit = 'thousand';
      let u = 'k';
      if (!data || !data.length) return data;
      if (data[0].rev > 10000000) {
        divider = 1000000;
        unit = 'milllion';
        u = 'm';
      }
      if (data[0].rev > 10000000000) {
        divider = 1000000000;
        unit = 'billion';
        u = 'b';
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

    const data = calculateMargins(_.get(profile, 'income_and_revenue.data', []));
    const unit = _.get(data, '0.unit') || 'million';
    const arr = data.slice(-4);

    return (
      <div style={{ width: '100%', padding: 5, fontSize: 12 }}>
        <div style={{ color: 'darkred', fontWeight: 'bold', fontSize: 14, marginBottom: 3 }}>{profile.ticker} - {profile.name}<span style={{ marginLeft: 5, color: 'green' }}>Income Statement</span></div>
        <table className='table table-sm'>
          <thead className='bold'>
            <th className='left lighter'>Unit: ({unit})</th>
            <th className='bg-lightgray-ultra-5'>{arr[0] && arr[0].quarterStr}</th>
            <th className='bg-lightgray-ultra-4'>{arr[1] && arr[1].quarterStr}</th>
            <th className='bg-lightgray-ultra-3'>{arr[2] && arr[2].quarterStr}</th>
            <th className='bg-lightgray-ultra-2'>{arr[3] && arr[3].quarterStr}</th>
          </thead>
          <tbody>
            <tr>
              <td className='bold'>Qtr Revenue</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].revSmall && parseFloat(arr[0].revSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].revSmall && parseFloat(arr[1].revSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].revSmall && parseFloat(arr[2].revSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].revSmall && parseFloat(arr[3].revSmall).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='bold crimson'>Rev Growth yoy</td>
              <td className={`bg-lightgray-ultra-5 bold ${greenOrRed(arr[0] && arr[0].revenueGrowthYoy, 40, -20)}`}>{arr[0] && arr[0].revenueGrowthYoy + ' %'}</td>
              <td className={`bg-lightgray-ultra-4 bold ${greenOrRed(arr[1] && arr[1].revenueGrowthYoy, 40, -20)}`}>{arr[1] && arr[1].revenueGrowthYoy + ' %'}</td>
              <td className={`bg-lightgray-ultra-3 bold ${greenOrRed(arr[2] && arr[2].revenueGrowthYoy, 40, -20)}`}>{arr[2] && arr[2].revenueGrowthYoy + ' %'}</td>
              <td className={`bg-lightgray-ultra-2 bold ${greenOrRed(arr[3] && arr[3].revenueGrowthYoy, 40, -20)}`}>{arr[3] && arr[3].revenueGrowthYoy + ' %'}</td>
            </tr>
            <tr>
              <td className=''>Cost of Revenue</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].cogsSmall && parseFloat(arr[0].cogsSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].cogsSmall && parseFloat(arr[1].cogsSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].cogsSmall && parseFloat(arr[2].cogsSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].cogsSmall && parseFloat(arr[3].cogsSmall).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='bold'>Gross Profit</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].gpSmall && parseFloat(arr[0].gpSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].gpSmall && parseFloat(arr[1].gpSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].gpSmall && parseFloat(arr[2].gpSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].gpSmall && parseFloat(arr[3].gpSmall).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='bold crimson'>Gross Profit Mgn</td>
              <td className={`bg-lightgray-ultra-5 bold ${greenOrRed(arr[0] && arr[0].gpMargin, 40, 0)}`}>{arr[0] && arr[0].gpMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-4 bold ${greenOrRed(arr[1] && arr[1].gpMargin, 40, 0)}`}>{arr[1] && arr[1].gpMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-3 bold ${greenOrRed(arr[2] && arr[2].gpMargin, 40, 0)}`}>{arr[2] && arr[2].gpMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-2 bold ${greenOrRed(arr[3] && arr[3].gpMargin, 40, 0)}`}>{arr[3] && arr[3].gpMargin + ' %'}</td>
            </tr>
            <tr>
              <td className='bold'>R & D</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].rndSmall && parseFloat(arr[0].rndSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].rndSmall && parseFloat(arr[1].rndSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].rndSmall && parseFloat(arr[2].rndSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].rndSmall && parseFloat(arr[3].rndSmall).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='bold'>SG & A</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].sgnaSmall && parseFloat(arr[0].sgnaSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].sgnaSmall && parseFloat(arr[1].sgnaSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].sgnaSmall && parseFloat(arr[2].sgnaSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].sgnaSmall && parseFloat(arr[3].sgnaSmall).toFixed(2)}</td>
            </tr>
            <tr>
              <td className=''>Operating Income</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].oiSmall && parseFloat(arr[0].oiSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].oiSmall && parseFloat(arr[1].oiSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].oiSmall && parseFloat(arr[2].oiSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].oiSmall && parseFloat(arr[3].oiSmall).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='bold crimson'>Operating Mgn</td>
              <td className={`bg-lightgray-ultra-5 bold ${greenOrRed(arr[0] && arr[0].oiMargin, 20, 0)}`}>{arr[0] && arr[0].oiMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-4 bold ${greenOrRed(arr[1] && arr[1].oiMargin, 20, 0)}`}>{arr[1] && arr[1].oiMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-3 bold ${greenOrRed(arr[2] && arr[2].oiMargin, 20, 0)}`}>{arr[2] && arr[2].oiMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-2 bold ${greenOrRed(arr[3] && arr[3].oiMargin, 20, 0)}`}>{arr[3] && arr[3].oiMargin + ' %'}</td>
            </tr>
            <tr>
              <td className=''>Net Income</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].niSmall && parseFloat(arr[0].niSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].niSmall && parseFloat(arr[1].niSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].niSmall && parseFloat(arr[2].niSmall).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].niSmall && parseFloat(arr[3].niSmall).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='bold crimson'>Net Income Mgn</td>
              <td className={`bg-lightgray-ultra-5 bold ${greenOrRed(arr[0] && arr[0].niMargin, 20, -20)}`}>{arr[0] && arr[0].niMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-4 bold ${greenOrRed(arr[1] && arr[1].niMargin, 20, -20)}`}>{arr[1] && arr[1].niMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-3 bold ${greenOrRed(arr[2] && arr[2].niMargin, 20, -20)}`}>{arr[2] && arr[2].niMargin + ' %'}</td>
              <td className={`bg-lightgray-ultra-2 bold ${greenOrRed(arr[3] && arr[3].niMargin, 20, -20)}`}>{arr[3] && arr[3].niMargin + ' %'}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 12, color: 'gray' }}>Generated by <span style={{ color: 'darkred' }}>@earningsfly</span> with <span style={{ fontSize: 16, color: 'red' }}>❤️</span></div>
      </div>
    );
  }
}

export default Analyst;
