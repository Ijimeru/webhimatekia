import React, { useContext } from "react";
import DashboardHeader from "../components/Navbar/DashboardHeader";
import { DashboardContext, DashboardProvider } from "../context/DashboardContext";
import DashboardPrivateRoute from "../PrivateRoute/DashboardPrivateRoute";

interface MyComponentProps {
  component: React.ReactNode[];
}

const Dashboard: React.FC<MyComponentProps> = ({ component }) => {
  const { sidebarActive } = useContext(DashboardContext);
  return (
    <div className="">
      <DashboardProvider>
        <DashboardPrivateRoute>
          {component[1]}
          <div className={`${sidebarActive ? `ml-64` : `ml-16`} transition-all duration-300`}>
            <DashboardHeader component={component[0]} />
          </div>
        </DashboardPrivateRoute>
      </DashboardProvider>
    </div>
  );
};

export default Dashboard;
