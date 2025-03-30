import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  AlertTriangle,
  Users,
  Activity,
  Settings,
  Monitor,
  Globe,
  Mouse,
  Shield,
  UserCog,
  LayoutDashboard,
  Search,
  CheckCircle,
  Clock,
  Gamepad2,
  ShoppingCart,
  Coins,
  Handshake,
  UserX,
  History,
  MonitorPlay,
  Cpu,
  Target,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMobile?: boolean;
}

export function Sidebar({ className, isMobile = false }: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out transform",
          !isOpen && "-translate-x-full",
          "lg:translate-x-0 lg:relative lg:z-0",
          className
        )}
      >
        <div className="pb-12 overflow-y-auto h-full">
          <div className="space-y-4 py-4">
            {/* Logo/Brand - Only show on desktop or when sidebar is open */}
            <div className={cn(
              "px-3 pt-14 lg:pt-0",
              !isOpen && "lg:block hidden"
            )}>
              <h1 className="text-xl font-bold px-4">BetWatch</h1>
            </div>

            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Overview</h2>
              <div className="space-y-1">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/risk-scores"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/risk-scores" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Risk Scores</span>
                </Link>
                <Link
                  to="/scoring-accuracy"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/scoring-accuracy" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Target className="h-4 w-4" />
                  <span>Scoring Accuracy</span>
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Take Action</h2>
              <div className="space-y-1">
                <Link
                  to="/search"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/search" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Search className="h-4 w-4" />
                  <span>User Search</span>
                </Link>
                <Link
                  to="/risky-users"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/risky-users" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <UserX className="h-4 w-4" />
                  <span>Risky Users</span>
                </Link>
                <Link
                  to="/risky-user-sessions"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/risky-user-sessions" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <History className="h-4 w-4" />
                  <span>Risky User Sessions</span>
                </Link>
                <Link
                  to="/whitelisted-users"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/whitelisted-users" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Whitelisted Users</span>
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Indicators</h2>
              <div className="space-y-1">
                <Link
                  to="/indicators/card-theme"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/indicators/card-theme" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Gamepad2 className="h-4 w-4" />
                  <span>Card Theme</span>
                </Link>
                <Link
                  to="/indicators/product-interaction"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/indicators/product-interaction" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Handshake className="h-4 w-4" />
                  <span>Product Interaction</span>
                </Link>
                <Link
                  to="/indicators/screen-share"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/indicators/screen-share" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <MonitorPlay className="h-4 w-4" />
                  <span>Screen Share</span>
                </Link>
                <Link
                  to="/indicators/system-processes"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/indicators/system-processes" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Cpu className="h-4 w-4" />
                  <span>System Processes</span>
                </Link>
                <Link
                  to="/indicators/mouse-movement"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/indicators/mouse-movement" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Mouse className="h-4 w-4" />
                  <span>Mouse Movement</span>
                </Link>
                <Link
                  to="/indicators/chip-dumping"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/indicators/chip-dumping" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Coins className="h-4 w-4" />
                  <span>Chip Dumping</span>
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
              <div className="space-y-1">
                <Link
                  to="/configuration"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/configuration" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span>Configuration</span>
                </Link>
                <Link
                  to="/user-management"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    location.pathname === "/user-management" &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <UserCog className="h-4 w-4" />
                  <span>User Management</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
