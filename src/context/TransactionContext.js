import React, { useState } from 'react';

const TransactionContext = React.createContext();

export const TransactionContextProvider = ({ children }) => {
  const initialState = {
    entities: [],
    type: "",
  };

  const [transactionInitiated, setTransactionInitiated] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState(initialState);

  function onTransaction(type, stock) {
    console.log("Transaction type: ", type);
    if (transactionInfo.entities.length > 0) {
      if (transactionInfo.type !== type) {
        console.log(
          `transaction type: ` +
            type +
            ` doesn't match with the current cart type: ` +
            transactionInfo.type
        );
        alert(
          `transaction type: ` +
            type +
            ` doesn't match with the current cart type: ` +
            transactionInfo.type
        );
        return;
      } else {
        // if the stock already exist in the cart and transaction is of same type,
        // focus the input-box
        const isScriptPresent = transactionInfo.entities.filter(
          script => script.id === stock.id
        );
        if (isScriptPresent.length > 0) {
          console.log(
            `Stock already in the cart, modify the transaction in the cart`
          );
          const currentEntry = document.querySelector(
            `input[name='${stock.id}']`
          );
          currentEntry.focus();
        } else {
          let updatedTransactionInfo = {};
          updatedTransactionInfo["entities"] = [
            ...transactionInfo.entities,
            { id: stock.id, type: type, units: 0 }
          ];
          updatedTransactionInfo["type"] = type;
          setTransactionInfo(updatedTransactionInfo);
        }
      }
    } else {
      let updatedTransactionInfo = {};
      updatedTransactionInfo["entities"] = [
        ...transactionInfo.entities,
        { id: stock.id, type: type, units: 0}
      ];
      updatedTransactionInfo["type"] = type;
      setTransactionInfo(updatedTransactionInfo);
    }
    setTransactionInitiated(true);
  }

  function resetTransactionInfo() {
    setTransactionInfo(initialState);
  }

  return (
    <TransactionContext.Provider value={{ transactionInitiated, transactionInfo, setTransactionInitiated, setTransactionInfo, onTransaction, resetTransactionInfo }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;