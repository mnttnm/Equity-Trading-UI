import React, { useEffect, useContext, useCallback, useRef } from "react";
import Stock from "../components/Stock";
import { getStocks } from "../api/api";
import { STOCK_ENTRY_TYPE } from "../constants";
import StockExchangeContext from "../context/StockExchangeContext";

const StockList = ({ refreshFrequency, disableTimer }) => {
  const {stockListInfo, dispatch } = useContext(StockExchangeContext);

  const getStocksFn = useCallback(async () => {
    dispatch({ type: "FETCH_STOCKS", payload:null});
    const res = await getStocks(true);
    if (res.success) {
      dispatch({ type: "UPDATE_STOCKS", payload: res.data });
    } else {
      dispatch({ type: "FETCH_FAILED", payload:null });
    }
  }, [dispatch]);

  const intervalID = useRef();

  useEffect(() => {
    if (disableTimer) {
      clearInterval(intervalID.current);
    } else {
      getStocksFn();
      intervalID.current = setInterval(() => {
        getStocksFn();
      }, refreshFrequency);
    }
    return () => {
      clearInterval(intervalID.current);
    };
  }, [getStocksFn, disableTimer, refreshFrequency]);

  return (
    <>
      <h2 className={`stocklist-heading`}>StockList</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="instrument">Instrument</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stockListInfo.stocks &&
            stockListInfo.stocks.map(stockInfo => (
              <Stock
                key={stockInfo.id}
                stock={stockInfo}
                entryType={STOCK_ENTRY_TYPE.STOCK_LIST}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default StockList;
