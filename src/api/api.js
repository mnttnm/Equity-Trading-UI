async function makeApiCall(path, body, method) {
  const url = `${process.env.REACT_APP_SETU_TEST_API_URL}${path}`;
  const options = {
    mode: 'cors',
    method,
    body: body && JSON.stringify(body),
    headers: {
       Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
    console.log("API response: ", res.data);
    res.success = true;
    return res;
  } catch (error) {
    // reportError('Api', `${error || 'unknown error'} at ${path}`);
    console.error("API Failure: ", error);
    // !toast.isActive(API_ERROR_TOAST_ID) &&
    //   toast.error(messages.GENERIC_ERROR, {
    //     toastId: API_ERROR_TOAST_ID,
    //   });
    return {
      success: false,
      message: error,
    };
  }
}

const STOCK_LIST = "stock_list";
const USER_PORTFOLIO = "user_portfolio";

export async function getStocks(forceUpdate = false) {
  const stocksFromLocalStorage = window.localStorage.getItem(STOCK_LIST);
  if(stocksFromLocalStorage && !forceUpdate){
    return JSON.parse(stocksFromLocalStorage);
  } else {
    const res = await makeApiCall(`/stocks`);
    if (!res.success) {
      return res;
    } else {
      window.localStorage.setItem(STOCK_LIST, JSON.stringify(res.data));
      return res;
    }
  }
}

export async function getUserPortfolio(userID , forceUpdate = false) {
  const portfolioFromLocalStorage = window.localStorage.getItem(USER_PORTFOLIO);
  if(portfolioFromLocalStorage && !forceUpdate) {
    return JSON.parse(portfolioFromLocalStorage);
  } else {
    const res = await makeApiCall(`/${userID}/portfolio`);
    if (res.success) {
      window.localStorage.setItem(USER_PORTFOLIO, JSON.stringify(res.data));
      return res;
    } else {
      return res;
    }
  }
}

export async function buyStock(userID, stockID, unitsToBuy){
  const orderDetails = {
		"stockId" : `${stockID}`,
		"unitsToBuy" : `${unitsToBuy}`
	}

  const res = await makeApiCall(`/${userID}/buy`, orderDetails, 'POST');
  return res;
}

export async function sellStock(userID, stockID, unitsToSell){
  const orderDetails = {
		"stockId" : `${stockID}`,
		"unitsToSell" : `${unitsToSell}`
	}

  const res = await makeApiCall(`/${userID}/sell`, orderDetails, 'POST');
  return res;
}
