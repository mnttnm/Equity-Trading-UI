import React, { useContext } from "react";
import TransactionContext from "../context/TransactionContext";
import {buyStock, sellStock} from '../api/api';
import {TRANSACTION_TYPE, TRANSACTION_STATUS} from '../constants';

const TransactionCart = ({onTransactionStatusChanged}) => {
  const {
    transactionInitiated,
    setTransactionInitiated,
    transactionInfo,
    setTransactionInfo,
    resetTransactionInfo
  } = useContext(TransactionContext);

  const executeOrder = () => {
    onTransactionStatusChanged(TRANSACTION_STATUS.IN_PROGRESS);
    transactionInfo.entities.forEach(async (script) => {
      const currentEntry = document.querySelector(
        `input[name='${script.id}']`
      );
      console.log("script: ", script.id, "units: ", currentEntry.value);
      if(transactionInfo.type === TRANSACTION_TYPE.BUY) {
        const status = await buyStock(12345, script.id, currentEntry.value);
        if(status.success){
          console.log(`transaction successful`);
          onTransactionStatusChanged(TRANSACTION_STATUS.SUCCESSFUL);
          //notify and update the portfolio, cash-balance
        } else {
          // Notify
          onTransactionStatusChanged(TRANSACTION_STATUS.FAILED);
          console.log(`transaction failed: `, status.message);
        }
      }
      else {
        const status = await sellStock(12345, script.id, currentEntry.value);
        if(status.success){
          //notify and update the portfolio, cash-balance
          console.log(`transaction successful`);
          onTransactionStatusChanged(TRANSACTION_STATUS.SUCCESSFUL);
        } else {
          // Notify
          console.log(`transaction failed: `, status.message);
          onTransactionStatusChanged(TRANSACTION_STATUS.FAILED);
        }
      }
    });

    //create some global context which will publish/listen to the transaction
    //execution evnet and act on it.
  };

  const cancelOrder = () => {
    //reset the transactionInfo state
    resetTransactionInfo();
    setTransactionInitiated(false);
  };

  const handleStockRemoval = (e)=>{
    console.log(e.target.value);
    if(transactionInfo.entities.length > 0) {
      let updatedArray =  transactionInfo.entities.filter((entity) => {
        return e.target.value !== entity.id;
      })
      if(updatedArray.length === 0){
        // hide the cart
        setTransactionInitiated(false);
        resetTransactionInfo();
      }
      setTransactionInfo({...transactionInfo, entities:updatedArray});
    }
  }

  return transactionInitiated ? (
    <div id="transcation-box">
      {transactionInfo.entities &&
        transactionInfo.entities.map(entity => {
          return (
            <div className="details" key={entity.id}>
              <span className={`badge ${entity.type} tag`}>
                {entity.type.toUpperCase().substring(0, 1)}
              </span>
              <div>
                <strong>{entity.id}</strong>
              </div>
              <input
                name={`${entity.id}`}
                type="text"
                placeholder="enter units" 
              ></input>
              <span>
                <button onClick={(e)=>{handleStockRemoval(e);}} value={entity.id}>X</button>
              </span>
            </div>
          );
        })}
      <div className="order-execution-box">
        <button className="btn execute" onClick={executeOrder}>
          Place Order
        </button>
        <button className="btn cancel" onClick={cancelOrder}>
          Cancel Order
        </button>
      </div>
    </div>
  ) : null;
};

export default TransactionCart;
