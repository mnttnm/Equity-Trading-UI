import React from "react";

const UserBook = ({userBalance}) => {
  return (
    <>
      <h2>Cash Available</h2>
      <span>{userBalance}</span>
    </>
  );
};

export default UserBook;
