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
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("pb-12", className)}>
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
              to="/risky-users"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                location.pathname === "/risky-users" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Users className="h-4 w-4" />
              <span>Risky Users</span>
            </Link>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/search">
                <Search className="mr-2 h-4 w-4" />
                User Search
              </Link>
            </Button>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Indicators</h2>
          <div className="space-y-1">
            <Link
              to="/indicators/game-theme"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                location.pathname === "/indicators/game-theme" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Activity className="h-4 w-4" />
              <span>Game Theme</span>
            </Link>
            <Link
              to="/indicators/product-interaction"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                location.pathname === "/indicators/product-interaction" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Settings className="h-4 w-4" />
              <span>Product Interaction</span>
            </Link>
            <Link
              to="/indicators/system-details"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                location.pathname === "/indicators/system-details" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Monitor className="h-4 w-4" />
              <span>System Details</span>
            </Link>
            <Link
              to="/indicators/remote-access"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                location.pathname === "/indicators/remote-access" &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <Globe className="h-4 w-4" />
              <span>Remote Access</span>
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
