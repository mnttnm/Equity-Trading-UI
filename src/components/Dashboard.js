import React, { useEffect, useState, useContext } from "react";
import Portfolio from "./Portfolio";
import StockList from "./StockList";
import TransactionCart from "./TransactionCart";
import { TransactionContextProvider } from "../context/TransactionContext";
import StockExchangeContext from "../context/StockExchangeContext";
import { TRANSACTION_STATUS } from "../constants";
import RefreshTab from "./RefreshTab";

const DashBoard = ({userID}) => {
  const [stockRefreshFrequency, setStockRequestFrequency] = useState(20000);
  const [disableTimer, toggleDisableTimer] = useState(false);
  const {stockListInfo} = useContext(StockExchangeContext);
  const [isPortfolioChanged, setIsPortfolioChanged] = useState();
  
  // useEffect(() => {
  //   (async () => {
  //     const userInfo = await getUserPortfolio(userID);
  //     if (userInfo) {
  //       setUserPortfolio(userInfo);
  //     }
  //   })();
  // }, [userID]);

  useEffect(() => {
    console.log('onStockListUpdate: ', stockListInfo);
  }, [stockListInfo]);

  function onTransactionStatusChanged(status) {
    console.log("Transaction status: ", status);
    if (status === TRANSACTION_STATUS.SUCCESSFUL) {
      setIsPortfolioChanged(true);
      // (async () => {
      //   const userInfo = await getUserPortfolio(userID, true);
      //   if (userInfo) {
      //     setUserPortfolio(userInfo);
      //   }
      // })();
    }
  }

  function onRefreshIntervalChanged(interval) {
    console.log("refresh interval changed to: ", interval);
    setStockRequestFrequency(interval * 1000);
  }

  function onStockListUpdate(state, status){
  }

  return (
    <>
      <button onClick={() => {
          toggleDisableTimer(!disableTimer);
        }
        }>
        Disable Timer
      </button>
      <RefreshTab onRefreshIntervalChanged={onRefreshIntervalChanged} timerDisabled={disableTimer}/>
      <TransactionContextProvider>
          <StockList
            onStockListUpdate={onStockListUpdate}
            refreshFrequency={stockRefreshFrequency}
            disableTimer={disableTimer}
          />
          <Portfolio userID={userID} isPortfolioChanged={isPortfolioChanged}/>
          <TransactionCart
            onTransactionStatusChanged={onTransactionStatusChanged}
          />
      </TransactionContextProvider>
    </>
  );
};

export default DashBoard;
