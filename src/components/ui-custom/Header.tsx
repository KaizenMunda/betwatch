import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

// Mock user data - in a real app, this would come from your auth context/state
const currentUser = {
  name: "Surya Dev",
  role: "Admin"
};

const Header = () => {
  return (
    <header className="border-b bg-blue-50">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <img src="/BetWatch.png" alt="BetWatch Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">BetWatch</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <div className="text-sm text-muted-foreground">
            Welcome {currentUser.name}, <span className="font-medium">{currentUser.role}</span>!
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
