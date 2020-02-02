import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { StockExchangeContextProvider } from "../context/StockExchangeContext";
import { UserSessionContextProvider } from "../context/UserSessionContext";
import Dashboard from "./Dashboard";

/* Enable/Disable debug logging
   Default: disabled
*/
let DEBUG = false;
if(!DEBUG){
  if(!window.console) window.console = {};
  let methods = ["log", "debug", "warn", "info"];
  for(let i=0;i<methods.length;i++){
      console[methods[i]] = function(){};
  }
}

const App = ({
  userID,
  stockRefreshFrequency,
  disableTimer,
  onStockListUpdate,
  onTransaction
}) => {
  return (
    <>
      <SnackbarProvider>
        <UserSessionContextProvider>
          <Container>
            <CssBaseline />
            <StockExchangeContextProvider>
              <Dashboard
                userAuthID={userID}
                stockRefreshFrequency={stockRefreshFrequency}
                disableTimer={disableTimer}
                onTransaction={onTransaction}
                onStockListUpdate={onStockListUpdate}
              />
            </StockExchangeContextProvider>
          </Container>
        </UserSessionContextProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
