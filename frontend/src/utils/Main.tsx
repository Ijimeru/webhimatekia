import React from "react";
import Navbar from "../components/Navbar/Navbar";

interface MyComponentProps {
  component: React.ReactNode;
}

const Main: React.FC<MyComponentProps> = ({ component }) => {
  return (
    <>
      <Navbar />
      {component}
    </>
  );
};

export default Main;
