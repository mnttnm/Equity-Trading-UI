import React, {useEffect, useContext} from 'react';
import Stock from '../components/Stock'
import {getStocks} from '../api/api';
import {STOCK_ENTRY_TYPE} from '../constants';
import StockExchangeContext from '../context/StockExchangeContext';

const StockList = () => {
    const {stocks, dispatch} = useContext(StockExchangeContext);

    useEffect(() => {
        (async ()=>{
            const res = await getStocks();
            dispatch({type:'UPDATE_STOCK_LIST', payload: res});
        })();
    }, [dispatch]);

    return (
      <>
        <h2>StockList</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="instrument">Instrument</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              stocks && stocks.map((stockInfo) =>
                  <Stock key={stockInfo.id} stock={stockInfo} entryType={STOCK_ENTRY_TYPE.STOCK_LIST}/>
              )
            }
          </tbody>
        </table>
      </>
    );
}

export default StockList;