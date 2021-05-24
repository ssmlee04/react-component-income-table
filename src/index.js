import React from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './../index.css';

const greenOrRed = (str, high, low) => {
  const v = parseFloat(str);
  if (v > high) return 'green';
  if (v < low) return 'red';
};

export class IncomeTable extends React.Component {
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
    const { profile, prop = 'income_and_revenue', imgProp = 'income_table', count = 4 } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 12 }}>Not available at this time... </div>
      );
    }
    if (profile[imgProp] && profile[imgProp].url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} income statement table condensed`} src={profile[imgProp].url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile[imgProp].url || ''}
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
        d.revenueGrowthYoy = data[i - 4] ? ((d.rev / data[i - 4].rev - 1) * 100).toFixed(2) : '';
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
    const arr = data.slice(count * -1);

    return (
      <div style={{ width: '100%', padding: 5 }}>
        <div style={{ color: 'darkred', fontWeight: 'bold', fontSize: 12, marginBottom: 3 }}>{profile.ticker} - {profile.name}<span style={{ marginLeft: 5, color: 'green' }}>Income Statement</span></div>
        <table className='table table-sm' style={{ marginBottom: 0, fontSize: 10 }}>
          <thead className='bold'>
            <th className='left lighter'>Unit: ({unit})</th>
            {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d}`}>{arr[d] && arr[d].quarterStr}</th>)}
          </thead>
          <tbody>
            <tr>
              <td className='bold'>Qtr Revenue</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].revSmall && parseFloat(arr[d].revSmall).toFixed(2)}</th>)}
            </tr>
            <tr>
              <td className='bold crimson'>Rev Growth yoy</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} ${greenOrRed(arr[d] && arr[d].revenueGrowthYoy, 40, -20)}`}>{arr[d] && arr[d].revenueGrowthYoy + ' %'}</th>)}
            </tr>
            <tr>
              <td className='bold'>Cost of Revenue</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].cogsSmall && parseFloat(arr[d].cogsSmall).toFixed(2)}</th>)}
            </tr>
            <tr>
              <td className='bold'>Gross Profit</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].gpSmall && parseFloat(arr[d].gpSmall).toFixed(2)}</th>)}
            </tr>
            <tr>
              <td className='bold crimson'>Gross Profit Mgn</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} ${greenOrRed(arr[d] && arr[d].gpMargin, 40, 0)}`}>{arr[d] && arr[d].gpMargin + ' %'}</th>)}
            </tr>
            <tr>
              <td className='bold'>R & D</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].rndSmall && parseFloat(arr[d].rndSmall).toFixed(2)}</th>)}
            </tr>
            {_.get(arr, '0.sm') !== undefined && _.get(arr, '0.ga') !== undefined ? <React.Fragment><tr>
              <td className='bold'>S & M</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].smSmall >= 0 && parseFloat(arr[d].smSmall).toFixed(2)}</th>)}
            </tr><tr>
              <td className='bold'>G & A</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].gaSmall >= 0 && parseFloat(arr[d].gaSmall).toFixed(2)}</th>)}
            </tr></React.Fragment> :
            <tr>
              <td className='bold'>SG & A</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d}`}>{arr[d] && arr[d].sgnaSmall && parseFloat(arr[d].sgnaSmall).toFixed(2)}</th>)}
            </tr>}
            {_.get(arr, '0.ie') !== undefined ? <tr>
              <td className=''>Interest Expense</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].ieSmall >= 0 && parseFloat(arr[d].ieSmall).toFixed(2)}</th>)}
            </tr> : null}
            {_.get(arr, '0.toe') !== undefined ? <tr>
              <td className=''>Operating Expense</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].toeSmall >= 0 && parseFloat(arr[d].toeSmall).toFixed(2)}</th>)}
            </tr> : null}
            <tr>
              <td className=''>Operating Income</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].oiSmall && parseFloat(arr[d].oiSmall).toFixed(2)}</th>)}
            </tr>
            <tr>
              <td className='bold crimson'>Operating Mgn</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} ${greenOrRed(arr[d] && arr[d].oiMargin, 20, 0)}`}>{arr[d] && arr[d].oiMargin + ' %'}</th>)}
            </tr>
            <tr>
              <td className=''>Net Income</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} lighter`}>{arr[d] && arr[d].niSmall && parseFloat(arr[d].niSmall).toFixed(2)}</th>)}
            </tr>
            <tr>
              <td className='bold crimson'>Net Income Mgn</td>
              {_.range(count).map(d => <th key={d} className={`bg-lightgray-ul-${d} ${greenOrRed(arr[d] && arr[d].niMargin, 20, -20)}`}>{arr[d] && arr[d].niMargin + ' %'}</th>)}
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 12, color: 'gray' }}>Generated by <span style={{ color: 'darkred' }}>@earningsfly</span> with <span style={{ fontSize: 16, color: 'red' }}>🚀</span></div>
      </div>
    );
  }
}

export default IncomeTable;
