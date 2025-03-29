import React from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("pb-12 overflow-y-auto h-full", className)}>
      <div className="space-y-4 py-4">
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
              to="/risk-thresholds"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                location.pathname === "/risk-thresholds" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Shield className="h-4 w-4" />
              <span>Risk Thresholds</span>
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
  );
}

export default Sidebar;
