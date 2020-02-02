import React, { useReducer } from "react";
import { STOCKLIST_STATE, STOCKLIST_STATUS } from "../constants";

const StockExchangeContext = React.createContext();

const initialState = {
  stocks: [],
  stockListStatus: STOCKLIST_STATE.STALE,
  status: STOCKLIST_STATUS.UNKNOWN
};

const stockListReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STOCKS":
      return {
        ...state,
        stocks: [...action.payload],
        stockListStatus: STOCKLIST_STATE.LOADED,
        status: STOCKLIST_STATUS.FETCH_SUCCESSFUL
      };
    case "RESET_STOCK_LISt":
      break;
    case "FETCH_STOCKS":
      return {
        ...state,
        stockListStatus: STOCKLIST_STATE.LOADING,
        status: STOCKLIST_STATUS.UNKNOWN
      };
    case "FETCH_FAILED":
      return {
        ...state,
        stockListStatus: STOCKLIST_STATE.STALE,
        status: STOCKLIST_STATUS.FETCH_FAILED
      };
    default:
      throw new Error();
  }
};

export const StockExchangeContextProvider = ({ children }) => {
  const [stockListInfo, dispatch] = useReducer(stockListReducer, initialState);
  return (
    <StockExchangeContext.Provider value={{ stockListInfo, dispatch }}>
      {children}
    </StockExchangeContext.Provider>
  );
};

export default StockExchangeContext;
