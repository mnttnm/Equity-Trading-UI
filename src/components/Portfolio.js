import React from "react";
import Stock from "../components/Stock";
import {STOCK_ENTRY_TYPE} from '../constants';

const Portfolio = props => {
  const shares = props.userPortfolio.buys ? props.userPortfolio.buys : [];
  return (
    <div className="portfolio-box">
      <h2 className="portfolio-heading">Portfolio Stocks</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="instrument">Instrument</th>
            <th>Name</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {shares.map(stockInfo =>
            <Stock key={stockInfo.id} stock={stockInfo} entryType={STOCK_ENTRY_TYPE.PORTFOLIO}/>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
