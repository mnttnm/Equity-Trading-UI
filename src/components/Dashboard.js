import React, { useEffect, useState } from "react";
import Portfolio from "./Portfolio";
import StockList from "./StockList";
import TransactionCart from "./TransactionCart";
import { getUserPortfolio } from "../api/api";
import UserBook from "./UserBook";
import { TransactionContextProvider } from "../context/TransactionContext";
import { StockExchangeContextProvider } from "../context/StockExchangeContext";
import {TRANSACTION_STATUS} from '../constants';

const DashBoard = userID => {
  const [userPortfolio, setUserPortfolio] = useState({});
  useEffect(() => {
    (async () => {
      const userInfo = await getUserPortfolio(userID);
      if (userInfo) {
        setUserPortfolio(userInfo);
      }
    })();
  }, [userID]);

  function onTransactionStatusChanged(status) {
    console.log('Transaction status: ', status);
    if(status === TRANSACTION_STATUS.SUCCESSFUL){
      (async () => {
        const userInfo = await getUserPortfolio(userID, true);
        if (userInfo) {
          setUserPortfolio(userInfo);
        }
      })();
    }
  };

  return (
    <>
      <UserBook userBalance={userPortfolio.cash} />
      <TransactionContextProvider>
        <StockExchangeContextProvider>
          <StockList />
          <Portfolio userPortfolio={userPortfolio} />
          <TransactionCart onTransactionStatusChanged={onTransactionStatusChanged}/>
        </StockExchangeContextProvider>
      </TransactionContextProvider>
    </>
  );
};

export default DashBoard;
