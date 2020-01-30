import React, { useEffect, useState, useCallback } from "react";
import Stock from "../components/Stock";
import UserBook from "../components/UserBook";
import { STOCK_ENTRY_TYPE } from "../constants";
import { getUserPortfolio } from "../api/api";

const RefreshButton = ({onPressHandler})=>{
  return (
    <button onClick={onPressHandler}>Refresh</button>
  )
}

const Portfolio = props => {
  const { isPortfolioChanged, userID } = props;
  const [userPortfolio, setUserPortfolio] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);

  const getPortfolioFn = useCallback(async () => {
    const res = await getUserPortfolio(userID, true);
    if (res.success) {
      setUserPortfolio(res.data);
      setIsSuccessful(true);
    } else {
      setIsSuccessful(false);
    }
  }, [userID]);

  useEffect(() => {
    getPortfolioFn();
  }, [isPortfolioChanged, getPortfolioFn]);

  function updatePortfolio(){
    getPortfolioFn();
  };

  const shares = userPortfolio.buys ? userPortfolio.buys : [];

  return isSuccessful ? (
    <>
    <UserBook userBalance={userPortfolio.cash} />
    <div className="portfolio-box">
      <h2 className="portfolio-heading">Portfolio Stocks</h2>
      {userPortfolio.buys && userPortfolio.buys.length > 0 ?
      <table className="table">
        <thead>
          <tr>
            <th className="instrument">Instrument</th>
            <th>Name</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {shares.map(stockInfo => (
            <Stock
              key={stockInfo.id}
              stock={stockInfo}
              entryType={STOCK_ENTRY_TYPE.PORTFOLIO}
            />
          ))}
        </tbody>
      </table>
      :<><span> Empty Portfolio!</span>
       <RefreshButton onPressHandler={()=>updatePortfolio()}/>
       </>
      }
    </div>
    </>
  ) : <div><span>Portfolio details not updated </span> <button onClick={updatePortfolio}>Click to Update</button></div>;
};

export default Portfolio;
