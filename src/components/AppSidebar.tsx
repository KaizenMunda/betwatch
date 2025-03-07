
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  AlertTriangle,
  BarChart4,
  ChevronLeft,
  Fingerprint,
  HomeIcon,
  Search,
  Settings,
  Shield,
  UserSearch,
} from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <Shield className="size-6 text-primary" />
          <span className="font-semibold text-lg">FraudView</span>
        </div>
        <SidebarTrigger className="ml-auto" asChild>
          <button className="size-8 flex items-center justify-center rounded-md hover:bg-muted">
            <ChevronLeft className="size-5" />
          </button>
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <nav className="grid gap-1">
              <NavItem 
                href="/" 
                icon={HomeIcon} 
                label="Dashboard" 
                active={isActive("/")} 
              />
              <NavItem 
                href="/users" 
                icon={UserSearch} 
                label="Users" 
                active={isActive("/users")} 
              />
              <NavItem 
                href="/search" 
                icon={Search} 
                label="Search" 
                active={isActive("/search")} 
              />
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <nav className="grid gap-1">
              <NavItem 
                href="/analytics" 
                icon={BarChart4} 
                label="Analytics" 
                active={isActive("/analytics")} 
              />
              <NavItem 
                href="/alerts" 
                icon={AlertTriangle} 
                label="Alerts" 
                active={isActive("/alerts")}
                badge={4}
                badgeVariant="red"
              />
              <NavItem 
                href="/fingerprints" 
                icon={Fingerprint} 
                label="Fingerprints" 
                active={isActive("/fingerprints")} 
              />
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <nav className="grid gap-1">
              <NavItem 
                href="/settings" 
                icon={Settings} 
                label="Settings" 
                active={isActive("/settings")} 
              />
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
  badgeVariant?: "default" | "red" | "green" | "blue";
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon: Icon,
  label,
  active,
  badge,
  badgeVariant = "default",
}) => {
  const badgeStyles = {
    default: "bg-muted text-muted-foreground",
    red: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400",
    green: "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  };

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {badge !== undefined && (
        <span className={cn("ml-auto text-xs px-1.5 py-0.5 rounded-full", badgeStyles[badgeVariant])}>
          {badge}
        </span>
      )}
    </Link>
  );
};
