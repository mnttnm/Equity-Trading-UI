import React, { useEffect, useContext, useCallback, useRef, useState } from "react";
import { CircularProgress, Container} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { getStocks } from "../api/api";
import { STOCK_ENTRY_TYPE, STOCKLIST_STATE, STOCKLIST_STATUS} from "../constants";
import StockExchangeContext from "../context/StockExchangeContext";
import Stock from "../components/Stock";

/*
  StockList Component
  Responsible for showing up list of the stocks
  Stocklist gets update at the frequency which gets provided externally
*/
const StockList = ({ refreshFrequency, disableTimer, onStockListUpdate }) => {
  const {stockListInfo, dispatch } = useContext(StockExchangeContext);
  const [stockListState, setStockListState] = useState(STOCKLIST_STATE.LOADING);
  const [showAlert, setShowAlert] = useState(false);

  const getStocksFn = useCallback(async (forceUpdate) => {
    dispatch({ type: "FETCH_STOCKS", payload:null});
    onStockListUpdate(STOCKLIST_STATE.LOADING, STOCKLIST_STATUS.UNKNOWN);
    const res = await getStocks(forceUpdate);
    if (res.success) {
      if(res.fromLocalStorage){
        dispatch({ type: "UPDATE_STOCKS", payload: res.data });
        onStockListUpdate(STOCKLIST_STATE.STALE, STOCKLIST_STATUS.FETCHED_LOCALLY);
        setStockListState(STOCKLIST_STATE.STALE);
      } else {
        dispatch({ type: "UPDATE_STOCKS", payload: res.data });
        onStockListUpdate(STOCKLIST_STATE.LOADED, STOCKLIST_STATUS.FETCH_SUCCESSFUL);
        setStockListState(STOCKLIST_STATE.LOADED);
      }
    } else {
      dispatch({ type: "FETCH_FAILED", payload:null });
      onStockListUpdate(STOCKLIST_STATE.UNINITIALIZED, STOCKLIST_STATUS.FETCH_FAILED);
    }
  }, [dispatch, onStockListUpdate]);

  const intervalID = useRef();

  useEffect(() => {
    if (disableTimer) {
      getStocksFn(false);
      clearInterval(intervalID.current);
      setShowAlert(true);
    } else {
      getStocksFn(true);
      intervalID.current = setInterval(() => {
        getStocksFn(true);
      }, refreshFrequency*1000);
    }
    return () => {
      clearInterval(intervalID.current);
    };
  }, [getStocksFn, disableTimer, refreshFrequency]);

  switch(stockListState){
    case STOCKLIST_STATE.LOADING:
      return <CircularProgress/>;
    case STOCKLIST_STATE.STALE:
    case STOCKLIST_STATE.LOADED:
    default:
      return (
      <Container>
      {showAlert && <Alert color="warning" closeText="dismiss" onClose={(e)=>{setShowAlert(false);}}>Live Update disabled, Current prices not updated!</Alert>}
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
    </Container>
      );
  }
};

export default StockList;
