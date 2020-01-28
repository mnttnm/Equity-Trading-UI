import React, { useReducer } from 'react';

const StockExchangeContext = React.createContext();

const stockListReducer = (state, action) => {
    switch (action.type) {
        case 'GET_STOCKS':
            return state;
        case 'UPDATE_STOCK_LIST':
            return [...state, ...action.payload];
        case 'RESET_STOCK_LISt':
            break;
        default:
            throw new Error();
    }
}

export const StockExchangeContextProvider = ({ children }) => {
  const [stocks, dispatch] = useReducer(stockListReducer, []);
  return (
    <StockExchangeContext.Provider value={{stocks, dispatch}}>
      {children}
    </StockExchangeContext.Provider>
  );
};

export default StockExchangeContext;