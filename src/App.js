import React from "react";
import Dashboard from "./components/Dashboard";
import { StockExchangeContextProvider } from "./context/StockExchangeContext";

function App() {
  return (
    <>
      <h1> Setu Dashboard</h1>
      <StockExchangeContextProvider>
      <Dashboard userID="12345" />
      </StockExchangeContextProvider>
    </>
  );
}

export default App;
