export const STOCK_ENTRY_TYPE = {
  PORTFOLIO: "portfolio",
  STOCK_LIST: "stock_list",
};

export const TRANSACTION_TYPE = {
    BUY: "buy",
    SELL: "sell"
};

export const TRANSACTION_STATUS = {
  INITIATED: "initiated",
  IN_PROGRESS: "processing",
  COMPLETED: "completed",
  SUCCESSFUL: "success",
  FAILED: "failed",
  NONE: "none"
}

export const STOCKLIST_STATE = {
  LOADING : "loading",
  LOADED: "loaded",
  STALE: "stale"
}

export const STOCKLIST_STATUS = {
  FETCH_FAILED: "stock_list_fetch_failure",
  FETCH_SUCCESSFUL: "stock_list_fetch_successful",
  UNKNOWN: "unknown"
}