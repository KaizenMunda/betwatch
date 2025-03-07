
import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header username="Admin" />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
