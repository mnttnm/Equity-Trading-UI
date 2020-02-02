import React, { useState } from "react";
import { Button, Grid, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const RefreshTab = ({
  onRefreshIntervalChanged,
  onTimerStateChange,
  stockRefreshFrequency
}) => {
  const [refreshInterval, setRefreshInterval] = useState(stockRefreshFrequency);
  const [timerState, setTimerState] = useState(false);

  const useStyles = makeStyles(theme => ({
    timerGrid: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  const handleRefreshIntervalChange = interval => {
    onRefreshIntervalChanged(interval);
    setRefreshInterval(interval);
  };

  const toggleTimerState = timerState => {
    onTimerStateChange(timerState);
    setTimerState(timerState);
  };

  return (
    <Container className={classes.timerGrid} margin="normal" maxWidth="lg">
      <Grid container justify="space-around">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              toggleTimerState(!timerState);
            }}
          >
            {timerState ? "Start Live Update " : "Stop Live Update! "}
          </Button>
        </Grid>
        {timerState && <span style={{ color: "red" }}> Live fetch has stopped! </span>}
        <Grid item>
          <Grid
            container
            justify="space-around"
            spacing={1}
            alignItems="center"
          >
            <Box fontSize={18} fontWeight="800" marginRight={1}>
              Live update Interval
            </Box>
            <Box padding={1} bgcolor="#3f51b5" color="white" borderRadius={5}>
              {refreshInterval}s
            </Box>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify="space-around" spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleRefreshIntervalChange(2)}
              >
                2s
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleRefreshIntervalChange(5)}
              >
                5s
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleRefreshIntervalChange(10)}
              >
                10s
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleRefreshIntervalChange(20)}
              >
                20s
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleRefreshIntervalChange(30)}
              >
                30s
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RefreshTab;
