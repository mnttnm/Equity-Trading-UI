import React, { useState } from "react";

const UserSessionContext = React.createContext();

export const UserSessionContextProvider = ({ children }) => {
  const [userID, setUserID] = useState("");

  function updateUserID(userID) {
    if (userID) {
      setUserID(userID);
    }
  }

  return (
    <UserSessionContext.Provider value={{ userID, updateUserID }}>
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserSessionContext;
