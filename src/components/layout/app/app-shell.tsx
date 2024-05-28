"use client";

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { AppSidebar } from "./app-sidebar";

interface AppShellContextValue {
  isSidebarCollapsed: boolean;
  isSidebarCollapsedMobile: boolean;
  toggleSidebar: VoidFunction;
}

const AppShellContext = createContext({} as AppShellContextValue);

export const useAppShell = () => {
  return useContext(AppShellContext);
};

export const AppShell = (props: PropsWithChildren) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarCollapsedMobile, setIsSidebarCollapsedMobile] =
    useState(true);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarCollapsedMobile((s) => !s);
    } else {
      setIsSidebarCollapsed((s) => !s);
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AppShellContext.Provider
        value={{ isSidebarCollapsed, isSidebarCollapsedMobile, toggleSidebar }}
      >
        <AppSidebar />
        <AppShellContent>{props.children}</AppShellContent>
      </AppShellContext.Provider>
    </div>
  );
};

const AppShellContent = (props: PropsWithChildren) => {
  return (
    <div style={{ height: "100%", flexGrow: 1 }}>
      <div className="w-full h-full transition-transform">{props.children}</div>
    </div>
  );
};
