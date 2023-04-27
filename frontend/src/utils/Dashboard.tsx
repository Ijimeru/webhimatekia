import React, { useContext } from "react";
import DashboardHeader from "../components/Navbar/DashboardHeader";
import { DashboardContext } from "../context/DashboardContext";
import { Provider } from "react-redux";

interface MyComponentProps {
  component: React.ReactNode[];
}

const Dashboard: React.FC<MyComponentProps> = ({ component }) => {
  const { sidebarActive } = useContext(DashboardContext);
  return (
    <div className="">
      <Provider>
        {component[1]}
        <div className={`${sidebarActive ? `ml-64` : `ml-16`} transition-all duration-300`}>
          <DashboardHeader component={component[0]} />
        </div>
      </Provider>
    </div>
  );
};

export default Dashboard;
