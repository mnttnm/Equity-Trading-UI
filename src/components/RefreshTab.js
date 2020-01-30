import React, {useState} from "react";

const RefreshTab = ({ onRefreshIntervalChanged, timerDisabled}) => {
  const [refreshInterval, setRefreshInterval] = useState(20);

  const handleRefreshIntervalChange = (interval) => {
      onRefreshIntervalChanged(interval);
      setRefreshInterval(interval);
  }

  return (
    <>
    {timerDisabled ? <span style={{color: "red"}}> Live fetch has stopped! </span> : <></>}
    <div className="refresh-tab">
        <button className="refresh-interval-btn" onClick={()=> handleRefreshIntervalChange(2)}>2s</button>
        <button className="refresh-interval-btn" onClick={()=> handleRefreshIntervalChange(5)}>5s</button>
        <button className="refresh-interval-btn" onClick={()=> handleRefreshIntervalChange(10)}>10s</button>
        <button className="refresh-interval-btn" onClick={()=> handleRefreshIntervalChange(20)}>20s</button>
        <button className="refresh-interval-btn" onClick={()=> handleRefreshIntervalChange(30)}>30s</button>
    </div>
    <span>Refresh Interval: </span>
    <span className='refresh-interval-value'>{refreshInterval}</span>
    </>
  )

};

export default RefreshTab;
