import React from 'react';
import PropTypes from 'prop-types';
import './FrequencyChart.css';

export default function FrequencyChart({ rows, pxWidth = 3, barColor = 'blue' }) {
  return (
    <div className="Component FrequencyChart">
      {rows.map((row, i) => (
        <div className="freq-row" key={i}>
          <span className="freq-symbol" style={{ fontFamily: row.symbolFont }}>
            {row.symbol}
          </span>
          <span className="freq-count">{row.count}</span>
          <span className="freq-percent">({(row.percent * 100).toFixed(0)}%)</span>
          <span className="freq-bars">
            {row.bars.map((bar, j) => (
              <span
                className="freq-bar"
                key={j}
                title={bar.label}
                style={{
                  backgroundColor: bar.color || barColor,
                  width: bar.width * pxWidth + 'px',
                }}
              />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

FrequencyChart.propTypes = {
  rows: PropTypes.array,
  pxWidth: PropTypes.number,
  barColor: PropTypes.string,
};
