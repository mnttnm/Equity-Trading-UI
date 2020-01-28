import React, {useContext} from "react";
import { STOCK_ENTRY_TYPE, TRANSACTION_TYPE } from "../constants";
import TransactionContext from "../context/TransactionContext";

const Stock = ({ stock, entryType }) => {
  const {onTransaction} = useContext(TransactionContext);
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

  return (
    <tr className="stock-row">
      {Object.keys(stock).map(key => (
        <td className={`stock-${key}`}>{stock[key]}</td>
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
