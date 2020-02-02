import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TransactionContext from "../context/TransactionContext";
import UserSessionContext from '../context/UserSessionContext';
import { buyStock, sellStock } from "../api/api";
import { TRANSACTION_TYPE, TRANSACTION_STATUS } from "../constants";
import { Button, Box, Paper, TextField, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const TransactionCart = ({ onTransactionStatusChanged }) => {
  const {
    transactionInitiated,
    setTransactionInitiated,
    transactionInfo,
    setTransactionInfo,
    resetTransactionInfo
  } = useContext(TransactionContext);

  const {userID} = useContext(UserSessionContext);

  const executeOrder = () => {
    onTransactionStatusChanged(TRANSACTION_STATUS.IN_PROGRESS);
    transactionInfo.entities.forEach(async script => {
      console.log("script: ", script.id, "units: ", script.value);
      if (transactionInfo.type === TRANSACTION_TYPE.BUY) {
        const status = await buyStock(userID, script.id, script.units);
        if (status.success) {
          onTransactionStatusChanged(TRANSACTION_STATUS.SUCCESSFUL);
          handleStockRemoval(script.id);
        } else {
          onTransactionStatusChanged(TRANSACTION_STATUS.FAILED);
        }
      } else {
        const status = await sellStock(userID, script.id, script.units);
        if (status.success) {
          onTransactionStatusChanged(TRANSACTION_STATUS.SUCCESSFUL);
          handleStockRemoval(script.id);
        } else {
          onTransactionStatusChanged(TRANSACTION_STATUS.FAILED);
        }
      }
    });
  };

  const cancelOrder = () => {
    //reset the transactionInfo state
    resetTransactionInfo();
    setTransactionInitiated(false);
  };

  const handleStockRemoval = value => {
    if (transactionInfo.entities.length > 0) {
      let updatedArray = transactionInfo.entities.filter(entity => {
        return value !== entity.id;
      });
      if (updatedArray.length === 0) {
        // hide the cart
        setTransactionInitiated(false);
        resetTransactionInfo();
      }
      setTransactionInfo({ ...transactionInfo, entities: updatedArray });
    }
  };

  function onUnitChange(e) {
    // update the unit value of script in the transaction cart
    if (transactionInfo.entities.length > 0) {
      const entityId = transactionInfo.entities.findIndex(
        ({ id }) => id === e.target.name
      );
      if (entityId !== -1) {
        let updatedArray = [...transactionInfo.entities];
        updatedArray[entityId] = {
          ...transactionInfo.entities[entityId],
          units: e.target.value
        };
        setTransactionInfo({
          ...transactionInfo,
          entities: [...updatedArray]
        });
      }
    } else {
      // throw some error
    }
  }

  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1)
    },
    cart_entry: {
      minWidth: 60,
      textAlign:"center",
      marginRight: 5
    },
    cart_header:{
      padding: 10,
      fontWeight:"bold",
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    cart_container:{
      margin: 5
    }
  }));

  const classes = useStyles();

  return transactionInitiated ? (
    <Paper id="transcation-box">
      <Box className={classes.cart_header} bgcolor={transactionInfo.type === "buy"? "blue": "red"} color="white">{transactionInfo.type.toUpperCase()}</Box>
      {transactionInfo.entities &&
        transactionInfo.entities.map(entity => {
          return (
            <Grid className={classes.cart_container} container direction="row" key={entity.id} spacing={2}>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item className={classes.cart_entry}>
                    <div>
                      <strong>{entity.id}</strong>
                    </div>
                  </Grid>
                  <Grid item className={classes.cart_entry}>
                    <TextField
                      size="small"
                      defaultValue="0"
                      name={`${entity.id}`}
                      type="number"
                      onChange={onUnitChange}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleStockRemoval(entity.id);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      <Box>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={executeOrder}
            className={classes.margin}
          >
            Execute
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={cancelOrder}
            className={classes.margin}
          >
            Cancel
          </Button>
        </Grid>
      </Box>
    </Paper>
  ) : null;
};

export default TransactionCart;
