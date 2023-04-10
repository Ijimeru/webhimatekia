import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Homepage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome {user?.username}!</h1>
      <p>You are logged in as {user?.username}.</p>
    </div>
  );
}
