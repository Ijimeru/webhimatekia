import React, { useContext } from "react";
import DashboardHeader from "../components/Navbar/DashboardHeader";
import { DashboardContext, DashboardProvider } from "../context/DashboardContext";

interface MyComponentProps {
  component: React.ReactNode[];
}

const Dashboard: React.FC<MyComponentProps> = ({ component }) => {
  const { sidebarActive } = useContext(DashboardContext);
  return (
    <div className="">
      <DashboardProvider>
        {component[1]}
        <div className={`${sidebarActive ? `ml-64` : `ml-16`} transition-all duration-300`}>
          <DashboardHeader component={component[0]} />
        </div>
      </DashboardProvider>
    </div>
  );
};

export default Dashboard;
