import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Container,
  Grid,
  makeStyles
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import {
  TRANSACTION_STATUS,
  STOCKLIST_STATE,
  STOCKLIST_STATUS,
  PORTFOLIO_STATE
} from "../constants";
import UserSessionContext from "../context/UserSessionContext";
import { TransactionContextProvider } from "../context/TransactionContext";
import Portfolio from "./Portfolio";
import StockList from "./StockList";
import TransactionCart from "./TransactionCart";
import TabPanel from "./TabPanel";

const DashBoard = ({
  userAuthID,
  stockRefreshFrequency,
  disableTimer,
  onStockListUpdate,
  onTransaction
}) => {
  const [isPortfolioChanged, setIsPortfolioChanged] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userID, updateUserID } = useContext(UserSessionContext);

  useEffect(() => {
    updateUserID(userAuthID);
  }, [userAuthID, updateUserID]);

  const onStockListChange = (state, status) => {
    onStockListUpdate(state, status);
    switch (state) {
      case STOCKLIST_STATE.STALE:
        if (status === STOCKLIST_STATUS.FETCH_FAILED) {
          enqueueSnackbar("Stocks List update failed!", { variant: "error" });
        } else if (status === STOCKLIST_STATUS.FETCHED_LOCALLY) {
          enqueueSnackbar("Stocks List data is not updated! ", {
            variant: "warning"
          });
        }
        break;
      case STOCKLIST_STATE.LOADED:
        if (status === STOCKLIST_STATUS.FETCH_SUCCESSFUL) {
          // enqueueSnackbar("Stock List updated to latest!", {variant: 'success'});
        }
        break;
      case STOCKLIST_STATE.UNINITIALIZED:
        if (status === STOCKLIST_STATUS.FETCH_FAILED) {
          enqueueSnackbar(
            `Stock list update failed, Trying again after ${stockRefreshFrequency}s!`,
            { variant: "error" }
          );
        }
        break;
      default:
        console.log("Stocklist state: ", state, ", Status: ", status);
        break;
    }
  };

  const onTransactionUpdate = status => {
    switch (status) {
      case TRANSACTION_STATUS.FAILED:
        enqueueSnackbar("Transaction Failed, Try Again!", { variant: "error" });
        break;
      case TRANSACTION_STATUS.SUCCESSFUL:
        setIsPortfolioChanged(true);
        onTransaction(status);
        enqueueSnackbar("Transaction Successful", { variant: "success" });
        break;
      case TRANSACTION_STATUS.IN_PROGRESS:
        setIsPortfolioChanged(false);
        break;
      default:
        console.log("Transaction status: ", status);
    }
  };

  const onPortfolioUpdate = useCallback(status => {
    switch (status) {
      case PORTFOLIO_STATE.LOADING:
        break;
      default:
        console.log("portfolio update: ", status);
    }
  }, []);

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    }
  }));

  const classes = useStyles();

  // Helper logic for tab panel implementation
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <AppBar position="static">
        <Grid container justify="center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Dashboard Section"
          >
            <Tab label="Marketwatch" {...a11yProps(0)} />
            <Tab label="Portfolio" {...a11yProps(1)} />
          </Tabs>
        </Grid>
      </AppBar>

      <TransactionContextProvider>
        <Grid container justify="center">
          <TabPanel value={value} index={0}>
            <StockList
              refreshFrequency={stockRefreshFrequency}
              disableTimer={disableTimer}
              onStockListUpdate={onStockListChange}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Portfolio
              userID={userID}
              isPortfolioChanged={isPortfolioChanged}
              onPortfolioUpdate={onPortfolioUpdate}
            />
          </TabPanel>

          <TransactionCart onTransaction={onTransactionUpdate} />
        </Grid>
      </TransactionContextProvider>
    </Container>
  );
};

export default DashBoard;
