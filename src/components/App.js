import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { StockExchangeContextProvider } from "../context/StockExchangeContext";
import { UserSessionContextProvider } from "../context/UserSessionContext";
import Dashboard from "./Dashboard";

export function App({
  stockRefreshFrequency,
  disableTimer,
  userID,
  onStockListUpdate,
  onTransactionUpdate
}) {
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
                onTransactionStatusChanged={onTransactionUpdate}
                onStockListUpdate={onStockListUpdate}
              />
            </StockExchangeContextProvider>
          </Container>
        </UserSessionContextProvider>
      </SnackbarProvider>
    </>
  );
}
