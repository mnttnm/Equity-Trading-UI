import React, { useEffect, useState, useCallback } from "react";
import { CircularProgress, Button } from "@material-ui/core";
import { getUserPortfolio } from "../api/api";
import { STOCK_ENTRY_TYPE, PORTFOLIO_STATE } from "../constants";
import Stock from "../components/Stock";
import UserBook from "../components/UserBook";

/* Portfolio Components
   Contains information about available cash with users
   and stocks in user's portfolio
*/
const Portfolio = ({ isPortfolioChanged, userID, onPortfolioUpdate }) => {
  const [userPortfolio, setUserPortfolio] = useState();
  const [portfolioState, setPortfolioState] = useState(
    PORTFOLIO_STATE.UNINITIALIZED
  );

  const getPortfolioFn = useCallback(async () => {
    setPortfolioState(PORTFOLIO_STATE.LOADING);
    const res = await getUserPortfolio(userID, true);
    if (res.success) {
      setPortfolioState(PORTFOLIO_STATE.UPDATED);
      onPortfolioUpdate(PORTFOLIO_STATE.UPDATED);
      setUserPortfolio(res.data);
    } else if (userPortfolio) {
      setPortfolioState(PORTFOLIO_STATE.STALE);
    } else {
      setPortfolioState(PORTFOLIO_STATE.UNINITIALIZED);
    }
  }, [userID]);

  useEffect(() => {
    getPortfolioFn();
  }, [isPortfolioChanged, getPortfolioFn]);

  const updatePortfolio = () => {
    getPortfolioFn();
  }

  const shares = userPortfolio && userPortfolio.buys ? userPortfolio.buys : [];
  switch (portfolioState) {
    case PORTFOLIO_STATE.UNINITIALIZED:
      return (
        <div>
          <span>Portfolio details not updated properly</span>
          <Button variant="contained" color="primary" onClick={updatePortfolio}>
            Update
          </Button>
        </div>
      );
    case PORTFOLIO_STATE.LOADING:
      return <CircularProgress />;
    case PORTFOLIO_STATE.STALE:
      return (
        <div>
          <span>Portfolio details not updated properly</span>
          <Button variant="contained" color="primary" onClick={updatePortfolio}>
            Update
          </Button>
        </div>
      );
    case PORTFOLIO_STATE.UPDATED:
      return (
        <>
          <UserBook userBalance={userPortfolio && userPortfolio.cash} />
          <div className="portfolio-box">
            <h2 className="portfolio-heading">Holdings</h2>
            {shares.length > 0 ? (
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
            ) : (
              <>
                <span> You don't have any stock in your Portfolio!</span>
              </>
            )}
          </div>
        </>
      );
    default:
      return null;
  }
};

export default Portfolio;
