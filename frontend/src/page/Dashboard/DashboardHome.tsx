import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  return <div>gege</div>;
};

export default DashboardHome;
