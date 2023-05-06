import React, { useContext } from "react";
import DashboardHeader from "../components/Navbar/DashboardHeader";
import { DashboardContext } from "../context/DashboardContext";
import { DashboardPostProvider } from "../context/DashboardPostContext";

interface MyComponentProps {
  component: React.ReactNode[];
}

const Dashboard: React.FC<MyComponentProps> = ({ component }) => {
  const { sidebarActive } = useContext(DashboardContext);
  return (
    <div className="">
      <DashboardPostProvider>
        {component[1]}
        <div className={`ml-0 ${sidebarActive ? `md:ml-64` : `md:ml-16`} transition-all duration-300`}>
          <DashboardHeader component={component[0]} />
        </div>
      </DashboardPostProvider>
    </div>
  );
};

export default Dashboard;
