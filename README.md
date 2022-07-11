A website prototype similar to Equity trading platform.

# High level Code Structure Information:

## APP Component
Main component which abstract the functionality of the requested module
Consumers of this component should pass `userID`, `stockRefreshFrequency`
`disableTimer`, `onStockListUpdate(CB)`, `onTransaction(CB)` as props to this component

otherwise, default values will be:
`userID`=12345,<br/>
`stockRefreshFrequency`=5,<br/>
`disableTimer`=false,<br/>
`onStockListUpdate`=()=>{},<br/>
`onTransaction=`()=>{}<br/>

## Consumer component
Component which uses the APP component for demo implementation
Also contains RefreshTab which is not part of the main module but allows to
manage timer for live stock update
