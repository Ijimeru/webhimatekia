import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Homepage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="container m-auto">
      <h1>Welcome {user?.username}!</h1>
      <p>You are logged in as {user?.username}.</p>
    </div>
  );
}
