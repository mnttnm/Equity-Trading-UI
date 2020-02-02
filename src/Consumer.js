import React, { useState } from "react";
import { AppBar, Typography } from "@material-ui/core";
import RefreshTab from "./components/RefreshTab";
import App from "./components/App";

/*
  Consumer: Component which consumes the implemented module
  input: takes userID as props
  Contains RefreshTab which is not part of the main module but
  allows to manager timer for live stock update
*/
const Consumer = ({ userID }) => {
  const [refreshFrequency, setRefreshFrequency] = useState(5);
  const [timerState, setTimerState] = useState(false);

  const onRefreshIntervalChanged = newFrequency => {
    setRefreshFrequency(newFrequency);
  };

  const onTimerStateChange = timerState => {
    setTimerState(timerState);
  };

  const onStockListUpdate = (state, status) => {
    console.log("Stocklist status: ", state, status);
  };

  const onTransaction = status => {
    console.log("Transaction status: ", status);
  };

  return (
    <>
      <AppBar>
        <Typography align="center" variant="h3" component="h3">
          Setu Dashboard
        </Typography>
      </AppBar>
      <RefreshTab
        stockRefreshFrequency={refreshFrequency}
        onRefreshIntervalChanged={onRefreshIntervalChanged}
        onTimerStateChange={onTimerStateChange}
      />
      <App
        userID={userID}
        stockRefreshFrequency={refreshFrequency}
        disableTimer={timerState}
        onStockListUpdate={onStockListUpdate}
        onTransaction={onTransaction}
      />
    </>
  );
};

export default Consumer;
