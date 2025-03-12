import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/ui-custom/Sidebar";
import Header from "@/components/ui-custom/Header";
import Dashboard from "@/pages/Dashboard";
import RiskScores from "@/pages/RiskScores";
import RiskyUsers from "@/pages/RiskyUsers";
import GameTheme from "@/pages/indicators/GameTheme";
import ProductInteraction from "@/pages/indicators/ProductInteraction";
import SystemDetails from "@/pages/indicators/SystemDetails";
import RemoteAccess from "@/pages/indicators/RemoteAccess";
import MouseMovement from "@/pages/indicators/MouseMovement";
import RiskThresholds from "@/pages/RiskThresholds";
import AdminUserManagement from "@/pages/AdminUserManagement";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Search from "@/pages/Search";
import UserProfile from "@/pages/UserProfile";
import Overview from "@/pages/Overview";
import UserActionHistory from "@/pages/UserActionHistory";

function App() {
  return (
    <Router>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar className="w-64 border-r" />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<Search />} />
              <Route path="/users/:userId" element={<UserProfile />} />
              <Route path="/risk-scores" element={<RiskScores />} />
              <Route path="/risky-users" element={<RiskyUsers />} />
              <Route path="/indicators/game-theme" element={<GameTheme />} />
              <Route path="/indicators/product-interaction" element={<ProductInteraction />} />
              <Route path="/indicators/system-details" element={<SystemDetails />} />
              <Route path="/indicators/remote-access" element={<RemoteAccess />} />
              <Route path="/indicators/mouse-movement" element={<MouseMovement />} />
              <Route path="/risk-thresholds" element={<RiskThresholds />} />
              <Route path="/user-management" element={<AdminUserManagement />} />
              <Route path="/user-action-history/:userId?" element={<UserActionHistory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
