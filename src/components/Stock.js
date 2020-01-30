import React, {useContext, useEffect, useRef, useState} from "react";
import { STOCK_ENTRY_TYPE, TRANSACTION_TYPE } from "../constants";
import TransactionContext from "../context/TransactionContext";

const Stock = ({ stock, entryType }) => {
  const {onTransaction} = useContext(TransactionContext);
  const [behaviour, setBehaviour] = useState("blue")
  function handleStockTransaction(type, stock, units) {
    console.log(
      "transaction initiated for: ",
      stock.id,
      ", type: ",
      type,
      ", units: ",
      units
    );
    onTransaction(type, stock);
  }
  const prevStateRef = useRef();

  useEffect(() => {
    if(prevStateRef.current) {
      console.log('current-value: ', stock.price, ', previous-value: ', prevStateRef.current.price);
      if(stock.price > prevStateRef.current.price){
        setBehaviour("green");
      }
      if(stock.price < prevStateRef.current.price){
        setBehaviour("red");
      }
    }
    prevStateRef.current = stock;
  }, [stock]);

  return (
    <tr className="stock-row">
      {Object.keys(stock).map(key => (
        <td className={`stock-${key} ${behaviour}`} key={`${stock.id}-${stock[key]}`}>{stock[key]}</td>
      ))}
      <td>
        <button
          className="badge btn buy"
          onClick={() => handleStockTransaction(TRANSACTION_TYPE.BUY, stock)}
        >
          {entryType === STOCK_ENTRY_TYPE.PORTFOLIO ? `BUY+` : `Buy`}
        </button>
      </td>
      {entryType === STOCK_ENTRY_TYPE.PORTFOLIO && (
        <td>
          <button
            className="badge btn sell"
            onClick={() => handleStockTransaction(TRANSACTION_TYPE.SELL, stock)}
          >
            Sell
          </button>
        </td>
      )}
    </tr>
  );
};

export default Stock;
