
import { NavLink } from "react-router-dom";
import {
  BarChart4,
  ChevronDown,
  Home,
  Menu,
  Search as SearchIcon,
  Settings,
  ShieldAlert,
  Users,
  UserRoundSearch
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

interface SubMenuProps {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const MenuItem = ({ icon: Icon, label, to, active }: MenuItemProps) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
          isActive ? "bg-muted text-foreground" : "text-muted-foreground"
        )
      }
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </NavLink>
  );
};

const SubMenu = ({ label, icon: Icon, children, defaultOpen = false }: SubMenuProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </div>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      {isOpen && (
        <div className="ml-6 space-y-1 pl-2 border-l border-border">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "bg-card border-r border-border h-screen transition-all duration-300 flex flex-col",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && <h1 className="text-xl font-bold">BetWatch</h1>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-3">
        {collapsed ? (
          <div className="flex flex-col items-center gap-4 pt-4">
            <NavLink to="/dashboard" className={({ isActive }) => cn(
              "flex justify-center rounded-md p-2 hover:bg-muted", 
              isActive ? "bg-muted text-foreground" : "text-muted-foreground"
            )}>
              <Home className="w-5 h-5" />
            </NavLink>
            <NavLink to="/search" className={({ isActive }) => cn(
              "flex justify-center rounded-md p-2 hover:bg-muted", 
              isActive ? "bg-muted text-foreground" : "text-muted-foreground"
            )}>
              <SearchIcon className="w-5 h-5" />
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => cn(
              "flex justify-center rounded-md p-2 hover:bg-muted", 
              isActive ? "bg-muted text-foreground" : "text-muted-foreground"
            )}>
              <BarChart4 className="w-5 h-5" />
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => cn(
              "flex justify-center rounded-md p-2 hover:bg-muted", 
              isActive ? "bg-muted text-foreground" : "text-muted-foreground"
            )}>
              <Users className="w-5 h-5" />
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => cn(
              "flex justify-center rounded-md p-2 hover:bg-muted", 
              isActive ? "bg-muted text-foreground" : "text-muted-foreground"
            )}>
              <Settings className="w-5 h-5" />
            </NavLink>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="pt-1">
              <h3 className="px-3 text-xs font-medium text-muted-foreground">MONITOR</h3>
            </div>
            <div className="space-y-1">
              <MenuItem icon={Home} label="Overview" to="/dashboard" />
              <MenuItem icon={UserRoundSearch} label="User Search" to="/search" />
              <MenuItem icon={SearchIcon} label="High Risk Users" to="/risks-scores" />
              <MenuItem icon={SearchIcon} label="Users" to="/risky-users" />
            </div>
          
            <div className="pt-1">
              <h3 className="px-3 text-xs font-medium text-muted-foreground">INVESTIGATE</h3>
            </div>
            
            <SubMenu icon={BarChart4} label="Reports" defaultOpen>
              <MenuItem icon={ShieldAlert} label="Fraud Overview" to="/analytics/fraud" />
              <MenuItem icon={Users} label="User Activity" to="/analytics/users" />
            </SubMenu>

            <SubMenu icon={BarChart4} label="Indicators" defaultOpen>
              <MenuItem icon={ShieldAlert} label="Game Theme" to="/analytics/fraud" />
              <MenuItem icon={Users} label="Product Interaction" to="/analytics/users" />
            </SubMenu>

            
            <div className="pt-1">
              <h3 className="px-3 text-xs font-medium text-muted-foreground">CONFIGURE</h3>
            </div>

            <MenuItem icon={Settings} label="Risk Thresholds" to="/settings" />
            <MenuItem icon={Users} label="User Management" to="/users" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
