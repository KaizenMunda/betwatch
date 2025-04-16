import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/ui-custom/Sidebar";
import Header from "@/components/ui-custom/Header";
import Dashboard from "@/pages/Dashboard";
import RiskScores from "@/pages/RiskScores";
import RiskyUsers from "@/pages/RiskyUsers";
import WhitelistedUsers from "@/pages/WhitelistedUsers";
import CardTheme from "@/pages/indicators/CardTheme";
import ProductInteraction from "@/pages/indicators/ProductInteraction";
import ScreenShare from "@/pages/indicators/ScreenShare";
import SystemProcesses from "@/pages/indicators/SystemProcesses";
import MouseMovement from "@/pages/indicators/MouseMovement";
import Configuration from "@/pages/Configuration";
import AdminUserManagement from "@/pages/AdminUserManagement";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Search from "@/pages/Search";
import UserProfile from "@/pages/UserProfile";
import Overview from "@/pages/Overview";
import UserActionHistory from "@/pages/UserActionHistory";
import RiskThresholdHistory from "@/pages/RiskThresholdHistory";
import RiskyUserSessions from "@/pages/RiskyUserSessions";
import ScoringAccuracy from "@/pages/ScoringAccuracy";

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
              <Route path="/risk-scores" element={<RiskScores />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/scoring-accuracy" element={<ScoringAccuracy />} />
              <Route path="/indicators/card-theme" element={<CardTheme />} />
              <Route path="/indicators/product-interaction" element={<ProductInteraction />} />
              <Route path="/indicators/screen-share" element={<ScreenShare />} />
              <Route path="/indicators/system-processes" element={<SystemProcesses />} />
              <Route path="/indicators/mouse-movement" element={<MouseMovement />} />
              <Route path="/user-management" element={<AdminUserManagement />} />
              <Route path="/user-action-history/:userId?" element={<UserActionHistory />} />

              {/* Take Actions Section */}
              <Route path="/search" element={<Search />} />
              <Route path="/risky-users" element={<RiskyUsers />} />
              <Route path="/risky-user-sessions" element={<RiskyUserSessions />} />
              <Route path="/whitelisted-users" element={<WhitelistedUsers />} />

              <Route path="/users/:userId" element={<UserProfile />} />
              <Route path="/risk-threshold-history" element={<RiskThresholdHistory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
