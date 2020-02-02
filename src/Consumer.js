import React, {useState} from "react";
import { AppBar,Typography } from "@material-ui/core";
import RefreshTab from "./components/RefreshTab";
import useApp from './hooks/useApp';

const Consumer = ({userID}) => {
  const [refreshFrequency, setRefreshFrequency] = useState(10);
  const [timerState, setTimerState] = useState(false);

  const onRefreshIntervalChanged = (newFrequency) => {
    setRefreshFrequency(newFrequency);
  }

  const onTimerStateChange = (timerState) => {
    setTimerState(timerState);
  }


  function onStockListUpdate(state, status) {
    console.log("Stocklist status: ", state, status);
  }

  function onTransactionStatusChanged(status) {
    console.log("Transaction status: ", status);
  }

  const [App] = useApp({refreshFrequency, timerState, userID});

  return (
    <>
      <AppBar> <Typography align="center" variant="h3" component="h3">Setu Dashboard</Typography></AppBar>
      <RefreshTab stockRefreshFrequency={refreshFrequency} onRefreshIntervalChanged={onRefreshIntervalChanged} onTimerStateChange={onTimerStateChange}/>
      <App userID={userID} stockRefreshFrequency={refreshFrequency} disableTimer={timerState} onStockListUpdate={onStockListUpdate} onTransactionUpdate={onTransactionStatusChanged}/>
    </>
  );
}

export default Consumer;
