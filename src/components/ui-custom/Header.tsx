
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  username?: string;
}

const Header = ({ username = "User" }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">
            Welcome, <span className="font-semibold">{username}</span>
          </h2>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <LogOut size={16} />
          <span>Log out</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
