import React, { useState } from "react";

interface DashboardContextType {
  sidebarActive: boolean;
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardContext = React.createContext<DashboardContextType>({
  sidebarActive: false,
  setSidebarActive: () => {},
});

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  return <DashboardContext.Provider value={{ sidebarActive, setSidebarActive }}>{children}</DashboardContext.Provider>;
};
