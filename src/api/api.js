import { LOCAL_STORAGE_KEYS } from "../constants";

async function makeApiCall(path, body, method) {
  const url = `${process.env.REACT_APP_SETU_TEST_API_URL}${path}`;
  const options = {
    mode: "cors",
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  try {
    const data = await fetch(url, options).catch(error => {
      return new Error(error);
    });

    if (data instanceof Error) {
      throw data;
    }
    const res = await data.json();
    if (res.statusCode >= 400) {
      throw res.message;
    }
    res.success = true;
    return res;
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export async function getStocks(forceUpdate = false) {
  const stocksFromLocalStorage = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.STOCK_LIST
  );
  let response = { data: [], success: false, fromLocalStorage: false };
  if (stocksFromLocalStorage && !forceUpdate) {
    response.data = JSON.parse(stocksFromLocalStorage);
    response.fromLocalStorage = true;
    response.success = true;
  } else {
    const res = await makeApiCall(`/stocks`);
    if (!res.success) {
      response = { ...response, ...res };
    } else {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.STOCK_LIST,
        JSON.stringify(res.data)
      );
      response = { ...response, ...res, fromLocalStorage: false };
    }
  }
  return response;
}

export async function getUserPortfolio(userID, forceUpdate = false) {
  const portfolioFromLocalStorage = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.USER_PORTFOLIO
  );
  if (portfolioFromLocalStorage && !forceUpdate) {
    return {
      data: JSON.parse(portfolioFromLocalStorage),
      success: true
    };
  } else {
    const res = await makeApiCall(`/${userID}/portfolio`);
    if (res.success) {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.STOCK_LIST,
        JSON.stringify(res.data)
      );
      return res;
    } else {
      return res;
    }
  }
}

export async function buyStock(userID, stockID, unitsToBuy) {
  const orderDetails = {
    stockId: `${stockID}`,
    unitsToBuy: `${unitsToBuy}`
  };

  const res = await makeApiCall(`/${userID}/buy`, orderDetails, "POST");
  return res;
}

export async function sellStock(userID, stockID, unitsToSell) {
  const orderDetails = {
    stockId: `${stockID}`,
    unitsToSell: `${unitsToSell}`
  };

  const res = await makeApiCall(`/${userID}/sell`, orderDetails, "POST");
  return res;
}
